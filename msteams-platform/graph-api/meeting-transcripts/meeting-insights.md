---
title: Graph APIs to Fetch Meeting Insights
description: Learn how to use the Meeting AI Insights API to fetch Teams meeting insights including conversation summaries, action items, and mentions.
ms.localizationpriority: high
ms.topic: article
ms.owner: vtarasov
ms.author: surbhigupta
ms.date: 12/08/2025
---

# Get AI-generated meeting summaries with Meeting AI Insights API

> [!IMPORTANT]
>
> * Meeting AI Insights API is part of the Microsoft 365 Copilot API namespace. You can only fetch insights on behalf of a Microsoft 365 Copilot licensed user. For more information, see [license requirements for Meeting Insights API](/graph/teams-licenses#license-requirements-for-teams-meeting-ai-insights-apis).

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
| Autogenerate meeting summaries for CRM updates | A sales team conducts regular customer meetings over Teams. After each call, they need to log meeting summaries and follow-ups in their CRM. | After each meeting, you can have a backend service listen for meeting end events and use Microsoft Graph APIs to fetch post-meeting insights. The service extracts summaries and action items, and maps them to specific fields in the company's CRM records. Optionally, the integration can include a Teams message card confirming the update. | - Saves time for sales representatives by eliminating manual entry.<br>- Ensures consistent capture of key details across all customer interactions. |
| Capture post-meeting knowledge in a project management app | Product and engineering teams hold regular meetings to make design and feature decisions. Team members often forget to document what was discussed and agreed upon. | You can use a bot or a background job to query the Graph API for concluded meetings owned by product leads. The API fetches insights and uses natural language processing (NLP) to classify them, such as decisions, tasks, or risk items. These classifications are converted into tasks or notes in Azure DevOps, Jira, or Notion and assigned to the correct stakeholders using Graph user identities. | - Prevents information loss.<br>- Automatically bridges the gap between conversation and task tracking.<br>- Promotes alignment and accountability. |
| Generate executive briefings for strategic meetings | Executives participate in multiple high-level meetings across functions such as finance, operations, or board reviews. They need quick, reliable summaries to stay up-to-date and take action. | You can create a digital assistant to call the Graph API after the designated executive meetings conclude to retrieve insights, prioritize key decisions and blockers, and format them into a concise daily briefing card. This card is posted to the executive's Teams chat or sent as a morning email summary. The integration can optionally highlight recurring themes using keyword clustering across meetings. | - Improves executive focus and decision velocity.<br>- Reduces reliance on manual note-taking and follow-ups. Enables faster cross-functional awareness. |

## Prerequisites

* You must [turn on the transcription or recording](https://support.microsoft.com/en-us/office/view-live-transcription-in-microsoft-teams-meetings-dc1a8f23-2e20-4684-885e-2152e06a4a8b) for the meeting to generate insights. Alternatively, you can set a meeting to autotranscribe or autorecord programmatically using the [update onlineMeeting API](/graph/api/onlinemeeting-update?view=graph-rest-1.0&preserve-view=true&tabs=http) or directly through the [meeting options](/microsoftteams/manage-meeting-recording-options#record-and-transcribe-automatically).

## Fetch meeting insights

To fetch the insights of a particular meeting, follow these steps:

1. If you don't have the meeting identifier (`id`), call online meeting API with the `JoinWebUrl` property to retrieve the `id`. For more information, see [retrieve an online meeting by JoinWebUrl](/graph/api/onlinemeeting-get?view=graph-rest-1.0&preserve-view=true&tabs=http#example-3-retrieve-an-online-meeting-by-joinweburl).

1. Each transcript event of the meeting creates an associated [AI insight object](/graph/api/resources/callaiinsight?preserve-view=true). Use the [List AI Insights API](/graph/api/onlinemeeting-list-aiinsights?preserve-view=true) to fetch all the AI insight objects related to the meeting and use the included metadata in the response to select the relevant AI insight object for your scenario. Here's an example request and response:

### Request

```http
GET/stagingv1.0/copilot/users/{userId}/onlineMeetings/{onlineMeetingId}/aiInsights
```

### Response

```json
HTTP/1.1 200 OK
Content-Type: application/json

{
  "@odata.context": "https://graph.microsoft.com/stagingv1.0/$metadata#copilot/users('224317f2-e936-449c-8955-978c1497ce17')/onlineMeetings('MSoyMjQzMTdmMi1lOTM2LTQ0OWMtODk1NS05NzhjMTQ5N2NlMTcqMCoqMTk6bWVldGluZ19OV0kxWXpkbVlqWXRaamRoTVMwME1UVTVMV0ZpTUdVdE9HWm1ZemRtTVRFd01qQTVAdGhyZWFkLnYy')/aiInsights",
  "@odata.count": 1,
      "value": 
      [
        {
          "id": "VjEjI1NQT19aamRsWkRKaVlURXRPR1F3TnkwME1XVmtMVGt5TVRBdFlUQXpOMkprT1dWaFpEazFMR000TkRjeVl6TTNMV1U1TkRjdE5EWXhNUzFpWlRkaExUZ3paRGN4T1RZelpHSmhNaXhpTjJNME9UZGtNeTB5T1RZNUxUUTBZMll0T0RRM1lpMWtNMkppTmpoak9EWmtZak1fMDFLTUVLNUE1Q01SUlQzWUJXSEJISUVKVVMzT0ZBVVNRTQ==",
          "callId": "97d0b60e-4341-470f-b273-ea7ddb31f8f9",
          "contentCorrelationId": "fb7aa4c9-b2a0-497f-94f1-f52d1975bd3c-0",
          "createdDateTime":"2025-12-08T05:41:31Z",
          "endDateTime": "2025-12-08T05:41:31Z"
        }
      ]
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

### Request

```http
GET/stagingv1.0/copilot/users/{userId}/onlineMeetings/{onlineMeetingId}/aiInsights/{aiInsightId}
```

### Response

```json
HTTP/1.1 200 OK
Content-Type: application/json

{
  "@odata.context": "https://graph.microsoft.com/stagingv1.0/$metadata#copilot/users('224317f2-e936-449c-8955-978c1497ce17')/onlineMeetings('MSoyMjQzMTdmMi1lOTM2LTQ0OWMtODk1NS05NzhjMTQ5N2NlMTcqMCoqMTk6bWVldGluZ19OV0kxWXpkbVlqWXRaamRoTVMwME1UVTVMV0ZpTUdVdE9HWm1ZemRtTVRFd01qQTVAdGhyZWFkLnYy')/aiInsights/$entity",
    "id": "VjEjI1NQT0A2ZWMzMmU4MC1jN2U1LTQwMWUtYjE4NS01ODVjYjRkYTNiZTYsb21SalBlQTJPRTZDSnBMYmlncEtETk9YeExkcEtjOUVoSHZUdTJqSWJiTTNMRWZJUi1rUlJyNTZnOWNaWTl1aW9TdnQ5d2VON1VHU0VLQTN2WjZ0bFE=",
    "callId": "97d0b60e-4341-470f-b273-ea7ddb31f8f9",
    "contentCorrelationId": "fb7aa4c9-b2a0-497f-94f1-f52d1975bd3c-0",
    "createdDateTime": "2025-12-08T05:41:31Z",
    "endDateTime": "2025-12-08T05:41:31Z",
    "meetingNotes": [
        {
          "title": "Sample Testing and Staging Code Update",
          "text": "MOD discussed the process of testing a sample, confirming that it will function after updating the staging code, and outlined the necessary steps for this update.",
          "subpoints": [
          {
          "title": "Staging Code Modification",
          "text": "MOD stated that the sample will work after changing the staging code, indicating that this is the primary requirement for successful testing.",
          },
          {
          "title": "Beta Environment Configuration",
          "text": "MOD clarified that updates are needed only in the beta environment, specifically mentioning the need to replace or update the access token and configure related settings.",
          },
          {
          "title": "Testing Process Steps",
          "text": "MOD described the process of generating the beta, suggested that another person might need to participate, and encouraged further attempts if initial tests do not succeed.",
          },
        ],
      },
      {
        "title": "ReadMe File Integration Issue",
        "text": "MOD identified an issue related to the ReadMe file, noting that it was properly created and centrally added, which is affecting the current process.",
        "subpoints": [
        {
          "title": "ReadMe File Addition",
          "text": "MOD explained that the ReadMe file was properly created and centrally added, which is contributing to the observed issue in the workflow.",
        },
      ],
    },
  ],
}
```

| Property | Description |
| --- | --- |
| `meetingNotes` | Contains detailed notes of the meeting discussion as generated by Microsoft Teams Copilot. The notes include a title, summary, and detailed subpoints of the discussion. |
| `actionItems` | Contains the action items generated from the meeting conversation. The action items include a summary of the action item and the assigned owner. |
| `viewpoint.mentionEvents` | Contains participant-specific information from the conversation, including mentions with the timestamps in the meeting when a user is mentioned, the speaker, and the utterance details. |

## Limitations

* AI-generated insights are available only after a meeting ends. The API doesn't support accessing live notes during a meeting.
* AI-generated insights might take up to four hours to be available after the call ends.

## Code sample

| Sample name | Description | Node.js | Python |
| --- | --- | --- | --- |
| Meeting AI insights bot | This sample app retrieves meeting summaries, action items, and mentions by using the Meeting AI Insights API and displays them in a dialog. | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/bot-meeting-ai-insights/nodejs) | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/bot-meeting-ai-insights/python) |

## See also

* [callAiInsight resource type](/graph/api/resources/callaiinsight?preserve-view=true)
* [Working with the cloud communications API in Microsoft Graph](/graph/api/resources/communications-api-overview?view=graph-rest-beta&preserve-view=true)
