const input = document.getElementById('encounterInput');
    const display = document.getElementById('encounterDisplay');
    const editSection = document.getElementById('editSection');

    let encounters = JSON.parse(localStorage.getItem('encounters')) || [];

    function saveEncounters() {
      localStorage.setItem('encounters', JSON.stringify(encounters));
    }

    function addEncounter() {
      const text = input.value.trim();
      if (text) {
        encounters.push(text);
        saveEncounters();
        input.value = '';
        renderEditList();
      }
    }

    function showRandomEncounter() {
      if (encounters.length === 0) {
        display.textContent = 'No encounters available.';
        return;
      }
      const random = encounters[Math.floor(Math.random() * encounters.length)];
      display.textContent = `🧭 Encounter: ${random}`;
    }

    function toggleEdit() {
      editSection.style.display = editSection.style.display === 'none' ? 'block' : 'none';
      renderEditList();
    }

    function deleteEncounter(index) {
      encounters.splice(index, 1);
      saveEncounters();
      renderEditList();
    }

    function renderEditList() {
      editSection.innerHTML = '';
      encounters.forEach((enc, i) => {
        const div = document.createElement('div');
        div.className = 'encounterItem';

        const span = document.createElement('span');
        span.className = 'encounterText';
        span.textContent = enc;

        const btn = document.createElement('button');
        btn.className = 'deleteBtn';
        btn.textContent = '🗑';
        btn.onclick = () => deleteEncounter(i);

        div.appendChild(span);
        div.appendChild(btn);
        editSection.appendChild(div);
      });
    }