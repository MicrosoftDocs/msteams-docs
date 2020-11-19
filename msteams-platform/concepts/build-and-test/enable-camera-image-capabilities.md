---
title: Enable native camera and image capabilities in Teams
description: How to use Teams Javascript client SDK to enable camera and image capabilities
keywords: camera image capabilities
ms.topic: conceptual
ms.author: lajanuar
---

# Enable native camera and image capabilities in Teams

You can use the  [Microsoft Teams JavaScript client SDK](/javascript/api/overview/msteams-client?view=msteams-client-js-latest&preserve-view=true), to easily integrate camera and image capabilities within your Microsoft Teams app. The SDK provides the tools necessary for your app to access a user’s [device permissions](../../tabs/how-to/native-device-permissions.md?tabs=desktop#device-permissions) and build a richer experience.

The [selectMedia](/javascript/api/@microsoft/teams-js/media?view=msteams-client-js-latest#selectMedia_MediaInputs___error__SdkError__attachments__Media_______void_), [getMedia](/javascript/api/@microsoft/teams-js/_media?view=msteams-client-js-latest#getMedia__error__SdkError__blob__Blob_____void_), and [viewImages](/javascript/api/@microsoft/teams-js/media?view=msteams-client-js-latest#viewImages_ImageUri_____error___SdkError_____void_) APIs enable you to use native camera/image capabilities as follows:

* Use native **camera control** to allow users to **capture and attach images** on the go.
* Use native **gallery support** to allow users to **select device images** as attachments.
* Use native **image viewer control** to **preview multiple images** at one time.
* Support **large image transfer** (up to 50 MB) via the SDK bridge
* Support **advanced image capabilities** allowing users to preview and edit images:
  * Scan document, whiteboard, business cards, etc., through the camera.
  * Crop and rotate the images.
  * Add text, ink, or freehand annotation to the image.

## Get started

Update your Teams app [manifest.json](../../resources/schema/manifest-schema.md#devicepermissions) file by adding the `devicePermissions`  property and specifying `media`. This allows your app to ask for requisite permissions from end-users before they use the camera to capture the image or open the gallery to select an image to submit as an attachment.

``` json
"devicePermissions": [
    "media",
],
```



> [!NOTE]
> The permission prompt is automatically displayed when a relevant Teams API is initiated. For more details, *see* [permission behavior across login sessions](../../tabs/how-to/native-device-permissions.md#permission-behavior-across-login-sessions).

## Using camera and image capability APIs

You can use the following set of APIs to enable camera and image device capabilities:

| API      | Description   |
| --- | --- |
| [**selectMedia**](/javascript/api/@microsoft/teams-js/media?view=msteams-client-js-latest&branch=master#selectMedia_MediaInputs___error__SdkError__attachments__Media_______void_)| This API allows users to **capture or select media from a native device** and return to the web-app. Users may choose to edit, crop, rotate, annotate, or draw over images before submission. In response to **selectMedia**, the web-app will receive media ids of selected images and may receive a thumbnail of the selected media. |
| [**getMedia**](/javascript/api/@microsoft/teams-js/_media?view=msteams-client-js-latest&branch=master#getMedia__error__SdkError__blob__Blob_____void_)| This API retrieves the media in chunks irrespective of size. These chunks are assembled and sent back to the web app as a file/blob. With this API an image is broken into smaller chunks to facilitate large image transfer. |
| [**viewImages**](/javascript/api/@microsoft/teams-js/media?view=msteams-client-js-latest#viewImages_ImageUri_____error___SdkError_____void_)| This API enables the user to view images full-screen mode as a scrollable list.|

## Error handling

You should understand the API response error codes and handle them appropriately. Below is a list of error codes that may be returned by the platform:

|Error code |  Error Name     | Condition|
| --- | --- | --- |
| **100** | NOT_SUPPORTED_ON_PLATFORM | API not supported in the current platform.|
| **404** | FILE_NOT_FOUND | The file specified was not found on the given location.|
| **500** | INTERNAL_ERROR | Internal error encountered while performing the required operation.|
| **1000** | PERMISSION_DENIED |Permissions denied by the user.|
| **2000** |NETWORK_ERROR | Network issue.|
| **3000** | NO_HW_SUPPORT | Underlying hardware doesn't support the capability.|
| **4000**| INVALID_ARGUMENTS | One or more arguments is invalid.|
| **5000** | UNAUTHORIZED_USER_OPERATION | User is not authorized to complete this operation.|
| **6000** |INSUFFICIENT_RESOURCES | The operation couldn't be completed due to insufficient resources.|
|**7000** | THROTTLE | The platform throttled the request because the API was invoked too frequently.|
|  **8000** | USER_ABORT |User aborted the operation.|
| **9000**| OLD_PLATFORM | The platform code is outdated and doesn't implement this API.|
| **10000**| SIZE_EXCEEDED |  The return value is too big and has exceeded the platform size boundaries.|

## Sample code snippets

**Calling `selectMedia` API from a web app**

```javascript
let imageProp: ImageProps = {
    sources: [SelectImageSource.Camera, SelectImageSource.Gallery],
    startMode: SelectImageMode.Photo,
    ink: false,
    cameraSwitcher: false,
    textSticker: false,
    enableFilter: true,
};
let mediaInput: MediaInputs = {
    mediaType: MediaType.Image,
    maxMediaCount: 10,
    imageProps: imageProp
};
microsoftTeams.selectMedia(mediaInput, (error: microsoftTeams.SdkError, attachments: microsoftTeams.Media[]) => {
          if (error) {
            if (error.message) {
              alert(" ErrorCode: " + error.errorCode + error.message);
            } else {
              alert(" ErrorCode: " + error.errorCode);
            }
        }
    if (attachments) {
let y = attachments[0];
          img.src = ("data:" + y.mimeType + ";base64," + y.preview);
    }
});
```

**Calling `getMedia` API from a web app**

```javascript
let media: microsoftTeams.Media = attachments[0]     
media.getMedia((error: microsoftTeams.SdkError, blob: Blob) => {
        if (blob) {
          if (blob.type.includes("image")) {
          img.src = (URL.createObjectURL(blob));
          }
      }
      if (error) {
          if (error.message) {
            alert(" ErrorCode: " + error.errorCode + error.message);
          } else {
            alert(" ErrorCode: " + error.errorCode);
          }
      }
      });
```

> [!div class="nextstepaction"]
> [Learn more:  Request device permissions for your Microsoft Teams tab](../../tabs/how-to/native-device-permissions.md?tabs=desktop#device-permissions)
