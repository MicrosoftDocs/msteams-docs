---
title: Plan and build analytics for your Teams app
author: heath-hamilton
description: Plan and build analytics for your Teams app.
ms.topic: conceptual
ms.localizationpriority: high
ms.author: surbhigupta
---

# Plan and build analytics for your Teams app

As a developer who’s building an app for millions of Microsoft Teams users to achieve specific business or customer goals and distributing it using one or more of the many distribution options available to you, you will be interested to measure how your app is performing in the real-world once published. You will also be interested in monitoring who is interested in your app, which users and organizations are using your app, how are users engaging with your app, which users have churned away after using your app for some time and many such data points. Once you know this, you can analyse the data against your business goals, take corrective action by fixing issues and intervening in the user journey or plan further enhancements to your app.

## But Teams app usage report must suffice, isn’t it?

Remember, as the app’s developer you can track your app’s usage in the Teams app usage report in Partner Center, within a week after publishing your app on the marketplace. The usage report provides standard out-of-the-box metrics such as Monthly, Daily, and Weekly active users, retention and intensity charts, users who’ve used your app more than 5 days in the last month, platform, operating system and geographic split of users for your app etc. enabling you to track user demand, user churn and frequency of usage for your app at an aggregate level.

Teams usage report cannot provide you in-depth analytics of what goes on inside your app as well as specific user-level analytics such as a user’s journey within your app or a user’s engagement with specific features and scenario completions within your app. That is because your app on Teams is essentially a web-based service hosted elsewhere for eg: Azure cloud but embedded to be surfaced inside Microsoft Teams shell where end-users use your app. This applies to your app irrespective of the platform capabilities used such as tabs, bots, message extensions, meeting extensions, cards, task modules etc. since all of these are essentially means to surface web-based experiences inside Teams.

This is why you must plan analytics for the Teams app you’re building the same way as you do for your SaaS product that runs on the web browser.

## Instrumenting your app

You must already be aware that instrumenting your code with analytics markers (also known as telemetry markers) are standard web application development practice. Data instrumentation in your code is critical for long-term success since without robust telemetry instrumentation you will be unable to measure both aggregate as well as user-specific metrics required to base product, growth, marketing and business decision upon.

There are broadly 2 types of data instrumentation relevant for your Teams app:

- **Data instrumentation for your core SaaS product or app**: This is the instrumentation that you will do for your browser-based SaaS app irrespective of whether you’re integrating with Teams or not. If you have a browser-based SaaS app, in all likelihood, you will have this instrumentation already done in your code. This is how you can see click analytics, customer lifecycle analytics and conversion analytics metrics such as bounce rate, page views, unique visitor count, session counts, engagement time, click through rate etc. and many more for your web app.

- **Data instrumentation in your app specific to Teams**: This is the instrumentation that you require to do additionally in your SaaS app because it is now surfacing inside of the Teams client, you may have leveraged one or more of the platform capabilities only available inside Teams such as bots, message extensions etc. or you have crafted experiences to address use cases unique to Teams such as meeting extensions, intelligent M365-aware scenarios using Microsoft Graph, link unfurling etc. This is what is covered in more detail in the rest of this document.

## Data instrumentation in your app specific to Teams

Below are guidelines and pointers regarding what to look for, which events to capture, how to instrument telemetry markers, where to fetch Teams-relevant information that will help you plan and implement analytics for your app. Since your Teams apps can be tabs, bots, message extensions, cards, stage views etc. or any combination of these capabilities and UI constructs across personal or shared scopes, it is best to understand, plan and implement your instrumentation around each of these capabilities.

You can classify Teams platform features into broadly 2 constructs:

- **Hosted web canvas constructs**: These are visual canvas-oriented capabilities such as tabs, personal apps, task modules (displaying an embedded iframe), stage views, meeting tabs, shared meeting stage and in-meeting dialogs. Conceptually, all of these are Teams-aware webpages embedded in Microsoft Teams and likely hosted in the cloud with the rest of your SaaS app that runs in the web browser. As mentioned above, the webpages will likely already have the instrumentation done for your core SaaS web app needs. You just need to capture Teams-specific events and handle them for Teams-specific instrumentation in your code.

- **Conversational constructs**: These are conversation or chat-oriented capabilities such as bots, message extensions, cards and task modules (displaying an adaptive card). Conceptually, these are experiences only created for and available to users specifically inside Teams. You will need to capture Teams-specific events and handle them for Teams-specific instrumentation in your code for these constructs from scratch.

## Hosted web canvas constructs

