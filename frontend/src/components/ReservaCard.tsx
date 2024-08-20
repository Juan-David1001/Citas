import React from 'react';
import { Box, Button, Text } from '@chakra-ui/react';

interface ReservaCardProps {
  id: number;
  nombre: string;
  fecha: string;
  hora: string;
  onEdit: () => void;
  onDelete: () => void;
}

const ReservaCard: React.FC<ReservaCardProps> = ({ nombre, fecha, hora, onEdit, onDelete }) => {
  return (
    <Box 
      p={4} 
      borderWidth={1} 
      borderRadius="md" 
      bg="white" 
      boxShadow="md" 
      mb={4}
    >
      <Text fontSize="xl" fontWeight="bold" mb={2}>
        {nombre}
      </Text>
      <Text color="gray.700">Fecha: {fecha}</Text>
      <Text color="gray.700">Hora: {hora}</Text>
      <Box mt={4} display="flex" >
        <Button 
          onClick={onEdit} 
          colorScheme="yellow" 
          mr={2}
        >
          Editar
        </Button>
        <Button 
          onClick={onDelete} 
          colorScheme="red"
        >
          Eliminar
        </Button>
      </Box>
    </Box>
  );
};

export default ReservaCard;
