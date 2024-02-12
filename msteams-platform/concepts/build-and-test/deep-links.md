---
title: Deep links overview
description: Learn how to create deep links and navigate using them in your Microsoft Teams apps with tabs.
ms.topic: how-to
ms.localizationpriority: high
ms.date: 04/13/2023
---

# Configure deep links

Deep links function as URLs that direct users straight to particular content within an app. In Microsoft Teams, you can use deep links to go to a specific chat, message, or tab within an app, among other things. They also enable certain operations, such as initiating a new chat or call, or sharing content during a meeting. For example, a deep link might be used to direct a user straight to a specific message within a chat, eliminating the need to navigate through several screens.

Here are some scenarios where you can build apps using deep links in Teams:

* Deep link to an app.

* Deep link to a chat.

* Deep link to a workflow.

:::image type="content" source="~/assets/images/deep-links.png" alt-text="Diagram that shows different scenarios for deep links.":::

* **Deep link to an app**: Open the app installation dialog, navigate within your app, and generate a deep link. This deep link enables navigation to your tab. Users of your app have the ability to browse the content within a tab. For example, your app might include a bot that sends messages to alert the user of significant activities. After the user selects the notification, the deep link directs them to the tab where they can see more details about the activity.

    For more information, see [deep link to an app](~/concepts/build-and-test/deep-link-application.md).

    :::image type="content" source="~/assets/images/deeplink-tasks.gif" alt-text="Graphical representation shows the user experience of deep links in tab app.":::

* **Deep link to a chat**: Use a deep link to navigate to a channel conversation, chat messages, or a file within a channel.

    For more information, see [deep link to a chat](~/concepts/build-and-test/deep-link-teams.md).

* **Deep link to a workflow**: You've the ability to generate a deep link to execute a specific task in Teams. Tasks might include initiating a new chat, opening a scheduling dialog, or navigating to an audio-video call. App users can benefit from an improved app experience by utilizing simplified or automated user tasks. These tasks include initiating a new chat or scheduling a meeting, which are made easier by prepopulating the deep links with necessary parameters.

    For more information, see [deep link to a workflow](~/concepts/build-and-test/deep-link-workflow.md).

    :::image type="content" source="~/assets/images/deeplink-schedule.gif" alt-text="Graphical representation shows the user experience of deep links to launch a meeting scheduling dialog.":::

The Microsoft Teams JavaScript library (TeamsJS) for navigation within your tab, such as navigating to content and information or launching a chat dialog. The TeamsJS typed APIs provide an improved experience and are recommended for Teams apps that may run in other hosts, such as Outlook or Microsoft 365 apps. These APIs also provide a way to check if the host supports the capability being used.

<!--- TBD: Edit this article.
* Admonitions/alerts seem to be overused. 
* An important alert at the end of this table does not make sense. Also, it has a code snippet inside it.
* List items in the table are not formatted well in output.
* Some headings use -ing verbs.
* Example values and some URLs should be in backticks and not emphasized.
* Codeblock are missing language.
* Check for markdownlint errors.
* Table with just a row isn't really needed. Provide the content without tabulating it.
--->
