const filters = document.getElementById('team-filters');

if (filters) {
  const search = document.getElementById('busqueda');
  const cards = [...document.querySelectorAll('.team-card')];
  const count = document.getElementById('team-results');
  const empty = document.getElementById('team-empty');
  const fields = ['tipo', 'universidad'];
  const normalize = (value) => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();

  function updateResults() {
    const words = normalize(search.value).split(/\s+/).filter(Boolean);
    let visible = 0;
    cards.forEach((card) => {
      const name = normalize(card.dataset.nombre);
      const matchesName = words.every((word) => name.includes(word));
      const matchesFields = fields.every((field) => {
        const value = document.getElementById(field).value;
        return !value || (card.dataset[field] || '').split(' ').includes(value);
      });
      card.hidden = !(matchesName && matchesFields);
      if (card.hidden) card.querySelector('details').open = false;
      else visible += 1;
    });
    count.textContent = `${visible} de ${cards.length} perfiles`;
    empty.hidden = visible > 0;
  }

  filters.addEventListener('input', updateResults);
  filters.addEventListener('change', updateResults);
  filters.addEventListener('submit', (event) => event.preventDefault());
  filters.addEventListener('reset', (event) => {
    event.preventDefault();
    search.value = '';
    fields.forEach((field) => { document.getElementById(field).value = ''; });
    updateResults();
    search.focus();
  });
  document.getElementById('empty-reset').addEventListener('click', () => filters.reset());
  updateResults();
}
