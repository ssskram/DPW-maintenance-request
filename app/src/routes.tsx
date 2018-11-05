import * as React from 'react'
import { Route } from 'react-router'
import Layout from './components/layout'
import Home from './components/home'
import Map from './components/map'

export default () => (
  <Layout>
    <Route exact path='/' component={Home} />
    <Route exact path='/map' component={Map} />
  </Layout>
)