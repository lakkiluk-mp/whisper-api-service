# Whisper API Service

Простой веб-сервис для транскрибации аудио файлов с использованием OpenAI Whisper.

## Возможности

- 🎙️ Транскрибация аудио файлов в текст
- 🌐 Web API для интеграции
- 🖥️ Веб-интерфейс для загрузки файлов
- 📱 Поддержка множественных аудио форматов

## Быстрый старт

### Требования

- Python 3.8+
- ffmpeg

### Установка

1. Клонируйте репозиторий:
```bash
git clone <repository-url>
cd whisper-api-service
```

2. Установите зависимости backend:
```bash
cd backend
pip install -r requirements.txt
```

3. Запустите сервер:
```bash
python main.py
```

4. Установите зависимости frontend:
```bash
cd ../frontend
npm install
npm run dev
```

## Использование

### API

**POST /transcribe/**
- Загрузите аудио файл для транскрибации
- Поддерживаемые форматы: wav, mp3, m4a, flac, ogg

### Веб-интерфейс

Откройте `http://localhost:3000` в браузере для загрузки файлов через веб-интерфейс.

## Технологии


- **Backend**: FastAPI, OpenAI Whisper, Uvicorn
- **Frontend**: React, TypeScript, Vite
