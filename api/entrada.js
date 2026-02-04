export default async function handler(req, res) {
  const nombre = (req.query.nombre || "").toString();

  try {
    // URL base (sirve en Vercel)
    const proto = (req.headers["x-forwarded-proto"] || "https").toString();
    const host = req.headers.host;
    const baseUrl = `${proto}://${host}`;

    // Llamada a /api/procesar
    const url = `${baseUrl}/api/procesar?nombre=${encodeURIComponent(nombre)}`;
    const r = await fetch(url);

    // Si /api/procesar falla → resiliencia básica (fallback)
    if (!r.ok) {
      let detalle = {};
      try { detalle = await r.json(); } catch {}

      return res.status(502).json({
        ok: false,
        entrada: `Hola ${nombre || "anónimo"}. No se pudo procesar.`,
        detalle,
        nota: "fallback porque /api/procesar falló"
      });
    }

    const data = await r.json();

    // Respuesta combinada
    return res.status(200).json({
      ok: true,
      entrada: `Hola ${nombre || "anónimo"}.`,
      resultadoProcesado: data.procesado
    });
  } catch (e) {
    return res.status(502).json({
      ok: false,
      entrada: `Hola ${nombre || "anónimo"}. Error de comunicación.`,
      error: String(e?.message || e)
    });
  }
}
