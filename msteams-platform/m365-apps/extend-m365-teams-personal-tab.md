---
title: Extend a Teams personal tab app across Microsoft 365
description: Extend a Teams personal tab app across Microsoft 365
ms.date: 05/24/2022
ms.topic: tutorial
ms.custom: m365apps
ms.localizationpriority: medium
---
# Extend a Teams personal tab across Microsoft 365

> [!NOTE]
> *Extending a Teams personal tab across Microsoft 365* is currently available only in [public developer preview](../resources/dev-preview/developer-preview-intro.md). Features included in preview may not be complete, and may undergo changes before becoming available in the public release. They are provided for testing and exploration purposes only. They should not be used in production applications.

Personal tabs provide a great way to enhance the Microsoft Teams experience. Using personal tabs, you can provide a user access to their application right within Teams, without the user having to leave the experience or sign in again. With this preview, personal tabs can light up within other Microsoft 365 applications. This tutorial demonstrates the process of taking an existing Teams personal tab and updating it to run in both Outlook desktop and web experiences, and also Office on the web (office.com).

Updating your personal app to run in Outlook and Office involves these steps:

> [!div class="checklist"]
>
> * Update your app manifest
> * Update your TeamsJS SDK references
> * Amend your Content Security Policy headers
> * Update your Microsoft Azure Active Directory (Azure AD) App Registration for Single Sign On (SSO)

Testing your app will require the following steps:

> [!div class="checklist"]
>
> * Enroll your Microsoft 365 tenant in *Office 365 Targeted Releases*
> * Configure your account to access preview versions of Outlook and Office apps
> * Sideload your updated app into Teams

After these steps, your app should appear in the preview versions of Outlook and Office apps.

## Prerequisites

To complete this tutorial, you'll need:

