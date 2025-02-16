// Componentes
import { ButtonsContainer } from "./components/ButtonsContainer.jsx"
import { VariablesButtonsContainer } from "./components/VariablesButtonsContainer.jsx"
import { Switch } from "./components/Switch.jsx"
import { Button } from "./components/Button.jsx"
import { DeleteButton } from "./components/DeleteButton.jsx"
import { Card } from "./components/Card.jsx"

// Constantes y funciones lógicas
import { TOPBUTTONSTEXTS, RIGHTBUTTONSTEXTS } from './utils/constants.js'
import { updateText, addVariable, addBooleanVariable, 
  deleteVariable, convertExpression, generateTableHeaders, 
  generateTableData } from "./utils/logic.js"

// Funciones de estado
import { useState } from 'react'

function App() {

  const [input, setInput] = useState('')
  const [parenthesis, setParenthesis] = useState(0)
  const [operation, setOperation] = useState(true)
  const [variables, setVariables] = useState({})
  const [textMode, setTextMode] = useState(false)
  const [showTitles, setShowTitles] = useState(false)
  const [tableBody, setTableBody] = useState([])

  const handleEvaluation = () => {
    const binaryExpression = convertExpression(input, variables)
    document.querySelector('.user-input-text').textContent = input
    document.querySelector('.user-output-text').textContent = 
      eval(binaryExpression) === 1 || eval(binaryExpression) === true ? 'Verdadero' : 'Falso'
    
    if(input) {
      setShowTitles(true)
    }

    setTableBody(generateTableData(tableHeaders))
  }

  const tableHeaders = generateTableHeaders(input, variables)
  tableHeaders.push(input)

  return (
    <>
      <header className='header'>
      </header>
      <main className='main'>
        <section className='calculator-container'>
          <div className='calculator-div'>
            <div className='calculator-screen'><span>{ input }</span></div>
            <div className='calculator-keys'>
              <ButtonsContainer 
                containerClass='top-keys'
                buttonsText={ TOPBUTTONSTEXTS }
                updateText={ (e) => updateText(e, input, setInput, operation, setOperation, parenthesis, setParenthesis, setShowTitles, setTableBody) }
                disabled={ operation }
                parenthesesCount={ parenthesis } 
              />
              <div className='variables-keys'>
                <VariablesButtonsContainer
                  containerClass='variables-buttons'
                  buttonsText={ Object.keys(variables) }
                  disabled={ operation }
                  updateText={ (e) => updateText(e, input, setInput, operation, setOperation, parenthesis, setParenthesis) }
                />
              </div>
              <ButtonsContainer
                containerClass='right-keys'
                buttonsText={ RIGHTBUTTONSTEXTS }
                updateText={ (e) => updateText(e, input, setInput, operation, setOperation, parenthesis, setParenthesis) }
                disabled={ operation }
              >
                <button className='operation-button =' onClick={ handleEvaluation }>=</button>
              </ButtonsContainer>
            </div>
          </div>
        </section>
        <Card>
          <div className='input-output-container'>
            <section className='selector-mode'>
              <h3>Ingresar variable</h3>
              <span className='mode-selector'>Modo texto<Switch changeFunction={ () => setTextMode(!textMode) }/></span> 
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
              { textMode ?
                <>
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
                </> :
                <>
                <Button 
                  clickFunction={ (e) => addBooleanVariable(e, variables, setVariables, 'Verdadero') } 
                  color='green'>Verdadero
                </Button>
                <Button 
                  clickFunction={ (e) => addBooleanVariable(e, variables, setVariables, 'Falso') } 
                  color='red'>Falso
                </Button>
              </>
              }
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
            <h3 className={ !showTitles ? 'hide' : ''}>Input</h3>
            <p 
              className={ !showTitles ? 'user-input-text hide' : 'user-input-text' }>
            </p>
            <h3 className={ !showTitles ? 'hide' : ''}>Output</h3>
            <p 
              className={ !showTitles ? 'user-output-text hide' : 'user-output-text' }>
            </p>
            <h3 className={ !showTitles ? 'hide' : ''}>
              { !textMode ? 'Tablas de verdad' : '' }
            </h3>
            <table className={ !showTitles ? 'true-tables hide' : 'true-tables' }>
              <thead>
                <tr>
                  {
                    tableHeaders.map((expression, index) => {
                      return (
                        <th key={ index } className='table-header'>
                          { expression }
                        </th>
                      )
                    })
                  }
                </tr>
              </thead>
              <tbody>
                {
                  tableBody.map((currentRow, index) => {
                    return (
                      <tr key={ index }>
                        {
                          currentRow.map((currentColumn, index) => {
                            return (
                              <td key={ index }>
                                { currentColumn }
                              </td>
                            )
                          })
                        }
                      </tr>
                    )
                  })
                }
              </tbody>
            </table>
          </div>
        </Card>
      </main>
      <footer className='footer'>

      </footer>
    </>
  )
}

export default App
