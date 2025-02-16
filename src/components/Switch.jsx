/* eslint-disable react/prop-types */

export const Switch = ({ changeFunction }) => {
  return (
    <>
      <label className="switch">
        <input 
          className='switch-mode' 
          type="checkbox" 
          onChange={ changeFunction }
        />
        <span className="slider" />
      </label>
    </>
  );
}
