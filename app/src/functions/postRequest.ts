
export default async function postRequest(request, image, user) {

    let postSuccess
    let Oid
    let sendgridLoad

    // format data for cartegraph
    let data = JSON.stringify({
        ActivityField: "Investigate", 
        // if carpentry & painting, activity == Carpentry
        // if roofing, activity == Carpentry
        // if Doors, Lock, and Windows, activity == Carpentry
        // if plumbing and gas, activity == Plumbing
        // if electrical and lighting, activity == Electrical
        // if heating and air conditioning, activity == HVAC
        // else, activity == Investigate
        DepartmentField: "Facilities",
        cgAssetTypeField: "Facility",
        cgAssetAndIdField: "Facility " + request.building,
        StatusField: "Planned",
        cgAssetIDField: request.building,
        RequestIssueField: request.issue,
        TaskDescriptionField: request.description,
        RequestDepartmentField: request.department,
        RequestLocationField: request.location,
        RequestorPhoneNumberField: request.phone,
        RequesterEmailField: user
    })
    let cleanedData = data.replace(/'/g, '')
    const body = '{ "cgTasksClass" : [ ' + cleanedData + ' ] }'

    // await post response
    const dataResponse = await fetch('https://cartegraphapi.azurewebsites.us/maintenanceRequests/newRequest', {
        method: 'POST',
        body: body,
        headers: new Headers({
            'Authorization': 'Bearer ' + process.env.REACT_APP_CART_API,
            'Content-Type': 'application/json'
        })
    })

    try {
        const dataJson = await dataResponse.json()
        Oid = dataJson.Oid
        postSuccess = true
    } catch {
        postSuccess = false
    }

    // if post succeeded...
    if (postSuccess == true) {

        // prepare confirmation email
        let emailBody
        await fetch('emailTemplate.html')
            .then(response => response.text())
            .then(text => emailBody = String.format(text,
                request.building,
                request.issue,
                request.description,
                request.location,
                request.phone))

        // if an image is included...
        if (image.length > 0) {

            // post the image...
            const cleanedName = image[0].name.replace(/[,"+/()'\s]/g, '')
            await fetch('https://cartegraphapi.azurewebsites.us/maintenanceRequests/addImage?oid=' + Oid + '&filename=' + cleanedName, {
                method: 'POST',
                body: image[0],
                headers: new Headers({
                    'Authorization': 'Bearer ' + process.env.REACT_APP_CART_API
                })
            })

            // for sendgrid, transform image, base64
            let reader = await new FileReader()
            await reader.readAsDataURL(image[0])
            reader.onload = () => {
                // once complete, build sendgrid load with attachment
                const fullString = reader.result as string
                sendgridLoad = JSON.stringify({
                    to: user,
                    from: {
                        email: user,
                        name: 'Department of Public Works'
                    },
                    subject: 'Your maintenance request has been received',
                    html: emailBody,
                    attachments: [
                        {
                            content: fullString.split(',')[1],
                            filename: image[0].name,
                            type: 'image/png',
                            disposition: 'attachment'
                        }
                    ]
                })

                // and post
                fetch('https://sendgridproxy.azurewebsites.us/sendMail/single', {
                    method: 'POST',
                    body: sendgridLoad,
                    headers: new Headers({
                        'Authorization': 'Bearer ' + process.env.REACT_APP_SENDGRID_API,
                        'Content-type': 'application/json'
                    })
                })
            }
        } else {

            // build sendgrid load, no attachment
            sendgridLoad = JSON.stringify({
                to: user,
                from: {
                    email: user,
                    name: 'Department of Public Works'
                },
                subject: 'Your maintenance request has been received',
                html: emailBody
            })

            // and post
            fetch('https://sendgridproxy.azurewebsites.us/sendMail/single', {
                method: 'POST',
                body: sendgridLoad,
                headers: new Headers({
                    'Authorization': 'Bearer ' + process.env.REACT_APP_SENDGRID_API,
                    'Content-type': 'application/json'
                })
            })
        }
    }

    return postSuccess
}

// string formatting 
declare module String {
    export var format: any;
}

String.format = function () {
    var s = arguments[0]
    for (var i = 0; i < arguments.length - 1; i++) {
        var reg = new RegExp("\\{" + i + "\\}", "gm")
        s = s.replace(reg, arguments[i + 1])
    }
    return s
}