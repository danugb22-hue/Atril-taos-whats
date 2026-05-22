import express from "express";
import path from "path";

const app = express();

app.use(express.json());

// Log incoming requests for easier debugging in production / Vercel logs / local logs
app.use((req, res, next) => {
  console.log(`[Express API] Incoming request: ${req.method} ${req.url}`);
  next();
});

// API Proxy Route for WhatsApp template submission (helps avoid CORS and secures credentials)
// We match both "/" and "/api/send-whatsapp" to guarantee it works whether called through
// a serverless route prefix routing or directly from the standalone express router.
app.post(["/api/send-whatsapp", "/"], async (req, res) => {
  console.log("[Express API] Request body received:", JSON.stringify(req.body, null, 2));
  
  try {
    const { to, nombre, type } = req.body;

    if (!to || !nombre) {
      console.error("[Express API] Validation failed: Missing parameters 'to' or 'nombre'");
      return res.status(400).json({ error: "Parámetros 'to' y 'nombre' son requeridos." });
    }

    const protocol = req.headers["x-forwarded-proto"] || req.protocol || "http";
    const host = req.headers["x-forwarded-host"] || req.get("host");
    
    // Dynamic BASE_URL detection: compatibility with Vercel and generic production / local environments
    let derivedBaseUrl = process.env.APP_URL;
    if (!derivedBaseUrl) {
      if (process.env.VERCEL_URL) {
        derivedBaseUrl = `https://${process.env.VERCEL_URL}`;
      } else {
        derivedBaseUrl = `${protocol}://${host}`;
      }
    }
    const BASE_URL = derivedBaseUrl.replace(/\/$/, "");
    console.log(`[Express API] Dynamic BASE_URL resolved to: ${BASE_URL}`);

    let payload;

    if (type === "catalogo_digital") {
      payload = {
        to: to,
        template: "demo_volky_catalogo_taos_2026",
        language: "es",
        header: {
          type: "document",
          url: "https://qrvwp.s3.dualstack.us-west-2.amazonaws.com/Catalogos%20Digitales%20MY26/C%C3%A1talogo%20Digital%20Taos%202026%20%28Actualizado%29.pdf",
          filename: "Catalogo_Digital_Taos_2026.pdf"
        },
        body: {
          nombre: nombre
        }
      };
    } else {
      // Los PDFs deben colocarse manualmente dentro de public/pdfs
      payload = {
        to: to,
        template: "demo_volky_ficha_tecnica_taos_2026",
        language: "es",
        header: {
          type: "document",
          url: `${BASE_URL}/pdfs/ficha-tecnica-taos-2026.pdf`,
          filename: "ficha-tecnica-taos-2026.pdf"
        },
        body: {
          nombre: nombre
        }
      };
    }

    console.log("[Express API] Prepared payload to send to n8n:", JSON.stringify(payload, null, 2));

    // Connect with the production webhook
    const response = await fetch("https://n8n.wa2desk.ai/webhook/9b0c0659-f688-4a6d-935b-e7851abad039", {
      method: "POST",
      headers: {
        "Authorization": "Basic dm9sa3k6eUckeUluI3V1QWhhdFE2M1MzZG5saGNy",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    console.log(`[Express API] n8n responded with status style: ${response.status}`);

    if (!response.ok) {
      const text = await response.text();
      console.error(`[Express API] Error response text from n8n: ${text}`);
      return res.status(response.status).json({ error: `server-side webhook response: ${text}` });
    }

    // Try parsing JSON response if any, or return plain text status
    let data;
    try {
      data = await response.json();
      console.log("[Express API] Successfully received JSON from n8n:", JSON.stringify(data));
    } catch {
      console.log("[Express API] n8n response could not be parsed as JSON, returning success indicator.");
      data = { success: true };
    }
    
    return res.json(data);
  } catch (err: any) {
    console.error("[Express API] Server/Proxy execution crashed:", err);
    return res.status(500).json({ error: err.message || "Fallo al conectar con el servidor de WhatsApp." });
  }
});

export default app;
