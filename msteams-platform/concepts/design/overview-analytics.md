---
title: Analytics overview
author: heath-hamilton
description: Learn to plan and build analytics for your Teams app.
ms.topic: conceptual
ms.localizationpriority: high
ms.author: surbhigupta
---

# Overview

<!--Plan analytics for your Teams app-->

As a developer, you build an app for millions of Microsoft Teams users to achieve specific business or customer goals. For this purpose, you distribute it using one or more of the many distribution options available to you. After the app is published, you'll want to measure how your app is performing in the real-world.

You'll also be interested in monitoring many data points, such as:

- Who is interested in your app?
- Which users and organizations are using your app?
- How are users engaging with your app?
- Which users have churned away after using your app for some time?

This information helps you analyze the data against your business goals, take corrective action by fixing issues. It also helps you to intervene in the user journey or make informed decisions around feature investments, enhancements, and adoption for the app.

**But Teams app usage report must suffice, isn’t it?**

As the app’s developer, you can track your app’s usage in the [Teams app usage report](../deploy-and-publish/appsource/post-publish/overview.md#analyze-app-usage) in Partner Center within a week after publishing your app on the Teams public app store. Custom app developers can find [usage analytics for their custom apps](../build-and-test/analyze-your-apps-usage-in-developer-portal.md) in the Developer Portal for Teams. Partner Center's usage report provides standard metrics that enable you to track user demand, user churn, and frequency of usage for your app. These reports are available at an aggregate level, such as:

- Monthly, daily, and weekly active users.
- Retention and intensity charts.
- Users who have used your app more than five days in the last month.
- Platform, operating system, and geographic split of users for your app, and so on.

The out-of-box usage reports available in Partner Center or the Developer Portal for Teams can't provide you with in-depth analytics of what goes on inside your app and specific user-level analytics. Such analytics include a user’s journey within your app or a user’s engagement with specific features and measuring scenario completions.

Your app on Teams is essentially a web-based service hosted elsewhere, for example, Azure cloud. It's embedded and surfaced inside Microsoft Teams shell where users can use your app. This applies to your app irrespective of the [platform capabilities](../../overview-explore.md) used, such as tabs, bots, message extensions, meeting extensions, cards, dialogs, and so on. All these capabilities are a means to surface web-based experiences inside Teams.

Plan analytics for the Teams app the same way as you do for a SaaS product that runs on the web browser.

## Plan early for analytics

Plan analytics for your Teams app at the development design and solution architecture stage. Examine which of the existing data instrumentation and practices for your core SaaS web app will accrue to hosted canvas constructs such as tabs, dialogs, meeting apps and so on. in Teams that you’re optimizing or building from scratch to surface inside Teams. For Teams-specific capabilities, such as [conversational constructs](#conversational-constructs) like bots, message extensions, and so on, you'll need to plan and implement analytics instrumentation, capture relevant events, and context from the SDK methods from scratch.

At the time, your production Teams app is live on the Teams public app store and customers start using it, your analytics and data infrastructure should be fully operational. It ensures that you don’t miss tracking:

- Instrumentation markers getting fired.
- Teams-specific events and the relevant contextual information contained in these events, some of which are triggered for you to capture in your SaaS backend for later use.

For example, the Azure AD user ID for a Teams user should be captured when a specific bot event is fired when a user installs the bot app. This user ID can be mapped to the user’s real-world profile identity, such as email address. It allows you to send proactive notifications to the user later via the bot.

## Instrumenting your app for analytics

Instrumenting your code with analytics markers (also known as instrumentation markers) is a standard web application development practice. Robust instrumentation in your code is critical for long-term success. It helps you to measure both aggregate and user-specific metrics.

> [!NOTE]
> Before you begin, always remember to handle user data in accordance with your strict data handling and privacy policies, and in compliance with your regulatory obligations.

Teams App is another surface to expose your solution to your end user, another window to your SaaS landscape. As your solution scales across multiple platforms (web, mobile platforms, and Teams), it’s important to view your instrumentation in layers:

:::image type="content" source="../../assets/images/app-fundamentals/telemetry-in-layers.png" alt-text="Telemetry in layers" border="false":::

There are two types of data instrumentation relevant for your solution:

- [Data instrumentation for your core SaaS product or app](#data-instrumentation-for-your-core-saas-product-or-app)

- [Data instrumentation in your app specific to Teams](#data-instrumentation-in-your-app-specific-to-teams)

> [!NOTE]
> The rest of this document only recommends the in-context data you can use but doesn't supersede your regulatory obligations.

### Data instrumentation for your core SaaS product or app

This is the instrumentation that you'll do for your browser-based SaaS app irrespective of whether you’re integrating with Teams or not. If you have a browser-based SaaS app, in all likelihood, you'll have this instrumentation already done in your code. This is how you can see click analytics and customer lifecycle analytics. You can also see conversion analytics metrics, such as bounce rate, page views, unique visitor count, session counts, engagement time, click through rate, and many more for your web app.

### Data instrumentation in your app specific to Teams

This instrumentation is required to be done additionally in your SaaS app because it's now surfacing inside of the Teams client. At a presentation level, your application is accessed by your end user across different modalities. Each modality has its own unique user interaction points, meta data that facilitates instrumentation capture unique to that modality. For example, viewing a product might be tracked via page view in a web app vs. screen tracking in mobile app. Similarly, your Teams app may have used one or more of the platform capabilities only available inside Teams such as bots, message extensions and so on. or you have crafted experiences to address use cases unique to Teams such as meeting extensions, intelligent M365-aware scenarios using Microsoft Graph, link unfurling, and so on. Capturing instrumentation from these unique Teams app experiences is covered in more detail in the rest of this document.

## Instrumenting for Teams app specific analytics

<!--Tracking Teams app specific analytics-->

This section includes guidelines and pointers regarding what to look for, which events to capture, how to use instrumentation markers, and where to fetch Teams-relevant information that will help you plan and implement analytics for your app. Your Teams apps can be tabs, bots, message extensions, cards, stage views and so on. or any combination of these [capabilities and UI constructs](../../overview-explore.md#teams-app-features) across personal or shared scopes. It's best to understand, plan, and implement your instrumentation around each of these capabilities.

You can classify Teams platform features into broadly two constructs:

- [Hosted web canvas constructs](#hosted-web-canvas-constructs)
- [Conversational constructs](#conversational-constructs)

#### Hosted web canvas constructs

Visual canvas-oriented capabilities are Teams-aware webpages embedded in Microsoft Teams, such as tabs, personal apps, dialogs (displaying an embedded iframe), stage views, meeting tabs, shared meeting stage, and in-meeting dialogs. They're hosted in the cloud with the rest of your SaaS app that runs in the web browser.

These webpages often have the instrumentation done for core SaaS web app needs. You just need to capture Teams-specific events and handle them for Teams-specific instrumentation in your code. It's handy for your analytics needs that tabs are “Teams-aware” webpages.

When you build a tab following [prerequisites defined here](../../tabs/how-to/tab-requirements.md), add the [Teams JavaScript client SDK](/javascript/api/overview/msteams-client) to your tab's content or configuration page. It ensures that your page can access Teams-specific information or [context](../../tabs/how-to/access-teams-context.md). Use this information for useful user-specific insights, such as:

- Microsoft 365 tenant ID (Azure AD tenant) for the current user (`tid`). In Microsoft 365 or Azure AD, a tenant is representative of an organization, that is, the user’s company. The Microsoft 365 tenant ID is useful to find out and log which Microsoft 365 tenant the user belongs to. Once you know the tenant ID, you can find out the tenant domain for the organization, which often reveals the organization’s name, using this [Graph API](/graph/api/tenantrelationship-findtenantinformationbytenantid). Ensure to invoke this API in your Microsoft 365 Developer tenant since you’ll be able to consent to the required tenant administrator permission it needs.
- License type assigned to the user and the SKU for the current user’s tenant. Possible values are F1, E1, E3, and E5 enterprise plans for (`licenseType`) and enterprise, free, edu, and unknown for (`tenantSKU`).
- The context where the tab URL is loaded. Some possible values can be content page, dialog, tab settings dialog, tab remove dialog, meeting sidePanel, and so on. (`frameContext`).
- Host client type where tab is loaded. Possible values are Android, IoS, web, desktop, surfaceHub, and so on. (`hostClientType`). You can slice your analytics data.
- Locale awareness for the user to indicate language, for example, en-us, fr-fr, ja-jp and so on. (`locale`).
- User Principal Name or login hint (`loginHint`) of the current user in the current tenant (usually user’s email address).
- Team name and channel name where the channel tab is added (`teamName`, `channelName`).
- Unique ID for the current app session inside a tab used for correlating instrumentation data (`appSessionId`).
- Meeting ID is used by a tab running in the meeting context and is added for the response payload (`meetingId`).
- Microsoft Azure AD ID of the current user.

After you extract the Teams-specific information from the tab context, some possible ways you can use it are shown in the following examples:

| Track Teams-specific information | Outcome |
| --- | --- |
| User's organization. | Track demand for your app, especially if you offer trial period for new sign-ups or freemium offering for your SaaS product for sales outreach, onboard organization, check in for assistance. |
| User’s organization type and user’s role. | Use license type and tenant SKU to construct a customer profile for the Teams user. Slice your analytics data, such as, usage, sessions, retention, and so on. accordingly, and tailor your features, experiences, and so on. accordingly. |
| Host client type, locale and usage context inferences from team or channel names. | Enrich the customer’s profile in your user analytics. |
| Frame context.  | Get information about the context in which the user is using your app, user's journey, and usage pattern from various surface areas, capabilities, and scopes. Craft your user's experiences accordingly and invest more in capabilities popular with your users. |
| User's email address. | Associate a meaningful, real-world identity with the Teams user, and provide the Microsoft 365 tenant organization’s domain address, that is, contoso.onmicrosoft.com. Identify the organization the user belongs to. The email address of the user can be used to complete the user’s profile and communicate with the user for activation, re-marketing, and re-engagement. However, be careful not to misuse this channel or spam the user. |
| Azure AD user or object ID. | Obtain and store the unique Azure AD user or object ID at the time of app (bot) installation. Send any proactive notification to the user via your bot. |

#### Conversational constructs

Conversation or chat-oriented capabilities include bots, message extensions, cards and dialogs (displaying an Adaptive Card) that are created for Teams users. Conceptually, these experiences are created for and available only to users specifically inside Teams. You'll need to capture Teams-specific events and handle them for Teams-specific instrumentation in your code for these constructs from scratch. A bot can access additional context data about a team, chat, meeting, 1:1 call, or group call where it's installed.

Use this information for enriching the bot's functionality and the user experience:

- Query the bot for the list of members and their basic user profiles, including Teams user IDs and Microsoft Azure AD information, such as name and Azure AD user or object ID.

- Use the user’s Azure AD user or object ID to find the user’s first name, surname, email address, tenant ID, and user’s role in the team. Leverage these details as described for hosted web canvas constructs.

- If your bot is installed in a team, query it for metadata about that team including the Azure AD group ID and the team’s name. It can also query the list of channels in the team, which returns channel IDs and names. Leverage this information for configuration, setup, and personalization.

- Using the Meeting Details API, get a meeting's or call’s static metadata, such as type of meeting (for example, `GroupCall`, `OneToOneCall`, `Adhoc`, `Broadcast`, `MeetNow`, `Recurring`, `Scheduled`, or `Unknown`), conversation type, organizer tenant ID, and so on.

Each activity sent by Teams to your bot will contain the `turnContext` object from which all these relevant fields can be retrieved. You can leverage them in a similar way as described for hosted web canvas constructs.

Since message extensions are based on the bot channel, most of the above applies to message extensions as well.

## Aggregate and user-specific insights

Besides the obvious metrics in the SaaS world such as daily, weekly, monthly active users, time spent in your app and so on., implementing analytics thoughtfully for your Teams app per the guidance above will allow you to get insights such as:

- **Aggregate metrics**
  - Which platform capabilities, surface areas (for example, tabs, bots, message extensions) and UI constructs (cards, dialogs, stage views) leveraged in your Teams app found the most usage by your users?
  - Which scope or UI entry point (like personal app, channel, group chat) is the most used by your users to invoke your app and begin a new app session inside Teams?
  - How many days on an average do users use your app in the first week after installing the app?
  - What is the week-over-week or month-over-month new user retention cohort analysis for your app or specific capabilities (like personal app or bot) in your app?
  - How many users use your app only on Teams mobile clients?
  - How many users have used the camera device capability in your app?
  - What does the funnel analysis reveal for your app across phases, from app installation to activation to engagement to retention and finally, monetization? Where are the drop-offs happening?
  - How many users have installed your app in the past one week?
  - How many users have churned from your app in the last three months? What is the resulting quarterly churn rate?
  - Which organization has seen the maximum number of installations for your app in the past 30 days?
  - Which organizations do the users installing your app in the past 14 days belong to?
  - Which organization has seen the maximum number of trial sign-ups for your app in the last seven days?
  - What types of meetings (`GroupCall`, `OneToOneCall`, `Adhoc`, `Broadcast`, `MeetNow`, `Recurring` or `Scheduled`) is your app used in?

- **User-specific metrics**
  - Which users are yet to experience the channel tabs capability you’ve implemented in your app in the last app update?
  - Which users haven't completed the onboarding inside the personal app?
  - Among the users who have installed the app in the last one week, which users haven't returned to the app even once for engagement after installation?
  - Which users have installed the app but haven't signed-in to the app yet?
  - How many times has a specific user used your Teams app in the past 30 days?
  - How many days a specific user has actively used your app in the past seven days?
  - When was the last time a specific user used your app in Teams?
  - What has been a specific app user’s journey inside Teams?
  - Which users have churned from your app in the past three months?
  - Has a specific user used your app in a Teams meeting?

Next, see how you should methodically craft your data instrumentation strategy and decide what to measure based on which specific insights you want to derive from your Teams app usage. 

## Next step

> [!div class="nextstepaction"]
> [Strategize and decide what to measure](strategize-measure.md)
