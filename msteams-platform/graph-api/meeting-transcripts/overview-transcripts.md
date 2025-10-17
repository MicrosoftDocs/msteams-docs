---
title: Fetch Meeting Transcripts & Recordings
description: In this module, learn the process, scenarios, and APIs to fetch transcripts and recordings in the post-meeting scenario.
ms.localizationpriority: high
ms.topic: conceptual
ms.owner: vichug
ms.author: surbhigupta
ms.date: 09/2/2025
---

# Get meeting transcripts and recordings using Graph APIs

> [!NOTE]
> The APIs to fetch meeting transcripts and recordings are metered APIs. For more information, see [payment models for meeting APIs](/graph/teams-licenses#payment-models-for-meeting-apis).

You can now configure your app to fetch Microsoft Teams transcripts and recordings after the meeting or call ends. Your app can use Microsoft Graph REST APIs to access and fetch transcripts and recordings generated for the following instances:

- a scheduled online meeting
- an ad hoc call

## Use cases

Here are some use cases for fetching meeting transcripts and recordings using Graph API.

|    Use case    |    Description    |     How the APIs help  |
| --- | --- |--- |
| Fetch meeting transcripts and recordings automatically for **scheduled instances** like online meetings | As a sales manager, you need to obtain transcripts and recordings for capturing meaningful insights from multiple meetings across the Sales vertical. Keeping a tab on all meetings, and retrieving meeting transcripts and recordings manually from them to obtain useful information is time-consuming and inefficient. | Use Graph APIs in your app to fetch meeting transcripts and recordings automatically from all meetings relevant for your purpose. Your app receives meeting notifications, and gets the transcript and recording when it is generated after the meeting ends. <br> This data can then be used to gain: <br> • Aggregated insights and intelligence analysis <br> • New leads and highlights <br> • Meeting follow-ups and summaries |
| Fetch transcripts and recordings post-meeting for **scheduled instances** like online meetings | As an HR initiative, you're holding a brainstorming session to understand and improve employee health and productivity. Afetr it ends, you'd need to analyze the discussion to gather data points for planning improvements. Having to continually take notes to provide a post-meeting summary can impede the flow of thoughts, and you might not capture all valuable suggestions. | Using Graph APIs in your app to fetch transcripts and recordings post-meeting frees you and the participants to fully focus on the discussion. The content of the meeting transcript and recording is available for: <br> • Engagement and sentiment analysis <br> • Listing tasks or issues <br> • Follow-up meetings and notifications |
| Create a personlized app for **scheduled instances** like online meetings | As a salesperson at a leading tech company, you must connect with clients and close deals. With numerous meetings scheduled through Teams and Outlook calendar, it's crucial to attend all calls and stay updated on discussions and latest updates. | Create an app with the following capabilities:<br> • Notify you when a meeting is scheduled using Teams or Outlook calendar. <br> • Enable your app to set `AutoRecording=true` for these meetings. <br> • Add a bot as a meeting participant to display a banner indicating that the meeting is being recorded and that the content is used by your app for analysis.<br> • Allow your app to access meeting recordings and transcripts.<br> • Allow your app without requiring admin approval for the `OnlineMeetingRecording.Read.All` permissions, as obtaining admin approval for these permissions can be time consuming. <br> Here's a [sample app](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/tab-meeting-auto-recording/csharp) that showcases this use case scenario. |
| Fetch transcripts and recordings post-meeting for **ad hoc instances** | As a project manager, your role requires you to make spontaneous group or one-on-one calls, which can't be scheduled beforehand. Without a meeting invite, meeting IDs aren't generated, and hence transcripts and recordings can't be accessed. Taking down copious notes leaves much room to miss critical action items. | Use Graph APIs in your app to fetch transcripts and recordings post-meeting frees you and the participants to fully focus on the discussion. By using permissions `CallTranscripts.Read.All` and `CallRecordings.Read.All`, the call transcript is available for: <br> • Capturing important action items <br> • Listing to-dos or issues <br> • Follow-up meetings and notifications |
|Fetch transcript and recordings post-call for **PSTN calls** | You have a call center where human assistants provide customer support using incoming or outgoing PSTN calls using Microsoft Teams. The assistants need to manually update external systems of record with notes from each call after the call ends.| Using Graph APIs in your app to fetch transcript and recordings post-call reduces the manual work required by each assistant to update records. Also it allows your app to trigger automations using call transcript. |

## Get meeting and call transcripts and recordings

To fetch the transcript and recording for a particular meeting and call:

1. [Configure permissions on Microsoft Entra ID to access transcript and recording](#configure-permissions-on-azure-ad-to-access-transcript-and-recording)
1. [Get notified when the meeting transcripts and recordings are available](/graph/teams-changenotifications-callrecording-and-calltranscript)
1. [Use Graph APIs to fetch transcript](/graph/api/resources/calltranscript?view=graph-rest-1.0&preserve-view=true)
1. [Use Graph APIs to fetch recording](/graph/api/resources/callrecording?view=graph-rest-beta&preserve-view=true)

<a name='configure-permissions-on-azure-ad-to-access-transcript-and-recording'></a>

### Configure permissions on Microsoft Entra ID to access transcript and recording

Your app must have the required permissions for fetching transcripts and recordings. It can access and fetch transcripts and recordings for a Teams meeting using organization-wide application permissions or resource-specific consent (RSC) application permissions for a particular meeting.

> [!NOTE]
>
> - New permissions for `adhocCalls` (parallel to `OnlineMeetings`) are required for the above resources.
> - Subscribe to two separate, appropriately scoped resources (one for `onlineMeetings` and other for `adhocCalls`). These resources supply the URLs to use for fetching the data.

#### Use organization-wide application permissions

For online meetings and calls, you can configure your app to access meeting transcripts and recordings across the tenant. In this case, the meeting organizer doesn't need to install your app in the Teams meeting chat. When the admin authorizes the organization-wide application permissions, your app can read and access transcripts and recordings for all meetings in the tenant.

For more information about the organization-wide application permissions that can be granted to your app, see [online meeting permissions](/graph/permissions-reference#online-meetings-permissions).

>[!NOTE]
>
>App-based permissions and user delegated permissions are allowed for ad hoc calls.

#### Use meeting-specific RSC application permissions

If you want your app to fetch transcripts and recordings only for the Teams meeting where it's installed, configure  meeting-specific RSC permission for your app. Authorized users can install your app in the meeting chat. After the meeting ends, your app can make the API call to obtain the transcript and recording for that meeting.

For more information about the meeting-specific RSC permissions, see [RSC permissions for a chat or meeting](../rsc/resource-specific-consent.md#rsc-permissions-for-a-chat-or-meeting).

> [!NOTE]
>
> RSC-based permissions for ad hoc calls aren't enabled.

### Get notified when a transcript or recording is available

After you configure the permissions, configure your app to receive [change notifications](/graph/teams-changenotifications-callrecording-and-calltranscript) for transcripts and recordings when available or all relevant meetings and ad hoc calls.
For online meetings, notifications contain meeting ID and organizer ID that help in accessing transcript content and recording. Your app can fetch the transcript and recording for a meeting when it's generated after the meeting ends.
For ad hoc calls, meeting ID won't be available as these are spontaneous events (PSTN, 1:1, group calls). While there are no restrictions on notifications path for ad hoc calls, `getAll` APIs aren't available for ad hoc call instances as well (For example, listing of artifacts at call level).
The content of the transcript is available as `.vtt` file. The recording of the meeting is available as an `.mp4` file.

You can use the following types of change notification for your app:

| Subscription Scope | Description | Supported resource paths |
| --- | --- | --- |
|Tenant level| A transcript or recording is available for any online meeting or call for a tenant​.| All transcripts in an organization: <br> • For online meetings: `communications/onlineMeetings/getAllTranscripts`<br> • For calls: `communications/adhocCalls/getAllTranscripts` <br> <br> All recordings in an organization: <br> • For online meetings: `communications/onlineMeetings/getAllRecordings` <br> • For calls: `communications/adhocCalls/getAllRecordings`|
|Meeting or Call level| A transcript or recording is available for a specific meeting or call.​ <br> | All transcripts for a specific meeting: `communications/onlineMeetings/{onlineMeetingId}/transcripts` <br> <br> All recordings for a specific meeting: `communications/onlineMeetings/{onlineMeetingId}/recordings` <br> <br> All transcripts for a specific ad hoc call: `/communications/adhocCalls/{callId}/transcripts` <br> <br> All recordings for a specific ad hoc call: `/communications/adhocCalls/{callId}/recordings`  |
|User-scoped| A transcript or recording is available for any online meeting organized or ad hoc call initiated by a specific user.​| A call transcript that becomes available in a meeting organized by a specific user or in a call where transcription is initiated by a specified user: <br> • For online meetings: `users/{userId}/onlineMeetings/getAllTranscripts` <br> • For ad hoc calls: `users/{userId}/adhocCalls/getAllTranscripts`<br> <br> A call recording that becomes available in a meeting organized by a specific user or in a call where transcription is initiated by a specified user: <br> • For online meetings: `users/{userId}/onlineMeetings/getAllRecordings` <br> • For ad hoc calls: `users/{userId}/adhocCalls/getAllRecordings`|
|App-scoped| A transcript or recording is available for any meeting in which a specific teams-app is installed. Not applicable for ad hoc calls. | A call transcript that becomes available in a meeting where a particular Teams app is installed: <br> • For online meetings: `appCatalogs/teamsApps/{id}/installedToOnlineMeetings/getAllTrancripts` <br> <br> A call recording that becomes available in a meeting where a particular Teams app is installed: <br> • For online meetings: `appCatalogs/teamsApps/{id}/installedToOnlineMeetings/getAllRecordings` <br>|

For more information about how your app can know when a transcript or recording is available after the online meeting or ad hoc call ends, see [get notified when transcripts and recordings are available](/graph/teams-changenotifications-callrecording-and-calltranscript).

For more information about how your app can know when the meetings ends, see [subscribe to change notifications](/graph/teams-changenotifications-callrecording-and-calltranscript).

> [!IMPORTANT]
>
> - The process for calling Graph APIs to access and retrieve transcripts and recordings remains the same for both meeting-specific RSC application permissions and organization-wide application permissions.
> - These APIs support private chat meetings, channel meetings, and ad hoc calls only in beta.
> - For ad hoc calls:
>   - Subscribe to [notifications](/graph/teams-changenotifications-callrecording-and-calltranscript) to get access to the call ID.
>   - To obtain the call ID while the call is still ongoing, have the app get called through [App-hosted/service-hosted Calls](/graph/api/resources/call?view=graph-rest-1.0&preserve-view=true) and use the `callChainId`.

## Get AI-generated meeting summaries for online meeting instances

Your app can directly fetch AI-generated meeting summaries, including conversation summaries, action items, and mentions using Meeting AI Insights API. For more information, see [get meeting insights with Meeting AI Insights API](meeting-insights.md).

## Code samples

| Sample name | Description | Node.js | C# |
| --- | --- | --- | --- |
| Online meeting transcript bot | This sample app retrieves meeting transcripts using Microsoft Graph API and displays them in a dialog. | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/meetings-transcription/nodejs) | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/meetings-transcription/csharp) |
| Online meeting transcripts recordings | This sample app retrieves Teams meeting transcripts and recordings using Graph APIs. | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/tab-meeting-transcript-recording/nodejs) | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/tab-meeting-transcript-recording/csharp) |
| Ad hoc calls transcripts and recordings | This sample app retrieves meeting transcripts and recordings using Graph APIs for ad hoc calls, including PSTN, 1:1, and group calls. | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/tab-adhoccalls-transcript-recording/nodejs) |  |

## Next step

> [!div class="nextstepaction"]
> [Get notified when the meeting transcripts and recordings are available](/graph/teams-changenotifications-callrecording-and-calltranscript)

## See also

- [Apps for Teams meetings and calls](../../apps-in-teams-meetings/teams-apps-in-meetings.md)
- [Meeting app APIs](../../apps-in-teams-meetings/meeting-apps-apis.md)
- [App manifest schema for Teams](../../resources/schema/manifest-schema.md)
- [Microsoft Graph API to get information about online meeting](/graph/api/resources/onlinemeeting)
- [Considerations when choosing an API](/graph/choose-online-meeting-api)
