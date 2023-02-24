---
title: Message extensions
author: surbhigupta
description: Learn how message extensions are used, its types, and scenarios where its used on the Microsoft Teams platform. Samples on action and searched based message extension.
ms.localizationpriority: medium
ms.topic: overview
ms.author: anclear
---
# Message extensions

Message extensions allow the users to interact with your web service through buttons and forms in the Microsoft Teams client. They can search or initiate actions in an external system from the compose message area, the command box, or directly from a message. You can send back the results of that interaction to the Teams client in the form of a richly formatted card.

> [!IMPORTANT]
> Message extensions are available in Government Community Cloud (GCC) and GCC-High environments but not in Department of Defense (DoD) environment.

This document gives an overview of the message extension, tasks performed under different scenarios, working of message extension, action and search commands, and link unfurling.

The following image displays the locations from where message extensions are invoked:

:::image type="content" source="~/assets/images/messaging-extension-invoke-locations.png" alt-text="message extension invoke locations":::

> [!NOTE]
> @mentioning message extensions is no longer supported in the compose box.

## Scenarios where message extensions are used

| Scenario | Example |
|:-----------------|:-----------------|
|You want some external system to do an action  and the result of the action to be sent back to your conversation.|Reserve a resource and allow the channel to know the reserved time slot.|
|You want to find something in an external system, and share the results with the conversation.|Search for a work item in Azure DevOps, and share it with the group as an Adaptive Card.|
|You want to complete a complex task involving multiple steps or lots of information in an external system, and share the results with a conversation.|Create a bug in your tracking system based on a Teams message, assign that bug to Bob, and send a card to the conversation thread with the bug's details.|

## Understand how message extensions work

A message extension consists of a web service that you host and an app manifest, which defines where your web service is invoked from in the Teams client. The web service takes advantage of the Bot Framework's messaging schema and secure communication protocol, so you must register your web service as a bot in the Bot Framework.

