from pathlib import Path
import os
import csv
import time
import base64
from datetime import datetime

from dotenv import load_dotenv
from openai import OpenAI

# Project Config

load_dotenv()

client = OpenAI(
    api_key=os.environ["OPENAI_API_KEY"]
)

# Paths

# Monitoring folder:
WATCH_FOLDER = Path(
    r"C:\Users\AJ\OneDrive\Other computers\My Computer\Rich Photo Project\2026.04 - Green Box\03 - Orange Box (Re-do)"
    )

# Restoring images and saving them to this folder:
OUTPUT_FOLDER = WATCH_FOLDER / "AI Restorations"

# Logs
