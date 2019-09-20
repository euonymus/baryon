// react
import React, { Component } from 'react'
import { withRouter } from "react-router-dom"
// Material UI
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

class NameForm extends Component {
  state = {
    name: ''
  }

  onSubmit = event => {
    event.preventDefault()
	  this.props.history.push(`/${this.state.name}`)
  }

  onChange = event => {
    const { name, value, maxLength } = event.target
    const newValue = (maxLength > 0) ? value.slice(0, maxLength) : value
    this.setState({ [name]: newValue })
  }

  isValid(name) {
    return (name !== '')
  }

  render () {
    const { name } = this.state
    const isInvalid = !this.isValid(name)
	  return (
      <div>
        <br />
        <br />
        <h1>Baryon Example App</h1>
        <br />
        <p>Please enter</p>

        <form onSubmit={this.onSubmit}>
          <TextField
            id='outlined-name'
            name='name'
            label='Node Name'
            value={name}
            inputProps={
            {maxLength: "255"}
            }
            onChange={this.onChange}
            variant='outlined'
          />
          <br />
          <br />
          <Button disabled={isInvalid} variant="contained" type="submit">Submit</Button>
        </form>
      </div>
	  )
  }
}
export default withRouter(NameForm)
