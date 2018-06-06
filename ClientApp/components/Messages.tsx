import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { connect } from 'react-redux';
import { ApplicationState } from '../store';

const font = {
    color: '#fff'
}

export default class Messages extends React.Component<any, {}> {
    componentDidMount() {
        window.scrollTo(0, 0)
    }

    public render() {
        return (
            this.props.messages ? (
                <div role="alert" className="alert alert-success">
                    <h3 style={font} >{this.props.messages}</h3>
                </div>
            ) : null
        )
    }
}
