---
title: Video filters for meeting apps
author: v-ypalikila
description: Learn how to add filters, frames, makeups, and so on, to videos and make your videos more presentable for meetings.
ms.topic: conceptual
ms.localizationpriority: medium
ms.author: v-ypalikila
ms.date: 08/08/2022
---

# Video filters for meeting apps

> [!NOTE]
> Video filter is currently available only in [public developer preview](../resources/dev-preview/developer-preview-intro.md). You must be part of the public developer preview for Microsoft Teams to use the video filters.

As online meetings have become more prominent, teams users spend significant amount of time reviewing work, watching videos, and collaborating with teammates on video calls. Considering this, Microsoft Teams provides an immersive and engaging meeting experience with video filters.

Users can use the video filter app in the meeting lobby and in-meeting scenarios and easily apply video effects in all meetings and calls. Teams supports filters, frames, makeups, and so on, to make your meeting experience more presentable.

# [Meeting lobby experience](#tab/meeting-lobby-experience)

:::image type="content" source="../assets/images/apps-in-meetings/pre-meeting-video-filter-experience.png" alt-text="Screenshot that shows an meeting lobby video filter app experience":::

# [In-meeting experience](#tab/in-meeting-experience)

:::image type="content" source="../assets/images/apps-in-meetings/in-meeting-video-filter-experience.png" alt-text="Screenshot that shows an in-meeting video filter app experience.":::

---
The video filter app takes permission from a user to access their video stream, modifies the video stream by applying effects, and then feeds that video stream back into Teams.

:::image type="content" source="../assets/images/apps-in-meetings/video-filter-app-process.png" alt-text="Diagram that shows how a video is received, processed and sent as an output. ":::

## Create a video filter app

> [!NOTE]
>
> * Video filter is supported only on Teams desktop client. However, if a user joins a meeting through mobile and another user applies video filters from desktop, the mobile users can see the effects applied by the user on desktop.
> * Video filter isn't supported on Teams web client, Government Community Cloud (GCC), GCC-High, or Department of Defense (DOD) tenants.

Before you begin, you must have a basic understanding of [Formats for video rendering](/windows/win32/medfound/recommended-8-bit-yuv-formats-for-video-rendering).

The video filter app defines the video filter and applies it to the user's video stream. To enable video filter experience for your app:

