---
title: Link unfurling
author: surbhigupta
description: Add link unfurling with messaging extension in a Microsoft Teams app with app manifest or manually. Add link unfurling using Developer Portal. How to update your web service code to handle the invoke request.
ms.localizationpriority: medium
ms.topic: conceptual
ms.author: v-ypalikila
---
# Link unfurling

[!include[v4-to-v3-SDK-pointer](~/includes/v4-to-v3-pointer-me.md)]

The document guides you on how to add link unfurling to your app manifest using Developer Portal and manually. With link unfurling, your app can register to receive an `invoke` activity when URLs with a particular domain are pasted into the compose message area. The `invoke` contains the full URL that was pasted into the compose message area, and you can respond with a card that the user can unfurl, providing additional information or actions. This works similar to a search command with the URL serving as the search term. You can now add link unfurling to Microsoft Teams without installing app.

:::image type="content" source="../../assets/images/tdp/link-unfurling-adaptive-cards1.png" alt-text="Screenshot shows the link unfurling experience in a tree chat for a Teams app installed or not installed in Teams and other apps when the link is pasted in Teams compose message area." lightbox="../../assets/images/tdp/link-unfurling-adaptive-cards1.png":::

> [!NOTE]
>
> * The link unfurling result is cached for 30 minutes.
> * Messaging extension commands are not required for Link unfurling. However, there must be at least one command in manifest as it is a mandatory property in messaging extensions. For more information, see [compose extensions](/microsoftteams/platform/resources/schema/manifest-schema).
> * For mobile client, link unfurling is supported only for links that don't require authentication.

The following image is an example of link unfurling in Teams desktop and mobile clients:

# [Desktop](#tab/desktop)

When the Azure DevOps link is pasted into the Teams compose message area, the link unfurls into a card with the work item details.

:::image type="content" source="../../assets/images/messaging-extension/messagingextensions_linkunfurl.png" alt-text="Screenshot of link unfurling example for Azure Dev Ops links pasted in teams compose message area.":::

# [Mobile](#tab/mobile)

When the app link is pasted into the Teams compose message area, the link unfurls into a card with the link details.

:::image type="content" source="../../assets/images/messaging-extension/android-linkunfurl.png" alt-text="Screenshot shows you the link unfurling in Android mobile client.":::

---

