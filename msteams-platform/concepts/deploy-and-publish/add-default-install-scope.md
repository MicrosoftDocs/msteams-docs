---
title: Configure default options for your app
description: Learn how to specify your Teams app's default install options, default capability for shared scopes, default landing capability for personal tab and bot apps, and block apps by default.
ms.topic: how-to
ms.localizationpriority: medium
ms.author: surbhigupta
ms.date: 03/05/2025
---
# Configure default options for Teams app

It’s common for an app to support multiple scenarios in Microsoft Teams, but you might have designed it with a specific scope and capability in mind. Teams UI helps users to identify the default scope to install your app.

When a user installs an app from Microsoft Teams Store or uploads a custom app, the user has the option to open the app in either personal or shared scope:

* Personal scope: If an app supports personal scope, the **Open** option in the scope selection dialog allows to open the app in personal scope. 

* Shared scope: If an app supports shared scopes, all the supported scopes such as channel, chat, and meeting are listed to select the required scope. If your app is configured with a default install scope, a **Recommended** label appears adjacent to the respective scope.

    :::image type="content" source="../../assets/images/compose-extensions/addanapp.png" alt-text="Screenshot of the scope selection dialog to select the required scope to use the app.":::

If your app's primary capability is a bot and intended to work in personal scope, you can set the default capability as bot and also set the default scope as personal.

## Configure your app's default install scope

