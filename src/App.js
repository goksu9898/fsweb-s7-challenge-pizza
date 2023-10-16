import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Order from './pages/Order';
import Success from './pages/Success';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/siparis" element={<Order />} />
        <Route path="/success" element={<Success />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;  