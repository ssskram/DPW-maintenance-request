import * as React from 'react';

export default class Messages extends React.Component<any, any> {

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
