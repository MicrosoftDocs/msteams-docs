---
title: Search with messaging extensions
description: Describes how to develop search based messaging extensions
keywords: teams messaging extensions messaging extensions search
ms.date: 07/20/2019
---
# Search with messaging extensions

[!include[v3-to-v4-SDK-pointer](~/includes/v3-to-v4-pointer-me.md)]

Search based messaging extensions allow you to query your service and post that information in the form of a card, right into your message

![Example of messaging extension card](~/assets/images/compose-extensions/ceexample.png)

The following sections describe how to do this.

[!include[common content for creating extensions](~/includes/messaging-extensions/messaging-extensions-common.md)]

### Search type message extensions

For search based messaging extension set the `type` parameter to `query`. Below is an example of a manifest with a single search command. A single messaging extension can have up to 10 different commands associated with it. This can include both multiple search and multiple Action-based commands.

#### Complete app manifest example

```json
{
  "$schema": "https://developer.microsoft.com/json-schemas/teams/v1.7/MicrosoftTeams.schema.json",
  "manifestVersion": "1.5",
  "version": "1.0",
  "id": "57a3c29f-1fc5-4d97-a142-35bb662b7b23",
  "packageName": "com.microsoft.teams.samples.bing",
  "developer": {
    "name": "John Developer",
    "websiteUrl": "http://bingbotservice.azurewebsites.net/",
    "privacyUrl": "http://bingbotservice.azurewebsites.net/privacy",
    "termsOfUseUrl": "http://bingbotservice.azurewebsites.net/termsofuse"
  },
  "name": {
    "short": "Bing",
    "full": "Bing"
  },
  "description": {
    "short": "Find Bing search results",
    "full": "Find Bing search results and share them with your team members."
  },
  "icons": {
    "outline": "bing-outline.jpg",
    "color": "bing-color.jpg"
  },
  "accentColor": "#ff6a00",
  "composeExtensions": [
    {
      "botId": "57a3c29f-1fc5-4d97-a142-35bb662b7b23",
      "canUpdateConfiguration": true,
      "commands": [{
          "id": "searchCmd",
          "description": "Search Bing for information on the web",
          "title": "Search",
          "initialRun": true,
          "parameters": [{
            "name": "searchKeyword",
            "description": "Enter your search keywords",
            "title": "Keywords"
          }]
        }
      ]
    }
  ],
  "permissions": [
    "identity",
    "messageTeamMembers"
  ],
  "validDomains": [
    "bingbotservice.azurewebsites.net",
    "*.bingbotservice.azurewebsites.net"
  ]
}
```

### Test via uploading

You can test your messaging extension by uploading your app.

