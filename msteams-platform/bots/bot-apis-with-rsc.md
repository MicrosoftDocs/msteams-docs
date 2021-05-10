---
title: Bots APIs with RSC permissions
author: surbhigupta12
description: Aligning Bot APIs with RSC permissions.
ms.topic: conceptual
localization_priority: Normal
---

# Bot APIs with RSC permissions

Currently, without this feature, a bot is only able to receive a message when it is @ mentioned by a user. This feature enables developers to remove that requirement using RSC permissions so that bots can receive all channel messages in a team when consented to and installed.

You can build bots for Microsoft Teams using the Bot Framework that includes request or response payloads that conform to the Bot Framework schema. Tenant admins and team owners can use bots in their environments that is bots only receive messages in channels when they are @ mentioned. Tenant admins can use App Policy to centrally enable or disable all or specific bots.

Existing bot apps include polling apps like Polly and SurveyMonkey, LOB apps like Obi used by several teams inside Microsoft to manage collaboration for outages.

Upon being added to a team, every bot in Teams has the same default minimal permission set and using Bot APIs, there is no mechanism to allow a bot to ask for additional permissions to:
* Retrieve owners of a team.
* Receive read-receipts for messages posted by them.
* Create new group-chats.

This presents a problem in enhancing the functionality of Bot Framework based bots in Teams to address the needs of developers to build compelling experiences in Teams.

Prior to the Resource Specific Consent (RSC) feature, admins can only grant all-or-nothing permission to apps in groups. RSC support for Graph was recently rolled out for teams and channels to all users. This document presents a vision for aligning the permissions of bots in Teams with RSC to allow Azure Active Directory (AAD) to be the central place to control permissions of apps.

## Current bot permissions

Here are some of the functionalities that are blocked on granting additional permissions to bots:

* Read receipts
* Getting tags in a team
* Receive new messages without being mentioned
* List teams, group-chats, meetings, and 1:1s where bot is added
* Create group-chats
* Add, edit, or remove reactions on messages
* Mention channels
* Meeting events

Each bot in Teams when added to a context that is 1:1, group-chat, or team, is limited by the same set of permissions in that context as shown in the following image:

![App permissions](~/assets/images/bots/apppermissions.png)

The consent screen is shown to the users when they are trying to add a bot into a team. It is not a simple task to allow a bot to do an operation that is not already covered in the list of permissions.

Until now, upon being consented, the corresponding bot is added to the participant roster of the underlying chat service thread backing the 1:1, group-chat, or channel and is limited to the list of permissions for that thread.

## Constraints for bot permissions

A solution that satisfies a set of constraints that matter for Teams Platform and Microsoft is provided. The following constraints restrict bot permissions:

* Simplicity for users: Easy to understand user mental-model. Users can easily bring bots into a context to allow them to take actions, and easily take away the ability for bots to participate in that context by removing them. Developers and users expect bots to respond instantly to messages.

* Simplicity for developers: Bot Framework value proposition is to provide a common dialect for building bots that can work with multiple chat platforms. Common dialect means common events, REST APIs and shape of JSON requests or responses. Bots work in multiple conversational contexts, 1:1s, group-chats, meetings, and channels and a consistent bot programming model is required.

* Coherence for tenant admins: AAD is where you control what apps can do. One place for tenant administrators to control permissions of apps is required.

* Engineering efficiency: Use entitlements to decide whether a bot is allowed to post into a context or not, instead of the roster.

## Solution for bot permissions

Bot Framework is the common communication language for bot developers to target multiple chat platforms. Microsoft Graph is the gateway to data and intelligence, our solution provides the following:

* Bot Framework APIs as conversational dialect
* Graph APIs as conversational context

Here is a high-level overview of the solution in the proposed permission model.

* Bot capabilities controlled via AAD RSC permissions.
* Skype messaging bot API (SMBA) is the Bot Framework dialect layer.
* Heavy-lifting for APIs done in Graph Teams Graph Service (TGS).
* SMBA only wraps common Bot Framework concepts that exist in Graph.  

### Preferred proposed solution for bot initiated operations

The following diagram illustrates the interactions between various systems to guard Bot Framework API functionality with AAD RSC permissions:

![Bot initiated operations](~/assets/images/bots/botinitiatedoperations.png)

The proposed solution for bot initiated operations is as follows:

