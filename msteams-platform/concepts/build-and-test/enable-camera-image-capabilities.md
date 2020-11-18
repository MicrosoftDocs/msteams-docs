---
title: Enable camera and image capabilities in Teams
description: How to use Teams Javascript client SDK to enable camera and image capabilities
keywords: camera image capabilities
ms.topic: conceptual
ms.author: lajanuar
---

# Enable camera and image capabilities in Teams

You can use the  [Microsoft Teams JavaScript client SDK](/javascript/api/overview/msteams-client?view=msteams-client-js-latest&preserve-view=true), to easily integrate camera and image capabilities within your Teams app. The SDK provides the tools necessary for your app to access a user’s [device permissions](../../tabs/how-to/native-device-permissions.md?tabs=desktop#device-permissions) and build a richer experience.

The [selectMedia](/javascript/api/@microsoft/teams-js/media?view=msteams-client-js-latest#selectMedia_MediaInputs___error__SdkError__attachments__Media_______void_), [getMedia](/javascript/api/@microsoft/teams-js/_media?view=msteams-client-js-latest#getMedia__error__SdkError__blob__Blob_____void_), and [viewImages](/javascript/api/@microsoft/teams-js/media?view=msteams-client-js-latest#viewImages_ImageUri_____error___SdkError_____void_) help web app developers leverage native camera/image capabilities and use them right out of the client SDK. With these capabilities a Teams web app developer would now be able to:

* Leverage native **camera control** to let users **capture and attach images** in a go
* Leverage native **gallery support** to let users **pick device images** as attachments
* Leverage native **image viewer control** to **preview multiple images** at a time
*	Support large image transfer (up to 50 MB) via the SDK bridge
*	Let users access advanced image capabilities before submitting images, such as 
    * Scan document, whiteboard, business cards through the camera
    * Crop and rotate the image
    *	Text annotation on the image
    * Inking or freehand annotation on the image

## Getting started

[Update your app manifest](https://docs.microsoft.com/microsoftteams/platform/tabs/how-to/native-device-permissions?tabs=mobile#properties) with “media” permissions, so Teams knows the device capability your app requires access to. This allows your app to ask for requisite permissions from end-users before they use the camera to capture the image or open gallery to pick an image and submit as an attachment. Note that the permission prompt gets shown automatically when an appropriate Teams API is leveraged, and no effort is needed on your end. For more details, refer [permission behavior](https://docs.microsoft.com/microsoftteams/platform/tabs/how-to/native-device-permissions?tabs=desktop).

## Using camera and image capabilities

You can use the following set of APIs to leverage device capabilities around camera and image:

| API      | Description   |
| --- | --- |
| export function selectMedia(mediaInputs: MediaInputs, callback: (error: SdkError, attachments: Media[]) => void): void; | Allows users to **capture or select media from device** and return to web-app. Users may choose to edit, crop, rotate, annotate, draw over images before submission.
In response to selectMedia API, web-app will receive media ids of selected images and may **receive a thumbnail** of the selected media. |
| public getMedia(callback: (error: SdkError, blob: Blob) => void): void; | Gets the media in chunks irrespective of size, these chunks are assembled and sent back to the web app as file/blob. Through this API an image is broken into smaller chunks to facilitate large image transfer. |
| export function viewImages(uriList: ImageUri[], callback: (error?: SdkError) => void): void; | Enables the user to view images in a full-screen mode as a scrollable list.|

| Supporting interfaces     | Enums   |
| :--- | :---- |
| interface **MediaInputs** { <br/> mediaType: MediaType; // media type/s allowed to be selected <br/> maxMediaCount: number; // maximum number of media attachments allowed in one go; Max limit is 10 <br/> imageProps?: ImageProps; // additional image configurations <br/> } <br/> Details of parameters in Remarks column | const enum **MediaType** { <br/> Image = 1, <br/> // Video = 2, // not implemented yet // ImageOrVideo = 3, // not implemented yet, <br/> Audio = 4, } |
| interface **ImageProps** { <br/> sources?: Source[]; // lets developer specify the image source, more than one can be specified <br/> startMode?: CameraStartMode, // specify in which mode the camera will be opened <br/> ink?: boolean, // indicate if inking on the selected Image is allowed or not <br/> cameraSwitcher?: boolean, // indicate if user is allowed to move between front and back camera <br/> textSticker?: boolean, // indicate if putting text stickers on the selected Image is allowed or not <br/> enableFilter?: boolean, // indicate if image filtering mode is enabled on the selected image <br/> } <br/>  Defaults values: source: both camera and gallery, startMode: Photo, cameraSwitcher: true, ink: true, textSticker: true, enableFilter: false | const enum **Source** { <br/> Camera = 1, <br/> Storage = 2, <br/> } <br/> const enum **CameraStartMode** { <br/> Photo = 1, <br/> // default Document =2, <br/> Whiteboard = 3, <br/> BusinessCard = 4, <br/> } |
| // Output of getMedia API from platform <br/> interface **MediaResult** { <br/> error: sdkError; // error encountered in getMedia API <br/> mediaChunk: MediaChunk; // MediaChunk which will be assembled and converted into a blob } |  |
| interface **SdkError** { <br/> errorCode: ErrorCode; // error code <br/> message?: string; // message accompanying error code available to webapp developers for debugging purpose } |  |
| // Input for viewImages API <br/> interface **ImageUri** <br/> value: string; <br/> type: ImageUriType; } | const enum **ImageUriType** { <br/> ID = 1, // image ID returned by selectMedia API <br/>  URL = 2, // generic URL } |

Here is how the experience looks in a sample web app:

![Sample web app](../../assets/images/tabs/samplewebapp.png)

![Sample web app2](../../assets/images/tabs/samplewebapp2.png)

## Error handling

Developers should understand different error codes that an API could respond with and handle those appropriately.
ADD <Versioning model (supported on Teams client version this and above; ask users to update)>
Below is a list of error codes supported by the platform:

| Error Name     | Code   | Details |
| --- | --- | --- |
| NOT_SUPPORTED_ON_PLATFORM | 100 | API not supported in the current platform |
| INTERNAL_ERROR | 500 | Internal error encountered while performing the required operation |
| PERMISSION_DENIED | 1000 | Permissions denied by the user |
| NETWORK_ERROR | 2000 | Network issue |
| NO_HW_SUPPORT | 3000 | Underlying hardware doesn't support the capability |
| INVALID_ARGUMENTS | 4000 | One or more arguments are invalid |
| UNAUTHORIZED_USER_OPERATION | 5000 | User is not authorized for this operation |
| INSUFFICIENT_RESOURCES | 6000 | Could not complete the operation due to insufficient resources |
| THROTTLE | 7000 | Platform throttled the request because API was invoked too frequently |
| USER_ABORT | 8000 | User aborted the operation |
| OLD_PLATFORM | 9000 | Platform code is old and doesn't implement this API |
| FILE_NOT_FOUND | 404 | The file specified was not found on the given location |
| SIZE_EXCEEDED | 10000 | The return value is too big and has exceeded our size boundaries |

## Sample code snippets

Code snippet for calling selectMedia API from web app:

```http
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

Code snippet for calling getMedia API from web app:

```http
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








