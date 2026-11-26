---
title: Register Calls & Meetings Bot
description: Learn to enable audio and video calling for an existing bot using Developer Portal for Teams and configure Microsoft Graph permissions.
ms.topic: article
ms.localizationpriority: medium
ms.date: 11/26/2026
---
# Register calls and meetings bot for Microsoft Teams

A bot that participates in audio or video calls and online meetings is a regular Microsoft Teams bot with the following extra features used to register the bot:

* The app manifest includes the `supportsCalling` and `supportsVideo` settings in the [bot configuration](/microsoft-365/extensibility/schema/root-bots).
* [Microsoft Graph permissions](./registering-calling-bot.md#add-graph-permissions) must be configured for your bot's Microsoft App ID.
* Microsoft Graph application permissions for calls and online meetings require admin consent.

<a name="new-app-manifest-settings"></a>

## App manifest settings

Calls and online meetings bots use the following settings in the app manifest to enable audio or video for your bot in Teams.

* `bots[0].supportsCalling`. If present and set to `true`, Teams allows your bot to participate in calls and online meetings.
* `bots[0].supportsVideo`. If present and set to `true`, Teams knows that your bot supports video.

<a name="create-new-bot-or-add-calling-capabilities"></a>

## Add calling capabilities to an existing bot

The following steps assume that you already have an Azure bot available in [Developer Portal for Teams](https://dev.teams.microsoft.com/).

1. In Developer Portal, select **Tools** > **Bot management** > **Azure-managed bots**.
1. Select the subscription that contains your bot, then select the bot to open its **Configure** page.
1. Select the Azure portal link under **Update other bot properties in Azure portal**. Azure-managed bot channels are configured in the Azure portal.
1. In your Azure Bot resource, select **Channels** > **Microsoft Teams**. If the Teams channel isn't enabled, follow [Connect a bot to Microsoft Teams](/azure/bot-service/channel-connect-teams).
1. On the Teams channel page, select **Calling** > **Enable calling**.
1. Set **Webhook (for calling)** to the HTTPS endpoint that receives incoming call notifications, such as `https://contoso.com/teamsapp/api/calling`, and save your changes.

For more information about finding and managing an existing Azure bot in Developer Portal, see [Manage Azure bots in Developer Portal for Teams](/microsoftteams/platform/concepts/build-and-test/manage-azure-bots).

The next section provides a list of application permissions supported for calls and online meetings.

## Add Graph permissions

The Graph provides granular permissions to control the access that apps have to resources. You decide which permissions for Graph your app requests. The Graph calling APIs support Resource-specific consent (RSC) permissions and application permissions.

### RSC permissions for calls

For guidance on requesting and obtaining RSC permissions, see [Resource-specific consent for Teams agents and apps](../../graph-api/rsc/resource-specific-consent.md). For calling permissions such as `Calls.AccessMedia.Chat` and `Calls.JoinGroupCalls.Chat`, see [RSC permissions for chats and meetings](../../graph-api/rsc/resource-specific-consent.md#rsc-permissions-for-chats-and-meetings).

### Application permissions for calls

The application permissions for calls are used by apps that run without a signed-in user present. An admin must grant consent to application permissions.

The following table provides a list of application permissions for calls:

|Permission    |Display string   |Description |Admin consent required |
|:-----------------------------|:-----------------------------------------|:-----------------|:-----------------|
| Calls.Initiate.All |Initiate outgoing 1:1 calls from the app preview. |Allows the app to place outbound calls to a single user and transfer calls to users in your organization’s directory, without a signed-in user.|Yes|
| Calls.InitiateGroupCall.All |Initiate outgoing 1:1 and group calls from the app preview. |Allows the app to place outbound calls to a single user, multiple users, transfer calls and add participants to meetings in your organization, without a signed-in user.|Yes|
| Calls.JoinGroupCall.All |Join group calls and meetings as an app preview. |Allows the app to join group calls and scheduled meetings in your organization, without a signed-in user. The app is joined with the privileges of a directory user to meetings in your tenant.|Yes|
| Calls.JoinGroupCallasGuest.All |Join group calls and meetings as a guest preview. |Allows the app to anonymously join group calls and scheduled meetings in your organization, without a signed-in user. The app is joined as a guest to meetings in your tenant.|Yes|
| Calls.AccessMedia.All |Access media streams in a call as an app preview. |Allows the app to get direct access to media streams in a call, without a signed-in user.|Yes|

> [!IMPORTANT]
> You cannot use the Media Access API to record or otherwise persist media content from calls or meetings that your application accesses or derive data from that media content record or recording. You must first call the [`updateRecordingStatus` API](/graph/api/call-updaterecordingstatus) to indicate that recording has begun, and receive a success reply from that API. If your application begins recording any meeting or call, it must end the recording before calling the `updateRecordingStatus` API to indicate that the recording has ended.

### Application permissions for online meetings

The following table provides a list of application permissions for online meetings:

|Permission    |Display string   |Description |Admin consent required |
|:-----------------------------|:-----------------------------------------|:-----------------|:-----------------|
| OnlineMeetings.Read.All |Read online meeting details from the app preview|Allows the app to read online meeting details in your organization, without a signed-in user.|Yes|
| OnlineMeetings.ReadWrite.All |Read and create online meetings from the app preview on behalf of a user|Allows the app to create online meetings in your organization on behalf of a user, without a signed-in user.|Yes|

### Assign permissions

You must configure the application permissions for your bot in advance by using the [Microsoft Azure portal](https://portal.azure.com) if you prefer to use the [Azure Active Directory (Azure AD) v1 endpoint](/azure/active-directory/develop/azure-ad-endpoint-comparison).

### Get admin consent

For apps using the Azure AD v1 endpoint, an admin can consent to the application permissions using the [Microsoft Azure portal](https://portal.azure.com) when your app is installed in their organization. Alternately, you can provide a sign-up experience in your app through which administrators can consent to the permissions you configured. After Microsoft Entra ID records administrator consent, your app can request tokens without having to request consent again.

You can rely on an administrator to grant the permissions your app needs at the [Microsoft Azure portal](https://portal.azure.com). A better option is to provide a sign-up experience for administrators by using the Azure AD v2 `/adminconsent` endpoint. For more information, see [instructions on constructing an Admin consent URL](/graph/auth-v2-service#3-get-administrator-consent).

> [!NOTE]
> To construct the admin consent URL, a configured redirect URI or a reply URL in the [app registration portal](https://apps.dev.microsoft.com/) is required. To add reply URLs for your bot, access your bot registration, choose **Advanced Options** > **Edit Application Manifest**. Add your redirect URL to the `replyUrls` collection.

> [!IMPORTANT]
> Anytime you make a change to your application's permissions, you must also repeat the Admin consent process. Changes made in the app registration portal are not reflected until the consent has been reapplied by the tenant's administrator.

## Code sample

| **Sample name** | **Description** | **.NET** |
|---------------|----------|--------|
| Realtime meeting events |This sample demonstrates how a bot can receive real-time updates for meeting events and participant activities within Microsoft Teams.|[View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/TeamsSDK/bot-meetings/dotnet/bot-meetings)|

## Next step

> [!div class="nextstepaction"]
> [Incoming call notifications](~/bots/calls-and-meetings/call-notifications.md)

## See also

* [Build bots for Teams](../what-are-bots.md)
* [Calls and online meetings bots](calls-meetings-bots-overview.md)
* [Develop calling and online meeting bots on your local PC](~/bots/calls-and-meetings/debugging-local-testing-calling-meeting-bots.md)
* [View app permission and grant admin consent](/microsoftteams/app-permissions-admin-center)
* [Work with the cloud communications API in Microsoft Graph](/graph/api/resources/communications-api-overview)
* [Webhooks and connectors](../../webhooks-and-connectors/what-are-webhooks-and-connectors.md)
