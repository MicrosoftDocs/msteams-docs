---
title: Get started with Office 365 Connectors
description: Describes how to get started with Office 365 Connectors in Microsoft Teams
keywords: teams o365 connector
---

# Get started with Office 365 Connectors for Microsoft Teams

Office 365 Connectors are a great way to push your app's rich content into Microsoft Teams. Any user can connect a team to services like Trello, GitHub, Bing News, or Twitter and get notified of the team's activity in that service. From tracking a team's progress in Trello to following important hashtags in Twitter, Office 365 Connectors help your team to stay in sync and get more done.

You can even add actions to your content, turning them into *actionable messages*, so that users can complete tasks directly in the channel. (To learn more about actionable messages in general, see [Actionable messages in Outlook, Office 365 Groups, and Microsoft Teams](https://docs.microsoft.com/en-us/outlook/actionable-messages/).)

>**New:** With Microsoft Teams apps, you can add your existing Office 365 Connector or build a new one to include in Microsoft Teams. See [Build your own Connector](https://docs.microsoft.com/en-us/outlook/actionable-messages/connectors-dev-dashboard#build-your-own-connector) for more information. 

## Accessing Office 365 Connectors from Microsoft Teams

In Microsoft Teams, choose the **More options** (**&#8943;**) button next to the channel name in the list of channels and then choose **Connectors**.

![Screenshot of the "More options" menu next to the channel name, with the Connectors option selected](~/assets/images/connectors/teams-context-menu.png)

In the list, choose **Add** for the Connector you want to use.

![Screenshot of a dialog box showing a list of available Connectors, with a button for adding each one](~/assets/images/connector_list.png)

For more examples, see [Accessing Office 365 Connectors from Microsoft Teams](https://docs.microsoft.com/en-us/outlook/actionable-messages/#accessing-office-365-connectors-from-microsoft-teams).

## Using Office 365 Connector cards in Microsoft Teams

The Office 365 Connector card provides a flexible layout with multiple sections, fields, images, and actions.

Each Connector card can display a maximum of 10 sections; each section can contain a maximum of 5 images and 5 actions.

> [!NOTE]
> Any additional sections, images, or actions in a message do not appear.

All text fields support Markdown and HTML formatting. You can control which sections use Markdown or HTML by setting the `markdown` property in a message. By default, `markdown` is set to `true`; if you want to use HTML instead, set `markdown` to `false`.

If you specify the `themeColor` property, it overrides the `accentColor` property in the app manifest.

To specify the rendering style for `activityImage`, you can set `activityImage` as follows.

| Value | Description |
| --- | --- |
| `avatar` | Default; `activityImage` will be cropped as a circle |
| `article` | `activityImage` will be displayed as a rectangle and retain its aspect ratio |

For all other details about Connector card properties, see the **[Actionable message card reference](https://docs.microsoft.com/en-us/outlook/actionable-messages/card-reference)**. The only Connector card properties that Microsoft Teams does not currently support are as follows:

* `heroImage`
* `hideOriginalBody`
* `startGroup`

If you are using .NET and C# or Node.js, you can use the `O365ConnectorCard` class in the [Microsoft Teams extensions for the Bot Builder SDK](~/get-started/code#microsoft-teams-extensions-for-the-bot-builder-sdk) to send Connector cards from your bot.

## Creating messages through Office 365 Connectors

You have two options for posting messages via Connectors:

- Set up a custom incoming webhook if you want an integration just for your team.
- Register a Connector and submit it as a Microsoft Teams app if you want others to use it.

Both options involve posting a simple JSON payload to an HTTP webhook to create the Connector message within Microsoft Teams. (For more details, see [Get started with actionable messages in Office 365](https://docs.microsoft.com/en-us/outlook/actionable-messages/get-started).)

You can also use the markup to include rich inputs, such as text entry, multi-select, or picking a date and time. The code that generates the card and posts to the incoming webhook API can be running on any hosted service.

#### Example Connector message

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

The example in the preceding section includes three visible buttons on the card. Each button is defined in the `potentialAction` property of the message by using `ActionCard` actions, each containing an input type: a text field, a date picker, or a multichoice list. Each `ActionCard` action has an associated action&mdash;in the example, `HttpPOST`.

Connector cards support three types of actions:

* `ActionCard`&emsp;Presents one or more input types and associated actions
* `HttpPOST`&emsp;Sends a POST request to a URL
* `OpenUri`&emsp;Opens a URI in a separate browser or app; optionally targets different URIs based on operating systems

(A fourth action, `ViewAction`, is still supported but no longer needed; use `OpenUri` instead.)

The `ActionCard` action supports three input types:

* `TextInput`&emsp;A single-line or multiline text field with an optional length limit
* `DateInput`&emsp;A date selector with an optional time selector
* `MultichoiceInput`&emsp;A enumerated list of choices offering either a single selection or multiple selections

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

## Registering your Connector

With Microsoft Teams apps, you can distribute your registered Connector as part of your app package. Whether as a standalone solution, or one of several [capabilities](~/overview#apps-in-microsoft-teams) that your experience enables in Teams, you can [package](~/publishing/apps-package) and [publish](~/publishing/apps-publish) your Connector as part of your Office Store submission, or you can provide it to users directly for uploading within Teams.

To distribute your Connector, you need to register by using the [Connectors Developer Dashboard](https://go.microsoft.com/fwlink/?LinkID=780623). To have your Connector work in Microsoft Teams, select **Microsoft Teams** under **Enable this integration for**.

<img alt="Screenshot of enabling the Connector for Microsoft Teams" src="~/assets/images/connectors/connector_developer_portal.png" height="185" width="336">

> [!IMPORTANT]
> After you choose **Save** in the Connectors Developer Dashboard, your Connector is registered. Do not choose **Publish to Store** (which appears after you choose **Save**); if you want to publish your Connector in the Office Store, follow the instructions in [Publish your Microsoft Teams app to the Office Store](~/publishing/apps-publish).

You can download the auto-generated Teams app manifest from the portal. Before you can use it to test or publish your app, though, you must do the following:

* Include two icons, following the instructions in [Icons](~/publishing/apps-package#icons).
* Modify the `icons` portion of the manifest to refer to the file names of the icons instead of URLs.

The following manifest.json file contains the basic elements needed to test and submit your app.

> [!NOTE]
> Replace `id` and `connectorId` in the following example with the GUID of your Connector.

#### Example manifest.json with Connector

```json
{
  "$schema": "https://statics.teams.microsoft.com/sdk/v1.0/manifest/MicrosoftTeams.schema.json",
  "manifestVersion": "1.0",
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

When your app is ready for submission, follow the process to [publish your app to the Office Store](~/publishing/apps-publish).