1. [Install Microsoft Teams JavaScript SDK](https://github.com/OfficeDev/microsoft-teams-library-js).

1. [Enable your app for Teams meetings](#enable-your-app-for-teams-meetings).

1. [Validate your app package](#validate-your-app-package).

1. [Invoke the Video extensibility APIs](#video-extensibility-api-reference).

1. [Sideload your app to Teams](#sideload-the-video-filter-app).

## Install the JavaScript SDK

The [Microsoft Teams JavaScript SDK](https://www.npmjs.com/package/@microsoft/teams-js) is a JavaScript package published on [npm](https://www.npmjs.com/package/@microsoft/live-share), and you can download through npm or Yarn.

### npm

```bash
npm install --save @microsoft/teams-js
```

### yarn

```bash
yarn add @microsoft/teams-js
```

If you're using any dependency loader or module bundler such as RequireJS, SystemJS, browserify, or webpack, you can use import syntax to import specific modules. For example:

```typescript
import * as microsoftTeams from "@microsoft/teams-js";
```

For more information, see [Teams JavaScript client SDK](/microsoftteams/platform/tabs/how-to/using-teams-client-sdk?tabs=javascript%2Cmanifest-teams-toolkit)

## Enable your app for Teams meetings

An app package describes how your app is configured and includes the app manifest file, color icon, and outline icon. [Create a Teams app package](../concepts/build-and-test/apps-package.md) to build and run your application in Teams.

To enable your app for Teams meetings, update your app manifest and use the filter properties to determine the filter name, category name, and filter thumbnail image.

### Update app manifest

>[!NOTE]
> Update your app manifest as per the [public developer preview manifest schema for Teams](../resources/schema/manifest-schema-dev-preview.md).

The meeting app capability for filters is defined in your app manifest using the `filters` object. You must configure your Teams app manifest with the device permissions and resource specific consent (RSC) permissions for your app to access the video stream and video extensibility APIs.

The following is an example of a manifest for a video filter app:

```json
{
"$schema": "https://raw.githubusercontent.com/OfficeDev/microsoft-teams-app-schema/preview/DevPreview/MicrosoftTeams.schema.json",
  "manifestVersion": "devPreview", // Required for meetingExtensionDefinition for sideloading. Will have a published version 1.10
  "id": "your_app_guid", // Newly generated Guid
  "version": "1.0.0",
  "packageName": "your_package_name", // Example: com.microsoft.teams.videopp
  "developer": {
    "name": "your_developer_name", // Example: Microsoft
    "websiteUrl": "your_developer_website", // Example: https://videoapp.microsoft.com
    "privacyUrl": "your_privacy_url", // Example: https://videoapp.microsoft.com/privacy
    "termsOfUseUrl": "your_terms_of_use_url" //Example: https://videoapp.microsoft.com/terms
  },
  "name": {
    "short": "your_app_short_name", // Example: Teams VideoApp example
    "full": "your_app_full_name" // Example: Teams VideoApp example (Preview)
  },
  "description": {
    "short": "your_app_short_description", // A short description for the video app
    "full": "your_app_full_description" // A full description for the video app
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
  "authorization": { // RSC permission section for getting teams client sdk video api.
    "permissions": {
      "resourceSpecific": [
        {
          "name": "CameraStream.Read.User", // getting api: registerForVideoFrame
          "type": "Delegated"
        },
        {
          "name": "OutgoingVideoStream.Write.User", // getting api: registerForVideoFrame
          "type": "Delegated"
        }
      ]
    }
  },
  "validDomains": [ "your_domain_of_videoAppContentUrl" ], // The domain for videoAppContentUrl, Example: videoapp.microsoft.com
  "meetingExtensionDefinition": {
    "filters": [ // for showing filters inside of video effects quick picker section.
      {
        "id": "310a65de-24ce-445e-9e1e-dd4ef0f0114b", // Guid
        "name": "Category_FilterA", // Category can be: Styles, Frames, Makeup
        "thumbnail": "PreviewEffect.png" // A relative path to the filter thumbnail.png
      }
    ],
    // Video app web page url for both processing video frames and customization experience. The domain should be one of **validDomain**.
    "videoAppContentUrl": "your_app_content_url" // Example: https://videoapp.microsoft.com/Teams-VideoApp-example/app/configure.html
  }
}
```

Ensure that you adhere to the following requirements to update the app manifest:

* Each filter has a non-empty guid, and the guid is unique for the `meetingExtensionDefinition` property.

* The number of filters for an app is limited to 32.

* The maximum size for a video filter thumbnail image size is 2 MB.

* The `videoAppContentUrl` property isn't empty.

* The thumbnail image file resolution should match 74 x 42 dimensions of the viewport. That is abs (width by height: 74 x 42) less than 0.01.

* The value of each filter's thumbnail is a valid path to a file in the PNG format as 24-bit RGB or 32-bit RGBA.

* Supported RawFormat is PNG.

* Supported PixelFormat is PixelFormat24bppRGB or PixelFormat32bppARGB.

* Filter categories:
  * Styles: Filters that add visual effects to the video stream, including graphical styles such as color and texture changes.
  * Frames: Filters with additional add-on designs, which don't have semantic information.
  * Makeup: Virtual makeup based on facial area.
  * Others: Filters that don’t fall into the categories above.

* Use descriptive terms as the filter name to best reflect the effect. Avoid using offensive words that don't conform with Microsoft’s value of inclusivity.

  * It's recommended to keep the total filter and app name word counts within 12 to 16 characters, and not more than 20 characters for a better user experience.

  * When you hover over the filter, the tooltip must display the text **[Filter name] from [Developer name]**. For example, Island Style from Contoso.

  * After applying a filter, the hover over text on the filter's more icon (**...**) must display the text **Open [App name]**. For example, Open Contoso.

  * Add the filter categories as a prefix to the filter name. For example:
    * Styles_[Filter name]
    * Frames_[Filter name]
    * Makeup_[Filter name]
    * Others_[Filter name]

## Validate your app package

After you've completed updating the app manifest, you can validate your app package using App Validator and Teams Developer Portal.

# [App Validator](#tab/app-validator)

To validate your app package using the app validator:

1. Go to the [App Validator](https://dev.teams.microsoft.com/appvalidation.html).
1. Select **Upload manifest package**.
1. Upload the manifest.zip file.

The app validation tool checks your app package against the test cases that Microsoft uses to review your app. Resolve errors or warnings and read the preliminary checklist.

:::image type="content" source="../assets/videos/video-filters-app-validation.gif" alt-text="GIF of an app package app validation on the app validation website.":::

# [Developer portal](#tab/developer-portal)

To validate your app package using Teams Developer Portal:

1. Go to [Developer Portal](https://dev.teams.microsoft.com/home).
1. From the left pane, select **Apps** > **Import app**.
1. Upload the manifest.zip file.
1. In the app overview page, under Teams store validation, select **View details**.

The app validation tool checks your app package against the test cases that Microsoft uses to review your app. Resolve errors or warnings and read the App submission checklist.

:::image type="content" source="../assets/images/apps-in-meetings/video-filter-app-validation.png" alt-text="Screenshot of app validation details for an app package in Teams Developer Portal.":::

---

## Video extensibility API reference

You can configure your app to fetch the user's video stream during the meeting lobby and in-meeting experience. You can pass a call to `app.initialize()` to initialize the [teams client SDK](/javascript/api/@microsoft/teams-js/?view=msteams-client-js-latest&preserve-view=true) in your app.

You can use the video extensibility APIs to access the video stream of the user and get notified when a user has selected and applied a filter.

To initialize the [video extensibility APIs](/javascript/api/@microsoft/teams-js/video?view=msteams-client-js-latest&preserve-view=true), include the external JavaScript file to the HTML page using the src attribute.

Following is the code sample of the `src` attribute with the JavaScript file path:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Video app sample</title>
</head>
<body>
    <h1 class="app-title">Video app sample</h1>
    <div class="horizontal">
      <!-- UI for sampleEffect1 -->
      <div class="filter" id="sampleEffect1">
        <a class="thumbnail"></a>
      </div>
    </div>
    <link rel="stylesheet" type="text/css" href="./src/index.css" />
    <script src="./src/index.js" type="module"></script>
</body>
</html>
```

Use the following API methods in the JavaScript file to trigger the video filter app:

* Call the `registerForVideoEffect` method to get the selected effect in Teams client and notify the video extension that the new effect will be applied. The `VideoEffectCallBack` function updates the local state with the current selected effectId.

  Following code snippet is an example of calling the `registerForVideoEffect` method:

  ```typescript
  function registerForVideoEffect(callback: VideoEffectCallBack)
  
  type VideoEffectCallBack = (effectId: string | undefined) => void,
  
  ```

* Call the `registerForVideoFrame` method to:
  * Get video frames from video pipeline.
  * Return processed video frames from video pipeline.
  * Notify error.

  The `VideoFrameCallback` function registers and processes the video frame.

  Following code snippet is an example of calling the `registerForVideoFrame` method:

```typescript
 // import video module from sdk

import { video } from "@microsoft/teams-js";

// video frame handler for sampleEffect1

function sampleEffectHandler1(videoFrame) {
    // process video frame with sampleEffect1

}

// video frame handler for sampleEffect2

function sampleEffectHandler2(videoFrame) {

    // process video frame with sampleEffect2

}
function videoFrameHandler(videoFrame, notifyVideoProcessed, notifyError) {
  // selectedEffectId is the effect id that is using currently in video app
  switch (selectedEffectId) {
    case sampleEffect1:
      sampleEffectHandler1(videoFrame);
      break;
    case sampleEffect1:
      sampleEffectHandler2(videoFrame);
      break;
    default:
      break;
  }
  //send notification the effect processing is finshed.
  notifyVideoProcessed();
  //send error to Teams if any
  // if (errorOccurs) {
  //   notifyError("some error message");
  // }
}
// call registerForVideoFrame
video.registerForVideoFrame(videoFrameHandler, {
  format: "NV12",
});
```

* Call the `notifySelectedVideoEffectChanged` method to notify the teams client that a different effect is selected by the users in the video app. Teams client invokes the callback registered through registerForVideoEffect to tell the video app to apply the current selected effect.

  >[!NOTE]
  > After you call notifySelectedEffectChanged API:
  >
  > * For pre-meeting: The callback is invoked immediately.
  > * For in-meeting: The callback isn't invoked until the user selects the `Apply` button.

Following code snippet is an example of calling the `notifySelectedVideoEffectChanged` method:

```typescript
// notify Teams when user click on app page
const sampleEffect1Element = document.getElementById("sampleEffect1");

// add event listener for sampleEffect1 ui element. This can change according to how you implement you UI for video effect.

sampleEffect1Element.addEventListener("click", function () {

  // notify for selected video effect changed event
  video.notifySelectedVideoEffectChanged("EffectChanged", effectId);

});
```

### Guidelines to use the Video extensibility API

Ensure that you implement the following guidelines to use the video extensibility APIs:

* Video frame related data, including any raw video frame and any data calculated from video frame, must only be consumed in user's local computer, and shouldn't be uploaded to the network.

* Only NV12 video format is supported. RGB(A) isn't supported. The sample app has provided sample code for video format conversion between NV12 and RGB(A).

* The JavaScript in the video app must only operate on the latest videoFrame. References to previous video frames can result in unexpected behavior.

* Video frame size can change anytime, so size sensitive resources for processing video frames should be recreated when video frame size changes.

* Call `registerForVideoEffect()` as early as possible. Call `registerForVideoFrame()` after the required resources are downloaded and the video app initialization is finished.

* Ensure the stability of the effect algorithm. When calling `notifyVideoFrameProcessed`, ensure that the video frame is fully processed even if the algorithm crashes. When using a video app, users will be surprised if they see a video frame without the effect.

* Video filter app must be compliant to [Teams client SDK terms of use](/legal/microsoft-apis/terms-of-use).

* Ensure that the video filter app meets the following performance requirements:
  * Video frame processing time must be less than 30 ms.
  * Video app loading time must be less than four seconds.
  * App Size must be less than 20 MB.
  * Memory size must be less than 150 MB.
  * Latency must be less than 100 ms.

## Sideload the video filter app

Sideload the video filter app to your tenant in Teams. For more information, see [upload your custom app](../concepts/deploy-and-publish/apps-upload.md). After sideloading, you can use the video filter app to apply filters to videos in Teams meetings.

## Diversity and Inclusion requirements

The following are the guiding principles for defining requirements and app approval process:

1. The brand of Microsoft as a diverse and inclusive company shouldn't be tarnished.
1. The video filters feature should be perceived as diverse and inclusive.
1. The filter app developer should be asked to provide filters only within their area of expertise
1. A filter shouldn't allow dysmorphia. For example, morphing the face, eyes, and nose, to skinnier, fatter, or distorted.
1. A filter shouldn't allow skin smoothing.
1. A filter shouldn't be offensive or contain objectionable content.
1. A filter thumbnail should be inclusive. For example, it shouldn't indicate to the user that only a certain type of person can use this filter.

A filter should cater to only the required types of diversity, and actively avoid touching other types of diversities. The following are the diversity categories video filters:
</br>

# [Category 1](#tab/category-1)

The filter app must cater to at least one type of Category 1 diversity.

   1. A filer app must provide filters across the spectrum for its chosen type of diversity. For example, if the filter app caters to white skin tones, it should also cater to  darker skin tones.

   1. The number of  filters in the diversity category should cater to at least be three filters across the extreme and middle ends of the spectrum. For example, if the filter app caters to skin tone, then the app must have at least one filter for each white, one black and one middle skin tone in the color spectrum.

Here are some examples of category 1 diversity:

* Skin tones

* Gender identity

# [Category 2](#tab/category-2)

A filter app can cater to at least one type of Category 2 diversity.

   1. A filer app must provide filters across the spectrum for its chosen type of diversity. For example, if the filter app caters to hair color, then it should cater to general hair color types such as black, white, grey, red, golden, and so on.

   1. The number of  filters in the diversity category should cater to at least be three filters across the extreme and middle ends of the spectrum.

Here are some examples of category 2 diversity:

* Age

* Hair

* Eyes

# [Category 3](#tab/category-3)

A filter app must avoid a combination of filters related to diversities in Category 3. For example, The filter app can't have filters with the words we, love, and democrats, which is indirectly related to political beliefs.

Here are some examples of category 3 diversity:

* Eyes: Shape and size spectrum
* Ethnicity
* National origin
* Cultural identity
* Physical ability
* Mental ability
* Personal interests
* Education
* Citizenship
* Religious beliefs
* Location
* Familial status
* Relationship status
* Socioeconomic status
* Life experiences
* Job function
* Place of work
* Management status
* Employment status
* Pay type
* Seniority
* Union affiliation
* Political beliefs
* Moral compass
* Outlook on life
* Epistemology
* Any other type not mentioned above

---

## Code sample

|**Sample name** | **Description** | **JavaScript** |
|----------------|-----------------|--------------|
|Teams video app sample| The sample app demonstrates how to create a sample video filter app for Teams meetings. | [View](https://github.com/microsoft/teams-videoapp-sample) |

## Step-by-step guide

Follow the [step-by-step guide](../sbs-video-filter-sample-app.yml) to build a video filter app with JavaScript, which helps you to add filters to videos in teams meetings.

## Next step

> [!div class="nextstepaction"]
> [Apps for Teams meetings and calls](teams-apps-in-meetings.md)

## See also

* [Public developer preview manifest schema for Teams](../resources/schema/manifest-schema-dev-preview.md).
* [Teams client SDK](/javascript/api/@microsoft/teams-js/video?view=msteams-client-js-latest&preserve-view=true)
* [Meeting apps API references](API-references.md)
* [Apps for Teams meetings and calls](teams-apps-in-meetings.md)