* DoSomething is the placeholder for an API that is part of common Bot Framework dialect.
* Most bots today are written using Bot Framework SDK. So, the initial interaction starts off with bot calling a helper function in Bot SDK, which wraps the call to the backend API.
* Bot SDK retrieves a token from AAD for botframework.com tenant. For more information, see [authentication with the Bot Connector API](/azure/bot-service/rest-api/bot-framework-rest-connector-authentication?view=azure-bot-service-4.0).
* Bot can use the Bot Framework SDK helpers to invoke functionalities.
* Bot Framework SDK authenticates the bot using the mechanism documented here.
* Bot Framework SDK makes the actual HTTP call to SMBA corresponding to the SDK helper invoked.
* SMBA acts as the gateway inside the M365 trust boundary and enforces the RSC permissions granted to the app before fulfilling the request made by the bot.
    * SMBA using its first party AAD App ID to:
        * Fetch the entitlements for the context in which the request is made to determine the installed apps. This can be achieved using the groups/{teamId}/installedApps for teams and chats/{chatid}/installedApps for chats in Graph.
        * Fetch the RSC permission-grants in the context for which the request is made. This can be achieved using the groups/{teamId}/permissionGrants for teams and chats/{chatId}/permissionGrants for chats in Graph.
    * SMBA maps the requested operation to the corresponding RSC permission and ensures that the app corresponding to the bot is granted the necessary permission.
    * If the bot has the necessary RSC permission, RSC fulfills the requested operation otherwise sends an HTTP error to indicate permission denied.

#### Bot requirements to use RSC permissions

The following are the bot requirements to use RSC permissions:

* Get a Graph AppId: If you don't already have a Graph app, see [Register an application with the Microsoft identity platform](https://docs.microsoft.com/graph/auth-register-app-v2). To create, edit, or manage your [Graph app registrations](https://ms.portal.azure.com/#blade/Microsoft_AAD_RegisteredApps/ApplicationsListBlade). If your app supports single sign-on (SSO), use the same App ID for Graph or RSC as you use for SSO.

* Remove unnecessary permissions: Azure App registration portal cannot be used to request RSC permissions. On your app registration page, go to the **API permissions** section, and delete any excess permissions. If the only Graph calls you make are with RSC, delete all the permissions on that page. If your Graph app makes non-RSC calls as well as RSC calls, keep the non-RSC permissions you require.

* Update your Teams app manifest to link to your Graph AppId: Add a `webApplicationInfo` section to the manifest. There are two properties, `id` is the graph app ID, and `applicationPermissions` are the RSC permissions your app requires. If your graph app needs permissions that are not RSC permissions, you can continue to use them as always but they do not go in the manifest. The following code shows an example of changes to `webApplicationInfo`:

    ```json
    {  
      "$schema": ".../MicrosoftTeams.schema.json",
       "webApplicationInfo": {  
          "id": "db5c3ee6-4180-4b81-b080-a3ce61e16b66",  
          "applicationPermissions": [
              "Channel.Delete.Group",  
              "ChannelMessage.Read.Group",  
              "TeamsApp.Read.Group"  
          ]  
      },
    }
    ```

