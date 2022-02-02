---
title: Test resource-specific consent permissions in Teams
description: Details testing resource-specific consent in Teams using Postman with Code Samples
ms.localizationpriority: medium
author: akjo
ms.author: lajanuar
ms.topic: tutorial
keywords: teams authorization OAuth SSO Azure AD rsc Postman Graph
---

# Test resource-specific consent permissions in Teams

> [!NOTE]
> Resource-specific consent for chat scope is available in [public developer preview](../../resources/dev-preview/developer-preview-intro.md) only.

Resource-specific consent (RSC) is a Microsoft Teams and Graph API integration that enables your app to use API endpoints to manage specific resources—either teams or chats—within an organization. For more information, see [Resource-specific consent (RSC) — Microsoft Teams Graph API](resource-specific-consent.md).

> [!NOTE]
> To test the RSC permissions, your Teams app manifest file must include a **webApplicationInfo** key populated with the following fields:
>
> - **id**: Your Azure AD app ID, see [Register your app in the Azure AD portal](resource-specific-consent.md#register-your-app-with-microsoft-identity-platform-using-the-azure-ad-portal).
> - **resource**: Any string, see the note in  [Update your Teams app manifest](resource-specific-consent.md#update-your-teams-app-manifest).
> - **application permissions**: RSC permissions for  your app, see [Resource-specific Permissions](resource-specific-consent.md#resource-specific-permissions).

## Examples for RSC in team and chat

<br>

<details>

<summary><b>RSC permissions for app manifest version 1.12</b></summary>

Example for RSC in a team

```json
"webApplicationInfo": {
    "id": "XXxxXXXXX-XxXX-xXXX-XXxx-XXXXXXXxxxXX",
    "resource": "https://RscBasedStoreApp"
    },
"authorization": {
    "permissions": {
        "resourceSpecific": [
            {
                "name": "TeamSettings.Read.Group",
                "type": "Application"
            },
            {
                "name": "TeamSettings.ReadWrite.Group",
                "type": "Application"
            },
            {
                "name": "ChannelSettings.Read.Group",
                "type": "Application"
            },
            {
                "name": "ChannelSettings.ReadWrite.Group",
                "type": "Application"
            },
            {
                "name": "Channel.Create.Group",
                "type": "Application"
            },
            {
                "name": "Channel.Delete.Group",
                "type": "Application"
            },
            {
                "name": "ChannelMessage.Read.Group",
                "type": "Application"
            },
            {
                "name": "TeamsAppInstallation.Read.Group",
                "type": "Application"
            },
            {
                "name": "TeamsTab.Read.Group",
                "type": "Application"
            },
            {
                "name": "TeamsTab.Create.Group",
                "type": "Application"
            },
            {
                "name": "TeamsTab.ReadWrite.Group",
                "type": "Application"
            },
            {
                "name": "TeamsTab.Delete.Group",
                "type": "Application"
            },
            {
                "name": "TeamMember.Read.Group",
                "type": "Application"
            },
            {
                "name": "TeamsActivity.Send.Group",
                "type": "Application"
            }
        ]    
    }
}
```

Example for RSC in a chat

```json
"webApplicationInfo": {
    "id": "XXxxXXXXX-XxXX-xXXX-XXxx-XXXXXXXxxxXX",
    "resource": "https://RscBasedStoreApp"
    },
"authorization": {
    "permissions": {
        "resourceSpecific": [
            {
                "name": "ChatSettings.Read.Chat",
                "type": "Application"
            },
            {
                "name": "ChatSettings.ReadWrite.Chat",
                "type": "Application"
            },
            {
                "name": "ChatMessage.Read.Chat",
                "type": "Application"
            },
            {
                "name": "ChatMember.Read.Chat",
                "type": "Application"
            },
            {
                "name": "Chat.Manage.Chat",
                "type": "Application"
            },
            {
                "name": "TeamsTab.Read.Chat",
                "type": "Application"
            },
            {
                "name": "TeamsTab.Create.Chat",
                "type": "Application"
            },
            {
                "name": "TeamsTab.Delete.Chat",
                "type": "Application"
            },
            {
                "name": "TeamsTab.ReadWrite.Chat",
                "type": "Application"
            },
            {
                "name": "TeamsAppInstallation.Read.Chat",
                "type": "Application"
            },
            {
                "name": "OnlineMeeting.ReadBasic.Chat",
                "type": "Application"
            },
            {
                "name": "Calls.AccessMedia.Chat",
                "type": "Application"
            },
            {
                "name": "Calls.JoinGroupCalls.Chat",
                "type": "Application"
            },
            {
                "name": "TeamsActivity.Send.Chat",
                "type": "Application"
            }
        ]    
    }
}
```

<br>

</details>

<br>

<details>

<summary><b>RSC permissions for app manifest version 1.11 or earlier</b></summary>

Example for RSC in a team

```json
"webApplicationInfo": {
    "id": "XXxxXXXXX-XxXX-xXXX-XXxx-XXXXXXXxxxXX",
    "resource": "https://RscBasedStoreApp",
    "applicationPermissions": [
        "TeamSettings.Read.Group",
        "TeamSettings.ReadWrite.Group",
        "ChannelSettings.Read.Group",
        "ChannelSettings.ReadWrite.Group",
        "Channel.Create.Group",
        "Channel.Delete.Group",
        "ChannelMessage.Read.Group",
        "TeamsAppInstallation.Read.Group",
        "TeamsTab.Read.Group",
        "TeamsTab.Create.Group",
        "TeamsTab.ReadWrite.Group",
        "TeamsTab.Delete.Group",
        "TeamMember.Read.Group",
        "TeamsActivity.Send.Group"
    ]
  }
```

Example for RSC in a chat

```json
"webApplicationInfo": {
    "id": "XXxxXXXXX-XxXX-xXXX-XXxx-XXXXXXXxxxXX",
    "resource": "https://RscBasedStoreApp",
    "applicationPermissions": [
        "ChatSettings.Read.Chat",
        "ChatSettings.ReadWrite.Chat",
        "ChatMessage.Read.Chat",
        "ChatMember.Read.Chat",
        "Chat.Manage.Chat",
        "TeamsTab.Read.Chat",
        "TeamsTab.Create.Chat",
        "TeamsTab.Delete.Chat",
        "TeamsTab.ReadWrite.Chat",
        "TeamsAppInstallation.Read.Chat",
        "OnlineMeeting.ReadBasic.Chat",
        "Calls.AccessMedia.Chat",
        "Calls.JoinGroupCalls.Chat",
        "TeamsActivity.Send.Chat"
    ]
  }
```

<br>

</details>

> [!IMPORTANT]
> In your app manifest, only include the RSC permissions that you want your app to have.

>[!NOTE]
>If the app is meant to support installation in both team and chat scopes, then both team and chat permissions can be specified in the same manifest under `applicationPermissions`.

>If the app is meant to access calling/media APIs, then the `webApplicationInfo.Id` should be the Azure AD app Id of an [Azure Bot Service](/graph/cloud-communications-get-started#register-a-bot).

## Test added RSC permissions to a team using the Postman app

To check whether the RSC permissions are being honored by the API request payload, you need to copy the [RSC JSON test code for team](test-team-rsc-json-file.md) into your local environment and update the following values:

* `azureADAppId`: Your app's Azure AD app ID.
* `azureADAppSecret`: Your Azure AD app password.
* `token_scope`: The scope is required to get a token. set the value to https://graph.microsoft.com/.default.
* `teamGroupId`: You can get the team group id from the Teams client as follows:

    1. In the Teams client, select **Teams** from the far left navigation bar.
    2. Select the team where the app is installed from the dropdown menu.
    3. Select the **More options** icon (&#8943;).
    4. Select **Get link to team**. 
    5. Copy and save the **groupId** value from the string.

## Test added RSC permissions to a chat using the Postman app

To check whether the RSC permissions are being honored by the API request payload, you need to copy the [RSC JSON test code for chats](test-chat-rsc-json-file.md) into your local environment and update the following values:

* `azureADAppId`: Your app's Azure AD app ID.
* `azureADAppSecret`: Your Azure AD app password.
* `token_scope`: The scope is required to get a token. set the value to https://graph.microsoft.com/.default.
* `tenantId`: The name or the Azure AD Object ID of your tenant.
* `chatId`: You can get the chat thread id from the Teams *web* client as follows:

    1. In the Teams web client, select **Chat** from the far left navigation bar.
    2. Select the chat where the app is installed from the dropdown menu.
    3. Copy the web URL and save the chat thread id from the string.
![Chat thread id from web URL.](../../assets/images/chat-thread-id.png)

### Use Postman

1. Open the [Postman](https://www.postman.com) app.
2. Select **File** > **Import** > **Import file** to upload the updated JSON file from your environment.  
3. Select the **Collections** tab. 
4. Select the chevron **>** next to the **Test RSC** to expand the details view and see the API requests.

Execute the entire permissions collection for each API call. The permissions that you specified in your app manifest must succeed, while those not specified must fail with an HTTP 403 status code. Check all of the response status codes to confirm that the behavior of the RSC permissions in your app meet expectations.

> [!NOTE]
> To test specific DELETE and READ API calls, add those instance scenarios to the JSON file.

## Test revoked RSC permissions using [Postman](https://www.postman.com/)

1. Uninstall the app from the specific resource.
2. Follow the steps for either chat or team: 
    1. [Test added RSC permissions to a team using Postman](#test-added-rsc-permissions-to-a-team-using-the-postman-app).
    2. [Test added RSC permissions to a chat using Postman](#test-added-rsc-permissions-to-a-chat-using-the-postman-app).
3. Check all the response status codes to confirm that the specific API calls **have failed with an HTTP 403 status code**.

## See also

* [Microsoft Graph API and Teams](/graph/api/resources/teams-api-overview?view=graph-rest-1.0&preserve-view=true)
* [Resource-specific consent](~/graph-api/rsc/resource-specific-consent.md)
