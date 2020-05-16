import React, { Fragment, Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import User from './components/users/User';
import Search from './components/users/Search';
import Alert from './components/layout/Alert';
import About from './components/pages/About';
import axios from 'axios';
import GithubState from './context/github/GithubState';
import './App.css';

class App extends Component {
  state = {
    users: [],
    user: {},
    repos: [],
    loading: false,
    alert: null,
  };

  //Get users repos
  getUserRepos = async username => {
    this.setState({ loading: true });

    const res = await axios.get(
      `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=$
       {process.env.REACT_APP_GITHUB_CLIENT_ID
        }&client_secret=$
       {process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );

    this.setState({ repos: res.data, loading: false });
  };

  //Get a sigle student user
  getUser = async username => {
    this.setState({ loading: true });

    const res = await axios.get(
      `https://api.github.com/users/${username} ? client_id=$
       {process.env.REACT_APP_GITHUB_CLIENT_ID}& client_secret=$
       {process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );

    this.setState({ user: res.data, loading: false });
  };

  //Clear users from state
  clearUsers = () => this.setState({ users: [], loading: false });

  //Set alert
  setAlert = (msg, type) => {
    this.setState({ alert: { msg, type } });
    // To remove the alert
    setTimeout(() => this.setState({ alert: null }), 4000);
  };

  render() {
    const { users, user, loading, repos } = this.state;

    return (
      <GithubState>
        <Router>
          <div className='App'>
            <Navbar />
            <div className='container'>
              <Switch>
                <Route
                  exact
                  path='/'
                  render={props => (
                    <Fragment>
                      <Search
                        clearUsers={this.clearUsers}
                        showClear={users.length > 0 ? true : false}
                        setAlert={this.setAlert}
                      />
                      <Users loading={loading} users={this.state.users} />
                    </Fragment>
                  )}
                />
                {/* Route */}
                <Route exact path='/about' component={About} />
                <Route
                  exact
                  path='/user/:login'
                  render={props => (
                    <User
                      {...props}
                      getUser={this.getUser}
                      getUserRepos={this.getUserRepos}
                      user={user}
                      repos={repos}
                      loading={loading}
                    />
                  )}
                />
              </Switch>
              <Alert alert={this.state.alert} />
            </div>
          </div>
        </Router>
      </GithubState>
    );
  }
}

export default App;
