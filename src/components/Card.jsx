/* eslint-disable react/prop-types */

export const Card = ({ title, text }) => {
  return (
    <div className="notification">
    <div className="notiglow"></div>
    <div className="notiborderglow"></div>
    <div className="notititle">{ title }</div>
    <div className="notibody">{ text }</div>
  </div>
  )
}