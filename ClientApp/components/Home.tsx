import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import * as ReactMarkdown from 'react-markdown';

interface HomeState {
    markdown: string;
}

export default class Home extends React.Component<RouteComponentProps<{}>, HomeState> {
    constructor() {
        super();
        this.state = {
            markdown: ''
        };
    }
    
    componentDidMount() {
        fetch("README.md")
        .then(response => {
          return response.text()
        })
        .then(text => {
            this.setState({
                markdown: text
            })
        })
    }

    public render() {
        return (
            <div>
                <ReactMarkdown 
                escapeHtml={true}
                source={this.state.markdown} 
                />
            </div>
        )
    }
}