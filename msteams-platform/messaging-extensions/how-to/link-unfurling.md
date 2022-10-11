---
title: Link unfurling
author: surbhigupta
description: Add link unfurling with messaging extension in a Microsoft Teams app with app manifest or manually. Add link unfurling using Developer Portal. How to update your web service code to handle the invoke request.
ms.localizationpriority: medium
ms.topic: conceptual
ms.author: v-amprasad
---
# Add link unfurling

[!include[v4-to-v3-SDK-pointer](~/includes/v4-to-v3-pointer-me.md)]

The document guides you on how to add link unfurling to your app manifest using Developer Portal and manually. With link unfurling, your app can register to receive an `invoke` activity when URLs with a particular domain are pasted into the compose message area. The `invoke` contains the full URL that was pasted into the compose message area, and you can respond with a card that the user can unfurl, providing additional information or actions. This works similar to a search command with the URL serving as the search term. You can now add link unfurling to Microsoft Teams without installing app.

:::image type="content" source="../../assets/images/tdp/link-unfurling-adaptive-cards1.png" alt-text="link unfurling without app installation" lightbox="../../assets/images/tdp/link-unfurling-adaptive-cards1.png":::

> [!NOTE]
>
> * Currently, link unfurling is not supported on Mobile clients.
> * The link unfurling result is cached for 30 minutes.
> * Messaging extension commands are not required for Link unfurling. However, there must be at least one command in manifest as it is a mandatory property in messaging extensions. For more information, see [compose extensions](/microsoftteams/platform/resources/schema/manifest-schema)

The Azure DevOps message extension uses link unfurling to look for URLs pasted into the compose message area pointing to a work item. In the following image, a user pasted a URL for an item in Azure DevOps that the message extension has resolved into a card:

:::image type="content" source="~/assets/images/compose-extensions/messagingextensions_linkunfurling.png" alt-text="Example of link unfurling":::

