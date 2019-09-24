// react
import React, { Component } from 'react'
import Home from '../components/home'

class HomeContainer extends Component {
  state = {
    hasSecondLevel: true
  }

  onButtonClick = (hasSecondLevel) => {
    this.setState({hasSecondLevel})
  }

  render() {
    const { hasSecondLevel } = this.state
	  return <Home quark_name={this.props.match.params.name} hasSecondLevel={hasSecondLevel} onButtonClick={this.onButtonClick}/>
  }
}

export default HomeContainer
