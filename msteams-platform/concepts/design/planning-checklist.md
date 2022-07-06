---
title: Questions to help plan Teams app development
author: heath-hamilton
description: Questions to consider while you plan your app, understand your user and their needs, problems that your app solves, user authentication and their onboarding experience.
ms.topic: conceptual
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

| # | Consider... |
| --- | --- |
| 1 | Are the users primarily front-line workers on mobile clients? |
| 2 | Do you expect many guest users to need access to your app? |
| 3 | Do they use teams and channels or primarily group chats? |
| 4 | How technically sophisticated are your primary users? |
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

| # | Consider...|
|--- | --- |
| 1 | Will the users access different views of data based on their roles? |
| 2 | Is there PII involved? |
| 3 | Will the interactions also be based on the user roles? |
| 4 | Will external users access the app? |

</details>
<br>
<details>
<summary>Plan onboarding experience</summary>

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

Suggestion: Options that help select the correct environment based on app needs.
</details>
<br>
<details>
<summary>Plan for testing app</summary>

Suggestion: Options that help determine the best testing environment for the app.
</details>
<br>
<details>
<summary>Plan for app distribution</summary>

Suggestion: Options that help determine the best distribution model.

</details>

## Plan for hosting your Teams app

Teams doesn't host your app. When a user installs your app in Teams, they install an app package that contains a only configuration file (also known as an app manifest) and your app's icons. The app's logic and data storage are hosted elsewhere, such on localhost during development and Azure Web Services. Teams accesses these resources via HTTPS.

:::image type="content" source="../../assets/images/teams-app-host.png" alt-text="Illustration showing app hosting for Teams app.":::

## Plan beyond app building

- **Decide what goes in Teams**: Whether it's a new app or an existing one, check if you want the entire app within the Teams client. If you integrate only a portion of the app, focus on sharing, collaborating, initiating, and monitoring workflows.

- **Plan the onboarding experience**: Craft your onboarding experience with your key users in mind. How you introduce a chat bot installed in a channel with a thousand people, is different when it's installed in a one-to-one chat.

- **Plan for the future**: Identify new features the user will prefer in the current solution. Any new features may impact app design and architecture.
