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

The document guides you on how to add link unfurling to your app manifest using Developer Portal and manually. With link unfurling, your app can register to receive an invoke activity when URLs with a particular domain are pasted into the compose message area. The `invoke` contains the full URL that was pasted into the compose message area, and you can respond with a card that the user can unfurl, providing additional information or actions. This works similar to a search command with the URL serving as the search term. You can now add link unfurling to Microsoft Teams without installing the app.

:::image type="content" source="../../assets/images/tdp/link-unfurling-adaptive-cards1.png" alt-text="Screenshot shows the link unfurling experience for a Teams app installed or not installed in Teams and other apps." lightbox="../../assets/images/tdp/link-unfurling-adaptive-cards1.png":::

> [!NOTE]
>
> * The link unfurling result is cached for 30 minutes.
> * Link unfurling supports Adaptive Cards version 1.3 and earlier.
> * Messaging extension commands aren't required for Link unfurling. However, there must be at least one command in manifest as it is a mandatory property in messaging extensions. For more information, see [compose extensions](/microsoftteams/platform/resources/schema/manifest-schema#composeextensions).
> * For mobile client, link unfurling is supported only for links that don't require authentication.

The following image is an example of link unfurling in Teams desktop and mobile clients:

# [Desktop](#tab/desktop)

When a link is pasted into the Teams compose message area, the link unfurls into a card with the work item details.

:::image type="content" source="../../assets/images/messaging-extension/messagingextensions_linkunfurl.png" alt-text="Screenshot of link unfurling example for Azure Dev Ops links pasted in teams compose message area.":::

# [Mobile](#tab/mobile)

When an app link is pasted into the Teams compose message area, the link unfurls into a card with the link details.

:::image type="content" source="../../assets/images/messaging-extension/android-linkunfurl.png" alt-text="Screenshot shows you the link unfurling in Android mobile client.":::

---

