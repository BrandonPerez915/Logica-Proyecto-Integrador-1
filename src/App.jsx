import { ButtonsContainer } from "./components/ButtonsContainer"

function App() {

  const TOPBUTTONSTEXTS = ['AC', 'C', '(', ')', '∧', '∨']
  const RIGHTBUTTONSTEXTS = ['⇒', '⇔', '¬', '⊕', '⊻', '⊼']

  return (
    <>
      <header className='header'>

      </header>
      <main className='main'>
        <section className='calculator-container'>
          <div className='calculator-screen'>

          </div>
          <div className='calculator-keys'>
            <ButtonsContainer 
              containerClass='top-keys'
              buttonsText={ TOPBUTTONSTEXTS }
            />
            <div className='variables-keys'>

            </div>
            <ButtonsContainer
              containerClass='right-keys'
              buttonsText={ RIGHTBUTTONSTEXTS }
            />
          </div>
        </section>
        <section className='info-container'>
          <div className='input-output-container'>
            <h3>Ingresar variable</h3>
            <form className='add-variable-section' name='variables'>
              <input 
                type='text' 
                className="nombre-variable" 
                required 
                minLength={ 1 }
                maxLength={ 1 }
              />
              <label htmlFor='nombre-variable'> : </label>
              <input 
                type='text' 
                className="valor-variable" 
                id='nombre-variable'
              />
              <button type='submit'>Agregar</button>
            </form>
            <h3>Variables</h3>
            <ul className='variables-list'>
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
