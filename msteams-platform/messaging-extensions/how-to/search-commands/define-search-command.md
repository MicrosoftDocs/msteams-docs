---
title: Define message extension search commands
author: surbhigupta
description: Learn about message extension search commands for Teams apps, to create a search command through app manifest and manually.
ms.topic: conceptual
ms.author: anclear
ms.localizationpriority: medium
---
# Define message extension search commands

The search command is invoked from any one or both of the following locations:

* Compose message area: The buttons at the bottom of the compose message area.
* Command box: By @mentioning in the command box.

When a search command is invoked from the compose message area, the user sends the results to the conversation. When it's invoked from the command box, the user interacts with the resulting card, or copies it for use elsewhere.

The following image displays the invoke locations of the search command:

:::image type="content" source="~/assets/images/messaging-extension/search-command-invoke-locations.png" alt-text="Screenshot shows the invoke locations of a search command in a Teams channel.":::

## Add the search command to your app manifest

To add the search command to your [app manifest](../../../resources/schema/manifest-schema.md#composeextensions), you must add a new `composeExtensions` object to the top level of your app manifest JSON. You can add the search command either with the help of Developer Portal, or manually.

### Create search message extension using Bot Framework

You can create a search message extension using Teams Toolkit and Developer Portal for Teams.

#### Prerequisites

Before you get started, ensure that you meet the following requirements:

* [Node.js](https://nodejs.org/en). The supported versions are 16, 18.
* [Microsoft 365 account for development](../../../toolkit/tools-prerequisites.md#microsoft-365-developer-program)
* [Set up your dev environment for extending Teams apps across Microsoft 365](../../../m365-apps/prerequisites.md) Please note that after you enrolled your developer tenant in Office 365 Target Release, it may take couple days for the enrollment to take effect.
* [Teams Toolkit Visual Studio Code Extension](https://marketplace.visualstudio.com/items?itemName=TeamsDevApp.ms-teams-vscode-extension) version 5.2.0 and higher or Teams Toolkit CLI.

# [Teams Toolkit](#tab/Teams-toolkit)

To create a search based message extension using Teams Toolkit, follow these steps:

1. Open **Visual Studio Code**.
1. From the left pane, Select **Teams Toolkit**.
1. Select **Create a New App**.
1. Select **Message Extension**.
1. Select **Custom Search Results**.
1. Select a **programming language**.
1. Select **Default folder**.
1. Enter the name of your app and select **Enter**.

   Teams Toolkit scaffolds your project and creates a search message extension.

To run the message extension in Teams, follow these steps:

1. From the left pane, select **Teams Toolkit**.
1. Under **ACCOUNTS**, sign in with your [Microsoft 365 account](/microsoftteams/platform/toolkit/accounts) and Azure account if you haven't already.

   :::image type="content" source="../../../assets/images/Copilot/api-based-me-ttk-accounts.png" alt-text="Screenshot shows the Microsoft 365 and Azure sign in option in Teams Toolkit.":::

1. Under **LIFECYCLE**, select **Provision**. Teams Toolkit provisions the app on Azure and displays a message.

   :::image type="content" source="../../../assets/images/Copilot/api-based-me-ttk-provision-success.png" alt-text="Screenshot shows the successful completion of the provsion steps in Teams Toolkit.":::

1. From the left pane, Select **Run and Debug (Ctrl+Shift+D)**.
1. From the launch configuration dropdown, select `Preview in Teams (Edge)` or `Preview in Teams (Chrome)` . Teams Toolkit launches Teams web client in a browser window. Select the Add button in the dialog to install your app to Teams.
1. Go to a chat message and select the **Actions and apps** icon. In the flyout menu, @mention your message extension.
1. Select the message extension from the list and [trigger your search commands from compose message area](/microsoftteams/platform/messaging-extensions/what-are-messaging-extensions?tabs=dotnet#search-commands).

# [Developer Portal for Teams](#tab/developer-portal-for-teams)

1. Go to [**Developer Portal for Teams**](https://dev.teams.microsoft.com/home).
1. Go to **Apps**.
1. Select **Create a new app**.
1. Under **Configure**, select **App features**.
1. Select **Messaging extension**.

   :::image type="content" source="../../../assets/images/Copilot/api-based-me-tdp-app-feature.png" alt-text="Screenshot shows the message extension option in Teams Developer Portal.":::

1. If you have an existing bot, select **Existing bot** or if you have a bot ID, select **Enter Bot ID**.

   1. If you don't have a Bot ID, you can select **Create a bot**, to create a new bot and enter the bot ID of the new bot that you've created.

1. Select **Save**.

1. Select the required scopes.

1. Under **Command**, select **+ Add a command**.

   A command details page appears.

1. In the Command details page, select **Search** as the type of command and update the following:
   * Command ID
   * Command title
   * Command description
   * Context in which the command works
   * Parameter name
   * Parameter title
   * Parameter description
   * Select the type of input

1. Select **Save**. A search message extension using bot framework created.
1. At the upper-right, select **Preview in Teams**. The app opens in Teams desktop or web client.

---

### Extend bot-based message extension as plugin

> [!IMPORTANT]
> Plugins for Microsoft Copilot for Microsoft 365 are in preview and only work in Microsoft 365 Chat in Microsoft Teams.

Microsoft 365 plugins provide integration with various Microsoft 365 products, such as Teams and Outlook. The integration helps users to search or create content in external systems. Message extension plugins allow Microsoft Copilot for Microsoft 365 to interact with APIs from other software and services through a bot. We recommend that you build or upgrade your existing message extensions to maximize their usefulness and usability in Copilot for Microsoft 365. For more information, see [Extend bot-based message extension as plugin for Copilot for Microsoft 365](../../build-bot-based-plugin.md).

## Code snippets

The following code provides an example of search based for message extensions:

# [C#](#tab/dotnet)

* [SDK reference](/dotnet/api/microsoft.bot.builder.teams.teamsactivityhandler.onteamsmessagingextensionqueryasync?view=botbuilder-dotnet-stable#microsoft-bot-builder-teams-teamsactivityhandler-onteamsmessagingextensionqueryasync(microsoft-bot-builder-iturncontext((microsoft-bot-schema-iinvokeactivity))-microsoft-bot-schema-teams-messagingextensionquery-system-threading-cancellationtoken)&preserve-view=true)
* [Sample code reference](https://github.com/OfficeDev/Microsoft-Teams-Samples/blob/main/samples/app-hello-world/csharp/Microsoft.Teams.Samples.HelloWorld.Web/Bots/MessageExtension.cs#L26-L59)

```csharp
protected override async Task<MessagingExtensionResponse> OnTeamsMessagingExtensionQueryAsync(ITurnContext<IInvokeActivity> turnContext, MessagingExtensionQuery query, CancellationToken cancellationToken)
        {
            var text = query?.Parameters?[0]?.Value as string ?? string.Empty;

            var packages = new[] {
            new { title = "A very extensive set of extension methods", value = "FluentAssertions" },
            new { title = "Fluent UI Library", value = "FluentUI" }};

            // We take every row of the results and wrap them in cards wrapped in MessagingExtensionAttachment objects.
            // The Preview is optional, if it includes a Tap, that will trigger the OnTeamsMessagingExtensionSelectItemAsync event back on this bot.
            var attachments = packages.Select(package =>
            {
                var previewCard = new ThumbnailCard { Title = package.title, Tap = new CardAction { Type = "invoke", Value = package } };
                if (!string.IsNullOrEmpty(package.title))
                {
                    previewCard.Images = new List<CardImage>() { new CardImage(package.title, "Icon") };
                }

                var attachment = new MessagingExtensionAttachment
                {
                    ContentType = HeroCard.ContentType,
                    Content = new HeroCard { Title = package.title },
                    Preview = previewCard.ToAttachment()
                };

                return attachment;
            }).ToList();

            // The list of MessagingExtensionAttachments must we wrapped in a MessagingExtensionResult wrapped in a MessagingExtensionResponse.
            return new MessagingExtensionResponse
            {
                ComposeExtension = new MessagingExtensionResult
                {
                    Type = "result",
                    AttachmentLayout = "list",
                    Attachments = attachments
                }
            };
        }
```

# [Node.js](#tab/nodejs)

* [Sample code reference](https://github.com/OfficeDev/Microsoft-Teams-Samples/blob/main/samples/msgext-search-quickstart/js/botActivityHandler.js#L30-L53)

```javascript
async handleTeamsMessagingExtensionQuery(context, query) {
        const searchQuery = query.parameters[0].value;     
        const attachments = [];
                const response = await axios.get(`http://registry.npmjs.com/-/v1/search?${ querystring.stringify({ text: searchQuery, size: 8 }) }`);
                
                response.data.objects.forEach(obj => {
                        const heroCard = CardFactory.heroCard(obj.package.name);
                        const preview = CardFactory.heroCard(obj.package.name);
                        preview.content.tap = { type: 'invoke', value: { description: obj.package.description } };
                        const attachment = { ...heroCard, preview };
                        attachments.push(attachment);
                });
    
                return {
                    composeExtension:  {
                           type: 'result',
                           attachmentLayout: 'list',
                           attachments: attachments
                    }
                };
            }       
        }
```

---

## Code sample

| Sample name           | Description | .NET    | Node.js   | Manifest|
|:---------------------|:--------------|:---------|:--------|:--------------|
|Teams message extension search   |  This sample shows how to build a Search-based message extension. It searches nudget packages and displays the results in search based messaging extension.        |[View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/msgext-search/csharp)|[View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/msgext-search/nodejs)|[View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/msgext-search/csharp/demo-manifest/msgext-search.zip)

## Step-by-step guide

Follow the [step-by-step guide](../../../sbs-messagingextension-searchcommand.yml) to build a search based message extension.

## Next step

> [!div class="nextstepaction"]
> [Respond to search commands](~/messaging-extensions/how-to/search-commands/respond-to-search.md).

## See also

* [Developer Portal for Teams](../../../concepts/build-and-test/teams-developer-portal.md)
* [Message extensions](../../what-are-messaging-extensions.md)
