---
title: Audio or video filters for meeting apps
author: v-ypalikila
description: Learn how to add filters, frames, makeups and so on to videos and make your videos more presentable for meetings.
ms.topic: conceptual
ms.localizationpriority: medium
ms.author: v-ypalikila
ms.date: 08/08/2022
---

# Video filters for meeting apps

As online meetings have become more prominent and Teams users spend significant amount of time reviewing work with teammates, watching videos together, and collaborating on video calls. With Video filters you can add filters, frames, makeups, and so on to videos and make your videos more presentable for meetings.

Prerequisites

1. Understand about building apps for Teams
2. Public Developer Preview for Teams
3. Formats for Video Rendering
4. Enable sideloading for your Tenant
5. Ensure that the Administrator has granted permission to Upload a custom app and selected all filters as part of App Setup and Meeting policies respectively.

## Create a video filter app

A video filter app’s purpose is to define the video filters and then apply video filters on to the video stream of a user, should the user choose to do so. To do so, a video filter app must take permission from a user to access their video stream, access the video stream, modify the video stream using an algorithm of its choice and then feed that video stream back into Teams. All this processing is required to be done on the user’s local machine and should not be uploaded to the network.

The video filter app

## Update app manifest

You must configure your Teams app manifest with the devicePermissions and resource-specific consent (RSC) permissions for your app to access the video stream and video API's.

### Device permissions

Update your app's manifest.json by adding devicePermissions and specifying `media` property in your application:

```json
"devicePermissions": [
    "media"
],

```

### RSC permissions

Update your app's manifest.json by adding RSC permission `CameraStream.Read.User` and `OutgoingVideoStream.Write.User`.

### Sample manifest

The following is an example of a manifest for a video filter app:

```json
{
"$schema": "https://developer.microsoft.com/en-us/json-schemas/teams/v1.7/MicrosoftTeams.schema.json",
  "manifestVersion": "devPreview", // Required for meetingExtensionDefinition for sideloading. Will have a published version 1.10
  "id": "e58bac8e-94ff-4dce-8892-9bcd564fb36c", // Guid
  "version": "1.0.0",
  "packageName": "com.microsoft.teams.videopp",
  "developer": {
    "name": "Microsoft",
    "websiteUrl": "https://videoapp.microsoft.com",
    "privacyUrl": "https://videoapp.microsoft.com/privacy",
    "termsOfUseUrl": "https://videoapp.microsoft.com/terms"
  },
  "name": {
    "short": "Teams VideoApp example",
    "full": "Teams VideoApp example (Preview)"
  },
  "description": {
    "short": "A short description for the video app",
    "full": "A full description for the video app"
  },
  "icons": {
    "outline": "outline.png", // A relative path to a transparent .png icon — 32px X 32px
    "color": "color.png" // A relative path to a full color .png icon — 192px X 192px
  },
  "accentColor": "#1da2b4",
  "permissions": [ "identity", "messageTeamMembers" ],
  "devicePermissions": [
    "media"
  ],
  "authorization": { // RSC permission section for gating teams client sdk video api.
    "permissions": {
      "resourceSpecific": [
        {
          "name": "CameraStream.Read.User", // gating api: registerForVideoFrame
          "type": "Delegated"
        },
        {
          "name": "OutgoingVideoStream.Write.User", // gating api: registerForVideoFrame
          "type": "Delegated"
        }
      ]
    }
  },
  "validDomains": [ "videoapp.microsoft.com" ], // Domain for video app url
  "meetingExtensionDefinition": {
    "filters": [ // for showing filters inside of video effects quick picker section.
      {
        "id": "310a65de-24ce-445e-9e1e-dd4ef0f0114b", // Guid
        "name": "FilterA",
        "thumbnail": "PreviewEffect.png" // A relative path to the filter thumbnail.png
      }
    ],
    // Video app web page url for both processing video frames and ustomization experience. The domain should be one of **validDomain**。
    "videoAppContentUrl": "https://videoapp.microsoft.com/Teams-VideoApp-example/app/configure.html"  
  }
}
```

Ensure that the video filter app manifest meets the following requirements:

* Each filter must have a non-empty guid, and the Guid must be unique for the `meetingExtensionDefinition` property

* The number of filters for an app is limited to 32

* The file size for the video filter thumbnail image must not exceed 2 MB

* The 'videoAppContentUrl' property must not be empty

* Thumbnail image file resolution should match 74 x 42 dimensions of the viewport. That is abs (width or height - 74 or 42) < 0.01.

* Value of each filter's thumbnail must be a valid path to a file in the PNG format as 24-bit RGB or 32-bit RGBA

* RawFormat: PNG

