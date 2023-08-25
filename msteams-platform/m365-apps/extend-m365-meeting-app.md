---
title: Extend a Teams meeting app to Outlook
description: Here's how to ensure your Teams meeting app experience works seamlessly when extended to Outlook
ms.date: 08/21/2023
ms.author: mosdevdocs
author: erikadoyle
ms.topic: tutorial
ms.localizationpriority: medium
ms.subservice: m365apps
---
# Extend a Teams meeting app to Outlook

> [!NOTE]
>
> * Outlook support for Teams meeting apps is only available in Outlook for Windows desktop [BetaChannel preview builds](https://insider.microsoft365.com/en-us/join/windows).

Across the Microsoft 365 ecosystem, most monthly users schedule their Teams meetings from Outlook. To help users stay in the flow of their work, **Teams meeting apps are now supported (in preview) on Outlook for Windows desktop**. Not only can you configure and add meeting apps to Teams meetings scheduled from Outlook, you can also run meeting apps within the Outlook calendar! Here's how to ensure your Teams meeting app experience works seamlessly when extended to Outlook.

[Meeting apps](../apps-in-teams-meetings/design/designing-apps-in-meetings.md) are essentially Teams tab apps that are designed to foster collaboration before, during, and after meetings. As a developer, you can specify which *contexts* (UI locations within a Teams meeting) your meeting app supports from the app manifest ([configurableTabs.context](../resources/schema/manifest-schema.md#configurabletabs)).

The following table shows the Teams meeting app contexts supported in Outlook:

| Teams meeting context | app manifest value | TeamsJS value | Outlook support
|--|--|--|--|
| [Meeting details view](../apps-in-teams-meetings/build-tabs-for-meeting.md#meeting-details-view) | `meetingDetailsTab` | `frameContext.content` | ✔️ |
| [Meeting chat view](../apps-in-teams-meetings/build-tabs-for-meeting.md#meeting-chat-view) | `meetingChatTab` | `frameContext.content` | ✔️ |
| [Meeting side panel view](../apps-in-teams-meetings/build-tabs-for-meeting.md#meeting-side-panel-view) | `meetingSidePanel` | `frameContext.sidePanel` | ✔️ |
| [Meeting stage view](../apps-in-teams-meetings/build-tabs-for-meeting.md#meeting-stage-view) | `meetingStage` | `frameContext.meetingStage` | ❌ |

If your meeting app supports stage view, other in-meeting effects, or contains elements such as message extensions and bots, these will continue to work in Teams when the meeting is scheduled from Outlook, but will not otherwise surface in Outlook.

The rest of this guide walks your through the steps to ensure your Teams meeting app experience works seamlessly when extended to Outlook.

## Prerequisites

To preview your meeting app in Outlook, you need:

* A [Microsoft 365 developer sandbox](./prerequisites.md#prepare-a-developer-tenant-for-testing) tenant with sideloading enabled.
* A test environment with Outlook for Windows desktop installed from the [Microsoft 365 Apps *Beta Channel*](./prerequisites.md#install-microsoft-365-apps-in-your-test-environment).
* [NodeJS](https://nodejs.org/download) (with npm) installed.
* [TeamsFx CLI v2](../toolkit/TeamsFx-CLI.md) library installed from NPM.

### Quickstart

Follow these steps to quickly build a simplified (no authentication) Teams meeting app that you can use to preview in Outlook.

1. Open Microsoft Teams (signed in to your test tenant), select *Calendar*, and create a **New meeting**.
:::image type="content" source="images/teams-new-meeting.png" alt-text="New meeting panel in Teams":::
1. Install [Visual Studio Code](https://code.visualstudio.com/) and the [Teams Toolkit](https://marketplace.visualstudio.com/items?itemName=TeamsDevApp.ms-teams-vscode-extension) extension.
1. Launch Visual Studio Code, open the Teams Toolkit extension, and select **View Samples**.
:::image type="content" source="images/toolkit-meeting-app-sample.png" alt-text="`My First Meeting App` sample in Teams Toolkit":::
1. Select *My First Meeting App*, press the **Create** button, and specify a folder for creating the workspace.
1. Press `F5` to run the sample locally in Teams. Alternately, if you have an Microsoft Azure subscription, you can use Teams Toolkit to **Provision** resources and **Deploy** your app to run remotely in Microsoft Azure. (This requires first signing in to Azure from Teams Toolkit.)
1. Microsoft Teams will launch and prompt you to install the app. Select **Add to a meeting** from the dropdown and select the meeting you created in Step 1.
:::image type="content" source="images/teams-add-to-meeting.png" alt-text="Add app to meeting option in Microsoft Teams":::
1. The sample tab configuration dialog will open. Select **Save** to dismiss it and view your meeting app from Teams *Chat* (in *meeting chat view*).
:::image type="content" source="images/teams-meeting-chat-view.png" alt-text="{alt-text}":::

From here, you can skip ahead to [sideload your app with TeamsFx CLI](#sideload-your-app-using-teamsfx-cli) and then [preview your meeting app in Outlook](#preview-your-meeting-app-in-outlook).

## Checklist for enabling meeting apps in Outlook

The requirements for extending meeting apps in Outlook are similar to [extending personal tabs to Outlook](./extend-m365-teams-personal-tab.md), however to sideload your app for testing, you'll need to use TeamsFx CLI (sideloading from Teams is not currently supported).

Extending your Teams meeting app in Outlook involves the following:

> [!div class="checklist"]
>
> * [Use app manifest version 1.13 or higher](#use-app-manifest-version-113).
> * [Use TeamsJS library v2.5.0 or higher](#use-teamsjs-version-250).
> * [Configure Content Security Policy headers](#configure-csp-headers-for-outlook).
> * [Update your Microsoft AD App Registration for SSO](#update-azure-ad-app-registration-for-sso).
> * [Sideload your updated app using TeamsFx CLI](#sideload-your-app-using-teamsfx-cli).

If you have an existing meeting app, make a copy or a branch of your production project for testing and update your App ID in the app manifest to use a new identifier (distinct from the production App ID) for testing.

### Use app manifest version 1.13+

Use app manifest schema version `1.13` or higher for extending Teams apps to run across other Microsoft 365 hosts, including Outlook. If you need to upgrade your app manifest from an earlier version, you have two options:

# [Teams Toolkit](#tab/manifest-teams-toolkit)

1. Open the command palette: `Ctrl+Shift+P`.
1. Run the `Teams: Upgrade Teams manifest` command and select your app manifest file. Changes are made in place.

# [Manual steps](#tab/manifest-manual)

Open your Teams app manifest and update the `$schema` and `manifestVersion` manually with the appropriate version. Refer to [Teams developer manifest](../resources/schema/manifest-schema.md) for version information:

```json
{
    "$schema" : "https://developer.microsoft.com/json-schemas/teams/v1.14/MicrosoftTeams.schema.json",
    "manifestVersion" : "1.16"
}
```

### Use TeamsJS version 2.5.0+

Use TeamsJS client library version `2.5.0` or higher to extend your meeting app to run in Outlook. As long as your app uses TeamsJS v2.5.0 or higher, no application code changes are required to run in Outlook.

If you need to upgrade your TeamsJS npm package from v1.x.x to the latest (2.x.x) TeamsJS, you can use Teams Toolkit to help identify and automate the required code changes. Alternately, you can perform the same steps manually; refer to [TeamsJS library](../tabs/how-to/using-teams-client-library.md#whats-new-in-teamsjs-version-2xx) for details.

1. Open the *Command palette*: `Ctrl+Shift+P`.
1. Run the command `Teams: Upgrade Teams JS SDK and code references`.

Upon completion, your *package.json* file references `@microsoft/teams-js@2.x.x` and your `*.js/.ts` and `*.jsx/.tsx` files are updated with:

* Import statements for `teams-js@2.x.x`
* [Function, Enum, and Interface calls](../tabs/how-to/using-teams-client-library.md#whats-new-in-teamsjs-version-2xx) for `teams-js@2.x.x`
* `TODO` comment reminders flagging areas that might be impacted by [Context](../tabs/how-to/using-teams-client-library.md#updates-to-the-context-interface) interface changes
* `TODO` comment reminders to [convert callback functions to promises](../tabs/how-to/using-teams-client-library.md#callbacks-converted-to-promises)

Note that code inside *.html* files is not updated by the upgrade tooling and will require manual changes.

### Configure CSP headers for Outlook

As in Microsoft Teams, tab applications are hosted within [iframe elements](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe) in Outlook.

If your app makes use of [Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy) (CSP) headers, make sure you allow `outlook.office.com` as a [frame-ancestor](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/frame-ancestors).

### Update Azure AD app registration for SSO

[Azure Active Directory (AD) Single-sign on (SSO)](../tabs/how-to/authentication/tab-sso-overview.md) for meeting apps works the same way in Outlook as it does in Teams. However, you need to manually add the Outlook application ID to your Azure AD app registration in your tenant's *App registrations* portal.

1. Sign in to [Microsoft Azure portal](https://portal.azure.com) with your test tenant account.
1. Open the **App registrations** blade.
1. Select the name of your meeting app to open its app registration.
1. Select  **Expose an API** (under *Manage*).

    :::image type="content" source="images/azure-app-registration-clients.png" alt-text="Screenshot shows the Authorized client Ids from the App registrations blade on Azure portal.":::

1. In the **Authorized client applications** section, add following `Client Id` value:

    |Microsoft 365 client application | Client ID |
    |--|--|
    |Outlook desktop | d3590ed6-52b3-4102-aeff-aad2292ab01c |

For a full list of client application IDs used to extend Teams apps across the Microsoft 365 ecosystem, see [Teams tabs in Microsoft 365 and Outlook](extend-m365-teams-personal-tab.md#update-azure-ad-app-registration-for-sso).

### Sideload your app using TeamsFx CLI

The final step to running your app in Microsoft 365 and Outlook is to sideload your  [app package](..//concepts/build-and-test/apps-package.md) using the TeamsFx CLI tool.

1. Package your Teams application ([manifest](../resources/schema/manifest-schema.md) and [app icons](/microsoftteams/platform/resources/schema/manifest-schema#icons)) in a zip file. If you used Teams Toolkit to create your app, you can easily do this using the **Zip Teams App Package** option in the **UTILITY** section of Teams Toolkit. Select the `manifest.json` file for your app and the appropriate environment (*local* or *dev*). Once created, Teams Toolkit will display a dialog linking to the zip file location.

    :::image type="content" source="images/toolkit-zip-teams-app-package.png" alt-text="Screenshot shows the Zip Teams App Package option in Teams Toolkit extension for Visual Studio Code.":::

1. The preview for Teams meeting app support in Outlook requires you to sideload your app package using TeamsFx CLI. (Sideloading from the *Manage your apps* option in Teams client is not currently supported.) Ensure TeamsFx CLI is installed:

```cmd
npm install -g @microsoft/teamsfx-cli
```

1. Use the following command to sideload your app package to Teams, replacing *<path\to\appPackage.zip>* with the path to your app package.

```cmd
teamsfx m365 sideloading --file-path <path\to\appPackage.zip>
```

After it's sideloaded to Teams, your meeting app will be available for use in both Teams and Outlook. It may take several minutes to appear in your **Apps** menu in the meeting scheduling UI in both Teams and Outlook clients.

## Preview your meeting app in Outlook

Here's how to preview your meeting app running on Outlook for Windows desktop:

1. With your meeting app running (either remotely from Azure, or locally from Teams Toolkit `F5`), open Outlook for Windows desktop signed in to your test tenant account. If Outlook is already running, close and restart it again.
1. Open *Calendar*, then select **New Meeting**. By default, new meetings are *Microsoft Teams* meetings. For a meeting app to run in Outlook, the meeting must be a Teams meeting (meeting apps are not supported in non-Teams meetings scheduled from Outlook).
1. From the meeting scheduling window, select **All Apps**. Your sideloaded meeting app should appear among your installed meeting apps.
:::image type="content" source="images/outlook-meeting-all-apps.png" alt-text="Sideloaded meeting app showing in `All Apps` menu of Outlook meeting scheduler":::
1. Select your meeting app. This opens its configuration dialog, where your user will configure any relevant app settings for their specific meeting.
:::image type="content" source="images/outlook-meeting-app-configuration.png" alt-text="Meeting app configuration page showing from Outlook meeting scheduler":::
1. Click **Add** to dismiss the dialog. Your meeting app will display in the side panel of the scheduling window and the **Apps** field will indicate its availability to participants in the meeting. You can expand its entry to return to the app configuration page from **Settings**.
:::image type="content" source="images/outlook-meeting-app-side-panel.png" alt-text="Meeting app running in Outlook meeting scheduler side panel":::
1. To uninstall the meeting app (so its no longer available from the *All Apps* menu in Outlook), open Teams and select *Apps* > **Manage your apps**. Select your sideloaded meeting app in the list, and then select **Remove**. You will need to restart Outlook to see the change reflected in the *All Apps* menu from the meeting scheduler.
:::image type="content" source="images/teams-manage-your-apps-remove.png" alt-text=" `Manage your apps` pane of Microsoft Teams showing the sideloaded meeting app `Remove` option":::

Use the [Microsoft Teams developer community channels](/microsoftteams/platform/feedback) to report issues and provide feedback.

## Code sample

| **Sample Name** | **Description** | **Node.js** |
|---------------|--------------|--------|
| Meetings SidePanel| Microsoft Teams meeting extensibility sample for iteracting with Side Panel in-meeting. Works in Teams, Outlook. | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/meetings-sidepanel/nodejs)  |

## See also

* [Extend Teams apps across Microsoft 365](overview.md)
* [Public developer preview for Teams](../resources/dev-preview/developer-preview-intro.md)
