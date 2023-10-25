---
title: Custom Together Mode Scenes
author: surbhigupta
description: Work with custom Together Mode scenes
ms.topic: conceptual
ms.localizationpriority: high
ms.author: v-ypalikila
ms.date: 04/07/2022
---

# Custom Together Mode scenes in Teams

Discover a new way to collaborate with Custom Together Mode scenes in Microsoft Teams. This feature digitally combines participants into a single virtual scene, creating an immersive and engaging environment with the following actions:

* Bring people together and encourage them to turn on their video.
* Combine participants digitally into a single virtual scene.
* Place the participants' video streams in predetermined seats designed and fixed by the scene creator.

> [!NOTE]
> Customer Together Mode scenes for Teams meetings are available in preview. Teams users need the [Teams Premium license](/microsoftteams/enhanced-teams-experience) to use this feature after the preview.

Get started now and transform your Teams meetings with Custom Together Mode scenes.

## Prerequisites

Before you start, ensure that you've a basic understanding of the following:

* Define a scene and assign seats in a scene.
* Create a Microsoft Developer account and familiarity with the [Teams Developer Portal](../concepts/build-and-test/teams-developer-portal.md).
* Understand the [concept of app sideloading](../concepts/deploy-and-publish/apps-upload.md).
* Ensure that the administrator has granted permission to [upload a custom app](../concepts/deploy-and-publish/apps-upload.md#upload-your-app) and select all filters as part of app setup and meeting policies respectively.

## Custom Together Mode scene

In custom Together Mode scenes, the scene is an artifact. The scene developer creates a scene using Microsoft Scene studio. In a conceived scene setting, participants have seats with video streams. The videos are rendered in those seats. It's recommended to use scene only apps for better experience.

:::row:::
      :::image type="content" source="~/assets/images/apps-in-meetings/build-scene.png" alt-text="Build a scene using the Scene studio." link="~/apps-in-teams-meetings/teams-together-mode.md#build-a-scene-using-the-scene-studio" border="false":::
      :::image type="content" source="~/assets/images/apps-in-meetings/test-scene.png" alt-text="Test your scene in Teams." link="~/apps-in-teams-meetings/teams-together-mode.md#test-custom-together-mode-scenes-in-teams" border="false":::
      :::image type="content" source="~/assets/images/apps-in-meetings/share-screen.png" alt-text="Share your scene using the Scene studio." link="~/apps-in-teams-meetings/teams-together-mode.md#share-a-scene-using-the-scene-studio" border="false":::
:::row-end:::

A scene only app is still an app in Teams. Scene studio handles the app package creation in the background. Multiple scenes in a single app package appear as a flat list to the users.

> [!NOTE]
> Users can't initiate Together Mode from mobile. However, after a user joins a meeting through mobile and Together Mode is turned on from desktop, the mobile users who have turned on the video, will appear in Together Mode on desktop.

## Best practices for creating a scene

Consider the following practices for best scene building experience:

* Ensure that all images are in PNG format.
* Ensure that the final package with all the images put together mustn't exceed 1920 x 1080 resolution. The resolution is an even number. This resolution is a requirement for scenes to be shown successfully.
* Ensure that the maximum scene size is 10 MB.
* Ensure that the maximum size of each image is 5 MB. A scene is a collection of multiple images. This limit is for each individual image.
* Select **Transparent** as required. This checkbox is available on the right panel when an image is selected. Ensure to mark **Transparent** for overlapping images to indicate that they're overlapping images in the scene.

## Build a scene using the Scene studio

Microsoft Scene studio allows you to build scenes. It's available on [Scenes Editor - Teams Developer Portal](https://dev.teams.microsoft.com/scenes). This document refers to Scene studio in the Teams Developer Portal. A scene in the context of the Scene studio contains the following elements:

* Seats reserved for meeting organizer and meeting presenters. The presenter doesn't refer to the user who is actively sharing. For more information, see [meeting role](https://support.microsoft.com/office/roles-in-a-teams-meeting-c16fa7d0-1666-4dde-8686-0a0bfe16e019).

* Seat and image for each participant with an adjustable width and height.

* Seat and image XYZ coordinates.

* Collection of images that're camouflaged as one image.

The following image shows each seat represented as an avatar for building the scenes:

:::image type="content" source="~/assets/images/apps-in-meetings/scene-design-studio.png" alt-text="Screenshot shows seven avatars representing the participants in the scene studio.":::

To build a scene using the Scene studio, follow these steps:

1. Go to [Scenes Editor - Teams Developer Portal](https://dev.teams.microsoft.com/scenes).

    Alternately, you can open **Scene studio** from the home page of [Teams Developer Portal](https://dev.teams.microsoft.com/home) through any of the following step:
    * Select **Create custom scenes for meetings**.
    * On the left pane, select **Tools** and select **Scene studio**.

1. In **Scenes studio**, select **Create a new scene**.

1. Select **Blank Scene** template from the window to create custom scene.
   You can select any template of your choice. **Blank Scene** allows you to create custom scenes.

:::image type="content" source="~/assets/images/apps-in-meetings/scene-template.png" alt-text="Screenshot shows the choices of templates for a scene in the scene studio.":::

1. In **Scene Name**, enter a name for the scene.

   You can select **Close** to toggle between closing or reopening the right pane.
   You can zoom in or zoom out of the scene using the zoom bar for a better view of the scene.

1. To add the image to the environment, select **Add images**.

   :::image type="content" source="~/assets/images/apps-in-meetings/addimages.png" alt-text="Screenshot shows the Add images option highlighted in red in the scene studio.":::

1. Select the image that you've added.

1. From the right pane, select an alignment for the image or use **Resize** to adjust the image size.

    :::image type="content" source="~/assets/images/apps-in-meetings/image-alignment.png" alt-text="Screenshot shows the Resize option highlighted in red to align the image in a scene studio.":::

1. Select an area outside of the image.

1. In the upper-right corner, under **Layers**, select **Participants**.

1. Select the number of participants for the scene from the **Number of participants** box and select **Add**. After the scene is shipped, the avatar placements are replaced with actual participant's video streams. You can drag the images of the participants around the scene and place them in the required position. You can resize them using the resize arrow.

1. Select any participant image and select **Assign Spot** to assign the spot to the participant.

1. Select **Meeting Organizer** or **Presenter** role for the participant. In a meeting, one participant must be assigned the role of a meeting organizer:

   :::image type="content" source="~/assets/images/apps-in-meetings/assign-spot.png" alt-text="Screenshot shows the Assign spot check box for the participant 3 in the scene studio.":::

1. Select **Save** and select **View in Teams** to quickly test your scene in Teams.

    * Selecting **View in Teams** automatically creates a Teams app that can be viewed in the **Apps** page in the Teams Developer Portal.
    * Selecting **View in Teams** automatically creates an app package that is appmanifest.json in the background. You can go to  **Apps** from the menu and access the created app package. This is the model for a developer to test and try out scenes from the Scene studio. After a scene is exported and sideloaded as a custom app, users can view the scenes in the scene gallery.

1. Select **View in Teams**, in the dialog box that appears select **Add**.

    To test or access the scene, create a test meeting, and launch custom Together Mode scenes. For more information, see [test custom Together Mode scenes in Teams](#test-custom-together-mode-scenes-in-teams).

     :::image type="content" source="~/assets/images/apps-in-meetings/launchtogethermode.png" alt-text="Screenshot shows the custom scene launched in a Teams meeting.":::

## Test custom Together Mode scenes in Teams

> [!NOTE]
>
> You can apply a custom Together Mode scene that is deployed by your tenant admin only if you've a [Teams Premium license](/MicrosoftTeams/enhanced-teams-experience?branch=danismith-t-pre-licensing).

You must create a new Teams meeting to test the scene in Teams.

To select scenes and use custom Together Mode scenes, join the Teams meeting and do the following steps:

1. In Teams meeting window, select **View** and select **Together Mode** from the drop-down list.

1. In the **Select a scene** window, select the scene you've added to Teams from Scene studio.

1. Select **Assign seats** if you want to assign specific seats for meeting participants.
    1. .In the **Select a participant** section, from **In this meeting**, select the participant and in  the **Choose a seat** section, select a seat for the participant.
    1. Select **Assign**.

1. Select **Apply**. Teams installs the app for the user and applies the scene.

    Optionally, the meeting organizer and presenter can select **View** > **Change scene** in the meeting.

    >[!NOTE]
    > At any time, only one scene is used homogeneously for the meeting. If a presenter or organizer changes a scene, it  changes for all. Switching in or out of custom Together Mode scenes is up to individual participants, but while in custom Together Mode scenes, all participants have the same scene.

1. The meeting organizer and presenter can select **View** > **Change scene** in the meeting to select any existing scene available.

## Share a scene using the Scene studio

You can view the scene you've created in the **Your scenes** section of **Scene studio**. Additionally, you can share and export the scene.

### Share

1. From the **Save** drop-down menu, select **Share**.

1. In **Share the scene app** window, select **Share Test together mode with everyone** toggle to create a shareable link of your scenes to share for others to use.

1. **Copy** the link.

    The user can open the link to install the scene and start using it. After preview, the scene is shipped as an app to Teams by following the steps for app submission. This step requires the app package. For the scene that is designed, the app package is different from the scene package. The app package created automatically is found in the **Apps** section in the Teams Developer Center. </br>

### Export

From the **Save** drop-down menu, select **Export** to retrieve the scene package. A .zip file, which is the scene package, is downloaded. The Scene package includes a scene.json and the PNG assets used to build a scene. The scene package is reviewed for incorporating other changes. </br>

:::image type="content" source="~/assets/images/apps-in-meetings/build-a-scene.png" alt-text="Screenshot shows the Export option to export a scene.":::

To delete a scene you created, select **Delete scene** on the top bar.

## Sample

The step-by-step getting started sample demonstrates a complex scene that utilizes the Z-axis. The following code is a scene.json sample:

```json
{
   "protocolVersion": "1.0",
   "id": "A",
   "autoZoom": true,
   "mirrorParticipants ": true,
   "extent":{
      "left":0.0,
      "top":0.0,
      "width":16.0,
      "height":9.0
   },
   "sprites":[
      {
         "filename":"background.png",
         "cx":8.0,
         "cy":4.5,
         "width":16.0,
         "height":9.0,
         "zOrder":0.0,
   "isAlpha":false
      },
      {
         "filename":"table.png",
         "cx":8.0,
         "cy":7.0,
         "width":12.0,
         "height":4.0,
         "zOrder":3.0,
   "isAlpha":true
      },
      {
         "filename":"row0.png",
         "cx":12.0,
         "cy":15.0,
         "width":8.0,
         "height":4.0,
         "zOrder":2.0,
   "isAlpha":true
      }

   ],
   "participants":[
      {
         "cx":5.0,
         "cy":4.0,
         "width":4.0,
         "height":2.25,
         "zOrder":1.0,
         "seatingOrder":0
      },
      {
         "cx":11.0,
         "cy":4.0,
         "width":4.0,
         "height":2.25,
         "zOrder":1.0,
         "seatingOrder":1
      }
   ]
}
```

A scene consists of bitmap images, sprites, and rectangles to put participant videos in the Custom together mode. The following table contains the values and description of a scene:

|Value|Description|
|---|---|
| Sprite | A Sprite is a static bitmap image positioned in the world. These sprites and participant boxes are defined in a world coordinate system. |
| **X**-axis | The X-axis points to the right. |
| **Y**-axis | The Y-axis points downwards. |
| `zOrder` | The `zOrder` represents the order of placing images and seats along the Z-axis. It gives a sense of depth or partition if necessary. It determines the position of the sprite See the step-by-step getting started sample. The sample uses the `zOrder`. |

Ensure to go through the following list while creating a sample scene:

**Scene:** Each scene has a unique ID and name. A scene.json file along with the images indicate the exact position of the seats. The scene.json file also contains information on all the assets used for the scene.

**Asset:** Each asset contains a filename, width, height, and position on the X and Y-axis.

**Participants:** Each participant has its own video feed, which is segmented to render only the foreground.  Custom Together Mode scenes support **ZoomIn** in on the current meeting participants.

**Seat:** Each seat contains a seat ID, width, height, and position on the X and Y-axis. The seating order is automatically generated and is altered according to preference. The seating order number corresponds to the order of people joining the call.

Now that you've gone through the sample scene.json file, you can use the custom Together Mode scenes to engage in scenes.

## Open a custom Together Mode scenes Scene package

You can share the Scene package, which is a .zip file retrieved from the Scene studio to other creators to further enhance the scene. The **Import a scene** functionality helps unwrap a scene package to let the creator continue building the scene.

:::image type="content" source="~/assets/images/apps-in-meetings/scene-zip-file.png" alt-text="Screenshot shows the Import a scene option highlighted in red in the scene studio.":::

## See also

* [Apps for Teams meetings](teams-apps-in-meetings.md)
* [Calls and meetings bots](~/bots/calls-and-meetings/calls-meetings-bots-overview.md)
* [Real-time media calls and meetings with Microsoft Teams](~/bots/calls-and-meetings/real-time-media-concepts.md)
