---
title: Video filters for meeting apps
author: v-ypalikila
description: Learn how to add filters, frames, makeups and so on to videos and make your videos more presentable for meetings.
ms.topic: conceptual
ms.localizationpriority: medium
ms.author: v-ypalikila
ms.date: 08/08/2022
---

# Video filters for meeting apps

> [!NOTE]
> A/V filters is currently available only in [Public Developer Preview](../resources/dev-preview/developer-preview-intro.md). You must be part of the Public Developer Preview for Microsoft Teams to use the A/V filters.

As online meetings have become more prominent, teams users spend significant amount of time  reviewing work, watching videos, and collaborating with teammates on video calls. Considering this, Microsoft Teams provides an immersive and engaging meeting experience with video filters.

Users can use the video filter app during pre-meeting and in- meeting scenarios and easily apply video effects in all meetings and calls. Teams supports filters, frames, makeups, and so on, to make your meeting experience more presentable.

# [Pre-meeting](#tab/pre-meeting)

:::image type="content" source="../assets/images/apps-in-meetings/pre-meeting-video-filter-experience.png" alt-text="Screenshot that shows an pre-meeting video filter app experience":::

# [In-meeting](#tab/in-meeting)

:::image type="content" source="../assets/images/in-meeting-experience.png" alt-text="Screenshot that shows an in-meeting video filter app experience.":::

---

## Create a video filter app

> [!NOTE]
>
> * A/V filters is currently supported only on Teams desktop client. However, if a user joins a meeting through mobile and another user applies video filters from desktop, the mobile users will see the effects applied by the user on desktop.
> * Currently, A/V filter is not supported on Teams web client, Government Community Cloud (GCC), GCC-High, or Department of Defense (DOD) tenants.

Before you begin, you must have a basic understanding of [Formats for Video Rendering](/windows/win32/medfound/recommended-8-bit-yuv-formats-for-video-rendering).

The video filter app defines the video filter and applies it to the user's video stream. To enable video filters experience to the users of your app, ensure that your app meets the following requirements:

