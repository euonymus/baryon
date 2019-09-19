import React from 'react'
import { BrowserRouter, Switch } from 'react-router-dom'
import { storiesOf } from '@storybook/react'

import PropertyBox from '../baryon/property_box'
import { interaction } from './gluon.stories'

export const propertyResource = {
  property: 'Directed',
  gluonsRelated: [
    interaction,
    { ...interaction, objectName: 'name 2', objectImagePath: 'https://s3-ap-southeast-2.amazonaws.com/fna-wordpress-website06/wp-content/uploads/2018/09/05151330/matrixreloaded-1440x960.jpg', relationPeriod: '(2017-03)'}
  ]
}

storiesOf('PropertyBox', module)
  .addDecorator(story => <BrowserRouter><Switch>{story()}</Switch></BrowserRouter>)
  .add('default', () => <PropertyBox propertyResource={propertyResource} />)
