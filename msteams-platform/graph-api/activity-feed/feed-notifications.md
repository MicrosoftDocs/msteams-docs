---
title: Activity Feed notifications in Teams
description: Describes activity feed notifications in Teams and how to use to the best advantage
localization_priority:  Normal
author: laujan
ms.author: lajanuar
ms.topic: Overview
keywords: teams notifications feed activity Graph
---
# Microsoft Teams activity feed notifications  — Developer Preview

>[!NOTE]
>Microsoft Teams Graph API activity feed notifications are currently available in desktop and Android clients after Developer Preview has been enabled. See [How do I enable Developer Preview](../../resources/dev-preview/developer-preview-intro.md) for more information.

The activity feed is an essential feature of the Microsoft Teams experience. It is the central place to notify team members of relevant activities and events within a team or chat.  The Activity feed API is a Microsoft Teams and Microsoft Graph integration that enables your app to use API endpoints to send activity feed notifications to  Teams users. Activity feed notifications can range from identifying tasks requiring a user's attention, to actions taken by others that affect the user or a set of users.

## Activity feed senders and recipients

There are two core concepts for sending notifications:

- **User context**: These notifications are sent on behalf of the user by the application based on a user-initiated activity.

- **Application context**: These notifications are sent directly by the application to users.

Currently, there is one type of notification recipient:

- **User**: An individual Teams user.

> [!NOTE]
> The Teams Activity Feed notification context is on a per user basis. Although an event may impact an entire team or members of a chat, activity feed notifications, triggered by that event, are sent to individual recipients (users).

## Activity feed actions

|Notification type| URI binding parameter| Description |
|------------------|-----------------|----------------|-------------|
|sendActivityNotification| Azure Active Directory **userId**| POST a notification to the activity feed of a user. |
||Sample request| **POST** ht<span>tps://graph.microsoft.com/beta/users/{userId}/teamwork/sendActivityNotification |
|sendActivityNotification| **chatId** | POST a notification to the activity feed of one or more users in a chat. |
||Sample request| **POST** ht<span>tps://graph.microsoft.com/beta/chats/{chatId}/sendActivityNotification
|sendActivityNotification| **teamId** | POST a notification to the activity feed of one or more users in a team|
||Sample request| **POST** ht<span>tps://graph.microsoft.com/beta/teams/{teamId}/sendActivityNotification

## Enabling activity feed notifications

The steps for enabling activity feed notifications in your application are as follows:

1. [Register your app with Microsoft identity platform via the Azure AD portal](../rsc/resource-specific-consent.md#register-your-app-with-microsoft-identity-platform-via-the-azure-ad-portal).
1. [Obtain an access token from the Microsoft Identity platform](#obtain-an-access-token-from-the-microsoft-identity-platform).
1. [Update your Teams app manifest](#update-your-teams-app-manifest).
1. [Install your app directly in Teams](#install-your-app-directly-in-teams).

## Register your app with Microsoft identity platform via the Azure AD portal

The Azure Active Directory portal provides a central platform for you to register and configure your apps. Your app must be registered in the Azure AD portal to integrate with the Microsoft identity platform and call Graph APIs. *See* [Register an application with the Microsoft identity platform](/graph/auth-register-app-v2).

>[!WARNING]
>Do not register multiple Teams apps to the same Azure AD app id. The app id must be unique for each app. Attempts to install multiple apps to the same app id will fail.

## Obtain an access token from the Microsoft identity platform

To make Graph API calls, you must obtain an access token for your app from the identity platform. Before your app can get a token from the Microsoft identity platform, it must be [registered in the Azure AD portal](#register-your-app-with-microsoft-identity-platform-via-the-azure-ad-portal). The access token contains information about your app and the permissions it has for the resources and APIs available through Microsoft Graph.

You'll need to have the following values from the Azure AD registration process to retrieve an access token from the identity platform:

- The **Application ID** assigned by the app registration portal. If your app supports single sign-on (SSO) you should use the same Application ID for your app and SSO.
- The  **Client secret/password** or a public/private key pair (**Certificate**). This is not required for native apps.
- A **Redirect URI** (or reply URL) for your app to receive responses from Azure AD.

 *See* [Get access on behalf of a user](/graph/auth-v2-user?view=graph-rest-1.0#3-get-a-token) and [Get access without a user](/graph/auth-v2-service).

## Update your Teams app manifest

> [!div class="checklist"]
> [!div class="checklist"]
> - Add a [webApplicationInfo](../../resources/schema/manifest-schema.md#webapplicationinfo) key to your app manifest with the following values:  
&emsp;&emsp; &#8226; **id**  — your Azure AD app id.  
&emsp;&emsp; &#8226;  **resource** — the resource url for the app.
>
> [!div class="checklist"]
> [!div class="checklist"]
>
> - Add an **activities** key to your app manifest with an `activityType array`  value. Each activity type object will have the following properties:  
&emsp;&emsp; &#8226; **type**  
&emsp;&emsp; &#8226;  **description**  
&emsp;&emsp; &#8226;  **templateText**

```json
"webApplicationInfo": {
    "id": "73ee2834-38aa-4077-b4c9-e8e1c36f7e40",
    "resource": "https://AkjStoreApp"
  },
  "activities": {
    "activityTypes": [
      {
        "type": "taskCreated",
        "description": "Task Created Activity",
        "templateText": "{actor} created task {taskId} for you"
      },
      {
        "type": "teamMention",
        "description": "Team Mention Activity",
        "templateText": "{actor} mentioned random team"
      },
      {
        "type": "channelMention",
        "description": "Channel Mention Activity",
        "templateText": "{actor} mentioned random channel"
      },
      {
        "type": "userMention",
        "description": "Personal Mention Activity",
        "templateText": "{actor} mentioned you dude"
      },
      {
        "type": "calendarForward",
        "description": "Forwarding a calendar event",
        "templateText": "{actor} sent you an invite on behalf of {eventOwner}"
      },
      {
        "type": "creatorTaskCreated",
        "description": "Created Task Created",
        "templateText": "The Creator created task {taskId} for you"
      }
    ]
  },
```

## Activity feed notification payload properties

| Property | Type | Required | Description |
|-----|------|------|-----|
|**topic**|teamworkActivityTopic | Yes | Represents what is being referenced in the feed item. **The topic must be a either a graph resource or a custom text.**|
|**activityType** | string | Yes| Represents the type of activity and must be declared in the [Teams App Manifest](../../resources/schema/manifest-schema.md)|
|**recipient** | teamworkNotificationRecipient |Yes |URI dependent.  |  This property should not be included when using the  `users/userID/teamwork/sendActivityNotification` endpoint. In all other cases, recipient is the intended receiver and must be a Teams user with the ability to post notifications to everyone in a team, channel, and chat. |
| **chainId** | long | No| Enables the developer to override a previous notification. If not included, a new notifcation will be posted.|
| **previewText** | itemBody | No | Preview text displayed to the user as part an activity feed item. |
| **templateParameters** | collection\<keyvaluepair\>| No |Parameter values declared in the [Teams App Manifest](../../resources/schema/manifest-schema.md) |

> [!div class="nextstepaction"] 
> [Test activity feed notifications in Teams](test-activity-feed-notifications.md)
</br>
