import React from 'react'
import { Outlet } from 'react-router-dom'

const OrderLayout = () => {
  return (
    <div>
        Some navigation for orders only
        <section>
            <Outlet />
        </section>
    </div>
  )
}

export default OrderLayout