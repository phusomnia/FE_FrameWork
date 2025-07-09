import './App.css'
import React, { lazy } from 'react';
import {BrowserRouter ,Routes, Route} from "react-router";
import routes from "./routes"

function App() {
  return <>
    <BrowserRouter>
        <Routes>
          {routes.map(({ path, component: Component }) => {
            return <Route key={path} path={path} element={<Component/>}></Route>
          })}
        </Routes>
    </BrowserRouter>
  </>
}

export default App
