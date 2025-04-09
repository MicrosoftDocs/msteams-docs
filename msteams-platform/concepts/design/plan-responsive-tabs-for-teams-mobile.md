---
title: Plan for Teams mobile
author: surbhigupta
description: Learn how to plan responsive tabs for Teams mobile which includes app functionalities and user roles, and understand different stages to build app.
ms.topic: conceptual
ms.localizationpriority: medium
ms.author: surbhigupta
ms.date: 02/06/2025
---

# Plan responsive tabs for Teams mobile

Teams platform offers the opportunity to build apps that run seamlessly on both mobile and desktop. Users may choose to work on either platform depending on their needs—data entry might occur on desktop, while data consumption and sharing may be more prominent on mobile. The critical aspect of building any app is to understand and meet your users' needs through careful planning, especially when transitioning from desktop to mobile experiences.

Capabilities such as bots, message extensions, and connectors operate consistently across platforms. However, building tabs and dialogs (referred to as task modules in TeamsJS v1.x) requires specific planning to ensure your web experience is optimized for Teams mobile.

Below are key considerations before implementing responsive tabs for your Teams mobile app:

## Considerations for Responsive Tabs Implementation

1. **App Functionalities:**  
   - Evaluate the cross-device functionality of your Teams app.  
   - If your desktop app performs well, consider developing a mobile version that starts by addressing basic and common scenarios.  
   - Expand your mobile app functionality over time as you gather user feedback and usage insights.

2. **User Roles:**  
   - Identify and target the appropriate user role for Teams mobile.  
   - For example, if your app provides data visualization tools for end users such as data analysts and senior managers, decide whether to serve all desktop user roles initially or focus on a role with a larger base of early adopters on smaller screens.  
   - Starting with a user role like data analysts may be more effective, and subsequent releases can support additional roles.

---

## Understand different stages to build apps

Once you have identified the functionalities and user roles for your application, consider the following three stages. Each stage represents a step in enhancing user experience on Teams mobile:

| Stages          | Description |
| --------------- | ----------- |
| **Consumption** | This initial stage focuses on delivering a strong viewing experience for mobile users. As mobile users frequently scroll through content, ensure that your app displays the most relevant information. Utilize engagement mechanisms such as notifications to communicate updates effectively. |
| **Quick actions** | In this stage, introduce basic editing and querying features on mobile. Once users are accustomed to consuming content on mobile, gradually incorporate desktop actions that have been optimized or redesigned for mobile interaction. |
| **Enablement**  | The final stage aims to deliver a fully immersive mobile experience that is on par with or even superior to the desktop version. Ensure that all use cases, actions, and UI/UX components are responsive and optimized for mobile devices. For additional design guidelines, see [design process for Teams apps](design-teams-app-process.md). |

---

## Use cases

The following use cases illustrate how to plan different types of apps for Teams mobile by progressing through the stages of Consumption, Quick Actions, and Enablement. Each example describes a scenario with practical guidance for developers.

<br>

<details>
<summary><b>Dashboarding and data visualization apps</b></summary>

This section explains how to plan responsive tabs for dashboarding and data visualization apps on the Teams mobile platform.

### Consumption

At this stage, focus on providing the most basic consumption experience to enable users to view data. The primary objective is to display data in the form of visualizations. Consider implementing features such as:

- Displaying recently viewed visualizations from the desktop.
- Listing all authorized charts for the users.
- Providing an expanded view of a selected chart using tabs or dialogs.

Key displayed information may include:
- Dashboards and summaries.
- Data visuals, maps, and infographics.
- Charts, graphs, and tables.

:::image type="content" source="../../assets/images/app-fundamentals/dashboarding-and-data-visualization-apps-consumption.png" alt-text="Show the data in the form of visualization." lightbox="../../assets/images/app-fundamentals/dashboarding-and-data-visualization-apps-consumption.png" :::

### Quick actions

In the second stage, transition to allowing users to interact with existing visuals from the desktop. Implement functionalities such as:

- Search content.
- Filter data.
- Create bookmarks.

These quick actions make it easier for users to perform essential tasks without overwhelming them with the full desktop feature set.

:::image type="content" source="../../assets/images/app-fundamentals/dashboarding-and-data-visualization-apps-quick-actions.png" alt-text="Quick actions on the existing chart and visuals." lightbox="../../assets/images/app-fundamentals/dashboarding-and-data-visualization-apps-quick-actions.png" :::

### Enablement

The final stage enhances the mobile experience by enabling users to create content from scratch. In this phase, you may enable features such as:

- Modifying titles and descriptions.
- Inserting data items to create custom visualizations.
- Sharing visualizations in a channel or group chat.

This stage ensures parity with, or an improvement over, the desktop experience.

