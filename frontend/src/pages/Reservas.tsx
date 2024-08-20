import React from 'react';
import ReservaList from '../components/ReservaList';

const Reservas: React.FC = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Lista de Reservas</h1>
      <ReservaList  />
    </div>
  );
};

export default Reservas;
