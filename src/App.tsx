import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Login from './pages/Login'
import { NextUIProvider } from '@nextui-org/react'
import Account from './pages/Account'
import "@radix-ui/themes/styles.css";
import Redirect from './pages/Redirect'

const App = () => {
    return (
        <NextUIProvider>
            <Router>
                <Routes>
                    <Route path='' element={<Redirect />} />
                    <Route path='login' element={<Login />} />
                    <Route path='account' element={<Account />} />
                </Routes>
            </Router>
        </NextUIProvider>
    )
}

export default App