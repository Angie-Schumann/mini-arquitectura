export default function handler(req, res) {
  const nombreRaw = req?.query?.nombre;

  const nombre =
    typeof nombreRaw === "string" && nombreRaw.trim().length > 0
      ? nombreRaw.trim()
      : "anónimo";

  if (nombre === "error") {
    return res.status(500).json({
      error: "Falla simulada"
    });
  }

  const nombreProcesado = nombre.toUpperCase();

  return res.status(200).json({
    resultado: `Nombre procesado: ${nombreProcesado}`,
    longitud: nombreProcesado.length
  });
}
