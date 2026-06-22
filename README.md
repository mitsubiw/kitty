# kitty

Local proxy server (optional)
--------------------------------

To avoid entering an OpenAI API key in the browser, run the included proxy server which keeps the key on your machine.

1. Create a `.env` file or set environment variable `OPENAI_API_KEY` with your key.

On Linux/macOS:

```bash
export OPENAI_API_KEY="sk-..."
npm install
npm start
# then open http://127.0.0.1:3000/index.html
```

The proxy serves the static files and exposes POST `/api/ask` which the client uses.

If the proxy is not running or no key is set, the app will use a local fallback AI to answer simple questions.

mc projekt
