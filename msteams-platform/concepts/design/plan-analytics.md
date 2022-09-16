---
title: Plan analytics for your Teams app
author: heath-hamilton
description: Learn to plan and build analytics for your Teams app.
ms.topic: conceptual
ms.localizationpriority: high
ms.author: surbhigupta
---

# Plan analytics for your Teams app

As a developer you build an app for millions of Microsoft Teams users to achieve specific business or customer goals. For this purpose, you distribute it using one or more of the many distribution options available to you. After the app is published, you'll want to measure how your app is performing in the real-world once published.

You'll also be interested in monitoring many data points, such as:

- Who is interested in your app
- Which users and organizations are using your app
- How are users engaging with your app
- Which users have churned away after using your app for some time and

This information helps you analyze the data against your business goals, take corrective action by fixing issues, and intervening in the user journey or plan further enhancements to your app.

**But Teams app usage report must suffice, isn’t it?**

As the app’s developer, you can track your app’s usage in the [Teams app usage report](../deploy-and-publish/appsource/post-publish/overview.md#analyze-app-usage) in Partner Center within a week after publishing your app on the marketplace. The usage report provides standard metrics that enable you to track user demand, user churn and frequency of usage for your app. These reports are available at an aggregate level, such as:

- Monthly, Daily, and Weekly active users
- Retention and intensity charts
- Users who have used your app more than five days in the last month
- Platform, operating system, and geographic split of users for your app, etc.

Teams usage reports can't provide you in-depth analytics of what goes on inside your app and specific user-level analytics. Such analytics include a user’s journey within your app or a user’s engagement with specific features and scenario completions within your app.

Your app on Teams is essentially a web-based service hosted elsewhere, for example, Azure cloud. It's embedded to be surfaced inside Microsoft Teams shell where end-users can use your app. This applies to your app irrespective of the
[platform capabilities](../../overview-explore.md) used such as tabs, bots, message extensions, meeting extensions, cards, task modules etc. since all of these are a means to surface web-based experiences inside Teams.

Plan analytics for the Teams app you’re building the same way as you do for your SaaS product that runs on the web browser.

//Planned flow: When to plan > Generate insights > Instrumenting app (what) to generate insight > Act on insight > How to grow app > How to monetize, monitor, plan for next update //

## Plan early for analytics

<!--
Teams provides you specific information that you can use to not just analyze who’s using your app, where users are using your app in Teams, get a robust idea of the user’s profile – all of which can be used to tailor the experience for the user and monitor your app’s performance and return on your investment.
-->

Plan analytics for your Teams app at the dev design and solution architecture stage. For Teams-specific capabilities, such as conversational constructs that is, bots, message extensions etc., you'll need to plan and implement analytics instrumentation, capture relevant events, and context from the SDK methods from scratch.

At the time your production Teams app is live and being used on the marketplace, your analytics and data infrastructure should be fully operational. It ensures that instrumentation markers get triggered in time to capture:

- Teams-specific events
- Event-specific contextual information
- Events that can be acted on and captured in your SaaS backend only once at the time they are triggered

> [!NOTE]
> An example of an information that can be captured only once is the Azure AD user ID for a Teams user. It is notified through a bot event only at the installation of the the bot app for that user. This user ID is vital to mapping the user to a real-world profile identity, such as email address, which you can use to send proactive notifications to the user later.

Additionally, planning analytics enables you to examine your existing data instrumentation practices. It helps you determine if such existing practices would be useful for Teams canvas constructs such as tabs, task modules, meeting apps etc. You can also check the possibility of extending your existing practices to Teams tab experiences you're building.

<!--Whether it is examining which of the existing data instrumentation and practices for your core SaaS web app will accrue to hosted canvas constructs such as tabs, task modules, meeting apps etc. in Teams

 or 

how to extend existing data instrumentation practices to tab experiences you’re building from scratch for Teams, 

analytics should never be an afterthought.-->

<!--
At the time, your production Teams app is live on the marketplace and customers start using it, your analytics and data infrastructure should be fully operational so that you don’t miss tracking instrumentation markers getting fired, Teams-specific events and the relevant, contextual information contained in these events, [some of which are only triggered once for you to act upon and capture in your SaaS backend for example, Azure AD user ID for a Teams user is only notified via a specific bot event at the time of installation of the bot app for the user]. This user ID is mandatory to be captured and mapped to the user’s real-world profile identify such as email address to be able to then send proactive notifications to the user later via the bot.-->

### Aggregate and user-specific insights

Besides the generic reports for daily, weekly, and monthly active users, time spent in your app etc., implementing analytics will allow you to get aggregate and user-specific insights:

- **Aggregate metrics**
  - Which scope or UI entry point (for example, personal app, channel, group chat) is the most used by your users to invoke your app and begin a new app session inside Teams?
  - How many days on an average do users use your app in the first week after installing the app?
  - Week over week / month over month new user retention cohort analysis for your app or specific capabilities (for example, personal app or bot) in your app?
  - How many users use your app only on Teams mobile clients?
  - How many users have used the camera device capability in your app?
  - What does the funnel analysis for your app from app installation to activation to engagement to retention and finally, monetization reveal? Where are the drop-offs happening?
  - How many users have installed your app in the last one week?
  - How many users have churned from your app in the last three months? What is the resulting quarterly churn rate?
  - Which organization has seen the maximum number of installation for your app in the last 30 days?
  - Which organizations do the users installing your app in the last 14 days belong to?
  - Which organization has seen the maximum number of trial sign-ups for your app in the last seven days?
  - What types of meetings (GroupCall, OneToOneCall, Adhoc, Broadcast, MeetNow, Recurring or Scheduled) is your app used in?

- **User-specific metrics**
  - Which users are yet to experience channel tabs capability you’ve implemented in your app in the last app update?
  - Which users haven't completed the onboarding inside the personal app?
  - Among the users who have installed the app in the last one week, which users haven't returned to the app even once for engagement after installation?
  - Which users have installed the app but haven't signed-into the app yet?
  - How many times has a specific user used your Teams app in the last 30 days?
  - How many days a specific user has actively used your app in the last seven days?
  - When was the last time a specific user had used your app in Teams?
  - What has been a specific app user’s journey inside Teams?
  - Which users have churned from your app in the last three months?
  - Has a specific user used your app in a Teams meeting?

// link user-specific metrics from user ID //

## Instrumenting your app for analytics

Instrumenting your code with analytics markers (also known as telemetry markers) are standard web application development practice. Robust telemetry instrumentation in your code is critical for long-term success. It helps you to measure both aggregate and user-specific metrics, which is required to determine product, growth, marketing, and business decisions.

<!--You must already know that instrumenting your code with analytics markers (also known as telemetry markers) are standard web application development practice. Data instrumentation in your code is critical for long-term success since without robust telemetry instrumentation you'll be unable to measure both aggregate as well as user-specific metrics required to base product, growth, marketing and business decision upon.-->

<!-- Infogfx and links to relevant sections -->

// Infogfx concept

core SaaS product or app >  Data instrumentation < Specific to Teams platform capabilities

Cross-refer: Plan to monetize your app; Monetize your app, Plan your app, Map use cases to Teams features //

There are broadly two types of data instrumentation relevant for your Teams app:

<!--
- **Data instrumentation for your core SaaS product or app**: This is the instrumentation that you'll do for your browser-based SaaS app irrespective of whether you’re integrating with Teams or not. If you have a browser-based SaaS app, in all likelihood, you'll have this instrumentation already done in your code. This is how you can see select analytics, customer lifecycle analytics and conversion analytics metrics such as bounce rate, page views, unique visitor count, session counts, engagement time, select through rate etc. and many more for your web app.-->

- **Data instrumentation for your core SaaS product or app**: This is required for your browser-based SaaS app. This instrumentation is often already done in your browser-based SaaS app's code. You can select analytics, customer lifecycle analytics and conversion analytics metrics such as bounce rate, page views, unique visitor count, session counts, engagement time, select through rate etc. and many more for your web app.

<!--
- **Data instrumentation in your app specific to Teams**: This is the instrumentation that you require to do additionally in your SaaS app because it's now surfacing inside of the Teams client, you may have leveraged one or more of the platform capabilities only available inside Teams such as bots, message extensions etc. or you have crafted experiences to address use cases unique to Teams such as meeting extensions, intelligent M365-aware scenarios using Microsoft Graph, link unfurling etc. This is what is covered in more detail in the rest of this document.-->

- **Data instrumentation in your app specific to Teams**: This is required additionally in your SaaS app when you surface it inside of the Teams client. Your app may have Teams platform capabilities, such as bots, message extensions etc. It may also have experiences to address use cases unique to Teams such as meeting extensions, intelligent M365-aware scenarios using Microsoft Graph, link unfurling etc.

  This is what is covered in more detail in the rest of this document.

### Data instrumentation in your app specific to Teams

Below are guidelines and pointers regarding what to look for, which events to capture, how to instrument telemetry markers, where to fetch Teams-relevant information that will help you plan and implement analytics for your app. Since your Teams apps can be tabs, bots, message extensions, cards, stage views etc. or any combination of these [capabilities and UI constructs](../../overview-explore.md#teams-app-features) across personal or shared scopes, it's best to understand, plan and implement your instrumentation around each of these capabilities.

You can classify Teams platform features into broadly two constructs:

- **Hosted web canvas constructs** <!--These are visual canvas-oriented capabilities such as tabs, personal apps, task modules (displaying an embedded iframe), stage views, meeting tabs, shared meeting stage and in-meeting dialogs. Conceptually, all of these are Teams-aware webpages embedded in Microsoft Teams and likely hosted in the cloud with the rest of your SaaS app that runs in the web browser. As mentioned above, the webpages will likely already have the instrumentation done for your core SaaS web app needs. You just need to capture Teams-specific events and handle them for Teams-specific instrumentation in your code.-->

- **Conversational constructs** <!--These are conversation or chat-oriented capabilities such as bots, message extensions, cards and task modules (displaying an adaptive card). Conceptually, these are experiences only created for and available to users specifically inside Teams. You'll need to capture Teams-specific events and handle them for Teams-specific instrumentation in your code for these constructs from scratch.-->

#### Hosted web canvas constructs

Visual canvas-oriented capabilities are Teams-aware webpages embedded in Microsoft Teams, such as tabs, personal apps, task modules (displaying an embedded iframe), stage views, meeting tabs, shared meeting stage, and in-meeting dialogs. They are hosted in the cloud with the rest of your SaaS app that runs in the web browser.

These webpages often have the instrumentation done for core SaaS web app needs. You just need to capture Teams-specific events and handle them for Teams-specific instrumentation in your code. What comes in handy for your analytics needs is the fact that tabs are “Teams-aware” webpages.

<!--Following the [prerequisite to build a tab](../../tabs/how-to/tab-requirements.md), since you always add the [Teams JavaScript client SDK](/javascript/api/overview/msteams-client) to your tab’s content or configuration pages, your page gains access to Teams-specific information or [context](../../tabs/how-to/access-teams-context.md), which can be leveraged for useful insights about your users such as:-->

When you build a [tab](../../tabs/how-to/tab-requirements.md), add the [Teams JavaScript client SDK](/javascript/api/overview/msteams-client) to your tab's content or configuration page. It ensures that your page can access Teams-specific information or [context](../../tabs/how-to/access-teams-context.md). Use this information for useful user-specific insights, such as:

<!--
| Teams-specific information | User insights|
| --- | --- |
| Microsoft 365 tenant ID | Tenant domain for the organization and the organization’s name |
| User's license type and SKU for the current tenant | F1, E1, E3, and E5 enterprise plans for (licenseType) and enterprise, free, edu, unknown for (tenantSKU) |
| Context where the tab URL | Content page, task module, tab settings dialog, tab remove dialog, meeting sidePanel etc. (frameContext) |
| Host client type where tab is loaded | Android, IoS, web, desktop, surfaceHub etc. (hostClientType) – You can slice your analytics data |
| Locale awareness for the user | Indication of user's language for example, en-us, fr-fr, ja-jp etc. (app locale) |
| User Principal Name or login hint (user name) in the current tenant (user’s email address) | -- |
| Team name and channel name Team name and channel name | -- |
| Unique ID for the current app session inside a tab used for correlating telemetry data (appSessionId) | -- |
| Meeting ID is used by a tab running in the meeting context | response payload contains the meetingId |
|  Microsoft Azure Active Directory (Azure AD) ID of the current user | -- |
-->

- Microsoft 365 tenant ID (Azure AD tenant) for the current user (tid). In Microsoft 365 or Azure Active Directory (Azure AD), a tenant is representative of an organization that is, the user’s company. The Microsoft 365 tenant ID is specifically useful to find out and log which Microsoft 365 tenant the user is belonging to. Once you know the tenant ID, you can find out the tenant domain for the organization, which often reveals the organization’s name.
- License type assigned to the user and the SKU for the current user’s tenant. Possible values are F1, E1, E3, and E5 enterprise plans for (licenseType) and enterprise, free, edu, unknown for (tenantSKU).
- The context where the tab URL is loaded. Some possible values can be content page, task module, tab settings dialog, tab remove dialog, meeting sidePanel etc. (frameContext).
- Host client type where tab is loaded. Possible values are Android, IoS, web, desktop, surfaceHub, etc. (hostClientType). You can slice your analytics data.
- Locale awareness for the user to indicate language for example, en-us, fr-fr, ja-jp etc. (app locale).
- User Principal Name or login hint (user name) of the current user in the current tenant (usually user’s email address).
- Team name and channel name Team name and channel name is added (teamName, channelName).
- Unique ID for the current app session inside a tab used for correlating telemetry data (appSessionId).
- Meeting ID is used by a tab running in the meeting context and is added for the response payload (meetingId).
- Microsoft Azure Active Directory (Azure AD) ID of the current user.

<!-- replace with cross-functional chart infogfx to show links between Teams-specific information and type of analytics 

**Information > Analytics > Outcome**

- User's organization > track demand > Sales outreach, onboard organization, check in for assistance
- license type and tenant SKU > user's organization, user role > create customer profile, slice analytics data
- 
 -->

After you extract the Teams-specific information from the tab context, use it as shown in the following examples:

<!--To illustrate how the wealth of useful Teams-specific information obtained from the tab context above can be used by you, consider the following examples:-->

| Track Teams-specific information | Outcome |
| --- | --- |
| User's organization | Track demand for your app, especially if you offer trial period for new sign-ups or freemium offering for your SaaS product for Sales outreach, onboard organization, check in for assistance |
| User's organization and role | Use license type and tenant SKU to construct a customer profile for the Teams user, slice your analytics data such as usage, sessions, retention etc. accordingly and tailor your features, experiences etc. accordingly |
| Host client type, locale and usage context inferences from team/channel names | Enrich the customer’s profile in your user analytics |
| Use frame context to get information about the context in which the user is using your app, user's journey and usage pattern from various surface areas, capabilities, and scopes. | Craft your user's experiences accordingly and invest more in capabilities popular with your users |
| User's email address to associate a meaningful, real-world identity with the Teams user, and can provide the Microsoft 365 tenant organization’s domain address that is, contoso.onmicrosoft.com | Identify the organization the user belongs to. The email address of the user can be used to complete the user’s profile and communicate with the user for activation, re-marketing and re-engagement. However, be careful not to misuse this channel or spam the user. |
| Obtain and store the unique Azure AD user/object ID at the time of app (bot) installation | Send any proactive notification to the user via your bot |

<!--
- The user’s organization is handy to track demand for your app, especially if you offer trial period for new sign-ups or freemium offering for your SaaS product. You can use the organization name to handoff a “lead” to your sales or customer success teams which can plan sales outreaches to the organization for pitching your SaaS app, onboard the organization as a customer of your service or simply to check-in if they need any assistance.
- Using the license type and the tenant SKU, you can find out and log which type of organization does the user belong to, user’s role within the organization (for example, F1 license is for Frontline workers vs E5 license is for information workers) construct a customer profile for the Teams user, slice your analytics data such as usage, sessions, retention etc. accordingly and tailor your features, experiences etc. accordingly.
- Host client type, locale and usage context inferences from team/channel names etc. can all be used to enrich the customer’s profile in your user analytics.
- The frame context can give useful information about the context in which the user is using your app to stitch the user’s journey and usage pattern across various surface areas, capabilities and scopes. Knowing this will enable you to craft your experiences accordingly and invest more in capabilities popular with your users.
- The email address of the user allows you to associate a meaningful, real-world identity with the Teams user and also possibly gives you the Microsoft 365 tenant organization’s domain address that is, contoso.onmicrosoft.com. This will allow you to identify the organization the user belongs to. The email address of the user can be used to complete the user’s profile and communicate with the user for activation, re-marketing and re-engagement. However, be careful not to misuse this channel or spam the user.
- The unique Azure AD user/object ID of the user is a must for your app to send any proactive notification to the user via your bot and must be stored once obtained at the time of app (bot) installation event.
-->

#### Conversational constructs

<!--
These are conversation or chat-oriented capabilities such as bots, message extensions, cards and task modules (displaying an adaptive card). These are experiences only created for and available to users specifically inside Teams. You'll need to capture Teams-specific events and handle them for Teams-specific instrumentation in your code for these constructs from scratch.-->
<!--
A bot can access additional context data about a team, chat, meeting, 1:1 call or group call where it's installed. This information can be leveraged for useful insights about your users, enrich the bot's functionality and provide a more personalized experience such as:-->

Conversation or chat-oriented capabilities include bots, message extensions, cards and task modules (displaying an adaptive card) that are created for Teams users. You'll need to capture and handle Teams-specific events for data instrumentation for your app. A bot can access additional context data about a team, chat, meeting, 1:1 call or group call where it's installed.

Use your bot to get user information for enriching user experience:

- List of members and their basic user profiles, including Teams user IDs and Microsoft Azure Active Directory (Azure AD) information, such as name and Azure AD user/object ID.
- Details of a particular user using their Teams user ID, UPN or Azure AD user or object ID.
- A user’s first name, surname, email address, tenant ID and user’s role in the team using the user’s Azure AD user/object ID, you can find the user’s first name, surname, email address, tenant ID and user’s role in the team.
- Metadata about that team where the bot it's installed. It includes:
  - Azure AD group ID and the team’s name.
  - List of channels in the team that returns channel IDs and names.
- Using the Meeting Details API, get a meeting's or call’s static metadata, such as type of meeting such as GroupCall, OneToOneCall, Ad hoc, Broadcast, MeetNow, Recurring, Scheduled, or Unknown; conversation type, organizer tenant ID etc.

Each activity sent by Teams to your bot will contain the `turnContext` object from which all these relevant fields can be retrieved. All of which can be leveraged in a similar fashion as described for hosted web canvas constructs.

Since message extensions are based on the bot channel, most of the above apply to message extensions as well.

<!--

## When should you start the analytics journey for your Teams app?

As you can see above, Teams provides you specific information that you can use to not just analyze who’s using your app, where users are using your app in Teams, get a robust idea of the user’s profile – all of which can be used to tailor the experience for the user and monitor your app’s performance and return on your investment.

You should plan analytics for your Teams app right at the dev design and solution architecture stage.

Whether it is examining which of the existing data instrumentation and practices for your core SaaS web app will accrue to hosted canvas constructs such as tabs, task modules, meeting apps etc. in Teams or how to extend existing data instrumentation practices to tab experiences you’re specifically building from scratch for Teams, analytics should never be an afterthought. For Teams-specific capabilities such as conversational constructs that is, bots, message extensions etc., you'll need to plan and implement analytics instrumentation, capture relevant events and context from the SDK methods from scratch.

At the time, your production Teams app is live on the marketplace and customers start using it, your analytics and data infrastructure should be fully operational so that you don’t miss tracking instrumentation markers getting fired, Teams-specific events and the relevant, contextual information contained in these events, some of which are only triggered once for you to act upon and capture in your SaaS backend for example, Azure AD user ID for a Teams user is only notified via a specific bot event at the time of installation of the bot app for the user. This user ID is mandatory to be captured and mapped to the user’s real-world profile identify such as email address to be able to then send proactive notifications to the user later via the bot.

## Once you’ve implemented analytics for your Teams app, what insights can you generate?

Besides the obvious metrics everyone cares about in the SaaS world such as daily/weekly/monthly active users, time spent in your app etc., implementing analytics thoughtfully for your Teams app per the guidance above will allow you to get insights such as:

// How is data for aggregate metrics obtained //

- **Aggregate metrics**
  - Which scope or UI entry point (for example, personal app, channel, group chat) is the most used by your users to invoke your app and begin a new app session inside Teams?
  - How many days on an average do users use your app in the first week after installing the app?
  - Week over week / month over month new user retention cohort analysis for your app or specific capabilities (for example, personal app or bot) in your app?
  - How many users use your app only on Teams mobile clients?
  - How many users have used the camera device capability in your app?
  - What does the funnel analysis for your app from app installation to activation to engagement to retention and finally, monetization reveal? Where are the drop-offs happening?
  - How many users have installed your app in the last one week?
  - How many users have churned from your app in the last three months? What is the resulting quarterly churn rate?
  - Which organization has seen the maximum number of installation for your app in the last 30 days?
  - Which organizations do the users installing your app in the last 14 days belong to?
  - Which organization has seen the maximum number of trial sign-ups for your app in the last seven days?
  - What types of meetings (GroupCall, OneToOneCall, Adhoc, Broadcast, MeetNow, Recurring or Scheduled) is your app used in?
- **User-specific metrics**
  - Which users are yet to experience channel tabs capability you’ve implemented in your app in the last app update?
  - Which users haven't completed the onboarding inside the personal app?
  - Among the users who have installed the app in the last one week, which users haven't returned to the app even once for engagement after installation?
  - Which users have installed the app but haven't signed-into the app yet?
  - How many times has a specific user used your Teams app in the last 30 days?
  - How many days a specific user has actively used your app in the last seven days?
  - When was the last time a specific user had used your app in Teams?
  - What has been a specific app user’s journey inside Teams?
  - Which users have churned from your app in the last three months?
  - Has a specific user used your app in a Teams meeting?

// link user-specific metrics from user ID //

-->

## How can you act on these insights?

Once you have these insights, visit the [How to monitor analytics, performance, feedback](#how-to-monitor-analytics-performance-feedback) while your app is in the market and action on these pages to learn more about how you can leverage them for growing and monetizing your app.

## How to plan & approach growth for your app?

Shipping your app on the Teams marketplace is just the beginning. Once shipped, you must meticulously plan how to grow your app, make it a successful product on the marketplace that drives intended business metrics and helps you realize returns on your investment into planning, designing and building the app.

This document provides high-level guidance about how you should plan:

// TBA //

### Growing your app

- Via the product itself (product-led growth)
  - Guidance for ISVs on best practices, UX screens and components to build the user experience to help users become familiar with the app and get their first task done, post install
  - Capture best practices via illustrative guides for capturing & measuring, converting new product qualified customer leads (PQLs) coming from Teams app
  - how to do product-led growth (best practices guides)
- Via sales & marketing-led GTM motions such as //content TBA //
  - Launch marketing
  - Sales-led growth
  - Partnering with Microsoft

### How to monetize your app on Teams

// content TBA //

### How to monitor analytics, performance, feedback

// While your app is in the market and action on these //

- How to leverage app analytics and user journey signals for churned user re-targeting on Teams and other channels
- Developer guidance to implement re-engagement reminders for periodic scenarios or if there’s a drop off prior to a given job completion

### How to plan for next update with elaborate visuals and conceptual guidance

// content TBA //
