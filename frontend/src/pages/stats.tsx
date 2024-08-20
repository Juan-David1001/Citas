import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Container, Heading, Stack, Text, SimpleGrid } from '@chakra-ui/react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell } from 'recharts';
import { FaClock, FaCalendarDay } from 'react-icons/fa';


const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

interface Reserva {
  id: number;
  nombre: string;
  fecha: string;
  hora: string;
}

const Estadisticas: React.FC = () => {
  const [reservas, setReservas] = useState<Reserva[]>([]);
  const [estadisticasPorFecha, setEstadisticasPorFecha] = useState<{ [key: string]: number }>({});
  const [estadisticasPorHora, setEstadisticasPorHora] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/reservas');
        setReservas(response.data);
        calculateStatistics(response.data);
      } catch (error) {
        console.error('Error al obtener reservas', error);
      }
    };

    fetchData();
  }, []);

  const calculateStatistics = (data: Reserva[]) => {
    // Estadísticas por fecha
    const reservasPorFecha = data.reduce((acc, reserva) => {
      const fecha = new Date(reserva.fecha).toLocaleDateString();
      acc[fecha] = (acc[fecha] || 0) + 1;
      return acc;
    }, {} as { [key: string]: number });

    // Estadísticas por hora
    const reservasPorHora = data.reduce((acc, reserva) => {
      const hora = reserva.hora;
      acc[hora] = (acc[hora] || 0) + 1;
      return acc;
    }, {} as { [key: string]: number });

    setEstadisticasPorFecha(reservasPorFecha);
    setEstadisticasPorHora(reservasPorHora);
  };

  const dataPorFecha = Object.keys(estadisticasPorFecha).map(fecha => ({
    name: fecha,
    reservas: estadisticasPorFecha[fecha],
  }));

  const dataPorHora = Object.keys(estadisticasPorHora).map(hora => ({
    name: hora,
    reservas: estadisticasPorHora[hora],
  }));


  const pieColors = dataPorHora.map(() => getRandomColor());

  return (
    <Box minHeight="100vh" p={4} bg="gray.50">
      <Container maxW="container.lg" p={4}>
        <Stack spacing={6}>
          <Heading as="h1" size="2xl">Estadísticas de Reservas</Heading>

          <SimpleGrid columns={1} spacing={6}>
            
            <Box p={6} bg="white" borderRadius="md" boxShadow="md" overflowX="auto">
              <Heading size="md" mb={4}>Reservas por Fecha</Heading>
              <LineChart width={1200} height={400} data={dataPorFecha}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="reservas" stroke="#8884d8" strokeWidth={4} dot={false} />
              </LineChart>
            </Box>

        
            <Box p={6} bg="white" borderRadius="md" boxShadow="md">
              <Heading size="md" mb={4}>Distribución de Reservas por Hora</Heading>
              <PieChart width={1200} height={400}>
                <Pie
                  data={dataPorHora}
                  dataKey="reservas"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={150}
                  label
                >
                  {dataPorHora.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={pieColors[index]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </Box>
          </SimpleGrid>


          <Box p={6} bg="white" borderRadius="md" boxShadow="md">
            <Heading size="md" mb={4}>Resumen de Estadísticas</Heading>
            <Text fontSize="lg" mb={2}>
              <FaCalendarDay /> Total de Reservas: {reservas.length || 0}
            </Text>
            <Text fontSize="lg">
              <FaClock /> Hora con más Reservas: {Object.keys(estadisticasPorHora).reduce((a, b) => estadisticasPorHora[a] > estadisticasPorHora[b] ? a : b, '') || 'No disponible'}
            </Text>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
};

export default Estadisticas;
