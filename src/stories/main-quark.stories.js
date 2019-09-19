import React, { Component } from 'react'
import { storiesOf } from '@storybook/react'

import MainQuark from '../baryon/main-quark'

export const subject = {
 	name: 'The Matrix',
 	description: 'This is a movie',
 	image_path: 'https://images.ciatr.jp/2017/07/w_828/0kDnZaTrd4xrWWav8PB8XIVBRXoQGsWGgNSdnp2E.jpeg',
 	period_str: '(2019-10-16 - 2019-12-15)',
 	url: 'http://www.whatisthematrix.com',
 	affiliate: 'http://www.whatisthematrix.com'
}

storiesOf('MainQuark', module)
  .add('default', () => <MainQuark subject={subject} />)
