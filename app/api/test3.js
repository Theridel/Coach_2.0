### 1️⃣ `POST /queue/join`

```js
import https from "https";

export default async function handler(req, res) {
  const payload = JSON.stringify({
    data: ["Hello!!"],
    fn_index: 0,
    session_hash: "vercel_" + Date.now()
  });

  const options = {
    hostname: "theridel-orchestratore.hf.space",
    path: "/queue/join",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Content-Length": Buffer.byteLength(payload)
    }
  };

  const request = https.request(options, (response) => {
    let body = "";
    response.on("data", chunk => body += chunk);
    response.on("end", () => {
      res.status(200).json({
        step: "queue_join",
        raw: body
      });
    });
  });

  request.on("error", err => {
    res.status(500).json({ errore: err.message });
  });

  request.write(payload);
  request.end();
}
