/* eslint-disable react/prop-types */

export const VariablesButtonsContainer = ({ containerClass, buttonsText, disabled, updateText }) => {

  const disabledClass = disabled ? '' : 'disabled'
  
  return (
    <div className={ containerClass }>
      {
        buttonsText.map((text, index) => {
          return (
            <button 
              key={ index } 
              className={ `variable-button ${ text } ${ disabledClass }` }
              onClick={ updateText }
            >
              { text }
            </button>
          )
        })
      }
    </div>
  )
}