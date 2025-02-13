// Componentes
import { ButtonsContainer } from "./components/ButtonsContainer"
import { VariablesButtonsContainer } from "./components/VariablesButtonsContainer"
import { Switch } from "./components/Switch"
import { Button } from "./components/Button"
import { DeleteButton } from "./components/DeleteButton"

// Constantes y funciones lógicas
import { TOPBUTTONSTEXTS, RIGHTBUTTONSTEXTS } from './utils/constants.js'
import { updateText, addVariable, deleteVariable } from "./utils/logic.js"

// Funciones de estado
import { useState } from 'react'

function App() {

  const [text, setText] = useState('')
  const [parenthesis, setParenthesis] = useState(0)
  const [operation, setOperation] = useState(true)
  const [variables, setVariables] = useState({})
  

  function evalExpression() {

    const replaceConditionalsAndBiconditionals = (expr) => {
      expr = expr.replace(/(\([^()]*\)|\w+)\s*⇔\s*(\([^()]*\)|\w+)/g, (match, p1, p2) => {
        return `(~${p1}|${p2})&(~${p2}|${p1})`
      })
      expr = expr.replace(/(\([^()]*\)|\w+)\s*⇒\s*(\([^()]*\)|\w+)/g, (match, p1, p2) => {
        return `~${p1}|${p2}`
      })
      return expr;
    }

    let userInput = text;

    userInput = replaceConditionalsAndBiconditionals(userInput);

    userInput = userInput.replace(/¬/g, '~')
    userInput = userInput.replace(/∧/g, '&')
    userInput = userInput.replace(/∨/g, '|')
    userInput = userInput.replace(/⊕/g, '^')
    
    for(let i of Object.entries(variables)) {
      userInput = userInput.replace(new RegExp(i[0], 'g'), i[1] === 'Verdadero' ? '1' : '0')
    }

    console.log(userInput)
    console.log(eval(userInput))
  }

  return (
    <>
      <header className='header'>

      </header>
      <main className='main'>
        <section className='calculator-container'>
          <div className='calculator-screen'><span>{ text }</span></div>
          <div className='calculator-keys'>
            <ButtonsContainer 
              containerClass='top-keys'
              buttonsText={ TOPBUTTONSTEXTS }
              updateText={ (e) => updateText(e, text, setText, operation, setOperation, parenthesis, setParenthesis) }
              disabled={ operation }
              parenthesesCount={ parenthesis } 
            />
            <div className='variables-keys'>
              <VariablesButtonsContainer
                containerClass='variables-buttons'
                buttonsText={ Object.keys(variables) }
                disabled={ operation }
                updateText={ (e) => updateText(e, text, setText, operation, setOperation, parenthesis, setParenthesis) }
              />
            </div>
            <ButtonsContainer
              containerClass='right-keys'
              buttonsText={ RIGHTBUTTONSTEXTS }
              updateText={ (e) => updateText(e, text, setText, operation, setOperation, parenthesis, setParenthesis) }
              disabled={ operation }
            >
              <button className='operation-button =' onClick={ evalExpression }>=</button>
            </ButtonsContainer>
          </div>
        </section>
        <div className='card'>
          <div className='input-output-container'>
            <section className='selector-mode'>
              <h3>Ingresar variable</h3>
              <span className='mode-selector'>Modo texto<Switch/></span> 
            </section>
            <form className='add-variable-section' name='variables'>
              <input 
                type='text' 
                className="variable-name input" 
                required 
                minLength={ 1 }
                maxLength={ 1 }
              />
              <span>:</span>
              <input 
                type='text' 
                className="variable-value input" 
                id='variable-name'
                required
              />
              <Button 
                clickFunction={ (e) => addVariable(e, variables, setVariables) } 
                color='green'>Agregar
              </Button>
            </form>
            <h3>Variables</h3>
            <ul className='variables-list'>
              {
                Object.entries(variables).map(([variable, value]) => {
                  return (
                    <li key={ variable }>
                      { variable } : { value }
                      <DeleteButton clickFunction={ (e) => deleteVariable(e, variables, setVariables) }/>
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
        </div>
      </main>
      <footer className='footer'>

      </footer>
    </>
  )
}

export default App
