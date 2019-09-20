import React, { Component } from 'react'
import { BrowserRouter, Switch, Link } from 'react-router-dom'
import { storiesOf } from '@storybook/react'
// import { action } from '@storybook/addon-actions'
import { makeStyles } from '@material-ui/styles'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'

import Gluon from '../baryon/gluon'

export const interaction = {
  objectName: 'name 1',
  objectImagePath: 'https://images.ciatr.jp/2017/07/w_828/0kDnZaTrd4xrWWav8PB8XIVBRXoQGsWGgNSdnp2E.jpeg',
  relationText: (
    <p className="baryon-strong-interaction">The Matrix is directed by euonymus</p>
  ),
  relationPeriod: '(2019-10-16 - 2019-12-15)',
  object: {
    getLinkPath: (str) => {
      return (
        <Link to="name 1">{str}</Link>
      )
    }
  }
}

// export const actions = {
//     onPinTask: action('onPinTask'),
//     onArchiveTask: action('onArchiveTask'),
// }

storiesOf('Gluon', module)
  .addDecorator(story => <BrowserRouter><Switch>{story()}</Switch></BrowserRouter>)
  .add('default', () => <Gluon interaction={interaction} />)
// .add('pinned', () => <Gluon interaction={{ ...interaction, state: 'TASK_PINNED' }} {...actions} />)

