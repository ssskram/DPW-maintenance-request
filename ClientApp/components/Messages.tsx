import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { connect } from 'react-redux';
import { ApplicationState } from '../store';

export default class Messages extends React.Component<any, {}> {
    componentDidMount() {
        window.scrollTo(0, 0)
    }

    createMarkup() { 
        return {__html: this.props.messages};
    }

    public render() {
        return (
            this.props.messages ? (
                <div role="alert" className="alert alert-success">
                    <h3 className="message-body" dangerouslySetInnerHTML={this.createMarkup()}></h3>
                </div>
            ) : null
        )
    }
}
