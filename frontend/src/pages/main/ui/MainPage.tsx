import { useEffect, useState } from "react";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Badge,
  Box,
  Divider,
  Heading,
  HStack,
  Text,
  VStack
} from "@chakra-ui/react";
import { AudioUpload } from "@features/audio-upload/ui/AudioUpload";
import { checkHealth, type HealthResponse } from "@shared/api/whisper";
import { TranscriptionResult } from "@widgets/transcription-result/ui/TranscriptionResult";

export const MainPage = () => {
  const [transcriptionResult, setTranscriptionResult] = useState<{
    text: string;
    language?: string;
  } | null>(null);
  const [healthStatus, setHealthStatus] = useState<HealthResponse | null>(null);
  const [isHealthLoading, setIsHealthLoading] = useState(true);

  useEffect(() => {
    const checkApiHealth = async () => {
      try {
        const status = await checkHealth();
        setHealthStatus(status);
      } catch (error) {
        console.error("Ошибка проверки состояния API:", error);
      } finally {
        setIsHealthLoading(false);
      }
    };

    checkApiHealth();
  }, []);

  const handleTranscribeComplete = (result: { text: string; language?: string }) => {
    setTranscriptionResult(result);
  };

  const handleClearResult = () => {
    setTranscriptionResult(null);
  };

  return (
    <VStack spacing={8} w="full">
      {/* Заголовок */}
      <VStack spacing={4} textAlign="center">
        <Heading as="h1" size="xl" color="gray.800">
          Whisper API Service
        </Heading>
        <Text fontSize="lg" color="gray.600">
          Локальный сервис для транскрибации аудио с помощью OpenAI Whisper
        </Text>
      </VStack>

      <Divider />

      {/* Статус API */}
      <VStack spacing={3} w="full">
        <HStack justify="center" spacing={4}>
          <Text fontSize="sm" color="gray.600">
            Статус API:
          </Text>
          {isHealthLoading ? (
            <Badge colorScheme="gray">Проверка...</Badge>
          ) : healthStatus ? (
            <HStack spacing={2}>
              <Badge colorScheme={healthStatus.status === "healthy" ? "green" : "red"}>
                {healthStatus.status === "healthy" ? "Работает" : "Недоступен"}
              </Badge>
              <Badge colorScheme={healthStatus.model_loaded ? "blue" : "orange"} variant="outline">
                Модель: {healthStatus.model_loaded ? "Загружена" : "Не загружена"}
              </Badge>
            </HStack>
          ) : (
            <Badge colorScheme="red">Недоступен</Badge>
          )}
        </HStack>

        {!isHealthLoading && (!healthStatus || healthStatus.status !== "healthy") && (
          <Alert status="error" borderRadius="md" maxW="md">
            <AlertIcon />
            <Box>
              <AlertTitle>API недоступен</AlertTitle>
              <AlertDescription fontSize="sm">Убедитесь, что backend сервер запущен на localhost:8050</AlertDescription>
            </Box>
          </Alert>
        )}
      </VStack>

      <Divider />

      {/* Основной контент */}
      <VStack spacing={8} w="full">
        {!transcriptionResult ? (
          <AudioUpload onTranscribeComplete={handleTranscribeComplete} />
        ) : (
          <TranscriptionResult
            text={transcriptionResult.text}
            language={transcriptionResult.language}
            onClear={handleClearResult}
          />
        )}
      </VStack>

      {/* Инструкции */}
      <Alert status="info" borderRadius="md">
        <AlertIcon />
        <VStack align="start" spacing={1}>
          <AlertTitle fontSize="sm">Как использовать:</AlertTitle>
          <AlertDescription fontSize="xs">
            1. Убедитесь, что backend сервер запущен (cd backend && python main.py)
          </AlertDescription>
          <AlertDescription fontSize="xs">
            2. Перетащите аудиофайл в область загрузки или нажмите для выбора
          </AlertDescription>
          <AlertDescription fontSize="xs">3. Нажмите Транскрибировать и дождитесь результата</AlertDescription>
        </VStack>
      </Alert>
    </VStack>
  );
};
