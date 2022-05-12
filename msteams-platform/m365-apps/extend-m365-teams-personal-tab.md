---
title: Extend a Teams personal tab app across Microsoft 365
description: Extend a Teams personal tab app across Microsoft 365
ms.date: 05/24/2022
ms.topic: tutorial
ms.custom: m365apps
ms.localizationpriority: medium
---
# Extend a Teams personal tab across Microsoft 365

Personal tabs provide a great way to enhance the Microsoft Teams experience. Using personal tabs, you can provide a user access to their application right within Teams, without the user having to leave the experience or sign in again. With this preview, personal tabs can light up within other Microsoft 365 applications. This tutorial demonstrates the process of taking an existing Teams personal tab and updating it to run in both Outlook desktop and web experiences, and also Office on the web (office.com).

Updating your personal app to run in Outlook and Office involves these steps:

> [!div class="checklist"]
>
> * Update your app manifest
> * Update your TeamsJS SDK references
> * Amend your Content Security Policy headers
> * Update your Microsoft Azure Active Directory (Azure AD) App Registration for Single Sign On (SSO)
> * Sideload your updated app in Teams

The rest of this guide will walk you through these steps and show you how to preview your personal tab in other Microsoft 365 applications.

## Prerequisites

To complete this tutorial, you'll need:

