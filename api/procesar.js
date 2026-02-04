export default function handler(req, res) {
  const nombre = (req.query.nombre || "").toString();

  // Mini-reto: simular error si nombre = "error"
  if (nombre.toLowerCase() === "error") {
    return res.status(500).json({
      ok: false,
      error: "Fallo simulado en /api/procesar",
      timestamp: new Date().toISOString(),
    });
  }

  // Mini-reto: agregar timestamp
  return res.status(200).json({
    ok: true,
    procesado: `Nombre procesado: ${nombre || "anónimo"}`,
    timestamp: new Date().toISOString(),
  });
}
