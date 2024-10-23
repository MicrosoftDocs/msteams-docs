---
title: Configure default options for your app
description: Learn how to specify your Teams app's default install options, default capability for shared scopes and block apps by default.
ms.topic: how-to
ms.localizationpriority: medium
ms.author: surbhigupta
ms.date: 12/15/2022
---
# Configure default options for Teams app

It’s common for an app to support multiple scenarios in Teams, but you might have designed it with a specific scope and capability in mind. For example, if your app is primarily for team or channel use, you can make sure that the first install option users see in the Microsoft Teams Store is **Add to a team**.

:::image type="content" source="../../assets/images/compose-extensions/addanapp.png" alt-text="Screenshot shows the Add to a team option.":::

If your app's primary capability is a bot, you can also make the bot the default capability when a user installs your app to a team.

## Configure your app's default install scope

Configure the default install scope for your app. You can set only one scope at a time. For more information, see [app manifest](../../resources/schema/manifest-schema.md#defaultinstallscope).

To configure the default install scope in your app manifest:

1. Open your app manifest and add the `defaultInstallScope` property.
2. Set default install scope value as, either `personal`, `team`, `groupchat`, or `meetings`.

    ```json
    "defaultInstallScope": "meetings",
    ```

## Configure the default capability for shared scopes

Configure the default capability when your app is installed for a team, meeting, or groupchat. For more information, see [app manifest](../../resources/schema/manifest-schema.md#defaultgroupcapability).

> [!NOTE]
> `defaultGroupCapability` provides the default capability that's added to the team, group chat, or meeting. Select a tab, bot, or connector as the default capability for your app, but you must ensure that you have provided the selected capability in your app definition.

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
## Configure your app's default landing capability

If your app supports both bot and tab in personal scope, you can configure how the app must open, either as a bot or as a tab . This ability to set the default landing of an app based on its capability is termed as default landing capability.

To set default landing capability, you must configure the `staticTabs` property in the app manifest. 

To set bot as the default landing capability:

1. Open your app manifest.
1. Under `staticTabs` property, 
    1. Add the following properties:
        1. Set `entityId` as `conversations`. 
        1. Add `scopes` as `personal`.
    1. Add the tab properties as defined in the [app manifest](../../resources/schema/manifest-schema.md#statictabs) 

The following code is an example for configuring bot as the default landing capability:
```json
    "staticTabs":[
          {
             "entityId":"conversations",
             "scopes":[
                "personal"
             ]
          },
          {
            "entityId": "com.contoso.helloworld.hellotab",
            "name": "Hello Tab",
            "contentUrl": "https://p4p9bji0-7130.inc1.devtunnels.ms/hello",
            "scopes": [
                "personal"
            ]
        }
    ]
```
(GIF to be added)

To configure tab as the default landing capability:

1. Open your app manifest.
1. Under `staticTabs` property, 
    1. Add the tab properties as defined in the [app manifest](../../resources/schema/manifest-schema.md#statictabs).
    1. Add the following properties:
        1. Set `entityId` as `conversations`.
        1. Add `scopes` as `personal`.
 
The following code is an example for tab as the default landing capability:
```json
    "staticTabs": [
        {
            "entityId": "com.contoso.helloworld.hellotab",
            "name": "Hello Tab",
            "contentUrl": "https://p4p9bji0-7130.inc1.devtunnels.ms/hello",
            "scopes": [
                "personal"
            ]
        },
        {
            "entityId":"conversations",
             "scopes":[
                "personal"
             ]
        }
    ]
```
(GIF to be added)

The first entry added in `staticTabs` array will be considered for default landing and the second entry added will be pinned to the app's personal experience for easy switching.

The `staticTabs` property is also used to pin personal tabs and reorder tabs. For more information, see [App manifest](../../resources/schema/manifest-schema.md#statictabs).

## Block apps by default for users until an admin approves

To enhance the user experience of a Teams app, at times, IT administrators must intervene before users use the app. For example, consider a help desk app created by Contoso Electronics for Teams. To ensure the app functions properly, Contoso Electronics wants customers to configure specific properties of the app first.

To ensure that IT admins perform the relevant tasks, developers can block an app for users until an admin allows the app. To block the app by default, set the `defaultBlockUntilAdminAction` property to `true` in the app manifest file. When the property is set to `true`, the status of the app in Teams admin center is **Blocked by publisher** in the [Manage apps](https://admin.teams.microsoft.com/policies/manage-apps) page.

:::image type="content" source="../../assets/images/manage-apps-status.png" alt-text="Screenshot shows an app blocked by publisher." lightbox="../../assets/images/manage-apps-status-expanded.png":::

The admins can do their due diligence about your app and they can read the [app documentation that you provide]() before they allow their users to use your app. For example, the admins can purchase the required licenses and distribute the licenses before allowing users to use the app. To allow the app with **Blocked by publisher** status, an admin can select **Allow** in the **[Manage apps](https://admin.teams.microsoft.com/policies/manage-apps)** page in Teams admin center.

:::image type="content" source="../../assets/images/manage-apps-allow.png" alt-text="Screenshot shows the Allow option for the app blocked by publisher." lightbox="../../assets/images/manage-apps-allow-expanded.png":::

If you don't want your app to be blocked by default, update the `defaultBlockUntilAdminAction` setting to `false` and submit your updated app for publishing. After we publish the new version of your app, it's allowed by default.

> [!NOTE]
> For custom apps built for your org, `defaultBlockUntilAdminAction` isn't supported. If you upload a custom app built for your organization with this property, the app isn't blocked.

## Next step

> [!div class="nextstepaction"]
> [Create your app package](~/concepts/build-and-test/apps-package.md)
