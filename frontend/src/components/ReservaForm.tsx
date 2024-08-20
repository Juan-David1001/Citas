import React, { useState } from 'react';
import axios from 'axios';
import { Box, Button, FormControl, FormLabel, Input, useToast, VStack, HStack, FormErrorMessage, Icon } from '@chakra-ui/react';
import TimePicker from 'react-time-picker';
import 'react-time-picker/dist/TimePicker.css'; 
import { FaCalendarAlt, FaClock } from 'react-icons/fa'; 

const ReservaForm: React.FC = () => {
  const [nombre, setNombre] = useState('');
  const [fecha, setFecha] = useState('');
  const [hora, setHora] = useState('10:00'); 
  const [nombreError, setNombreError] = useState(false);
  const [fechaError, setFechaError] = useState(false);
  const toast = useToast();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();


    setNombreError(!nombre.trim());
    setFechaError(!fecha.trim());

    if (!nombre.trim() || !fecha.trim()) return;

    try {
      await axios.post('http://localhost:5000/api/reservas', { nombre, fecha, hora });
     
      setNombre('');
      setFecha('');
      setHora('10:00');

      toast({
        title: 'Reserva creada.',
        description: "La reserva ha sido creada exitosamente.",
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Error al crear la reserva', error);

      toast({
        title: 'Error.',
        description: "No se pudo crear la reserva. Inténtalo de nuevo.",
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box p={6} maxW="md" mx="auto" bg="white" borderRadius="md" boxShadow="lg">
      <form onSubmit={handleSubmit}>
        <VStack spacing={4} align="stretch">
          <FormControl id="nombre" isInvalid={nombreError}>
            <FormLabel>Nombre</FormLabel>
            <HStack>
              <Icon as={FaCalendarAlt} w={6} h={6} color="blue.500" />
              <Input
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Ingrese su nombre"
                borderColor="gray.300"
                _placeholder={{ color: 'gray.500' }}
              />
            </HStack>
            {nombreError && <FormErrorMessage>Este campo es obligatorio.</FormErrorMessage>}
          </FormControl>
          <FormControl id="fecha" isInvalid={fechaError}>
            <FormLabel>Fecha</FormLabel>
            <HStack>
              <Icon as={FaCalendarAlt} w={6} h={6} color="blue.500" />
              <Input
                type="date"
                value={fecha}
                onChange={(e) => setFecha(e.target.value)}
                placeholder="Seleccione una fecha"
                borderColor="gray.300"
              />
            </HStack>
            {fechaError && <FormErrorMessage>Este campo es obligatorio.</FormErrorMessage>}
          </FormControl>
          <FormControl id="hora">
            <FormLabel>Hora</FormLabel>
            <HStack>
              <Icon as={FaClock} w={6} h={6} color="blue.500" />
              <TimePicker
                value={hora}
                onChange={(value) => setHora(value || '')} 
                disableClock
                className="react-time-picker"
              />
            </HStack>
          </FormControl>
          <Button colorScheme="blue" type="submit" mt={4}>
            Crear Reserva
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default ReservaForm;
