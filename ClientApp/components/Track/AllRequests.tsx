import * as React from 'react';
import { RouteComponentProps } from 'react-router';

export default class AllRequests extends React.Component<RouteComponentProps<{}>, {}> {
    public render() {
        return <div>
        <h2>Return table of all requests submitted through this system</h2>
        <h2>Sort by most recent</h2>
        <h2>Filterable by facility</h2>
        </div>;
    }
}