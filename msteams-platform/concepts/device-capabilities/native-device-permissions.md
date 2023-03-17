---
title: Request device permissions for your Microsoft Teams app
author: surbhigupta
description: How to update your app manifest in order to request access to native features that require user consent, such as scan QR, barcode, image, audio, and video capabilities
ms.localizationpriority: medium
ms.topic: how-to
ms.author: surbhigupta
---

# Request device permissions for your Teams app

You can enrich your Teams app with native device capabilities, such as camera, microphone, and location. This document guides you on how to request user consent and access the native device permissions.

> [!NOTE]
>
> * To integrate media capabilities within your Teams web client, desktop, and mobile see [Integrate media capabilities](media-capabilities.md).
> * To integrate QR or barcode scanner capability within your Microsoft Teams mobile app, see [Integrate QR or barcode scanner capability in Teams](qr-barcode-scanner-capability.md).
> * To integrate location capabilities within your Teams web client, desktop, and mobile, see [Integrate location capabilities](location-capability.md).

## Native device permissions

You must request the device permissions to access native device capabilities. The device permissions work similarly for all app constructs, such as tabs, task modules, or message extensions. The user must go to the permissions page in Teams settings to manage device permissions.
By accessing the device capabilities, you can build richer experiences on the Teams platform, such as:

* Capture and view images
* Scan QR or barcode
* Record and share short videos
* Record audio memos and save them for later use
* Use the location information of the user to display relevant information

> [!NOTE]
>
> * Device permissions are different in the browser. For more information, see [browser device permissions](browser-device-permissions.md).
> * Teams supports for QR barcode scanner capability, that is only available for mobile clients.

## Access device permissions

