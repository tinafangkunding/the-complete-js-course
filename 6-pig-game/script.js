//Notes!!
//document.getElementById(`current--${activePlayer}`).textContent = currentScore;
//activePlaer = activePlayer === 0 ? 1 : 0;
//player0El.classList.toggle(); //if a class is there, remove it, or add it.

'use strict';

let p0Score = 0;
let p1Score = 0;
let holdP0Score = 0;
let holdP1Score = 0;
let currentStatus = false; //0 or 1

const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnNew = document.querySelector('.btn--new');
const dicePic = document.querySelector('img');
const curp0Score = document.querySelector('#current--0');
const curp1Score = document.querySelector('#current--1');
const p0Play = document.querySelector('.player--0');
const p1Play = document.querySelector('.player--1');
const roundP0 = document.querySelector('#score--0');
const roundP1 = document.querySelector('#score--1');
const diceEl = document.querySelector('.dice');

roundP0.textContent = 0;
roundP1.textContent = 0;
//diceEl.classList.add('hidden');
//dicePic.classList.add

// calc total score
const calcScore = function (num, score) {
  if (num === 1) {
    score = 0;
    currentStatus = switchPlayer(currentStatus);
  } else score += num;
  return score; //return!!
};

const switchPlayer = function (currentStatus) {
  //console.log('start to switch');
  if (currentStatus === false) {
    currentStatus = true;
    p1Play.classList.add('player--active');
    p0Play.classList.remove('player--active');
  } else {
    currentStatus = false; // 1 --> 0
    p0Play.classList.add('player--active');
    p1Play.classList.remove('player--active');
  }
  return currentStatus;
  //console.log('end to switch');
};

const switchWithoutStatus = function () {
  console.log('start to switch, the status is ' + currentStatus);
  if (currentStatus === false) {
    currentStatus = true;
    p1Play.classList.add('player--active');
    p0Play.classList.remove('player--active');
    holdP0Score += p0Score;
    roundP0.textContent = holdP0Score;
    p0Score = 0;
    curp0Score.textContent = p0Score;
    checkWin(holdP0Score);
  } else {
    currentStatus = false; // 1 --> 0
    p0Play.classList.add('player--active');
    p1Play.classList.remove('player--active');
    holdP1Score += p1Score;
    roundP1.textContent = holdP1Score;
    p1Score = 0;
    curp1Score.textContent = p1Score;
    checkWin(holdP1Score);
  }
};

// switch the status of players, hold score
btnHold.addEventListener('click', switchWithoutStatus);

// throw dice and add score
btnRoll.addEventListener('click', function () {
  //1-6 for dice
  let diceNum = Math.trunc(Math.random() * 6) + 1;
  dicePic.src = `dice-${diceNum}.png`;

  if (currentStatus === false) {
    p0Score = calcScore(diceNum, p0Score);
    curp0Score.textContent = p0Score;
    //checkWin(p0Score);
  } else {
    p1Score = calcScore(diceNum, p1Score);
    curp1Score.textContent = p1Score;
    //checkWin(p1Score);
  }
});

// win -- when one of the players reach 100
const checkWin = function (score) {
  if (score >= 100) {
    if (currentStatus === false) {
      p0Play.classList.add('player--winner');
      p1Play.classList.remove('player--active');
    } else {
      p1Play.classList.add('player--winner');
      p0Play.classList.remove('player--active');
    }
    //alert('You WIN!');
  }
};

// new game -- clear all
btnNew.addEventListener('click', function () {
  let initNum = 0;
  currentStatus = false; //0 or 1
  p0Play.classList.add('player--active');
  p1Play.classList.remove('player--active');
  p1Play.classList.remove('player--winner');
  p0Play.classList.remove('player--winner');
  //dicePic.srcset.remove('src'); how to remove the dice
  //dicePic.remove();

  diceEl.classList.add('hidden');
  curp0Score.textContent = initNum;
  curp1Score.textContent = initNum;
  roundP0.textContent = initNum;
  roundP1.textContent = initNum;
});
