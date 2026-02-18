// 1) LISTA DE IMÁGENES (actualiza aquí)
// Coloca tus fotos en /portfolio/ con nombres p001.jpg, p002.jpg, etc.
// Si usas otra carpeta (ej: images/portfolio/), cambia el "basePath".
const basePath = "portfolio/";

// Puedes meter 24, 60, 120... y automáticamente crea páginas de 12.
const items = [
  { src: "p001.png", label: "Look 01" },
  { src: "p002.png", label: "Look 02" },
  { src: "p003.png", label: "Look 03" },
  { src: "p004.png", label: "Look 04" },
  { src: "p005.png", label: "Look 05" },
  { src: "p006.jpg", label: "Look 06" },
  { src: "p007.png", label: "Look 07" },
  { src: "p008.png", label: "Look 08" },
  { src: "p009.png", label: "Look 09" },
  { src: "p010.png", label: "Look 10" },
  { src: "p011.png", label: "Look 11" },
  { src: "p012.png", label: "Look 12" },
  // --- agrega más para que existan más "páginas" ---
  { src: "p013.png", label: "Look 13" },
  { src: "p014.png", label: "Look 14" },
  { src: "p015.png", label: "Look 15" },
  { src: "p016.png", label: "Look 16" },
  { src: "p017.png", label: "Look 17" },
  { src: "p018.jpg", label: "Look 18" },
  { src: "p019.jpg", label: "Look 19" },
  { src: "p020.png", label: "Look 20" },
  { src: "p021.png", label: "Look 21" },
  { src: "p022.png", label: "Look 22" },
  { src: "p023.png", label: "Look 23" },
  { src: "p024.png", label: "Look 24" },
   // --- agrega más para que existan más "páginas" ---
  { src: "p025.png", label: "Look 25" },
  { src: "p026.png", label: "Look 26" },
  { src: "p027.png", label: "Look 27" },
  { src: "p028.png", label: "Look 28" },
  { src: "p029.png", label: "Look 29" },
  { src: "p030.png", label: "Look 30" },
  { src: "p031.png", label: "Look 31" },
  { src: "p032.png", label: "Look 32" },
  { src: "p033.png", label: "Look 33" },
  { src: "p034.png", label: "Look 34" },
  { src: "p035.png", label: "Look 35" },
  { src: "p036.png", label: "Look 36" },
  // --- agrega más para que existan más "páginas" ---
  { src: "p037.png", label: "Look 37" },
  { src: "p038.png", label: "Look 38" },
  { src: "p039.png", label: "Look 39" },
  { src: "p040.png", label: "Look 40" },
  { src: "p041.png", label: "Look 41" },
  { src: "p042.png", label: "Look 42" },
  { src: "p043.png", label: "Look 43" },
  { src: "p044.png", label: "Look 44" },
  { src: "p045.png", label: "Look 45" },
  { src: "p046.png", label: "Look 46" },
  { src: "p047.png", label: "Look 47" },
  { src: "p048.png", label: "Look 48" },
   // --- agrega más para que existan más "páginas" ---
  { src: "p049.png", label: "Look 49" },
  { src: "p050.png", label: "Look 50" },
  { src: "p051.png", label: "Look 51" },
  { src: "p052.png", label: "Look 52" },
  { src: "p053.png", label: "Look 53" },
  { src: "p054.png", label: "Look 54" },
  { src: "p055.png", label: "Look 55" },
  { src: "p056.png", label: "Look 56" },
  { src: "p057.png", label: "Look 57" },
  { src: "p058.png", label: "Look 58" },
  { src: "p059.png", label: "Look 59" },
  { src: "p060.png", label: "Look 60" },
];

const PAGE_SIZE = 12;

// Helpers
function getPageFromUrl(){
  const params = new URLSearchParams(window.location.search);
  const p = parseInt(params.get("page") || "1", 10);
  return Number.isFinite(p) && p > 0 ? p : 1;
}
function setPageInUrl(page){
  const url = new URL(window.location.href);
  url.searchParams.set("page", String(page));
  window.history.pushState({}, "", url);
}

function render(){
  const gallery = document.getElementById("gallery");
  const pager = document.getElementById("pager");
  if (!gallery || !pager) return;

  const totalPages = Math.max(1, Math.ceil(items.length / PAGE_SIZE));
  let page = getPageFromUrl();
  if (page > totalPages) page = totalPages;

  const start = (page - 1) * PAGE_SIZE;
  const pageItems = items.slice(start, start + PAGE_SIZE);

  // Gallery
  gallery.innerHTML = pageItems.map((it) => `
    <a class="tile" href="${basePath}${it.src}" target="_blank" rel="noopener">
      <img src="${basePath}${it.src}" alt="${it.label}">
      <span class="label">${it.label}</span>
    </a>
  `).join("");

  // Pager
  const prevDisabled = page <= 1 ? "disabled" : "";
  const nextDisabled = page >= totalPages ? "disabled" : "";

  let pageButtons = "";
  for(let i=1; i<=totalPages; i++){
    const active = i === page ? "active" : "";
    pageButtons += `<button class="pagebtn ${active}" data-page="${i}">${i}</button>`;
  }

  pager.innerHTML = `
    <button id="prev" ${prevDisabled}>← Prev</button>
    ${pageButtons}
    <button id="next" ${nextDisabled}>Next →</button>
  `;

  // Events
  const prev = document.getElementById("prev");
  const next = document.getElementById("next");

  if (prev) prev.onclick = () => { setPageInUrl(page - 1); render(); window.scrollTo({top:0, behavior:"smooth"}); };
  if (next) next.onclick = () => { setPageInUrl(page + 1); render(); window.scrollTo({top:0, behavior:"smooth"}); };

  pager.querySelectorAll("button[data-page]").forEach(btn => {
    btn.addEventListener("click", () => {
      const target = parseInt(btn.getAttribute("data-page"), 10);
      setPageInUrl(target);
      render();
      window.scrollTo({top:0, behavior:"smooth"});
    });
  });
}

window.addEventListener("popstate", render);
document.addEventListener("DOMContentLoaded", render);
