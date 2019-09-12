import { newChar, randomInt } from './utils'

export default class DNA {
  constructor(length) {
    this.genes = []
    for (var i = 0; i < length; i++) {
      this.genes[i] = newChar()
    }
  }

  calcFitness(target) {
    let score = 0
    for (let i = 0; i < this.genes.length; i++) {
      if (this.genes[i] === target[i]) {
        score++
      }
    }
    this.fitness = score / target.length
    return this.fitness
  }

  crossover(partner) {
    let child = new DNA(this.genes.length)
    // half of one and half of other
    const midpoint = Math.floor(randomInt(this.genes.length))
    for (let i = 0; i < child.genes.length; i++) {
      child.genes[i] = i < midpoint ? this.genes[i] : partner.genes[i]
    }
    return child
  }

  mutate(mutationRate) {
    for (let i = 0; i < this.genes.length; i++) {
      if (Math.random() < mutationRate) {
        this.genes[i] = newChar()
      }
    }
  }

  display() {
    return this.genes.join('')
  }
}
