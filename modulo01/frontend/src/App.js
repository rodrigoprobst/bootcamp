import React, { useState, useEffect } from 'react'
import Header from './components/Header'
import api from './services/api'

import './App.css'

export default function App () {
  const [ projects, setProjects] = useState([])

  useEffect(() => {
    api.get('projects').then(({ data }) => {
      setProjects(data)
    })
  }, [])

  /**
   * useState retorna um array com 2 posições
   * 
   * 1. Variável com o seu valor inicial
   * 2. Função para atualizarmos esse valor
   */

  async function handleAddProject() {
    // projects.push(`Novo Projeto ${Date.now()}`)
    // setProjects([...projects, `Novo Projeto ${Date.now()}`])
    const reponse = await api.post('projects', {
      title: `Novo Projeto ${Date.now()}`,
      owner: "Rodrigo"
    })

    const project = reponse.data

    setProjects([...projects, project])
    
  }

  return (
    <>
      <Header title="Projects" />
      <ul>
        {projects.map(project => <li key={project.id}>{project.title}</li>)}
      </ul>
      <button type="button" onClick={handleAddProject}>Adicionar Projeto</button>
    </>
  )
}
