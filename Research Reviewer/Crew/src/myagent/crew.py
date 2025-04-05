from crewai import Agent, Crew, Process, Task
from crewai.project import CrewBase, agent, crew, task

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
			# 👇 Provide your research paper text files as knowledge sources
			knowledge_source=[
				"data/paper1.txt",
				"data/paper2.txt"
			]
		)

	@agent
	def reviewer(self) -> Agent:
		return Agent(
			config=self.agents_config['reviewer'],
			verbose=True,
			# 👇 This agent does not need external sources, only task input
			knowledge_source=[]
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
