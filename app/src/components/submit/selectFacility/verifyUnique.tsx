
import * as React from "react"
import LoadingImage from './../../utilities/loadingImage'

const imgStyle = {
    maxHeight: '150px',
    borderRadius: '10px',
    margin: '0 auto'
}

export default class verifyUnique extends React.Component<any, any> {
    constructor(props) {
        super(props)
        this.state = {
            relevantRequests: []
        }
    }

    componentDidMount() {
        this.setState({
            relevantRequests: this.props.allRequests.filter(request => {
                return request.building == this.props.facility.name
            })
        })
    }

    render() {
        const {
            relevantRequests
        } = this.state

        const {
            facility
        } = this.props

        const recentlySubmitted = relevantRequests.map((request) => {
            return <div className="container-fluid" key={request.oid}>
                <div className="col-md-12">
                    <div className="panel">
                        <div className="panel-body text-center">
                            <div className="col-md-12">
                                <h5>{request.submitted}</h5>
                                <h5><b>{request.issue}</b></h5>
                                <h5>Status: {request.status}</h5>
                                <h5>Location: {request.location}</h5>
                                <h5><i>"{request.description}"</i></h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        })

        return (
            <div className="text-center">
                <h3>Has your issue already been reported?</h3>
                <div className="text-center">
                    <LoadingImage style={imgStyle} src={"https://tools.wprdc.org/images/pittsburgh/facilities/" + facility.name.replace(/ /g, "_") + ".jpg"} />
                </div>
                <button style={{margin: '20px 0px'}} onClick={this.props.confirm} className="btn btn-success">Continue</button>
                {relevantRequests.length > 0 &&
                    <div className="row">
                        {recentlySubmitted}
                    </div>
                }
                {relevantRequests.length == 0 &&
                    <div className='text-center'>
                        <h4><i>No issues reported at<br />{facility.name}</i></h4>
                    </div>
                }
            </div>
        )
    }
}