import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">CITY COFFEE</h1>
        </header>
        <p className="App-intro">
          TRY A CUP OF CITY COFFEE.
        </p>
      </div>
    );
  }
}

export default App;
