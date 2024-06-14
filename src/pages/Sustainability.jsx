import React from 'react';
import { Container, Text, VStack, Box, Link, useColorMode, IconButton, Flex, useColorModeValue } from "@chakra-ui/react";
import { FaMoon, FaSun } from "react-icons/fa";

const Sustainability = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const bgGradient = useColorModeValue("linear(to-r, newTheme.500, newTheme.700)", "linear(to-r, newTheme.200, newTheme.500)");
  const boxShadow = useColorModeValue("lg", "dark-lg");

  return (
    <Container centerContent maxW="container.md" py={4}>
      <Flex justifyContent="space-between" width="100%" mb={4}>
        <Text fontSize="2xl">Sustainability Initiatives</Text>
        <IconButton
          aria-label="Toggle dark mode"
          icon={colorMode === 'light' ? <FaMoon /> : <FaSun />}
          onClick={toggleColorMode}
        />
      </Flex>
      <VStack spacing={4} width="100%">
        <Box p={4} borderWidth="1px" borderRadius="md" width="100%" bg={bgGradient} boxShadow={boxShadow}>
          <Text fontSize="lg" fontWeight="bold">Initiative 1</Text>
          <Text>Description of sustainability initiative 1.</Text>
          <Link href="#" color="teal.500" isExternal>Read more</Link>
        </Box>
        <Box p={4} borderWidth="1px" borderRadius="md" width="100%" bg={bgGradient} boxShadow={boxShadow}>
          <Text fontSize="lg" fontWeight="bold">Initiative 2</Text>
          <Text>Description of sustainability initiative 2.</Text>
          <Link href="#" color="teal.500" isExternal>Read more</Link>
        </Box>
      </VStack>
    </Container>
  );
};

export default Sustainability;