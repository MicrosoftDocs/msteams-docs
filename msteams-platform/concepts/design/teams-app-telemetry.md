---
title: Teams App Telemetry
author: heath-hamilton
description: Learn about Teams App Telemetry
ms.topic: conceptual
ms.localizationpriority: high
ms.author: surbhigupta
---

# Teams app telemetry

After an app is distributed in an organization or in Teams App Store, it's important to track how users are interacting with the app. With growing app users, number of app installs might not be a relevant metric. Understanding how users interact with the app, the kind of audience, what they're looking for, what features are most or least used are crucial items in advising future development strategy.

App analytics help understand user behavior, motivation, friction points that can help developer make informed decisions around feature investments, enhancements, and adoption for the app.

## Why is Teams App Telemetry important?

If you're a SaaS developer, you would already have telemetry tracked for some of your core business metrics. Your SaaS product might have an existing web app, or a mobile app, and you've now introduced a new Teams App. The Teams App is another surface to expose your solution to your end user, another window to your SaaS landscape.

As your solution scales across multiple platforms (web, mobile platforms, Teams), it’s important to view your telemetry in layers:

:::image type="content" source="../../assets/images/app-fundamentals/telemetry-in-layers.png" alt-text="Telemetry in layers":::

- **Core Application Telemetry**: Core Telemetry includes tracking and measuring of application-level metrics independent of the platform, client or surface area used by end user. A typical SaaS solution measures Application sign-ups, trials, purchases, monthly or annual recurring revenue, aggregated number of users, churn among other data. If you have an existing SaaS solution, you would most likely be tracking these metrics already.
- **Modality specific Telemetry**: At a presentation level, your application is accessed by your end user across different modalities. Each modality has its own unique user interaction points, meta data that facilitates telemetry capture unique to that modality. E.g. viewing a product might be tracked via page view in a web app vs. screen tracking in mobile app. Telemetry at this layer includes:

  - User Interactions: User clicks, views, sessions, system and custom events in the modality
  - Application performance monitoring: Performance measures such as time to load, response time of the solution in the modality
  - Modality specific metadata: device, browser information, tenant information

  Presumably, for pre-existing modalities, you would already be tracking the above information. As you add new modalities and new ways for your end user to experience your solution, it's important to add modality specific telemetry.