> [!NOTE]
> Though you can create the web service manually, use [Bot Framework SDK](https://github.com/microsoft/botframework-sdk) to work with the protocol.

In the app manifest for Teams app, a single message extension is defined with up to 10 different commands. Each command defines a type, such as action or search and the locations in the client from where it's invoked. The invoke locations are compose message area, command bar, and message. On invoke, the web service receives an HTTPS message with a JSON payload including all the relevant information. Respond with a JSON payload, allowing the Teams client to know the next interaction to enable.

## Types of message extension commands

There are two types of message extension commands, action command and search command. The message extension command type defines the UI elements and interaction flows available to your web service. Some interactions, such as authentication and configuration are available for both types of commands.

### Action commands

Action commands are used to present the users with a modal pop-up to collect or display information. When the user submits the form, your web service responds by inserting a message into the conversation directly or by inserting a message into the compose message area. After that, the user can submit the message. You can chain multiple forms together for more complex workflows.

The action commands are triggered from the compose message area, the command box, or from a message. When the command is invoked from a message, the initial JSON payload sent to your bot includes the entire message it was invoked from. The following image displays the message extension action command task module:

:::image type="content" source="~/assets/images/task-module.png" alt-text="Message extension action command task module":::

### Search commands

Search commands allow the users to search an external system for information either manually through a search box, or by pasting a link to a monitored domain into the compose message area and insert the results of the search into a message. In the most basic search command flow, the initial invoke message includes the search string that the user submitted. You respond with a list of cards and card previews. The Teams client renders a list of card previews for the user. When the user selects a card from the list, the full-size card is inserted into the compose message area.

The cards are triggered from the compose message area or the command box and not triggered from a message. They can't be triggered from a message.
The following image displays the message extension search command task module:

:::image type="content" source="~/assets/images/search-extension.png" alt-text="Message extension search command":::

> [!NOTE]
> For more information on cards, see [what are cards](../task-modules-and-cards/what-are-cards.md).

## Link unfurling

A web service is invoked when a URL is pasted in the compose message area. This functionality is known as link unfurling. You can subscribe to receive an invoke when URLs containing a particular domain are pasted into the compose message area. Your web service can "unfurl" the URL into a detailed card, providing more information than the standard website preview card. You can add buttons to allow the users to immediately take action without leaving the Teams client.
The following images display link unfurling feature when a link is pasted in message extension:

:::image type="content" source="../assets/images/messaging-extension/unfurl-link.png" alt-text="unfurl link":::

![link unfurling](../assets/images/messaging-extension/link-unfurl.gif)

## Code snippets

The following code provides an example of action based for message extensions:

# [C#](#tab/dotnet)
* [SDK reference](/dotnet/api/microsoft.bot.builder.teams.teamsactivityhandler.onteamsmessagingextensionfetchtaskasync?view=botbuilder-dotnet-stable#microsoft-bot-builder-teams-teamsactivityhandler-onteamsmessagingextensionfetchtaskasync(microsoft-bot-builder-iturncontext((microsoft-bot-schema-iinvokeactivity))-microsoft-bot-schema-teams-messagingextensionaction-system-threading-cancellationtoken)&preserve-view=true)
* [Sample code reference](https://github.com/OfficeDev/Microsoft-Teams-Samples/blob/main/samples/msgext-action-preview/csharp/Bots/TeamsMessagingExtensionsActionPreviewBot.cs#L35-L56)

```csharp
     protected override Task<MessagingExtensionActionResponse> OnTeamsMessagingExtensionFetchTaskAsync(ITurnContext<IInvokeActivity> turnContext, MessagingExtensionAction action, CancellationToken cancellationToken)
        {
            // Handle different actions using switch.
            switch (action.CommandId)
            {
                case "HTML":
                    return new MessagingExtensionActionResponse
                    {
                        Task = new TaskModuleContinueResponse
                        {
                            Value = new TaskModuleTaskInfo
                            {
                                Height = 200,
                                Width = 400,
                                Title = "Task Module HTML Page",
                                Url = baseUrl + "/htmlpage.html",
                            },
                        },
                    };
                // return TaskModuleHTMLPage(turnContext, action);
                default:
                    string memberName = "";
                    var member = await TeamsInfo.GetMemberAsync(turnContext, turnContext.Activity.From.Id, cancellationToken);
                    memberName = member.Name;
                    return new MessagingExtensionActionResponse
                    {
                        Task = new TaskModuleContinueResponse
                        {
                            Value = new TaskModuleTaskInfo
                            {
                                Card = <<AdaptiveAction card json>>,
                                Height = 200,
                                Width = 400,
                                Title = $"Welcome {memberName}",
                            },
                        },
                    };
            }
```

# [Node.js](#tab/nodejs)
* [Sample code reference](https://github.com/OfficeDev/Microsoft-Teams-Samples/blob/main/samples/msgext-action/nodejs/bots/teamsMessagingExtensionsActionBot.js#L24-L61)

```javascript
// Invoked when a Messaging Extension Fetch activity is received from the connector.
    async handleTeamsMessagingExtensionFetchTask(context, action) {
        switch (action.commandId) {
            case 'Static HTML':
                return staticHtmlPage();
        }
    }

    staticHtmlPage(){
        return {
            task: {
                type: 'continue',
                value: {
                    width: 450,
                    height: 125,
                    title: 'Task module Static HTML',
                    url: `${baseurl}/StaticPage.html`
                }
            }
        };
    }
```

---

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

| **Sample name** | **Description** | **.NET** | **Node.js** | **Python** | **Manifest**|
|------------|-------------|----------------|------------|------------|------------|
| Message extension with action-based commands | This sample illustrates how to build an action-based message extension. | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/msgext-action/csharp) | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/msgext-action/nodejs) | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/msgext-action/python) |[View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/msgext-action/csharp/demo-manifest/msgext-action.zip)
| Message extension with search-based commands | This sample illustrates how to build a Search-based Message Extension. | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/msgext-search/csharp) | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/msgext-search/nodejs) | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/msgext-search/python) |[View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/msgext-search/csharp/demo-manifest/msgext-search.zip)
|Message extension action for task scheduling|This sample illustrates how to schedule a task from message extension action command and get a reminder card at a scheduled date and time.|[View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/msgext-message-reminder/csharp)|[View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/msgext-message-reminder/nodejs)| NA |[View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/msgext-message-reminder/csharp/demo-manifest/msgext-message-reminder.zip)

## Next step

> [!div class="nextstepaction"]
> [Define action message extension command](~/messaging-extensions/how-to/action-commands/define-action-command.md)

## See also

* [App capabilities mapped to features](../concepts/design/map-use-cases.md#app-capabilities-mapped-to-features)
* [Build your first message extension app using JavaScript](../sbs-gs-msgext.yml)
* [Designing your Microsoft Teams message extension](design/messaging-extension-design.md)
* [Define message extension action commands](how-to/action-commands/define-action-command.md)
* [Define message extension search commands](how-to/search-commands/define-search-command.md)
* [Add link unfurling](how-to/link-unfurling.md)
* [App manifest schema for Teams](../resources/schema/manifest-schema.md)
* [Developer Portal for Teams](../concepts/build-and-test/teams-developer-portal.md)
* [Instrumenting for Teams app specific analytics](../concepts/design/overview-analytics.md#instrumenting-for-teams-app-specific-analytics)
