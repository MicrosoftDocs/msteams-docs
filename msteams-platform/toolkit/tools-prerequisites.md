---
title: Prerequisites for Teams Toolkit 
author: zyxiaoyuer
description: In this module, learn the prerequisites required for Tools and SDK
ms.author: surbhigupta
ms.localizationpriority: high
ms.topic: overview
ms.date: 03/14/2022
---
# Prerequisites for Teams Toolkit

Ensure that you have the following prerequisites while building your Teams app using Teams Toolkit in Visual Studio Code:

## Tools

To create Teams app, you'll need the following tools:

| &nbsp; | Tools | For using|
   | --- | --- | --- |
   | **Required** | &nbsp; | &nbsp; |
   | &nbsp; | Teams Toolkit| A Microsoft Visual Studio Code extension that creates a project scaffolding for your app. Use 4.0.0 version. |
   | &nbsp; | [Microsoft Teams](https://www.microsoft.com/microsoft-teams/download-app) | Microsoft Teams to collaborate with everyone you work with through apps for chat, meetings, call - all in one place.|
   | &nbsp; | [Node.js](https://nodejs.org/en/download/) | Back-end JavaScript runtime environment. Use the latest v16 LTS release.|
   | &nbsp; |NPM | Install and manage packages for use in both Node.js and ASP.NET Core applications.|
   | &nbsp; | [Microsoft&nbsp;Edge](https://www.microsoft.com/edge) (recommended) or [Google Chrome](https://www.google.com/chrome/) | A browser with developer tools. |
   | &nbsp; | [Visual Studio Code](https://code.visualstudio.com/download) | JavaScript, TypeScript, or SharePoint Framework (SPFx) build environments. Use version 1.55 or later. |
   | &nbsp; | [Visual Studio version 17.2.0 preview 2.1](https://visualstudio.microsoft.com/thank-you-downloading-visual-studio/?sku=enterprise&ch=pre&rel=17)|  Select Visual Studio Enterprise 2022 Preview (version 17.2.0 preview 2.1). |
   | **Optional** | &nbsp; | &nbsp; |
   | &nbsp; | [Azure Tools for Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-node-azure-pack) and [Azure CLI](/cli/azure/install-azure-cli) | Azure tools to access stored data or to deploy a cloud-based backend for your Teams app in Azure. |
   | &nbsp; | [React Developer Tools for Chrome](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi) OR [React Developer Tools for Microsoft&nbsp;Edge](https://microsoftedge.microsoft.com/addons/detail/react-developer-tools/gpphkfbcpidddadnkolkpfckpihlkkil) | A browser DevTools extension for the open-source React JavaScript library. |
   | &nbsp; | [Microsoft Graph Explorer](https://developer.microsoft.com/graph/graph-explorer) | Microsoft Graph Explorer, a browser-based tool that lets you run a query from Microsoft Graph data. |
   | &nbsp; | [Developer Portal for Teams](https://dev.teams.microsoft.com/) | Web-based portal to configure, manage, and distribute your Teams app including to your organization or the Teams store.|

   > [!TIP]
   > If you work with Microsoft Graph data, you should learn about and bookmark the Microsoft Graph Explorer. This browser-based tool allows you to query Microsoft Graph outside of an app.

## Accounts

To create and upload a Teams app, you need to prepare the following accounts:

| Accounts | For using|
| --- | --- |
|[Microsoft 365 account with valid subscription](accounts.md#microsoft-365-account)|Teams developer account while developing an app.|
|[Azure account](accounts.md#azure-account-to-host-backend-resources)|Backend resources on Azure.|

### Microsoft 365 account

To create a Microsoft 365 account, sign-up for a Microsoft 365 developer program subscription. The subscription is free for 90 days and continues to renew as long as you're using it for development activity.

If you have a Visual Studio Enterprise or Professional subscription, both programs include free Microsoft 365 [developer subscription](https://aka.ms/MyVisualStudioBenefits). It's active as long as your Visual Studio subscription is active. For more information, see [Microsoft 365 developer subscription](https://developer.microsoft.com/microsoft-365/dev-program).

#### Microsoft 365 developer program

To get a free Teams developer account, join the Microsoft 365 developer program and follow the steps:

1. Go to the [Microsoft 365 developer program](https://developer.microsoft.com/microsoft-365/dev-program).
2. Select **Join Now**.
3. Select **Set up E5 subscription**.
4. Set up your administrator account.

   You can see the following image after the completion of the subscription:

    :::image type="content" source="./images/m365-developer-program.png" alt-text="Diagram that shows Microsoft 365 program":::

#### Microsoft 365 developer account types

You can sign-up for the developer program by using one of the following account types:

* **Microsoft account for personal use**

    The account provides access to Microsoft products and cloud services, such as Outlook, Messenger, OneDrive, MSN, Xbox Live, or Microsoft 365. You can sign-up for an Outlook.com mailbox to create a Microsoft account, which can be used to access consumer-related Microsoft cloud services or Azure.

* **Microsoft work account for business**

     The account provides access to all small, medium, and enterprise business-level Microsoft cloud services, such as Azure, Microsoft Intune, or Microsoft 365. When you sign-up to one of these services as an organization, a cloud-based directory is automatically provisioned in Azure AD to represent your organization.

* **Visual Studio user ID**

    The user ID for Visual Studio Professional or Enterprise subscription can be used to join the developer program within the Visual Studio Gallery to avail full benefits as a Visual Studio subscriber.

### Azure account to host backend resources

Azure account is optional, if your existing application is hosted on other cloud provider and you want to integrate the existing application on Teams platform, you must have an Azure subscription. [Create a free account](https://azure.microsoft.com/free/) before you begin.

**Visual Studio ID**

If you want to host your application related resources or access resources within Azure, you can [create a free account](https://azure.microsoft.com/free/) before you begin. Alternatively you can select to host your backend resources using another cloud provider, or on your own servers if they're available from the public domain.

## Sideloading

After creating the app, you must load your app in Teams without distributing it. This process is known as **sideloading**. Sign-in to your Microsoft 365 account to view this option.

You can verify if the sideloading permission is enabled using either Visual Studio Code or Teams client.
<br>
<details>
<summary><b>Verify sideloading permission using Visual Studio Code</b></summary>

    1. Open **Visual Studio Code**.
    2. Select **Teams Toolkit** from the left panel. If you're unable to see the option ensure that you have installed Teams Toolkit extension.
    3. Select **Accounts** and log in to your Microsoft 365 account.
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

        If you are unable to view the option **Upload a custom app,** then it indicates that you don't have the required permission for sideloading.

        * For a tenant admin, enable the sideloading setting for your tenant or organization in the Teams admin center.
        * If you aren't a tenant admin, you'll need to contact your tenant admin to enable sideloading.
</details>

<details>
<summary><b>Upload custom app using admin center</b></summary>

  > [!IMPORTANT]
  > To turn on custom app uploading or sideloading for your developer tenant, you must be the admin for your tenant.

  Perform the following steps to upload the custom app:

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
