import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import ConfirmFacility from './Form/ConfirmFacility';
import SelectIssue from './Form/SelectIssue';
import DescribeIssue from './Form/DescribeIssue';
import RecentlySubmitted from './Form/RecentlySubmitted';
import * as IssuesStore from '../../store/issues';
import { ApplicationState } from '../../store';
import { connect } from 'react-redux';

type AllProps =
    IssuesStore.IssuesState &
    typeof IssuesStore.actionCreators &
    RouteComponentProps<{}>;

export class Overlay extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            stage: 'confirm',
            issueType: ''
        }
    }

    componentDidMount() {
        this.props.requestAllIssues()
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
            case 'recents':
                return (<RecentlySubmitted next={this.handleChange} img={this.props.img} name={this.props.name} />);
            case 'issue':
                return (<SelectIssue next={this.handleChange} />);
            case 'describe':
                return (<DescribeIssue issues={this.props.issues} next={this.handleChange} type={this.state.issueType} name={this.props.name} neighborhood={this.props.neighborhood} />);
        }
    }

    render() {
        return (
            <div>
            <button className="topcorner btn-x" onClick={this.props.exit}>x</button>
                {this.getComponent()}
            </div>
        );
    }
}

export default connect(
    (state: ApplicationState) => state.issues,
    IssuesStore.actionCreators
)(Overlay as any) as typeof Overlay;