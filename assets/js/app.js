
async function load(id,file){
 const r=await fetch(file);
 document.getElementById(id).textContent=await r.text();
}
load('brandContent','content/brand/manifesto.md');
load('modesContent','content/modes/neon-obscura.md');
load('housesContent','content/houses/crimson-house.md');
load('promptsContent','content/prompts/base-style.md');
load('sigilsContent','content/sigils/theory.md');
