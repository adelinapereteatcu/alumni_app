import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Logout from './components/auth/Logout';
import { createStore } from 'redux';
import store from './store';
import { Provider } from 'react-redux';
import { loadUser } from './store/actions/authActions';
import Dashboard from './components/dashboard/Dashboard';
import Homepage from './components/homepage/Homepage';
import Upload from './components/upload/Upload';

class App extends Component {

  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div className="App">
            <Navbar />
            <Switch>
              <Route exact path="/" component={Homepage} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/upload" component={Upload} />
              <Route exact path="/dashboard" component={Dashboard} />
            </Switch>
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
