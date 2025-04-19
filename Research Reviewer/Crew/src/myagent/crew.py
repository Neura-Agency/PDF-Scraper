from crewai import Agent, Crew, Process, Task
from crewai.project import CrewBase, agent, crew, task
import os
from crewai.knowledge.source.text_file_knowledge_source import TextFileKnowledgeSource
from myagent.tools.research_knowledge import ResearchKnowledgeTool
import yaml	

@CrewBase
class Myagent():
    """Myagent crew"""

    agents_config = 'config/agents.yaml'
    tasks_config = 'config/tasks.yaml'

    def __init__(self):
        # Initialize tools before super().__init__()
        self.research_tool = ResearchKnowledgeTool()
        self.tools = {
            "research_knowledge": lambda: self.research_tool
        }
        super().__init__()

    @agent
    def DataExtractor(self) -> Agent:
        return Agent(    
            config=self.agents_config['DataExtractor'],
            verbose=True,
        )

    @agent
    def reviewer(self) -> Agent:
        return Agent(
            config=self.agents_config['reviewer'],
            verbose=True,
        )

    @agent
    def ReviewChatBot(self) -> Agent:
        # Get the absolute path to the knowledge directory
        base_dir = os.path.dirname(os.path.dirname(os.path.dirname(__file__)))
        review_content_path = os.path.join(base_dir, "knowledge", "final_review.md")
        
        try:
            knowledge_source = TextFileKnowledgeSource(
                file_paths=[review_content_path]  
            )
            
            return Agent(
                config=self.agents_config['ReviewChatBot'],
                verbose=True,
                knowledge_sources=[knowledge_source]
            )
        except Exception as e:
            print(f"[DEBUG] Error creating knowledge source: {e}")
            return Agent(
                config=self.agents_config['ReviewChatBot'],
                verbose=True
            )

    @task
    def research_task(self) -> Task:
        return Task(
            config=self.tasks_config['research_task'],
            agent=self.DataExtractor(),
            output_file='alignment_summary.md' 
        )

    @task
    def review_task(self) -> Task:
        return Task(
            config=self.tasks_config['review_task'],
            agent=self.reviewer(),
            inputs=[self.research_task()],
            output_file='Crew/knowledge/final_review.md'
        )

    @task
    def chat_task(self) -> Task:
        return Task(
            config=self.tasks_config['chat_task'],
            agent=self.ReviewChatBot(),
            input_type='user', 
        )

    @crew
    def crew(self) -> Crew:
        return Crew(
            agents=[self.DataExtractor(), self.reviewer()],
            tasks=[self.research_task(), self.review_task()],
            process=Process.sequential,
            verbose=True,
        )

    def chat_crew(self) -> Crew:
        return Crew(
            agents=[self.ReviewChatBot()],
            tasks=[self.chat_task()],
            process=Process.sequential,
            verbose=True,
            chat_llm="gemini/gemini-2.0-flash",
        )
