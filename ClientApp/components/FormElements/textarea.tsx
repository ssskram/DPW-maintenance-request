import * as React from 'react';

export default class textarea extends React.Component<any, any> {

    public render() {
        return (
            <div className="form-group">
                <div className="col-md-12 form-element">
                    <h4 className="form-h4">{this.props.header}{this.props.required == true && <span style={{ color: 'red', fontSize: '20' }}>*</span>}</h4>
                    <textarea type='search'
                        className="form-control"
                        name={this.props.name}
                        id={this.props.name}
                        placeholder={this.props.placeholder}
                        rows={4}
                        onChange={this.props.callback.bind(this)}>
                    </textarea>
                </div>
            </div>
        )
    }
}