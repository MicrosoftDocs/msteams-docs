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

This document guides you on how to add link unfurling to your app manifest using App studio and manually. With link unfurling, your app can register to receive an `invoke` activity when URLs with a particular domain are pasted into the compose message area. The `invoke` contains the full URL that was pasted into the compose message area, and you can respond with a card that the user can unfurl, providing additional information or actions. This works similar to a search command with the URL serving as the search term.

> [!NOTE]
>
> * Currently, link unfurling is not supported on Mobile clients.
> * The link unfurling result is cached for 30 minutes.

The Azure DevOps message extension uses link unfurling to look for URLs pasted into the compose message area pointing to a work item. In the following image, a user has pasted a URL for a work item in Azure DevOps, which the message extension has resolved into a card:

:::image type="content" source="~/assets/images/compose-extensions/messagingextensions_linkunfurling.png" alt-text="Example of link unfurling":::

## App less adaptive card preview with schema.org templates

Schema.org is a collaborative, community based activity with a mission to create, maintain, and promote schemas for the structured data on the internet, web pages, email and beyond.

### How does it work

When metadata of the webpage is tagged to a type of product it unfurls to an adaptive card. App type plays an crucial role, each type will have a designated template. The adaptive card is upgraded with lot more action buttons

Following screenshot displays metadata of how an adaptive card unfurls.

:::image type="content" source="../../assets/images/messaging-extension/meta.png" alt-text="Meta data"border="true"lightbox="../../assets/images/messaging-extension/meta-data.png":::

### Adding meta data to the website

Add structured schema.org JSON-LD metadata to the website. Few of the templates with @types:

| App type | schema.org meta data |
|---|---|
| Creative works | [Book](https://schema.org/Book), [Movie](https://schema.org/Movie), [MusicRecording](https://schema.org/MusicRecording), [Recipe](https://schema.org/Recipe) and [TVSeries](https://schema.org/TVSeries) |
| Embedded non-text objects | [AudioObject](https://schema.org/AudioObject), [ImageObject](https://schema.org/ImageObject) and [VideoObject](https://schema.org/VideoObject)​ |
| Event | [Event​](https://schema.org/Event) |
| Health and medical | [Health and medical types](https://schema.org/docs/meddocs.html): notes on the health and medical types under [MedicalEntity](https://schema.org/MedicalEntity).​|
| Organization | [Organization​](https://schema.org/Organization) |
| Person | [Person​](https://schema.org/Person) |
| Place | [Place](https://schema.org/Place) |
| LocalBusiness | [LocalBusiness](https://schema.org/LocalBusiness) |
| Restaurant | [Restaurant](https://schema.org/Restaurant) |
| Product | [Product](https://schema.org/Product), [Offer](https://schema.org/Offer), [AggregateOffer​](https://schema.org/AggregateOffer)
| Review | [Review](https://schema.org/Review), [AggregateRating​](https://schema.org/AggregateRating) |
| Action | [Action](https://schema.org/Action) |

Following is an instance of adding structured schema.org JSON-LD metadata to the website.

:::image type="content" source="../../assets/images/messaging-extension/metadata-1.png" alt-text="structured schema.org"border="true":::

### Limitation

Following are the limitations for app less adaptive card preview with schema.org templates:

1. The new templates will not render in meeting chats or windows

1. If a matching template is not found, the link defaults to current URL preview unfurling.

## Add link unfurling to your app manifest

To add link unfurling to your app manifest, add a new `messageHandlers` array to the `composeExtensions` section of your app manifest JSON. You can add the array either with the help of App Studio or manually. Domain listings can include wildcards, for example `*.example.com`. This matches exactly one segment of the domain; if you need to match `a.b.example.com` then use `*.*.example.com`.

> [!NOTE]
> Don't add domains that are not in your control, either directly or through wildcards. For example, `yourapp.onmicrosoft.com` is valid, but `*.onmicrosoft.com` is not valid. Also, the top-level domains are prohibited. For example, `*.com`, `*.org`.

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

For a complete manifest example, see [manifest reference](~/resources/schema/manifest-schema.md).

## Handle the `composeExtension/queryLink` invoke

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