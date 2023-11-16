from enum import Enum 
from typing import Union, Optional, Any
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

app = FastAPI()