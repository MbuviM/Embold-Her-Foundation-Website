const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const FRONTEND_DIR = path.join(ROOT, "frontend");
const PHOTOS_DIR = path.join(ROOT, "photos");
const SHARED_CONTENT_FILE = path.join(ROOT, "shared", "siteContent.js");
const DIST_DIR = path.join(ROOT, "dist");

fs.rmSync(DIST_DIR, { recursive: true, force: true });
fs.mkdirSync(DIST_DIR, { recursive: true });

fs.cpSync(FRONTEND_DIR, DIST_DIR, { recursive: true });
fs.cpSync(PHOTOS_DIR, path.join(DIST_DIR, "photos"), { recursive: true });
fs.copyFileSync(SHARED_CONTENT_FILE, path.join(DIST_DIR, "site-content.js"));

console.log(`Netlify build output created in ${DIST_DIR}`);
