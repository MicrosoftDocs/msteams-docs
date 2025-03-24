---
title: Extend Personal Tab to Microsoft 365
description: Learn how to update personal tab app to run in Outlook and Microsoft 365 app, configure Content Security Policy headers, update app registration for SSO.
ms.date: 10/17/2024
ms.author: mosdevdocs
author: erikadoyle
ms.topic: tutorial
ms.localizationpriority: medium
ms.subservice: m365apps
---
# Extend a Teams personal tab across Microsoft 365

Personal tabs provide a great way to enhance the Microsoft Teams experience. Using personal tabs, you can provide a user access to their application right within Teams, without the user having to leave the experience or sign in again. Personal tabs can light up within other Microsoft 365 applications too. This tutorial demonstrates the process of taking an existing Teams personal tab and updating it to run across Microsoft 365 applications.

Updating your Teams personal app to run in other Microsoft 365 applications involves these steps:

> [!div class="checklist"]
>
> * [Update your app manifest (previously called Teams app manifest)](#update-the-app-manifest).
> * [Update your Microsoft Teams JavaScript client library (TeamsJS) references](#update-teamsjs-references).
> * [Amend your Content Security Policy headers](#configure-content-security-policy-headers).
> * [Update your Microsoft Entra App Registration for Single Sign-On (SSO)](#update-azure-ad-app-registration-for-sso).
> * [Upload your updated custom app in Teams](#upload-your-custom-app-in-teams).

The rest of this guide walks you through these steps and show you how to preview your personal tab in other Microsoft 365 applications.

## Prerequisites

To complete this tutorial, you need:

* A Microsoft 365 Developer Program sandbox tenant.
* A machine with Microsoft 365 apps installed from the Microsoft 365 Apps *Current Channel*.
* (Optional) Your sandbox tenant enrolled in Microsoft 365 Targeted Releases.
* (Optional) An Android device or emulator with Microsoft 365 for Android app installed.
* (Optional) [Teams Toolkit](https://aka.ms/teams-toolkit) extension for Microsoft Visual Studio Code to help update your code.

> [!div class="nextstepaction"]
> [Install prerequisites](prerequisites.md)

## Prepare your personal tab for the upgrade

If you have an existing personal tab app, make a copy or a branch of your production project for testing and update your App ID in the app manifest to use a new identifier (distinct from the production App ID, for testing).

If you'd like to use sample code instead of your own production code, you can use the Todo List sample. You can either follow the setup steps in the [Todo List Sample](https://github.com/OfficeDev/TeamsFx-Samples/tree/v2.1.0/todo-list-with-Azure-backend) GitHub repository or use the Teams Toolkit extension to create a new Teams app (select **Start from a sample** > **Todo List with backend on Azure**). After you've created a personal tab, return to this article to extend it across Microsoft 365.

Alternately, you can use a basic single sign-on (SSO) **hello world** app that's already Microsoft 365 app enabled, as shown in the following [Quickstart](#quickstart) section, and then skip to [upload your custom app in Teams](#upload-your-custom-app-in-teams).

### Quickstart

Use the Teams Toolkit extension for Visual Studio Code to start with a personal tab that's enabled to run in Teams, Outlook, and Microsoft 365.

1. Open **Visual Studio Code**.
2. Select the Teams Toolkit :::image type="icon" source="../assets/images/teams-toolkit-v2/teams-toolkit-sidebar-icon.PNG" border="false"::: icon in the activity bar.
3. Select **Create a New App**.
4. Select **Tab**.
5. Select **Basic Tab**.

    :::image type="content" source="images/toolkit-tab-sample.png" alt-text="Screenshot shows the Basic Tab option highlighted to create a new app feature using a tab.":::

6. Select a preferred programming language.
7. Select a location on your local machine for the workspace folder and enter your application name.
8. Once your app is created, within the Teams Toolkit extension, make sure you're signed in to the appropriate Microsoft 365 Developer Program sandbox tenant and Azure account. These options are available in the **ACCOUNTS** section of the extension.
9. Select **Command Palette...** under the View option or **Ctrl+Shift+P**.
10. Enter **Teams: Provision** to create the Teams app resources such as Azure App Service, App Service plan, Azure Bot, and Managed Identity in your Azure account. Alternatively, you can select **Provision** under **LIFECYCLE** section of the extension.
11. Select a subscription and a resource group. If you choose to create a new resource group, you need to specify the location.
12. Select **Provision**.
13. Select **Command Palette...** under the View option or **Ctrl+Shift+P**.
14. Enter **Teams: Deploy** to deploy the sample code to the provisioned resources in Azure and start the app. Alternatively, you can select **Deploy** under the **LIFECYCLE** section of the extension.

From here, you can skip ahead to [upload your custom app in Teams](#upload-your-custom-app-in-teams) and preview your app in Outlook and the Microsoft 365 app. The app manifest and TeamsJS API calls are already updated for Microsoft 365 app.

> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI+ran+into+an+issue%5D+Quickstart&&author=%40erikadoyle&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Fm365-apps%2Fextend-m365-teams-personal-tab%3Ftabs%3Dmanifest-teams-toolkit%23quickstart&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Fm365-apps%2Fextend-m365-teams-personal-tab.md&documentVersionIndependentId=b2cf31a5-621a-eeac-26c9-89ada49466c0&metadata=*%2BID%253A%2Be473e1f3-69f5-bcfa-bcab-54b098b59c80%2B%250A*%2BService%253A%2B%2A%2Amsteams%2A%2A)

### SharePoint Framework (SPFx) apps

Starting with version 1.16 of [SharePoint Framework](/sharepoint/dev/spfx/integrate-with-teams-introduction) (SPFx), Teams personal tabs built and hosted with SPFx are also supported in Outlook and Microsoft 365 app. To update a SPFx Teams personal tab app, follow these steps:

1. Ensure you have the latest version of SPFx.

    ```cmd
    npm install @microsoft/generator-sharepoint@latest --global
    ```

1. [Update the app manifest](#update-the-app-manifest).
1. [Update the TeamsJS references](#update-teamsjs-references).

After you update TeamsJS references, [upload your app in Teams](#upload-your-custom-app-in-teams) to preview your SPFx personal tab app running in Outlook and Microsoft 365 app. For more information, see [Extend Outlook and Microsoft 365 app with the SharePoint Framework](/sharepoint/dev/spfx/office/overview).


## Update the app manifest

You need to use the app manifest schema version `1.13` (or later) to enable your Teams personal tab to run in Outlook and Microsoft 365 app. For more information on schema version, see [app manifest](../resources/schema/manifest-schema.md).

You have two options for updating your app manifest:

# [Teams Toolkit](#tab/manifest-teams-toolkit)

1. Open the command palette: `Ctrl+Shift+P`.
1. Run the `Teams: Upgrade Teams manifest` command and select your app manifest file. Changes are made in place.

# [Manual steps](#tab/manifest-manual)

Open your app manifest and update the `$schema` and `manifestVersion` manually with the appropriate version. Refer to [Teams developer manifest](../resources/schema/manifest-schema.md) for version information:

```json
{
    "$schema" : "https://developer.microsoft.com/json-schemas/teams/v1.14/MicrosoftTeams.schema.json",
    "manifestVersion" : "1.16"
}
```
---

You can use Teams Toolkit to [validate your app manifest](../toolkit/TeamsFx-preview-and-customize-app-manifest.md#validate-your-app) and identify any errors.

[!INCLUDE [requirements-targeting](../includes/requirements-targeting.md)]

## Update TeamsJS references

Your app must refer to the npm package `@microsoft/teams-js@2.19.0` (or later) to run in Outlook and Microsoft 365. Previous versions of TeamsJS are still functional in Outlook and Microsoft 365 apps, but deprecation warnings are logged. Support for the previous versions eventually gets discontinued in both Outlook and Microsoft 365. To determine the latest version of TeamsJS, see [TeamsJS GitHub repository](https://github.com/OfficeDev/microsoft-teams-library-js).

You can use Teams Toolkit to help identify and automate the required code changes to upgrade from 1.x TeamsJS versions to TeamsJS 2.x.x versions. Alternately, you can perform the same steps manually; refer to [TeamsJS library](../tabs/how-to/using-teams-client-library.md#whats-new-in-teamsjs-version-2xx) for details.

1. Open the *Command palette*: `Ctrl+Shift+P`.
1. Run the command `Teams: Upgrade Teams JS SDK and code references`.

Upon completion, your *package.json* file references `@microsoft/teams-js@2.0.0` (or later) and your `*.js/.ts` and `*.jsx/.tsx` files are updated with:

> [!div class="checklist"]
>
> * Import statements for `teams-js@2.x.x`
> * [Function, Enum, and Interface calls](../tabs/how-to/using-teams-client-library.md#whats-new-in-teamsjs-version-2xx) for `teams-js@2.x.x`
> * `TODO` comment reminders flagging areas that might be impacted by [Context](../tabs/how-to/using-teams-client-library.md#updates-to-the-context-interface) interface changes
> * `TODO` comment reminders to [convert callback functions to promises](../tabs/how-to/using-teams-client-library.md#callbacks-converted-to-promises)

> [!IMPORTANT]
> Code inside *.html* files is not supported by the upgrade tooling and require manual changes.

## Configure Content Security Policy headers

As in Microsoft Teams, tab applications are hosted within [iframe elements](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe) in Microsoft 365 app and Outlook web clients.

If your app makes use of [Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy) (CSP) headers, make sure you allow all the following [frame-ancestors](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/frame-ancestors) in your CSP headers:

[!INCLUDE [CSP headers for multi-hub apps](~/includes/tabs/content-security-policy-headers.md)]

[!INCLUDE [ocdi-warning](../includes/tabs/ocdi-warning.md)]

<a name='update-azure-ad-app-registration-for-sso'></a>

## Update Microsoft Entra app registration for SSO

[Microsoft Entra Single-sign on (SSO)](../tabs/how-to/authentication/tab-sso-overview.md) for personal tabs works the same way in Microsoft 365 app and Outlook as it does in Teams. However, you need to add several client application identifiers to the Microsoft Entra app registration of your tab app in your tenant's *App registrations* portal.

1. Sign in to [Microsoft Azure portal](https://portal.azure.com) with your sandbox tenant account.
1. Open **App registrations**.
1. Select the name of your personal tab application to open its app registration.
1. Select  **Expose an API** (under *Manage*).

    :::image type="content" source="images/azure-app-registration-clients.png" alt-text="Screenshot shows the authorized client IDs from the app registrations on Azure portal.":::

1. In the **Authorized client applications** section, ensure all of the following `Client Id` values are added:
    [!INCLUDE [Microsoft 365 client application IDs](~/includes/tabs/microsoft-365-client-application-ids.md)]

> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI+ran+into+an+issue%5D+Update+Microsoft+Entra+app+registration+for+SSO&&author=%40erikadoyle&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Fm365-apps%2Fextend-m365-teams-personal-tab%3Ftabs%3Dmanifest-teams-toolkit%23update-microsoft-entra-app-registration-for-sso&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Fm365-apps%2Fextend-m365-teams-personal-tab.md&documentVersionIndependentId=b2cf31a5-621a-eeac-26c9-89ada49466c0&metadata=*%2BID%253A%2Be473e1f3-69f5-bcfa-bcab-54b098b59c80%2B%250A*%2BService%253A%2B%2A%2Amsteams%2A%2A)

## Upload your custom app in Teams

The final step to running your app in Microsoft 365 and Outlook is to upload your updated personal tab [app package](..//concepts/build-and-test/apps-package.md) in Microsoft Teams.

1. Package your ([app manifest](../resources/schema/manifest-schema.md) and [app icons](/microsoftteams/platform/resources/schema/manifest-schema#icons)) in a zip file. If you used Teams Toolkit to create your app, you can easily do this using the **Zip Teams App Package** option in the **UTILITY** section of Teams Toolkit. Select the `manifest.json` file for your app and the appropriate environment.

    :::image type="content" source="images/toolkit-zip-teams-app-package.png" alt-text="Screenshot shows the Zip Teams App Package option in Teams Toolkit extension for Visual Studio Code.":::

1. Go to **Microsoft Teams** and sign in using your sandbox tenant account.

1. Select **Apps** to open the **Manage your apps** pane. Then select **Upload an app**.

    :::image type="content" source="images/teams-manage-your-apps.png" alt-text="Screenshot shows the Upload an app option under Manage your apps.":::

1. Choose the **Upload a custom app** option and select your app package.

    :::image type="content" source="images/teams-upload-custom-app.png" alt-text="Screenshot shows the option to upload an app in Teams.":::

After it's uploaded to Teams, your personal tab is available in Outlook and Microsoft 365 app. You must sign in with the same credentials that you used to upload your app into Teams. When running the Microsoft 365 for Android app, you need to restart the app to use your personal tab app from the Microsoft 365 app.

You can pin the app for quick access, or you can find your app in the ellipses (**...**) flyout among recent applications in the sidebar on the left. Be aware, that pinning an app in Teams doesn't pin it as an app in Microsoft 365 app or Outlook.

> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI+ran+into+an+issue%5D+Upload+your+custom+app+in+Teams&&author=%40erikadoyle&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Fm365-apps%2Fextend-m365-teams-personal-tab%3Ftabs%3Dmanifest-teams-toolkit%23upload-your-custom-app-in-teams&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Fm365-apps%2Fextend-m365-teams-personal-tab.md&documentVersionIndependentId=b2cf31a5-621a-eeac-26c9-89ada49466c0&metadata=*%2BID%253A%2Be473e1f3-69f5-bcfa-bcab-54b098b59c80%2B%250A*%2BService%253A%2B%2A%2Amsteams%2A%2A)

## Preview your personal tab in other Microsoft 365 experiences

Here's how to preview your app running in Microsoft 365 and Outlook, web and Windows desktop clients.

[!INCLUDE [m365-app-rename](~/includes/m365-app-rename.md)]

> [!NOTE]
> If you use the Teams Toolkit sample app and uninstall it from Teams, it is removed from the **More Apps** catalogs in Outlook and Microsoft 365 app.

### Outlook on Windows

To view your app running in Outlook on Windows desktop:

1. Launch Outlook and sign in using your dev tenant account.
1. On the side bar, select  **More apps**. Your uploaded custom app title appears among your installed apps.
1. Select your app icon to launch your app in Outlook.

    :::image type="content" source="images/outlook-desktop-more-apps.png" alt-text="Screenshot shows the More apps option on the side bar of Outlook desktop client to see your installed tab app.":::

> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI+ran+into+an+issue%5D+Outlook+on+Windows&&author=%40erikadoyle&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Fm365-apps%2Fextend-m365-teams-personal-tab%3Ftabs%3Dmanifest-teams-toolkit%23outlook-on-windows&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Fm365-apps%2Fextend-m365-teams-personal-tab.md&documentVersionIndependentId=b2cf31a5-621a-eeac-26c9-89ada49466c0&metadata=*%2BID%253A%2Be473e1f3-69f5-bcfa-bcab-54b098b59c80%2B%250A*%2BService%253A%2B%2A%2Amsteams%2A%2A)

### Outlook on the web

To view your app in Outlook on the web:

1. Go to [Outlook on the web](https://outlook.office.com) and sign in using your dev tenant account.
1. On the side bar, select  **Apps**. Your uploaded custom app title appears among your installed apps.
1. Select your app icon to launch and preview your app running in Outlook on the web.

    :::image type="content" source="images/outlook-web-more-apps.png" alt-text="Screenshot shows the Apps option on the side bar of outlook.com to see your installed tab app.":::

> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI+ran+into+an+issue%5D+Outlook+on+the+web&&author=%40erikadoyle&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Fm365-apps%2Fextend-m365-teams-personal-tab%3Ftabs%3Dmanifest-teams-toolkit%23outlook-on-the-web&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Fm365-apps%2Fextend-m365-teams-personal-tab.md&documentVersionIndependentId=b2cf31a5-621a-eeac-26c9-89ada49466c0&metadata=*%2BID%253A%2Be473e1f3-69f5-bcfa-bcab-54b098b59c80%2B%250A*%2BService%253A%2B%2A%2Amsteams%2A%2A)

### Outlook for Android app

To view your app running in Outlook for Android app:

1. Open the Outlook app on your Android device and sign in using your developer tenant account. If the Outlook app for Android was already running prior to uploading your custom app, restart Outlook app to see it in the installed apps section.
1. Select the **Apps** icon. Your uploaded custom app appears among installed apps.
1. Select your app icon to open your app in Outlook for Android.

    :::image type="content" source="images/outlook-mobile-android-more.png" alt-text="Screenshot shows the Apps option of the Outlook app on Android.":::

> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI+ran+into+an+issue%5D+Outlook+for+Android+app&&author=%40erikadoyle&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Fm365-apps%2Fextend-m365-teams-personal-tab%3Ftabs%3Dmanifest-teams-toolkit%23outlook-for-android-app&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Fm365-apps%2Fextend-m365-teams-personal-tab.md&documentVersionIndependentId=b2cf31a5-621a-eeac-26c9-89ada49466c0&metadata=*%2BID%253A%2Be473e1f3-69f5-bcfa-bcab-54b098b59c80%2B%250A*%2BService%253A%2B%2A%2Amsteams%2A%2A)

### Outlook app for iOS

To view your app running in Outlook app for iOS:

1. Open the Outlook app on your device and sign in using your developer tenant account. If the Outlook app was already running prior to uploading your custom app in Teams, restart Outlook to see it in the installed apps section.
1. Select the **More** icon. Your uploaded custom app appears among installed apps.
1. Select your app icon to open your app in the Outlook app.

    :::image type="content" source="images/outlook-ios-mobile-more.png" alt-text="Screenshot shows the More option of the Outlook app on iOS.":::

> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI+ran+into+an+issue%5D+Outlook+app+for+iOS&&author=%40erikadoyle&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Fm365-apps%2Fextend-m365-teams-personal-tab%3Ftabs%3Dmanifest-teams-toolkit%23outlook-app-for-ios&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Fm365-apps%2Fextend-m365-teams-personal-tab.md&documentVersionIndependentId=b2cf31a5-621a-eeac-26c9-89ada49466c0&metadata=*%2BID%253A%2Be473e1f3-69f5-bcfa-bcab-54b098b59c80%2B%250A*%2BService%253A%2B%2A%2Amsteams%2A%2A)

### Microsoft 365 on Windows

To view your app running in Microsoft 365 on Windows desktop:

1. Launch Microsoft 365 and sign in using your dev tenant account.
1. Select the **Apps** icon on the side bar. Your uploaded custom app title appears among your installed apps.
1. Select your app icon to launch your app in Microsoft 365.

    :::image type="content" source="images/office-desktop-more-apps.png" alt-text="Screenshot shows the Apps option on the side bar of Microsoft 365 desktop client to see your installed tab app.":::

> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI+ran+into+an+issue%5D+Microsoft+365+on+Windows&&author=%40erikadoyle&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Fm365-apps%2Fextend-m365-teams-personal-tab%3Ftabs%3Dmanifest-teams-toolkit%23microsoft-365-on-windows&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Fm365-apps%2Fextend-m365-teams-personal-tab.md&documentVersionIndependentId=b2cf31a5-621a-eeac-26c9-89ada49466c0&metadata=*%2BID%253A%2Be473e1f3-69f5-bcfa-bcab-54b098b59c80%2B%250A*%2BService%253A%2B%2A%2Amsteams%2A%2A)

### Microsoft 365 on the web

To preview your app running in Microsoft 365 on the web:

1. Log into **microsoft365.com** with test tenant credentials.
1. Select the **Apps** icon on the side bar. Your uploaded custom app title appears among your installed apps.
1. Select your app icon to launch your app in Microsoft 365 on the web.

    :::image type="content" source="images/office-web-more-apps.png" alt-text="Screenshot shows the Apps option on the side bar of microsoft365.com to see your installed tab app.":::

> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI+ran+into+an+issue%5D+Microsoft+365+on+Webs&&author=%40erikadoyle&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Fm365-apps%2Fextend-m365-teams-personal-tab%3Ftabs%3Dmanifest-teams-toolkit%23microsoft-365-on-the-web&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Fm365-apps%2Fextend-m365-teams-personal-tab.md&documentVersionIndependentId=b2cf31a5-621a-eeac-26c9-89ada49466c0&metadata=*%2BID%253A%2Be473e1f3-69f5-bcfa-bcab-54b098b59c80%2B%250A*%2BService%253A%2B%2A%2Amsteams%2A%2A)

### Microsoft 365 for Android app

To view your app running in Microsoft 365 for Android app:

1. Launch the Microsoft 365 app on your device and sign in using your developer tenant account. If the Microsoft 365 app was already running prior to uploading your custom app in Teams, you need to restart Teams to see it in your installed apps.
1. Select the **Apps** icon. Your uploaded custom app appears among installed apps.
1. Select your app icon to launch your app in the Microsoft 365 app.

    :::image type="content" source="images/m365-android-more-apps.png" alt-text="Screenshot shows the Apps option on the side bar of the Microsoft 365 app to see your installed personal tabs on Microsoft 365 for Android app.":::

> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI+ran+into+an+issue%5D+Microsoft+365+for+Android+app&&author=%40erikadoyle&pageUrl=https://learn.microsoft.com/en-us/microsoftteams/platform/m365-apps/extend-m365-teams-personal-tab?tabs=manifest-teams-toolkit#microsoft-365-for-android-app&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Fm365-apps%2Fextend-m365-teams-personal-tab.md&documentVersionIndependentId=b2cf31a5-621a-eeac-26c9-89ada49466c0&metadata=*%2BID%253A%2Be473e1f3-69f5-bcfa-bcab-54b098b59c80%2B%250A*%2BService%253A%2B%2A%2Amsteams%2A%2A)

### Microsoft 365 for iOS

To view your app running in Microsoft 365 for iOS:

1. Launch the Microsoft 365 app on your device and sign in using your developer tenant account. If the Microsoft 365 app was already running prior to uploading your custom app in Teams, you need to restart Teams to see it in your installed apps.
1. Select the **Apps** icon. Your uploaded custom app appears among installed apps.
1. Select your app icon to launch your app in the Microsoft 365 app.

    :::image type="content" source="images/m365-ios-more-apps.png" alt-text="Screenshot shows the Apps option on the side bar of the Microsoft 365 app to see your installed personal tabs on Microsoft 365 for iOS.":::

> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI+ran+into+an+issue%5D+Microsoft+365+for+iOS&&author=%40erikadoyle&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Fm365-apps%2Fextend-m365-teams-personal-tab%3Ftabs%3Dmanifest-teams-toolkit%23microsoft-365-for-ios&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Fm365-apps%2Fextend-m365-teams-personal-tab.md&documentVersionIndependentId=b2cf31a5-621a-eeac-26c9-89ada49466c0&metadata=*%2BID%253A%2Be473e1f3-69f5-bcfa-bcab-54b098b59c80%2B%250A*%2BService%253A%2B%2A%2Amsteams%2A%2A)

## Troubleshooting

Only a subset of Teams application types and capabilities are supported in Outlook and Microsoft 365 clients. For more information to check host support for various TeamsJS capabilities, see [Microsoft 365 app support](../tabs/how-to/using-teams-client-library.md#microsoft-365-support-running-teams-apps-in-microsoft-365-and-outlook).

For an overall summary of Microsoft 365 host and platform support for Teams apps, see [Extend Teams apps across Microsoft 365](overview.md).

You can check for host support of a given capability at runtime by calling the `isSupported()` function on that capability (namespace), and adjusting app behavior as appropriate. This action allows your app to light up UI and functionality in hosts that support it and provide a graceful fallback experience in hosts that don't. For more information, see [Differentiate your app experience](../tabs/how-to/using-teams-client-library.md#differentiate-your-app-experience).

Use the [Microsoft Teams developer community channels](/microsoftteams/platform/feedback) to report issues and provide feedback.

### Debugging

You can debug your tab application running in Teams, Microsoft 365 app, and Outlook with Teams Toolkit in Visual Studio Code.

:::image type="content" source="images/toolkit-debug-targets.png" alt-text="Screenshot shows the debug dropdown menu in Teams Toolkit.":::

Choose the desired debug method and select the **F5** key. Upon the first run of the local debug, Teams Toolkit prompts you to sign in to your Microsoft 365 tenant account.

Provide feedback and report any issues with the Teams Toolkit debugging experience at [Microsoft Teams Framework (TeamsFx)](https://github.com/OfficeDev/TeamsFx/issues).

#### Mobile debugging

##### Debugging Outlook for Android

To debug your app in Outlook for Android:

1. Select the **More** icon in the Teams mobile client and open your uploaded custom app to run within the Outlook app.
1. Ensure your Android device is connected to your dev machine. From your dev machine, open your browser to its DevTools inspection page. For example, go to `edge://inspect/#devices` in Microsoft Edge to display a list of debug-enabled Android WebViews.
1. Find the `Microsoft Teams Tab` with your tab URL and select **inspect** to start debugging your app with DevTools.

    :::image type="content" source="images/office-android-debug.png" alt-text="Screenshot shows the list of webviews in DevTools.":::

1. Debug your tab app within the Android WebView in the same way that you [remotely debug](/microsoft-edge/devtools-guide-chromium/remote-debugging) a regular website on an Android device.

##### Debugging Microsoft 365 for Android

Teams Toolkit (`F5`) doesn't support debugging Android apps in Microsoft 365. Here's how to remotely debug your app running in Microsoft 365 for Android app:

1. If you debug using a physical Android device, connect it to your dev machine and enable the option for [USB debugging](https://developer.android.com/studio/debug/dev-options). This option is enabled by default with the Android emulator.
2. Launch the Microsoft 365 app From your Android device.
3. Open your profile **Me > Settings > Allow debugging**, and toggle on the option for **Enable remote debugging**.

    :::image type="content" source="images/office-android-enable-remote-debugging.png" alt-text="Screenshot shows the Enable remote debugging toggle option.":::

4. Leave **Settings**.
5. Leave your profile screen.
6. Select **Apps** and launch your uploaded custom app to run within the Microsoft 365 app.
7. Ensure your Android device is connected to your dev machine. From your dev machine, open your browser to its DevTools inspection page. For example, go to `edge://inspect/#devices` in Microsoft Edge to display a list of debug-enabled Android WebViews.
8. Find the `Microsoft Teams Tab` with your tab URL and select **inspect** to start debugging your app with DevTools.

    :::image type="content" source="images/office-android-debug.png" alt-text="Screenshot shows the list of webviews in DevTools." lightbox="images/office-android-debug.png":::

9. Debug your tab app within the Android WebView in the same way that you [remotely debug](/microsoft-edge/devtools-guide-chromium/remote-debugging) a regular website on an Android device.

## Code sample

| **Sample Name** | **Description** | **Node.js** |
|---------------|--------------|--------|
| Todo List | Editable todo list with SSO built with React and Azure Functions. Works only in Teams (use this sample app to try the upgrade process described in this tutorial). | [View](https://github.com/OfficeDev/TeamsFx-Samples/tree/v2.1.0/todo-list-with-Azure-backend)  |
| Todo List (Microsoft 365) | Editable todo list with SSO built with React and Azure Functions. Works in Teams, Outlook, Microsoft 365 app. | [View](https://github.com/OfficeDev/TeamsFx-Samples/tree/v2.1.0/todo-list-with-Azure-backend-M365)|
| Image Editor (Microsoft 365 app) | Create, edit, open, and save images using Microsoft Graph API. Works in Teams, Outlook, Microsoft 365 app. | [View](https://github.com/OfficeDev/m365-extensibility-image-editor) |
| Northwind Orders app | Demonstrates how to use the TeamsJS library v.2 to extend teams application to other Microsoft 365 host apps. Works in Teams, Outlook, Microsoft 365 app. Optimized for mobile.| [View](https://github.com/microsoft/app-camp/tree/main/experimental/ExtendTeamsforM365) |

## Next step

Publish your app to be discoverable in Teams, Outlook, and Microsoft 365 app:

> [!div class="nextstepaction"]
> [Publish Teams apps for Outlook and Office](publish.md)

## See also

* [Extend Teams apps across Microsoft 365](overview.md)
* [Public developer preview for Teams](../resources/dev-preview/developer-preview-intro.md)
