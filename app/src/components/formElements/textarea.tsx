import * as React from 'react'

type props = {
    value: string
    placeholder: string
    header: string
    required: boolean
    callback: (value: any) => void
}

export default class Textarea extends React.Component<props, any> {
    constructor(props) {
        super(props)
        this.state = {
            height: '100px'
        }
    }

    setHeight(element) {
        let newHeight = element.target.scrollHeight
        if (newHeight > 98) {
            this.setState({
                height: newHeight + 'px'
            })
        }
        if (element.target.value == '') {
            this.setState({
                height: '100px'
            })
        }
    }

    public render() {
        return (
            <div className="form-group">
                <div className="col-md-12 form-element">
                    <h5>{this.props.header}{this.props.required == true && <span style={{ color: 'red', fontSize: '20' }}>*</span>}</h5>
                    <textarea
                        onKeyUp={this.setHeight.bind(this)}
                        onFocus={this.setHeight.bind(this)}
                        value={this.props.value}
                        className='form-control'
                        placeholder={this.props.placeholder}
                        style={{ height: this.state.height }}
                        onChange={this.props.callback.bind(this)}>
                    </textarea>
                </div>
            </div>
        )
    }
}