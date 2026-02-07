"""
Dedalus Agent Configuration
"""
import os
from dotenv import load_dotenv
from dedalus_labs import AsyncDedalus
from dedalus_labs.lib.runner import DedalusRunner

load_dotenv()

# Placeholder for the user's external MCP server
# User should replace this with the actual server name or path
MCP_SERVERS = [
    "mcp-server-finance-agent" # Replace with your actual MCP server name
]

SYSTEM_PROMPT = """\
You are a helpful assistant with access to a Finance Agent MCP server.
Your capabilities include:
1. Fetching customer data from Nessie.
2. Searching for news using web search tools.

Your goal is to process customer data and provide summaries.
"""

def get_agent_runner(verbose=False):
    """Returns a configured DedalusRunner connected to the MCP server."""
    client = AsyncDedalus()
    runner = DedalusRunner(client, verbose=verbose)
    return runner