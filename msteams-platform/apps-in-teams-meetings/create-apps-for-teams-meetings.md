---
title: Prerequisites for apps in Teams meetings
author: surbhigupta
description: Identify prerequisites with apps for Teams meetings 
ms.topic: conceptual
ms.author: lajanuar
localization_priority: Normal
keywords: teams apps meetings user participant role api 
---

# Prerequisites for apps in Teams meetings

With apps for Teams meetings, you can expand the capabilities of your apps across the meeting lifecycle.

Before you work with apps for Teams meetings, you must fulfill the following prerequisites:

* Prior knowledge of how to develop Teams apps. For more information, see [Teams app development](../overview.md).

* Teams app manifest must be updated to indicate that the app is available for meetings. For more information, see [app manifest](enable-and-configure-your-app-for-teams-meetings.md#update-your-app-manifest).

* Configurable tabs must be supported in your app in the groupchat scope, for your app to function in the meeting lifecycle as a tab. For more information, see [group chat scope](../resources/schema/manifest-schema.md#configurabletabs) and [build a group tab](../build-your-first-app/build-channel-tab.md).

* General Teams tab design guidelines must be adhered to for pre and post-meeting scenarios. For experiences during meetings, refer to the in-meeting tab and in-meeting dialog design guidelines. For more information, see [Teams tab design guidelines](../tabs/design/tabs.md), [in-meeting tab design guidelines](../apps-in-teams-meetings/design/designing-apps-in-meetings.md#use-an-in-meeting-tab), and [in-meeting dialog design guidelines](../apps-in-teams-meetings/design/designing-apps-in-meetings.md#use-an-in-meeting-dialog).

* `groupchat` scope must be supported to enable your app in pre-meeting and post-meeting chats. With the pre-meeting app experience, you can find and add meeting apps and do pre-meeting tasks. With post-meeting app experience, you can view the results of the meeting, such as poll survey results or feedback.

* Meeting API URL parameters must have `meetingId`, `userId`, and `tenantId`. These parameters are available as part of the Teams Client SDK and bot activity. Also, you can retrieve reliable information for user ID and tenant ID using [tab SSO authentication](../tabs/how-to/authentication/auth-aad-sso.md).

* The `GetParticipant` API must have a bot registration and ID to generate auth tokens. For more information, see [bot registration and ID](../build-your-first-app/build-bot.md).

* For your app to update in real time, it must be up-to-date based on event activities in the meeting. These events can be within the in-meeting dialog box and other stages across the meeting lifecycle. For the in-meeting dialog box, check the completion `bot Id` parameter in `NotificationSignal` API.

* Meeting Details API must have a bot registration and bot ID. It requires Bot SDK to get `TurnContext`.

* For real-time meeting events, you must be familiar with the `TurnContext` object available through the Bot SDK. The `Activity` object in `TurnContext` contains the payload with the actual start and end time. Real-time meeting events require a registered bot ID from the Teams platform.

## See also

* [In-meeting dialog design guidelines](design/designing-apps-in-meetings.md#use-an-in-meeting-dialog)
* [Teams authentication flow for tabs](../tabs/how-to/authentication/auth-flow-tab.md)
* [Apps for Teams meetings](teams-apps-in-meetings.md)

## Next step

> [!div class="nextstepaction"]
> [Meeting apps API references](API-references.md)
