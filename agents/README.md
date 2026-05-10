# Agente — `seo-marketing`

Este directorio contiene el agente de Claude Code que coordina los 10 sub-skills de SEO/GEO.

---

## Qué es un agente en Claude Code

Un agente es un archivo `.md` con frontmatter YAML que Claude Code carga al iniciar. Cuando el agente está activo, Claude lo usa como **decision-framework** — lee el pedido del usuario, consulta la matriz de delegación del agente, y carga el sub-skill correcto para ejecutar.

> Más info en docs oficiales de Claude Code: cómo crear agentes y sub-agentes.

---

## Instalación

```bash
# Desde la raíz de este repo
cp agents/seo-marketing.md ~/.claude/agents/

# Verificar
ls ~/.claude/agents/seo-marketing.md
```

Después instalá los sub-skills en `~/.claude/skills/` siguiendo la guía en [`../skills/README.md`](../skills/README.md). Sin los sub-skills, el agente no puede ejecutar nada — solo es un coordinator.

---

## Cómo invocar el agente

Después de instalado, en cualquier proyecto le decís a Claude Code algo como:

```
necesito que mi SaaS aparezca en ChatGPT cuando alguien pregunta por
herramientas BI para ecommerce. Hacé un audit GEO completo.
```

Claude detecta que es un task de SEO/GEO, invoca al agente `seo-marketing`, lee la matriz de decisión, y carga el sub-skill `seo-ai-geo` para ejecutar.

Si el pedido cruza varios pilares (ej. "Implementá SEO desde cero"), el agente sigue el orden de implementación documentado y carga los sub-skills relevantes en secuencia.

---

## Lo que el agente hace y NO hace

### Lo que hace

- Identifica la categoría del pedido (technical, on-page, AI/GEO, content, local, analytics, growth, slug-dates, audit)
- Invoca el sub-skill correcto desde la matriz
- Si el pedido cruza categorías, los combina en orden lógico
- Aplica las reglas transversales (INP/LCP/CLS, BLUF, schema-dts, no fake reviews)

### Lo que NO hace

- Implementar todo en un solo prompt — confía en los sub-skills
- Inventar contenido sin pasar por las reglas de citabilidad y E-E-A-T
- Recomendar técnicas blackhat (link buying, doorway pages, hidden text)
- Trabajar sin los sub-skills instalados

---

## Estructura del agente

El frontmatter es lo que dispara el agente:

```yaml
---
name: seo-marketing
description: ... Use this agent whenever the user asks for SEO strategy, ...
model: opus
---
```

`description` es la primary mechanism de triggering. Está escrita como "pushy" siguiendo el patrón del skill-creator de Anthropic — incluye triggers concretos para que Claude lo invoque también cuando el usuario no dice "SEO" explícito.

---

## Customización

Si querés adaptar el agente a tu workflow:

1. Copialo a `~/.claude/agents/seo-marketing.md` (no edites en el repo)
2. Modificá la matriz de decisión para tu uso
3. Agregá MCPs específicos a tu setup (PostHog, Sentry, etc.)
4. **NO modifiques los `name` de sub-skills** — si los renombrás, la matriz deja de funcionar

Si querés contribuir al agente del repo (mejoras genéricas, no personalizaciones), ver [`../CONTRIBUTING.md`](../CONTRIBUTING.md).

---

## Verificación post-instalación

```bash
# 1. Frontmatter parsea
python3 -c "
import yaml, re
with open('$HOME/.claude/agents/seo-marketing.md') as f:
    content = f.read()
m = re.match(r'^---\n(.*?)\n---', content, re.DOTALL)
fm = yaml.safe_load(m.group(1))
print('OK:', fm['name'], '|', fm.get('model','?'))
"

# 2. Claude Code lo reconoce
# Iniciá Claude Code y probá:
# > "configurá SEO desde cero en este proyecto Next.js"
# Debería invocar el agente y empezar por seo-technical.
```
