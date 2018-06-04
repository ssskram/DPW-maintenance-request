import * as React from 'react';
import { RouteComponentProps } from 'react-router';

const imgStyle = {
    maxHeight: '500px',
    borderRadius: '10px',
    margin: '0 auto'
}

export default class ConfirmFacility extends React.Component<any, any> {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        window.scrollTo(0, 0)
    }
    
    render() {
        const { img, name, neighborhood } = this.props;
        const { next } = this.props;

        return (
            <div className="text-center">
                <h1>Is this the one?</h1>
                <img className="img-responsive" style={imgStyle} src={img} />
                <h2>{name}</h2>
                <h3>{neighborhood}</h3>
                <div className="row col-md-12">
                    <div className="col-md-4 text-center">
                        <button value='exit' onClick={next.bind(this)} className="btn btn-danger">No</button>
                    </div>
                    <div className="col-md-4"/>
                    <div className="col-md-4 text-center">
                        <button value='issue' onClick={next.bind(this)} className="btn btn-success">Yes</button>
                    </div>
                </div>
            </div>
        );
    }
}