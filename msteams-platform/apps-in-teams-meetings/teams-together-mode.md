---
title: Custom Together Mode Scenes
author: surbhigupta
description: Learn how to work with custom Together Mode scenes in Microsoft Teams, build scene using Scene studio, share scene using Scene studio, and its sample.
ms.topic: conceptual
ms.localizationpriority: high
ms.author: surbhigupta12
ms.date: 04/07/2022
---

# Custom Together Mode scenes in Teams

> [!NOTE]
>
> * Custom Together Mode scenes for Teams meetings are available in [public developer preview](../resources/dev-preview/developer-preview-intro.md).
> * Teams users need the [Teams Premium license](/microsoftteams/enhanced-teams-experience) to use Custom Together Mode after the preview.

Collaborate in a new way with Custom Together Mode scenes in Microsoft Teams. Custom Together Mode creates an immersive and engaging environment by digitally combining participants into a single virtual scene. The benefits of Custom Together Mode are as follows:

* Bring people together and encourage them to turn on their video.
* Combine participants digitally into a single virtual scene.
* Place the participant's video stream in predetermined seat designed and fixed by the scene creator.

Get started and transform your Teams meetings with Custom Together Mode scenes.

## Custom Together Mode scene

Custom Together Mode scene is an artifact and participants have seats with video streams in a conceived scene setting, and the videos are rendered in those seats. You can create a scene using Microsoft Scene studio. Scene studio handles the app package creation in the background and creates a scene-only app. We recommend you to use scene-only apps for better experience.

> [!NOTE]
  >
  > Users can't initiate Custom Together Mode on mobile devices. However, if they join a meeting through mobile and Together Mode is enabled on desktop, their mobile video appears in Together Mode on desktop.

## Prerequisites

Before you start, you must be familiar with the following prerequisites:

