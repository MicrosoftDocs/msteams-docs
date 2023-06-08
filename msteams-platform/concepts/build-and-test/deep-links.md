---
title: Deep links overview
description: Learn how to create deep links and navigate using them in your Microsoft Teams apps with tabs.
ms.topic: how-to
ms.localizationpriority: high
---

# Configure deep links

Deep links are a navigation mechanism that helps users to connect with features and information within Teams and Teams apps. The following are few scenarios where deep links are useful:

* App users can browse through the contents within a tab. For instance, your app can have a bot that sends messages notifying the user of an important activity. When the user selects the notification, the deep link navigates to the tab where the user can view more details about the activity.

  :::image type="content" source="~/assets/images/deeplink-tasks.gif" alt-text="Graphical representation shows the user experience of deeplinks in tab app.":::

* App users can enjoy enhanced app experience by using simplified or automated user tasks, such as creating a new chat and scheduling a meeting by pre-populating the deep links with required parameters.

  :::image type="content" source="~/assets/images/deeplink-schedule.gif" alt-text="Graphical representation shows the user experience of deeplinks to launch a meeting scheduling dialog.":::

Deep links can be categorized as follows:

:::image type="content" source="~/assets/images/deep-links.png" alt-text="Diagram that shows different scenarios for deep links.":::

* **Deep link to an app**: You can open the app install dialog, navigate within your app, and generate a deep link and navigate to your tab through [deep link to an app](~/concepts/build-and-test/deep-link-application.md).

* **Deep link to a chat**: You can navigate to a channel conversation, chat messages, and to file in a channel through [deep link to a chat](~/concepts/build-and-test/deep-link-teams.md).

* **Deep link to a workflow**: You can create a deep link to perform a specific task in Teams, such as to create a new chat, open a scheduling dialog, and navigate to audio-video call through [deep link to a workflow](~/concepts/build-and-test/deep-link-workflow.md).

The Microsoft Teams JavaScript client library (TeamsJS) can be used for navigation. For scenarios, such as navigating to content and information within your tab or launching a chat dialog, TeamsJS typed APIs provide improved experience. These APIs are recommended for Teams apps that might be run in other hosts (Outlook, Microsoft 365 app), as they also provide a way to check that the capability used is supported by the host.

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

## See also

[Integrate web apps](../../samples/integrate-web-apps-overview.md)
