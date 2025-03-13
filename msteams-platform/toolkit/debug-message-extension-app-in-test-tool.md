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

You can debug bot-based message extension capabilities such as search commands, action commands, and link unfurling using Teams App Test Tool (Test Tool) within a simulated environment. Test tool helps you to identify and resolve issues before deploying the extension to a live environment.

Test Tool enhances the functionality of bot-based message extensions, which are built on top of Bot Framework. When a message extension is activated, the Test Tool sends an invoke request to the app. The app then processes this request and returns an invoke response, which the Test Tool renders and displays.

> [!NOTE]
> The user experience to trigger message extension in Test Tool is different from Teams, as the goal of Test Tool is to test and debug the app logic and make the flow simple.

## Prerequisites

Ensure that you install the following tools to build and deploy your bot in Test Tool:

| &nbsp; | Install | For using... |
| --- | --- | --- |
| &nbsp; | [Teams Toolkit](install-Teams-Toolkit.md) | A Microsoft Visual Studio Code extension that creates a project scaffolding for your app. Use the latest release version. |
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

1. In the message compose area, type `help`. Test Tool displays all the message extension commands in the sample app.

   :::image type="content" source="../assets/images/teams-toolkit-v2/help-in-teams-app-test-tool.png" alt-text="Screenshot shows the help in the message compose area of test tool.":::

1. Select the **+** icon to display the type of message extension:

   * Search Command

   * Action Command

   * Link Unfurling

   :::image type="content" source="../assets/images/teams-toolkit-v2/list-of-message-extension.png" alt-text="Screenshot shows the list of message extension.":::

1. Select the type of message extension you want to debug.

1. Based on the option selected in the earlier step, select the following tab:

    ## Search Command

    To test a **Search Command** in the Test Tool, follow these steps:

    1. Enter the keywords you wish to search for into the message extension.

    1. The Test Tool sends a `composeExtension/query` invoke request.

       :::image type="content" source="../assets/images/teams-toolkit-v2/search-command-invoke.png" alt-text="Screenshot shows the search commands invoke.":::

    1. Search results are displayed.

    1. To review the details of the request and the results, check the **Log Panel**.

    For scenarios that require more advanced configurations:

    1. Select the **+** icon in the message compose area.

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

      1. Select the **+** icon in the message compose area.

      1. Select **Action Command**.

         :::image type="content" source="../assets/images/teams-toolkit-v2/action-commands.png" alt-text="Screenshot shows the action command.":::

      # [**...** icon](#tab/action-commands1)

      1. Above the message, select the **...** option.

      1. Select **Action Command**.

         :::image type="content" source="../assets/images/teams-toolkit-v2/message-action-command.png" alt-text="Screenshot shows the message in action command.":::

    ---

> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI%20ran%20into%20an%20issue%5D%20Build%20and%20run%20the%20sample%20app&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Ftoolkit%2Fdebug-message-extension-app-in-test-tool%3Ftabs%3Daction-commands&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Ftoolkit%2Fdebug-message-extension-app-in-test-tool.md&documentVersionIndependentId=5a31f804-1b50-c555-7f8d-ac9c4ecdf419&author=surbhigupta&metadata=*%2BID%253A%2Be473e1f3-69f5-bcfa-bcab-54b098b59c80%2B%250A*%2BService%253A%2B**msteams**)

You can create a dialog with an Action Command in two ways:

