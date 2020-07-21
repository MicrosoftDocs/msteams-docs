---
title: Use Microsoft Graph to enable proactive bot installation and messaging in Teams
description: Describes proactive messaging in Teams and how to implement.
localization_priority:  Normal
author: laujan
ms.author: lajanuar
ms.topic: Overview
keywords: teams proactive messaging chat installation Graph
---
# Enable proactive bot installation and messaging in Teams with Microsoft Graph(Private Preview)

>[!NOTE]
> Microsoft Graph private preview permissions may not achieve general availability status and currently should not be used in production.

## What is proactive messaging in Teams?

A proactive messages are initiated by bots to start conversations with a users. They serve many purposes including sending welcome messages, conducting surveys or polls, and sending organization-wide notifications.  Proactive messages in Teams can be delivered as either **ad-hoc** or **dialog-based** conversations:

|ad-hoc proactive message|dialog-based proactive message|
|-----------------------------|------------------------------------|
|The bot interjects a message without interrupting the conversation flow. | The bot creates a new dialog thread, takes control of a conversation, delivers the proactive message, closes, and returns control to the previous dialog.|

## What is proactive app installation in Teams?

Before your bot can proactively message a user, it needs to be installed either as a personal app, or in a team where the user is a member. At times,  you may need to proactively message users that have _not_ installed or previously interacted with your app. For instance, the need to message vital information to everyone in your organization. For that scenario you can use the Microsoft Graph API to proactively install your bot for your users and cache the necessary values received by your bot at install.

Microsoft Graph [teamsAppInstallationresource type](/graph/api/resources/teamsappinstallation?view=graph-rest-1.0) permissions allow your bot to manage its installation lifecycle for all user (personal ) or team (group) scopes within the Microsoft Teams platform:

|Application permission | Description|
|------------------|---------------------|
|`TeamsAppInstallation.ReadWriteSelfForUser.All`|Allows a Teams app to read, install, upgrade, and uninstall itself to any **user**, without a prior sign in or use.|
|`TeamsAppInstallation.ReadWriteSelfForTeam.All`|Allows a Teams app to read, install, upgrade, and uninstall itself in any **team**, without a prior sign in or use.|

>[!NOTE]
>
> * Your bot must have _application permissions_ not _user delegated permissions_ because the installation is not for yourself but for others.
>
> * An Azure AD tenant administrator must [explicitly grant permissions to an application](/graph/security-authorization#grant-permissions-to-an-application). After an application is granted permissions, _all_ members of the Azure AD tenant will gain the granted permissions.

## Enable proactive app installation and messaging

 > [!IMPORTANT]
> Microsoft Graph will only install apps published in your organization's [app catalog](../../concepts/deploy-and-publish/overview.md#publish-to-your-organizations-app-catalog) or [AppSource](https://appsource.microsoft.com/).

### ✔ Determine whether your bot is currently installed for all intended users

**HTTP GET** request:

```http
GET /users/{user-id}/teamwork/installedApps?$expand=teamsAppDefinition&$filter=teamsAppDefinition/teamsAppId eq '{teamsAppid}'
```

### ✔ Install your app for subsequent users

**HTTP POST** request:

```http
POST /users/{user-id}/teamwork/installedApps
{
   "teamsApp@odata.bind" : "https://graph.microsoft.com/beta/appCatalogs/teamsApps/{teamsAppid}"
}
```

### ✔ Retrieve conversation **chatId**

**HTTP GET** request:

```http
 GET https://graph.microsoft.com/beta/users/{user-id}/teamwork/installedApps/{installation-id}/chat
```

### ✔ Send proactive messages

Once your bot has been added to for a user or team and has acquired the necessary user  information, it can [Send proactive messsages](/azure/bot-service/bot-builder-howto-proactive-message?view=azure-bot-service-4.0&tabs=csharp)
>[!TIP]
> The production-ready [Company Communicator](../..//samples/app-templates.md#company-communicator) app template enables broadcast messaging, is a good foundation for building your proactive bot application.
>>
> [!div class="nextstepaction"]
> [View Teams proactive messaging code samples](/samples/officedev/msteams-samples-proactive-messaging/msteams-samples-proactive-messaging/)