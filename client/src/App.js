import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';
import Login from './components/auth/Login';
import Register from './components/auth/Register';

import Dashboard from './components/dashboard/Dashboard';
import Homepage from './components/homepage/Homepage';
import { connect } from 'react-redux';

class App extends Component {

  // componentDidMount() {
  //   store.dispatch(loadUser());
  // }

  render() {
    //routes for unauthenticated users
    let routes = (
      <Switch>
        <Route exact path="/" component={Homepage} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Redirect to="/"/>
      </Switch>
    )

      //if (this.props.isAuthenticated){
        routes = (
          <Switch>
            <Route exact path="/" component={Homepage} />
            <Route exact path="/login" component={Login} />
            <Route path="/dashboard" component={Dashboard} />
          </Switch>
        );
     // }

    return (

      <BrowserRouter>
        <div className="App">
          <Switch>
            <Route exact path="/" component={Homepage} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route path="/dashboard" component={Dashboard} />
          </Switch>
        </div>
      </BrowserRouter>

    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user
  }
}

export default connect(mapStateToProps, null)(App);
