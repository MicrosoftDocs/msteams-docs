---
title: Designing camera effects
author: heath-hamilton
description: Learn how to design apps with camera effects for Teams meetings.
ms.author: surbhigupta
ms.localizationpriority: medium
ms.topic: conceptual
keywords: UI kit camera effects meetings
---
# Designing your camera effects for Microsoft Teams meetings

Your app can include camera effects to make Teams meetings more engaging and fun.

## Microsoft Teams UI Kit

You can find more comprehensive design guidelines, including elements that you can grab and modify as needed, in the Microsoft Teams UI Kit.

> [!div class="nextstepaction"]
> [Get the Microsoft Teams UI Kit (Figma)](https://www.figma.com/community/file/916836509871353159)

## Camera effects at a glance

The following images show how users can apply different effects to their Teams meeting video.

> [!NOTE]
> Camera effects are different than virtual or blurred backgrounds.

:::image type="content" source="~/assets/images/apps-in-meetings/camera-effects/camera-effects-at-glance.png" alt-text="Group of three images showing no effects on, blurred background on only, and blurred background and camera effect on." border="false":::

## Apply a camera effect before a meeting

While joining a meeting, the user can quickly select and preview different camera effects (including your app's).

:::image type="content" source="~/assets/images/apps-in-meetings/camera-effects/apply-before-meeting.png" alt-text="Image shows an example of applying a camera effect before a meeting." border="false":::

### Browse camera effects before a meeting

If they have time before a meeting, the user can select **Edit** in the preview window to browse all available effects from you and other app publishers in a side panel.

:::image type="content" source="~/assets/images/apps-in-meetings/camera-effects/browse-before-meeting.png" alt-text="Image shows an example of browsing camera effects before a meeting." border="false":::

### Anatomy: Preview the effect before a meeting

The user can see what the camera effect looks like before applying it.

:::image type="content" source="~/assets/images/apps-in-meetings/camera-effects/preview-effect-before-anatomy.png" alt-text="Image shows the design anatomy of previewing a camera effect before a meeting." border="false":::

|Counter|Description|
|----------|-----------|
|A|**Preview window**: Shows what the user's video looks like with the effect.|
|B|**Settings button**: Opens device settings.|
|C|**Quick picker tray**: Displays recently used and suggested backgrounds and effects. If your app was recently used, it will display here.|
|D|**More button**: Opens the **Video effects** tab on the side where users can browse all effects from you, Microsoft, and other app publishers.|
|E|**Video effects button**: Shows or hides the quick picker tray below the preview window.|
|F|**Background tile row**: Displays effect tiles (specifically backgrounds in the first row). The recently used background goes in the first tile. Suggested backgrounds make up the rest of the row.|
|G|**Video toggle**: Turns the camera on or off. Users can’t view available effects when their camera is off.|
|H|**Buttons**: **Clear** removes all applied effects. **Edit** drills into a side panel view of all your app’s effects.|
|1|**Camera effects tile row**: Displays effect tiles (specifically camera effects in the second row). The recently used effect goes in the first tile. Suggested filters make up the rest of the row. You’re responsible for designing these tiles for your app.|

### Anatomy: Add the app before a meeting

If the user hasn't used your app before, they'll have to add it before they can apply the camera effect.

:::image type="content" source="~/assets/images/apps-in-meetings/camera-effects/add-app-before-anatomy.png" alt-text="Image shows the design anatomy of adding a camera effect before a meeting." border="false":::

|Counter|Description|
|----------|-----------|
|A|**Dismiss button**: Closes the add app details page and returns to the video preview.|
|B|**Add button**: Adds the app to Teams for the user.|
|C|**Text**: Text component for your app permissions.|
|D|**Back button**: Takes the user back to the previous page.|
|1|**App color icon**: The [color icon](~/concepts/build-and-test/apps-package.md#color-icon) for your app.|
|2|**App short name**: The [short display name](~/resources/schema/manifest-schema.md#name) for your app.|
|3|**Developer name**: The [display name for the developer](~/resources/schema/manifest-schema.md#developer).|
|4|**Text**: Specifies the number of effects your app offers.|
|5|**Text**: Includes your app's [short description](~/resources/schema/manifest-schema.md#description) and links to your [privacy policy](~/resources/schema/manifest-schema.md#developer) and [terms of use](~/resources/schema/manifest-schema.md#developer). The permissions link takes the user to a page where they can review your app's permissions.|

### Anatomy: Effect tile

A camera effect tile is what the user selects when they want to preview and apply your effect. The tile displays in the quick picker tray, your app's tab, and the **Video effects** tab.

The tile is 74x42 pixels in the quick picker tray and 88x50 pixels in the tabs.

:::image type="content" source="~/assets/images/apps-in-meetings/camera-effects/effects-tile-anatomy.png" alt-text="Image shows the design anatomy of the effects tile." border="false":::

|Counter|Description|
|----------|-----------|
|A|**Thumbnail image**: Previews what the effect does.|
|B|**Badge**: Indicates that the effect is new.|
|C|**Checkmark**: Indicates that the effect is selected.|
|1|**App icon**: The [color icon](~/concepts/build-and-test/apps-package.md#color-icon) for your app.|

## Apply a camera effect during a meeting

During a meeting, the user can quickly select and preview different camera effects (including your app's). They also can select **More video effects** to browse all available effects from you and other app publishers.

:::image type="content" source="~/assets/images/apps-in-meetings/camera-effects/apply-during-meeting.png" alt-text="Image shows how to add a camera effect during a meeting." border="false":::

### Browse camera effects during a meeting

When the user selects **Edit** in the **Private preview** window, they can view all your app's effects in a side tab.

:::image type="content" source="~/assets/images/apps-in-meetings/camera-effects/browse-during-meeting.png" alt-text="Image shows the design anatomy of previewing a camera effect during a meeting." border="false":::

### Anatomy: Preview the effect during a meeting

The user can see what the camera effect looks like before applying it.

:::image type="content" source="~/assets/images/apps-in-meetings/camera-effects/preview-effect-during-anatomy.png" alt-text="Image shows the design anatomy of previewing a camera effect during a meeting." border="false":::

|Counter|Description|
|----------|-----------|
|A|**Preview window**: Shows what the user’s video looks like with the effect.|
|B|**Settings button**: Opens video settings.|
|C|**Quick picker tray**: Displays recently used and suggested backgrounds and effects. If your app was recently used, it will display here.|
|D|**More button**: Opens the **Video effects** tab on the side where users can browse all effects from you, Microsoft, and other app publishers.|
|E|**Background tile row**: Displays effect tiles (specifically backgrounds in the first row). The recently used background goes in the first tile. Suggested backgrounds make up the rest of the row.|
|F|**Buttons**: **Clear** removes all applied effects. **Edit** drills into a side panel view of all your app's effects.|
|1|**Camera effects tile row**: Displays effect tiles (specifically camera effects in the second row). The recently used effect goes in the first tile. Suggested filters make up the rest of the row. You’re responsible for designing these tiles for your app.|

### Anatomy: Add the app during a meeting

If the user hasn't used your app before, they'll have to add it before they can apply the camera effect.

:::image type="content" source="~/assets/images/apps-in-meetings/camera-effects/add-app-during-anatomy.png" alt-text="Image shows the design anatomy of adding a camera effect during a meeting." border="false":::

|Counter|Description|
|----------|-----------|
|A|**Dismiss**: Closes the add app details page and returns to the video preview.|
|B|**Add button**: Adds the app to Teams for the user.|
|1|**App color icon**: The [color icon](~/concepts/build-and-test/apps-package.md#color-icon) for your app.|
|2|**App short name**: The [short display name](~/resources/schema/manifest-schema.md#name) for your app.|
|3|**Developer name**: The [display name for the developer](~/resources/schema/manifest-schema.md#developer).|
|4|**Text**: Specifies the number of effects your app offers.|
|5|**Text**: Includes your app's [short description](~/resources/schema/manifest-schema.md#description) and links to your [privacy policy](~/resources/schema/manifest-schema.md#developer) and [terms of use](~/resources/schema/manifest-schema.md#developer). The permissions link takes the user to a page where they can review your app's permissions.|

## Best practices

For Teams-specific guidance, see the [meeting extensions best practices](~/apps-in-teams-meetings/design/designing-apps-in-meetings.md#best-practices) for designing in-meeting tabs.

## Next step

> [!div class="nextstepaction"]
> [Configure your app for meetings](~/apps-in-teams-meetings/enable-and-configure-your-app-for-teams-meetings.md)