* Get a token: Before making a REST call to Graph, you must get a token for application permissions. This is the same as getting an application permission token for non-RSC use as shown in the following code:  

    ```json
    string response = await HttpHelpers.POST(
        $"https://login.microsoftonline.com/{tenant}/oauth2/v2.0/token",  
        $"grant_type=client_credentials&client_id={appId}&client_secret={appSecret}"  
        + "&scope=https%3A%2F%2Fgraph.microsoft.com%2F.default");  
    string token = response.Deserialize<TokenResponse>().access_token;  
    ```

   For more information, see [Get access without a user](https://docs.microsoft.com/graph/auth-v2-service).

* Include the token in calls to SMBA: Bot Framework SDK must provide helper functions to manage the Graph auth aspect.

### Alternate solution for bot-initiated operations

The following diagram illustrates the interactions between various systems to guard Bot Framework API functionality with AAD RSC permissions:

![Alternate bot initiated operations](~/assets/images/bots/alternatebotinitiatedoperations.png)

The alternate solution for bot initiated operations is as follows:

Here Do something is the placeholder for an API that is part of common Bot Framework dialect.

1. Most bots today are written using Bot Framework SDK. So, the initial interaction starts off with Bot calling a helper function in Bot SDK, which wraps the call to the backend API. There are some high-profile partners who interact with Bot REST APIs directly, including Power Virtual Assistants and Power Automate internally, and ScrumGenius and Oracle externally. Any bot written in Python or Java calls the REST APIs directly.

1. Bot SDK today retrieves a token from AAD for botframework.com tenant. For more information, see [authentication with the Bot Connector API](/azure/bot-service/rest-api/bot-framework-rest-connector-authentication?view=azure-bot-service-4.0).

1. Going forward, bot retrieves a token for its Graph App ID specified in the Teams app manifest for RSC and attaches it in requests to Bot API backend.

1. After obtaining a token, Bot Framework SDK makes the REST API call to Bot API backend SMBA, to do the actual operation attaching the AAD tokens. These tokens are never persisted in SMBA and only used to do authentication checks.

1. SMBA continues to do the tenant-settings and policy check as usual. This allows a tenant-admin to fully deactivate or activate a bot for a set of users in the tenant.

1. SMBA invokes an API on TGS to check the RSC consent record to ensure that the bot is allowed to do the operation it is requesting. This API is provided by TGS and also involves checking for entitlements.

1. Depending on whether the required API operation is available in Graph and is usable in app-context, SMBA either makes a call to Graph to execute the operation forwarding the AAD Graph token for bot, or implements the API itself.

1. SMBA finally transforms the response into Bot Framework dialect and transmits it back to the bot.

The solution provided in this section puts the additional burden on the bot to generate an AAD token using the App ID specified in `webApplicationInfo` of the app corresponding to that bot. It requires changes in the Bot Framework SDK to send the normal bot token for traditional Bot APIs, and additionally sends the secondary AAD token for RSC APIs, and requires SMBA to tune its communication with subsequent services to send the app token across. This complexity does not seem justifiable given that SMBA is inside the M365 trust-boundary and is still tasked with enforcing permissions and access controls. Therefore, the [first solution](#preferred-proposed-solution-for-bot-initiated-operations) is the preferred solution.

### Solution for system to bot eventing scenarios

Existing bot notifications is an elegant approach, but we must acknowledge RSC permissions for bot events to give control to AAD and deliver coherence for tenant admins.

The following diagram illustrates the approach to govern Bot Framework events using RSC permissions:

![Bot Framework with RSC permissions](~/assets/images/bots/botframeworkrsc.png)

The solution for system to bot eventing scenarios is as follows:

* PubSub is the component in chat service that is responsible for fanning out events to various subscribers. SMBA is a PubSub listener. SMBA today transmits events from PubSub after transforming to Bot Framework dialect. Bot is part of the roster of the thread for 1:1, group-chat, or channel where the event was raised.

* The event from PubSub contains the ID of the thread in which the event was raised, and the list of bots that receive the event based on the roster of the thread for which the event was raised.

* SMBA invokes TGS to retrieve the set of entitlements and RSC permissions for the thread for which the event was raised by PubSub.

* SMBA maintains a mapping of event-types to permissions. It maps the event-type to corresponding permission and uses this to filter the set of entitlements that are eligible to receive the event.

* SMBA finally transmits the event in Bot Framework dialect to set of bots that are eligible to receive it.

## Event volume

A new section is added to the Teams app manifest, `eventFilters` to allow a bot to express the filters for the events it is interested in.

```json
{
  "bots": [
    {
      "botId": "%MICROSOFT-APP-ID-REGISTERED-WITH-BOT-FRAMEWORK%",
      "scopes": [
        "team",
        "personal",
        "groupchat"
      ],
      "eventFilters": [
        {
          "eventType": "participantUpdate",
          "filter": "*"
        }
      ]
    }
  ]
}
```

Since this filter is a part of the app definition, it can be retrieved during the event fan out flow in SMBA when we must retrieve entitlements in the context where the event is being raised.

The following diagram illustrates the approach to retrieve `eventFilter` during the event fan out flow in SMBA:

![eventFilter](~/assets/images/bots/eventfilter.png)

The properties of `eventFilter` are as follows:

| Property | Description |
| -------- | ----------- |
| eventType | Bot Framework event type for which the filter is desired. |
| filter | Filtering expression to be applied. The only supported value is * in the first release. |

## Eventing scenarios

RSC provides a way for team owners to consent to a more granular set of permission for apps in Teams. Application developers can specify specific permissions apps require in the application manifest.

```json

```

Users review and consent to permissions during the app installation process as shown in the following image:

![Permissions](~/assets/images/permissions.png)

In its current state, RSC only applies on Graph calls for team resources using the application permissions context. The goal of this work is to extend and apply the RSC permissions model to bots that are included with apps.

Supporting RSC for bots includes eventing scenarios to bots that is events bots receive triggered from some user action in Teams.

### Bot events RSC integration

Eventing scenarios consist of any notification sent to a bot triggered by a user action in teams.  

To start converging the permission model, integrate RSC for a scenario that can be supported with an existing permission where bot receives all channel messages in team. This includes the capability to remove bot at mention.

RSC Permission is `ChannelMessage.Read.Group`.

![Event flow with RSC](~/assets/images/eventflowrsc.png)

The event flow with RSC is as follows:

* User sends channel message in a team with bot installed.

* Chat service persists the message and sends a message event to PubSub.

* PubSub fans out event to subscribers. SMBA receives the event which includes the conversation roster and properties. Roster is filtered for any bots installed.  

* Using its first party app permissions, SMBA retrieves a list of app entitlements for conversation by calling `/installedApps` Teams API. First party app requires `TeamsAppInstallation.ReadForTeam.All` permissions.

```json

```

* Graph returns list of app entitlements for team.

* SMBA makes second call to Graph to retrieve list of granted RSC permissions and associated apps using `/permissionGrants` Group API. First party app requires `Group.Read.All` for team.

```json

```

* Graph returns list of granted permissions with app IDs.

* For each bot in roster, SMBA validates whether the associated app has been granted necessary RSC permission and checks tenant settings and app policies.

* Sends message activity to bot if all validation passes.

Graph APIs include the following:

* Get installed apps APIs: /teams/{teamId}/installedApps

* Get consented grants APIs: /groups/{teamId}/permissionGrants
