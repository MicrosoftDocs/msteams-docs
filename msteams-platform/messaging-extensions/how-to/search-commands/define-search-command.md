---
title: Define message extension search commands
author: surbhigupta
description: Learn about message extension search commands for Teams apps, to create a search command through app manifest and manually.
ms.topic: conceptual
ms.author: anclear
ms.localizationpriority: medium
---
# Select search command invoke locations

The search command is invoked from any one or both of the following locations:

* Compose message area: The buttons at the bottom of the compose message area.
* Command box: By @mentioning in the command box.

When a search command is invoked from the compose message area, the user sends the results to the conversation. When it's invoked from the command box, the user interacts with the resulting card, or copies it for use elsewhere.

The following image displays the invoke locations of the search command:

:::image type="content" source="~/assets/images/messaging-extension/search-command-invoke-locations.png" alt-text="Screenshot shows the invoke locations of a search command in a Teams channel.":::

## Add the search command to your app manifest

To add the search command to your [app manifest](../../../resources/schema/manifest-schema.md#composeextensions), you must add a new `composeExtensions` object to the top level of your app manifest JSON. You can add the search command either with the help of Developer Portal, or manually.

### Create a search command using Developer Portal

The prerequisite to create a search command is that you must already have created a message extension. For information on how to create a message extension, see [create a message extension](../../../sbs-gs-msgext.yml).

**To create a search command**

1. Open **Developer Portal** from the Microsoft Teams client and select the **Apps** tab.
   If you already created your app package in **Developer Portal**, select from the list. If you haven't created an app package, import an existing one.
1. After importing an app package, select **Message extensions** under **App features**.
1. To create a message extension, you need a Microsoft registered bot. You can either use an existing bot or create a new bot. Select **Create new bot** option, give a name to the new bot, and then select **Create**.

   :::image type="content" source="../../../assets/images/tdp/bot-page.png" alt-text="Screenshot shows the options to configure a bot for an app in Teams Developer Portal.":::

1. To use an existing bot, select **Select an existing bot** and choose the existing bots from the dropdown list, or select **Enter a bot ID** if you have a bot ID created already.

1. Select the scope of the messaging extension and select **Save**.

1. Select **Add a command** in the **Command** section to include the commands, which decide the behavior of message extension.
The following image displays command addition for message extension:

   :::image type="content" source="../../../assets/images/tdp/add-a-command.PNG" alt-text="Screenshot shows how to add a command in Teams Developer Portal to define the behavior of the message extension.":::

1. Select **Search** and enter **Command ID**, **Command title**, and **Command description**.

1. Enter all the parameters and select the type of input from the dropdown list.

   :::image type="content" source="../../../assets/images/tdp/add-a-command-parameter.PNG" alt-text="Screenshot shows how to add a parameter to define your command in Teams Developer Portal for a message extension.":::

1. Select **Add a domain** under **Preview links**.

1. Enter valid domain and then select **Add**.

   :::image type="content" source="../../../assets/images/tdp/add-domain.PNG" alt-text="Screenshot shows how to add a valid domain to your messaging extension for link unfurling.":::

1. Select **Save**.

   :::image type="content" source="../../../assets/images/tdp/add-a-command-save.PNG" alt-text="Screenshot shows how to save all your setting and parameters for your message extension.":::

# [Teams Toolkit](#tab/Teams-toolkit)

1. Open **Visual Studio Code**.
1. From the left pane, Select **Teams Toolkit**.
1. Select **Create a New App**.
1. Select **Message Extension**.
1. Select **Custom Search Results**.
1. Select a **programming language**.
1. Select **Default folder**.
1. Enter the name of your app and select **Enter**.

To trigger the Message Extension through Copilot, you can:

1. Select **Debug in Copilot (Edge)** or **Debug in Copilot (Chrome)** from the launch configuration dropdown. The app launches in a browser.
1. Select **Apps** and search for Copilot.
1. Open the Copilot app and send a prompt to trigger your plugin.
1. Send a message to Copilot to find an NPM package information. For example, find the npm package info on teamsfx-react.

> [!NOTE]
> This prompt may not always make Copilot include a response from your message extension. If it happens, try some other prompts or leave a feedback to us by thumbing down the Copilot response and leave a message tagged with [MessageExtension].

# [Developer portal for Teams](#tab/developer-portal-for-teams)

1. Go to **Teams developer portal**.
1. Go to **Apps**.
1. Select **Create a new app**.
1. Under **Configure**, select **App features**.
1. Select **Messaging extension**.

   :::image type="content" source="../assets/images/Copilot/api-based-me-tdp-app-feature.png" alt-text="Screenshot shows the plugin of copilot option in Teams developer portal.":::

1. Under **Message extension type**, select **Bot**.

1. If you have an existing bot, select **Existing bot** or if you have a bot ID, select **Enter Bot ID**.

   1. If don't have a Bot ID, you can select **Create a bot**, to create a new bot and enter the bot ID of the new bot that you've created.

1. Select the required scopes.

1. Under **Command**, select **+ Add a command**.

   A command details page appears.

1. In the Command details page, select the **Search** or **Action** as the type of command and update the following:
   * Command ID
   * Command title
   * Command description
   * Context in which the command works
   * Parameter name
   * Parameter title
   * Parameter description
   * Parameter description type

1. Select **Save**.

A bot-based ME is created.

---

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
|Teams message extension search   |  This sample shows how to build a Search-based Message Extension. It searches nudget packages and displays the results in search based messaging extension.        |[View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/msgext-search/csharp)|[View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/msgext-search/nodejs)|[View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/msgext-search/csharp/demo-manifest/msgext-search.zip)

## Step-by-step guide

Follow the [step-by-step guide](../../../sbs-messagingextension-searchcommand.yml) to build a search based message extension.

## Next step

> [!div class="nextstepaction"]
> [Respond to the search commands](~/messaging-extensions/how-to/search-commands/respond-to-search.md).

## See also

* [Cards](../../../task-modules-and-cards/what-are-cards.md)
* [Task modules](../../../task-modules-and-cards/what-are-task-modules.md)
* [Developer Portal for Teams](../../../concepts/build-and-test/teams-developer-portal.md)
* [Message extensions](../../what-are-messaging-extensions.md)
