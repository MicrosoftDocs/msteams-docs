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

You can debug bot-based message extension capabilities such as search commands, action commands, and link unfurling using Teams App Test Tool within a simulated environment. Test tool helps you to identify and resolve issues before deploying the extension to a live environment.

Teams App Test Tool enhances the functionality of bot-based message extensions, which are built on top of the Bot Framework. When a message extension is activated, the Test Tool sends an invoke request to the app. The app then processes this request and returns an invoke response, which the Test Tool renders and displays.

> [!NOTE]
> The user experience to trigger message extension in Test Tool is different from Teams, as the goal of Test Tool is to test and debug the app logic and make the flow simple, instead of being a real chat app.

## Prerequisites

Ensure that you install the following tools for building and deploying your bots in Test Tool:

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

   :::image type="content" source="../assets/images/teams-toolkit-v2/teams-app-select-folder.png" alt-text="Screenshot shows the test tool sample app folder.":::

1. From the left pane, select **Teams Toolkit**.

1. From the left pane, select **Run and Debug (Ctrl+Shift+D)** and select **Debug in Test Tool (Preview)** in dropdown list.

1. Test Tool opens the bot in a webpage.

   :::image type="content" source="../assets/images/teams-toolkit-v2/test-tool-in-browser-window.png" alt-text="Screenshot shows the test tool opens in a webpage.":::

1. Type `help` in the message compose area of Test Tool, it displays all the message extension commands in the sample app.

   :::image type="content" source="../assets/images/teams-toolkit-v2/help-in-teams-app-test-tool.png" alt-text="Screenshot shows the help in the message compose area of test tool.":::

1. Select **+** to display the list of message extension:

   * Search Command

   * Action Command

   * Link Unfurling

   :::image type="content" source="../assets/images/teams-toolkit-v2/list-of-message-extension.png" alt-text="Screenshot shows the list of message extension.":::

## Search Command

To test a **Search Command** in the Test Tool, follow these steps:

1. Select **+** in the message compose area.

1. Select **Search Command**.

   :::image type="content" source="../assets/images/teams-toolkit-v2/search-command.png" alt-text="Screenshot shows the search command.":::

1. Enter the keywords you wish to search for into the message extension.

1. The Test Tool sends a `composeExtension/query` invoke request.

   :::image type="content" source="../assets/images/teams-toolkit-v2/search-command-invoke.png" alt-text="Screenshot shows the search commands invoke.":::

1. Search results are displayed by the Test Tool.

1. To review the details of the request and the results, check the log panel.

For scenarios that require more advanced configurations:

1. Select **+** in the message compose area.

1. Select **Search Command**.

1. Select **Specify Command ID or Parameter**.

1. Update the values for **Command ID** and **Parameter name**.

   :::image type="content" source="../assets/images/teams-toolkit-v2/advanced-configurations.png" alt-text="Screenshot shows the search command for advanced configurations.":::

1. When the message extension is triggered, it retrieves these predefined values from the context.

> [!Note]
> It's not mandatory to include the command ID or parameter name to test your message extension. Add them if you require to test the functionality.

## Action Command

You can test an **Action Command** in the Test Tool in the following ways:

# [**+** icon](#tab/action-commands)

1. Select **+** icon in the message compose area.

1. Select **Action Command**.

   :::image type="content" source="../assets/images/teams-toolkit-v2/action-commands.png" alt-text="Screenshot shows the action command.":::

   Additionally, the Test Tool allows triggering message extensions on a message:

# [**...** icon](#tab/action-commands1)

1. Select **...** above the message.

1. Select **Action Command**.

   :::image type="content" source="../assets/images/teams-toolkit-v2/message-action-command.png" alt-text="Screenshot shows the message in action command.":::

---

### Create a dialog

You can create a dialog with an action command in two ways:

