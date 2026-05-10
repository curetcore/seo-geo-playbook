# Skills — Sub-skills instalables

10 sub-skills de SEO/GEO instalables en Claude Code. Pueden usarse:

- **Coordinados por el agente** [`../agents/seo-marketing.md`](../agents/seo-marketing.md) (recomendado para tasks complejos)
- **Invocados directamente** cuando ya sabés qué pilar querés trabajar

---

## Instalación

```bash
# Desde la raíz del repo
cp -r skills/seo-* ~/.claude/skills/

# Verificar
ls ~/.claude/skills/ | grep seo-
```

Después de copiarlos, Claude Code los reconoce automáticamente en el próximo inicio.

---

## Tabla de skills con triggers

| Skill | Cuándo se activa | Reference files | Bundled scripts |
|-------|------------------|----------------:|----------------:|
| [`seo-technical`](./seo-technical/) | Core Web Vitals, lighthouse, robots.ts, sitemap, security headers, slow page | 3 | — |
| [`seo-on-page`](./seo-on-page/) | Meta tags, OG, Twitter Card, headings, alt text, anchor text, internal linking | 3 | — |
| [`seo-ai-geo`](./seo-ai-geo/) ⭐ | llms.txt, AI Overviews, GPTBot, ClaudeBot, ChatGPT citations, BLUF, citability | 3 | — |
| [`seo-content-strategy`](./seo-content-strategy/) | Blog strategy, content clusters, pillar pages, E-E-A-T, keyword research | 1 | — |
| [`seo-local`](./seo-local/) | Google Business Profile, NAP, multi-location, LocalBusiness schema | 1 | — |
| [`seo-analytics`](./seo-analytics/) | GSC, web-vitals RUM, AI referral tracking, rank tracking | — | — |
| [`seo-growth-engine`](./seo-growth-engine/) ⭐ | Programmatic SEO, niche pages, tools, comparativas, blog at scale, Product Hunt | 5 | — |
| [`seo-slug-dates`](./seo-slug-dates/) | 50+ páginas programáticas, anti-batch signal, content farm detection | — | 1 |
| [`seo-nextjs-implementation`](./seo-nextjs-implementation/) | JSON-LD, structured data, generateMetadata, schema.org markup | — | 1 |
| [`seo-audit-website`](./seo-audit-website/) | Full site audit, broken links, lighthouse-style report | — | — |

---

## Cómo invocar un skill directamente

En Claude Code:

```
@seo-ai-geo Necesito implementar llms.txt en mi proyecto Next.js.
```

O dejá que Claude detecte automáticamente desde el `description` pushy del skill:

```
ChatGPT no está mencionando mi SaaS cuando le preguntan por
herramientas BI. Cómo arreglo eso?
```

Claude Code detecta los triggers (`ChatGPT citations`, `AI search`) y carga `seo-ai-geo`.

---

## Estructura de un skill

```
seo-ai-geo/
├── SKILL.md                    # Obligatorio — instrucciones para Claude
│   ├── YAML frontmatter        # name, description (pushy)
│   └── Markdown instructions
└── references/                 # Detalles profundos cargados on-demand
    ├── llms-txt-template.md
    ├── ai-bots-table.md
    └── citability-patterns.md
```

Algunos skills también tienen `scripts/` con código bundled (`.ts`, `.py`) que Claude puede ejecutar directamente.

---

## Reglas transversales (todos los skills)

Todos los skills aplican estas reglas:

1. **INP, NO FID** — FID está deprecado desde marzo 2024
2. **LCP < 2.5s, INP < 200ms, CLS < 0.1** — los Core Web Vitals 2026
3. **Contenido para humanos** — semántico, no keyword stuffing
4. **BLUF obligatorio** — respuesta primero, detalles después
5. **Code en App Router** — Next.js 16 RSC válido
6. **Schema tipado** — `schema-dts` para JSON-LD type-safe
7. **NUNCA inventar `aggregateRating`** — Google penaliza fake reviews

---

## Mantener los skills actualizados

```bash
cd ~/Projects/seo-geo-playbook  # o donde clonaste el repo
git pull origin main
cp -r skills/seo-* ~/.claude/skills/
```

Los breaking changes están documentados en [`../CHANGELOG.md`](../CHANGELOG.md).

---

## Customización

Si querés adaptar un skill a tu workflow:

1. Copialo a `~/.claude/skills/` (no edites el del repo)
2. Modificá `SKILL.md` o agregá `references/` extra
3. Si tu cambio es genérico, abrí PR ([`../CONTRIBUTING.md`](../CONTRIBUTING.md))

---

## Verificación post-instalación

```bash
# 1. Frontmatters parsean
python3 << 'EOF'
import yaml, re
import os
for d in sorted(os.listdir(f"{os.environ['HOME']}/.claude/skills")):
    if not d.startswith('seo-'): continue
    p = f"{os.environ['HOME']}/.claude/skills/{d}/SKILL.md"
    if not os.path.exists(p): continue
    with open(p) as f:
        content = f.read()
    m = re.match(r'^---\n(.*?)\n---', content, re.DOTALL)
    fm = yaml.safe_load(m.group(1))
    print(f"  ✓ {fm['name']}")
EOF

# 2. Claude Code los reconoce
# Iniciá Claude Code en cualquier proyecto Next.js y probá:
# > "necesito audit técnico de SEO"
# Debería invocar seo-technical.
```

---

## Troubleshooting

**El agente o un skill no se invoca aunque el pedido parece relevante.**

Causa típica: el `description` del skill no tiene los triggers que el usuario está usando. Solución: editar la `description` del skill local en `~/.claude/skills/seo-X/SKILL.md` agregando los triggers que faltan, o abrir issue en el repo.

**Errores de YAML al cargar skills.**

Verificá que el frontmatter no tenga caracteres especiales sin escapar. Validá con el script de la sección "Verificación post-instalación".

**Bundled scripts (`seo.ts`, `dates.ts`) no funcionan.**

Estos scripts no se ejecutan automáticamente — son **referencia para copiar a tu proyecto**. Por ejemplo, `seo.ts` se copia a `src/lib/seo.ts` de tu proyecto Next.js.
