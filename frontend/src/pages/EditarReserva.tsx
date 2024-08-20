import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Button, FormControl, FormLabel, Input, Heading, Spinner } from '@chakra-ui/react';

const EditarReserva: React.FC = () => {
  const [reserva, setReserva] = useState<{ nombre: string; fecha: string; hora: string } | null>(null);
  const [nombre, setNombre] = useState<string>('');
  const [fecha, setFecha] = useState<string>('');
  const [hora, setHora] = useState<string>('');
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReserva = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/reservas/${id}`);
        setReserva(response.data);
        if (response.data) {
          setNombre(response.data.nombre || '');
          setFecha(response.data.fecha || '');
          setHora(response.data.hora || '');
        }
      } catch (error) {
        console.error('Error al obtener la reserva', error);
      }
    };

    fetchReserva();
  }, [id]);

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/reservas/${id}`, { nombre, fecha, hora });
      navigate('/reservas');
    } catch (error) {
      console.error('Error al actualizar la reserva', error);
    }
  };

  if (!reserva) {
    return <Spinner size="xl" />;
  }

  return (
    <Box p={4}>
      <Heading mb={4}>Editar Reserva</Heading>
      <form onSubmit={handleUpdate}>
        <FormControl mb={4} isRequired>
          <FormLabel htmlFor="nombre">Nombre:</FormLabel>
          <Input
            type="text"
            id="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Nombre de la reserva"
          />
        </FormControl>
        <FormControl mb={4} isRequired>
          <FormLabel htmlFor="fecha">Fecha:</FormLabel>
          <Input
            type="date"
            id="fecha"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
          />
        </FormControl>
        <FormControl mb={4} isRequired>
          <FormLabel htmlFor="hora">Hora:</FormLabel>
          <Input
            type="time"
            id="hora"
            value={hora}
            onChange={(e) => setHora(e.target.value)}
          />
        </FormControl>
        <Button
          type="submit"
          colorScheme="blue"
          size="lg"
        >
          Actualizar Reserva
        </Button>
      </form>
    </Box>
  );
};

export default EditarReserva;
