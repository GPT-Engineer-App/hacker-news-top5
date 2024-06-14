import React, { useEffect, useState } from 'react';
import { Container, Text, VStack, Box, Link, Input, useColorMode, IconButton, Flex, Select } from "@chakra-ui/react";
import { FaMoon, FaSun } from "react-icons/fa";
import axios from 'axios';

const Index = () => {
  const [stories, setStories] = useState([]);
  const [filteredStories, setFilteredStories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [storyType, setStoryType] = useState('topstories');
  const { colorMode, toggleColorMode } = useColorMode();

  useEffect(() => {
    const fetchStories = async (type) => {
      try {
        const storiesRes = await axios.get(`https://hacker-news.firebaseio.com/v0/${type}.json`);
        const storyIds = storiesRes.data.slice(0, 5);
        const storyPromises = storyIds.map(id => axios.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`));
        const storiesData = await Promise.all(storyPromises);
        const stories = storiesData.map(res => res.data);
        setStories(stories);
        setFilteredStories(stories);
      } catch (error) {
        console.error('Error fetching stories:', error);
      }
    };

    fetchStories(storyType);
  }, [storyType]);

  useEffect(() => {
    const filtered = stories.filter(story => story.title.toLowerCase().includes(searchTerm.toLowerCase()));
    setFilteredStories(filtered);
  }, [searchTerm, stories]);

  const handleStoryTypeChange = (event) => {
    setStoryType(event.target.value);
  };

  return (
    <Container centerContent maxW="container.md" py={4}>
      <Flex justifyContent="space-between" width="100%" mb={4}>
        <Select value={storyType} onChange={handleStoryTypeChange} width="auto">
          <option value="topstories">Top Stories</option>
          <option value="newstories">New Stories</option>
          <option value="beststories">Best Stories</option>
        </Select>
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
      <VStack spacing={4} width="100%">
        {filteredStories.map(story => (
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