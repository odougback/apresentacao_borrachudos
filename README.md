# Material Técnico — Controle de Borrachudos

Material técnico web em formato interativo sobre **controle biológico de mosquitos borrachudos (simulídeos)** com base no uso de _Bacillus thuringiensis israelensis_ (Bti).

## Conteúdo

16 páginas cobrindo:

1. Capa — Controle Biológico de Mosquitos Borrachudos
2. Ciclo de vida dos borrachudos
3. Criadouros
4. Por que controlar?
5. Métodos de controle
6. VectoBac® 12AS
7. Modo de ação do Bti
8. Como a dose de Bti é calculada
9. Calibrando o regador
10. Aplicação do Bti em campo
11. Fatores variáveis para a aplicação
12. Carreamento do Bti no curso d'água
13–14. Análise comparativa de produtos comerciais
15. Considerações finais
16. Obrigado

## Como usar

Abra o `borrachudos/index.html` em qualquer navegador moderno.

### Controles

| Ação | Comando |
|------|---------|
| Próxima página | `→` · `Espaço` · `PageDown` · clique direito da tela · swipe ← |
| Página anterior | `←` · `PageUp` · clique esquerdo da tela · swipe → |
| Primeira página | `Home` |
| Última página | `End` |
| Tela cheia | `F` · botão ⛶ |
| Pular para página | clique nos pontos do rodapé |

## Stack

Site em HTML + CSS + JavaScript puro. Sem dependências de runtime.
Build/otimização opcional com Node.js + sharp (apenas para conversão de imagens).

## Estrutura

```
.
├── borrachudos/             # site (deploy desta pasta como raiz do domínio)
│   ├── index.html
│   ├── styles.css
│   ├── script.js
│   ├── manifest.json        # PWA
│   ├── sw.js                # service worker
│   ├── favicon.svg
│   ├── icon-maskable.svg
│   ├── robots.txt
│   ├── sitemap.xml
│   └── img/                 # 16 páginas em WebP
├── convert.js               # script de PNG→WebP (build)
├── package.json             # dependências de build (sharp)
└── README.md
```
