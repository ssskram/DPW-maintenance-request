import * as React from 'react';
import { Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import Home from './components/Home';
import selectMap from './components/Map';
import selectTable from './components/Table';
import MyRequests from './components/MyRequests';
import AllRequests from './components/AllRequests';
import { Login } from './components/Account/Login';

export const routes = <Layout>
    <Route exact path='/' component={ Home } />
    <Route path='/Map' component={ selectMap } />
    <Route path='/Table' component={ selectTable } />
    <Route path='/MyRequests' component={ MyRequests } />
    <Route path='/AllRequests' component={ AllRequests } />
    <Route path='/Account/Login' component={ Login } />
</Layout>;
