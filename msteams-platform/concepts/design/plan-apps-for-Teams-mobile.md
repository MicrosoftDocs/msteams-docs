---
title: Plan for Teams mobile
author: surbhigupta
description: Guide to plan for creating an app on Teams mobile 
ms.topic: conceptual
ms.localizationpriority: medium
ms.author: v-abirade
---
# Plan apps for Teams mobile

 Teams platform offers opportunity to build apps on mobile and desktop. Your app users can prefer either desktop or mobile, or both. The users can prepare data on desktop, but consume and share more data using mobile. The key to build any app is to understand and meet users' needs. The document guides to build your apps on Teams mobile.

## Identify apps scope

The following list provides the key information to plan building apps for Teams mobile:

* Consider cross-device functionality of Teams app. For example, if you have well performing app on desktop, you can explore to build similar app on mobile. Initially, it can be difficult to shift entire desktop experience on mobile. You can start with basic but common scenarios. Add functionalities and capabilities after you gather more insight and user feedback.

* Ensure to target appropriate user persona on mobile. For example, if you build an app to provide service to end users, and provide data access to developers or senior managers. The end users can use the app more. You can cater to all the personas that you have on your desktop app. However, it's recommended to start with persona with a larger base and can be early adopters for smaller screen experience, in this case the end users. You can gradually add the functionalities to support the internal team and management. 

## Understand different stages to build apps

After you've identified the app scope, it's time to understand the following three stages to plan any app on Teams mobile and enhance user experience:

1. **Consumption**

   View apps on mobile. To build an app on mobile, you can start with the consumption experience. Since the mobile world has made scrolling for content a common practice, you can show relevant information. Use engagement mechanisms, such as notifications to inform updates.

2. **Quick Actions**

   Use app on mobile. After your users start consuming the content on mobile, you can scale your app to the next level by migrating some actions from desktop app. You can optimize and build new actions for mobile.

3. **Enablement**

   Provide complete app experiences to engage on mobile. As your users engage with your app, provide full immersive experience on mobile, either at par or better than desktop experience. To provide rewarding experience for your users, make all use cases responsive on mobile.

> [!TIP]
> To get information on the design guidelines, see [design process for Teams apps](design-teams-app-process.md).

## Use cases

Let us go through the following use cases to understand how to plan different types of apps for Teams mobile:

<br>

<details>

<summary><b>Dashboarding and data visualization apps</b></summary>

You can understand how to plan for dashboarding and data visualization apps on Teams mobile platform.

**Consumption**

In the first stage, you can implement the most basic consumption experience to view data. The primary purpose of any app in this domain is to show data in the form of visualizations. In your app, you can show recently viewed visualizations on desktop, or the list of all the charts authorized for the users. After creating dashboards on desktop, users access the information using mobile. For example: A detailed view of any chart, an expanded view inside tabs or by using task modules. 

You can show the following information: 

* Dashboards and summaries
* Data visuals, maps, and infographics
* Charts, graphs, and tables 

![Dashboarding and data visualization apps consumption](../../assets/images/app-fundamentals/dashboarding-and-data-visualization-apps-consumption.png)

**Quick actions**

In the second stage, the users can work on the existing charts and visuals from desktop experience. You can introduce the following actions:

* Search content
* Filter data
* Create bookmarks

![Dashboarding and data visualization apps quick actions](../../assets/images/app-fundamentals/dashboarding-and-data-visualization-apps-quick-actions.png)

**Enablement**

In the third stage, enable users to create content such as, charts and graphics from scratch. Ensure to introduce all the capabilities in your app for mobile. For example: You can use task modules to help access-specific data items with detailed view.

You can provide following access to users:
* Modify title and description
* Insert data items to create visualizations
* Share visualizations in a channel or group chat

![Dashboarding and data visualization apps enablement](../../assets/images/app-fundamentals/dashboarding-and-data-visualization-apps-enablement.png)


<br>

</details>

<br>

<details>

<summary><b>Task boarding apps</b></summary>

You can understand how to plan task boarding apps on Teams mobile platform.

**Consumption**

In the first stage, your app can show the list of tasks to the user in a vertical stack. If there are multiple categories of tasks, such as planned, in progress, and completed then provide filters for showing grouped tasks. 

![Task boarding apps consumption](../../assets/images/app-fundamentals/taskboarding-apps-consumption.png)

**Quick actions**

In the second stage, you can provide the following app access to users:
* Create tasks or items with the mandatory fields
* Change the board type or view
* Check tasks by expanding the view
* Use task modules to see detailed view
* Move around the tasks into multiple categories 
* Share relevant tasks in chats and channels

![Task boarding apps quick actions](../../assets/images/app-fundamentals/taskboarding-apps-quick-actions.png)

**Enablement**

In the third stage, you can enable users' experience with the following activities:
* Add new projects and boards
* Provide an option to expand the item to add all required fields 
* Change details of the tasks by editing fields
* Close and assign tasks and, mention due dates
* Share the boards and items in channels and groups

![Task boarding apps enablement](../../assets/images/app-fundamentals/taskboarding-apps-enablement.png)
<br>

</details>

<br>

<details>

<summary><b>Coauthoring and whiteboarding apps</b></summary>

You can understand how to plan coauthoring and whiteboarding apps on Teams mobile platform.

**Consumption**

In the first stage, you can consider desktop experience in the first phase to show the content and assets in your app.  In this stage, you can show the following functions:

* Comments or feedback
* Zoom in or out
* Current stage or progress on a pending document

![Coauthoring and whiteboarding apps consumption](../../assets/images/app-fundamentals/coauthoring-and-whiteboarding-apps-consumption.png)

**Quick Actions**
In the second stage, you can introduce the following actions in this stage:

* Adding text, shapes, and quick notes
* Moving around content 
* Adding layers and filters
* Delete, undo, and redo operations 

> [!TIP]
> You expose actions, which can be shown easily on the small screens.

![Coauthoring and whiteboarding apps quick actions](../../assets/images/app-fundamentals/coauthoring-and-whiteboarding-apps-quick-actions.png)

**Enablement**

In the third stage, provide complete experience to your users. You can enable users' experience with the following activities:

* Create new documents for signing  
* Create a new board for collaboration  
* Share boards internally and also with guests
* Provide admin permissions 
* Navigate and add content 
* Access camera and microphone using JS SDK APIs

![Coauthoring and whiteboarding apps enablement](../../assets/images/app-fundamentals/coauthoring-and-whiteboarding-apps-enablement.png)

<br>

</details>

## See also

These other design and validation guidelines to help depending on the scope of your app:

* [Designing your tab](../../tabs/design/tabs.md)
* [Designing you bot](../../bots/design/bots.md)
* [Validation guidelines](../deploy-and-publish/appsource/prepare/teams-store-validation-guidelines.md)