---
title: Use Microsoft Graph to authorize proactive bot installation and messaging in Teams
description: Install app proactively using Graph APIs. Check if your bot is currently installed, retrieve the conversation chatId to send proactive message.
ms.localizationpriority: medium
author: akjo
ms.author: lajanuar
ms.topic: Overview
---

# Send proactive installation messages

## Proactive messaging in Teams

Proactive messages are initiated by bots to start conversations with a user. They serve many purposes including sending welcome messages, conducting surveys or polls, and broadcasting organization-wide notifications. Proactive messages in Teams can be delivered as either **ad-hoc** or **dialog-based** conversations:

|Message type | Description |
|----------------|-------------- |
|Ad-hoc proactive message| The bot interjects a message without interrupting the conversation flow.|
|Dialog-based proactive message | The bot creates a new dialog thread, takes control of a conversation, delivers the proactive message, closes, and returns control to the previous dialog.|

## Proactive app installation in Teams

Before your bot can proactively message a user, it must be installed either as a personal app or in a team where the user is a member. At times, you need to proactively message users that haven't installed or previously interacted with your app. For example, If you need to message important information to everyone in your organization, then you can use the Microsoft Graph API to proactively install your bot for your users.

## Permissions

Microsoft Graph [teamsAppInstallation resource type](/graph/api/resources/teamsappinstallation?view=graph-rest-1.0&preserve-view=true) permissions help you to manage your app's installation lifecycle for all user (personal) or team (channel) scopes within the Microsoft Teams platform:

|Application permission | Description|
|------------------|---------------------|
|`TeamsAppInstallation.ReadWriteSelfForUser.All`|Allows a Teams app to read, install, upgrade, and uninstall itself for any *user*, without prior sign in or use.|
|`TeamsAppInstallation.ReadWriteSelfForTeam.All`|Allows a Teams app to read, install, upgrade, and uninstall itself in any *team*, without prior sign in or use.|

