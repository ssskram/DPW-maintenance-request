import * as React from 'react'
import Map from './map'

export default class SelectFacility extends React.Component<any, any> {
    
    render() {
        return (
            <div>
                <Map facilities={this.props.facilities}/>
            </div>
        )
    }
}