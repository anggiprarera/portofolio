const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const projects = [
  {
    id: 1,
    title: 'SafeSpace App',
    description: 'Aplikasi mobile untuk laporan insiden bullying, konseling real-time, dan komunitas dukungan.',
    tech: 'Figma',
    link: 'https://www.figma.com/proto/wSech0ZFI8p6hGdC1xinSI/Final-Project?node-id=2-7&t=PS3YK2oWxjQm1eZn-0&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=2%3A7'
  },
  {
    id: 2,
    title: 'UI/UX Rancang — Contoh Project',
    description: 'Proyek latihan UI/UX untuk tugas perkuliahan.',
    tech: 'Figma / Adobe XD',
    link: ''
  }
];

app.get('/api/projects', (req, res) => {
  res.json(projects);
});

app.get('/api/projects/:id', (req, res) => {
  const p = projects.find(x => x.id === Number(req.params.id));
  if(!p) return res.status(404).json({error: 'Not found'});
  res.json(p);
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => console.log(`Server berjalan di port ${PORT}`));