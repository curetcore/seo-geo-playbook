# Contributing

Gracias por querer contribuir. Acá la guía mínima para no perder tiempo.

---

## Antes de empezar

1. **Abrí un issue primero** si vas a proponer algo no trivial (skill nuevo, sección nueva del playbook, cambio de arquitectura). Vamos a discutir scope antes de que escribas código.
2. **Issues triviales** (typos, links rotos, errores de fact) — andá directo al PR.
3. **No re-publicar contenido** — todo lo que está acá es original o citado con atribución. Si proponés algo de otra fuente, mencionala.

---

## Estructura del repo

```text
seo-geo-playbook/
├── README.md
├── CHANGELOG.md            # Documentar cada versión acá
├── CONTRIBUTING.md         # Este archivo
├── LICENSE
├── playbook/               # Documentación educacional (sin frontmatter)
├── agents/                 # Agente Claude Code
│   └── seo-marketing.md
├── skills/                 # Sub-skills instalables
│   └── seo-*/
│       ├── SKILL.md        # Frontmatter YAML obligatorio
│       ├── references/     # (opcional) Detalles profundos
│       └── scripts/        # (opcional) Código bundled
└── examples/               # Casos reales (.txt, snippets)
```

---

## Cómo proponer un skill nuevo

Un skill agrega capacidades específicas a Claude Code. Para proponer uno:

### 1. Asegurate de que NO existe ya

Revisá la lista en `agents/seo-marketing.md`. Si tu skill se solapa con uno existente, **mejorá el existente** en lugar de crear uno nuevo.

### 2. Estructura mínima

```text
skills/seo-tu-skill/
├── SKILL.md                # Obligatorio
├── references/             # Si SKILL.md > 300 líneas
│   └── ...
└── scripts/                # Si hay código bundled
    └── ...
```

### 3. SKILL.md — formato obligatorio

```markdown
---
name: seo-tu-skill
description: Una descripción específica + cuándo usar el skill. Use this skill whenever the user mentions X, Y, Z — even if they don't say "SEO".
---

# Título del Skill

Descripción de 1-2 oraciones.

---

## Cuándo invocar este skill

- Lista de casos
- Específicos
- Y concretos

---

## Reglas clave

1. Las 5-7 reglas no negociables del skill

---

## [Contenido principal]

Bloques `## H2` autosuficientes.

---

## Verificación

Tabla de qué validar y con qué herramienta.

---

## Referencias técnicas profundas

- [`references/...`](./references/...) — descripción de qué hay ahí
```

### 4. Reglas de la `description` (frontmatter)

- **Pushy** — incluir "Use this skill whenever..." con triggers concretos
- **300-500 chars** ideal (algunos llegan a 600 — está bien si es necesario)
- **Triggers que no requieren la palabra "SEO"** — el usuario puede decir "ChatGPT no me menciona" y el skill debe activarse

### 5. SKILL.md — reglas de longitud

- Ideal: ≤ 300 líneas
- Aceptable: ≤ 500 líneas
- Si superás 500, mover detalles a `references/*.md` con un pointer claro desde SKILL.md

### 6. Frontmatter validation

Antes de PR, verificá que tu frontmatter parsea como YAML válido:

```bash
python3 -c "
import yaml, re
with open('skills/seo-tu-skill/SKILL.md') as f:
    content = f.read()
m = re.match(r'^---\n(.*?)\n---', content, re.DOTALL)
fm = yaml.safe_load(m.group(1))
print('OK:', fm['name'])
"
```

### 7. Agregá tu skill al agente

En `agents/seo-marketing.md`:

1. Agregá tu skill a la tabla "Los 10 sub-skills disponibles" (renombrá a "11 sub-skills")
2. Agregá filas a la matriz de decisión con triggers de tu skill
3. Si tu skill aplica al "orden de implementación para proyecto nuevo", agregalo en posición lógica

### 8. Documentá en CHANGELOG

Agregá entrada en `CHANGELOG.md` bajo `[Unreleased]` (creala si no existe) en sección `Added`.

---

## Cómo proponer cambios al playbook (`playbook/*.md`)

Los archivos en `playbook/` son educacionales para humanos. Reglas:

- **Sin frontmatter YAML** — son docs, no skills
- **Acentos correctos** en español — Técnico, métrica, búsqueda, etc.
- **Code snippets**: Next.js 16 App Router, Tailwind v4 puro (no daisy-ui)
- **Links cruzados**: usar paths relativos
- **Sin referencias internas a "Skill del agente"** — esos headers se eliminaron en v2

---

## Style guide

### Markdown

- Headings: `#` solo para el título, `##` para secciones, `###` para subsecciones
- Tablas: con header divider correcto
- Code blocks: con language hint (` ```tsx`, ` ```ts`, ` ```bash`)
- Listas: usar `-` para unordered, `1.` para ordered

### Lenguaje

- Español neutral con acentos correctos (no español rioplatense extremo)
- Tono directo, sin floreo
- Prefiero "vos sabés" a "usted sabe", pero "tú" también está OK
- Honestidad: si algo NO funciona, decirlo. Sin overpromising

### Code

- TypeScript estricto (sin `any`)
- Imports explícitos
- Sin emojis en código (salvo que el usuario los pida)

---

## PR checklist

Antes de abrir el PR, validá:

- [ ] Acentos correctos en todo el español
- [ ] Frontmatter YAML válido en `SKILL.md` (si aplica)
- [ ] Links cruzados funcionan (no apuntan a archivos movidos)
- [ ] CHANGELOG.md actualizado bajo `[Unreleased]`
- [ ] Sin referencias hardcoded a marcas privadas (LectorAI, TuApp, etc.)
- [ ] Sin code snippets con daisy-ui (`bg-base-200`, `text-base-content/*`)
- [ ] Si agregás skill, está reflejado en `agents/seo-marketing.md`

---

## Cuándo NO contribuir

- **No agregar links a tu propio sitio** sin valor educacional real
- **No publicar promociones** de tu propio SaaS
- **No reescribir contenido** sin proponer mejora concreta
- **No traducir el repo a otro idioma** sin discutirlo primero (issue first)

---

## Comunicación

Si tenés dudas o querés discutir algo grande antes de invertir tiempo:

- Issues: [github.com/curetcore/seo-geo-playbook/issues](https://github.com/curetcore/seo-geo-playbook/issues)
- Threads: [@ronaldships](https://www.threads.com/@ronaldships)
