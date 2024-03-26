---
title: Deep links overview
description: Learn how to create deep links and navigate using them in your Microsoft Teams apps with tabs.
ms.topic: how-to
ms.localizationpriority: high
ms.date: 04/13/2023
---

# Configure deep links

Deep links function as URLs that direct users straight to specific content within an app thereby eliminating the need to navigate through several screens. In Microsoft Teams, you can use deep links to go to a specific chat, message, or tab within an app. You can also use deep links to initiate a new chat or call and share content during a meeting.

You can use deep links in Teams in the following ways:

* Deep link to an app.

* Deep link to a chat.

* Deep link to a workflow.

:::image type="content" source="~/assets/images/deep-links.png" alt-text="Diagram that shows different scenarios for deep links.":::

* **Deep link to an app**: Use a deep link to browse through the contents within a tab and open an app install dialog. For example, your app can have a bot that sends messages notifying the user of an important activity. When the user selects the notification, the deep link navigates to the tab where the user can view more details about the activity.

    For more information, see [deep link to an app](~/concepts/build-and-test/deep-link-application.md).

    :::image type="content" source="~/assets/images/deeplink-tasks.gif" alt-text="Graphical representation shows the user experience of deep links in tab app.":::

* **Deep link to a chat**: Use a deep link to navigate to a channel conversation, chat messages, or a file within a channel.

    For more information, see [deep link to a chat](~/concepts/build-and-test/deep-link-teams.md).

    :::image type="content" source="~/assets/images/deeplink-chat.gif" alt-text="Graphical representation shows the user experience of deep links in chat.":::

* **Deep link to a workflow**: Use a deep link to create a new chat, open a scheduling dialog, or navigate to an audio-video call. App users can benefit from an improved app experience by utilizing simplified or automated user tasks. These tasks include initiating a new chat or scheduling a meeting, which are made easier by prepopulating the deep links with necessary parameters.

    For more information, see [deep link to a workflow](~/concepts/build-and-test/deep-link-workflow.md).

    :::image type="content" source="~/assets/images/deeplink-schedule.gif" alt-text="Graphical representation shows the user experience of deep links to launch a meeting scheduling dialog.":::

You can use the Microsoft Teams JavaScript client library (TeamsJS) to navigate within your tab. For scenarios such as navigating to content and information or launching a chat dialog. The TeamsJS typed APIs provide an improved experience and are recommended for Teams apps that might run in Outlook or Microsoft 365 apps. They also provide a way to check that the capability used is supported by the host.

> [!NOTE]
> To redirect users from your Teams app to its native experience through a deep link with a protocol such as `tel:`, `mailto:`, or `webex:`, launch the deep link in a new window by calling the `window.open` method or using an anchor tag with `target="_blank"`.
