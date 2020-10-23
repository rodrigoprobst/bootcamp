import React, { useState, useEffect } from 'react'
import api from "./services/api";


import "./styles.css";

function App() {

  const [ repositories, setRepositories] = useState([])

  useEffect(() => {
    api.get('repositories').then(({ data }) => {
      setRepositories(data)
    })
  }, [])


  async function handleAddRepository() {
    const reponse = await api.post('repositories', {
      "title": `DesafioNode.js  ${Date.now()}`,
      "url": "https://github.com/rodrigoprobst/bootcamp",
      "techs": [
        "NodeJs",
        "ReactJs",
        "React Native"
      ]
    })

    const repository = reponse.data

    setRepositories([...repositories, repository])
  }

  async function handleRemoveRepository(id) {
    const reponse = await api.delete(`repositories/${id}`)
    console.log(id);
    if (reponse.status === 204)
      setRepositories(repositories.filter(repository => repository.id !== id))
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => 
          <li key={repository.id}>
            {repository.title}
            
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        )}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
