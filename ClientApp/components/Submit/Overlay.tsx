import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import ConfirmFacility from './Form/ConfirmFacility';
import SelectIssue from './Form/SelectIssue';
import DescribeIssue from './Form/DescribeIssue'

export default class Overlay extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            stage: 'confirm',
            issueType: ''
        }
    }

    returnToFacilities() {
        this.props.exit()
    }

    handleChange = event => {
        this.setState({ stage: event.currentTarget.value });
        if (event.currentTarget.name != null) {
            this.setIssueType(event);
        }
    };

    setIssueType = event => {
        this.setState({ issueType: event.currentTarget.name });
    }

    getComponent() {
        var stage = this.state.stage;

        switch (stage) {
            case 'exit':
                this.returnToFacilities();
            case 'confirm':
                return (<ConfirmFacility next={this.handleChange} img={this.props.img} name={this.props.name} neighborhood={this.props.neighborhood} />);
            case 'issue':
                return (<SelectIssue next={this.handleChange} />);
            case 'describe':
                return (<DescribeIssue next={this.handleChange} type={this.state.issueType} name={this.props.name} neighborhood={this.props.neighborhood} />);
        }
    }

    render() {
        return (
            <div>
                {this.getComponent()}
            </div>
        );
    }
}