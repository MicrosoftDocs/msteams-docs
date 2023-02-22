---
title: Create and send messages
author: laujan
description: Create actionable messages, send message through Incoming Webhook, connectors for Microsoft 365 Groups, cURL, or PowerShell. Send Adaptive Cards. Time based transaction. 
ms.topic: how-to
ms.localizationpriority: high
---

# Create and send messages

You can create actionable messages and send it through Incoming Webhook or connector for Microsoft 365 Groups.

## Create actionable messages

The actionable messages include six visible buttons on the card. Each button is defined in the `potentialAction` property of the message by using `ActionCard` actions, each with an input type, a text field, a date picker, or a multiple-choice list. Each `ActionCard` has an associated action, for example `HttpPOST`.

The connector cards support the following actions:

* `ActionCard`: Presents one or more input types and associated actions.
* `HttpPOST`: Sends POST request to a URL.
* `OpenUri`: Opens URI in a separate browser or app. Optionally, targets different URIs based on operating systems.

The `ActionCard` action supports three input types:

* `TextInput`: A single line or multiline text field with an optional length limit.
* `DateInput`: A date selector with an optional time selector.
* `MultichoiceInput`: An enumerated list of choices offering either a single selection or multiple selections.

`MultichoiceInput` supports a `style` property that controls whether the list initially appears fully expanded. The default value of `style` depends on the value of `isMultiSelect` as follows:

| `isMultiSelect` | default `style` |
| --- | --- |
| `false` or not specified | `compact` |
| `true` | `expanded` |

To display the multiple-selection list in the compact style, specify `"isMultiSelect": true` and `"style": true`.

