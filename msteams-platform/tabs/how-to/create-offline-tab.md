---
title: Build an Offline Tab
author: surbhigupta
description: Learn how to create, configure, and run a personal tab that works without internet connectivity in Microsoft Teams.
ms.topic: conceptual
ms.author: surbhigupta
ms.date: 09/30/2024
---

# Create an offline tab

You can create a personal tab that works without an internet connection in Microsoft Teams. The tab stores the inputs given by the user locally. When the user's device reconnects to the internet, the tab automatically synchronizes the locally stored data with an Azure blob storage. This action ensures that all the offline changes made by the user are updated in the central storage, maintaining data consistency across the organization.

# [Desktop](#desktop)

:::image type="content" source="../../assets/images/tabs/tab-support-offline.gif" alt-text="Graphic shows how an offline tab works in Teams desktop client.":::

# [Mobile](#mobile)

:::image type="content" source="../../assets/images/tabs/tab-support-offline-mobile.gif" alt-text="Graphic shows how an offline tab works in Teams mobile client.":::

---

Creating a personal tab with offline functionality in Teams has the following advantages:

* **Accessibility**: You can access important information, documents, or tools without needing an internet connection, making it easier in remote areas or during travel.
* **Seamless Syncing**: Any changes made offline can automatically sync once you’re back online. This ensures that your work is up-to-date without manual effort.

## Prerequisites

| Install | For using... |
| --- | --- |
| [Visual Studio Code](https://code.visualstudio.com/download) | JavaScript or TypeScript build environments. Use the latest version. |
| [Teams Toolkit](https://marketplace.visualstudio.com/items?itemName=TeamsDevApp.ms-teams-vscode-extension) | Microsoft Visual Studio Code extension that creates a project scaffolding for your app. Use the latest version. |
| [Node.js](https://nodejs.org/en/download/) | Back-end JavaScript runtime environment. For more information, see [Node.js version compatibility table](~/toolkit/build-environments.md#nodejs-version-compatibility-table-for-project-type).|
| [Microsoft Teams](https://www.microsoft.com/microsoft-teams/download-app) | To collaborate with everyone you work with through apps for chat, meetings, and calls in one place.|
| [ngrok](https://ngrok.com/download) | A reverse proxy software tool that creates a tunnel to your locally running web server's publicly available HTTPS endpoints. |
| [Azure blob storage](/azure/storage/blobs/storage-blobs-overview) | A cloud-based storage solution designed to store large amounts of unstructured data, such as text and binary data. |
| [Microsoft Edge](https://www.microsoft.com/edge/) (recommended) or [Google Chrome](https://www.google.com/chrome/) | A browser with developer tools. |
| [Microsoft 365 developer account](/microsoftteams/platform/concepts/build-and-test/prepare-your-o365-tenant) | Access to a Teams account with the appropriate permissions to install an app and [enable custom Teams apps and turn on custom app upload](../../../concepts/build-and-test/prepare-your-o365-tenant.md#enable-custom-teams-apps-and-turn-on-custom-app-uploading). |

## Build an offline tab app

1. Download the [sample](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/tab-support-offline/nodejs/).

1. Open Visual Studio Code.

1. Go to **File** > **Open Folder...** and select the downloaded sample folder.

1. Select the Teams Toolkit  :::image type="icon" source="../msteams-platform/assets/images/teams-toolkit-v2/teams-toolkit-sidebar-icon.png"::: icon in the activity bar.

1. Select **Sign in to Microsoft 365** using your credentials. Your default web browser opens to let you sign in.

:::image type="content" source="../msteams-platform/assets/images/teams-toolkit-v2/ttk-sign-in-m365.png" alt-text="Screenshot shows where to sign in to Microsoft 365 and Azure.":::

1. Close the browser after signing in using your credentials.

1. Return to Teams Toolkit within Visual Studio Code.

The **ACCOUNTS** section of the sidebar shows your Microsoft 365 account name. If custom app upload is enabled for your Microsoft 365 account, Teams Toolkit displays **Custom App Upload Enabled**.

:::image type="content" source="../msteams-platform/assets/images/teams-toolkit-v2/first-tab/m365-sideloading-enabled-msg.png" alt-text="Screenshot shows the user signed in to Microsoft 365 and the custom app upload enabled message.":::

1. Select the **F5** key to run your application in debug mode.

1. Teams opens in a browser window when the build is complete. Sign in with your Microsoft 365 account, if prompted.

1. A dialog box opens to let you add the tab app to Teams. Select **Add**.

### Create and configure a Microsoft Entra app

1. Go to [Azure portal](https://portal.azure.com) and select **Microsoft Entra ID**.

1. Select **App Registrations** > **New registration** to create a new Microsoft Entra app:
   * **Name**: Set the name as your tab app's name.
   * **Supported account types**: Select an option of your choice as any account type works.
   * Leave the **Redirect URL** field blank.
   * Select **Register**.

1. When Azure registers the app, you're taken to the app's **Overview** page. Copy the **Application (client) ID**, **Object ID**, and **Directory (tenant) ID**; for later use.

1. [Generate the application ID Uniform Resource Identifier (URI)](authentication/tab-sso-register-aad.md#to-expose-an-api).

1. [Configure the API scope](authentication/tab-sso-register-aad.md#to-configure-api-scope).

1. [Configure the authorized client applications](authentication/tab-sso-register-aad.md#to-configure-authorized-client-application).

1. [Configure the API permissions](authentication/tab-sso-graph-api.md#to-configure-api-permissions) and add the following permissions:
   1. `User.Read` (enabled by default)
   2. `profile`
   3. `openid`
   4. `offline_access`
   5. `email`

1. [Create a client secret](../../toolkit/use-existing-aad-app.md#create-client-secret-for-microsoft-entra-app-optional).

### Create a dev tunnel

### Customize manifest

## Code sample

| Sample name | Description | Node.js | Manifest |
|----|----|----|----|----|
| Offline Support Tickets | A sample tab app that demonstrates an offline personal tab. | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/tab-support-offline/nodejs/) | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/tab-support-offline/nodejs/demo-manifest/tab-support-offline.zip) |

## See also

* [Build tabs for Teams](../what-are-tabs.md)
* [Create a personal tab](create-personal-tab.md)
* [Tabs on mobile](~/tabs/design/tabs-mobile.md)
