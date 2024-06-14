import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Index from "./pages/Index.jsx";
import { useState } from "react";
import Sustainability from './pages/Sustainability.jsx';
import { Box, IconButton, Drawer, DrawerBody, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton, useDisclosure, VStack, Link } from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";

function App() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [context, setContext] = useState('hacker-news');
  const [placement, setPlacement] = useState("left");

  return (
    <Router>
      <Box>
        <IconButton
          icon={<HamburgerIcon />}
          onClick={onOpen}
          variant="outline"
          aria-label="Open Menu"
          m={4}
        />
        <Drawer placement={placement} onClose={onClose} isOpen={isOpen}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Navigation</DrawerHeader>
            <DrawerBody>
              <VStack align="start">
                <Link href="/">Home</Link>
                <Link href="#" onClick={() => setContext('hacker-news')}>Hacker News</Link>
                <Link href="#" onClick={() => setContext('sustainability')}>Sustainability Initiatives</Link>
              </VStack>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
        <Routes>
          {context === 'hacker-news' && <Route exact path="/" element={<Index />} />}
          {context === 'sustainability' && <Route exact path="/" element={<Sustainability />} />}
        </Routes>
      </Box>
    </Router>
  );
}

export default App;