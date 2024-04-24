---
title: Bots in Microsoft Teams
author: surbhigupta
description: In this article, use conversational bots in Microsoft Teams to share files, send proactive notification, interactive cards, make calls, invoke bot command, IVR.
ms.topic: overview
ms.localizationpriority: high
ms.author: anclear
ms.date: 01/29/2023
---
# Build bots for Teams

A bot is also referred to as a chatbot or conversational bot. It's an app that runs simple and repetitive tasks by users such as customer service or support staff. Everyday use of bots include, bots that provide information about the weather, make dinner reservations, or provide travel information. Interactions with bots can be quick questions and answers or complex conversations.

It's recommended to start with [build your first bot app using JavaScript](../sbs-gs-bot.yml) or [build notification bot with JavaScript](../sbs-gs-notificationbot.yml) by using the new generation development tool for Teams. For more information, see [Teams Toolkit overview](../toolkit/teams-toolkit-fundamentals.md).

> [!IMPORTANT]
>
> * Bots are available in [Government Community Cloud (GCC), GCC-High, and Department of Defense (DOD)](~/concepts/app-fundamentals-overview.md#government-community-cloud) environments. Bot applications within Microsoft Teams for GCC-High and DOD are available through [Azure bot Service](/azure/bot-service/how-to-deploy-gov-cloud-high) and bot channel registration must be done in Azure Government portal.
>
> * Image URLs in Adaptive Cards aren't supported in GCC-High and DOD environments. You can replace an image URL with Base64 encoded DataUri.
>
> * When a user changes the Teams theme in a bot, the theme doesn’t apply to the content shared using an Adaptive Card.

Conversational bots allow users to interact with your web service using text, interactive cards, and dialogs (referred as task modules in TeamsJS v1.x).

:::image type="content" source="../assets/images/invokebotwithtext.png" alt-text="The screenshot is an example that shows a web service using text." lightbox="../assets/images/invokebotwithtext.png":::

:::image type="content" source="../assets/images/invokebotwithcard.png" alt-text="The screenshot is an example that shows a web service using interactive cards." lightbox="../assets/images/invokebotwithcard.png"border="true":::

:::image type="content" source="../assets/images/task-module-example.png" alt-text="The screenshot is an example that shows a web service using dialog." lightbox="../assets/images/task-module-example-expanded.png":::

Conversational bots are incredibly flexible. Bots can handle a few basic commands or complex tasks that involve artificial intelligence and natural language processing. Bots can be part of a larger application or be standalone.

Use the right mix of cards, text, and dialogs to create a useful bot. The following image shows a user conversing with a bot in a one-to-one chat using text and interactive cards.

:::image type="content" source="~/assets/images/FAQPlusEndUser.gif" alt-text="The screenshot is an example that shows a sample FAQ bot.":::

Every interaction between the user and the bot is represented as an activity. When a bot receives an activity, it passes it on to its activity handlers. See [bot activity handlers](~/bots/bot-basics.md).

Bots are apps that have a conversational interface. You can interact with a bot using text, interactive cards, and speech. A bot behaves differently in a channel or group chat conversation and in a one-to-one conversation. Conversations are handled through the Bot Framework connector. See [conversation basics](~/bots/how-to/conversations/conversation-basics.md).

Your bot requires contextual information, such as user profile details to access relevant content and enhance the bot experience. See [get Teams context](~/bots/how-to/get-teams-context.md).

You can send and receive files through the bot using Graph APIs or Teams bot APIs. See [send and receive files through the bot](~/bots/how-to/bots-filesv4.md).

Rate limiting is used to optimize bots used for your Teams application. To protect Teams and its users, the bot APIs provide a rate limit for incoming requests. See [optimize your bot with rate limiting in Teams](~/bots/how-to/rate-limit.md).

With Microsoft Graph APIs for calls and online meetings, Teams apps can now interact with users using voice and video. See [calls and meetings bots](~/bots/calls-and-meetings/calls-meetings-bots-overview.md).

You can use the Teams bot APIs to get information for members of a chat or team. See [changes to Teams bot APIs for fetching team or chat members](~/resources/team-chat-member-api-changes.md).

You can add or update the bot icon for the Teams apps as follows:

* [Microsoft Teams Store app](~/concepts/deploy-and-publish/appsource/publish.md): For Teams Store apps, bot icons are fetched from the app manifest (previously called Teams app manifest). You can update the bot profile icon by updating it through the app manifest and republishing the app.
    
    ```json
    
    {
      "$schema": "https://developer.microsoft.com/json-schemas/teams/v1.16/MicrosoftTeams.schema.json",
      "manifestVersion": "1.17",
      "version": "1.0.0",
      "id": "%MICROSOFT-APP-ID%",
      "icons": {
         "outline": "A relative path to a transparent .png icon — 32px X 32px", // This icon is used for bot profile.
         "color": "A relative path to a full color .png icon — 192px X 192px"
      },
      "bots": [
      {
        "botId": "%MICROSOFT-APP-ID-REGISTERED-WITH-BOT-FRAMEWORK%",
        "scopes": [
          "team",
          "personal",
          "groupChat"
        ]
      }
      ]
    ...
    }

    ```

* [Uploading a custom app](~/concepts/deploy-and-publish/apps-upload.md) in Teams or [custom apps built for your org (LOB apps)](/microsoftteams/teams-custom-app-policies-and-settings): </br>
  
  * [**Azure portal**](https://ms.portal.azure.com/#home): You can change your bot icon by navigating to [Azure portal.](/azure/bot-service/bot-service-manage-overview#settings)

    :::image type="content" source="~/assets/images/bots/bot-icon-update.png" alt-text="Screenshot of the Azure portal to update bot icons." lightbox="~/assets/images/bots/bot-icon-update.png":::
</br>
  * [**Bot Framework Portal**](https://dev.botframework.com/bots): For bots created using Bot Framework Portal, you can update the bot icon in the settings page.

    :::image type="content" source="~/assets/images/bots/bot-icon-frame-work.png" alt-text="Screenshot of the Bot Framework Portal to update bot icons." lightbox="~/assets/images/bots/bot-icon-frame-work.png":::

> [!NOTE]
> The bot icon is cached until the user signs out and signs back in Teams.

You can change the bot name displayed in Teams environment, and you need to update it in the following occurrences:

* The bot name displayed as a title in the chat window is managed within your app manifest (previously called Teams app manifest) and you can update the bot name in your app manifest.

* The bot name that's displayed in your Teams chat list and in the chat window with each message are managed within Microsoft Azure portal. For custom uploaded apps, you can update the bot name in the **Bot profile** page in Azure portal.

  :::image type="content" source="~\assets\images\bot_name.png" alt-text="The screenshot shows the bot name displayed in a Teams window.":::

## Add SSO authentication to your conversation bots

You can add single sign-on authentication to your conversation bot using the following steps:

* [Create Teams conversation bot](../sbs-teams-conversation-bot.yml)
* [Configure your bot app in Microsoft Entra ID](~/bots/how-to/authentication/bot-sso-register-aad.md)

<!--- TBD: For quick scanning, see if the above information can be itemized as a list.
--->

## Bot configuration experience

Bot configuration experience helps you to enable the bot settings for users to configure their bot during installation and reconfigure the bot from the channel or group chat scope where the bot is installed. Bot configuration is an important functionality for apps within the Teams platform, laying the foundation for their operational effectiveness. For more information, see [bot configuration experience](how-to/bot-configuration-experience.md).

## Code samples

|Sample name | Description |.NET | Node.js | Manifest
|----------------|-----------------|--------------|--------------|--------------|
| Bot daily task reminder| This sample shows how to schedule a recurring task and get a reminder at a scheduled time using bot. | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/bot-daily-task-reminder/csharp) | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/bot-daily-task-reminder/nodejs) |[View](https://github.com/OfficeDev/Microsoft-Teams-Samples/blob/main/samples/bot-daily-task-reminder/csharp/demo-manifest/Bot-Daily-Task-Reminder.zip) |
| Hello world bot | This is a simple hello world application with both bot and message extension capabilities. | NA | [View](https://github.com/OfficeDev/TeamsFx-Samples/tree/v1.0.0/hello-world-bot) |
| Adaptive Card notification | This is a sample, which shows how to send notifications with different Adaptive Cards using bots. | NA | [View](https://github.com/OfficeDev/TeamsFx-Samples/tree/v1.0.0/adaptive-card-notification) |
| Incoming Webhook notification | This is a sample, which shows how to send notifications using Incoming Webhook in Microsoft Teams channels. | NA | [View](https://github.com/OfficeDev/TeamsFx-Samples/tree/v1.0.0/incoming-webhook-notification) |

## Next step

> [!div class="nextstepaction"]
> [Bots and SDKs](~/bots/bot-features.md)

## See also

* [How Microsoft Teams bots work](/azure/bot-service/bot-builder-basics-teams)
* [Designing your Microsoft Teams bot](design/bots.md)
* [Create a bot for Teams](../resources/bot-v3/bots-create.md)
* [Test and debug your Microsoft Teams bot](../resources/bot-v3/bots-test.md)
* [Build your first bot app using JavaScript](../sbs-gs-bot.yml)
* [Add authentication to your Teams bot](how-to/authentication/add-authentication.md)
* [Use dialogs from bots](../task-modules-and-cards/task-modules/task-modules-bots.md)
* [Create Incoming Webhooks](../webhooks-and-connectors/how-to/add-incoming-webhook.md)
* [Instrumenting for Teams app specific analytics](../concepts/design/overview-analytics.md#instrumenting-for-teams-app-specific-analytics)
