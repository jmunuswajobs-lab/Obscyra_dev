
const CONTENT = {
  modes:[
    {id:'crimson',title:'Crimson Mirage',desc:'Baroque fetish textures, ritual lighting, red gloss and deep shadows.'},
    {id:'redbrute',title:'Red Sigil Brutalism',desc:'Blocky sigils, high-contrast red on black, pulp textures.'},
    {id:'infernum',title:'Infernum Gloss',desc:'Wet-look surfaces, molten reflections.'},
    {id:'astral',title:'Astral Obscura',desc:'Monochrome particle washes, silhouette emphasis.'},
    {id:'memory',title:'Memory-Dust Dissolution',desc:'Faded granulometry, time-worn palettes.'},
    {id:'voidpoint',title:'Voidpoint Luminography',desc:'Pseudo-3D void wells, rim-lighting, volumetric fog.'},
    {id:'neon',title:'Neon Obscura',desc:'Biotech neon, iridescent fluids.'},
    {id:'liquid',title:'Liquid Chromate',desc:'Chromatic liquids, surreal anatomy.'},
    {id:'obscyra',title:'Obscyra Harmonizer',desc:'Unified mode: tri-noir fusion (Crimson + Astral + Neon).'}
  ],
  sigils:[
    {id:'tri',name:'Tri-Noir',svg:'<svg width="128" height="128" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="g1" x1="0" x2="1"><stop offset="0" stop-color="#ff2d55"/><stop offset="1" stop-color="#6b00ff"/></linearGradient></defs><circle cx="50" cy="50" r="44" fill="#07060a" stroke="url(#g1)" stroke-width="4"/><path d="M22 72 L50 20 L78 72 Z" fill="none" stroke="#fff" stroke-width="2"/></svg>'},
    {id:'part',name:'Particle Wreath',svg:'<svg width="128" height="128" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><g fill="none" stroke="#fff" stroke-opacity="0.9"><circle cx="50" cy="50" r="34" stroke-width="1.2"/><g opacity="0.7'></g></g></svg>'},
    {id:'wreath',name:'Wreath',svg:'<svg width="128" height="128" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><g stroke="#fff" fill="none"><path d="M10,50 C25,20 75,20 90,50 C75,80 25,80 10,50 Z" stroke-width="1.5"/></g></svg>'}
  ],
  prompts:[
    {mode:'crimson',text:'Crimson Mirage: dramatic baroque lighting, red lacquer surfaces, ritual props, 35mm lens, shallow DOF.'}
  ]
};

function renderUI(){
  const modesList = document.getElementById('modesList');
  CONTENT.modes.forEach(m=>{
    const el = document.createElement('div'); el.className='mode';
    el.innerHTML = '<strong>'+m.title+'</strong><div style="color:var(--muted);margin-top:6px">'+m.desc+'</div>';
    modesList.appendChild(el);
  });
  const sb = document.getElementById('sigilBoard');
  CONTENT.sigils.forEach(s=>{
    const wrap = document.createElement('div'); wrap.className='sigil'; wrap.title = s.name; wrap.innerHTML = s.svg;
    wrap.addEventListener('click', ()=>{ navigator.clipboard.writeText(s.svg).then(()=>alert(s.name+' SVG copied to clipboard')); });
    sb.appendChild(wrap);
  });
  const promptsList = document.getElementById('promptsList');
  CONTENT.prompts.forEach(p=>{
    const d = document.createElement('div'); d.style.marginBottom='10px'; d.innerHTML='<strong>'+p.mode+'</strong><div style="color:var(--muted)">'+p.text+'</div>'; promptsList.appendChild(d);
  });
}

function applyTheme(t){ document.documentElement.setAttribute('data-theme', t); localStorage.setItem('obscyra-theme', t); }
document.addEventListener('DOMContentLoaded', ()=>{
  renderUI();
  const saved = localStorage.getItem('obscyra-theme') || 'dark'; applyTheme(saved);
  document.getElementById('themeBtn').addEventListener('click', ()=> applyTheme(document.documentElement.getAttribute('data-theme')==='dark'?'light':'dark'));
  const q = document.getElementById('q');
  q.addEventListener('input', ()=> {
    const v = q.value.trim().toLowerCase();
    document.querySelectorAll('.mode').forEach(m=>{
      m.style.display = v ? (m.innerText.toLowerCase().includes(v) ? '' : 'none') : '';
    });
  });
  let deferredPrompt; const installBtn = document.getElementById('installBtn');
  window.addEventListener('beforeinstallprompt', (e)=>{ e.preventDefault(); deferredPrompt = e; installBtn.style.display='inline-block'; });
  installBtn.addEventListener('click', async ()=>{ if(!deferredPrompt) return; deferredPrompt.prompt(); deferredPrompt=null; installBtn.style.display='none'; });
  if('serviceWorker' in navigator){ navigator.serviceWorker.register('sw.js').then(()=>console.log('sw ok')).catch(()=>console.warn('sw fail')); }
});
