"""Extrai SVGs e formula-cards de index.html e renderiza como PNG em alta
resolução usando Chrome headless.

Saídas em vazao/relatorio/ — usadas pelo gerar_docx.py.
"""

import re
import subprocess
import tempfile
from pathlib import Path

HERE = Path(__file__).resolve().parent
CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"

# Ordem dos SVGs no HTML após remoção da tabela de tiers:
#   Figura 1 — Largura          (1 SVG)
#   Figura 2 — Profundidade     (2 SVGs: vista superior + corte)
#   Figura 3 — Velocidade       (1 SVG)
#   Figura 4 — Dose             (1 SVG)
SVG_NAMES = [
    "svg_largura",
    "svg_profundidade_top",
    "svg_profundidade_cross",
    "svg_velocidade",
    "svg_dose",
]

# Ordem dos formula-card no HTML:
#   1) Q = L × P × Vs × C       (em 2.2)
#   2) Vs = D / T               (em 2.2.3)
#   3) DOSE = PPM × ...         (em 2.2.4)
FORMULA_NAMES = [
    "formula_vazao",
    "formula_velocidade",
    "formula_dose",
]


def extract_svgs(html_text: str) -> list[str]:
    figures = re.findall(
        r'<figure class="river-diagram">(.*?)</figure>',
        html_text,
        re.DOTALL,
    )
    out = []
    for fig in figures:
        out.extend(re.findall(r"<svg.*?</svg>", fig, re.DOTALL))
    return out


def extract_formula_cards(html: str) -> list[str]:
    """Extrai cada <div class="formula-card">…</div> equilibrando divs aninhados."""
    cards = []
    needle = '<div class="formula-card">'
    i = 0
    while True:
        start = html.find(needle, i)
        if start == -1:
            break
        depth = 0
        j = start
        while j < len(html):
            if html.startswith("<div", j) and (j + 4 < len(html) and html[j + 4] in " >\t\n"):
                depth += 1
                j += 4
            elif html.startswith("</div>", j):
                depth -= 1
                j += 6
                if depth == 0:
                    cards.append(html[start:j])
                    break
            else:
                j += 1
        i = j
    return cards


def viewbox_height(svg: str, target_width: int = 800) -> int:
    m = re.search(r'viewBox="0 0 ([\d.]+) ([\d.]+)"', svg)
    if not m:
        return 600
    w, h = float(m.group(1)), float(m.group(2))
    return round(target_width * h / w)


def chrome_screenshot(html: str, out_path: Path, win_w: int, win_h: int,
                      scale: int = 3) -> None:
    with tempfile.NamedTemporaryFile(
        mode="w", suffix=".html", delete=False, encoding="utf-8"
    ) as f:
        f.write(html)
        wrapper_path = Path(f.name)
    try:
        subprocess.run(
            [
                CHROME,
                "--headless",
                "--disable-gpu",
                "--hide-scrollbars",
                "--no-sandbox",
                f"--screenshot={out_path}",
                f"--window-size={win_w},{win_h}",
                f"--force-device-scale-factor={scale}",
                "--virtual-time-budget=10000",
                f"file://{wrapper_path}",
            ],
            check=True,
            capture_output=True,
            timeout=60,
        )
    finally:
        wrapper_path.unlink(missing_ok=True)


def render_svg(svg: str, out_path: Path, scale: int = 3) -> None:
    target_w = 800
    target_h = viewbox_height(svg, target_w)
    pad_bottom = 80

    svg_sized = re.sub(
        r"<svg\b",
        f'<svg width="{target_w}" height="{target_h}"',
        svg,
        count=1,
    )

    wrapper = f"""<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <style>
    html, body {{ margin: 0; padding: 0; background: #ffffff; overflow: visible; }}
    body {{ font-family: 'Inter', system-ui, -apple-system, sans-serif; }}
    svg {{ display: block; }}
  </style>
</head>
<body>
{svg_sized}
</body>
</html>
"""
    chrome_screenshot(wrapper, out_path, target_w, target_h + pad_bottom, scale)

    try:
        from PIL import Image
        img = Image.open(out_path)
        cropped = img.crop((0, 0, target_w * scale, target_h * scale))
        cropped.save(out_path)
    except ImportError:
        pass


