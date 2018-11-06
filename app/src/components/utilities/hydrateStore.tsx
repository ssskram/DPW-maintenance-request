
// hydrates the wholeeeeee store

import * as React from 'react'
import { connect } from 'react-redux'
import { ApplicationState } from '../../store'
import * as facilities from '../../store/facilities'
import * as myRequests from '../../store/myRequests'
import * as allRequests from '../../store/allRequests'
import * as issues from '../../store/issues'
import * as user from '../../store/user'

class Hydrate extends React.Component<any, {}> {

    componentDidMount() {
        this.props.loadUser()
        this.props.loadFacilities()
        this.props.loadIssues()
        this.props.loadAllRequests()
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.user != nextProps.user) {
            this.props.loadMyRequests(nextProps.user)
        }
    }

    public render() {
        return null
    }
}

export default connect(
    (state: ApplicationState) => ({
        ...state.facilities,
        ...state.issues,
        ...state.myRequests,
        ...state.user,
        ...state.allRequests
    }),
    ({
        ...facilities.actionCreators,
        ...issues.actionCreators,
        ...myRequests.actionCreators,
        ...user.actionCreators,
        ...allRequests.actionCreators
    })
)(Hydrate)