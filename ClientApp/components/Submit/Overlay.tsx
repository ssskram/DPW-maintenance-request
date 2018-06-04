import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link, NavLink, Redirect } from 'react-router-dom';
import ConfirmFacility from './Form/ConfirmFacility';
import SelectIssue from './Form/SelectIssue';
import DescribeIssue from './Form/DescribeIssue'

export default class Overlay extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            stage: 0,
        }
    }

    handleChange = event => {
        this.setState({
          stage: event.target.value
        });
        this.forceUpdate()
    };

    getComponent(stage) {
        switch (stage) {
            case 0:
                return <ConfirmFacility stage={this.state.stage} next={this.handleChange} img={this.props.img} name={this.props.name} neighborhood={this.props.neighborhood} />;
            case 1:
                return <SelectIssue />;     
            case 2:
                return <DescribeIssue />;     
        }
    }
    render() {
        var { stage } = this.state;

        return (
            <div className="text-center">
                {this.getComponent(stage)}
            </div>
        );
    }
}