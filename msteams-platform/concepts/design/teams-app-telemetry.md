---
title: Teams App Telemetry
author: heath-hamilton
description: Learn about Teams App Telemetry
ms.topic: conceptual
ms.localizationpriority: high
ms.author: surbhigupta
---

# Plan for Teams app telemetry

After an app is distributed in an organization or in Teams App Store, it's important to track how users are interacting with the app. With growing app users, number of app installs might not be a relevant metric. Understanding how users interact with the app, the kind of audience, what they're looking for, what features are most or least used are crucial items in advising future development strategy.

App analytics help understand user behavior, motivation, friction points that can help developer make informed decisions around feature investments, enhancements, and adoption for the app.

## Why is Teams App Telemetry important?

If you're a SaaS developer, you would already have telemetry tracked for some of your core business metrics. Your SaaS product might have an existing web app, or a mobile app, and you've now introduced a new Teams app. The Teams app is another surface to expose your solution to your end user, another window to your SaaS landscape.

As your solution scales across multiple platforms (web, mobile platforms, Teams), it’s important to view your telemetry in layers:

:::image type="content" source="../../assets/images/app-fundamentals/telemetry-in-layers.png" alt-text="Telemetry in layers" border="false":::

- **Core Application Telemetry**: Core Telemetry includes tracking and measuring of application-level metrics independent of the platform, client or surface area used by end user. A typical SaaS solution measures application sign-ups, trials, purchases, monthly or annual recurring revenue, aggregated number of users, churn among other data. If you have an existing SaaS solution, you would most likely be tracking these metrics already.
- **Modality specific Telemetry**: At a presentation level, your application is accessed by your end user across different modalities. Each modality has its own unique user interaction points. This is metadata that facilitates telemetry capture unique to that modality. For example, viewing a product might be tracked via page view in a web app vs. screen tracking in mobile app. Telemetry at this layer includes:

  - User Interactions: User clicks, views, sessions, system and custom events in the modality
  - Application performance monitoring: Performance measures such as time to load, response time of the solution in the modality
  - Modality specific metadata: device, browser information, tenant information

  Presumably, for pre-existing modalities, you would already be tracking the above information. As you add new modalities and new ways for your end user to experience your solution, it's important to add modality specific telemetry.

## What telemetry data do I track in my Teams app?

It's important to plan for the kind of data, metrics, and events you want to monitor as you develop your Teams app. Your product’s North Star metric would guide you in establishing the right set of metrics, core user action, and key events relevant for your business.

Excerpting from the “Teams Ecosystem - Journey to Marketplace Liquidity Whitepaper” authored by Michal:

:::row:::
    :::column span="":::

    *“To have long-term sustainability in our ecosystem an app must have good growth of new users. The second attribute is engagement and retention. Users must be coming back to the app and continue to find value in it and use it. Lastly, the third quality is revenue. The app must provide sufficient value to users, such that there is willingness to pay. Apps must possess all three of these qualities to be successful long-term on our platform. If any of these three qualities are missing that app has a low probability of success on our platform.”*

    :::column-end:::
    :::column span="":::

    :::image type="content" source="../../assets/images/app-fundamentals/engagement-retention.png" alt-text="Engagement and retention for long-term sustainability" border="false":::

    :::column-end:::
:::row-end:::

Your telemetry strategy should ensure measuring of your product across these three qualities.

### Monitor events for your app

For the purposes of this article, let’s use the HEART framework to indicate representative set of metrics, events you should consider monitoring for your solution. Please note that the below list is not exhaustive and you are encouraged to add additional telemetry relevant to your business and product.

:::image type="content" source="../../assets/images/app-fundamentals/monitor-telemetry.png" alt-text="Monitor events for your app" border="false":::

#### Adoption

**Goal**: Acquire new users who can start exploring the app thereby maintaining a healthy top of the funnel. Discovery and adoption of new apps happen in one of the following ways:

