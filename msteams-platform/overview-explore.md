---
title: Use Teams Platform to Build Apps 
author: heath-hamilton
description: Learn about Teams platform capabilities such as tabs, bots, message extensions, webhooks, connectors, Microsoft Graph, Adaptive Card, and Copilot extensibility.
ms.topic: overview
ms.localizationpriority: high
ms.date: 10/11/2024
---

# Explore Teams Platform Features

With Teams, you can build your app in a feature-rich environment that extends the functionality of your desktop and mobile solutions. Leverage Teams as a platform to integrate advanced capabilities into your applications. Choose the best features to suit your app's requirements.

:::image type="content" source="../msteams-platform/assets/images/overview/what-is-m365-dev-plat.png" alt-text="Graphic shows the conceptual representation of Teams as a platform and its capabilities." lightbox="../msteams-platform/assets/images/overview/what-is-m365-dev-plat.png":::

## Teams App Features

[!INCLUDE [deprecation-note](~/includes/deprecation-note.md)]

Below is a detailed table outlining the available Teams platform features, their descriptions, and common use cases:

| Feature | Description | Useful for |
| --- | --- | --- |
| Tabs | Tabs are Teams-aware webpages embedded within Microsoft Teams. They can be integrated as part of a channel within a team, a group chat, or a personal app for individual users. | Personal tabs, channel or group tabs, Stage View, and link unfurling. |
| Bots | Bots (or chatbots) utilize artificial intelligence to understand and respond using natural language. They support both simple and complex interactions, serving as dynamic conversation partners that provide access to various services. | Customer service, content generation (e.g., creating sales presentations or code), personalized app guidance, complex financial analysis, and task automation. |
| Message extension | Message extensions allow users to interact with external web services directly from the Teams client. They facilitate searches or initiate actions in external systems, returning results as richly formatted cards within Teams. | Reserving resources with visual confirmation of the reserved time slot, searching and sharing work items as Adaptive Cards, or creating and assigning bugs from a conversation. |
| Meeting extensions | Meeting extensions enable you to develop apps that boost meeting productivity. | Conducting surveys during meetings or sending unobtrusive reminders that enhance meeting flow without disruptions. |
| Personal app | A personal app offers a dedicated space (via a tab or bot) for users to manage their tasks and view personalized activities. | Examples include OneNote, which provides a private workspace, or Planner, which displays a comprehensive view of tasks across multiple boards. |
| Webhooks and connectors | Webhooks and connectors facilitate communication with external applications, enabling the sending and receiving of notifications and messages. | Subscribing to and receiving notifications from your external web services. |
| Microsoft Graph | Microsoft Graph APIs empower Teams apps to integrate collaborative features by leveraging Microsoft 365 data. They support interactive features like activity feed notifications. | Sending activity feed notifications, managing messages (export/import), retrieving meeting transcripts and recordings, leveraging resource-specific consent (RSC) permissions, and performing CRUD operations on users, chats, channels, and apps. |
| Adaptive Card | Adaptive Cards organize information into structured, interactive groups. They allow users to interact with content such as texts, images, and input forms. | Sharing information through text and images, and gathering user input through interactive forms. |
| Dialogs (referred as task modules in TeamsJS v1.x) | Dialogs (or task modules) allow you to create modal pop-up experiences within your Teams application. | Executing custom HTML or JavaScript, or displaying <iframe>-based widgets like YouTube or Microsoft Stream videos. |
| Copilot extensibility | Copilot extensibility enables you to customize and extend Microsoft 365 Copilot by integrating additional organizational knowledge and skills. | Generating unique insights, automating customer support functions, creating content, and performing data analysis using organization-specific data. |

For more information about extending Microsoft 365 Copilot, see [Microsoft 365 Copilot extensibility](/microsoft-365-copilot/extensibility/).

### Extend Your Teams App Across Microsoft 365

If you already have some Teams apps built, you can extend them across Microsoft 365, making them accessible in applications like Outlook and other Microsoft 365 services. This integration broadens your app's functionality and reach.

:::image type="content" border="false" source="assets/images/overview/app-manifest.png" alt-text="Screenshot shows you the configuration of properties in app manifest." lightbox="assets/images/overview/app-manifest.png":::

## Next Step

You've taken a brief tour of the diverse Teams platform features. Now it's time to explore how to apply these features when building your own app. Consider the following practical scenarios:

1. Develop a personal productivity app that leverages tabs and bots to provide task management and personalized guidance.
2. Implement a message extension to allow users to search for and share work items directly within a chat.
3. Customize meeting experiences using meeting extensions to conduct live surveys during team calls.
4. Integrate Microsoft Graph to ensure your app can manage user data and notifications effectively.
5. Utilize Adaptive Cards for creating interactive and engaging content sharing mechanisms.

Ready to dive into development? Let's head towards the solution for the user story.

> [!div class="nextstepaction"]
> [The Teams solution](overview-solution.md)