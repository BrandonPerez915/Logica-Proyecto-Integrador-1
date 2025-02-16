/* eslint-disable react/prop-types */

export const Card = ({ children }) => {
  return (
    <>
      <div className="card">
        <div className="card-info">
          { children }
        </div>
      </div>
    </>
  )
}
