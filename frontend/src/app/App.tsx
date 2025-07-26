import { Box, Container } from "@chakra-ui/react";
import { MainPage } from "@pages/main";

export const App = () => {
  return (
    <Box minH="100vh" bg="gray.50">
      <Container maxW="4xl" py={8}>
        <MainPage />
      </Container>
    </Box>
  );
};
