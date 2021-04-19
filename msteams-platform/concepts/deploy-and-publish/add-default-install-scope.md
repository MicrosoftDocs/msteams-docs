---
title: Add a default install scope and group capability
description: Describes how to add default install scope and group capability for apps.
ms.topic: how-to
localization_priority: Normal
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
>`defaultGroupCapability` provides the default capability that is added to the team, groupchat, or meetings. Choose a tab, bot, or connector as the default capability for your app, but you must ensure that you have provided the selected capability in your app definition.

## Configure app's default install scope

Configure the default install scope for your app, based on whether your app needs to be installed in personal, team, meetings, or groupchat. You can set only one scope at a time.

**To configure details in app manifest**

1. Open your manifest schema, and add the `defaultInstallScope` property to it.
2. Save the updates.

Following is a JSON example:

```json
"defaultInstallScope": "meetings",
```

> [!NOTE]
> For information on full schema, see [manifest schema](~/resources/schema/manifest-schema.md).

## Configure the default capability for shared scopes

Configure the default capability for shared scopes, based on whether your app is installed in personal, team, meetings, or groupchat scope.

**To configure details in app manifest**

1. Open your manifest schema, and add the `defaultGroupCapability` property to it.
2. Save the updates.

Following is a JSON example:

```json
"defaultGroupCapability": {
    "team": "bot",
    "groupchat": "bot",
    "meetings": "tab"
}
```
> [!NOTE]
> For information on full schema, see [manifest schema](~/resources/schema/manifest-schema.md).

## Next step

> [!div class="nextstepaction"]
> [Choose how to distribute your app](overview.md)

