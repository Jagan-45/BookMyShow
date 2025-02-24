import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes,Route} from 'react-router-dom'
import StaticTheatreOwnerCheck from './components/Theatres/StaticTheatreOwner'

function App() {
 
  useEffect(()=>{
    localStorage.setItem("okpage",false);
  },[])
 
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/theatre/kyc/:id/:name" element={<StaticTheatreOwnerCheck/>}/>
        </Routes>
      </Router>
    </div>
  )
}

export default App
