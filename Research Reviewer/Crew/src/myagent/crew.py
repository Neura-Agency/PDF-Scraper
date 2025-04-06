from crewai import Agent, Crew, Process, Task
from crewai.project import CrewBase, agent, crew, task
import os

@CrewBase
class Myagent():
	"""Myagent crew"""

	openai_api_key = os.getenv("GEMINI_API_KEY")
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

	@task
	def research_task(self) -> Task:
		return Task(
			config=self.tasks_config['research_task'],
			agent=self.DataExtractor(),
			output_file='alignment_summary.md'  # optional if you want to save intermediate result
		)

	@task
	def review_task(self) -> Task:
		return Task(
			config=self.tasks_config['review_task'],
			agent=self.reviewer(),
			inputs=[self.research_task()],  # 👈 reviewer takes input from DataExtractor's output
			output_file='final_review.md'
		)

	@crew
	def crew(self) -> Crew:
		"""Creates the Myagent crew"""

		return Crew(
			agents=self.agents,
			tasks=self.tasks,
			process=Process.sequential,
			verbose=True,
		)

