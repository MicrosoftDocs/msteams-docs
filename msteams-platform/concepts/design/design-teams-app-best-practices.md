---
title: Best practices
author: KirtiPereira
description: Learn about the best practices to use the Microsoft Teams capabilities to develop an app. 
ms.author: surbhigupta
ms.topic: reference
localization_priority: Normal
---

# Best practices

Develop an app that provides enhanced user-experience by applying best practices when designing it.

## Adaptive Cards

Following are the recommendations on when to use Adaptive Cards in your app:

* **Simplify multi-turn bot conversations**: If events or queries have a linear flow and you are using bots to manage such conversations, use Adaptive Cards to get information from the user in one go.

    :::image type="content" source="../../assets/images/design-guidelines/best-practice-adaptive-card-conversation.png" alt-text="Example of simplifying multi-turn bot conversations." border="false":::

* **Design task modules using Adaptive Cards**: Use an Adaptive Card JSON inside task module to save some operational overheads and get a view that merges into the Teams theme and design.

    :::image type="content" source="../../assets/images/design-guidelines/best-practice-adaptive-card-task-module.png" alt-text="Example of a task module developed using an Adaptive Card." border="false":::

* **Notify status change**: If you want to allow your users to view the status change of an activity without going through detailed information.

    :::image type="content" source="../../assets/images/design-guidelines/best-practice-adaptive-card-notify-status.png" alt-text="Example of Adaptive Card usage to notify change in status." border="false":::
 
* **Hide non-important information**: If you want to hide unimportant information from the user, but if the user so wishes can access it by just selecting a button.

    :::image type="content" source="../../assets/images/design-guidelines/best-practice-adaptive-card-hide-conversation.png" alt-text="Example of Adaptive Card usage to hide non-critical information." border="false":::

* **Leverage rich input capabilities**: In addition to textual input, if you want to leverage rich input capabilities by using native input types, such as date picker, time picker, and so on whenever you need specialized input from the user.

    :::image type="content" source="../../assets/images/design-guidelines/best-practice-adaptive-card-input-capabilities.png" alt-text="Example of leveraging native input capabilities using Adaptive Card." border="false":::

* **Add visual cues**: If you want to suggest the outcome of various actions to the users, add the right emoticons to the action buttons in an Adaptive Card.

    :::image type="content" source="../../assets/images/design-guidelines/best-practice-adaptive-card-emoticons.png" alt-text="Example of using emoticons to provide visual cues." border="false":::

* **Specialized scenarios**: If you want to allow users to download a file or deep-linking users to tab, chat, or channel, as these scenarios can be executed without invoking an intrusive task module by using an Adaptive Card.

    :::image type="content" source="../../assets/images/design-guidelines/best-practice-adaptive-card-specialized-scenarios.png" alt-text="Example of specialized scenarios." border="false":::

* **Avoid over usage of Adaptive Card**: Do not use an Adaptive Card for very simple flows.

    :::image type="content" source="../../assets/images/design-guidelines/best-practice-adaptive-card-overuse.png" alt-text="Example of over usage of Adaptive Card." border="false":::

* **Avoid dead ends**: Ensure that you provide next steps to the users in the form of action buttons to avoid dead ends in a flow.

    :::image type="content" source="../../assets/images/design-guidelines/best-practice-adaptive-card-dead-end.png" alt-text="Example of avoiding dead end when using Adaptive Card." border="false":::

## Engage customers within Teams

Following are the recommendations on how to enhance user-experience without taking them away from the Teams:

* **Engage customers**: Complete all scenarios end-to-end inside the Teams experience.

    :::image type="content" source="../../assets/images/design-guidelines/best-practice-engage-customers.png" alt-text="Example of how to keep the user engaged." border="false":::

* **Notify updates**: Always inform users of any important update through a bot message.

* **Help users on the Tab configuration page**: Provide clear and concise steps when the user is on the Tab Configuration page, and avoid dead ends.

* **Usage of Adaptive Card**: Use Adaptive Card for Help command instead of just plain text conversations.

* **Type less, select more**: Don't make the users type textual command formats, when the same can be achieved by using buttons.

* **User's feedback**: Always request for user feedback to improve the next iteration of the app.

* **Track the bots performance**: Ensure that the bot responds within two seconds. If there is a delay, then a typing indicator must always be indicated.

* **Track the tabs performance**: Ensure that any tab is loaded within 5 seconds. If there is a delay, then a skeleton of the page or a loading indicator must be displayed.

* **Design guidelines**: Follow the Teams [design guidelines](design-teams-app-overview.md) for fonts, tone of voice, color, and so on.

* **Queries in message extensions**: Search-based message extensions must not show an empty area.

* **Bot must provide tab information**: Provide pinned tab information through a bot.

## First run experience in collaborative space

Recommendations for when running your app in a collaborative space:

* **Tab configuration page**: Keep the attention of the user by providing a snapshot of the overall tab experience of the app without being too verbose.

* **Pre-fill input fields**: Save time for users by pre-filling some input fields and providing hints for fields that require their inputs.

* **Default name of the tab**: Provide a default name to the tab that self-explains the functionality of your app.

* **Welcome message**: If your app has a bot,use it to post a welcome message in the channel or group that delivers features of the app that aids collaboration.

* **Scope of a bot**: A bot designed to be used in a personal space may not support commands in a collaborative space. Therefore, you must inform the users that they might want to check the personal app to use the relevant commands.

* **Sign out button**: Provide the sign out button to the users to exit the app.

    > [!NOTE]
    > This is a critical requirement for app developers and needs attention while designing the tab view.

* **Settings option in tab header**: Always provide the **Settings** option in the tab header to help users reconfigure a tab page with ease.

* **Help access**: Provide CTA to the users to access help by providing a deep-link to the personal help tab or open a hyperlink in a browser.

    > [!NOTE]
    > It is a better option to keep the users inside Teams by providing a deep-link.

* **In-app navigation**: Provide the navigation path in form of *breadcrumb* or *hamburger menu*, if your app displays multi-levels of view inside a tab.

## First run experience in personal scope

## Notification






