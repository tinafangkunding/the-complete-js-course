'use strict';

const flights =
  '_Delayed_Departure;fao93928108;txl21238474881;11:25+_Arrival;bru83917384737;fao937283718;11:45+_Delayed_Arrival;hel83938284938;fao83749183;12:05+_Departure;fao28471837;list38491827483;12:30';

const arr = flights.split('+');

for (const flight of arr) {
  let a = flight.split(';');
  //const [x,y,z,w] = flight.split(';'); !!!
  let x = a[0].replace(/_/g, '');
  let y = a[1].toUpperCase().slice(0, 3);
  let z = a[2].toUpperCase().slice(0, 3);
  let w = a[3].replace(':', 'h');
  let result = `${
    x.startsWith('Delayed') ? '*' : ''
  } ${x} from ${y} to ${z} (${w})`;
  console.log(result.padStart(40, '+'));
}
