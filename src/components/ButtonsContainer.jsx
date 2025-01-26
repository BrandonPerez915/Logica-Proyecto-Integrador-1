/* eslint-disable react/prop-types */

export const ButtonsContainer = ({ containerClass, buttonsText }) => {
  return (
    <div className={ containerClass }>
      {
        buttonsText.map((text, index) => (
          <button key={ index } className="calculator-button">
            { text }
          </button>
        ))
      }
    </div>
  )
}
