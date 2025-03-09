import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Invoice from './components/invoice/Invoice';
import Admin from './components/admin/Admin';

function App() {
  return (
    <>
  
    <BrowserRouter>
    
      <Routes>
        <Route path="/" element={<Admin />} />
        <Route path="/invoice" element={<Invoice />} />
      </Routes>
    </BrowserRouter>
    </>
    
  );
}

export default App;
