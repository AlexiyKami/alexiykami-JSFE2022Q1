import { useState } from 'react';
import { connect, useSelector } from 'react-redux';
import './App.css';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Main from './components/Main/Main';
import ModalWindow from './components/ModalWindow/ModalWindow';

function App() {
  const [modalActive, setModalActive] = useState(false);
  return (
    <div className="app-wrapper">
      <Header />
      <Main setActive={setModalActive} />
      <Footer />
      <ModalWindow active={modalActive} setActive={setModalActive}>
        Sorry, all slots are full!
      </ModalWindow>
    </div>
  );
}

export default connect()(App);
