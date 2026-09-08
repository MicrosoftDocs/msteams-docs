---
title: Create Search Commands for App
author: nickwalk
description: Learn about message extension search commands for Teams apps, to create a search command through app manifest and manually.
ms.topic: article
ms.author: nickwalk
ms.date: 06/23/2026
ms.localizationpriority: medium
ms.owner: slamba
---
# Define message extension search commands

[!INCLUDE [bot-based-me-note](../../../includes/messaging-extensions/bot-based-me-note.md)]

The search command is invoked from any one or both of the following locations:

* Compose message area: The buttons at the bottom of the compose message area.
* Command box: By using / in the command box. For example, **/your-app-name**. If you're using the classic Teams, search command is invoked by @mentioning in the command box. For example, **@your-app-name**.

When a search command is invoked from the compose message area, the user sends the results to the conversation. When a search command is invoked from the command box, the user interacts with the resulting card or copies it for use elsewhere.

The following image displays the invoke locations of the search command:

:::image type="content" source="~/assets/images/messaging-extension/search-command-invoke-locations.png" alt-text="Screenshot shows the invoke locations of a search command in a Teams channel.":::

## Add the search command to your app manifest

To add the search command to your [app manifest](/microsoft-365/extensibility/schema/root-compose-extensions-commands) (previously called Teams app manifest), you must add a new `composeExtensions` object to the top level of your app manifest JSON. You can add the search command by using Teams Developer CLI or by updating the manifest manually.

### Create search message extension using Teams SDK

You can create a search message extension using [Teams Developer CLI | Teams SDK](https://microsoft.github.io/teams-sdk/cli/) and [Agent Skills | Teams SDK](https://microsoft.github.io/teams-sdk/developer-tools/agent-skills).

#### Prerequisites

Before you get started, ensure that you meet the following requirements:

* [Node.js](https://nodejs.org/en) 20 or later.
* A [Microsoft 365 account for development](../../../toolkit/tools-prerequisites.md#microsoft-365-developer-program).
* A [dev environment set up for extending Teams apps across Microsoft 365.](../../../m365-apps/prerequisites.md) After you've enrolled your developer tenant in Office 365 Targeted Release, it might take a couple of days for the enrollment to take effect.
* [Teams Developer CLI | Teams SDK](https://microsoft.github.io/teams-sdk/cli/).
* (Optional) [Agent Skills | Teams SDK](https://microsoft.github.io/teams-sdk/developer-tools/agent-skills) to let your AI assistant orchestrate Teams Developer CLI workflows through natural language.

To create a search-based message extension with Teams Developer CLI, follow these steps:

1. Install Teams Developer CLI.

  ```bash
  npm install -g @microsoft/teams.cli
  ```

If you're using an AI coding assistant, install the `teams-dev` agent skill from [Agent Skills | Teams SDK](https://microsoft.github.io/teams-sdk/developer-tools/agent-skills). The skill helps your assistant orchestrate Teams Developer CLI workflows and related app management tasks through natural language.

2. Sign in to your Microsoft 365 tenant.
3. Create or open your Teams app project and configure bot-based message extension capability.
4. Using the CLI or manually, update your app manifest to add the `composeExtensions` definition for a search command.
5. Configure the command details in your manifest, including command ID, command title, command description, context in which the command works, parameter name, parameter title, parameter description, and input type.
6. Package and preview your app in Teams using Teams Developer CLI.
7. In Teams, go to a chat message and select the **Actions and apps** icon. Search for your app.
8. Select your message extension from the list and enter a search command in the search box.
9. Select an item from the list. The item unfurls into an Adaptive Card in the message compose area.
10. Select **Send**. Teams sends the search result as an Adaptive Card in the chat message.

---

### Extend bot-based message extension as agent

> [!IMPORTANT]
> Agents for Microsoft 365 Copilot are in preview and only work in Microsoft 365 Copilot in Teams.

Microsoft 365 agents provide integration with various Microsoft 365 products, such as Teams and Outlook. The integration helps users to search or create content in external systems. Message extension agents allow Microsoft 365 Copilot to interact with APIs from other software and services through a bot. We recommend that you build or upgrade your existing message extensions to maximize their usefulness and usability in Microsoft 365 Copilot. For more information, see [extend bot-based message extension as agent for Microsoft 365 Copilot](../../build-bot-based-agent.md).

## Code snippets

The following code provides an example of search-based for message extensions:

# [.NET](#tab/dotnet)

* [SDK reference](/dotnet/api/microsoft.bot.builder.teams.teamsactivityhandler.onteamsmessagingextensionqueryasync?view=botbuilder-dotnet-stable&preserve-view=true)
* [Sample code reference](https://github.com/OfficeDev/Microsoft-Teams-Samples/blob/main/samples/TeamsSDK/Archived/app-hello-world/csharp/Microsoft.Teams.Samples.HelloWorld.Web/Bots/MessageExtension.cs#L26-L59)

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

# [TypeScript](#tab/typescript)

[Sample code reference](https://github.com/OfficeDev/Microsoft-Teams-Samples/blob/main/samples/TeamsSDK/Archived/msgext-search-quickstart/js/botActivityHandler.js#L30-L53)

```TypeScript
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

* [SDK reference](/microsoftteams/platform/teams-sdk/in-depth-guides/message-extensions/search-commands?pivots=python)
* [Sample code reference](https://github.com/OfficeDev/Microsoft-Teams-Samples/blob/main/samples/TeamsSDK/bot-message-extensions/python/bot-message-extensions/main.py)

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
                r["title"],
                re.sub(r"&lt;[^&gt;]+&gt;", "", r.get("snippet", "")),
            )
            for r in results
        ]

    if not attachments:
        return MessagingExtensionResponse(
            compose_extension=MessagingExtensionResult(
                type=MessagingExtensionResultType.MESSAGE,
                text=f"No results found for '{query}'",
            )
        )

    return MessagingExtensionResponse(
        compose_extension=MessagingExtensionResult(
            type=MessagingExtensionResultType.RESULT,
            attachment_layout=MessagingExtensionAttachmentLayout.LIST,
            attachments=attachments,
        )
    )
```

---

## Code sample

| Sample name           | Description | .NET    | Node.js   | Python|
|:---------------------|:--------------|:---------|:--------|:--------------|
|Bot Message Extensions   | This sample demonstrates a search-based messaging extension in Microsoft Teams that allows users to search for Wikipedia articles. The extension supports search commands, item selection, and link unfurling. |[View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/TeamsSDK/bot-message-extensions/dotnet/bot-message-extensions)|[View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/TeamsSDK/bot-message-extensions/nodejs/bot-message-extensions)|[View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/TeamsSDK/bot-message-extensions/python/bot-message-extensions)

## Next step

> [!div class="nextstepaction"]
> [Respond to search commands](~/messaging-extensions/how-to/search-commands/respond-to-search.md).

## See also

* [Teams Developer CLI | Teams SDK](https://microsoft.github.io/teams-sdk/cli/)
* [Agent Skills | Teams SDK](https://microsoft.github.io/teams-sdk/developer-tools/agent-skills)
* [Message extensions](../../what-are-messaging-extensions.md)
