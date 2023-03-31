---
title: Plan for Teams mobile
author: surbhigupta
description: With this learning module, you'll learn how to plan for creating an app on Teams mobile and understand different stages to build app.
ms.topic: conceptual
ms.localizationpriority: medium
ms.author: v-abirade
---
# Plan responsive tabs for Teams mobile

 Teams platform offers opportunity to build apps on mobile and desktop. Your app users can prefer either desktop or mobile, or both. The users can prepare data on desktop but consume and share more data using mobile. The key to build any app is to understand and meet users' needs. There are capabilities like bots, message extensions, and connectors that work seamlessly on desktop and mobile. However, building tabs and task modules require planning for hosting your web experience on Teams mobile. The article guides to plan your responsive web pages on Teams mobile.

## Identify apps scope

The following list provides the key information to plan building apps for Teams mobile:

* Consider cross-device functionality of Teams app. For example, if you've a well performing app on desktop, you can explore to build similar app on mobile. Initially, it can be difficult to shift entire desktop experience on mobile. You can start with basic but common scenarios. Add functionalities and capabilities after you gather more insight and user feedback.

* Ensure to target appropriate user persona on mobile. For example, if you're building an app that provides service to end users, and also provides data access to developers and senior managers, then the end users can use the app more while you start to build app on Teams mobile. You can cater to all the personas that you have on your desktop app however, it's recommended to start with persona with a larger base and possible early adopters for smaller screen experience. As per the example, the end users are the appropriate user personas. You can gradually add functionalities to support other user personas on your Teams mobile.

## Understand different stages to build apps

After you've identified the app scope, it's time to understand the following three stages to plan any app on Teams mobile and enhance user experience:

1. **Consumption**

   View apps on mobile. To build an app on mobile, you can start with the consumption experience. Since the mobile world has made scrolling for content a common practice, you can show relevant information. Use engagement mechanisms, such as notifications to inform updates.

2. **Quick actions**

   Use app on mobile. After your users start consuming the content on mobile, you can scale your app to the next level by migrating some actions from desktop app. You can optimize and build new actions for mobile.

3. **Enablement**

   Provide complete app experiences to engage on mobile. As your users engage with your app, provide full immersive experience on mobile, either at par or better than desktop experience. To provide good experience for your users, make all use cases responsive on mobile.

    > [!TIP]
    > To get information on the design guidelines, see [design process for Teams apps](design-teams-app-process.md).

## Use cases

Let us go through the following use cases to understand how to plan different types of apps for Teams mobile:

<br>

<details>

<summary><b>Dashboarding and data visualization apps</b></summary>

You can understand how to plan responsive tabs for dashboarding and data visualization apps on Teams mobile platform.

Consumption:

In the first stage, you can implement the most basic consumption experience, to view data. The purpose of any app in the domain is to show data in the form of visualizations. In your app, you can show recently viewed visualizations on desktop, or list of all authorized charts for the users. After creating dashboards on desktop, users can access the information using mobile. You can show a detailed view of any chart selected by user as an expanded view in your tabs or by using task modules.

You can show the following information:

* Dashboards and summaries.
* Data visuals, maps, and infographics.
* Charts, graphs, and tables.

:::image type="content" source="../../assets/images/app-fundamentals/dashboarding-and-data-visualization-apps-consumption.png" alt-text="Show the data in the form of visualization.":::

Quick actions:

In the second stage, the users can work on the existing charts and visuals from desktop experience. You can introduce the following actions:

* Search content.
* Filter data.
* Create bookmarks.

:::image type="content" source="../../assets/images/app-fundamentals/dashboarding-and-data-visualization-apps-quick-actions.png" alt-text="Quick actions on the existing chart and visuals.":::

Enablement:

In the third stage, enable users to create content such as, charts and graphics from scratch. Ensure to introduce all the capabilities in your app for mobile. For example, you can use task modules to help access specific data items with detailed view.

