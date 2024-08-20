import React from 'react';
import { Box, Container, Heading, Stack, Text, Icon } from '@chakra-ui/react';
import { FaCalendarPlus, FaInfoCircle } from 'react-icons/fa'; 
import ReservaForm from '../components/ReservaForm';

const CrearReserva: React.FC = () => {
  return (
    <Box minHeight="100vh" display="flex" flexDirection="column">
      <Container maxW="container.md" flex="1" p={4}>
        <Stack spacing={8} align="center">
          <Heading as="h1" size="2xl" textAlign="center" mb={4}>
            <Icon as={FaCalendarPlus} w={8} h={8} color="blue.500" mr={2} />
            Crear Nueva Reserva
          </Heading>
          <Text fontSize="lg" textAlign="center" mb={6}>
            <Icon as={FaInfoCircle} w={6} h={6} color="gray.500" mr={2} />
            Completa el siguiente formulario para crear una nueva reserva. Asegúrate de proporcionar todos los detalles necesarios.
          </Text>
          <Box bg="white" p={6} borderRadius="md" boxShadow="md">
            <ReservaForm />
          </Box>
        </Stack>
      </Container>


      <Box bg="gray.800" color="white" py={4} textAlign="center">
        <Text>&copy; {new Date().getFullYear()} Tu Aplicación de Reservas. Todos los derechos reservados.</Text>
      </Box>
    </Box>
  );
};

export default CrearReserva;
