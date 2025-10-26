async function loadProjects(){
  const list = document.getElementById('projects-list');
  try{
    const res = await fetch('/api/projects');
    if(!res.ok) throw new Error('Gagal memuat API');
    const projects = await res.json();
    list.innerHTML = '';
    projects.forEach(p => {
      const li = document.createElement('li');
      li.innerHTML = `<h3>${escapeHtml(p.title)}</h3>
                      <p>${escapeHtml(p.description)}</p>
                      <p class="muted">Teknologi: ${escapeHtml(p.tech)}</p>
                      ${p.link ? `<p><a href="${p.link}" target="_blank">Demo / Figma</a></p>` : ''}`;
      list.appendChild(li);
    });
  }catch(err){
    list.innerHTML = '<li>Terjadi kesalahan saat memuat proyek.</li>';
    console.error(err);
  }
}

function escapeHtml(str){
  if(!str) return '';
  return str.replace(/[&<>\"]/g, s => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[s]));
}

document.getElementById('year').textContent = new Date().getFullYear();
loadProjects();