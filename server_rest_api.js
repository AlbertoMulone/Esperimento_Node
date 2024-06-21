const express = require('express');
const app = express();
const port = 3000;

// Middleware per il parsing del JSON
app.use(express.json());

let items = [
  { id: 1, name: 'Item 1' },
  { id: 2, name: 'Item 2' }
];

// Endpoint per ottenere tutti gli elementi
app.get('/items', (req, res) => {
  res.json(items);
});

// Endpoint per ottenere un elemento per ID
app.get('/items/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const item = items.find(i => i.id === id);
  if (item) {
    res.json(item);
  } else {
    res.status(404).send('Elemento non trovato');
  }
});

// Endpoint per creare un nuovo elemento
app.post('/items', (req, res) => {
  const newItem = {
    id: items.length + 1,
    name: req.body.name
  };
  console.log('Ricevuto JSON:', req.body);
  items.push(newItem);
  res.status(201).json(newItem);
});

// Endpoint per aggiornare un elemento
app.put('/items/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const item = items.find(i => i.id === id);
  if (item) {
    item.name = req.body.name;
    res.json(item);
  } else {
    res.status(404).send('Elemento non trovato');
  }
});

// Endpoint per eliminare un elemento
app.delete('/items/:id', (req, res) => {
  const id = parseInt(req.params.id);
  items = items.filter(i => i.id !== id);
  res.status(204).send();
});

app.listen(port, () => {
  console.log(`Server API in esecuzione all'indirizzo http://localhost:${port}/`);
});
