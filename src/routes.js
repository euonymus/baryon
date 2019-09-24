import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
// components
import ScrollToTop   from './components/scroll_to_top';
// pages
import HomeContainer from './pages/home-container';

class AppRoutes extends Component {
  render () {
	  return (
      <BrowserRouter>
        <ScrollToTop />
        <Switch>
          <Route path='/:name' exact component={HomeContainer}/>
          <Route path='/' exact component={HomeContainer}/>
        </Switch>
      </BrowserRouter>
	  )
  }
}

export default AppRoutes
