---
title: Debug Bot with Teams App Test Tool
author: v-ganr
description: Learn how to build, configure, and deploy bot using Teams App Test Tool in Visual Studio, and to mock an activity using predefined and custom activity triggers.
ms.localizationpriority: medium
ms.topic: overview
ms.author: surbhigupta
ms.date: 02/13/2024
---

# Teams App Test Tool for Visual Studio

Teams App Test Tool (Test Tool) makes debugging bot-based apps effortless. You can chat with your bot and see its messages and Adaptive Cards as they appear in Microsoft Teams. You don’t need a Microsoft 365 developer account, tunneling, or Teams app and bot registration to use Test Tool.

The following image shows a sample app displaying a response in Test Tool:

 :::image type="content" source="../../assets/images/teams-toolkit-v2/teams-toolkit-vs/test-tool-sample-app-output-vs.png" alt-text="Screenshot shows the Teams App Test Tool Adaptive Card." lightbox="../../assets/images/teams-toolkit-v2/teams-toolkit-vs/test-tool-sample-app-output-vs.png":::

The following are the advantages of Test Tool:

* **Sandbox environment**: The sandbox environment of Test Tool emulates the behavior, look, and user experience of Teams.

* **Tunneling**: An external tunnel service isn't necessary as Test Tool runs on a local server that your bot can communicate with.

* **Reduce account dependencies**: Microsoft 365 Developer tenant and the app uploading permissions aren't necessary to debug the bot.

* **Rapid inner-loop iterations**: Optimizes the process of making changes to the app design and bot logic without having to redeploy the bot to the cloud.

* **Mock data and activities**: Test Tool makes it easy to test complex scenarios such as, sending a welcome message when a new member joins the channel and using mock data and activity triggers.

* **Reliable**: Test Tool is reliable as the bot's Adaptive Card utilizes the same rendering technology as in Teams.

* **Integration with existing Teams bot applications**: Test Tool integrates effortlessly with existing Teams bot applications built with Bot Framework SDK.

* **Support for different scopes**: Test Tool supports testing in personal, team, and group chat scopes.

## Prerequisites

Ensure you install the following tools for building and deploying your bot in Test Tool:

