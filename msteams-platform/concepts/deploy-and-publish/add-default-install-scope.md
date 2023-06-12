---
title: Configure default options for your app
description: Learn how to specify your Teams app's default install options, default capability for shared scopes and block apps by default.
ms.topic: how-to
ms.localizationpriority: medium
ms.author: surbhigupta
---
# Configure default options for Teams app

It’s common for an app to support multiple scenarios in Teams, but you may have designed it with a specific scope and capability in mind. For example, if your app is primarily for team or channel use, you can make sure that the first install option users see in the store is **Add to a team**.

:::image type="content" source="../../assets/images/compose-extensions/addanapp.png" alt-text="Screenshot shows the Add to a team option.":::

If your app's primary capability is a bot, you can also make the bot the default capability when a user installs your app to a team.

## Configure your app's default install scope

Configure the default install scope for your app. You can set only one scope at a time. For more information, see [app manifest schema](~/resources/schema/manifest-schema.md).

To configure the default install scope in your app manifest:

1. Open your app manifest and add the `defaultInstallScope` property.
2. Set default install scope value as, either `personal`, `team`, `groupchat`, or `meetings`.

    ```json
    "defaultInstallScope": "meetings",
    ```

## Configure the default capability for shared scopes

Configure the default capability when your app is installed for a team, meeting, or groupchat.

> [!NOTE]
> `defaultGroupCapability` provides the default capability that will be added to the team, groupchat, or meeting. Select a tab, bot, or connector as the default capability for your app, but you must ensure that you have provided the selected capability in your app definition.

To configure details in app manifest:

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

## Block apps by default for users until an admin approves

To enhance Teams app experience, you can hide an app from users by default until admin allows to unhide the app. For example, Contoso Electronics has created a help desk app for Teams. To enable appropriate functioning of the app, Contoso Electronics’ wants the customers to first configure specific properties of the app. The app is hidden by default and is available to users only after the admin allows it.

To block the app by default, in the app manifest file, set the `defaultBlockUntilAdminAction` property to `true`. When the property is set to `true`, the status of the app in Teams admin center is **Blocked by publisher** in the [Manage apps](https://admin.teams.microsoft.com/policies/manage-apps) page.

:::image type="content" source="../../assets/images/manage-apps-status.png" alt-text="Screenshot shows an app blocked by publisher." lightbox="../../assets/images/manage-apps-status-expanded.png":::

The admin gets a request to take action before a user can access the app. Under **Manage apps**, the admins can select **Allow** to allow the app with **Blocked by publisher** status:

:::image type="content" source="../../assets/images/manage-apps-allow.png" alt-text="Screenshot shows the allow option for the app blocked by publisher." lightbox="../../assets/images/manage-apps-allow-expanded.png":::

If by default, you don't want the app to be hidden, you can update the `defaultBlockUntilAdminAction` property to `false`. When the new version of the app is approved, by default the app will be allowed as long as the admin hasn't taken any explicit action.

> [!NOTE]
> For LOB apps, `defaultBlockUntilAdminAction` is not supported. The app is not blocked if you upload a LOB app with this property.

## Next step

> [!div class="nextstepaction"]
> [Create your app package](~/concepts/build-and-test/apps-package.md)

## See also

[Distribute your Microsoft Teams app](apps-publish-overview.md)
