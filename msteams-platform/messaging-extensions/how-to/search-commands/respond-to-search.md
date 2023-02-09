---
title: Respond to search command
author: surbhigupta
description: Learn how to respond to the search command from a message extension in a Microsoft Teams app. Understand how to respond to the user request.
ms.topic: conceptual
ms.author: anclear
ms.localizationpriority: medium
---
# Respond to search command

[!include[v4-to-v3-SDK-pointer](~/includes/v4-to-v3-pointer-me.md)]

After the user submits the search command, your web service receives a `composeExtension/query` invoke message that contains a `value` object with the search parameters. This invoke which is triggered with the following conditions:

* As characters are entered into the search box.
* `initialRun` is set to true in your app manifest, you receive the invoke message as soon as the search command is invoked. For more information, see [default query](#default-query).

This document guides you on how to respond to user requests in the form of cards and previews, and the conditions under which Microsoft Teams issues a default query.

The request parameters are found in the `value` object in the request, which includes the following properties:

| Property name | Purpose |
|---|---|
| `commandId` | The name of the command invoked by the user, matching one of the commands declared in the app manifest. |
| `parameters` | Array of parameters. Each parameter object contains the parameter name, along with the parameter value provided by the user. |
| `queryOptions` | Pagination parameters: <br>`skip`: Skip count for this query <br>`count`: Number of elements to return. |

# [C#/.NET](#tab/dotnet)

* [SDK reference](/dotnet/api/microsoft.bot.builder.teams.teamsactivityhandler.onteamsmessagingextensionqueryasync?view=botbuilder-dotnet-stable#microsoft-bot-builder-teams-teamsactivityhandler-onteamsmessagingextensionqueryasync(microsoft-bot-builder-iturncontext((microsoft-bot-schema-iinvokeactivity))-microsoft-bot-schema-teams-messagingextensionquery-system-threading-cancellationtoken)&preserve-view=true)
* [Sample code reference](https://github.com/OfficeDev/Microsoft-Teams-Samples/blob/main/samples/msgext-link-unfurling/csharp/Bots/LinkUnfurlingBot.cs#L32)

```csharp
protected override async Task<MessagingExtensionResponse> OnTeamsMessagingExtensionQueryAsync(ITurnContext<IInvokeActivity> turnContext, MessagingExtensionQuery query, CancellationToken cancellationToken)
{
  // Code to handle the query.
}
```

# [TypeScript/Node.js](#tab/typescript)

* [Sample code reference](https://github.com/OfficeDev/Microsoft-Teams-Samples/blob/main/samples/msgext-search/nodejs/bots/teamsMessagingExtensionsSearchBot.js#L16)

```typescript
class TeamsMessagingExtensionsSearch extends TeamsActivityHandler {
    async handleTeamsMessagingExtensionQuery(context, query) {
  // Code to handle the query.
    }
}
```

# [JSON](#tab/json)

The JSON below is shortened to highlight the most relevant sections.

```json
{
  "type": "invoke",
  "name": "composeExtension/query",
  "value": {
    "commandId": "searchCmd",
    "parameters": [
      {
        "name": "searchKeywords",
        "value": "Toronto"
      }
    ],
    "queryOptions": {
      "skip": 0,
      "count": 25
    }
  },
...
}
```

* * *

## Respond to user requests

When the user performs a query, Microsoft Teams issues a synchronous HTTP request to your service. At that point, your code has `5` seconds to provide an HTTP response to the request. During this time, your service can perform additional lookup, or any other business logic needed to serve the request.

Your service must respond with the results matching the user query. The response must indicate an HTTP status code of `200 OK` and a valid application or JSON object with the following properties:

|Property name|Purpose|
|---|---|
|`composeExtension`|Top-level response envelope.|
|`composeExtension.type`|Type of response. The following types are supported: <br>`result`: Displays a list of search results <br>`auth`: Prompts the user to authenticate <br>`config`: Prompts the user to set up the message extension <br>`message`: Displays a plain text message |
|`composeExtension.attachmentLayout`|Specifies the layout of the attachments. Used for responses of type `result`. <br>Currently, the following types are supported: <br>`list`: A list of card objects containing thumbnail, title, and text fields <br>`grid`: A grid of thumbnail images |
|`composeExtension.attachments`|Array of valid attachment objects. Used for responses of type `result`. <br>Currently, the following types are supported: <br>`application/vnd.microsoft.card.thumbnail` <br>`application/vnd.microsoft.card.hero` <br>`application/vnd.microsoft.teams.card.o365connector` <br>`application/vnd.microsoft.card.adaptive`|
|`composeExtension.suggestedActions`|Suggested actions. Used for responses of type `auth` or `config`. |
|`composeExtension.text`|Message to display. Used for responses of type `message`. |

### Response card types and previews

Teams supports the following card types:

* [Thumbnail card](~/task-modules-and-cards/cards/cards-reference.md#thumbnail-card)
* [Hero card](~/task-modules-and-cards/cards/cards-reference.md#hero-card)
* [Connector card for Microsoft 365 Groups](~/task-modules-and-cards/cards/cards-reference.md#connector-card-for-microsoft-365-groups)
* [Adaptive Card](~/task-modules-and-cards/cards/cards-reference.md#adaptive-card)

To have a better understanding and overview on cards, see [what are cards](~/task-modules-and-cards/what-are-cards.md).

To learn how to use the thumbnail and hero card types, see [add cards and card actions](~/task-modules-and-cards/cards/cards-actions.md).

For additional information about the connector card for Microsoft 365 Groups, see [Using connector cards for Microsoft 365 Groups](~/task-modules-and-cards/cards/cards-reference.md#connector-card-for-microsoft-365-groups).

The result list is displayed in the Microsoft Teams UI with a preview of each item. The preview is generated in one of the two ways:

* Using the `preview` property within the `attachment` object. The `preview` attachment can only be a Hero or a Thumbnail card.
* Extracting from the basic `title`, `text`, and `image` properties of the `attachment` object. The basic properties are used only if the `preview` property isn't specified.

For Hero or Thumbnail card, except the invoke action other actions such as button and tap aren't supported in the preview card.

To send an Adaptive Card or connector card for Microsoft 365 Groups, you must include a preview. The `preview` property must be a Hero or Thumbnail card. If you don't specify the preview property in the `attachment` object, a preview isn't generated.

For Hero and Thumbnail cards, you don't need to specify a preview property, a preview is generated by default.

### Response example

# [C#/.NET](#tab/dotnet)

```csharp
protected override async Task<MessagingExtensionResponse> OnTeamsMessagingExtensionQueryAsync(ITurnContext<IInvokeActivity> turnContext, MessagingExtensionQuery query, CancellationToken cancellationToken) 
{
  var text = query?.Parameters?[0]?.Value as string ?? string.Empty;

  // Searches NuGet for a package.
  var obj = JObject.Parse(await (new HttpClient()).GetStringAsync($"https://azuresearch-usnc.nuget.org/query?q=id:{text}&prerelease=true"));
  var packages = obj["data"].Select(item => (item["id"].ToString(), item["version"].ToString(), item["description"].ToString()));

  // We take every row of the results and wrap them in cards wrapped in in MessagingExtensionAttachment objects.
  // The Preview is optional, if it includes a Tap, that will trigger the OnTeamsMessagingExtensionSelectItemAsync event back on this bot.
  var attachments = packages.Select(package => new MessagingExtensionAttachment
      {
          ContentType = HeroCard.ContentType,
          Content = new HeroCard { Title = package.Item1 },
          Preview = new HeroCard { Title = package.Item1, Tap = new CardAction { Type = "invoke", Value = package } }.ToAttachment()
      })
      .ToList();

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

# [TypeScript/Node.js](#tab/typescript)

* [Sample code reference](https://github.com/OfficeDev/Microsoft-Teams-Samples/blob/main/samples/msgext-search-quickstart/js/botActivityHandler.js#L35)

```typescript
class TeamsMessagingExtensionsSearchBot extends TeamsActivityHandler {
    async handleTeamsMessagingExtensionQuery(context, query) {
        const searchQuery = query.parameters[0].value;
        const response = await axios.get(`http://registry.npmjs.com/-/v1/search?${ querystring.stringify({ text: searchQuery, size: 8 }) }`);

        const attachments = [];
        response.data.objects.forEach(obj => {
            const heroCard = CardFactory.heroCard(obj.package.name);
            const preview = CardFactory.heroCard(obj.package.name);
            const attachment = { ...heroCard, preview };
            attachments.push(attachment);
        });

        return {
            composeExtension: {
                type: 'result',
                attachmentLayout: 'list',
                attachments: attachments
            }
        };
    }
}
```

# [JSON](#tab/json)

```json
{
  "composeExtension": {
    "type": "result",
    "attachmentLayout": "list",
    "attachments": [
      {
        "contentType": "application/vnd.microsoft.teams.card.o365connector",
        "content": {
          "sections": [
            {
              "activityTitle": "[85069]: Create a cool app",
              "activityImage": "https://placekitten.com/200/200"
            },
            {
              "title": "Details",
              "facts": [
                {
                  "name": "Assigned to:",
                  "value": "[Larry Brown](mailto:larryb@example.com)"
                },
                {
                  "name": "State:",
                  "value": "Active"
                }
              ]
            }
          ]
        },
        "preview": {
          "contentType": "application/vnd.microsoft.card.thumbnail",
          "content": {
            "title": "85069: Create a cool app",
            "images": [
              {
                "url": "https://placekitten.com/200/200"
              }
            ]
          }
        }
      },
      {
        "contentType": "application/vnd.microsoft.card.adaptive",
        "content": {
          "type": "AdaptiveCard",
          "body": [
            {
              "type": "Container",
              "items": [
                {
                  "type": "TextBlock",
                  "text": "Microsoft Corp (NASDAQ: MSFT)",
                  "size": "medium",
                  "isSubtle": true
                },
                {
                  "type": "TextBlock",
                  "text": "September 19, 4:00 PM EST",
                  "isSubtle": true
                }
              ]
            },
            {
              "type": "Container",
              "spacing": "none",
              "items": [
                {
                  "type": "ColumnSet",
                  "columns": [
                    {
                      "type": "Column",
                      "width": "stretch",
                      "items": [
                        {
                          "type": "TextBlock",
                          "text": "75.30",
                          "size": "extraLarge"
                        },
                        {
                          "type": "TextBlock",
                          "text": "▼ 0.20 (0.32%)",
                          "size": "small",
                          "color": "attention",
                          "spacing": "none"
                        }
                      ]
                    },
                    {
                      "type": "Column",
                      "width": "auto",
                      "items": [
                        {
                          "type": "FactSet",
                          "facts": [
                            {
                              "title": "Open",
                              "value": "62.24"
                            },
                            {
                              "title": "High",
                              "value": "62.98"
                            },
                            {
                              "title": "Low",
                              "value": "62.20"
                            }
                          ]
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ],
          "version": "1.0"
        },
        "preview": {
          "contentType": "application/vnd.microsoft.card.thumbnail",
          "content": {
            "title": "Microsoft Corp (NASDAQ: MSFT)",
            "text": "75.30 ▼ 0.20 (0.32%)"
          }
        }
      }
    ]
  }
}
```

* * *

### Enable and handle tap actions

# [C#/.NET](#tab/dotnet)

* [Sample code reference](https://github.com/OfficeDev/Microsoft-Teams-Samples/blob/main/samples/msgext-search/csharp/Bots/TeamsMessagingExtensionsSearchBot.cs#L80)

```csharp
protected override Task<MessagingExtensionResponse> OnTeamsMessagingExtensionSelectItemAsync(ITurnContext<IInvokeActivity> turnContext, JObject query, CancellationToken cancellationToken)
{
    // The Preview card's Tap should have a Value property assigned, this will be returned to the bot in this event.
    var (packageId, version, description, projectUrl, iconUrl) = query.ToObject<(string, string, string, string, string)>();

    var card = new ThumbnailCard
    {
        Title = "Card Select Item",
        Subtitle = description
    };

    var attachment = new MessagingExtensionAttachment
    {
        ContentType = ThumbnailCard.ContentType,
        Content = card,
    };

    return Task.FromResult(new MessagingExtensionResponse
    {
        ComposeExtension = new MessagingExtensionResult
        {
            Type = "result",
            AttachmentLayout = "list",
            Attachments = new List<MessagingExtensionAttachment> { attachment }
        }
    });
}
```

# [TypeScript/Node.js](#tab/typescript)

* [Sample code reference](https://github.com/OfficeDev/Microsoft-Teams-Samples/blob/main/samples/msgext-search/nodejs/bots/teamsMessagingExtensionsSearchBot.js#L115)

```typescript
async handleTeamsMessagingExtensionSelectItem(context, obj) {
        return {
            composeExtension: {
                  type: 'result',
                  attachmentLayout: 'list',
                  attachments: [CardFactory.thumbnailCard(obj.Item3)]
            }
        };
    } 
```

# [JSON](#tab/json)

```json
{
    "name": "composeExtension/selectItem",
    "type": "invoke",
    "value": {
        "Item1": "Package_Name",
        "Item2": "Version",
        "Item3": "Package Description"
    },
    .
    .
    .
}
```

* * *

> [!NOTE]
> `OnTeamsMessagingExtensionSelectItemAsync` is not triggered in mobile Teams application.

## Default query

If you set `initialRun` to `true` in the manifest, Microsoft Teams issues a **default** query when the user first opens the message extension. Your service can respond to this query with a set of pre-populated results. This is useful when your search command requires authentication or configuration, displaying recently viewed items, favorites, or any other information that isn't dependent on user input.

The default query has the same structure as any regular user query, with the `name` field set to `initialRun` and `value` set to `true` as shown in the following object:

```json
{
  "type": "invoke",
  "name": "composeExtension/query",
  "value": {
    "commandId": "searchCmd",
    "parameters": [
      {
        "name": "initialRun",
        "value": "true"
      }
    ],
    "queryOptions": {
      "skip": 0,
      "count": 25
    }
  },
  ⋮
}
```

## Code sample

| Sample name           | Description | .NET    | Node.js   | Manifest
|:---------------------|:--------------|:---------|:--------|:--------|
|Teams message extension search   |  Describes how to define search commands and respond to searches.        |[View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/msgext-search/csharp)|[View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/msgext-search/nodejs)|[View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/msgext-search/csharp/demo-manifest/msgext-search.zip)
|Teams Message extension auth and config | A Message Extension that has a configuration page, accepts search requests, and returns results after the user has signed in. It also showcase zero app install link unfurling along with normal link unfurling |[View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/msgext-search-auth-config/csharp)|[View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/msgext-search-sso-config/nodejs)|[View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/msgext-search-auth-config/csharp/demo-manifest/msgext-search-auth-config.zip)

## Next step

> [!div class="nextstepaction"]
> [Add authentication to a message extension](~/messaging-extensions/how-to/add-authentication.md)

## See also

* [Message extensions](../../what-are-messaging-extensions.md)
* [Build your first tab app using JavaScript](../../../sbs-gs-javascript.yml)
* [composeExtensions](../../../resources/schema/manifest-schema.md#composeextensions)
