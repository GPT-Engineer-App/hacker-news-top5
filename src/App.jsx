import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Index from "./pages/Index.jsx";
import { useState } from "react";
import { Box, IconButton, Drawer, DrawerBody, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton, useDisclosure, VStack, Link } from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";

function App() {
  const { isOpen, onOpen, onClose } = useDisclosure();
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
                <Link href="/context1">Context 1</Link>
                <Link href="/context2">Context 2</Link>
                <Link href="/context3">Context 3</Link>
              </VStack>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
        <Routes>
          <Route exact path="/" element={<Index />} />
          <Route path="/context1" element={<div>Context 1</div>} />
          <Route path="/context2" element={<div>Context 2</div>} />
          <Route path="/context3" element={<div>Context 3</div>} />
        </Routes>
      </Box>
    </Router>
  );
}

export default App;