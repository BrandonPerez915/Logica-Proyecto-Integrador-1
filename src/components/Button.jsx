/* eslint-disable react/prop-types */

export const Button = ({ children, clickFunction, color }) => {
  return (
    <button 
      className={`animated-button ${ color }`}  
      onClick={ clickFunction }>
      <span>{ children }</span>
      <span></span>
    </button>
  )
}