export default function handler(req, res) {
  const query = req?.query ?? {};
  const raw = Array.isArray(query.nombre) ? query.nombre[0] : query.nombre;

  const normalizado = String(raw ?? '').trim();
  const finalNombre = normalizado.length === 0 ? 'anónimo' : normalizado;

  return res.status(200).json({
    resultado: `Nombre procesado: ${finalNombre.toUpperCase()}`,
    longitud: finalNombre.length
  });
}
