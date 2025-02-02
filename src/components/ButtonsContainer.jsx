/* eslint-disable react/prop-types */

export const ButtonsContainer = ({ containerClass, buttonsText, updateText, disabled }) => {

  const disabledClass = disabled ? 'disabled' : ''

  return (
    <div className={ containerClass }>
      {
        buttonsText.map((text, index) => (
          <button 
            key={ index } 
            className={ `operation-button ${ text } ${ disabledClass }` }
            onClick = { updateText }
          >
            { text }
          </button>
        ))
      }
    </div>
  )
}
