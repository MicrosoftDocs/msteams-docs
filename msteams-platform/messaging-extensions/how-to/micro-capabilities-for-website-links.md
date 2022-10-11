---
title: Micro-capabilities for website links
author: surbhigupta
description: Add link unfurling with messaging extension in a Microsoft Teams app with app manifest or manually. Add link unfurling using Developer Portal. How to update your web service code to handle the invoke request.
ms.localizationpriority: medium
ms.topic: conceptual
ms.author: anclear
---
# Micro-capabilities for website links

The most common way to share content in Microsoft Teams is through links. For any link, Teams unfurls a preview of the link into an Adaptive Card with the information such as image, title, and a description.

You can show rich unfurl previews of your links without installing your app in Microsoft Teams using schema.org and micro-capability templates. Teams uses these templates to unfurl rich previews for your links in Microsoft Teams.

## Add schema.org to your website

[schema.org](https://schema.org/docs/gs.html)is an open-source standard for schemas of structured data on the internet. You can use the schema.org metadata and the micro-capability templates <!--- link to GitHub templates to be added after the PM shares the public link --> to unfurl rich previews for your links in Microsoft Teams.

### Enable rich unfurl previews of links

Specify the [schema.org](https://schema.org/) metadata and the supported `@type` attribute to your website. For each `@type` attribute, include the properties available in the micro-capability template that apply to your web page. Teams uses these templates to unfurl rich previews for your links in Microsoft Teams.

Following are the examples of the supported micro-capability templates and their unfurl experience:

# [Article](#tab/article)

# [Restaurant](#tab/restaurunt)

# [Recipe](#tab/recipe)

# [Local business](#tab/localbuisness)

# [Course](#tab/course)

# [Person](#tab/person)

# [Website](#tab/website)

---

You can validate if your structure data is as per the schema.org requirement. Visit [schema.org validator](https://validator.schema.org/),add your website url and select **RUN TEST**.

> [!NOTE]
> If you've already added [schema.org](<https://schema.org/>) to your website, you can view the rich unfurl preview of your link by pasting it in the Teams message compose area.

   :::image type="content" source="../../assets/images/messaging-extension/link-unfurling-app-less-adaptive-card-experience.png" alt-text="Screenshot shows an example of rich unfurl preview experience when a link is pasted in the Teams message compose area." lightbox="../../assets/images/messaging-extension/link-unfurling-app-less-adaptive-card-experience-teams.png":::

If you've not added [schema.org](<https://schema.org/>) to your website, you can manually check the rich unfurl preview experience by following these steps:

1. Add the [schema.org](https://schema.org/) metadata with the [JASON-LD format](https://json-ld.org/) to your website.
1. In your website, check for the supported `@type` attribute and copy the metadata under the script tag `application/ld+json`.
1. Open [Adaptive Card designer](https://www.adaptivecards.io/designer/) and create a new file.
1. In the **SAMPLE DATA EDITOR**, paste the json metadata from your website.

   :::image type="content" source="../../assets/images/messaging-extension/link-unfurling-app-less-adaptive-card-sample-data-editor.png" alt-text="Screenshot shows an example of website metadata in the sample data editor section of the Adaptive Card Designer.":::

1. Check the micro-capability template and add the template code in the **CARD PAYLOAD EDITOR**.

   :::image type="content" source="../../assets/images/messaging-extension/link-unfurling-app-less-adaptive-card-payload-editor.png" alt-text="Screenshots shows an example of micro-capability template added in the card payload editor in Adaptive Card Designer.":::

   If required, add new attributes from the template to your website metadata in the **SAMPLE DATA EDITOR**.

1. To preview the Adaptive Card unfurl experience, select **Preview mode**.

See the following video to learn more about link unfurling:
<br>
> [!VIDEO <https://www.microsoft.com/en-us/videoplayer/embed/RE4OFZG>]
<br>

## Add link unfurling to your app manifest

To add link unfurling to your app manifest, add a new `messageHandlers` array to the `composeExtensions` section in the app manifest. You can manually add the array or using the Developer Portal. Domain listings can include wildcards, for example `*.example.com`. This matches exactly one segment of the domain; if you need to match `a.b.example.com` then use `*.*.example.com`.

> [!NOTE]
> Don't add domains that are not in your control, either directly, or through wildcards. For example, `yourapp.onmicrosoft.com` is valid, but `*.onmicrosoft.com` is not valid. The top-level domains are prohibited, for example, `*.com`, `*.org`.

### Add link unfurling using Developer Portal

1. Open **Developer Portal** from the Microsoft Teams client and then select the **Apps** tab.
1. Load your app manifest.
1. On the **Messaging Extension** page under **App features**, select existing bot or create a new bot.
1. Select **Save**.
1. Select **Add a domain** under **Preview links** section and then enter valid domain.
1. Select **Add**. The following image explains the process:

   :::image type="content" source="../../assets/images/tdp/add-domain-button.PNG" alt-text="Screenshot shows an example of the message handlers section in Developer Portal." lightbox="../../assets/images/tdp/add-domain.PNG":::

### Add link unfurling manually

> [!NOTE]
> If authentication is added through Azure AD, [unfurl links in Teams using bot](/microsoftteams/platform/sbs-botbuilder-linkunfurling?tabs=vs&tutorial-step=4).

To enable your message extension to interact with links, first you must add the `messageHandlers` array to your app manifest. You can manually add link unfurling using the following example:

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

Example of the `invoke` sent to your bot:

```json
{
  "type": "invoke",
  "name": "composeExtension/queryLink",
  "value": {
    "url": "https://theurlsubmittedbyyouruser.trackeddomain.com/id/1234"
  }
}
```

Example of the response:

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
