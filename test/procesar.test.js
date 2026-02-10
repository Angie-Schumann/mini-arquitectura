import test from "node:test";
import assert from "node:assert/strict";
import handler from "../api/procesar.js";

function mockRes() {
  return {
    statusCode: null,
    body: null,
    headers: {},
    status(code) {
      this.statusCode = code;
      return this;
    },
    json(payload) {
      this.body = payload;
      return this;
    },
    setHeader(key, value) {
      this.headers[key] = value;
      return this;
    },
    end(payload) {
      try {
        this.body = JSON.parse(payload);
      } catch {
        this.body = payload;
      }
      return this;
    }
  };
}

test("procesar convierte el nombre a mayúsculas y devuelve longitud", async () => {
  const req = { query: { nombre: "juan" } };
  const res = mockRes();

  await handler(req, res);

  assert.equal(res.statusCode, 200);
  assert.equal(res.body.resultado, "Nombre procesado: JUAN");
  assert.equal(res.body.longitud, 4);
});

test("procesar: no falla si nombre viene vacío y devuelve longitud", async () => {
  const req = { query: { nombre: "" } };
  const res = mockRes();

  await handler(req, res);

  assert.equal(res.statusCode, 200);
  assert.ok(typeof res.body.resultado === "string");
  assert.ok(res.body.resultado.length > 0);
  assert.ok(typeof res.body.longitud === "number");
  assert.ok(res.body.longitud > 0);
});

test("procesar: no falla si nombre no viene y devuelve longitud", async () => {
  const req = { query: {} };
  const res = mockRes();

  await handler(req, res);

  assert.equal(res.statusCode, 200);
  assert.ok(typeof res.body.resultado === "string");
  assert.ok(res.body.resultado.length > 0);
  assert.ok(typeof res.body.longitud === "number");
  assert.ok(res.body.longitud > 0);
});

// ✅ Reto 3 — Política mínima de calidad
test("política de calidad: nombre en MAYÚSCULAS y longitud consistente", async () => {
  const req = { query: { nombre: "Mi Nombre" } };
  const res = mockRes();

  await handler(req, res);

  assert.equal(res.statusCode, 200);

  assert.ok(res.body && typeof res.body === "object");
  assert.ok("resultado" in res.body);
  assert.ok("longitud" in res.body);

  assert.equal(typeof res.body.resultado, "string");
  assert.equal(typeof res.body.longitud, "number");

  assert.ok(res.body.resultado.startsWith("Nombre procesado: "));

  const nombreProcesado = res.body.resultado.replace("Nombre procesado: ", "");
  assert.equal(nombreProcesado, nombreProcesado.toUpperCase());
  assert.equal(res.body.longitud, nombreProcesado.length);
  assert.ok(nombreProcesado.length > 0);
});

// ✅ Reto 5 — Falla simulada (no funcional)
test('procesar: simula falla cuando nombre === "error"', async () => {
  const req = { query: { nombre: "error" } };
  const res = mockRes();

  await handler(req, res);

  assert.equal(res.statusCode, 500);
  assert.ok(res.body && typeof res.body === "object");
  assert.equal(res.body.error, "Falla simulada");
});
