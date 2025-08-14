import React from 'react'
import { Outlet } from 'react-router-dom'

const CartLayout = () => {
  return (
    <div>
        Some of the extra navigation in cart

        <section>
            <Outlet />
        </section>

    </div>
  )
}

export default CartLayout