import * as React from 'react'
import TextArea from '../../formElements/textarea'
import Select from '../../formElements/select'
import Phone from '../../formElements/phone'
import AlternativePrompt from './alternativePrompts'
import Departments from './departments'

export default class Fields extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            options: [{ "value": '...loading...', "label": '...loading...' }],
            issue: '',
            description: '',
            location: '',
            phone: '',
            department: '',
        }
    }

    componentDidMount() {
        window.scrollTo(0, 0)
        console.log(this.props)
    }

    handleChildChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleChildSelect(event) {
        this.setState({ [event.name]: event.value });
    }

    handlePhone(number) {
        this.setState ({
            phone: number
        })
    }

    public render() {
        return (
            <div>
                Form fields!
            </div>
        );
    }
}