* App is built on [Teams client SDK library](https://github.com/OfficeDev/microsoft-teams-library-js).

* App access is enabled with [RSC permissions](#update-app-manifest).

* App is invoked with [Video extensibility API](#video-extensibility-api-reference).

You must have an app package to build and run your application in Teams. For more information, see [Create Teams app package](../concepts/build-and-test/apps-package.md).

## Update app manifest

>[!NOTE]
> Update your app manifest as per the [Public developer preview manifest schema for Teams](../resources/schema/manifest-schema-dev-preview.md).

You must configure your Teams app manifest with the devicePermissions and resource-specific consent (RSC) permissions for your app to access the video stream and video API's.

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

Ensure that you follow the following requirements to update the app manifest:

* Each filter has a non-empty guid, and the Guid is unique for the `meetingExtensionDefinition` property.

* The number of filters for an app is limited to 32.

* The maximum size for a video filter thumbnail image size is 2 MB.

* The `videoAppContentUrl` property isn't empty.

* The Thumbnail image file resolution should match 74 x 42 dimensions of the viewport. That is abs (width or height - 74 or 42) < 0.01.

* The value of each filter's thumbnail is a valid path to a file in the PNG format as 24-bit RGB or 32-bit RGBA.

* Supported RawFormat is PNG.

* Supported PixelFormat is PixelFormat24bppRGB or PixelFormat32bppARGB.

* Filter categories:
  * Styles: Filters that add visual effects to the video stream, including graphical styles such as color and texture changes.
  * Frames: Filters with additional add-on designs, which don't have semantic information.
  * Makeup: Virtual makeup based on facial area.
  * Others: Filters that don’t fall into the categories above.

* Filter name:
  * Use descriptive terms as the filter name to best reflect the effect. Avoid using offensive words that don't conform with Microsoft’s value of inclusivity.

  * It's recommended to keep the total filter and app name word counts within 12-16 characters, and not more than 20 characters for a better user experience.

  * When the mouse hovers over the filter, the tooltip must display the text **[Filter name] from [Developer name]**. For example, Island Style from Contoso.

  * After applying a filter, the hovers over text on the applied filter's ellipses icon (**...**) and tooltip must display as **Open [App name]**. For example, Open Contoso.

  * Add the filter categories as a prefix to the filter name. For example:
    * Styles_[Filter name]
    * Frames_[Filter name]
    * Makeup_[Filter name]
    * Others_[Filter name]

## Validate your app package

After you've completed updating the app manifest, you can validate your app package at [app validation website](https://dev.teams.microsoft.com/appvalidation.html).

## Video extensibility API reference

You can configure your app to fetch the user's video stream during the pre-meeting and in-meeting experience. You can use the [video extensibility API's](/javascript/api/@microsoft/teams-js/video?view=msteams-client-js-latest&preserve-view=true) to access video stream of the user and get notified when a user has selected and applied a filter.

To trigger the video filter for the app:

* Invoke the `registerForVideoFrame` to read the video frames in Permissions section.
* Invoke the `registerForVideoEffect` to get select effect in Teams client or notify that the selected effect in video app’s UI is applied.
* Call the `notifyVideoFrameProcessed` to notify the teams client that a different effect is selected by the users in the video app.Teams client invokes the callback registered through registerForVideoEffect to tell the video app to apply the current selected effect.

>[!NOTE]
> After you call notifySelectedEffectChanged API:
>
> * For pre-meeting: The callback is invoked immediately.
> * For in-meeting: The callback isn't invoked until the user clicks `Apply` button.

Following code snippet is an example of calling the `registerForVideoFrame` method:

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

Following code snippet is an example of calling the `registerForVideoEffect` method:

```typescript
function registerForVideoEffect(callback: VideoEffectCallBack)

type VideoEffectCallBack = (effectId: string | undefined) => void,

```

Following code snippet is an example of calling the `notifySelectedVideoEffectChanged` method:

```typescript
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

### Guidelines to use the Video extensibility API

Ensure that you implement the following guidelines to use the video extensibility APIs:

* Video frame related data, including any raw video frame and any data calculated from video frame, must only be consumed in user's local computer, and shouldn't be uploaded to the network.

* Only NV12 video format is supported. RGB(A) isn't supported. The sample app has provided sample code for video format conversion between NV12 and RGB(A).

* The JavaScript in the video app must only operate on the latest videoFrame. References to previous video frames can result in unexpected behavior.

* Video frame size can change anytime, so size sensitive resources for processing video frames should be recreated when video frame size changes.

* Call `microsoftTeams.video.registerForVideoEffects()` as early as possible. Call `microsoftTeams.video.registerForVideoFrame()` after required resources downloaded and the video app initialization is finished.

* Ensure the stability of the effect algorithm. When calling `notifyFrameProcessed()`, ensure the video frame is fully processed even if the algorithm crashes. When using a video app, users will be surprised if they see a video frame without the effect applied.

* Video app should be compliant to [Teams client SDK terms of use](/legal/microsoft-apis/terms-of-use).

## Test the video filter app performance

You can test the functionality and performance of your video filter app using a filter test app .

To test your video filter app:

1. Download the [video test app](https://github.com/microsoft/teams-videoapp-sample/blob/main/test-app/vxTestApp-v1.0.2-win32-x64.zip).
1. Extract the files from the folder.
1. Run the **vxTestApp.exe** file.
1. Enter the Video app url and select **Load**.
   A default sample video filter app link is already available, replace the link wih your app url.
1. Select an effect from the list and select **Apply effect**.
1. Select **real-time evaluation** or **Full Evaluation** to analyze the performance data.

A good functioning video filter app must meetthe following performance requirements:

* Video frame processing time less than 30 ms.
* Video app loading time less than 4 sec.
* App Size less than 20 MB.
* Memory less than 150 MB.
* Latency less than 100 ms.

### Sideload the video filter app

After you test the video filter app, sideload the app to your tenant in Teams. For more information, see [Upload you custom app](../concepts/deploy-and-publish/apps-upload.md).

## Seel also

* [Public developer preview manifest schema for Teams](../resources/schema/manifest-schema-dev-preview.md).

* [Teams client SDK](/javascript/api/@microsoft/teams-js/video?view=msteams-client-js-latest)

* [Meeting apps API references](API-references.md)
