---
title: Link unfurling
author: surbhigupta
description: Learn how to add link unfurling with messaging extension in a Microsoft Teams app with app manifest or manually using code examples and samples.
ms.localizationpriority: medium
ms.topic: conceptual
ms.author: anclear
---
# Link unfurling

[!include[v4-to-v3-SDK-pointer](~/includes/v4-to-v3-pointer-me.md)]

In link unfurling, your app can register to receive an invoke activity when URLs with a particular domain are pasted into the compose message area. The invoke contains the URLs and you can respond to it with a card. User can unfurl the link using message extension with additional information to get an enhanced experience. This works similar to a search command with the URL serving as the search term. You can add link unfurling to your app manifest using the developer portal or manually.</br> Now link unfurling supports both in Teams mobile and desktop.

## Advantages of link unfurling

* Link unfurling helps to display the preview of the URL
* You can get the specfic URL unfurl in the compose message box

>[!NOTE]
>The link unfurling result is cached for 30 minutes.</br>
>Link unfurling on mobile works only for installed apps in Microsoft 365

The following images displays the experience of link unfurling on mobile and desktop:

# [Mobile](#tab/Samplemobileapp)

  The following steps provides the link unfurling in mobile:

   1. User can paste URLs in the compose message area.
   1. You can see the link unfurling in the compose message area

   :::image type="content" source="~/assets/images/Teams-link-unfurling/mobile-link-unfurl.png" alt-text="mobile microsoft" border="true":::

# [Desktop](#tab/Sampledesktop)

  The following steps provides the link unfurling in desktop:

   1. User can paste URLs in the compose message area
   1. You can see the link unfurling in the compose message area
  
   :::image type="content" source="~/assets/images/Teams-link-unfurling/desktop-link-unfurl.png" alt-text="unfurl desktop" border="true":::

---

## Add link unfurling to your app manifest

To add link unfurling to your app manifest, add a new `messageHandlers` array to the `composeExtensions` section of your app manifest JSON. You can add the array with the help of App Studio or manually. Domain listings can include wildcards, for example `*.example.com`. This matches exactly one segment of the domain; if you need to match `a.b.example.com` then use `*.*.example.com`.

> [!NOTE]
> Don't add domains that are not in your control, either directly, or through wildcards. For example, `yourapp.onmicrosoft.com` is valid, but `*.onmicrosoft.com` is not valid. The top-level domains are prohibited, for example, `*.com`, `*.org`.

### Add link unfurling using App Studio

1. Open **App Studio** from the Microsoft Teams client, and select the **Manifest Editor** tab.
1. Load your app manifest.
1. On the **Message Extension** page, add the domain that you want to look for in the **Message handlers** section. The following image explains the process:

    :::image type="content" source="~/assets/images/link-unfurling.png" alt-text="Message handlers section in App Studio":::

### Add link unfurling manually

To enable your message extension to interact with links, first you must add the `messageHandlers` array to your app manifest. The following example explains how to add link unfurling manually:

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

After adding the domain to the app manifest, you must update your web service code to handle the invoke request.

For a complete manifest example, see [manifest reference](~/resources/schema/manifest-schema.md).

## Types of cards supported in link unfurling

If you respond with more than one card, only the first card response is used.

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
