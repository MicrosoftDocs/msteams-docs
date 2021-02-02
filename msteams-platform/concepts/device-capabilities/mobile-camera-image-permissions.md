---
title: Integrate media capabilities 
description: How to use Teams Javascript client SDK to enable media capabilities
keywords: camera image microphone capabilities native device permissions media
ms.topic: conceptual
ms.author: lajanuar
---

# Integrate media capabilities 

This document gives a walkthrough on integrating  native device capabilities with Teams platform.

The process with which you combine the native device capabilities, such as **camera**, and **microphone** along with Teams platform is called integration of media capabilities. 

## Integrate media capabilities - Advantage

The main advantage of integrating device capabilities with Teams platform is to enhance and enrich Teams collaborative experience.
After accessing device permissions, integrate media capabilities by updating the app manifest file and calling the media capability APIs. 

Have a good understanding on [code snippets](#code-snippets) for calling the respective APIs which allow you to use native media capabilities.

Before you proceed further, it is important to familiarize yourself with the [API response errors](#error-handling) that are generated while calling the APIs and the methods to handle them.
> [!NOTE] 
> Currently, the Microsoft Teams support for media capabilities, is only available for mobile clients.

## Update manifest

Update your Teams app [manifest.json](../../resources/schema/manifest-schema.md#devicepermissions) file by adding the `devicePermissions` property and specifying `media`. This allows your app to ask for requisite permissions from users before they use the **camera** to capture the image, open the gallery to select an image to submit as an attachment, or use the **microphone** to record the conversation.

``` json
"devicePermissions": [
    "media",
],
```

> [!NOTE]
> The _Request Permissions_ prompt is automatically displayed when a relevant Teams API is initiated. For more information, see [Request device permissions](native-device-permissions.md).

## Media capability APIs

The [selectMedia](/javascript/api/@microsoft/teams-js/media?view=msteams-client-js-latest#selectMedia_MediaInputs___error__SdkError__attachments__Media_______void_&preserve-view=true), [getMedia](/javascript/api/@microsoft/teams-js/_media?view=msteams-client-js-latest#getMedia__error__SdkError__blob__Blob_____void_&preserve-view=true), and [viewImages](/javascript/api/@microsoft/teams-js/media?view=msteams-client-js-latest#viewImages_ImageUri_____error___SdkError_____void_&preserve-view=true) APIs enable you to use native media capabilities as follows:

* Use native **microphone** to allow users to **record audio** (record 10 minutes of conversation) from the device.
* Use native **camera control** to allow users to **capture and attach images** on the go.
* Use native **gallery support** to allow users to **select device images** as attachments.
* Use native **image viewer control** to **preview multiple images** at one time.
* Support **large image transfer** (from 1 MB to 50 MB) through the SDK bridge.
* Support **advanced image capabilities** allowing users to preview and edit images:
  * Scan document, whiteboard, and business cards  through the camera.
  * Crop and rotate the images.
  * Add text, ink, or freehand annotation to the image.

> [!IMPORTANT]
>*   The `selectMedia`, `getMedia`, and `viewImages` APIs must be invoked from multiple Teams surfaces such as task modules, tabs, and personal apps. For more details, see [Entry points for Teams apps](../extensibility-points.md).
>* `selectMedia` API has been extended to support mic and audio properties.

You must use the following set of APIs to enable your device's media capabilities:

| API      | Description   |
| --- | --- |
| [**selectMedia**](/javascript/api/@microsoft/teams-js/media?view=msteams-client-js-latest&branch=master#selectMedia_MediaInputs___error__SdkError__attachments__Media_______void_&preserve-view=true) for image capturing in camera| This API allows users to **capture or select media from a native device** and return to the web-app. The users edit, crop, rotate, annotate, or draw over images before submission. In response to **selectMedia**, the web-app receives the media IDs of selected images and a thumbnail of the selected media.|
| [**selectMedia**](/javascript/api/@microsoft/teams-js/media?view=msteams-client-js-latest&branch=master#selectMedia_MediaInputs___error__SdkError__attachments__Media_______void_&preserve-view=true) for audio recording in **Microphone**| This API also allows the users to record audio from a native device and return to the web-app. The users pause, re-record, and play recording preview before submission. In response to **selectMedia**, the web-app receives media IDs of the selected audio recording. Set the media type to four for audio. <br/> Use `maxDuration`, if you require to configure a duration in minutes for recording the conversation. The current duration for recording is 10 minutes, after which the recording terminates.  |
| [**getMedia**](/javascript/api/@microsoft/teams-js/_media?view=msteams-client-js-latest&branch=master#getMedia__error__SdkError__blob__Blob_____void_&preserve-view=true)| This API retrieves the media in chunks irrespective of  the size. These chunks are assembled and sent back to the web app as a file or blob. This API breaks an image into smaller chunks, to facilitate large image transfer. |
| [**viewImages**](/javascript/api/@microsoft/teams-js/media?view=msteams-client-js-latest#viewImages_ImageUri_____error___SdkError_____void_&preserve-view=true)| This API enables the user to view images in  full-screen mode as a scrollable list.|


**Web app experience for selectMedia API for image capability**
![device camera and image experience in Teams](../../assets/images/tabs/image-capability.png)

**Web app experience for selectMedia API for microphone capability**
![web app experience for microphone capability](../../assets/images/tabs/microphone-capability.png)

## Error handling

The following table lists the error codes and the conditions under which they are generated:

|Error code |  Error name     | Condition|
| --------- | --------------- | -------- |
| **100** | NOT_SUPPORTED_ON_PLATFORM | API is not supported on the current platform.|
| **404** | FILE_NOT_FOUND | File specified is not found in the given location.|
| **500** | INTERNAL_ERROR | Internal error is encountered while performing the required operation.|
| **1000** | PERMISSION_DENIED |Permission is denied by the user.|
| **2000** |NETWORK_ERROR | Network issue.|
| **3000** | NO_HW_SUPPORT | Underlying hardware does not support the capability.|
| **4000**| INVALID_ARGUMENTS | One or more arguments are invalid.|
| **5000** | UNAUTHORIZED_USER_OPERATION | User is not authorized to complete this operation.|
| **6000** |INSUFFICIENT_RESOURCES | Operation could not be completed due to insufficient resources.|
|**7000** | THROTTLE | Platform throttled the request as the API was invoked frequently.|
|  **8000** | USER_ABORT |User aborts the operation.|
| **9000**| OLD_PLATFORM | Platform code is outdated and does not implement this API.|
| **10000**| SIZE_EXCEEDED |  Return value is too big and has exceeded the platform size boundaries.|

## Code snippets

**Calling `selectMedia` API** for capturing images using camera

```javascript
let imageProp: microsoftTeams.media.ImageProps = {
    sources: [microsoftTeams.media.Source.Camera, microsoftTeams.media.Source.Gallery],
    startMode: microsoftTeams.media.CameraStartMode.Photo,
    ink: false,
    cameraSwitcher: false,
    textSticker: false,
    enableFilter: true,
};
let mediaInput: microsoftTeams.media.MediaInputs = {
    mediaType: microsoftTeams.media.MediaType.Image,
    maxMediaCount: 10,
    imageProps: imageProp
};
microsoftTeams.media.selectMedia(mediaInput, (error: microsoftTeams.SdkError, attachments: microsoftTeams.media.Media[]) => {
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

**Calling `getMedia` API** for capturing images using camera

```javascript
let media: microsoftTeams.media.Media = attachments[0]
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

**Calling `viewImages` API by ID**

```javascript
view images by id:
    assumption: attachmentArray = select Media API Outputlet uriList = [];
if (attachmentArray && attachmentArray.length > 0) {
    for (let i = 0; i < attachmentArray.length; i++) {
        let file = attachmentArray[i];
        if (file.mimeType.includes("image")) {
            let imageUri = {
                value: file.content,
                type: 1,
            }
            uriList.push(imageUri);
        } else {
            alert("File type is not image");
        }
    }
}
if (uriList.length > 0) {
    microsoftTeams.media.viewImages(uriList, (error: microsoftTeams.SdkError) => {
        if (error) {
            if (error.message) {
                output(" ErrorCode: " + error.errorCode + error.message);
            } else {
                output(" ErrorCode: " + error.errorCode);
            }
        }
    });
} else {
    output("Url list is empty");
}
```

**Calling `viewImages` API by URL**

```javascript
View Images by URL:
    // Assumption 2 urls, url1 and url2let uriList = [];
    if (URL1 != null && URL1.length > 0) {
        let imageUri = {
            value: URL1,
            type: 2,
        }
        uriList.push(imageUri);
    }
if (URL2 != null && URL2.length > 0) {
    let imageUri = {
        value: URL2,
        type: 2,
    }
    uriList.push(imageUri);
}
if (uriList.length > 0) {
    microsoftTeams.media.viewImages(uriList, (error: microsoftTeams.SdkError) => {
        if (error) {
            if (error.message) {
                output(" ErrorCode: " + error.errorCode + error.message);
            } else {
                output(" ErrorCode: " + error.errorCode);
            }
        }
    });
} else {
    output("Url list is empty");
}
}
```

**Calling `selectMedia` and `getMedia` APIs for recording audio through microphone**

```javascript
let mediaInput: microsoftTeams.media.MediaInputs = {
    mediaType: microsoftTeams.media.MediaType.Audio,
    maxMediaCount: 1,
};
microsoftTeams.media.selectMedia(mediaInput, (error: microsoftTeams.SdkError, attachments: microsoftTeams.media.Media[]) => {
    if (error) {
        if (error.message) {
            alert(" ErrorCode: " + error.errorCode + error.message);
        } else {
            alert(" ErrorCode: " + error.errorCode);
        }
    }
    // If you want to directly use the audio file (for smaller file sizes (~4MB))    if (attachments) {
        let audioResult = attachments[0];
        var videoElement = document.createElement("video");
        videoElement.setAttribute("src", ("data:" + y.mimeType + ";base64," + y.preview));
        //To use the audio file via get Media API for bigger audio file sizes greater than 4MB        audioResult.getMedia((error: microsoftTeams.SdkError, blob: Blob) => {
            if (blob) {
                if (blob.type.includes("video")) {
                    videoElement.setAttribute("src", URL.createObjectURL(blob));
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
    }
});
```