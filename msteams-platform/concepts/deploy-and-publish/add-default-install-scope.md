---
title: Configure default install options for your app
description: Describes how to specify your app's default install options.
ms.topic: how-to
localization_priority: Normal
ms.author: surbhigupta
---

# Add a default install scope and group capability

It’s common for an app to support multiple scenarios in Teams, but you may have designed it with a specific scope and capability in mind. For example, if your app is primarily for team or channel use, you can make sure that the first install option users see in the store is **Add to a team**.

![Add an app](../../assets/images/compose-extensions/addanapp.png)

The `defaultInstallScope` property supports values, such as personal, team, groupchat, or meetings.

> [!NOTE]
>`defaultGroupCapability` provides the default capability that is added to the team, groupchat, or meetings. Choose a tab, bot, or connector as the default capability for your app, but you must ensure that you have provided the selected capability in your app definition.

## Configure app's default install scope

Configure the default install scope for your app, based on whether your app needs to be installed in personal, team, meetings, or groupchat. You can set only one scope at a time.

**To configure details in app manifest**

1. Open your manifest schema, and add the `defaultInstallScope` property to it.
2. Set a value of `personal`, `team`, `groupchat`, or `meetings` (see an example below).

    Following is a JSON example:

    ```json
    "defaultInstallScope": "meetings",
    ```

> [!NOTE]
> For more information, see the [app manifest schema](~/resources/schema/manifest-schema.md).

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