To use these permissions, you must add a [webApplicationInfo](../../resources/schema/manifest-schema.md#webapplicationinfo) key to your app manifest with the following values:

* **id**: Your Azure Active Directory app ID.
* **resource**: The resource URL for the app.

> [!NOTE]
>
> * Your bot requires application and not user delegated permissions because the installation is for others.
>
> * An Azure AD tenant administrator must [explicitly grant permissions to an application](/graph/security-authorization#grant-permissions-to-an-application). After the application is granted permissions, all members of the Azure AD tenant get the granted permissions.

## Enable proactive app installation and messaging

> [!IMPORTANT]
> Microsoft Graph can only install apps published to your organization's app store or the Teams store.

### Create and publish your proactive messaging bot for Teams

To get started, you need a [bot for Teams](../../bots/how-to/create-a-bot-for-teams.md) with [proactive messaging](../../concepts/bots/bot-conversations/bots-conv-proactive.md) capabilities that is in your [organization's app store](../../concepts/deploy-and-publish/apps-publish-overview.md#publish-to-your-org) or the [Teams store](../../concepts/deploy-and-publish/apps-publish-overview.md#publish-your-app-to-the-teams-store).

> [!TIP]
> The production-ready [*Company Communicator*](../..//samples/app-templates.md#company-communicator) app template permits broadcast messaging and is a good start to build your proactive bot application.

### Get the `teamsAppId` for your app

You can retrieve the `teamsAppId` in the following ways:

* From your organization's app catalog:

    **Microsoft Graph page reference:** [teamsApp resource type](/graph/api/resources/teamsapp?view=graph-rest-1.0&preserve-view=true)

    **HTTP GET** request:

    ```http
    GET https://graph.microsoft.com/v1.0/appCatalogs/teamsApps?$filter=externalId eq '{IdFromManifest}'
    ```

    The request must return a `teamsApp` object `id`, which is the app's catalog generated app ID. This is different from the ID that you provided in your Teams app manifest:

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

* If your app has already been uploaded or sideloaded for a user in personal scope:

    **Microsoft Graph page reference:** [List apps installed for user](/graph/api/userteamwork-list-installedapps?view=graph-rest-v1.0&tabs=http&preserve-view=true)

    **HTTP GET** request:

    ```http
    GET https://graph.microsoft.com/v1.0/users/{user-id}/teamwork/installedApps?$expand=teamsApp&$filter=teamsApp/externalId eq '{IdFromManifest}'
    ```

* If your app has already been uploaded or sideloaded for a channel in team scope:

    **Microsoft Graph page reference:** [List apps in team](/graph/api/team-list-installedapps?view=graph-rest-v1.0&tabs=http&preserve-view=true)

    **HTTP GET** request:

    ```http
    GET https://graph.microsoft.com/v1.0/teams/{team-id}/installedApps?$expand=teamsApp&$filter=teamsApp/externalId eq '{IdFromManifest}'
    ```

    > [!TIP]
    > To narrow the list of results, you can filter any of the fields of the [**teamsApp**](/graph/api/resources/teamsapp?view=graph-rest-1.0&preserve-view=true) object.

### Determine whether your bot is currently installed for a message recipient

You can determine whether your bot is currently installed for a message recipient as follows:

**Microsoft Graph page reference:** [List apps installed for user](/graph/api/userteamwork-list-installedapps?view=graph-rest-v1.0&tabs=http&preserve-view=true)

**HTTP GET** request:

```http
GET https://graph.microsoft.com/v1.0/users/{user-id}/teamwork/installedApps?$expand=teamsApp&$filter=teamsApp/id eq '{teamsAppId}'
```

The request returns:

* An empty array if the app isn't installed.
* An array with a single [teamsAppInstallation](/graph/api/resources/teamsappinstallation?view=graph-rest-v1.0&preserve-view=true) object if the app is installed.

### Install your app

You can install your app as follows:

**Microsoft Graph page reference:** [Install app for user](/graph/api/userteamwork-post-installedapps?view=graph-rest-v1.0&tabs=http&preserve-view=true)

**HTTP POST** request:

```http
POST https://graph.microsoft.com/v1.0/users/{user-id}/teamwork/installedApps
Content-Type: application/json

{
   "teamsApp@odata.bind" : "https://graph.microsoft.com/v1.0/appCatalogs/teamsApps/{teamsAppId}"
}
```

If the user has Microsoft Teams running, app installation occurs immediately. A restart may be required to view the installed app.

### Retrieve the conversation `chatId`

When your app is installed for the user, the bot receives a `conversationUpdate` [event notification](../../resources/bot-v3/bots-notifications.md#team-member-or-bot-addition) that contains the necessary information to send the proactive message.

**Microsoft Graph page reference:** [Get chat](/graph/api/chat-get?view=graph-rest-v1.0&tabs=http&preserve-view=true)

1. You must have your app's `{teamsAppInstallationId}`. If you don't have it, use the following:

    **HTTP GET** request:

    ```http
    GET https://graph.microsoft.com/v1.0/users/{user-id}/teamwork/installedApps?$expand=teamsApp&$filter=teamsApp/id eq '{teamsAppId}'
    ```

    The **id** property of the response is the `teamsAppInstallationId`.

1. Make the following request to fetch the `chatId`:

    **HTTP GET** request (permission—`TeamsAppInstallation.ReadWriteSelfForUser.All`):  

    ```http
    GET https://graph.microsoft.com/v1.0/users/{user-id}/teamwork/installedApps/{teamsAppInstallationId}/chat
    ```

    The **id** property of the response is the `chatId`.

    You can also retrieve the `chatId` with the following request but it requires the broader `Chat.Read.All` permission:

    **HTTP GET** request (permission—`Chat.Read.All`):

    ```http
    GET https://graph.microsoft.com/v1.0/users/{user-id}/chats?$filter=installedApps/any(a:a/teamsApp/id eq '{teamsAppId}')
    ```

### Send proactive messages

Your bot can [send proactive messages](/azure/bot-service/bot-builder-howto-proactive-message?view=azure-bot-service-4.0&tabs=csharp&preserve-view=true) after the bot has been added for a user or a team, and has received all the user information.

## Code snippets

The following code provides an example of sending proactive messages:

# [C#](#tab/dotnet)

* [SDK reference](/dotnet/api/microsoft.bot.builder.cloudadapterbase.continueconversationasync?view=botbuilder-dotnet-stable#microsoft-bot-builder-cloudadapterbase-continueconversationasync(system-string-microsoft-bot-schema-activity-microsoft-bot-builder-botcallbackhandler-system-threading-cancellationtoken)&preserve-view=true)

* [Sample code reference](https://github.com/OfficeDev/Microsoft-Teams-Samples/blob/main/samples/graph-meeting-notification/csharp/MeetingNotification/Controllers/NotificationController.cs#L112)

```csharp
public async Task<int> SendNotificationToAllUsersAsync(ITurnContext<IMessageActivity> turnContext, CancellationToken cancellationToken)
{
   int msgSentCount = 0;

   // Send notification to all the members.
   foreach (var conversationReference in _conversationReferences.Values)
   {
       await turnContext.Adapter.ContinueConversationAsync(_configuration["MicrosoftAppId"], conversationReference, BotCallback, cancellationToken);
       msgSentCount++;
   }

   return msgSentCount;
}

private async Task BotCallback(ITurnContext turnContext, CancellationToken cancellationToken)
{
    // Sends an activity to the sender of the incoming activity.
   await turnContext.SendActivityAsync("Proactive hello.");
}
```

# [Node.js](#tab/nodejs)

* [SDK reference](/javascript/api/botbuilder/cloudadapter?view=botbuilder-ts-latest#botbuilder-cloudadapter-continueconversationasync&preserve-view=true)
* [Sample code reference](https://github.com/OfficeDev/Microsoft-Teams-Samples/blob/main/samples/bot-initiate-thread-in-channel/nodejs/bots/teamsStartNewThreadInChannel.js#L20)

```javascript
server.get('/api/notify', async (req, res) => {
    for (const conversationReference of Object.values(conversationReferences)) {

        // Sends a proactive message to a conversation.
        await adapter.continueConversationAsync(process.env.MicrosoftAppId, conversationReference, async context => {
            await context.sendActivity('proactive hello');
        });
    }
    res.setHeader('Content-Type', 'text/html');
    res.writeHead(200);
    res.write('<html><body><h1>Proactive messages have been sent.</h1></body></html>');
    res.end();
});
```

---

## Code sample

| **Sample Name** | **Description** | **.NET** | **Node.js** |
|---------------|--------------|--------|-------------|
| Proactive installation of app and sending proactive notifications | This sample shows how you can use proactive installation of app for users and send proactive notifications by calling Microsoft Graph APIs. | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/graph-proactive-installation/csharp) | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/graph-proactive-installation/nodejs) |

## Additional code samples
>
> [!div class="nextstepaction"]
> [**Teams proactive messaging code samples**](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/bot-proactive-messaging/csharp)

## See also

* [Manage app setup policies in Microsoft Teams](/microsoftteams/teams-app-setup-policies#create-a-custom-app-setup-policy)
* [Send proactive notifications to users SDK v4](/azure/bot-service/bot-builder-howto-proactive-message?view=azure-bot-service-4.0&tabs=csharp&preserve-view=true)
* [Send activity feed notifications to users in Microsoft Teams](/graph/teams-send-activityfeednotifications)
* [Add app to team - Microsoft Graph v1.0](/graph/api/team-post-installedapps?view=graph-rest-1.0&tabs=http&preserve-view=true)
* [Microsoft Teams service limits](/graph/throttling-limits#microsoft-teams-service-limits)
* [Protected APIs in Microsoft Teams](/graph/teams-protected-apis)
