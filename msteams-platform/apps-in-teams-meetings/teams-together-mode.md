---
title: Together Mode in Teams
description: Work with Together Mode 
ms.topic: conceptual
---

# Together Mode in Teams

Microsoft Teams Together Mode provides an immersive and engaging meeting environment that brings people together and encourages them to turn on their video. It digitally combines participants into a single virtual scene and places their video streams in pre-determined spots designed and fixed by the scene creator.

> [!VIDEO https://www.youtube-nocookie.com/embed/MGsNmYKgeTA]

Scenes in Together Mode is an artifact created by the scene developer using the [Microsoft Scene studio](build-scene-in-scene-studio.md) that brings people together along with their video stream in a creative setting as conceived by the scene creator. In a conceived scene setting, participants have designated seats with video streams rendered in those seats.

>[!NOTE]
> Scene only apps are recommended as the acquisition experience for such apps is more seamless.

The following image gives an overview to create a scene only app:

:::image type="content" source="../assets/images/apps-in-meetings/create-together-mode-scene-flow.png" alt-text="Create scene only app" border="false":::

>[!NOTE]
> * A scene only app is still an app in Microsoft Teams. The app package creation step is abstracted out since the Scene studio handles the app package creation in the background.
> * Multiple scenes in a single app package appear as a flat list of scenes to users.

There are prerequisites that you must complete before using the Together Mode.

## Prerequisites

You must have a basic understanding of the following to use Together Mode:

* Definition of scene and seats in a scene.
* Have a Microsoft Developer account and be familiar with the Microsoft Teams Dev Center and App Studio.
* [Concept of app sideloading](../concepts/deploy-and-publish/apps-upload.md).

## Build a scene using the Scene studio

Microsoft has a Scene studio that allows you to build the scenes. It is available on the [Teams Dev Center](https://dev.teams.microsoft.com/scenes).

>[!NOTE]
> This document is referring to Scene studio in the Microsoft Teams Dev Center. The interface and functionalities are all the same in App Studio Scene Designer.

A scene in the context of the Scene studio is an artifact that contains the following:

* Seats reserved for meeting organizer and meeting presenters.

    >[!NOTE]
    > Presenter does not refer to the user who is actively sharing. It refers to the [meeting role](https://support.microsoft.com/en-us/office/roles-in-a-teams-meeting-c16fa7d0-1666-4dde-8686-0a0bfe16e019).

* Seat and image for each participant. Each seat and image has an adjustable width and height.

    >[!NOTE]
    > PNG is the only supported format.

* The xyz coordinates of all the seats and images.
* A collection of images that are camouflaged as one image.

The following image shows each seat represented as an avatar for building scenes:

![Scene studio](../assets/images/apps-in-meetings/scene-design-studio.png)

The seat dimensions become the canvas for rendering the participant video stream.

![Build a scene](../assets/images/apps-in-meetings/build-a-scene.png)

**To build a scene using the Scene studio**

1. Go to [Teams Dev Center](https://dev.teams.microsoft.com/scenes).

2. Select **Tools** from the menu, and select **Scene editor** under **Tools** to open the Scene studio.

3. From the **Scenes Editor** page, select **Create a new scene**.

4. On the right side, in the **Scene Name** box, enter a name for the scene.

5. Drag and drop the image into the environment as displayed in the following image:

    >[!NOTE]
    > * You can download the Sample Scene.zip and Sample App.zip files with the images from [sample scene and sample app](/apps-in-teams-meetings).
    > * Alternately, you can add background images to the scene using **Add images**.

    ![Drag into the scene](../assets/images/apps-in-meetings/drag-and-drop-scene.png)

6. Select an image that you have placed in the scene. From the right pane, select an alignment for the image or use the **Resize** slider to adjust the image size.

    ![Alignment for images](../assets/images/apps-in-meetings/image-alignment.png)

7. Select a participant image, and select **Participants** under **Layers** in the upper-right corner.

8. Select the number of participants for the scene from the **Number of participants** box, and select **Add**.

    >[!NOTE]
    > * After the scene is shipped, the avatar placements are replaced with actual participant's video streams.
    > * You can drag the participant images around the scene and place them in the required position and resize them using the resize arrow.

9. Select any participant image, and choose the **Assign Spot** check box to assign the spot to the participant.

10. Select **Meeting Organizer** or **Presenter** role for the participant.

    >[!NOTE]
    > In a meeting, one participant must be assigned the role of a meeting organizer.

    ![Assign spot](../assets/images/apps-in-meetings/assign-spot.png)

11. Select **Export the Scene** from the **Save** drop-down menu. A .zip file, that is the scene package, is downloaded.

    >[!NOTE]
    > Alternately, you can select **Save** to save the scene.

To further enhance your scene you can also import the scene package. The following image shows you how to get the scene package as a zip file that contains all the scene assets:

![Scene zip file](../assets/images/apps-in-meetings/scene-zip-file.png)

Assets include PNG images used to create the scene and a scene.json file that captures the scene metadata.

>[!NOTE]
> Scene package can be used for sharing and allowing other co-creators to continue enhancing the scene. The **Import a scene** option can be used for this purpose.

After you have built a scene using the Scene studio, you can go through the sample JSON.

## Sample JSON

Scene JSON along with the images indicates the exact position of the seats. A scene consists of bitmap images, sprites, and rectangles to put participant videos in. These sprites and participant boxes are defined in a world coordinate system with the X-axis pointing to the right and the Y-axis pointing downwards. Together mode supports zooming in on the current participants. This is helpful for small meetings in a large scene. A sprite is a static bitmap image positioned in the world. The Z value of the sprite determines which sprite should be rendered on top of which. Rendering starts with the sprite with lowest Z value, so higher Z value means it is closer to the camera. Each participant has its own video feed which will be segmented so that only the foreground is rendered.

Following is the scene JSON sample:

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

Each scene has a unique ID and name. The scene JSON also contains information on all the assets used for the scene. Each asset contains a filename, width, height, and position on the X and Y-axis. Similarly, each seat contains a seat ID, width, height, and position on the X and Y-axis. The seating order is generated automatically for each seat when it is created.

>[!NOTE]
> Seating order number corresponds to the order of people joining the call.

The seating order can be altered according to the preferred order.

The zOrder represents the order of placing images and seats along the Z-axis. In many cases, it gives a sense of depth or partition if required.

Now that you have gone through the sample JSON, you can activate the Together Mode to engage in scenes.

## Activate the Together Mode

Get end-to-end information of how an end user engages with scenes in Together Mode.

**To choose scenes and activate the Together Mode**

1. From the **Gallery** drop-down in the upper-left corner, select **Change scene** to change the default scene. The **Choose a scene** dialog box appears.

2. From **Choose a scene**, select the scene you want to use for your meeting.

    ![Scene picker](../assets/images/apps-in-meetings/scene-picker.png)

3. Choose **Switch all participants to together mode** in the meeting.

4. Select **Apply**. Teams installs the app for the user and applies the scene.

    ![Scene applied](../assets/images/apps-in-meetings/scene-applied.png)

## See also

> [!div class="nextstepaction"]
> [Create your app package](../concepts/build-and-test/apps-package.md)

## Next step

> [!div class="nextstepaction"]
> [Build a scene in Scene studio](build-scene-in-scene-studio.md)
