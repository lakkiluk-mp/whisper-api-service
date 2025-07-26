import { useState } from "react";
import { Badge, Box, Button, Divider, HStack, Text, Textarea, useToast, VStack } from "@chakra-ui/react";

interface TranscriptionResultProps {
  text: string;
  language?: string;
  onClear: () => void;
}

export const TranscriptionResult = ({ text, language, onClear }: TranscriptionResultProps) => {
  const [editedText, setEditedText] = useState(text);
  const toast = useToast();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(editedText);
      toast({
        title: "Скопировано",
        description: "Текст скопирован в буфер обмена",
        status: "success",
        duration: 2000,
        isClosable: true
      });
    } catch {
      toast({
        title: "Ошибка",
        description: "Не удалось скопировать текст",
        status: "error",
        duration: 2000,
        isClosable: true
      });
    }
  };

  const downloadText = () => {
    const blob = new Blob([editedText], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `transcription_${new Date().toISOString().slice(0, 19)}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <VStack spacing={4} w="full">
      <Box w="full" bg="white" borderRadius="lg" p={6} shadow="sm" border="1px" borderColor="gray.200">
        <VStack spacing={4} align="stretch">
          <HStack justify="space-between" align="center">
            <Text fontSize="lg" fontWeight="semibold" color="gray.700">
              Результат транскрибации
            </Text>
            {language && (
              <Badge colorScheme="brand" fontSize="sm">
                Язык: {language.toUpperCase()}
              </Badge>
            )}
          </HStack>

          <Divider />

          <Text fontSize="sm" color="gray.600">
            Вы можете редактировать текст ниже:
          </Text>

          <Textarea
            value={editedText}
            onChange={e => setEditedText(e.target.value)}
            minH="200px"
            resize="vertical"
            placeholder="Результат транскрибации появится здесь..."
            fontSize="md"
            lineHeight="1.6"
          />

          <Text fontSize="xs" color="gray.500">
            Символов: {editedText.length}
          </Text>

          <HStack spacing={3}>
            <Button onClick={handleCopy} variant="outline" size="sm">
              Копировать
            </Button>
            <Button onClick={downloadText} variant="outline" size="sm">
              Скачать как TXT
            </Button>
            <Button onClick={onClear} variant="ghost" size="sm" colorScheme="red">
              Очистить
            </Button>
          </HStack>
        </VStack>
      </Box>
    </VStack>
  );
};
