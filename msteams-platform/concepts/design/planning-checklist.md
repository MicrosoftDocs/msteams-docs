---
title: App Planning Checklist
author: heath-hamilton
description: A comprehensive resource for planning your app, ensuring all important details of app development are considered. Learn about the stages of an app's lifecycle and various hosting options for your Teams app.
ms.localizationpriority: high
ms.topic: conceptual
ms.author: surbhigupta
ms.date: 07/28/2022
---

# Teams app planning checklist

The lifecycle of an app spans from its planning phase to eventual deployment and subsequent updates. While knowing your users and requirements is essential, your app planning might also need to consider future developments. This guide will take a practical approach to plan for an app's lifecycle.

## Important Questions While Planning

When you plan your app, consider this checklist of questions. It serves as a guide that covers all the crucial details related to app development.

### Understanding Your User

Recognizing the needs and issues of the user is the first step towards determining how a Teams app can be helpful. Build your use case around the problem, ascertain how an app can provide a solution, and formulate the solution accordingly. For more information, see [understanding your use cases](understand-use-cases.md).

| # | Consider... |
| --- | --- |
| 1 | Are the primary users frontline workers using mobile clients? |
| 2 | Do you expect numerous external users needing access to your app? |
| 3 | Are they mainly using teams and channels or primarily group chats? |
| 4 | How tech-savvy are your primary users? |
| 5 | Is a detailed onboarding experience needed or will a few pointers suffice? |

### Understanding the Problem

| # | Consider... |
|--- | --- |
| 1 | What are the advantages and disadvantages of the current systems your users are using? |
| 2 | What difficulties are your users facing that you aim to resolve? |
| 3 | What features or functionalities do your users appreciate in their existing processes? |

### Understanding the App Limitations

| # | Consider... |
| --- | --- |
| 1 | What are the obstacles with the backend integration of the current app? |
| 2 | Who owns the backend data - is it managed in-house or by a third party? |
| 3 | Are there firewalls that affect the app's functioning? |
| 4 | Are there APIs available for accessing the data your app needs?

### User Authentication

Authentication in an app validates the users and safeguards the app and users against unauthorized access. Choose an authentication method suitable for your app to validate users who want to use the Teams app. Learn more at [authenticating users in Microsoft Teams](../authentication/authentication.md).

| # | Consider...|
|--- | --- |
| 1 | Will users access different data views based on their roles? |
| 2 | Is there customer content involved? |
| 3 | Will interactions also be role-based? |
| 4 | Will external users access the app? |

### Onboarding User Experience

Designing an effective Teams app involves combining the right features to cater to your user's needs. Create a step-by-step guide for a smooth onboarding experience, explaining the functionality of your app. See this example for reference: [creating a Teams conversation bot](../../sbs-teams-conversation-bot.yml).

| # | Consider... |
| --- | --- |
| 1 | What happens when a user first configures your tab in a channel? |
| 2 | If you're sharing cards with a message extension, would a small link to a 'learn more' page be helpful to introduce additional features of your app? |
| 3 | Do you expect most users to already understand your app's functionality, or have utilised your services in another context? |
| 4 | Are they new users with no prior knowledge of your app? |

### Personal Scope Apps

| # | Consider... |
| --- | --- |
| 1 | Are there requirements for one-on-one interactions with the app for privacy or other reasons? For instance, checking leave balance or other private information. |
| 2 | Will there be collaboration among users who might not share any common Teams? For example, finding upcoming organization-wide events in a company. |
| 3 | Do you need to send personalized notifications or messages to a user throughout their Teams app experience?

### Shared Scope Apps

| # | Consider... |
| --- | --- |
| 1 | Is the app's information, presented either in a tab or through a bot, helpful to most members of a Team? For instance, a Scrum app. |
| 2 | Would the app’s functionality change depending on the team using it? For example, tasks in Planner vary between different teams. |
| 3 | Does it happen that all members in a user pool needing to collaborate are part of a single team? For example, support agents working on a ticket.

### Choose Build Environment

With Teams, you can select the build environment that best matches your app requirements. Use Teams Toolkit or other SDKs such as C#, Blazor, Node.js, and more to get started. Learn more at [planning your app with Teams features](../app-fundamentals-overview.md).

### Planning Analytics for Your App

Once you've built your app and it's available to millions of Microsoft Teams users, it's necessary to measure its performance. Monitor user engagement, churn rates, and other data points. By analyzing this data regarding your business goals, you can identify and fix issues or plan further enhancements. For more information, see [planning analytics](overview-analytics.md).

### Planning for App Testing

After integrating your app with Microsoft Teams, ensure to test your app on multiple devices before publishing. Learn more at [testing your app](../build-and-test/test-app-overview.md).

### Planning for App Distribution

Your Microsoft Teams app can be made available to an individual, team, organization, or anyone who needs it. The distribution method depends on the users' needs, as well as your app's business and technical requirements. Learn more at [distributing your Microsoft Teams app](../deploy-and-publish/apps-publish-overview.md).

### Planning for App Notifications

You can send notifications to Teams users in a variety of ways. Notifications are an easy method to engage users regularly. To learn more about notification planning, see [planning to send app notifications](design-app-notification.md).

## Hosting Your Teams App

Teams doesn't host your app. When a user installs your app in Teams, they install an app package that contains a configuration file (also known as an app manifest) and your app’s icons. Your app's logic and data storage are hosted elsewhere. During development, these resources can be hosted on localhost and then moved to Azure Web Services for wider use. Teams accesses these resources via HTTPS.

:::image type="content" source="../../assets/images/teams-app-host.png" alt-text="Diagram showing app hosting for a Teams app.":::

## Post-Build Planning

- **Decide what goes in Teams**: Determine if you want to integrate a portion or the entire functionality of your app within the Teams client. If only a part of the app is integrated, focus on facilitating sharing, collaboration, initiation, and workflow monitoring.

- **Plan the onboarding experience**: Design your onboarding process according to the needs of your key users. Consider that introducing a chat bot installed in a channel with a thousand people may differ from one installed in a one-on-one chat.

- **Consider future developments**: Make note of any new features that users would prefer in the current app. Future feature additions could impact the design and architecture of your app.

## Relevant Resources

- [Plan your app with Teams features](../app-fundamentals-overview.md)
- [Teams overview](/graph/teams-concept-overview)
- [Build bots for Teams](../../bots/what-are-bots.md)
- [Build tabs for Teams](../../tabs/what-are-tabs.md)
- [Build message extensions for Teams](../../messaging-extensions/what-are-messaging-extensions.md)
- [Adaptive Cards](../../task-modules-and-cards/what-are-cards.md#adaptive-cards)
- [Enable SSO for tab app](../../tabs/how-to/authentication/tab-sso-overview.md)
- [Enable SSO for your bot and message extension](../../bots/how-to/authentication/bot-sso-overview.md)
- [Create deep links](../build-and-test/deep-links.md)