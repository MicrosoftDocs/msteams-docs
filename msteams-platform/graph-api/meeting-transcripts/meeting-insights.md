---
title: Graph APIs to Fetch Meeting Insights
description: Learn how to use the Meeting AI Insights API to fetch Teams meeting insights including conversation summaries, action items, and @mention utterances.
ms.localizationpriority: high
ms.topic: conceptual
ms.owner: vichug
ms.author: surbhigupta
ms.date: 05/14/2025
---

# Get AI-generated meeting summaries with Meeting AI Insights API

> [!IMPORTANT]
>
> * Meeting AI Insights API is available under the beta version in Microsoft Graph. For more information, see [versioning, support, and breaking change policies for Microsoft Graph](/graph/versioning-and-support#beta-version).
> * Meeting AI Insights API is part of the Microsoft 365 Copilot API namespace. Insights can only be fetched on behalf of a Microsoft 365 Copilot licensed user. For more information, see [license requirements for Meeting Insights API](/graph/teams-licenses#license-requirements-for-teams-meeting-ai-insights-apis).

The Meeting AI Insights API enables you to programmatically access structured AI-generated insights from transcribed Microsoft Teams meetings. These insights include:

* Comprehensive conversation summaries
* Action items extracted from the discussion
* Participant-specific @mention utterances

The API empowers you to deliver intelligent meeting experiences, such as surfacing key takeaways or generating follow-ups, without the need to build or maintain your own AI infrastructure. Insights are generated after the meeting concludes and are accessible through Microsoft Graph API endpoints.


> [!NOTE]
> Meeting AI Insights API currently provides insights only for scheduled private meetings.

## Use cases

Here are some use cases for fetching AI-generated insights using Meeting AI Insights API:

| Use case | Scenario | Integration | Impact |
|---|---|---|---|
| Autogenerate meeting summaries for CRM updates | A sales team conducts regular customer meetings over Teams. After each call, they need to log meeting summaries and follow-ups in their CRM. | After each meeting, you can have a backend service listen for meeting end events and use Microsoft Graph APIs to fetch post-meeting insights. The service extracts summaries and action items, and maps them to specific fields in the company's CRM records. Optionally, the integration can include a Teams message card confirming the update. | - Saves time for sales representatives by eliminating manual entry.<br>- Ensures consistent capture of key details across all customer interactions. |
| Capture post-meeting knowledge in a project management app | Product and engineering teams hold regular meetings to make design and feature decisions. Team members often forget to document what was discussed and agreed upon. | You can use a bot or a background job to query the Graph API for concluded meetings owned by product leads. The API fetches insights and uses natural language processing (NLP) to classify them, such as decisions, tasks, or risk items. These classifications are converted into tasks or notes in Azure DevOps, Jira, or Notion and assigned to the correct stakeholders using Graph user identities. | - Prevents information loss.<br>- Automatically bridges the gap between conversation and task tracking.<br>- Promotes alignment and accountability. |
| Generate executive briefings for strategic meetings | Executives participate in multiple high-level meetings across functions such as finance, operations, or board reviews. They need quick, reliable summaries to stay up-to-date and take action. | You can create a digital assistant to call the Graph API after the designated executive meetings conclude to retrieve insights, prioritize key decisions and blockers, and format them into a concise daily briefing card. This card is posted to the executive's Teams chat or sent as a morning email summary. The integration can optionally highlight recurring themes using keyword clustering across meetings. | - Improves executive focus and decision velocity.<br>- Reduces reliance on manual note-taking and follow-ups. Enables faster cross-functional awareness. |

## Prerequisites

* You must [turn on the transcription or recording](https://support.microsoft.com/en-us/office/view-live-transcription-in-microsoft-teams-meetings-dc1a8f23-2e20-4684-885e-2152e06a4a8b) for the meeting for which the insights are to be generated. Alternatively, you can set a meeting to autotranscribe or autorecord programmatically using the [update onlineMeeting API](/graph/api/onlinemeeting-update?view=graph-rest-1.0&preserve-view=true&tabs=http) or directly through the [meeting options](/microsoftteams/manage-meeting-recording-options#record-and-transcribe-automatically).

* The Meeting AI Insights API only works with delegated permissions and hence requires a token from a signed-in user to be passed in the call. The signed-in user must have a [Microsoft 365 Copilot license](/copilot/microsoft-365/microsoft-365-copilot-licensing) and access to the meeting’s transcript file.

## Fetch meeting insights

To fetch the insights of a particular meeting, follow these steps:

1. If you don’t have the meeting identifier (`id`), call online meeting API with the `JoinWebUrl` property to retrieve the `id`. For more information, see [retrieve an online meeting by JoinWebUrl](/graph/api/onlinemeeting-get?view=graph-rest-1.0&preserve-view=true&tabs=http#example-3-retrieve-an-online-meeting-by-joinweburl).

1. Each transcript event of the meeting creates an associated [AI insight object](/graph/api/resources/callaiinsight?view=graph-rest-beta&preserve-view=true). Use the [List AI Insights API](/graph/api/onlinemeeting-list-aiinsights?view=graph-rest-beta&preserve-view=true) to fetch all the AI insight objects related to the meeting and use the included metadata in the response to select the relevant AI insight object for your scenario. Here's an example request and response:

    **Request**

    ```http
    GET /copilot/users/{userId}/onlineMeetings/{onlineMeetingId}/aiInsights
    ```

    **Response**

    ```json
    HTTP/1.1 200 OK
    Content-Type: application/json
    
    {
      "@odata.context": "https://graph.microsoft.com/beta/$metadata#copilot/users('000000000-0000-0000-0000-000000000000')/onlineMeetings('00000...')/aiInsights",
      "@odata.count": 1,
      "value": [
        {
          "id": "VjEj...",
          "callId": "af630fe0-04d3-4559-8cf9-91fe45e36296",
          "contentCorrelationId": "bc842d7a-2f6e-4b18-a1c7-73ef91d5c8e3",
          "createdDateTime": "2025-05-09T08:17:10.7261294Z",
          "endDateTime": "2025-05-09T08:17:10.7261294Z"
        }
      ]
    }
    ```

    | Property | Description |
    | --- | --- |
    | `id` | A unique identifier for the generated AI insight object. |
    | `callId` | A unique identifier for the [call](/graph/api/resources/call?view=graph-rest-1.0&preserve-view=true) during which this insight is generated. |
    | `contentCorrelationId` | A unique identifier that correlates the [transcript](/graph/api/resources/calltranscript?&view=graph-rest-beta&preserve-view=true) of the meeting from which the AI insight object is generated. |
    | `createdDateTime` | The date and time at which the corresponding transcript was created. The timestamp type represents the date and time information using the ISO 8601 format and is always in Coordinated Universal Time (UTC). |
    | `endDateTime` | The date and time at which the corresponding transcript ends. The timestamp type represents the date and time information using the ISO 8601 format and is always in UTC. |

1. Each AI insight object provides detailed meeting notes, action items, and participant-specific @mention utterances, which can be accessed by calling [GET AI Insights API](/graph/api/callaiinsight-get?view=graph-rest-beta&preserve-view=true) for a specific insight object ID. Here's an example request and response:

    **Request**

    ```http
    GET /copilot/users/{userId}/onlineMeetings/{onlineMeetingId}/aiInsights/{aiInsightId}
    ```

    **Response**

    ```json
    HTTP/1.1 200 OK
    Content-type: application/json
    
    {
      "@odata.context": "https://graph.microsoft.com/beta/$metadata#copilot/users('00000000-0000-0000-0000-000000000000')/onlineMeetings('000000...')/aiInsights/$entity",
      "id": "Z2HWbT...",
      "callId": "af630fe0-04d3-4559-8cf9-91fe45e36296",
      "contentCorrelationId": "bc842d7a-2f6e-4b18-a1c7-73ef91d5c8e3",
      "createdDateTime": "2024-05-27T08:17:10.7261294Z",
      "endDateTime": "2024-05-27T08:32:10.7261294Z",
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
          "title": "Finalize Project Timeline",
          "text": "Review and finalize the project timeline to ensure alignment with stakeholder expectations and resource availability.",
          "ownerDisplayName": "Bella Smith",
        },
      ],
      "viewpoint": {
        "mentionEvents": [
          {
            "speaker": {
                "application": null,
                "device": null,
                "user": {
                    "@odata.type": "#Microsoft.Teams.GraphSvc.teamworkUserIdentity",
                    "id": "9a7608d3-53e4-4a92-804f-ef43f1e5f5b5",
                    "displayName": "John Smith",
                    "userIdentityType": "aadUser",
                    "tenantId": "d1aeb56e-5a25-4d91-a4f6-0f5e6a50d887"
                }
            },
            "eventDateTime": "2024-05-21T09:00:00",
            "transcriptUtterance": "We need to get approval from Sarah Johnson before proceeding with the budget allocation."
          },
        ]
      }
    }
    ```

    | Property | Description |
    | --- | --- |
    | `meetingNotes` | Contains detailed notes of the meeting discussion as generated by Microsoft Teams Copilot. The notes include a title, summary, and detailed subpoints of the discussion. |
    | `actionItems` | Contains the action items generated from the meeting conversation. The action items include a summary of the action item and the assigned owner. |
    | `viewpoint.mentionEvents` | Contains participant-specific information from the conversation, including @mention utterances with the timestamps in the meeting when a user is mentioned, the speaker, and the utterance details. |

## Limitations

* AI-generated insights are only available after a meeting ends. The API doesn't support accessing live notes during a meeting.

* AI-generated insights might take up to four hours to be available after the call ends.

* Application-level permissions aren't supported.

* Only private scheduled meetings are currently supported.

## See also

* [callAiInsight resource type](/graph/api/resources/callaiinsight?view=graph-rest-beta&preserve-view=true)
* [Working with the cloud communications API in Microsoft Graph](/graph/api/resources/communications-api-overview?view=graph-rest-beta&preserve-view=true)
