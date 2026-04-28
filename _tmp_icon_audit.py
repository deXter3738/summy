import pathlib, re
files = ['index.html', 'app.js']
used = set()
for f in files:
    t = pathlib.Path(f).read_text(encoding='utf-8')
    for m in re.finditer(r'ph-([A-Za-z0-9-]+)', t):
        n = m.group(1).lower()
        if n != 'fallback':
            used.add(n)

js = pathlib.Path('app.js').read_text(encoding='utf-8')
mm = re.search(r"const\s+phosphorFallbackMap\s*=\s*\{([\s\S]*?)\};", js)
mapset = set()
if mm:
    body = mm.group(1)
    for m in re.finditer(r"['\"]?([A-Za-z0-9-]+)['\"]?\s*:", body):
        mapset.add(m.group(1).lower())

missing = []
for u in sorted(used):
    if u == 'fallback':
        continue
    if u in mapset or u.replace('-fill','') in mapset:
        continue
    missing.append(u)

print('Used:', len(used))
print('Missing fallback:', ', '.join(missing) if missing else 'none')
