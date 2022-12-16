---
title: Use Microsoft Graph to fetch transcripts for a Teams meeting
description: Describes the process, scenarios, and APIs to fetch transcripts in the post-meeting scenario.
ms.localizationpriority: high
ms.topic: conceptual
---
# Get meeting transcripts using Graph APIs

You can now configure your app to fetch Microsoft Teams meeting transcripts in the post-meeting scenario. Your app can use Microsoft Graph REST APIs to access and fetch transcripts generated for a Teams meeting that has been scheduled beforehand.

Here are some use cases for fetching meeting transcripts using Graph API:

| Use case | How Transcript APIs help... |
| --- | --- |
| You need to obtain transcripts for capturing meaningful insights from multiple meetings across the Sales vertical. It's time-consuming and inefficient to keep track of all meetings, and to retrieve meeting notes manually. After the meeting is over, you'd need to examine conversations in all those meetings to obtain useful information. | Using Graph APIs in your app to fetch meeting transcripts automatically retrieves the transcripts from all meetings relevant for your purpose. Your app can receive meeting notifications, and get the transcript when it's generated after the meeting ends. This data can then be used to gain: <br> • Aggregated insights and intelligence analysis <br> • New leads and highlights <br> • Meeting follow-ups and summaries |
| As an HR initiative, you're holding a brainstorming session to understand and improve employee health and productivity. Having to continually take notes to provide post-meeting summary can impede the flow of thoughts, and you might not capture all valuable suggestions. After the session, you'd need to analyze the discussion to gather data points for planning improvements. | Using Graph APIs in your app to fetch transcripts post-meeting frees you and the participants to fully focus on the discussion. The content of the meeting transcript is available for: <br> • Engagement and sentiment analysis <br> • Listing tasks or issues <br> • Follow-up meetings and notifications |

> [!NOTE]
> In the future, Microsoft may require you or your customers to pay additional fees based on the amount of data accessed through the API.

To fetch the transcript for a particular meeting:

- [Configure permissions on Azure AD to access transcript](#configure-permissions-on-azure-ad-to-access-transcript)
- [Obtain meeting ID and organizer ID](fetch-id.md)
- [Use Graph APIs to fetch transcript](/graph/api/resources/calltranscript)

## Configure permissions on Azure AD to access transcript

Your app must have the required permissions for fetching transcripts. It can access and fetch transcripts for a Teams meeting using organization-wide application permissions or resource-specific consent (RSC) application permissions for a particular meeting.

### Use organization-wide application permissions

You can configure your app to access meeting transcripts across the tenant. In this case, the meeting organizer doesn't need to install your app in the Teams meeting chat. When the tenant administrator authorizes the organization-wide application permissions, your app can read and access transcripts for all meetings in the tenant.

For more information about the organization-wide application permissions that can be granted to your app, see [online meeting permissions](/graph/permissions-reference#online-meetings-permissions).

### Use meeting-specific RSC application permissions

If you want your app to fetch transcripts only for the Teams meeting where it's installed, configure  meeting-specific RSC permission for your app. Authorized users can install your app in the meeting chat. After the meeting ends, your app can make the API call to obtain the transcript for that meeting.

For more information about the meeting-specific RSC permissions that can be granted to your app, see [resource-specific consent](../rsc/resource-specific-consent.md#resource-specific-permissions-for-a-chat).

After you've configured the permissions, configure your app to receive change notifications for all relevant meeting events. Notifications contain meeting ID and organizer ID that help in accessing transcript content. Your app can fetch the transcript for a meeting when it's generated after it ends. The content of the transcript is available as `.vtt` or `.docx` file.

For more information about how your app can know when the meetings ends, see [subscribe to change notifications](fetch-id.md#subscribe-to-change-notifications) and [use Bot Framework to get meeting ID and organizer ID](fetch-id.md#use-bot-framework-to-get-meeting-id-and-organizer-id).

> [!NOTE]
> The process for calling Graph APIs to access and retrieve transcripts remains the same for both meeting-specific RSC application permissions or organization-wide application permissions. These APIs currently support only scheduled meetings.

## Next step

> [!div class="nextstepaction"]
> [Obtain meeting ID and organizer ID](fetch-id.md)

## See also

- [Apps for Teams meetings and calls](../../apps-in-teams-meetings/teams-apps-in-meetings.md)
- [Meeting app APIs](../../apps-in-teams-meetings/meeting-apps-apis.md)
- [App manifest schema for Teams](../../resources/schema/manifest-schema.md)
