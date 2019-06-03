import * as types from "../../../store/types";

export default async function post(
  request: types.newRequest,
  user: types.user
): Promise<boolean> {
  // build office move load
  if (request.requestType == "Office Move") {
    const desc =
      "Office move for " +
      request.name +
      ". Additional information: " +
      request.description;
    request.building = request.originFacility.value;
    request.description = desc;
    request.location = buildLocation(request as types.newRequest);
  }
  let postSuccess;
  let Oid;
  let sendgridLoad;

  // format data for cartegraph
  let data = {
    ActivityField: activity(request),
    DepartmentField: "Facilities",
    cgAssetTypeField: "Facility",
    cgAssetAndIdField: "Facility " + request.building,
    StatusField: "Planned",
    cgAssetIDField: request.building,
    RequestIssueField: request.maintenanceIssue.value || "Office Move",
    TaskDescriptionField: request.description,
    RequestDepartmentField: request.department.value,
    RequestLocationField: request.location,
    RequestorPhoneNumberField: request.phone,
    RequesterEmailField: user.email
  };
  let cleanedData = JSON.stringify(data).replace(/'/g, "");
  const body = '{ "cgTasksClass" : [ ' + cleanedData + " ] }";
  console.log(body);

  // await post response
  const dataResponse = await fetch(
    "https://cartegraphapi.azurewebsites.us/maintenanceRequests/newRequest",
    {
      method: "POST",
      body: body,
      headers: new Headers({
        Authorization: "Bearer " + process.env.REACT_APP_CART_API,
        "Content-Type": "application/json"
      })
    }
  );

  try {
    const dataJson = await dataResponse.json();
    Oid = dataJson.Oid;
    postSuccess = true;
  } catch {
    postSuccess = false;
  }

  // if post succeeded...
  if (postSuccess == true) {
    // prepare confirmation email
    let emailBody;
    await fetch("emailTemplate.html")
      .then(response => response.text())
      .then(
        text =>
          (emailBody = String.format(
            text,
            request.building,
            request.maintenanceIssue.value || "Office Move",
            request.description,
            request.location,
            request.phone
          ))
      );

    // if an image is included...
    if (request.image.length > 0) {
      // post the image...
      const cleanedName = request.image[0].name.replace(/[,"+/()'\s]/g, "");
      await fetch(
        "https://cartegraphapi.azurewebsites.us/maintenanceRequests/addImage?oid=" +
          Oid +
          "&filename=" +
          cleanedName,
        {
          method: "POST",
          body: request.image[0],
          headers: new Headers({
            Authorization: "Bearer " + process.env.REACT_APP_CART_API
          })
        }
      );

      // for sendgrid, transform image, base64
      let reader = await new FileReader();
      await reader.readAsDataURL(request.image[0]);
      reader.onload = () => {
        // once complete, build sendgrid load with attachment
        const fullString = reader.result as string;
        sendgridLoad = JSON.stringify({
          to: user,
          from: {
            email: user.email,
            name: "Department of Public Works"
          },
          subject: "Your request has been received",
          html: emailBody,
          attachments: [
            {
              content: fullString.split(",")[1],
              filename: request.image[0].name,
              type: "image/png",
              disposition: "attachment"
            }
          ]
        });

        // and post
        fetch("https://sendgridproxy.azurewebsites.us/sendMail/single", {
          method: "POST",
          body: sendgridLoad,
          headers: new Headers({
            Authorization: "Bearer " + process.env.REACT_APP_SENDGRID_API,
            "Content-type": "application/json"
          })
        });
      };
    } else {
      // build sendgrid load, no attachment
      sendgridLoad = JSON.stringify({
        to: user,
        from: {
          email: user.email,
          name: "Department of Public Works"
        },
        subject: "Your request has been received",
        html: emailBody
      });

      // and post
      fetch("https://sendgridproxy.azurewebsites.us/sendMail/single", {
        method: "POST",
        body: sendgridLoad,
        headers: new Headers({
          Authorization: "Bearer " + process.env.REACT_APP_SENDGRID_API,
          "Content-type": "application/json"
        })
      });
    }
  }

  return postSuccess;
}

const buildLocation = request => {
  const location =
    "Office move from " +
    request.originFacility.value +
    " (" +
    request.originLocation +
    ") to " +
    request.destinationFacility.value +
    " (" +
    request.destinationLocation +
    ")";
  return location;
};

const activity = (request: types.newRequest) => {
  switch (request.maintenanceType) {
    case "Carpentry and Painting":
      return "Carpentry";
    case "Roofing":
      return "Carpentry";
    case "Doors, Locks, and Windows":
      return "Carpentry";
    case "Plumbing and Gas":
      return "Plumbing";
    case "Electrical and Lighting":
      return "Electrical";
    case "Heating and Air Conditioning":
      return "HVAC";
    default:
      return "Investigate";
  }
};

// string formatting
declare module String {
  export var format: any;
}

String.format = function() {
  var s = arguments[0];
  for (var i = 0; i < arguments.length - 1; i++) {
    var reg = new RegExp("\\{" + i + "\\}", "gm");
    s = s.replace(reg, arguments[i + 1]);
  }
  return s;
};
