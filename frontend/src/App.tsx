import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Reservas from './pages/Reservas';
import CrearReserva from './pages/CrearReserva';
import EditarReserva from './pages/EditarReserva';
import DetallesReserva from './pages/DetallesReserva';
import Estadisticas from './pages/stats';

const App: React.FC = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/reservas" element={<Reservas />} />
            <Route path="/crear-reserva" element={<CrearReserva />} />
            <Route path="/editar-reserva/:id" element={<EditarReserva />} />
            <Route path="/detalles-reserva/:id" element={<DetallesReserva />} />
            <Route path="/estadisticas" element={<Estadisticas />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;

