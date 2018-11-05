
// checks server for user
// if return value == false, log out of client

import logout from './logout'

function validateUser() {
    if (process.env.REACT_APP_ENV != 'dev') {
        fetch('/validateUser')
        .then(response => {
            response.json().then(data => {
                if (data===false) {
                    logout()
                }
            })
        })
    }
}

export default validateUser