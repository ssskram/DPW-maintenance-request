import * as React from 'react'
import { Route } from 'react-router'
import Layout from './components/layout'
import MyRequests from './components/myRequests'
import AllRequests from './components/allRequests'
import OfficeMove from './components/officeMove'
import Home from './init'

export default () => (
  <Layout>
    <Route exact path='/' component={Home} />
    <Route exact path='/MyRequests' component={MyRequests} />
    <Route exact path='/AllRequests' component={AllRequests} />
    <Route exact path='/OfficeMove' component={OfficeMove} />
  </Layout>
)