* [Adaptive Cards](#create-dialog-with-adaptive-cards)
* [Static list of parameters](#create-dialog-with-static-list-of-parameters)

   :::image type="content" source="../assets/images/teams-toolkit-v2/list-of-action-commands.png" alt-text="Screenshot shows the list of action commands.":::

#### Create dialog with Adaptive Cards

In the action-based message extension dialog, select **Adaptive Cards**. Test Tool dynamically retrieves the dialog from the message extension. It sends a `composeExtension/fetchTask` invoke request and then displays the Adaptive Card based on the response received from the app.

   :::image type="content" source="../assets/images/teams-toolkit-v2/create-dialog-with-adaptive-cards.png" alt-text="Screenshot shows to how create dialog with Adaptive Cards.":::

#### Create dialog with static list of parameters

In the action-based message extension dialog, select **Static list of parameters**. Test Tool renders the parameters you provided into a dialog. For more information on parameters, see [composeExtensions.commands](../resources/schema/manifest-schema.md#composeextensionscommands).

The following code is a sample of the static list of parameters in JSON format:

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

:::image type="content" source="../assets/images/teams-toolkit-v2/static-list-of-parameters-in-teams-app-test-tool.png" alt-text="Screenshot shows how to create a static list of parameters in teams app test tool.":::

Static list of parameters are available under the `composeExtensions` property in app manifest. For example, see [manifest.json](https://github.com/OfficeDev/TeamsFx/blob/main/templates/ts/message-extension-action/appPackage/manifest.json.tpl#L41-L59).

### Submit form inside the dialog

After you've created a dialog using Adaptive Cards or a static list of parameters and select submit, Test Tool sends an invoke request with name of `composeExtension/submitAction`.

Based on the invoke response from the message extension, the Test Tool performs one of the following actions:

* Renders an Adaptive Card from the invoke response and inserts it into the message compose area.

* Renders an Adaptive Card from the invoke response inside the dialog. This is useful when the form is extensive and needs to be divided into multiple cards.

* Displays a plain text message from the invoke response inside the dialog.

> [!Note]
> It's not mandatory to include the command ID to test your message extension. Add them if you require to test the functionality.

## Link Unfurling

To test an **Link Unfurling** in the Test Tool, follow these steps:

1. Select the **+** icon in the message compose area.

1. Select **Link Unfurling**.

   :::image type="content" source="../assets/images/teams-toolkit-v2/link-unfurling.png" alt-text="Screenshot shows how to create a link unfurling in teams app test tool.":::

   A **Enter a URL** dialog appears.

1. In the **Enter an URL** dialog, enter a URL of your choice.

1. Select **Send to Conversation**.

   :::image type="content" source="../assets/images/teams-toolkit-v2/link-unfurling-card.png" alt-text="Screenshot shows how to create link unfurling in teams app test tool.":::

   The Test Tool triggers a `composeExtension/queryLink` invoke request with the URL to the message extension. You can review the Adaptive Card that the Test Tool renders based on the invoke response from the app.

> [!Note]
> The user experience for testing link unfurling in the Test Tool differs from that in Teams, however you can still test or debug the app logic with Test Tool in a simple way.

> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI%20ran%20into%20an%20issue%5D%20Link%20Unfurling&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Ftoolkit%2Fdebug-message-extension-app-in-test-tool%3Ftabs%3Daction-commands&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Ftoolkit%2Fdebug-message-extension-app-in-test-tool.md&documentVersionIndependentId=5a31f804-1b50-c555-7f8d-ac9c4ecdf419&author=surbhigupta&metadata=*%2BID%253A%2Be473e1f3-69f5-bcfa-bcab-54b098b59c80%2B%250A*%2BService%253A%2B**msteams**)

## Limitations

The following table lists the features for each message extension type that aren't supported:

|Message extension type |Features not supported |
| --- | --- |
| **Search Command** | Triggering from command box. <br> Grid layout for search results. <br> Sending the `composeExtension/selectItem` invoke activity when an item from the search results is selected. <br> Pagination for additional search results. |
| **Action Command** | Triggering from command box. <br> Creating a dialog with embedded web view. <br> Rendering the [botMessagePreview](../messaging-extensions/how-to/action-commands/respond-to-task-module-submit.md#the-botmessagepreview-send-and-edit-events) invoke activity.|
| **Link Unfurling** | Rendering the preview card from the invoke response. <br> Sending invoke activity of `composeExtension/anonymousQueryLink` for zero install case. |

## Message extension Test Tool FAQ

<br>
<details>
<summary>How can I use `commandId` or `parameters.name` properties for a Search Command in Teams app Test Tool?</summary>

When you use the search box in a search-based message extension in Teams, your app receives an invoke activity that includes two parameters. Sometimes, your app might need to use `activity.value.commandId` or `activity.value.parameters[0].name` to manage different search command behaviors in the activity handler for the `composeExtension/query` invoke activity, such as the `handleTeamsMessagingExtensionQuery` method in the Bot Framework SDK for JavaScript. However, your app doesn't need it because [Teams only supports a single search command](../resources/schema/manifest-schema.md#composeextensionscommands) and you can leave them empty.

If your app uses these two parameters, you can provide additional inputs by selecting `Specify Command ID or Parameter` and updating the required values. Test Tool includes these parameters in the invoke activity payload during a search. If you don't specify them, the payload avoids these parameters.

:::image type="content" source="../assets/images/teams-toolkit-v2/specify-command-parameter.png" alt-text="Screenshot shows the specify command ID or Parameter.":::

In Teams, the parameters are available in the app manifest. Since the Test Tool doesn't process the manifest, you need to input the parameters manually.

<br>
</details>
</br>

<details>
<summary>How can I use `commandId` property for an Action Command in Teams app Test Tool?</summary>

In Teams, dialogs are triggered from action commands and your app receives a `composeExtension/fetchTask` or `composeExtension/submitAction` invoke activity. This activity includes the `activity.value.commandId` parameter. However, your app uses this parameter to differentiate between commands within the activity handler for these invoke activities, such as the `handleTeamsMessagingExtensionFetchTask` or `handleTeamsMessagingExtensionSubmitAction` methods in the Bot Framework SDK for JavaScript.

To test various action commands, you must enter the `Command ID` in the respective field. If you don't update, the command IDs aren't included in the activity payload.

:::image type="content" source="../assets/images/teams-toolkit-v2/command-parameter.png" alt-text="Screenshot shows the command ID parameter in Action Command.":::

In Teams, commands are available in the app manifest. Since the Test Tool doesn't process the manifest, you need to input the commands manually.

<br>
</details>
</br>

<details>
<summary>How to do Static list of parameters work in Teams app Test Tool?</summary>

The static list of parameters is the simple method to create dialogs for action commands, however you can't format the static list.

When you create a dialog using a static list of parameters, the message extension receives a `composeExtension/submitAction` invoke activity upon the user’s submission of the dialog.

:::image type="content" source="../assets/images/teams-toolkit-v2/static-list-of-parameters.png" alt-text="Screenshot shows the static list of parameter in Action Command.":::

In Teams, the parameters are available in the app manifest. Since the Test Tool doesn't process the manifest, you need to input the parameters manually.

<br>
</details>

## See also

* [Respond to user requests](../messaging-extensions/how-to/search-commands/respond-to-search.md#respond-to-user-requests)
* [Create and send dialogs](../messaging-extensions/how-to/action-commands/create-task-module.md)
* [Respond to the dialog submit action](../messaging-extensions/how-to/action-commands/respond-to-task-module-submit.md)
* [ComposeExtensions.commands](../resources/schema/manifest-schema.md#composeextensionscommands)
