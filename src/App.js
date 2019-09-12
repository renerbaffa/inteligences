import React, { useState, useRef, useEffect } from 'react'
import './App.css'
import Population from './Population'

function App() {
  const [generation, setGeneration] = useState(0)
  const populationSize = 200
  const mutationRate = 0.01

  const population = useRef(
    new Population({
      target: 'To be or not to be.',
      populationSize,
      mutationRate,
    }),
  )

  useEffect(() => {
    const id = setInterval(() => {
      if (population.current.highestFitness.fitness < 1) {
        population.current.nextGen()
        setGeneration(population.current.generation)
      }
    }, 10)
    return () => clearInterval(id)
  }, [population.current.generation])

  return (
    <div className="App">
      <div className="left">
        <h2>Best phrase:</h2>
        <p className="best">{population.current.highestFitness.display()}</p>
        <div className="stats">
          <h4>Stats:</h4>
          <div>Total generations: {generation}</div>
          <div>Average fitness: {population.current.averageFitness.toFixed(4)}%</div>
          <div>Highest fitness: {population.current.highestFitness.fitness.toFixed(4)}%</div>
          <div>Total population: {populationSize}</div>
          <div>Mutation rate: {mutationRate}</div>
        </div>
        <button
          onClick={() => {
            population.current.nextGen()
            setGeneration(population.current.generation)
          }}
        >
          Next gen
        </button>
      </div>
      <div className="right">
        <h2>All phrases:</h2>
        <div className="phrases">
          {population.current.population.map((individual, index) => (
            <p key={index}>{individual.display()}</p>
          ))}
        </div>
      </div>
    </div>
  )
}

export default App
