import React from 'react'
import Header from './Header'

export default function App () {
  return (
    <>
      <Header title="HomePage" >
        <ul>
          <li>Homepage</li>
          <li>Projetos</li>
        </ul>
      </Header>
      <Header title="Projects" >
        <ul>
          <li>Homepage</li>
          <li>Projetos</li>
          <li>Login</li>
        </ul>
      </Header>
    </>
  )
}