* [Adaptive Cards](#create-dialog-with-adaptive-cards)
* [Static list of parameters](#create-dialog-with-static-list-of-parameters)

   :::image type="content" source="../assets/images/teams-toolkit-v2/list-of-action-commands.png" alt-text="Screenshot shows the list of action commands.":::

#### Create dialog with Adaptive Cards

In the action-based message extension dialog, select **Adaptive Cards**. Test Tool dynamically retrieves the dialog from the message extension. It sends a `composeExtension/fetchTask` invoke request and then displays the Adaptive Card based on the response received from the app.

   :::image type="content" source="../assets/images/teams-toolkit-v2/create-dialog-with-adaptive-cards.png" alt-text="Screenshot shows to how create dialog with Adaptive Cards.":::

#### Create dialog with static list of parameters

1. In the action-based message extension dialog, select **Static list of parameters**.

1. Update the values for **Card title**, **Subtitle**, and **Text** parameters.

1. Select **Submit**.

   :::image type="content" source="../assets/images/teams-toolkit-v2/static-list-of-parameters-in-teams-app-test-tool.png" alt-text="Screenshot shows how to create a static list of parameters in teams app test tool.":::

1. The Test Tool renders the parameters you provided into a dialog. For more information on parameters, see [app manifest](../resources/schema/manifest-schema.md#composeextensionscommands) (previously called Teams app manifest).

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

### Submit form inside the dialog

After you've created a dialog using Adaptive Cards or a static list of parameters and select submit, Test Tool sends an invoke request with name of `composeExtension/submitAction`.

Based on the invoke response from the message extension, the Test Tool enables the following actions:

* Render the Adaptive Card from the invoke response and insert it into the message compose area.

* Render the Adaptive Card from the invoke response inside the dialog. This is useful when the form is extensive and needs to be divided into multiple cards.

* Display a plain text message from the invoke response inside the dialog.

> [!Note]
> Similar to the **Search Command**, include the command ID only if it’s used by your message extension. If not, you can ignore it during testing in the Test Tool.

## Link Unfurling

To test an **Link Unfurling** in the Test Tool, follow these steps:

1. Select **+** in the message compose area.

1. Select **Link Unfurling**.

   :::image type="content" source="../assets/images/teams-toolkit-v2/link-unfurling.png" alt-text="Screenshot shows how to create a link unfurling in teams app test tool.":::

1. Provide the URL in the dialog.

1. The Test Tool triggers a `composeExtension/queryLink` invoke request with the URL to the message extension.

1. Review the Adaptive Card that the Test Tool renders based on the invoke response from the app.

   :::image type="content" source="../assets/images/teams-toolkit-v2/link-unfurling-card.png" alt-text="Screenshot shows to create link unfurling in teams app test tool.":::

> [!Note]
> The user experience for testing link unfurling in the Test Tool differs from that in Teams, however you can still test or debug the app logic with Test Tool in a simple way.

## Limitations

The following table lists the type of message extension features that aren't supported:

|Type of message extension |Not supported |
| --- | --- |
| **Search Command** | Trigger from command box. <br> Grid layout for search results. <br> Send the `composeExtension/selectItem` invoke activity when an item from the search results is selected. <br> Pagination for additional search results. |
| **Action Command** | Trigger from command box. <br> Create dialog with embedded web view. <br> Render the invoke activity of [botMessagePreview](../messaging-extensions/how-to/action-commands/respond-to-task-module-submit.md#the-botmessagepreview-send-and-edit-events).|
| **Link Unfurling** | Render the preview card from the invoke response. <br> Send invoke activity of `composeExtension/anonymousQueryLink` for zero install case. |

## Teams App Test Tool for message extension FAQ

<br>
<details>
<summary>Command ID and Parameter name parameters in Search Command</summary>

When you use the search box in a search-based message extension on Teams, your app receives an invoke activity that includes two parameters. Occasionally, your app might need to use `activity.value.commandId` or `activity.value.parameters[0].name` to manage different search command behaviors in the activity handler for the `composeExtension/query` invoke activity, such as the `handleTeamsMessagingExtensionQuery` method in the Bot Framework SDK for JavaScript. However, your app doesn't need it because [Teams only supports a single search command](../resources/schema/manifest-schema.md#composeextensionscommands) and you can leave them empty.

If your app utilizes these two parameters, you can provide additional inputs by selecting `Specify Command ID or Parameter` and enter the necessary values. The Teams App Test Tool includes these parameters in the invoke activity payload during a search. If you don't specify them, the payload avoids these parameters.

:::image type="content" source="../assets/images/teams-toolkit-v2/specify-command-parameter.png" alt-text="Screenshot shows the specify command ID or Parameter.":::

In Teams, your app manifest provides this information. However, the Teams App Test Tool doesn't process the manifest. For more information, see [Limitations](toolkit-v4/debug-your-Teams-app-test-tool-vs.md#limitations). Therefore, you need to input this information manually.

For details about the schema of this, invoke activity payload. For more information, see [respond to user requests](../messaging-extensions/how-to/search-commands/respond-to-search.md#respond-to-user-requests).
<br>
</details>
</br>

<br>
<details>
<summary>Command ID parameter in Action Command</summary>

While navigating through dialogs initiated by action commands in Teams, your app receives a `composeExtension/fetchTask` or `composeExtension/submitAction` invoke activity. This activity includes the `activity.value.commandId` parameter. However, your app uses this parameter to differentiate between commands within the activity handler for these invoke activities, such as the `handleTeamsMessagingExtensionFetchTask` or `handleTeamsMessagingExtensionSubmitAction` methods in the Bot Framework SDK for JavaScript.

To test various action commands, you must enter the `Command ID` in the designated input box. If you don't set it, the command ID won't be included in the activity payload.

:::image type="content" source="../assets/images/teams-toolkit-v2/command-parameter.png" alt-text="Screenshot shows the command ID parameter in Action Command.":::

While Teams retrieves this information from your app manifest, the Teams App Test Tool doesn't. Therefore, you need to input it manually.

For details about the schema of this, invoke activity payload. For more information, see [create and send dialogs](../messaging-extensions/how-to/action-commands/create-task-module.md) and [respond to the dialog submit action](../messaging-extensions/how-to/action-commands/respond-to-task-module-submit.md).
<br>
</details>
</br>

<br>
<details>
<summary>Static list of parameters in Action Command</summary>

The static list of parameters is the simple method for creating dialogs for action commands, but it doesn’t allow for formatting control.

When you opt to create a dialog using a static list of parameters, the message extension receives a `composeExtension/submitAction` invoke activity upon the user’s submission of the dialog.

:::image type="content" source="../assets/images/teams-toolkit-v2/static-list-of-parameters.png" alt-text="Screenshot shows the static list of parameter in Action Command.":::

In Teams, your app manifest provides this information. However, the Teams App Test Tool doesn't process the manifest. For more information, see [Limitations](toolkit-v4/debug-your-Teams-app-test-tool-vs.md#limitations). Therefore, you need to input this information manually.

For the schema of, the Static list of parameters. For more information, see [composeExtensions.commands](../resources/schema/manifest-schema.md#composeextensionscommands).
<br>
</details>
</br>
