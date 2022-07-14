---
title: Bots in Microsoft Teams
author: surbhigupta
description: With this learning path, get started with conversational bots in Microsoft Teams and its code samples.
ms.topic: overview
ms.localizationpriority: high
ms.author: anclear
---
# Build bots for Teams

A bot is also referred to as a chatbot or conversational bot. It's an app that runs simple and repetitive tasks by users such as customer service or support staff. Everyday use of bots include, bots that provide information about the weather, make dinner reservations, or provide travel information. Interactions with bots can be quick questions and answers or complex conversations.

> [!IMPORTANT]
> Currently, bots are available in Government Community Cloud (GCC) and GCC-High but not in Department of Defense (DOD).
>
> Bot applications within Microsoft Teams are available in GCC-High through [Azure bot Service](/azure/bot-service/channel-connect-teams).

Conversational bots allow users to interact with your web service using text, interactive cards, and task modules.

:::image type="content" source="../assets/images/invokebotwithtext.png" alt-text="Web service using text"lightbox="../assets/images/invokebotwithtext.png":::

:::image type="content" source="../assets/images/invokebotwithcard.png" alt-text="web service using interactive cards"lightbox="../assets/images/invokebotwithcard.png"border="true":::

:::image type="content" source="../assets/images/task-module-example.png" alt-text="web service using task module"lightbox="../assets/images/task-module-example.png"border="true":::

Conversational bots are incredibly flexible. Bots can handle a few basic commands or complex tasks that involve artificial intelligence and natural language processing. Bots can be part of a larger application or be standalone.

Use the right mix of cards, text, and task modules to create a useful bot. The following image shows a user conversing with a bot in a one-to-one chat using text and interactive cards.

:::image type="content" source="~/assets/images/FAQPlusEndUser.gif" alt-text="Sample FAQ bot":::

Every interaction between the user and the bot is represented as an activity. When a bot receives an activity, it passes it on to its activity handlers. See [bot activity handlers](~/bots/bot-basics.md).

Bots are apps that have a conversational interface. You can interact with a bot using text, interactive cards, and speech. A bot behaves differently in a channel or group chat conversation and in a one-to-one conversation. Conversations are handled through the Bot Framework connector. See [conversation basics](~/bots/how-to/conversations/conversation-basics.md).

Your bot requires contextual information, such as user profile details to access relevant content and enhance the bot experience. See [get Teams context](~/bots/how-to/get-teams-context.md).

You can send and receive files through the bot using Graph APIs or Teams bot APIs. See [send and receive files through the bot](~/bots/how-to/bots-filesv4.md).

Rate limiting is used to optimize bots used for your Teams application. To protect Teams and its users, the bot APIs provide a rate limit for incoming requests. See [optimize your bot with rate limiting in Teams](~/bots/how-to/rate-limit.md).

With Microsoft Graph APIs for calls and online meetings, Teams apps can now interact with users using voice and video. See [calls and meetings bots](~/bots/calls-and-meetings/calls-meetings-bots-overview.md).

You can use the Teams bot APIs to get information for members of a chat or team. See [changes to Teams bot APIs for fetching team or chat members](~/resources/team-chat-member-api-changes.md).

<!--- TBD: For quick scanning, see if the above information can be itemized as a list.
--->

## Global endpoint for bots API

When you create a bot to enable the global routing endpoint for a region, ensure that you specify the `cloud` parameter as `teams` in the URL. For example, if the URL is `../{cloud}/v3/conversations/{conversationId}`, specify the cloud parameter to `../teams/v3/conversations/12345`.

> [!NOTE]
> If a bot calls <https://smba.trafficmanager.net/teams/> for a GCC, GCCH, and DOD tenant, the requests sends an error. For GCC, GCCH, and DOD tenants, the URL root can't be public, instead it needs to be specific to these environments.

## Code samples

|Sample name | Description | C# | Node.js |
|----------------|-----------------|--------------|--------------|
| Bot daily task reminder| Demonstrate how to schedule a recurring task and get a reminder at a scheduled time. | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/bot-daily-task-reminder/csharp) | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/bot-daily-task-reminder/nodejs) |

## Next step

> [!div class="nextstepaction"]
> [Bots and SDKs](~/bots/bot-features.md)

## See also

* [Create a bot for Teams](../resources/bot-v3/bots-create.md)
* [How Microsoft Teams bots work](/azure/bot-service/bot-builder-basics-teams)
* [Register calls and meetings bot for Microsoft Teams](~/bots/calls-and-meetings/registering-calling-bot.md)
* [Add authentication to your Teams bot](~/bots/how-to/authentication/add-authentication.md)
* [Bot activity handlers](~/bots/bot-basics.md)
* [Conversation events in your Teams bot](~/bots/how-to/conversations/subscribe-to-conversation-events.md)