- User searches and installs the app on their own
- User stumbles upon the app when it’s shared in a chat, meeting or channel by another user. (Tab or adaptive card)
- Admin installs the app for users and app sends a welcome message

Telemetry designed to improve adoption should aim at improving discoverability of the app and its features as well. Likelihood of discovering an app among new users increases more when existing users start using the app in collaborative scope. E.g. Adding channel or meeting tab, adding a bot to channel, sharing messaging extension card in a Group Chat.

> [!TIP]
>
> - Measure usage of app in collaborative scope, time taken to discover your app features in collaborative or meeting scope. If the usage is low or time taken is high, socialize said features better in app or via marketing efforts.
> - While measuring overall adoption is good to start, measure adoption at a platform capability and feature level.

| Telemetry | Comments |
| --- | --- |
| • Users installing the app in R1, R7, R14, R28 days <br> • # Sign-ins (if app has sign-in) | • Segment users based on AAD profile <br> • Segment by Tenant, Org Name |
| • Average time taken to first use (click on Tab, Bot, Adaptive Card, Meeting) | • Report for using the app <br> • Report at a feature or platform capability level |
| • Extensibility point of first discovery <br> • Scope of first discovery | • Which extensibility point and scope are most of your users discovering your app? |
| • % of link unfurls leading to app installation |   |
| • Average time taken to add app in collaborative scope - in Channel, Group Chat, Meeting | -- |
| • % of users adding app in collaborative scope | • Helps in determining the potential for virality. i.e. organic discovery and use by new users |
| • % of users configuring the app after adding it in channel or group chat | • If app is not configured on day of install, there is 5% chance of user configuring it in following week |

#### Engagement & task success

**Goal**: Grow number of engaged quality users  who complete core actions within the app.

Core Action is defined as that User Action which is central to the business and directly contributes towards the North Star.  E.g. if you are an IT Ticketing solution provider, your core user action could be ‘Creating a Ticket’ with the steps of searching an issue, escalations being key business events in the user journey funnel that propel the users towards the core action.

Engagement intends to measure the intensity and depth of interaction between user and your app. Intensity of engagement measures how much user is using the app (e.g. no. core actions done in the app) and depth of interaction measures the number of various platform capabilities, scopes, app features that user has interacted.

> [!TIP]
>
> - It is important to measure engagement, usage not just at overall app level but at individual app capability and feature level as well. Decide on Core Actions and Key Business events that define engaged users for your business. Just signing in or viewing the app may not be quality engagement.
> - Core action is specific to your business and you should ideally have one core action correlating to your product’s North Start. Do not have more than 2-3 Core Actions.
> - Key Business events are auxiliary actions that user may take in their journey towards performing Core Action. Key Business events can help prepare a funnel view on how many users are going through the ideal user journey and determine points where drop offs are high.

| Telemetry | Comments |
| --- | --- |
| • # App users (R7, R14, R28) – DAU and MAU <br> • # App Users Trendline | • Segment users based on AAD profile, <br> • Report by Client – Desktop, Web and Mobile <br> • Segment by Tenant, Org Name <br> • Segment by product feature (Active users at feature level) |
| • % of users using key features in Teams App Vs. using the same feature in Web / Native App | • Report at app feature level <br> • Indicates discoverability, ease of use, and value of features within Teams App |
| • #, % users using the app across different scopes (R28) | • Report by scope <br> • Ability to drill down by capability |
| • #, % users using the app in different platform capabilities (R28) <br> • #, % Interacting with Tab <br> • #, % Interacting with Messaging extension <br> • #, % Interacting with Bot <br> • #, % Interacting with side panel in meeting <br> • #, % Interacting with Stage view | • If usage of any of platform capabilities is low, consider drilling into details on ease of use, value add. |
| Task Success |  |
| • % of users completing Core Action | • Report at a week level |
| • User Journey in Teams app – Funnel view with user drop offs | • Drill down at a tenant level |
| • Lostness Score for Core Action: <br> :::image type="content" source="../../assets/images/app-fundamentals/lostness-score-core-action.png" alt-text="Lostness score for core action" border="false"::: <br> where, <br> **L** = Lostness <br> **N** = The number of different, unique steps performed while performing Core Action. <br> **S** = The total number of steps performed while performing Core Action including repeat steps. <br> **R** = The minimum number of steps required to complete Core Action. | • Drill down at region & tenant level. <br> • If lostness is above 0.4 then app should improve the user experience to make completing core action easier for users. |
| • Mean time taken to perform Core Action | • Report alongside meantime taken performing core action outside Teams App |
| • Average number of times Core Action was performed in a month <br> • Average number of times Key Business events were performed in a month | • View month over month trend <br> • Drill down by Tenant |

