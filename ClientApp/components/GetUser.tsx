import * as React from 'react';
import { RouteComponentProps } from 'react-router';
declare var $: any;

export class GetUser extends React.Component<RouteComponentProps<{}>, {}> {
    componentDidMount() {
        fetch('/api/userdata/getuser', {
            credentials: 'same-origin',
            headers: {
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8'
            },
        })
            .then(response => response.json())
            .then(data => {
                if (data != null) {
                    $('#account_demo').html(data);
                }
            });
    }
    public render() {
        return <div>
            <h1>Get logged in user</h1>
            <p>This component demonstrates fetching the logged in user from the server</p>
            <table className='table'>
            <thead>
                <tr>
                    <th>User</th>
                </tr>
            </thead>
            </table>
            <div id="account_demo"></div>
        </div>;
    }
}
