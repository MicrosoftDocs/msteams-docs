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
> Microsoft Graph and Microsoft Teams public previews are available for early-access and feedback. Although this release has undergone extensive testing, it is not intended for use in production.

## Proactive messaging in Teams

Proactive messages are initiated by bots to start conversations with a user. They serve many purposes including sending welcome messages, conducting surveys or polls, and broadcasting organization-wide notifications.  Proactive messages in Teams can be delivered as either **ad-hoc** or **dialog-based** conversations:

|Message Type | Description |
|----------------|-------------- |
|Ad-hoc proactive message| The bot interjects a message without interrupting the conversation flow.|
|Dialog-based proactive message | The bot creates a new dialog thread, takes control of a conversation, delivers the proactive message, closes, and returns control to the previous dialog.|

*See*, [Send proactive notifications to users SDK v4](/azure/bot-service/bot-builder-howto-proactive-message?view=azure-bot-service-4.0&tabs=csharp)

## Proactive app installation in Teams

Before your bot can proactively message a user, it needs to be installed either as a personal app, or in a team where the user is a member. At times,  you may need to proactively message users that have _not_ installed or previously interacted with your app. For instance, the need to message vital information to everyone in your organization. For such scenarios, you can use the Microsoft Graph API to proactively install your bot for your users.

## Permissions

Microsoft Graph [teamsAppInstallation resource type](/graph/api/resources/teamsappinstallation?view=graph-rest-1.0) permissions allow you to manage your app's installation lifecycle for all user (personal) or team (channel) scopes within the Microsoft Teams platform:

|Application permission | Description|
|------------------|---------------------|
|`TeamsAppInstallation.ReadWriteSelfForUser.All`|Allows a Teams app to read, install, upgrade, and uninstall itself for any **user**, without prior sign in or use.|
|`TeamsAppInstallation.ReadWriteSelfForTeam.All`|Allows a Teams app to read, install, upgrade, and uninstall itself in any **team**, without prior sign in or use.|

