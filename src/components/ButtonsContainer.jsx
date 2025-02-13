/* eslint-disable react/prop-types */

export const ButtonsContainer = ({ children, containerClass, buttonsText, updateText, disabled, parenthesesCount }) => {

  let disabledClass = disabled ? 'disabled' : ''

  return (
    <div className={ containerClass }>
      {
        buttonsText.map((text, index) => {
          if(text === ')') {
            return (
              <button 
                key={ index } 
                className={ `operation-button ${ text } ${ parenthesesCount > 0 ? '':'disabled'}` }
                onClick={ updateText }
              >
                { text }
                <div className='close-parentheses-count'>
                  { parenthesesCount }
                </div>
              </button>
            )
          }
          else {
            return(
              <button 
                key={ index } 
                className={ `operation-button ${ text } ${ disabledClass }` }
                onClick = { updateText }
              >
                { text }
              </button>
              
            )
          }
        })
      }
      { children }
    </div>
  )
}
