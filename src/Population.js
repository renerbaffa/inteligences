import DNA from './DNA'
import { randomInt, remap } from './utils'

export default class Population {
  constructor({ target, populationSize, mutationRate }) {
    this.population = []
    this.generation = 0
    this.averageFitness = 0
    this.highestFitness = null
    this.target = target
    this.mutationRate = mutationRate

    for (var i = 0; i < populationSize; i++) {
      this.population[i] = new DNA(this.target.length)
    }

    this.calcFitness()
  }

  calcFitness() {
    const fitnessStats = this.population.reduce(
      (acc, individual, index) => {
        const currentFitness = individual.calcFitness(this.target)
        return {
          acc: acc.acc + currentFitness,
          highestFitness:
            currentFitness > acc.highestFitness.fitness ? individual : acc.highestFitness,
        }
      },
      {
        acc: 0,
        highestFitness: { fitness: -1 },
      },
    )
    this.averageFitness = fitnessStats.acc / this.population.length
    this.highestFitness = fitnessStats.highestFitness
  }

  nextGen() {
    const matingPool = this.naturalSelection()
    for (let i = 0; i < this.population.length; i++) {
      let partner1 = matingPool[Math.floor(randomInt(matingPool.length))]
      let partner2 = matingPool[Math.floor(randomInt(matingPool.length))]
      const child = partner1.crossover(partner2)
      child.mutate(this.mutationRate)
      this.population[i] = child
    }
    this.calcFitness()
    this.generation++
  }

  naturalSelection() {
    const matingPool = []

    for (let i = 0; i < this.population.length; i++) {
      let fitness = remap(this.population[i].fitness, 0, this.highestFitness.fitness, 0, 1)
      let n = Math.floor(fitness * 100)
      for (let j = 0; j < n; j++) {
        matingPool.push(this.population[i])
      }
    }

    return matingPool
  }
}
