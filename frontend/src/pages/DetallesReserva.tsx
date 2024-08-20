import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const DetallesReserva: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  interface Reserva {
    nombre: string;
    fecha: string;
    hora: string;

  }
  
  const [reserva, setReserva] = useState<Reserva | null>(null);

  useEffect(() => {
    const fetchReserva = async () => {
      try {
        const response = await axios.get(`/api/reservas/${id}`);
        setReserva(response.data);
      } catch (error) {
        console.error('Error al obtener los detalles de la reserva', error);
      }
    };

    fetchReserva();
  }, [id]);

  if (!reserva) {
    return <p>Cargando...</p>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Detalles de la Reserva</h1>
      <p><strong>Nombre:</strong> {reserva.nombre}</p>
      <p><strong>Fecha:</strong> {reserva.fecha}</p>
      <p><strong>Hora:</strong> {reserva.hora}</p>
    </div>
  );
};

export default DetallesReserva;
