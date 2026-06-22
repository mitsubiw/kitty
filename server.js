const express = require('express');
const fetch = global.fetch || require('node-fetch');
const path = require('path');

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;
const OPENAI_KEY = process.env.OPENAI_API_KEY;

if(!OPENAI_KEY){
  console.warn('Warning: OPENAI_API_KEY is not set. /api/ask will return 503 until set.');
}

app.post('/api/ask', async (req, res) => {
  if(!OPENAI_KEY){
    return res.status(503).json({ error: 'Server-side OpenAI key not configured.' });
  }

  const question = req.body?.question || '';
  try{
    const resp = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: 'You are a friendly fortune-telling cat. Answer in Czech, concisely and playfully (1-3 sentences). Keep tone mystical and positive.' },
          { role: 'user', content: question }
        ],
        temperature: 0.8,
        max_tokens: 200
      })
    });

    const data = await resp.json();
    if(!resp.ok){
      return res.status(resp.status).json({ error: data });
    }
    const answer = data.choices?.[0]?.message?.content?.trim();
    res.json({ answer });
  }catch(err){
    console.error('Proxy error', err);
    res.status(500).json({ error: err.message });
  }
});

// Serve static files from workspace root so you can open http://localhost:PORT/index.html
app.use(express.static(process.cwd()));

app.listen(PORT, ()=>{
  console.log(`Kitty proxy server running on http://127.0.0.1:${PORT} — serving files and /api/ask`);
});