See the following video to learn more about link unfurling:
<br>
> [!VIDEO <https://www.microsoft.com/en-us/videoplayer/embed/RE4OFZG>]
<br>

### Add link unfurling to your app manifest

To add link unfurling to your app manifest, add a new `messageHandlers` array to the `composeExtensions` section of your app manifest JSON. You can add the array with the help of Developer Portal or manually. Domain listings can include wildcards, for example `*.example.com`. This matches exactly one segment of the domain; if you need to match `a.b.example.com` then use `*.*.example.com`.

> [!NOTE]
> Ensure not to add domains that are not in your control, either directly, or through wildcards. For example, `yourapp.onmicrosoft.com` is valid, but `*.onmicrosoft.com` is not valid. The top-level domains are prohibited, for example, `*.com`, `*.org`.

### Add link unfurling using Developer Portal

1. Open **Developer Portal** from the Microsoft Teams client and then select the **Apps** tab.

   :::image type="content" source="../../assets/images/tdp/create-new-app.png" alt-text="create new app in developer portal" lightbox="../../assets/images/tdp/create-new-app.png":::

   > [!NOTE]
   > You need to add Developer Portal app, if you don't have it added in your Teams client.

    :::image type="content" source="../../assets/images/tdp/dev-portal-app.png" alt-text="Add developer portal app" lightbox="../../assets/images/tdp/dev-portal-app.png":::

1. Load your app manifest.

   :::image type="content" source="../../assets/images/tdp/load-app-manifest.png" alt-text="load your app manifest" lightbox="../../assets/images/tdp/load-app-manifest.png":::

1. Select **Messaging Extension** under **App features** and then either choose **Select an existing bot** or **Create a new bot**.

   :::image type="content" source="../../assets/images/tdp/select-messaging-extension.png" alt-text="Select messaging extension option" lightbox="../../assets/images/tdp/select-messaging-extension.png":::

   :::image type="content" source="../../assets/images/tdp/select-create-bot.png" alt-text="select existing bot or create a new bot" lightbox="../../assets/images/tdp/select-create-bot.png":::

1. Select **Save**.
1. Select **Add a domain** under **Preview links** section and then enter valid domain.
1. Select **Add**. The following image explains the process:

   :::image type="content" source="../../assets/images/tdp/add-domain-button.PNG" alt-text="Screenshot of the message handlers section in Developer Portal." lightbox="../../assets/images/tdp/add-domain.PNG":::

### Add link unfurling manually

> [!NOTE]
> If authentication is added through Azure AD, [unfurl links in Teams using bot](/microsoftteams/platform/sbs-botbuilder-linkunfurling?tabs=vs&tutorial-step=4).

First, you need to add the `messageHandlers` array to your app manifest and enable your message extension to interact with links. The following example explains how to add link unfurling manually:

```json
...
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
],
...
```

For a complete manifest example, see [manifest reference](~/resources/schema/manifest-schema.md).

## Enable zero install for link unfurling

 Zero install helps users to unfurl links shared in Teams regardless if the user has discovered or installed the app before. You can build link unfurling apps to your Teams without installing the full app or the required messaging extension. You can create pre-authenticated Adaptive Card previews for users to view before they install or authenticate the app. It's recommended to use [SSO authentication for bots](../../bots/how-to/authentication/auth-aad-sso-bots.md) to create the single sign-in experience for your users.

### Advantages

The following advantages help you to provide enhanced experience to the users:

* Prompt users to unfurl links without installing messaging extension.
* Authenticate using single sign-on.
* Create welcome card for your app to show preview with placeholder fields.

### Limitations

The following list provides the limitations:

* The bot can only send back a response type result or auth in response to composeExtension/anonymousQueryLink invoke. The user can log an error for all other response types, such as, silentAuth and config.
* The bot can't send back an acv2 card in response to `composeExtension/anonymousQueryLink`, either as a result or as a pre-auth card in auth.
* If the bot selects to send back type auth with a pre-auth card, the teams client strips all of its actions

**To get your app ready for zero-install link unfurling**

1. Set the manifest property `supportsAnonymousAccess` to TRUE.

2. Set your app to handle the new invoke request `composeExtension/anonymousQueryLink` in the manifest.

   :::image type="content" source="../../assets/images/tdp/link-unfurl_1.PNG" alt-text="Screenshot of the link unfurling code." lightbox="../../assets/images/tdp/link-unfurl_1.PNG":::

   :::image type="content" source="../../assets/images/tdp/link-unfurl_2.PNG" alt-text="Screenshot of the link unfurling code 2." lightbox="../../assets/images/tdp/link-unfurl_2.PNG":::

### Scenarios

* For non-auth scenarios, you need to send back a response with type result and a card. Use the following template:

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

* For auth scenarios, you need to send back type auth with an optional pre-auth card in the attachments. Use the following template:

   ```json
   {
     "composeExtension": {
       "type": "auth",
       "attachmentLayout": "list",
       "attachments": [
         {
           /*Pre-auth card content goes here*/
         }
       ]
     }
   }
   ```

3.

### Handle the `composeExtension/queryLink` invoke

After adding the domain to the app manifest, you must update your web service code to handle the invoke request. Use the received URL to search your service and create a card response. If you respond with more than one card, only the first card response is used.

The following card types are supported:

* [Thumbnail card](~/task-modules-and-cards/cards/cards-reference.md#thumbnail-card)
* [Hero card](~/task-modules-and-cards/cards/cards-reference.md#hero-card)
* [Office 365 Connector card](~/task-modules-and-cards/cards/cards-reference.md#office-365-connector-card)
* [Adaptive Card](~/task-modules-and-cards/cards/cards-reference.md#adaptive-card)

For more information, see [Action type invoke](~/task-modules-and-cards/cards/cards-actions.md#action-type-invoke).

### Example

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

* * *

## Step-by-step guide

Follow the [step-by-step guide](../../sbs-botbuilder-linkunfurling.yml) to unfurl links in Teams using bot.

## See also

* [Cards](~/task-modules-and-cards/what-are-cards.md)
* [Tabs link unfurling and Stage View](~/tabs/tabs-link-unfurling.md)