* [Elements of a scene](#elements-of-a-scene)
* [Microsoft Developer account](https://developer.microsoft.com/en-us/microsoft-365/dev-program)
* [Teams Developer Portal](../concepts/build-and-test/teams-developer-portal.md)
* [Upload your app in Teams](../concepts/deploy-and-publish/apps-upload.md)

Ensure that the administrator granted the necessary permissions to [upload a custom app](../concepts/deploy-and-publish/apps-upload.md#upload-your-app). Then, select all filters during the app setup and meeting policies configuration.

## Best practices

To create a best scene, we recommend the following practices:

* Ensure that all images are in PNG format.
* Ensure that the images in final package mustn't exceed 1920 x 1080 resolution. The resolution must be an even number, which is required for scenes to display successfully.
* Ensure that the maximum scene size is within 10 MB.
* Ensure that the maximum size of each image is within 5 MB. A scene is a collection of multiple images. This limit is for each individual image.

:::row:::
      :::image type="content" source="../assets/images/apps-in-meetings/build-scene.png" alt-text="Build scene using Scene studio." link="~/apps-in-teams-meetings/teams-together-mode.md#build-scene-using-scene-studio" border="false":::
      :::image type="content" source="../assets/images/apps-in-meetings/test-scene.png" alt-text="Test Custom Together Mode scenes in Teams." link="~/apps-in-teams-meetings/teams-together-mode.md#test-custom-together-mode-scenes-in-teams" border="false":::
      :::image type="content" source="../assets/images/apps-in-meetings/share-scene.png" alt-text="Share your scene using Scene studio." link="~/apps-in-teams-meetings/teams-together-mode.md#share-scene-using-scene-studio" border="false":::
:::row-end:::

## Build scene using Scene studio

You can build a scene using [Scene Studio](https://dev.teams.microsoft.com/scenes) in Teams Developer Portal. A scene in the context of Scene studio contains the following elements:

### Elements of a scene

A scene consists of bitmap images, sprites, and rectangles to put participant videos in the Custom Together Mode. The following are the elements of a scene:

|Value|Description|
|---|---|
| **Scene** | Each scene has a unique ID and name. A scene.json file along with the images indicate the exact position of the seats. The scene.json file also contains information on all the assets used for the scene. |
| **Asset** | Each asset contains a filename, width, height, and position on the X and Y-axis. |
| **Participants** | Each participant has their own video feed, which is segmented to render only the foreground. Custom Together Mode scenes support **ZoomIn** in on the current meeting participants. |
| **Seat** | Each seat contains a seat ID, width, height, and position on the X and Y-axis. The seating order is automatically generated and is altered according to preference. The seating order number corresponds to the order of people joining the call. |

* Seats reserved for meeting organizer and meeting presenters. The presenter doesn't refer to the user who is actively sharing. For more information, see [meeting role](https://support.microsoft.com/office/roles-in-a-teams-meeting-c16fa7d0-1666-4dde-8686-0a0bfe16e019).

* Seat and image for each participant with an adjustable width and height.

* Seat and image XYZ coordinates.

* Collection of images that are camouflaged as one image.

Ensure to go through the following list while creating a scene:

|Value|Description|
|---|---|
| Sprite | A Sprite is a static bitmap image positioned in the world. These sprites and participant boxes are defined in a world coordinate system. |
| **X**-axis | The X-axis value defines the horizontal alignment of scene image. |
| **Y**-axis | The Y-axis value defines the vertical alignment of scene image. |
| `zOrder` | The `zOrder` represents the order of placing images and seats along the Z-axis. It gives a sense of depth or partition if necessary. It determines the position of the sprite. For more information, see [example](#example). The sample uses the `zOrder`. |

The following images show each participant in a scene and elements of a scene:

:::image type="content" source="~/assets/images/apps-in-meetings/scene-participant.png" alt-text="Screenshot shows representation of participants in a scene in scene studio." lightbox="~/assets/images/apps-in-meetings/scene-participant-view.png":::

:::image type="content" source="~/assets/images/apps-in-meetings/scene-element.png" alt-text="Screenshot shows elements of a scene in scene studio." lightbox="~/assets/images/apps-in-meetings/scene-element-view.png":::

To build a scene using **Scene studio** in Teams Developer Portal, follow these steps:

1. Go to [Scene studio](https://dev.teams.microsoft.com/scenes).

1. Select **Create a new scene**.
   A new window appears to select the templates.

1. From the **Select a template to get started** window, select **Blank Scene** template.

   Alternatively, you can select **Blank Scene** under **Create a scene**.

    :::image type="content" source="~/assets/images/apps-in-meetings/create-new-scene.png" alt-text="Screenshot shows the options to create a new scene in scene studio." lightbox="~/assets/images/apps-in-meetings/create-new-scene-view.png":::

   You can select any template of your choice. **Blank Scene** allows you to create custom scenes.

    :::image type="content" source="../assets/images/apps-in-meetings/scene-template.png" alt-text="Screenshot shows the choices of templates for a scene in scene studio.":::

1. In the **Scene Name** field, enter a name for the scene.

    You can select **Close** to toggle between closing or reopening the right pane.

    :::image type="content" source="~/assets/images/apps-in-meetings/scene-name-toggle.png" alt-text="Screenshot shows the toggle option in scene studio.":::

1. To add the image to the environment, select **Add images**.

1. Select **Choose File**.
1. Select the image you need to add in the scene.
1. Select **Open**.

    :::image type="content" source="../assets/images/apps-in-meetings/add-images.png" alt-text="Screenshot shows the option to add images to the scene in scene studio.":::

    You can zoom in or zoom out of the scene using the zoom bar for a better view of the scene.

1. From the right pane, select an alignment for the image or use **Resize** to adjust the image size.

    :::image type="content" source="../assets/images/apps-in-meetings/image-alignment.png" alt-text="Screenshot shows the resize option to align the image in scene studio.":::

1. From the right pane, select **Transparent** checkbox when an image is selected to indicate that the images are overlapping images in the scene.

1. Select anywhere outside of the image to view the **Layers** in the right pane.
1. In the **Layers** section, select **Participants**.

1. Add the number of participants for the scene from the **Number of participants** box and select **Add**.

    :::image type="content" source="~/assets/images/apps-in-meetings/add-particpant.png" alt-text="Screenshot shows the option to add participants to a scene in scene studio.":::

   You can drag the images of the participants around the scene and place them in the required position. You can resize them using the resize arrow. After the scene is shipped, the participant seat placements are replaced with actual participant's video streams.

1. Select any participant image and select **Assign Spot** to assign role to the participant.

1. Select **Meeting organizer** or **Presenter** role for the participant.

    :::image type="content" source="../assets/images/apps-in-meetings/assign-spot.png" alt-text="Screenshot shows the assign spot check box for the participant 3 in scene studio.":::

    In a meeting, at least one participant must be assigned the role of a meeting organizer.

    :::image type="content" source="~/assets/images/apps-in-meetings/organizer-presenter.png" alt-text="Screenshot shows the assign spot section with information about assigning the spot of meeting organizer.":::

   You can use **Bring forward**, **Send backward**, and **Order** options in the right pane to align the image and participant seats.

1. Select **Save**.
1. Select **View in Teams** to quickly test your scene in Teams.

    :::image type="content" source="~/assets/images/apps-in-meetings/save-view-in-teams.png" alt-text="Screenshot shows the options to save the scene and view in teams.":::

   A scene-only app is created and you can view the app and its `package.json` file in the **Apps** page in Developer Portal. A screen opens in your Teams to add the scene app created.

   > [!NOTE]
   > The app capabilities used by scene-only apps are focused on creating immersive Together Mode scenes. Admins can manage the behavior of scene-only apps through app setup policies in Teams admin center.

1. Select **Preview in Teams**.

    :::image type="content" source="~/assets/images/apps-in-meetings/preview-teams.png" alt-text="Screenshot shows the options to preview the scene in teams.":::

   Teams page appears to add the scene-only app created in Scene studio.

1. Select **Add**.

    :::image type="content" source="~/assets/images/apps-in-meetings/add-in-teams.png" alt-text="Screenshot shows the options to add the scene in teams.":::

## Test Custom Together Mode scenes in Teams

Before you start, you must create a new Teams meeting to test and launch Custom Together Mode scenes in Teams.

> [!NOTE]
> You can apply a Custom Together Mode scene that is deployed by your Teams Administrator only if you've a [Teams Premium license](/MicrosoftTeams/enhanced-teams-experience?branch=danismith-t-pre-licensing).

Join the Teams meeting and follow these steps to test the Custom Together Mode:

1. In Teams meeting window, select **View** > **Together Mode** from the dropdown list.

    :::image type="content" source="~/assets/images/apps-in-meetings/view-together-mode.png" alt-text="Screenshot shows the options select together mode in teams meeting.":::

1. In the **Select a scene** window, select the scene added to Teams from **Scene studio**.

    :::image type="content" source="~/assets/images/apps-in-meetings/select-scene.png" alt-text="Screenshot shows the options to apply together mode in teams meeting.":::

1. Select **Assign seats** to assign specific seats for meeting participants.

1. In the **Select a participant** section, from **In this meeting**, select the participant and in  the **Choose a seat** section, select a seat for the participant.

1. Select **Assign**.

1. Select **Apply**. Teams installs the app for the user and applies the scene.

    Optionally, the meeting organizer and presenter can select **View** > **Change scene** in the meeting to select any existing scene available.

    >[!NOTE]
    > * Only one scene is used uniformly for the entire meeting. If a presenter or organizer changes the scene, it changes for everyone.
    > * Participants can switch in or out of Custom Together Mode scenes individually, but when using Custom Together Mode scenes, all participants share the same scene.

    :::image type="content" source="../assets/images/apps-in-meetings/launch-together-mode.png" alt-text="Screenshot shows the custom scene launched in a Teams meeting.":::

## Share scene using Scene studio

You can view the scene created in the **Your scenes** section of **Scene studio**. Additionally, you can share and export the scene.

To share a scene, follow these steps:

1. From the dropdown next to **Save** button, select **Share**.

    :::image type="content" source="~/assets/images/apps-in-meetings/share-scene-studio.png" alt-text="Screenshot shows the option to share a scene in scene studio.":::

1. In **Share the scene app** window, select **Share Custom Together Mode with everyone** toggle to create a shareable link of your scene.

1. Select **Copy**.

    :::image type="content" source="~/assets/images/apps-in-meetings/share-scene-copy-link.png" alt-text="Screenshot shows the option to copy the link and share a scene in scene studio.":::

1. Open the link copied to install the scene and start using it.
1. Preview the scene.
   The scene is shipped as an app to Teams by following the steps for app submission.
1. Get the app package, which is different from the scene package for the designed scene.
1. Find the automatically created app package in the **Apps** section of the Teams Developer Center.

To export a scene, follow these steps:

1. In **Scene studio**, select the dropdown button next to **Save**.
1. Select **Export** to retrieve the scene package.

   :::image type="content" source="~/assets/images/apps-in-meetings/export-scene-studio.png" alt-text="Screenshot shows the option to export a scene in scene studio.":::

   A zip file containing the scene package is downloaded. This package includes a scene.json file and the PNG assets used to build the scene.

To delete a scene you created, follow these steps:

1. Select **Delete scene**.
1. In the **Delete** window, select **Do you want to delete this app?**.
1. Select **Delete**.

   :::image type="content" source="~/assets/images/apps-in-meetings/delete-scene.png" alt-text="Screenshot shows the option to delete a scene in scene studio.":::

### Import a scene

You can import the scene package, which is a zip file retrieved from **Scene studio** to further enhance the scene.

1. Go to **Scene studio**.
1. Select **Import a scene**.

   :::image type="content" source="~/assets/images/apps-in-meetings/import-scene.png" alt-text="Screenshot shows the option to import a scene in scene studio.":::

1. Select the scene package file you want to import.
   This functionality allows you to unwrap a scene package and enhance the scene.

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
