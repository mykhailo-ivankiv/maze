/**
 * Returns a random integer between min (inclusive) and max (inclusive)
 * Using Math.round() will give you a non-uniform distribution!
 */
export function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getFirstUniqueInt(arr) {
  let result = 0;
  while (arr.indexOf(result) >= 0) {result+=1;}
  return result;
}