import { Random, MersenneTwister19937 } from 'random-js'

export function newChar() {
  // randomly generate a new char based on the ASCII table (from position 32 to 125)
  return String.fromCharCode(Math.floor(Math.random(93) * 100 + 32))
}

export function randomInt(max = 1) {
  const random = new Random(MersenneTwister19937.autoSeed())
  const r = random.integer(0, max - 1)
  return r
}

export function remap(value, prevMin, prevMax, newMin, newMax) {
  return newMin + ((newMax - newMin) * (value - prevMin)) / (prevMax - prevMin)
}