:::image type="content" source="../../assets/images/app-fundamentals/dashboarding-and-data-visualization-apps-enablement.png" alt-text="Enable users to create content such as charts and graphics." lightbox="../../assets/images/app-fundamentals/dashboarding-and-data-visualization-apps-enablement.png" :::

<br>
</details>

<br>

<details>
<summary><b>Task boarding apps</b></summary>

This section discusses best practices for planning responsive tabs for task boarding apps on Teams mobile.

### Consumption

Begin by offering a simple view that displays a vertical list of tasks. If tasks are categorized (e.g., **Proposed**, **Active**, and **Closed**), add filters or headers to distinguish these groups.

:::image type="content" source="../../assets/images/app-fundamentals/taskboarding-apps-consumption.png" alt-text="Shows the list of tasks in a vertical stack." lightbox="../../assets/images/app-fundamentals/taskboarding-apps-consumption.png" :::

### Quick actions

Enhance the task boarding experience with actions that reduce cognitive load and improve usability:

- Allow users to create tasks or items with pre-defined mandatory fields.
- Enable a switch between board types or views.
- Provide the option to expand tasks for detailed review using dialogs.
- Facilitate moving tasks between different categories.
- Offer sharing options for tasks via chats, channels, or emails.
- Integrate activity feed notifications to alert users about task changes.

:::image type="content" source="../../assets/images/app-fundamentals/taskboarding-apps-quick-actions.png" alt-text="Create tasks to reduce cognitive load of the users." lightbox="../../assets/images/app-fundamentals/taskboarding-apps-quick-actions.png" :::

### Enablement

Conclude with enabling full functionality on mobile by incorporating features such as:

- The ability to add new projects and boards.
- Options to add or modify various task categories (e.g., **Proposed**, **Active**, **Closed**).
- Advanced configurations for comments, attachments, and other complex task features.

:::image type="content" source="../../assets/images/app-fundamentals/taskboarding-apps-enablement.png" alt-text="Enable the user experience by adding projects and boards." lightbox="../../assets/images/app-fundamentals/taskboarding-apps-enablement.png" :::

<br>
</details>

<br>

<details>
<summary><b>Co-authoring and whiteboarding apps</b></summary>

This section details how to plan responsive tabs for co-authoring and whiteboarding apps on Teams mobile.

### Consumption

In the initial stage, prioritize displaying content similar to the desktop experience. Include core functionalities such as:

- Displaying comments or feedback.
- Enabling zoom in/out for content clarity.
- Indicating the current stage or progress of pending documents.

:::image type="content" source="../../assets/images/app-fundamentals/coauthoring-and-whiteboarding-apps-consumption.png" alt-text="Shows content and assets in desktop experience." lightbox="../../assets/images/app-fundamentals/coauthoring-and-whiteboarding-apps-consumption.png" :::

### Quick actions

Next, introduce interactive capabilities tailored for the mobile environment:

- Allow users to create a new board for collaboration or initiate new documents.
- Enable internal and guest sharing of boards.
- Provide options to configure administrative permissions.

> [!TIP]
> Introducing these quick actions helps ensure the app’s functionality is accessible on smaller screens without overwhelming the interface.

:::image type="content" source="../../assets/images/app-fundamentals/coauthoring-and-whiteboarding-apps-quick-actions.png" alt-text="Introduces to create new board for collaboration." lightbox="../../assets/images/app-fundamentals/coauthoring-and-whiteboarding-apps-quick-actions.png" :::

### Enablement

Finally, deliver a complete experience by incorporating comprehensive editing and interaction features, including:

- Adding text, shapes, and quick notes.
- Navigating smoothly around the content.
- Adding layers and filters for enhanced editing.
- Providing options for delete, undo, and redo operations.
- Granting access to camera and microphone via TeamsJS APIs. For a detailed explanation of device capabilities, see [device capabilities overview](../device-capabilities/device-capabilities-overview.md).

:::image type="content" source="../../assets/images/app-fundamentals/coauthoring-and-whiteboarding-apps-enablement.png" alt-text="Enable user experience by adding text shapes and quick notes and other capabilities." lightbox="../../assets/images/app-fundamentals/coauthoring-and-whiteboarding-apps-enablement.png" :::

<br>
</details>

---

## See also

- [Designing your tab](../../tabs/design/tabs.md)
- [Designing your bot](../../bots/design/bots.md)
- [Designing dialogs](../../task-modules-and-cards/task-modules/design-teams-task-modules.md)
- [Microsoft Teams Store validation guidelines](../deploy-and-publish/appsource/prepare/teams-store-validation-guidelines.md)
- [Tabs on mobile](../../tabs/design/tabs-mobile.md)