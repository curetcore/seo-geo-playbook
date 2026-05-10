# Tabla completa de AI bots (2026)

Lista de bots conocidos con su empresa, propósito y recomendación.

---

## Tabla de bots

| Bot | Empresa | Propósito | Recomendación |
|-----|---------|-----------|---------------|
| `GPTBot` | OpenAI | Training + search | Permitir |
| `OAI-SearchBot` | OpenAI | ChatGPT search | Permitir |
| `ChatGPT-User` | OpenAI | Browsing mode | Permitir |
| `ClaudeBot` | Anthropic | Training + search | Permitir |
| `PerplexityBot` | Perplexity | Search | Permitir |
| `Applebot-Extended` | Apple | Apple Intelligence | Permitir |
| `Bytespider` | ByteDance | Training | Evaluar |
| `CCBot` | Common Crawl | Training datasets | Bloquear |
| `Google-Extended` | Google | Gemini training | Bloquear |
| `FacebookBot` | Meta | AI training | Bloquear |
| `Amazonbot` | Amazon | Alexa/training | Evaluar |
| `anthropic-ai` | Anthropic | Training crawler | Evaluar |
| `cohere-ai` | Cohere | Training | Bloquear |

---

## Lógica detrás de cada recomendación

### Permitir (search bots que generan tráfico)

Estos bots indexan tu sitio para responder queries de usuarios. Cuando alguien pregunta a ChatGPT/Claude/Perplexity sobre un tema, estos bots ya tienen tu sitio y pueden citarte. **Bloquearlos = invisible en AI search.**

- `GPTBot` (OpenAI) — usado tanto para training como para responder en ChatGPT con browsing
- `OAI-SearchBot` (OpenAI) — específico de ChatGPT search
- `ChatGPT-User` (OpenAI) — el bot que aparece cuando un usuario activa "browse with Bing"
- `ClaudeBot` (Anthropic) — incluye search en Claude.ai
- `PerplexityBot` (Perplexity) — Perplexity es 100% search, no training pesado
- `Applebot-Extended` (Apple) — usado por Apple Intelligence (iOS 18+, macOS 15+)

### Bloquear (training-only sin retorno)

Estos bots solo entrenan modelos. Tu sitio termina en datasets pero no recibís tráfico. Costo de bandwidth sin retorno.

- `CCBot` (Common Crawl) — el dataset que casi todos los LLMs usan. Bloquear acá te saca de la mayoría de training pipelines
- `Google-Extended` (Google) — específico para Gemini training. Importante: NO bloquea Googlebot tradicional, solo el de IA
- `FacebookBot` (Meta) — entrenamiento de Llama y otros
- `cohere-ai` (Cohere) — modelos enterprise, training puro

### Evaluar (caso por caso)

- `Bytespider` (ByteDance, dueño de TikTok) — training para sus modelos. Si tu audiencia incluye TikTok, podrías permitir
- `Amazonbot` (Amazon) — Alexa y otros productos. Si vendés en marketplace de Amazon, podrías permitir
- `anthropic-ai` (Anthropic) — crawler genérico de training. `ClaudeBot` ya es el productivo, este es secundario

---

## El dilema "permitir training"

Algunos argumentan que permitir CCBot es bueno porque tu sitio entra en datasets de futuros LLMs. Counter-argumento: el dataset puede tener tu contenido pero el LLM no va a citarte específicamente — los LLMs solo citan cuando tienen el sitio en su index de búsqueda en tiempo real.

**Conclusión práctica**: si tu objetivo es tráfico, bloqueá training-only. Si tu objetivo es presencia en LLMs futuros sin foco en conversión, permitilos.
