---
title: App Planning Checklist
author: heath-hamilton
description: Learn to plan your app using the checklist to ensure your plan covers the important details of app development. Plan app's lifecycle and to host your Teams app.
ms.localizationpriority: high
ms.topic: conceptual
ms.author: surbhigupta
ms.date: 02/06/2025
---

# Teams App Planning Checklist

An app's lifecycle extends from planning your app to eventually deploying it—and beyond. It takes more than understanding your users and their requirements to plan your app. Depending on your app needs, you might also consider planning for future updates.

Below is a practical guide to help you plan your app's lifecycle with critical questions and considerations.

## Relevant Questions

Review this checklist of questions to ensure your planning process covers every important detail in app development. Use these guidelines to build a robust strategy that addresses both current and future needs.

<br>
<br>
<details>
<summary>Understand your user</summary>

Understanding your users and their concerns is the foundation for identifying how a Teams app can provide value. Build your use case around the problem by determining how an app can address those needs and designing an effective solution. For more detailed insights, see [understand your use cases](understand-use-cases.md).

| # | Consider... |
| --- | --- |
| 1 | Are the users primarily frontline workers on mobile clients? |
| 2 | Do you expect many external users to need access to your app? |
| 3 | Do they use teams and channels or primarily group chats? |
| 4 | How technically advanced are your primary users? |
| 5 | Do you need a thorough onboarding experience or will a few pointers suffice? |

*Use case example: Design an onboarding guide for a mobile-first workforce where simplicity is key due to technological limitations.*

</details>
<br>
<details>
<summary>Understand the problem</summary>

Identify and document the challenges your users face with the current system. Evaluating the pros and cons of the existing approach can help shape the development of a more effective solution.

| # | Consider... |
|--- | --- |
| 1 | What are the pros and cons of the current state system used by your users? |
| 2 | What issues are your users experiencing that you want to address? |
| 3 | Which features or capabilities do your users currently appreciate and rely on? |

*Use case example: If users appreciate a particular reporting feature in their current system, ensure your app incorporates or improves upon this functionality.*

</details>
<br>
<details>
<summary>Understand the limitations of the app</summary>

It’s important to recognize potential obstacles with app integration and data management. This section focuses on identifying technical challenges, such as backend integration and API availability.

| # | Consider... |
| --- | --- |
| 1 | What are the challenges with back end integration of the current app? |
| 2 | Who owns the back end data: in-house or a third-party provider? |
| 3 | Are there firewalls that could impact the functioning of the app? |
| 4 | Are there APIs available to access the data needed for your app to function? |

*Use case example: Assess if reliance on third-party data sources might impede real-time data retrieval and plan for fallback strategies.*

</details>
<br>
<details>
<summary>Provide authentication</summary>

Authentication is crucial for safeguarding both your app and its users by ensuring only authorized personnel gain access. Select an authentication method that fits your app’s requirements to validate users efficiently. For additional guidance, refer to [authenticate users in Microsoft Teams](../authentication/authentication.md).

| # | Consider...|
|--- | --- |
| 1 | Will users access different views of data based on their roles? |
| 2 | Is customer content involved that requires special handling? |
| 3 | Will interactions vary based on user roles? |
| 4 | Will external users have access to the app? |

*Use case example: Implement role-based access control in a scenario where managers and staff require distinct data views within the same app.*

</details>
<br>
<details>
<summary>Plan onboarding experience</summary>

A well-designed onboarding experience is key to ensuring that users quickly understand how to use your app. Consider creating a step-by-step guide that addresses the initial user interaction and subsequently highlights additional features. For guidance, see [create Teams conversation bot](../../sbs-teams-conversation-bot.yml).

| # | Consider... |
| --- | --- |
| 1 | What happens when a user first configures your tab in a channel? |
| 2 | If sharing cards via a message extension, should you include a link to a learn more page for additional context? |
| 3 | Do you expect most users to already have some familiarity with your app or service? |
| 4 | Are users likely coming with no prior knowledge, requiring a more comprehensive introduction? |

*Use case example: Customize the onboarding experience for a corporate tool installed in a channel versus a one-to-one chat bot where the context and depth of introduction might differ significantly.*

</details>
<br>
<details>
<summary>Personal scope apps</summary>

When planning personal scope apps, consider the necessity of one-on-one interactions and how personalized data should be handled. These are critical factors in scenarios where privacy is paramount.

| # | Consider... |
| --- | --- |
| 1 | Are one-on-one interactions required for privacy or other reasons (e.g., checking personal leave balance)? |
| 2 | Will collaboration occur among users who do not share a common Teams environment, such as tracking company-wide events? |
| 3 | Are personalized notifications or messages needed throughout the Teams app experience? |

*Use case example: Create a personal finance management tool where individual financial data is securely displayed and managed on a per-user basis.*

</details>
<br>
<details>
<summary>Shared scope apps</summary>

Shared scope apps are designed for collaboration within a team environment. Ensure the app’s content is relevant to and enhances group interactions.

| # | Consider... |
| --- | --- |
| 1 | Is the information presented in the app—whether through tabs or bots—relevant and useful for most team members? For example, a Scrum app for agile teams. |
| 2 | Could the app’s context change depending on the team in which it is installed? For example, tasks in Planner differ across teams. |
| 3 | Is it possible that members who need to collaborate belong to a single team? For example, agents working together to resolve a ticket. |

