import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import {
  Box,
  Text,
  VStack,
  Button,
  Progress,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react'
import { transcribeAudio } from '@shared/api/whisper'

interface AudioUploadProps {
  onTranscribeComplete: (result: { text: string; language?: string }) => void
}

export const AudioUpload = ({ onTranscribeComplete }: AudioUploadProps) => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setSelectedFile(acceptedFiles[0])
      setError(null)
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'audio/*': ['.mp3', '.wav', '.m4a', '.flac', '.ogg', '.wma', '.aac']
    },
    multiple: false,
    maxSize: 100 * 1024 * 1024, // 100MB
  })

  const handleTranscribe = async () => {
    if (!selectedFile) return

    setIsLoading(true)
    setError(null)

    try {
      const result = await transcribeAudio(selectedFile)
      onTranscribeComplete(result)
      setSelectedFile(null)
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Произошла ошибка при транскрибации')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <VStack spacing={4} w="full">
      <Box
        {...getRootProps()}
        border="2px dashed"
        borderColor={isDragActive ? 'brand.500' : 'gray.300'}
        borderRadius="lg"
        p={8}
        w="full"
        textAlign="center"
        cursor="pointer"
        transition="all 0.2s"
        _hover={{
          borderColor: 'brand.400',
          bg: 'brand.50',
        }}
        bg={isDragActive ? 'brand.50' : 'white'}
      >
        <input {...getInputProps()} />
        <VStack spacing={3}>
          <Text fontSize="xl" fontWeight="semibold" color="gray.700">
            {isDragActive
              ? 'Отпустите файл здесь'
              : 'Перетащите аудиофайл сюда или нажмите для выбора'}
          </Text>
          <Text fontSize="sm" color="gray.500">
            Поддерживаемые форматы: MP3, WAV, M4A, FLAC, OGG, WMA, AAC
          </Text>
          <Text fontSize="sm" color="gray.500">
            Максимальный размер: 100MB
          </Text>
        </VStack>
      </Box>

      {selectedFile && (
        <Alert status="info" borderRadius="md">
          <AlertIcon />
          <Box>
            <AlertTitle>Файл выбран:</AlertTitle>
            <AlertDescription>
              {selectedFile.name} ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
            </AlertDescription>
          </Box>
        </Alert>
      )}

      {selectedFile && (
        <Button
          onClick={handleTranscribe}
          isLoading={isLoading}
          loadingText="Транскрибация..."
          size="lg"
          w="full"
        >
          Транскрибировать
        </Button>
      )}

      {isLoading && (
        <Box w="full">
          <Text fontSize="sm" color="gray.600" mb={2}>
            Обработка файла... Это может занять несколько минут
          </Text>
          <Progress size="sm" colorScheme="brand" isIndeterminate />
        </Box>
      )}

      {error && (
        <Alert status="error" borderRadius="md">
          <AlertIcon />
          <Box>
            <AlertTitle>Ошибка:</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Box>
        </Alert>
      )}
    </VStack>
  )
}