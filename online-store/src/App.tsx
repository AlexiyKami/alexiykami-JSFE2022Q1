import { useState } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Cart from './components/Cart/Cart';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Main from './components/Main/Main';
import ModalWindow from './components/ModalWindow/ModalWindow';

function App() {
  const [modalActive, setModalActive] = useState(false);
  return (
    <BrowserRouter>
      <div className="app-wrapper">
        <Header />
        <Routes>
          <Route path="/" element={<Main setActive={setModalActive} />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
        <Footer />
        <ModalWindow active={modalActive} setActive={setModalActive}>
          Sorry, all slots are full!
        </ModalWindow>
      </div>
    </BrowserRouter>
  );
}

export default connect()(App);
