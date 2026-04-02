---
title: Create Search Commands for App
author: vikasalmal
description: Learn about message extension search commands for Teams apps, to create a search command through app manifest and manually.
ms.topic: article
ms.author: anclear
ms.date: 04/02/2026
ms.localizationpriority: medium
ms.owner: slamba
---
# Define message extension search commands

[!INCLUDE [bot-based-me-note](../../../includes/messaging-extensions/bot-based-me-note.md)]

The search command is invoked from any one or both of the following locations:

* Compose message area: The buttons at the bottom of the compose message area.
* Command box: By using / in the command box. For example, **/your-app-name**. If you're using the classic Teams, search command is invoked by @mentioning in the command box. For example, **@your-app-name**.

When a search command is invoked from the compose message area, the user sends the results to the conversation. When a search command invoked from the command box, the user interacts with the resulting card, or copies it for use elsewhere.

The following image displays the invoke locations of the search command:

:::image type="content" source="~/assets/images/messaging-extension/search-command-invoke-locations.png" alt-text="Screenshot shows the invoke locations of a search command in a Teams channel.":::

## Add the search command to your app manifest

To add the search command to your [app manifest](/microsoft-365/extensibility/schema/root-compose-extensions-commands) (previously called Teams app manifest), you must add a new `composeExtensions` object to the top level of your app manifest JSON. You can add the search command either with the help of Developer Portal or manually.

### Create search message extension using Teams SDK

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

* [SDK reference](https://microsoft.github.io/teams-sdk/csharp/in-depth-guides/message-extensions/search-commands/)
* [Sample code reference](https://github.com/OfficeDev/Microsoft-Teams-Samples/blob/main/samples/bot-message-extensions/dotnet/bot-message-extensions/Program.cs)

```csharp
teams.OnQuery(async (ctx) => 
{ 
    var commandId = ctx.Activity.Value.CommandId; 
    var parameters = ctx.Activity.Value.Parameters; 
    var query = parameters?.FirstOrDefault()?.Value?.ToString() ?? ""; 
 
    Console.WriteLine($"Query: command={commandId}, query={query}"); 
 
    var attachments = new List<MsgExt.Attachment>(); 
 
    // Route to appropriate search 
    if (commandId == "wikipediaSearch") 
    { 
        var results = await SearchWikipedia(query); 
        attachments = results.Select(r => 
        { 
            var title = r["title"]?.ToString() ?? "No Title"; 
            var snippet = Regex.Replace(r["snippet"]?.ToString() ?? "", "<[^>]+>", ""); 
            return CreateAttachment(CreateWikipediaCard(r), title, snippet); 
        }).ToList(); 
    } 
 
    if (attachments.Count == 0) 
    { 
        return new MsgExt.Response 
        { 
            ComposeExtension = new MsgExt.Result 
            { 
                Type = MsgExt.ResultType.Message, 
                Text = $"No results found for '{query}'" 
            } 
        }; 
    } 
 
    return new MsgExt.Response 
    { 
        ComposeExtension = new MsgExt.Result 
        { 
            Type = MsgExt.ResultType.Result, 
            AttachmentLayout = Attachment.Layout.List, 
            Attachments = attachments 
        } 
    }; 
});
```

# [Node.js](#tab/nodejs)

* [SDK reference](https://microsoft.github.io/teams-sdk/typescript/in-depth-guides/message-extensions/search-commands/)

* [Sample code reference](https://github.com/OfficeDev/Microsoft-Teams-Samples/blob/main/samples/bot-message-extensions/nodejs/bot-message-extensions/index.ts)

```javascript
app.on('message.ext.query', async ({ activity }) => { 
  const commandId = activity.value?.commandId 
  const params = activity.value?.parameters || [] 
  const query = params[0]?.value || '' 
  console.log(`Query: command=${commandId}, query=${query}`) 
  let attachments: MessagingExtensionAttachment[] = [] 
 
  if (commandId === 'wikipediaSearch') { 
    const results = await searchWikipedia(query) 
    attachments = results.map((r: any) => 
      createAttachment( 
        createWikipediaCard(r), 
        r.title, 
        (r.snippet || '').replace(/<[^>]+>/g, '') 
      ) 
    ) 
  } 
 
  if (!attachments.length) { 
    return { 
      composeExtension: { 
        type: 'message', 
        text: `No results found for '${query}'`, 
      }, 
    } 
  } 
 
  return { 
    composeExtension: { 
      type: 'result', 
      attachmentLayout: 'list', 
      attachments, 
    }, 
  } 
})
```

# [Python](#tab/python)

* [SDK reference](https://microsoft.github.io/teams-sdk/python/in-depth-guides/message-extensions/search-commands/)
* [Sample code reference](https://github.com/OfficeDev/Microsoft-Teams-Samples/blob/main/samples/bot-message-extensions/python/bot-message-extensions/main.py)

```python
@app.on_message_ext_query 
async def handle_query(ctx: ActivityContext[MessageExtensionQueryInvokeActivity]): 
    command_id = ctx.activity.value.command_id 
    params = ctx.activity.value.parameters or [] 
    query = params[0].value if params else "" 
 
    print(f"Query: command={command_id}, query={query}") 
 
    # Route to appropriate search 
    if command_id == "wikipediaSearch": 
        results = await search_wikipedia(query) 
        attachments = [ 
            create_attachment( 
                create_wikipedia_card(r), 
                r['title'], 
                re.sub(r'<[^>]+>', '', r.get('snippet', '')) 
            ) 
            for r in results 
        ] 
 
    if not attachments: 
        return MessagingExtensionInvokeResponse( 
            compose_extension=MessagingExtensionResult( 
                type=MessagingExtensionResultType.MESSAGE, 
                text=f"No results found for '{query}'" 
            ) 
        ) 
 
    return MessagingExtensionInvokeResponse( 
        compose_extension=MessagingExtensionResult( 
            type=MessagingExtensionResultType.RESULT, 
            attachment_layout=AttachmentLayout.LIST, 
            attachments=attachments 
        ) 
    )
```

---

## Code sample

| Sample name           | Description | .NET    | Node.js   | Python|
|:---------------------|:--------------|:---------|:--------|:--------------|
|Teams message extension search   | This sample demonstrates a search-based messaging extension in Microsoft Teams that allows users to search for Wikipedia articles. The extension supports search commands, item selection, and link unfurling. |[View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/TeamsSDK/bot-message-extensions/dotnet/bot-message-extensions)|[View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/TeamsSDK/samples/bot-message-extensions/nodejs/bot-message-extensions)|[View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/TeamsSDK/samples/bot-message-extensions/python/bot-message-extensions)

## Next step

> [!div class="nextstepaction"]
> [Respond to search commands](~/messaging-extensions/how-to/search-commands/respond-to-search.md).

## See also

* [Developer Portal for Teams](../../../concepts/build-and-test/teams-developer-portal.md)
* [Message extensions](../../what-are-messaging-extensions.md)
