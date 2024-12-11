---
title: Build & Extend Meeting App to Outlook
description: Learn how to build and extend Teams meeting app for Outlook and ensure your Teams meeting app experience works seamlessly in Outlook.
ms.date: 12/11/2024
ms.author: mosdevdocs
author: erikadoyle
ms.topic: tutorial
ms.localizationpriority: medium
ms.subservice: m365apps
---
# Extend a Teams meeting app to Outlook

Across the Microsoft 365 ecosystem, most monthly users schedule their Microsoft Teams meetings from Outlook. To help users stay in the flow of their work, Teams meeting apps are now supported on Outlook. You can configure and add meeting apps to the Teams meetings scheduled from Outlook and also run meeting apps within the Outlook calendar.

Meeting apps are essentially Teams tab apps that are designed to foster collaboration before, during, and after meetings. You can specify which contexts your meeting app supports from the app manifest (previously called Teams app manifest) through the [configurableTabs.context](../resources/schema/manifest-schema.md#configurabletabs) property.

> [!NOTE]
> In addition to `configurableTabs`, your meeting app must contain at least one [app capability in personal scope](../concepts/design/personal-apps.md) (for example, `staticTabs`), for it to be available in Outlook.

The following table shows the Teams meeting app contexts supported in Outlook:

| Teams meeting context | App manifest value | TeamsJS value | Outlook support |
|--|--|--|--|
| [Meeting details view](../apps-in-teams-meetings/build-tabs-for-meeting.md#meeting-details-view) | `meetingDetailsTab` | `frameContext.content` | ✔️ |
| [Meeting chat view](../apps-in-teams-meetings/build-tabs-for-meeting.md#meeting-chat-view) | `meetingChatTab` | `frameContext.content` | ✔️ |
| [Meeting side panel view](../apps-in-teams-meetings/build-tabs-for-meeting.md#meeting-side-panel-view) | `meetingSidePanel` | `frameContext.sidePanel` | ✔️ |
| [Meeting Stageview](../apps-in-teams-meetings/build-tabs-for-meeting.md#meeting-stageview) | `meetingStage` | `frameContext.meetingStage` | ❌ |

If your meeting app supports Stageview, other in-meeting effects, or contains capabilities such as message extensions and bots, these continue to work in Teams when the meeting is scheduled from Outlook, but doesn't appear or run in Outlook.

## Prerequisites

To preview your Teams meeting app in Outlook, ensure the following:

* A [Microsoft 365 developer sandbox](./prerequisites.md#prepare-a-developer-tenant-for-testing) tenant with uploading enabled.
* A test environment with Outlook for Windows desktop installed from the [Microsoft 365 Apps *Current Channel*](./prerequisites.md#install-microsoft-365-apps-in-your-test-environment).
* [NodeJS](https://nodejs.org/download) (with npm) installed.
* [TeamsFx CLI v2](~/toolkit/teams-toolkit-cli.md) library installed from npm.
* [Visual Studio Code](https://code.visualstudio.com/) installed to your development environment.
* [Teams Toolkit](https://marketplace.visualstudio.com/items?itemName=TeamsDevApp.ms-teams-vscode-extension) extension for Visual Studio Code.

To preview your Teams meeting app in Outlook, you can either build a new meeting app with Teams Toolkit or extend an existing Teams meeting app in Outlook.

# [Build Teams meeting app for Outlook](#tab/ttk)

You can build a Teams meeting app for Outlook through the Teams Toolkit extension for Visual Studio Code. To build a Teams meeting app to preview in Outlook:

1. Go to Teams and sign in using your sandbox tenant account.

1. Select **Calendar** > **New meeting** and schedule a meeting.

    :::image type="content" source="images/teams-new-meeting.png" alt-text="New meeting panel in Teams":::

1. Open the **Teams Toolkit** extension in Visual Studio Code and select **View Samples**.

1. Select **My First Meeting App** > **Create** and specify the folder to create the workspace.

    :::image type="content" source="images/toolkit-meeting-app-sample.png" alt-text="My First Meeting App sample in Teams Toolkit":::

1. Select **F5** to debug and run the sample locally in Teams. Teams prompts you to install the app.

1. Select **Add**.

    :::image type="content" source="images/teams-add-to-meeting.png" alt-text="Screenshot of the app details dialog with the Add option to add meeting app in Microsoft Teams.":::

1. Search and select the meeting that you've scheduled earlier and move through the dialog to select **Go**.

    :::image type="content" source="images/teams-add-to-meeting-scope.png" alt-text="Screenshot of the scope selection dialog to select the required meeting.":::

1. Select the sample tab configuration and select **Save**. The app is available in the meeting chat view.

    :::image type="content" source="images/teams-meeting-chat-view.png" alt-text="{alt-text}":::

# [Extend an existing Teams meeting app to Outlook](#tab/existing-app)

To extend your existing Teams meeting app in Outlook, ensure the following:

> [!div class="checklist"]
>
> * [Update your app manifest](#update-your-app-manifest).
> * [Use Microsoft Teams JavaScript client library (TeamsJS) v2.5.0 or later](#use-teamsjs-version-250-or-later).
> * [Configure Content Security Policy headers](#configure-csp-headers-for-outlook).
> * [Update Microsoft Entra app registration for single sign-on (SSO)](#update-microsoft-entra-app-registration-for-sso).
> * [Upload your updated app in Teams Admin Center](#upload-your-custom-app-in-teams-admin-center).

If you have an existing meeting app, make a copy or a branch of your production project and update your app `id` in the app manifest to use a new identifier that is different from the production app ID for testing.

## Update your app manifest

Update the [app manifest](~/resources/schema/manifest-schema.md) (previously called Teams app manifest) schema version to 1.13 or later.

Open your Teams app manifest and update the `$schema` and `manifestVersion` properties as follows:

```json
{
    "$schema" : "https://developer.microsoft.com/json-schemas/teams/v1.16/MicrosoftTeams.schema.json",
    "manifestVersion" : "1.16"
}
```

### Use TeamsJS version 2.5.0 or later

Use TeamsJS client library version 2.5.0 or later to extend your Teams meeting app to run in Outlook. If your app uses TeamsJS v2.5.0 or later, application code changes aren't required to run in Outlook.

If you need to upgrade your TeamsJS npm package from v1.x.x to the latest v2.x.x TeamsJS, you can use Teams Toolkit to help identify and automate the required code changes. For more information, see [TeamsJS library](../tabs/how-to/using-teams-client-library.md#whats-new-in-teamsjs-version-2xx).

Follow these steps to update your TeamsJS to the latest version using Teams Toolkit:

1. Open your app in Visual Studio Code and select **Teams Toolkit** extension.
1. Under **View**, select **Command Palette...** or **Ctrl+Shift+P**.
1. Run the command `Teams: Upgrade Teams JS SDK and code references`.

Your package.json file references `@microsoft/teams-js@2.x.x` and your `*.js/.ts` and `*.jsx/.tsx` files are updated with:

* Import statements for `teams-js@2.x.x`.
* [Function, Enum, and Interface calls](../tabs/how-to/using-teams-client-library.md#whats-new-in-teamsjs-version-2xx) for `teams-js@2.x.x`.
* New `"TODO"` comment reminders flagging areas that might be impacted by [Context](../tabs/how-to/using-teams-client-library.md#updates-to-the-context-interface) interface changes.
* New `"TODO"` comment reminders to [convert callback functions to promises](../tabs/how-to/using-teams-client-library.md#callbacks-converted-to-promises).

> [!NOTE]
>
> Upgrading to the latest TeamsJS version through Teams Toolkit doesn't update the code in the html files. You must update the html files manually.

### Configure CSP headers for Outlook

Teams tab applications are hosted within [iframe elements](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe) in Outlook, as they are in Teams. If your app uses [Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy) (CSP) headers, add `outlook.office.com` as a [frame-ancestor](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/frame-ancestors).

### Update Microsoft Entra app registration for SSO

[Microsoft Entra single sign-on (SSO)](../tabs/how-to/authentication/tab-sso-overview.md) for meeting apps works the same way in Outlook as it does in Teams. However, you need to manually add the Outlook application ID to your Microsoft Entra app registration.

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

You can [upload your custom app in Teams admin center](#upload-your-custom-app-in-teams-admin-center) and [preview your meeting app in Outlook](#preview-your-meeting-app-in-outlook).

### Upload your custom app in Teams admin center

To test your app in Microsoft 365 and Outlook, upload your [app package](../concepts/build-and-test/apps-package.md) to Teams admin center.

1. Package your Teams [app manifest](../resources/schema/manifest-schema.md) and [app icons](/microsoftteams/platform/resources/schema/manifest-schema#icons) in a zip file. To create an app package through Teams Toolkit, see [build app package.](~/toolkit/publish.md#build-app-package)

1. Go to [Teams admin center](https://admin.teams.microsoft.com) and select **Teams apps** > **Manage apps**.

1. Select **Upload new app**, and select your app package.

After your meeting app is uploaded to Teams admin center, it's available in both Teams and Outlook. For your app to display in the **Apps** menu wait for few minutes and restart Outlook for Windows.

### Preview your meeting app in Outlook

To preview your meeting app in Outlook for Windows ensure the app is running locally and follow the steps:

1. Open Outlook for Windows signed in with your test tenant account. If Outlook is already running, close and restart it again.

1. Open **Calendar** > **New Meeting**. For a meeting app to run in Outlook, ensure the meeting is a **Teams Meeting** as other meetings scheduled from Outlook aren't supported.

1. From the meeting scheduling window, select **All Apps**. Your uploaded meeting app appears among your installed meeting apps.

    :::image type="content" source="images/outlook-meeting-all-apps.png" alt-text="Uploaded meeting app showing in `All Apps` menu of Outlook meeting scheduler":::

1. Select your meeting app. A configuration dialog appears, where the user configures any relevant app settings for their specific meeting.

    :::image type="content" source="images/outlook-meeting-app-configuration.png" alt-text="Meeting app configuration page showing from Outlook meeting scheduler":::

1. Select **Add**. Your meeting app displayed in the **Apps** section and in the side panel of the scheduling window.

To remove or configure your app in the scheduling window, select the dropdown menu on your app and select the following:

* **About**: How the app appears in the Microsoft Teams Store.
* **Settings**: Update the app configuration for the specific meeting.
* **Remove**: Remove the app from the meeting.

 :::image type="content" source="images/outlook-meeting-app-side-panel.png" alt-text="Meeting app running in Outlook meeting scheduler side panel":::

## Code sample

| **Sample Name** | **Description** | **Node.js** |
|---------------|--------------|--------|
| HelloWorld In-meeting app| Simple meeting app demonstrating meeting details view, chat view, and side panel. Works in Teams and Outlook. | [View](https://github.com/OfficeDev/TeamsFx-Samples/tree/dev/hello-world-in-meeting)  |

## See also

[Support and feedback](~/feedback.md)
