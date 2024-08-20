import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Flex, Heading, Link as ChakraLink } from '@chakra-ui/react';

const Navbar: React.FC = () => {
  return (
    <Box bg="gray.800" p={4}>
      <Flex align="center" justify="space-between">
        <Heading size="lg" color="white">
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>Inicio</Link>
        </Heading>
        <Flex gap={6}>
          <ChakraLink as={Link} to="/" color="white" _hover={{ textDecoration: 'underline' }}>Inicio</ChakraLink>
          <ChakraLink as={Link} to="/estadisticas" color="white" _hover={{ textDecoration: 'underline' }}>Estadisticas</ChakraLink>
          <ChakraLink as={Link} to="/reservas" color="white" _hover={{ textDecoration: 'underline' }}>Reservas</ChakraLink>
          <ChakraLink as={Link} to="/crear-reserva" color="white" _hover={{ textDecoration: 'underline' }}>Crear Reserva</ChakraLink>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Navbar;
