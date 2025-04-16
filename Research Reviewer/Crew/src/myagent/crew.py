from crewai import Agent, Crew, Process, Task
from crewai.project import CrewBase, agent, crew, task
import os
from crewai.knowledge.source.text_file_knowledge_source import TextFileKnowledgeSource
import yaml	

@CrewBase
class Myagent():
    """Myagent crew"""

    agents_config = 'config/agents.yaml'
    tasks_config = 'config/tasks.yaml'

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
        review_knowledge = TextFileKnowledgeSource(file_paths=["final_review.md"])
        return Agent(
            config=self.agents_config['ReviewChatBot'],  
            verbose=True,
            knowledge_source=[review_knowledge],
            allow_delegation=False
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
            output_file='./knowledge/final_review.md'
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
        )
