const crypto = require("crypto");
const http = require("http");
const fs = require("fs");
const path = require("path");

const content = require("./content/siteContent");

const PORT = Number(process.env.PORT || 4000);
const ROOT_DIR = path.resolve(__dirname, "..");
const FRONTEND_DIR = path.join(ROOT_DIR, "frontend");
const PHOTOS_DIR = path.join(ROOT_DIR, "photos");
const SHARED_DIR = path.join(ROOT_DIR, "shared");
const DATA_DIR = path.join(__dirname, "data");
const INBOX_FILE = path.join(DATA_DIR, "inbox.json");

const MIME_TYPES = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".jpeg": "image/jpeg",
  ".jpg": "image/jpeg",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml; charset=utf-8",
  ".webp": "image/webp"
};

async function ensureInboxFile() {
  await fs.promises.mkdir(DATA_DIR, { recursive: true });

  try {
    await fs.promises.access(INBOX_FILE, fs.constants.F_OK);
  } catch {
    await fs.promises.writeFile(INBOX_FILE, "[]\n", "utf8");
  }
}

function sendJson(response, statusCode, payload) {
  response.writeHead(statusCode, {
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json; charset=utf-8"
  });
  response.end(JSON.stringify(payload, null, 2));
}

function sendText(response, statusCode, body) {
  response.writeHead(statusCode, {
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "text/plain; charset=utf-8"
  });
  response.end(body);
}

async function readTextBody(request) {
  return new Promise((resolve, reject) => {
    let body = "";

    request.on("data", (chunk) => {
      body += chunk;

      if (body.length > 1_000_000) {
        reject(new Error("Payload too large."));
        request.destroy();
      }
    });

    request.on("end", () => resolve(body));
    request.on("error", reject);
  });
}

async function readJsonBody(request) {
  return new Promise((resolve, reject) => {
    let body = "";

    request.on("data", (chunk) => {
      body += chunk;

      if (body.length > 1_000_000) {
        reject(new Error("Payload too large."));
        request.destroy();
      }
    });

    request.on("end", () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch {
        reject(new Error("Invalid JSON payload."));
      }
    });

    request.on("error", reject);
  });
}

function sanitizePath(baseDirectory, requestedPath) {
  const safeSuffix = requestedPath.replace(/^\/+/, "");
  const resolvedPath = path.normalize(path.join(baseDirectory, safeSuffix));
  const relativePath = path.relative(baseDirectory, resolvedPath);

  if (relativePath.startsWith("..") || path.isAbsolute(relativePath)) {
    return null;
  }

  return resolvedPath;
}

async function serveFile(response, filePath) {
  const extension = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[extension] || "application/octet-stream";
  const fileBuffer = await fs.promises.readFile(filePath);

  response.writeHead(200, {
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Origin": "*",
    "Content-Type": contentType
  });
  response.end(fileBuffer);
}

async function appendMessage(message) {
  await ensureInboxFile();
  const current = JSON.parse(await fs.promises.readFile(INBOX_FILE, "utf8"));
  current.push(message);
  await fs.promises.writeFile(INBOX_FILE, `${JSON.stringify(current, null, 2)}\n`, "utf8");
}

async function handleRequest(request, response) {
  const requestUrl = new URL(request.url, `http://${request.headers.host || "localhost"}`);
  const { pathname } = requestUrl;

  if (request.method === "OPTIONS") {
    response.writeHead(204, {
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Origin": "*"
    });
    response.end();
    return;
  }

  if (request.method === "GET" && pathname === "/api/site-content") {
    sendJson(response, 200, content);
    return;
  }

  if (request.method === "GET" && pathname === "/site-content.js") {
    await serveFile(response, path.join(SHARED_DIR, "siteContent.js"));
    return;
  }

  if (request.method === "POST" && pathname === "/api/contact") {
    const body = await readJsonBody(request);
    const name = String(body.name || "").trim();
    const email = String(body.email || "").trim();
    const context = String(body.context || "").trim();
    const message = String(body.message || "").trim();

    if (!name || !email || !message) {
      sendJson(response, 400, {
        ok: false,
        error: "Name, email, and message are required."
      });
      return;
    }

    const entry = {
      id: crypto.randomUUID(),
      receivedAt: new Date().toISOString(),
      name,
      email,
      context,
      message
    };

    await appendMessage(entry);

    sendJson(response, 201, {
      ok: true,
      message: "Your note has been received."
    });
    return;
  }

  if (request.method === "POST" && pathname === "/") {
    const contentType = request.headers["content-type"] || "";

    if (!contentType.includes("application/x-www-form-urlencoded")) {
      sendText(response, 415, "Unsupported media type.");
      return;
    }

    const rawBody = await readTextBody(request);
    const formData = new URLSearchParams(rawBody);

    if (formData.get("form-name") !== "emboldher-contact") {
      sendText(response, 400, "Unknown form.");
      return;
    }

    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const context = String(formData.get("context") || "").trim();
    const message = String(formData.get("message") || "").trim();
    const honeypot = String(formData.get("bot-field") || "").trim();

    if (honeypot) {
      sendText(response, 200, "Ignored.");
      return;
    }

    if (!name || !email || !message) {
      sendText(response, 400, "Name, email, and message are required.");
      return;
    }

    const entry = {
      id: crypto.randomUUID(),
      receivedAt: new Date().toISOString(),
      name,
      email,
      context,
      message
    };

    await appendMessage(entry);
    sendText(response, 200, "Your note has been received.");
    return;
  }

  if (request.method === "GET" && pathname.startsWith("/photos/")) {
    const photoPath = sanitizePath(PHOTOS_DIR, pathname.replace("/photos/", ""));

    if (!photoPath) {
      sendText(response, 403, "Forbidden");
      return;
    }

    await serveFile(response, photoPath);
    return;
  }

  if (request.method === "GET") {
    const requestedFile = pathname === "/" ? "index.html" : pathname.slice(1);
    const frontendPath = sanitizePath(FRONTEND_DIR, requestedFile);

    if (frontendPath) {
      try {
        await serveFile(response, frontendPath);
        return;
      } catch (error) {
        if (error.code !== "ENOENT") {
          throw error;
        }
      }
    }

    try {
      await serveFile(response, path.join(FRONTEND_DIR, "index.html"));
      return;
    } catch (error) {
      if (error.code === "ENOENT") {
        sendText(response, 404, "Frontend entry file not found.");
        return;
      }

      throw error;
    }
  }

  sendText(response, 405, "Method not allowed.");
}

function createServer() {
  return http.createServer((request, response) => {
    handleRequest(request, response).catch((error) => {
      console.error(error);
      sendJson(response, 500, {
        ok: false,
        error: "Unexpected server error."
      });
    });
  });
}

async function startServer(port = PORT) {
  await ensureInboxFile();

  return new Promise((resolve) => {
    const server = createServer();

    server.listen(port, () => {
      console.log(`EmboldHer server running at http://localhost:${port}`);
      resolve(server);
    });
  });
}

if (require.main === module) {
  startServer();
}

module.exports = {
  createServer,
  startServer
};
