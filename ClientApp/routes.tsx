import * as React from 'react';
import { Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import Home from './components/Home';
import { GetUser } from './components/GetUser';
import { Form } from './components/Form';
import { Login } from './components/Account/Login';

export const routes = <Layout>
    <Route exact path='/' component={ Home } />
    <Route path='/Form' component={ Form } />
    <Route path='/GetUser' component={ GetUser } />
    <Route path='/Account/Login' component={ Login } />
</Layout>;
