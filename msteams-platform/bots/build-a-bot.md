---
title: Let's build a bot
description: Learn to build a basic chatbot using Teams Toolkit, Bot Framework SDK. Additionally, learn to build an AI bot.
ms.localizationpriority: high
ms.date: 09/25/2024
ms.topic: conceptual
ms.author: surbhigupta
---

# Let's build a bot

Building a bot app involves various phases, from initial concept to final deployment. This article offers a detailed guide to help you get started.

<!--1. Plan your bot app: Start by defining your app's goal and purpose to align with your target audience. Also, decide on the platforms you will use, such as messaging or voice.
1. Choose the tools and SDKs: Select the tools and software development kits that you will use to build your app.
1. Design the intents and entities: Create dialog flows and plan for various use cases and potential errors.
1. Develop the bot app: Set up the bot builder, integrate APIs, build a user-friendly interface, and develop the necessary capabilities and automation. Ensure your bot integrates with any external services required to fulfil its purpose.
1. Test, optimize, and deploy: Thoroughly test your bot app, make necessary optimizations, and then deploy it.-->

[**WIP**: Graphic representation of tools and SDKs available for building bots and helping the developer make informed decisions]

If you want to create your own bot, here's a list of tools and platforms to help you get started:

:::image type="content" source="../assets/images/bots/m365-bot-decisions.png" alt-text="Infographics depicts a decision tree for building a bot.":::

| # | Choose ... | From the following options ... |
| --- | --- | --- |
| 1. | Bot capabilities | - AI bot <br> - Non-AI bot: <br> &nbsp;&nbsp; • Conversational capability <br> &nbsp;&nbsp; • Notification capability <br> &nbsp;&nbsp; • Workflow capability <br> &nbsp;&nbsp; • Command capability |
| 2. | Tools and Platforms | - **Teams AI library**: <br> A Teams AI bot uses artificial intelligence (AI) technology to communicate with users in natural language, similar to a human-to-human conversation. These bots can handle a variety of tasks, from answering simple questions to performing complex operations. If you've built your bot app using Bot Framework SDK, you can migrate your bot to use Teams AI library to utilize its advanced AI capabilities. <br> For more information, see [why you should migrate to the Teams AI library](https://github.com/microsoft/teams-ai/tree/main/getting-started/migration). <br> <br> - **Bot Framework SDK**: <br> The [Bot Framework](https://dev.botframework.com/) is a rich SDK used to create bots using C#, Python, and JavaScript. If you already have a bot that is based on the Bot Framework, you can easily modify it to work in Teams. Use either C# or Node.js to take advantage of our [SDKs](/azure/bot-service/bot-service-overview?view=azure-bot-service-4.0&preserve-view=true). These packages extend the basic Bot Builder SDK classes and methods as follows: <br> &nbsp;&nbsp; • Use specialized card types like the connector card for Microsoft 365 Groups. <br> &nbsp;&nbsp; • Set Teams-specific channel data on activities. <br> &nbsp;&nbsp; • Process message extension requests. <br> You can develop Teams apps in any web programming technology and call the [Bot Framework REST APIs](/bot-framework/rest-api/bot-framework-rest-overview) directly. You must perform token handling in all cases. <br> <br> - **Teams Toolkit**: <br> Teams Toolkit makes it simple to get started with bot app development for Teams. You can begin with a project template for common custom bot app built for your org (LOB app) scenarios or start from a sample. <br> For more information, see [tools and SDKs](../concepts/build-and-test/tool-sdk-overview.md). <br> <br> - **Azure AI bot service**:  <br> Azure AI Bot Service is a cloud platform. It hosts bots and makes them available to channels, such as Microsoft Teams, Facebook, or Slack. <br> The Bot Framework Service, which is a component of the Azure AI Bot Service, sends information between the< user's bot-connected app and the bot. Each channel can include additional information in the activities they send. <br> For more information, see [Azure AI bot service](/azure/bot-service/bot-builder-basics). |
| 3. | Bot registration service | - Azure AD <br> - Developer Portal |
| 4. | Advanced bot capabilities | - Call and media bot <br> - Access data using MS Graph <br> - SSO <br> - Bot on Mobile |

## Build a bot

<!--Here's an example of a bot app:

Contoso TravelBuddy: This bot can be deployed on Teams and offers features such as booking flights, hotels, and car rentals. It can assist in searching for travel destinations, provide weather updates, offer travel recommendations, and track the status of flights or trains.

The primary goals and purposes of this bot include offering convenience and saving time in making travel plans, personalizing recommendations, providing real-time updates, and ensuring a secure payment process.

To achieve these functionalities, you would need to integrate the bot app with APIs for flight booking, hotel booking, rental booking, weather forecasts, and payment gateways.-->

Let's start by building a conversational bot. You can use Teams Toolkit, Bot Framework SDK, or Teams AI library.