See the following video to learn more about link unfurling:
<br>
> [!VIDEO https://www.microsoft.com/en-us/videoplayer/embed/RE4OFZG]
<br>

## Add link unfurling to your app manifest

To add link unfurling to your app manifest, add a new `messageHandlers` array to the `composeExtensions` section of your app manifest JSON. You can add the array with the help of Developer Portal or manually. Domain listings can include wildcards, for example `*.example.com` that matches exactly one segment of the domain. If you need to match `a.b.example.com`, then use `*.*.example.com`.

> [!NOTE]
> Ensure that you don't add domains that aren't in your control, either directly or through wildcards. For example, `yourapp.onmicrosoft.com` is valid, but `*.onmicrosoft.com` isn't valid. The top-level domains are prohibited, for example, `*.com`, `*.org`.

### Add link unfurling using Developer Portal

1. Open **Developer Portal** from the Microsoft Teams client and then select the **Apps** tab.

   :::image type="content" source="../../assets/images/tdp/create-new-app.png" alt-text="Screenshot shows Developer portal with Apps highlighted in red." lightbox="../../assets/images/tdp/create-new-app.png":::

   > [!NOTE]
   > You must add Developer Portal app, if you don't have it added in your Teams client.

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
> If authentication is added through Microsoft Entra ID, [unfurl links in Teams using bot](/microsoftteams/platform/sbs-botbuilder-linkunfurling?tabs=vs&tutorial-step=4).

First, you must add the `messageHandlers` array to your app manifest and enable your message extension to interact with links. The following example explains how to add link unfurling manually:

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

## Handle the `composeExtensions/queryLink` invoke

After adding the domain to the app manifest, you must update your web service code to handle the `invoke` request. Use the received URL to search your service and create a card response. If you respond with more than one card, only the first card response is used.

> [!Note]
> The response from a bot must include a `preview` property.

The following card types are supported:

* [Adaptive Card](~/task-modules-and-cards/cards/cards-reference.md#adaptive-card)
* [Thumbnail card](~/task-modules-and-cards/cards/cards-reference.md#thumbnail-card)
* [Hero card](~/task-modules-and-cards/cards/cards-reference.md#hero-card)
* [Connector card for Microsoft 365 Groups](../../task-modules-and-cards/cards/cards-reference.md#connector-card-for-microsoft-365-groups)

For more information, see [Action type invoke](~/task-modules-and-cards/cards/cards-actions.md#action-type-invoke).

The following code is an example of the `invoke` request:

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

Example of the response:

```json
{
 "composeExtension":
   {
     "type": "result",
     "attachmentLayout": "list",
     "attachments": 
     [
       {
         "contentType": "application/vnd.microsoft.card.adaptive",
         "preview": 
          {
            "contentType": "application/vnd.microsoft.card.adaptive",
            "content": << Card Payload >>
          },
          "contentType": "application/vnd.microsoft.card.adaptive",
          "content": << Card Payload >>
       }
      ]
   }
}
      
```

# [C#](#tab/dotnet)

```csharp
 protected override Task<MessagingExtensionResponse> OnTeamsAppBasedLinkQueryAsync(ITurnContext<IInvokeActivity> turnContext, AppBasedLinkQuery query, CancellationToken cancellationToken)
  {
     AdaptiveCard adaptiveCard = new AdaptiveCard(new AdaptiveSchemaVersion(1, 3));
     adaptiveCard.Body.Add(new AdaptiveTextBlock()
       {
           Text = "Adaptive Card",
           Size = AdaptiveTextSize.ExtraLarge
       });
         adaptiveCard.Body.Add(new AdaptiveImage()
         {
           Url = new Uri("https://raw.githubusercontent.com/microsoft/botframework-sdk/master/icon.png")
         });
         var attachments = new MessagingExtensionAttachment()
         {
            Content = adaptiveCard,
            ContentType = AdaptiveCard.ContentType
         };
         return Task.FromResult(new MessagingExtensionResponse
         {
           ComposeExtension = new MessagingExtensionResult
             {
               AttachmentLayout = "list",
               Type = "result",
               Attachments = new List<MessagingExtensionAttachment>
                 {
                    new MessagingExtensionAttachment
                    {
                      Content = adaptiveCard,
                      ContentType = AdaptiveCard.ContentType,
                      Preview = attachments,
                    },       
                  },
              },
         }); 
   }

```

# [JavaScript](#tab/javascript)

```javascript

handleTeamsAppBasedLinkQuery(context, query) {
   const card = CardFactory.adaptiveCard({
   "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
   "type": "AdaptiveCard",
   "version": "1.3"
   });
const attachment = CardFactory.adaptiveCard(card);
attachment.preview = {
   content: {
     title: "Thumbnail Card",
     text: query.url,
     images: [
       {
          url: "https://raw.githubusercontent.com/microsoft/botframework-sdk/master/icon.png",
       },
     ],
   },
contentType: "application/vnd.microsoft.card.thumbnail",
}

```

---

## Micro-capabilities for website links

The most common way to share content in Microsoft Teams is through links. For any link, Teams unfurls a preview of the link into an Adaptive Card with the information such as image, title, and a description.

You can show rich unfurl previews of your links without installing your app in Microsoft Teams. Add the [schema.org metadata](https://schema.org/docs/gs.html) to your website in the [JSON-LD format](https://json-ld.org/) and use the micro-capability templates <!--- link to GitHub templates to be added after the PM shares the public link --> that match your product. Teams uses these templates to unfurl rich previews for your links in Microsoft Teams.

### Enable Rich unfurl previews of links

If you've already added [schema.org](<https://schema.org/>) to your website, you can view the rich unfurl preview of your link by pasting it in the Teams message compose area.

:::image type="content" source="../../assets/images/messaging-extension/link-unfurling-app-less-adaptive-card-experience.png" alt-text="Screenshot shows an example of rich unfurl preview experience when a link is pasted in the Teams message compose area." lightbox="../../assets/images/messaging-extension/link-unfurling-app-less-adaptive-card-experience-teams.png":::

If you've not added [schema.org](<https://schema.org/>) to your website, you can manually check the rich unfurl preview experience by following these steps:

1. Add the [schema.org](https://schema.org/) metadata with the [JSON-LD format](https://json-ld.org/) to your website.
1. In your website, check for the supported `@type` attribute and copy the metadata under the script tag `application/ld+json`.
1. Open [Adaptive Card designer](https://www.adaptivecards.io/designer/) and create a new file.
1. In the **SAMPLE DATA EDITOR**, paste the json metadata from your website.

   :::image type="content" source="../../assets/images/messaging-extension/link-unfurling-app-less-adaptive-card-sample-data-editor.png" alt-text="Screenshot shows an example of website metadata in the sample data editor section of the Adaptive Card Designer.":::

1. Check the micro-capability template and add the template code in the **CARD PAYLOAD EDITOR**.

   :::image type="content" source="../../assets/images/messaging-extension/link-unfurling-app-less-adaptive-card-payload-editor.png" alt-text="Screenshots shows an example of micro-capability template added in the card payload editor in Adaptive Card Designer.":::

   If required, add new attributes from the template to your website metadata in the **SAMPLE DATA EDITOR**.

1. To preview the Adaptive Card unfurl experience, select **Preview mode**.

For more information, see [Micro-capabilities for website links](micro-capabilities-for-website-links.md).

## Zero install for link unfurling

Zero install link unfurling helps you unfurl previews for your shared links even before a user discovers or installs your app in Teams. You can anonymously unfurl cards with a new `invoke` request or create a preauthenticated Adaptive Card preview for users before they install or authenticate your app.

The following image provides a sequential flow to enable and use zero install link unfurling:

   :::image type="content" source="../../assets/images/tdp/user-flow-image.png" alt-text="Screenshot of the link unfurling code user flow." lightbox="../../assets/images/tdp/user-flow-image.png":::

### Enable zero install link unfurling

To get your app ready for zero install link unfurling, follow these steps:

1. Set the property `supportsAnonymizedPayloads` to true in the [manifest schema](../../resources/schema/manifest-schema.md#composeextensions).

1. Set your app to handle the new `invoke` request `composeExtensions/anonymousQueryLink`.

   Example of the new `invoke` request:

   :::image type="content" source="../../assets/images/tdp/link-unfurl_1.png" alt-text="Screenshot of the `invoke` request  `composeExtensions/anonymousQueryLink` declaration in the manifest." lightbox="../../assets/images/tdp/link-unfurl_1.png":::

   Example of the `invoke` request payload:

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

1. Respond to the `composeExtensions/anonymousQueryLink` payload.

   1. For non-auth scenarios: You must send back a response with the `type` as `result` and a card. Use the following template:

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

   1. For auth scenarios: You must send back a response with the `type` as `auth` with an optional preauth card in the attachments. Use the following template:
  
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

1. Preauth card (for auth only): Create a card preview to unfurl your links for users who don't have your app installed. You can either create a pre-templated card or add relevant placeholder fields for the users to update. Users can learn about the app even before installing it.

   You can create a customized card and add relevant fields. The users can fill in the required information as per the fields. The following image illustrates a customized card preview:

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

    * The bot can only send back a response as `result` or `auth` as the value for the `type` property in response to the `composeExtensions/anonymousQueryLink` invoke request. The user can log an error for all other response types, such as, *silentAuth* and *config*.

    * The bot can't send back an [Adaptive Cards with Universal Actions](../../task-modules-and-cards/cards/Universal-actions-for-adaptive-cards/Overview.md) in response to the `composeExtensions/anonymousQueryLink` invoke request, either as a result or as a pre-auth card in auth.

    * If the bot selects to send back the `"type": "auth"` property with a pre-auth card, Teams strips away any action buttons from the card, and adds a sign in action button to get users to authenticate into your app.

---

## How to test zero install link unfurling

When you test the zero install link unfurling, don’t install the app as a personal app. Instead, upload the app to Teams.

> [!NOTE]
> Don’t run the test app directly from the Microsoft Visual Studio debugger.

To test zero install link unfurling, follow these steps:

1. Sign in to [Teams admin center](https://admin.teams.microsoft.com/).

1. From the left pane, select **Teams apps** > **Manage apps**.

    :::image type="content" source="../../assets/images/teams-link-unfurling/manage-apps-admin.png" alt-text="Screenshot of Teams admin center and section for custom app upload in Teams.":::

1. Select **+ Upload new app**.

    :::image type="content" source="../../assets/images/teams-link-unfurling/upload-app-admin.png" alt-text="Screenshot of Teams admin center and where to upload custom apps":::

1. Select **Upload**.

1. Select **Open** to upload the zip file for your test application.

1. After app upload is successful, go to **Teams** > **Apps** > **Built for your org**.

    :::image type="content" source="../../assets/images/teams-link-unfurling/build-for-your-org.png" alt-text="Screenshot of Teams client with org uploaded Teams app":::

1. You can test the `composeExtensions/anonymousQueryLink` invoke request by setting up a breakpoint in the method that implements the anonymousQueryLink request in your application.

## Remove link unfurling cache

When a user shares a link in a meeting, the Teams app unfurls the link to an Adaptive Card. The link unfurling result is cached in Teams for 30 minutes. You can update your app to set a cache policy and remove cache for the app. This action helps you to show different content in an Adaptive Card when the app's link is shared in a different context in Teams.

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

|**Sample name** | **Description** | **.NET** | **Node.js**| **Manifest**
|----------------|-----------------|--------------|----------------|----------------|
| Zero install link unfurling. | This sample shows how to use Search-based Messaging Extension with a configuration page. This sample also features zero install link unfurling. | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/msgext-search-auth-config/csharp) | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/msgext-search-sso-config/nodejs) | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/blob/main/samples/msgext-search-auth-config/csharp/demo-manifest/msgext-search-auth-config.zip)|

## See also

* [Message extensions](../what-are-messaging-extensions.md)
* [Adaptive Cards](../../task-modules-and-cards/what-are-cards.md#adaptive-cards)
* [Tabs link unfurling and Stageview](../../tabs/tabs-link-unfurling.md)
* [Bot activity handlers](../../bots/bot-basics.md)
