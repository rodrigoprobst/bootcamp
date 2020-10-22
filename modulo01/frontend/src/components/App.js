import React, { useState } from 'react'
import Header from './Header'

export default function App () {
  const [ projects, setProjects] = useState([
    'Desenvolvimento de App',
    'Front-end Web'
  ])

  /**
   * useState retorna um array com 2 posições
   * 
   * 1. Variável com o seu valor inicial
   * 2. Função para atualizarmos esse valor
   */

  function handleAddProject() {
    // projects.push(`Novo Projeto ${Date.now()}`)
    setProjects([...projects, `Novo Projeto ${Date.now()}`])
  }

  return (
    <>
      <Header title="Projects" />
      <ul>
        {projects.map(project => <li key={project}>{project}</li>)}
      </ul>
      <button type="button" onClick={handleAddProject}>Adicionar Projeto</button>
    </>
  )
}
