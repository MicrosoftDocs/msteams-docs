---
title: Sending messages to Connectors and Webhooks
description: Describes how to use Office 365 Connectors in Microsoft Teams
ms.topic: how-to
localization_priority: Normal
keywords: teams o365 connector
---

# Send messages to connectors and webhooks

To send a message through your Office 365 connector or incoming webhook, you post a JSON payload to the webhook URL. Typically, this payload must be in the form of an [Office 365 connector card](~/task-modules-and-cards/cards/cards-reference.md#office-365-connector-card).

You can also use this JSON to create cards containing inputs, such as text entry, multi-select, or picking a date and time. The code that generates the card and posts to the webhook URL can be running on any hosted service. These cards are defined as part of actionable messages and are also supported in [cards](~/task-modules-and-cards/what-are-cards.md) used in Teams bots and messaging extensions.

### Example connector message

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
            "title": "Add a comment here for this task"
        }],
        "actions": [{
            "@type": "HttpPOST",
            "name": "Add comment",
            "target": "https://docs.microsoft.com/outlook/actionable-messages"
        }]
    }, {
        "@type": "ActionCard",
        "name": "Set due date",
        "inputs": [{
            "@type": "DateInput",
            "id": "dueDate",
            "title": "Enter a due date for this task"
        }],
        "actions": [{
            "@type": "HttpPOST",
            "name": "Save",
            "target": "https://docs.microsoft.com/outlook/actionable-messages"
        }]
    }, {
        "@type": "OpenUri",
        "name": "Learn More",
        "targets": [{
            "os": "default",
            "uri": "https://docs.microsoft.com/outlook/actionable-messages"
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
            "target": "https://docs.microsoft.com/outlook/actionable-messages"
        }]
    }]
}
```

This message produces the following card in the channel:

![Screenshot of a connector card](~/assets/images/connectors/connector_message.png)

## Create actionable messages

The example in the preceding section includes three visible buttons on the card. Each button is defined in the `potentialAction` property of the message by using `ActionCard` actions, each containing an input type, a text field, a date picker, or a multi-choice list. Each `ActionCard` action has an associated action, for example `HttpPOST`.

Connector cards support three types of actions:

- `ActionCard`: Presents one or more input types and associated actions.
- `HttpPOST`: Sends a POST request to a URL.
- `OpenUri`: Opens a URI in a separate browser or app, optionally targets different URIs based on operating systems.

The `ActionCard` action supports three input types:

- `TextInput`: A single-line or multiline text field with an optional length limit.
- `DateInput`: A date selector with an optional time selector.
- `MultichoiceInput`: An enumerated list of choices offering either a single selection or multiple selections.

`MultichoiceInput` supports a `style` property that controls whether the list initially appears fully expanded. The default value of `style` depends on the value of `isMultiSelect` as follows:

| `isMultiSelect` | `style` default |
| --- | --- |
| `false` or not specified | `compact` |
| `true` | `expanded` |

If you want a multiselect list to be displayed initially, in the compact style, you must specify both `"isMultiSelect": true` and `"style": true`.

For more information on connector card actions, see **[Actions]**(/outlook/actionable-messages/card-reference#actions) in the actionable message card reference.

> [!NOTE]
> * Specifying `compact` for the `style` property in Microsoft Teams is the same as specifying `normal` for the `style` property in Microsoft Outlook.
> * For the HttpPOST action, the bearer token is included with the requests. This token includes the Azure AD identity of the Office 365 user who took the action.

## Set up a custom incoming webhook

**To send a simple card to a connector**

1. In Microsoft Teams, choose **More options** **&#8943;** next to the channel name and then choose **Connectors**.
2. Scroll through the list of Connectors to **Incoming Webhook**, and choose **Add**.
3. Enter a name for the webhook, upload an image to associate with data from the webhook, and choose **Create**.
4. Copy the webhook to the clipboard and save it. You need the webhook URL for sending information to Microsoft Teams.
5. Choose **Done**.

### Post a message to the webhook using cURL

The following steps use [cURL](https://curl.haxx.se/) and it is assumed that you have this installed and are familiar with its basic usage.

1. From the command line, enter the following cURL command:

   ```bash
   // on macOS or Linux
   curl -H 'Content-Type: application/json' -d '{"text": "Hello World"}' <YOUR WEBHOOK URL>
   ```

   ```bash
   // on Windows
   curl.exe -H "Content-Type:application/json" -d "{'text':'Hello World'}" <YOUR WEBHOOK URL>
   ```

2. If the POST succeeds, you must see a simple **1** output by `curl`.
3. Check the Microsoft Teams client. You must see the new card posted to the team.

### Post a message to the webhook using PowerShell

The following steps use PowerShell and it is assumed that you have this installed and are familiar with its basic usage.

1. From the PowerShell prompt, enter the following command:

   ```powershell
   Invoke-RestMethod -Method post -ContentType 'Application/Json' -Body '{"text":"Hello World!"}' -Uri <YOUR WEBHOOK URL>
   ```

2. If the POST succeeds, you must see a simple **1** output by `Invoke-RestMethod`.
3. Check the Microsoft Teams channel associated with the webhook URL. You can see the new card posted to the channel. Before you use the connector to test or publish your app, you must do the following:

- [Include two icons](../../concepts/build-and-test/apps-package.md#app-icons).
- Modify the `icons` portion of the manifest to refer to the file names of the icons instead of URLs.

The manifest.json file contains the basic elements needed to test and submit your app.

#### Example manifest.json with connector

> [!NOTE]
> Replace `id` and `connectorId` with the GUID of your Connector.

```json
{
  "$schema": "https://developer.microsoft.com/json-schemas/teams/v1.8/MicrosoftTeams.schema.json",
  "manifestVersion": "1.5",
  "id": "e9343a03-0a5e-4c1f-95a8-263a565505a5",
  "version": "1.0",
  "packageName": "com.sampleapp",
  "developer": {
    "name": "Publisher",
    "websiteUrl": "https://www.microsoft.com",
    "privacyUrl": "https://www.microsoft.com",
    "termsOfUseUrl": "https://www.microsoft.com"
  },
  "description": {
    "full": "This is a small sample app we made for you! This app has samples of all capabilities Microsoft Teams supports.",
    "short": "This is a small sample app we made for you!"
  },
  "icons": {
    "outline": "sampleapp-outline.png",
    "color": "sampleapp-color.png"
  },
  "connectors": [
    {
      "connectorId": "e9343a03-0a5e-4c1f-95a8-263a565505a5",
      "scopes": [
        "team"
      ]
    }
  ],
  "name": {
    "short": "Sample App",
    "full": "Sample App"
  },
  "accentColor": "#FFFFFF",
  "needsIdentity": "true"
}
```

## Send Adaptive Cards using an incoming webhook

> [!NOTE]
> * All native Adaptive Card schema elements, except `Action.Submit`, are fully supported.
> * The supported actions are [**Action.OpenURL**](https://adaptivecards.io/explorer/Action.OpenUrl.html), [**Action.ShowCard**](https://adaptivecards.io/explorer/Action.ShowCard.html), and [**Action.ToggleVisibility**](https://adaptivecards.io/explorer/Action.ToggleVisibility.html).

### Flow to send Adaptive Cards through an incoming webhook
**To send Adaptive Cards through incoming webhook**

1. [Setup a custom webhook](#setting-up-a-custom-incoming-webhook) in Teams.</br></br>
2. Create your Adaptive Card JSON file:

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

Properties for Adaptive Card JSON file:

- The `"type"` field must be `"message"`.
- The `"attachments"` array contains a set of card objects.
- The `"contentType"` field must be set to Adaptive Card type.
- The `"content"` object is the card formatted in JSON.

**3.** Test your Adaptive Card with Postman

You can test your Adaptive Card using [Postman](https://www.postman.com) to send a POST request to the URL that you created when you setup your incoming webhook. Paste your JSON file in the body of the request and view your Adaptive Card message in Teams.

>[!TIP]
> You can use Adaptive Card code [samples and templates](https://adaptivecards.io/samples) for the body of your test POST request.

## Test your connector

To test your connector, upload it to a team as you can with any other app. You can create a .zip package using the manifest file from the Connectors Developer Dashboard, modified as directed in the preceding section and the two icon files.

After you upload the app, open the connectors list from any channel. Scroll to the bottom to see your app in the **Uploaded** section.

![Screenshot of uploaded section in Connector dialog box](~/assets/images/connectors/connector_dialog_uploaded.png)

You can now launch the configuration experience. Be aware that this flow occurs entirely within Microsoft Teams through a pop-up window. Currently, this behavior differs from the configuration experience in connectors that was created.

To verify that an `HttpPOST` action is working correctly, use your [custom incoming webhook](#setting-up-a-custom-incoming-webhook).

## Rate limiting for connectors

Application rate limits control the traffic that a connector or an incoming webhook is permitted to generate on a channel. Teams tracks requests using a fixed-rate window and incremental counter measured in seconds. If too many requests are made, the client connection is throttled until the window refreshes for the duration of the fixed rate.

### Transactions per second thresholds

| Time in seconds  | Maximum allowed requests  |
|---|---|
| 1   | 4  |  
| 30   | 60  |  
| 3600   | 100  |
| 7200 | 150  |
| 86400  | 1800  |

A [retry logic with exponential back-off](/azure/architecture/patterns/retry) can mitigate rate limiting for cases where requests are exceeding the limits within a second. Follow [best practices](../../bots/how-to/rate-limit.md#best-practices) to avoid hitting the rate limits.

*See also* [Office 365 Connectors — Microsoft Teams](https://docs.microsoft.com/connectors/teams/)

A [retry logic with exponential back-off](/azure/architecture/patterns/retry) like below would mitigate rate limiting for cases where requests are exceeding the limits within a second. Refer [HTTP 429 responses](../../bots/how-to/rate-limit.md#handle-http-429-responses) to avoid hitting the rate limits.

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
 
These limits are in place to reduce spamming a channel by a connector and ensures an optimal experience to your users.

## See also

[Office 365 Connectors for Microsoft Teams](https://docs.microsoft.com/connectors/teams/)
