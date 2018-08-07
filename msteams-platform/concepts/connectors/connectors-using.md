---
title: Using Office 365 Connectors
description: Describes how to use Office 365 Connectors in Microsoft Teams
keywords: teams o365 connector
ms.date: 08/08/2018
---

# How to add connectors in Microsoft Teams

Any user can connect a team to services like Trello, GitHub, Bing News, or Twitter and get notified of the team's activity in that service. From tracking a team's progress in Trello to following important hashtags in Twitter, Office 365 Connectors help your team to stay in sync and get more done.

## Access existing Office 365 Connectors from Microsoft Teams

In Microsoft Teams, choose the **More options** (**&#8943;**) button next to the channel name in the list of channels and then choose **Connectors**.

![Screenshot of the "More options" menu next to the channel name, with the Connectors option selected](~/assets/images/connectors/teams-context-menu.png)

In the list, choose **Add** for the Connector you want to use.

![Screenshot of a dialog box showing a list of available Connectors, with a button for adding each one](~/assets/images/connector_list.png)

For more examples, see [Accessing Office 365 Connectors from Microsoft Teams](https://docs.microsoft.com/en-us/outlook/actionable-messages/#accessing-office-365-connectors-from-microsoft-teams).

## Creating messages through Office 365 Connectors

You have two options for posting messages via Connectors:

- Set up a custom incoming webhook if you want an integration just for your team.
- Register a Connector and submit it as a Microsoft Teams app if you want others to use it.

Both options involve posting a simple JSON payload to an HTTP webhook to create the Connector message within Microsoft Teams. (For more details, see [Get started with actionable messages in Office 365](https://docs.microsoft.com/en-us/outlook/actionable-messages/get-started).)

You can also use this JSON to create cards containing rich inputs, such as text entry, multi-select, or picking a date and time. The code that generates the card and posts to the incoming webhook API can be running on any hosted service. These cards are defined as part of actionable messages, and are also supported in [cards](~/concepts/cards/cards) used in Teams bots and Messaging extensions.

### Example Connector message

```json
{
    "@type": "MessageCard",
    "@context": "http://schema.org/extensions",
    "themeColor": "0076D7",
    "summary": "Larry Bryant created a new task",
    "sections": [{
        "activityTitle": "![TestImage](https://47a92947.ngrok.io/Content/Images/default.png)Larry Bryant created a new task",
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
            "target": "http://..."
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
            "target": "http://..."
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
            "target": "http://..."
        }]
    }]
}
```

This message produces the following card in the channel.

![Screenshot of a Connector card](~/assets/images/connectors/connector_message.png)

## Creating actionable messages

The example in the preceding section includes three visible buttons on the card. Each button is defined in the `potentialAction` property of the message by using `ActionCard` actions, each containing an input type: a text field, a date picker, or a multi-choice list. Each `ActionCard` action has an associated action, for example `HttpPOST`.

Connector cards support three types of actions:

- `ActionCard` Presents one or more input types and associated actions
- `HttpPOST` Sends a POST request to a URL
- `OpenUri` Opens a URI in a separate browser or app; optionally targets different URIs based on operating systems

(A fourth action, `ViewAction`, is still supported but no longer needed; use `OpenUri` instead.)

The `ActionCard` action supports three input types:

- `TextInput` A single-line or multiline text field with an optional length limit
- `DateInput` A date selector with an optional time selector
- `MultichoiceInput` A enumerated list of choices offering either a single selection or multiple selections

`MultichoiceInput` supports a `style` property that controls whether the list initially appears fully expanded. The default value of `style` depends on the value of `isMultiSelect`.

| `isMultiSelect` | `style` default |
| --- | --- |
| `false` or not specified | `compact` |
| `true` | `expanded` |

If you want a multiselect list initially displayed in the compact style, you must specify both `"isMultiSelect": true` and `"style": true`.

> [!NOTE]
> Specifying `compact` for the `style` property in Microsoft Teams is the same as specifying `normal` for the `style` property in Microsoft Outlook.

For all other details about Connector card actions, see **[Actions](https://docs.microsoft.com/en-us/outlook/actionable-messages/card-reference#actions)** in the actionable message card reference.

## Setting up a custom incoming webhook

Follow these steps to see how to send a simple card to a Connector.

1. In Microsoft Teams, choose **More options** (**&#8943;**) next to the channel name and then choose **Connectors**.
2. Scroll through the list of Connectors to **Incoming Webhook**, and choose **Add**.
3. Enter a name for the webhook, upload an image to associate with data from the webhook, and choose **Create**.
4. Copy the webhook to the clipboard and save it. You'll need the webhook URL for sending information to Microsoft Teams.
5. Choose **Done**.

### Post a message to the webhook using cURL

The following steps use [cURL](https://curl.haxx.se/). We assume that you have this installed and are familiar with its basic usage.

1. From the command line, enter the following cURL command:

   ```bash
   curl -H "Content-Type: application/json" -d "{\"text\": \"Hello World!\"}" <YOUR WEBHOOK URL>
   ```

2. If the POST succeeds, you should see a simple **1** output by `curl`.
3. Check the Microsoft Team client. You should see the new card posted to the team.

### Post a message to the webhook using PowerShell

The following steps use PowerShell. We assume that you have this installed and are familiar with its basic usage.

1. From the PowerShell prompt, enter the following command:

   ```powershell
   Invoke-RestMethod -Method post -ContentType 'Application/Json' -Body '{"text":"Hello World!"}' -Uri <YOUR WEBHOOK URL>
   ```

2. If the POST succeeds, you should see a simple **1** output by `Invoke-RestMethod`.
3. Check the Microsoft Teams channel associated with the webhook URL. You should see the new card posted to the channel.

- Include two icons, following the instructions in [Icons](~/concepts/apps/apps-package#icons).
- Modify the `icons` portion of the manifest to refer to the file names of the icons instead of URLs.

The following manifest.json file contains the basic elements needed to test and submit your app.

> [!NOTE]
> Replace `id` and `connectorId` in the following example with the GUID of your Connector.

#### Example manifest.json with Connector

```json
{
  "$schema": " https://developer.microsoft.com/en-us/json-schemas/teams/v1.3/MicrosoftTeams.schema.json",
  "manifestVersion": "1.3",
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

## Testing your Connector

To test your Connector, upload it to a team as you would with any other app. You can create a .zip package using the manifest file from the Connectors Developer Dashboard (modified as directed in the preceding section) and the two icon files.

After you upload the app, open the Connectors list from any channel. Scroll to the bottom to see your app in the **Uploaded** section.

![Screenshot of uploaded section in Connector dialog box](~/assets/images/connectors/connector_dialog_uploaded.png)

You can now launch the configuration experience. Be aware that this flow occurs entirely within Microsoft Teams through a pop-up window. Currently, this behavior differs from the configuration experience in Connectors that we created; we are working on unifying the experiences.

To verify that an `HttpPOST` action is working correctly, use your [custom incoming webhook](#setting-up-a-custom-incoming-webhook).

## Publishing your app

> [!NOTE]
> Currently, we do not support users configuring your Connector externally via the **Connect to Office 365** button. Users must visit Microsoft Teams first to add a Connector.

When your app is ready for submission, follow the process to [publish your app to AppSource](~/publishing/apps-publish).