What comes in handy for your analytics needs is the fact that tabs are “Teams-aware” webpages. Following the prerequisite to build a tab, since you always add the Teams JavaScript client SDK to your tab’s content or configuration pages, your page gains access to Teams-specific information or context which can be leveraged for useful insights about your users such as:

- Microsoft 365 tenant ID (Azure AD tenant) for the current user (tid). In Microsoft 365 or Azure Active Directory (Azure AD), a tenant is representative of an organization i.e. the user’s company. The Microsoft 365 tenant ID is specifically useful to find out and log which Microsoft 365 tenant the user is belonging to. Once you know the tenant id, you can find out the tenant domain for the organization which often reveal the organization’s name.
- License type assigned to the user and the SKU for the current user’s tenant. Possible values are F1, E1, E3, and E5 enterprise plans for (licenseType) and enterprise, free, edu, unknown for (tenantSKU).
- The context where the tab URL is loaded. Some possible values can be content page, task module, tab settings dialog, tab remove dialog, meeting sidePanel etc. (frameContext).
- Host client type where tab is loaded. Possible values are android, ios, web, desktop, surfaceHub etc. (hostClientType) – You can slice your analytics data.
- Locale awareness for the user to indicate language for eg: en-us, fr-fr, ja-jp etc. (app locale).
- User Principal Name or login hint (user name) of the current user in the current tenant (usually user’s email address).
- Team name and channel name where the channel tab is added (teamName, channelName).
- Unique ID for the current app session inside a tab used for correlating telemetry data (appSessionId).
- Meeting id is used by a tab running in the meeting context and is added for the response payload (meetingId).
- Microsoft Azure Active Directory (Azure AD) ID of the current user.

To illustrate how the wealth of useful Teams-specific information obtained from the tab context above can be used by you, consider the following:

- The user’s organization is very handy to track demand for your app, especially if you offer trial period for new sign-ups or freemium offering for your SaaS product. You can use the organization name to handoff a “lead” to your sales or customer success teams which can plan sales outreaches to the organization for pitching your SaaS app, onboard the organization as a customer of your service or simply to check-in if they need any assistance.
- Using the license type and the tenant SKU, you can find out and log which type of organization does the user belong to, user’s role within the organization (for eg: F1 license is for Frontline workers vs E5 license is for information workers) construct a customer profile for the Teams user, slice your analytics data such as usage, sessions, retention etc. accordingly and tailor your features, experiences etc. accordingly. 
- Host client type, locale and usage context inferences from team/channel names etc. can all be used to enrich the customer’s profile in your user analytics.
- The frame context can give useful information about the context in which the user is using your app to stitch the user’s journey and usage pattern across various surface areas, capabilities and scopes. Knowing this will enable you to craft your experiences accordingly and invest more in capabilities popular with your users.
- The email address of the user allows you to associate a meaningful, real-world identity with the Teams user and also possibly gives you the Microsoft 365 tenant organization’s domain address i.e. contoso.onmicrosoft.com. This will allow you to identify the organization the user belongs to. The em.ail address of the user can be used to complete the user’s profile and communicate with the user for activation, re-marketing and re-engagement. However, be careful not to misuse this channel or spam the user.
- The unique Azure AD user/object ID of the user is a must for your app to send any proactive notification to the user via your bot and must be stored once obtained at the time of app (bot) installation event.

## Conversational constructs

A bot can access additional context data about a team, chat, meeting, 1:1 call or group call where it's installed. This information can be leveraged for useful insights about your users, enrich the bot's functionality and provide a more personalized experience such as:

- Your bot can query for the list of members and their basic user profiles, including Teams user IDs and Microsoft Azure Active Directory (Azure AD) information, such as name and AAD user/object id. Your bot can also retrieve the details of a particular user using their Teams user ID, UPN or AAD user/object id.
- Using the user’s AAD user/object ID, you can find the user’s first name, surname, email address, tenant ID and user’s role in the team – all of which can be leveraged in a similar fashion as described for hosted web canvas constructs above.
- When installed in a team, your bot can query for metadata about that team including the AAD group ID and the team’s name. It can also query the list of channels in the team which returns channel ids and names. These parameters can be leveraged in a similar fashion as described for hosted web canvas constructs above.
- Using the Meeting Details API, your bot enables your app to get a meeting's or call’s static metadata such as type of meeting such as GroupCall, OneToOneCall, Adhoc, Broadcast, MeetNow, Recurring, Scheduled, or Unknown; conversation type, organizer tenant ID etc.

Each activity sent by Teams to your bot will contain the turnContext object from which all these relevant fields can be retrieved.

Since message extensions are based on the bot channel, most of the above apply to message extensions as well.
