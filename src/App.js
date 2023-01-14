import React from 'react';
import './App.css'
import Title from './components/Title'
import Form from './components/Form'
import Footer from './components/Footer'

function App() {
  return (
    <React.Fragment>
      <Title />
      <Form />
      {/* <Content /> */}
      <Footer />
    </React.Fragment>
  );
}

export default App;