* PixelFormat: PixelFormat24bppRGB or PixelFormat32bppARGB

* Filter Categories: Styles, Frames, Makeup, and Others

   |File category|Description|Example|
   |---------|---------|---------|
   |Styles    |Filters that add visual effects to the video stream, including graphical styles such as color and texture changes. |         |
   |Frames     |Filters with additional add-on designs, which do not have semantic information. |         |
   |Makeup     |Virtual makeup based on facial area.  |         |
   |Others     |Filters that don’t fall into the categories above.    |         |

* Filter naming:
  * Use descriptive terms as the filter name to best reflect the effect. Avoid using offensive words that do not conform with Microsoft’s value of inclusivity.
  * There is no mandatory requirement for the number of word floats. For a better user experience, it is recommended to keep the total filter and app name word counts within 12-16, and no more than 20.

* When the mouse hovers over the filter, the tooltip must display the text **[Filter name] from [Developer name]**. For example, Island Style from Contoso.

* After applying a filter, the hovers over text on the applied filter's ellipses icon (**...**) and tooltip must display as **Open [App name]**. For example, Open Contoso.

* Add a prefix to the filter name.
  * Styles: Styles_[Filter name]. For example, Styles_Island Style.
  * Frames: Frames_[Filter name]
  * Makeup: Makeup_[Filter name]
  * Others: Others_[Filter name]

### Validate your app

After updating the app manifest, you can validate your app at in the [app validation website](https://dev.teams.microsoft.com/appvalidation.html).

### Register for Video frame API

Register to read the video frames in Permissions section

```typescript
function registerForVideoFrame(frameCallback: VideoFrameCallback, config: VideoFrameConfig),
type VideoFrameCallback = (frame: VideoFrame, notifyVideoFrameProcessed: () => void, notifyError: (errorMessage: string) => void) => void,

/** 
 
 * video format 

 */

interface VideoFrameConfig { 

format: VideoFrameFormat;
}

```

### Register for Video effect

Register the video effect callback, host client uses this to notify the video extension the new video effect will by applied

```typescript
function registerForVideoEffect(callback: VideoEffectCallBack)

type VideoEffectCallBack = (effectId: string | undefined) => void,

```

### notifySelectedVideoEffectChanged

Video extension should call this to notify host client that the current selected effect parameter changed. If it's pre-meeting, host client will call videoEffectCallback immediately then use the videoEffect. If it's the in-meeting scenario, we will call videoEffectCallback when apply button clicked.

```typescript
}

function notifySelectedVideoEffectChanged(effectChangeType: EffectChangeType, effectId: string | undefined)

enum EffectChangeType 

{ 

   /** 

     * current video effect changed 

     */ 

    EffectChanged, 

    /** 

     * disable the video effect 

     */ 

    EffectDisabled, 

} 

```

### Tips to implement API

* Video frame related data, including any raw video frame and any data calculated from video frame, must only be consumed in user's local computer, and should not be uploaded to the network.

* Only NV12 video format is supported. RGB(A) is not supported. The sample app has provided sample code for video format conversion between NV12 and RGB(A).

* The JavaScript in the video app must only operate on the latest videoFrame. References to previous video frames can result in unexpected behavior.

* Video frame size can change any time, so size sensitive resources for processing video frames should be recreated when video frame size changes.

* Call microsoftTeams.video.registerForVideoEffects() as early as possible. Call microsoftTeams.video.registerForVideoFrame() after required resources downloaded and the video app initialization is finished.

* Ensure the stability of the effect algorithm. When calling notifyFrameProcessed(), ensure the video frame has been fully processed even if the algorithm crashes. When using a video app, users will be surprised if they see a video frame without the effect applied.

* Video app should be compliant to Teams client SDK [terms of use](/legal/microsoft-apis/terms-of-use).

## Test your video filter app

You can test the functionality and performance of your video filter app.

To test your video filter app:

1. Download the [video sample app](https://github.com/microsoft/teams-videoapp-sample/blob/main/test-app/vxTestApp-v1.0.2-win32-x64.zip).
1. Extract the files from the folder.
1. Run the vxTestApp.exe.
1. Enter the Video app url and select **Load**.
1. Select an effect from the list and select **Apply effect**.
1. Select **real-time evaluation** or **Full Evaluation** to analyze the performance data.

A good functioning video filter app should have the following performance:

* Video frame processing time less than 30 ms.
* Video app loading time less than 4 sec.
* App Size less than 20 MB.
* Memory less than 150 MB.
* Latency less than 100 ms.

### Sideload the video filter app

After you test the video filter app, sideload the app to your tenant in Teams. For more information, see [Upload you custom app](../concepts/deploy-and-publish/apps-upload.md).
