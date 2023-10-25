---
title: Prerequisites for creating your Teams app
author: zyxiaoyuer
description: In this module, learn the prerequisites required for Tools and SDK, and Teams Toolkit.
ms.author: surbhigupta
ms.localizationpriority: high
ms.topic: overview
ms.date: 03/14/2022
---
# Prerequisites for creating your Teams app using Visual Studio

Before you create your Teams app project, ensure that the prerequisites are in place. You must:

* [Install required tools to build your Teams app](#install-required-tools-to-build-your-teams-app)
* [Prepare Accounts to build your Teams app](#accounts-to-build-your-teams-app)
* [Upload permission](tools-prerequisites-v4.md)
* [Verify app upload permission](#verify-app-upload-permission)

## Basic requirements to build your Teams app

Ensure the following requirements are met before you start building your Teams app:

| &nbsp; | Basic requirements | For using| For environment type|
   | --- | --- | --- |
   | **Required** | &nbsp; | &nbsp; | &nbsp; |
   | &nbsp; | Teams Toolkit| A Microsoft Visual Studio Code extension that creates a project scaffolding for your app. Use the latest version. | JavaScript and SharePoint Framework (SPFx)|
   | &nbsp; | [Microsoft Teams](https://www.microsoft.com/microsoft-teams/download-app) | Collaborate with everyone you work with through apps for chat, meetings, and call - all in one place.| JavaScript and SPFx|
   | &nbsp; | [Microsoft&nbsp;Edge](https://www.microsoft.com/edge) (recommended) or [Google Chrome](https://www.google.com/chrome/) | A browser with developer tools. | JavaScript and SPFx|
   | **Optional** | &nbsp; | &nbsp; | &nbsp; |
   | &nbsp; | [Azure Tools for Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-node-azure-pack) and [Azure CLI](/cli/azure/install-azure-cli) | Access stored data or deploy a cloud-based back-end for your Teams app in Azure. | JavaScript|
   | &nbsp; | [React Developer Tools for Chrome](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi) or [React Developer Tools for Microsoft&nbsp;Edge](https://microsoftedge.microsoft.com/addons/detail/react-developer-tools/gpphkfbcpidddadnkolkpfckpihlkkil) | A browser DevTools extension for the open-source React JavaScript library. | JavaScript|
   | &nbsp; | [Microsoft Graph Explorer](https://developer.microsoft.com/graph/graph-explorer) | A browser-based tool that lets you run a query from Microsoft Graph data. | JavaScript and SPFx|
   | &nbsp; | [Developer Portal for Teams](https://dev.teams.microsoft.com/) | A web-based portal to configure, manage, and distribute your Teams app including to your organization or the Microsoft Teams Store.| JavaScript and SPFx|

## Install required tools to build your Teams app

Ensure that the following tools are installed on the device where you’ll create your app project before you start building your Teams app:

| &nbsp; | Tools | For using | For environment type |
   | --- | --- | --- |
   | **Required** | &nbsp; | &nbsp; |
   | [Microsoft Visual Studio 2022](https://visualstudio.microsoft.com/downloads/) | Use the latest version, *ASP.NET and web development* workload, and *Microsoft Teams development tools* option. | C# or Blazor. |
   | [Teams Toolkit](https://marketplace.visualstudio.com/items?itemName=TeamsDevApp.ms-teams-vscode-extension) | The Microsoft Visual Studio Code extension to create a Teams app project. Use the latest version. | JavaScript, TypeScript, and SPFx. |
   | [Microsoft Teams](https://www.microsoft.com/microsoft-teams/download-app) | App upload feature to test your app behavior within your local Teams environment.| JavaScript, TypeScript, SPFx, and C# or Blazor. |
   | [Microsoft&nbsp;Edge](https://www.microsoft.com/edge) (recommended) or [Google Chrome](https://www.google.com/chrome/) | A browser with developer tools. | JavaScript, TypeScript, SPFx, and C# or Blazor. |
   | **Optional** | &nbsp; | &nbsp; |
   | [Azure Tools for Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-node-azure-pack) and [Azure CLI](/cli/azure/install-azure-cli) | Stored data or deploy a cloud-based back-end for your Teams app in Azure. | JavaScript and TypeScript. |
   | [React Developer Tools for Chrome](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi) or [React Developer Tools for Microsoft&nbsp;Edge](https://microsoftedge.microsoft.com/addons/detail/react-developer-tools/gpphkfbcpidddadnkolkpfckpihlkkil) | The browser based DevTools extension for the open-source React JavaScript library. | JavaScript, TypeScript, and SPFx. |
   | [Microsoft Graph Explorer](https://developer.microsoft.com/graph/graph-explorer) | The browser-based tool that lets you run a query from Microsoft Graph data. | JavaScript, TypeScript, SPFx, and C# or Blazor. |
   | [Developer Portal for Teams](https://dev.teams.microsoft.com/) | The web-based portal to configure, manage, and distribute your Teams app including to your organization or the Teams Store.| JavaScript, TypeScript, SPFx, and C# or Blazor. |

It's recommended that you bookmark the Microsoft Graph Explorer to learn about Microsoft Graph services. This browser-based tool allows you to run a query and access the Microsoft Graph API.

## Accounts to build your Teams app

Ensure that you have the following accounts before you start building your Teams app:

| Accounts | For using| For environment type|
| --- | --- | ---|
|[Microsoft 365 account with a valid subscription](#microsoft-365-developer-program)|Teams developer account while developing an app.| JavaScript, TypeScript, SPFx, and C# or Blazor. |
|[Azure account](#azure-account)|Back-end resources on Azure.| JavaScript, TypeScript, SPFx, and C# or Blazor. |

### Microsoft 365 developer program

> [!NOTE]
> To build Teams apps, you must have a work or school [Microsoft 365 account](#microsoft-365-developer-program). Microsoft 365 personal account can't be used.

If you don't have any, to create a developer account, sign up for a Microsoft 365 developer program subscription. The subscription is free for 90 days and continues to renew as long as you're using it for development activity.

If you have a Visual Studio Enterprise or Professional subscription, both programs include a free Microsoft 365 [developer subscription](https://aka.ms/MyVisualStudioBenefits). It's active as long as your Visual Studio subscription is active. For more information, see [Microsoft 365 developer subscription](https://developer.microsoft.com/microsoft-365/dev-program).

You can sign up for the developer program using one of the following account types:

* **Microsoft account for personal use**

  :::row:::

    :::column span="3":::

       The Microsoft account provides access to the Microsoft products and cloud services, such as Outlook, Messenger, OneDrive, MSN, Xbox Live, or Microsoft 365. 

       Sign up for an Outlook.com mailbox to create a Microsoft 365 account. Use it to access consumer-related Microsoft cloud services or Azure.

    :::column-end:::
    :::column span="1":::
             :::image type="content" source="images/personal-account-icon-v4.png" alt-text="personal account.":::
   :::column-end:::

  :::row-end:::

* **Microsoft work account for business**

  :::row:::

    :::column span="3":::

       This account provides access to all small, medium, and enterprise business-level Microsoft cloud services. The services include Azure, Microsoft Intune, and Microsoft 365. 

       When you sign up to one of these services as an organization, a cloud-based directory is automatically provisioned in Microsoft Azure Active Directory (Azure AD) to represent your organization.

    :::column-end:::
    :::column span="1":::
             :::image type="content" source="images/work-account-icon-v4.png" alt-text="work account."::::::
    :::column-end:::

  :::row-end:::

#### Create a free Microsoft 365 developer account

To create a free Microsoft 365 developer account:

1. Go to the [Microsoft 365 developer program](https://developer.microsoft.com/microsoft-365/dev-program).
1. Select **Join Now**.
1. Set up your administrator account subscription.

   After the completion of the subscription, the following information appears:

    :::image type="content" source="images/m365-account_1-v4.png" alt-text="M365 Account":::

### Azure account

An Azure account allows you to host a Teams app or the back-end resources for your Teams app to Azure. You can do this using Teams Toolkit in Visual Studio Code. You must have an Azure subscription in the following scenarios:

* If you already have an existing app on a different cloud provider other than Azure, and you want to integrate the app on Teams platform.
* If you want to host the back-end resources for your app using another cloud provider, or on your own servers if they're available in the public domain.

> [!NOTE]
> You can use Azure account to provision Azure resource to host your Teams app. You can [create a free account](https://azure.microsoft.com/free/) in case you don't have any. If you don't use Teams Toolkit to provision and deploy, Azure account isn't required.

## Verify app upload permission

After creating the app, you must load your app in Teams without distributing it. This process is known as app upload. Sign in to your Microsoft 365 account to view this option.

You can verify if the app upload permission is enabled using either Visual Studio Code or Teams client.

<br>
<details>
<summary><b>Verify app upload permission using Visual Studio Code</b></summary>

You can use this method to verify app upload permission only after you have created an app project using Teams Toolkit. If you haven't created an app project, you can verify app upload permission using Teams client.

1. Open **Visual Studio Code**.
1. Select **Teams Toolkit** from the Visual Studio Code activity bar.

   > [!NOTE]
   > If you're unable to see the option, see [install Teams Toolkit](../install-Teams-Toolkit.md) to install Teams Toolkit extension in Visual Studio Code.

1. Create a new Teams Toolkit app project or open an existing app project.

1. Select **Sign in to Microsoft 365** under **ACCOUNTS**.

    :::image type="content" source="images/accounts1-v4.png" alt-text="accounts details":::

1. Verify if you can see the option **Sideloading enabled** as shown in the following image:

    :::image type="content" source="images/sideloading_1-v4.png" alt-text="Enable sideloading":::

</details>
<br>
<details>
<summary><b>Verify app upload permission using Teams client</b></summary>

1. In the Teams client, select **Apps** > **Manage your apps** > **Upload an app**.

    :::image type="content" source="images/upload-app_1-v4.png" alt-text="Screenshot showing the selection of upload an app highlighted in red.":::

1. Check if you can see the option **Upload a custom app** as you can see in the following image:

    :::image type="content" source="images/upload-custom-app1_1-v4.png" alt-text="Screenshot showing the selection of Upload a custom app.":::

</details>

### Enable app upload using admin center

If app upload option isn’t visible in Teams Toolkit extension in Visual Studio Code or if the option to upload a custom app isn’t available in Teams, it indicates that you don't have the required permission for app upload.

You must enable app upload for your app in Teams:

* If you're a tenant admin, enable the app upload setting for your tenant or organization in the Teams admin center.
* If you aren't a tenant admin, contact your tenant admin to enable app upload.

If you have admin rights, you can enable app upload:

  1. Sign in to [Microsoft 365 admin center](https://admin.microsoft.com/Adminportal/Home?source=applauncher#/homepage#/) with your admin credentials.

  1. Select the :::image type="icon" source="images/showall icon-v4.png" border="false":::icon > **Teams**.

       :::image type="content" source="images/m365-admin-center_1-v4.png" alt-text="Microsoft 365 Admin center":::

     > [!Note]
     > It can take up to 24 hours for the Teams option to appear. You can [upload your custom app to a Teams environment](/microsoftteams/upload-custom-apps) for testing and validation.

  1. Sign in to Microsoft Teams admin center with your admin credentials.
  1. Select the :::image type="icon" source="images/showall icon-v4.png" border="false"::: icon > **Teams apps** > **Setup policies**.

     :::image type="content" source="images/m365-admin-center1_1-v4.png" alt-text="Microsoft 365 Admin center1":::

  1. Select **Global (Org-wide default)**.

     :::image type="content" source="images/select-manage-policies_1-v4.png" alt-text="Select Manage Policies":::

  1. Set toggle **Upload custom apps** to **On** position.

     :::image type="content" source="images/Upload-custom-apps_1-v4.png" alt-text="Upload Custom Apps":::

  5. Select **Save**.

     > [!Note]
     > It can take up to 24 hours for app upload to become active. In the meantime, you can use **upload for your tenant** to test your app. To upload the .zip package file of the app, see [upload custom apps](/microsoftteams/teams-app-setup-policies).

     Ensure that you have the app upload permission using the steps mentioned in [verify app upload permission using Visual Studio Code or Teams client](#verify-app-upload-permission).

</details>

## See also

* [Teams Toolkit Visual Studio Overview](teams-toolkit-fundamentals-vs.md)
* [Manage custom app policies and settings in Teams](/microsoftteams/teams-custom-app-policies-and-settings)
* [Manage app setup policies in Teams](/microsoftteams/teams-app-setup-policies)
* [Provision cloud resources in Visual Studio](provision-vs.md)
* [Deploy Teams app to the cloud VS](deploy-vs.md)
