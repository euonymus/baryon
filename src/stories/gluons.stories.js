import React from 'react'
// import { BrowserRouter, Switch } from 'react-router-dom'
import { storiesOf } from '@storybook/react'

import Gluons from '../baryon-components/gluons'
import { interaction } from './gluon.stories'
import { LANGTYPE_JP_LIKE } from '../baryon-components/constants/langtypes'

export const gluons = [
  {
    keys: ['subject', 'gluon', 'object'],
    _fieldLookup: { subject:'0', gluon:'1', object: '2' },
    _fields: {
      '0': { identity: {low:192, high: 0}, labels: ['Movie'], properties: {name:'hoge'}},
      '1': {},
      '2': {},
    },
    get: (key) => {
      return this._fields[key]
    },
  },
]
export const langType = LANGTYPE_JP_LIKE

// .addDecorator(story => <BrowserRouter><Switch>{story()}</Switch></BrowserRouter>)
storiesOf('Gluons', module)
  .add('default', () => <Gluons gluons={gluons} langType={langType}/>)
