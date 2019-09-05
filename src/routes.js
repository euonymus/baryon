import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
// components
import ScrollToTop   from './components/scroll_to_top';
// pages
import Home from './pages/home';

class AppRoutes extends Component {
  render () {
	  return (
      <BrowserRouter>
        <ScrollToTop />
        <Switch>
          <Route path='/:name' exact component={Home}/>
          <Route path='/' exact component={Home}/>
        </Switch>
      </BrowserRouter>
	  )
  }
}

export default AppRoutes
