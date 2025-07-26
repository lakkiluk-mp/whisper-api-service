# Whisper API Service

Простой веб-сервис для транскрибации аудио файлов с использованием OpenAI Whisper.

## Возможности

- 🎙️ Транскрибация аудио файлов в текст
- 🌐 Web API для интеграции
- 🖥️ Веб-интерфейс для загрузки файлов
- 📱 Поддержка множественных аудио форматов
- 🐳 Docker поддержка для простого развертывания

## Быстрый старт

### Вариант 1: Docker (рекомендуется)

**Требования:**
- Docker
- Docker Compose

**Запуск:**
```bash
# Клонируйте репозиторий
git clone <repository-url>
cd whisper-api-service

# Запустите проект
docker compose up --build
```

**Доступ к приложению:**
- Frontend: http://localhost:3050
- Backend API: http://localhost:8050

*Изменения в коде автоматически отслеживаются и обновляются без перезапуска контейнеров.*

### Вариант 2: Локальная установка

**Требования:**
- Python 3.8+
- Node.js 18+
- ffmpeg

**Установка:**

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

**Доступ к приложению:**
- Frontend: http://localhost:5173
- Backend API: http://localhost:8000

## Использование

### API Endpoints

**GET /** - Проверка статуса сервиса
**GET /health** - Проверка работоспособности сервиса и статуса модели  
**POST /transcribe/** - Транскрибация аудио файла
- Поддерживаемые форматы: wav, mp3, m4a, flac, ogg
- Максимальный размер файла: 100MB


## Технологии

- **Backend**: FastAPI, OpenAI Whisper, Uvicorn
- **Frontend**: React, TypeScript, Vite, Chakra UI
- **Контейнеризация**: Docker, Docker Compose