You can provide following access to users:

* Modify title and description.
* Insert data items to create visualizations.
* Share visualizations in a channel or group chat.

:::image type="content" source="../../assets/images/app-fundamentals/dashboarding-and-data-visualization-apps-enablement.png" alt-text="Enable users to create content such as charts graphics.":::

<br>

</details>

<br>

<details>

<summary><b>Task boarding apps</b></summary>

You can understand how to plan responsive tabs for task boarding apps on Teams mobile platform.

Consumption:

In the first stage, your app can show the list of tasks to the user in a vertical stack. If there are multiple categories of tasks, such as **Proposed**, **Active**, and **Closed** then provide filters for showing grouped tasks or as headers to see the grouped tasks.

:::image type="content" source="../../assets/images/app-fundamentals/taskboarding-apps-consumption.png" alt-text="Shows the list of tasks in a vertical stack.":::

Quick actions:

In the second stage, you can provide the following app access to users:

* Create tasks or items with the mandatory fields to reduce cognitive load of the users.
* Change the board type or view.
* Review tasks by expanding the view.
* Use task modules to see detailed view.
* Move the tasks into different categories.
* Share relevant tasks in chats and channels through emails and activity feed.

:::image type="content" source="../../assets/images/app-fundamentals/taskboarding-apps-quick-actions.png" alt-text="Create tasks to reduce cognitive load of the users.":::

Enablement:

In the third stage, you can enable users' experience with the following activities:

* Add new projects and boards.
* Add and modify different categories, such as **Proposed**, **Active**, and **Closed**.
* Configure the tasks for comments, attachments, and other complex features.

:::image type="content" source="../../assets/images/app-fundamentals/taskboarding-apps-enablement.png" alt-text="Enable the user experience by adding projects and boards.":::

<br>

</details>

<br>

<details>

<summary><b>Coauthoring and whiteboarding apps</b></summary>

You can understand how to plan responsive tabs for coauthoring and whiteboarding apps on Teams mobile platform.

Consumption:

In the first stage, you can consider desktop experience to show the content and assets in your app.  You can show the following functions:

* Comments or feedback.
* Zoom in or out.
* Current stage or progress of a pending document.

:::image type="content" source="../../assets/images/app-fundamentals/coauthoring-and-whiteboarding-apps-consumption.png" alt-text="Shows content and assets in desktop experience.":::

Quick actions:

In the second stage, you can introduce the following actions:

* Create new board for collaboration or new documents for signing.
* Share boards internally and also with guests.
* Configure admin permissions.

> [!TIP]
> You expose actions, which can be shown easily on the small screens.

:::image type="content" source="../../assets/images/app-fundamentals/coauthoring-and-whiteboarding-apps-quick-actions.png" alt-text="Introduces to create new board for collaboration.":::

Enablement:

In the third stage, provide complete experience to your users. You can enable users' experience with the following activities:

* Adding text, shapes, and quick notes.
* Navigate around content.
* Add layers and filters.
* Delete, undo, and redo operations.
* Access camera and microphone using TeamsJS APIs. For more information on device capabilities, see [device capabilities overview](../device-capabilities/device-capabilities-overview.md).

:::image type="content" source="../../assets/images/app-fundamentals/coauthoring-and-whiteboarding-apps-enablement.png" alt-text="Enable user experience by adding text shapes and quick notes and other capabilities.":::

<br>

</details>

## See also

* [Plan your app with Teams features](../app-fundamentals-overview.md)
* [Designing your tab](../../tabs/design/tabs.md)
* [Designing your bot](../../bots/design/bots.md)
* [Designing task modules](../..//task-modules-and-cards/task-modules/design-teams-task-modules.md)
* [Store validation guidelines](../deploy-and-publish/appsource/prepare/teams-store-validation-guidelines.md)
* [Tabs on mobile](../../tabs/design/tabs-mobile.md)
