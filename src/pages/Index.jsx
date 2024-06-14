import React, { useEffect, useState } from 'react';
import { Container, Text, VStack, Box, Link, Input, useColorMode, IconButton, Flex, Select, Button } from "@chakra-ui/react";
import { FaMoon, FaSun } from "react-icons/fa";
import { analyzeQuery } from '../utils/queryAnalysis';
import { identifyThemes } from '../utils/themeIdentification';
import { fetchNews } from '../utils/newsIntegration';
import { scoreAndSortArticles } from '../utils/relevanceScoring';
import { provideMetaContext } from '../utils/metaContextualLayer';
import { submitFeedback } from '../utils/userFeedback';

const Index = () => {
  const [stories, setStories] = useState([]);
  const [filteredStories, setFilteredStories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [context, setContext] = useState('topstories');
  const handleFeedback = (articleId, rating) => {
    submitFeedback(articleId, rating);
  };
  const { colorMode, toggleColorMode } = useColorMode();

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const themes = analyzeQuery(searchTerm);
        const matchedThemes = identifyThemes(themes);
        const articles = await fetchNews(matchedThemes);
        const sortedArticles = scoreAndSortArticles(articles, searchTerm);
        const metaContextArticles = provideMetaContext(sortedArticles);
        const stories = metaContextArticles;
        setStories(stories);
        setFilteredStories(stories);
      } catch (error) {
        console.error('Error fetching stories:', error);
      }
    };

    fetchStories();
  }, [context, searchTerm]);

  useEffect(() => {
    const filtered = stories.filter(story => story.title.toLowerCase().includes(searchTerm.toLowerCase()));
    setFilteredStories(filtered);
  }, [searchTerm, stories]);

  return (
    <Container centerContent maxW="container.md" py={4}>
      <Flex justifyContent="space-between" width="100%" mb={4}>
        <Select value={context} onChange={(e) => setContext(e.target.value)} width="auto">
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
            <Text>{story.summary}</Text>
            <Link href={story.url} color="teal.500" isExternal>Read more</Link>
            <Button onClick={() => handleFeedback(story.id, 1)}>👍</Button>
            <Button onClick={() => handleFeedback(story.id, -1)}>👎</Button>
          </Box>
        ))}
      </VStack>
    </Container>
  );
};

export default Index;