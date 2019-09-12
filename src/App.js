import React, { useEffect } from 'react'
import './App.css'
import usePopulation, { INIT, NEXT_GENERATION } from './usePopulation'

function App() {
  const [population, dispatch] = usePopulation('To be or not to be.', 200, 0.01)

  useEffect(() => {
    if (population.generation === 0) {
      dispatch({ type: INIT })
    }
  }, [dispatch, population.generation])

  useEffect(() => {
    const id = setInterval(() => {
      if (population.highestFitness.fitness < 1) {
        dispatch({ type: NEXT_GENERATION })
      }
    }, 10)
    return () => clearInterval(id)
  }, [dispatch, population.highestFitness.fitness])

  return (
    <div className="App">
      <div className="left">
        <h2>Best phrase:</h2>
        <p className="best">{population.highestFitness.display()}</p>
        <div className="stats">
          <h4>Stats:</h4>
          <div>Total generations: {population.generation}</div>
          <div>Average fitness: {population.averageFitness.toFixed(0)}%</div>
          <div>Highest fitness: {(population.highestFitness.fitness * 100).toFixed(0)}%</div>
          <div>Total population: {population.size}</div>
          <div>Mutation rate: {population.mutationRate}</div>
        </div>
      </div>
      <div className="right">
        <h2>All phrases:</h2>
        <div className="phrases">
          {population.population.map((individual, index) => (
            <p key={index}>{individual.display()}</p>
          ))}
        </div>
      </div>
    </div>
  )
}

export default App
