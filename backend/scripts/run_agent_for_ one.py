#!/usr/bin/env python3
"""Finance Research Agent using Dedalus SDK.

A terminal-based agent that connects to Yahoo Finance and Exa Search
MCP servers for real-time market data and company research.
"""

import asyncio

from dotenv import load_dotenv

load_dotenv()

from dedalus_labs import AsyncDedalus
from dedalus_labs.lib.runner import DedalusRunner


# MCP servers from Dedalus Marketplace
MCP_SERVERS = [
    "tsion/yahoo-finance-mcp",
    "tsion/exa",
]

SYSTEM_PROMPT = """\
You are a finance research assistant with access to real-time market data and web search.

**Yahoo Finance Tools** — for market data:
- get_quote: Live price, volume, market cap, P/E ratio, 52-week high/low
- get_historical_data: OHLCV candles (1d, 5d, 1mo, 3mo, 6mo, 1y, etc.)
- get_news: Latest news headlines for a ticker
- compare_stocks: Compare multiple stocks side by side
- get_company_info: Business summary, sector, industry, employees
- get_financials: Financial metrics (margins, P/E, revenue growth, etc.)

**Exa Search Tools** — for research:
- exa_search: Web search for news, analysis, SEC filings, earnings reports
- exa_find_similar: Find pages similar to a given URL
- exa_get_contents: Fetch full text content from URLs

When answering questions:
1. Use Yahoo Finance for current prices, historical data, company info, financials
2. Use Exa Search for news, analysis, competitor research, background info
3. Combine both when the question requires data + context

Be concise. Show key numbers in tables when comparing. Cite sources when using web search."""


async def main() -> None:
    """Run the finance agent REPL."""
    print("\n\033[1mFinance Research Agent\033[0m")
    print("=" * 50)
    print("MCP Servers: Yahoo Finance, Exa Search")
    print("Type 'quit' to exit, 'clear' to reset conversation\n")

    client = AsyncDedalus()
    runner = DedalusRunner(client, verbose=False)

    messages: list[dict] = []

    while True:
        # Get user input
        try:
            user_input = input("\033[94mYou:\033[0m ").strip()
        except (EOFError, KeyboardInterrupt):
            print("\nGoodbye!")
            break

        if not user_input:
            continue

        # Handle commands
        if user_input.lower() in ("quit", "exit", "q"):
            print("Goodbye!")
            break

        if user_input.lower() == "clear":
            messages = []
            print("\033[90mConversation cleared.\033[0m\n")
            continue

        # Add user message
        messages.append({"role": "user", "content": user_input})

        try:
            # Run the agent
            result = await runner.run(
                instructions=SYSTEM_PROMPT,
                messages=messages,
                mcp_servers=MCP_SERVERS,
                model="openai/gpt-4o",
                max_steps=10,
                verbose=False,
            )

            # Update conversation history
            messages = result.to_input_list()

            # Print response
            print(f"\n\033[92mAgent:\033[0m {result.final_output}\n")

            # Show tools used
            if result.tools_called:
                tools_str = ", ".join(result.tools_called)
                print(f"\033[90mTools used: {tools_str}\033[0m\n")

        except Exception as e:
            print(f"\n\033[91mError:\033[0m {e}\n")
            # Remove failed user message from history
            if messages and messages[-1].get("role") == "user":
                messages.pop()


if __name__ == "__main__":
    asyncio.run(main())