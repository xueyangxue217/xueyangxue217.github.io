#!/usr/bin/env python3
"""Recompress + right-size the JPGs in public/assets IN PLACE.

Same filenames/paths → zero code changes. Only downscales (never upscales),
re-encodes as progressive JPEG q=82. Big size win, visually near-lossless.
"""
import os
from PIL import Image

Image.MAX_IMAGE_PIXELS = None  # some source posters are huge

ROOT = os.path.join(os.path.dirname(__file__), "..", "public", "assets")

# max long-edge per folder (only shrinks images larger than this)
CAPS = {
    "hero": 1920,      # full-bleed background
    "projects": 1600,  # lightbox full view
    "posters": 1600,   # archive overlay full view
    "life": 1200,      # stack cards (retina)
    "more": 1000,      # 4:5 cards ~440px display
    "home": 1000,      # 3:4 cover cards
    "about": 1200,     # selfie
}
DEFAULT_CAP = 1600
QUALITY = 82


def cap_for(path):
    rel = os.path.relpath(path, ROOT)
    top = rel.split(os.sep)[0]
    return CAPS.get(top, DEFAULT_CAP)


def process(path):
    before = os.path.getsize(path)
    cap = cap_for(path)
    with Image.open(path) as im:
        im = im.convert("RGB")
        w, h = im.size
        long_edge = max(w, h)
        if long_edge > cap:
            scale = cap / long_edge
            im = im.resize((round(w * scale), round(h * scale)), Image.LANCZOS)
        im.save(path, "JPEG", quality=QUALITY, optimize=True, progressive=True)
    after = os.path.getsize(path)
    return before, after


def main():
    total_b = total_a = n = 0
    for dirpath, _, files in os.walk(ROOT):
        for f in files:
            if f.lower().endswith((".jpg", ".jpeg")):
                b, a = process(os.path.join(dirpath, f))
                total_b += b
                total_a += a
                n += 1
    mb = 1024 * 1024
    print(f"{n} images: {total_b/mb:.1f} MB -> {total_a/mb:.1f} MB "
          f"({100*(1-total_a/total_b):.0f}% smaller)")


if __name__ == "__main__":
    main()
