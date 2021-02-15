const game = {
  team1: 'Bayern Munich',
  team2: 'Borrussia Dortmund',
  players: [
    [
      'Neuer',
      'Pavard',
      'Martinez',
      'Alaba',
      'Davies',
      'Kimmich',
      'Goretzka',
      'Coman',
      'Muller',
      'Gnarby',
      'Lewandowski',
    ],
    [
      'Burki',
      'Schulz',
      'Hummels',
      'Akanji',
      'Hakimi',
      'Weigl',
      'Witsel',
      'Hazard',
      'Brandt',
      'Sancho',
      'Gotze',
    ],
  ],
  score: '4:0',
  scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
  date: 'Nov 9th, 2037',
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
};

// 1. loop array

for (const [i, scoredPlayer] of game.scored.entries()) {
  console.log(`Goal ${i + 1}: ${scoredPlayer}`);
}

// 2. calc average odd
const oddNum = Object.values(game.odds);
const avgOdd = eval(oddNum.join('+')) / oddNum.length;
console.log(avgOdd);

// 3. loop obj
const Obj = Object.entries(game.odds);

for (const [team, score] of Obj) {
  console.log(`Odd of ${game?.[team] ?? 'draw'} : ${score}`);
}

// 4. bonus
const scorers = {};

for (const player of game.scored) {
  scorers[player] ? scorers[player]++ : (scorers[player] = 1);
}

console.log(scorers);
