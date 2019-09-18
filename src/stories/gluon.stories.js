import React, { Component } from 'react'
import { BrowserRouter, Switch } from 'react-router-dom'
import { storiesOf } from '@storybook/react'
// import { action } from '@storybook/addon-actions'

import Gluon from '../baryon-components/gluon'

export const interaction = {
  objectName: 'name 1',
  objectImagePath: 'https://images.ciatr.jp/2017/07/w_828/0kDnZaTrd4xrWWav8PB8XIVBRXoQGsWGgNSdnp2E.jpeg',
  relationText: (
    <p className="baryon-strong-interaction">The Matrix is directed by euonymus</p>
  ),
  relationPeriod: '(2019-10-16 - 2019-12-15)'
}

// export const actions = {
//     onPinTask: action('onPinTask'),
//     onArchiveTask: action('onArchiveTask'),
// }

storiesOf('Gluon', module)
  .addDecorator(story => <BrowserRouter><Switch>{story()}</Switch></BrowserRouter>)
  .add('default', () => <Gluon interaction={interaction} />)
// .add('pinned', () => <Gluon interaction={{ ...interaction, state: 'TASK_PINNED' }} {...actions} />)
// .add('archived', () => <Gluon interaction={{ ...interaction, state: 'TASK_ARCHIVED' }} {...actions} />)
