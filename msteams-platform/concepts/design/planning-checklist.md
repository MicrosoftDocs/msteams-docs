---
title: Questions to help plan Teams app development
author: heath-hamilton
description: Plan your app, understand your user and their need, understand the user problems that your app would solve, plan user authentication and their onboarding experience
ms.topic: conceptual
ms.localizationpriority: medium
ms.author: surbhigupta
---

# Planning checklist

Here's a checklist of important points to consider when you plan your Teams app. Use it as a guideline to ensure that your plan covers the important details of app development.

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
|
</details>
<br>
<details>
<summary>Understand the problem</summary>

| # | Consider... |
|--- | --- |
| 1 | What are the pros and cons of the current state system used by your users? |
| 2 | What are the issues faced by your users that you want to address? |
| 3 | What features or capabilities your users like and love in their current way of doing the process? |
|
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
|
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
|
</details>
<br>
<details>
<summary>Onboarding experience</summary>

| # | Consider... |
| --- | --- |
| 1 | What happens when a user first configures your tab in a channel? |
| 2 | If you are sharing cards with a messaging extension, does it make sense to add a small link to a learn more page to help introduce users to what else your app can do? |
| 3 | Do you expect most people to already have some context of what your app is for, or to have already used your services in another context? |
| 4 | Are they coming to your app with no prior knowledge? |
|
</details>
<br>
<details>
<summary>Personal scope apps</summary>

| # | Consider... |
| --- | --- |
| 1 | Are there one-on-one interactions with the app required for privacy or other reasons? For example, checking leave balance or other private information. |
| 2 | Is there going to be collaboration among users who might not have any common Teams? For example, finding upcoming organization wide events in a company. |
| 3 | Are there any personalized notifications or messages that will need to be sent to a user throughout the Teams app experience? |
|
</details>
<br>
<details>
<summary>Shared scope apps</summary>

| # | Consider... |
| --- | --- |
| 1 | Is the information presented by the app, either in tab or through a bot, relevant and useful for most of the members in a Team? For example, Scrum app. |
| 2 | Could the app’s context change depending on the team in which it is added to? For example, Planner’s tasks are different in different teams. |
| 3 | Is it possible that all members in a persona who need to collaborate are a part of a single team? For example, agents working on a ticket. |
|
</details>