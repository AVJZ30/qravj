from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlsplit,unquote
import json,hashlib,xml.etree.ElementTree as ET,tomllib
root=Path(__file__).resolve().parents[1];pub=root/'public'
class Parser(HTMLParser):
 def __init__(self,s):
  super().__init__();self.tags=[];self.jsons=[];self.collect=False;self.feed(s)
 def handle_starttag(self,t,a):
  d=dict(a);self.tags.append((t,d))
  if t=='script' and d.get('type')=='application/ld+json': self.collect=True
 def handle_endtag(self,t):
  if t=='script':self.collect=False
 def handle_data(self,s):
  if self.collect:self.jsons.append(json.loads(s))
urls=[x.text for x in ET.parse(pub/'sitemap.xml').findall('.//{*}loc')];metadata=json.loads((root/'docs/metadatos-y-palabras-clave.json').read_text());assert set(urls)=={p['url'] for p in metadata};assert len(urls)==8
count=0
for f in pub.rglob('*.html'):
 if f.name.startswith('google'):continue
 p=Parser(f.read_text());ids=[a['id'] for t,a in p.tags if 'id' in a];assert len(ids)==len(set(ids)),f
 for t,a in p.tags:
  for attr in ['href','src']:
   val=a.get(attr,'');u=urlsplit(val)
   if not val or u.scheme or val.startswith('#'):continue
   target=pub/unquote(u.path).lstrip('/') if val.startswith('/') else f.parent/unquote(u.path)
   assert target.exists(),(f,val)
 if f.name!='404.html':
  assert len([a for t,a in p.tags if t=='link' and a.get('rel')=='canonical'])==1
  assert p.jsons
 count+=1
assert hashlib.sha256((pub/'config.js').read_bytes()).hexdigest()=='bfc36f2622f584ab6fd7c054f3253cf6310c4425c65652f63450551fb150e953'
assert hashlib.sha256((pub/'guest.js').read_bytes()).hexdigest()=='46d03ce5a419ac56d78fb53d5781ea474537401df85e7a8aebbf4747587e4aa7'
config=tomllib.loads((root/'netlify.toml').read_text());assert config['build']['publish']=='public'
result={'html_checked':count,'sitemap_urls':len(urls),'passed':['Local links and assets exist','Unique IDs','One canonical per public HTML','Valid JSON-LD, sitemap XML, manifest JSON and Netlify TOML','config.js and guest.js byte-identical to originals']}
json.loads((pub/'site.webmanifest').read_text());(root/'docs/pruebas-estaticas.json').write_text(json.dumps(result,indent=2));print(json.dumps(result,indent=2))
