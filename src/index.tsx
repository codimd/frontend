import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import { ApplicationLoader } from './components/application-loader/application-loader'
import { Editor } from './components/editor/editor'
import { NotFound } from './components/error/not-found'
import { LandingLayout } from './components/landing/landing-layout'
import { History } from './components/landing/pages/history/history'
import { Intro } from './components/landing/pages/intro/intro'
import { Login } from './components/landing/pages/login/login'
import { Profile } from './components/landing/pages/profile/profile'
import { Register } from './components/landing/pages/register/register'
import { Redirector } from './components/redirector/redirector'
import './global-style/index.scss'
import * as serviceWorker from './service-worker'
import { store } from './redux'

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <ApplicationLoader>
        <Switch>
          <Route path="/history">
            <LandingLayout>
              <History/>
            </LandingLayout>
          </Route>
          <Route path="/intro">
            <LandingLayout>
              <Intro/>
            </LandingLayout>
          </Route>
          <Route path="/login">
            <LandingLayout>
              <Login/>
            </LandingLayout>
          </Route>
          <Route path="/register">
            <LandingLayout>
              <Register/>
            </LandingLayout>
          </Route>
          <Route path="/profile">
            <LandingLayout>
              <Profile/>
            </LandingLayout>
          </Route>
          <Route path="/n/:id">
            <Editor/>
          </Route>
          <Route path="/:id">
            <Redirector/>
          </Route>
          <Route path="/">
            <Redirect to="/intro"/>
          </Route>
          <Route>
            <NotFound/>
          </Route>
        </Switch>
      </ApplicationLoader>
    </Router>
  </Provider>
  , document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
