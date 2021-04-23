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

If your app's primary capability is a bot, you can also make the bot the default capability when a user installs your app to a team.

`defaultGroupCapability` provides the default capability that will be added to the team, groupchat, or meeting. Select a tab, bot, or connector as the default capability for your app, however, you must ensure that you have provided the selected capability in your app definition.

## Configure your app's default install scope

Configure the default install scope for your app. You can set only one scope at a time.

**To configure the default install scope in your app manifest**

1. Open your app manifest and add the `defaultInstallScope` property.
2. Set default install scope value as, either `personal`, `team`, `groupchat`, or `meetings`.

    ```json
    "defaultInstallScope": "meetings",
    ```

> [!NOTE]
> For more information, see the [app manifest schema](~/resources/schema/manifest-schema.md).

## Configure the default capability for shared scopes

Configure the default capability when your app is installed for a team, meeting, or groupchat.

**To configure details in app manifest**

1. Open your app manifest and add the `defaultGroupCapability` property to it.
2. Set a value of `team`, `groupchat`, or `meetings`.
3. For the selected group capability, the available group capabilities are, `bot`, `tab`, or `connector`. 

    > [!NOTE]
    > You can select only one default capability, `bot`, `tab`, or `connector` for the selected group capability.

    ```json
    "defaultGroupCapability": {
        "team": "bot",
        "groupchat": "bot",
        "meetings": "tab"
    }
    ```

> [!NOTE]
> For more information, see the [app manifest schema](~/resources/schema/manifest-schema.md).

## Next step

> [!div class="nextstepaction"]
> [Choose how to distribute your app](overview.md)