#### Retention

**Goal**: Improve product stickiness by way of accruing benefits the more a user engages with the app.

User retention measures how frequent users come back to use the product. It essentially measures frequency of engagement. Users will repeatedly use your product if they get more benefits, the more they use a product and their switching costs are high. E.g. When a user starts adding tasks, action items they track as part of your app, it may help in better coordination across projects and gradually it becomes costlier to abandon your task management system.

> [!TIP]
>
> -  Users using multiple Teams platform capabilities are 20 – 35pp better retained than single capability users.
> - Converting new users to engaged platform users in their first week improves retention.
> - Users who perform creation events in your app have higher retention compared to users who passively consume information via notifications. Creation events depend on your business. For example, Creating a ticket, creating a new post, a project board etc.
> - Apps used multiple times (>5 times) in a  month have a better retention month over month. Recurring use cases with more frequency of usage improve retention.

| Telemetry | Comments |
| --- | --- |
| • New User Retention cohort analysis (week over week, month over month) | • Drill down to a tenant level <br> • Retention breakdown by client – Teams Desktop, Web & Mobile App, Non-Teams Web App |
| • User churn in 14 days, 28 days, 56 days, 72 days | • Drill down to a tenant level <br> • Platform Capability and feature drill down <br> • Churn breakdown by client – Teams Desktop, Web & Mobile App, Non-Teams Web App |
| • #, % users using app in more than 1 scope | • Goal would be to encourage use of app across different scopes |
| • #, % users using more than 1 capability of the app | • Goal would be to encourage users to use different platform capabilities supported by app |
| • Mean time between [Core Action 1,2..] per user | • Report at tenant level <br> • Goal would be to reduce this time to promote recurring usage |
| • % of users performing Creation events <br> • % of users performing Consumption events. Track: <br> &nbsp;&nbsp;- Read receipts for bot messages <br> &nbsp;&nbsp;- Notification clicks |   |
| • App capability or scope with high recurring usage |   |

#### Happiness

**Goal**: Provide sufficient, differentiated value to end user improving their willingness to pay.

Happiness intends to measure your user’s attitude towards your product and can translate to their willingness to pay, refer other users to your product. Happiness is mostly self-reported. There are leading indicators such as collecting feedback, satisfaction rating, lagging indicators include new subscriptions, users preferring to use Teams app over other modalities.

> [!TIP]
>
> - Happiness should be measured in context at right time and contextualized to user. Sending a generic survey on a fixed date might not give accurate happiness measurement as users might not remember their experience. 
> - Integrate product driven feedback capture, rating mechanisms for users to easily submit feedback and rating in the flow, after completing Core Action.
> - Provide adequate product support, helpdesk for users to get their queries clarified, report bugs and feedback.

| Telemetry | Comments |
| --- | --- |
| • App NPS or Feedback submission | • AAD, Tenant information |
| • % of happy / satisfied users | • Drill down at tenant level <br> • Report trend over time |
| • # new SaaS subscriptions via Teams App Store |   |
| • % users using Teams App Vs. Web or Mobile App | • Report month over month |
| • User feedback on experience after completing Core Action | • Introduce product led way for collecting feedback after completing Core Action |
