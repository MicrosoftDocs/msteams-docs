---
title: Deep links overview
description: Learn how to create deep links and navigate using them in your Microsoft Teams apps with tabs.
ms.topic: how-to
ms.localizationpriority: high
---

# Create deep links

Deep links are a navigation mechanism that helps users to connect with features and information within Teams and Teams app. Some scenarios where creating deep links can be useful are as follows:

* Navigating the user to the content within one of your app's tabs. For instance, your app can have a bot that sends messages notifying the user of an important activity. When the user taps on the action on adaptive sent by the bot, the deep link navigates to the tab so that the user can view more details about the activity.
* Your app automates or simplifies certain user tasks. You can  create a chat or schedule a meeting by pre-populating the deep links with required parameters. Avoids the need for users to manually enter information.

The Microsoft Teams JavaScript client library (TeamsJS) simplifies the process of navigation. For many scenarios, such as navigating to content and information within your tab or launching a chat dialog. TeamsJS provides typed APIs that provide improved experience and can replace the usage of deep links. These APIs are recommended for Teams apps that might be run in other hosts (Outlook, Microsoft 365 app), as they also provide a way to check that the capability being used is supported by that host.

[!INCLUDE [sdk-include](~/includes/sdk-include.md)]

:::image type="content" source="~/assets/images/deep-links.png" alt-text="Diagram that shows different scenarios for deep links.":::

You can open the application profile dialog, navigate within your app, and generate a deep link and navigate to your tab through [deep link to an application](~/concepts/build-and-test/deep-link-application.md).

You can navigate to a channel conversation, chat messages, and to file in a channel through [deep links to a chat](~/concepts/build-and-test/deep-link-teams.md).

You can create a [deep link to perform a specific task](~/concepts/build-and-test/deep-link-workflow.md) in Teams, such as to create a new chat, open a scheduling dialog, and navigate to audio-video call.

> [!NOTE]
> The behavior of deep links is dependent on a number of factors. The following list outlines the behavior of deep links on Teams entities.
>
> **Tab**:  
> ✔ Directly navigates to the deep link URL.
>
> **Bot**:  
> ✔ Deep link in card body: Opens in browser first.  
> ✔ Deep link added to OpenURL action in Adaptive Card: Directly navigates to the deep link url.  
> ✔ Hyperlink markdown text in the card: Opens in browser first.  
>
> **Chat**:  
> ✔ Text message hyperlink markdown: Directly navigates to deep link url.  
> ✔ Link pasted in general chat conversation: Directly navigates to deep link url.
>
>
>The navigation behavior of a Teams app extended across Microsoft 365 (Outlook/Microsoft 365 app) is dependent on two factors:
>
> * The target that the deep link points to.
> * The host where the Teams app is running.
>
> If the Teams app is running within the host where the deep link is targeted, your app opens directly within the host. However, if the Teams app is running in a different host from where the deep link is targeted, the app opens in a browser first.

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

* [Integrate web apps](~/samples/integrate-web-apps-overview.md)
* [Moodle LMS](~/resources/moodleinstructions.md)
