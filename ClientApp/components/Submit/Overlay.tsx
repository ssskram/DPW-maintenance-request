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
        }
    }

    handleChange = event => {
        this.setState({
            stage: event.target.id
        });
    };

    returnToFacilities() {
        alert("kill modal at parent")
    }

    getComponent() {
        var stage = this.state.stage;
        alert(stage)
        switch (stage) {
            case 'exit':
                this.returnToFacilities();
            case 'confirm':
                return (<ConfirmFacility next={this.handleChange.bind(this)} img={this.props.img} name={this.props.name} neighborhood={this.props.neighborhood} />);
            case 'issue':
                return (<SelectIssue next={this.handleChange.bind(this)} />);
            case 'describe':
                return (<DescribeIssue next={this.handleChange.bind(this)} />);
        }
    }

    render() {
        return (
            <div className="text-center">
                {this.getComponent()}
            </div>
        );
    }
}