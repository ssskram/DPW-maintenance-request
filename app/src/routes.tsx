import * as React from 'react'
import { Route } from 'react-router'
import Layout from './components/layout'
import Track from './components/track'
import Home from './init'

export default () => (
  <Layout>
    <Route exact path='/' component={Home} />
    <Route exact path='/track' component={Track} />
  </Layout>
)