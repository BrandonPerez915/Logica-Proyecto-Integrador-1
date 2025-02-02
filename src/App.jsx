import { ButtonsContainer } from "./components/ButtonsContainer"
import { VariablesButtonsContainer } from "./components/VariablesButtonsContainer"

import { useState } from 'react'

function App() {

  const TOPBUTTONSTEXTS = ['AC', 'C', '(', ')', '∧', '∨']
  const RIGHTBUTTONSTEXTS = ['⇒', '⇔', '¬', '⊕', '⊻', '⊼']

  const [text, setText] = useState('')
  const [parenthesis, setParenthesis] = useState(0)
  const [operation, setOperation] = useState(true)
  const [variables, setVariables] = useState({})

  const updateText = (e) => {
    if(e.target.textContent === 'AC') {
      setText('')
      setOperation(true)
      return
    }

    else if(e.target.textContent === 'C') {

      if(text.slice(-1) === '(') {
        setParenthesis(parenthesis - 1)
        setText(text.slice(0,-1))
      }

      else if(text.slice(-1) === ')') {
        setParenthesis(parenthesis + 1)
        setText(text.slice(0,-1))
      }

      else {
        setText(text.slice(0,-1))
        setOperation(!operation)
      }

      return
    }

    else if(e.target.textContent === '(') {
      setParenthesis(parenthesis + 1)
    }

    const addText = e.target.textContent
    setText(text + addText)
    
    if(e.target.textContent === ')' || e.target.textContent === '(') {
      return
    }

    else{
      setOperation(!operation)
    }
  }

  const addVariable = (e) => {
    e.preventDefault()
    const variableName = document.querySelector('.variable-name').value
    const variableValue = document.querySelector('.variable-value').value

    if(variableName in variables) {
      return // Agregar mensaje de 'desea sobreescribir la variable'
    }

    setVariables({ ...variables, [variableName]: variableValue})
  }

  const deleteVariable = (e) => { 
    const variableName = e.target.parentElement.textContent[0]
    const newVariables = { ...variables }
    delete newVariables[variableName]
    setVariables(newVariables)
  }

  return (
    <>
      <header className='header'>

      </header>
      <main className='main'>
        <section className='calculator-container'>
          <div className='calculator-screen'>
            { text }
          </div>
          <div className='calculator-keys'>
            <ButtonsContainer 
              containerClass='top-keys'
              buttonsText={ TOPBUTTONSTEXTS }
              updateText={ updateText }
              disabled={ operation }
            />
            <div className='variables-keys'>
              <VariablesButtonsContainer
                containerClass='variables-buttons'
                buttonsText={ Object.keys(variables) }
                disabled={ operation }
                updateText={ updateText }
              />
            </div>
            <ButtonsContainer
              containerClass='right-keys'
              buttonsText={ RIGHTBUTTONSTEXTS }
              updateText={ updateText }
            />
          </div>
        </section>
        <section className='info-container'>
          <div className='input-output-container'>
            <h3>Ingresar variable</h3>
            <form className='add-variable-section' name='variables'>
              <input 
                type='text' 
                className="variable-name" 
                required 
                minLength={ 1 }
                maxLength={ 1 }
              />
              <label htmlFor='variable-name'> : </label>
              <input 
                type='text' 
                className="variable-value" 
                id='variable-name'
              />
              <button type='submit' onClick={ addVariable }>Agregar</button>
            </form>
            <h3>Variables</h3>
            <ul className='variables-list'>
              {
                Object.entries(variables).map(([variable, value]) => {
                  return (
                    <li key={ variable }>
                      { variable } : { value }
                      <button onClick = { deleteVariable }> Eliminar </button>
                    </li>
                  )
                })
              }
            </ul>
            <h3>Input</h3>
            <p className='user-input-text'></p>
            <h3>Output</h3>
            <p className='user-output-text'></p>
            <h3>Tablas de la verdad</h3>
            <table className='true-tables'>
            </table>
          </div>
          <div className='table-container'>

          </div>
        </section>
      </main>
      <footer className='footer'>

      </footer>
    </>
  )
}

export default App
