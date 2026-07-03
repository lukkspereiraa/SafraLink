import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

// Importando as duas telas
import App from './App.jsx'
import Dashboard from './Dashboard.jsx'

// Importando os estilos
import './index.css'
import './dashboard.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Rota principal (Mobile do Produtor) */}
        <Route path="/" element={<App />} />
        
        {/* Rota do painel (Desktop do Fornecedor) */}
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)