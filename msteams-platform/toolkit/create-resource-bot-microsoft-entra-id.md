---
title: Create bot resource in Microsoft Entra ID
author: surbhigupta
description: Create an Azure bot resource in Microsoft Entra ID to add your bot app to Teams
ms.topic: how-to
ms.author: surbhigupta
ms.localizationpriority: medium
---
# Create a bot resource in Microsoft Entra ID

For your Teams bot app to access resources available in Microsoft Entra ID, you'll need to create a bot resource with Microsoft Entra ID. The following process registers your bot app with Azure AI Bot Service and enables the app to connect to Teams channels.

## Prerequisites

- An Azure account with an active subscription. If you don't already have one, [create an account for free](https://portal.azure.com).

In this section, you'll:

- [Create a bot resource in Microsoft Entra ID](#create-a-bot-resource-in-microsoft-entra-id)
  - [Prerequisites](#prerequisites)
  - [Create and deploy bot resource in Microsoft Entra ID](#create-and-deploy-bot-resource-in-microsoft-entra-id)
    - [To create and deploy bot resource](#to-create-and-deploy-bot-resource)
    - [Create client secret](#create-client-secret)
      - [To create client secret for the bot](#to-create-client-secret-for-the-bot)
    - [Enable bot for Teams](#enable-bot-for-teams)
      - [To enable bot app for Teams](#to-enable-bot-app-for-teams)
  - [See also](#see-also)

## Create and deploy bot resource in Microsoft Entra ID

You can create a bot resource in Microsoft Entra ID for a single or multitenant app.

### To create and deploy bot resource

1. Open the [Azure portal](https://ms.portal.azure.com/) on your web browser.

1. Select the **Create a resource** icon.

    :::image type="content" source="../assets/images/meetings-side-panel/create-resource-azure-portal.png" alt-text="Screenshot shows the option to create a resource in Azure portal.":::

    The **Create a resource** page appears.

2. Type **Azure bot** in the search box, and select the Azure bot from the options that appear.

    :::image type="content" source="../assets/images/authentication/select-azure-bot-marketplace.png" alt-text="Screenshot shows the Azure bot in the Azure Marketplace.":::

    When the **Azure Bot** page appears, ensure the selected plan is **Azure Bot**.

3. Select **Create**.

    :::image type="content" source="../assets/images/authentication/azure-bot-create.png" alt-text="Screenshot shows the Azure bot plan selected in the Azure bot creation screen.":::

    The **Create an Azure Bot** page appears.

4. Under **Project details**, enter the following details:

    1. Enter a unique identifier as the bot handle, such as *azure-teams-bot*. This identifier isn't the display name and you change it later.

    2. Select a subscription plan.

    3. Select the resource group that you want to provision for your bot app.

    4. Select the data residency option. Your choice defines the regions where data is stored and processed and the channels available for your bot.

        :::image type="content" source="../assets/images/authentication/create-azure-bot-screen.png" alt-text="Screenshot shows the project details tab of the create Azure bot screen.":::

        You can also create a new resource group.

        1. Select **Create new**.

            :::image type="content" source="../assets/images/authentication/create-resource-group.png" alt-text="Screenshot shows the option to create a new resource group in Azure portal.":::

        2. Enter a name for the resource and select **OK**.

5. Under **Pricing**, the standard price tier is selected by default. You can change your pricing tier by clicking on **Change plan**.

6. Under **Microsoft App ID**, you need to configure the type of app and the creation type.

    1. Depending on how you want to use the bot resource, choose from **User-assigned Managed Identity**, **Multi Tenant**, and **Single Tenant** as the type of app.

    2. For the app creation type, you can either create a new Microsoft App ID or use an existing app registration. If you select **Create new Microsoft App ID**, Azure creates a new and unique app ID for your bot resource.

    3. If you already have a registered app that you want to link the bot resource to, select **Use existing app registration** as the creation type.

        :::image type="content" source="../assets/images/authentication/select-existing-app-registration.png" alt-text="Screenshot shows the option to enter an existing app ID in the create Azure bot screen. ":::

        The fields for entering the app ID details appear.

    4. Enter the app ID of the Microsoft Entra app you have already registered.

    5. Select **Next**.

7. The **Tags** tab opens. This step is optional and you can configure tags from the bot resource's overview page anytime. Enter the name and value tags for categorizing resources you provisioned.

    :::image type="content" source="../assets/images/authentication/name-value-tag-azure-bot.png" alt-text="Screenshot shows the tags tab in the create an Azure bot screen.":::

8. Select **Review + create**. Microsoft Entra ID validates the entered details.

9. Review your bot resource and select **Create** to create the bot.

    :::image type="content" source="../assets/images/authentication/resource-bot-creation-final-preview.png" alt-text="Screenshot shows the final preview screen before creating a bot in Azure portal.":::

     A message pops up on the browser stating that the deployment is being initialized.

    :::image type="content" source="../assets/images/authentication/initialize-deployment-message.png" alt-text="Screenshot shows a message stating the deployment of the resource is initializing.":::

    The **Overview** page opens as the deployment is in progress. Once the deployment is complete, a **Deployment succeeded** message is displayed. This message confirms that the bot resource has been created successfully and the selected resources are provisioned.

10. Under **Next steps** dropdown, select **Go to resource**.

    :::image type="content" source="../assets/images/authentication/go-to-bot-resource.png" alt-text="Screenshot shows the Azure bot resource deployment page.":::

     You can view the bot resource details on this page.

    :::image type="content" source="../assets/images/authentication/bot-resource-overview-page.png" alt-text="Screenshot shows the overview page of the resource bot":::

After you create your bot resource, you'll need to create a client secret to enable the bot to work in Teams.

### Create client secret

A client secret is a string that the bot app uses to prove its identity when requesting a token from Microsoft Entra ID.

#### To create client secret for the bot

1. Open the [Azure portal](https://ms.portal.azure.com/) on your web browser.

1. Enter the name of your bot resource in **Search** box and open your bot.

1. Select **Configuration**.

    :::image type="content" source="../assets/images/authentication/resource-bot-configuration-select.png" alt-text="Screenshot show the resource bot overview page with the configuration option highlighted in red.":::

    The **Configuration** page appears.

1. Under **Microsoft App ID**, select **Manage Password**.

    :::image type="content" source="../assets/images/authentication/bot-config-manage-password.png" alt-text="Screenshot shows the option to manage password under Microsoft app ID.":::

     The **Certificates & secrets** page appears.

2. Select **+ New client secret**.

    :::image type="content" source="../assets/images/authentication/client-secret.png" alt-text="Screenshot shows the option to add a client secret highlighted in red.":::

   The **Add a client secret** page appears.

    :::image type="content" source="../assets/images/authentication/add-a-client-secret.png" alt-text="Screenshot shows the option to add a client secret page.":::

3. Enter the description, select the duration of validity for the secret, and select **Add**.

    A message pops up on the browser stating that the credentials of the bot resource were updated. The client secret displays on the page.

    :::image type="content" source="../assets/images/authentication/client-secret-updated.png" alt-text="Screenshot shows the client secret of the bot resource.":::

> [!TIP]
> Note down the value of client secret right after you create it. The value is visible only at the time when the client secret is created, and can't be viewed after that.

### Enable bot for Teams

You must enable the bot to interact with Microsoft Teams. Without this permission, your bot is incapable to communicating with Teams.

#### To enable bot app for Teams

1. Open the [Azure portal](https://ms.portal.azure.com/) on your web browser.

1. Enter the name of your bot resource in **Search** box and open your bot.

1. Select **Channels**.

    :::image type="content" source="../assets/images/authentication/bot-resource-channels.png" alt-text="Screenshot shows the channels option in the resource bot overview page.":::

    The **Channels** page appears.

1. Under **Available Channels**, select **Microsoft Teams**.

    :::image type="content" source="../assets/images/authentication/available-channels-microsoft-teams.png" alt-text="Screenshot shows Microsoft Teams channels highlighted in red.":::

    The message with **Terms of Service** appears.

1. Check to agree with the terms and select **Agree**.

    :::image type="content" source="../assets/images/authentication/terms-of-service-teams-channel.png" alt-text="Screenshot shows the terms of service for the Teams channel.":::

    The **Microsoft Teams** page appears with the default messaging option set to **Microsoft Teams Commercial (most common)**.

1. Select **Apply**.

    :::image type="content" source="../assets/images/authentication/teams-channel-messaging-apply.png" alt-text="Screenshot show the Teams channel messaging options.":::

    A message pops up on the browser stating that the channel setup is complete.

    :::image type="content" source="../assets/images/authentication/teams-channel-enabled.png" alt-text="Screenshot shows a message stating that the Teams channel is enabled.":::

    The bot is now enabled to work with Teams.

    > [!NOTE]
    > If you want to change channel settings, you need to delete the channel and apply it again with new settings.

## See also

- [Build bots for Teams](../bots/what-are-bots.md)
- [Configure your app in Microsoft Entra ID](../bots/how-to/authentication/bot-sso-register-aad.md)
- [Add authentication to your Teams bot](../bots/how-to/authentication/add-authentication.md)
