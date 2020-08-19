---
title: Integrating web apps with Microsoft Teams
author: heath-hamilton
description: Understand the steps needed to integrate your web app with Microsoft Teams
---
# Integrating web apps with Teams

The following guidelines can help you integrate successfully with Teams no matter what kind of app you have:

* Established as a standalone product
* Geared towards collaboration platforms
* For internal use (for example, a SharePoint page)

## Plan your app

Integrating an app as it is will likely feel foreign or awkward to the Teams experience. Do these first:

1. Understand your use cases.
1. Map use cases to Teams capabilities
1. Determine your app contexts

## Consider a subset of functionality

If you haven't integrated your app with a collaboration platform like Teams, you may be unfamiliar with what makes the best 

## Reuse UI components

If migrating a web app that was built in a modular way, try to re-use those modules wherever possible. By sharing components, you can accelerate your development and reduce maintenance headaches down the road. For example, a bug fix won't require changes in two places.

## Follow design guidelines

* Limit navigation: Embedding web content into a tab with little design updates is likely to lead to poor UX. For example, tabs are in themselves a top navigation, so any subnavigation needs to be carefully considered and navigation within a tab should be minimized.
* Use familiar iconography: Your application will not feel native to Microsoft Teams if it uses different  iconography. Consider the Fluent UI icons for actions or navigation within your app and Teams.
* Consider themes: Good Teams apps feel like a native part of teams, so matching the user's theme in your app is important. This means supporting 3 different sets of styles (default, dark, and high-contrast). Themes are primarily a consideration in tab development, but message-based extensibility have their own themeing considerations.

## Adapt to the context within Teams

Teams provides rich contextual information to both chatbots, messaging extensions, and tabs. Information includes the group/channel/user details from where the application is running as well as additional application context such as theme, contextual parameters, and much more. e.g., JS SDK

## Think about notifications

Consider the long-term vision of the application when architecting a notification approach. If there is probability of multi-threaded conversations, a chatbot will likely be a more flexible choice than connectors/webhooks.

## Plan for localization

Delivering a Teams app that supports multiple languages takes additional planning. Locale is available as contextual information to most Teams extensions, but translations and planning are also necessary in the application manifest.

## Review existing APIs

Migrating an existing application into Teams does not mean the existing APIs that support that application sufficiently when running from within Teams. Identity mapping, deep-link support, and Graph integration might drive the need for API updates that should be considered when estimating a migration.

## Aim towards multitenancy

If you have offered the application in a SaaS model, then you are likely familiar with the additional challenges and considerations of hosting a multi-tenant application. If SaaS and multi-tenancy is new to you, consider this approach as it provides economies of scale and simplifies the Teams application manifest and distribution.

## Listen for added members

If your app includes a chatbot, you should listen for members added and store the user details of users. This includes a teams proprietary identifier that is required to send proactive messages to that user. It also saves you an additional API call to the Microsoft Graph and user consent for querying team membership.

## Use SharePoint for file and data storage

When you create a team, a SharePoint site collection is provisioned to support file and data storage for that team. Your application can and should leverage this site collection if interacting with files, but it can also be used to store raw data in SharePoint Lists or Excel.
