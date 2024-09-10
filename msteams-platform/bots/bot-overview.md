---
title: Bots in Teams
author: surbhigupta
description: description for overview
ms.topic: overview
ms.localizationpriority: high
ms-author: surbhigupta
ms.date: 01/29/2023
---


# Bot app for Teams

TBD Introduction: what is a Bot, Bot apps (types) in Teams.

A Teams bot is an app that runs automated tasks within Microsoft Teams. These bots can interact with users through text, interactive cards, and dialogs, making them useful for a variety of tasks such as answering questions, providing updates, or assisting with workflows.

Teams bots can handle a few basic commands or complex tasks that involve artificial intelligence and natural language processing. They can be part of a larger application or be standalone. Bots in Teams support several kinds of conversations called scopes.

Bots in Microsoft Teams can be part of a one-to-one conversation, a group chat, or a channel in a team. Each scope provides unique opportunities and challenges for your conversational bot.

| In a channel | In a group chat | In a one-to-one chat |
| :-- | :-- | :-- |
| Massive reach | Fewer members | Traditional way |
| Concise individual interactions | @mention to bot  | Q&A bots |
| @mention to bot | Similar to channel | Bots that tell jokes and take notes |

### In a channel

Channels contain threaded conversations between multiple people even up to 2000. This potentially gives your bot massive reach, but individual interactions must be concise. Traditional multi-turn interactions don't work. Instead, you must look to use interactive cards or dialogs (referred as task modules in TeamsJS v1.x), or move the conversation to a one-to-one conversation to collect lots of information. Your bot only has access to messages where it's `@mentioned`. You can retrieve additional messages from the conversation using Microsoft Graph and organization-level permissions.

Bots work better in a channel in the following cases:

* Notifications, where you provide an interactive card for users to take additional information.
* Feedback scenarios, such as polls and surveys.
* Single request or response cycle resolves interactions and the results are useful for multiple members of the conversation.
* Social or fun bots, where you get an awesome cat image, randomly pick a winner, and so on.

### In a group chat

Group chats are non-threaded conversations between three or more people. They tend to have fewer members than a channel and are more transient. Similar to a channel, your bot only has access to messages where it's `@mentioned` directly.

In the cases where bots work better in a channel also work better in a group chat.

### In a one-to-one chat

One-to-one chat is a traditional way for a conversational bot to interact with a user. A few examples of one-to-one conversational bots are:

* Q&A bots
* bots that initiate workflows in other systems.
* bots that tell jokes.
* bots that take notes.
Before creating one-to-one chatbots, consider whether a conversation-based interface is the best way to present your functionality.

## Types of bots

You can create the following types of bots using either Bot Framework SDK or Teams Toolkit:

1. Notification bot: A notification bot is an automated bot that sends notifications to users in a Teams channel, group chat, or personal chat. You can use notification bots for user scenarios such as, sending reminders or alerts, or sharing news or updates. Users can also interact with interactive notification bots by responding to options or links within the notification or even sharing input or feedback.

  For more information, see [build notification bot with JavaScript](../sbs-gs-notificationbot.yml).

2. Workflow bot: You use a workflow bot to automate or streamline business processes. This bot can interact with users, applications, and data to progress tasks and workflows. You can use workflow bots to automate repetitive tasks, assign tasks to team members, track progress, and more. They're used to bring efficiency through automation and reduction of manual effort.

  For more information, see [build command bot with JavaScript](../sbs-gs-commandbot.yml).

3. Conversational bot: A conversational bot is a chat bot that can simulate conversation with users, who can use it to interact with a web service. The conversation is made possible through text, interactive cards, and dialogs. This bot can understand user inputs and respond accordingly. You can use it to help users with virtual assistance, customer service, and more.

  For more information, see [create Teams conversation bot](../sbs-teams-conversation-bot.yml).

4. AI bot: An AI bot uses artificial intelligence to perform the tasks it is automated to do. It understands natural language and can engage in conversation and answer questions. You can use it for virtual assistance, language translation, predictive analysis, and more.

  For more information, see [build a custom copilot to chat with your data using Teams AI library and Teams Toolkit](../Teams-AI-library-tutorial.yml).

## Typical bot scenarios

TBD

## Bot manifest configuration

Bot configuration experience allows users to set up and reconfigure their bots' settings directly within the channel or group chat post-installation, enhancing operational efficiency from the start. This functionality eliminates the need for repeated user interventions that previously hampered timely benefits realization from apps. Users can now tailor the bot to their specific workflows and preferences during installation and reconfigure settings as needed to adapt to changing requirements, ensuring the bot's ongoing relevance and value.

