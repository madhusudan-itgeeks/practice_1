import { useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import Register from '../register/Signup'
import Login from '../register/Login'

import Dashboard from '../dashboard/Dashboard'

import PrivateComponent from '../PrivateComponent'




function Routing() {
  
  


    return (
        <div>

            <Routes>
                <Route element={<PrivateComponent/>}>
                    <Route path="/dashboard" element={< Dashboard />} />
                </Route>
                <Route path="/" element={< Register />} />

                <Route path="/signin" element={< Login />} />
            </Routes>




        </div>
    )
}

export default Routing