You can use default install scope to specify whether your app is available for personal, channel, chat, or meeting scopes. When you configure the default install scope, you can set only one scope at a time. For more information, see [app manifest](../../resources/schema/manifest-schema.md#defaultinstallscope).

To configure the default install scope in your app manifest:

1. Open your app manifest and add the `defaultInstallScope` property.
2. Set default install scope value as either `personal`, `team`, `groupChat`, or `meetings`.

    ```json
    "defaultInstallScope": "meetings",
    ```

### App install user experience

App installation within the configured default install scope such as personal, channel, chat, or meeting scopes is quick and straightforward. The following procedures outline the user flow for installing an app within the configured scope:

</br>
<details>
<summary>Personal scope only</summary>

If an app is configured only with personal scope, here's the user flow to add the app:

1. Go to **Apps** :::image type="icon" source="../../assets/images/compose-extensions/app-icon.png" border="false":::.

1. Browse and select the app that you want to install.

1. In the app details dialog, select **Add**.

    :::image type="content" source="../../assets/images/compose-extensions/app-add-button.png" alt-text="Screenshot of the app details dialog with the Add option to install the app.":::

    When the app is added, a dialog appears to open the app in personal scope.

1. Select **Open**. The app opens in personal scope.

    :::image type="content" source="../../assets/images/compose-extensions/personal-scope.png" alt-text="Screenshot of the scope selection dialog with the Open option highlighted to open the app in personal scope.":::

</details>
</br>
<details>
<summary>Personal and shared scopes</summary>

If an app is configured with personal and shared scopes along with a default install scope, here's the user flow to add the app in the required scope:

1. Go to **Apps** :::image type="icon" source="../../assets/images/compose-extensions/app-icon.png" border="false":::.

1. Browse and select the app that you want to install.

1. In the app details dialog, select **Add**.

    :::image type="content" source="../../assets/images/compose-extensions/app-add-button.png" alt-text="Screenshot of the app details dialog with the Add option to install the app.":::

     When the app is added, a dialog appears to select the scope.

1. Select **Open** to open the app in personal scope.

    Alternatively, you can either select from the recommended scope or search and select the required shared scope, and move through the dialog to select **Go**.

    :::image type="content" source="../../assets/images/compose-extensions/personal-other-scope.png" alt-text="Screenshot of the scope selection dialog with the options to open the app in personal or shared scopes.":::

    The app opens in the scope that you selected.

    > [!NOTE]
    >
    > * The **Recommended** button indicates the scope in which the app provides best usage experience.
    > * The **View more** option lists the respective channel, chat, or meeting options available for the user.
    > * When adding an app to a meeting, upcoming scheduled meetings might not appear. To add an app to an upcoming meeting, see [tabs in Teams meetings](../../apps-in-teams-meetings/build-tabs-for-meeting.md#tabs-in-teams-meetings).

</details>
</br>
<details>
<summary>Shared scope</summary>

If an app is configured with shared scopes along with a default install scope, here's the user flow to add the app in the required scope:

1. Go to **Apps** :::image type="icon" source="../../assets/images/compose-extensions/app-icon.png" border="false":::.

1. Browse and select the app that you want to install.

1. In the app details dialog, select **Add**.

    :::image type="content" source="../../assets/images/compose-extensions/app-add-button.png" alt-text="Screenshot of the app details dialog with the Add option to install the app.":::

    When the app is added, a dialog appears to select the scope.

1. Select either from the recommended scope or search and select the required shared scope, and move through the dialog to select **Go**.

    :::image type="content" source="../../assets/images/compose-extensions/other-scope.png" alt-text="Screenshot of the scope selection dialog with the search option to select from the list of shared scopes.":::

    The app opens in the scope that you selected.

</details>
</br>

## Configure the default capability for shared scopes

Configure the default capability when your app is installed for a team, meeting, or groupchat. For more information, see [app manifest](../../resources/schema/manifest-schema.md#defaultgroupcapability).

> [!NOTE]
> `defaultGroupCapability` provides the default capability that's added to the team, group chat, or meeting. Select a tab, bot, or connector as the default capability for your app, but you must ensure that you have provided the selected capability in your app definition.

To configure details in app manifest:

1. Open your app manifest and add the `defaultGroupCapability` property to it.
2. Set a value of `team`, `groupchat`, or `meetings`.
3. For the selected group capability, the available group capabilities are `bot`, `tab`, or `connector`.

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

You can configure the default landing capability for an app that supports both bot and tab capabilities in personal scope. Based on this configuration, the app opens either as a bot or a tab by default.

You can configure any one of the following:

* [Bot as default landing capability](#bot-as-default-landing-capability)
* [Tab as default landing capability](#tab-as-default-landing-capability)

### Bot as default landing capability

Configure your app to open as a bot by default:

# [Desktop](#tab/desktop)

1. Open your app manifest.
1. Under `bots` property, define `scopes` as `personal`.

    ```json
    "bots": [
        {
            "botId":"<botId>",
            "scopes": [
            "personal"
            ]
    ```

> [!NOTE]
> Bot acts as the default landing capability if its scope is defined as personal, even if you don't specify `entityId` as `conversations` in `staticTabs` property.

 The following example demonstrates opening an app with bot as default landing capability and how a user can transition to a tab:

 :::image type="content" source="../../assets/images/default-scope/bot-default.gif" alt-text="Graphic shows the process of opening an app with bot as default landing capability.":::

# [Mobile](#tab/mobile)

1. Open your app manifest.
1. Under `bots` property, define `scopes` as `personal`.

    ```json
    "bots": [
        {
            "botId":"<botId>",
            "scopes": [
            "personal"
            ]
    ```

1. Under `staticTabs` property:
    1. Add the following properties as the first entry of the array:
        1. Define `entityId` as `conversations`.
        1. Define `scopes` as `personal`.
    1. Add the tab properties as defined in the [app manifest](../../resources/schema/manifest-schema.md#statictabs).

 The following code snippet is an example for configuring bot as the default landing capability for mobile:

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

The following example demonstrates opening an app with bot as default landing capability and how a user can transition to a tab for:

* Android client
* iOS client

  # [Android](#tab/android)

    The app opens by default as a bot. A user can transition to the tab using the tab icon available at the top-right corner.

    :::image type="content" source="../../assets/images/default-scope/android-bot.gif" alt-text="Graphic shows the process of opening an app with bot as default landing capability in android.":::

  # [iOS](#tab/ios)

    The app opens by default as a bot. A user can transition to the tab either by selecting the back button or by pulling down the bot overlay.

    :::image type="content" source="../../assets/images/default-scope/ios-bot.gif" alt-text="Graphic shows the process of opening an app with bot as default landing capability in iOS.":::

    ---

---

### Tab as default landing capability

Configure your app to open as a tab by default:

# [Desktop](#tab/Desktop)

1. Open your app manifest.
1. Under `staticTabs` property:
    1. Add the tab properties as the first entry of the array. To define tab properties, see [app manifest](../../resources/schema/manifest-schema.md#statictabs).
    1. Add the following properties:
        1. Define `entityId` as `conversations`.
        1. Define `scopes` as `personal`.

The following code snippet is an example for setting tab as the default landing capability:

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

 The following example demonstrates opening an app with tab as default landing capability and how a user can transition to a bot:

 :::image type="content" source="../../assets/images/default-scope/tab-default.gif" alt-text="Graphic shows the process of opening an app with tab as default landing capability.":::

# [Mobile](#tab/Mobile)

1. Open your app manifest.
1. Under `staticTabs` property, add the tab properties as the first entry of the array. To define tab properties, see [app manifest](../../resources/schema/manifest-schema.md#statictabs).

The following code snippet is an example for setting tab as the default landing capability  for mobile:

```json
 "staticTabs":[
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

> [!NOTE]
> Tab acts as the default landing capability in mobile, even if you don't specify `entityId` as `conversations` in `staticTabs` property.

The following example demonstrates opening an app with tab as default landing capability and how a user can transition to a bot for:

* Android
* iOS

  # [Android](#tab/android1)

    The app opens by default as a tab. A user can transition to the bot using the bot icon available at the top-right corner.

   :::image type="content" source="../../assets/images/default-scope/android-tab.gif" alt-text="Graphic shows the process of opening an app with tab as default landing capability in android.":::

  # [iOS](#tab/ios1)

    The app opens by default as a tab. A user can transition to the bot using the bot icon available at the top-right corner.

   :::image type="content" source="../../assets/images/default-scope/ios-tab.gif" alt-text="Graphic shows the process of opening an app with tab as default landing capability in iOS.":::

   ---

---

The `staticTabs` property is also used to pin personal tabs and [reorder tabs](../../tabs/how-to/create-personal-tab.md#reorder-tabs). For more information, see [app manifest](../../resources/schema/manifest-schema.md#statictabs).

## Block apps by default for users until an admin approves

To enhance the user experience of a Teams app, at times, IT administrators must intervene before users use the app. For example, consider a help desk app created by Contoso Electronics for Teams. To ensure the app functions properly, Contoso Electronics wants customers to configure specific properties of the app first.

To ensure that IT admins perform the relevant tasks, developers can block an app for users until an admin allows the app. To block the app by default, set the `defaultBlockUntilAdminAction` property to `true` in the app manifest file. When the property is set to `true`, the status of the app in Teams admin center is **Blocked by publisher** in the [Manage apps](https://admin.teams.microsoft.com/policies/manage-apps) page.

:::image type="content" source="../../assets/images/manage-apps-status.png" alt-text="Screenshot shows an app blocked by publisher." lightbox="../../assets/images/manage-apps-status-expanded.png":::

The admins can do their due diligence about your app and they can read the [app documentation that you provide]() before they allow their users to use your app. For example, the admins can purchase the required licenses and distribute the licenses before allowing users to use the app. To allow the app with **Blocked by publisher** status, an admin can select **Allow** in the **[Manage apps](https://admin.teams.microsoft.com/policies/manage-apps)** page in Teams admin center.

:::image type="content" source="../../assets/images/manage-apps-allow.png" alt-text="Screenshot shows the Allow option for the app blocked by publisher." lightbox="../../assets/images/manage-apps-allow-expanded.png":::

If you don't want your app to be blocked by default, update the `defaultBlockUntilAdminAction` setting to `false` and submit your updated app for publishing. After we publish the new version of your app, it's allowed by default.

> [!NOTE]
> For custom apps built for your org, `defaultBlockUntilAdminAction` isn't supported. If you upload a custom app built for your organization with this property, the app isn't blocked.

## Code sample

|**Sample name** | **Description** | **.NET** | **Node.js** | **Manifest**|
|----------------|-----------------|--------------|----------------|-----------|-----------|
| Hello world | This sample demonstrates how to configure default landing capability for an app that supports both bot and tab capabilities in personal scope. | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/app-hello-world/csharp) | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/app-hello-world/nodejs) | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/app-hello-world/csharp/demo-manifest/app-hello-world.zip)|


## Next step

> [!div class="nextstepaction"]
> [Create your app package](~/concepts/build-and-test/apps-package.md)
