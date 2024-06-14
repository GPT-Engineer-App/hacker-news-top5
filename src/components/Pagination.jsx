import React from 'react';
import { Button, ButtonGroup } from "@chakra-ui/react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pages = [];

  for (let i = 1; i <= totalPages; i++) {
    pages.push(
      <Button
        key={i}
        onClick={() => onPageChange(i)}
        isActive={i === currentPage}
      >
        {i}
      </Button>
    );
  }

  return (
    <ButtonGroup variant="outline" spacing="2" mt="4">
      {pages}
    </ButtonGroup>
  );
};

export default Pagination;