To open your messaging extension, navigate to any of your chats or channels. Choose the **More options** (**&#8943;**) button in the compose box, and choose your messaging extension.

## Add event handlers

Most of your work involves the `onQuery` event, which handles all interactions in the messaging extension window.

If you set `canUpdateConfiguration` to `true` in the manifest, you enable the **Settings** menu item for your messaging extension and must also handle `onQuerySettingsUrl` and `onSettingsUpdate`.

### Handle onQuery events

A messaging extension receives an `onQuery` event when anything happens in the messaging extension window or is sent to the window.

If your messaging extension uses a configuration page, your handler for `onQuery` should first check for any stored configuration information; if the messaging extension isn't configured, return a `config` response with a link to your configuration page. Be aware that the response from the configuration page is also handled by `onQuery`. (The sole exception is when the configuration page is called by the handler for `onQuerySettingsUrl`; see the following section.)

If your messaging extension requires authentication, check the user state information; if the user isn't signed in, follow the instructions in the [Authentication](#authentication) section later in this topic.

Next, check whether `initialRun` is set; if so, take appropriate action, such as providing instructions or a list of responses.

The remainder of your handler for `onQuery` prompts the user for information, displays a list of preview cards, and returns the card selected by the user.

### Handle onQuerySettingsUrl and onSettingsUpdate events

The `onQuerySettingsUrl` and `onSettingsUpdate` events work together to enable the **Settings** menu item.

![Screenshots of locations of Settings menu item](~/assets/images/compose-extensions/compose-extension-settings-menu-item.png)

Your handler for `onQuerySettingsUrl` returns the URL for the configuration page; after the configuration page closes, your handler for `onSettingsUpdate` accepts and saves the returned state. (This is the one case in which `onQuery` *doesn't* receive the response from the configuration page.)

## Receive and respond to queries

Every request to your messaging extension is done via an `Activity` object that is posted to your callback URL. The request contains information about the user command, such as ID and parameter values. The request also supplies metadata about the context in which your extension was invoked, including user and tenant ID, along with chat ID or channel and team IDs.

### Receive user requests

When a user performs a query, Microsoft Teams sends your service a standard Bot Framework `Activity` object. Your service should perform its logic for an `Activity` that has `type` set to `invoke` and `name` set to a supported `composeExtension` type, as shown in the following table.

In addition to the standard bot activity properties, the payload contains the following request metadata:

|Property name|Purpose|
|---|---|
|`type`| Type of request; must be `invoke`. |
|`name`| Type of command that is issued to your service. Currently the following types are supported: <br>`composeExtension/query` <br>`composeExtension/querySettingUrl` <br>`composeExtension/setting` <br>`composeExtension/selectItem` <br>`composeExtension/queryLink` |
|`from.id`| ID of the user that sent the request. |
|`from.name`| Name of the user that sent the request. |
|`from.aadObjectId`| Azure Active Directory object id of the user that sent the request. |
|`channelData.tenant.id`| Azure Active Directory tenant ID. |
|`channelData.channel.id`| Channel ID (if the request was made in a channel). |
|`channelData.team.id`| Team ID (if the request was made in a channel). |
|`clientInfo`|Optional metadata about the client software used to send a user's message. The entity can contain two properties:<br>The `country` field contains the user's detected location.<br>The `platform` field describes the messaging client platform. <br>For additional information, please *see* [Non-IRI entity types — clientInfo](https://github.com/microsoft/botframework-sdk/blob/master/specs/botframework-activity/botframework-activity.md#clientinfo).|

The request parameters itself are found in the value object, which includes the following properties:

| Property name | Purpose |
|---|---|
| `commandId` | The name of the command invoked by the user, matching one of the commands declared in the app manifest. |
| `parameters` | Array of parameters. Each parameter object contains the parameter name, along with the parameter value provided by the user. |
| `queryOptions` | Pagination parameters: <br>`skip`: skip count for this query <br>`count`: number of elements to return |

#### Request example

```json
{
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
  "type": "invoke",
  "timestamp": "2017-05-01T15:45:51.876Z",
  "localTimestamp": "2017-05-01T08:45:51.876-07:00",
  "id": "f:622749630322482883",
  "channelId": "msteams",
  "serviceUrl": "https://smba.trafficmanager.net/amer-client-ss.msg/",
  "from": {
    "id": "29:1C7dbRrC_5yzN1RGtZIrcWT0xz88KPGP9sxdpVpV8sODlgPHeQE9RqQ02hnpuKzy6zZ-AaZx6swUOMj_Dsdse3TQ4sIaeebbFBF-VgjJy_nY",
    "name": "Larry Jin",
    "aadObjectId": "cd723fa0-0591-416a-9290-e93ecf3a9b92"
  },
  "conversation": {
    "id": "19:skypespaces_8198cfe0dd2647ae91930f0974768a40@thread.skype"
  },
  "recipient": {
    "id": "28:b4922ea1-5315-4fd0-9b21-d941ab06e39f",
    "name": "TheComposeExtensionDev"
  },
  "entities": [
    {
    "type": "clientInfo",
      "country": "US",
      "platform": "Windows"
    }
  ]
}
```

### Receive requests from links inserted into the compose message box

As an alternative (or in addition) to searching your external service, you can use a URL inserted into the compose message box to query your service and return a card. In the screenshot below a user has pasted in a URL for a work item in Azure DevOps which the messaging extension has resolved into a card.

![Example of link unfurling](~/assets/images/compose-extensions/messagingextensions_linkunfurling.png)

To enable your messaging extension to interact with links this way you'll first need to add the `messageHandlers` array to your app manifest as in the example below:

```json
"composeExtensions": [
  {
    "botId": "abc123456-ab12-ab12-ab12-abcdef123456",
    "messageHandlers": [
      {
        "type": "link",
        "value": {
          "domains": [
            "*.trackeddomain.com"
          ]
        }
      }
    ]
  }
]
```

Once you've added the domain to listen on to the app manifest, you'll need to change your bot code to [respond](#respond-to-user-requests) to the below invoke request.

```json
{
  "type": "invoke",
  "name": "composeExtension/queryLink",
  "value": {
    "url": "https://theurlsubmittedbyyouruser.trackeddomain.com/id/1234"
  }
}
```

If your app returns multiple items only the first will be used.

### Respond to user requests

When the user performs a query, Microsoft Teams issues a synchronous HTTP request to your service. At that point, your code has 5 seconds to provide an HTTP response to the request. During this time, your service can perform additional lookup, or any other business logic needed to serve the request.

Your service should respond with the results matching the user query. The response must indicate an HTTP status code of `200 OK` and a valid application/json object with the following body:

|Property name|Purpose|
|---|---|
|`composeExtension`|Top-level response envelope.|
|`composeExtension.type`|Type of response. The following types are supported: <br>`result`: displays a list of search results <br>`auth`: asks the user to authenticate <br>`config`: asks the user to set up the messaging extension <br>`message`: displays a plain text message |
|`composeExtension.attachmentLayout`|Specifies the layout of the attachments. Used for responses of type `result`. <br>Currently the following types are supported: <br>`list`: a list of card objects containing thumbnail, title, and text fields <br>`grid`: a grid of thumbnail images |
|`composeExtension.attachments`|Array of valid attachment objects. Used for responses of type `result`. <br>Currently the following types are supported: <br>`application/vnd.microsoft.card.thumbnail` <br>`application/vnd.microsoft.card.hero` <br>`application/vnd.microsoft.teams.card.o365connector` <br>`application/vnd.microsoft.card.adaptive`|
|`composeExtension.suggestedActions`|Suggested actions. Used for responses of type `auth` or `config`. |
|`composeExtension.text`|Message to display. Used for responses of type `message`. |

#### Response card types and previews

We support the following attachment types:

* [Thumbnail card](~/task-modules-and-cards/cards/cards-reference.md#thumbnail-card)
* [Hero card](~/task-modules-and-cards/cards/cards-reference.md#hero-card)
* [Office 365 Connector card](~/task-modules-and-cards/cards/cards-reference.md#office-365-connector-card)
* [Adaptive card](~/task-modules-and-cards/cards/cards-reference.md#adaptive-card)

See [Cards](~/task-modules-and-cards/what-are-cards.md) for an overview.

To learn how to use the thumbnail and hero card types, see [Add cards and card actions](~/task-modules-and-cards/cards/cards-actions.md).

For additional documentation regarding the Office 365 Connector card, see [Using Office 365 Connector cards](~/task-modules-and-cards/cards/cards-reference.md#office-365-connector-card).

The result list is displayed in the Microsoft Teams UI with a preview of each item. The preview is generated in one of two ways:

* Using the `preview` property within the `attachment` object. The `preview` attachment can only be a Hero or Thumbnail card.
* Extracted from the basic `title`, `text`, and `image` properties of the attachment. These are used only if the `preview` property is not set and these properties are available.

You can display a preview of an Adaptive or Office 365 Connector card in the result list simply by setting its preview property; this is not necessary if the results are already hero or thumbnail cards. If you use the preview attachment, it must be either a Hero or Thumbnail card. If no preview property is specified, the preview of the card will fail and nothing will be displayed.

#### Response example

This example shows a response with two results, mixing different card formats: Office 365 Connector and Adaptive. While you'll likely want to stick with one card format in your response, it shows how the `preview` property of each element in the `attachments` collection must explicitly define a preview in hero or thumbnail format as described above.

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

### Default query

If you set `initialRun` to `true` in the manifest, Microsoft Teams issues a "default" query when the user first opens the messaging extension. Your service can respond to this query with a set of prepopulated results. This can be useful for displaying, for instance, recently viewed items, favorites, or any other information that is not dependent on user input.

The default query has the same structure as any regular user query, except with a parameter `initialRun` whose string value is `true`.

#### Request example for a default query

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

## Identify the user

Every request to your services includes the obfuscated ID of the user that performed the request, as well as the user's display name and Azure Active Directory object ID.

```json
"from": {
  "id": "29:1C7dbRrC_5yzN1RGtZIrcWT0xz88KPGP9sxdpVpV8sODlgPHeQE9RqQ02hnpuKzy6zZ-AaZx6swUOMj_Dsdse3TQ4sIaeebbFBF-VgjJy_nY",
  "name": "Larry Jin",
  "aadObjectId": "cd723fa0-0591-416a-9290-e93ecf3a9b92"
},
```

The `id` and `aadObjectId` values are guaranteed to be that of the authenticated Teams user. They can be used as keys to look up credentials or any cached state in your service. In addition, each request contains the Azure Active Directory tenant ID of the user, which can be used to identify the user’s organization. If applicable, the request also contains the team and channel IDs from which the request originated.

## Authentication

If your service requires user authentication, you need to sign in the user before he or she can use the messaging extension. If you have written a bot or a tab that signs in the user, this section should be familiar.

The sequence is as follows:

1. User issues a query, or the default query is automatically sent to your service.
2. Your service checks whether the user has first authenticated by inspecting the Teams user ID.
3. If the user has not authenticated, send back an `auth` response with an `openUrl` suggested action including the authentication URL.
4. The Microsoft Teams client launches a pop-up window hosting your webpage using the given authentication URL.
5. After the user signs in, you should close your window and send an "authentication code" to the Teams client.
6. The Teams client then reissues the query to your service, which includes the authentication code passed in step 5.

Your service should verify that the authentication code received in step 6 matches the one from step 5. This ensures that a malicious user does not try to spoof or compromise the sign-in flow. This effectively "closes the loop" to finish the secure authentication sequence.

### Respond with a sign-in action

To prompt an unauthenticated user to sign in, respond with a suggested action of type `openUrl` that includes the authentication URL.

#### Response example for a sign-in action

```json
{
  "composeExtension":{
    "type":"auth",
    "suggestedActions":{
      "actions":[
        {
          "type": "openUrl",
          "value": "https://example.com/auth",
          "title": "Sign in to this app"
        }
      ]
    }
  }
}
```

> [!NOTE]
> For the sign-in experience to be hosted in a Teams pop-up, the domain portion of the URL must be in your app’s list of valid domains. (See [validDomains](~/resources/schema/manifest-schema.md#validdomains) in the manifest schema.)

### Start the sign-in flow

Your sign-in experience should be responsive and fit within a popup window. It should integrate with the [Microsoft Teams JavaScript client SDK](/javascript/api/overview/msteams-client), which uses message passing.

As with other embedded experiences running inside Microsoft Teams, your code inside the window needs to first call `microsoftTeams.initialize()`. If your code performs an OAuth flow, you can pass the Teams user ID into your window, which then can pass it to the OAuth sign-in URL.

### Complete the sign-in flow

When the sign-in request completes and redirects back to your page, it should perform the following steps:

1. Generate a security code. (This can be a random number.) You need to cache this code on your service, along with the credentials obtained through the sign-in flow (such as OAuth 2.0 tokens).
2. Call `microsoftTeams.authentication.notifySuccess` and pass the security code.

At this point, the window closes and control is passed to the Teams client. The client now can reissue the original user query, along with the security code in the `state` property. Your code can use the security code to look up the credentials stored earlier to complete the authentication sequence and then complete the user request.

#### Reissued request example

```json
{
    "name": "composeExtension/query",
    "value": {
        "commandId": "insertWiki",
        "parameters": [{
            "name": "searchKeyword",
            "value": "lakers"
        }],
        "state": "12345",
        "queryOptions": {
            "skip": 0,
            "count": 25
        }
    },
    "type": "invoke",
    "timestamp": "2017-04-26T05:18:25.629Z",
    "localTimestamp": "2017-04-25T22:18:25.629-07:00",
    "entities": [{
        "type": "clientInfo",
        "country": "US",
        "platform": "Web",
        
    }],
    "text": "",
    "attachments": [],
    "address": {
        "id": "f:7638210432489287768",
        "channelId": "msteams",
        "user": {
            "id": "29:1A5TJWHkbOwSyu_L9Ktk9QFI1d_kBOEPeNEeO1INscpKHzHTvWfiau5AX_6y3SuiOby-r73dzHJ17HipUWqGPgw",
            "aadObjectId": "fc8ca1c0-d043-4af6-b09f-141536207403"
        },
        "conversation": {
            "id": "19:7705841b240044b297123ad7f9c99217@thread.skype"
        },
        "bot": {
            "id": "28:c073afa8-7e77-4f92-b3e7-aa589e952a3e",
            "name": "maotestbot2"
        },
        "serviceUrl": "https://smba.trafficmanager.net/amer-client-ss.msg/",
        "useAuth": true
    },
    "source": "msteams"
}
```

## SDK support

### .NET

To receive and handle queries with the Bot Builder SDK for .NET, you can check for the `invoke` action type on the incoming activity and then use the helper method in the NuGet package [Microsoft.Bot.Connector.Teams](https://www.nuget.org/packages/Microsoft.Bot.Connector.Teams) to determine whether it’s a messaging extension activity.

#### Example code in .NET

```csharp
public async Task<HttpResponseMessage> Post([FromBody]Activity activity)
{
    if (activity.Type == ActivityTypes.Invoke) // Received an invoke
    {
        if (activity.IsComposeExtensionQuery())
        {
            // This is the response object that will get sent back to the messaging extension request.
            ComposeExtensionResponse invokeResponse = null;

            // This helper method gets the query as an object.
            var query = activity.GetComposeExtensionQueryData();

            if (query.CommandId != null && query.Parameters != null && query.Parameters.Count > 0)
            {
                // query.Parameters has the parameters sent by client
                var results = new ComposeExtensionResult()
                {
                    AttachmentLayout = "list",
                    Type = "result",
                    Attachments = new List<ComposeExtensionAttachment>(),
                };
                invokeResponse.ComposeExtension = results;
            }

            // Return the response
            return Request.CreateResponse<ComposeExtensionResponse>(HttpStatusCode.OK, invokeResponse);
        } else
        {
            // Handle other types of Invoke activities here.
        }
    } else {
      // Failure case catch-all.
      var response = Request.CreateResponse(HttpStatusCode.BadRequest);
      response.Content = new StringContent("Invalid request! This API supports only messaging extension requests. Check your query and try again");
      return response;
    }
}
```

### Node.js

#### Example code in Node.js

```javascript
require('dotenv').config();

import * as restify from 'restify';
import * as builder from 'botbuilder';
import * as teamBuilder from 'botbuilder-teams';

class App {
    run() {
        const server = restify.createServer();
        let teamChatConnector = new teamBuilder.TeamsChatConnector({
            appId: process.env.MICROSOFT_APP_ID,
            appPassword: process.env.MICROSOFT_APP_PASSWORD
        });

        // Command ID must match what's defined in manifest
        teamChatConnector.onQuery('<%= commandId %>',
            (event: builder.IEvent,
            query: teamBuilder.ComposeExtensionQuery,
            callback: (err: Error, result: teamBuilder.IComposeExtensionResponse, statusCode: number) => void) => {
                // Check for initialRun; i.e., when you should return default results
                // if (query.parameters[0].name === 'initialRun') {}

                // Check query.queryOptions.count and query.queryOptions.skip for paging

                // Return auth response
                // let response = teamBuilder.ComposeExtensionResponse.auth().actions([
                //     builder.CardAction.openUrl(null, 'https://authUrl', 'Please sign in')
                // ]).toResponse();

                // Return config response
                // let response = teamBuilder.ComposeExtensionResponse.config().actions([
                //     builder.CardAction.openUrl(null, 'https://configUrl', 'Please sign in')
                // ]).toResponse();

                // Return result response
                let response = teamBuilder.ComposeExtensionResponse.result('list').attachments([
                    new builder.ThumbnailCard()
                        .title('Test thumbnail card')
                        .text('This is a test thumbnail card')
                        .images([new builder.CardImage().url('https://bot-framework.azureedge.net/bot-icons-v1/bot-framework-default-9.png')])
                        .toAttachment()
                ]).toResponse();
                callback(null, response, 200);
            });
        server.post('/api/composeExtension', teamChatConnector.listen());
        server.listen(process.env.PORT, () => console.log(`listening to port:` + process.env.PORT));
    }
}

const app = new App();
app.run();
```
*See also* [Bot Framework samples](https://github.com/Microsoft/BotBuilder-Samples/blob/master/README.md).
