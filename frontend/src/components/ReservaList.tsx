import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Stack, Text, Spinner, Button, Alert, AlertIcon } from '@chakra-ui/react';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa'; 
import ReservaCard from './ReservaCard';
import { useNavigate } from 'react-router-dom';

const ReservaList: React.FC = () => {
  const [reservas, setReservas] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReservas = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/reservas');
        if (Array.isArray(response.data)) {
          setReservas(response.data);
        } else {
          console.error('La respuesta de la API no es un array');
          setError('Error al obtener reservas');
        }
      } catch (error) {
        console.error('Error al obtener reservas', error);
        setError('Error al obtener reservas');
      } finally {
        setLoading(false);
      }
    };

    fetchReservas();
  }, []);

  const handleEdit = (id: number) => {
    navigate(`/editar-reserva/${id}`);
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:5000/api/reservas/${id}`);
      setReservas(reservas.filter(reserva => reserva.id !== id));
    } catch (error) {
      console.error('Error al eliminar la reserva', error);
      setError('Error al eliminar la reserva');
    }
  };

  if (loading) {
    return (
      <Box textAlign="center" mt={10}>
        <Spinner size="xl" color="blue.500" />
        <Text mt={4} fontSize="lg" color="gray.500">Cargando reservas...</Text>
      </Box>
    );
  }

  if (error) {
    return (
      <Alert status="error" mb={4}>
        <AlertIcon />
        {error}
      </Alert>
    );
  }

  if (!Array.isArray(reservas)) {
    return (
      <Alert status="error" mb={4}>
        <AlertIcon />
        Error: reservas no es un array
      </Alert>
    );
  }

  return (
    <Box p={5}>
      <Stack spacing={4}>
        <Button
          mb={4}
          colorScheme="blue"
          leftIcon={<FaPlus />}
          onClick={() => navigate('/crear-reserva')}
        >
          Crear Nueva Reserva
        </Button>
        <Stack spacing={4}>
          {reservas.length > 0 ? (
            reservas.map((reserva) => (
              <ReservaCard
                key={reserva.id}
                id={reserva.id}
                nombre={reserva.nombre}
                fecha={reserva.fecha}
                hora={reserva.hora}
                onEdit={() => handleEdit(reserva.id)}
                onDelete={() => handleDelete(reserva.id)}
              >
                <Button
                  colorScheme="yellow"
                  leftIcon={<FaEdit />}
                  onClick={() => handleEdit(reserva.id)}
                >
                  Editar
                </Button>
                <Button
                  colorScheme="red"
                  leftIcon={<FaTrash />}
                  onClick={() => handleDelete(reserva.id)}
                >
                  Eliminar
                </Button>
              </ReservaCard>
            ))
          ) : (
            <Text textAlign="center" color="gray.500">No hay reservas disponibles.</Text>
          )}
        </Stack>
      </Stack>
    </Box>
  );
};

export default ReservaList;
