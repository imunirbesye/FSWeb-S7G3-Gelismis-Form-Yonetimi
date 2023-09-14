import React, {useState} from 'react';
import axios from 'axios';
import * as Yup from 'yup';
import Form from './components/Form';
import './App.css';

function App() {
  return (
    <div className="App">
      <Form />
    </div>
  );
}

export default App;
