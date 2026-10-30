---
title: Graph APIs to Fetch Meeting Insights
description: Learn how to use the Meeting AI Insights API to fetch Teams meeting insights including conversation summaries, action items, and mentions.
ms.localizationpriority: high
ms.topic: article
ms.owner: vtarasov
ms.author: nickwalk
ms.date: 10/29/2026
---

# Get AI-generated meeting summaries with Meeting AI Insights API

<!-- markdownlint-disable MD024 -->

> [!IMPORTANT]
>
> * Meeting AI Insights API is part of the Microsoft 365 Copilot API namespace. You can only fetch insights on behalf of a Microsoft 365 Copilot licensed user. For more information, see [license requirements for Meeting Insights API](#license-requirements-for-teams-meeting-ai-insights-apis).

The Meeting AI Insights API enables you to programmatically access structured AI-generated insights from transcribed Microsoft Teams meetings. These insights include:

* Comprehensive conversation summaries
* Action items extracted from the discussion
* Utterances where participants are directly mentioned

The API empowers you to deliver intelligent meeting experiences, such as surfacing key takeaways or generating follow-ups, without the need to build or maintain your own AI infrastructure. Insights are generated after the meeting concludes and are accessible through Microsoft Graph API endpoints.

> [!NOTE]
>
> Meeting AI Insights API provides insights for private scheduled meetings, town halls, webinars, and Meet Now sessions. AI Insights API doesn't yet support channel meetings.

## Use cases

Here are some use cases for fetching AI-generated insights using Meeting AI Insights API:

| Use case | Scenario | Integration | Impact |
|---|---|---|---|
| Autogenerate meeting summaries for CRM updates | A sales team conducts regular customer meetings over Teams. After each call, they need to log meeting summaries and follow-ups in their CRM. | You can have a backend service [subscribe to change notifications for AI insights](#get-notified-when-meeting-ai-insights-are-available) and use Microsoft Graph APIs to fetch post-meeting insights as soon as they're available. The service extracts summaries and action items, and maps them to specific fields in the company's CRM records. Optionally, the integration can include a Teams message card confirming the update. | - Saves time for sales representatives by eliminating manual entry.<br>- Ensures consistent capture of key details across all customer interactions. |
| Capture post-meeting knowledge in a project management app | Product and engineering teams hold regular meetings to make design and feature decisions. Team members often forget to document what was discussed and agreed upon. | You can use a bot or a background job to query the Graph API for concluded meetings owned by product leads. The API fetches insights and uses natural language processing (NLP) to classify them, such as decisions, tasks, or risk items. These classifications are converted into tasks or notes in Azure DevOps, Jira, or Notion and assigned to the correct stakeholders using Graph user identities. | - Prevents information loss.<br>- Automatically bridges the gap between conversation and task tracking.<br>- Promotes alignment and accountability. |
| Generate executive briefings for strategic meetings | Executives participate in multiple high-level meetings across functions such as finance, operations, or board reviews. They need quick, reliable summaries to stay up-to-date and take action. | You can create a digital assistant to call the Graph API after the designated executive meetings conclude to retrieve insights, prioritize key decisions and blockers, and format them into a concise daily briefing card. This card is posted to the executive's Teams chat or sent as a morning email summary. The integration can optionally highlight recurring themes using keyword clustering across meetings. | - Improves executive focus and decision velocity.<br>- Reduces reliance on manual note-taking and follow-ups. Enables faster cross-functional awareness. |

## Prerequisites

* You must [turn on the transcription or recording](https://support.microsoft.com/en-us/office/view-live-transcription-in-microsoft-teams-meetings-dc1a8f23-2e20-4684-885e-2152e06a4a8b) for the meeting to generate insights. Alternatively, you can set a meeting to autotranscribe or autorecord programmatically using the [update onlineMeeting API](/graph/api/onlinemeeting-update?view=graph-rest-1.0&preserve-view=true&tabs=http) or directly through the [meeting options](/microsoftteams/manage-meeting-recording-options#record-and-transcribe-automatically).

## License requirements for Teams meeting AI insights APIs

This section describes the license requirements for Teams meeting AI insights APIs. To access these APIs, users must have a [Microsoft 365 Copilot](https://www.microsoft.com/en-us/microsoft-365-copilot) license. Payment models or evaluation mode aren't applicable for these APIs; they can be used by any application for users who have the required license.

## Fetch meeting insights

To fetch the insights of a particular meeting, follow these steps:

1. If you don't have the meeting identifier (`id`), call online meeting API with the `JoinWebUrl` property to retrieve the `id`. For more information, see [retrieve an online meeting by JoinWebUrl](/graph/api/onlinemeeting-get?view=graph-rest-1.0&preserve-view=true&tabs=http#example-3-retrieve-an-online-meeting-by-joinweburl).

1. Each transcript event of the meeting creates an associated [AI insight object](/graph/api/resources/callaiinsight?preserve-view=true). Use the [List AI Insights API](/graph/api/onlinemeeting-list-aiinsights?preserve-view=true) to fetch all the AI insight objects related to the meeting and use the included metadata in the response to select the relevant AI insight object for your scenario. Here's an example request and response:

### Example

#### Request

The following example retrieves all AI insight objects for a specific online meeting.

```http
GET /copilot/users/{userId}/onlineMeetings/{onlineMeetingId}/aiInsights
```

#### Response

The following example shows a response with a list of AI insight objects. The IDs in the example have been shortened for readability.

```json
HTTP/1.1 200 OK
Content-Type: application/json

{
  "@odata.context": "https://graph.microsoft.com/v1.0/$metadata#copilot/users('22431...')/onlineMeetings('MSoyM...')/aiInsights",
  "@odata.count": 1,
  "value": [
    {
      "id": "VjEjI...",
      "callId": "97d0b...",
      "contentCorrelationId": "fb7aa...",
      "createdDateTime": "2025-12-08T05:41:31Z",
      "endDateTime": "2025-12-08T05:41:31Z"
    },
  ],
}
```

| Property | Description |
| --- | --- |
| `id` | A unique identifier for the generated AI insight object. |
| `callId` | A unique identifier for the call during which this insight is generated. |
| `contentCorrelationId` | A unique identifier that correlates the [transcript](/graph/api/resources/calltranscript?preserve-view=true) of the meeting from which the AI insight object is generated. |
| `createdDateTime` | The date and time at which the corresponding transcript was created. The timestamp type represents the date and time information using the ISO 8601 format and is always in Coordinated Universal Time (UTC). |
| `endDateTime` | The date and time at which the corresponding transcript ends. The timestamp type represents the date and time information using the ISO 8601 format and is always in UTC. |

1. Each AI insight object provides detailed meeting notes, action items, and participant-specific mentions, which you can access by calling [GET AI Insights API](/graph/api/callaiinsight-get?preserve-view=true) for a specific insight object ID. Here's an example request and response:

### Example

#### Request

The example below demonstrates how to retrieve an AI insight object.

```http
GET /copilot/users/{userId}/onlineMeetings/{onlineMeetingId}/aiInsights/{aiInsightId}
```

#### Response

The following example shows a response with a detailed meeting summary. The IDs in the example have been shortened for readability.

```json
HTTP/1.1 200 OK
Content-Type: application/json

{
  "@odata.context": "https://graph.microsoft.com/v1.0/$metadata#copilot/users('22431...')/onlineMeetings('MSoyM...')/aiInsights/$entity",
  "id": "VjEjI...",
  "callId": "97d0b...",
  "contentCorrelationId": "fb7aa...",
  "createdDateTime": "2025-12-08T05:41:31Z",
  "endDateTime": "2025-12-08T05:41:31Z",
  "meetingNotes": [
    {
      "title": "Introducing Project Objectives and Key Stakeholders",
      "text": "The stakeholders present included representatives from each department involved in the project, ensuring alignment and clear communication channels from the start.",
      "subpoints": [
        {
          "title": "Discussion on action items",
          "text": "Action items were assigned to team members, and a follow-up meeting schedule was established."
        }
      ]
    }
  ],
  "actionItems": [
    {
      "title": "Project Timeline Finalization",
      "text": "Review and finalize the project timeline to ensure alignment with stakeholder expectations and resource availability.",
      "ownerDisplayName": "Bella Smith"
    },
  ],
  "viewpoint": {
    "mentionEvents": [
      {
        "eventDateTime": "2025-12-08T05:30:00Z",
        "transcriptUtterance": "We need to get approval from Sarah Johnson before proceeding with the budget allocation.",
        "speaker": {
            "application": null,
            "device": null,
            "user": {
                "@odata.type": "#microsoft.graph.teamworkUserIdentity",
                "id": "9a760...",
                "displayName": "John Smith",
                "userIdentityType": "aadUser",
                "tenantId": "d1aeb..."
            }
        },
      },
    ]
  }
}
```

| Property | Description |
| --- | --- |
| `meetingNotes` | Contains detailed notes of the meeting discussion as generated by Microsoft Teams Copilot. The notes include a title, summary, and detailed subpoints of the discussion. |
| `actionItems` | Contains the action items generated from the meeting conversation. The action items include a summary of the action item and the assigned owner. |
| `viewpoint.mentionEvents` | Contains participant-specific information from the conversation, including mentions with the timestamps in the meeting when a user is mentioned, the speaker, and the utterance details. |

## Get notified when meeting AI insights are available

AI-generated insights might take up to four hours to be available after a meeting ends. Instead of polling the [List AI Insights API](/graph/api/onlinemeeting-list-aiinsights?preserve-view=true), your app can subscribe to [Microsoft Graph change notifications](/graph/change-notifications-overview) and get notified when a new AI insight object is created.

You can use the following types of change notification for AI insights:

| Subscription scope | Description | Supported resource path |
| --- | --- | --- |
| User-scoped | An AI insight is available for any online meeting that a specific user is part of. | `copilot/users/{userId}/onlineMeetings/getAllAiInsights` |
| Meeting-scoped | An AI insight is available for a specific online meeting. | `copilot/users/{userId}/onlineMeetings/{onlineMeetingId}/aiInsights` |

An app can have one user-scoped subscription for each user, and one meeting-scoped subscription for each user and meeting combination. For more information about subscription quotas, see [supported resources](/graph/change-notifications-overview#supported-resources).

When you [create a subscription](/graph/api/subscription-post-subscriptions?view=graph-rest-1.0&preserve-view=true) for AI insights:

* Set `changeType` to `created`. The `updated` and `deleted` change types aren't supported.
* Set `expirationDateTime` to no more than 4,320 minutes (three days) from the time you create or renew the subscription. To continue receiving notifications, [renew the subscription](/graph/api/subscription-update?view=graph-rest-1.0&preserve-view=true) before it expires.
* Set `lifecycleNotificationUrl` to receive [lifecycle notifications](/graph/change-notifications-lifecycle-events), such as `reauthorizationRequired`, that help you keep your subscription active.
* Grant your app the `OnlineMeetingAiInsight.Read.All` delegated or application permission. If you use delegated permission, the `{userId}` in the resource path must be the signed-in user.
* Make sure that the user in the resource path has a Microsoft 365 Copilot license. For more information, see [license requirements for Teams meeting AI insights APIs](#license-requirements-for-teams-meeting-ai-insights-apis).

You can create subscriptions for AI insights in both the `v1.0` and `beta` endpoints.

### Basic and rich notifications

AI insight subscriptions support the following types of notifications:

* **Basic notifications**: The `resourceData` property of the notification contains the `id`, `@odata.type`, and `@odata.id` of the new AI insight object. To get the meeting notes, action items, and mentions, call the [Get AI Insights API](/graph/api/callaiinsight-get?preserve-view=true) with the `id`.
* **Rich notifications**: The notification also contains the complete [callAiInsight](/graph/api/resources/callaiinsight?preserve-view=true) object, encrypted in the `encryptedContent` property, so your app doesn't need to call the Get AI Insights API. To get rich notifications, set `includeResourceData` to `true` and provide the `encryptionCertificate` and `encryptionCertificateId` properties when you create the subscription. For more information, see [set up change notifications that include resource data](/graph/change-notifications-with-resource-data).

Before you create a subscription for rich notifications, [configure application access](/graph/change-notifications-with-resource-data#application-configuration-for-notifications) for your app's service principal. Otherwise, the notifications contain a `null` validation token.

### Example: Subscribe to rich notifications for AI insights

#### Request

The following example creates a subscription that sends rich notifications when an AI insight is available for any online meeting that a specific user is part of.

```http
POST https://graph.microsoft.com/v1.0/subscriptions
Content-Type: application/json

{
  "changeType": "created",
  "notificationUrl": "https://webhook.contoso.com/api/notifications",
  "lifecycleNotificationUrl": "https://webhook.contoso.com/api/lifecycleNotifications",
  "resource": "copilot/users/{userId}/onlineMeetings/getAllAiInsights",
  "includeResourceData": true,
  "encryptionCertificate": "{base64encodedCertificate}",
  "encryptionCertificateId": "{customId}",
  "expirationDateTime": "2025-12-10T11:00:00.0000000Z",
  "clientState": "{secretClientState}"
}
```

#### Response

The following example shows the response. The IDs in the example have been shortened for readability.

```json
HTTP/1.1 201 Created
Content-Type: application/json

{
  "@odata.context": "https://graph.microsoft.com/v1.0/$metadata#subscriptions/$entity",
  "id": "7f105...",
  "resource": "copilot/users/22431.../onlineMeetings/getAllAiInsights",
  "changeType": "created",
  "clientState": "{secretClientState}",
  "notificationUrl": "https://webhook.contoso.com/api/notifications",
  "lifecycleNotificationUrl": "https://webhook.contoso.com/api/lifecycleNotifications",
  "expirationDateTime": "2025-12-10T11:00:00Z",
  "includeResourceData": true,
  "encryptionCertificateId": "{customId}"
}
```

### Example: Rich notification for an AI insight

When an AI insight is available, Microsoft Graph sends a notification to your `notificationUrl`, similar to the following example. A basic notification has the same structure, but doesn't include the `encryptedContent` and `validationTokens` properties. The IDs in the example have been shortened for readability.

```json
{
  "value": [
    {
      "subscriptionId": "7f105...",
      "changeType": "created",
      "clientState": "{secretClientState}",
      "subscriptionExpirationDateTime": "2025-12-10T11:00:00+00:00",
      "resource": "copilot/users/22431.../onlineMeetings/MSoyM.../aiInsights/VjEjI...",
      "resourceData": {
        "id": "VjEjI...",
        "@odata.type": "#microsoft.graph.callAiInsight",
        "@odata.id": "copilot/users/22431.../onlineMeetings/MSoyM.../aiInsights/VjEjI..."
      },
      "encryptedContent": {
        "data": "{encrypted data that produces the callAiInsight object}",
        "dataSignature": "{HMAC-SHA256 hash}",
        "dataKey": "{encrypted symmetric key from Microsoft Graph}",
        "encryptionCertificateId": "{customId}",
        "encryptionCertificateThumbprint": "{certificate thumbprint}"
      },
      "tenantId": "d1aeb..."
    }
  ],
  "validationTokens": [
    "{validation token}"
  ]
}
```

To process a rich notification, follow these steps:

1. [Validate the tokens](/graph/change-notifications-with-resource-data#validate-the-authenticity-of-notifications) in the `validationTokens` property.

1. [Decrypt](/graph/change-notifications-with-resource-data#decrypting-resource-data-from-change-notifications) the `data` property of `encryptedContent` with the private key of your certificate. The decrypted content is the callAiInsight object, which contains the same properties that the Get AI Insights API returns. As with the Get AI Insights API, the `viewpoint` property is specific to the user in the resource path. The decrypted content also includes the `recapUrl` property, which is a link that opens the meeting recap in Teams. If the link can't be generated, the `recapUrl` property isn't included.

The following example shows the decrypted content of a rich notification:

```json
{
  "id": "VjEjI...",
  "callId": "97d0b...",
  "contentCorrelationId": "fb7aa...",
  "createdDateTime": "2025-12-08T05:41:31Z",
  "endDateTime": "2025-12-08T05:41:31Z",
  "meetingNotes": [
    {
      "title": "Introducing Project Objectives and Key Stakeholders",
      "text": "The stakeholders present included representatives from each department involved in the project, ensuring alignment and clear communication channels from the start.",
      "subpoints": [
        {
          "title": "Discussion on action items",
          "text": "Action items were assigned to team members, and a follow-up meeting schedule was established."
        }
      ]
    }
  ],
  "actionItems": [
    {
      "title": "Project Timeline Finalization",
      "text": "Review and finalize the project timeline to ensure alignment with stakeholder expectations and resource availability.",
      "ownerDisplayName": "Bella Smith"
    }
  ],
  "viewpoint": {
    "mentionEvents": [
      {
        "eventDateTime": "2025-12-08T05:30:00Z",
        "transcriptUtterance": "We need to get approval from Sarah Johnson before proceeding with the budget allocation.",
        "speaker": {
          "application": null,
          "device": null,
          "user": {
            "@odata.type": "#microsoft.graph.teamworkUserIdentity",
            "id": "9a760...",
            "displayName": "John Smith",
            "userIdentityType": "aadUser",
            "tenantId": "d1aeb..."
          }
        }
      }
    ]
  },
  "recapUrl": "https://teams.microsoft.com/l/meetingrecap?driveId=b!Dx3...&driveItemId=01QFW...&...&callId=97d0b...&contentCorrelationId=fb7aa...&recapType=ODSPTranscript"
}
```

### Best practices for AI insight notifications

* Your app might receive more than one notification for the same AI insight object. Use the `id` in `resourceData` to identify and ignore duplicate notifications.
* A meeting can have more than one AI insight object, because each transcript of the meeting creates an AI insight object. Your app receives a notification for each AI insight object.
* Respond to each notification with a `2xx` status code as soon as possible, and process the notification asynchronously. For more information, see [receive notifications](/graph/change-notifications-delivery-webhooks#receive-notifications).
* Renew your subscription before it expires, and handle lifecycle notifications to avoid missing notifications.

## Limitations

* AI-generated insights are available only after a meeting ends. The API doesn't support accessing live notes during a meeting.
* AI-generated insights might take up to four hours to be available after the call ends.

## Code sample

| Sample name | Description | Node.js | Python |
| --- | --- | --- | --- |
| Meeting AI insights bot | This sample app retrieves meeting summaries, action items, and mentions by using the Meeting AI Insights API and displays them in a dialog. | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/TeamsSDK/Archived/bot-meeting-ai-insights/nodejs) | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/TeamsSDK/Archived/bot-meeting-ai-insights/python) |

## See also

* [callAiInsight resource type](/graph/api/resources/callaiinsight?preserve-view=true)
* [Working with the cloud communications API in Microsoft Graph](/graph/api/resources/communications-api-overview?view=graph-rest-beta&preserve-view=true)
* [Set up notifications for changes in resource data](/graph/change-notifications-overview)
* [Set up change notifications that include resource data](/graph/change-notifications-with-resource-data)
* [Create subscription](/graph/api/subscription-post-subscriptions?view=graph-rest-1.0&preserve-view=true)
