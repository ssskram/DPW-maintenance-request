
export default async function postRequest(request, image, user) {

    var postSuccess
    var Oid

    // format data
    let data = JSON.stringify({
        ActivityField: "Investigate",
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

        // post the image...
        if (image.length > 0) {
            const cleanedName = image[0].name.replace(/[,"+/()'\s]/g, '')
            await fetch('https://cartegraphapi.azurewebsites.us/maintenanceRequests/addImage?oid=' + Oid + '&filename=' + cleanedName, {
                method: 'POST',
                body: image[0],
                headers: new Headers({
                    'Authorization': 'Bearer ' + process.env.REACT_APP_CART_API
                })
            })
        }

        // and send confirmation email
        // get the email template, and format with data
        let emailBody
        await fetch('emailTemplate.html')
            .then(response => response.text())
            .then(text => emailBody = String.format(text,
                request.building,
                request.issue,
                request.description,
                request.location,
                request.phone))

        const email = JSON.stringify({
            to: user,
            from: {
                email: user,
                name: 'Department of Public Works'
            },
            subject: 'Your maintenance request has been received',
            html: emailBody,
        })

        // send it
        fetch('https://sendgridproxy.azurewebsites.us/sendMail/single', {
            method: 'POST',
            body: email,
            headers: new Headers({
                'Authorization': 'Bearer ' + process.env.REACT_APP_SENDGRID_API,
                'Content-Type': 'application/json'
            })
        })
    }
    return postSuccess
}

// string formatting 
declare module String {
    export var format: any;
}

String.format = function () {
    var s = arguments[0];
    for (var i = 0; i < arguments.length - 1; i++) {
        var reg = new RegExp("\\{" + i + "\\}", "gm");
        s = s.replace(reg, arguments[i + 1]);
    }
    return s;
}