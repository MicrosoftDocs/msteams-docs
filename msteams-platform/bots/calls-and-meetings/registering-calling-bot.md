---
title: Registering a calling and meeting bot for Microsoft Teams
description: Learn how to register a new audio/video calling bot for Microsoft Teams
keywords: calling bot audio/video audio video media
---
# Register a calling bot for Microsoft Teams

A bot that participates in audio/video calls and online meetings is an ordinary Microsoft Teams bot with a few extra features:

* There's a new version of the Teams app manifest with two additional settings, `supportsCalling` and `supportsVideo`. These settings are included in the [Developer Preview](../../resources/dev-preview/developer-preview-intro.md) version of the Microsoft Teams app manifest.
* [Microsoft Graph permissions](./registering-calling-bot.md#add-microsoft-graph-permissions) must be configured for your bot's Microsoft App ID.
* The Microsoft Graph calls and online meetings APIs permissions require tenant admin consent.

Let's discuss the above in more detail.

## New manifest settings

Calling and online meetings bots have two additional settings in the manifest.json that enable audio/video for your bot in Teams.

* `bots[0].supportsCalling`. If present and set to `true`, Teams will allow your bot to participate in calls and online meetings.
* `bots[0].supportsVideo`. If present and set to `true`, Teams knows that your bot supports video.

If you want your IDE to properly validate the manifest.json schema for your calling and meeting bot for these values, you can change the `$schema` attribute as follows:

```json
"$schema": "https://raw.githubusercontent.com/OfficeDev/microsoft-teams-app-schema/preview/DevPreview/MicrosoftTeams.schema.json",
```

## Creating a new bot or adding calling capabilities to an existing bot

Creating a new bot is covered in more detail in the [Create a bot for Microsoft Teams](../how-to/create-a-bot-for-teams.md) topic, but we'll repeat some of it here:

1. Use this link to create a new bot: `https://dev.botframework.com/bots/new`. If, instead,  you select the *Create a bot* button in the Bot Framework portal, you will create your bot in Microsoft Azure, for which you'll need an Azure account.
1. Add the Microsoft Teams channel. Click on the "Calling" tab on the Microsoft Teams channel page and select **Enable calling**, and then update **Webhook (for calling)** with your HTTPS URL where you will receive incoming notifications, e.g.`https://contoso.com/teamsapp/api/calling`. Refer to [Configuring Channels](/bot-framework/portal-configure-channels) for more information on how to configure channels.
  ![Configure Microsoft Teams channel information](~/assets/images/calls-and-meetings/configure-msteams-channel.png)

## Add Microsoft Graph permissions

Microsoft Graph exposes granular permissions controlling the access that apps have to resources. As a developer, you decide which permissions for Microsoft Graph your app requests.  The Microsoft Graph Calling APIs support _Application permissions_, which are used by apps that run without a signed-in user present.  A tenant administrator must grant consent to application permissions. Below is a list of those permissions:

### Application permissions: calls

|Permission    |Display String   |Description |Admin Consent Required |
|:-----------------------------|:-----------------------------------------|:-----------------|:-----------------|
|_Calls.Initiate.All_|Initiate outgoing 1:1 calls from the app (preview)|Allows the app to place outbound calls to a single user and transfer calls to users in your organization’s directory, without a signed-in user.|Yes|
|_Calls.InitiateGroupCall.All_|Initiate outgoing group calls from the app (preview)|Allows the app to place outbound calls to multiple users and add participants to meetings in your organization, without a signed-in user.|Yes|
|_Calls.JoinGroupCall.All_|Join Group Calls and Meetings as an app (preview)|Allows the app to join group calls and scheduled meetings in your organization, without a signed-in user. The app will be joined with the privileges of a directory user to meetings in your tenant.|Yes|
|_Calls.JoinGroupCallasGuest.All_|Join Group Calls and Meetings as a guest (preview)|Allows the app to anonymously join group calls and scheduled meetings in your organization, without a signed-in user. The app will be joined as a guest to meetings in your tenant.|Yes|
|_Calls.AccessMedia.All_ <sup>_see below_</sup>|Access media streams in a call as an app (preview)|Allows the app to get direct access to media streams in a call, without a signed-in user.|Yes|

> [!IMPORTANT]
> You **cannot** use the Microsoft.Graph.Calls.Media API to record or otherwise persist media content from calls or meetings that your bot accesses.

### Application permissions: online meetings

|Permission    |Display String   |Description |Admin Consent Required |
|:-----------------------------|:-----------------------------------------|:-----------------|:-----------------|
|_OnlineMeetings.Read.All_|Read Online Meeting details from the app (preview)|Allows the app to read Online Meeting details in your organization, without a signed-in user.|Yes|
|_OnlineMeetings.ReadWrite.All_|Read and Create Online Meetings from the app (preview) on behalf of a user|Allows the app to create Online Meetings in your organization on behalf of a user, without a signed-in user.|Yes|

### Assigning permissions

You must configure the application permissions for your bot in advance by using the [Azure portal](https://aka.ms/aadapplist) if you prefer to use the [Azure AD V1 endpoint](/azure/active-directory/develop/azure-ad-endpoint-comparison).

### Getting tenant administrator consent

For apps using the Azure AD V1 endpoint, a tenant administrator can consent to the application permissions using the [Azure portal](https://portal.azure.com) when your app is installed in their organization, or you can provide a sign-up experience in your app through which administrators can consent to the permissions you configured. Once administrator consent is recorded by Azure AD, your app can request tokens without having to request consent again.

You can rely on an administrator to grant the permissions your app needs at the [Azure portal](https://portal.azure.com); though, often a better option is to provide a sign-up experience for administrators by using the Azure AD V2 `/adminconsent` endpoint.  Please refer to the [instructions on constructing an Admin Consent URL](https://developer.microsoft.com/graph/docs/concepts/auth_v2_service#3-get-administrator-consent) for more information.

> [!NOTE]
> Constructing the Tenant Admin Consent URL requires a configured Redirect URI/Reply URL in the [App Registration Portal](https://apps.dev.microsoft.com/). To add reply URLs for your bot, access your bot registration, choose Advanced Options -> Edit Application Manifest.  Add your Redirect URL to the `replyUrls` collection.

> [!IMPORTANT]
> Anytime you make a change to your application's permissions, you must also repeat the Admin Consent process. Changes made in the app registration portal will not be reflected until consent has been reapplied by the tenant's administrator.
