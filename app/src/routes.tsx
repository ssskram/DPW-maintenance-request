import * as React from 'react'
import { Route } from 'react-router'
import Layout from './components/layout'
import Track from './components/track'
import Submit from './components/submit'

export default () => (
  <Layout>
    <Route exact path='/' component={Submit} />
    <Route exact path='/track' component={Track} />
  </Layout>
)