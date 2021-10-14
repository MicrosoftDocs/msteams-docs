---
title: Deploy your first app using C#
description: Learn how to deploy Microsoft Teams apps with C# or .NET.
keywords: getting started .net c# csharp
ms.custom: scenarios:getting-started; languages:ASP.NET,C#
ms.localizationpriority: medium
ms.topic: tutorial
ms.date: 11/09/2018
---
# Deploy your Teams C# app

After you build and test your Teams app, you can host it on Azure.

Let's deploy the first Hello World app on Azure using Teams Toolkit.

:::image type="content" source="../assets/images/get-started/app-roadmap/roadmap-p-3.png" alt-text="Image showing phase 3 of building an app." border="false":::

In this page, you'll learn to:

- [Host your app in Azure](#host-in-azure)
- [Update the app package](#update-the-app-package)

## Host in Azure

Microsoft Azure hosts your .NET application on a free tier. It uses shared infrastructure that is sufficient to run the `Hello World` sample. For more information, see [creating a new free Azure account](https://azure.microsoft.com/free/).

Visual Studio 2019 has built-in support for app deployment to different providers, including Azure:

:::image type="content" source="../assets/images/teams-toolkit-v2/publish-to-azure.png" alt-text="Image showing the Publish to Azure menu item in Visual Studio 2019" border="false":::

Hosting your app on Azure involves:
- [Updating the app package](#update-the-app-package)
- [Previewing and testing your C# app](configure-test-csharp-app.md#preview-and-test-your-app)

## Update the app package

You can use [Developer Portal](https://dev.teams.microsoft.com/) to upload the app package to Teams. Developer Portal is a Teams app that simplifies the creation and registration of an app. Install from the Teams store!

Updating the app package includes:

- [Uploading the app package to Developer Portal](#upload-the-app-package-to-developer-portal)
- [Configuring app capabilities](#configure-your-app-capabilities)

> [!NOTE]
> You could use [*App Studio*](deploy-csharp-app-studio.md) to upload you app to Teams, though it has now evolved. Configure, distribute, and manage your Teams apps with the new Developer Portal.

### Upload the app package to Developer Portal

To upload the app package:

1. Open Microsoft Teams.

1. Select the **Store** :::image type="icon" source="../assets/images/teams-toolkit-v2/teams-store-icon.png"::: icon from the left-hand bar.

1. Search for **Dev Portal** in the search bar, and select **Dev Portal (Int)***.

   :::image type="content" source="../assets/images/teams-toolkit-v2/select-dev-portal-app.png" alt-text="Select Developer Portal app" border="false":::

1. Select **Open**.

    :::image type="content" source="../assets/images/teams-toolkit-v2/open-dev-portal.png" alt-text="Image showing open Developer Portal app" border="false":::

    The Developer Portal opens.

1. Select the **Apps** tab.

    :::image type="content" source="../assets/images/teams-toolkit-v2/dev-portal-app.png" alt-text="Developer Portal app" border="false":::

1. Select **Import an existing app**.

    :::image type="content" source="../assets/images/teams-toolkit-v2/import-app-in-dev-portal.png" alt-text="Image showing Import app button" border="false":::

1. Select the app package **helloworldapp.zip** from the following path in your C# sample repo directory structure:

    `<path to cloned C# repo>/Source/Repos/Microsoft-Teams-Samples/samples/app-hello-world/csharp/Microsoft.Teams.Samples.HelloWorld.Web/bin/Debug/netcoreapp3.1`

    The **Hello World** app is imported in Developer Portal.

    :::image type="content" source="../assets/images/teams-toolkit-v2/app-imported-dev-portal.png" alt-text="Image showing app imported in Teams" border="false":::

### View app information

After you've imported your app to Developer Portal, you can view its details, including the manifest file.

#### View the app manifest

You use the manifest file to configure capabilities, required resources, and other important attributes for your app.

To view the app manifest:

1. Select **Publish** from the left panel to open the dropdown list.

    :::image type="content" source="../assets/images/teams-toolkit-v2/open-app-package-devp.png" alt-text="Image showing left pane of Developer Portal" border="false":::

1. Select **App package**.

    :::image type="content" source="../assets/images/teams-toolkit-v2/app-manifest-dev-portal.png" alt-text="Image showing App manifest file in Developer Portal" border="false":::

    The manifest file appears on the right pane.

#### View app information

1. Select **Basic Information** from the left pane of Developer Portal.

    :::image type="content" source="../assets/images/teams-toolkit-v2/dev-portal-left-pane-basic.png" alt-text="Image shows the left pane of Developer Portal" border="false":::

1. Note the following information from the basic information:
    - App ID
    - Developer Information
    - App URLs

1. Select **Branding** from the left pane to view the branding information.

    :::image type="content" source="../assets/images/teams-toolkit-v2/devp-app-branding.png" alt-text="Image showing branding information of the app" border="false":::

    These details are important if you are writing a new app for distribution.

#### View app features

- Select **App features** from the left pane of Developer Portal.

    The App features appear in the right pane. You can view cards for Personal app, Bot, and Message Extension.

    :::image type="content" source="../assets/images/teams-toolkit-v2/devp-csharp-app-features.png" alt-text="Image showing features of the app" border="false":::

### Configure your app capabilities

After you've imported your app into Developer Portal, the next step is to configure app capabilities. Developer Portal contains all the app information in different sections. It makes configuring the app capabilities easy.

Using Developer Portal, you can:
- [Configure personal tab app](#configure-personal-tab-app)
- [Configure bot](#configure-bot)
- [Configure message extension](#configure-message-extension)

#### Configure personal tab app

To configure personal tab app:

1. Select the :::image type="icon" source="../assets/images/teams-toolkit-v2/ellipse-icon.png"::: icon on the **Personal app** card on the **App features** pane, and select **Edit**.

    The details for Hello tab appear.

1. Select the :::image type="icon" source="../assets/images/teams-toolkit-v2/ellipse-icon.png"::: icon for Hello tab, and select **Edit** to open the app details for updating.

    :::image type="content" source="../assets/images/teams-toolkit-v2/devp-edit-tab.png" alt-text="Image showing Hello tab menu" border="false":::

1. Enter the app details for the Hello tab in **Add a tab to your personal app**.

    :::image type="content" source="../assets/images/teams-toolkit-v2/devp-add-personal-tab-details.png" alt-text="Image showing Hello tab details" border="false":::

    Enter the following details:
    - Name: Hello tab
    - Content URL and Website URL: the forwarding address in ngrok console session

1. Select **Update**.

    The details of the Hello tab appear on the **Personal app** pane.

1. Select **Save**.

    :::image type="content" source="../assets/images/teams-toolkit-v2/devp-save-tab-update.png" alt-text="Image showing Hello tab details to be saved" border="false":::
 
    The **Personal app** pane now shows the new tab and an About tab created automatically.

    :::image type="content" source="../assets/images/teams-toolkit-v2/devp-about-tab-added.png" alt-text="Image showing Hello tab and About tab details" border="false":::

#### Configure bot

It's easy to add the bots functionality to your app. The Hello World sample app already has a bot as its part, but you must register it with Teams.

:::image type="content" source="../assets/images/teams-toolkit-v2/devp-bot-no-id.png" alt-text="Image showing bot app imported with no app ID" border="false":::

The bot that was imported from the sample doesn't have an associated app ID. You must delete it, and create a new bot. Developer Portal creates a new app ID, and registers it with Teams.

Adding and configuring a bot involves the following:

1. [Adding a new bot](#to-add-a-new-bot)
1. [Adding bot to app](#to-add-bot-to-app)
1. [Configuring bot scope](#to-configure-bot-scope)

##### To add a new bot

1. Select the :::image type="icon" source="../assets/images/teams-toolkit-v2/ellipse-icon.png"::: icon on the **Bot** card on the **App features** pane, and select **Delete**.

1. Select **Bot** on the **App features** pane.

    :::image type="content" source="../assets/images/teams-toolkit-v2/devp-bot-card.png" alt-text="Image showing bot card" border="false":::

1. Select **Create a new bot** on the **Bot** pane.

    :::image type="content" source="../assets/images/teams-toolkit-v2/devp-bot-page.png" alt-text="Image showing bot pane" border="false":::

1. Select **New Bot** on the **Bot management** pane.
1. Enter a suitable name for your bot, and select **Add**.

    :::image type="content" source="../assets/images/teams-toolkit-v2/devp-add-bot.png" alt-text="Image showing how to add bot" border="false":::

    The **Configure** pane appears showing details of the new bot in the left pane.

1. Enter the forwarding URL from the `ngrok` console, and select **Save**.

    :::image type="content" source="../assets/images/teams-toolkit-v2/devp-configure-bot-endpoint.png" alt-text="Image showing how to add bot endpoint" border="false":::

1. Select **Client secrets** and then select **Add a client secret to your bot** to generate a password for the bot.

    :::image type="content" source="../assets/images/teams-toolkit-v2/devp-add-client-secret-pane.png" alt-text="Image showing Client secret section" border="false":::

    Developer Portal generates a password for the bot.

1. Select the :::image type="icon" source="../assets/images/teams-toolkit-v2/copy-icon.png"::: icon to copy the password, and save it in a text file.

    :::image type="content" source="../assets/images/teams-toolkit-v2/devp-client-secret-generated.png" alt-text="Image showing Client secret generated" border="false":::

1. Select **OK**.

1. Select **< Bots** to return to **Bot management** pane.

    The **Bot management** pane shows the new Bot added with an app ID.

    :::image type="content" source="../assets/images/teams-toolkit-v2/devp-bot-mgmt-pane.png" alt-text="Image showing new bot with app ID" border="false":::

1. Ensure that you save the Bot ID along with the password from the **Client secret** section.

##### To add bot to app

1. Open the **App features** pane, and select the **Bot** card.

    :::image type="content" source="../assets/images/teams-toolkit-v2/devp-bot-card.png" alt-text="Image showing bot card" border="false":::

    The **Bot** pane appears.

1. Select your bot app from **Select an existing bot**.

    :::image type="content" source="../assets/images/teams-toolkit-v2/devp-add-new-bot-app.png" alt-text="Image showing how to add an existing bot app" border="false":::

    The new bot is added to your app with its own app ID.

    :::image type="content" source="../assets/images/teams-toolkit-v2/devp-new-bot-added.png" alt-text="Image showing new bot added to app" border="false":::

##### To configure bot scope

1. Select the :::image type="icon" source="../assets/images/teams-toolkit-v2/ellipse-icon.png"::: icon on the new **Bot** card, and select **Edit**.

1. Move through the **Bot** pane to view the **Commands** section, and select **+ Add a Command**.

    :::image type="content" source="../assets/images/teams-toolkit-v2/devp-bot-add-command.png" alt-text="Image showing commands section" border="false":::

1. Enter a suitable name and description for the **Command**.

    :::image type="content" source="../assets/images/teams-toolkit-v2/devp-add-bot-command.png" alt-text="Image showing how to add commands details" border="false":::

1. Select all the three scopes for the command, and select **Add**.
    - **Personal**
    - **Team**
    - **Group Chat**

    :::image type="content" source="../assets/images/teams-toolkit-v2/devp-bot-command-add.png" alt-text="Image showing how to save commands details" border="false":::

    The new command is added to the **Commands** section of the **Bot** pane.

1. Select **Save**.

    :::image type="content" source="../assets/images/teams-toolkit-v2/devp-save-new-bot-command.png" alt-text="Image showing commands details to be saved" border="false":::

    The command details are saved.

    :::image type="content" source="../assets/images/teams-toolkit-v2/devp-bot-command-added.png" alt-text="Image showing commands details saved" border="false":::

1. Open **App features** pane, and select **Personal app** card to view your app's tab details.

    You'll see that a tab for your new chat bot is added to your app.

    :::image type="content" source="../assets/images/teams-toolkit-v2/devp-tab-chat-tab-conf.png" alt-text="Image showing chat bot configured" border="false":::

#### Configure message extension

Messaging extensions let users ask for information from your service and post that information. The information is posted in the form of cards into the channel conversation. Messaging extensions appear at the bottom of the compose box.

To add a new message extension:

1. Select the :::image type="icon" source="../assets/images/teams-toolkit-v2/ellipse-icon.png"::: icon on the **Message Extension** card on the **App features** pane, and select **Delete**.

1. Select **Message Extension** from the **App features** pane.

1. Select the name of your bot app from the **Select an existing bot** dropdown list on the **Message extension** pane.

    :::image type="content" source="../assets/images/teams-toolkit-v2/devp-msgext-select-bot.png" alt-text="Image showing Message extension pane to select existing bot" border="false":::

1. Select **Save**.

    :::image type="content" source="../assets/images/teams-toolkit-v2/devp-msgext-save.png" alt-text="Image showing Message extension save button" border="false":::

    The message extension is saved, and the **Commands** section appears on the **Message extension** pane.

1. Select **+ Add a command** to add define the scope of what your message extension app can do.

    :::image type="content" source="../assets/images/teams-toolkit-v2/devp-msgext-add-command.png" alt-text="Image showing Command section" border="false":::

1. Ensure that **Search** is selected as the type of command you want to add in the **Add a command** dialog.

    :::image type="content" source="../assets/images/teams-toolkit-v2/devp-msgext-add-new-command.png" alt-text="Image showing Add a Command dialog" border="false":::

1. Enter suitable information the following details:
    - Command ID
    - Command title
    - Command description

1. Move through the dialog to view the remaining details.

    :::image type="content" source="../assets/images/teams-toolkit-v2/devp-msgext-add-command-b.png" alt-text="Image showing remaining details in Add a Command dialog" border="false":::

1. Ensure **Make default** is selected.
1. Select the following contexts for the message extension command:
    - Command box
    - Compose box
    - Message
1. Enter suitable information for the following details:
    - Parameter name
    - Parameter title
    - Parameter description

1. Select **Text** as the type of input.
1. Select **Save**
1. The message extension command is saved, and shows on the list of commands in the **Message extension** pane.

     :::image type="content" source="../assets/images/teams-toolkit-v2/devp-msgext-command-added.png" alt-text="Image showing new Command added" border="false":::

1. Select **Save**.
1. Open **App features** pane.

    :::image type="content" source="../assets/images/teams-toolkit-v2/devp-app-capabilities-configured.png" alt-text="Image showing capabilities configured for Hello World app" border="false":::

    You'll see all three capabilities - personal tab app, bot, and message extension - configured for the Hello World app. The next step is to register your app in Teams and test your app.

| &nbsp; | &nbsp; |
|:--- | ---:|
|[:::image type="icon" source="../assets/images/get-started/app-roadmap/back-build.png":::](build-and-test-csharp-app.md) | [:::image type="icon" source="../assets/images/get-started/app-roadmap/next.png":::](configure-test-csharp-app.md)|
|