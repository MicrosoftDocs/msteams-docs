---
title: Integrate location capability
description: How to use Teams JavaScript client SDK to leverage location capability
keywords:  location map capabilities native device permissions 
ms.author: lajanuar
---

# Integrate location capability 

This document guides you on how to integrate the **location** capability of native device with your Teams app.  

You can use [Microsoft Teams JavaScript client SDK](/javascript/api/overview/msteams-client?view=msteams-client-js-latest&preserve-view=true), which provides the tools necessary for your app to access the user’s [native device capabilities](native-device-permissions.md). Use the location APIs, such as [getLocation](/javascript/api/@microsoft/teams-js/location?view=msteams-client-js-latest#getLocation_LocationProps___error__SdkError__location__Location_____void_) and [showLocation](/javascript/api/@microsoft/teams-js/location?view=msteams-client-js-latest#showLocation_Location___error__SdkError__status__boolean_____void_) to integrate the capability within your app. 

## Advantages of integrating location capability

* The integration allows web app developers on Teams platform to leverage location functionality with Microsoft Teams JavaScript client SDK. 

Following examples show how the integration of **location** capability is used in different scenarios:
 * In a factory, the supervisor can track the attendance of workers by asking them to take a selfie in the vicinity of the factory and share it through the specified app. The location data also gets captured and sent along with the image.
* The **location** capability enables the maintenance staff of a service provider to share authentic health data of cellular towers with the management. The management can compare any mismatch between captured location information and the data submitted by maintenance staff.

To integrate location capability, you must update the app manifest file and call the APIs. For effective integration, you must have a good understanding of [code snippets](#code-snippets) for calling the location APIs. 
It is important to familiarize yourself with the [API response errors](#error-handling) to handle the errors in your Teams app.

> [!NOTE] 
> Currently, Microsoft Teams support for location capability is only available for mobile clients.

## Update manifest

Update your Teams app [manifest.json](../../resources/schema/manifest-schema.md#devicepermissions) file by adding the `devicePermissions` property and specifying `geolocation`. It allows your app to ask for requisite permissions from users before they start using the location capability.

``` json
"devicePermissions": [
    "geolocation",
],
```

> [!NOTE]
> The **Request Permissions** prompt is automatically displayed when a relevant Teams API is initiated. For more information, see [request device permissions](native-device-permissions.md).

## Location capability APIs

You must use the following set of APIs to enable your device's location capability:

| API      | Description   |
| --- | --- |
|[getLocation](/javascript/api/@microsoft/teams-js/location?view=msteams-client-js-latest#getLocation_LocationProps___error__SdkError__location__Location_____void_) | Gives user’s current device location or opens native location picker and returns the location chosen by the user. |
|[showLocation](/javascript/api/@microsoft/teams-js/location?view=msteams-client-js-latest#showLocation) | Shows location on map |

> [!NOTE]
> In getLocation() API comes along with following [input configurations](https://docs.microsoft.com/en-us/javascript/api/@microsoft/teams-js/locationprops?view=msteams-client-js-latest), `allowChooseLocation` and `showMap`. <br/> If the value of `allowChooseLocation` is *true*, then the users can choose any location of their choice.<br/>  If the value is *false*, then the users cannot change their current location.<br/> If the value of `showMap` is *false*, the current location is fetched without displaying the map. `showMap` is ignored if `allowChooseLocation` is set to *true*. 

**Web app experience for location capability**
![web app experience for location capability](../../assets/images/tabs/location-capability.png)

## Error handling

You must ensure to handle these errors appropriately in your Teams app. The following table lists the error codes and the conditions under which the errors are generated: 

|Error code |  Error name     | Condition|
| --------- | --------------- | -------- |
| **100** | NOT_SUPPORTED_ON_PLATFORM | API is not supported on the current platform.|
| **500** | INTERNAL_ERROR | Internal error is encountered while performing the required operation.|
| **1000** | PERMISSION_DENIED |User denied location permissions to the Teams App or the web-app .|
| **4000** | INVALID_ARGUMENTS | API is invoked with wrong or insufficient mandatory arguments.|
| **8000** | USER_ABORT |User cancelled the operation.|
| **9000** | OLD_PLATFORM | User is on old platform build where implementation of the API is not present. Upgrading the build should resolve the issue.|

## Code snippets

**Calling `getLocation` API to retrieve the location:**

```javascript
let locationProps = {"allowChooseLocation":true,"showMap":true};
microsoftTeams.location.getLocation(locationProps, (err: microsoftTeams.SdkError, location: microsoftTeams.location.Location) => {
          if (err) {
            output(err);
            return;
          }
          output(JSON.stringify(location));
});
```

**Calling `showLocation` API to display the location:**

```javascript
let location = {"latitude":17,"longitude":17};
microsoftTeams.location.showLocation(location, (err: microsoftTeams.SdkError, result: boolean) => {
          if (err) {
            output(err);
            return;
          }
     output(result);
});
```

## See also

> [!div class="nextstepaction"]
> [Integrate media capabilities in Teams](mobile-camera-image-permissions.md)

> [!div class="nextstepaction"]
> [Integrate QR or barcode scanner capability in Teams](qr-barcode-scanner-capability.md)