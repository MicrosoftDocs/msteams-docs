---
title: Deploy your first Teams app with SPFx
author: zhenyasav
description: Learn how to deploy a custom tab with the SharePoint Framework
ms.author: zhenyasa
ms.date: 05/19/2021
ms.topic: quickstart
ms.localizationpriority: none
---

# Deploy your first Teams app with SPFx

You've learned to create, build, and run Teams app with Tab capability. The final step is to deploy your app on Azure.

Let's deploy the first Hello World app with Tab capability on Azure using Teams Toolkit.

:::image type="content" source="../assets/images/get-started/app-roadmap/roadmap-p4.png" alt-text="Image showing phase 4 of building an app." border="false":::

In this page, you'll learn to:
- [Deploy your first app](#deploy-your-app-to-sharepoint)
- [Upload the app package to SharePoint](#upload-the-app-package-to-sharepoint)

## Deploy your app to SharePoint

Ensure a SharePoint App Catalog exists in your deployment. If it doesn't exist, [create one](/sharepoint/use-app-catalog).  It may take up to 15 minutes for the app catalog to be created.

# [Visual Studio Code](#tab/vscode)

1. Open Visual Studio Code.
1. Select the Teams Toolkit from the sidebar by selecting the Teams icon.
1. Select **Provision in the Cloud**.

   :::image type="content" source="../assets/images/teams-toolkit-v2/provisioning-commands.png" alt-text="Screenshot showing the provisioning commands":::

   The Toolkit updates the progress in the bottom-right corner. After a few seconds, you'll see the following notice:

   :::image type="content" source="../assets/images/teams-toolkit-v2/provision-complete.png" alt-text="Screenshot showing the provisioning complete dialog.":::

1. After provisioning is complete, select **Deploy to the cloud**.

    The Toolkit doesn't deploy the app automatically.

1. Select **Build SharePoint Package**, when you're prompted to build and deploy manually, and select **Build SharePoint Package**.

   :::image type="content" source="../assets/images/teams-toolkit-v2/build-sharepoint-package.png" alt-text="Screenshot for the Build Sharepoint Package dialog":::

# [Command line](#tab/cli)

In your terminal window:

1. Run `teamsfx provision`.

   ``` bash
   teamsfx provision
   ```

   If you're prompted to log into your Azure subscription, select a subscription to use the Azure resources.

   > [!NOTE]
   > There are always some Azure resources used for hosting your app.

1. Run `teamsfx deploy`.

   ``` bash
   teamsfx deploy
   ```

1. When prompted, select **Build SharePoint Package**.

---

## Upload the app package to SharePoint

The SharePoint package is located in `SPFx/sharepoint/solution` within your project. Upload the package to SharePoint:

1. Log into Microsoft 365 Admin Console.
1. Open the SharePoint App Catalog.

   1. Open `https://admin.microsoft.com/AdminPortal/Home`.
   1. Under **Admin centers**, select the **SharePoint** admin center.
   1. Select **More features** from the sidebar menu.
   1. Press **Open** under **Apps**.
   1. Select **App Catalog**.
   1. Select the option to automatically create catalog site, and select **OK**.

1. Select **Distribute apps for SharePoint**.

    :::image type="content" source="../assets/images/teams-toolkit-v2/spfx-distribute-apps.png" alt-text="Distribute apps for SharePoint.":::

1. Select **Upload**.

1. Select **Choose File**.

1. Find your `{project}.sppkg` file in the `SPFx/sharepoint/solution` folder in your project. Select **Open**.

1. Select **OK**.

You'll be prompted to choose if you trust the Hello World solution.

   :::image type="content" source="../assets/images/teams-toolkit-v2/spfx-upload-trust-msg-box.png" alt-text="Trust message for deploy.":::

1. Verify that **Make this solution available to all sites in the organization** is selected, and select **Deploy**.

1. Select the **FILES** tab.

    :::image type="content" source="../assets/images/teams-toolkit-v2/spfx-appcatalog-filestab.png" alt-text="Select the files tab in the SharePoint App Catalog.":::

1. Select the package you deployed, then select **Sync to Teams**.

    > [!Note]
    > The Sync to Teams process can take a couple of minutes. You will see a message on the right side of the browser indicating that the app has successfully synchronized to Teams.

1. Open the Teams application (or sign in at `https://teams.microsoft.com`).
1. Select the triple-dot on the sidebar, then select **All apps**.  
   
    The app will be placed in the **Apps built for your org** category. You can add the app from there.

   :::image type="content" source="../assets/images/teams-toolkit-v2/spfx-app-in-teams.png" alt-text="Screenshot showing the app within Teams":::

| &nbsp; | &nbsp; |
|:--- | ---:|
| **Back** : [3. Build your first Teams SPFx app](build-spfx-app.md) | [Overview](code-samples.md) : **Next**|
|