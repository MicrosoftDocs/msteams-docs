---
title: Use Microsoft Graph to enable proactive bot installation and messaging in Teams
description: Describes proactive messaging in Teams and how to implement.
localization_priority:  Normal
author: laujan
ms.author: lajanuar
ms.topic: Overview
keywords: teams proactive messaging chat installation Graph
---
# Enable proactive bot installation and proactive messaging in Teams with Microsoft Graph (Public Preview)

>[!IMPORTANT]
> Microsoft Graph public previews are available for early-access and feedback. Although this release has undergone extensive testing, it is not intended for use in production.

## Proactive messaging in Teams

Proactive messages are initiated by bots to start conversations with a users. They serve many purposes including sending welcome messages, conducting surveys or polls, and broadcasting organization-wide notifications.  Proactive messages in Teams can be delivered as either **ad-hoc** or **dialog-based** conversations:

|Message Type | Description |
|----------------|-------------- |
|Ad-hoc proactive message| The bot interjects a message without interrupting the conversation flow.|
|Dialog-based proactive message | The bot creates a new dialog thread, takes control of a conversation, delivers the proactive message, closes, and returns control to the previous dialog.|

*See*, [Send proactive notifications to users SDK v4](/azure/bot-service/bot-builder-howto-proactive-message?view=azure-bot-service-4.0&tabs=csharp)

## Proactive app installation in Teams

Before your bot can proactively message a user, it needs to be installed either as a personal app, or in a team where the user is a member. At times,  you may need to proactively message users that have _not_ installed or previously interacted with your app. For instance, the need to message vital information to everyone in your organization. For that scenario you can use the Microsoft Graph API to proactively install your bot for your users.

## Permissions

Microsoft Graph [teamsAppInstallation resource type](/graph/api/resources/teamsappinstallation?view=graph-rest-1.0) permissions allow you to manage your app's installation lifecycle for all user (personal ) or team (group) scopes within the Microsoft Teams platform:

|Application permission | Description|
|------------------|---------------------|
|`TeamsAppInstallation.ReadWriteSelfForUser.All`|Allows a Teams app to read, install, upgrade, and uninstall itself to any **user**, without a prior sign in or use.|
|`TeamsAppInstallation.ReadWriteSelfForTeam.All`|Allows a Teams app to read, install, upgrade, and uninstall itself in any **team**, without a prior sign in or use.|