The [Microsoft Teams JavaScript client library](/javascript/api/overview/msteams-client?view=msteams-client-js-latest&preserve-view=true) provides the tools necessary for your Teams app to access the user’s [device permissions](#manage-permissions) and build a richer experience.

While access to these features is standard in modern web browsers, you must inform Teams about the features you use by updating your app manifest. This update allows you to ask for permissions while your app runs on the Teams desktop.

## Manage permissions

A user can manage device permissions in Teams settings by selecting **Allow** or **Deny** permissions to specific apps.

# [Mobile](#tab/mobile)

1. Open Teams.
1. Go to **Settings** > **App Permissions**.
1. Select the app for which you need to choose the settings.
1. Select your desired settings.

    :::image type="content" source="~/assets/images/tabs/MobilePermissions.png" alt-text="Mobile Permissions." border="true":::

# [Desktop](#tab/desktop)

1. Open your Teams app.
1. Select your profile icon in the upper right corner of the window.
1. Select **Settings** > **Permissions** from the drop-down menu.
1. Select your desired settings.

   :::image type="content" source="~/assets/images/tabs/device-permissions.png" alt-text="Device permission.":::

---

## Specify permissions

Update your app's `manifest.json` by adding `devicePermissions` and specifying which of the following five properties that you use in your application:

``` json
"devicePermissions": [
    "media",
    "geolocation",
    "notifications",
    "midi",
    "openExternal"
],
```

Each property allows you to prompt the users to ask for their consent:

| Property      | Description   |
| --- | --- |
| media         | Permission to use the camera, microphone, speakers, and access media gallery. |
| geolocation   | Permission to return the user's location.      |
| notifications | Permission to send the user notifications.      |
| midi          | Permission to send and receive  Musical Instrument Digital Interface (MIDI) information from a digital musical instrument.   |
| openExternal  | Permission to open links in external applications.  |

## Check permissions from your app

After adding `devicePermissions` to your app manifest, check permissions using the **HTML5 permissions API** without causing a prompt:

``` JavaScript
// Different query options:
navigator.permissions.query({ name: 'camera' });
navigator.permissions.query({ name: 'microphone' });
navigator.permissions.query({ name: 'geolocation' });
navigator.permissions.query({ name: 'notifications' });
navigator.permissions.query({ name: 'midi', sysex: true });

// Example:
navigator.permissions.query({name:'geolocation'}).then(function(result) {
  if (result.state == 'granted') {
    // Access granted
  } else if (result.state == 'prompt') {
    // Access has not been granted
  }
});
```

## Use Teams APIs to get device permissions

Leverage appropriate HTML5 or Teams API to display a prompt for getting consent to access device permissions.

> [!IMPORTANT]
>
> * Support for `camera`, `gallery`, and `microphone` is enabled through [**selectMedia API**](/javascript/api/@microsoft/teams-js/microsoftteams.media.media?view=msteams-client-js-latest&preserve-view=true). Use [**captureImage API**](/javascript/api/@microsoft/teams-js/microsoftteams?view=msteams-client-js-latest#captureimage--error--sdkerror--files--file-------void-&preserve-view=true) for a single image capture.
> * Support for `location` is enabled through [**getLocation API**](/javascript/api/@microsoft/teams-js/microsoftteams.location?.view=msteams-client-js-latest#getLocation_LocationProps___error__SdkError__location__Location_____void_&preserve-view=true). You must use this `getLocation API` for location, as HTML5 geolocation API is currently not fully supported on Teams desktop.

For example:

* To prompt the user to access their location, you must call `getCurrentPosition()`:

    ```JavaScript
    navigator.geolocation.getCurrentPosition(function (position) { /*... */ });
    ```

* To prompt the user to access their camera on desktop or web, you must call `getUserMedia()`:

    ```JavaScript
    navigator.mediaDevices.getUserMedia({ audio: true, video: true });
    ```

* To capture the images on mobile, Teams mobile asks for permission when you call `captureImage()`:

    ```JavaScript
            function captureImage() {
            microsoftTeams.media.captureImage((error, files) => {
                // If there's any error, an alert shows the error message/code
                if (error) {
                    if (error.message) {
                        alert(" ErrorCode: " + error.errorCode + error.message);
                    } else {
                        alert(" ErrorCode: " + error.errorCode);
                    }
                } else if (files) {
                    image = files[0].content;
                    // Adding this image string in src attr of image tag will display the image on web page.
                    let imageString = "data:" + item.mimeType + ";base64," + image;
                }
            });
        } 
    ```

* Notifications prompt the user when you call `requestPermission()`:

    ```JavaScript
    Notification.requestPermission(function(result) { /* ... */ });
    ```

* To use the camera or access photo gallery, Teams app asks permission when you call `selectMedia()`:

    ```JavaScript
     function selectMedia() {
     microsoftTeams.media.selectMedia(mediaInput, (error, attachments) => {
         // If there's any error, an alert shows the error message/code
         if (error) {
             if (error.message) {
                 alert(" ErrorCode: " + error.errorCode + error.message);
             } else {
                 alert(" ErrorCode: " + error.errorCode);
             }
         } else if (attachments) {
             // creating image array which contains image string for all attached images. 
             const imageArray = attachments.map((item, index) => {
                 return ("data:" + item.mimeType + ";base64," + item.preview)
             })
         }
     });
    } 
  ```

* To use the microphone, Teams mobile asks permission when you call `selectMedia()`:

    ```JavaScript
     function selectMedia() {
     microsoftTeams.media.selectMedia({ maxMediaCount: 1, mediaType: microsoftTeams.media.MediaType.Audio }, (error: microsoftTeams.SdkError, attachments: microsoftTeams.media.Media[]) => {
         // If there's any error, an alert shows the error message/code
         if (error) {
             if (error.message) {
                 alert(" ErrorCode: " + error.errorCode + error.message);
             } else {
                 alert(" ErrorCode: " + error.errorCode);
             }
         }

         if (attachments) {
             // taking the first attachment  
             let audioResult = attachments[0];

             // setting audio string which can be used in Video tag
             let audioData = "data:" + audioResult.mimeType + ";base64," + audioResult.preview
         }
     });
     }
    ```

* To prompt the user to share location on the map interface, Teams app asks permission when you call `getLocation()`:

# [TeamsJS v2](#tab/teamsjs-v2)

```JavaScript
     function getLocation() {
        location.getLocation({ allowChooseLocation: true, showMap: true }).then((location) => { 
            let currentLocation = JSON.stringify(location);
     }).catch((error) => { /*Error getting location*/ })} 
```

# [TeamsJS v1](#tab/teamsjs-v1)

```JavaScript
     function getLocation() {
     microsoftTeams.location.getLocation({ allowChooseLocation: true, showMap: true }, (error: microsoftTeams.SdkError, location: microsoftTeams.location.Location) => {
         let currentLocation = JSON.stringify(location);
     });
     } 
```

***

Here's how the device permissions prompts appear to users on mobile and desktop.

# [Mobile](#tab/mobile1)

   :::image type="content" source="~/assets/images/tabs/MobileLocationPermission.png" alt-text="Mobile location permission." border="true":::

# [Desktop](#tab/desktop1)

   <!-- ![Tabs desktop device permissions prompt](~/assets/images/tabs/device-permissions-prompt.png) -->

   :::image type="content" source="~/assets/images/tabs/device-permissions-prompt.png" alt-text="Device permission in desktop.":::

---

## Permission behavior across sign in sessions

Device permissions are stored for every sign in session. It means that if you sign in to another instance of Teams, for example, on another computer, your device permissions from your previous sessions aren't available. Therefore, you must reconsent to device permissions for the new session. It also means, if you sign out of Teams or switch tenants in Teams, your device permissions are deleted from the previous sign in session.  

> [!NOTE]
> When you consent to the native device permissions, it is valid only for your _current_ login session.

## Code sample

| **Sample Name** | **Description** | **Node.js** |
|---------------|--------------|--------|
|Device permissions | Use Microsoft Teams tab sample app to demonstrate device permissions |  [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/tab-device-permissions/nodejs) |

## Next step

> [!div class="nextstepaction"]
> [Device permissions for the browser](browser-device-permissions.md)

## See also

* [Device capabilities](device-capabilities-overview.md)
* [Integrate media capabilities](media-capabilities.md)
* [Integrate QR or barcode scanner capability in Teams](qr-barcode-scanner-capability.md)
* [Integrate location capabilities in Teams](location-capability.md)
* [App manifest schema for Teams](../../resources/schema/manifest-schema.md)
* [Meeting apps APIs](../../apps-in-teams-meetings/meeting-apps-apis.md)
