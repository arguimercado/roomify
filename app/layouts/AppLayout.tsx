import React from 'react'
import {Outlet} from "react-router";
import Navbar from "~/layouts/Navbar";

const AppLayout = () => {
  return (
    <div>
      <Navbar />
      <main>
        <Outlet/>
      </main>
    </div>
  )
}
export default AppLayout
