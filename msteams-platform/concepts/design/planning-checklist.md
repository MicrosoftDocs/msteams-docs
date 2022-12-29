---
title: Questions to help plan Teams app development
author: heath-hamilton
description: Learn to plan your app using the checklist to ensure your plan covers the important details of app development. Plan app's lifecycle. Plan to host your Teams app.
ms.localizationpriority: high
ms.author: surbhigupta
---

# Teams app planning checklist

An app's lifecycle extends from planning your app to eventually deploying it, and beyond. It takes more than knowing your user and requirements to plan your app. Depending on your app needs, you may also consider planning for future updates.

Let's take a practical look at planning for an app's lifecycle.

## Relevant questions

Here's a checklist of questions to consider when you plan your app. Use it as a guideline to ensure that your plan covers the important details of app development.

<br>
<br>
<details>
<summary>Understand your user</summary>

Understanding the user and their concern are the first indicators of how a Teams app can help. Build your use case around the problem, determine how an app can solve it, and draw a solution. For more information, see [understand your use cases](understand-use-cases.md).

| # | Consider... |
| --- | --- |
| 1 | Are the users primarily frontline workers on mobile clients? |
| 2 | Do you expect many external users to need access to your app? |
| 3 | Do they use teams and channels or primarily group chats? |
| 4 | How technically advanced are your primary users? |
| 5 | Do you need a thorough onboarding experience or a few pointers might do? |

</details>
<br>
<details>
<summary>Understand the problem</summary>

| # | Consider... |
|--- | --- |
| 1 | What are the pros and cons of the current state system used by your users? |
| 2 | What are the issues faced by your users that you want to address? |
| 3 | What features or capabilities your users like and love in their current way of doing the process? |

</details>
<br>
<details>
<summary>Understand the limitations of the app</summary>

| # | Consider... |
| --- | --- |
| 1 | What are the challenges with back end integration of the current app? |
| 2 | Who owns the back end data - In-house or third-party? |
| 3 | Are there firewalls that impact the functioning of the app? |
| 4 | Are there APIs to access the data you need for functioning of your app? |

</details>
<br>
<details>
<summary>Provide authentication</summary>

Authentication is all about validating app users and securing the app and app users against unwarranted access. You can use an authentication method suitable for your app to validate app users who want to use the Teams app. For more information, see [authenticate users in Microsoft Teams](../authentication/authentication.md).

| # | Consider...|
|--- | --- |
| 1 | Will the users access different views of data based on their roles? |
| 2 | Is there customer content involved? |
| 3 | Will the interactions also be based on the user roles? |
| 4 | Will external users access the app? |

</details>
<br>
<details>
<summary>Plan onboarding experience</summary>

Building an awesome Teams app is all about finding the right combination of features to meet your user's needs. To provide your users with a seamless onboarding experience, you can create a step-by-step guide explaining how and what to do with your app. For example, see [create Teams conversation bot](../../sbs-teams-conversation-bot.yml).

| # | Consider... |
| --- | --- |
| 1 | What happens when a user first configures your tab in a channel? |
| 2 | If you're sharing cards with a message extension, does it make sense to add a small link to a learn more page to help introduce users to what else your app can do? |
| 3 | Do you expect most people to already have some context of what your app is for, or to have already used your services in another context? |
| 4 | Are they coming to your app with no prior knowledge? |

</details>
<br>
<details>
<summary>Personal scope apps</summary>

| # | Consider... |
| --- | --- |
| 1 | Are there one-on-one interactions with the app required for privacy or other reasons? For example, checking leave balance or other private information. |
| 2 | Are they're going to be collaboration among users who might not have any common Teams? For example, finding upcoming organization wide events in a company. |
| 3 | Are there any personalized notifications or messages that need to be sent to a user throughout the Teams app experience? |

</details>
<br>
<details>
<summary>Shared scope apps</summary>

| # | Consider... |
| --- | --- |
| 1 | Is the information presented by the app, either in tab or through a bot, relevant and useful for most of the members in a Team? For example, Scrum app. |
| 2 | Could the app’s context change depending on the team in which it's added to? For example, Planner’s tasks are different in different teams. |
| 3 | Is it possible that all members in a persona who need to collaborate are a part of a single team? For example, agents working on a ticket. |

</details>
<br>
<details>
<summary>Choose build environment</summary>

With Teams, you can choose the build environment that best suits your app requirement. Use Teams Toolkit or other SDKs, such as C#, Blazor, Node.js, and more to get started. For more information, see [plan your app with Teams features](../app-fundamentals-overview.md).

Suggestion: Options that help select the correct environment based on app needs.
</details>
<br>
<details>
<summary>Plan analytics for your app</summary>

As a developer who’s building an app for millions of Microsoft Teams users to achieve specific business or customer goals and distributing it using one or more of the many distribution options available to you, you will be interested to measure how your app is performing in the real-world once published. You will also be interested in monitoring who is interested in your app, which users and organizations are using your app, how are users engaging with your app, which users have churned away after using your app for some time and many such data points. Once you know this, you can analyze the data against your business goals, take corrective action by fixing issues and intervening in the user journey or plan further enhancements to your app.

For more information, see [planning analytics](overview-analytics.md).
</details>
<br>
<details>
<summary>Plan for testing app</summary>

After integrating your app with Microsoft Teams, you must test your app before publishing it. The ultimate goal is to get as many users for your app, therefore, ensure to test the app on multiple devices that users could use. For more information, see [test your app](../build-and-test/test-app-overview.md).

Suggestion: Options that help determine the best testing environment for the app.
</details>
<br>
<details>
<summary>Plan for app distribution</summary>

You can provide your Microsoft Teams app to an individual, team, organization, or anyone who wants to use it. How you distribute depends on several factors, including users' needs, business and technical requirements, and your goals for the app. For more information, see [distribute your Microsoft Teams app](../deploy-and-publish/apps-publish-overview.md).

Suggestion: Options that help determine the best distribution model.

</details>

## Plan for hosting your Teams app

Teams doesn't host your app. When a user installs your app in Teams, they install an app package that contains only a configuration file (also known as an app manifest) and your app's icons. The app's logic and data storage are hosted elsewhere, such as on localhost during development and Azure Web Services. Teams accesses these resources via HTTPS.

:::image type="content" source="../../assets/images/teams-app-host.png" alt-text="Illustration showing app hosting for Teams app.":::

## Plan beyond app building

- **Decide what goes in Teams**: Whether it's a new app or an existing one, check if you want the entire app within the Teams client. If you integrate only a portion of the app, focus on sharing, collaborating, initiating, and monitoring workflows.

- **Plan the onboarding experience**: Craft your onboarding experience with your key users in mind. How you introduce a chat bot installed in a channel with a thousand people, is different when it's installed in a one-to-one chat.

- **Plan for the future**: Identify new features the user will prefer in the current solution. Any new features may impact app design and architecture.

## See also

- [Plan your app with Teams features](../app-fundamentals-overview.md)
- [Teams overview](/graph/teams-concept-overview)
- [Build bots for Teams](../../bots/what-are-bots.md)
- [Build tabs for Teams](../../tabs/what-are-tabs.md)
- [Build message extensions for Teams](../../messaging-extensions/what-are-messaging-extensions.md)
- [Adaptive Cards](../../task-modules-and-cards/what-are-cards.md#adaptive-cards)
- [Enable SSO for tab app](../../tabs/how-to/authentication/tab-sso-overview.md)
- [Enable SSO for your bot and message extension](../../bots/how-to/authentication/bot-sso-overview.md)
- [Create deep links](../build-and-test/deep-links.md)
