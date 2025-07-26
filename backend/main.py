import os
import tempfile
import whisper
import uvicorn
from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
from dotenv import load_dotenv

load_dotenv()

HOST = os.getenv("HOST", "0.0.0.0")
PORT = int(os.getenv("PORT", 8000))
WHISPER_MODEL = os.getenv("WHISPER_MODEL", "base")
CORS_ORIGINS = os.getenv("CORS_ORIGINS", "*").split(",")
MAX_FILE_SIZE = int(os.getenv("MAX_FILE_SIZE", 104857600))

app = FastAPI(
    title="Whisper API Service",
    description="API сервис для транскрибации аудио с помощью OpenAI Whisper",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

model = None

class TranscribeResponse(BaseModel):
    text: str
    language: Optional[str] = None

@app.on_event("startup")
async def load_model():
    global model
    try:
        model = whisper.load_model(WHISPER_MODEL)
        print(f"Модель Whisper '{WHISPER_MODEL}' успешно загружена")
    except Exception as e:
        print(f"Ошибка загрузки модели: {e}")
        raise e

@app.get("/")
def read_root():
    return {"message": "Whisper API Service", "status": "running"}

@app.get("/health")
def health_check():
    return {"status": "healthy", "model_loaded": model is not None}

@app.post("/transcribe/", response_model=TranscribeResponse)
async def transcribe(file: UploadFile = File(...)):
    if not model:
        raise HTTPException(status_code=500, detail="Модель не загружена")
    
    if not file.content_type.startswith('audio/'):
        raise HTTPException(status_code=400, detail="Файл должен быть аудио форматом")
    
    try:
        with tempfile.NamedTemporaryFile(delete=False, suffix=os.path.splitext(file.filename)[1]) as temp_file:
            content = await file.read()
            temp_file.write(content)
            temp_file.flush()
            
            result = model.transcribe(temp_file.name)
            
            os.unlink(temp_file.name)
            
            return TranscribeResponse(
                text=result["text"],
                language=result.get("language")
            )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Ошибка транскрибации: {str(e)}")

if __name__ == "__main__":
    uvicorn.run(app, host=HOST, port=PORT)
