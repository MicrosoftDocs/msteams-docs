---
title: Create an Incoming Webhook
description: Create an Incoming Webhook to Teams app and post external requests to Teams. Remove Incoming Webhook. Sample code(C#, Node.js) to  send card using Incoming Webhook.
ms.localizationpriority: high
ms.topic: article
ms.owner: hantony
ms.date: 10/26/2026
---

# Create Incoming Webhooks

[!INCLUDE [deprecation-note](~/includes/deprecation-note.md)]

An Incoming Webhook lets external applications share content in Microsoft Teams channels. The webhooks are used as tools to track and notify. You create webhooks by using the Workflows app, which provides a unique URL to send a JSON payload with a message in card format. Cards are user interface containers that include content and actions related to a single article. You can use cards in the following capabilities:

* Bots
* Message extensions
* Workflows

> [!NOTE]
>
> * The message size limit is 28 KB. When the size exceeds 28 KB, you receive an error. For more information, see [Limits and specifications for Microsoft Teams](/microsoftteams/limits-specifications-teams).
> * If more than four requests are made in a second, the client connection is throttled until the window refreshes for the duration of the fixed rate. A [retry logic with exponential backoff](/azure/architecture/patterns/retry) can mitigate rate limiting for cases where requests exceed the limits within a second. To avoid hitting the rate limits, see [HTTP 429 responses](../../bots/how-to/rate-limit.md#handle-http-429-responses).

## Key features of Incoming Webhooks

The following table provides the features and description of an Incoming Webhook:

| Features | Description |
| -------- | ----------- |
|Adaptive Cards using an Incoming Webhook | Workflows webhooks support Adaptive Card and MessageCard payloads. For more information, see [Send Adaptive Cards using Incoming Webhooks](../../webhooks-and-connectors/how-to/connectors-using.md#send-adaptive-cards-using-an-incoming-webhook).|
|Card payload support | MessageCard payloads render content but don't support interactive HTTP POST action buttons. For interactive cards, use Adaptive Cards and configure the workflow to handle card responses. For more information, see [Legacy actionable message card reference](/outlook/actionable-messages/message-card-reference).|
|Independent HTTPS messaging support|Cards provide information clearly and consistently. Any tool or framework that can send HTTPS POST requests can send messages to Teams through a workflow webhook URL.|
|Markdown support|All text fields in cards support basic Markdown. Don't use HTML markup in your cards. HTML is ignored and treated as plain text.|
|Scoped configuration|A workflow webhook is configured for a specific channel or chat. Workflows webhooks support private channels. You can configure them through the Power Automate portal or the Workflows app in Teams.|
|Secure resource definitions|Messages are formatted as JSON payloads. This declarative messaging structure prevents the insertion of malicious code.|

<!--- TBD: A note should be short and eye-catching. No need to put a list item inside a Note or any admonition for that matter. Re-write the below list item.
--->

> [!NOTE]
>
> * Teams bots, message extensions, Incoming Webhook, and the Bot Framework support Adaptive Cards. Adaptive Card is an open cross-card platform framework that is used in all platforms such as Windows, Android, and iOS.
> * For more information on cards and webhooks, see [Adaptive Cards and Incoming Webhooks](~/task-modules-and-cards/what-are-cards.md#adaptive-cards-and-incoming-webhooks).

## Create Webhooks using Workflows

The **Workflows** app in Microsoft Teams enables you to create automated workflows that can receive HTTP requests through a webhook URL. When the webhook triggers, the workflow can post a message or an Adaptive Card to a Teams channel or chat.

Workflows are powered by Microsoft Power Automate and provide a flexible way to process webhook payloads before posting them to Teams.

### Create an incoming webhook from a template

You can create a webhook workflow directly from a channel using a template.

1. In **Microsoft Teams**, go to the team and channel where you want to receive webhook messages.
1. Select **More options (...)** next to the channel.
1. Select **Workflows**.
   :::image type="content" source="../../assets/images/connectors/add-workflows.png" alt-text="Workflows option selected in the channel menu.":::
1. Search for and select a template such as **Send webhook alerts to a channel**.
   :::image type="content" source="../../assets/images/connectors/workflows-template-selection.png" alt-text="Select the Send webhook alerts to a channel template.":::
1. Configure the workflow parameters.
   :::image type="content" source="../../assets/images/connectors/workflows-parameters.png" alt-text="Add the parameters.":::
1. Select **Save**.
1. After the workflow is created, copy the webhook link.
   :::image type="content" source="../../assets/images/connectors/workflows-url-copy.png" alt-text="Copy the webhook URL generated by the workflow.":::
Use the webhook URL in your external application or service to send HTTP POST requests.

When a request is received, the workflow posts the configured message to the selected channel.

### Send a request to the webhook

After creating the workflow, send an HTTP POST request to the generated webhook URL.

```http
POST <WEBHOOK_URL>
Content-Type: application/json

{
    "text": "Hello from a webhook workflow!"
}
```

When the request is received, the workflow processes the payload and posts the message to the configured Teams channel or chat.

### When to use Workflows for webhooks

Use Workflows when you need to:

* Receive webhook requests from external services.
* Post Message Cards or Adaptive Cards to Teams channels or chats.
* Transform or process webhook payloads before posting them to Teams.
* Integrate webhook events with other services supported by Power Automate.

> [!IMPORTANT]
> You can build a notification bot Teams app using [Microsoft 365 Agents Toolkit](../../toolkit/agents-toolkit-fundamentals.md) (previously known as Teams Toolkit) other than an Incoming Webhook. They perform similarly but notification bot has more functionalities. For more information, see [Build notification bot with JavaScript](../../sbs-gs-notificationbot.yml) or [Incoming Webhook notification sample](https://github.com/OfficeDev/TeamsFx-Samples/tree/dev/incoming-webhook-notification).

You can create and send messages through a workflow webhook. For more information, see [create and send messages](~/webhooks-and-connectors/how-to/connectors-using.md).

### Supported payload formats

Workflows webhooks support Adaptive Card and MessageCard payloads. MessageCard payloads render content but don't support interactive HTTP POST action buttons. For interactive cards, use Adaptive Cards and configure the workflow to handle card responses.

### Example

In the following examples, replace the webhook URL with the URL generated by your workflow.

# [C#](#tab/dotnet)

[Sample code reference](https://github.com/OfficeDev/Microsoft-Teams-Samples/blob/main/samples/TeamsJS/incoming-webhook/csharp/IncomingWebhook/Controllers/CardController.cs#L28)

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

var webhookUrl = "<WORKFLOW_WEBHOOK_URL>";

var client = new HttpClient();
client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

var content = new StringContent(adaptiveCardJson, System.Text.Encoding.UTF8, "application/json");
var response = await client.PostAsync(webhookUrl, content);
```

# [JavaScript](#tab/javascript)

[Sample code reference](https://github.com/OfficeDev/Microsoft-Teams-Samples/blob/main/samples/TeamsJS/incoming-webhook/nodejs/api/server/index.js#L28)

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

var webhookUrl = "<WORKFLOW_WEBHOOK_URL>";

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

## Manage your workflows

You can manage your workflows by turning them on or off, or by deleting them when no longer needed.

### Turn on or turn off your workflow

Turn on or turn off a workflow at any time from the Workflows app.

1. Open the **Workflows** app.
1. Scroll down the **Home** page to find the **Your workflows** section.
1. Next to the workflow you want to turn on or turn off, select **More actions (…)**.
1. From the menu, select **Turn on** or **Turn off**.

   :::image type="content" source="../../assets/images/connectors/workflows-turn-on-off.png" alt-text="Workflows-turnon-off.":::

### Delete your workflow

Remove a workflow from your list at any time.

1. Open the **Workflows** app.
1. Scroll down the **Home** page to find the **Your workflows** section.
1. Next to the workflow you want to delete, select **More actions (…)**.
1. Select **Delete**.
   :::image type="content" source="../../assets/images/connectors/workflow-delete.png" alt-text="Workflow-delete.":::

1. In the confirmation window, select **Delete** to permanently remove the workflow.

   :::image type="content" source="../../assets/images/connectors/workflow-delete-pop-up.png" alt-text="Workflow-delete-popup.":::

---

## Code sample

| Sample name | Description | .NET | Node.js |
|---------------------|--------------|---------|--------|
| Incoming Webhook |This sample demonstrates a Teams tab to send cards using a webhook URL. Update the sample to use the URL generated by your workflow. |[View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/TeamsJS/incoming-webhook/csharp)|[View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/TeamsJS/incoming-webhook/nodejs)|

## See also

* [Create Outgoing Webhooks](~/webhooks-and-connectors/how-to/add-outgoing-webhook.md)
* [Build bots for Teams](../../bots/what-are-bots.md)
* [Message extensions](../../messaging-extensions/what-are-messaging-extensions.md)
* [Integrate web apps](../../samples/integrate-web-apps-overview.md)
* [Share to Teams from web apps](../../concepts/build-and-test/share-to-teams-from-web-apps.md)
