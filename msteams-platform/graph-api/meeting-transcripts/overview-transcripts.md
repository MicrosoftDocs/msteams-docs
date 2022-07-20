---
title: Use Microsoft Graph to fetch transcripts for a Teams meeting
description: Describes the process, scenarios, and APIs to fetch transcripts in the post-meeting scenario.
ms.localizationpriority: high
ms.topic: concept
---
# Get meeting transcripts using Graph APIs

You can now configure your app to fetch Microsoft Teams meeting transcripts in the post-meeting scenario. Your app can use Microsoft Graph REST APIs to access and fetch transcripts generated for a Teams meeting that has been scheduled beforehand.

Here are some use cases for fetching meeting transcripts using Graph API:

| Use case | How Transcript APIs help... |
| --- | --- |
| You need to obtain transcripts for capturing meaningful insights from multiple meetings across the Sales vertical. It's time-consuming and inefficient to keep track of all meetings, and to retrieve meeting notes manually. After the meeting is over, you'd need to examine conversations in all those meetings to obtain useful information. | Using your app to fetch meeting transcripts automatically retrieves the transcripts from all meetings relevant for your purpose. Your app can receive meeting notifications, and get the transcript when it's generated after the meeting ends. This data can then be used to gain: <br> • Aggregated insights and intelligence analysis <br> • New leads and highlights <br> • Meeting follow-ups and summaries |
| As an HR initiative, you're holding a brainstorming session to understand and improve employee health and productivity. Having to continually take notes to provide post-meeting summary can impede the flow of thoughts, and you might not capture all valuable suggestions. After the session, you'd need to analyze the discussion to gather data points for planning improvements. | Using Graph APIs to fetch transcripts post-meeting frees you and the participants to fully focus on the discussion. The content of the meeting transcript is available for: <br> • Engagement and sentiment analysis <br> • Listing tasks or issues <br> • Follow-up meetings and notifications |

To fetch the transcript for a particular meeting:

- [Configure permissions on Azure AD to access transcript](#configure-permissions-on-azure-ad-to-access-transcript)
- [Obtain meeting ID and organizer ID](fetch-id.md)
- [Use Graph APIs to fetch transcript](api-transcripts.md)

## Configure permissions on Azure AD to access transcript

Your app must have the required permissions for fetching transcripts. It can access and fetch transcripts for a Teams meeting using organization-wide application permissions or Resource-specific consent (RSC) application permissions for a particular meeting.

### Use organization-wide application permissions

You can configure your app to access meeting transcripts across the tenant. In this case, the meeting organizer doesn't need to install your app in the Teams meeting chat. When the tenant administrator authorizes the organization-wide application permissions, your app can read and access transcripts for all meetings in the tenant.

For more information about the organization-wide application permissions that can be granted to your app, see [Online meeting permissions](/graph/permissions-reference.md#online-meetings-permissions).

### Use meeting-specific RSC application permissions

If you want your app to fetch transcripts only for the Teams meeting where it's installed, configure  meeting-specific RSC permission for your app. Authorized users can install your app in the meeting chat. After the meeting ends, your app can make the API call to obtain the transcript for that meeting.

For more information about the meeting-specific RSC permissions that can be granted to your app, see [Resource-specific permissions for a chat](/graph-api/rsc/resource-specific-consent.md#resource-specific-permissions-for-a-chat).

After you've configured the permissions, configure your app to receive change notifications for all relevant meeting events. Notifications contain meeting ID and organizer ID that help in accessing transcript content. Your app can fetch the transcript for a meeting when it's generated after it ends. The content of the transcript is available as `.vtt` or `.docx` file.

For more information about how your app can know when the meetings ends, see [Subscribe to change notifications](/graph-api/meeting-transcripts/fetch-id.md#subscribe-to-change-notifications) and [Use Bot Framework to get meeting ID and organizer ID](/graph-api/meeting-transcripts/fetch-id.md#use-bot-framework-to-get-meeting-id-and-organizer-id).

> [!NOTE]
> The process for calling Graph APIs to access and retrieve transcripts remains the same for both meeting-specific RSC application permissions or organization-wide application permissions. These APIs currently support only scheduled meetings.

## Next step

> [!div class="nextstepaction"]
> [Obtain meeting ID and organizer ID](fetch-id.md)

## See also

- [Resource-specific consent](/graph-api/rsc/resource-specific-consent)
- [Online meeting permissions](/graph/permissions-reference.md#online-meetings-permissions)
- [Meeting apps API references](../../apps-in-teams-meetings/API-references.md#meeting-apps-api-references)
