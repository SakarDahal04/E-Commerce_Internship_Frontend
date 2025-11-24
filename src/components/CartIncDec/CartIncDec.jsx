import React from 'react'

const CartIncDec = ({value, onClick}) => {
  return (
    <div className="incDecBtn">
        <button onClick={onClick}>{value}</button>
    </div>
  )
}

export default CartIncDec