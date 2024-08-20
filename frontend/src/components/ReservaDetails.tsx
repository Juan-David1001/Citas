import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Box, Heading, Text, Spinner, Alert, AlertIcon } from '@chakra-ui/react';

const ReservaDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  
  interface Reserva {
    nombre: string;
    fecha: string;
    hora: string;
  }

  const [reserva, setReserva] = useState<Reserva | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReserva = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/reservas/${id}`);
        setReserva(response.data);
      } catch (error) {
        console.error('Error al obtener los detalles de la reserva', error);
        setError('Error al obtener los detalles de la reserva');
      } finally {
        setLoading(false);
      }
    };

    fetchReserva();
  }, [id]);

  if (loading) {
    return (
      <Box p={4} textAlign="center">
        <Spinner size="xl" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box p={4}>
        <Alert status="error">
          <AlertIcon />
          {error}
        </Alert>
      </Box>
    );
  }

  if (!reserva) {
    return <Text p={4}>No se encontraron detalles para esta reserva.</Text>;
  }

  return (
    <Box p={4} borderWidth={1} borderRadius="md" boxShadow="md" bg="white">
      <Heading mb={4} fontSize="2xl">{reserva.nombre}</Heading>
      <Text fontSize="lg" mb={2}><strong>Fecha:</strong> {reserva.fecha}</Text>
      <Text fontSize="lg"><strong>Hora:</strong> {reserva.hora}</Text>
    </Box>
  );
};

export default ReservaDetails;
