import React from 'react'

const CustomButton = ({ btnType, title, handleClick }) => {
  return (
    <button
      type={btnType}
      className="btn glow-on-hover"
      onClick={handleClick}
    >
      {title}
    </button>
  )
}

export default CustomButton