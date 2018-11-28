

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
        NotesField: request.location,
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

    // if post succeeded, post the image
    if (postSuccess == true) {
        if (image.length > 0) {
            const cleanedName = image[0].name.replace(/[,"+/()'\s]/g, '')
            await fetch('https://cartegraphapi.azurewebsites.us/maintenanceRequests/addImage?oid=' + Oid + '&filename=' + cleanedName, {
                method: 'POST',
                body: image,
                headers: new Headers({
                    'Authorization': 'Bearer ' + process.env.REACT_APP_CART_API
                })
            })
        }
    }

    return postSuccess
}