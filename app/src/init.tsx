import * as React from 'react'
import HomeMap from './components/submit/index'
import HydrateStore from './components/utilities/hydrateStore'

export default class Init extends React.Component<any, any> {

    render() {
        return (
            <div>
                <HydrateStore />
                <HomeMap />
            </div>
        )
    }
}