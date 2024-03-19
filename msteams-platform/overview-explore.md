---
title: Exploring Teams as a platform for building apps
author: heath-hamilton
description: Teams platform provides capabilities to apps such as tabs, bots, message extensions, webhooks, connectors, cards, and dialogs.
ms.topic: overview
ms.localizationpriority: high
ms.date: 11/02/2021
---

# Explore Teams app capabilities

With Teams, you can build your app in a feature-rich environment. Using Teams as a platform for building apps, you can extend the Teams features as capabilities for your desktop and mobile apps.

:::image type="content" source="../msteams-platform/assets/images/overview/what-is-m365-dev-plat.png" alt-text="Screenshot shows the capabilities of Teams as a platform." lightbox="../msteams-platform/assets/images/overview/what-is-m365-dev-plat.png":::

## Teams app capabilities

Teams platform provides the following capabilities to build your app:

:::row:::

   :::column span="":::

### Message extensions

Message extensions help search or start actions in an external system and send the result of the interaction in Teams. Message extensions can be enhanced with AI capabilities with Microsoft Copilot.

   :::column-end:::

   :::column span="":::

:::image type="content" source="assets/images/overview-messaging-extensions-2021.png" alt-text="Diagram shows a message extension in Teams.":::

   :::column-end:::

:::row-end:::

:::row:::

   :::column span="":::

### Tabs

Tabs are Teams-aware webpages embedded in Microsoft Teams. Add tabs as part of a channel, group chat, or a personal app. Tabs can also unfurl links and be used to share Stage View.

   :::column-end:::

   :::column span="":::

:::image type="content" source="assets/images/overview-channel-chat-apps-2021.png" alt-text="Diagram shows a tab app in Teams.":::

   :::column-end:::

:::row-end:::

:::row:::
   :::column span="":::

### Bots

Bots automate simple and repetitive tasks like answering questions or provide access to services through conversations. Use bots in apps for customer service or to provide information.

   :::column-end:::

   :::column span="":::

:::image type="content" source="assets/images/overview-bots-2021.png" alt-text="Diagram shows a bot app in Teams.":::

   :::column-end:::

:::row-end:::

:::row:::

   :::column span="":::

### Meeting extensions

Meeting extensions make meetings more productive. Use these apps to take a poll during a call or send a reminder without breaking the flow of the call.

   :::column-end:::

   :::column span="":::

:::image type="content" source="assets/images/overview-meeting-extensions-2021.png" alt-text="Diagram shows a meeting extension in Teams.":::

   :::column-end:::
:::row-end:::

:::row:::

   :::column span="":::

### Webhooks and connectors

Webhooks and connectors help send or receive notifications and messages from other apps. For example, apps that send notifications and messages from your web services to users in Teams.

   :::column-end:::

   :::column span="":::

:::image type="content" source="assets/images/overview-connectors.png" alt-text="Diagram shows a webhook in Teams.":::

   :::column-end:::
:::row-end:::

:::row:::

   :::column span="":::

### Cards

Organize information into richly formatted cards and let users interact with specific parts of the card. For example, apps that gather information using input forms.

   :::column-end:::

   :::column span="":::

:::image type="content" source="assets/images/overview-adaptive-cards-2021.png" alt-text="Diagram shows an Adaptive Card in Teams.":::

   :::column-end:::
:::row-end:::

:::row:::

   :::column span="":::

### Dialogs

Create modal pop-up experiences in your app with dialogs. They help run your own custom HTML or JavaScript code or show an `iframe`-based widget such as a Microsoft Stream video.

   :::column-end:::

   :::column span="":::

:::image type="content" source="assets/images/overview-personal-apps-2021.png" alt-text="Diagram shows a dialog in Teams.":::

   :::column-end:::
:::row-end:::

:::row:::

   :::column span="":::

### The user story

To understand how to use Teams apps to provide solutions for your users, consider the following scenario:

:::image type="content" source="../msteams-platform/assets/images/overview/developer-scenario.png" alt-text="Screenshot shows a scenario of a notification bot that sends weather forecast to customers who want to plan for travel." lightbox="../msteams-platform/assets/images/overview/developer-scenario.png":::

You can pick the following features to build an app:

| Feature | Description |
| --- | --- |
| Bot | Create a notification bot app to check and send weather forecast details based on user's travel date and travel location |
| Microsoft Graph | - Register users on the app <br>- Integrate the app with an external weather forecast API to connect and request forecast for specific date and location |

### Extend your Teams app across Microsoft 365

You can extend your Teams app across the Microsoft 365 ecosystem by configuring it to be accessible over Outlook and Microsoft 365.

:::image type="content" border="false" source="assets/images/overview/app-manifest.png" alt-text="Screenshot shows you the configuration of properties in the Teams app manifest." lightbox="assets/images/overview/app-manifest.png":::

## Next step

> [!div class="nextstepaction"]
> [Build your first Teams app](get-started/build-your-first-app.md)
