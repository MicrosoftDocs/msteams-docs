---
title: Deep links overview
description: Learn how to configure Teams deep links to an app, chat, teams and channels, and workflows. Learn the types of deep links and protocol handlers in deep links.
ms.topic: overview
ms.localizationpriority: high
ms.date: 12/11/2024
---

# Configure deep links

Deep links function as URLs that direct users straight to specific content within an app, thus eliminating the need to navigate through several screens. In Microsoft Teams, you can use deep links to go to a specific chat, message, or tab within an app. You can also use deep links to initiate a new chat or call and share content during a meeting. Deep links are primarily used for navigation within Teams and Teams apps; however, they can’t be used to create a temporary tab or a pop-up experience.

You can use deep links in Teams in the following ways:

* Deep link to an app
* Deep link to a chat
* Deep link to teams and channels
* Deep link to a workflow

:::image type="content" source="~/assets/images/deep-links.png" alt-text="Diagram shows various scenarios for deep links.":::

* **Deep link to an app**: Use a deep link to browse through the contents within a tab and open an app install dialog. For example, your app can have a bot that sends messages notifying the user of an important activity. When the user selects the notification, the deep link navigates to the tab where the user can view more details about the activity.

    For more information, see [deep link to an app](~/concepts/build-and-test/deep-link-application.md).

    :::image type="content" source="~/assets/images/deeplink-tasks.gif" alt-text="Graphical representation shows the user experience of deep links in tab app.":::

* **Deep link to a chat**: Use a deep link to navigate to a channel conversation, chat messages, or a file within a channel.

    For more information, see [deep link to a chat](~/concepts/build-and-test/deep-link-teams.md).

    :::image type="content" source="~/assets/images/deeplink-chat.gif" alt-text="Graphical representation shows the user experience of deep links in chat.":::

* **Deep link to teams and channels**: Use a deep link to navigate to a particular team or channel. For more information, see [deep link to a channel](deep-link-teams.md#deep-link-to-navigate-to-channel).

    :::image type="content" source="~/assets/images/deeplink-teams-and-channels.gif" alt-text="Graphical representation that shows the user experience of deep links in group chat.":::

* **Deep link to a workflow**: Use a deep link to create a new chat, open a scheduling dialog, or navigate to an audio-video call. App users can benefit from an improved app experience by utilizing simplified or automated user tasks. These tasks include initiating a new chat or scheduling a meeting that can be made easier by prepopulating the deep links with necessary parameters.

    For more information, see [deep link to a workflow](~/concepts/build-and-test/deep-link-workflow.md).

    :::image type="content" source="~/assets/images/deeplink-schedule.gif" alt-text="Graphical representation shows the user experience of deep links to launch a meeting scheduling dialog.":::

You can use the Microsoft Teams JavaScript client library (TeamsJS) to navigate within your tab. For scenarios such as navigating to content and information or launching a chat dialog, the TeamsJS typed APIs provide an improved experience. We recommend using TeamsJs typed APIs for Teams apps that might run in Outlook or Microsoft 365 apps. They also provide a way to check if the host supports the capability used.

> [!NOTE]
> To redirect users from your Teams app to its native experience through a deep link with a protocol such as `tel:`, `mailto:`, or `webex:`, launch the deep link in a new window by calling the `window.open` method or using an anchor tag with `target="_blank"`.

## Protocol handlers in deep links

Teams deep links support two types of protocol handlers:

1. **HTTPS**: The `https://` protocol handler is the default handler in most URLs. Using this protocol handler in a Teams deep link opens it in a browser window that gives you three options:
    1. Open the deep link in the Teams desktop client if it's installed
    2. Download the Teams desktop client if it's not installed
    3. Open the deep link in the Teams web client

    :::image type="content" source="../../assets/images/deep-link-open.png" alt-text="Screenshot shows a deep link opened in a browser.":::

    > [!NOTE]
    > A deep link must start with `https://teams.microsoft.com/l/` to ensure that it's handled correctly by Teams. Teams URLs copied from the browser's address bar don't work as deep links in the new Teams client.

2. **MSTEAMS**: The `msteams://` protocol handler skips the client selection screen in the browser and opens the deep link directly in the Teams desktop client. Users who don't have the Teams desktop client might not be able to access deep links with `msteams://`. Always use `https://` in deep links unless you're certain that your app's users have the desktop client on their device.

    > [!CAUTION]
    > Don't append `msteams:` to a `https://` deep link such as `msteams:https://teams.microsoft.com/l/call/0/0` as Teams can't parse this deep link as a valid URL object.

## See also

[Integrate web apps](../../samples/integrate-web-apps-overview.md)
