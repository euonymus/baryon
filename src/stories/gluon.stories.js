import React from 'react'
import { BrowserRouter, Switch } from 'react-router-dom'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import Gluon from '../baryon-components/gluon'

export const interaction = {
  object: {
    properties: {
      name: 'name 1',
      image_path: 'https://images.ciatr.jp/2017/07/w_828/0kDnZaTrd4xrWWav8PB8XIVBRXoQGsWGgNSdnp2E.jpeg'
    },
    getName: () => {
      return 'name 1'
    }
  },
  gluon: {
    period_str: '(2019-10-16 - 2019-12-15)'
  },
  relationText: 'The Matrix is directed by euonymus'
  // id: '1',
  // title: 'Test Task',
  // state: 'TASK_INBOX',
  // updatedAt: new Date(2018, 0, 1, 9, 0),
}

export const actions = {
    onPinTask: action('onPinTask'),
    onArchiveTask: action('onArchiveTask'),
}

storiesOf('Gluon', module)
  .addDecorator(story => <BrowserRouter><Switch>{story()}</Switch></BrowserRouter>)
  .add('default', () => <Gluon interaction={interaction} />)
// .add('pinned', () => <Gluon interaction={{ ...interaction, state: 'TASK_PINNED' }} {...actions} />)
// .add('archived', () => <Gluon interaction={{ ...interaction, state: 'TASK_ARCHIVED' }} {...actions} />)
