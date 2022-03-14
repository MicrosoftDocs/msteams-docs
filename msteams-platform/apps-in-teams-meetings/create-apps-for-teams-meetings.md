---
title: Prerequisites for apps in Teams meetings
author: surbhigupta
description: Identify prerequisites with apps for Teams meetings 
ms.topic: conceptual
ms.author: lajanuar
ms.localizationpriority: medium
keywords: teams apps meetings user participant role api 
---

# Prerequisites for apps in Teams meetings

With apps for Teams meetings, you can expand the capabilities of your apps across the meeting lifecycle. Before you work with apps for Teams meetings, you must fulfill the following prerequisites:

* Know how to develop Teams apps. For more information on how to develop Teams app, see [Teams app development](../overview.md).

* Update the Teams app manifest to indicate that the app is available for meetings. For more information, see [app manifest](enable-and-configure-your-app-for-teams-meetings.md#update-your-app-manifest).

* Use your app that supports configurable tabs in the `groupchat` scope. Support the `groupchat` scope to enable your app in pre-meeting and post-meeting chats. For more information, see [group chat scope](../resources/schema/manifest-schema.md#configurabletabs) and [build a group tab](../build-your-first-app/build-channel-tab.md).

* Adhere to general Teams tab design guidelines for pre- and post-meeting scenarios. For experiences during meetings, refer to the in-meeting tab and in-meeting dialog design guidelines. For more information, see [Teams tab design guidelines](../tabs/design/tabs.md), [in-meeting tab design guidelines](../apps-in-teams-meetings/design/designing-apps-in-meetings.md#use-an-in-meeting-tab), and [in-meeting dialog design guidelines](../apps-in-teams-meetings/design/designing-apps-in-meetings.md#use-an-in-meeting-dialog).

* With the pre-meeting app experience, you can find and add meeting apps and do the pre-meeting tasks. With the post-meeting app experience, you can view the results of the meeting, such as poll survey results or fee.

* The `Meeting` API must have `meetingId`, `userId`, and `tenantId` as URL parameters. The parameters are available as part of the Teams Client SDK and bot activity. You can retrieve reliable information for user ID and tenant ID using [tab SSO authentication](../tabs/how-to/authentication/auth-aad-sso.md).

* The `GetParticipant` API must have a bot registration and ID to generate auth tokens. For more information, see [bot registration and ID](../build-your-first-app/build-bot.md).

* For your app to update in real time, it must be up-to-date based on event activities in the meeting. These events can be within the in-meeting dialog box and other stages across the meeting lifecycle. For the in-meeting dialog box, see completion `bot Id` parameter in `NotificationSignal` API.

The `MeetingDetails` API must have a bot registration and bot ID. It requires Bot SDK to get `TurnContext`. To use the Meeting Details API, you must obtain different RSC permissions based on the scope of any meeting, such as private meeting or channel meeting.

* For real-time meeting events, you must be familiar with the `TurnContext` object available through the Bot SDK. The `Activity` object in `TurnContext` contains the payload with the actual start and end time. Real-time meeting events require a registered bot ID from the Teams platform. The bot can automatically receive meeting start or end event by adding `ChannelMeeting.ReadBasic.Group` in the manifest.

After you've gone through the prerequisites, you can use the meeting apps API references `GetUserContext`, `GetParticipant`, `NotificationSignal`, and `Meeting Details` that enable you to access information using attributes and display relevant content.

> [!NOTE]
> Teams JavaScript SDK (_Version_: 1.10 and later) for SSO to work in meeting side panel.

## Next step

> [!div class="nextstepaction"]
> [Enable and configure your apps for Teams meetings](enable-and-configure-your-app-for-teams-meetings.md)

## See also

* [In-meeting dialog design guidelines](design/designing-apps-in-meetings.md#use-an-in-meeting-dialog)
* [Teams authentication flow for tabs](../tabs/how-to/authentication/auth-flow-tab.md)
* [Apps for Teams meetings](teams-apps-in-meetings.md)
* [Teams bot API changes to fetch team or chat members](~/resources/team-chat-member-api-changes.md)
