import * as React from 'react'
import Submit from './components/submit/index'
import HydrateStore from './components/utilities/hydrateStore'

export default class Init extends React.Component<any, any> {

    render() {
        return (
            <div>
                <HydrateStore />
                <Submit />
            </div>
        )
    }
}