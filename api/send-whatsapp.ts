import express from "express";
import path from "path";
import fs from "fs";
import https from "https";

const app = express();

app.use(express.json());

// Log incoming requests for easier debugging in production / Vercel logs / local logs
app.use((req, res, next) => {
  console.log(`[Express API] Incoming request: ${req.method} ${req.url}`);
  next();
});

// Helper function to send HTTPS requests natively ensuring 100% compatibility across all Node / Vercel versions
function sendHttpsPost(urlStr: string, headers: Record<string, string>, body: any): Promise<{ status: number; body: string }> {
  return new Promise((resolve, reject) => {
    try {
      const url = new URL(urlStr);
      const postData = typeof body === "string" ? body : JSON.stringify(body);
      
      const options = {
        hostname: url.hostname,
        path: url.pathname + url.search,
        method: "POST",
        headers: {
          ...headers,
          "Content-Type": "application/json",
          "Content-Length": Buffer.byteLength(postData),
        },
      };

      console.log(`[Express API HTTPS] Direct request initializing to: ${urlStr}`);
      const req = https.request(options, (res) => {
        let responseBody = "";
        res.on("data", (chunk) => {
          responseBody += chunk;
        });
        res.on("end", () => {
          resolve({
            status: res.statusCode || 200,
            body: responseBody,
          });
        });
      });

      req.on("error", (err) => {
        console.error("[Express API HTTPS] Event Req Error occurred:", err);
        reject(err);
      });

      req.write(postData);
      req.end();
    } catch (err) {
      console.error("[Express API HTTPS] Initialization / Catch Error:", err);
      reject(err);
    }
  });
}

// API Proxy Route for WhatsApp template submission (helps avoid CORS and secures credentials)
// We match both "/" and "/api/send-whatsapp" to guarantee it works whether called through
// a serverless route prefix routing or directly from the standalone express router.
app.post(["/api/send-whatsapp", "/"], async (req, res) => {
  console.log("====================================================");
  console.log("[Express API] REQUEST RECEIVED!");
  console.log("[Express API] Headers:", JSON.stringify(req.headers, null, 2));
  console.log("[Express API] Request body received:", JSON.stringify(req.body, null, 2));
  
  try {
    const { to, nombre, type } = req.body;

    // Logging parsed parameters
    console.log(`[Express API] Parsed parameters - 'to': "${to}", 'nombre': "${nombre}", 'type': "${type}"`);

    if (!to || !nombre) {
      console.error("[Express API] Validation failed: Missing parameters 'to' or 'nombre'");
      return res.status(400).json({ error: "Parámetros 'to' y 'nombre' son requeridos." });
    }

    const telefono = to;
    const telefonoLimpio = String(telefono).replace(/[\s\-\(\)\+]/g, "");
    console.log("Telefono original:", telefono);
    console.log("Telefono limpio:", telefonoLimpio);

    const baseUrl = "https://atril-taos-2026.vercel.app";
    const pdfUrl = `${baseUrl}/pdfs/ficha-tecnica-taos-2026.pdf`;
    console.log("FINAL STABLE PDF URL:", pdfUrl);

    // Verify local PDF existence (Requirement 8)
    const localPdfPath = path.join(process.cwd(), "public", "pdfs", "ficha-tecnica-taos-2026.pdf");
    const localPdfExists = fs.existsSync(localPdfPath);
    console.log(`[Express API] Checking local PDF file existence in filesystem:`);
    console.log(` - Primary path checking: "${localPdfPath}"`);
    console.log(` - File exists? -> ${localPdfExists ? "YES (Accessible)" : "NO (Not found)"}`);

    if (!localPdfExists) {
      // Also check standard distribution output directory build
      const buildPdfPath = path.join(process.cwd(), "dist", "public", "pdfs", "ficha-tecnica-taos-2026.pdf");
      const buildPdfExists = fs.existsSync(buildPdfPath);
      console.log(` - Fallback build path checking: "${buildPdfPath}"`);
      console.log(` - File exists in build? -> ${buildPdfExists ? "YES (Accessible in build)" : "NO"}`);
    }

    // PDFs deben colocarse manualmente dentro de public/pdfs

    let payload;

    if (type === "catalogo_digital") {
      payload = {
        to: telefonoLimpio,
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
      payload = {
        to: telefonoLimpio,
        template: "demo_volky_ficha_tecnica_taos_2026",
        language: "es",
        header: {
          type: "document",
          url: pdfUrl,
          filename: "ficha-tecnica-taos-2026.pdf"
        },
        body: {
          nombre: nombre
        }
      };
    }

    // Requirement 9: Mostrar claramente en consola la URL final del PDF utilizada
    console.log(`[Express API] SUCCESS: URL del PDF final a utilizar en el envío por WhatsApp: "${payload.header.url}"`);
    console.log("[Express API] FULL PAYLOAD prepared for n8n:", JSON.stringify(payload, null, 2));

    // Send the WhatsApp template request to the webhook
    const headers = {
      "Authorization": "Basic dm9sa3k6eUckeUluI3V1QWhhdFE2M1MzZG5saGNy",
    };

    console.log("[Express API] Executing HTTP request to n8n webhook...");
    const n8nResult = await sendHttpsPost(
      "https://n8n.wa2desk.ai/webhook/9b0c0659-f688-4a6d-935b-e7851abad039",
      headers,
      payload
    );

    // Requirement 9: Mostrar claramente en consola la respuesta exacta del webhook
    console.log(`[Express API] n8n response HTTP Status: ${n8nResult.status}`);
    console.log(`[Express API] n8n raw response body: "${n8nResult.body}"`);

    if (n8nResult.status < 200 || n8nResult.status >= 300) {
      console.error(`[Express API] Webhook n8n failed with HTTP status ${n8nResult.status}. Response body: ${n8nResult.body}`);
      return res.status(n8nResult.status).json({
        error: `El webhook de n8n retornó un código de error: ${n8nResult.status}`,
        details: n8nResult.body
      });
    }

    // Try parsing response if JSON, or return a standardized success payload
    let data;
    try {
      data = JSON.parse(n8nResult.body);
      console.log("[Express API] JSON response parsed successfully:", JSON.stringify(data));
    } catch {
      console.log("[Express API] Response is not valid JSON, returning plain text status wrapper.");
      data = { success: true, message: n8nResult.body };
    }

    console.log("[Express API] Request completed successfully!");
    console.log("====================================================");
    return res.json(data);

  } catch (err: any) {
    // Requirement 1: Mostrar stack trace completo y errores detallados
    console.error("====================================================");
    console.error("[Express API ERROR] CRITICAL ERROR ENCOUNTERED IN API HANDLER!");
    console.error("[Express API ERROR] Error message:", err.message);
    if (err.stack) {
      console.error("[Express API ERROR] Stack trace:\n", err.stack);
    }
    console.error("[Express API ERROR] Full error object:", JSON.stringify(err, Object.getOwnPropertyNames(err), 2));
    console.error("====================================================");

    return res.status(500).json({
      error: "Fallo al conectar con el de WhatsApp. Error interno de servidor.",
      message: err.message,
      stack: process.env.NODE_ENV !== "production" ? err.stack : undefined
    });
  }
});

export default app;
