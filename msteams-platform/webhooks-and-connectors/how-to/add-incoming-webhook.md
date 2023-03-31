---
title: Create an Incoming Webhook
author: laujan
description: Create Incoming Webhook to Teams app and post external requests to Teams. Remove Incoming Webhook. Sample code(C#, Node.js) to  send card using Incoming Webhook.
ms.localizationpriority: high
ms.topic: conceptual
ms.author: lajanuar
---

# Create Incoming Webhooks

An Incoming Webhook lets external applications to share content in Microsoft Teams channels. The webhooks are used as tools to track and notify. The webhooks provide a unique URL, to send a JSON payload with a message in card format. Cards are user interface containers that include content and actions related to a single article. You can use cards in the following capabilities:

* Bots
* Message extensions
* Connectors

> [!IMPORTANT]
> You can choose to build notification bot Teams app other than Incoming Webhooks. They perform similarly but notification bot has more functionalities. For more information, see [Build notification bot with JavaScript](../../sbs-gs-notificationbot.yml) or [Incoming Webhook notification sample](https://github.com/OfficeDev/TeamsFx-Samples/tree/dev/incoming-webhook-notification). To get started, download and explore [Teams Toolkit](https://marketplace.visualstudio.com/items?itemName=TeamsDevApp.ms-teams-vscode-extension). For more information, see [Teams Toolkit documents](../../toolkit/teams-toolkit-fundamentals.md).

> [!NOTE]
>
> * The message size limit is 28 KB. When the size exceeds 28 KB, you receive an error. For more information, see [Limits and specifications for Microsoft Teams](/microsoftteams/limits-specifications-teams).
> * If more than four requests are made in a second, the client connection is throttled until the window refreshes for the duration of the fixed rate. A [retry logic with exponential backoff](/azure/architecture/patterns/retry) can mitigate rate limiting for cases where requests exceed the limits within a second. To avoid hitting the rate limits, see [HTTP 429 responses](../../bots/how-to/rate-limit.md#handle-http-429-responses).

See the following video to learn how to create Incoming Webhooks:
<br>

> [!VIDEO https://www.microsoft.com/en-us/videoplayer/embed/RE4ODcY]

## Key features of Incoming Webhooks

The following table provides the features and description of an Incoming Webhook:

| Features | Description |
| -------- | ----------- |
|Adaptive Cards using an Incoming Webhook | Adaptive Cards can be sent through Incoming Webhooks. For more information, see [Send Adaptive Cards using Incoming Webhooks](../../webhooks-and-connectors/how-to/connectors-using.md#send-adaptive-cards-using-an-incoming-webhook).|
|Actionable messaging support|Actionable message cards are supported in all Microsoft 365 groups including Teams. If you send messages through cards, you must use the actionable message card format. For more information, see [Legacy actionable message card reference](/outlook/actionable-messages/message-card-reference) and [message card playground](https://messagecardplayground.azurewebsites.net).|
|Independent HTTPS messaging support|Cards provide information clearly and consistently. Any tool or framework that can send HTTPS POST requests can send messages to Teams through an Incoming Webhook.|
|Markdown support|All text fields in actionable messaging cards support basic Markdown. Don't use HTML markup in your cards. HTML is ignored and treated as plain text.|
|Scoped configuration|Incoming Webhook is scoped and configured at the channel level.|
|Secure resource definitions|Messages are formatted as JSON payloads. This declarative messaging structure prevents the insertion of malicious code.|

<!--- TBD: A note should be short and eye-catching. No need to put a list item inside a Note or any admonition for that matter. Re-write the below list item.
--->

> [!NOTE]
>
> * Teams bots, message extensions, Incoming Webhook, and the Bot Framework support Adaptive Cards. Adaptive Card is an open cross-card platform framework that is used in all platforms such as Windows, Android, iOS, and so on. Currently, [Teams connectors](../../webhooks-and-connectors/how-to/connectors-creating.md) don't support Adaptive Cards. However, it is possible to create a [flow](https://flow.microsoft.com/blog/microsoft-flow-in-microsoft-teams/) that posts Adaptive Cards to a Teams channel.
> * For more information on cards and webhooks, see [Adaptive cards and Incoming Webhooks](~/task-modules-and-cards/what-are-cards.md#adaptive-cards-and-incoming-webhooks).

## Create Incoming Webhooks

To add an Incoming Webhook to a Teams channel, follow these steps:

1. Open the channel in which you want to add the webhook and select &#8226;&#8226;&#8226; from the upper-right corner.
1. Select **Connectors** from the dropdown menu.

   :::image type="content" source="../../assets/images/connectors_1.png" alt-text="This screenshot show how to select connector.":::

1. Search for **Incoming Webhook** and select **Add**.
1. Select **Configure**, provide a name, and upload an image for your webhook if necessary.

   :::image type="content" source="../../assets/images/configure_1.png" alt-text="This screenshot shows how to configure and upload an image for your webhooks.":::

1. Copy and save the unique webhook URL present in the dialog. The URL maps to the channel and you can use it to send information to Teams.

1. Select **Done**.

   :::image type="content" source="../../assets/images/url_1.png" alt-text="This screenshot shows the unique webhook URL.":::

The webhook is now available in the Teams channel.

You can create and send actionable messages through Incoming Webhook or connector for Microsoft 365 Groups. For more information, see [Create and send messages](~/webhooks-and-connectors/how-to/connectors-using.md).

> [!NOTE]
> In Teams, select **Settings** > **Member permissions** > **Allow members to create, update, and remove connectors**, so that any team member can add, modify, or delete a connector.

**Example**

# [C#](#tab/dotnet)

[Sample code reference](https://github.com/OfficeDev/Microsoft-Teams-Samples/blob/main/samples/incoming-webhook/csharp/IncomingWebhook/Controllers/CardController.cs#L28)

```csharp
var adaptiveCardJson = @"{
    ""type"": ""AdaptiveCard"",
    ""body"": [
        {
            ""type"": ""TextBlock"",
            ""text"": ""Message Text""
        }
    ],
    ""$schema"": ""http://adaptivecards.io/schemas/adaptive-card.json"",
    ""version"": ""1.0""
}";

var webhookUrl = "https://xxxxx.webhook.office.com/xxxxxxxxx";

var client = new HttpClient();
client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

var content = new StringContent(adaptiveCardJson, System.Text.Encoding.UTF8, "application/json");
var response = await client.PostAsync(webhookUrl, content);
```

# [JavaScript](#tab/javascript)

[Sample code reference](https://github.com/OfficeDev/Microsoft-Teams-Samples/blob/main/samples/incoming-webhook/nodejs/api/server/index.js#L16)

```javascript
 axios.post({{WebhookUrl}}, {{formatted_Card_Payload}})
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

1. Open the channel and select &#8226;&#8226;&#8226; from the upper-right corner.
1. Select **Connectors** from the dropdown menu.
1. Select **Configured** under **MANAGE**.
1. Select the **1 Configured** to see a list of your current connectors.

   :::image type="content" source="../../assets/images/configured_1.png" alt-text="This screenshot shows how to configured to see list of your current connectors.":::

1. Select **Manage** for the connector that you want to remove.

   :::image type="content" source="../../assets/images/manage_1.png" alt-text="This screenshot shows how to manage for connector that you want to remove.":::

1. Select **Remove**.

   :::image type="content" source="../../assets/images/Select_Remove.png" alt-text="Select remove"lightbox="../../assets/images/Select_Remove.png":::

   The **Remove Configuration** window appears.

1. Select the required checkboxes.
1. Select **Remove**.

   :::image type="content" source="../../assets/images/finalremove_1.png" alt-text="This screenshot shows how to remove an Incoming Webhooks from Teams channel.":::

## Code sample

| Sample Name       | Description | .NET    |  Node.js |Manifest |
|---------------------|--------------|---------|--------|--------|
|Task module sample bots-V4 | This sample shows how to create task modules using bot framework v4 and teams tabs. |[View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/bot-task-module/csharp)|[View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/bot-task-module/nodejs)|[View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/bot-task-module/csharp/demo-manifest/bot-task-module.zip)|

## See also

* [Webhooks and connectors](../what-are-webhooks-and-connectors.md)
* [Create Outgoing Webhooks](~/webhooks-and-connectors/how-to/add-outgoing-webhook.md)
* [Create connectors for Microsoft 365 Groups](~/webhooks-and-connectors/how-to/connectors-creating.md)
* [Create and send messages](~/webhooks-and-connectors/how-to/connectors-using.md)
* [Build bots for Teams](../../bots/what-are-bots.md)
* [Message extensions](../../messaging-extensions/what-are-messaging-extensions.md)
* [Card actions](../../task-modules-and-cards/cards/cards-actions.md)
* [Integrate web apps](../../samples/integrate-web-apps-overview.md)
* [Share to Teams from web apps](../../concepts/build-and-test/share-to-teams-from-web-apps.md)
* [Secure access and data in Azure Logic Apps](/azure/logic-apps/logic-apps-securing-a-logic-app?tabs=azure-portal)
