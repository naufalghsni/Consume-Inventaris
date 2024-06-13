import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import './App.css'
import Card from './components/Card/Card'
import Dashboard from './pages/Dashboard'
import User from './pages/User/User'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Case from './components/Case'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>

    {/* <Dashboard/>
    <User/> */}

    {/* <BrowserRouter>
      <Routes>
        <Route path='/' element={<Dashboard />} />
        <Route path='/User' element={<User />} />
      </Routes>
    </BrowserRouter> */}

    {/* <Card nama="Naufal" rombel="PPLG XI-5" rayon="Cicurug 1"/>
    <Card nama="Ardan" rombel="PPLG XI-5" rayon="Ciawi 5"/>
    <Card nama="TauROG" rombel="PPLG XI-5" rayon="Cicurug 4"/> */}

      {/* <Card /> */}

      {/* <Card>
        
      </Card> */}
      {/* <Card>
        <ul>
          <li>List 1</li>
        </ul>
      </Card>
      
      <Card>
        Ini adalah card 2
      </Card> */}

      {/* <div>
        <h1>Naufal</h1>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div> 
      <h1>9 + 10 = 21 ?</h1>
      <h1>The Origin Story</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p> */}

        <Case>
          <div className='bg-gray-900 flex items-center justify-center min-h-screen'>
              <div className="bg-gray-800 border-t border-gray-600 shadow rounded-lg max-w-lg w-full p-6">
                  <h4 className='text-white text-2xl'>Hello Guys</h4>
                  <p className='text-lg text-gray-400 leading-relaxed'>What's 9 + 10 ? 21</p>
                  <p className='text-lg text-gray-400 leading-relaxed'>The Origin Story</p>
              </div>
          </div>
        </Case>

    </>
  )
}

export default App
