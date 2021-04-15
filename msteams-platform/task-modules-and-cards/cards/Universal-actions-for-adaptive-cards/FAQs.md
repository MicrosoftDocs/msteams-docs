---
title: FAQs
description: Answers to frequently asked questions
ms.topic: conceptual
---

# Universal actions for adaptive cards

**Question -** How is `Action.Execute` different than `Action.Submit` or `Action.Http`? <br>
**Answer -** `Action.Execute` works across hubs including Teams and Outlook. Moreover, an adaptive card can be returned as reponse for an Action.Execute triggered `adaptiveCard/action` invoke request.

**Question -** What is refresh? <br>
**Answer -** Refresh in adaptive cards is powered with `Action.Execute`. Refresh enables scenarios with [role based views](~/Role-Based-Views.md), [Sequential Workflows](~/sequential-workflows) and [up-to-date views](~/Up-To-Date.md).

**Question -** What are userIds? <br>
Answer: UserIds is an array of user MRIs which is part of the refresh property in adaptive cards.

**Question -** Where can I find these user Ids or user MRIs? <br>
**Answer -** [This document explains how bot developers can fetch Teams conversation memebers](https://docs.microsoft.com/en-us/microsoftteams/platform/bots/how-to/get-teams-context?tabs=dotnet#fetch-the-roster-or-user-profile)

**Question -** How does Teams user MRI look like? <br>
**Answer -** Example - `29:1bSnHZ7Js2STWrgk6ScEErLk1Lp2zQuD5H2qQ960rtvstKp8tKLl-3r8b6DoW0QxZimuTxk_kupZ1DBMpvIQQUAZL-PNj0EORDvRZXy8kvWk`

**Question -** How many user MRIs can I add to userIds list? Why? <br>
**Answer -** Five. This is because channels in Teams can include a large number of members. If all members are viewing the channel at the same time, an unconditional automatic refresh results in many concurrent calls to the bot. To avoid this, the `userIds` property must always be included to identify which users must get an automatic refresh.

**Question -** How does refresh work for users whose user MRI is not present in userIds list in refresh property? <br>
**Answer -** These users get an option for manually refreshing their cards. On Teams, these users would see an `Refresh Card` option in the triple dot menu in web/desktop while they would see the same option on long press context menu in mobile (android/iOS).
