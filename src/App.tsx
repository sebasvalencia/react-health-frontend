import React, { Component } from 'react';
import { Login } from './components/Login';
import Dashboard from './components/Dashboard/index';

type AppState = {
  currentTab: number;
}

class App extends Component<{}, AppState> {
  
  

  constructor(props: any) {
    super(props);
    this.state = {
      currentTab: 0
    };
  }

  render() {
    return <Login />;
    // return <Dashboard />;
  }

}

export default App;
