import * as React from 'react';
import { Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import Home from './components/Home';
import selectMap from './components/Submit/Map';
import Search from './components/Submit/Search';
import MyRequests from './components/Track/MyRequests';
import AllRequests from './components/Track/AllRequests';
import { Login } from './components/Account/Login';

export const routes = <Layout>
    <Route exact path='/' component={ Home } />
    <Route path='/Map' component={ selectMap } />
    <Route path='/Search' component={ Search } />
    <Route path='/MyRequests' component={ MyRequests } />
    <Route path='/AllRequests' component={ AllRequests } />
    <Route path='/Account/Login' component={ Login } />
</Layout>;
