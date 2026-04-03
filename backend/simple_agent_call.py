from tinyfish import TinyFish
from dotenv import load_dotenv

load_dotenv()
client = TinyFish()

with client.agent.stream(
    url="https://scrapeme.live/shop",
    goal="Extract the first 2 product names and prices. Respond in json",
) as stream:
    for event in stream:
        print(event)