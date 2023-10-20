---
title: Define message extension action commands
author: surbhigupta
description: Learn to define messaging extension action commands with app manifest example in Microsoft Teams. Sample (.NET, Node.js) how to define action commands, create task module, and respond to task module submit action.
ms.localizationpriority: medium
ms.topic: conceptual
ms.author: anclear
---

# Define message extension action commands

Before creating the action command, you must decide the following factors:

1. [Where can the action command be triggered from?](#select-action-command-invoke-locations)
1. [How will the task module be created?](#select-how-to-create-your-task-module)
1. [Will the final message or card be sent to the channel from a bot, or will the message or card be inserted into the compose message area for the user to submit?](#select-how-the-final-message-is-sent)

See the following video to learn how to define message extension action commands:
<br>
> [!VIDEO https://www.microsoft.com/en-us/videoplayer/embed/RE4OANG]
<br>

## Select action command invoke locations

First, you must decide the location from where your action command must be invoked. By specifying the `context` in your app manifest, your command can be invoked from one or more of the following locations:

* Compose message area: The buttons at the bottom of the compose message area.

    Command context = compose

* Command box: By @mentioning your app in the command box.

    Commands context = commandBox

   > [!NOTE]
   > If message extension is invoked from the command box, you cannot respond with a bot message inserted directly into the conversation.

* Message: Directly from an existing message through the `...` overflow menu on a message.

    Commands context = message

   > [!NOTE]
   >
   > * The initial invoke to your bot includes a JSON object containing the message from which it was invoked. You can process the message before presenting a task module.
   >
   > * When the user selects ellipses **…**, an overflow menu is displayed. However, by default, message actions for apps created by you for your organization or third-party apps aren't displayed. After the user selects **More actions**, they can see the message actions and select the required option. The respective message action is displayed in the overflow menu. The overflow menu displays the three most recent message actions. You can't pin the message action to be displayed.

The following image displays the locations from where action command is invoked:

:::image type="content" source="~/assets/images/messaging-extension-invoke-locations.png" alt-text="Action command invoke locations":::

## Select how to create your task module

In addition to selecting where your command can be invoked from, you must also select how to populate the form in the task module for your users. You have the following three options for creating the form that is rendered inside the task module:

* **Static list of parameters**: This is the simplest method. You can define a list of parameters in your app manifest the Teams client renders, but can't control the formatting in this case.
* **Adaptive Card**:  You can select to use an Adaptive Card, which provides greater control over the UI, but still limits you on the available controls and formatting options.
* **Embedded web view**: You can select to embed a custom web view in the task module to have a complete control over the UI and controls.

If you select to create the task module with a static list of parameters and when the user submits the task module, the message extension is called. When using an embedded web view or an Adaptive Card, your message extension must handle an initial invoke event from the user, create the task module, and return it back to the client.

## Select how the final message is sent

In most cases, the action command results in a card inserted into the compose message box. The user can send it into the channel or chat. In this case, the message comes from the user, and the bot can't edit or update the card further.

If the message extension is invoked from the compose box or directly from a message, your web service can insert the final response directly into the channel or chat. In this case, the Adaptive Card comes from the bot, the bot updates it, and replies to the conversation thread if needed. You must add the `bot` object to the app manifest using  the same ID and defining the appropriate scopes.

### Create action command using Developer Portal

You can create an action command using **Teams Toolkit** and **Developer Portal for Teams**.


# [Teams Toolkit](#tab/Teams-toolkit)

To create an action based message extension using Teams Toolkit, follow these steps:

1. Open **Visual Studio Code**.
1. From the left pane, Select **Teams Toolkit**.
1. Select **Create a New App**.
1. Select **Message Extension**.
1. Select **Collect From Input and Process Data**.
1. Select a **programming language**.
1. Select **Default folder**.
1. Enter the name of your app and select **Enter**.

Teams Toolkit scaffolds your project and creates an action message extension.

# [Developer Portal for Teams](#tab/developer-portal-for-teams)

To create an action based message extension using Developer Portal for Teams, follow these steps:

1. Go to [**Developer Portal for Teams**](https://dev.teams.microsoft.com/home).
1. Go to **Apps**.
1. Select **Create a new app**.
1. Under **Configure**, select **App features**.
1. Select **Messaging extension**.

   :::image type="content" source="../../../assets/images/Copilot/api-based-me-tdp-app-feature.png" alt-text="Screenshot shows the message extension option in Teams Developer Portal.":::

1. If you don't have an existing bot, select **Existing bot** or if you have a bot ID, select **Enter Bot ID**.

   1. If don't have a Bot ID, you can select **Create a bot**, to create a new bot and enter the bot ID of the new bot that you've created.

1. Select the required scopes.

1. Under **Command**, select **+ Add a command**.

   A command details page appears.

1. In the Command details page, select the **Action** and then select parameter type.

1. 1. Select **Action**  as the type of command and update the following:
   * Command ID
   * Command title
   * Command description
   * Context in which the command works
   * Parameter name
   * Parameter title
   * Parameter description
   * Parameter description type

1. Select **Add a domain** under **Preview links**.

1. Enter valid domain and then select **Add**.

   :::image type="content" source="../../../assets/images/tdp/add-domain.PNG" alt-text="Screenshot shows how to add a valid domain to your messaging extension for link unfurlings.":::

1. Select **Save**.

   :::image type="content" source="../../../assets/images/tdp/add-a-command-save.PNG" alt-text="Screenshot shows how to save all your setting and parameters for your message extension.":::

**To add additional parameters**

1. Select ellipse under command section and then select **Edit parameter**.

   :::image type="content" source="../../../assets/images/tdp/edit-parameters.PNG" alt-text="Screenshots shows how to add additional parameters for your message extension.":::

1. Select **Add a Parameters** and enter all the parameters.

   :::image type="content" source="../../../assets/images/tdp/add-parameter.PNG" alt-text="Screenshot shows how to add additional parameters for your message extension."lightbox="../../../assets/images/tdp/add-a-parameters.PNG":::

A search message extension using bot framework created.

---

## Code snippets

The following code provides an example of action based for message extensions:

# [C#](#tab/dotnet)

* [SDK reference](/dotnet/api/microsoft.bot.builder.teams.teamsactivityhandler.onteamsmessagingextensionfetchtaskasync?view=botbuilder-dotnet-stable#microsoft-bot-builder-teams-teamsactivityhandler-onteamsmessagingextensionfetchtaskasync(microsoft-bot-builder-iturncontext((microsoft-bot-schema-iinvokeactivity))-microsoft-bot-schema-teams-messagingextensionaction-system-threading-cancellationtoken)&preserve-view=true)
* [Sample code reference](https://github.com/OfficeDev/Microsoft-Teams-Samples/blob/main/samples/msgext-action-preview/csharp/Bots/TeamsMessagingExtensionsActionPreviewBot.cs#L35-L56)

```csharp
     protected override Task<MessagingExtensionActionResponse> OnTeamsMessagingExtensionFetchTaskAsync(ITurnContext<IInvokeActivity> turnContext, MessagingExtensionAction action, CancellationToken cancellationToken)
        {
            // Handle different actions using switch.
            switch (action.CommandId)
            {
                case "HTML":
                    return new MessagingExtensionActionResponse
                    {
                        Task = new TaskModuleContinueResponse
                        {
                            Value = new TaskModuleTaskInfo
                            {
                                Height = 200,
                                Width = 400,
                                Title = "Task Module HTML Page",
                                Url = baseUrl + "/htmlpage.html",
                            },
                        },
                    };
                // return TaskModuleHTMLPage(turnContext, action);
                default:
                    string memberName = "";
                    var member = await TeamsInfo.GetMemberAsync(turnContext, turnContext.Activity.From.Id, cancellationToken);
                    memberName = member.Name;
                    return new MessagingExtensionActionResponse
                    {
                        Task = new TaskModuleContinueResponse
                        {
                            Value = new TaskModuleTaskInfo
                            {
                                Card = <<AdaptiveAction card json>>,
                                Height = 200,
                                Width = 400,
                                Title = $"Welcome {memberName}",
                            },
                        },
                    };
            }
```

# [Node.js](#tab/nodejs)

* [Sample code reference](https://github.com/OfficeDev/Microsoft-Teams-Samples/blob/main/samples/msgext-action/nodejs/bots/teamsMessagingExtensionsActionBot.js#L24-L61)

```javascript
// Invoked when a Messaging Extension Fetch activity is received from the connector.
    async handleTeamsMessagingExtensionFetchTask(context, action) {
        switch (action.commandId) {
            case 'Static HTML':
                return staticHtmlPage();
        }
    }

    staticHtmlPage(){
        return {
            task: {
                type: 'continue',
                value: {
                    width: 450,
                    height: 125,
                    title: 'Task module Static HTML',
                    url: `${baseurl}/StaticPage.html`
                }
            }
        };
    }
```

---

## Code sample

| Sample name           | Description | .NET    | Node.js   | Manifest|
|:---------------------|:--------------|:---------|:--------|:--------------|
|Teams message extension action| This sample shows how to define action commands, create task module, and  respond to task module submit action. |[View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/msgext-action/csharp)|[View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/msgext-action/nodejs) |[View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/msgext-action/csharp/demo-manifest/msgext-action.zip) |
|Message extension action preview| This sample shows how to use action preview in Messaging Extensions using Bot Framework v4. |[View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/msgext-action-preview/csharp)|[View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/msgext-action-preview/nodejs) |[View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/msgext-action-preview/csharp/demo-manifest/msgext-action-preview.zip) |

## Step-by-step guide

Follow the [step-by-step guide](../../../sbs-meetingextension-action.yml) to build Teams action based message extension.

## Next step

If you're using either an Adaptive Card or an embedded web view without a `taskInfo` object, the next step is to:

> [!div class="nextstepaction"]
> [Create and send task module](~/messaging-extensions/how-to/action-commands/create-task-module.md)

If you're using the parameters or an embedded web view with a `taskInfo` object, the next step is to:

> [!div class="nextstepaction"]
> [Respond to task module submit action](~/messaging-extensions/how-to/action-commands/respond-to-task-module-submit.md)

## See also

* [Developer Portal for Teams](../../../concepts/build-and-test/teams-developer-portal.md)
* [Message extensions](../../what-are-messaging-extensions.md)
