---
title: Deploy your first Teams app with Blazor
author: adrianhall
description: Deploy a Microsoft Teams app that displays a "Hello, World!" message using the Microsoft Teams Toolkit and .NET Blazor.
ms.author: adhal
ms.date: 04/27/2021
ms.topic: quickstart
ms.localizationpriority: none
---

# Deploy your first Teams app with Blazor

You've learned to create, build, and run Teams app with Tab capability. The final step is to deploy your app on Azure.

Let's deploy the first Hello World app with Tab capability on Azure using Teams Toolkit.

:::image type="content" source="../assets/images/get-started/app-roadmap/roadmap-p4.png" alt-text="Image showing phase 4 of building an app." border="false":::

In this page, you'll learn to:
- [Deploy your first app](#deploy-your-app-to-azure)
- [Create an environment for your app](#create-an-environment-for-your-app)
- [Update the manifest file](#update-the-app-manifest)

## Deploy your app to Azure

Deployment consists of two steps:

1. Necessary cloud resources are created. This process is also known as provisioning.
1. Start coding and copy your app into the created cloud resources.

> **PREVIEW**
>
> Support for Blazor apps is new in Teams Toolkit. Provisioning and deployment are done with a combination of Visual Studio 2019 and the Developer Portal for Teams.

## Provision and deploy your app to Azure App Service

1. In Solution Explorer, right-click the project node and select **Publish**. You can also use the **Build** > **Publish** menu item.

   :::image type="content" source="../assets/images/teams-toolkit-v2/blazor-vs2019-publish1.png" alt-text="Select the Publish operation on the project":::

1. Select **Azure** and select **Next** in the **Publish** window.

   :::image type="content" source="../assets/images/teams-toolkit-v2/blazor-vs2019-publish2.png" alt-text="Select Azure as the publishing target":::

1. Select **Azure App Service (Windows)** and select **Next**.

   :::image type="content" source="../assets/images/teams-toolkit-v2/blazor-vs2019-publish3.png" alt-text="Select Azure App Service as the publishing target":::

1. Select **+** to create a new App Service instance.

   :::image type="content" source="../assets/images/teams-toolkit-v2/blazor-vs2019-publish4.png" alt-text="Create a new instance.":::

    In the **Create App Service (Windows)** dialog, the **Name**, **Subscription name**, **Resource Group**, and **Hosting Plan** entry fields are populated. If you've already got an App Service running, existing settings are selected. You can opt to create a new resource group and hosting plan.

1. Select **Create** when you're ready.

   :::image type="content" source="../assets/images/teams-toolkit-v2/blazor-vs2019-publish5.png" alt-text="Select hosting plan and subscription":::

    You'll notice that the newly created instance has been automatically selected in the **Publish** dialog.

1. Select **Finish** when you're ready.

   :::image type="content" source="../assets/images/teams-toolkit-v2/blazor-vs2019-publish6.png" alt-text="Select the new instance.":::

1. Select the **Edit** (pencil) icon next to **Deployment Mode**, and select **Self-contained**.

   :::image type="content" source="../assets/images/teams-toolkit-v2/blazor-vs2019-publish8.png" alt-text="Select self-contained deployment mode.":::

1. Select **Publish**.

   :::image type="content" source="../assets/images/teams-toolkit-v2/blazor-vs2019-publish7.png" alt-text="Publish your app to app service":::

   Visual Studio 2019 deploys the app to your Azure App Service, and the web app loads in your browser.  
1. Add `/tab` to the end of the URL to see your page.

   The project properties in the **Publish** pane of Visual Studio shows the site URL and other details. Make a note of the site URL.

## Create an environment for your app

The Developer Portal for Teams manages where the tabs for your app are loaded with an **Environment**.  

**To create an environment:**

1. Open the [Developer Portal for Teams](https://dev.teams.microsoft.com). 
1. Sign in with your Microsoft 365 administrative account.

1. Find **Apps** on the sidebar and  select it.

1. Select your app from the list that appears.

1. Select **Environments**.

   :::image type="content" source="../assets/images/teams-toolkit-v2/devcenter-environments1.png" alt-text="Select environments":::

1. Select **Create your first environment**.

1. Enter a name for your environment, and select **Add**. For example, `_Production_`.

1. Select **Create your first environment variable**.

1. Enter `azure_app_url` as the **Name**.  
1. Enter your Azure site URL without the `https://` as the **Value**. Use the URL you noted in the last step of the previous section [Provision and deploy your app to Azure App Service](#provision-and-deploy-your-app-to-azure-app-service)

    :::image type="content" source="../assets/images/teams-toolkit-v2/devcenter-environments2.png" alt-text="Create environment variable":::

1. Select **Add**.
   
    The environment is added.

## Update the app manifest

The app manifest loads the tab from a `localhost` URL. Configure the app manifest to load the tab from the URL listed in the environment you created.

To update the app manifest:
- [Update website URL](#update-website-url)
- [Configure the tab capability](#configure-the-tab-capability)
- [Configure single-sign-on for your app](#configure-single-sign-on-for-your-app)

### Update website URL

1. Select **Basic information** from the sidebar.

   :::image type="content" source="../assets/images/teams-toolkit-v2/devcenter-environments3.png" alt-text="Select basic information":::

    There are several places in the manifest that list a `localhost:XXXXX` as part of a URL.
1. Replace all occurrences  of `localhost:XXXXX` with `{{azure_app_url}}`, including the curly braces.

   :::image type="content" source="../assets/images/teams-toolkit-v2/devcenter-environments4.png" alt-text="Adjust basic information for the environment":::

1. Select **Save** when you've completed replacement.
   
    Your app is now configured to run from the URL you saved in the environment variable.

### Configure the tab capability

1. Select **Capabilities** from the sidebar.

   :::image type="content" source="../assets/images/teams-toolkit-v2/devcenter-environments5.png" alt-text="Select capabilities":::

1. Select **Personal Tab**.
1. Select the triple dots next to the **Personal Tab**, and select **Edit**.

   :::image type="content" source="../assets/images/teams-toolkit-v2/devcenter-environments6.png" alt-text="Edit personal tab settings":::

1. Replace the URL with the environment variable in the **Content Url** and **Website Url** fields.

   :::image type="content" source="../assets/images/teams-toolkit-v2/devcenter-environments7.png" alt-text="Edit personal tab URLs":::

1. Select **Update**.

1. Select **Save**.
   
   Your tab is configured to run from the Azure URL.

### Configure single-sign-on for your app

1. Select **Single Sign-On** from the sidebar.

1. Replace the `localhost` within the **Application ID URI** with `{{azure_app_url}}`.

   :::image type="content" source="../assets/images/teams-toolkit-v2/devcenter-environments8.png" alt-text="Edit single sign-on Application ID URI":::

1. Select **Save**.

1. From the sidebar, select **Domains**.

1. Select **Add a domain**.

1. Verify if `{{azure_app_url}}` is listed as a valid domain. If it isn't, add it as a valid domain. Then, select **Add**.

   :::image type="content" source="../assets/images/teams-toolkit-v2/devcenter-environments9.png" alt-text="Add a domain":::

   You've now updated the manifest file. You can use the **Preview in Teams** option at the top of the page to launch your app in Teams.

| **<<** | **>>** |
|:--- | ---:|
| **Back** : [3. Build your first Teams app](build-blazor-teams-app.md) | [Back to Overview](code-samples.md) : **Next**|
|

## See also

* [Tutorials Overview](code-samples.md)
* [Code Samples](https://github.com/OfficeDev/Microsoft-Teams-Samples)