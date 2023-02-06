import { createApp } from "./app";
import https from "https";
import http from "http";
import fs from "fs";
const app = createApp();

const PORT = process.env.PORT || 5500;
const HTTPS_PORT = process.env.HTTPS_PORT || 4443;

// HTTPS - 인증서가 있다면 HTTPS로 처리.
  // Certificate 인증서 경로
const certificationPath = process.env.HTTPS_CERTIFICATION_PATH;
if (certificationPath) {
  const privateKey = fs.readFileSync(`${certificationPath}/privkey.pem`, 'utf8');
  const certificate = fs.readFileSync(`${certificationPath}/cert.pem`, 'utf8');
  const ca = fs.readFileSync(`${certificationPath}/chain.pem`, 'utf8');

  const credentials = {
    key: privateKey,
    cert: certificate,
    ca: ca
  };
  https
    .createServer(credentials, app)
    .listen(HTTPS_PORT, () => {
      console.log(`Server is running on port ${HTTPS_PORT}.`);
  });
}

//HTTP
http
  .createServer(app)
  .listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

