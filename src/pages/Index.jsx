import React, { useEffect, useState } from 'react';
import { Container, Text, VStack, Box, Link, Input, useColorMode, IconButton, Flex, Button } from "@chakra-ui/react";
import { FaMoon, FaSun } from "react-icons/fa";
import { fetchTopStories } from '../utils/hackerNewsIntegration';

const Index = () => {
  const [stories, setStories] = useState([]);
  
  const [searchTerm, setSearchTerm] = useState('');
  
  const [currentPage, setCurrentPage] = useState(1);
  const storiesPerPage = 5;
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

  const filteredStories = stories.filter(story => story.title.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <Container centerContent maxW="container.md" py={4}>
      <Flex justifyContent="space-between" width="100%" mb={4}>
        
        <IconButton
          aria-label="Toggle dark mode"
          icon={colorMode === 'light' ? <FaMoon /> : <FaSun />}
          onClick={toggleColorMode}
        />
      </Flex>
      <Input
        placeholder="Search stories..."
        mb={4}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <VStack spacing={4} width="100%" overflowY="auto" maxHeight="60vh">
        {filteredStories.slice((currentPage - 1) * storiesPerPage, currentPage * storiesPerPage).map(story => (
          <Box key={story.id} p={4} borderWidth="1px" borderRadius="md" width="100%">
            <Text fontSize="lg" fontWeight="bold">{story.title}</Text>
            <Text>Upvotes: {story.score}</Text>
            <Link href={story.url} color="teal.500" isExternal>Read more</Link>
          </Box>
        ))}
      </VStack>
      <Flex justifyContent="center" mt={4}>
        {Array.from({ length: Math.ceil(filteredStories.length / storiesPerPage) }, (_, i) => (
          <Button key={i + 1} onClick={() => setCurrentPage(i + 1)} isDisabled={currentPage === i + 1} mx={1}>
            {i + 1}
          </Button>
        ))}
      </Flex>
    </Container>
  );
};

export default Index;