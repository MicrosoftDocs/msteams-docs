---
title: Create Search Commands for App
author: surbhigupta
description: Learn about message extension search commands for Teams apps, to create a search command through app manifest and manually.
ms.topic: conceptual
ms.author: anclear
ms.date: 09/16/2024
ms.localizationpriority: medium
ms.owner: slamba
---
# Define message extension search commands

The search command is invoked from any one or both of the following locations:

* Compose message area: The buttons at the bottom of the compose message area.
* Command box: By using / in the command box. For example, **/your-app-name**. If you're using the classic Teams, search command is invoked by @mentioning in the command box. For example, **@your-app-name**.

When a search command is invoked from the compose message area, the user sends the results to the conversation. When a search command invoked from the command box, the user interacts with the resulting card, or copies it for use elsewhere.

The following image displays the invoke locations of the search command:

:::image type="content" source="~/assets/images/messaging-extension/search-command-invoke-locations.png" alt-text="Screenshot shows the invoke locations of a search command in a Teams channel.":::

## Add the search command to your app manifest

To add the search command to your [app manifest](../../../resources/schema/manifest-schema.md#composeextensions) (previously called Teams app manifest), you must add a new `composeExtensions` object to the top level of your app manifest JSON. You can add the search command either with the help of Developer Portal or manually.

### Create search message extension using Bot Framework

You can create a search message extension using Microsoft 365 Agents Toolkit (previously known as Teams Toolkit) and Developer Portal for Teams.

#### Prerequisites

Before you get started, ensure that you meet the following requirements:

* [Node.js](https://nodejs.org/en). The supported versions are 16, 18.
* [Microsoft 365 account for development](../../../toolkit/tools-prerequisites.md#microsoft-365-developer-program)
* [Set up your dev environment for extending Teams apps across Microsoft 365.](../../../m365-apps/prerequisites.md) After you've enrolled your developer tenant in Office 365 Targeted Release, it might take a couple of days for the enrollment to take effect.
* [Agents Toolkit Visual Studio Code Extension](https://marketplace.visualstudio.com/items?itemName=TeamsDevApp.ms-teams-vscode-extension) version 5.2.0 and higher or Microsoft 365 Agents Toolkit CLI (previously known as Teams Toolkit CLI).

# [Agents Toolkit](#tab/Teams-toolkit)

To create a search-based message extension using Agents Toolkit, follow these steps:

1. Open **Visual Studio Code**.
1. From the left pane, select **Microsoft 365 Agents Toolkit**.
1. Select **Create a New Agents/App** > **Teams App**.
1. Select **Message Extension**.
1. Select **Custom Search Results**.
1. Select a **programming language**.
1. Select **Default folder**.
1. Enter the name of your app and select **Enter**.

   Agents Toolkit scaffolds your project and creates a search message extension.

To run the message extension in Teams, follow these steps:

1. From the left pane, select **Microsoft 365 Agents Toolkit**.
1. Under **ACCOUNTS**, sign in with your [Microsoft 365 account](/microsoftteams/platform/toolkit/accounts) and Azure account if you haven't already.

   :::image type="content" source="../../../assets/images/Copilot/api-based-me-ttk-accounts.png" alt-text="Screenshot shows the Microsoft 365 and Azure sign in option in Agents Toolkit.":::

1. From the left pane, Select **Run and Debug (Ctrl+Shift+D)**.
1. From the launch configuration dropdown, select `Preview in Teams (Edge)` or `Preview in Teams (Chrome)`. Agents Toolkit launches Teams web client in a browser window.
1. Go to a chat message and select the **Actions and apps** icon. In the flyout menu, search for your app.
1. Select your message extension from the list and enter a search command in the search box.
1. Select an item from the list. The item unfurls into an Adaptive Card in the message compose area.
1. Select **Send**. Teams sends the search result as an Adaptive Card in the chat message.

# [Developer Portal for Teams](#tab/developer-portal-for-teams)

1. Go to [**Developer Portal for Teams**](https://dev.teams.microsoft.com/home).
1. Go to **Apps**.
1. Select **Create a new app**.
1. Under **Configure**, select **App features**.
1. Select **Messaging extension**.

   :::image type="content" source="../../../assets/images/Copilot/api-based-me-tdp-app-feature.png" alt-text="Screenshot shows the message extension option in Teams Developer Portal.":::

1. Under **Message extension type**, select **Bot**.

   1. If you get a disclaimer, which reads **API Message extension is already in use by users. Would you like to change message extension type to bot?**. Select **Yes, change**.

   :::image type="content" source="../../../assets/images/Copilot/bot-based-me-tdp-type.png" alt-text="Screenshot shows API Message extension is already in use disclaimer when a user switches from API to bot message extension type.":::

1. If you have an existing bot, select **Existing bot** or if you have a bot ID, select **Enter Bot ID**.

   1. If you don't have an existing bot ID, select **Create a bot**, to create a new bot and enter the bot ID of the new bot that you created.

1. Select **Save**.

1. Select the required scopes.

1. Under **Command**, select **+ Add a command**.

   A command details page appears.

1. In the Command details page, select **Search** as the type of command and update the following fields:
   * Command ID
   * Command title
   * Command description
   * Context in which the command works
   * Parameter name
   * Parameter title
   * Parameter description
   * Select the type of input

1. Select **Save**. A search message extension using bot framework created.
1. At the upper-right corner, select **Preview in Teams**. The app opens in Teams desktop or web client.

---

### Extend bot-based message extension as agent

> [!IMPORTANT]
> Agents for Microsoft 365 Copilot are in preview and only work in Microsoft 365 Copilot in Teams.

Microsoft 365 agents provide integration with various Microsoft 365 products, such as Teams and Outlook. The integration helps users to search or create content in external systems. Message extension agents allow Microsoft 365 Copilot to interact with APIs from other software and services through a bot. We recommend that you build or upgrade your existing message extensions to maximize their usefulness and usability in Microsoft 365 Copilot. For more information, see [extend bot-based message extension as agent for Microsoft 365 Copilot](../../build-bot-based-agent.md).

## Code snippets

The following code provides an example of search-based for message extensions:

# [.NET](#tab/dotnet)

* [SDK reference](/dotnet/api/microsoft.bot.builder.teams.teamsactivityhandler.onteamsmessagingextensionqueryasync?view=botbuilder-dotnet-stable&preserve-view=true)
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

[Sample code reference](https://github.com/OfficeDev/Microsoft-Teams-Samples/blob/main/samples/msgext-search-quickstart/js/botActivityHandler.js#L30-L53)

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

# [Python](#tab/python)

```python
async def on_teams_messaging_extension_query(self, context, query):
    """
    Handles Messaging Extension queries in Teams.
 
    This method generates a list of thumbnail cards containing random text and images when the "getRandomText" command is triggered. It creates preview cards with tap actions and returns them as a Messaging Extension response.
    """
    faker = Faker()
    title = query.command_id
    random_image_url = "https://loremflickr.com/200/200"

    if query.command_id == "getRandomText":
        attachments = []
        # Generate 5 results with fake text and fake images
        for i in range(5):
            text = faker.paragraph()
            images = [f"{random_image_url}?random={i}"]

            # Create a thumbnail card using ThumbnailCard
            thumbnail_card = self.create_thumbnail_card(title, text, images)

            # Create a preview card and add the tap action
            preview_card = self.create_thumbnail_card(title, text, images)
            tap_action = CardAction(
                type="invoke",
                value={"title": title, "text": text, "images": images},
            )
            preview_attachment = CardFactory.thumbnail_card(preview_card)
            preview_attachment.content.tap = tap_action

            # Combine the thumbnail card and the preview
            attachment = MessagingExtensionAttachment(
                content = thumbnail_card,
                content_type=CardFactory.content_types.thumbnail_card,
                preview=preview_attachment,
            )
            attachments.append(attachment)

        return MessagingExtensionResponse(
            compose_extension=MessagingExtensionResult(
                type="result",
                attachment_layout="list",
                attachments=attachments,
            )
        )
```

---

## Code sample

| Sample name           | Description | .NET    | Node.js   | Manifest|
|:---------------------|:--------------|:---------|:--------|:--------------|
|Teams message extension search   |  This sample demonstrates how to create a Messaging Extension in Microsoft Teams that allows users to perform searches and retrieve results.        |[View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/msgext-search/csharp)|[View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/msgext-search/nodejs)|[View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/msgext-search/csharp/demo-manifest/msgext-search.zip)

## Next step

> [!div class="nextstepaction"]
> [Respond to search commands](~/messaging-extensions/how-to/search-commands/respond-to-search.md).

## See also

* [Developer Portal for Teams](../../../concepts/build-and-test/teams-developer-portal.md)
* [Message extensions](../../what-are-messaging-extensions.md)
