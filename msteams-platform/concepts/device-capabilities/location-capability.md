---
title: Integrate location capabilities
author: surbhigupta
description: Learn how to use Teams JavaScript client SDK to leverage location capabilities using Code snippets and samples
keywords:  location map capabilities native device permissions 
ms.topic: conceptual
ms.localizationpriority: high
ms.author: surbhigupta
---

# Overview

 You can integrate the location capabilities within your Teams app using [Microsoft Teams JavaScript client SDK](/javascript/api/overview/msteams-client?view=msteams-client-js-latest&preserve-view=true), which provides well-defined APIs and the necessary tools for your app to access the user’s [native device capabilities](native-device-permissions.md). Use the location APIs, such as `getLocation` and `showLocation` to integrate location capabilities within your app. The location capability is available for the Teams web client, desktop, and mobile.

## Advantages

The advantage of integrating location capabilities in your Teams apps is to leverage location functionality in Teams web client, desktop, and mobile using [Microsoft Teams JavaScript client SDK](/javascript/api/overview/msteams-client?view=msteams-client-js-latest&preserve-view=true). The following scenarios showcase the advantages of location capabilities:

* Share authentic health data of cellular towers with the management. The management can compare any mismatch between captured location information and the data submitted by maintenance staff.
* Locate technical support staff in a specified area.  The app asks support staff to share their current location, which management can use to allocate IT ticket to the nearest support person after checking their profile.
* Report the location after completing a job in the field. The job processing app asks for permission to find the location. After the user grants permission, the app detects the exact location. The user may also select a location by dragging a pin to the job completion location over the map.
* Capture attendance through selfies inside the retail store. The store manager can track the attendance of the workers by asking them to share a selfie through an attendance app. The location data gets captured and is sent along with the image. This scenario is applicable mainly to the frontline workers.

# [Mobile](#tab/mobile)

The following image depicts web app experience of getLocation API:

  <!-- ![Mobile app experience for location capabilities](../../assets/images/tabs/location-picker-mobile.png) -->
  
  :::image type="content" source="~/assets/images/tabs/location-picker-mobile.png" alt-text="Illustration shows the location picker." border="true":::

# [Desktop](#tab/desktop)

The following image depicts web app experience of getLocation API:

  :::image type="content" source="~/assets/images/tabs/location-picker-desktop.png" alt-text="Location picker in desktop." border="true":::

---

To integrate location capabilities, you must:

* [Update the app manifest file](#update-manifest) and call the APIs.
* Have working knowledge of [code snippets](#code-snippets) for calling the [location APIs](#location-apis).
* Handle errors in your Teams app with the help of [API response errors](#error-handling).

## Update manifest

Update your Teams app [manifest.json](../../resources/schema/manifest-schema.md#devicepermissions) file by adding the `devicePermissions` property and specifying `geolocation`. It allows your app to ask for required permissions from users before they start using the location capabilities. The update for app manifest is as follows:

``` json
"devicePermissions": [
    "geolocation",
],
```

> [!NOTE]
>
> * The request permissions prompt is automatically displayed when relevant Teams API is initiated. For more information, see [request device permissions](native-device-permissions.md).</br>
> * The device permissions are different in the browser. For more information, see [browser device permissions](browser-device-permissions.md).

## Location APIs

The following table lists the set of APIs to enable your device's location capabilities:

| API      | Description |Input configuration |
| --- | --- |--- |
|`getLocation`|Provides user’s current device location or opens native location picker and returns the location chosen by the user. | The `getLocation` API takes the following two input parameters as a part of the [LocationProps](/javascript/api/@microsoft/teams-js/microsoftteams.location?view=msteams-client-js-latest#getLocation_LocationProps___error__SdkError__location__Location_____void_&preserve-view=true) interface: `allowChooseLocation`, `showMap`:<br> The experience is derived from the combination of these two input parameters:<br>- (true, true): A map is launched and the user gets to pick any location on it.<br>- (true, false): A map is launched and the user gets to pick any location on it.<br>- (false, true): A map is launched. The user can only submit the current location.<br>- (false,false): Map is not launched. User's current location is fetched.
|`showLocation`| Shows location on map. |It takes a single input parameter location, which contains the coordinates of the location to be shown on the map.|

> [!NOTE]
>
> `showMap` conditions for True and False:<br> - True: Show location on map <br> - False: Do not show location on map <br>-(false,false): This configuration is only supported on mobile <br> -If `allowChooseLocation` is set to true, then `showMap` is ignored.<br> -`showMap`= false is not supported on Teams web or desktop.

For more information on `getLocation` and `showLocation`, see [LocationProps](/javascript/api/@microsoft/teams-js/microsoftteams.location?view=msteams-client-js-latest#getLocation_LocationProps___error__SdkError__location__Location_____void_&preserve-view=true).

> [!IMPORTANT]
> When your application or services access a Microsoft API that provides a location using the Bing Maps, you understand and agree that any content provided through Bing Maps, including geocodes, can only be used within the Microsoft API through which the content is provided. Your use of Bing Maps is governed by the Bing Maps End User Terms of Use available at go.microsoft.com/?linkid=9710837 and the Microsoft Privacy Statement available at go.microsoft.com/fwlink/?LinkID=248686.</br>
> Further, you must provide a hypertext link to Bing Maps TOU, which is located here, either at the bottom of each page in your Application where the services can be accessed or viewed or within the terms of use of your application. You are responsible for notifying end users of changes to the Bing Maps TOU, and you will comply with Microsoft's reasonable instructions in doing so. You will not encourage or require any end user to breach the terms of the Bing Maps TOU. In the event, an end user breaches the Bing Maps TOU, Microsoft may immediately terminate this agreement.

## Error handling

Ensure to handle errors appropriately in your Teams app. The following table lists the error codes and the conditions under which the errors are generated:

|Error code |  Error name     | Condition|
| --------- | --------------- | -------- |
| **100** | NOT_SUPPORTED_ON_PLATFORM | API is not supported on the current platform.|
| **500** | INTERNAL_ERROR | Internal error is encountered while performing the required operation.|
| **1000** | PERMISSION_DENIED |User denied location permissions to the Teams App or the web app.|
| **4000** | INVALID_ARGUMENTS | API is invoked with wrong or insufficient mandatory arguments.|
| **8000** | USER_ABORT |User cancelled the operation.|
| **9000** | OLD_PLATFORM | User is on old platform build where implementation of the API is not present. Upgrading the build resolves the issue.|

### Code snippets

* Call `getLocation` API to retrieve the location:

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

* Call `showLocation` API to display the location:

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

### Code sample

|Sample name | Description | C# | Node.js |
|----------------|-----------------|--------------|--------------|
| App check-in current location | Users can check-in the current location and view all the previous location check-ins.| [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/app-checkin-location/csharp) | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/app-checkin-location/nodejs) |

## See also

* [Integrate media capabilities in Teams](mobile-camera-image-permissions.md)
* [Integrate QR code or barcode scanner capability in Teams](qr-barcode-scanner-capability.md)
* [Integrate People Picker](people-picker-capability.md)
