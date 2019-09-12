import { useReducer } from 'react'
import DNA from './DNA'
import { randomInt, remap } from './utils'

export const INIT = 'INIT'
export const NEXT_GENERATION = 'NEXT_GENERATION'

function init(target, populationSize, mutationRate) {
  return {
    target,
    mutationRate,
    size: populationSize,
    generation: 0,
    population: [],
    highestFitness: {
      fitness: -1,
      display: () => {},
    },
    averageFitness: 0,
  }
}

function calculateFitness(population, target) {
  return population.reduce(
    (acc, individual) => {
      const currentFitness = individual.calcFitness(target)
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
}

function naturalSelection(population, highestFitness) {
  const matingPool = []

  for (let i = 0; i < population.length; i++) {
    let fitness = remap(population[i].fitness, 0, highestFitness.fitness, 0, 1)
    let n = Math.floor(fitness * 100)
    for (let j = 0; j < n; j++) {
      matingPool.push(population[i])
    }
  }

  return matingPool
}

function reducer(state, action) {
  let fitnessStats
  switch (action.type) {
    case INIT:
      const population = []
      for (let i = 0; i < state.size; i++) {
        population.push(new DNA(state.target.length))
      }
      fitnessStats = calculateFitness(population, state.target)
      return {
        ...state,
        population,
        generation: 1,
        highestFitness: fitnessStats.highestFitness,
        averageFitness: fitnessStats.acc / state.size,
      }
    case NEXT_GENERATION:
      const newPopulation = []
      const matingPool = naturalSelection(state.population, state.highestFitness)
      for (let i = 0; i < state.population.length; i++) {
        let partner1 = matingPool[Math.floor(randomInt(matingPool.length))]
        let partner2 = matingPool[Math.floor(randomInt(matingPool.length))]
        const child = partner1.crossover(partner2)
        child.mutate(state.mutationRate)
        newPopulation[i] = child
      }
      fitnessStats = calculateFitness(newPopulation, state.target)
      return {
        ...state,
        population: newPopulation,
        highestFitness: fitnessStats.highestFitness,
        averageFitness: 100 * (fitnessStats.acc / state.size),
        generation: state.generation + 1,
      }
    default:
      return state
  }
}

export default function usePopulation(target, populationSize, mutationRate) {
  return useReducer(reducer, init(target, populationSize, mutationRate))
}
