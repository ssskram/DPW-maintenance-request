import * as React from 'react'
import { connect } from 'react-redux'
import { ApplicationState } from '../../../store'
import * as OpenRequest from '../../../store/openRequest'
import * as Issues from '../../../store/issues'
import * as types from '../../../store/types'
import Fields from './fields'
import LoadingImage from '../../utilities/loadingImage'

const imgStyle = {
    maxHeight: '150px',
    borderRadius: '10px',
    margin: '0 auto'
}

interface actionProps {
    updateRequest: (newRequest: types.newRequest) => void
}

type props =
    types.openRequest &
    types.issues &
    actionProps

export class Form extends React.Component<props, any> {

    componentDidMount() {
        console.log(this.props)
    }

    render() {
        const {
            openRequest,
            issues,
            updateRequest
        } = this.props

        return (
            <div>
                <div className='row'>
                    <div className='col-md-12 text-center'>
                        <h3>{openRequest.building}</h3>
                    </div>
                    <div className='col-md-12 text-center'>
                        <LoadingImage style={imgStyle} src={"https://tools.wprdc.org/images/pittsburgh/facilities/" + openRequest.building.replace(/ /g, "_") + ".jpg"} />
                    </div>
                    <div className='col-md-12'>
                        <Fields
                            openRequest={openRequest}
                            issues={issues}
                            updateRequest={updateRequest}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(
    (state: ApplicationState) => ({
        ...state.openRequest,
        ...state.issues
    }),
    ({
        ...OpenRequest.actionCreators,
        ...Issues.actionCreators
    })
)(Form)