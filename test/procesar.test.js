import test from "node:test";
import assert from "node:assert/strict";
import handler from "../api/procesar.js";

test("procesar convierte el nombre a mayúsculas", () => {
  const req = { query: { nombre: "juan" } };

  const res = {
    statusCode: null,
    body: null,
    status(code) {
      this.statusCode = code;
      return this;
    },
    json(payload) {
      this.body = payload;
      return this;
    }
  };

  handler(req, res);

  assert.equal(res.statusCode, 200);
  assert.deepEqual(res.body, { resultado: "Nombre procesado: JUAN" });

  test("procesar: no falla si nombre viene vacío", async () => {
  const req = { query: { nombre: "" } };
  const res = mockRes();

  await handler(req, res);

  assert.equal(res.statusCode, 200);
  assert.ok(typeof res.body.resultado === "string");
  assert.ok(res.body.resultado.length > 0);
});

});
