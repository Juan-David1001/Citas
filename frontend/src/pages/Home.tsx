import React from 'react';
import { Box, Container, Heading, Text, Button, Stack, SimpleGrid, Card, CardBody, Icon } from '@chakra-ui/react';
import { FaCalendarAlt, FaUsers, FaCog, FaChartBar, FaInfoCircle, FaPhone, FaStar, FaAddressCard } from 'react-icons/fa';

const Home: React.FC = () => {
  return (
    <Box minHeight="100vh" display="flex" flexDirection="column">
      <Container maxW="container.xl" flex="1" p={4}>
        <Stack spacing={8}>
          <Box textAlign="center">
            <Heading as="h1" size="2xl">Bienvenido a la Aplicación de Reservas</Heading>
            <Text fontSize="lg" mt={4}>Organiza y gestiona tus reservas de manera eficiente y sin complicaciones.</Text>
          </Box>

          <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={8}>
            <Card>
              <CardBody>
                <Icon as={FaCalendarAlt} boxSize="50px" color="blue.500" />
                <Heading size="md" mt={4}>Gestiona tus Reservas</Heading>
                <Text mt={2}>Añade, edita y elimina reservas de manera sencilla y rápida.</Text>
              </CardBody>
            </Card>
            <Card>
              <CardBody>
                <Icon as={FaUsers} boxSize="50px" color="green.500" />
                <Heading size="md" mt={4}>Administración de Usuarios</Heading>
                <Text mt={2}>Gestiona usuarios y asigna permisos para una administración eficiente.</Text>
              </CardBody>
            </Card>
            <Card>
              <CardBody>
                <Icon as={FaCog} boxSize="50px" color="orange.500" />
                <Heading size="md" mt={4}>Configuraciones</Heading>
                <Text mt={2}>Personaliza la aplicación según tus necesidades.</Text>
              </CardBody>
            </Card>
            <Card>
              <CardBody>
                <Icon as={FaChartBar} boxSize="50px" color="purple.500" />
                <Heading size="md" mt={4}>Estadísticas</Heading>
                <Text mt={2}>Obtén informes detallados sobre tus reservas y usuarios.</Text>
              </CardBody>
            </Card>
          </SimpleGrid>

          <Box textAlign="center">
            <Button colorScheme="teal" size="lg" mt={8}>Empieza Ahora</Button>
          </Box>

          <Box textAlign="center" mt={8}>
            <Heading size="lg">Características Principales</Heading>
            <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={8} mt={4}>
              <Box>
                <Icon as={FaInfoCircle} boxSize="40px" color="teal.500" />
                <Heading size="sm" mt={2}>Información Detallada</Heading>
                <Text mt={2}>Accede a la información completa de cada reserva.</Text>
              </Box>
              <Box>
                <Icon as={FaPhone} boxSize="40px" color="teal.500" />
                <Heading size="sm" mt={2}>Soporte</Heading>
                <Text mt={2}>Recibe asistencia personalizada cuando la necesites.</Text>
              </Box>
              <Box>
                <Icon as={FaStar} boxSize="40px" color="teal.500" />
                <Heading size="sm" mt={2}>Calificaciones</Heading>
                <Text mt={2}>Evalúa y califica el servicio para mejorarlo continuamente.</Text>
              </Box>
              <Box>
                <Icon as={FaAddressCard} boxSize="40px" color="teal.500" />
                <Heading size="sm" mt={2}>Perfil de Usuario</Heading>
                <Text mt={2}>Gestiona y actualiza tu perfil de usuario fácilmente.</Text>
              </Box>
            </SimpleGrid>
          </Box>
        </Stack>
      </Container>

      {/* Footer */}
      <Box bg="gray.800" color="white" py={4} textAlign="center">
        <Text>&copy; {new Date().getFullYear()} Tu Aplicación de Reservas. Todos los derechos reservados.</Text>
      </Box>
    </Box>
  );
};

export default Home;
