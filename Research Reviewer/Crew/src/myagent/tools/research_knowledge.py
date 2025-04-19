from crewai.tools import BaseTool
from typing import Optional, Any
from pydantic import Field

class ResearchKnowledgeTool(BaseTool):
    """Tool for accessing and analyzing research paper content."""
    
    name: str = Field(default="research_knowledge", description="Name of the tool")
    description: str = Field(
        default="Tool to access and analyze research paper content and reviews",
        description="Description of what the tool does"
    )

    review_content: Optional[str] = None  # ✅ Add this

    def _run(self, query: str) -> str:
        if not self.review_content:
            return "No review content available to analyze."
        return f"Analysis based on the review content: {self.review_content}"

    async def _arun(self, query: str) -> Any:
        raise NotImplementedError("This tool does not support async operations")
