'use strict';

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

// 1.
// const players1 = game.players[0];
// const players2 = game.players[1];

const [players1, players2] = game.players;

console.log(players1, players2);

// 2. team 1
// const [gk, ...others] = players1;
// const fieldPlayers = others;
const [gk, ...fieldPlayers] = players1;
console.log(gk, fieldPlayers);

// 3. all players
const allPlayers = [...players1, ...players2];
console.log(allPlayers);

// 4. add to arrays
const players1Final = [...players1, 'Thiago', 'Coutinho', 'Perisic'];
console.log(players1Final);

// 5.
const { team1, x: draw, team2 } = game.odds;
//const draw = x;
console.log(team1, draw, team2);

// 6.

const printGoals = function (...player) {
  console.log(player);
  let score = 0;
  for (let i = 0; i < player.length; i++) {
    //console.log(player[i]);
    if (
      player[i] === 'Lewandowski' ||
      player[i] === 'Gnarby' ||
      player[i] === 'Lewandowski' ||
      player[i] === 'Hummels'
    )
      score++;
  }
  console.log(score);
  return score;
};

printGoals('Davies', 'Muller', 'Lewandowski', 'Kimmich');
printGoals(...game.scored);

// 7.
// team1 < team2 ? console.log('team1') : console.log('team2');

team1 < team2 && console.log('team1');
team2 < team1 && console.log('team2');
