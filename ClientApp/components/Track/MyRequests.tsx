import * as React from 'react';
import { RouteComponentProps } from 'react-router';

export default class MyRequests extends React.Component<RouteComponentProps<{}>, {}> {
    public render() {
        return <div>
        <h2>Return table of user's submitted items</h2>
        <h4>If new item submitted, throw success prompt</h4>
        </div>;
    }
}