See the following video to learn more about link unfurling:
<br>
> [!VIDEO https://www.microsoft.com/en-us/videoplayer/embed/RE4OFZG]
<br>

## Add link unfurling to your app manifest

To add link unfurling to your app manifest, add a new `messageHandlers` array to the `composeExtensions` section of your app manifest JSON. You can add the array with the help of Developer Portal or manually. Domain listings can include wildcards, for example `*.example.com`. This matches exactly one segment of the domain; if you need to match `a.b.example.com` then use `*.*.example.com`.

> [!NOTE]
> Ensure not to add domains that are not in your control, either directly or through wildcards. For example, `yourapp.onmicrosoft.com` is valid, but `*.onmicrosoft.com` isn't valid. The top-level domains are prohibited, for example, `*.com`, `*.org`.

### Add link unfurling using Developer Portal

1. Open **Developer Portal** from the Microsoft Teams client and then select the **Apps** tab.

   :::image type="content" source="../../assets/images/tdp/create-new-app.png" alt-text="Screenshot shows Developer portal with Apps highlighted in red." lightbox="../../assets/images/tdp/create-new-app.png":::

   > [!NOTE]
   > You need to add Developer Portal app, if you don't have it added in your Teams client.

    :::image type="content" source="../../assets/images/tdp/dev-portal-app.png" alt-text="Screenshot shows Teams with search and Developer portal highlighted in red." lightbox="../../assets/images/tdp/dev-portal-app.png":::

1. Load your app manifest.

   :::image type="content" source="../../assets/images/tdp/load-app-manifest.png" alt-text="Screenshot of Developer portal showing the apps information." lightbox="../../assets/images/tdp/load-app-manifest.png":::

1. Select **Messaging Extension** under **App features** and then either choose **Select an existing bot** or **Create a new bot**.

   :::image type="content" source="../../assets/images/tdp/select-messaging-extension.png" alt-text="Screenshot of App features with App features and Messaging extension highlighted in red." lightbox="../../assets/images/tdp/select-messaging-extension.png":::

   :::image type="content" source="../../assets/images/tdp/select-create-bot.png" alt-text="Screenshot of Messaging extension with Select an existing bot highlighted in red." lightbox="../../assets/images/tdp/select-create-bot.png":::

1. Select **Save**.
1. Select **Add a domain** under **Preview links** section and then enter valid domain.
1. Select **Add**. The following image explains the process:

   :::image type="content" source="../../assets/images/tdp/add-domain-button.png" alt-text="Screenshot of the message handlers section in Developer Portal." lightbox="../../assets/images/tdp/add-domain.png":::

### Add link unfurling manually

> [!NOTE]
> If authentication is added through Azure AD, [unfurl links in Teams using bot](/microsoftteams/platform/sbs-botbuilder-linkunfurling?tabs=vs&tutorial-step=4).

First, you need to add the `messageHandlers` array to your app manifest and enable your message extension to interact with links. The following example explains how to add link unfurling manually:

```json
...
{
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
}
...
```

For a complete manifest example, see [manifest reference](~/resources/schema/manifest-schema.md).

## Handle the `composeExtension/queryLink` invoke

After adding the domain to the app manifest, you must update your web service code to handle the invoke request. Use the received URL to search your service and create a card response. If you respond with more than one card, only the first card response is used.

The following card types are supported:

* [Thumbnail card](~/task-modules-and-cards/cards/cards-reference.md#thumbnail-card)
* [Hero card](~/task-modules-and-cards/cards/cards-reference.md#hero-card)
* [Connector card for Microsoft 365 Groups](../../task-modules-and-cards/cards/cards-reference.md#connector-card-for-microsoft-365-groups)
* [Adaptive Card](~/task-modules-and-cards/cards/cards-reference.md#adaptive-card)

For more information, see [Action type invoke](~/task-modules-and-cards/cards/cards-actions.md#action-type-invoke).

The following is an example of the `invoke` request:

# [C#/.NET](#tab/dotnet)

```csharp
      protected override async Task<MessagingExtensionResponse> OnTeamsAppBasedLinkQueryAsync(ITurnContext<IInvokeActivity> turnContext, AppBasedLinkQuery query, CancellationToken cancellationToken)
      {
          //You'll use the query.link value to search your service and create a card response
          var card = new HeroCard
             {
              Title = "Hero Card",
              Text = query.Url,
              Images = new List<CardImage> { new CardImage("https://raw.githubusercontent.com/microsoft/botframework-sdk/master/icon.png") },
          };

          var attachments = new MessagingExtensionAttachment(HeroCard.ContentType, null, card);
          var result = new MessagingExtensionResult(AttachmentLayoutTypes.List, "result", new[] { attachments }, null, "test unfurl");

          return new MessagingExtensionResponse(result);
      }
```

# [JavaScript/Node.js](#tab/javascript)

```javascript
   class TeamsLinkUnfurlingBot extends TeamsActivityHandler {
     handleTeamsAppBasedLinkQuery(context, query) {
       const attachment = CardFactory.thumbnailCard('Thumbnail Card',
         query.url,
         ['https://raw.githubusercontent.com/microsoft/botframework-sdk/master/icon.png']);

    const result = {
      attachmentLayout: 'list',
      type: 'result',
      attachments: [attachment]
    };

    const response = {
      composeExtension: result
    };
    return response;

     }
   }
```

# [JSON](#tab/json)

   Following is an example of the `invoke` sent to your bot:

```json
   {
     "type": "invoke",
     "name": "composeExtension/queryLink",
     "value": {
       "url": "https://theurlsubmittedbyyouruser.trackeddomain.com/id/1234"
     }
   }
```

Following is an example of the response:

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
           }
         }
       ]
     }
   }
```

---

## Zero install for link unfurling

Zero install link unfurling helps you unfurl previews for your shared links even before a user discovered or installed your app in Teams. You can anonymously unfurl cards with a new invoke request or create a pre-authenticated Adaptive Card preview for users before they install or authenticate your app.

The following image provides a sequential flow to enable and use zero install link unfurling:

   :::image type="content" source="../../assets/images/tdp/user-flow-image.png" alt-text="Screenshot of the link unfurling code user flow." lightbox="../../assets/images/tdp/user-flow-image.png":::

### Enable zero install link unfurling

To get your app ready for zero install link unfurling, follow these steps:

1. Set the property `supportsAnonymizedPayloads` to true in the [manifest schema](../../resources/schema/manifest-schema.md).

1. Set your app to handle the new invoke request `composeExtension/anonymousQueryLink`.

   Example of the new invoke request:

   :::image type="content" source="../../assets/images/tdp/link-unfurl_1.png" alt-text="Screenshot of the invoke request  `composeExtension/anonymousQueryLink` declaration in the manifest." lightbox="../../assets/images/tdp/link-unfurl_1.png":::

   Example of the invoke request payload:

   ```json
   {
      "name":"composeExtension/anonymousQueryLink",
      "type":"invoke",
      "timestamp":"2021-12-02T08:12:21.148Z",
      "localTimestamp":"2021-12-02T00:12:21.148-08:00",
      "id":"f:43d59e15-6114-bd53-08c3-b232aa648ec1",
      "channelId":"msteams",
      "serviceUrl":"https://smba.trafficmanager.net/amer/",
      "from":{
         "id":"redacted",
         "name":"redacted"
      },
      "conversation":{
         "isGroup":true,
         "conversationType":"groupChat",
         "tenantId":"redacted",
         "id":" redacted",
         "name":" redacted"
      },
      "recipient":{
         "id":"28:85fa138c-7654-4236-86eb-466160687029",
         "name":"test bot"
      },
      "entities":[
         {
            "locale":"en-US",
            "country":"US",
            "platform":"Mac",
            "timezone":"America/Los_Angeles",
            "type":"clientInfo"
         }
      ],
      "channelData":{
         "tenant":{
            "id":" redacted"
         },
         "source":{
            "name":"compose"
         }
      },
      "value":{
         "url":"https://test.test.com/test"
      },
      "locale":"en-US",
      "localTimezone":"America/Los_Angeles"
   }
   ```

1. Respond to the `composeExtension/anonymousQueryLink` payload.

   1. For non-auth scenarios: You need to send back a response with the `type` as `result` and a card. Use the following template:

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
               }
            }
          ]
        }
      }
      ```

   1. For auth scenarios: You need to send back a response with the `type` as `auth` with an optional pre-auth card in the attachments. Use the following template:
  
      ```json
      {
         "composeExtension": {
            "type": "auth",
            "attachmentLayout": "list",
            "attachments": [
               {
                 "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
                 "type": "AdaptiveCard",
                 "version": "1.5",
                 "actions": [],
                 "body": [
                   {
                     "type": "TextBlock",
                     "size": "medium",
                     "weight": "bolder",
                     "text": "Zero-install test app"
                  },
                  {
                     "type": "TextBlock",
                     "text": "Link your account with this app for a full experience",
                     "wrap": true
                  }
                 ]
               }
            ]
         }
      }
      ```

1. Pre-auth card (for auth only): Create a card preview to unfurl your links for users who don't have your app installed. You can either create a pre-templated card or add relevant placeholder fields for the users to update. The users can learn about the app even before they’ve installed it.

   You can create customized card and add relevant fields. The users can fill in the required information as per the fields. The following image illustrates a customized card preview:

   :::image type="content" source="../../assets/images/tdp/custom-card.png" alt-text="Screenshot of the customized card with fields for user to update." lightbox="../../assets/images/tdp/custom-card.png":::

   The following image illustrates a default preview card:

   :::image type="content" source="../../assets/images/tdp/default-preview-card.png" alt-text="Screenshot of the link unfurling code default preview card." lightbox="../../assets/images/tdp/default-preview-card.png":::

     > [!NOTE]
     > After the link is pasted in the message compose area, Teams unfurls the link into a card and prompts the user to sign in to the app. If the user doesn't sign in to the app, the link isn't posted as a card in the chat.

1. **Advantages and limitations**:

# [Advantages](#tab/advantages)

Zero install link unfurling helps you provide enhanced experience to the users, such as:

* Unfurl previews for your links that users share in Teams even before they've installed your app.
* Create a welcome card for your app to show a preview with the placeholder fields.

# [Limitations](#tab/limitations)

The following are the limitations:

* The bot can only send back a response as `result` or `auth` as the value for the `type` property in response to the `composeExtension/anonymousQueryLink` invoke request. The user can log an error for all other response types, such as, *silentAuth* and *config*.

* The bot can't send back an acv2 card in response to the `composeExtension/anonymousQueryLink` invoke request, either as a result or as a pre-auth card in auth.

* If the bot selects to send back the `"type": "auth"` with a pre-auth card, the Teams client strips away any action buttons from the card, and adds a sign in action button to get users to authenticate into your app.

  * The bot can't send back an acv2 card in response to the `composeExtension/anonymousQueryLink` invoke request, either as a result or as a pre-auth card in auth.

    * If the bot selects to send back the `"type": "auth"` with a pre-auth card, the Teams client strips away any action buttons from the card, and adds a sign in action button to get users to authenticate into your app.

---

## Remove link unfurling cache

When a user shares a link in a meeting, the Teams app unfurls the link to an Adaptive Card. The link unfurling result is cached in Teams for 30 minutes. You can update your app to set a cache policy and remove cache for the app, which helps you to show different content in an Adaptive Card when the app's link is shared in a different context in Teams.

To remove link unfurling cache, update your bot with the `type` as `setcachepolicy` under the `suggestedActions` property. Teams doesn't cache the results for the app links with the `"type": "setCachePolicy"`.

The following JSON payload example for `suggestedActions` property:

```json
"suggestedActions": {
            "actions": [
                {
                    "type": "setCachePolicy",
                    "value": "{\"type\":\"no-cache\"}"
                }
            ]
        },
```

## Step-by-step guide

Follow the [step-by-step guide](../../sbs-botbuilder-linkunfurling.yml) to unfurl links in Teams using bot.

## Code sample

|**Sample name** | **Description** | **.NET** | **Node.js**|
|----------------|-----------------|--------------|----------------|
| Zero install link unfurling. | Demonstrates how to use Search-based Messaging Extension with a configuration page. | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/msgext-search-auth-config/csharp) | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/msgext-search-sso-config/nodejs) |

## See also

* [Message extensions](../what-are-messaging-extensions.md)
* [Adaptive Cards](../../task-modules-and-cards/what-are-cards.md#adaptive-cards)
* [Tabs link unfurling and Stage View](../../tabs/tabs-link-unfurling.md)
* [composeExtensions](../../resources/schema/manifest-schema.md#composeextensions)
* [Bot activity handlers](../../bots/bot-basics.md)
