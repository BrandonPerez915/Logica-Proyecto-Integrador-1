/* eslint-disable react/prop-types */

export const Button = ({ children, clickFunction, color, type='button' }) => {
  return (
    <button
      type={ type }
      className={`animated-button ${ color }`}  
      onClick={ clickFunction }>
      <span>{ children }</span>
      <span></span>
    </button>
  )
}