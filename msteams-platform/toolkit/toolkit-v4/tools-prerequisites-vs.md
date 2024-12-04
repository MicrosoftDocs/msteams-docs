---
title: Prerequisites to Create Teams App in VS
author: zyxiaoyuer
description: Learn about the tools required to build a Teams app in Visual Studio, prepare accounts, and verify and enable custom app upload in admin center.
ms.author: surbhigupta
ms.localizationpriority: high
ms.topic: overview
ms.date: 02/21/2024
---
# Prerequisites for creating your Teams app using Visual Studio

Before you create your Microsoft Teams app project, ensure that the prerequisites are in place. You must:

* [Install required tools to build your Teams app](#install-required-tools-to-build-your-teams-app)
* [Prepare Accounts to build your Teams app](#accounts-to-build-your-teams-app)
* [Verify custom app upload permission](#verify-custom-app-upload-permission)

## Install required tools to build your Teams app

Ensure that the following tools are installed on the device where you’ll create your app project before you start building your Teams app:

| &nbsp; | Tools | Purpose | For environment type |
| --- | --- | --- | --- |
| **Required** | &nbsp; | &nbsp; | &nbsp; |
| &nbsp; | Teams Toolkit| A Microsoft Visual Studio extension that creates a project scaffolding for your app. Use the latest version. | C# and Blazor |
| &nbsp; | [Microsoft Teams](https://www.microsoft.com/microsoft-teams/download-app) | Collaborate with everyone you work with through apps for chat, meetings, and call - all in one place.| C# and Blazor |
| &nbsp; | [Microsoft&nbsp;Edge](https://www.microsoft.com/edge) (recommended) or [Google Chrome](https://www.google.com/chrome/) | A browser with developer tools. | C# and Blazor |
| **Optional** | &nbsp; | &nbsp; | &nbsp; |
| &nbsp; | [Azure development workload for Visual Studio](/dotnet/azure/configure-visual-studio) and [Azure CLI](/cli/azure/install-azure-cli) | Access stored data or deploy a cloud-based back-end for your Teams app in Azure. | C# and Blazor |
| &nbsp; | [Microsoft Graph Explorer](https://developer.microsoft.com/graph/graph-explorer) | A browser-based tool that lets you run a query from Microsoft Graph data. |  C# and Blazor |
| &nbsp; | [Developer Portal for Teams](https://dev.teams.microsoft.com/) | A web-based portal to configure, manage, and distribute your Teams app including to your organization or the Microsoft Teams Store.| C# and Blazor |

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

If you have a Visual Studio Enterprise or Professional subscription, both programs include a free Microsoft 365 [developer subscription](https://aka.ms/MyVisualStudioBenefits). It's active as long as your Visual Studio subscription is active. For more information, see [Microsoft 365 developer subscription](https://developer.microsoft.com/microsoft-365/dev-program).

If you don't have any Microsoft 365 tenant, you might qualify for a Microsoft 365 E5 developer subscription through the [Microsoft 365 Developer Program](https://aka.ms/m365devprogram); for details, see the [FAQ](/office/developer-program/microsoft-365-developer-program-faq#who-qualifies-for-a-microsoft-365-e5-developer-subscription-). Alternatively, you can sign up for a [1-month free trial](https://www.microsoft.com/microsoft-365/try) or [purchase a Microsoft 365 plan](https://www.microsoft.com/microsoft-365/business/compare-all-microsoft-365-business-products-g).

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

       When you sign up to one of these services as an organization, a cloud-based directory is automatically provisioned in Microsoft Entra ID to represent your organization.

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

An Azure account allows you to host a Teams app or the back-end resources for your Teams app to Azure. You can do this using Teams Toolkit in Visual Studio. You must have an Azure subscription in the following scenarios:

* If you already have an existing app on a different cloud provider other than Azure, and you want to integrate the app on Teams platform.
* If you want to host the back-end resources for your app using another cloud provider, or on your own servers if they're available in the public domain.

> [!NOTE]
> You can use Azure account to provision Azure resource to host your Teams app. You can [create a free account](https://azure.microsoft.com/free/) in case you don't have any. If you don't use Teams Toolkit to provision and deploy, Azure account isn't required.

## Verify custom app upload permission

After creating the app, you must load your app in Teams without distributing it. This process is known as custom app upload. Sign in to your Microsoft 365 account to view this option.

You can verify if the custom app upload permission is enabled using Teams client.

<details>
<summary><b>Verify custom app upload permission using Teams client</b></summary>

1. In the Teams client, select **Apps** > **Manage your apps** > **Upload an app**.

    :::image type="content" source="../../assets/images/teams-toolkit-v2/teams-toolkit-vs/upload-app.png" alt-text="Screenshot shows the option to select upload an app in Teams manage your apps.":::

1. Check if you can see the option **Upload a custom app** as you can see in the following image:

    :::image type="content" source="../../assets/images/teams-toolkit-v2/teams-toolkit-vs/upload-custom-app.png" alt-text="Screenshot shows the option to select upload a custom apps.":::

</details>

### Enable custom app upload using admin center

If custom app upload option isn’t visible in Teams Toolkit extension in Visual Studio Code or if the option to upload a custom app isn’t available in Teams, it indicates that you don't have the required permission for custom app upload.

You must enable custom app upload for your app in Teams:

* If you're a Teams Administrator, enable the custom app upload setting for your tenant or organization in the Teams admin center.
* If you aren't a Teams Administrator, contact your admin to enable custom app upload.

If you have admin rights, you can enable custom app upload:

  1. Sign in to [Microsoft 365 admin center](https://admin.microsoft.com/Adminportal/Home?source=applauncher#/homepage#/) with your admin credentials.

  1. Select the :::image type="icon" source="images/showall icon-v4.png" border="false":::icon > **Teams**.

       :::image type="content" source="../../assets/images/teams-toolkit-v2/teams-toolkit-vs/m365-admin-center.png" alt-text="Screenshot shows the option to select Teams under Admin centers.":::

     > [!Note]
     > It can take up to 24 hours for the Teams option to appear. You can [upload your custom app to a Teams environment](/microsoftteams/upload-custom-apps) for testing and validation.

  1. Sign in to Microsoft Teams admin center with your admin credentials.
  1. Select the :::image type="icon" source="images/showall icon-v4.png" border="false"::: icon > **Teams apps** > **Setup policies**.

     :::image type="content" source="../../assets/images/teams-toolkit-v2/teams-toolkit-vs/m365-admin-setup-policies.png" alt-text="Screenshot shows the option to select setup policies.":::

  1. Select **Global (Org-wide default)**.

     :::image type="content" source="images/select-manage-policies_1-v4.png" alt-text="Select Manage Policies":::

  1. Turn on the **Upload custom apps** toggle.

     :::image type="content" source="images/Upload-custom-apps_1-v4.png" alt-text="Upload Custom Apps":::

  5. Select **Save**.

     > [!Note]
     > It can take up to 24 hours for custom app upload to become active. In the meantime, you can use **upload for your tenant** to test your app. To upload the .zip package file of the app, see [upload custom apps](/microsoftteams/teams-app-setup-policies).

     Ensure that you have the custom app upload permission using the steps mentioned in [verify custom app upload permission using Visual Studio Code or Teams client](#verify-custom-app-upload-permission).

</details>

## See also

* [Teams Toolkit Visual Studio Overview](teams-toolkit-fundamentals-vs.md)
* [Manage custom app policies and settings in Teams](/microsoftteams/teams-custom-app-policies-and-settings)
* [Manage app setup policies in Teams](/microsoftteams/teams-app-setup-policies)
* [Provision cloud resources in Visual Studio](provision-vs.md)
* [Deploy Teams app to the cloud VS](deploy-vs.md)
