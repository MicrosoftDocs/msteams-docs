---
title: Create an Incoming Webhook
description: Create an Incoming Webhook to Teams app and post external requests to Teams. Remove Incoming Webhook. Sample code(C#, Node.js) to  send card using Incoming Webhook.
ms.localizationpriority: high
ms.topic: conceptual
ms.owner: hantony
ms.date: 01/25/2023
---

# Create Incoming Webhooks

[!INCLUDE [deprecation-note](~/includes/deprecation-note.md)]

An Incoming Webhook lets external applications share content in Microsoft Teams channels. The webhooks are used as tools to track and notify. The webhooks provide a unique URL to send a JSON payload with a message in card format. Cards are user interface containers that include content and actions related to a single article. You can use cards in the following capabilities:

* Bots
* Message extensions
* Connectors

> [!NOTE]
>
> * The message size limit is 28 KB. When the size exceeds 28 KB, you receive an error. For more information, see [Limits and specifications for Microsoft Teams](/microsoftteams/limits-specifications-teams).
> * If more than four requests are made in a second, the client connection is throttled until the window refreshes for the duration of the fixed rate. A [retry logic with exponential backoff](/azure/architecture/patterns/retry) can mitigate rate limiting for cases where requests exceed the limits within a second. To avoid hitting the rate limits, see [HTTP 429 responses](../../bots/how-to/rate-limit.md#handle-http-429-responses).

## Key features of Incoming Webhooks

The following table provides the features and description of an Incoming Webhook:

| Features | Description |
| -------- | ----------- |
|Adaptive Cards using an Incoming Webhook | Adaptive Cards can be sent through Incoming Webhooks. For more information, see [Send Adaptive Cards using Incoming Webhooks](../../webhooks-and-connectors/how-to/connectors-using.md#send-adaptive-cards-using-an-incoming-webhook).|
|Actionable messaging support | Actionable message cards are supported in all Microsoft 365 groups including Teams. If you send messages through cards, you must use the actionable message card format. For more information, see [Legacy actionable message card reference](/outlook/actionable-messages/message-card-reference) and [message card playground](https://amdesigner.azurewebsites.net/).|
|Independent HTTPS messaging support|Cards provide information clearly and consistently. Any tool or framework that can send HTTPS POST requests can send messages to Teams through an Incoming Webhook.|
|Markdown support|All text fields in actionable messaging cards support basic Markdown. Don't use HTML markup in your cards. HTML is ignored and treated as plain text.|
|Scoped configuration|An Incoming Webhook is scoped and configured at the channel level.|
|Secure resource definitions|Messages are formatted as JSON payloads. This declarative messaging structure prevents the insertion of malicious code.|

<!--- TBD: A note should be short and eye-catching. No need to put a list item inside a Note or any admonition for that matter. Re-write the below list item.
--->

> [!NOTE]
>
> * Teams bots, message extensions, Incoming Webhook, and the Bot Framework support Adaptive Cards. Adaptive Card is an open cross-card platform framework that is used in all platforms such as Windows, Android, and iOS. [Teams connectors](../../webhooks-and-connectors/how-to/connectors-creating.md) don't support Adaptive Cards. However, it is possible to create a [flow](https://flow.microsoft.com/blog/microsoft-flow-in-microsoft-teams/) that posts Adaptive Cards to a Teams channel.
> * For more information on cards and webhooks, see [Adaptive cards and Incoming Webhooks](~/task-modules-and-cards/what-are-cards.md#adaptive-cards-and-incoming-webhooks).

## Create an Incoming Webhook

To add an Incoming Webhook to a Teams channel, follow these steps:

# [New Teams](#tab/newteams)

1. In the New Teams client, select **Teams** :::image type="icon" source="../../assets/images/teams-icon.png" border="false"::: and navigate to the channel where you want to add an Incoming Webhook.

1. Select **More options** &#8226;&#8226;&#8226; on the right side of the channel name.

1. Select **Manage channel**.

    :::image type="content" source="../../assets/images/manage-channel-new-teams.png" alt-text="Screenshot shows the Manage channel option under More options for Teams 2.1.":::

    For members who aren't admins of the channel, the **Manage channel** option is available under the **Open channel details** option in the upper-right corner of a channel.

    :::image type="content" source="../../assets/images/Connectors/manage-channel-non-admin-user.png" alt-text="Screenshot of the Manage channel option for non-admin users." lightbox="../../assets/images/Connectors/manage-channel.png":::

1. Select **Edit**.

    :::image type="content" source="../../assets/images/edit-connector-new-teams.png" alt-text="Screenshot shows the edit option under Connectors option to add an Incoming Webhook.":::

1. Search for **Incoming Webhook** and select **Add**.

   :::image type="content" source="../../assets/images/search-add-webhook.png" alt-text="Screenshot shows the Add option to add an Incoming Webhook.":::

    The Incoming Webhook dialog appears.

1. Select **Add**.

    :::image type="content" source="../../assets/images/add-incoming-webhook.png" alt-text="Screenshot shows the Add option in the Incoming Webhook dialog." lightbox="../../assets/images/add-incoming-webhook-lightbox.png":::

    > [!NOTE]
    > If you’ve already added an Incoming Webhook, the **Configure** option appears. Select **Configure** to create an Incoming Webhook.

1. Provide a name for the webhook and upload an image if necessary.

1. Select **Create**.

   :::image type="content" source="../../assets/images/create-incoming-webhook-new-teams.png" alt-text="Screenshot shows the name and image fields to be filled to create the webhook.":::

1. Copy and save the unique webhook URL present in the dialog. The URL maps to the channel and you can use it to send information to Teams.

1. Select **Done**. The webhook is now available in the Teams channel.

   :::image type="content" source="../../assets/images/url_1-new-teams.png" alt-text="Screenshot shows the unique webhook URL.":::

The following graphical representation provides the steps to create an Incoming Webhook:

:::image type="content" source="../../assets/images/create-incoming-webhook.gif" alt-text="The graphical representation shows the steps to create an Incoming Webhook.":::

# [Classic Teams](#tab/classicteams)

1. In the Classic Teams client, select **Teams** :::image type="icon" source="../../assets/images/teams-icon.png" border="false"::: and navigate to the channel where you want to add an Incoming Webhook.

1. Select **More options** &#8226;&#8226;&#8226; from the upper-right corner.

1. Select **Connectors** from the dropdown menu.

   :::image type="content" source="../../assets/images/connectors_1.png" alt-text="Screenshot shows how to select connector.":::

1. Search for **Incoming Webhook** and select **Add**.

   :::image type="content" source="../../assets/images/search-add-webhook.png" alt-text="Screenshot shows the Add option to add an Incoming Webhook.":::

    The Incoming Webhook dialog appears.

1. Select **Add**.

    :::image type="content" source="../../assets/images/add-incoming-webhook.png" alt-text="Screenshot shows the Add option in the Incoming Webhook dialog." lightbox="../../assets/images/add-incoming-webhook-lightbox.png":::

    > [!NOTE]
    > If you’ve already added an Incoming Webhook, the **Configure** option appears. Select **Configure** to create an Incoming Webhook.

1. Provide a name for the webhook and upload an image if necessary.

1. Select **Create**.

   :::image type="content" source="../../assets/images/create-incoming-webhook.png" alt-text="Screenshot shows the name and image fields to be filled to create the webhook.":::

1. Copy and save the unique webhook URL present in the dialog. The URL maps to the channel and you can use it to send information to Teams.

1. Select **Done**.

   :::image type="content" source="../../assets/images/url_1.png" alt-text="Screenshot shows the unique webhook URL.":::

The webhook is now available in the Teams channel.

---

> [!IMPORTANT]
> You can build a notification bot Teams app using [Teams Toolkit](../../toolkit/teams-toolkit-fundamentals.md) other than an Incoming Webhook. They perform similarly but notification bot has more functionalities. For more information, see [Build notification bot with JavaScript](../../sbs-gs-notificationbot.yml) or [Incoming Webhook notification sample](https://github.com/OfficeDev/TeamsFx-Samples/tree/dev/incoming-webhook-notification).

You can create and send actionable messages through an Incoming Webhook or connector for Microsoft 365 Groups. For more information, see [create and send messages](~/webhooks-and-connectors/how-to/connectors-using.md).

> [!NOTE]
> In Teams, select **Settings** > **Member permissions** > **Allow members to create, update, and remove connectors**, so that any team member can add, modify, or delete a connector.

### Example

# [C#](#tab/dotnet)

[Sample code reference](https://github.com/OfficeDev/Microsoft-Teams-Samples/blob/main/samples/incoming-webhook/csharp/IncomingWebhook/Controllers/CardController.cs#L28)

```csharp
var adaptiveCardJson = @"{
  ""type"": ""message"",
  ""attachments"": [
    {
      ""contentType"": ""application/vnd.microsoft.card.adaptive"",
      ""content"": {
        ""type"": ""AdaptiveCard"",
        ""body"": [
          {
            ""type"": ""TextBlock"",
            ""text"": ""Message Text""
          }
        ],
        ""$schema"": ""http://adaptivecards.io/schemas/adaptive-card.json"",
        ""version"": ""1.0""
      }
    }
  ]
}";

var webhookUrl = "https://xxxxx.webhook.office.com/xxxxxxxxx";

var client = new HttpClient();
client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

var content = new StringContent(adaptiveCardJson, System.Text.Encoding.UTF8, "application/json");
var response = await client.PostAsync(webhookUrl, content);
```

# [JavaScript](#tab/javascript)

[Sample code reference](https://github.com/OfficeDev/Microsoft-Teams-Samples/blob/main/samples/incoming-webhook/nodejs/api/server/index.js#L28)

```javascript
var formatted_Card_Payload = {
        "type": "message",
        "attachments": [
            {
                "contentType": "application/vnd.microsoft.card.adaptive",
                "contentUrl": null,
                "content": {
                    "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
                    "type": "AdaptiveCard",
                    "version": "1.2",
                    "body": [
                        {
                            "type": "TextBlock",
                            "text": "Submitted response:"+ response
                        }
                    ]
                }
            }
        ]
    }

var webhookUrl = "https://xxxxx.webhook.office.com/xxxxxxxxx";

axios.post(webhookUrl , formatted_Card_Payload )
    .then(res => {
        console.log(`statusCode: ${res.status}`)
        console.log(res)
    })
    .catch(error => {
        console.error(error)
    })
```

---

## Remove Incoming Webhooks

To remove an Incoming Webhook from a Teams channel, follow these steps:

# [New Teams](#tab/newteams)

1. In the New Teams client, select the Teams icon :::image type="icon" source="../../assets/images/teams-icon.png" border="false"::: and navigate to the channel where you want to remove an Incoming Webhook.

1. Select **More options** &#8226;&#8226;&#8226; on the right side of the channel name.

1. Select **Manage channel**.

    :::image type="content" source="../../assets/images/manage-channel-new-teams.png" alt-text="Screenshot shows the Manage channel option under More options.":::

1. Select **Edit**.

    :::image type="content" source="../../assets/images/edit-connector-new-teams.png" alt-text="Screenshot shows the edit option under Connectors option.":::

1. In the left pane, select **Configured**.

1. Under Incoming Webhook, select **1 Configured**.

   :::image type="content" source="../../assets/images/configured_1-new-teams.png" alt-text="Screenshot shows how to configure to see list of your connectors.":::

1. Select **Manage**.

   :::image type="content" source="../../assets/images/manage_1.png" alt-text="Screenshot shows how to manage for connector that you want to remove.":::

1. Select **Remove**.

   :::image type="content" source="../../assets/images/Select_Remove.png" alt-text="Select remove"lightbox="../../assets/images/Select_Remove.png":::

   The Remove Configuration dialog appears.

1. Select the required checkboxes.

1. Select **Remove**.

   :::image type="content" source="../../assets/images/finalremove_1.png" alt-text="Screenshot shows how to remove an Incoming Webhook from Teams channel.":::

The webhook is now removed from the Teams channel.

# [Classic Teams](#tab/classicteams)

1. In the Classic Teams client, select the Teams icon :::image type="icon" source="../../assets/images/teams-icon.png" border="false"::: and navigate to the channel where you want to remove an Incoming Webhook.
1. Select **More options** &#8226;&#8226;&#8226; from the upper-right corner.
1. Select **Connectors** from the dropdown menu.
1. In the left pane, select **Configured**.
1. Under Incoming Webhook, select **1 Configured**.

   :::image type="content" source="../../assets/images/configured_1-new-teams.png" alt-text="The screenshot shows how to configure to see list of your connectors.":::

1. Select **Manage**.

   :::image type="content" source="../../assets/images/manage_1.png" alt-text="Screenshot shows how to manage for connector that you want to remove.":::

1. Select **Remove**.

   :::image type="content" source="../../assets/images/Select_Remove.png" alt-text="Select remove"lightbox="../../assets/images/Select_Remove.png":::

   The Remove Configuration dialog appears.

1. Select the required checkboxes.
1. Select **Remove**.

   :::image type="content" source="../../assets/images/finalremove_1.png" alt-text="Screenshot shows how to remove an Incoming Webhook from Teams channel.":::

The webhook is now removed from the Teams channel.

---

## Code sample

| Sample name | Description | .NET | Node.js |
|---------------------|--------------|---------|--------|
| Incoming Webhook |This sample demonstrates a Teams tab to send message cards using Incoming Webhook, showcasing the HttpPOST action for interactive cards. |[View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/incoming-webhook/csharp)|[View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/incoming-webhook/nodejs)|

## See also

* [Create Outgoing Webhooks](~/webhooks-and-connectors/how-to/add-outgoing-webhook.md)
* [Build bots for Teams](../../bots/what-are-bots.md)
* [Message extensions](../../messaging-extensions/what-are-messaging-extensions.md)
* [Integrate web apps](../../samples/integrate-web-apps-overview.md)
* [Share to Teams from web apps](../../concepts/build-and-test/share-to-teams-from-web-apps.md)