To use these permissions, you must add a [webApplicationInfo](../../resources/schema/manifest-schema.md#webapplicationinfo) key to your app manifest with the following values:
> [!div class="checklist"]
> [!div class="checklist"]
>
> * **id**  — your Azure AD app id.
> * **resource** — the resource URL for the app.
>

>[!NOTE]
>
> * Your bot requires _application_ not _user delegated_ permissions because the installation is not for yourself but for others.
>
> * An Azure AD tenant administrator must [explicitly grant permissions to an application](/graph/security-authorization#grant-permissions-to-an-application). After an application is granted permissions, _all_ members of the Azure AD tenant will gain the granted permissions.

## Enable proactive app installation and messaging

 > [!IMPORTANT]
>Microsoft Graph will only install apps published within your organization's [app catalog](../../concepts/deploy-and-publish/overview.md#publish-to-your-organizations-app-catalog) or in [AppSource](https://appsource.microsoft.com/).

### ✔ Create and publish your proactive messaging bot for Teams

To get started, you will need a [bot for Teams](../../bots/how-to/create-a-bot-for-teams.md) with [proactive messaging](../../concepts/bots/bot-conversations/bots-conv-proactive.md) capabilities and  [published](../../concepts/deploy-and-publish/overview.md) in your organization's [app catalog](../../concepts/deploy-and-publish/overview.md#publish-to-your-organizations-app-catalog) or in [AppSource](https://appsource.microsoft.com/).

>[!TIP]
> The production-ready [**Company Communicator**](../..//samples/app-templates.md#company-communicator) app template enables broadcast messaging and is a good foundation for building your proactive bot application.

### ✔ Get the `teamsAppId` for your app

**1.** You will need the `teamsAppId`  for the next steps.

The `teamsAppId` can be retrieved from your organization's app catalog:

**Microsoft Graph page reference:** [teamsApp resource type](/graph/api/resources/teamsapp?view=graph-rest-1.0)

**HTTP GET** request:

```http
GET https://graph.microsoft.com/beta/appCatalogs/teamsApps?$filter=externalId eq '{IdFromManifest}'
```

The request will return a `teamsApp`  object. The returned object's `id`  is the app's catalog generated app id and is different from the "id:" that you provided in your Teams app manifest:

```json
{
  "value": [
    {
      "id": "b1c5353a-7aca-41b3-830f-27d5218fe0e5",
      "externalId": "f31b1263-ba99-435a-a679-911d24850d7c",
      "name": "Test App",
      "version": "1.0.1",
      "distributionMethod": "Organization"
    }
  ]
}
```

**2.**  If your app has already been uploaded/sideloaded for a user in the personal scope, you can retrieve the `teamsAppId` as follows:

**Microsoft Graph page reference:** [List apps installed for user](/graph/api/user-list-teamsappinstallation?view=graph-rest-beta&tabs=http)

**HTTP GET** request:

```http
GET https://graph.microsoft.com/beta/users/{user-id}/teamwork/installedApps?$expand=teamsApp&$filter=teamsApp/externalId eq '{IdFromManifest}'
```

**3.** If your app has already been uploaded/sideloaded for a channel in the team scope, you can retrieve the `teamsAppId` as follows:

**Microsoft Graph page reference:** [List apps in team](/graph/api/teamsappinstallation-list?view=graph-rest-beta&tabs=http)

**HTTP GET** request:

```http
GET https://graph.microsoft.com/beta/teams/{team-id}/installedApps?$expand=teamsApp&$filter=teamsApp/externalId eq '{IdFromManifest}'
```

>[!TIP]
> You can filter on any of the fields of the [**teamsApp**](/graph/api/resources/teamsapp?view=graph-rest-1.0) object to narrow the list of results.

### ✔ Determine whether your bot is currently installed for a message recipient

**Microsoft Graph page reference:** [List apps installed for user](/graph/api/user-list-teamsappinstallation?view=graph-rest-beta&tabs=http)

**HTTP GET** request:

```http
GET https://graph.microsoft.com/beta/users/{user-id}/teamwork/installedApps?$expand=teamsApp&$filter=teamsApp/id eq '{teamsAppId}'
```

This request will return an empty array if the app is not installed, or an array with a single [teamsAppInstallation](/graph/api/resources/teamsappinstallation?view=graph-rest-beta) object if it has been installed.

### ✔ Install your app

**Microsoft Graph reference:** [Install app for user](/graph/api/user-add-teamsappinstallation?view=graph-rest-beta&tabs=http)

**HTTP POST** request:

```http
POST https://graph.microsoft.com/beta/users/{user-id}/teamwork/installedApps
{
   "teamsApp@odata.bind" : "https://graph.microsoft.com/beta/appCatalogs/teamsApps/{teamsAppId}"
}
```

If the user has Microsoft Teams running, they may see the app install immediately. Alternatively,  a  restart may be necessary to see the installed app.

### ✔ Retrieve the conversation **chatId**

When your app is installed for the user, the bot will receive a `conversationUpdate` [event notification](../../resources/bot-v3/bots-notifications.md#team-member-or-bot-addition) that will contain the necessary information to send the proactive message.

The `chatId` can also be retrieved as follows:

**Microsoft Graph reference:** [Get chat](/graph/api/chat-get?view=graph-rest-beta&tabs=http)

**1.** You will need your app's `{teamsAppInstallationId}`. If you don't have it, use the following:

**HTTP GET** request:

```http
GET https://graph.microsoft.com/beta/users/{user-id}/teamwork/installedApps?$expand=teamsApp&$filter=teamsApp/id eq '{teamsAppId}'
```

The **id** property of the response is the `teamsAppInstallationId`.

**2.** Make the following request to fetch the `chatId`:

**HTTP GET** request (permission — `TeamsAppInstallation.ReadWriteSelfForUser.All`):  

```http
 GET https://graph.microsoft.com/beta/users/{user-id}/teamwork/installedApps/{teamsAppInstallationId}/chat
```

The **id** property of the response is the `chatId`.

Alternately, you can retrieve the `chatId`  with the request below, but it will require the broader `Chat.Read.All` permission:

**HTTP GET** request (permission — `Chat.Read.All`):

```http
GET https://graph.microsoft.com/beta/users/{user-id}/chats?$filter=installedApps/any(a:a/teamsApp/id eq '{teamsAppId}')
```

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

## Related topic for Teams administrators
>
> [!div class="nextstepaction"]
> [**Manage app setup policies in Microsoft Teams**](/MicrosoftTeams/teams-app-setup-policies#create-a-custom-app-setup-policy)

## View additional code samples
>
> [!div class="nextstepaction"]
> [**Teams proactive messaging code samples**](/samples/officedev/msteams-samples-proactive-messaging/msteams-samples-proactive-messaging/)
>
