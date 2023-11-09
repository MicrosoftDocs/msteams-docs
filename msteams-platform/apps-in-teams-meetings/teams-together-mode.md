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

Discover a new way to collaborate with Custom Together Mode scenes in Microsoft Teams. Custom Together Mode digitally combines participants into a single virtual scene, create an immersive and engaging environment. Following are the benefits of Custom Together Mode:

* Bring people together and encourage them to turn on their video.
* Combine participants digitally into a single virtual scene.
* Place the participant's video streams in predetermined seats designed and fixed by the scene creator.

> [!NOTE]
> Customer Together Mode scenes for Teams meetings are available in preview. Teams users need the [Teams Premium license](/microsoftteams/enhanced-teams-experience) to use Custom Together Mode after the preview.

Get started and transform your Teams meetings with Custom Together Mode scenes.

## Prerequisites

Before you start, you must be familiar with the following prerequisites:

* Scene and assign seats in a scene.
* Microsoft Developer account and familiarity with the [Teams Developer Portal](../concepts/build-and-test/teams-developer-portal.md).
* [Upload your app in Teams](../concepts/deploy-and-publish/apps-upload.md).

Ensure that the administrator has granted permission to [upload a custom app](../concepts/deploy-and-publish/apps-upload.md#upload-your-app) and select all filters as part of app setup and meeting policies respectively.

## Custom Together Mode scene

Custom Together Mode scene is an artifact and you can create a scene using Microsoft Scene studio. Participants have seats with video streams in a conceived scene setting, and the videos are rendered in those seats. A scene only app is still an app in Teams and we recommended to use scene only apps for better experience. Scene studio handles the app package creation in the background. Multiple scenes in a single app package appear as a flat list to the users.

:::row:::
      :::image type="content" source="../assets/images/apps-in-meetings/build-scene.png" alt-text="Build a scene using the Scene studio." link="~/apps-in-teams-meetings/teams-together-mode.md#build-a-scene-using-the-scene-studio" border="false":::
      :::image type="content" source="../assets/images/apps-in-meetings/test-scene.png" alt-text="Test your scene in Teams." link="~/apps-in-teams-meetings/teams-together-mode.md#test-custom-together-mode-scenes-in-teams" border="false":::
      :::image type="content" source="../assets/images/apps-in-meetings/share-screen.png" alt-text="Share your scene using the Scene studio." link="~/apps-in-teams-meetings/teams-together-mode.md#share-a-scene-using-the-scene-studio" border="false":::
:::row-end:::

> [!NOTE]
> Users can't initiate Custom Together Mode on a mobile. However, if they join a meeting through mobile and Together Mode is enabled on desktop, their mobile video will appear in Together Mode on desktop.

## Best practices to create a scene

To create a best scene, ensure that you follow the following practices:

* All images must be in PNG format.
* The final package with all the images put together mustn't exceed 1920 x 1080 resolution. The resolution is an even number. This resolution is a requirement for scenes to be shown successfully.
* The maximum scene size doesn't exceed 10 MB.
* The maximum size of each image doesn't exceed 5 MB. A scene is a collection of multiple images. This limit is for each individual image.
* Select **Transparent** checkbox available on the right panel when an image is selected for overlapping images to indicate that they're overlapping images in the scene.

## Build a scene using the Scene studio

You can build a scene using [MicrosoftScenes Studio](https://dev.teams.microsoft.com/scenes) in Teams Developer Portal. A scene in the context of the Scene studio contains the following elements:

* Seats reserved for meeting organizer and meeting presenters. The presenter doesn't refer to the user who is actively sharing. For more information, see [meeting role](https://support.microsoft.com/office/roles-in-a-teams-meeting-c16fa7d0-1666-4dde-8686-0a0bfe16e019).

* Seat and image for each participant with an adjustable width and height.

* Seat and image XYZ coordinates.

* Collection of images that are camouflaged as one image.

The following image shows each seat represented as an avatar in a scene:

:::image type="content" source="../assets/images/apps-in-meetings/scene-design-studio.png" alt-text="Screenshot shows seven avatars representing the participants in the scene studio.":::

To build a scene using the Scene studio in Teams Developer Portal, follow these steps:

1. Go to [Scenes studio - Teams Developer Portal](https://dev.teams.microsoft.com/scenes).

1. Select **Create a new scene**.

1. Select **Blank Scene** template from the window.

   You can select any template of your choice. **Blank Scene** allows you to create custom scenes.

    :::image type="content" source="../assets/images/apps-in-meetings/scene-template.png" alt-text="Screenshot shows the choices of templates for a scene in the scene studio.":::

1. In **Scene Name**, enter a name for the scene.

    You can select **Close** to toggle between closing or reopening the right pane.
   You can zoom in or zoom out of the scene using the zoom bar for a better view of the scene.

1. To add the image to the environment, select **Add images**.

    :::image type="content" source="../assets/images/apps-in-meetings/addimages.png" alt-text="Screenshot shows the Add images option highlighted in red in the scene studio.":::

1. Select **Choose File**.
1. Select the image you need to add in the scene.

1. From the right pane, select an alignment for the image or use **Resize** to adjust the image size.

    :::image type="content" source="../assets/images/apps-in-meetings/image-alignment.png" alt-text="Screenshot shows the Resize option highlighted in red to align the image in a scene studio.":::

1. Select an area outside of the image to view the **Layers** in the upper-right pane.
1. In **Layers** pane, select **Participants**.

1. Select the number of participants for the scene from the **Number of participants** box and select **Add**.

   You can drag the images of the participants around the scene and place them in the required position. You can resize them using the resize arrow. After the scene is shipped, the avatar placements are replaced with actual participant's video streams.

1. Select any participant image and select **Assign Spot** to assign the spot to the participant.

1. Select **Meeting Organizer** or **Presenter** role for the participant.
   In a meeting, one participant must be assigned the role of a meeting organizer:

    :::image type="content" source="../assets/images/apps-in-meetings/assign-spot.png" alt-text="Screenshot shows the Assign spot check box for the participant 3 in the scene studio.":::

1. Select **Save > View in Teams** to quickly test your scene in Teams.
   A scene only app and is created and you can view the app and app package .json file in  **Apps** page in the Teams Developer Portal. You can test and try out scenes from the Scene studio. A screen opens in your Teams to add the scene app you've created.

1. Select **Add**.

    :::image type="content" source="../assets/images/apps-in-meetings/launchtogethermode.png" alt-text="Screenshot shows the custom scene launched in a Teams meeting.":::

### Elements of a scene

A scene consists of bitmap images, sprites, and rectangles to put participant videos in the Custom Together mode. The following are the elements of a scene:

|Value|Description|
|---|---|
| **Scene:** | Each scene has a unique ID and name. A scene.json file along with the images indicate the exact position of the seats. The scene.json file also contains information on all the assets used for the scene. |
| **Asset:** | Each asset contains a filename, width, height, and position on the X and Y-axis. |
| **Participants:** | Each participant has their own video feed, which is segmented to render only the foreground. Custom Together Mode scenes support **ZoomIn** in on the current meeting participants. |
| **Seat:** | Each seat contains a seat ID, width, height, and position on the X and Y-axis. The seating order is automatically generated and is altered according to preference. The seating order number corresponds to the order of people joining the call. |

Ensure to go through the following list while creating a scene:

|Value|Description|
|---|---|
| Sprite | A Sprite is a static bitmap image positioned in the world. These sprites and participant boxes are defined in a world coordinate system. |
| **X**-axis | The X-axis points to the right. |
| **Y**-axis | The Y-axis points downwards. |
| `zOrder` | The `zOrder` represents the order of placing images and seats along the Z-axis. It gives a sense of depth or partition if necessary. It determines the position of the sprite See the step-by-step getting started sample. The sample uses the `zOrder`. |

For more information, see [example](#example).

## Test Custom Together Mode scenes in Teams

Before you start, you must create a new Teams meeting to test and launch Custom Together Mode scenes in Teams.

> [!NOTE]
>
> You can apply a Custom Together Mode scene that is deployed by your tenant admin only if you've a [Teams Premium license](/MicrosoftTeams/enhanced-teams-experience?branch=danismith-t-pre-licensing).

Join the Teams meeting and follow the steps to test the Custom Together Mode:

1. In Teams meeting window, select **View** and select **Together Mode** from the drop-down list.

1. In the **Select a scene** window, select the scene you've added to Teams from Scene studio.

1. Select **Assign seats** to assign specific seats for meeting participants.

1. In the **Select a participant** section, from **In this meeting**, select the participant and in  the **Choose a seat** section, select a seat for the participant.

1. Select **Assign**.

1. Select **Apply**. Teams installs the app for the user and applies the scene.

    Optionally, the meeting organizer and presenter can select **View** > **Change scene** in the meeting.

    >[!NOTE]
    > Only one scene is used uniformly for the entire meeting. If a presenter or organizer changes the scene, it changes for everyone. Participants can switch in or out of Custom Together Mode scenes individually, but when using Custom Together Mode scenes, all participants share the same scene.

1. The meeting organizer and presenter can select **View** > **Change scene** in the meeting to select any existing scene available.

## Share a scene using the Scene studio

You can view the scene you've created in the **Your scenes** section of **Scene studio**. Additionally, you can share and export the scene.

To share a scene, follow the steps:

1. From the **Save** drop-down menu, select **Share**.

1. In **Share the scene app** window, select **Share Test together mode with everyone** toggle to create a shareable link of your scenes to share for others to use.

1. **Copy** the link.

    The user can open the link to install the scene and start using it. After preview, the scene is shipped as an app to Teams by following the steps for app submission. This step requires the app package. For the scene that is designed, the app package is different from the scene package. The app package created automatically is found in the **Apps** section in the Teams Developer Center. </br>

To export a scene, Follow the steps:

1. In Scene studio, in the upper-right corner, select **Save**.
1. Select **Export** from the dropdown list to retrieve the scene package.
   A .zip file, which is the scene package, is downloaded. The Scene package includes a scene.json and the PNG assets used to build a scene. The scene package is reviewed for incorporating other changes. </br>

   :::image type="content" source="../assets/images/apps-in-meetings/build-a-scene.png" alt-text="Screenshot shows the Export option to export a scene.":::

To delete a scene you created, select **Delete scene**.

### Import and share a scene package

You can share the scene package, which is a .zip file retrieved from the Scene studio to other creators to further enhance the scene.

1. Select **Import a scene**.

   :::image type="content" source="../assets/images/apps-in-meetings/scene-zip-file.png" alt-text="Screenshot shows the Import a scene option highlighted in red in the scene studio.":::

1. Select the scene package file you wish to import.
   This functionality helps you to unwrap a scene package and enhance the scene.

## Example

The following sample demonstrates a complex scene that utilizes the Z-axis:

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

## See also

* [Apps for Teams meetings](teams-apps-in-meetings.md)
* [Calls and meetings bots](~/bots/calls-and-meetings/calls-meetings-bots-overview.md)
* [Real-time media calls and meetings with Microsoft Teams](~/bots/calls-and-meetings/real-time-media-concepts.md)
