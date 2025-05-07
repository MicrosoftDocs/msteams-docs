---
title: Fetch Meeting Transcripts & Recordings
description: In this module, learn the process, scenarios, and APIs to fetch transcripts, recordings, and AI-generated insights in the post-meeting scenario.
ms.localizationpriority: high
ms.topic: conceptual
ms.owner: vichug
ms.date: 05/05/2025
---

# Get meeting transcripts, recordings, and AI-generated insights using Graph APIs

> [!NOTE]
> The APIs to fetch meeting transcript, recording, and AI-generated insights are metered APIs. For more information, see [payment models for meeting APIs](/graph/teams-licenses#payment-models-for-meeting-apis).

You can now configure your app to fetch Microsoft Teams meeting transcripts, recordings, and AI-generated insights in the post-meeting scenario. Your app can use Microsoft Graph REST APIs to access and fetch transcripts, recordings, and AI insights generated for a scheduled Teams meeting.

## Use cases

Here are some use cases for fetching meeting transcripts, recordings, and AI-generated insights using Graph API:

| Use case | How the APIs help... |
| --- | --- |
| You need to obtain transcripts and recordings for capturing meaningful insights from multiple meetings across the Sales vertical. It's time-consuming and inefficient to keep track of all meetings, and to retrieve meeting transcripts and recordings manually. After the meeting is over, you'd need to examine conversations in all those meetings to obtain useful information. | Use Graph APIs in your app to fetch meeting transcripts, recordings, and AI-generated insights from all meetings relevant for your purpose. Your app can receive meeting notifications, and get the transcript, recording, and AI-generated insights after the meeting ends. This data can be used to gain: <br> • Aggregated insights and intelligence analysis <br> • New leads and highlights <br> • Meeting follow-ups and summaries |
| As an HR initiative, you're holding a brainstorming session to understand and improve employee health and productivity. Having to continually take notes to provide a post-meeting summary can impede the flow of thoughts, and you might not capture all valuable suggestions. After the session, you'd need to analyze the discussion to gather data points for planning improvements. | Using Graph APIs in your app to fetch transcripts, recordings, and AI-generated insights post-meeting frees you and the participants to fully focus on the discussion. The content of the meeting transcript, recording, and AI-generated insights is available for: <br> • Engagement and sentiment analysis <br> • Listing tasks or issues <br> • Follow-up meetings and notifications |
|A salesperson at a leading tech company must connect with clients and close deals. With numerous meetings scheduled through Teams and Outlook calendar, it's crucial to attend all calls and stay updated on discussions and latest updates.|Create an app with the following capabilities:<br> • Notify you when a meeting is scheduled using Teams or Outlook calendar. <br> • Enable your app to set `AutoRecording=true` for these meetings. <br> • Add a bot as a meeting participant to display a banner indicating that the meeting is being recorded and that the content is used by your app for analysis.<br> • Allow your app to access meeting recordings, transcripts, and AI-generated insights.<br> • Allow your app without requiring admin approval for the `OnlineMeetingRecording.Read.All` permissions, as obtaining admin approval for these permissions can be time consuming. <br> Here's a [sample app](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/tab-meeting-auto-recording/csharp) that showcases this use case scenario. |

## Get meeting transcripts and recordings

To fetch the transcript and recording for a particular meeting:

1. [Configure permissions on Microsoft Entra ID to access transcript and recording](#configure-permissions-on-azure-ad-to-access-transcript-and-recording)
1. [Get notified when the meeting transcripts and recordings are available](/graph/teams-changenotifications-callrecording-and-calltranscript)
1. [Use Graph APIs to fetch transcript](/graph/api/resources/calltranscript?view=graph-rest-1.0&preserve-view=true)
1. [Use Graph APIs to fetch recording](/graph/api/resources/callrecording?view=graph-rest-beta&preserve-view=true)

<a name='configure-permissions-on-azure-ad-to-access-transcript-and-recording'></a>

### Configure permissions on Microsoft Entra ID to access transcript and recording

Your app must have the required permissions for fetching transcripts and recordings. It can access and fetch transcripts and recordings for a Teams meeting using organization-wide application permissions or resource-specific consent (RSC) application permissions for a particular meeting.

#### Use organization-wide application permissions

You can configure your app to access meeting transcripts and recordings across the tenant. In this case, the meeting organizer doesn't need to install your app in the Teams meeting chat. When the admin authorizes the organization-wide application permissions, your app can read and access transcripts and recordings for all meetings in the tenant.

For more information about the organization-wide application permissions that can be granted to your app, see [online meeting permissions](/graph/permissions-reference#online-meetings-permissions).

#### Use meeting-specific RSC application permissions

If you want your app to fetch transcripts and recordings only for the Teams meeting where it's installed, configure  meeting-specific RSC permission for your app. Authorized users can install your app in the meeting chat. After the meeting ends, your app can make the API call to obtain the transcript and recording for that meeting.

For more information about the meeting-specific RSC permissions, see [RSC permissions for a chat or meeting](../rsc/resource-specific-consent.md#rsc-permissions-for-a-chat-or-meeting).

### Get notified when a transcript or recording is available

After you configure the permissions, configure your app to receive [change notifications](/graph/teams-changenotifications-callrecording-and-calltranscript) for transcripts and recordings when available or all relevant meeting events. Notifications contain meeting ID and organizer ID that help in accessing transcript content and recording. Your app can fetch the transcript and recording for a meeting when it's generated after it ends. The content of the transcript is available as `.vtt` file. The recording of the meeting is available as an `.mp4` file.

You can use the following types of change notification for your app:

| Subscription Scope | Description | Supported resource paths |
| --- | --- | --- |
|Tenant level| A transcript or recording is available for any online meeting for a tenant​.|• All transcripts in an organization: `communications/onlineMeetings/getAllTranscripts`<br> • All recordings in an organization: `communications/onlineMeetings/getAllRecordings`|
|Meeting level| A transcript or recording is available for a specific online meeting.​ | • All transcripts for a specific meeting: `communications/onlineMeetings/{onlineMeetingId}/transcripts` <br> • All recordings for a specific meeting: `communications/onlineMeetings/{onlineMeetingId}/recordings` |
|User-scoped| A transcript or recording is available for any online meeting organized by a specific user.​| • A call transcript that becomes available in a meeting organized by a specific user: `users/{userId}/onlineMeetings/getAllTranscripts` <br> • A call recording that becomes available in a meeting organized by a specific user: `users/{userId}/onlineMeetings/getAllRecordings` |
|App-scoped| A transcript or recording is available for any meeting in which a specific teams-app is installed.| • A call transcript that becomes available in a meeting where a particular Teams app is installed: `appCatalogs/teamsApps/{id}/installedToOnlineMeetings/getAllTrancripts` <br> • A call recording that becomes available in a meeting where a particular Teams app is installed: `appCatalogs/teamsApps/{id}/installedToOnlineMeetings/getAllRecordings` |

For more information about how your app can know when a transcript or recording is available after the online meeting ends, see [get notified when transcripts and recordings are available](/graph/teams-changenotifications-callrecording-and-calltranscript).

For more information about how your app can know when the meetings ends, see [subscribe to change notifications](fetch-id.md#subscribe-to-change-notifications) and [use Bot Framework to get meeting ID and organizer ID](fetch-id.md#use-bot-framework-to-get-meeting-id-and-organizer-id).

> [!NOTE]
> The process for calling Graph APIs to access and retrieve transcripts and recordings remains the same for both meeting-specific RSC application permissions and organization-wide application permissions. These APIs support private chat meetings and channel meetings only in beta.

## Get meeting insights

Your app can fetch AI-generated meeting insights, including conversation summaries, action items, and @mention utterances using Meeting AI Insights API. For more information, see [get meeting insights with Meeting AI Insights API](meeting-insights.md).

## Next step

> [!div class="nextstepaction"]
> [Get notified when the meeting transcripts and recordings are available](/graph/teams-changenotifications-callrecording-and-calltranscript)

## See also

* [Apps for Teams meetings and calls](../../apps-in-teams-meetings/teams-apps-in-meetings.md)
* [Meeting app APIs](../../apps-in-teams-meetings/meeting-apps-apis.md)
* [App manifest schema for Teams](../../resources/schema/manifest-schema.md)
* [Microsoft Graph API to get information about online meeting](/graph/api/resources/onlinemeeting)
* [Considerations when choosing an API](/graph/choose-online-meeting-api)
