---
title: Proactively Install Your Bot for Users Using Microsoft Graph
description: Use Microsoft Graph APIs to install your Teams bot for users who haven't installed or interacted with your app, and check installation status.
ms.localizationpriority: medium
author: nickwalk
ms.topic: how-to
ms.author: nickwalk
ms.owner: vishachadha
ms.date: 06/19/2026
---

# Proactively install your bot for users using Microsoft Graph

If you need to send messages to users who haven't installed or previously interacted with your app—for example, to broadcast important information to everyone in your organization—you can use the Microsoft Graph API to proactively install your bot for those users. Before your bot can proactively message a user, it must be installed either as a personal app or in a team where the user is a member.

This article covers how to use Microsoft Graph to check installation status and install your bot programmatically. After installation, see [Send a personal welcome message](send-personal-welcome-message.md) to learn how to retrieve the conversation ID and send a 1:1 message to the user.

## Permissions

Microsoft Graph [teamsAppInstallation resource type](/graph/api/resources/teamsappinstallation?view=graph-rest-1.0&preserve-view=true) permissions help you to manage your app's installation lifecycle for all user (personal) or team (channel) scopes within the Microsoft Teams platform:

|Application permission | Description|
|------------------|---------------------|
|`TeamsAppInstallation.ReadWriteSelfForUser.All`|Allows a Teams app to read, install, upgrade, and uninstall itself for any *user*, without prior sign in or use.|
|`TeamsAppInstallation.ReadWriteSelfForTeam.All`|Allows a Teams app to read, install, upgrade, and uninstall itself in any *team*, without prior sign in or use.|

To use these permissions, you must add a [webApplicationInfo](/microsoft-365/extensibility/schema/root-web-application-info) key to your app manifest (previously called Teams app manifest) with the following values:

* **id**: Your Microsoft Entra app ID.
* **resource**: The resource URL for the app.

> [!NOTE]
>
> * Your bot requires application and not user delegated permissions because the installation is for others.
>
> * A Microsoft Entra admin must [explicitly grant permissions to an application](/graph/security-authorization#grant-permissions-to-an-application). After the application is granted permissions, all members of the Microsoft Entra tenant get the granted permissions.

## Enable proactive app installation and messaging

> [!IMPORTANT]
> Microsoft Graph can only install apps published to your organization's app store or the Microsoft Teams Store.

### Create and publish your proactive messaging bot for Teams

To get started, you need a [bot for Teams](../../bots/how-to/create-a-bot-for-teams.md) with [proactive messaging](../../concepts/bots/bot-conversations/bots-conv-proactive.md) capabilities that is in your [organization's app store](../../concepts/deploy-and-publish/apps-publish-overview.md#publish-to-your-organization) or the [Teams Store](../../concepts/deploy-and-publish/apps-publish-overview.md#publish-your-agent-or-app-to-the-teams-store).

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

    The request must return a `teamsApp` object `id`, which is the app's catalog generated app ID. This is different from the ID that you provided in your app manifest:

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

    > [!NOTE]
    > When the app is in the Teams Store, the `teamsAppId` is same as `IdFromManifest` and the `externalId` must not be used in this case.

* If your app has already been uploaded for a user in personal scope:

    **Microsoft Graph page reference:** [List apps installed for user](/graph/api/userteamwork-list-installedapps?view=graph-rest-v1.0&tabs=http&preserve-view=true)

    **HTTP GET** request:

    ```http
    GET https://graph.microsoft.com/v1.0/users/{user-id}/teamwork/installedApps?$expand=teamsApp&$filter=teamsApp/externalId eq '{IdFromManifest}'
    ```

* If your app has already been uploaded for a channel in team scope:

    **Microsoft Graph page reference:** [List apps in team](/graph/api/team-list-installedapps?view=graph-rest-v1.0&tabs=http&preserve-view=true)

    **HTTP GET** request:

    ```http
    GET https://graph.microsoft.com/v1.0/teams/{team-id}/installedApps?$expand=teamsApp&$filter=teamsApp/externalId eq '{IdFromManifest}'
    ```

    > [!TIP]
    > To narrow the list of results, you can filter any of the fields of the [**teamsApp**](/graph/api/resources/teamsapp?view=graph-rest-1.0&preserve-view=true) object.

### Determine whether your bot is installed for a message recipient

You can determine whether your bot is installed for a message recipient as follows:

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

For next steps, see [Send a personal welcome message](send-personal-welcome-message.md) to learn how to retrieve the conversation ID and send a 1:1 message to the user.

## Code sample

| **Sample Name** | **Description** | **.NET** | **Node.js** |
|---------------|--------------|--------|-------------|
| Proactive installation of app and sending proactive notifications | This sample application demonstrates proactive installation of a Teams app and sending notifications to users using Microsoft Graph APIs. | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/TeamsSDK/Archived/graph-proactive-installation/csharp) | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/TeamsSDK/Archived/graph-proactive-installation/nodejs) |

## Additional code samples
>
> [!div class="nextstepaction"]
> [**Teams proactive messaging code samples**](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/TeamsSDK/Archived/bot-proactive-messaging/csharp)

## See also

* [Manage app setup policies in Microsoft Teams](/microsoftteams/teams-app-setup-policies#create-a-custom-app-setup-policy)
* [Proactive messaging with Teams SDK](/microsoftteams/platform/teams-sdk/essentials/sending-messages/proactive-messaging)
* [Send activity feed notifications to users in Microsoft Teams](/graph/teams-send-activityfeednotifications)
* [Add app to team - Microsoft Graph v1.0](/graph/api/team-post-installedapps?view=graph-rest-1.0&tabs=http&preserve-view=true)
* [Microsoft Teams service limits](/graph/throttling-limits#microsoft-teams-service-limits)