# CSS replicando o necessário de styles.css para o .formula-card
FORMULA_CSS = """
:root { --red-light: #e08574; }
* { box-sizing: border-box; margin: 0; padding: 0; }
html, body { background: #ffffff; }
body {
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
  padding: 16px;
}
.formula-card {
  background: linear-gradient(135deg, #1a1414, #2a201d);
  color: #fff;
  padding: 26px 30px;
  border-radius: 14px;
  box-shadow: 0 20px 40px rgba(200, 57, 47, 0.08);
  width: 720px;
}
.formula-eq {
  font-size: 24px;
  font-weight: 800;
  letter-spacing: -0.01em;
  text-align: center;
  padding: 14px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.12);
  margin-bottom: 16px;
  color: #fff;
}
.formula-eq sub {
  font-size: 0.65em;
  vertical-align: sub;
  color: var(--red-light);
}
.formula-vars {
  list-style: none;
  display: grid;
  gap: 6px;
  font-size: 13.5px;
}
.formula-vars li {
  color: rgba(255, 255, 255, 0.85);
  padding-left: 16px;
  position: relative;
  line-height: 1.6;
}
.formula-vars li::before {
  content: "";
  position: absolute;
  left: 0;
  top: 9px;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--red-light);
}
.formula-vars strong {
  color: #fff;
  font-weight: 800;
  font-variant-numeric: tabular-nums;
}
.formula-vars sub {
  color: var(--red-light);
  vertical-align: sub;
  font-size: 0.85em;
}
"""


def render_formula_card(card_html: str, out_path: Path, scale: int = 3) -> None:
    win_w = 760  # 720 (card) + 16+16 (body padding) + 8 folga
    win_h = 600  # excesso; cropamos com PIL

    wrapper = f"""<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <style>{FORMULA_CSS}</style>
</head>
<body>
{card_html}
</body>
</html>
"""
    chrome_screenshot(wrapper, out_path, win_w, win_h, scale)

    # Cropa as bordas brancas (top/bottom) preservando algum padding lateral
    try:
        from PIL import Image, ImageChops

        img = Image.open(out_path).convert("RGB")
        # Detecta região não-branca
        bg = Image.new("RGB", img.size, (255, 255, 255))
        diff = ImageChops.difference(img, bg)
        bbox = diff.getbbox()
        if bbox:
            # Adiciona pequena margem (16px no scale=3 → 48px reais)
            margin = 16 * scale
            left = max(0, bbox[0] - margin)
            top = max(0, bbox[1] - margin)
            right = min(img.size[0], bbox[2] + margin)
            bottom = min(img.size[1], bbox[3] + margin)
            img.crop((left, top, right, bottom)).save(out_path)
    except ImportError:
        pass


def main() -> None:
    html = (HERE.parent / "index.html").read_text(encoding="utf-8")

    # SVGs
    svgs = extract_svgs(html)
    print(f"SVGs encontrados: {len(svgs)}")
    if len(svgs) != len(SVG_NAMES):
        print(
            f"AVISO: esperado {len(SVG_NAMES)} SVGs, encontrado {len(svgs)}"
        )
    for name, svg in zip(SVG_NAMES, svgs):
        out = HERE / f"{name}.png"
        print(f"  → {out.name}", end=" ", flush=True)
        render_svg(svg, out)
        print(f"({out.stat().st_size / 1024:.0f} KB)")

    # Formula cards
    cards = extract_formula_cards(html)
    print(f"Formula cards encontrados: {len(cards)}")
    if len(cards) != len(FORMULA_NAMES):
        print(
            f"AVISO: esperado {len(FORMULA_NAMES)} cards, encontrado {len(cards)}"
        )
    for name, card in zip(FORMULA_NAMES, cards):
        out = HERE / f"{name}.png"
        print(f"  → {out.name}", end=" ", flush=True)
        render_formula_card(card, out)
        print(f"({out.stat().st_size / 1024:.0f} KB)")

    print("OK")


if __name__ == "__main__":
    main()
