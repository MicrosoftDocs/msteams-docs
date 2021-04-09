---
title: Add a default install scope and group capability
description: Describes how to add default install scope and group capability for apps.
ms.topic: how-to
ms.author: surbhigupta
---

# Add a default install scope and group capability

> [!NOTE]
> The default install scope and group capability is currently available in developer preview only.

Although installing an app in the personal scope works for most apps, some of the apps in Teams Store support both personal and team scopes.
Some of these apps are intended to work in a team, meetings, or a groupchat, with personal app experience being secondary.
The default install scope selection helps you to specify the `defaultInstallScope` for the apps that you publish. The app installation experience makes the default options available to the user, while the rest is moved under the chevron as highlighted in the image.

![Add an app](../../assets/images/compose-extensions/addanapp.png)

The `defaultInstallScope` property supports values, such as personal, team, groupchat, or meetings.

> [!NOTE]
>`defaultGroupCapability` provides the default capability that is added to the team, group chat, or meetings. Choose a tab, bot, or connector as the default capability for your app, but you must ensure that you have provided the selected capability in your app definition.
> Set the `defaultInstallScope` and `defaultGroupCapability` properties in your [manifest schema](../../resources/schema/manifest-schema.md).

## Configure app's default install scope

Configure the default install scope for your app, based on whether your app needs to installed in personal, team, meetings, or groupchat scope. 

**To configure details in app manifest**

1. In **Teams**, select **Apps**, and open **App Studio**.
2. Select the **Manifest editor** tab, and configure the default install scope.
3. Select **Save**

> [!NOTE]
> You can also manually add the details to your app manifest.

Following is a JSON example:

```json
(we should provide a JSON example for context).
```

## Configure the default capability for shared scopes

Same as above but this time for defaultGroupCapability.


## Next step

> [!div class="nextstepaction"]
> [Choose how to distribute your app](overview.md)

## See also

> [!div class="nextstepaction"]
> [Manifest schema](../../resources/schema/manifest-schema.md)
