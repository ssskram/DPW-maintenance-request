

export default async function postRequest(request, image, user) {

    let data = {
        Oid: 784077363
    }
    var requestSuccess = true
    var Oid

    if (data.Oid) {
        requestSuccess = true
        Oid = data.Oid
    } else {
        requestSuccess = false
    }

    console.log(requestSuccess)
    console.log(Oid)

    // // first, post request
    // let data = JSON.stringify({
    //     ActivityField: "Investigate",
    //     DepartmentField: "Facilities",
    //     cgAssetTypeField: "Facility",
    //     cgAssetAndIdField: "Facility " + request.building,
    //     StatusField: "Planned",
    //     cgAssetIDField: request.building,
    //     RequestIssueField: request.issue,
    //     TaskDescriptionField: request.description,
    //     RequestDepartmentField: request.department,
    //     LocationDescriptionField: request.location,
    //     RequestorPhoneNumberField: request.phone,
    //     RequesterEmailField: user
    // })
    // let cleanedData = data.replace(/'/g, '')
    // const body = '{ "cgTasksClass" : [ ' + cleanedData + ' ] }'
    // fetch('https://cartegraphapi.azurewebsites.us/maintenanceRequests/newRequest', {
    //     method: 'POST',
    //     body: body,
    //     headers: new Headers({
    //         'Authorization': 'Bearer ' + process.env.REACT_APP_CART_API,
    //         'Content-Type': 'application/json'
    //     })
    // })
    //     .then(response => response.json())
    //     .then(data => {
    //         // TODO
    //         // can't get data.Oid to return ture
    //         // therefore, post returns as an error
    //         // and can't proceed to image post
    //         console.log(typeof Oid == 'number')
    //         if (data.Oid) {
    //             requestSuccess = true
    //             Oid = data.Oid
    //         } else {
    //             requestSuccess = false
    //         }
    //     })

    // then, post all of the images
    if (requestSuccess == true) {
        if (image.length > 0) {
            const cleanedName = image[0].name.replace(/[,"+/()'\s]/g, '')
            const response = await fetch('http://localhost:3000/maintenanceRequests/addImage?oid=' + Oid + '&filename=' + cleanedName, {
                method: 'POST',
                body: image,
                headers: new Headers({
                    'Authorization': 'Bearer ' + process.env.REACT_APP_CART_API
                })
            })
            const json = await response.json()
            console.log(json)
        }
    }

    return requestSuccess
}