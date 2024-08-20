// backend/app.js
const express = require('express');
const Database = require('better-sqlite3');
const app = express();
const PORT = process.env.PORT || 5000;
const cors = require('cors');

app.use(cors({
    origin: '*', 
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Métodos permitidos
    allowedHeaders: ['Content-Type', 'Authorization'], // Encabezados permitidos
  }));

const db = new Database('database.db', { verbose: console.log });

// Configuración de Express
app.use(express.json());


db.exec(`
  CREATE TABLE IF NOT EXISTS reservas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL,
    fecha TEXT NOT NULL,
    hora TEXT NOT NULL
  )
`);

// Rutas API

// Obtener todas las reservas
app.get('/api/reservas', (req, res) => {
  try {
    const reservas = db.prepare('SELECT * FROM reservas').all();
    res.json(reservas);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las reservas' });
  }
});

app.get('/api/reservas/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const stmt = db.prepare('SELECT * FROM reservas WHERE id = ?');
      const reserva = stmt.get(id);
      if (reserva) {
        res.status(200).json(reserva);
      } else {
        res.status(404).send('Reserva no encontrada');
      }
    } catch (error) {
      console.error('Error al obtener la reserva:', error.message);
      res.status(500).send('Error al obtener la reserva');
    }
  });
  
  
  

  app.put('/api/reservas/:id', async (req, res) => {
    const { id } = req.params;
    const { nombre, fecha, hora } = req.body;

    try {
        const result = db.prepare('UPDATE reservas SET nombre = ?, fecha = ?, hora = ? WHERE id = ?').run(nombre, fecha, hora, id);

        if (result.changes === 0) {
            return res.status(404).send('Reserva no encontrada');
        }
        res.status(200).send('Reserva actualizada');
    } catch (error) {
        console.error('Error al actualizar la reserva:', error);
        res.status(500).send('Error al actualizar la reserva');
    }
});

// Crear una nueva reserva
app.post('/api/reservas', (req, res) => {
  const { nombre, fecha, hora } = req.body;
  if (!nombre || !fecha || !hora) {
    return res.status(400).json({ error: 'Todos los campos son requeridos' });
  }

  try {
    db.prepare('INSERT INTO reservas (nombre, fecha, hora) VALUES (?, ?, ?)').run(nombre, fecha, hora);
    res.status(201).json({ message: 'Reserva creada exitosamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al crear la reserva' });
  }
});

// Actualizar una reserva
app.put('/api/reservas/:id', (req, res) => {
  const { id } = req.params;
  const { nombre, fecha, hora } = req.body;
  if (!nombre || !fecha || !hora) {
    return res.status(400).json({ error: 'Todos los campos son requeridos' });
  }

  try {
    const result = db.prepare('UPDATE reservas SET nombre = ?, fecha = ?, hora = ? WHERE id = ?').run(nombre, fecha, hora, id);
    if (result.changes === 0) {
      return res.status(404).json({ error: 'Reserva no encontrada' });
    }
    res.json({ message: 'Reserva actualizada exitosamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar la reserva' });
  }
});

// Eliminar una reserva
app.delete('/api/reservas/:id', (req, res) => {
  const { id } = req.params;
  try {
    const result = db.prepare('DELETE FROM reservas WHERE id = ?').run(id);
    if (result.changes === 0) {
      return res.status(404).json({ error: 'Reserva no encontrada' });
    }
    res.json({ message: 'Reserva eliminada exitosamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar la reserva' });
  }
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
