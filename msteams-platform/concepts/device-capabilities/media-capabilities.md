---
title: Integrate media capabilities 
author: Rajeshwari-v
description: Learn how to use Teams JavaScript client library to enable media capabilities using code examples and also learn the advantage of integrating media capabilities.
ms.topic: conceptual
ms.localizationpriority: medium
ms.author: lajanuar
---

# Integrate media capabilities

You can integrate native device capabilities, such as camera and microphone with your Teams app. For integration, you can use [Microsoft Teams JavaScript client library](/javascript/api/overview/msteams-client?view=msteams-client-js-latest&preserve-view=true) that provides the necessary tools for your app to access a user’s [device permissions](native-device-permissions.md). Use suitable media capability APIs to integrate the device capabilities, such as camera and microphone with the Teams platform within your Microsoft Teams app, and build a richer experience. The media capability is available for Teams web client, desktop, and mobile. To integrate media capabilities, you must update the app manifest file and call the media capability APIs.

For effective integration, you must have a good understanding of [code snippets](#code-snippets) for calling the respective APIs, which allows you to use native media capabilities. It's important to familiarize yourself with the [API response errors](#error-handling) to handle the errors in your Teams app.

## Advantages

The advantage of integrating device capabilities into your Teams apps is that it uses native Teams controls to provide a rich and immersive experience for your users. The following scenarios showcase the advantages of media capabilities:

* Allow the user to capture the rough mockups drawn on a physical whiteboard through their mobile phone and use the captured images as poll options in Teams group chat.

* Allow the user to record audio message and attach it to an incident ticket.

* Allow the user to scan the physical documents from the smartphone to file a car insurance claim.

* Allow the user to record a video at a worksite and upload it for attendance.

> [!NOTE]
>
> * Currently, Teams doesn't support device permissions in pop out chat window, tabs, and the meeting side panel.</br>
> * The device permissions are different in the browser. For more information, see [browser device permissions](browser-device-permissions.md).
> * The request permissions prompt is automatically displayed on mobile when a relevant Teams API is initiated. For more information, see [request device permissions](native-device-permissions.md).

## Update manifest

Update your Teams app [manifest.json](../../resources/schema/manifest-schema.md#devicepermissions) file by adding the `devicePermissions` property and specifying `media`. It allows your app to ask for requisite permissions from users before they start using  the camera to capture the image, open the gallery to select an image to submit as an attachment, or use the microphone to record the conversation. The update for app manifest is as follows:

``` json
"devicePermissions": [
    "media",
],
```

## Media capability APIs

The [selectMedia](/javascript/api/@microsoft/teams-js/media#@microsoft-teams-js-media-selectmedia), [getMedia](/javascript/api/@microsoft/teams-js/media.media#@microsoft-teams-js-media-media-getmedia), and [viewImages](/javascript/api/@microsoft/teams-js/media#@microsoft-teams-js-media-viewimages) APIs enable you to use native media capabilities as follows:

* Use the native **microphone** to allow users to **record audio** (record 10 minutes of conversation) from the device.
* Use native **camera control** to allow users to **capture and attach images** and **capture videos** (record up to five minutes of video) on the go.
* Use native **gallery support** to allow users to **select device images** as attachments.
* Use native **image viewer control** to **preview multiple images** at one time.
* Support **large image transfer** (from 1 MB to 50 MB) through the TeamsJS bridge.
* Support **advanced image capabilities** by allowing users to preview and edit images.
* Scan documents, whiteboard, and business cards through the camera.
  
> [!IMPORTANT]
>
> * The `selectMedia`, `getMedia`, and `viewImages` APIs can be invoked from multiple Teams surfaces, such as dialogs (task modules), tabs, and personal apps. For more information, see [Entry points for Teams apps](../extensibility-points.md).</br>
> * The `selectMedia` API supports both camera and microphone capabilities through different input configurations.
> * The `selectMedia` API for accessing microphone capability supports for mobile clients only.
> * The maximum count of images uploaded is determined by [`maxMediaCount`](/javascript/api/@microsoft/teams-js/media.mediainputs#@microsoft-teams-js-media-mediainputs-maxmediacount) and also by the total size of array returned by the `selectMedia` API. Ensure that the array size doesn't exceed 20 MB, if the array size exceeds 20 MB, the API generates an error code 10000 that is SIZE_EXCEEDED error.

The following table lists set of APIs to enable your device's media capabilities:

| API      | Description   |
| --- | --- |
| [**selectMedia**](/javascript/api/@microsoft/teams-js/media#@microsoft-teams-js-media-selectmedia) (**Camera)**| This API allows users to **capture or select media from the device camera** and return it to the web-app. The users can edit, crop, rotate, annotate, or draw over images before submission. In response to `selectMedia`, the web-app receives the media IDs of selected images and a thumbnail of the selected media. This API can be further configured through the [ImageProps](/javascript/api/@microsoft/teams-js/media.imageprops) configuration. |
| [**selectMedia**](/javascript/api/@microsoft/teams-js/media#@microsoft-teams-js-media-selectmedia) (**Microphone**)| Set the [mediaType](/javascript/api/@microsoft/teams-js/media.mediatype) to `4` (Audio) in `selectMedia` API for accessing microphone capability. This API also allows users to record audio from the device microphone and return recorded clips to the web app. The users can pause, re-record, and play recording preview before submission. In response to **selectMedia**, the web-app receives media IDs of the selected audio recordings. <br/> Use `maxDuration`, if you need to configure a duration in minutes for recording the conversation. The current duration for recording is 10 minutes, after which the recording terminates.  |
| [**getMedia**](/javascript/api/@microsoft/teams-js/media.media#@microsoft-teams-js-media-media-getmedia)| This API retrieves the media captured by `selectMedia` API in chunks, irrespective of the media size. These chunks are assembled and sent back to the web app as a file or blob. Breaking media into smaller chunks facilitates large file transfer. |
| [**viewImages**](/javascript/api/@microsoft/teams-js/media#@microsoft-teams-js-media-viewimages)| This API enables the user to view images in full-screen mode as a scrollable list.|

# [Mobile](#tab/mobile)

The following image depicts the web app experience of `selectMedia` API for the image capability:

:::image type="content" source="~/assets/images/tabs/media-capability-mobile2.png" alt-text="Illustration shows the image capability for mobile.":::

> [!NOTE]
> In devices with Android version under 7, the `selectMedia` API launches the native Android camera experience instead of the native Teams camera experience.

The following image depicts the web app experience of `selectMedia` API for the microphone capability:

:::image type="content" source="~/assets/images/tabs/microphone-capability.png" alt-text="Illustration shows the microphone capability for mobile.":::

# [Desktop](#tab/desktop)

The following image depicts the web app experience of `selectMedia` API for the image capability:

:::image type="content" source="~/assets/images/tabs/media-capability-desktop1.png" alt-text="Illustration shows the media capability for desktop.":::

---

## Error handling

Ensure to handle these errors appropriately in your Teams app. The following table lists the error codes and the descriptions under which the errors are generated:

|Error code |  Error name     | Description|
| --------- | --------------- | -------- |
| **100** | NOT_SUPPORTED_ON_PLATFORM | API isn't supported on the current platform.|
| **404** | FILE_NOT_FOUND | File specified isn't found in the given location.|
| **500** | INTERNAL_ERROR | Internal error is encountered while performing the required operation.|
| **1000** | PERMISSION_DENIED |Permission is denied by the user.|
| **3000** | NO_HW_SUPPORT | The hardware doesn't support the capability.|
| **4000**| INVALID_ARGUMENTS | One or more arguments are invalid.|
|  **8000** | USER_ABORT |User aborts the operation.|
| **9000**| OLD_PLATFORM | Platform code is outdated and doesn't implement this API.|
| **10000**| SIZE_EXCEEDED |  Return value is too large and has exceeded the platform size boundaries.|

## Code snippets

* Call `selectMedia` API for capturing images using camera:

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

* Call `selectMedia` API for capturing videos using camera:

  * Capturing videos with `fullscreen: true`:

       `fullscreen: true` opens the camera in video recording mode. It provides an option to use both front and rear camera and also provides other attributes as mentioned in the following example:

       ```javascript
        
         const defaultLensVideoProps: microsoftTeams.media.VideoProps = {
             sources: [microsoftTeams.media.Source.Camera, microsoftTeams.media.Source.Gallery],
             startMode: microsoftTeams.media.CameraStartMode.Video,
             cameraSwitcher: true,
             maxDuration: 30
        }
         const defaultLensVideoMediaInput: microsoftTeams.media.MediaInputs = {
             mediaType: microsoftTeams.media.MediaType.Video,
             maxMediaCount: 6,
             videoProps: defaultLensVideoProps
        }
       ```

  * Capturing videos with `fullscreen: false`:

       `fullscreen: false` opens the camera in video recording mode and uses the front camera only. Typically `fullscreen: false` is used when user wants to record video while reading content on the device screen.

       This mode also supports `isStopButtonVisible: true` that adds a stop button on the screen that allows user to stop the recording. If `isStopButtonVisible: false`, recording can be stopped either by calling mediaController API or when the recording duration has reached `maxDuration` time specified.

       Following is an example to stop the recording with `maxDuration` time specified:

       ```javascript
          const defaultNativeVideoProps: microsoftTeams.media.VideoProps = {
             maxDuration: 30,
             isFullScreenMode: false,
             isStopButtonVisible: false,
             videoController: new microsoftTeams.media.VideoController(videoControllerCallback)
         }
          const defaultNativeVideoMediaInput: microsoftTeams.media.MediaInputs = {
             mediaType: microsoftTeams.media.MediaType.Video,
             maxMediaCount: 1,
             videoProps: defaultNativeVideoProps
         }
       ```

       Following is an example to stop the recording by calling mediaController API:

       ```javascript
          const defaultNativeVideoProps: microsoftTeams.media.VideoProps = {
             videoController.stop(),
             isFullScreenMode: false,
             isStopButtonVisible: false,
             videoController: new microsoftTeams.media.VideoController(videoControllerCallback)
         }
          const defaultNativeVideoMediaInput: microsoftTeams.media.MediaInputs = {
             mediaType: microsoftTeams.media.MediaType.Video,
             maxMediaCount: 1,
             videoProps: defaultNativeVideoProps
         }
       ```

* Call `selectMedia` API for capturing images and video using camera:

  This allows users to select between capturing an image or a video.

    ```javascript
    
      const defaultVideoAndImageProps: microsoftTeams.media.VideoAndImageProps = {
        sources: [microsoftTeams.media.Source.Camera, microsoftTeams.media.Source.Gallery],
        startMode: microsoftTeams.media.CameraStartMode.Photo,
        ink: true,
        cameraSwitcher: true,
        textSticker: true,
        enableFilter: true,
        maxDuration: 30
      }
    
      const defaultVideoAndImageMediaInput: microsoftTeams.media.MediaInputs = {
        mediaType: microsoftTeams.media.MediaType.VideoAndImage,
        maxMediaCount: 6,
        videoAndImageProps: defaultVideoAndImageProps
      }
    
      let videoControllerCallback: microsoftTeams.media.VideoControllerCallback = {
        onRecordingStarted() {
          console.log('onRecordingStarted Callback Invoked');
        },
      };
    
      microsoftTeams.media.selectMedia(defaultVideoAndImageMediaInput, (error: microsoftTeams.SdkError, attachments: microsoftTeams.media.Media[]) => {
        if (error) {
            if (error.message) {
                alert(" ErrorCode: " + error.errorCode + error.message);
            } else {
                alert(" ErrorCode: " + error.errorCode);
            }
        }
        
        var videoElement = document.createElement("video");
        attachments[0].getMedia((error: microsoftTeams.SdkError, blob: Blob) => {
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
        });
        
    ```

* Call `getMedia` API to retrieve large media in chunks:

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

* Call `viewImages` API by ID, which is returned by `selectMedia` API:

    ```javascript
    // View images by id:
    // Assumption: attachmentArray = select Media API Output
    let uriList = [];
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

* Call `viewImages` API by URL:

    ```javascript
    // View Images by URL:
    // Assumption 2 urls, url1 and url2
    let uriList = [];
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
    ```

* Call `selectMedia` and `getMedia` APIs for recording audio through microphone:

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
        videoElement.setAttribute("src", ("data:" + audioResult.mimeType + ";base64," + audioResult.preview));
        audioResult.getMedia((error: microsoftTeams.SdkError, blob: Blob) => {
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
    });
    ```

## File download on Teams mobile

You can configure an app to enable users to download files from the webview to their mobile device.

>[!NOTE]
> Downloading files is only supported on Android Teams mobile client and only unauthenticated files can be downloaded.

To enable, follow the steps:

1. Update your Teams app [manifest.json](../../resources/schema/manifest-schema.md#devicepermissions) file by adding the `devicePermissions` property and specifying `media` as shown in the [update manifest](#update-manifest).

2. Use the following format and add the HMTL download attribute to the webpage:

    ```html
    <a href="path_to_file" download="download">Download</a>
    ```

## See also

* [Device capabilities](device-capabilities-overview.md)
* [Integrate QR or barcode scanner capability in Teams](qr-barcode-scanner-capability.md)
* [Integrate location capabilities in Teams](location-capability.md)
* [Integrate People Picker](people-picker-capability.md)
* [Requirements and considerations for application-hosted media bots](~/bots/calls-and-meetings/requirements-considerations-application-hosted-media-bots.md)
* [App manifest schema for Teams](../../resources/schema/manifest-schema.md)
* [Plan responsive tabs for Teams mobile](../design/plan-responsive-tabs-for-teams-mobile.md)