*Use case example: Design a task management app tailored for cross-functional teams where views and tasks adapt based on the specific team context.*

</details>
<br>
<details>
<summary>Choose build environment</summary>

Choosing the right build environment is essential for app success. With Teams, you have a variety of options, including the Teams Toolkit or other SDKs such as C#, Blazor, and Node.js. Consider the requirements of your app and select the environment that best aligns with those needs. For further discussion, see [plan your app with Teams features](../app-fundamentals-overview.md).

Suggestion: Review options carefully to select the environment that optimally supports your app's functionality and scalability.

*Use case example: A startup building a lightweight internal tool might favor Node.js for its flexibility and ease of deployment, whereas an enterprise might choose C# for its robust integration with existing Microsoft infrastructure.*

</details>
<br>
<details>
<summary>Plan analytics for your app</summary>

Analytics allow you to track app performance and user engagement post-deployment. As a developer building an app for millions of Teams users, you must monitor factors such as user engagement, adoption rates, feature usage, and customer churn. This data is invaluable for performance optimization and future enhancements. For more details, see [planning analytics](overview-analytics.md).

*Use case example: Implement analytics for a retail management app to monitor peak usage times, feature popularity, and to guide future product iterations based on user behavior data.*

</details>
<br>
<details>
<summary>Plan for testing app</summary>

Comprehensive testing ensures a high-quality app experience for your users. Prior to publishing, test the app on multiple devices to simulate the diverse user environments in which your app will operate. This testing should cover performance, compatibility, and security aspects. For additional information, refer to [test your app](../build-and-test/test-app-overview.md).

Suggestion: Evaluate testing environments that mirror the varied device landscape your users might employ.

*Use case example: A communication app intended for both desktop and mobile users must be tested across various operating systems and browser configurations to ensure consistent performance.*

</details>
<br>
<details>
<summary>Plan for app distribution</summary>

Determine the optimal distribution method for your Microsoft Teams app based on your target audience—whether for individuals, teams, or organizations. Your choice should reflect both business objectives and technical prerequisites. For more details on distribution, refer to [distribute your Microsoft Teams app](../deploy-and-publish/apps-publish-overview.md).

Suggestion: Review and compare different distribution models to identify the one that best meets your usage scenario and scale.

*Use case example: An app designed for internal corporate use may be distributed via an organization's app catalog, whereas a consumer-facing app might require widespread distribution through the Teams app store.*

</details>
<br>
<details>
<summary>Plan for app notifications</summary>

Notifications are an effective way to engage users continuously. Consider various methods to deliver notifications that are timely and relevant without overwhelming the user. For more detailed planning on notifications, see [plan to send app notifications](design-app-notification.md).

*Use case example: A project management app could send periodic reminders and updates to team members about upcoming deadlines or changes in task status, ensuring sustained engagement.*

</details>

## Plan for Hosting Your Teams App

Remember, Teams does not host your app. When a user installs your app in Teams, they install an app package that only contains a configuration file (also known as an app manifest) and your app's icons. The app’s logic and data storage are hosted externally—on localhost during development or on platforms such as Azure Web Services in production. Teams interacts with these resources securely over HTTPS.

:::image type="content" source="../../assets/images/teams-app-host.png" alt-text="Illustration showing app hosting for Teams app.":::

*Practical scenario: During development, you might host your app locally for rapid iterations. For production, consider scalable solutions like Azure to ensure reliability and security for millions of users.*

## Plan Beyond App Building

Enhance your long-term strategy by considering areas that extend past the initial app launch:

- **Decide what goes in Teams**:  
  Determine whether you want a fully integrated app within the Teams client or if you will integrate only specific functionalities. Focus on key interactions such as sharing, collaborating, initiating, and monitoring workflows.  
  *Practical example: A customer support app might only integrate the ticketing system within Teams while keeping more intensive processes on dedicated servers.*

- **Plan the onboarding experience**:  
  Tailor your onboarding process to your key users. The approach for introducing a chat bot in a channel of a thousand people will differ from one used in a one-to-one chat.  
  *Practical example: Provide a comprehensive, wizard-style onboarding for new users in large channels, and a brief tutorial for experienced users in one-on-one settings.*

- **Plan for the future**:  
  Continuously identify and analyze potential new features that users may prefer over current solutions. Anticipate and design for enhancements that could impact overall app architecture.  
  *Practical example: Collect user feedback post-launch to iteratively enhance features or add new functionalities, ensuring your app evolves with user needs.*

## See Also

- [Plan your app with Teams features](../app-fundamentals-overview.md)
- [Teams overview](/graph/teams-concept-overview)
- [Build bots for Teams](../../bots/what-are-bots.md)
- [Build tabs for Teams](../../tabs/what-are-tabs.md)
- [Build message extensions for Teams](../../messaging-extensions/what-are-messaging-extensions.md)
- [Adaptive Cards](../../task-modules-and-cards/what-are-cards.md#adaptive-cards)
- [Enable SSO for tab app](../../tabs/how-to/authentication/tab-sso-overview.md)
- [Enable SSO for your bot and message extension](../../bots/how-to/authentication/bot-sso-overview.md)
- [Create deep links](../build-and-test/deep-links.md)