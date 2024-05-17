---
title: Debug message extension app in Test Tool
author: surbhigupta 
description: Learn how to emulate the Teams experience for your message extension app in Teams App Test Tool.
ms.author: surbhigupta 
ms.localizationpriority: high
ms.topic: overview
ms.date: 04/25/2024
---

# Debug message extension app in Test Tool

The Teams App Test Tool has introduced a new feature that allows developers to debug bot-based message extension applications. This includes capabilities for search commands, action commands, and link unfurling.

Bot-based message extension apps are built on the Bot Framework. When triggered, the Test Tool sends an invoke request to the app, which then processes the request and returns a response that the Test Tool renders and displays.

> [!NOTE]
> The UX to trigger Message Extension app in Test Tool is different than Teams, as the goal of Test Tool is to test and debug the app logic and make the flow simple, instead of being a real chat app.

## Prerequisites

Ensure you install the following tools for building and deploying your bots in Test Tool:

| &nbsp; | Install | For using... |
| --- | --- | --- |
| &nbsp; | [Teams Toolkit](install-Teams-Toolkit.md) | A Microsoft Visual Studio Code extension that creates a project scaffolding for your app. Use the latest prerelease version. |
| &nbsp; | [Node.js](https://nodejs.org/en/download/) | Back-end JavaScript runtime environment. For more information, see [Node.js version compatibility table for project type](~/toolkit/build-environments.md#nodejs-version-compatibility-table-for-project-type). |
| &nbsp; | [Visual Studio Code](https://code.visualstudio.com/download) | JavaScript, TypeScript, or SharePoint Framework (SPFx) build environments. Use the latest version. |

## Build and run the sample app

1. Go to the [sample](https://github.com/OfficeDev/TeamsFx-Samples).

1. Clone the repository to test the sample app.

   ```
   git clone https://github.com/OfficeDev/TeamsFx-Samples.git
   ```

1. Go to **Visual Studio Code**.

1. Select **File** > **Open Folder**.

1. Go to the location where you cloned teamsFx-samples repo and select the **test-tool-sample-app** folder.

1. Select **Select Folder**.

1. From the left pane, select **Teams Toolkit**.

1. From the left pane, select **Run and Debug (Ctrl+Shift+D)** and select **Debug in Test Tool (Preview)** in dropdown list.

1. Test Tool opens the bot in a webpage.

1. Type `help` in the message compose area of Test Tool, it display all the message extension commands in the sample app.

1. Select **+** to display the list of Message Extension:

   * Search Command

   * Action Command

   * Link Unfurling

## Search Command

To test a **Search Command** in the Test Tool:

1. Select **+** in the message compose area.

1. Select **Search Command**.

   To initiate a search in the message extension app using the Test Tool, follow these steps:

1. Enter the keywords you wish to search for into the message extension app.

1. The Test Tool will automatically send a `composeExtension/query` invoke request.

1. Search results will be displayed by the Test Tool.

1. To review the details of the request and the results, check the log panel.

   For scenarios that require more advanced configurations:

1. Predefine the command ID or search parameters within the Test Tool.

1. When the message extension app is triggered, it will retrieve these predefined values from the context for use.

> [!Note]
> Include the command ID or parameter name only if your Message Extension app requires these values for functionality. If not, you can exclude them during testing.

## Action Command

To test an **Action Command** in the Test Tool:

1. Select **+** in the message compose area.

1. Select **Action Command**.

   Additionally, the Test Tool allows triggering message extensions on a message:

1. Select **...** above the message.

1. Select **Action Command**.

There are three options for creating a dialog with an action command:

* Adaptive Card
* Static list of parameters
* Embedded web view

> [!Note]
> Embedded web view is not supported.

### Create dialog with Adaptive Cards

When you select the Adaptive Cards option, the Test Tool dynamically retrieves the dialog from the message extension app. It sends a `composeExtension/fetchTask` invoke request and then displays the Adaptive Card based on the response received from the app.

### Create dialog with static list of parameters

1. Select **Static list of parameters**.

1. Provide the content for the parameters required for the dialog.

1. The Test Tool will then render the parameters you provided into a dialog. The schema for the static list of parameters is available in the [app manifest](../resources/schema/manifest-schema.md#composeextensionscommands) (previously called Teams app manifest).

    The following is a sample of the static list of parameters:

    ```json
    [{
      "name": "title",
      "title": "Card title",
      "description": "Title for the card",
      "inputType": "text"
    },
    {
      "name": "subTitle",
      "title": "Subtitle",
      "description": "Subtitle for the card",
      "inputType": "text"
    },
    {
      "name": "text",
      "title": "Text",
      "description": "Text for the card",
      "inputType": "textarea"
    }]
    ```

1. Select **Create**.

Image palceholder

Typically, the static list of parameters is located within the app manifest `composeExtensions` section. For instance, in the Teams Toolkit app template titled `Collect Form Input and Process Data`, you can locate these parameters in the [app manifest](https://github.com/OfficeDev/TeamsFx/blob/main/templates/ts/message-extension-action/appPackage/manifest.json.tpl#L41-L59).

### Submit form inside the dialog

To submit a form using the Test Tool, regardless of whether the dialog is created with Adaptive Cards or a static list of parameters, follow these steps:

1. Update the required information into the form fields.

1. Select **Submit**.

1. The Test Tool triggers `composeExtension/submitAction` invoke request.

Based on the invoke response from the message extension app, the Test Tool enables the following actions:

* Render the Adaptive Card from the invoke response and insert it into the message compose area.

* Render the Adaptive Card from the invoke response inside the dialog. This is useful when the form is extensive and needs to be divided into multiple cards.

* Displays a plain text message from the invoke response inside the dialog."

> [!Note]
> Similar to the **Search Command**, include the command ID only if it’s used by your message extension app. If not, you can ignore it during testing in the Test Tool.

## Link Unfurling

To test an **Link Unfurling** in the Test Tool:

1. Select **+** in the message compose area.

1. Select **Link Unfurling**.

1. Provide the URL in the dialog.

1. The Test Tool triggers a `composeExtension/queryLink` invoke request with the URL to the message extension app.

1. Review the Adaptive Card that the Test Tool renders based on the invoke response from the app.

> [!Note]
> The user experience for testing link unfurling in the Test Tool differs from that in Teams, however you can still test or debug the app logic with Test Tool in a simple way.

## Limitations

The Test Tool supports many commonly used features of message extension apps, but some features are not yet supported:

|Type of message extension |Not supported |
| --- | --- |
| **Search Command** | Trigger from command box. <br> Grid layout for search results. <br> Send the `composeExtension/selectItem` invoke activity when an item from the search results is selected. <br> Pagination for additional search results. |
| **Action Command** | Trigger from command box. <br> Create dialog with embedded web view. <br> Render the invoke activity of [botMessagePreview](../messaging-extensions/how-to/action-commands/respond-to-task-module-submit.md#the-botmessagepreview-send-and-edit-events).|
| **Link Unfurling** | Render the preview card from the invoke response. <br> Send invoke activity of `composeExtension/anonymousQueryLink` for zero install case. |

## Teams App Test Tool for message extension FAQ

### Command ID and Parameter name parameters in Search Command

When you use the search box in a search-based message extension app on Teams, your app receives an invoke activity that includes two parameters. Occasionally, your app might need to use `activity.value.commandId` or `activity.value.parameters[0].name` to manage different search command behaviors in the activity handler for the `composeExtension/query` invoke activity, such as the `handleTeamsMessagingExtensionQuery` method in the Bot Framework SDK for JavaScript. However, your app doesn't need it because [Teams only support a single search command](../resources/schema/manifest-schema.md#composeextensionscommands) and you can leave them empty.

If your app utilizes these two parameters, you can provide additional inputs by selecting `Specify Command ID or Parameter` and enter the necessary values. The Teams App Test Tool includes these parameters in the invoke activity payload during a search. If you do not specify them, the payload will avoid these parameters.

:::image type="content" source="../assets/images/teams-toolkit-v2/specify-command-parameter.png" alt-text="Screenshot shows the specify command ID or Parameter.":::

In Teams, your app manifest provides this information. However, the Teams App Test Tool does not process the manifest. For more information, see [Limitations](toolkit-v4/debug-your-Teams-app-test-tool-vs.md#limitations). Therefore, you need to input this information manually.

For details about the schema of this invoke activity payload. For more information, see [respond to user requests](../messaging-extensions/how-to/search-commands/respond-to-search.md#respond-to-user-requests).

### Command ID parameter in Action Command

When navigating through dialogs initiated by action commands in Teams, your app will receive a `composeExtension/fetchTask` or `composeExtension/submitAction` invoke activity. This activity includes the `activity.value.commandId` parameter. However, your app uses this parameter to differentiate between commands within the activity handler for these invoke activities, such as the `handleTeamsMessagingExtensionFetchTask` or `handleTeamsMessagingExtensionSubmitAction` methods in the Bot Framework SDK for JavaScript.

To test various action commands, you must enter the `Command ID` in the designated input box. If you do not set it, the command ID will not be included in the activity payload.

:::image type="content" source="../assets/images/teams-toolkit-v2/command-parameter.png" alt-text="Screenshot shows the command ID parameter in Action Command.":::

While Teams retrieves this information from your app manifest, the Teams App Test Tool does not. Therefore, you need to input it manually.

For details about the schema of this invoke activity payload. For more information, see [create and send dialogs](../messaging-extensions/how-to/action-commands/create-task-module.md) and [respond to the dialog submit action](../messaging-extensions/how-to/action-commands/respond-to-task-module-submit.md).

### Static list of parameters in Action Command

The static list of parameters is the simple method for creating dialogs for action commands, but it doesn’t allow for formatting control.

When you opt to create a dialog using a static list of parameters, the message extension app will receive a `composeExtension/submitAction` invoke activity upon the user’s submission of the dialog.

:::image type="content" source="../assets/images/teams-toolkit-v2/static-list-of-parameters.png" alt-text="Screenshot shows the static list of parameter in Action Command.":::

In Teams, your app manifest provides this information. However, the Teams App Test Tool does not process the manifest. For more information, see [Limitations](toolkit-v4/debug-your-Teams-app-test-tool-vs.md#limitations). Therefore, you need to input this information manually.

For the schema of the Static list of parameters. For more information, see [composeExtensions.commands](../resources/schema/manifest-schema.md#composeextensionscommands).
