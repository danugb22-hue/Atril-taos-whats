import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Proxy Route for WhatsApp template submission (helps avoid CORS and secures credentials)
  app.post("/api/send-whatsapp", async (req, res) => {
    try {
      const { to, nombre, type } = req.body;

      if (!to || !nombre) {
        return res.status(400).json({ error: "Parámetros 'to' y 'nombre' son requeridos." });
      }

      const protocol = req.headers["x-forwarded-proto"] || req.protocol || "http";
      const host = req.headers["x-forwarded-host"] || req.get("host");
      const BASE_URL = (process.env.APP_URL || `${protocol}://${host}`).replace(/\/$/, "");

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

      const response = await fetch("https://n8n.wa2desk.ai/webhook/9b0c0659-f688-4a6d-935b-e7851abad039", {
        method: "POST",
        headers: {
          "Authorization": "Basic dm9sa3k6eUckeUluI3V1QWhhdFE2M1MzZG5saGNy",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const text = await response.text();
        return res.status(response.status).json({ error: `server-side webhook response: ${text}` });
      }

      // Try parsing JSON response if any, or return plain text status
      let data;
      try {
        data = await response.json();
      } catch {
        data = { success: true };
      }
      
      return res.json(data);
    } catch (err: any) {
      console.error("Error in api/send-whatsapp proxy:", err);
      return res.status(500).json({ error: err.message || "Fallo al conectar con el servidor de WhatsApp." });
    }
  });

  // Serve static assets from public directory
  app.use(express.static(path.join(process.cwd(), "public")));

  // Vite integration
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
