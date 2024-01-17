---
title: Extend a Teams meeting app to Outlook
description: Here's how to ensure your Teams meeting app experience works seamlessly when extended to Outlook
ms.date: 12/05/2023
ms.author: mosdevdocs
author: erikadoyle
ms.topic: tutorial
ms.localizationpriority: medium
ms.subservice: m365apps
---
# Extend a Teams meeting app to Outlook

Across the Microsoft 365 ecosystem, most monthly users schedule their Microsoft Teams meetings from Outlook. To help users stay in the flow of their work, Teams meeting apps are now supported on Outlook. You can configure and add meeting apps to the Teams meetings scheduled from Outlook and also run meeting apps within the Outlook calendar.

Meeting apps are essentially Teams tab apps that are designed to foster collaboration before, during, and after meetings. You can specify which contexts your meeting app supports from the app manifest (previously called Teams app manifest) through the [configurableTabs.context](../resources/schema/manifest-schema.md#configurabletabs) property.

The following table shows the Teams meeting app contexts supported in Outlook:

| Teams meeting context | App manifest value | TeamsJS value | Outlook support |
|--|--|--|--|
| [Meeting details view](../apps-in-teams-meetings/build-tabs-for-meeting.md#meeting-details-view) | `meetingDetailsTab` | `frameContext.content` | ✔️ |
| [Meeting chat view](../apps-in-teams-meetings/build-tabs-for-meeting.md#meeting-chat-view) | `meetingChatTab` | `frameContext.content` | ✔️ |
| [Meeting side panel view](../apps-in-teams-meetings/build-tabs-for-meeting.md#meeting-side-panel-view) | `meetingSidePanel` | `frameContext.sidePanel` | ✔️ |
| [Meeting stage view](../apps-in-teams-meetings/build-tabs-for-meeting.md#meeting-stage-view) | `meetingStage` | `frameContext.meetingStage` | ❌ |

If your meeting app supports stage view, other in-meeting effects, or contains elements such as message extensions and bots, these continue to work in Teams when the meeting is scheduled from Outlook, but doesn't appear or run in Outlook.

## Prerequisites

To preview your Teams meeting app in Outlook, ensure the following::

* A [Microsoft 365 developer sandbox](./prerequisites.md#prepare-a-developer-tenant-for-testing) tenant with sideloading enabled.
* A test environment with Outlook for Windows desktop installed from the [Microsoft 365 Apps *Current Channel*](./prerequisites.md#install-microsoft-365-apps-in-your-test-environment).
* [NodeJS](https://nodejs.org/download) (with npm) installed.
* [TeamsFx CLI v2](../toolkit/TeamsFx-CLI.md) library installed from npm.
* [Visual Studio Code](https://code.visualstudio.com/) installed to your development environment.
* [Teams Toolkit](https://marketplace.visualstudio.com/items?itemName=TeamsDevApp.ms-teams-vscode-extension) extension for Visual Studio Code.

To preview your Teams meeting app in Outlook, you can either build a new meeting app with Teams Toolkit or extend an existing Teams meeting app in Outlook.

# [Build Teams meeting app for Outlook](#tab/ttk)

You can build a Teams meeting app for Outlook through Teams Toolkit extension for Visual Studio Code. To build a Teams meeting app to preview in Outlook:

1. Go to Teams and sign in using your sandbox tenant account.

1. select **Calendar** and schedule a **New meeting**.

    :::image type="content" source="images/teams-new-meeting.png" alt-text="New meeting panel in Teams":::

1. Open the **Teams Toolkit** extension in Visual Studio Code and select **View Samples**.

1. Select **My First Meeting App** > **Create** and specify the folder for creating the workspace.

    :::image type="content" source="images/toolkit-meeting-app-sample.png" alt-text="My First Meeting App sample in Teams Toolkit":::

1. Press `F5` to debug and run the sample locally in Teams.

1. Teams prompts you to install the app. Select **Add to a meeting** from the dropdown and select the meeting that you've scheduled earlier.

    :::image type="content" source="images/teams-add-to-meeting.png" alt-text="Add app to meeting option in Microsoft Teams":::

1. Select the sample tab configuration and **Save** to view your meeting app from meeting chat view.

    :::image type="content" source="images/teams-meeting-chat-view.png" alt-text="{alt-text}":::

# [Enable an existing Teams meeting app in Outlook](#tab/existing-app)

To extend your existing Teams meeting app in Outlook, ensure the following:

> [!div class="checklist"]
>
> * [Update your app manifest](#update-your-app-manifest).
> * [Use JavaScript client library (TeamsJS) v2.5.0 or later](#use-teamsjs-version-250-or-later).
> * [Configure Content Security Policy headers](#configure-csp-headers-for-outlook).
> * [Update Microsoft Entra app registration for single sign-on (SSO)](#update-microsoft-entra-app-registration-for-sso).
> * [Sideload your updated app using TeamsFx CLI](#sideload-your-app-using-teamsfx-cli).

If you have an existing meeting app, make a copy or a branch of your production project and update your app `id` in the app manifest to use a new identifier that is different from the production app ID for testing.

## Update your app manifest

Update the [app manifest](~/resources/schema/manifest-schema.md) (previously called Teams app manifest) schema version to 1.13 or later to enable your Teams.

Open your Teams app manifest and update the `$schema` and `manifestVersion` with the appropriate version:

```json
{
    "$schema" : "https://developer.microsoft.com/json-schemas/teams/v1.16/MicrosoftTeams.schema.json",
    "manifestVersion" : "1.16"
}
```

### Use TeamsJS version 2.5.0 or later

Use TeamsJS client library version 2.5.0 or later to extend your Teams meeting app to run in Outlook. If your app uses TeamsJS v2.5.0 or later, application code changes aren't required to run in Outlook.

If you need to upgrade your TeamsJS npm package from v1.x.x to the latest v2.x.x TeamsJS, you can use Teams Toolkit to help identify and automate the required code changes. For more information, see [TeamsJS library](../tabs/how-to/using-teams-client-library.md#whats-new-in-teamsjs-version-2xx).

Following are the steps to update your TeamsJS to the latest version using Teams toolkit:

1. Select **Command Palette...** under the **View** option or **Ctrl+Shift+P**.
1. Run the command `Teams: Upgrade Teams JS SDK and code references`.

Now your package.json file references `@microsoft/teams-js@2.x.x` and your `*.js/.ts` and `*.jsx/.tsx` files are updated with:

* Import statements for `teams-js@2.x.x`.
* [Function, Enum, and Interface calls](../tabs/how-to/using-teams-client-library.md#whats-new-in-teamsjs-version-2xx) for `teams-js@2.x.x`.
* `TODO` comment reminders flagging areas that might be impacted by [Context](../tabs/how-to/using-teams-client-library.md#updates-to-the-context-interface) interface changes.
* `TODO` comment reminders to [convert callback functions to promises](../tabs/how-to/using-teams-client-library.md#callbacks-converted-to-promises).

> [!NOTE]
>
> Code inside html files isn't updated by the upgrade tooling and requires manual changes.

### Configure CSP headers for Outlook

Teams tab applications are hosted within [iframe elements](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe) in Outlook, as they are in Teams. If your app uses [Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy) (CSP) headers, add `outlook.office.com` as a [frame-ancestor](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/frame-ancestors).

### Update Microsoft Entra app registration for SSO

[Microsoft Entra single sign-on (SSO)](../tabs/how-to/authentication/tab-sso-overview.md) for meeting apps works the same way in Outlook as it does in Teams. However, you need to manually add the Outlook application ID to your Microsoft Entra app registration in your tenant's **App registrations** portal.

1. Sign in to [Azure portal](https://portal.azure.com) with your test tenant account.
1. Open **App registrations**.
1. Select your app.
1. Select **Manage** > **Expose an API**.
1. In the **Authorized client applications** section, add the following `Client Id` value:

    |Microsoft 365 client application | Client ID |
    |--|--|
    |Outlook desktop | d3590ed6-52b3-4102-aeff-aad2292ab01c |

   For more information on client application IDs used to extend Teams apps across the Microsoft 365, see [Teams tabs in Microsoft 365 and Outlook](extend-m365-teams-personal-tab.md#update-azure-ad-app-registration-for-sso).

---

Now you can [sideload your app with TeamsFx CLI](#sideload-your-app-using-teamsfx-cli) and [preview your meeting app in Outlook](#preview-your-meeting-app-in-outlook).

## Sideload your app using TeamsFx CLI

To run your app in Microsoft 365 and Outlook, sideload your [app package](..//concepts/build-and-test/apps-package.md) using the TeamsFx CLI.

1. Package your Teams [app manifest](../resources/schema/manifest-schema.md) and [app icons](/microsoftteams/platform/resources/schema/manifest-schema#icons) in a zip file. If you've used Teams Toolkit to create your app, you can use the **Zip Teams App Package** option in the **UTILITY** section of Teams Toolkit. Select the `manifest.json` file of your app and the appropriate environment (**local** or **dev**). Teams Toolkit displays a dialog linking to the zip file location.

    :::image type="content" source="images/toolkit-zip-teams-app-package.png" alt-text="Screenshot shows the Zip Teams App Package option in Teams Toolkit extension for Visual Studio Code.":::

1. Use TeamsFx CLI to sideload your meeting app to preview in Outlook.

    > [!NOTE]
    > If your Teams app manifest contains only `configurableTabs` then TeamsFx CLI is the only supported way to upload your Teams meeting app to preview in Outlook.

    Ensure TeamsFx CLI is installed:

    ```bash
    npm install -g @microsoft/teamsfx-cli
    ```

1. To sideload your app in Teams, use the following command:

    ```bash
    teamsfx m365 sideloading --file-path <path\to\appPackage.zip>
    ```

After your meeting app is sideloaded to Teams, it's available in both Teams and Outlook. It might take several minutes and a restart of the Outlook for Windows desktop for your app to display in the **Apps** menu.

## Preview your meeting app in Outlook

Here's how to preview your meeting app running on Outlook for Windows desktop:

1. With your meeting app running (either remotely from Azure, or locally from Teams Toolkit), open Outlook for Windows desktop signed in to your test tenant account. If Outlook is already running, close and restart it again.

1. Open **Calendar** and select **New Meeting**. For a meeting app to run in Outlook, the meeting must be a Teams meeting as meeting apps aren't supported in other meetings scheduled from Outlook.

1. From the meeting scheduling window, select **All Apps**. Your sideloaded meeting app appears among your installed meeting apps.

    :::image type="content" source="images/outlook-meeting-all-apps.png" alt-text="Sideloaded meeting app showing in `All Apps` menu of Outlook meeting scheduler":::

1. Select your meeting app. This opens a configuration dialog, where your app user configures any relevant app settings for their specific meeting.

    :::image type="content" source="images/outlook-meeting-app-configuration.png" alt-text="Meeting app configuration page showing from Outlook meeting scheduler":::

1. Select **Add**. Your meeting app displays in the side panel of the scheduling window and the **Apps** field indicate its availability to participants in the meeting.

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
