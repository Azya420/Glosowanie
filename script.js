const ORDERS = [
  { id: 'KAN-136', name: 'Alien' },
  { id: 'KAN-244', name: 'Bakugan' },
  { id: 'KAN-218', name: 'Balrog' },
  { id: 'KAN-235', name: 'Beholder' },
  { id: 'KAN-215', name: 'Cezar - Maciej Kisiel' },
  { id: 'KAN-225', name: 'Czarodziejka' },
  { id: 'KAN-263', name: 'Dogo Malfoy' },
  { id: 'KAN-210', name: 'dziki' },
  { id: 'KAN-236', name: 'Ekipa RPG' },
  { id: 'KAN-237', name: 'Ekipa RPG2' },
  { id: 'KAN-267', name: 'Figurki ze sklepu' },
  { id: 'KAN-232', name: 'Głowa' },
  { id: 'KAN-254', name: 'Gothic' },
  { id: 'KAN-249', name: 'Gryf' },
  { id: 'KAN-180', name: 'Insert' },
  { id: 'KAN-216', name: 'Iron Man' },
  { id: 'KAN-259', name: 'Jarl z Nastrond' },
  { id: 'KAN-213', name: 'Kluczyk do Mercedesa' },
  { id: 'KAN-262', name: 'Kociak' },
  { id: 'KAN-214', name: 'Kosze - Maciej Kisiel' },
  { id: 'KAN-256', name: 'Krasnolud' },
  { id: 'KAN-211', name: 'kucyk' },
  { id: 'KAN-247', name: 'Kucyki' },
  { id: 'KAN-227', name: 'Laska z Karabinem' },
  { id: 'KAN-223', name: 'Lew' },
  { id: 'KAN-268', name: 'Lew' },
  { id: 'KAN-220', name: 'Maska' },
  { id: 'KAN-202', name: 'modyfikacje modelu' },
  { id: 'KAN-212', name: 'Monety' },
  { id: 'KAN-245', name: 'Piłkarz' },
  { id: 'KAN-230', name: 'Podróżnik' },
  { id: 'KAN-224', name: 'replika' },
  { id: 'KAN-251', name: 'Replika' },
  { id: 'KAN-194', name: 'Roman Reigns' },
  { id: 'KAN-250', name: 'RPG Laski' },
  { id: 'KAN-240', name: 'Runebound' },
  { id: 'KAN-233', name: 'Rycerz' },
  { id: 'KAN-248', name: 'Saruman' },
  { id: 'KAN-231', name: 'Smok' },
  { id: 'KAN-234', name: 'Talisman' },
  { id: 'KAN-228', name: 'Warhammer' },
  { id: 'KAN-258', name: 'Wiewiórki' },
  { id: 'KAN-242', name: 'Wikot' },
  { id: 'KAN-243', name: 'Wojownicy' },
];

const roundInfo = document.querySelector('#round-info');
const remainingInfo = document.querySelector('#remaining-info');
const matchContainer = document.querySelector('#match-container');
const winnerSection = document.querySelector('#winner');
const winnerText = document.querySelector('#winner-text');
const restartBtn = document.querySelector('#restart-btn');

let state = {};

function shuffle(items) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function createCard(order) {
  const btn = document.createElement('button');
  btn.className = 'card';
  btn.type = 'button';
  btn.innerHTML = `
    <span class="code">${order.id}</span>
    <span class="name">${order.name}</span>
  `;

  btn.addEventListener('click', () => pick(order));
  return btn;
}

function updateStatus() {
  roundInfo.textContent = `Runda ${state.round}`;
  remainingInfo.textContent = `Pozostało: ${state.pool.length}`;
}

function showWinner(finalOrder) {
  matchContainer.innerHTML = '';
  winnerText.textContent = `${finalOrder.id} — ${finalOrder.name}`;
  winnerSection.classList.remove('hidden');
}

function setupRound() {
  winnerSection.classList.add('hidden');

  if (state.pool.length === 1) {
    showWinner(state.pool[0]);
    return;
  }

  if (state.index >= state.pool.length) {
    state.pool = state.nextRound;
    state.nextRound = [];
    state.index = 0;
    state.round += 1;
  }

  if (state.pool.length === 1) {
    showWinner(state.pool[0]);
    return;
  }

  const first = state.pool[state.index];
  const second = state.pool[state.index + 1];

  if (!second) {
    state.nextRound.push(first);
    state.index += 1;
    setupRound();
    return;
  }

  updateStatus();
  matchContainer.innerHTML = '';
  matchContainer.append(createCard(first), createCard(second));
}

function pick(order) {
  state.nextRound.push(order);
  state.index += 2;
  setupRound();
}

function resetGame() {
  state = {
    pool: shuffle(ORDERS),
    nextRound: [],
    index: 0,
    round: 1,
  };

  updateStatus();
  setupRound();
}

restartBtn.addEventListener('click', resetGame);
resetGame();
