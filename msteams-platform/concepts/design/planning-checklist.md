---
title: Questions to help plan Teams app development
author: heath-hamilton
description: Learn to plan your app using the checklist to ensure your plan covers the important details of app development. Plan app's lifecycle. Plan to host your Teams app.
ms.localizationpriority: high
ms.topic: conceptual
ms.author: surbhigupta
ms.date: 07/28/2022
---

# Teams app planning checklist

An app's lifecycle extends beyond planning, developing, and deploying your app. It takes more than knowing your user and requirements to plan your app. Depending on your app needs, consider planning your app for future updates.

## Relevant questions

Here's a checklist of questions to consider when you plan your app. Use the checklist as a guideline to ensure that your plan covers the important details of app development.

<br>
<br>
<details>
<summary>Understand your user.</summary>

Understanding the user and their concern are the first indicators of how a Teams app can help. Build your use case around the problem, determine how an app can solve it, and develop a solution. For more information, see [understand your use cases](understand-use-cases.md).

| # | Consider... |
| --- | --- |
| 1 | Are the users primarily frontline workers on mobile clients? |
| 2 | Do you expect many guests to need access to your app? |
| 3 | Do they use teams and channels or primarily group chats? |
| 4 | How technically advanced are your primary users? |
| 5 | Do you need a thorough onboarding experience or a few pointers might do? |

</details>
<br>
<details>
<summary>Understand the problem.</summary>

| # | Consider... |
|--- | --- |
| 1 | What are the pros and cons of the current state system used by your users? |
| 2 | What are the issues faced by your users that you want to address? |
| 3 | Which features or capabilities do your users like in their current way of performing the process? |

</details>
<br>
<details>
<summary>Understand the limitations of the app.</summary>

| # | Consider... |
| --- | --- |
| 1 | What are the challenges with backend integration of the current app? |
| 2 | Who owns the backend data? User or third-party? |
| 3 | Are there firewalls that affect the functioning of the app? |
| 4 | Are there APIs to access the data you need for functioning of your app? |

</details>
<br>
<details>
<summary>Provide authentication</summary>

Use an authentication method suitable for your app to validate app users and secure the app and app users against unwarranted access. For more information, see [authenticate users in Microsoft Teams](../authentication/authentication.md).

| # | Consider...|
|--- | --- |
| 1 | Do the users access different views of data based on their roles? |
| 2 | Is customer data involved? |
| 3 | Are the interactions also based on the user roles? |
| 4 | Are guests accessing the app? |

</details>
<br>
<details>
<summary>Plan onboarding experience</summary>

To provide your users with a seamless onboarding experience, create a step-by-step guide explaining how and what to do with your app. For example, see [create Teams conversation bot](../../sbs-teams-conversation-bot.yml).

| # | Consider... |
| --- | --- |
| 1 | What happens when a user first configures your tab in a channel? |
| 2 | If you're sharing cards with a message extension, does it make sense to add a link to a page to help introduce users to what else your app can do? |
| 3 | Do you expect most people to already have some context of what your app is for, or to have already used your services in another context? |
| 4 | Are they coming to your app with no prior knowledge? |

</details>
<br>
<details>
<summary>Personal scope apps</summary>

| # | Consider... |
| --- | --- |
| 1 | Are one-on-one interactions with the app required for privacy or other reasons? For example, checking leave balance or other private information. |
| 2 | Are users going to collaborate from different teams in an organization? For example, finding upcoming organization-wide events. |
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
<summary>Choose build environment.</summary>

With Teams, you can choose the build environment that best suits your app requirement. Use Teams Toolkit or other SDKs, such as C#, Blazor, Node.js, and more to get started. For more information, see [plan your app with Teams features](../app-fundamentals-overview.md).

</details>
<br>
<details>
<summary>Plan analytics for your app</summary>

It's important to measure how your app is performing in the real-world once published. You need to monitor your app's users and organizations, how users engage with your app, bounce rates, potential customers, and more. Once you know these metrics, you can analyze the data against your business goals, take corrective action by fixing issues, and intervene in the user journey or plan further enhancements to your app.

For more information, see [planning analytics](overview-analytics.md).
</details>
<br>
<details>
<summary>Plan for testing app</summary>

After integrating your app with Microsoft Teams, you must test your app before publishing it. The ultimate goal is to get as many users for your app, therefore, ensure to test the app on multiple devices that users could use. For more information, see [test your app](../build-and-test/test-app-overview.md).

</details>
<br>
<details>
<summary>Plan for app distribution</summary>

You can provide your Microsoft Teams app to an individual, team, organization, or anyone who wants to use it. How you distribute depends on several factors, including users' needs, business and technical requirements, and your goals for the app. For more information, see [distribute your Microsoft Teams app](../deploy-and-publish/apps-publish-overview.md).

</details>

## Plan for hosting your Teams app

Teams doesn't host your app. When a user installs your app in Teams, they install an app package that contains only a configuration file (also known as an app manifest) and your app's icons. The app's logic and data are hosted elsewhere, such as on a local host during development or Azure Web Services after provisioning. Teams accesses these resources via HTTPS.

:::image type="content" source="../../assets/images/teams-app-host.png" alt-text="Illustration shows app hosting for Teams app.":::

## Plan to monetize your app

Microsoft Teams Store provides features that let you monetize your apps, gain new customers, and global visibility. Factors such as type of app, nature of service, and target customers influence your choice for the best monetization option. Establishing a monetizing option beforehand helps guide the app design, build, and distribution decisions.

:::row:::
    :::column span="":::

        :::image type="content" source="../../assets/images/app-fundamentals/monetize-apps.png" alt-text="Diagram shows the various ways to monetize apps.":::
    :::column-end:::
    :::column span="":::
        The most common ways to monetize your app are:

        - **Subscription**: Include a Software as a service (SaaS) offer with your app to let users purchase subscription plans.
        - **In-app purchases**: Offer a free app download with limited features. For advanced features, offer an upgraded version.
        - **Free trials**: Let the users try the app for free for a set number of days or times.
        - **Test preview**: Preview and test a SaaS offer before you publish your app.
    :::column-end:::
:::row-end:::

## Plan beyond app building

- **Decide what goes in Teams**: Whether it's a new app or an existing one, check if you want the entire app within the Teams client. If you integrate only a portion of the app, focus on sharing, collaborating, initiating, and monitoring workflows.

- **Plan for the future**: Identify new features the user prefers in the current solution. Any new features might affect app design and architecture.

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
