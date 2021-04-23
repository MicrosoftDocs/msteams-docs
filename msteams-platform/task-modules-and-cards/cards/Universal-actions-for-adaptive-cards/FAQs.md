---
title: Frequently Asked Questions
description: Answers to frequently asked questions
ms.topic: conceptual
---

# Frequently Asked Questions (FAQs)

Question: How is `Action.Execute` different than `Action.Submit` or `Action.Http`? <br/>
Answer: `Action.Execute` works across hubs including Teams and Outlook. Moreover, an Adaptive Card can be returned as response for an `Action.Execute` triggered `adaptiveCard/action` invoke request.

Question: What is refresh? <br/>
Answer: Refresh in Adaptive Cards is powered with `Action.Execute`. Refresh enables scenarios with [role-based views](Role-Based-Views.md) and [up-to-date views](Up-To-Date-Views.md).
