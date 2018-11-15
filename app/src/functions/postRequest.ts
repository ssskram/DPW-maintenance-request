

export default function postRequest(request, images, user) {

    console.log(request, images)

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
        LocationDescriptionField: request.location,
        RequestorPhoneNumberField: request.phone,
        RequesterEmailField: user
    })
    let cleanedData = data.replace(/'/g, '')
    const body = '{ "cgTasksClass" : [ ' + cleanedData + ' ] }'
    console.log(body)
    fetch('http://localhost:3000/maintenanceRequests/newRequest', {
        method: 'POST',
        body: body,
        headers: new Headers({
            'Authorization': 'Bearer ' + process.env.REACT_APP_CART_API,
            'Content-Type': 'application/json'
        })
    })
        .then(function (response) {
            console.log(response)
        })
}