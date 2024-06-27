---
title: Configure default options for your app
description: Learn how to specify your Teams app's default install options, default capability for shared scopes and block apps by default.
ms.topic: how-to
ms.localizationpriority: medium
ms.author: surbhigupta
ms.date: 12/15/2022
---
# Configure default options for Teams app

It’s common for an app to support multiple scenarios in Teams, but you might have designed it with a specific scope and capability in mind. For example, if your app is primarily for team or channel use, then you can make sure the users can only that specific scope in the Microsoft Teams Store and install in the respective scope.

When the user selects the **Add** option, a dialog to choose the install scope appears.

:::image type="content" source="../../assets/images/compose-extensions/addanapp.png" alt-text="Screenshot shows the channel, chat, and meeting scope.":::

If your app's primary capability is a bot, you can also make the bot the default capability when a user installs your app to a team.

## Configure your app's default install scope

Default install scope allows you to specify whether your app is available for personal, team, or meeting scopes. You can configure the app's default install scope and can set only one scope at a time. For more information, see [app manifest](../../resources/schema/manifest-schema.md#defaultinstallscope).

To configure the default install scope in your app manifest:

1. Open your app manifest and add the `defaultInstallScope` property.
2. Set default install scope value as, either `personal`, `team`, `groupchat`, or `meetings`.

    ```json
    "defaultInstallScope": "meetings",
    ```

### App install user experience

App installation in the personal, channel, chat, and meeting scopes are quick and simple. The following procedures details the user install scope of personal and shared scope when app is installed from Store.

</br>
<details>
<summary>Personal scope only</summary>

If the app is configured with personal scope, the user needs to follow these steps to add the app in the personal scope:

1. Go to Apps, search for the app to install, and select **Add**.

    :::image type="content" source="../../assets/images/compose-extensions/app-open-button.png" alt-text="Screenshot shows the Add to a team option.":::

    When the app is added, a dialog appears to add the app in personal scope.

1. Select **Use on your own**. The app gets added in the personal scope.

    :::image type="content" source="../../assets/images/compose-extensions/personal-scope.png" alt-text="Screenshot shows to personal scope.":::

</details>
</br>
<details>
<summary>Personal and other scopes</summary>

If the app is configured with personal and shared scope, the user needs to follow these steps to add the app in the required scope:

1. Go to Apps, search for the app to install, and select **Add**.

    :::image type="content" source="../../assets/images/compose-extensions/app-open-button.png" alt-text="Screenshot shows the Add to a team option.":::

    When the app is added, the following dialog appears with the option to add in personal or shared space.

1. Select **Use on your own** to add in the personal scope.

    Alternatively, select from the list of shared scopes.

    :::image type="content" source="../../assets/images/compose-extensions/personal-other-scope.png" alt-text="Screenshot shows to personal scope.":::

    The app gets added in the selected scope.

    >[!NOTE]
    >
    > * **Recommended** button indicates the scope where the app has the best usage (where the app provides best usage experience).
    > * **View more** option lists the respective channel, chat, and meetings scopes available for the user.

</details>
</br>
<details>
<summary>Other scopes</summary>

If the app is configured only with shared scope, the user needs to follow these steps to add the app in the required scope:

1. Go to Apps, search for the app to install, and select **Add**.

    :::image type="content" source="../../assets/images/compose-extensions/app-open-button.png" alt-text="Screenshot shows the Add to a team option.":::

    When the app is added, the following dialog appears with the option to select the scope.

1. Select from the list of shared scopes. The app gets added in the selected scope.

    :::image type="content" source="../../assets/images/compose-extensions/other-scope.png" alt-text="Screenshot shows to personal scope.":::

</details>
</br>

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