| # | I want to build ... | Here's a sample |
| --- | --- | --- |
| 1. | AI bot with Teams AI library and Teams Toolkit | [Build a custom engine agent](../Teams-AI-library-tutorial.yml) |
| 2. | Non-AI bot with Bot Framework SDK | - [Bot app with Node.js](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/bot-conversation/nodejs) <br> - [Bot app with C#](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/bot-conversation/csharp) <br> - [Bot app with Python](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/bot-conversation/python) |
| 3. | Non-AI bot with Teams Toolkit | [Create Teams conversation bot](../sbs-teams-conversation-bot.yml) |

<!--
* To use Teams Toolkit to build conversational bot, see [create Teams conversation bot](../sbs-teams-conversation-bot.yml).
* To use Bot Framework SDK V4, see one of the following code samples:

  * [Bot app with Node.js](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/bot-conversation/nodejs)
  * [Bot app with C#](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/bot-conversation/csharp)
  * [Bot app with Python](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/bot-conversation/python)

* To build an AI bot, see [build a custom engine agent](../Teams-AI-library-tutorial.yml).-->

<details>
<summary><b>Bot configuration experience</b></summary>

The bot configuration experience simplifies the process of setting up and adjusting bot settings directly within a channel or group chat after installation. This enhances operational efficiency from the start by eliminating the need for repeated user interventions. Users can customize the bot to fit their specific workflows and preferences during installation and reconfigure settings as needed to adapt to changing requirements, ensuring the bot remains relevant and valuable.

For example, a bot that tracks and shares news topics or monitors GitHub repositories can initially be set up to match user workflows. Later, it can be easily reconfigured to respond to new topics or repositories directly from the group chat, streamlining content management and interaction without leaving the Teams environment. This flexible configuration experience significantly enhances user experience and productivity by integrating bots seamlessly into daily operations.

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

When a user installs the bot in a channel or group chat, the `fetchTask` property in the app manifest file initiates either `config/fetch` or `config/submit` as defined in the `teamsBot.js` file.

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

</details>

<!--
1. Choose your bot core capabilties (conversational, workflow, command, AI)
1. Use any one of the following ways to build a bot for Teams:

    * **Teams AI library**:
      A Teams AI bot uses artificial intelligence (AI) technology to communicate with users in natural language, similar to a human-to-human conversation. These bots can handle a variety of tasks, from answering simple questions to performing complex operations.

      Teams AI bots are built using the Bot Framework SDK and can leverage the Teams AI library to streamline the process of building intelligent apps. The Teams AI library provides APIs to access and manipulate data, and controls and components to create custom user interfaces.

      If you've built your bot app using Bot Framework SDK, you can migrate your bot to use Teams AI library to utilize its advanced AI capabilities. For more information, see [Why you should migrate to the Teams AI library](https://github.com/microsoft/teams-ai/tree/main/getting-started/migration).

    * **Bot Framework SDK**:
      The [Bot Framework](https://dev.botframework.com/) is a rich SDK used to create bots using C#, Python, and JavaScript. If you already have a bot that is based on the Bot Framework, you can easily modify it to work in Teams. Use either C# or Node.js to take advantage of our [SDKs](/azure/bot-service/bot-service-overview?view=azure-bot-service-4.0&preserve-view=true). These packages extend the basic Bot Builder SDK classes and methods as follows:

        * Use specialized card types like the connector card for Microsoft 365 Groups.
        * Set Teams-specific channel data on activities.
        * Process message extension requests.

      You can develop Teams apps in any web programming technology and call the [Bot Framework REST APIs](/bot-framework/rest-api/bot-framework-rest-overview) directly. You must perform token handling in all cases.

    * **Teams Toolkit**:
      Teams Toolkit makes it simple to get started with bot app development for Teams. You can begin with a project template for common custom bot app built for your org (LOB app) scenarios or start from a sample.

      For more information, see [tools and SDKs](../concepts/build-and-test/tool-sdk-overview.md).

      <!--TeamsFx helps to reduce your tasks by using Microsoft Teams single sign-on (SSO) and accessing cloud resources down to single line statements with zero configuration. You can use TeamsFx SDK in the browser and Node.js environments. TeamsFx core functionalities can be accessed in client and server environments.

      For more information, see [TeamsFx SDK](../toolkit/TeamsFx-SDK.md)--

    * **Azure AI bot service**:
      Azure AI Bot Service is a cloud platform. It hosts bots and makes them available to channels, such as Microsoft Teams, Facebook, or Slack.

      The Bot Framework Service, which is a component of the Azure AI Bot Service, sends information between the user's bot-connected app and the bot. Each channel can include additional information in the activities they send.

      For more information, see [Azure AI bot service](/azure/bot-service/bot-builder-basics).

1. Register your bot with Teams in any one of the following ways:

    * Azure AD
    * Developer Portal

1. Explore advanced bot capabilities (Call and media bot, access data using MS Graph, and more)
-->

## Next step

* [What is Teams AI library](how-to/teams-conversational-ai/teams-conversation-ai-overview.md)
* [Understand AI bot concepts](how-to/teams-conversational-ai/how-conversation-ai-core-capabilities.md)
* [Understand bot concepts](bot-concepts.md)

## See also