For more information on connector card actions, see [Actions](/outlook/actionable-messages/card-reference#actions).

> [!NOTE]
>
> * Specifying `compact` for the `style` property in Microsoft Teams is the same as specifying `normal` for the `style` property in Microsoft Outlook.
> * For the HttpPOST action, the bearer token is included with the requests. This token includes the Microsoft Azure Active Directory (Azure AD) identity of the Microsoft 365 user who took the action.

## Send a message through Incoming Webhook or connector for Microsoft 365 Groups

To send a message through your Incoming Webhook or connector for Microsoft 365 Groups, post a JSON payload to the webhook URL. This payload must be in the form of a [connector card for Microsoft 365 Groups](~/task-modules-and-cards/cards/cards-reference.md#connector-card-for-microsoft-365-groups).

You can also use JSON to create cards containing rich inputs, such as text entry, multiselect, or selecting date and time. The code that generates the card and posts it to the webhook URL can run on any hosted service. These cards are defined as part of actionable messages and are also supported in [cards](~/task-modules-and-cards/what-are-cards.md) used in Teams bots and message extensions.

### Example of connector message

An example of connector message is as follows:

```json
{
    "@type": "MessageCard",
    "@context": "http://schema.org/extensions",
    "themeColor": "0076D7",
    "summary": "Larry Bryant created a new task",
    "sections": [{
        "activityTitle": "Larry Bryant created a new task",
        "activitySubtitle": "On Project Tango",
        "activityImage": "https://teamsnodesample.azurewebsites.net/static/img/image5.png",
        "facts": [{
            "name": "Assigned to",
            "value": "Unassigned"
        }, {
            "name": "Due date",
            "value": "Mon May 01 2017 17:07:18 GMT-0700 (Pacific Daylight Time)"
        }, {
            "name": "Status",
            "value": "Not started"
        }],
        "markdown": true
    }],
    "potentialAction": [{
        "@type": "ActionCard",
        "name": "Add a comment",
        "inputs": [{
            "@type": "TextInput",
            "id": "comment",
            "isMultiline": false,
            "title": "Add a comment here for the task"
        }],
        "actions": [{
            "@type": "HttpPOST",
            "name": "Add comment",
            "target": "https://learn.microsoft.com/outlook/actionable-messages"
        }]
    }, {
        "@type": "ActionCard",
        "name": "Set due date",
        "inputs": [{
            "@type": "DateInput",
            "id": "dueDate",
            "title": "Enter a due date for the task"
        }],
        "actions": [{
            "@type": "HttpPOST",
            "name": "Save",
            "target": "https://learn.microsoft.com/outlook/actionable-messages"
        }]
    }, {
        "@type": "OpenUri",
        "name": "Learn More",
        "targets": [{
            "os": "default",
            "uri": "https://learn.microsoft.com/outlook/actionable-messages"
        }]
    }, {
        "@type": "ActionCard",
        "name": "Change status",
        "inputs": [{
            "@type": "MultichoiceInput",
            "id": "list",
            "title": "Select a status",
            "isMultiSelect": "false",
            "choices": [{
                "display": "In Progress",
                "value": "1"
            }, {
                "display": "Active",
                "value": "2"
            }, {
                "display": "Closed",
                "value": "3"
            }]
        }],
        "actions": [{
            "@type": "HttpPOST",
            "name": "Save",
            "target": "https://learn.microsoft.com/outlook/actionable-messages"
        }]
    }]
}
```

This message provides the following card in the channel:

:::image type="content" source="../../assets/images/connectorcard_1.png" alt-text="Screenshot of a coonector card.":::

## Send messages using cURL and PowerShell

# [cURL](#tab/cURL)

To post a message in the webhook with cURL, follow these steps:

1. Install cURL from [cURL website](https://curl.haxx.se/).

1. From the command line, enter the following cURL command:

   ```bash
   // on macOS or Linux
   curl -H 'Content-Type: application/json' -d '{"text": "Hello World"}' <YOUR WEBHOOK URL>
   ```

   ```bash
   // on Windows
   curl.exe -H "Content-Type:application/json" -d "{'text':'Hello World'}" <YOUR WEBHOOK URL>
   ```

    If the POST succeeds, you must see a simple **1** output by `curl`.

1. Check the Teams client for the new card posted.

# [PowerShell](#tab/PowerShell)

 Prerequisite: Installation of PowerShell and familiarization with its basic usage.

To post a message to the webhook with PowerShell, follow these steps:

1. From the PowerShell prompt, enter the following command:

   ```powershell
   Invoke-RestMethod -Method post -ContentType 'Application/Json' -Body '{"text":"Hello World!"}' -Uri <YOUR WEBHOOK URL>
   ```

    If the POST succeeds, you must see a simple **1** output by `Invoke-RestMethod`.

1. Check the Teams channels associated with the webhook URL. You can see the new card posted to the channel. Before you use the connector to test or publish your app, you must do the following:

    * [Include two icons](../../concepts/build-and-test/apps-package.md#app-icons).
    * Modify the `icons` portion of the manifest to the file names of the icons instead of URLs.

---

## Send Adaptive Cards using an Incoming Webhook

All native Adaptive Card schema elements, except `Action.Submit`, are fully supported. The supported actions are [**Action.OpenURL**](https://adaptivecards.io/explorer/Action.OpenUrl.html), [**Action.ShowCard**](https://adaptivecards.io/explorer/Action.ShowCard.html), and [**Action.ToggleVisibility**](https://adaptivecards.io/explorer/Action.ToggleVisibility.html).

To send Adaptive Cards through an Incoming Webhook, follow these steps:

1. [Set up a custom webhook](~/webhooks-and-connectors/how-to/add-incoming-webhook.md) in Teams.
1. Create Adaptive Card JSON file using the following code:

    ```json
    {
       "type":"message",
       "attachments":[
          {
             "contentType":"application/vnd.microsoft.card.adaptive",
             "contentUrl":null,
             "content":{
                "$schema":"http://adaptivecards.io/schemas/adaptive-card.json",
                "type":"AdaptiveCard",
                "version":"1.2",
                "body":[
                    {
                    "type": "TextBlock",
                    "text": "For Samples and Templates, see [https://adaptivecards.io/samples](https://adaptivecards.io/samples)"
                    }
                ]
             }
          }
       ]
    }
    ```

    The properties for Adaptive Card JSON file are as follows:

    * The `"type"` field must be `"message"`.
    * The `"attachments"` array contains a set of card objects.
    * The `"contentType"` field must be set to Adaptive Card type.
    * The `"content"` object is the card formatted in JSON.

1. Test your Adaptive Card with Postman:

    * Test the Adaptive Card using [Postman](https://www.postman.com) to send a POST request to the URL, created to set up Incoming Webhook.
    * Paste the JSON file in the body of the request and view the Adaptive Card message in Teams.

> [!TIP]
> Use Adaptive Card [code samples and templates](https://adaptivecards.io/samples) to test the body of POST request.

## Rate limiting for connectors

Application rate limits control the traffic that a connector or an Incoming Webhook is permitted to generate on a channel. Teams track requests using a fixed rate window and incremental counter measured in seconds. If more than four requests are made in a second, the client connection is throttled until the window refreshes during the fixed rate.

### Transactions per second thresholds

The following table provides the time based transaction details:

| Time in seconds  | Maximum allowed requests  |
|---|---|
| 1   | 4  |  
| 30   | 60  |  
| 3600   | 100  |
| 7200 | 150  |
| 86400  | 1800  |

A [retry logic with exponential back-off](/azure/architecture/patterns/retry) can mitigate rate limiting for cases where requests are exceeding the limits within a second. For more information to avoid hitting rate limit see [HTTP 429 responses](../../bots/how-to/rate-limit.md#handle-http-429-responses).

```csharp
// Please note that response body needs to be extracted and read 
// as Connectors do not throw 429s
try
{
    // Perform Connector POST operation     
    var httpResponseMessage = await _client.PostAsync(IncomingWebhookUrl, new StringContent(content));
    // Read response content
    var responseContent = await httpResponseMessage.Content.ReadAsStringAsync();
    if (responseContent.Contains("Microsoft Teams endpoint returned HTTP error 429")) 
    {
        // initiate retry logic
    }
}
```

These limits are in place to reduce spamming a channel by a connector and ensures an optimal experience to users.

## See also

* [Webhooks and connectors](../what-are-webhooks-and-connectors.md)
* [Create Incoming Webhooks](~/webhooks-and-connectors/how-to/add-incoming-webhook.md)
* [Create Outgoing Webhooks](~/webhooks-and-connectors/how-to/add-outgoing-webhook.md)
* [Rate limiting for Teams bots messages](~/bots/how-to/rate-limit.md)
* [Build tabs with Adaptive Cards](../../tabs/how-to/build-adaptive-card-tabs.md)
* [Format cards in Microsoft Teams](../../task-modules-and-cards/cards/cards-format.md)
* [Adaptive Cards](../../task-modules-and-cards/what-are-cards.md#adaptive-cards)
* [App manifest schema for Teams](../../resources/schema/manifest-schema.md)