| Install | For using... |
| --- | --- |
| [Node.js](https://nodejs.org/en/download/) | Back-end JavaScript runtime environment. |
| [Visual Studio 2022](https://visualstudio.microsoft.com)<br> | You can install the enterprise version in Visual Studio 2022, and install the ASP.NET and web development workloads. Use the version 17.9 or later. |

## Test Tool experience in Visual Studio

Test Tool offers a faster debug experience for bot applications when compared to the Teams client. Test Tool provides support for all bot app features. In this scenario, we're using **AI Chat Bot** as an example. To debug your bot in Test Tool, follow these steps:

1. Open Visual Studio.

1. Select **Create a new project**.

   :::image type="content" source="../../assets/images/teams-toolkit-v2/teams-toolkit-vs/create-new-project-vs.png" alt-text="Screenshot shows the selection to create a new project.":::

1. In the search box, enter **Microsoft Teams**. From the search results, select **Microsoft Teams App**.

1. Select **Next**.

   :::image type="content" source="../../assets/images/teams-toolkit-v2/teams-toolkit-vs/new-project-template-vs.png" alt-text="Screenshot shows the selection of templates to create a new project.":::

1. Enter **Project name** and select **Create**.

    :::image type="content" source="../../assets/images/teams-toolkit-v2/teams-toolkit-vs/project-name-vs.png" alt-text="Screenshot shows the option to enter the project name.":::

1. Select **AI Chat Bot** > **Create**.

   > [!NOTE]
   > * [OpenAI](https://platform.openai.com/apps) or  [Azure OpenAI](https://oai.azure.com/portal) are the prerequisite to debug **AI Chat Bot** app.

    :::image type="content" source="../../assets/images/teams-toolkit-v2/teams-toolkit-vs/project-teams-application-vs.png" alt-text="Screenshot shows the selection of Teams application to create a new project.":::

    A GettingStarted window appears.

    :::image type="content" source="../../assets/images/teams-toolkit-v2/teams-toolkit-vs/project-get-started-vs.png" alt-text="Screenshot shows the get started page of the application in Visual Studio." lightbox="../../assets/images/teams-toolkit-v2/teams-toolkit-vs/project-get-started-vs.png":::

1. The `appsettings.TestTool.json` file helps to configure the Test Tool by updating few parameters. To update `appsettings.TestTool.json` file, follow either OpenAI or Azure OpenAI steps:

    # [OpenAI](#tab/openai)
    
    Update OpenAI `ApiKey` in the `appsettings.TestTool.json` file.
    
    :::image type="content" source="../../assets/images/teams-toolkit-v2/teams-toolkit-vs/app-seetings-test-tool.png" alt-text="Screenshot displays the updated OpenAI key.":::
    
    # [Azure OpenAI](#tab/azureopenai)
    
    1. Update Azure `OpenAIApiKey` and `OpenAIEndpoint` in the `appsettings.TestTool.json` file.

        :::image type="content" source="../../assets/images/teams-toolkit-v2/teams-toolkit-vs/app-seetings-test-tool-azureAI.png" alt-text="Screenshot displays the updated OpenAI key and endpoint for Azure.":::
    
    1. Replace model name with Azure OpenAI model deployment name in `Program.cs` file.
   
         :::image type="content" source="../../assets/images/teams-toolkit-v2/teams-toolkit-vs/azure-openai-model-deployment-name.png" alt-text="Screenshot shows the AzureOpenAI model deployement name updated.":::
    ---

1. In the debug dropdown list, select **Teams App Test Tool (browser)**.

   :::image type="content" source="../../assets/images/teams-toolkit-v2/teams-toolkit-vs/app-test-tool.png" alt-text="Screenshot shows the option to select the Teams app test tool from the dropdown list.":::

   Test Tool opens the bot in a webpage.

   :::image type="content" source="../../assets/images/teams-toolkit-v2/teams-toolkit-vs/test-tool.png" alt-text="Screenshot shows the bot opens the test tool in web page." lightbox="../../assets/images/teams-toolkit-v2/teams-toolkit-vs/debug-test-tool-vs.png":::

> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI+ran+into+an+issue%5D+Test+Tool+experience+in+Visual+Studio&&author=%40v-ganr&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Ftoolkit%2Ftoolkit-v4%2Fdebug-your-teams-app-test-tool-vs%3Ftabs%3Dopenai%23test-tool-experience-in-visual-studio&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Ftoolkit%2Ftoolkit-v4%2Fdebug-your-Teams-app-test-tool-vs.md&documentVersionIndependentId=5f102ce2-7c72-b348-78aa-27881c4b18af&metadata=*%2BID%253A%2Be473e1f3-69f5-bcfa-bcab-54b098b59c80%2B%250A*%2BService%253A%2B%2A%2Amsteams%2A%2A)

## Activity triggers

You can mock an activity in Test Tool using activity triggers. There are two types of activity triggers:

* [Predefined activity triggers](#predefined-activity-triggers)
* [Custom activity triggers](#custom-activity-triggers)

### Predefined activity triggers

Test Tool provides predefined activity triggers to test the functionalities of your bot.

| Category | Activity | Handler |
| --- | --- | --- |
| Trigger Installation Update Activity | Install bot <br><br><br> Uninstall bot | `onInstallationUpdate` <br> `onInstallationUpdateAdded` <br><br> `onInstallationUpdate` <br> `onInstallationUpdateRemove`|
| Trigger Conversation Update Activity | Add user <br><br> Add bot <br><br> Add channel | `onMembersAdded`<br><br> `onTeamsMembersAddedEvent` <br><br> `onTeamsChannelRenamedEvent` |
| | Remove user <br><br><br> Remove bot <br><br><br> Remove channel <br><br> Remove team | `onMembersRemoved` <br> `onTeamsMembersRemovedEvent` <br><br> `onMembersRemoved` <br> `onTeamsMembersRemovedEvent` <br><br> `onTeamsChannelDeletedEvent` <br><br> `onTeamsTeamDeletedEvent` |
| | Rename channel <br><br> Rename team | `onTeamsChannelRenamedEvent` <br><br> `onTeamsTeamRenamedEvent` |

> [!NOTE]
> All types of activities aren't available in all scopes. For example, you can't add or remove a channel in a personal chat or a group chat.

Predefined activity triggers are available in the **Mock an Activity** menu in Test Tool. In this scenario, we're using **Add user** activity trigger as an example. To mock an **Add user** activity, follow these steps:

1. In Visual Studio Code, go to **Solution Explorer**.
1. Select the **Program.cs** file.
1. In the **Program.cs** file, under `builder.Services.AddTransient<IBot>(sp =>` add the following code:

    ```csharp
    app.OnConversationUpdate("membersAdded", async (context, state, cancellationToken) =>
    {
       await context.SendActivityAsync($"new member added", cancellationToken: cancellationToken);
    });
    ```

    The `OnConversationUpdate` handler recognizes the members who join the conversation as described by the Add user activity.

   :::image type="content" source="../../assets/images/teams-toolkit-v2/debug-VS/add-a-user-code-vs.png" alt-text="Screenshot shows the code added to program.cs file for predefined mock activity add user.":::

1. In the Test Tool, go to **Mock an Activity** and select **Add user**.

   :::image type="content" source="../../assets/images/teams-toolkit-v2/debug-VS/add-user-vs.png" alt-text="Screenshot shows the add user option under mock an activity.":::

   A pop-up dialog appears to preview the activity handler.

1. Select **Send activity**.

   :::image type="content" source="../../assets/images/teams-toolkit-v2/debug-VS/add-a-user-request-vs.png" alt-text="Screenshot shows the option to send activity for predefined mock activity add user.":::

   Bot sends a response.

   :::image type="content" source="../../assets/images/teams-toolkit-v2/debug-VS/add-a-user-response-vs.png" alt-text="Screenshot shows the response of predefined mock activity add user.":::

> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI+ran+into+an+issue%5D+Predefined+activity+triggers&&author=%40v-ganr&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Ftoolkit%2Ftoolkit-v4%2Fdebug-your-teams-app-test-tool-vs%3Ftabs%3Dopenai%23test-tool-experience-in-visual-studio&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Ftoolkit%2Ftoolkit-v4%2Fdebug-your-Teams-app-test-tool-vs.md&documentVersionIndependentId=5f102ce2-7c72-b348-78aa-27881c4b18af&metadata=*%2BID%253A%2Be473e1f3-69f5-bcfa-bcab-54b098b59c80%2B%250A*%2BService%253A%2B%2A%2Amsteams%2A%2A)

### Custom activity triggers

You can use **Custom activity** to customize activity trigger `reactionsAdded`, to fit the requirements of your bot app. Test Tool automatically populates the required properties of the activity. You can also modify the activity type and add more properties such as, `MembersAdded`, `membersremoved`, and `reactionsremoved`.

1. In Visual Studio Code, go to **Solution Explorer**.
1. Select the **Program.cs** file.
1. In the **Program.cs** file, under `builder.Services.AddTransient<IBot>(sp =>` add the following code:

    ```csharp
    app.OnMessageReactionsAdded(async (context, state, cancellationToken) =>
    {
       await context.SendActivityAsync($"reaction added.", cancellationToken: cancellationToken);
    });
    ```

    The `OnMessageReactionsAdded` handler identifies the reaction to append by using the `ReplyToId` property of the earlier conversation.

   :::image type="content" source="../../assets/images/teams-toolkit-v2/debug-VS/custom-activity-code-vs.png" alt-text="Screenshot shows the code added to program.cs file for customization on mock activity.":::

1. Go to the Test Tool webpage and select the latest response from Log Panel to copy `replyToId`.

   :::image type="content" source="../../assets/images/teams-toolkit-v2/debug-VS/custom-activity-reply-to-do.png" alt-text="Screenshot shows the selection of replyToID to copy for customization on mock activity.":::

1. Select **Mock an Activity** > **Custom activity**.

   :::image type="content" source="../../assets/images/teams-toolkit-v2/debug-VS/mock-activity-vs.png" alt-text="Screenshot shows the list of option under mock an activity.":::

1. To customize the activity, add `messageReaction` under the `type` property.
1. Replace with the latest `replyToId`.

    ```json
    {
      "type": "messageReaction",
      "reactionsAdded": [
        {
          "type": "like"
        }
      ],
      "replyToId": "d60fd1cb-3e8f-44ef-849c-404806ba1b47"
    }
    ```

1. Select **Send activity**.

   :::image type="content" source="../../assets/images/teams-toolkit-v2/debug-VS/custom-activity-request-vs.png" alt-text="Screenshot shows the option to send activity after customization on mock activity.":::

   Bot sends an `onReactionsAdded` handler in response.

   :::image type="content" source="../../assets/images/teams-toolkit-v2/debug-VS/custom-activity-response-vs.png" alt-text="Screenshot shows the response of custom mock activity.":::

## Limitations

* Bot features enabled through app manifest aren't available, as Test Tool doesn't process it.

* Test Tool doesn't support all types of cards except Adaptive Cards.

* Test Tool doesn't support the following Adaptive Card features:

  * [Typeahead](../../task-modules-and-cards/cards/dynamic-search.md)
  * [User mention](../../task-modules-and-cards/cards/cards-format.md#microsoft-entra-object-id-and-upn-in-user-mention)
  * [Stageview](../../task-modules-and-cards/cards/cards-format.md#stageview-for-images-in-adaptive-cards)
  * [Full width Adaptive Card](../../task-modules-and-cards/cards/cards-format.md#full-width-adaptive-card)

* Test Tool doesn't support the following experiences:

  * Mobile
  * Meeting

## See also

* [Teams Toolkit Overview](../teams-toolkit-fundamentals.md)
* [Build bots for Teams](../../bots/what-are-bots.md)
* [Adaptive Card](../../task-modules-and-cards/cards/cards-reference.md#adaptive-card)
* [Bot Framework SDK](https://dev.botframework.com/)
