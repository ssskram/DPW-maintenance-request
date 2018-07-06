import * as React from 'react';
import LoadingImage from '../../../LoadingImage'

const imgStyle = {
    maxHeight: '250px',
    borderRadius: '10px',
    margin: '0 auto'
}

export default class ConfirmFacility extends React.Component<any, any> {
    constructor() {
        super();
    }

    render() {
        const { img, name, neighborhood } = this.props;
        const { next } = this.props;

        return (
            <div className="text-center">
                <h2>Is this the one?</h2>
                <div>
                    <LoadingImage style={imgStyle} src={img} />
                </div>
                <h3>{name}</h3>
                <h4>{neighborhood}</h4>
                <button value='recents' onClick={next.bind(this)} className="btn btn-success">Yes</button>
            </div>
        );
    }
}