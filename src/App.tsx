import { useEffect } from 'react'
import './App.css'
import {  getRCCollectionTypes } from './pb/client'

function App() {
  useEffect(() => {
  getRCCollectionTypes()
  },[])
  return (
    <div>
      <h1>UWU</h1>
    </div>
  )
}

export default App