To use these permissions, you must add a [webApplicationInfo](../../resources/schema/manifest-schema.md#webapplicationinfo) key to your app manifest with the following values:
> [!div class="checklist"]
> [!div class="checklist"]
>
> * **id**  — your Azure AD app id.
> * **resource** — the resource url for the app.
>

>[!NOTE]
>
> * Your bot requires _application_ not _user delegated_ permissions because the installation is not for yourself but for others.
>
> * An Azure AD tenant administrator must [explicitly grant permissions to an application](/graph/security-authorization#grant-permissions-to-an-application). After an application is granted permissions, _all_ members of the Azure AD tenant will gain the granted permissions.

## Enable proactive app installation and messaging

 > [!IMPORTANT]
> Microsoft Graph will only install apps published in your organization's [app catalog](../../concepts/deploy-and-publish/overview.md#publish-to-your-organizations-app-catalog) or [AppSource](https://appsource.microsoft.com/).

### ✔ [Create](../../bots/how-to/create-a-bot-for-teams.md) and [Publish](../../concepts/deploy-and-publish/overview.md) your [proactive messaging bot](../../concepts/bots/bot-conversations/bots-conv-proactive.md) for Teams

When creating your app, make sure that you note the `id`  you use in your application manifest; you'll need it for the installation process.

>[!TIP]
> The production-ready [**Company Communicator**](../..//samples/app-templates.md#company-communicator) app template enables broadcast messaging and is a good foundation for building your proactive bot application.

### ✔ Determine whether your bot is currently installed for a message recipient

**Microsoft Graph page reference:** [List apps installed for user](/graph/api/user-list-teamsappinstallation?view=graph-rest-beta&tabs=http)

**HTTP GET** request:

```http
GET https://graph.microsoft.com/beta/users/{user-id}/teamwork/installedApps?$expand=teamsAppDefinition&$filter=teamsAppDefinition/teamsAppId eq '{teamsAppid}'
```

The `{teamsAppId}` is the `id` from your Teams app manifest, noted earlier — it may not be the same as your `appid` for Microsoft Graph calls or your `botId`.

This request will return an empty array if the app is not installed, or an array with a single [teamsAppInstallation](/graph/api/resources/teamsappinstallation?view=graph-rest-beta) if it is already installed.

### ✔ Install your app

**Microsoft Graph reference:** [Install app for user](/graph/api/user-add-teamsappinstallation?view=graph-rest-beta&tabs=http)

**HTTP POST** request:

```http
POST /users/{user-id}/teamwork/installedApps
{
   "teamsApp@odata.bind" : "https://graph.microsoft.com/beta/appCatalogs/teamsApps/{teamsAppid}"
}
```

If the user has Microsoft Teams running, they may see the app installation immediately or  a  restart may be necessary to see the installed app.

### ✔ Retrieve the conversation **chatId**

When your app is installed for the user, the bot will receive a `conversationUpdate` [event notification](../../resources/bot-v3/bots-notifications.md#team-member-or-bot-addition) that will contain the necessary information to send the proactive message.

The `chatId` can also be retrieved with the following:

**Microsoft Graph reference:** [Get chat](/graph/api/chat-get?view=graph-rest-beta&tabs=http)

**HTTP GET** request:

```http
 GET https://graph.microsoft.com/beta/users/{user-id}/chats?$filter=installedApps/any(a:a/teamsApp/id eq '{teamsAppid}')
```

The **id** property of the response is the `chatId`.

### ✔ Send proactive messages

Once your bot has been added for a user or team and has acquired the necessary user  information, it can begin to [send proactive messages](/azure/bot-service/bot-builder-howto-proactive-message?view=azure-bot-service-4.0&tabs=csharp).

# [C# / .NET](#tab/csharp)

The following code snippet is from the [Microsoft Bot Framework Samples for C#.](https://github.com/microsoft/BotBuilder-Samples/tree/master/samples/csharp_dotnetcore/16.proactive-messages)

```csharp
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.Bot.Builder;
using Microsoft.Bot.Schema;

namespace Microsoft.BotBuilderSamples
{
    public class ProactiveBot : ActivityHandler
    {
        // Message to send to users when the bot receives a Conversation Update event
        private const string WelcomeMessage = "Welcome to the Proactive Bot sample.  Navigate to http://localhost:3978/api/notify to proactively message everyone who has previously messaged this bot.";

        // Dependency injected dictionary for storing ConversationReference objects used in NotifyController to proactively message users
        private readonly ConcurrentDictionary<string, ConversationReference> _conversationReferences;

        public ProactiveBot(ConcurrentDictionary<string, ConversationReference> conversationReferences)
        {
            _conversationReferences = conversationReferences;
        }

        private void AddConversationReference(Activity activity)
        {
            var conversationReference = activity.GetConversationReference();
            _conversationReferences.AddOrUpdate(conversationReference.User.Id, conversationReference, (key, newValue) => conversationReference);
        }

        protected override Task OnConversationUpdateActivityAsync(ITurnContext<IConversationUpdateActivity> turnContext, CancellationToken cancellationToken)
        {
            AddConversationReference(turnContext.Activity as Activity);

            return base.OnConversationUpdateActivityAsync(turnContext, cancellationToken);
        }

        protected override async Task OnMembersAddedAsync(IList<ChannelAccount> membersAdded, ITurnContext<IConversationUpdateActivity> turnContext, CancellationToken cancellationToken)
        {
            foreach (var member in membersAdded)
            {
                // Greet anyone that was not the target (recipient) of this message.
                if (member.Id != turnContext.Activity.Recipient.Id)
                {
                    await turnContext.SendActivityAsync(MessageFactory.Text(WelcomeMessage), cancellationToken);
                }
            }
        }

        protected override async Task OnMessageActivityAsync(ITurnContext<IMessageActivity> turnContext, CancellationToken cancellationToken)
        {
            AddConversationReference(turnContext.Activity as Activity);

            // Echo back what the user said
            await turnContext.SendActivityAsync(MessageFactory.Text($"You sent '{turnContext.Activity.Text}'"), cancellationToken);
        }
    }
}
```

# [JavaScript](#tab/javascript)

The following code snippet is from the [Microsoft Bot Framework Samples for JavaScript](https://github.com/microsoft/BotBuilder-Samples/tree/master/samples/javascript_nodejs/16.proactive-messages).

```javascript
const { ActivityHandler, TurnContext } = require('botbuilder');

class ProactiveBot extends ActivityHandler {
    constructor(conversationReferences) {
        super();

        // Dependency injected dictionary for storing ConversationReference objects used in NotifyController to proactively message users
        this.conversationReferences = conversationReferences;

        this.onConversationUpdate(async (context, next) => {
            this.addConversationReference(context.activity);

            await next();
        });

        this.onMembersAdded(async (context, next) => {
            const membersAdded = context.activity.membersAdded;
            for (let cnt = 0; cnt < membersAdded.length; cnt++) {
                if (membersAdded[cnt].id !== context.activity.recipient.id) {
                    const welcomeMessage = 'Welcome to the Proactive Bot sample.  Navigate to http://localhost:3978/api/notify to proactively message everyone who has previously messaged this bot.';
                    await context.sendActivity(welcomeMessage);
                }
            }

            // By calling next() you ensure that the next BotHandler is run.
            await next();
        });

        this.onMessage(async (context, next) => {
            this.addConversationReference(context.activity);

            // Echo back what the user said
            await context.sendActivity(`You sent '${ context.activity.text }'`);
            await next();
        });
    }

    addConversationReference(activity) {
        const conversationReference = TurnContext.getConversationReference(activity);
        this.conversationReferences[conversationReference.conversation.id] = conversationReference;
    }
}

module.exports.ProactiveBot = ProactiveBot;

```
---
>
> [!div class="nextstepaction"]
> [View additional Teams proactive messaging code samples](/samples/officedev/msteams-samples-proactive-messaging/msteams-samples-proactive-messaging/)