

export default function postRequest(request, images, user) {

    var requestSuccess
    var Oid

    // first, post request
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
    fetch('https://cartegraphapi.azurewebsites.us/maintenanceRequests/newRequest', {
        method: 'POST',
        body: body,
        headers: new Headers({
            'Authorization': 'Bearer ' + process.env.REACT_APP_CART_API,
            'Content-Type': 'application/json'
        })
    })
        .then(response => response.json())
        .then(data => {
            console.log(data.Oid)
            if (data.Oid != '') {
                requestSuccess = true
                Oid = data.Oid
            } else {
                requestSuccess = false
            }
        })

    // then, post all of the images
    if (requestSuccess == true) {
        images.forEach(image => {
            fetch('http://localhost:3000/maintenanceRequests/addImage?oid=' + Oid + '&filename=' + image.name, {
                method: 'POST',
                body: image,
                headers: new Headers({
                    'Authorization': 'Bearer ' + process.env.REACT_APP_CART_API,
                    'Content-Type': 'application/json'
                })
            })
        })
    }

    return requestSuccess
}