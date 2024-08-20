import React from 'react';
import { Box, Text } from '@chakra-ui/react';

const Footer: React.FC = () => {
  return (
    <Box
      as="footer"
      bg="gray.800"
      p={4}
      color="white"
      textAlign="center"
      position="relative"
      bottom={0}
      width="100%"
    >
      <Text>&copy; {new Date().getFullYear()} Mi Aplicación de Reservas</Text>
    </Box>
  );
};

export default Footer;
