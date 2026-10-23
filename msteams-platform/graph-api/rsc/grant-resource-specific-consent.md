---
title: Declare RSC permission requirements for an agent or app
description: Learn how to declare resource-specific consent (RSC) permissions in Developer Portal or an app manifest and verify the grants for your agent or app.
ms.localizationpriority: medium
ms.author: vikasalmal
ms.topic: reference
ms.owner: vishachadha
ms.date: 10/23/2026
---

# Declare RSC permission requirements for an agent or app

Declare the resource-specific consent (RSC) permissions that your agent or app needs to access a specific team, chat, meeting, or user resource. For a definition of RSC, supported permissions, and who can consent, see [Resource-specific consent for your Teams app](resource-specific-consent.md).

You declare permission requirements in the app manifest. Declaring a permission doesn't grant access: an authorized user grants consent when they install the app in the target resource, subject to your organization's consent policies. The installation dialog shows the permissions requested by the app. In this article, you learn to:

1. [Declare RSC permissions in Developer Portal](#declare-rsc-permissions-in-developer-portal).
1. [Declare RSC permissions directly in the app manifest](#declare-rsc-permissions-in-the-app-manifest).
1. [Verify the RSC permissions granted to your app](#verify-the-rsc-permissions-granted-to-your-app).

## Prerequisites

This article assumes that you already have an agent or app set up through the [Teams agent quickstart](../../agents-in-teams/quickstart-create-agent-teams-sdk.md) or a similar process. Before you declare permissions:

* Identify the [RSC permissions](resource-specific-consent.md#supported-rsc-permissions) and resource scopes required by your app. Request only the permissions that its features need.
* Have the existing application (client) ID available for the app's `webApplicationInfo.id` property.
* Ensure your organization's policies allow the required consent. Work with your administrator if consent is blocked. For related admin guidance, see [Grant and manage consent to Teams app permissions](/microsoftteams/manage-consent-app-permissions#view-resource-specific-consent-permissions-of-an-app).

For custom app testing, ensure your organization allows custom app uploads and use an app configured for the organization where you install it. For packaging and installation prerequisites, see [Upload your app in Teams](../../concepts/deploy-and-publish/apps-upload.md).

<a name="add-rsc-permissions-to-your-teams-app"></a>

## Declare RSC permissions in Developer Portal

Use [Developer Portal for Teams](https://dev.teams.microsoft.com) to edit your app's permission requirements.

1. In Developer Portal, select **Apps** and open your existing app. If you maintain the app package outside Developer Portal, import the package first.
1. Under **Configure**, select **Basic information** and verify that **Application (client) ID** matches the existing application ID for your app.
1. Under **Configure**, select **Permissions**.
1. Select the required RSC permissions under **Team Permissions**, **Chat/Meeting permissions**, or **User Permissions**, depending on the resource your app accesses.
1. Save your changes.
1. Review the updated `manifest.json` in **Configure** > **App package editor**. Confirm that the permission names and types match your requirements before using the updated package.

For more information, see [Manage your apps in Developer Portal](../../concepts/build-and-test/manage-your-apps-in-developer-portal.md#configure).

> [!IMPORTANT]
> Use app manifest v1.12 or later for delegated RSC permissions. The `authorization.permissions.resourceSpecific` array supports a maximum of 16 permissions.

<a name="update-your-app-manifest"></a>
<a name="request-rsc-permissions-for-teams-app"></a>

## Declare RSC permissions in the app manifest

As an alternative to Developer Portal, edit your app's existing `manifest.json` file. Use the format for your app manifest version. The examples below show manifest properties to merge into your existing manifest, not complete app packages.

### App manifest v1.12 or later

To declare RSC permissions in the app manifest:

1. Add the [webApplicationInfo](/microsoft-365/extensibility/schema/root-web-application-info) key to your app manifest with the following values:

    |Name|Type|Description|
    |---|---|---|
    |`id`|String|The existing application (client) ID for your agent or app.|
    |`resource`|String|Optional authentication resource value. It doesn't grant RSC access. Preserve the configured value if your app uses single sign-on (SSO).|

1. Add permissions needed by your app.

    |Name|Type|Description|
    |---|---|---|
    |`authorization`|Object|List of permissions that the app needs to function. For more information, see [authorization in app manifest](/microsoft-365/extensibility/schema/root-authorization).|

    List each permission name and its `Application` or `Delegated` type in `authorization.permissions.resourceSpecific`. If an app supports installation in both team and chat scopes, you can declare both team and chat permissions in the same array. Include only the permissions that your app needs; the [RSC overview](resource-specific-consent.md#supported-rsc-permissions) lists the supported permissions.

Example for RSC permissions in a team:

```json
{
    "webApplicationInfo": {
        "id": "00000000-0000-0000-0000-000000000000",
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
                    "name": "ChannelMeetingStage.Write.Group",
                    "type": "Delegated"
                }
            ]
        }
    }
}
```

* `webApplicationInfo.id` identifies the app that receives consent. Replace the all-zero placeholder with your existing application (client) ID in each example.
* `name` identifies the requested resource-specific access. Use `TeamSettings.Read.Group` to read settings in the installed team, or `ChannelMeetingStage.Write.Group` to show content on its channel meeting stage.
* `type` selects the permission's supported access mode. Use `Application` for the team settings permission and `Delegated` for the meeting stage permission.

Example for RSC permissions in a chat:

```json
{
    "webApplicationInfo": {
        "id": "00000000-0000-0000-0000-000000000000",
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
                    "name": "MeetingStage.Write.Chat",
                    "type": "Delegated"
                }
            ]
        }
    }
}
```

* `name` identifies access within the installed chat. Use `ChatSettings.Read.Chat` to read chat settings, or `MeetingStage.Write.Chat` to show content on the associated meeting stage.
* `type` matches the permission's supported access mode. Set it to `Application` for chat settings or `Delegated` for the meeting stage.

Example for RSC permissions for a user:

```json
{
    "webApplicationInfo": {
        "id": "00000000-0000-0000-0000-000000000000",
        "resource": "https://RscBasedStoreApp"
    },
    "authorization": {
        "permissions": {
            "resourceSpecific": [
                {
                    "name": "InAppPurchase.Allow.User",
                    "type": "Delegated"
                },
                {
                    "name": "TeamsActivity.Send.User",
                    "type": "Application"
                }
            ]
        }
    }
}
```

* `name` identifies access in the user's personal scope. Use `InAppPurchase.Allow.User` for in-app purchases, or `TeamsActivity.Send.User` for activity feed notifications.
* `type` matches how each permission is used. Set it to `Delegated` for purchases or `Application` for notifications.

### App manifest v1.11 or earlier

> [!NOTE]
> It's recommended to use app manifest v1.12 or later.

Add the [webApplicationInfo](/microsoft-365/extensibility/schema/root-web-application-info) key to your app manifest with the following values:

|Name|Type|Description|
|---|---|---|
|`id`|String|The existing application (client) ID for your agent or app.|
|`resource`|String|Optional authentication resource value. It doesn't grant RSC access. Preserve the configured value if your app uses SSO.|
|`applicationPermissions`|Array of strings|RSC permissions for  your app. For more information, see [Supported RSC permissions](resource-specific-consent.md#supported-rsc-permissions).|

If an app is meant to support installation in both team and chat scopes, then both team and chat permissions can be specified in the same app manifest under `applicationPermissions`.

Example for RSC permissions in a team:

```json
{
    "webApplicationInfo": {
        "id": "00000000-0000-0000-0000-000000000000",
        "resource": "https://RscBasedStoreApp",
        "applicationPermissions": [
            "TeamSettings.Read.Group"
        ]
    }
}
```

* `applicationPermissions` lists the legacy application permission names. Set it to `["TeamSettings.Read.Group"]` if your app only needs to read team settings.

Example for RSC permissions in a chat:

```json
{
    "webApplicationInfo": {
        "id": "00000000-0000-0000-0000-000000000000",
        "resource": "https://RscBasedStoreApp",
        "applicationPermissions": [
            "ChatSettings.Read.Chat"
        ]
    }
}
```

* `applicationPermissions` lists application access for the chat. Set it to `["ChatSettings.Read.Chat"]` if your app only needs to read chat settings.

Example for RSC permissions for a user:

```json
{
    "webApplicationInfo": {
        "id": "00000000-0000-0000-0000-000000000000",
        "resource": "https://RscBasedStoreApp",
        "applicationPermissions": [
            "TeamsActivity.Send.User"
        ]
    }
}
```

* `applicationPermissions` lists application access for the user's scope. Set it to `["TeamsActivity.Send.User"]` to request activity feed notifications.

<a name="verify-app-rsc-permission-granted-to-your-app"></a>

## Verify the RSC permissions granted to your app

Before you verify grants, install your app in the team, chat, or personal scope you want to test. For custom app installation, see [Upload your app in Teams](../../concepts/deploy-and-publish/apps-upload.md). Have an authorized user consent to the requested permissions.

> [!IMPORTANT]
>
> Custom apps must come from the same organization where they are installed, and the app registration referenced by `webApplicationInfo.id` must belong to that organization. If these requirements aren't met, Teams displays:
>
> "Custom apps must come from the same organization that they are being installed in, and the webApplicationInfo.id must be registered in the same organization."
>
> The corresponding error identifier is `WebApplicationInfoIdOfSideloadedAppMustBeInTheSameTenantAsUser`. Check that you're using the intended organization in Teams and that `webApplicationInfo.id` references an app registration in that organization. For the custom app upload procedure, see [Upload your app in Teams](../../concepts/deploy-and-publish/apps-upload.md).

Verify grants after the first installation, after changing permission requirements and completing the applicable [app update and consent flow](/microsoftteams/apps-update-experience), or when troubleshooting an access-denied response. This check distinguishes permissions declared in the manifest from permissions actually granted on a specific resource.

For example, if your app requests `TeamSettings.Read.Group` and is installed in team A, inspect the grants for team A. Find your app's application ID and confirm that its grants include that permission. A grant in team A doesn't grant the same access to team B.

The following steps inspect **application RSC permissions** through Microsoft Graph. Delegated RSC permissions are used through Teams client APIs in the context of a signed-in user; the application-grant checks below don't verify that delegated behavior.

1. [Authorize the verification request](#authorize-the-verification-request).
1. [Check the RSC permissions granted to a specific resource](#check-the-rsc-permissions-granted-to-a-specific-resource).

<a name="obtain-an-access-token-from-the-microsoft-identity-platform"></a>

### Authorize the verification request

You can use [Microsoft Graph Explorer](https://developer.microsoft.com/graph/graph-explorer) to inspect grants interactively. Sign in with a work or school account in the organization where the app is installed. Review the **Permissions** section in the API reference for the resource you're inspecting and authorize the required delegated permission for Graph Explorer.

| Resource | API reference | Least-privileged delegated permission for inspection |
| --- | --- | --- |
| Team | [List permissionGrants of a team](/graph/api/team-list-permissiongrants?view=graph-rest-1.0&preserve-view=true) | `TeamsAppInstallation.ReadForTeam` |
| Chat | [List permissionGrants of a chat](/graph/api/chat-list-permissiongrants?view=graph-rest-1.0&preserve-view=true) | `TeamsAppInstallation.ReadForChat` |
| User | [List permissionGrants of a user](/graph/api/user-list-permissiongrants?view=graph-rest-1.0&preserve-view=true) | `ResourceSpecificPermissionGrant.ReadForUser` |

These permissions authorize the **inspection tool** to read grants. They aren't the permissions being verified for your app. An authorization error on an inspection request doesn't, by itself, mean your app's RSC grant is missing.

If you send requests from your own tool instead, obtain a Microsoft Graph access token using the appropriate [delegated authentication flow](/graph/auth-v2-user) or [application authentication flow](/graph/auth-v2-service), with the permissions required by that inspection API. You don't need to implement token acquisition in your app just to use Graph Explorer.

### Check the RSC permissions granted to a specific resource

Use the procedure for your resource below. The `permissionGrants` endpoints return grants, not a list of installed apps. To investigate installation separately, use [List apps in team](/graph/api/team-list-installedapps), [List apps in chat](/graph/api/chat-list-installedapps), or [List apps for user](/graph/api/userteamwork-list-installedapps).

> [!IMPORTANT]
> Application RSC permissions authorize the app, not a signed-in user. The app can be allowed to perform actions that the user can't, such as deleting a tab. Review the resource owner's intent before making application RSC API calls. This is separate from the delegated authorization you might use in Graph Explorer to inspect grants. For more information, see [Microsoft Teams API overview](/graph/teams-concept-overview).

In a successful `200 OK` response:

* Find entries whose `clientAppId` matches `webApplicationInfo.id` in your app manifest. Don't confuse it with the top-level app manifest `id`.
* Compare each entry's `permission` with the application permission names declared for that resource scope.
* Check that `permissionType` is `Application` for the application grants you're verifying.

If an expected grant is absent, check the resource ID, the installed app package and its application ID, and whether consent to the updated permissions completed. Work with your administrator if organizational policy prevents consent. Inspecting grants confirms recorded access; it doesn't prove that your app's API calls work. Follow up with [Test resource-specific consent permissions in Teams](test-resource-specific-consent.md).

#### Check your app for added RSC permissions in a team

1. In Teams, find the team where you've installed the app.
1. Select **More options** (**...**) for that team.
1. Select **Get link to team** from the dropdown list.
1. Copy the **groupId** value from the link and use it as `{team-id}` in the following request.
1. In Graph Explorer, send the request:

    ```http
    GET https://graph.microsoft.com/v1.0/teams/{team-id}/permissionGrants
    ```

    Match `clientAppId` to your app's `webApplicationInfo.id` and compare the returned permissions with the application permissions requested for the team.

For request permissions and response details, see [List permissionGrants of a team](/graph/api/team-list-permissiongrants?view=graph-rest-1.0&preserve-view=true).

#### Check your app for added RSC permissions in a chat

1. Get the ID of the chat where you've installed the app. You can use [List chats](/graph/api/chat-list) to find a chat and its `id`; review that API's permissions before calling it.
1. Replace `{chat-id}` with the chat ID and send the following request in Graph Explorer:

    ```http
    GET https://graph.microsoft.com/v1.0/chats/{chat-id}/permissionGrants
    ```

    Match `clientAppId` to your app's `webApplicationInfo.id` and compare the returned permissions with the application permissions requested for the chat.

For request permissions and response details, see [List permissionGrants of a chat](/graph/api/chat-list-permissiongrants?view=graph-rest-1.0&preserve-view=true).

#### Check your app for added RSC permissions for a user

1. Use [Get user](/graph/api/user-get) to find the ID of the user whose personal scope contains the installed app. Review that API's permissions before calling it.
1. Replace `{user-id}` with the user ID and send the following request in Graph Explorer:

    ```http
    GET https://graph.microsoft.com/v1.0/users/{user-id}/permissionGrants
    ```

    Match `clientAppId` to your app's `webApplicationInfo.id` and compare the returned permissions with the application permissions requested for the user.

For request permissions and response details, see [List permissionGrants of a user](/graph/api/user-list-permissiongrants?view=graph-rest-1.0&preserve-view=true).

## Code sample

| **Sample name** | **Description** | **.NET** |**Node.js** | **App manifest**|
|-----------------|-----------------|----------------|----------------|----------------|
| Resource-Specific Consent (RSC) | This sample application demonstrates how to request Resource Specific Consent (RSC) permissions, use them to call Microsoft Graph, and enumerate permission grants through a Teams tab. | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/TeamsJS/graph-rsc/csharp)|[View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/TeamsJS/graph-rsc/nodeJs)|[View](https://github.com/OfficeDev/Microsoft-Teams-Samples/blob/main/samples/TeamsJS/graph-rsc/csharp/M365Agent/appPackage/manifest.json)|
| Configure RSC permissions |  This sample demonstrates how to configure Resource Specific Consent (RSC) permissions in a Teams app manifest and use them to call Microsoft Graph, allowing you to observe real API responses in both team channels and group chats. | NA |[View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/TeamsJS/graph-rsc-helper/nodeJs)|NA|

## See also

* [Test resource-specific consent permissions in Teams](test-resource-specific-consent.md)
* [Resource-specific consent for your Teams app](resource-specific-consent.md)
* [Manage your apps in Developer Portal](../../concepts/build-and-test/manage-your-apps-in-developer-portal.md)
* [Grant and manage consent to Teams app permissions](/microsoftteams/manage-consent-app-permissions)
* [List permissionGrants of a user](/graph/api/user-list-permissiongrants?view=graph-rest-1.0&preserve-view=true)
* [Send notification to a user](/graph/api/userteamwork-sendactivitynotification?view=graph-rest-beta&tabs=http&preserve-view=true)
