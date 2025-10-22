import './App.css'
import {RouterProvider} from "react-router-dom";
import Router from "./routing/Routing";

function App() {
  
  return (
    <>
      <div id="app">
        <RouterProvider router={Router}/>
      </div>
    </>
  )
}

export default App
