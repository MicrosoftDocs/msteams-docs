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

Recommendation for when using apps in personal scope:



## Notification






