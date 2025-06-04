import React from 'react'
// import MainRouter from './router'; // 라우터 import
import './App.css'

// 메인 컴포넌트

const App: React.FC = () => {
  return (
    <div className="App">
      {/* <MainRouter /> */}
      <header className="App-header">
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  )
}

export default App