For instance, consider a bot that tracks and shares news topics, or monitors GitHub repositories. Initially configured to align with user workflows, these bots can easily be reconfigured to respond to new topics or repositories directly from the group chat, streamlining content management, and interaction without leaving the Teams environment. This flexible configuration experience significantly enhances user experience and productivity by integrating bots seamlessly into daily operations.

Here's an example, where a user adds the bot to a group chat and then configures it to align with their specific requirements. The user then reconfigures the bot to change the status. 

**Configure**

:::image type="content" source="../../assets/images/bots/configuration-bot.gif" alt-text="Graphic shows the process of configuring a bot into a Teams channel.":::

**Reconfigure**

:::image type="content" source="../../assets/images/bots/reconfiguration-mention-bot.gif" alt-text="Screenshot shows the configuration option for the bot in the message compose area.":::

## Build bot configuration experience

> [!NOTE]
> Bot configuration experience is supported only in channel or group chat.

When you build the bot configuration experience, you must ensure that the user must be able to configure a bot on first installation and reconfigure it at any time.

To build the bot configuration experience, follow these steps:

1. [Update app manifest](#update-app-manifest)

1. [Configure your bot](#configure-your-bot)

### Update app manifest

In the app manifest (previously called Teams app manifest) file, update the `fetchTask` property under the `bots.configuration` object as follows:

```json
"bots": [
    {
      "botId": "${{AAD_APP_CLIENT_ID}}",
     "needsChannelSelector": false,
      "scopes": [
        "personal",
        "team",
        "groupChat"
      ],
      "configuration":{
        "groupChat":{
          "fetchTask": true
        },
        "team":{
          "fetchTask": true
        }
      },
      "isNotificationOnly": false
    }
  ],
```

For more information, see [app manifest schema](../../resources/schema/manifest-schema.md#botsconfiguration).

### Configure your bot

When a user installs the bot in channel or group chat, the `fetchTask` property in the app manifest file initiates either `config/fetch` or `config/submit` as defined in the `teamsBot.js` file.

If you set the `fetchTask` property in the app manifest to:

* **false**: The bot doesn't fetch a dialog or an Adaptive Card. Instead, the bot must provide a static dialog or card that is used when the bot is invoked. For more information, see [dialogs](../../task-modules-and-cards/what-are-task-modules.md).

* **true**: The bot initiates either `config/fetch` or `config/submit` as defined. When the bot is invoked, you can return an Adaptive Card or a dialog depending on the context provided in [channelData and userdata](../../messaging-extensions/how-to/action-commands/create-task-module.md#payload-activity-properties-when-a-dialog-is-invoked-from-a-group-chat).

The following table lists the response type associated with the invoke requests:

|Invoke request |Response type |
| --- | --- |
| `config/fetch` | `Type: "continue"` or `Type = "auth"` |
| `config/submit` | `Type: "continue"` or `Type: "message"` |

* `type: "continue"`: `type: "continue"` is used to define a continuation of a dialog or Adaptive Card within a bot configuration. When the type is set to `continue`, it indicates that the bot is expecting further interaction from the user to continue with the configuration process.

   The `adaptiveCardForContinue` is a custom function that returns the JSON for an Adaptive Card to be used in different stages of a bot’s workflow. These functions are used to return Adaptive Cards for different scenarios based on the user’s interaction with the bot.

   When the user submits the configuration, the `config/submit` invoke is triggered. It reads the user's input and returns a different Adaptive Card. You can also update the bot configuration to return a [dialog](../../task-modules-and-cards/what-are-task-modules.md).

   # [C#](#tab/teams-bot-sdk1)

   [Sample code reference](https://github.com/OfficeDev/Microsoft-Teams-Samples/blob/main/samples/bot-configuration-app/csharp/Bot%20configuration/Bots/TeamsBot.cs#L78)

   ```csharp
   protected override Task<ConfigResponseBase>OnTeamsConfigFetchAsync(ITurnContext<IInvokeActivity> turnContext, JObject configData, CancellationToken cancellationToken)
   {
      ConfigResponseBase response = adaptiveCardForContinue();
      return Task.FromResult(response);
   }
   ```

   # [JavaScript](#tab/JS1)

   [Sample code reference](https://github.com/OfficeDev/Microsoft-Teams-Samples/blob/main/samples/bot-configuration-app/nodejs/teamsBot.js#L52)

   ```javascript
   async handleTeamsConfigFetch(_context, _configData) {
      let response = {};
      const adaptiveCard = CardFactory.adaptiveCard(this.adaptiveCardForContinue());
      response = {
         config: {
            value: {
               card: adaptiveCard,
               height: 500,
               width: 600,
               title: 'test card',
            },
            type: 'continue',
         },
      };
      return response;
   }
   ```

---

* `type: "auth"`: You can also request the user to authenticate as a response to `config/fetch` request. The `type: "auth"` configuration prompts the user to sign in through a specified URL, which must be linked to a valid authentication page that can be opened in a browser. Authentication is essential for scenarios where the bot requires the user to be authenticated. It ensures that the user’s identity is verified, maintaining security, and personalized experiences within the bot’s functionality.

   > [!NOTE]
   > For `type: "auth"` only third party authentication is supported. Single sign-on (SSO) isn't supported. For more information on third party authentication, see [add authentication.](../../messaging-extensions/how-to/add-authentication.md)

   # [C#](#tab/teams-bot-sdk2)

   [Sample code reference](https://github.com/OfficeDev/Microsoft-Teams-Samples/blob/main/samples/bot-configuration-app-auth/csharp/Bot%20configuration/Bots/TeamsBot.cs#L78)

   ```csharp
   protected override Task<ConfigResponseBase>OnTeamsConfigFetchAsync(ITurnContext<IInvokeActivity> turnContext, JObject configData, CancellationToken cancellationToken)
   {
      ConfigResponseBase response = new ConfigResponse<BotConfigAuth> {
         Config = new BotConfigAuth {
            SuggestedActions = new SuggestedActions {
               Actions = new List<CardAction> {
                  new CardAction {
                     type: "openUrl",
                     value: "https://example.com/auth",
                     title: "Sign in to this app"
                  }
               }
            },
         Type = "auth"
      }
   };
   ```

   # [JavaScript](#tab/JS2)

   [Sample code reference](https://github.com/OfficeDev/Microsoft-Teams-Samples/blob/main/samples/bot-configuration-app-auth/nodejs/teamsBot.js#L51)

   ```javascript
   async handleTeamsConfigFetch(_context, _configData) {
      let response = {};
      response = {
         config: {
            type: "auth",
            suggestedActions: {
               actions: [{
                  type: "openUrl",
                  value: "https://example.com/auth",
                  title: "Sign in to this app"
               }]
            },
        },
      };
      return response;
   }
   ```

---

* `type="message"`: When the type is set to message, it indicates that the bot is sending a simple message back to the user, indicating the end of the interaction or providing information without requiring further input.

   # [C#](#tab/teams-bot-sdk3)

   [Sample code reference](https://github.com/OfficeDev/Microsoft-Teams-Samples/blob/main/samples/bot-configuration-app-auth/csharp/Bot%20configuration/Bots/TeamsBot.cs#L102-L114)

   ```csharp
   protected override Task<ConfigResponseBase> OnTeamsConfigSubmitAsync(ITurnContext<IInvokeActivity> turnContext, JObject configData, CancellationToken cancellationToken)
   {
      ConfigResponseBase response = new ConfigResponse<TaskModuleResponseBase>
      {
         Config = new TaskModuleMessageResponse
         {
            Type = "message",
            Value = "You have chosen to finish setting up bot"
         }
      };
      return Task.FromResult(response);
   }
   ```

   # [JavaScript](#tab/JS3)

   [Sample code reference](https://github.com/OfficeDev/Microsoft-Teams-Samples/blob/main/samples/bot-configuration-app-auth/nodejs/teamsBot.js#L72-L83)

   ```javascript
   async handleTeamsConfigSubmit(context, _configData) {
      let response = {};
      response = {
         config: {
            type: 'message',
            value: 'You have chosen to finish setting up bot',
         },
      }
      return response;
   }
   ```

---

When a user reconfigures the bot, the `fetchTask` property in the app manifest file initiates `config/fetch` in the bot logic. The user can reconfigure the bot settings post-installation in two ways:

* @mention the bot in the message compose area. Select the **Settings** option that appears above the message compose area. A dialog appears, update, or changes the bot's configuration settings in the dialog.

   :::image type="content" source="../../assets/images/bots/reconfiguration-mention-bot.gif" alt-text="Screenshot shows the configuration option for the bot in the message compose area.":::

* Hover over the bot, the bot profile card appears. To update or change the bot's configuration settings, select the settings icon in the bot profile card.

   :::image type="content" source="../../assets/images/bots/reconfiguration-hover.gif" alt-text="Screenshot shows the configuration option for the bot in a Teams group chat.":::

## Best practices

* If you want to have an individual channel-level configuration of your bot, ensure that you track the configuration as per the channel. Configuration data isn't stored and the invoke payload includes the sufficient [channelData](../../messaging-extensions/how-to/action-commands/create-task-module.md#payload-activity-properties-when-a-dialog-is-invoked-from-a-group-chat).

* Provide a clear and user-friendly dialog that prompts the user to enter the required information for the bot to operate properly, such as a URL, an area path, or a dashboard link.

* Avoid sending multiple notifications or requests for configuration after the installation, as it might confuse the users.

## Code sample

| **Sample name** | **Description** |**.NET** |**Node.js** |**Manifest**|
|-----------------|-----------------|----------------|----------------|
| Bot configuration app | This sample code describes the configuration and reconfiguration for bots in team and group chat with `continue` and `message` response types. |[View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/bot-configuration-app/csharp)|[View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/bot-configuration-app/nodejs)|[View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/bot-configuration-app/csharp/demo-manifest)|
| Bot configuration app with auth | This sample code describes the configuration and reconfiguration for bots in team and group chat with `auth` and `message` response types. |[View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/bot-configuration-app-auth/csharp)|[View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/bot-configuration-app-auth/nodejs)|[View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/bot-configuration-app-auth/csharp/demo-manifest)|

## Step-by-step guide

Follow the [step-by-step guide](../../qsg-bot-configuration-experience.yml) to configure your bot during installation or after installation from the team or group chat where the bot is installed.


## Concepts

TBD

## Advantages of bots

TBD

## Recommendations

An extensive dialog between your bot and the user is a slow and complex way to get a task completed. A bot that supports excessive commands, especially a broad range of commands, isn't successful or viewed positively by users.

* **Avoid multi-turn experiences in chat**
  An extensive dialog requires the developer to maintain state. To exit this state, a user must either time out or select **Cancel**. Also, the process is tedious. For example, see the following conversation scenario:

    USER: Schedule a meeting with Megan.

    BOT: I’ve found 200 results, include a first and last name.

    USER: Schedule a meeting with Megan Bowen.

    BOT: OK, what time would you like to meet with Megan Bowen?

    USER: 1:00 pm.

    BOT: On which day?

* **Support six or less frequent commands**
  As there are only six visible commands in the current bot menu, anything more is unlikely to be used with any frequency. Bots that go deep into a specific area rather than trying to be a broad assistant work and fare better.

* **Optimize size of knowledgebase for quicker interaction**
  One of the disadvantages of bots is that it's difficult to maintain a large retrieval knowledge base with unranked responses. Bots are best suited for short, quick interactions, and not sifting through long lists looking for an answer.

## Limitations and known issues

If you're unable to create a bot in Developer Portal, ensure the following:

* **App registration is enabled for users**: When an app registration is disabled org-wide, users (other than users with Microsoft Entra admin access) can't register new apps. To allow users to register apps, admins must toggle **Users can register applications** to **Yes** in the [Microsoft Entra admin center](/azure/active-directory/fundamentals/users-default-permissions#restrict-member-users-default-permissions).

* **Give permissions to specific users to register new apps**:

  * For Microsoft 365 licenses where app registration limit is 250 apps per user, ensure that the tenant admin adds Microsoft Entra ID to a user with the following roles:

    * [Application Administrator](/azure/active-directory/roles/permissions-reference#application-administrator)
    * [Application Developer](/azure/active-directory/roles/permissions-reference#application-developer)
    * [Cloud Application Administrator](/azure/active-directory/roles/permissions-reference#cloud-application-administrator)

    For information about how to assign roles, see [Assign Microsoft Entra roles to users](/azure/active-directory/roles/manage-roles-portal).

  * For Microsoft 365 (P1, P2, E3, or E5 plan) license where app registration limit is default to tenant limit (more than 300,000) per user, ensure that the tenant admin adds Microsoft Entra ID  to a user and assigns a [Custom role](/azure/active-directory/roles/custom-create) to the user with the following permissions:

    * `microsoft.directory/applications/create`
    * `microsoft.directory/applications/createAsOwner`

## Glossary

TBD

## See also

TBD
