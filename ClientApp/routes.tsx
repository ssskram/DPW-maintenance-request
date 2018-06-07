import * as React from 'react';
import { Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import Home from './components/Home';
import MapContainer from './components/Submit/MapContainer';
import Search from './components/Submit/Search';
import MyRequests from './components/Track/MyRequests';
import { Login } from './components/Account/Login';

export const routes = <Layout>
    <Route exact path='/' component={ Home } />
    <Route path='/Map' component={ MapContainer } />
    <Route path='/Search' component={ Search } />  
    <Route path='/MyRequests' component={ MyRequests } />
    <Route path='/Account/Login' component={ Login } />
</Layout>;
