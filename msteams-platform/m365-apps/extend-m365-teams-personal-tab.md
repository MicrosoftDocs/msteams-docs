---
title: Extend a Teams personal tab app for Microsoft 365
description: Learn how to update your personal tab app to run in Outlook and Microsoft 365 app, in addition to Microsoft Teams.
ms.date: 02/28/2023
ms.topic: tutorial
ms.custom: m365apps
ms.localizationpriority: medium
---
# Extend a Teams personal tab across Microsoft 365 app

Personal tabs provide a great way to enhance the Microsoft Teams experience. Using personal tabs, you can provide a user access to their application right within Teams, without the user having to leave the experience or sign in again. With this preview, personal tabs can light up within other Microsoft 365 applications too. This tutorial demonstrates the process of taking an existing Teams personal tab and updating it to run in both Outlook and Microsoft 365 desktop and web experiences, as well as Microsoft 365 app for Android.

Updating your personal app to run in Outlook and Microsoft 365 involves these steps:

> [!div class="checklist"]
>
> * [Update your app manifest](#update-the-app-manifest).
> * [Update your Microsoft Teams JavaScript client library (TeamsJS) references](#update-teamsjs-references).
> * [Amend your Content Security Policy headers](#configure-content-security-policy-headers).
> * [Update your Microsoft Azure Active Directory (Azure AD) App Registration for Single Sign-On (SSO)](#update-azure-ad-app-registration-for-sso).
> * [Sideload your updated app in Teams](#sideload-your-app-in-teams).

The rest of this guide walks you through these steps and show you how to preview your personal tab in other Microsoft 365 applications.

## Prerequisites

To complete this tutorial, you need:

* A Microsoft 365 Developer Program sandbox tenant.
* Your sandbox tenant enrolled in *Microsoft 365 Targeted Releases*.
* A machine with Microsoft 365 apps installed from the Microsoft 365 Apps *beta channel*.
* (Optional) An Android device or emulator with Microsoft 365 app for Android installed.
* (Optional) [Teams Toolkit](https://aka.ms/teams-toolkit) extension for Microsoft Visual Studio Code to help update your code.

> [!div class="nextstepaction"]
> [Install prerequisites](prerequisites.md)

## Prepare your personal tab for the upgrade

If you have an existing personal tab app, make a copy or a branch of your production project for testing and update your App ID in the app manifest to use a new identifier (distinct from the production App ID, for testing).

If you'd like to use sample code instead of your own production code, you can use the Todo List sample. You can either follow the setup steps in the [Todo List Sample](https://github.com/OfficeDev/TeamsFx-Samples/tree/main/todo-list-with-Azure-backend) GitHub repository or use the Teams Toolkit extension to create a new Teams app (select *Start from a sample > Todo List with backend on Azure*). After you've created a personal tab, return to this article to extend it across Microsoft 365.

Alternately, you can use a basic single sign-on *hello world* app that's already Microsoft 365 app enabled, as shown in the following [Quickstart](#quickstart) section, and then skip to [sideload your app in Teams](#sideload-your-app-in-teams).

### Quickstart

To start with a personal tab that's already enabled to run in Outlook and Microsoft 365 app, you can use Teams Toolkit extension for Visual Studio Code.

1. From Visual Studio Code, open the command palette (`Ctrl+Shift+P`), type `Teams: Create a new app`.
1. Select **Create a new Teams app** option.
1. Select **SSO enabled personal tab**.

    :::image type="content" source="images/toolkit-tab-sample.png" alt-text="The Screenshot is an example that shows the Todo List sample (Works in Teams, Outlook and Microsoft 365 app) in Teams Toolkit.":::
1. Select your preferred programming language.
1. Select a location on your local machine for the workspace folder and enter your application name.
1. Once your app has been created, within the Teams Toolkit extension, make sure you are signed in to the appropriate Microsoft 365 Developer Program sandbox tenant and Azure account. These can be found within the **Accounts** section of the extension.
1. Open the command palette (`Ctrl+Shift+P`) and type `Teams: Provision in the cloud` to create the required app resources (App Service plan, Storage account, Function App, Managed Identity) in your Azure account.
1. Select a subscription and a resource group. If you choose to create a new resource group, you will also need to specify the Location.
1. Select **Provision**.
1. Open the command palette (`Ctrl+Shift+P`) and type `Teams: Deploy to the cloud` to deploy the sample code to the provisioned resources in Azure and start the app.
1. Select **Deploy**.

From here, you can skip ahead to [sideload your app in Teams](#sideload-your-app-in-teams) and preview your app in Outlook and Microsoft 365 app. (The app manifest and TeamsJS API calls have already been updated for Microsoft 365 app.)

### SharePoint Framework (SPFx) apps

Starting with version 1.16 of [SharePoint Framework](/sharepoint/dev/spfx/integrate-with-teams-introduction) (SPFx), Teams personal tabs built and hosted with SPFx are also supported in Outlook and Microsoft 365 app. To update a SPFx Teams personal tab app, follow these steps:

1. Ensure you have the latest version of SPFx.

    ```cmd
    npm install @microsoft/generator-sharepoint@latest --global
    ```

1. [Update the app manifest](#update-the-app-manifest).
1. [Update the TeamsJS references](#update-teamsjs-references).

After you update TeamsJS references, [sideload your app in Teams](#sideload-your-app-in-teams) to preview your SPFx personal tab app running in Outlook and Microsoft 365 app. For more information, see [Extend Outlook and Microsoft 365 app with the SharePoint Framework](/sharepoint/dev/spfx/office/overview).

## Update the app manifest

You need to use the Teams developer manifest schema version `1.13` (or higher) to enable your Teams personal tab to run in Outlook and Microsoft 365 app. For more information on schema version, see [Teams developer manifest](../resources/schema/manifest-schema.md).

You have two options for updating your app manifest:

# [Teams Toolkit](#tab/manifest-teams-toolkit)

1. Open the command palette: `Ctrl+Shift+P`.
1. Run the `Teams: Upgrade Teams manifest` command and select your app manifest file. Changes are made in place.

# [Manual steps](#tab/manifest-manual)

Open your Teams app manifest and update the `$schema` and `manifestVersion` manually with the appropriate version. Refer to [Teams developer manifest](../resources/schema/manifest-schema.md) for version information:

```json
{
    "$schema" : "https://developer.microsoft.com/json-schemas/teams/v1.14/MicrosoftTeams.schema.json",
    "manifestVersion" : "1.14"
}
```

---

If you used Teams Toolkit to create your personal app, you can also use it to validate the changes to your manifest file and identify any errors. Open the command palette (`Ctrl+Shift+P`) and find **Teams: Validate manifest file**.

## Update TeamsJS references

To run in Outlook and Microsoft 365 app, your app needs to refer to the npm package `@microsoft/teams-js@2.0.0` (or higher). While code with downlevel versions is supported in Outlook and Microsoft 365 app, deprecation warnings are logged, and support for downlevel versions of TeamsJS in Outlook and Microsoft 365 app will eventually cease. To determine the latest version of TeamsJS, see [TeamsJS GitHub repository](https://github.com/OfficeDev/microsoft-teams-library-js).

You can use Teams Toolkit to help identify and automate the required code changes to upgrade from 1.x TeamsJS versions to TeamsJS 2.x.x versions. Alternately, you can perform the same steps manually; refer to [TeamsJS library](../tabs/how-to/using-teams-client-library.md#whats-new-in-teamsjs-version-2xx) for details.

1. Open the *Command palette*: `Ctrl+Shift+P`.
1. Run the command `Teams: Upgrade Teams JS SDK and code references`.

Upon completion, your *package.json* file references `@microsoft/teams-js@2.0.0` (or higher) and your `*.js/.ts` and `*.jsx/.tsx` files are updated with:

> [!div class="checklist"]
>
> * Import statements for teams-js@2.x.x
> * [Function, Enum, and Interface calls](../tabs/how-to/using-teams-client-library.md#whats-new-in-teamsjs-version-2xx) for teams-js@2.x.x
> * `TODO` comment reminders flagging areas that might be impacted by [Context](../tabs/how-to/using-teams-client-library.md#updates-to-the-context-interface) interface changes
> * `TODO` comment reminders to [convert callback functions to promises](../tabs/how-to/using-teams-client-library.md#callbacks-converted-to-promises)

> [!IMPORTANT]
> Code inside *.html* files is not supported by the upgrade tooling and require manual changes.

## Configure Content Security Policy headers

As in Microsoft Teams, tab applications are hosted within [iframe elements](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe) in Microsoft 365 app and Outlook web clients.

If your app makes use of [Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy) (CSP) headers, make sure you allow all the following [frame-ancestors](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/frame-ancestors) in your CSP headers:

|Microsoft 365 app host| frame-ancestor permission|
|--|--|
| Teams | `teams.microsoft.com` |
| Microsoft 365 app | `*.microsoft365.com`, `*.office.com` |
| Outlook | `outlook.live.com`, `outlook.office.com`, `outlook.office365.com`, `outlook-sdf.office.com`, `outlook-sdf.office365.com` |

## Update Azure AD app registration for SSO

[Azure Active Directory (AD) Single-sign on (SSO)](../tabs/how-to/authentication/tab-sso-overview.md) for personal tabs works the same way in Microsoft 365 app and Outlook as it does in Teams. However, you need to add several client application identifiers to the Azure AD app registration of your tab app in your tenant's *App registrations* portal.

1. Sign in to [Microsoft Azure portal](https://portal.azure.com) with your sandbox tenant account.
1. Open the **App registrations** blade.
1. Select the name of your personal tab application to open its app registration.
1. Select  **Expose an API** (under *Manage*).

    :::image type="content" source="images/azure-app-registration-clients.png" alt-text="The screenshot is an example that shows the authorize client Ids from the *App registrations* blade on Azure portal.":::

1. In the **Authorized client applications** section, ensure all of the following `Client Id` values are added:

    |Microsoft 365 client application | Client ID |
    |--|--|
    |Teams desktop, mobile |1fec8e78-bce4-4aaf-ab1b-5451cc387264 |
    |Teams web |5e3ce6c0-2b1f-4285-8d4b-75ee78787346 |
    |Microsoft 365 web  |4765445b-32c6-49b0-83e6-1d93765276ca|
    |Microsoft 365 desktop  | 0ec893e0-5785-4de6-99da-4ed124e5296c |
    |Microsoft 365 mobile  | d3590ed6-52b3-4102-aeff-aad2292ab01c |
    |Outlook desktop | d3590ed6-52b3-4102-aeff-aad2292ab01c |
    |Outlook web | bc59ab01-8403-45c6-8796-ac3ef710b3e3|
    |Outlook mobile | 27922004-5251-4030-b22d-91ecd9a37ea4 |

    > [!NOTE]
    > Some Microsoft 365 client applications share Client IDs.

## Sideload your app in Teams

The final step to running your app in Microsoft 365 and Outlook is to sideload your updated personal tab [app package](..//concepts/build-and-test/apps-package.md) in Microsoft Teams.

1. Package your Teams application ([manifest](../resources/schema/manifest-schema.md) and [app icons](/microsoftteams/platform/resources/schema/manifest-schema#icons)) in a zip file. If you used Teams Toolkit to create your app, you can easily do this using the **Zip Teams metadata package** option in the **Deployment** menu of Teams Toolkit.

    :::image type="content" source="images/toolkit-zip-teams-metadata-package.png" alt-text="'The screenshot is an example that shows the Zip Teams metadata package' option in Teams Toolkit extension for Visual Studio Code.":::

1. Go to **Microsoft Teams** and sign in using your sandbox tenant account.

1. Select **Apps** to open the **Manage your apps** pane. Then select **Upload an app**.

    :::image type="content" source="images/teams-manage-your-apps.png" alt-text="The screenshot is an example that shows the Manage your apps pane and Publish an app options.":::

1. Choose **Upload a customized app** option and select your app package.

    :::image type="content" source="images/teams-upload-custom-app.png" alt-text="The screenshot is an example that shows the option to upload am app in Teams.":::

After it's sideloaded to Teams, your personal tab is available in Outlook and Microsoft 365 app. You must sign in with the same credentials that you used to sideload your app into Teams. When running the Microsoft 365 app for Android, you need to restart the app to use your personal tab app from the Microsoft 365 app.

You can pin the app for quick access, or you can find your app in the ellipses (**...**) flyout among recent applications in the sidebar on the left. Be aware, that pinning an app in Teams doesn't pin it as an app in Microsoft 365 app or Outlook.

## Preview your personal tab in other Microsoft 365 experiences

Here's how to preview your app running in Microsoft 365 and Outlook, web and Windows desktop clients.

> [!NOTE]
> If you use the Teams Toolkit sample app and uninstall it from Teams, it is removed from the **More Apps** catalogs in Outlook and Microsoft 365 app.

### Outlook on Windows

To view your app running in Outlook on Windows desktop:

1. Launch Outlook and sign in using your dev tenant account.
1. On the side bar, select  **More Apps**. Your sideloaded app title appears among your installed apps.
1. Select your app icon to launch your app in Outlook.

    :::image type="content" source="images/outlook-desktop-more-apps.png" alt-text="The screenshot is an example that shows the ellipses (More apps) option on the side bar of Outlook desktop client to see your installed personal tabs.":::

### Outlook on the web

To view your app in Outlook on the web:

1. Go to [Outlook on the web](https://outlook.office.com) and sign in using your dev tenant account.
1. On the side bar, select  **More Apps**. Your sideloaded app title appears among your installed apps.
1. Select your app icon to launch and preview your app running in Outlook on the web.

    :::image type="content" source="images/outlook-web-more-apps.png" alt-text="The screenshot is an example that shows the ellipses (More apps) option on the side bar of outlook.com to see your installed personal tabs.":::

### Outlook app for Mobile (iOS)

To view your app running in Outlook app for Mobile:

1. Open the Outlook app on your device and sign in using your developer tenant account. If the Outlook app was already running prior to sideloading your app in Teams, restart Teams to see it in the installed apps section.
1. Select the **More** icon. Your sideloaded app appears among installed apps.
1. Select your app icon to open your app in the mobile Outlook app.

    :::image type="content" source="images/outlook-mobile-more.png" alt-text="The screenshot is an example that shows the 'More' option on the side bar of the Outlook app to see your installed personal tabs.":::

### Microsoft 365 on Windows

To view your app running in Microsoft 365 on Windows desktop:

1. Launch Microsoft 365 and sign in using your dev tenant account.
1. Select the **Apps** icon on the side bar. Your sideloaded app title appears among your installed apps.
1. Select your app icon to launch your app in Microsoft 365.

    :::image type="content" source="images/office-desktop-more-apps.png" alt-text="The screenshot is an example that shows the ellipses (More apps) option on the side bar of Microsoft 365 desktop client to see your installed personal tabs.":::

### Microsoft 365 on the web

To preview your app running in Microsoft 365 on the web:

1. Log into **microsoft365.com** with test tenant credentials.
1. Select the **Apps** icon on the side bar. Your sideloaded app title appears among your installed apps.
1. Select your app icon to launch your app in Microsoft 365 on the web.

    :::image type="content" source="images/office-web-more-apps.png" alt-text="The screenshot is an example that shows the (More apps) option on the side bar of microsoft365.com to see your installed personal tabs.":::

### Microsoft 365 app for Mobile (Android)

To view your app running in Microsoft 365 app for Mobile:

1. Launch the Microsoft 365 app and sign in using your dev tenant account. If the Microsoft 365 app was already running prior to sideloading your app in Teams, you need to restart it in order to see in your installed apps.
1. Select the **Apps** icon. Your sideloaded app appears among installed apps.
1. Select your app icon to launch your app in the Microsoft 365 app.

    :::image type="content" source="images/office-mobile-apps.png" alt-text="The screenshot is an example that shows the 'Apps' option on the side bar of the Microsoft 365 app to see your installed personal tabs.":::

## Troubleshooting

Only a subset of Teams application types and capabilities are supported in Outlook and Microsoft 365 clients. For more information to check host support for various TeamsJS capabilities, see [Microsoft 365 app support](../tabs/how-to/using-teams-client-library.md#microsoft-365-support-running-teams-apps-in-microsoft-365-and-outlook).

For an overall summary of Microsoft 365 host and platform support for Teams apps, see [Extend Teams apps across Microsoft 365](overview.md).

You can check for host support of a given capability at runtime by calling the `isSupported()` function on that capability (namespace), and adjusting app behavior as appropriate. This allows your app to light up UI and functionality in hosts that support it and provide a graceful fallback experience in hosts that don't. For more information, see [Differentiate your app experience](../tabs/how-to/using-teams-client-library.md#differentiate-your-app-experience).

Use the [Microsoft Teams developer community channels](/microsoftteams/platform/feedback) to report issues and provide feedback.

### Debugging

From Teams Toolkit, you can Debug (`F5`) your tab application running in Microsoft 365 and Outlook, in addition to Teams.

:::image type="content" source="images/toolkit-debug-targets.png" alt-text="The screenshot is an example that shows the dropdown menu of debug in Teams in the Teams Toolkit.":::

Upon first run of local debug in Microsoft 365 app or Outlook, you're prompted to sign in to your Microsoft 365 tenant account and install a self-signed test certificate. You'll also be prompted to manually install Teams. Select **Install in Teams** to open a browser window and manually install your app. Then select **Continue** to proceed to debug your app in Microsoft 365 / Outlook.

:::image type="content" source="images/toolkit-dialog-teams-install.png" alt-text="The screenshot is an example that shows the Toolkit dialog box to install in Teams.":::

Provide feedback and report any issues with the Teams Toolkit debugging experience at [Microsoft Teams Framework (TeamsFx)](https://github.com/OfficeDev/TeamsFx/issues).

#### Mobile debugging

Teams Toolkit (`F5`) debugging isn't yet supported with Microsoft 365 app for Android. Here's how to remotely debug your app running in Microsoft 365 app for Android:

1. If you debug using a physical Android device, connect it to your dev machine and enable the option for [USB debugging](https://developer.android.com/studio/debug/dev-options). This is enabled by default with the Android emulator.
1. Launch the Microsoft 365 app From your Android device.
1. Open your profile **Me > Settings > Allow debugging**, and toggle on the option for **Enable remote debugging**.

    :::image type="content" source="images/office-android-enable-remote-debugging.png" alt-text="The screenshot is an example that shows the Enable remote debugging toggle option.":::

1. Leave **Settings**.
1. Leave your profile screen.
1. Select **Apps** and launch your sideloaded app to run within the Microsoft 365 app.
1. Ensure your Android device is connected to your dev machine. From your dev machine, open your browser to its DevTools inspection page. For example, go to `edge://inspect/#devices` in Microsoft Edge to display a list of debug-enabled Android WebViews.
1. Find the `Microsoft Teams Tab` with your tab URL and select **inspect** to start debugging your app with DevTools.

    :::image type="content" source="images/office-android-debug.png" alt-text="The screenshot is an example that shows the list of webviews in devtool.":::

1. Debug your tab app within the Android WebView. In the same way you [remotely debug](/microsoft-edge/devtools-guide-chromium/remote-debugging) a regular website on an Android device.

## Code sample

| **Sample Name** | **Description** | **Node.js** |
|---------------|--------------|--------|
| Todo List | Editable todo list with SSO built with React and Azure Functions. Works only in Teams (use this sample app to try the upgrade process described in this tutorial). | [View](https://github.com/OfficeDev/TeamsFx-Samples/tree/ga/todo-list-with-Azure-backend)  |
| Todo List (Microsoft 365) | Editable todo list with SSO built with React and Azure Functions. Works in Teams, Outlook, Microsoft 365 app. | [View](https://github.com/OfficeDev/TeamsFx-Samples/tree/ga/todo-list-with-Azure-backend-M365)|
| Image Editor (Microsoft 365 app) | Create, edit, open, and save images using Microsoft Graph API. Works in Teams, Outlook, Microsoft 365 app. | [View](https://github.com/OfficeDev/m365-extensibility-image-editor) |
| Sample Launch Page (Microsoft 365 app) | Demonstrates SSO authentication and the TeamsJS library capabilities as available in different hosts. Works in Teams, Outlook, Microsoft 365 app. | [View](https://github.com/OfficeDev/microsoft-teams-library-js/tree/main/apps/sample-app) |
| Northwind Orders app | Demonstrates how to use the TeamsJS library v.2 to extend teams application to other Microsoft 365 host apps. Works in Teams, Outlook, Microsoft 365 app. Optimized for mobile.| [View](https://github.com/microsoft/app-camp/tree/main/experimental/ExtendTeamsforM365) |

## Next step

Publish your app to be discoverable in Teams, Outlook, and Microsoft 365 app:

> [!div class="nextstepaction"]
> [Publish Teams apps for Outlook and Office](publish.md)

## See also

* [Extend Teams apps across Microsoft 365](overview.md)
* [Public developer preview for Teams](../resources/dev-preview/developer-preview-intro.md)
