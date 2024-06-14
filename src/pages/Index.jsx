import React, { useEffect, useState } from 'react';
import { Container, Text, VStack, Box, Link, useColorMode, IconButton, Flex } from "@chakra-ui/react";
import { FaMoon, FaSun } from "react-icons/fa";
import { fetchTopStories } from '../utils/newsIntegration';

const Index = () => {
  const [stories, setStories] = useState([]);
  const { colorMode, toggleColorMode } = useColorMode();

  const fetchStories = async () => {
    try {
      const topStories = await fetchTopStories();
      setStories(topStories);
    } catch (error) {
      console.error('Error fetching stories:', error);
    }
  };

  useEffect(() => {
    fetchStories();
  }, []);

  return (
    <Container centerContent maxW="container.md" py={4}>
      <Flex justifyContent="space-between" width="100%" mb={4}>
        <IconButton
          aria-label="Toggle dark mode"
          icon={colorMode === 'light' ? <FaMoon /> : <FaSun />}
          onClick={toggleColorMode}
        />
      </Flex>
      <VStack spacing={4} width="100%" overflowY="auto" maxHeight="80vh">
        {stories.map(story => (
          <Box key={story.id} p={4} borderWidth="1px" borderRadius="md" width="100%">
            <Text fontSize="lg" fontWeight="bold">{story.title}</Text>
            <Text>Upvotes: {story.score}</Text>
            <Link href={story.url} color="teal.500" isExternal>Read more</Link>
          </Box>
        ))}
      </VStack>
    </Container>
  );
};

export default Index;