* A Microsoft 365 Developer Program sandbox tenant
* Your sandbox tenant enrolled in *Office 365 Targeted Releases*
* A machine with Office apps installed from the Microsoft 365 Apps *beta channel*
* (Optional) [Teams Toolkit](https://aka.ms/teams-toolkit) extension for Microsoft Visual Studio Code to help update your code

> [!div class="nextstepaction"]
> [Install prerequisites](prerequisites.md)

## Prepare your personal tab for the upgrade

If you have an existing personal tab app, make a copy or a branch of your production project for testing and update your App ID in the app manifest to use a new identifier (distinct from the production App ID, for testing).

If you'd like to use sample code to complete this tutorial, follow the setup steps in the [Todo List Sample](https://github.com/OfficeDev/TeamsFx-Samples/tree/main/todo-list-with-Azure-backend) to build a personal tab app using the Teams Toolkit extension for Visual Studio Code, then return to this article to update it for Microsoft 365. Or, you can use the same app already enabled Microsoft 365 in the following quickstart section and then skip to [Sideload your app in Teams](#sideload-your-app-in-teams) .

### Quickstart

To start with a [personal tab](https://github.com/OfficeDev/TeamsFx-Samples/tree/ga/todo-list-with-Azure-backend-M365) that's already enabled to run in Outlook and Office, use Teams Toolkit extension for Visual Studio Code.

1. From Visual Studio Code, open the command palette (`Ctrl+Shift+P`), type `Teams: View samples`
1. Select **Todo List (Works in Teams, Outlook and Office)**

    :::image type="content" source="images/toolkit-todo-sample.png" alt-text="Todo List sample (Works in Teams, Outlook and Office) in Teams Toolkit":::

1. Select a location on your local machine for the workspace folder
1. Open the command palette (`Ctrl+Shift+P`) and type `Teams: Provision in the cloud` to create the required app resources (App Service plan, Storage account, Function App, Managed Identity) in your Azure account.
1. Open the command palette (`Ctrl+Shift+P`) and type `Teams: Deploy to the cloud` to deploy the sample code to the provisioned resources in Azure and start the app.
 
From here, you can skip ahead to [Sideload your app in Teams](#sideload-your-app-in-teams) and preview your app in Outlook and Office. (The app manifest and TeamsJS API calls have already been updated for Microsoft 365.)

## Update the app manifest

You'll need to use the [Teams developer manifest](../resources/schema/manifest-schema.md) schema version `1.13` to enable your Teams personal tab to run in Outlook and Office.

You have two options for updating your app manifest:

# [Teams Toolkit](#tab/manifest-teams-toolkit)

1. Open the command palette: `Ctrl+Shift+P`
1. Run the `Teams: Upgrade Teams manifest to support Outlook and Office apps` command and select your app manifest file. Changes will be made in place.

# [Manual steps](#tab/manifest-manual)

Open your Teams app manifest and update the `$schema` and `manifestVersion` with the following values:

```json
{
    "$schema" : "https://developer.microsoft.com/json-schemas/teams/v1.13/MicrosoftTeams.schema.json",
    "manifestVersion" : "1.13"
}
```

---

If you used Teams Toolkit to create your personal app, you can also use it to validate the changes to your manifest file and identify any errors. Open the command palette (`Ctrl+Shift+P`) and find **Teams: Validate manifest file** or select the option from the Deployment menu of the Teams Toolkit (look for the Teams icon on the left side of Visual Studio Code).

:::image type="content" source="images/toolkit-validate-manifest-file.png" alt-text="Teams Toolkit 'Validate manifest file' option under 'Deployment' menu":::

## Update SDK references

To run in Outlook and Office, your app will need to reference the NPM package `@microsoft/teams-js@2.0.0` (or higher). While code with downlevel versions  is supported in Outlook and Office, deprecation warnings will be logged, and support for downlevel versions of TeamsJS in Outlook and Office will eventually cease.

You can use Teams Toolkit to help identify and automate the required code changes to upgrade from 1.x TeamsJS versions to TeamsJS version 2.0.0. Alternately, you can perform the same steps manually; refer to [Microsoft Teams JavaScript client SDK](../tabs/how-to/using-teams-client-sdk.md#whats-new-in-teamsjs-version-20) for details.

1. Open the *Command palette*: `Ctrl+Shift+P`
1. Run the command `Teams: Upgrade Teams JS SDK references to support Outlook and Office apps`

Upon completion, your *package.json* file will reference `@microsoft/teams-js@2.0.0` (or higher) and your `*.js/.ts` and `*.jsx/.tsx` files will be updated with:

> [!div class="checklist"]
> * Import statements for teams-js@2.0.0
> * [Function, Enum, and Interface calls](../tabs/how-to/using-teams-client-sdk.md#whats-new-in-teamsjs-version-20s) for teams-js@2.0.0
> * `TODO` comment reminders flagging areas that might be impacted by [Context](../tabs/how-to/using-teams-client-sdk.md#updates-to-the-context-interface) interface changes
> * `TODO` comment reminders to ensure [conversion to promises functions from callback style functions](../tabs/how-to/using-teams-client-sdk.md#callbacks-converted-to-promises) has gone well at every call site the tool found

> [!IMPORTANT]
> Code inside *.html* files is not supported by the upgrade tooling and will require manual changes.


## Configure Content Security Policy headers

Just as in Microsoft Teams, tab applications are hosted within [iframe elements](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe) in Office and Outlook web clients.

If your app makes use of [Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy) (CSP) headers, make sure you allow all the following [frame-ancestors](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/frame-ancestors) in your CSP headers:

|Microsoft 365 host| frame-ancestor permission|
|--|--|
| Teams | `teams.microsoft.com` |
| Office | `*.office.com` |
| Outlook | `outlook.office.com`, `outlook.office365.com`, `outlook-sdf.office.com`, `outlook-sdf.office365.com` |

## Update Azure AD app registration for SSO

[Azure Active Directory Single-sign on (SSO)](../tabs/how-to/authentication/auth-aad-sso.md) for personal tabs works the same way in Office and Outlook as it does in Teams, however you will need to add several client application identifiers to the Azure AD app registration of your tab app in your tenant's *App registrations* portal.

1. Sign in to [Microsoft Azure portal](https://portal.azure.com) with your sandbox tenant account.
1. Open the **App registrations** blade.
1. Select the name of your personal tab application to open its app registration.
1. Select  **Expose an API** (under *Manage*).

:::image type="content" source="images/azure-app-registration-clients.png" alt-text="Authorize client Ids from the *App registrations* blade on Azure portal":::

In the **Authorized client applications** section, ensure all of the following `Client Id` values are added:

|Microsoft 365 client application | Client ID |
|--|--|
|Teams desktop, mobile |1fec8e78-bce4-4aaf-ab1b-5451cc387264 |
|Teams web |5e3ce6c0-2b1f-4285-8d4b-75ee78787346 |
|Office.com  |4765445b-32c6-49b0-83e6-1d93765276ca|
|Office desktop  | 0ec893e0-5785-4de6-99da-4ed124e5296c |
|Outlook desktop | d3590ed6-52b3-4102-aeff-aad2292ab01c |
|Outlook Web Access | 00000002-0000-0ff1-ce00-000000000000 |
|Outlook Web Access | bc59ab01-8403-45c6-8796-ac3ef710b3e3 |

## Sideload your app in Teams

The final step to running your app in Office and Outlook is to sideload your updated personal tab [app package](..//concepts/build-and-test/apps-package.md) in Microsoft Teams.

1. Package your Teams application ([manifest](../resources/schema/manifest-schema.md) and [app icons](/microsoftteams/platform/resources/schema/manifest-schema#icons)) in a zip file. If you used Teams Toolkit to create your app, you can easily do this using the **Zip Teams metadata package** option in the *Deployment* menu of Teams Toolkit:

    :::image type="content" source="images/toolkit-zip-teams-metadata-package.png" alt-text="'Zip Teams metadata package' option in Teams Toolkit extension for Visual Studio Code":::

1. Sign in to Teams with your sandbox tenant account, and toggle into  *Developer Preview* mode. Click on the ellipsis (**...**) menu by your user profile, then select: About > **Developer preview**.

    :::image type="content" source="images/teams-dev-preview.png" alt-text="From Teams ellipses menu, open 'About', and select 'Developer Preview' option":::

1. Click on *Apps* to open the **Manage your apps** pane. Then select **Publish an app**.

    :::image type="content" source="images/teams-manage-your-apps.png" alt-text="Open the 'Manage your apps' pane and select 'Publish an app'":::

1. Choose **Upload a custom app** option and select your app package.

    :::image type="content" source="images/teams-upload-custom-app.png" alt-text="'Upload a custom app' option in Teams":::

Once sideloaded to Teams, your personal tab will be available in Outlook and Office. Be sure to sign in with the same credentials you used to sign in to Teams to sideload your app.

You can pin the app for quick access, or you can find your app in the ellipses (**...**) flyout among recent applications in the sidebar on the left.

> [!NOTE]
> Pinning an app in Teams will not pin it as an app in Office or Outlook.

## Preview your personal tab in other Microsoft 365 experiences

Here's how to preview your app running in Office and Outlook, web and Windows desktop clients.

### Outlook on Windows

To view your app running in Outlook on Windows desktop:

1. Launch Outlook and sign in using your dev tenant account.
1. On the side bar, click on **More Apps**. Your sideloaded app title will appear among your installed apps.
1. Click on your app icon to launch your app in Outlook.

:::image type="content" source="images/outlook-desktop-more-apps.png" alt-text="Click on the ellipses ('More apps') option on the side bar of Outlook desktop client to see your installed personal tabs":::

### Outlook on the web

To view your app in Outlook on the web:

1. Navigate to [Outlook on the web](https://outlook.office.com) and sign in using your dev tenant account.
1. Click on the ellipses (**...**) on the side bar. Your sideloaded app title will appear among your installed apps.
1. Click on your app icon to launch and preview your app running in Outlook on the web.

:::image type="content" source="images/outlook-web-more-apps.png" alt-text="Click on the ellipses ('More apps') option on the side bar of outlook.com to see your installed personal tabs":::

### Office on Windows

To view your app running in Office on Windows desktop:

1. Launch Office and sign in using your dev tenant account.
1. Click on the ellipses (**...**) on the side bar. Your sideloaded app title will appear among your installed apps.
1. Click on your app icon to launch your app in Office.

:::image type="content" source="images/office-desktop-more-apps.png" alt-text="Click on the ellipses ('More apps') option on the side bar of Office desktop client to see your installed personal tabs":::

### Office on the web

To preview your app running in Office on the web:

1. Log into office.com with test tenant credentials.
1. Click on the **Apps** icon on the side bar. Your sideloaded app title will appear among your installed apps.
1. Click on your app icon to launch your app in Office on the web.

:::image type="content" source="images/office-web-more-apps.png" alt-text="Click on the 'More apps' option on the side bar of office.com to see your installed personal tabs":::

## Troubleshooting

Currently, a subset of Teams application types and capabilities are supported in Outlook and Office clients. This support will expand over time. 

Refer to [Microsoft 365 support](../tabs/how-to/using-teams-client-sdk.md#microsoft-365-support-running-teams-apps-in-office-and-outlook) to check host support for various TeamsJS capabilities.

For an overall summary of Microsoft 365 host and platform support for Teams apps, see [Extend Teams apps across Microsoft 365](overview.md).

You can check for host support of a given capability at runtime by calling the `isSupported()` function on that capability (namespace), and adjusting app behavior as appropriate. This allows your app to light up UI and functionality in hosts that support it, and provide a graceful fallback experience in hosts that don't. For more, see [Differentiate your app experience](../tabs/how-to/using-teams-client-sdk.md#differentiate-your-app-experience).

Please use the [Microsoft Teams developer community channels](/microsoftteams/platform/feedback) to report issues and provide feedback.

### Debugging

From Teams Toolkit, you can Debug (`F5`) your tab application running in Office and Outlook, in addition to Teams.

:::image type="content" source="images/toolkit-debug-targets.png" alt-text="Choose from Teams, Outlook, and Office debug targets in Teams Toolkit":::

Upon first run of local debug to Office or Outlook, you'll be prompted to sign in to your Microsoft 365 tenant account and install a self-signed test certificate. You'll also be prompted to manually install Teams. Click on **Install in Teams** to open a browser window and manually install your app. Then click on **Continue** to proceed to debug your app in Office/Outlook.

:::image type="content" source="images/toolkit-dialog-teams-install.png" alt-text="{alt-text}":::

Please provide feedback and report any issues with the Teams Toolkit debugging experience at [Microsoft Teams Framework (TeamsFx)](https://github.com/OfficeDev/TeamsFx/issues).

## Next steps

Publish your app to be discoverable in Teams, Outlook, and Office:

> [!div class="nextstepaction"]
> [Publish Teams apps for Outlook and Office](publish.md)

## Code sample

| **Sample Name** | **Description** | **Node.js** |
|---------------|--------------|--------|
| Todo List | Editable todo list with SSO build with React and Azure Functions. Works only in Teams (sample app for the upgrade process described in this tutorial). | [View](https://github.com/OfficeDev/TeamsFx-Samples/tree/ga/todo-list-with-Azure-backend)  |
| Todo List (Microsoft 365) | Editable todo list with SSO build with React and Azure Functions. Works in Teams, Outlook, Office. | [View](https://github.com/OfficeDev/TeamsFx-Samples/tree/ga/todo-list-with-Azure-backend-M365)|
| Image Editor (Microsoft 365) | Edit, save, open, and save images, using Microsoft Graph API. Works in Teams, Outlook, Office. | [View](https://github.com/OfficeDev/m365-extensibility-image-editor) |
