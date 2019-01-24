import * as React from 'react'
import MaintenanceRequest from './components/maintenanceRequest/index'
import HydrateStore from './components/utilities/hydrateStore'

export default class Init extends React.Component<any, any> {

    render() {
        return (
            <div>
                <HydrateStore />
                <MaintenanceRequest />
            </div>
        )
    }
}