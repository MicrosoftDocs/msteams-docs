---
title: FAQs
description: Answers to frequently asked questions
ms.topic: conceptual
---

# Universal actions for adaptive cards

**Question -** How is `Action.Execute` different than `Action.Submit` or `Action.Http`? <br>
**Answer -** `Action.Execute` works across hubs including Teams and Outlook. Moreover, an adaptive card can be returned as reponse for an Action.Execute triggered `adaptiveCard/action` invoke request.

**Question -** What is refresh? <br>
**Answer -** Refresh in adaptive cards is powered with `Action.Execute`. Refresh enables scenarios with [role based views](~/Role-Based-Views.md) and [up-to-date views](~/Up-To-Date.md).
