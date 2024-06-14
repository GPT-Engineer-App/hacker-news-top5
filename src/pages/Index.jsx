import React, { useEffect, useState } from 'react';
import { Container, Text, VStack, Box, Link, Input, useColorMode, IconButton, Flex, Button, Textarea, Select } from "@chakra-ui/react";
import { FaMoon, FaSun } from "react-icons/fa";
import axios from 'axios';

const Index = () => {
  const [stories, setStories] = useState([]);
  const [filteredStories, setFilteredStories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [specificQuery, setSpecificQuery] = useState('');
  const [comments, setComments] = useState({});
  const [newComment, setNewComment] = useState('');
  const [version, setVersion] = useState('');
  const [os, setOs] = useState('');
  const { colorMode, toggleColorMode } = useColorMode();

  useEffect(() => {
    const fetchTopStories = async () => {
      try {
        const topStoriesRes = await axios.get('https://hacker-news.firebaseio.com/v0/topstories.json');
        const topStoryIds = topStoriesRes.data.slice(0, 5);
        const storyPromises = topStoryIds.map(id => axios.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`));
        const storiesRes = await Promise.all(storyPromises);
        const storiesData = storiesRes.map(res => res.data);
        setStories(storiesData);
        setFilteredStories(storiesData);
      } catch (error) {
        console.error('Error fetching top stories:', error);
      }
    };

    fetchTopStories();
  }, []);

  useEffect(() => {
    const filtered = stories.filter(story => 
      story.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (story.text && story.text.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    setFilteredStories(filtered);
  }, [searchTerm, stories]);

  const handleSpecificQuery = async () => {
    try {
      const specificQueryRes = await axios.get(`https://hacker-news.firebaseio.com/v0/item/${specificQuery}.json`);
      const specificStory = specificQueryRes.data;
      setStories(prevStories => [...prevStories, specificStory]);
      setFilteredStories(prevStories => [...prevStories, specificStory]);
    } catch (error) {
      console.error('Error fetching specific story:', error);
    }
  };

  const handleAddComment = (storyId) => {
    if (!newComment || !version || !os) return;

    setComments(prevComments => ({
      ...prevComments,
      [storyId]: [...(prevComments[storyId] || []), { text: newComment, version, os }]
    }));

    setNewComment('');
    setVersion('');
    setOs('');
  };

  return (
    <Container centerContent maxW="container.md" py={4}>
      <Flex justifyContent="space-between" width="100%" mb={4}>
        <Text fontSize="2xl">Hacker News Top Stories</Text>
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
      <Flex mb={4} width="100%">
        <Input
          placeholder="Enter specific query ID..."
          value={specificQuery}
          onChange={(e) => setSpecificQuery(e.target.value)}
          mr={2}
        />
        <Button onClick={handleSpecificQuery}>Add to Highscore</Button>
      </Flex>
      <VStack spacing={4} width="100%">
        {filteredStories.map(story => (
          <Box key={story.id} p={4} borderWidth="1px" borderRadius="md" width="100%">
            <Text fontSize="lg" fontWeight="bold">{story.title}</Text>
            <Text>Upvotes: {story.score}</Text>
            <Link href={story.url} color="teal.500" isExternal>Read more</Link>
            <Box mt={4}>
              <Text fontWeight="bold">Comments:</Text>
              {comments[story.id] && comments[story.id].map((comment, index) => (
                <Box key={index} p={2} borderWidth="1px" borderRadius="md" mt={2}>
                  <Text>{comment.text}</Text>
                  <Text fontSize="sm" color="gray.500">Version: {comment.version}, OS: {comment.os}</Text>
                </Box>
              ))}
              <Textarea
                placeholder="Add a comment..."
                mt={2}
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />
              <Select placeholder="Select version" mt={2} value={version} onChange={(e) => setVersion(e.target.value)}>
                <option value="1.0">1.0</option>
                <option value="2.0">2.0</option>
                <option value="3.0">3.0</option>
              </Select>
              <Select placeholder="Select OS" mt={2} value={os} onChange={(e) => setOs(e.target.value)}>
                <option value="Windows">Windows</option>
                <option value="MacOS">MacOS</option>
                <option value="Linux">Linux</option>
              </Select>
              <Button mt={2} onClick={() => handleAddComment(story.id)}>Add Comment</Button>
            </Box>
          </Box>
        ))}
      </VStack>
    </Container>
  );
};

export default Index;