---
title: Extend a Teams meeting app to Outlook
description: Here's how to ensure your Teams meeting app experience works seamlessly when extended to Outlook
ms.date: 08/31/2023
ms.author: mosdevdocs
author: erikadoyle
ms.topic: tutorial
ms.localizationpriority: medium
ms.subservice: m365apps
---
# Extend a Teams meeting app to Outlook

> [!NOTE]
>
> While in preview, Outlook support for Teams meeting apps is only available in [Beta Channel builds](https://insider.microsoft365.com/en-us/join/windows) of the Outlook for Windows desktop client.

Across the Microsoft 365 ecosystem, most monthly users schedule their Teams meetings from Outlook. To help users stay in the flow of their work, Teams meeting apps are now supported on Outlook. You can configure and add meeting apps to the Teams meetings scheduled from Outlook and also run meeting apps within the Outlook calendar.

[Meeting apps](../apps-in-teams-meetings/design/designing-apps-in-meetings.md) are essentially Teams tab apps that are designed to foster collaboration before, during, and after meetings. You can specify which contexts your meeting app supports from the app manifest (previously called Teams app manifest) through the [configurableTabs.context](../resources/schema/manifest-schema.md#configurabletabs) property.

The following table shows the Teams meeting app contexts supported in Outlook:

| Teams meeting context | App manifest value | TeamsJS value | Outlook support |
|--|--|--|--|
| [Meeting details view](../apps-in-teams-meetings/build-tabs-for-meeting.md#meeting-details-view) | `meetingDetailsTab` | `frameContext.content` | ✔️ |
| [Meeting chat view](../apps-in-teams-meetings/build-tabs-for-meeting.md#meeting-chat-view) | `meetingChatTab` | `frameContext.content` | ✔️ |
| [Meeting side panel view](../apps-in-teams-meetings/build-tabs-for-meeting.md#meeting-side-panel-view) | `meetingSidePanel` | `frameContext.sidePanel` | ✔️ |
| [Meeting stage view](../apps-in-teams-meetings/build-tabs-for-meeting.md#meeting-stage-view) | `meetingStage` | `frameContext.meetingStage` | ❌ |

If your meeting app supports stage view, other in-meeting effects, or contains elements such as message extensions and bots, these continue to work in Teams when the meeting is scheduled from Outlook, but won't appear or run in Outlook.

This article walks you through the steps to ensure your Teams meeting app experience works seamlessly when extended to Outlook.

## Prerequisites

To preview your meeting app in Outlook, you need:

* A [Microsoft 365 developer sandbox](./prerequisites.md#prepare-a-developer-tenant-for-testing) tenant with sideloading enabled.
* A test environment with Outlook for Windows desktop installed from the [Microsoft 365 Apps *Beta Channel*](./prerequisites.md#install-microsoft-365-apps-in-your-test-environment).
* [NodeJS](https://nodejs.org/download) (with npm) installed.
* [TeamsFx CLI v2](../toolkit/TeamsFx-CLI.md) library installed from NPM.
* [Visual Studio Code](https://code.visualstudio.com/) installed to your development environment.
* [Teams Toolkit](https://marketplace.visualstudio.com/items?itemName=TeamsDevApp.ms-teams-vscode-extension) extension for Visual Studio Code.

### Quickstart

Follow these steps to quickly build a simplified Teams meeting app without any authentication that you can use to preview in Outlook:

1. Open Microsoft Teams signed in with your test tenant, select **Calendar**, and create a **New meeting**.

:::image type="content" source="images/teams-new-meeting.png" alt-text="New meeting panel in Teams":::

1. Launch Visual Studio Code, open the Teams Toolkit extension, and select **View Samples**.

    :::image type="content" source="images/toolkit-meeting-app-sample.png" alt-text="`My First Meeting App` sample in Teams Toolkit":::

1. Select **My First Meeting App** > **Create** and specify the folder for creating the workspace.

1. Press `F5` to debug and run the sample locally in Teams. If you have Microsoft Azure subscription, you can use Teams Toolkit to **Provision** the resources and **Deploy** your app to run remotely in Microsoft Azure, which requires signing in to Azure from Teams Toolkit.

1. Microsoft Teams will launch and prompt you to install the app. Select **Add to a meeting** from the dropdown and select the meeting that you've created earlier.

    :::image type="content" source="images/teams-add-to-meeting.png" alt-text="Add app to meeting option in Microsoft Teams":::

1. The sample tab configuration dialog opens. Select **Save** to view your meeting app from meeting chat view.

    :::image type="content" source="images/teams-meeting-chat-view.png" alt-text="{alt-text}":::

Now you can [sideload your app with TeamsFx CLI](#sideload-your-app-using-teamsfx-cli) and then [preview your meeting app in Outlook](#preview-your-meeting-app-in-outlook).

## Checklist for enabling meeting apps in Outlook

The requirements for extending meeting apps in Outlook are similar to [extending personal tabs to Outlook](./extend-m365-teams-personal-tab.md), however you need to use TeamsFx CLI for sideloading, as sideloading from Teams isn't supported.

Extending your Teams meeting app in Outlook involves the following:

> [!div class="checklist"]
>
> * [Use app manifest version 1.13 or later](#use-app-manifest-version-113-or-later).
> * [Use TeamsJS library v2.5.0 or later](#use-teamsjs-version-250-or-later).
> * [Configure Content Security Policy headers](#configure-csp-headers-for-outlook).
> * [Update Azure Active Directory (Azure AD) app registration for single sign-on (SSO)](#update-azure-ad-app-registration-for-sso).
> * [Sideload your updated app using TeamsFx CLI](#sideload-your-app-using-teamsfx-cli).

If you have an existing meeting app, make a copy or a branch of your production project and update your app `id` in the app manifest to use a new identifier that is different from the production app ID for testing.

### Use app manifest version 1.13 or later

Use app manifest schema version 1.13 or later for extending Teams apps to run across other Microsoft 365 hosts including Outlook. If you need to upgrade your app manifest from an earlier version, you have two options:

# [Teams Toolkit](#tab/manifest-teams-toolkit)

1. Open the command palette: `Ctrl+Shift+P`.
1. Run the `Teams: Upgrade Teams manifest` command and select your app manifest file. Changes are applied within the file.

# [Manual steps](#tab/manifest-manual)

Open your Teams app manifest and update the `$schema` and `manifestVersion` manually with the appropriate version. For more information, see [app manifest](../resources/schema/manifest-schema.md):

```json
{
    "$schema" : "https://developer.microsoft.com/json-schemas/teams/v1.16/MicrosoftTeams.schema.json",
    "manifestVersion" : "1.16"
}
```

---

### Use TeamsJS version 2.5.0 or later

Use TeamsJS client library version 2.5.0 or later to extend your Teams meeting app to run in Outlook. If your app uses TeamsJS v2.5.0 or later, application code changes aren't required to run in Outlook.

If you need to upgrade your TeamsJS npm package from v1.x.x to the latest v2.x.x TeamsJS, you can use Teams Toolkit to help identify and automate the required code changes. Also, you can perform the same steps manually. For more information, see [TeamsJS library](../tabs/how-to/using-teams-client-library.md#whats-new-in-teamsjs-version-2xx) for details.

Following are the steps to update your TeamsJS to the latest version using Teams toolkit:
1. Open the *Command palette*: `Ctrl+Shift+P`.
1. Run the command `Teams: Upgrade Teams JS SDK and code references`.

On completion, your *package.json* file references `@microsoft/teams-js@2.x.x` and your `*.js/.ts` and `*.jsx/.tsx` files are updated with:

* Import statements for `teams-js@2.x.x`
* [Function, Enum, and Interface calls](../tabs/how-to/using-teams-client-library.md#whats-new-in-teamsjs-version-2xx) for `teams-js@2.x.x`
* `TODO` comment reminders flagging areas that might be impacted by [Context](../tabs/how-to/using-teams-client-library.md#updates-to-the-context-interface) interface changes
* `TODO` comment reminders to [convert callback functions to promises](../tabs/how-to/using-teams-client-library.md#callbacks-converted-to-promises)

> [!NOTE]
>
> Code inside *.html* files is not updated by the upgrade tooling and will require manual changes.

### Configure CSP headers for Outlook

Teams tab applications are hosted within [iframe elements](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe) in Outlook, as they are in Microsoft Teams. If your app uses [Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy) (CSP) headers, add `outlook.office.com` as a [frame-ancestor](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/frame-ancestors).

### Update Azure AD app registration for SSO

[Azure AD SSO](../tabs/how-to/authentication/tab-sso-overview.md) for meeting apps works the same way in Outlook as it does in Teams. However, you need to manually add the Outlook application ID to your Azure AD app registration in your tenant's **App registrations** portal.

1. Sign in to [Azure portal](https://portal.azure.com) with your test tenant account.
1. Open **App registrations**.
1. Select your app.
1. Under **Manage**, select  **Expose an API**.

    :::image type="content" source="images/azure-app-registration-clients.png" alt-text="Screenshot shows the Authorized client Ids from the App registrations blade on Azure portal.":::

1. In the **Authorized client applications** section, add the following `Client Id` value:

    |Microsoft 365 client application | Client ID |
    |--|--|
    |Outlook desktop | d3590ed6-52b3-4102-aeff-aad2292ab01c |

For more information on client application IDs used to extend Teams apps across the Microsoft 365, see [Teams tabs in Microsoft 365 and Outlook](extend-m365-teams-personal-tab.md#update-azure-ad-app-registration-for-sso).

### Sideload your app using TeamsFx CLI

To run your app in Microsoft 365 and Outlook sideload your [app package](..//concepts/build-and-test/apps-package.md) using the TeamsFx CLI.

1. Package your Teams [app manifest](../resources/schema/manifest-schema.md) and [app icons](/microsoftteams/platform/resources/schema/manifest-schema#icons) in a zip file. If you've used Teams Toolkit to create your app, you can use the **Zip Teams App Package** option in the **UTILITY** section of Teams Toolkit. Select the `manifest.json` file of your app and the appropriate environment (**local** or **dev**). Teams Toolkit displays a dialog linking to the zip file location.

    :::image type="content" source="images/toolkit-zip-teams-app-package.png" alt-text="Screenshot shows the Zip Teams App Package option in Teams Toolkit extension for Visual Studio Code.":::

1. The preview for Teams meeting app support in Outlook requires you to sideload your app package using TeamsFx CLI.

    > [!NOTE]
    > Sideloading from the **Manage your apps** option in Teams client isn't supported.

    Ensure TeamsFx CLI is installed:

    ```bash
    npm install -g @microsoft/teamsfx-cli
    ```

1. To sideload your app in Teams, use the following command by replacing *<path\to\appPackage.zip>* with the path to your app package:

    ```bash
    teamsfx m365 sideloading --file-path <path\to\appPackage.zip>
    ```

After your meeting app is sideloaded to Teams, it's available for use in both Teams and Outlook. It might take several minutes and a restart of the Outlook for Windows desktop client for your app to appear in the **Apps** menu.

## Preview your meeting app in Outlook

Here's how to preview your meeting app running on Outlook for Windows desktop:

1. With your meeting app running (either remotely from Azure, or locally from Teams Toolkit `F5`), open Outlook for Windows desktop signed in to your test tenant account. If Outlook is already running, close and restart it again.

1. Open **Calendar** and select **New Meeting**. For a meeting app to run in Outlook, the meeting must be a Teams meeting as meeting apps aren't supported in other meetings scheduled from Outlook.

1. From the meeting scheduling window, select **All Apps**. Your sideloaded meeting app appears among your installed meeting apps.

    :::image type="content" source="images/outlook-meeting-all-apps.png" alt-text="Sideloaded meeting app showing in `All Apps` menu of Outlook meeting scheduler":::

1. Select your meeting app. This opens a configuration dialog, where your app user configures any relevant app settings for their specific meeting.

    :::image type="content" source="images/outlook-meeting-app-configuration.png" alt-text="Meeting app configuration page showing from Outlook meeting scheduler":::

1. Select **Add** to dismiss the dialog. Your meeting app displays in the side panel of the scheduling window and the **Apps** field will indicate its availability to participants in the meeting.

1. From the **Apps** list, you can open the dropdown menu on your app to see how the app appears in the Store (**About**), update the app configuration for the specific meeting (**Settings**), or remove the app from the meeting (**Remove**).

    You can configure the appearance of **Settings** and **Remove** in Outlook, the same as with [other configurable tabs in Teams](../tabs/how-to/create-tab-pages/removal-page.md#enable-your-tab-to-be-reconfigured-after-installation).

    :::image type="content" source="images/outlook-meeting-app-side-panel.png" alt-text="Meeting app running in Outlook meeting scheduler side panel":::

1. To uninstall the meeting app, open Teams and select **Apps** > **Manage your apps**. Select your sideloaded meeting app in the list, and **Remove**. You need to restart Outlook to see the change reflected in the **All Apps** menu from the meeting scheduler.

    :::image type="content" source="images/teams-manage-your-apps-remove.png" alt-text=" `Manage your apps` pane of Microsoft Teams showing the sideloaded meeting app `Remove` option":::


## Code sample

| **Sample Name** | **Description** | **Node.js** |
|---------------|--------------|--------|
| HelloWorld In-meeting app| Simple meeting app demonstrating meeting details view, chat view, and side panel. Works in Teams, Outlook. | [View](https://github.com/OfficeDev/TeamsFx-Samples/tree/dev/hello-world-in-meeting)  |

## See also

* [Extend Teams apps across Microsoft 365](overview.md)
* [Support and feedback](~/feedback.md)
