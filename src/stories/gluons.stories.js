import React from 'react'
import { BrowserRouter, Switch } from 'react-router-dom'
import { storiesOf } from '@storybook/react'

import Gluons from '../baryon/gluons'
import { propertyResource } from './property-box.stories'

export const propertyResources = [
  propertyResource,
  propertyResource,
]

storiesOf('Gluons', module)
  .addDecorator(story => <BrowserRouter><Switch>{story()}</Switch></BrowserRouter>)
  .add('default', () => <Gluons gluons targetProperties={propertyResources} />)
