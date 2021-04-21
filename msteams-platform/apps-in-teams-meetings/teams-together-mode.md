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
* Ensure that admin has granted permission to 'Upload custom apps' and has granted permission to select all filters as part of App Setup and Meeting policies respectively

## Best Practices 

Prior to building a scene, there are few key points to consider in order to have a seamless scene building experience

* Ensure all images are in PNG format
* The final package with all the images put together must not exceed 1920x1080 resolution. Note that the resolution is an 'even' number. 
* The maximum scene size is 10MB.
* The maximum size of each image (a scene is a collection of multiple images) is 5MB. The individual image resolution must also be an 'even' number


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

2. From the **Scenes Editor** page, select **Create a new scene**.

3. On the right side, in the **Scene Name** box, enter a name for the scene.

4. Drag and drop the image into the environment as displayed in the following image:

    >[!NOTE]
    > * You can download the [SampleScene.zip](/apps-in-teams-meetings/SampleScene.zip) and [SampleApp.zip](/apps-in-teams-meetings/SampleApp.zip) files with the images.
    > * Alternately, you can add background images to the scene using **Add images**.

    ![Drag into the scene](../assets/images/apps-in-meetings/drag-and-drop-scene.png)

5. Select an image that you have placed in the scene. From the right pane, select an alignment for the image or use the **Resize** slider to adjust the image size.

    ![Alignment for images](../assets/images/apps-in-meetings/image-alignment.png)

6. Select a participant image, and select **Participants** under **Layers** in the upper-right corner.

7. Select the number of participants for the scene from the **Number of participants** box, and select **Add**.

    >[!NOTE]
    > * After the scene is shipped, the avatar placements are replaced with actual participant's video streams.
    > * You can drag the participant images around the scene and place them in the required position and resize them using the resize arrow.

8. Select any participant image, and choose the **Assign Spot** check box to assign the spot to the participant.

9. Select **Meeting Organizer** or **Presenter** role for the participant.

    >[!NOTE]
    > In a meeting, one participant must be assigned the role of a meeting organizer.

    ![Assign spot](../assets/images/apps-in-meetings/assign-spot.png)

10. Select **Save** and select **Preview** to start testing your scenes in Microsoft Teams. 
    
    >[!NOTE]
    > Selecting **Preview** automatically creates a Microsoft Teams app that can be viewed in the **Apps** page in the Teams Dev Center. The scene can then be viewed in the Together Mode scene gallery.

11. After preview, the scene can be shipped as an app to Teams by following the steps for app submission.

    >[!NOTE]
    > This step requires the app package that is different from the scene package, described in the next step, for the scene that was just designed. The app package, created, automatically can be found in the **Apps** section in the Teams Developer Center. 

12. Optionally, the scene package can be retrieved by selecting **Export** from the **Save** drop-down menu. A .zip file, that is the scene package, is downloaded.
    
    >[!NOTE]
    > Scene package comprises of a scene.json and the PNG assets used to build a scene. The scene package can be reviewed for incorporating other changes as described in the Sample JSON section of this document.

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

1. On selecting **Preview** in the Scene studio, the scene is installed as an app in Microsoft Teams. The next step is to create a test meeting in order to engage with the scene.

    >[!NOTE]
    > This is the model for a developer to test and try out scenes from the Scene studio. Once a scene is shipped as an app, users see these scenes in the scene gallery as shown in the following steps and they are able to acquire the scene from the scene gallery itself.

2. From the top left viewing options, select **Together Mode**.

3. Select **Change scene** to change the default scene.

4. From the **Scene Gallery**, select the scene you want to use for your meeting.

5. Optionally, the meeting organizer and presenter can choose **Switch all participants to together mode** in the meeting.

>[!NOTE]
> At any point in time, only one scene can be used homoegenously for the meeting. If a presenter or organizer changes a scene, it  changes it for all. This is different from being in Together Mode. Switching in or out of Together Mode is up to individual participants, but while in Together Mode, all participants have the same scene.

6. Select **Apply**. Teams installs the app for the user and applies the scene.

## Open a Together Mode Scene Package

As developers share the Scene Package that is a .zip file retrieved from the Scene studio to other creators to further enhance the scene, the **Import a Scene** functionality can be leveraged. This tool helps unwrap a scene package to let the creator continue building the scene.

![Scene zip file](../assets/images/apps-in-meetings/scene-zip-file.png)

## See also

> [!div class="nextstepaction"]
> [Create your app package](../concepts/build-and-test/apps-package.md)

## Next step

> [!div class="nextstepaction"]
> [Build a scene in Scene studio](build-scene-in-scene-studio.md)