* A Microsoft 365 Developer Program sandbox tenant
* Your sandbox tenant enrolled in *Office 365 Targeted Releases*
* A machine with Office apps installed from the Microsoft 365 Apps *beta channel*
* (Optional) [Teams Toolkit](https://aka.ms/teams-toolkit) extension for Microsoft Visual Studio Code to help update your code

> [!div class="nextstepaction"]
> [Install prerequisites](prerequisites.md)

## Prepare your personal tab for the upgrade

If you have an existing personal tab app, make a copy or a branch of your production project for testing and update your App ID in the app manifest to use a new identifier (distinct from the production App ID).

If you'd like to use sample code to complete this tutorial, follow the setup steps in [Getting Started with Todo List Sample](https://github.com/OfficeDev/TeamsFx-Samples/tree/main/todo-list-with-Azure-backend) to build a personal tab app using the Teams Toolkit extension for Visual Studio Code. 

### Quickstart

Alternately, you can start with the same [Todo List Sample updated for TeamsJS SDK v2 Preview](https://github.com/OfficeDev/TeamsFx-Samples/tree/main/todo-list-with-Azure-backend-M365) and proceed to [Preview your personal tab in other Microsoft 365 experiences](#preview-your-personal-tab-in-other-microsoft-365-experiences). The updated sample is  also available within Teams Toolkit extension: *Development* > *View samples* > **Todo List (Works in Teams, Outlook and Office)**.

:::image type="content" source="images/toolkit-todo-sample.png" alt-text="Todo List sample (Works in Teams, Outlook and Office) in Teams Toolkit":::

## Update the app manifest

You'll need to use the [Teams developer preview manifest](/microsoftteams/platform/resources/schema/manifest-schema-dev-preview) schema and the `Microsoft 365 DevPreview` manifest version to enable your Teams personal tab to run in Office and Outlook.

You can either use Teams Toolkit to update your app manifest, or apply the changes manually:

# [Teams Toolkit](#tab/manifest-teams-toolkit)

1. Open the *Command palette*: `Ctrl+Shift+P`
1. Run the `Teams: Upgrade Teams manifest to support Outlook and Office apps` command and select your app manifest file. Changes will be made in place.

# [Manual steps](#tab/manifest-manual)

Open your Teams app manifest and update the `$schema` and `manifestVersion` with the following values:

```json
{
    "$schema" : "https://raw.githubusercontent.com/OfficeDev/microsoft-teams-app-schema/preview/DevPreview/MicrosoftTeams.schema.json",
    "manifestVersion" : "m365DevPreview"
}
```

---

If you used Teams Toolkit to create your personal app, you can also use it to validate the changes to your manifest file and identify any errors. Open the command palette `Ctrl+Shift+P` and find **Teams: Validate manifest file** or select the option from the Deployment menu of the Teams Toolkit (look for the Teams icon on the left side of Visual Studio Code).

:::image type="content" source="images/toolkit-validate-manifest-file.png" alt-text="Teams Toolkit 'Validate manifest file' option under 'Deployment' menu":::

## Update SDK references

To run in Outlook and Office, your app will need to depend on the npm package `@microsoft/teams-js@2.0.0-beta.1` (or a later *beta* version). While code with downlevel versions of `@microsoft/teams-js` is supported in Outlook and Office, deprecation warnings will be logged, and support for downlevel versions of `@microsoft/teams-js` in Outlook and Office will eventually cease.

You can use Teams Toolkit to help automate some of the code changes to adopt the next version of `@microsoft/teams-js`, but if you would like to do the steps manually, see [Microsoft Teams JavaScript client SDK Preview](using-teams-client-sdk-preview.md) for details.

1. Open the *Command palette*: `Ctrl+Shift+P`
1. Run the command `Teams: Upgrade Teams JS SDK references to support Outlook and Office apps`

Upon completion, the utility will have updated your `package.json` file with the TeamsJS SDK Preview (`@microsoft/teams-js@2.0.0-beta.1` or later) dependency, and your `*.js/.ts` and `*.jsx/.tsx` files will be updated with:

> [!div class="checklist"]
>
> * `package.json` references to TeamsJS SDK Preview
> * Import statements for TeamsJS SDK Preview
> * [Function, Enum, and Interface calls](using-teams-client-sdk-preview.md#apis-organized-into-capabilities) to TeamsJS SDK Preview
> * `TODO` comment reminders to review areas that might be impacted by [Context](using-teams-client-sdk-preview.md#updates-to-the-context-interface) interface changes
> * `TODO` comment reminders to ensure [conversion to promises functions from callback style functions](using-teams-client-sdk-preview.md#callbacks-converted-to-promises) has gone well at every call site the tool found

> [!IMPORTANT]
> Code inside *.html* files is not supported by the upgrade tooling and will require manual changes.

> [!NOTE]
> If you wish to manually update your code, see [Microsoft Teams JavaScript client SDK Preview](using-teams-client-sdk-preview.md) to learn about the required changes.

## Configure Content Security Policy headers

[Just as in Microsoft Teams](/microsoftteams/platform/tabs/what-are-tabs), tab applications are hosted within ([iframe elements](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe)) in Office and Outlook web clients.

If your app makes use of [Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy) (CSP) headers, make sure you are allowing all of the following [frame-ancestors](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/frame-ancestors) in your CSP headers:

|Microsoft 365 host| frame-ancestor permission|
|--|--|
| Teams | `teams.microsoft.com` |
| Office | `*.office.com` |
| Outlook | `outlook.office.com`, `outlook.office365.com`, `outlook-sdf.office.com`, `outlook-sdf.office365.com` |

## Update Azure AD app registration for SSO

Azure Active Directory Single-sign on (SSO) for personal tabs works the same way in Office and Outlook [as it does in Teams](/microsoftteams/platform/tabs/how-to/authentication/auth-aad-sso), however you will need to add several client application identifiers to the Azure AD app registration of your tab app in your tenant's *App registrations* portal.

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

The final step is to sideload your updated personal tab ([app package](/microsoftteams/platform/concepts/build-and-test/apps-package)) in Microsoft Teams. Once completed, your app will be available to run in Office and Outlook, in addition to Teams.

1. Package your Teams application (manifest and app [icons](/microsoftteams/platform/resources/schema/manifest-schema#icons)) in a zip file. If you used Teams Toolkit to create your app, you can easily do this using the **Zip Teams metadata package** option in the *Deployment* menu of Teams Toolkit or in the Command Palette `Ctrl+Shift+P` of Visual Studio Code:

    :::image type="content" source="images/toolkit-zip-teams-metadata-package.png" alt-text="'Zip Teams metadata package' option in Teams Toolkit extension for Visual Studio Code":::

1. Log in to Teams with your sandbox tenant account, and ensure that you are on the Public Developer Preview. You can verify that you're on the Preview in the Teams client by clicking on the ellipsis (**...**) menu by your user profile and opening **About** to check that the *Developer preview* option is toggled on.

    :::image type="content" source="images/teams-dev-preview.png" alt-text="From Teams ellipses menu, open 'About' and verify 'Developer Preview' option is checked":::

1. Open the *Apps* pane, and click **Upload a custom app** and then **Upload for me or my teams**.

    :::image type="content" source="images/teams-upload-custom-app.png" alt-text="'Upload a custom app' button in the Teams 'Apps' pane":::

1. Select your app package and click *Open*.

Once sideloaded through Teams, your personal tab will be available in Outlook and Office. Be sure to sign in with the same credentials you used to sideload your app in Teams.

You can pin the app for quick access, or you can find your app in the ellipses (**...**) flyout among recent applications in the sidebar on the left.

> [!NOTE]
> Pinning an app in Teams will not pin it as an app in Office.com or Outlook.

## Preview your personal tab in other Microsoft 365 experiences

When you upgrade your Teams personal tab and sideload it in Teams, it runs in Outlook on Windows, on the web, Office on Windows and on the web (office.com). Here's how to preview it from those Microsoft 365 experiences.

### Outlook on Windows

To view your app running in Outlook on Windows desktop:

1. Launch Outlook and sign in using your dev tenant account.
1. Click on the ellipses (**...**) on the side bar. Your sideloaded app title will appear among your installed apps.
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
1. Click on the ellipses (**...**) on the side bar. Your sideloaded app title will appear among your installed apps.
1. Click on your app icon to launch your app in Office on the web.

:::image type="content" source="images/office-web-more-apps.png" alt-text="Click on the ellipses ('More apps') option on the side bar of office.com to see your installed personal tabs":::

## Next steps

Outlook- and Office-enabled personal tabs are supported for production use in Microsoft Teams and can be distributed to preview audiences running *Targeted Release* versions of Outlook and Office. Distribution options and processes for Outlook- and Office-enabled personal tabs are the same as with traditional Team apps.

### Single-tenant distribution

Outlook- and Office-enabled personal tabs can be distributed to test and production tenants in one of three ways:

#### Teams client

From the *Apps* menu, select *Manage your apps* > **Submit an app to your org**. This requires approval from your IT admin.

#### Microsoft Teams Admin Center

As a Teams admin, you can upload and pre-install the app package for your organization's tenant from [Teams admin](https://admin.teams.microsoft.com/). See [Upload your custom apps in the Microsoft Teams admin center](/MicrosoftTeams/upload-custom-apps) for details.

#### Microsoft Admin Center

As a global admin, you can upload and pre-install the app package from [Microsoft admin](https://admin.microsoft.com/). See [Test and deploy Microsoft 365 Apps by partners in the Integrated apps portal](/microsoft-365/admin/manage/test-and-deploy-microsoft-365-apps) for details.

### Multitenant distribution

The app [submission process for  Teams apps enabled for Outlook and Office](../concepts/deploy-and-publish/appsource/publish.md) is the same as for traditional Teams apps; the only difference is you'll [reference version 1.13](../tabs/how-to/using-teams-client-sdk.md) of the Teams app manifest schema in your app package, which introduces support for Teams apps that run across Microsoft 365.