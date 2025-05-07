---
title: Graph APIs to Fetch Meeting Insights
description: Learn how to use the Meeting AI Insights API to fetch Teams meeting insights including conversation summaries, action items, and @mention utterances.
ms.localizationpriority: high
ms.topic: conceptual
ms.owner: vichug
ms.author: surbhigupta
ms.date: 05/09/2025
---

# Get meeting insights with Meeting AI Insights API

> [!NOTE]
>
> * AI-generated meeting insights fetched through Meeting AI Insights API are only available in [public developer preview](../../resources/dev-preview/developer-preview-intro.md).
> * Meeting AI Insights API is a metered API. For more information, see [payment models for meeting APIs](/graph/teams-licenses#payment-models-for-meeting-apis).

You can use the Meeting AI Insights API to get AI-generated insights from a transcribed Microsoft Teams meeting. The AI-generated insights include:

* Comprehensive conversation summaries
* Action items extracted from the discussion
* Participant-specific @mention utterances

The Meeting AI Insights API allows you to use smart meeting features, such as highlighting key takeaways or creating follow-up tasks, without needing to build or maintain your own AI infrastructure. Since the API uses [on-behalf-on (OBO) flow](/entra/identity-platform/v2-oauth2-on-behalf-of-flow) to make calls, the user on whose behalf the API is making calls must have a [Microsoft 365 Copilot license](/copilot/microsoft-365/microsoft-365-copilot-licensing).

# Use cases

Here are some use cases for fetching AI-generated insights using Graph API:

| Use case | Scenario | Integration | Impact |
| --- | --- | -- | -- |
| Autogenerate meeting summaries for CRM updates | A sales team conducts regular customer meetings over Teams. After each call, they need to log meeting summaries and follow-ups in their CRM. | After each meeting, a backend service listens for meeting end events (via calendar or webhook triggers) and uses the Microsoft Graph API to fetch post-meeting insights. The service extracts summaries and action items, and maps them to specific fields in Salesforce or Dynamics 365 CRM records, such as meeting notes or next steps. Optionally, the integration includes a Teams message card confirming the update. | Saves time for sales reps by eliminating manual entry. Ensures consistent capture of key details across all customer interactions. |
| Post-meeting knowledge capture in a project management app | Product and engineering teams hold regular syncs to make design and feature decisions. Team members often forget to document what was agreed upon. | A bot or background job queries the Graph API for concluded meetings owned by product leads. It fetches insights and uses NLP to classify them, such as "decision", "task", or "risk". These are converted into tasks or notes in Jira, Azure DevOps, or Notion, assigned to the correct stakeholders using Graph user identities. | Prevents information loss. Automatically bridges the gap between conversation and task tracking. Promotes alignment and accountability. |
| Executive briefing generator for strategic meetings | Executives participate in multiple high-level meetings across functions such as finance, operations, or board reviews and need quick, reliable summaries to stay aligned and take action. | A digital assistant polls the Graph API after designated executive meetings conclude. It retrieves insights, prioritizes key decisions and blockers, and formats them into a concise daily briefing card. This card is posted to the executive's Teams chat or sent as a morning email summary. The integration can optionally highlight recurring themes using keyword clustering across meetings. | Improves executive focus and decision velocity. Reduces reliance on manual note-taking or EA follow-ups. Enables faster cross-functional awareness. |

## Prerequisites

* The transcript for the given meeting must be switched on. Insights can only be generated for transcribed conversations. You can set a meeting to autotranscribe or autorecord using the [update onlineMeeting API](/graph/api/onlinemeeting-update?view=graph-rest-1.0&preserve-view=true&tabs=http).

* The Meeting AI Insights API only works with delegated permissions and hence requires a token from a signed-in user to be passed in the call. This user must have a Microsoft 365 Copilot license and access to the meeting’s transcript file.

> [!NOTE]
> This API provides AI Insights for all meetings and calls for which the recap was generated. This includes scheduled private and channel meetings, one-on-one and group VOIP calls, and ad-hoc meetings.

## Fetching meeting insights

To fetch the insights related to a particular meeting, follow these steps:

1. If you don’t have the `meetingId`, call the GET / onlineMeeting API with the `joinUrl` of the meeting to retrieve the `meetingId`.

1. Each transcript event related to the meeting creates an associated AI Insight artifact. Use the List AI Insights API to fetch all insight artifacts related to that meeting and then use the included metadata in the response to select the relevant artifact for your scenario. Each AI Insight object in this API response contains the following information:

| Property | Description |
| --- | --- |
| ID | A unique identifier for the generated Insight |
| Call ID | A unique identifier for the call during which this Insight was generated |
| Content Correlation ID | A unique identifier that correlates the transcript from which the insights were generated |
| CreatedDateTime | The date and time at which the corresponding transcript was created. The timestamp type represents date and time information using the ISO 8601 format and is always in UTC.|
| EndDateTime | The date and time at which the corresponding transcript ends. The timestamp type represents date and time information using the ISO 8601 format and is always in UTC. |

1. Each Insight artifact provides detailed Meeting Notes, Action-items, and Participant specific mention events. These can be accessed by calling the GET AI Insights API for a specific Insight ID. Here’s a summary of the various data points that the API provides for each Insight Artifact are:

| Property | Description |
| --- | --- |
| Meeting Notes | Detailed notes of the meeting discussion as generated by Microsoft Teams Copilot. These notes include the Title, Summary Description, and detailed subpoints of the discussion |
| Action Items | Action items generated from the meeting conversation. This includes the Action summary and the assigned owner |
| View Point (Mention Events) | This provides participant specific information from the conversation. This includes @mention utterances that detail the timestamps in the meeting when the user was mentioned, including the speaker and utterance details |

## Limitations

* AI-generated insights are only available after a meeting ends. The API doesn't support accessing live notes during a meeting.

* AI-generated insights might take upto four hours to be available after the call ends.

* Application-level permissions aren't supported.

* PSTN calls aren't supported.
