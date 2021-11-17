---
title: Designing camera effects
author: heath-hamilton
description: Learn how to design apps with camera effects for Teams meetings.
ms.author: surbhigupta
ms.localizationpriority: medium
ms.topic: conceptual
keywords: UI kit camera effects meetings
---
# Designing camera effects for Microsoft Teams

Your app can include camera effects to make Teams meetings more engaging and fun.

> [!NOTE]
> Camera effects aren’t the same as virtual backgrounds.

## Microsoft Teams UI Kit

You can find more comprehensive design guidelines, including elements that you can grab and modify as needed, in the Microsoft Teams UI Kit.

> [!div class="nextstepaction"]
> [Get the Microsoft Teams UI Kit (Figma)](https://www.figma.com/community/file/916836509871353159)

## Camera effects at a glance

The following images show how users can apply different effects to their Teams meeting video.

:::image type="content" source="~/assets/images/apps-in-meetings/camera-effects/camera-effects-at-glance.png" alt-text="Group of three images showing no effects on, blurred background on only, and blurred background and camera effect on." border="false":::

## Apply a camera effect before a meeting

While joining a meeting, the user can quickly select and preview different camera effects (including your app's). If they have time, they can select **Edit** to browse all available effects from you and other app publishers.

:::image type="content" source="~/assets/images/apps-in-meetings/camera-effects/apply-before-meeting.png" alt-text="Image shows an example of applying a camera effect before a meeting." border="false":::

### Browse your app's effects before a meeting

When the user selects **Edit** in the preview window, a side panel opens to see and choose all the effects provided by your app.

:::image type="content" source="~/assets/images/apps-in-meetings/camera-effects/browse-before-meeting.png" alt-text="Image shows an example of browsing camera effects before a meeting." border="false":::

### Anatomy: Preview the effect

The user can see what the camera effect looks like before applying it.

:::image type="content" source="~/assets/images/apps-in-meetings/camera-effects/preview-effect-before-anatomy.png" alt-text="Image shows the design anatomy of previewing a camera effect before a meeting." border="false":::

|Counter|Description|
|----------|-----------|
|A|**Preview window**: Shows what the user's video looks like with the effect.|
|B|**Settings button**: Opens device settings.|
|C|**Quick picker tray**: Displays recently used and suggested backgrounds and effects. If your app was recently used, it will display here.|
|D|**More button**: Opens the **Video effects** tab on the side where users can browse all effects you, Microsoft, and other app publishers.|
|E|**Video effects button**: Shows or hides the quick picker tray below the preview window.|
|F|**Background tile row**: Displays effect tiles (specifically backgrounds in the first row). The recently used background goes in the first tile. Suggested backgrounds make up the rest of the row.|
|G|**Video toggle**: Turns the camera on or off. Users can’t view available effects when their camera is off.|
|H|**Buttons**: **Clear** removes all applied effects. **Edit** drills into a side panel view of all your app’s effects.|
|1|**Camera effects tile row**: Displays effect tiles (specifically camera effects in the second row). The recently used effect goes in the first tile. Suggested filters make up the rest of the row. You’re responsible for designing these tiles for your app.|

### Anatomy: Add the app

If the user hasn't used your app before, they'll have to add it before they can apply the camera effect.

:::image type="content" source="~/assets/images/apps-in-meetings/camera-effects/add-app-before-anatomy.png" alt-text="Image shows the design anatomy of adding a camera effect before a meeting." border="false":::

|Counter|Description|
|----------|-----------|
|A|**Dismiss button**: Closes the add app details page and returns to the video preview.|
|B|**Add button**: Adds the app to Teams for the user.|
|C|**Text**: Text component for your app permissions.|
|D|**Back button**: Takes the user back to the previous page.|
|1|**App icon**: The color icon for your app.|
|2|**App short name**|
|3|**Developer name**: The display name for the developer.|
|4|**Text**: Specifies the number of effects your app offers.|
|5|**Text**: Includes your app's short description and links to your privacy policy and terms of use. The permissions link takes the user to a page where they can review your app’s permissions.|

### Anatomy: Effect tile

:::image type="content" source="~/assets/images/apps-in-meetings/shared-meeting-stage-anatomy.png" alt-text="Image shows the design anatomy of the shared meeting stage." border="false":::

|Counter|Description|
|----------|-----------|
|1|**App icon**: The highlighted icon indicates the app's in-meeting tab is open.|
|2|**Share to meeting stage button**: The entry point to share the app to the meeting stage. Displays if you configure your app to use the shared meeting stage.|
|3|**iframe**: Displays your app content.|
|4|**Stop sharing button**: Stops sharing the app to the meeting stage. Displays only for the participant who started the share.|
|5|**Presenter attribution**: Displays the name of the participant who shared the app.|

## Apply a camera effect during a meeting

xx

### Browse your app's effects during a meeting

xx

### Anatomy: Preview the effect

The user can see what the camera effect looks like before applying it.

:::image type="content" source="~/assets/images/apps-in-meetings/shared-meeting-stage-anatomy.png" alt-text="Image shows the design anatomy of the shared meeting stage." border="false":::

|Counter|Description|
|----------|-----------|
|1|**App icon**: The highlighted icon indicates the app's in-meeting tab is open.|
|2|**Share to meeting stage button**: The entry point to share the app to the meeting stage. Displays if you configure your app to use the shared meeting stage.|
|3|**iframe**: Displays your app content.|
|4|**Stop sharing button**: Stops sharing the app to the meeting stage. Displays only for the participant who started the share.|
|5|**Presenter attribution**: Displays the name of the participant who shared the app.|

### Anatomy: Add the app

If the user hasn't used your app before, they'll have to add it before they can apply the camera effect.

:::image type="content" source="~/assets/images/apps-in-meetings/shared-meeting-stage-anatomy.png" alt-text="Image shows the design anatomy of the shared meeting stage." border="false":::

|Counter|Description|
|----------|-----------|
|1|**App icon**: The highlighted icon indicates the app's in-meeting tab is open.|
|2|**Share to meeting stage button**: The entry point to share the app to the meeting stage. Displays if you configure your app to use the shared meeting stage.|
|3|**iframe**: Displays your app content.|
|4|**Stop sharing button**: Stops sharing the app to the meeting stage. Displays only for the participant who started the share.|
|5|**Presenter attribution**: Displays the name of the participant who shared the app.|

## Best practices

For Teams-specific guidance, see the [meeting extensions best practices](~/apps-in-teams-meetings/design/designing-apps-in-meetings.md#best-practices) for designing in-meeting tabs.

## Next step

> [!div class="nextstepaction"]
> [Configure your app for meetings](~/apps-in-teams-meetings/enable-and-configure-your-app-for-teams-meetings.md)
