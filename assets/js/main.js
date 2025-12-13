
const MODES=['Crimson Mirage','Red Sigil Brutalism','Infernum Gloss','Astral Obscura','Memory Dust','Voidpoint','Neon Obscura','Liquid Chromate','Neuro Wraith'];
document.addEventListener('DOMContentLoaded',()=>{
 const g=document.getElementById('grid');
 MODES.forEach(m=>{const d=document.createElement('div');d.className='card';d.textContent=m;g.appendChild(d);});
 document.getElementById('menu').onclick=()=>document.getElementById('drawer').classList.toggle('open');
 if('serviceWorker' in navigator){navigator.serviceWorker.register('sw.js');}
});
