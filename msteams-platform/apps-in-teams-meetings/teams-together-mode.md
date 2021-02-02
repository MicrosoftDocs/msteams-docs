---
title: Microsoft Teams Together Mode
description: Working with Together Mode 
ms.topic: conceptual
---

# Microsoft Teams Together Mode

## Overview

Microsoft Teams Together Mode, a simple, innovative, and user-friendly meeting environment, that provides an extended version of Microsoft Teams meetings. It provides a different style to conduct meetings in virtual environments. It digitally combines participants into a single virtual space instead of being shown separately.
It creates your virtual image and places it in a virtual environment where you can easily interact with your peers. It makes video meetings more viable as most users report less meeting fatigue.

This document covers best practices, user experience, developer experience, steps to build a scene in Microsoft Scene Design Studio, how to assemble a scene package, and create an app package and try the scene in Teams.

### Best practices

To get the most from Together Mode, follow these best practices:
* Encourage participants to interact more as it is available to many people at a time within the same view.
* Works best when users are not walking around during the session.
* Keep your camera on. For example, teachers find that students understand better and pay more attention in the Together Mode as they interact with the teachers while being able to understand their peer’s reactions at the same time.

## User experience

For an end-to-end flow of how a user engages with scenes in Together Mode, complete the following steps:

1. From the **Gallery** drop-down in the upper-left corner, select **Change scene** to change the default scene.

2. The scene picker appears. Then, select a scene.

![Scene picker](../../../assets/images/apps-in-meetings/scene-picker.png)

3. Select the scene and choose **Switch all participants to together mode** in the meeting.

4. Select **Apply**. Teams installs the app for the user and applies the scene.

![Scene applied](../../../assets/images/apps-in-meetings/scene-applied.png)

## Developer experience

To create apps in Together Mode, you can create scene only apps or extend your current app to have scenes for Together Mode.

>[!NOTE]
> It is recommended to have scene only apps as the acquisition experience for users is more seamless.

The following diagram gives an overview of how the scene appears:

![Addingscenetoapp](../../../assets/images/apps-in-meetings/Scene-added-to-app.png)

For more information, see Build a scene.

>[!NOTE]
> Have multiple scenes as part of a single app package that appears as a flat list of scenes to users. 

Developers must have the ability to ship a scene package that includes the following:

* **Role based scene** – within a scene package, a developer must be able to render an experience preview, for example, for the teacher and the students.

    ![Role based scene](../../../assets/images/apps-in-meetings/role-based-scene.png)

* **In-scene configuration** – The JSON package assumes a single image with seat assignment. For example, in the picture below, the astronaut “seat” can by default be applied to the organizer through `participantRole` API, but the teacher can dynamically move this around using the class roster:

    ![In-Scene configuration](../../../assets/images/apps-in-meetings/role-based-scene.png)

## Build a scene

![Build a scene](../../../assets/images/apps-in-meetings/build-a-scene.png)

After setting-up dev.teams.microsoft.com, select **Scenes** and choose **New** to display the Microsoft Scene Design Studio. A scene is an artifact that contains the following:

* Seats where meeting participants are placed if they have their videos turned-on.
* Each seat is placed on an XY canvas. 
* A collection of images that are camouflaged as one image.
* Each seat and each image has width and height
* Optionally, have a reserved spot for the meeting organizer and a set of reserved spots for participants.

## Getting started with Scene Design Studio

![Scene Design Studio](../../../assets/images/apps-in-meetings/scene-design-studio.png)

In the Scene Design Studio, each seat is represented as an avatar for design purposes. Each seat and image has a placement in the third dimension that is the Z-axis to give a sense of depth in scenes that demand them.

To place participants in the Scene Design Studio, complete the following steps:

1.	Under **Layers** in the upper-right corner, select **Participants**.

2.	From the **Number of participants** box, select the number of participants for this scene and select **Modify**. Once the scene is shipped, the avatar placements are replaced with actual participant video streams.

3.	Add background images to the scene using **Add images**. The assets can also be dragged and dropped into the environment as displayed in the following image:

    ![Dragging into the scene](../../../assets/images/apps-in-meetings/drag-and-drop-scene.png)

4.	Click on any image that you have placed in the scene.

5.	From the right corner, select an alignment for the image or use the Size & rotation slider to adjust the size of the image.

    ![Alignment for images](../../../assets/images/apps-in-meetings/image-alignment.png)

## Scene package

A scene package is a collection of all assets particularly images used to build the scene along with a scene JSON to indicate the exact position of the seats. In the Scene Design Studio, there is an option to simply get the scene package that is a zip file. 
Use the following scene JSON sample: 

![JSON sample](../../../assets/images/apps-in-meetings/json-sample.png)

Each scene has a unique ID and name. The scene JSON also contains information on all the assets used for the scene. Each asset contains a filename, width, height, and positions on X and Y coordinates. 
Similarly, each seat contains a seat ID, width, height, and positions on X and Y coordinates. The seating order is generated automatically for each seat when it is created. Hence the seating order must be altered according to the preferred order. 

>[!NOTE]
> Seating order number corresponds to the order of people joining the call. 

Finally, the zOrder represents the order of placing images and seats along the Z-axis. In many cases, it gives a sense of depth or partition if required.

## Let us build a scene together

To build a scene, complete the following steps:
Step 1
…
Step N 

Create an app package and try the scene in Teams

An app package contains the scene package. App Studio makes it easy to package an app.

![App Studio](../../../assets/images/apps-in-meetings/app-studio.png)

After you build a scene, complete the following steps:

1.	Save the scene.

2.	Go to **Apps** in App Studio.

3.	Create a new app and enter the necessary details.

4.	Go to **Scenes** under **Configuration** in **Apps**.

5.	Select the scene you built and import the package.

6.	Sideload this package in Teams.
