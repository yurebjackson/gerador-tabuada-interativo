// ============================================================
// FitTrack Pro — Exercises Module
// ============================================================

let EXERCISES = [];

// ============================================================
// LOAD
// ============================================================
async function loadExercises() {
  try {
    const rows = await dbGetExercises();

    // Normaliza campos do banco para o formato interno da UI
    EXERCISES = rows.map(normalizeExercise);
    return EXERCISES;
  } catch (err) {
    console.error('loadExercises:', err);
    return [];
  }
}

// ============================================================
// Normalização banco → UI
// ============================================================
function normalizeExercise(row) {
  return {
    id:     row.id,
    name:   row.name,
    muscle: row.muscle_group  ?? '',
    series: row.series        ?? '3',
    reps:   row.reps          ?? '10',
    rest:   row.rest          ?? '60s',
    diff:   row.difficulty    ?? 'Iniciante',
    yt:     row.video_url     ?? '',
    desc:   row.description   ?? '',
  };
}

// ============================================================
// CREATE / UPDATE
// ============================================================
async function saveExercise() {
  const name = document.getElementById('neName').value.trim();
  if (!name) { showToast('Informe o nome do exercício'); return; }

  // Extrai ID do YouTube do link colado
  const ytRaw = document.getElementById('neYT').value.trim();
  let ytId = '';
  if (ytRaw) {
    const m = ytRaw.match(/(?:v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
    if (m) ytId = m[1];
  }

  const payload = {
    name,
    muscle_group: document.getElementById('neMuscle').value,
    series:       document.getElementById('neSeries').value || '3',
    reps:         document.getElementById('neReps').value   || '10',
    rest:         document.getElementById('neRest').value   || '60s',
    difficulty:   document.getElementById('neDiff').value,
    video_url:    ytId,
    description:  document.getElementById('neDesc').value.trim(),
  };

  setBtnLoading('btnSaveEx', true);

  try {
    if (editExId) {
      const updated = await dbUpdateExercise(editExId, payload);
      const idx = EXERCISES.findIndex(e => e.id === editExId);
      if (idx !== -1) EXERCISES[idx] = normalizeExercise(updated);
      showToast('Exercício atualizado!');
    } else {
      const created = await dbCreateExercise(payload);
      EXERCISES.push(normalizeExercise(created));
      showToast('Exercício cadastrado!');
    }

    closeM('moNewEx');
    rExercicios();
  } catch (err) {
    showToast('Erro: ' + err.message);
  } finally {
    setBtnLoading('btnSaveEx', false);
  }
}

// ============================================================
// DELETE
// ============================================================
async function delEx(id) {
  if (!confirm('Remover exercício?')) return;

  try {
    await dbDeleteExercise(id);
    EXERCISES = EXERCISES.filter(e => e.id !== id);
    showToast('Exercício removido');
    rExercicios();
  } catch (err) {
    showToast('Erro: ' + err.message);
  }
}

// ============================================================
// Helpers
// ============================================================
function getExerciseById(id) {
  return EXERCISES.find(e => e.id === id);
}

function searchExercises(term) {
  if (!term) return EXERCISES;
  const t = term.toLowerCase();
  return EXERCISES.filter(e =>
    e.name.toLowerCase().includes(t) ||
    e.muscle.toLowerCase().includes(t)
  );
}
