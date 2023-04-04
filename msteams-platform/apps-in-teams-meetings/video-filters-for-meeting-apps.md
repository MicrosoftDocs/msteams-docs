---
title: Video filters for meeting apps
author: v-ypalikila
description: Learn how to add filters, frames, and so on, to videos and make your videos more presentable for meetings.
ms.topic: conceptual
ms.localizationpriority: medium
ms.author: v-ypalikila
ms.date: 08/08/2022
---

# Video filters for meeting apps

> [!NOTE]
> Video filter is currently available only in [public developer preview](../resources/dev-preview/developer-preview-intro.md). You must be part of the public developer preview for Microsoft Teams to use the video filters.

As online meetings have become more prominent, Teams users spend significant amount of time reviewing work, watching videos, and collaborating with teammates on video calls. Considering this, Microsoft Teams provides an immersive and engaging meeting experience with video filters.

Users can use the video filter app in the meeting lobby and in-meeting scenarios and easily apply video effects in all meetings and calls. Teams supports filters, frames, and so on, to make your meeting experience more presentable.

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

Before you begin, ensure the following:
* You must have a basic understanding of [Formats for video rendering](/windows/win32/medfound/recommended-8-bit-yuv-formats-for-video-rendering).
* [Install Microsoft Teams JavaScript SDK](https://github.com/OfficeDev/microsoft-teams-library-js)

## Install the JavaScript SDK

The [Microsoft Teams JavaScript SDK](https://www.npmjs.com/package/@microsoft/teams-js) is a JavaScript package published on [npm](https://www.npmjs.com/package/@microsoft/teams-js/v/2.0.0), and you can download through npm or Yarn.

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


The video filter app defines the video filter and applies it to the user's video stream. To enable video filter experience for your app:

1. [Create the video filter app](#create-the-video-filter-app).

1. [Validate your app package](#validate-your-app-package).

1. [Congigure the video filter app](#configure-the-video-filter-app).

1. [Upload the video filter app](#upload-the-video-filter-app).

## Create the video filter app

An app package describes how your app is configured and includes the app manifest file, color icon, and outline icon. [Create a Teams app package](../concepts/build-and-test/apps-package.md) to build and run your application in Teams.

To use video filters for Teams meetings, update your app manifest and use the `videoFilters` property to determine the filter name, category name, and filter thumbnail image.

### Update app manifest

>[!NOTE]
> Update your app manifest as per the [public developer preview manifest schema for Teams](../resources/schema/manifest-schema-dev-preview.md).

The meeting app capability for video filters is defined in your app manifest using the `videoFilters` object. You must configure your Teams app manifest with the resource specific consent (RSC) permissions for your app to access the video stream and video extensibility APIs.

The following is an example of a manifest for a video filter app:

```json
{
"$schema": "https://raw.githubusercontent.com/OfficeDev/microsoft-teams-app-schema/preview/DevPreview/MicrosoftTeams.schema.json",
  "manifestVersion": "devPreview", // Required for meetingExtensionDefinition for sideloading. Will have a published version 1.10
  "id": "your_app_guid", // Newly generated GUID
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
  "validDomains": [ "your_domain_of_videoFiltersConfigurationUrl" ], // The domain for videoFiltersConfigurationUrl, Example: videoapp.microsoft.com
  "meetingExtensionDefinition": {
    "videoFilters": [ // for showing video filters inside of video effects quick picker section.
      {
        "id": "310a65de-24ce-445e-9e1e-dd4ef0f0114b", // GUID
        "name": "Category_FilterA", // Category should be your brand name
        "thumbnail": "PreviewEffect.png" // A relative path to the video filter thumbnail.png
      }
    ],
    // The Video app web page url for both processing the video frames and customization experience. The domain should be one of **validDomain**.
    "videoFiltersConfigurationUrl": "your_videofilters_configuration_url" // Example: https://videoapp.microsoft.com/Teams-VideoApp-example/app/configure.html
  }
}
```

Ensure that you adhere to the following requirements to update the app manifest:

* Each `videoFilters` property has a non-empty GUID, and the GUID is unique for the `meetingExtensionDefinition` property.

* The number of video filters for an app is limited to 32.

* The maximum size for a video filter thumbnail image size is 2 MB.

* The `videoFiltersConfigurationUrl` property isn't empty.

* The thumbnail image file resolution should match 74 x 42 pixels of the viewport. The absolute value must be less than 0.01.

* The value of each video filter's thumbnail is a valid path to a file in the PNG format as 24-bit RGB or 32-bit RGBA.

* Supported thumbnail image RawFormat is PNG.

* Supported thumbnail image PixelFormat is PixelFormat24bppRGB or PixelFormat32bppARGB.

* Video Filter categories for 3P apps:
   * Category name should be your brand name.

* Use descriptive terms as the filter name to best reflect the effect. Avoid using offensive words that don't conform with Microsoft’s value of inclusivity.

  * It's recommended to keep the total filter and app name word counts within 12 to 16 characters, and not more than 20 characters for a better user experience.

  * When you hover over the filter, the tooltip must display the text **[Filter name] from [Developer name]**. For example, Island Style from Contoso.

  * After applying a filter, the hover over text on the filter's more icon (**...**) must display the text **Open [App name]**. For example, Open Contoso.

  * Add the filter categories as a prefix to the filter name. For example, **[Brand name]_[Filter name]**.

## Validate your app package

After you've completed updating the app manifest, you can validate your app package using Teams Developer Portal.

To validate your app package using Teams Developer Portal:

1. Go to [Developer Portal](https://dev.teams.microsoft.com/home).
1. From the left pane, select **Apps** > **Import app**.
1. Upload the manifest.zip file.
1. In the app overview page, under Teams store validation, select **View details**.

The app validation tool checks your app package against the test cases that Microsoft uses to review your app. Resolve errors or warnings and read the App submission checklist.

:::image type="content" source="../assets/images/apps-in-meetings/video-filter-app-validation.png" alt-text="Screenshot of app validation details for an app package in Teams Developer Portal.":::

> [!NOTE]
> You can also validate your app using the [App Validator](https://dev.teams.microsoft.com/appvalidation.html) website.

---

## Configure the video filter app

You can configure your app to fetch the user's video stream during the meeting lobby and in-meeting experience. The `videoFiltersConfigurationUrl` hosts the code where the video extensibility callbacks are registered.

**Guidelines to use the Video extensibility API**

Ensure that you implement the following guidelines to use the video extensibility APIs:

* The video frame related data, including any raw video frame and any data calculated from the video frame, must only be consumed in user's local computer, and shouldn't be uploaded to the network.

* Only NV12 video format is supported. RGB(A) isn't supported. The [sample app](#code-sample) has provided sample code for the video format conversion between NV12 and RGB(A).

* The JavaScript in the video app must only operate on the latest videoFrame. References to previous video frames can result in unexpected behavior.

* The video frame size can change anytime, so size sensitive resources for processing the video frames should be recreated when the video frame size changes.

* Call `registerForVideoEffect()` as early as possible. Call `registerForVideoFrame()` after the required resources are downloaded and the video app initialization is finished.

* Ensure the stability of the effect algorithm. When calling `notifyVideoFrameProcessed`, ensure that the video frame is fully processed even if the algorithm crashes. When using a video app, users will be surprised if they see a video frame without the effect.

* The Video filter app must be compliant to [Teams client SDK terms of use](/legal/microsoft-apis/terms-of-use).

* Ensure that the video filter app meets the following performance requirements:
  * The Video frame processing time must be less than 30 ms.
  * The Video app loading time must be less than four seconds.
  * App Size must be less than 20 MB.
  * Memory size must be less than 150 MB.
  * Latency must be less than 100 ms.

Teams client loads the index.html file, which runs the code available in the index.js file.

Following is an example of the `index.html` file:

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

You can use the video extensibility APIs to access the video stream of the user and get notified when a user has selected and applied a video filter. Use the following API methods in the `index.js` file to trigger the video filter app:

* **Get the selected effect and notify**: Call the `registerForVideoEffect` function to get the selected effect in Teams client and notify the video extension that the new effect will be applied. The `VideoEffectCallBack` function updates the local state with the current selected effectId.

  Following code snippet is an example of  `registerForVideoEffect` method:

  ```typescript
  function registerForVideoEffect(callback: VideoEffectCallBack)
  
  type VideoEffectCallBack = (effectId: string | undefined) => void,
  
  ```

* **Get and return video frames**: Call the `registerForVideoFrame` function to get the video frames from video pipeline, return the processed video frames from video pipeline and notify errors. The `VideoFrameCallback` function registers and processes the video frame.

  Following code snippet is an example of the `registerForVideoFrame` method:

  ```typescript
   // import video module from sdk

  import { video } from "@microsoft/teams-js";

  // The video frame handler for sampleEffect1

  function sampleEffectHandler1(videoFrame) {
      // process the video frame with sampleEffect1

  }

  // The video frame handler for sampleEffect2

  function sampleEffectHandler2(videoFrame) {

      // process the video frame with sampleEffect2

  }
  function videoFrameHandler(videoFrame, notifyVideoProcessed, notifyError) {
    // selectedEffectId is the effect id that is used currently in video app
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
    //send notification that the effect processing is finished.
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

* **Notify the effect change**: Call the `notifySelectedVideoEffectChanged` function to notify the teams client that a different effect is selected by the users in the video app. Teams client invokes the callback registered through registerForVideoEffect to tell the video app to apply the current selected effect.

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

## Upload the video filter app

You can upload the video filter app to your organization's store or publish the app directly to the Microsoft Teams store.

1. Upload the video filter app to your organization's store:

   1. Go to Teams.
   1. Select **Apps** > **Manage your apps** and **Upload an app**.
   1. Select **Submit an app to your org**.
   1. Select your app manifest package. The video filter app is submitted to your IT admin for approval.

1. Upload the video filter app to the Microsoft Teams store:

   * If you're creating an app for a **Non-EDU tenant**, you can directly [publish your app to the Microsoft Teams store](../concepts/deploy-and-publish/appsource/publish.md).

   * If you're creating an app for an **EDU tenant**, follow these steps:

     1. Create a new version of the app.

     1. Update the `applicableLicenseCategories` property in the app manifest with `EducationStudent` and `EducationTeacher` as it's value.

        The following is example of an app manifest with the `applicableLicenseCategories` property:

        :::image type="content" source="../assets/images/apps-in-meetings/video-filters-edu-tenant-manifest.png" alt-text="Screenshot shows an example of app manifest with applicableLicenseCategories property." lightbox="../assets/images/apps-in-meetings/video-filters-edu-tenant-manifest.png":::

     1. [Publish your app to the Microsoft Teams store](../concepts/deploy-and-publish/appsource/publish.md).

## Diversity and Inclusion requirements

The following are the diversity and inclusion requirements:

### App level

* The video effects app developer should provide effects only within their area of expertise.
* The video effects should be as diverse and inclusive as possible.
* The video effects app must provide effects across the spectrum of gender identity and equally distributed.
* The video effects app must provide effects across the spectrum of skin tones

### Effect level

* The effect shouldn't allow dysmorphia.
* The effect shouldn't be offensive or contain objectionable content.

The requirements in this section are also valid for video effect thumbnails.

## Permissions

Microsoft Teams will request additional permission and consent (over and above usual permissions) from the user of your filter app, at the time of app installation. The language of the consent is as follows:

* You consent to have < App Developer Name >, the provider of < App Name >, process and analyze data about your facial features to provide overlays, filters, and similar technologies based on your image. < App Name > will keep this data, which may include biometric data, in accordance with its privacy policy. Unless Microsoft is the provider, Microsoft does not process, collect, or retain the data about your image processed by < App Name >.

You are responsible, as the app owner and publisher, to determine whether additional notices or consents are required in your app experience to meet your obligations under the Publisher Agreement---including but not limited to those obligations triggered by collection or processing of data that is or could be characterized as biometric data under applicable Data Protection Law.

## Code sample

|**Sample name** | **Description** | **JavaScript** |
|----------------|-----------------|--------------|
|Teams video app sample| The sample app demonstrates how to create a sample video filter app for Teams meetings. | [View](https://github.com/microsoft/teams-videoapp-sample) |

<!--- New samples created by Prithiv's team. However, the samples branch will change once they are merged into main. Once the feature is public, we will merge them.

Need to update the link after the sample are pushed lived. -->

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
