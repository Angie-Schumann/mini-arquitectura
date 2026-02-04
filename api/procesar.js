export default function handler(req, res) {
  const nombre = (req.query.nombre || "").toString();

  // Simula "lógica de negocio"
  return res.status(200).json({
    ok: true,
    procesado: `Nombre procesado: ${nombre || "anónimo"}`,
  });
}
