---
title: Prerequisites for Teams Toolkit 
author: zyxiaoyuer
description: In this module, learn the prerequisites required for Tools and SDK
ms.author: surbhigupta
ms.localizationpriority: high
ms.topic: overview
ms.date: 03/14/2022
---
# Prerequisites for creating your Teams app

While creating your Teams app using Teams Toolkit in Visual Studio Code, you must need the following prerequisites:

* [Basic requirements to build your Teams app](#basic-requirements-to-build-your-teams-app)
* [Accounts to build your Teams app](#accounts-to-build-your-teams-app)
* [Sideloading permission](#sideloading-permission)

## Basic requirements to build your Teams app

For creating different Teams app using Teams Toolkit in Visual Studio Code, you'll need the following basic requirements:

| &nbsp; | Basic requirements | For using| For environment type|
   | --- | --- | --- |
   | **Required** | &nbsp; | &nbsp; | &nbsp; |
   | &nbsp; | Teams Toolkit| A Microsoft Visual Studio Code extension that creates a project scaffolding for your app. Use 4.0.0 version. | JavaScript and SPFx|
   | &nbsp; | [Microsoft Teams](https://www.microsoft.com/microsoft-teams/download-app) | Microsoft Teams to collaborate with everyone you work with through apps for chat, meetings, call - all in one place.| JavaScript and SPFx|
   | &nbsp; | [Node.js](https://nodejs.org/en/download/) | Back-end JavaScript runtime environment. Use the latest v16 LTS release.| JavaScript and SPFx|
   | &nbsp; |[NPM](https://www.npmjs.com/package/@microsoft/teamsfx) | Install and manage packages for use in both Node.js and ASP.NET Core applications.| JavaScript and SPFx|
   | &nbsp; | [Microsoft&nbsp;Edge](https://www.microsoft.com/edge) (recommended) or [Google Chrome](https://www.google.com/chrome/) | A browser with developer tools. |
   | &nbsp; | [Visual Studio Code](https://code.visualstudio.com/download) | JavaScript, TypeScript, or SharePoint Framework (SPFx) build environments. Use version 1.55 or later. | JavaScript and SPFx|
   | **Optional** | &nbsp; | &nbsp; | &nbsp; |
   | &nbsp; | [Azure Tools for Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-node-azure-pack) and [Azure CLI](/cli/azure/install-azure-cli) | Azure tools to access stored data or to deploy a cloud-based backend for your Teams app in Azure. | JavaScript|
   | &nbsp; | [React Developer Tools for Chrome](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi) OR [React Developer Tools for Microsoft&nbsp;Edge](https://microsoftedge.microsoft.com/addons/detail/react-developer-tools/gpphkfbcpidddadnkolkpfckpihlkkil) | A browser DevTools extension for the open-source React JavaScript library. | JavaScript|
   | &nbsp; | [Microsoft Graph Explorer](https://developer.microsoft.com/graph/graph-explorer) | Microsoft Graph Explorer, a browser-based tool that lets you run a query from Microsoft Graph data. | JavaScript and SPFx|
   | &nbsp; | [Developer Portal for Teams](https://dev.teams.microsoft.com/) | Web-based portal to configure, manage, and distribute your Teams app including to your organization or the Teams store.| JavaScript and SPFx|

   > [!TIP]
   > If you work with Microsoft Graph data, you should learn about and bookmark the Microsoft Graph Explorer. This browser-based tool allows you to query Microsoft Graph outside of an app.

## Accounts to build your Teams app

To create and upload a Teams app, you need to create the following accounts:

| Accounts | For using|
| --- | --- |
|[Microsoft 365 account with valid subscription](accounts.md#microsoft-365-account)|Teams developer account while developing an app.|
|[Azure account](accounts.md#azure-account-to-host-backend-resources)|Backend resources on Azure.|

### Microsoft 365 account

To create a Microsoft 365 account, sign-up for a Microsoft 365 developer program subscription. The subscription is free for 90 days and continues to renew as long as you're using it for development activity.

If you have a Visual Studio Enterprise or Professional subscription, both programs include free Microsoft 365 [developer subscription](https://aka.ms/MyVisualStudioBenefits). It's active as long as your Visual Studio subscription is active. For more information, see [Microsoft 365 developer subscription](https://developer.microsoft.com/microsoft-365/dev-program).

#### Microsoft 365 developer program

You can sign up for the developer program by using one of the following account types:

* **Microsoft account for personal use**

:::row:::

   :::column span="3":::

      The account provides access to Microsoft products and cloud services, such as Outlook, Messenger, OneDrive, MSN, Xbox Live, or Microsoft 365. You can sign-up for an Outlook.com mailbox to create a Microsoft account, which can be used to access consumer-related Microsoft cloud services or Azure.

   :::column-end:::
   :::column span="1":::
      :::image type="content" source="../assets/images/teams-toolkit-v2/teams toolkit fundamentals/personal-account-icon.png" alt-text="personal account.":::
   :::column-end:::

:::row-end:::

* **Microsoft work account for business**

:::row:::

   :::column span="3":::

      The account provides access to all small, medium, and enterprise business-level Microsoft cloud services, such as Azure, Microsoft Intune, or Microsoft 365. When you sign-up to one of these services as an organization, a cloud-based directory is automatically provisioned in Azure AD to represent your organization.

   :::column-end:::
   :::column span="1":::
      :::image type="content" source="../assets/images/teams-toolkit-v2/teams toolkit fundamentals/work-account-icon.png" alt-text="work account.":::
   :::column-end:::

:::row-end:::

To get a free Teams developer account, join the Microsoft 365 developer program and follow the steps:

1. Go to the [Microsoft 365 developer program](https://developer.microsoft.com/microsoft-365/dev-program).
2. Select **Join Now**.
3. Select **Set up E5 subscription**.
4. Set up your administrator account.

   You can see the following image after the completion of the subscription:

    :::image type="content" source="./images/m365-developer-program.png" alt-text="Diagram that shows Microsoft 365 program":::

### Azure account

Teams Toolkit requires Azure account to host a Teams app to Azure or to host backend resources for your Teams app, if you already have an existing app on a different cloud provider other than Azure and you want to integrate the existing app on Teams platform, you must have an Azure subscription. [Create a free account](https://azure.microsoft.com/free/) before you begin. Alternatively you can select Azure subscription to host your backend resources using another cloud provider, or on your own servers if they're available from the public domain.

## Sideloading permission

After creating the app, you must load your app in Teams without distributing to test it in the Teams environment. This process is known as **sideloading**. Sign-in to your Microsoft 365 account to view this option.

You can verify if the sideloading permission is enabled using either Visual Studio Code or Teams client.

<br>
<details>
<summary><b>Verify sideloading permission using Visual Studio Code</b></summary>

1. Open **Visual Studio Code**.
2. Select **Teams Toolkit** from the left panel. If you're unable to see the option ensure that you have installed Teams Toolkit extension.
3. Select **Accounts** and log-in to your Microsoft 365 account.
4. Check whether you can view the option **Sideloading enabled** as shown in the following image:

    :::image type="content" source="../assets/images/teams-toolkit-v2/sideloading.png" alt-text="Enable sideloading":::

</details>

<details>
<summary><b>Verify sideloading permission using Teams client</b></summary>

1. Open **Microsoft Teams**.
2. Select **Apps** in left panel.
3. Select **Publish an app**.

    :::image type="content" source="../assets/images/teams-toolkit-v2/publish2.png" alt-text="Publish an app":::

4. Check whether you can see the option **Upload a custom app** as shown in the following image:

    :::image type="content" source="../assets/images/teams-toolkit-v2/upload2.png" alt-text="Upload a custom app":::

If you're unable to view the option **Upload a custom app,** then it indicates that you don't have the required permission for sideloading.

* For a tenant admin, enable the sideloading setting for your tenant or organization in the Teams admin center.
* If you aren't a tenant admin, you'll need to contact your tenant admin to enable sideloading.

</details>

### Enable sideloading using admin center

If your developer tenant doesn't have permission to upload custom app or to sideload, then you need to have admin rights for your tenant to turn on custom app uploading or sideloading. In case, if you don't have admin rights, contact administrator to grant permission to upload custom app or to sideload for your tenant.

  If you have admin rights, perform the following steps to upload the custom app using admin center:

  1. Sign-in to [Microsoft 365 admin center](https://admin.microsoft.com/Adminportal/Home?source=applauncher#/homepage#/) with your admin credentials.

  2. Select **Show All** > **Teams**.

     :::image type="content" source="../assets/images/teams-toolkit-v2/5.png" alt-text="show all":::

     > [!Note]
     > It can take **up to 24 hours** for the **Teams** option to appear. You can [upload your custom app to a Teams environment](/microsoftteams/upload-custom-apps) for testing and validation.

  3. Go to **Teams apps** > **Setup policies**.

     :::image type="content" source="../assets/images/teams-toolkit-v2/3.png" alt-text="set policies":::

  4. Set toggle **Upload custom apps** to **On** position.

     :::image type="content" source="../assets/images/teams-toolkit-v2/4.png" alt-text="toggle":::

  5. Select **Save**.

     > [!Note]
     > It can take up to 24 hours for sideloading to become active. In the meantime, you can use **upload for your tenant** to test your app. To upload the .zip package file of the app, see [Upload custom apps](/microsoftteams/teams-app-setup-policies).

For more information, see [Manage custom app policies and settings in Teams](/microsoftteams/teams-custom-app-policies-and-settings) and [Manage app setup policies in Teams](/microsoftteams/teams-app-setup-policies).
</details>

## See also

TBA
