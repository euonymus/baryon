import React from 'react'
// import { BrowserRouter, Switch } from 'react-router-dom'
import { storiesOf } from '@storybook/react'

import Gluons from '../baryon-components/gluons'
import { interaction } from './gluon.stories'
import { LANGTYPE_JP_LIKE } from '../baryon-components/constants/langtypes'

class Record {
  keys = ['subject', 'gluon', 'object']
  _fieldLookup = { subject:'0', gluon:'1', object: '2' }
  _fields = {
    '0': { identity: {low:192, high: 0}, labels: ['Movie'], properties: {name:'hoge', start:'2000-01-01'}},
    '1': { identity: {low:192, high: 0}, type: 'Directed', properties: {relation:'hoge', start:'2000-01-01'}},
    '2': { identity: {low:192, high: 0}, labels: ['Movie'], properties: {name:'hoge', start:'2000-01-01'}},
  }
  get = (key) => {
    return this._fields[key]
  }
}
const record = new Record()
export const gluons = [
  record,
]
export const langType = LANGTYPE_JP_LIKE

// .addDecorator(story => <BrowserRouter><Switch>{story()}</Switch></BrowserRouter>)
storiesOf('Gluons', module)
  .add('default', () => <Gluons gluons={gluons} langType={langType}/>)
