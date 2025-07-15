const express = require('express');
const si = require('systeminformation');

const app = express();
const port = process.env.PORT || 3000;

app.get('/metrics', async (req, res) => {
  try {
    const cpu = await si.currentLoad();
    const mem = await si.mem();

    const cpuLoad = cpu && cpu.currentload !== undefined ? cpu.currentload.toFixed(2) : 'N/A';
    const totalMemMB = mem && mem.total ? (mem.total / 1024 / 1024).toFixed(2) : 'N/A';
    const usedMemMB = mem && mem.total && mem.available
      ? ((mem.total - mem.available) / 1024 / 1024).toFixed(2)
      : 'N/A';

    res.json({
      cpuLoad,
      totalMemMB,
      usedMemMB,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`API listening on port ${port}`);
});

