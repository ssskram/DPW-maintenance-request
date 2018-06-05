import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { connect } from 'react-redux';
import { ApplicationState } from '../store';
import * as FacilitiesStore from '../store/facilities';

type FacilitiesProps =
  FacilitiesStore.FacilitiesState
  & typeof FacilitiesStore.actionCreators
  & RouteComponentProps<{}>;

export class Home extends React.Component<FacilitiesProps, {}> {
    componentDidMount() {
        this.props.requestAllFacilities()
    }

    public render() {
        return (
            <div>
                <h1>make this nice</h1>
            </div>
        )
    }
}

export default connect(
    (state: ApplicationState) => state.facility, 
    FacilitiesStore.actionCreators               
  )(Home as any) as typeof Home;