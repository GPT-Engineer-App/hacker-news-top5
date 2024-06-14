import React, { useEffect, useState } from 'react';
import { Container, Text, VStack, Box, Link, Input, useColorMode, IconButton, Flex, Button, Textarea, Select, HStack, useColorModeValue } from "@chakra-ui/react";
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
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState('asc');
  const [keywords, setKeywords] = useState([]);
  const [selectedKeyword, setSelectedKeyword] = useState('');
  const { colorMode, toggleColorMode } = useColorMode();
  const bgGradient = useColorModeValue("linear(to-r, newTheme.500, newTheme.700)", "linear(to-r, newTheme.200, newTheme.500)");
  const boxShadow = useColorModeValue("lg", "dark-lg");

  const storiesPerPage = 10;
  const totalStories = 50;

  useEffect(() => {
    const fetchTopStories = async () => {
      try {
        const topStoriesRes = await axios.get('https://hacker-news.firebaseio.com/v0/topstories.json');
        const topStoryIds = topStoriesRes.data.slice(0, totalStories);
        const storyPromises = topStoryIds.map(id => axios.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`));
        const storiesRes = await Promise.all(storyPromises);
        const storiesData = storiesRes.map(res => res.data);
        setStories(storiesData);
        setFilteredStories(storiesData.slice(0, storiesPerPage));
        extractKeywords(storiesData);
      } catch (error) {
        console.error('Error fetching top stories:', error);
      }
    };

    fetchTopStories();
  }, []);

  useEffect(() => {
    let filtered = stories.filter(story => 
      story.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (story.text && story.text.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    if (selectedKeyword) {
      filtered = filtered.filter(story => 
        story.title.toLowerCase().includes(selectedKeyword.toLowerCase()) ||
        (story.text && story.text.toLowerCase().includes(selectedKeyword.toLowerCase()))
      );
    }

    if (sortOrder === 'asc') {
      filtered.sort((a, b) => a.score - b.score);
    } else {
      filtered.sort((a, b) => b.score - a.score);
    }

    setFilteredStories(filtered.slice((currentPage - 1) * storiesPerPage, currentPage * storiesPerPage));
  }, [searchTerm, stories, currentPage, sortOrder, selectedKeyword]);

  const handleSpecificQuery = async () => {
    try {
      const specificQueryRes = await axios.get(`https://hacker-news.firebaseio.com/v0/item/${specificQuery}.json`);
      const specificStory = specificQueryRes.data;
      setStories(prevStories => [...prevStories, specificStory]);
      setFilteredStories(prevStories => [...prevStories, specificStory].slice((currentPage - 1) * storiesPerPage, currentPage * storiesPerPage));
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

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    setFilteredStories(stories.slice((pageNumber - 1) * storiesPerPage, pageNumber * storiesPerPage));
  };

  const extractKeywords = (stories) => {
    const keywordMap = {};
    stories.forEach(story => {
      const words = story.title.split(' ');
      words.forEach(word => {
        const lowerWord = word.toLowerCase();
        if (keywordMap[lowerWord]) {
          keywordMap[lowerWord]++;
        } else {
          keywordMap[lowerWord] = 1;
        }
      });
    });
    const sortedKeywords = Object.keys(keywordMap).sort((a, b) => keywordMap[b] - keywordMap[a]);
    setKeywords(sortedKeywords.slice(0, 10));
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
        bg={bgGradient}
        boxShadow={boxShadow}
      />
      <Flex mb={4} width="100%">
        <Input
          placeholder="Enter specific query ID..."
          value={specificQuery}
          onChange={(e) => setSpecificQuery(e.target.value)}
          mr={2}
          bg={bgGradient}
          boxShadow={boxShadow}
        />
        <Button onClick={handleSpecificQuery} bg={bgGradient} boxShadow={boxShadow}>Add to Highscore</Button>
      </Flex>
      <HStack mb={4} width="100%">
        <Select placeholder="Filter by keyword" value={selectedKeyword} onChange={(e) => setSelectedKeyword(e.target.value)} bg={bgGradient} boxShadow={boxShadow}>
          {keywords.map((keyword, index) => (
            <option key={index} value={keyword}>{keyword}</option>
          ))}
        </Select>
        <Select placeholder="Sort by" value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} bg={bgGradient} boxShadow={boxShadow}>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </Select>
      </HStack>
      <VStack spacing={4} width="100%">
        {filteredStories.map(story => (
          <Box key={story.id} p={4} borderWidth="1px" borderRadius="md" width="100%" bg={bgGradient} boxShadow={boxShadow}>
            <Text fontSize="lg" fontWeight="bold">{story.title}</Text>
            <Text>Upvotes: {story.score}</Text>
            <Link href={story.url} color="teal.500" isExternal>Read more</Link>
            <Box mt={4}>
              <Text fontWeight="bold">Comments:</Text>
              {comments[story.id] && comments[story.id].map((comment, index) => (
                <Box key={index} p={2} borderWidth="1px" borderRadius="md" mt={2} bg={bgGradient} boxShadow={boxShadow}>
                  <Text>{comment.text}</Text>
                  <Text fontSize="sm" color="gray.500">Version: {comment.version}, OS: {comment.os}</Text>
                </Box>
              ))}
              <Textarea
                placeholder="Add a comment..."
                mt={2}
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                bg={bgGradient}
                boxShadow={boxShadow}
              />
              <Select placeholder="Select version" mt={2} value={version} onChange={(e) => setVersion(e.target.value)} bg={bgGradient} boxShadow={boxShadow}>
                <option value="1.0">1.0</option>
                <option value="2.0">2.0</option>
                <option value="3.0">3.0</option>
              </Select>
              <Select placeholder="Select OS" mt={2} value={os} onChange={(e) => setOs(e.target.value)} bg={bgGradient} boxShadow={boxShadow}>
                <option value="Windows">Windows</option>
                <option value="MacOS">MacOS</option>
                <option value="Linux">Linux</option>
              </Select>
              <Button mt={2} onClick={() => handleAddComment(story.id)} bg={bgGradient} boxShadow={boxShadow}>Add Comment</Button>
            </Box>
          </Box>
        ))}
      </VStack>
      <Flex mt={4} justifyContent="center">
        {Array.from({ length: Math.ceil(totalStories / storiesPerPage) }, (_, index) => (
          <Button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            mx={1}
            colorScheme={currentPage === index + 1 ? 'teal' : 'gray'}
            bg={bgGradient}
            boxShadow={boxShadow}
          >
            {index + 1}
          </Button>
        ))}
      </Flex>
    </Container>
  );
};

export default Index;