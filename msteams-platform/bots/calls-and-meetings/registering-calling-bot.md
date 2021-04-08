---
title: Register a calls and meetings bot for Microsoft Teams
description: Learn how to register a new audio/video calling bot for Microsoft Teams
keywords: calling bot audio/video audio video media
---
# Register a calls and meetings bot for Microsoft Teams

A bot that participates in audio or video calls and online meetings is a regular Microsoft Teams bot with few extra features used to register the bot:

* There is a new version of the Teams app manifest with two additional settings, `supportsCalling` and `supportsVideo`. These settings are included in the [developer preview](../../resources/dev-preview/developer-preview-intro.md) version of the Teams app manifest.
* [Microsoft Graph permissions](./registering-calling-bot.md#add-graph-permissions) must be configured for your bot's Microsoft App ID.
* The Graph calls and online meetings APIs permissions require tenant admin consent.

## New manifest settings

Calls and online meetings bots have the following two additional settings in the manifest.json that enable audio or video for your bot in Teams.

* `bots[0].supportsCalling`. If present and set to `true`, Teams allows your bot to participate in calls and online meetings.
* `bots[0].supportsVideo`. If present and set to `true`, Teams knows that your bot supports video.

If you want your IDE to properly validate the manifest.json schema for your calls and meetings bot for these values, you can change the `$schema` attribute as follows:

```json
"$schema": "https://raw.githubusercontent.com/OfficeDev/microsoft-teams-app-schema/preview/DevPreview/MicrosoftTeams.schema.json",
```

The next section enables you to create a new bot or add calling capabilities to your existing bot.

## Create new bot or add calling capabilities

For information on creating bots, see [create a bot for Teams](../how-to/create-a-bot-for-teams.md).

**To create a new bot for Teams**

1. Use this link to create a new bot, `https://dev.botframework.com/bots/new`. Alternately, if you select the **Create a bot** button in the Bot Framework portal, you create your bot in Microsoft Azure, for which you must have an Azure account.
1. Add the Teams channel.
1. Select the **Calling** tab on the Teams channel page. Select **Enable calling**, and then update **Webhook (for calling)** with your HTTPS URL where you receive incoming notifications, for example `https://contoso.com/teamsapp/api/calling`. For more information, see [configuring channels](/bot-framework/portal-configure-channels).

    ![Configure Teams channel information](~/assets/images/calls-and-meetings/configure-msteams-channel.png)

The next section provides a list of application permissions supported for calls and online meetings.

## Add Graph permissions

The Graph provides granular permissions to control the access that apps have to resources. You decide which permissions for Graph your app requests. The Graph calling APIs support application permissions, which are used by apps that run without a signed-in user present. A tenant administrator must grant consent to application permissions.

### Application permissions for calls

The following table provides a list of application permissions for calls:

|Permission    |Display string   |Description |Admin consent required |
|:-----------------------------|:-----------------------------------------|:-----------------|:-----------------|
| Calls.Initiate.All |Initiate outgoing 1:1 calls from the app preview|Allows the app to place outbound calls to a single user and transfer calls to users in your organization’s directory, without a signed-in user.|Yes|
| Calls.InitiateGroupCall.All |Initiate outgoing group calls from the app preview|Allows the app to place outbound calls to multiple users and add participants to meetings in your organization, without a signed-in user.|Yes|
| Calls.JoinGroupCall.All |Join group calls and meetings as an app preview|Allows the app to join group calls and scheduled meetings in your organization, without a signed-in user. The app is joined with the privileges of a directory user to meetings in your tenant.|Yes|
| Calls.JoinGroupCallasGuest.All |Join group calls and meetings as a guest preview|Allows the app to anonymously join group calls and scheduled meetings in your organization, without a signed-in user. The app is joined as a guest to meetings in your tenant.|Yes|
| Calls.AccessMedia.All |Access media streams in a call as an app preview |Allows the app to get direct access to media streams in a call, without a signed-in user.|Yes|

> [!IMPORTANT]
> You cannot use the Media Access API to record or otherwise persist media content from calls or meetings that your application accesses or derive data from that media content record or recording. You must first call the [`updateRecordingStatus` API](/graph/api/call-updaterecordingstatus) to indicate that recording has begun, and receive a success reply from that API. If your application begins recording any meeting or call, it must end the recording before calling the `updateRecordingStatus` API to indicate that the recording has ended.

### Application permissions for online meetings

The following table provides a list of application permissions for online meetings:

|Permission    |Display string   |Description |Admin consent required |
|:-----------------------------|:-----------------------------------------|:-----------------|:-----------------|
| OnlineMeetings.Read.All |Read online meeting details from the app preview|Allows the app to read online meeting details in your organization, without a signed-in user.|Yes|
| OnlineMeetings.ReadWrite.All |Read and create online meetings from the app preview on behalf of a user|Allows the app to create online meetings in your organization on behalf of a user, without a signed-in user.|Yes|

### Assign permissions

You must configure the application permissions for your bot in advance by using the [Azure portal](https://aka.ms/aadapplist) if you prefer to use the [Azure Active Directory (AAD) V1 endpoint](/azure/active-directory/develop/azure-ad-endpoint-comparison).

### Get tenant administrator consent

For apps using the AAD V1 endpoint, a tenant administrator can consent to the application permissions using the [Azure portal](https://portal.azure.com) when your app is installed in their organization. Alternately, you can provide a sign-up experience in your app through which administrators can consent to the permissions you configured. Once administrator consent is recorded by AAD, your app can request tokens without having to request consent again.

You can rely on an administrator to grant the permissions your app needs at the [Azure portal](https://portal.azure.com). A better option is to provide a sign-up experience for administrators by using the AAD V2 `/adminconsent` endpoint. For more information, see [instructions on constructing an Admin consent URL](https://developer.microsoft.com/graph/docs/concepts/auth_v2_service#3-get-administrator-consent).

> [!NOTE]
> To construct the tenant Admin consent URL, a configured redirect URI or reply URL in the [app registration portal](https://apps.dev.microsoft.com/) is required. To add reply URLs for your bot, access your bot registration, choose **Advanced Options** -> **Edit Application Manifest**. Add your redirect URL to the `replyUrls` collection.

> [!IMPORTANT]
> Anytime you make a change to your application's permissions, you must also repeat the Admin consent process. Changes made in the app registration portal are not reflected until the consent has been reapplied by the tenant's administrator.

## Next step

> [!div class="nextstepaction"]
> [Incoming call notifications](~/bots/calls-and-meetings/call-notifications.md)
