import * as React from 'react';
import { Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import Home from './components/Home';
import Survey from './components/Survey';
import MapContainer from './components/Submit/Map/MapContainer';
import Search from './components/Submit/List/List';
import MyRequests from './components/Track/MyRequests';

export const routes = <Layout>
    <Route exact path='/' component={ Home } />
    <Route path='/Survey' component={ Survey } />
    <Route path='/Map' component={ MapContainer } />
    <Route path='/Search' component={ Search } />  
    <Route path='/MyRequests' component={ MyRequests } />
</Layout>;
