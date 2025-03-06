---
title: Respond to Search Command in Teams
author: surbhigupta
description: Learn how to respond to the search command from a message extension in a Microsoft Teams app. Understand how to respond to the user request.
ms.topic: conceptual
ms.author: anclear
ms.date: 03/06/2025
ms.localizationpriority: medium
---
# Respond to search command

[!include[v4-to-v3-SDK-pointer](~/includes/v4-to-v3-pointer-me.md)]

After the user submits the search command, your web service receives a `composeExtension/query` invoke message that contains a `value` object with the search parameters. The invoke is triggered with the following conditions:

* As characters are entered into the search box.
* `initialRun` is set to true in your [app manifest](../../../resources/schema/manifest-schema.md#composeextensions) and you receive the invoke message as soon as the search command is invoked. For more information, see [default query](#default-query).

This document guides you on how to respond to user requests in the form of cards and previews, and the conditions under which Microsoft Teams issues a default query.

The request parameters are found in the `value` object in the request, which includes the following properties:

| Property name | Purpose |
|---|---|
| `commandId` | The name of the command invoked by the user, matching one of the commands declared in the app manifest. |
| `parameters` | Array of parameters. Each parameter object contains the parameter name, along with the parameter value provided by the user. |
| `queryOptions` | Pagination parameters: <br>`skip`: Skip count for this query <br>`count`: Number of elements to return. |

# [C#/.NET](#tab/dotnet)

* [SDK reference](/dotnet/api/microsoft.bot.builder.teams.teamsactivityhandler.onteamsmessagingextensionqueryasync?view=botbuilder-dotnet-stable&preserve-view=true)
* [Sample code reference](https://github.com/OfficeDev/Microsoft-Teams-Samples/blob/main/samples/msgext-link-unfurling/csharp/Bots/LinkUnfurlingBot.cs#L32)

```csharp
protected override async Task<MessagingExtensionResponse> OnTeamsMessagingExtensionQueryAsync(ITurnContext<IInvokeActivity> turnContext, MessagingExtensionQuery query, CancellationToken cancellationToken)
{
  // Code to handle the query.
}
```

# [TypeScript/Node.js](#tab/typescript)

[Sample code reference](https://github.com/OfficeDev/Microsoft-Teams-Samples/blob/main/samples/msgext-search/nodejs/bots/teamsMessagingExtensionsSearchBot.js#L16)

```typescript
class TeamsMessagingExtensionsSearch extends TeamsActivityHandler {
    async handleTeamsMessagingExtensionQuery(context, query) {
  // Code to handle the query.
    }
}
```

# [JSON](#tab/json)

The following JSON is shortened to highlight the most relevant sections.

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

When the user performs a query, Microsoft Teams issues a synchronous HTTP request to your service. At that point, your code has `5` seconds to provide an HTTP response to the request. During this time, your service can perform more lookup, or any other business logic needed to serve the request.

Your service must respond with the results matching the user query. The response must indicate an HTTP status code of `200 OK` and a valid application or JSON object with the following properties:

|Property name|Purpose|
|---|---|
|`composeExtension`|Top-level response envelope.|
|`composeExtension.type`|Type of response. The following types are supported: <br>`result`: Displays a list of search results <br>`auth`: Prompts the user to authenticate <br>`config`: Prompts the user to set up the message extension <br>`message`: Displays a plain text message |
|`composeExtension.attachmentLayout`|Specifies the layout of the attachments. Used for responses of type `result`. <br>The following types are supported: <br>`list`: A list of card objects containing thumbnail, title, and text fields <br>`grid`: A grid of thumbnail images |
|`composeExtension.attachments`|Array of valid attachment objects. Used for responses of type `result`. <br>The following types are supported: <br>`application/vnd.microsoft.card.thumbnail` <br>`application/vnd.microsoft.card.hero` <br>`application/vnd.microsoft.teams.card.o365connector` <br>`application/vnd.microsoft.card.adaptive`|
|`composeExtension.suggestedActions`|Suggested actions. Used for responses of type `auth` or `config`. |
|`composeExtension.text`|Message to display. Used for responses of type `message`. |

### Configuration response

Configuration response is the data returned by the server or application to configure and enable the message extension within the messaging platform. The following code is an example for message extension configuration:

```json
{
    "name": "composeExtension/submitAction",
    "type": "invoke",
    "timestamp": "2024-03-08T14:10:47.575Z",
    "localTimestamp": "2024-03-08T19:40:47.575+05:30",
    "id": "f:7dfe18de-94e3-9f38-5d44-adeb31cd8243",
    "channelId": "msteams",
    "serviceUrl": "https://smba.trafficmanager.net/amer/",
    "from": {
        "id": "29:1PBlnIsEROUYzpFjULDVodMHrnpujmfhBdQAf0pcO1EkaDkhI0_Pj_ql-jZUYOGdSc3_KcqaIIjzbleraVJ2Z3g",
        "name": "MOD Administrator",
        "aadObjectId": "ce9def33-d7fc-444c-8728-be1f95e6b6f2"
    },
    "conversation": {
        "isGroup": true,
        "conversationType": "groupChat",
        "tenantId": "4ad59956-0f88-4b88-a9d0-570b6eb4e66b",
        "id": "19:1dd50ba7-e5bd-46ea-b34e-80a415148de7_ce9def33-d7fc-444c-8728-be1f95e6b6f2@unq.gbl.spaces"
    },
    "recipient": {
        "id": "28:9a2b01fc-88c1-40e1-bf87-5079c8e35626",
        "name": "PSDAzureBot"
    },
    "entities": [
        {
            "locale": "en-GB",
            "country": "GB",
            "platform": "Web",
            "timezone": "Asia/Calcutta",
            "type": "clientInfo"
        }
    ],
    "channelData": {
        "tenant": {
            "id": "4ad59956-0f88-4b88-a9d0-570b6eb4e66b"
        },
        "source": {
            "name": "compose"
        }
    },
    "value": {
        "commandId": "razorView",
        "commandContext": "compose",
        "data": {
            "Title": "Welcome to RazorView!",
            "DisplayData": " Today&#x27;s date is 8-3-2024, Friday"
        },
        "context": {
            "theme": "default"
        }
    },
    "locale": "en-GB",
    "localTimezone": "Asia/Calcutta"
}
```

The following response is the configuration response that appears when the user interacts with the compose extension:

```json
{
    "composeExtension": {
        "type": "config",
        "suggestedActions": {
            "actions": [
                {
                    "type": "openUrl",
                    "value": "https://7a03-2405-201-a00c-7191-b472-ff64-112d-f806.ngrok-free.app"
                }
            ]
        }
    }
}
```

:::image type="content" source="../../../assets/images/configuration-response-me.png" alt-text="The screenshot shows the configuration response for message extension.":::

### Response card types and previews

> [!NOTE]
> Message extension search results don't support padding.

Teams supports the following card types:

* [Thumbnail card](~/task-modules-and-cards/cards/cards-reference.md#thumbnail-card)
* [Hero card](~/task-modules-and-cards/cards/cards-reference.md#hero-card)
* [Connector card for Microsoft 365 Groups](~/task-modules-and-cards/cards/cards-reference.md#connector-card-for-microsoft-365-groups)
* [Adaptive Card](~/task-modules-and-cards/cards/cards-reference.md#adaptive-card)

To have a better understanding and overview on cards, see [what are cards](~/task-modules-and-cards/what-are-cards.md).

To learn how to use the thumbnail and hero card types, see [add cards and card actions](~/task-modules-and-cards/cards/cards-actions.md).

For more information about the connector card for Microsoft 365 Groups, see [Using connector cards for Microsoft 365 Groups](~/task-modules-and-cards/cards/cards-reference.md#connector-card-for-microsoft-365-groups).

The result list is displayed in the Microsoft Teams UI with a preview of each item. The preview is generated in one of the two ways:

* Using the `preview` property within the `attachment` object. The `preview` attachment can only be a Hero or a Thumbnail card.
* Extracting from the basic `title`, `text`, and `image` properties of the `attachment` object. The basic properties are used only if the `preview` property isn't specified.

For Hero or Thumbnail card, except the invoke action other actions such as button and tap aren't supported in the preview card.

To send an Adaptive Card or connector card for Microsoft 365 Groups, you must include a preview. The `preview` property must be a Hero or Thumbnail card. If you don't specify the preview property in the `attachment` object, a preview isn't generated.

For Hero and Thumbnail cards, you don't need to specify a preview property, a preview is generated by default.

### Response example

# [.NET](#tab/dotnet)

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

[Sample code reference](https://github.com/OfficeDev/Microsoft-Teams-Samples/blob/main/samples/msgext-search-quickstart/js/botActivityHandler.js#L35)

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

# [Python](#tab/python)

```python
async def on_teams_messaging_extension_query(self, context, query):
    search_query = query.parameters[0].value

    response = requests.get(
        "http://registry.npmjs.com/-/v1/search",
        params={"text": search_query, "size": 8},  # Limit results to top 8
    )
    response.raise_for_status()  # Raise an error if the API call fails
    data = response.json()  # Parse the JSON response from the API

    attachments = []
    for obj in data["objects"][:8]:  # Iterate through the first 5 search results
        package = obj.get("package", {})
        package_name = package.get("name", "Unknown Package")  # Fallback if name is missing
        description = package.get("description", "No description available")  # Fallback for missing description
        homepage = package.get("links", {}).get("homepage", "https://www.npmjs.com")  # Default link

        thumbnail_card = ThumbnailCard(
            title=package_name,  # Package name as card title
            text=description,  # Package description
            buttons=[
                # Button to view the package on NPM
                CardAction(
                    type="openUrl",
                    title="View on NPM",
                    value=f"https://www.npmjs.com/package/{package_name}",
                ),
                # Button to visit the package's homepage
                CardAction(
                    type="openUrl",
                    title="Homepage",
                    value=homepage,
                ),
            ],
        )

        preview_card = ThumbnailCard(
            title=package_name,
            text=description,
        )
        preview_attachment = CardFactory.thumbnail_card(preview_card)

        preview_attachment.content.tap = CardAction(
            type="invoke",  # Invoke action triggers a bot command
            value={"title": package_name, "description": description},
        )

        attachment = MessagingExtensionAttachment(
            content=thumbnail_card,
            content_type=CardFactory.content_types.thumbnail_card,
            preview=preview_attachment,
        )

        attachments.append(attachment)

    return MessagingExtensionResponse(
        compose_extension=MessagingExtensionResult(
            type="result",  # Indicates this is a list of results
            attachment_layout="list",  # Layout style for results
            attachments=attachments,
        )
    )
```

* * *

### Enable and handle tap actions

# [.NET](#tab/csharp)

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

# [Python](#tab/python1)

```python
async def on_teams_messaging_extension_select_item(
    self, turn_context: TurnContext, query
) -> MessagingExtensionResponse:
    
    thumbnail_card = ThumbnailCard(
        title=query.get("title"),  # Extract title from the query
        text=query.get("description"),  # Extract description from the query
    )

    attachment = MessagingExtensionAttachment(
        content_type=CardFactory.content_types.thumbnail_card,
        content=thumbnail_card,
    )

    return MessagingExtensionResponse(
        compose_extension=MessagingExtensionResult(
            type="result",  # Indicates this is a single result
            attachment_layout="list",  # Use list layout
            attachments=[attachment],  # Include the single attachment
        )
    )
```

* * *

## Default query

If you set `initialRun` to `true` in the manifest, Microsoft Teams issues a **default** query when the user first opens the message extension. Your service can respond to this query with a set of prepopulated results. This is useful when your search command requires authentication or configuration, displaying recently viewed items, favorites, or any other information that isn't dependent on user input.

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

| Sample name           | Description | .NET    | Node.js   | Manifest|
|:---------------------|:--------------|:---------|:--------|:--------|
|Teams message extension search   |  This sample shows how to build a Search-based Message Extension. It searches nudget packages and displays the results in search based messaging extension.|[View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/msgext-search/csharp)|[View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/msgext-search/nodejs)|[View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/msgext-search/csharp/demo-manifest/msgext-search.zip)
|Teams message extension auth and config | This sample shows a message extension that has a configuration page, accepts search requests, and returns results after the user signs in. It also showcases zero app install link unfurling along with normal link unfurling |[View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/msgext-search-auth-config/csharp)|[View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/msgext-search-sso-config/nodejs)|[View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/msgext-search-auth-config/csharp/demo-manifest/msgext-search-auth-config.zip)

## Next step

> [!div class="nextstepaction"]
> [Add third party authentication to message extension](~/messaging-extensions/how-to/add-authentication.md)

## See also

* [Message extensions](../../what-are-messaging-extensions.md)
* [Build your first tab app using JavaScript](../../../sbs-gs-javascript.yml)
