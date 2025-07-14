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

# [C#/.NET](#tab/dotnet1)

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

# [Python](#tab/python)

* [SDK reference](/python/api/botbuilder-core/botbuilder.core.teams.teamsactivityhandler?view=botbuilder-py-latest#botbuilder-core-teams-teamsactivityhandler-on-teams-messaging-extension-query)
[Sample code reference](https://github.com/OfficeDev/Microsoft-Teams-Samples/blob/5e1d0e4c28a8b2c2205aaa8004e40a99f6bdbd58/samples/msgext-search/python/bots/search_based_messaging_extension.py#L18)

```python
class SearchBasedMessagingExtension(TeamsActivityHandler):
    async def on_teams_messaging_extension_query(
        self, turn_context: TurnContext, query: MessagingExtensionQuery
    ):
    // Code to handle the query.
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

When the user performs a query, Microsoft Teams issues a synchronous HTTP request to your service. At that point, your code has five seconds to provide an HTTP response to the request. During this time, your service can perform more lookups, or any other business logic needed to serve the request.

Your service must respond with the results matching the user query. The response must indicate an HTTP status code of `200 OK` and a valid application or JSON object with the following properties:

|Property name|Purpose|
|---|---|
|`composeExtension`|Top-level response envelope.|
|`composeExtension.type`|Type of response. The following types are supported: <br>`result`: Displays a list of search results <br>`auth`: Prompts the user to authenticate <br>`config`: Prompts the user to set up the message extension <br>`message`: Displays a plain text message |
|`composeExtension.attachmentLayout`|Specifies the layout of the attachments. Used for responses of type `result`. <br>The following types are supported: <br>`list`: A list of card objects containing thumbnail, title, and text fields <br>`grid`: A grid of thumbnail images |
|`composeExtension.attachments`|Array of valid attachment objects. Used for responses of type `result`. <br>The following types are supported: <br>`application/vnd.microsoft.card.thumbnail` <br>`application/vnd.microsoft.card.hero` <br>`application/vnd.microsoft.teams.card.o365connector` <br>`application/vnd.microsoft.card.adaptive`|
|`composeExtension.suggestedActions`|Suggested actions. Used for responses of type `auth` or `config`. |
|`composeExtension.text`|Message to display. Used for responses of type `message`. |

### config response

The `config` response is the data returned by the server or the app to configure and enable the message extension within the messaging platform. When a user configures the message extension for the first time, a `config` response is used to prompt the user to set up the message extension and provide any necessary configuration.

The following code snippet shows the `config` response that appears when the user interacts with the message extension:

```json
{
    "composeExtension": {
        "suggestedActions": {
            "actions": [
                {
                    "type": "openUrl",
                    "title": "Open URL",
                    "value": "https://<your-subdomain>"
                }
            ]
        },
        "type": "config"
    },
    "responseType": "composeExtension"
}
```

The `config` response includes:

* The `value` property that contains a URL to open a configuration page in a Teams dialog, which allows users to input necessary details and submit the configuration. Few examples of the `value` property are:
  * `https://<your-subdomain>.ngrok-free.app/searchSettings.html`
  * `https://<your-subdomain>.devtunnels.ms/searchSettings.html`.
* The `type` field within `composeExtension` set to `config`, indicating the nature of this response as a configuration.
* The `responseType` that identifies this response is for the `composeExtension` of the app.

:::image type="content" source="../../../assets/images/configuration-response-me.png" alt-text="The screenshot shows the configuration response for message extension.":::

Initialize the Teams SDK on the configuration page and use `authentication.notifySuccess()` to send the collected configuration data back to Teams. `submitConfig()` function demonstrates how to structure and return configuration values after the user completes the setup process.

To complete the message extension configuration flow:

1. The URL provided in the `value` property must host a webpage that opens the URL as a Teams dialog when the message extension configuration is triggered.
2. If authentication is required, the page must use Teams authentication and call `authentication.notifySuccess()` upon successful sign-in.
3. After collecting user input, the page must notify Teams of the successful setup by calling `notifySuccess(configData)` that sends the configuration values back to Teams:

      ```javascript
        microsoftTeams.app.initialize();
        
        function submitConfig() {
            const configData = {
                setting1: "User-selected value",
                setting2: "Another value"
            };
        
            microsoftTeams.authentication.notifySuccess(configData);
        }
      ```

4. Once `notifySuccess()` is executed, the configuration window automatically closes and the message extension is set up successfully.

### `result` response type

The result list is displayed in the Microsoft Teams UI with a preview of each item. The preview is generated in one of the two ways:

* Using the `preview` property within the `attachment` object. The `preview` attachment can only be a Hero or a Thumbnail card.
* Extracting from the basic `title`, `text`, and `image` properties of the `attachment` object. The basic properties are used only if the `preview` property isn't specified.

> [!NOTE]
> Message extension search results don't support padding.

Teams supports the following card types:

* [Thumbnail card](~/task-modules-and-cards/cards/cards-reference.md#thumbnail-card)
* [Hero card](~/task-modules-and-cards/cards/cards-reference.md#hero-card)
* [Connector card for Microsoft 365 Groups](~/task-modules-and-cards/cards/cards-reference.md#connector-card-for-microsoft-365-groups)
* [Adaptive Card](~/task-modules-and-cards/cards/cards-reference.md#adaptive-card)

**Hero or Thumbnail card**

For the hero or thumbnail card, except for the invoke action, other actions such as button and tap aren't supported in the preview card. For hero and thumbnail cards, a preview is generated by default and you don't need to specify a `preview` property. To know about cards and learn how to use the thumbnail and hero card types, see [what are cards](~/task-modules-and-cards/what-are-cards.md) and [add cards and card actions](~/task-modules-and-cards/cards/cards-actions.md).

**Adaptive Card or connector card**

To send an Adaptive Card or connector card for Microsoft 365 Groups, you must include a preview. The `preview` property must be a hero or thumbnail card and the respective card is generated as preview. If a `preview` property isn't specified in the `attachment` object, a preview isn't generated. For more information, see [using connector cards for Microsoft 365 Groups](~/task-modules-and-cards/cards/cards-reference.md#connector-card-for-microsoft-365-groups).

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

# [TypeScript/Node.js](#tab/typescript2)

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

# [JSON](#tab/json2)

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

# [Python](#tab/python1)

```python
async def on_teams_messaging_extension_query(self, context, query):
   """
   Handles a Messaging Extension query for searching NPM packages.
 
    This method takes a search query from Teams, fetches matching NPM packages using 
    the NPM registry API, and returns a list of thumbnail cards displaying package 
    details with action buttons.
    """
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
            title = package_name,  # Package name as card title
            text = description,  # Package description
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
            text = description,
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

# [.NET](#tab/csharp3)

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

# [TypeScript/Node.js](#tab/typescript3)

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

# [JSON](#tab/json3)

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

# [Python](#tab/python3)

```python
async def on_teams_messaging_extension_select_item(
    self, turn_context: TurnContext, query
) -> MessagingExtensionResponse:
    
    thumbnail_card = ThumbnailCard(
        title = query.get("title") # Extract title from the query
        text = query.get("description"),  # Extract description from the query
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

| Sample name           | Description | .NET    | Node.js   | Python| Manifest|
|:---------------------|:--------------|:---------|:--------|:--------|:--------|
| Teams message extension search | This sample demonstrates how to create a message extension in Teams that allows users searches for NuGet packages and retrieve the results as a card. |[View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/msgext-search/csharp)|[View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/msgext-search/nodejs)|[View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/msgext-search/python)|[View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/msgext-search/csharp/demo-manifest/msgext-search.zip)|
|Teams message extension auth and config | This sample demonstrates how to implement authentication in a message extension for Teams, enabling secure access and user-specific interactions. |[View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/msgext-search-auth-config/csharp)|[View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/msgext-search-sso-config/nodejs)|NA|[View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/msgext-search-auth-config/csharp/demo-manifest/msgext-search-auth-config.zip)|

## Next step

> [!div class="nextstepaction"]
> [Add third party authentication to message extension](~/messaging-extensions/how-to/add-authentication.md)

## See also

* [Message extensions](../../what-are-messaging-extensions.md)
* [Build your first tab app using JavaScript](../../../sbs-gs-javascript.yml)
