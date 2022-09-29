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

:::image type="content" source="../../assets/images/app-fundamentals/telemetry-in-layers.png" alt-text="Telemetry in layers" border="false":::

- **Core Application Telemetry**: Core Telemetry includes tracking and measuring of application-level metrics independent of the platform, client or surface area used by end user. A typical SaaS solution measures Application sign-ups, trials, purchases, monthly or annual recurring revenue, aggregated number of users, churn among other data. If you have an existing SaaS solution, you would most likely be tracking these metrics already.
- **Modality specific Telemetry**: At a presentation level, your application is accessed by your end user across different modalities. Each modality has its own unique user interaction points, meta data that facilitates telemetry capture unique to that modality. E.g. viewing a product might be tracked via page view in a web app vs. screen tracking in mobile app. Telemetry at this layer includes:

  - User Interactions: User clicks, views, sessions, system and custom events in the modality
  - Application performance monitoring: Performance measures such as time to load, response time of the solution in the modality
  - Modality specific metadata: device, browser information, tenant information

  Presumably, for pre-existing modalities, you would already be tracking the above information. As you add new modalities and new ways for your end user to experience your solution, it's important to add modality specific telemetry.

## What telemetry data do I track in my Teams app?

It is important to plan for the kind of data, metrics and events you want to monitor as you develop your Teams app. Your product’s North Star metric would guide you in establishing the right set of metrics, core user action and key events relevant for your business.

Excerpting from the “Teams Ecosystem - Journey to Marketplace Liquidity Whitepaper”  authored by Michal,

:::row:::
    :::column span="":::

    *“To have long-term sustainability in our ecosystem an app must have good growth of new users. The second attribute is engagement and retention. Users must be coming back to the app and continue to find value in it and use it. Lastly, the third quality is revenue. The app must provide sufficient value to users, such that there is willingness to pay. Apps must possess all three of these qualities to be successful long-term on our platform. If any of these three qualities are missing that app has a low probability of success on our platform.”*

    :::column-end:::
    :::column span="":::

    :::image type="content" source="../../assets/images/app-fundamentals/engagement-retention.png" alt-text="Engagement and retention for long-term sustainability" border="false":::

    :::column-end:::
:::row-end:::


Your telemetry strategy should ensure measuring of your product across these three qualities.

