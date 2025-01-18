from astrapy import DataAPIClient
import os
from dotenv import load_dotenv
load_dotenv()
def connect():
    client = DataAPIClient(os.getenv("API_CLIENT"))
    db = client.get_database_by_api_endpoint(
      os.getenv("DATABASE_URL")
    )
    print(f"Connected to Astra DB: {db.list_collection_names()}")
    return db