---
title: Microsoft Teams developer documentation - Glossary
description: Learn about the terms used in Microsoft Teams developer documentation
ms.localizationpriority: high
ms.topic: reference
---
# Glossary

Common terms and definitions used in Teams developer documentation.

## A

| Term | Definition |
| --- | --- |
| [Action command](../messaging-extensions/how-to/action-commands/define-action-command.md) | A type of message extension app that uses a pop-up to collect or display information. <br>**See also**: [Message extension](#m); [Search commands](#s) |
| [Adaptive Cards](../task-modules-and-cards/what-are-cards.md) | An actionable content snippet added to a conversation by a bot or message extension. Use text, graphics, and buttons with these cards for rich communication. |
| [Anonymous user](../apps-in-teams-meetings/meeting-app-extensibility.md#user-types-in-a-meeting) | A type of participant in a Teams meeting who doesn't have an Azure AD identity and isn't federated with a tenant. They are like external users in a meeting. <br>**See also**: [Federated user](#f) |
| [App Catalog](../toolkit/publish.md) | A site that stores SharePoint and Office apps for an organization's internal use. <br>**See also**: [SPFx](#s) |
| [App manifest](../resources/schema/manifest-schema.md) | The Teams app manifest describes how the app integrates into the Microsoft Teams product. Your manifest must conform to the [manifest schema](https://developer.microsoft.com/json-schemas/teams/v1.11/MicrosoftTeams.schema.json). |
| [App package](../concepts/build-and-test/apps-package.md) | A Teams app package is a zip file that contains the App manifest file, color icon, and outline icon. |
| [App permission](../concepts/device-capabilities/browser-device-permissions.md#enable-apps-device-permissions) | An option in a Teams app to enable device permissions. It's available only when the manifest file of the app declares that the app needs device permissions. <br> **See also**: Device permissions |
| [App scope](../concepts/design/app-structure.md) | An area in Teams where people can use your app. Apps can have one or many scopes, including personal, channels, chats, and meetings. A Teams app can exist across scopes. |
| [App Studio](../concepts/build-and-test/app-studio-overview.md) | An app to start creating or integrating your own Microsoft Teams apps. It has now evolved to Developer Portal. <br> > If you have been using App Studio, we recommend that you'd try the Developer Portal to configure, distribute, and manage your Teams apps. App Studio will be deprecated by August 01, 2022 <br> **See also**: [Developer Portal](#d) |
| App tray | An application tray located on the bottom bar of a Teams mobile app. It collects all apps that are open but not currently used or active. <br>**See also**: [Teams Mobile](#t) |
| [Azure resource](../toolkit/provision.md) | A service that is available through Azure that your Teams app can use for Azure deployment. It could be storage accounts, web apps, databases, and more. |
| [Azure Active Directory](../tabs/how-to/authentication/auth-tab-aad.md) | Microsoft’s cloud-based identity and access management service. It helps authenticated users access internal and external Azure resources. |
| [Authentication](../concepts/authentication/authentication.md) | A process to validate user access for your app's usage. It can be done using Microsoft Graph APIs or web-based authentication. <br> **See also**: [Identity providers](#i); [SSO](#s) |
| [Authentication flow](../concepts/authentication/authentication.md) | In Teams, there are two authentication flows to authenticate a user for using an app: web-based authentication and OAuthPrompt flow. |

## B

| Term | Definition |
| --- | --- |
| [Blazor](../get-started/get-started-overview.md) | A free and open-source web framework that enables developers to create web apps using C# and HTML. It's being developed by Microsoft. |
| [Bicep](../toolkit/provision.md) | A declarative language, which means the elements can appear in any order. Unlike imperative languages, the order of elements doesn't affect how deployment is processed. |
| [Bot](../bots/what-are-bots.md) | A bot is an app that executes programmed repetitive tasks. <br> **See also**: [Conversational bot](#c); [Chat bot](#c) |
| [Bot Emulator](../bots/how-to/debug/locally-with-an-ide.md#use-the-bot-emulator) | A desktop application that lets you test and debug bots, either locally or remotely. |
| [Bot Framework](../bots/bot-features.md) | A rich SDK used to create bots using C#, Java, Python, and JavaScript. If you have a bot that is based on the Bot Framework, you can modify it to work in Teams. |

## C

| Term | Definition |
| --- | --- |
| [Call bot](../bots/calls-and-meetings/calls-meetings-bots-overview.md) | A bot that participates in audio or video calls and online meetings. <br> **See also**: [Chat bot](#c); [Meeting bot](#m) |
| [Capability](../toolkit/add-capability.md) | A Teams feature you can build into your app for interacting with app users. An app capability is used to extend Teams to fit your app needs. An app may have one or more core capabilities, such as tab, bot, and message extension. <br>**See also**: [Device capability](#d); [Media capability](#m) |
| [Chat bot](../bots/how-to/conversations/conversation-basics.md) | A bot is also referred to as a chatbot or conversational bot. It's an app that runs simple and repetitive tasks for users such as customer service or support staff. <br> **See also**: [Conversational bot](#c) |
| Channel | A single place for a team to share messages, tools, and files. You can use a channel for teamwork and communication. <br>**See also**: [Conversation](#c) |
| [Client secret](../bots/how-to/authentication/add-authentication.md) | A secret string that the application uses to prove its identity when requesting a token. Also can be referred to as application password.|
| [Cloud resources](../toolkit/add-resource.md) | A service that is available on cloud through internet that your Teams app can use. It could be storage accounts, web apps, databases, and more. |
| [Collaboration app](../concepts/extensibility-points.md) | An app with capabilities for a user to work in a collaborative workspace with other users. <br> **See also**: [Standalone app](#s) |
| [Compose Extension](../resources/schema/manifest-schema.md#composeextensions) | A property in app manifest (`composeExtensions`) that refers to message extension capability. It's used when your extension needs to either authenticate or configure to continue. <br>**See also**: [App manifest](#a); [Message extension](#m) |
| [Command box](../resources/schema/manifest-schema.md) | A type of context in app manifest (`commandBox`) that you can configure to invoke a message extension from Teams command box. |
| [Connector](../webhooks-and-connectors/what-are-webhooks-and-connectors.md) | It lets users subscribe to receive notifications and messages from the web services. Connectors expose the HTTPS endpoint for the service to post messages to Teams channels, typically in the form of cards. <br> **See also**: [Webhook](#w) |
| Conversation | A series of messages sent between your Microsoft Teams app (tab or bot) and one or more users. A conversation can have three scopes: channel, personal, and group chat. <br>**See also**: [One-on-one chat](#o); [Group chat](#g); [Channel](#c) |
| [Conversational bot](../bots/how-to/conversations/conversation-messages.md) |  It lets a user interact with your web service using text, interactive cards, and task modules. <br>**See also** [Chat bot](#c) |

## D

| Term | Definition |
| --- | --- |
| [Deep linking](../concepts/build-and-test/deep-links.md) | In a Teams app, you can create deep links to information and features within Teams or to help the user navigate to content in your app. |
|[Department of Defense (DoD)](../concepts/app-fundamentals-overview.md#government-community-cloud)| DoD environments deliver compliance with Department of Defense Security Requirements Guidelines, Defense Federal Acquisition Regulations Supplement (DFARS), and International Traffic in Arms Regulations (ITAR).|
| [Developer Portal for Teams](../concepts/build-and-test/teams-developer-portal.md) | The primary tool for configuring, distributing, and managing your Microsoft Teams apps. With Developer Portal, you can collaborate with colleagues on your app, set up runtime environments, and much more. |
| [Developer Preview](../resources/dev-preview/developer-preview-intro.md) | A public program for developers that provides early access to unreleased features in Microsoft Teams. It lets you explore and test upcoming features for potential inclusion in your Microsoft Teams app. |
| Deploy | A process to upload the backend and frontend code for the application. At Deployment, the code for your app is copied to the resources you created during provisioning. <br>**See also**: [Provision](#p) |
| [Device capabilities](../concepts/device-capabilities/device-capabilities-overview.md) | Built-in devices, such as camera, microphone, barcode scanner, photo gallery, in a mobile or desktop. You can access the following device capabilities on mobile or desktop through dedicated APIs available in Microsoft Teams JavaScript client SDK. <br>**See also**: [Capability](#c); [Media capability](#m); [Location capability](#l) |
| [Device permission](../concepts/device-capabilities/browser-device-permissions.md) | A Teams app setting that you can configure in your app. You use it to request permission for your app to access and utilize a native device capability. You can manage device permissions in Teams settings. <br>**See also**: [App permissions](#a) |
| [Dev environment](../toolkit/teamsfx-multi-env.md#create-a-new-environment) | A type of development environment that Teams Toolkit creates by default. It represents remote or cloud environment configurations. A project can have multiple remote environments. You can add more dev environments to your project using Teams Toolkit. <br>**See also** [Environment](#e); [Local environment](#l) |
| [DevTools](../tabs/how-to/developer-tools.md) | Browser's DevTools are used to view console logs, view or modify runtime network requests, add breakpoints to code (JavaScript) and perform interactive debugging for a Teams app. The feature is only available for desktop and Android clients after the Developer Preview has been enabled. |
| [Dynamic search](../task-modules-and-cards/cards/dynamic-search.md#dynamic-typeahead-search) | A search feature for Adaptive Cards that is useful to search and select data from large data sets. It helps to filter out the choices as the user enters the search string. <br>**See also**: [Static search](#s) |

## E

| Term | Definition |
| --- | --- |
| [E5 developer account](../toolkit/accounts.md) | E5 developer subscription for building apps to extend Microsoft 365. It includes 25 user licenses, including the administrator, for development purposes only.  <br>**See also**: [Microsoft 365 account](#m) |
| [Entry point](../concepts/app-fundamentals-overview.md) | An access point, such as team, channel, and chat, for a Teams app where users can use your app. |
| [Environment](../toolkit/teamsfx-multi-env.md) | A feature in Teams Toolkit that lets you create and use multiple development environments for your app project. There are two dev environments that Teams Toolkit creates by default, local environment and dev environment. <br>**See also**: [Local environment](#l); [Dev environment](#d) |

## F

| Term | Definition |
| --- | --- |
| [Federated user](../apps-in-teams-meetings/meeting-app-extensibility.md#user-types-in-a-meeting) | A type of user in a Teams app meeting who is external and is invited to the meeting. This user has valid credentials that are federated by authorized Teams partners. They're also called External users. <br>**See also**: [Anonymous user](#a) |
| [First-run Experience (FRE)](../concepts/design/design-teams-app-ui-templates.md)|A First-run Experience (FRE) is a user's introduction to your product. A FRE provides users with insight into the functions, features, and benefits of the product and helps influence users' to come back and continue using your product.|

## G

| Term | Definition |
| --- | --- |
|[Government community cloud (GCC)](../concepts/app-fundamentals-overview.md#government-community-cloud)| GCC environment provides compliance with federal requirements for cloud services, including FedRAMP High, Defense Federal Acquisition Regulations Supplement (DFARS), and requirements for criminal justice and federal tax information systems (CJI and FTI data types).|
|[Government community cloud (GCC) High](../concepts/app-fundamentals-overview.md#government-community-cloud)|GCC high environments deliver compliance with Department of Defense (DoD) Security Requirements Guidelines, Defense Federal Acquisition Regulations Supplement (DFARS), and International Traffic in Arms Regulations (ITAR).<br>**See also**: [Department of Defense (DoD)](#d)|
| [Graph API](../graph-api/proactive-bots-and-messages/graph-proactive-bots-and-messages.md) | A RESTful web API for Microsoft Graph that enables you to access Microsoft Cloud service resources. <br>**See also**: [Microsoft Graph Explorer](#m) |
| [Group chat](../resources/bot-v3/bot-conversations/bots-conversations.md) | A chat feature where a user is able to chat with a bot in a group setting by using @mention to invoke the bot. <br>**See also**: [One-on-one chat](#o); [Chat bot](#c) |

## I

| Term | Definition |
| --- | --- |
| [Identity provider](../concepts/authentication/configure-identity-provider.md) | An entity that stores and provides credentials to the user. Users can register themselves with an identity provider as well.  <br>**See also**: [Authentication](#a) |
| [Incoming Webhook](../webhooks-and-connectors/how-to/add-incoming-webhook.md) | It lets an external app share content in Teams channels. These webhooks are used as tracking and notifying tools. <br>**See also**: [Webhook](#w); [Outgoing Webhook](#o) |
| [In-meeting app experience](../apps-in-teams-meetings/meeting-app-extensibility.md#in-meeting-app-experience) | A stage of Teams meeting lifecycle. With the in-meeting app experience, you can engage participants during the meeting by using apps and the in-meeting dialog box. <br>**See also**: [Meeting lifecycle](#m) |

## L

| Term | Definition |
| --- | --- |
| [Link unfurling](../messaging-extensions/how-to/link-unfurling.md) | A feature used with message extension and meeting to unfold links pasted into a compose message area. The links expand to show additional information about the link in Adaptive Cards or in the meeting stage view. |
| [Local environment](../toolkit/teamsfx-multi-env.md#create-a-new-environment) | A default development environment created by Teams Toolkit.  <br>**See also**: [Environment](#e); [Dev environment](#d) |
| [Local workbench](../sbs-gs-spfx.yml) | The default option to run and debug a Teams app in Visual Studio Code that is created using SPFx. <br>**See also**: [Workbench](#w); [Teams workbench](#t) |
| [Location capability](../concepts/device-capabilities/location-capability.md) | A device capability that you can integrate with your app to know the geographical location of the app user for an enhanced collaborative experience. This feature is currently available only for Teams mobile clients only. <br>**See also**: [Capability](#c); [Media capability](#m); [Device Capability](#d); [Teams Mobile](#t) |
| [Low code apps](../samples/teams-low-code-solutions.md) | A custom Teams app built from scratch using Microsoft Power Platform that requires little or no coding, and can be developed and deployed quickly. |

## M

| Term | Definition |
| --- | --- |
| [Media capability](../concepts/device-capabilities/media-capabilities.md) | Native device capabilities, such as, camera and microphone, that you can integrate with your Teams app. <br>**See also**: [Capability](#c); [Device capability](#d) |
| [Meeting bot](../bots/calls-and-meetings/calls-meetings-bots-overview.md) | Bots that interact with Teams calls and meetings using real-time voice, video, and screen sharing. <br>**See also**: [Call bot](#c); [Chat bot](#c) |
| [Meeting lifecycle](../apps-in-teams-meetings/meeting-app-extensibility.md#meeting-lifecycle) | It spans from pre-meeting, in-meeting, and post-meeting app experience. You can integrate tabs, bots, and message extensions in each stage of the meeting lifecycle. <br>**See also**: [In-meeting experience](#i) |
| [Meeting stage](../sbs-meetings-stage-view.yml) | A feature of meeting extension app. It's a shared space accessible to all participants during the meeting. It helps participants interact and collaborate with app content in real time. <br>**See also**: [Stage view](#s) |
| [Message extension](../messaging-extensions/what-are-messaging-extensions.md) | Message extensions are shortcuts for inserting app content or acting on a message. You can use a message extension without navigating away from the conversation. <br>**See also**: [Search commands](#s); [Action commands](#a) |
| [Meeting extension](../apps-in-teams-meetings/design/designing-apps-in-meetings.md) | An app that is designed to be used during the meeting lifecycle to make it more productive, such as whiteboard, dashboard, and more. |
| [Microsoft 365 account](../toolkit/accounts.md#microsoft-365-developer-account-types) | Microsoft 365 account includes 25 user licenses, including the administrator, for development purposes only. |
| [Microsoft 365 developer program](../toolkit/accounts.md)| The Microsoft 365 Developer Program helps you build apps that extend Microsoft 365. |
| [Microsoft Graph Explorer](../graph-api/proactive-bots-and-messages/graph-proactive-bots-and-messages.md) | The gateway to data and intelligence in Microsoft 365. It provides a unified programmability model that you can use to access data in Microsoft 365, Windows 10, and Enterprise Mobility + Security. |
| [Microsoft Teams](../overview.md) | Microsoft Teams is a group collaboration software that can be used to help teams work together remotely. |
| [Microsoft Teams Platform](../concepts/app-fundamentals-overview.md) | The Microsoft Teams developer platform makes it easy for developers to integrate their own apps and services with Teams. |
| [Microsoft Teams UI Library](../concepts/design/design-teams-app-ui-templates.md#microsoft-teams-ui-library) | Microsoft Teams UI Library helps you view and test individual Teams UI templates and related components in your browser. |
| [Microsoft Teams UI Toolkit](../concepts/design/design-teams-app-ui-templates.md#microsoft-teams-ui-library) | Microsoft Teams UI Kit includes components and patterns that are designed specifically for building Teams apps. |

## O

| Term | Definition |
| --- | --- |
| [Office 365 Connector](../webhooks-and-connectors/how-to/connectors-creating.md) | It lets you create a custom configuration page for your Incoming Webhook and package them as part of a Teams app. You can send messages primarily using Office 365 Connector cards and have the ability to add a limited set of card actions to them. |
| [Outgoing Webhook](../webhooks-and-connectors/how-to/add-outgoing-webhook.md) | It acts as a bot and search for messages in channels using @mention. It sends notifications to external web services and responds with rich messages, which include cards and images. <br>**See also**: [Webhook](#w); [Incoming Webhook](#i) |
| [Outlook channel](../m365-apps/extend-m365-teams-message-extension.md#add-an-outlook-channel-for-your-bot) | A feature of Teams message extension app that lets the users interact with it from Microsoft Outlook. |
| [One-on-one chat](../resources/bot-v3/bot-conversations/bots-conv-personal.md) | A type of chat between a Teams personal bot app and a single user. <br>**See also**: [Group chat](#g); [Chat bot](#c) |

## P

| Term | Definition |
| --- | --- |
| [People Picker](../task-modules-and-cards/cards/people-picker.md) | A native control in Teams platform to search and select people, which can be integrated in web apps, Adaptive Cards, and more. |
| [Personal app](../concepts/design/personal-apps.md) | A personal app is a Teams application with a personal scope. It focuses on interactions with a single user. It can be a conversational bot to engage in one-to-one conversations with a user or a personal tab providing an embedded web experience, or both. <br>**See also**: [Shared app](#s) |
| [Power Virtual Agents](../bots/how-to/add-power-virtual-agents-bot-to-teams.md) | A no-code, guided graphical interface solution that empowers every member of your team to create rich, conversational chat bots that easily integrate with the Teams platform. |
| [Proactive messages](../bots/how-to/conversations/send-proactive-messages.md) | A message sent by a bot that isn't in response to a request from a user, such as welcome messages, notifications, scheduled messages. |
| [Provision](../toolkit/provision.md) | A process that creates resources in Azure and Microsoft 365 for your app, but no code (HTML, CSS, JavaScript, etc.) is copied to the resources. It's a prerequisite to deployment. <br>**See also**: [Deploy](#d) |

## R

| Term | Definition |
| --- | --- |
| [Rate-limiting](../bots/how-to/rate-limit.md) | A method to limit messages to a certain maximum frequency to ensure that number of messages are sufficient and don't appear as spam. |
| [Role-based views](../task-modules-and-cards/cards/universal-actions-for-adaptive-cards/user-specific-views.md) | A feature of tabs where the tab experience may be different for users depending on their permission level. |
| [RSC permission](../graph-api/rsc/resource-specific-consent.md) | Resource-specific consent (RSC) permission feature is needed by team owners to let a bot app receive messages across channels in a team without being @mentioned. |

## S

| Term | Definition |
| --- | --- |
| [Search commands](../messaging-extensions/how-to/search-commands/define-search-command.md) | A type of message extension app that lets users search external systems and include the search result into a message using a card. <br>**See also**: [Message extensions](#m); [Action commands](#a) |
| [Sequential workflow](../task-modules-and-cards/cards/universal-actions-for-adaptive-cards/sequential-workflows.md) | A workflow that lets a bot carry out a conversation with a user based on the user response. |
| [Shared app](../concepts/extensibility-points.md#shared-app-experiences) | An app that exists in a team, channel, or chat where users can collaborate and interact. <br>**See also:** Personal app |
| [SharePoint site collection](../sbs-gs-spfx.yml) | A collection site for SharePoint apps. You need to have an administrator account for this site before you can deploy your SPFx-based app on the SharePoint site. <br>**See also**: SPFx |
| [Sideloading](../toolkit/publish.md#publish-to-individual-scope-or-sideload-permission) | A process where a Teams app is loaded to the Teams client to test it in the Teams environment before distributing it. |
| [SidePanel](../sbs-meetings-sidepanel.yml) | A feature of Teams meeting app that enables you to customize experiences in a meeting that allow organizers and presenters to have different set of views and actions. |
| [SPFx](../sbs-gs-spfx.yml) | SharePoint Framework (SPFx) is a development model to build client-side solutions for Microsoft Teams and SharePoint. |
| SSO | Acronym for Single sign-on, an authentication method in which a user needs to sign in to an independent service of a software platform (such as Microsoft 365) only once. The user is then able to access all services without having to go through authentication again. <br>**See also**: [Authentication](#a) |
| [Stage view](../sbs-meetings-stage-view.yml) | A user interface component that lets you render the content that is opened in full screen in Teams and pinned as a tab. It's invoked to surface web content within Teams. Note that it is *not* the same as meeting stage. <br>**See also**: [Meeting stage](#m) |
| [Standalone app](../samples/integrating-web-apps.md) | A single-page or large, and complex app. The user can use some aspects of it in Teams. <br>**See also**: [Collaboration aap](#c) |
| [Static search](../task-modules-and-cards/cards/dynamic-search.md) | A method of typeahead search that lets users search from pre-specified values in the Adaptive Cards payload. <br>**See also**: [Dynamic search](#d) |
| [Store validation guidelines](../concepts/deploy-and-publish/appsource/prepare/teams-store-validation-guidelines.md) | A set of Teams-specific guidelines for validating an app before it can be submitted to Teams store. <br>**See also**: [Teams store](#t) |

## T

| Term | Definition |
| --- | --- |
| [Tab](../tabs/what-are-tabs.md) | Tabs are Teams-aware webpages embedded in Microsoft Teams that point to domains declared in manifest. You can add it inside a team, group chat, or personal app. |
| [Tab chat](../tabs/how-to/conversational-tabs.md) | A type of tab that lets a user have a focused conversation experience in dynamic tabs. |
| [Task modules](../task-modules-and-cards/what-are-task-modules.md) | A feature of Teams app to create modal pop-up for completing tasks, displaying videos, or dashboard. |
| [Thread discussion](../tabs/design/tabs.md#thread-discussion) | A conversation posted on a channel or chat between users. <br>**See also** [Conversation](#c); [Channel](#c) |
| [Teams](../overview.md) | Microsoft Teams is the ultimate message app for your organization. It's a workspace for real-time collaboration and communication, meetings, file and app sharing. |
| [Teams Toolkit](../toolkit/teams-toolkit-fundamentals.md) | The Microsoft Teams Toolkit enables you to create custom Teams apps directly within the Visual Studio Code environment.  |
| [TeamsFx](../toolkit/teamsfx-cli.md) | TeamsFx is a text-based command line interface that accelerates Teams application development. It's also called TeamsFx CLI.|
| [TeamsFx SDK](../toolkit/teamsfx-sdk.md) | TeamsFx SDK is pre-configured in scaffolded project using TeamsFx toolkit or CLI. |
| [TeamsJS SDK](../tabs/how-to/using-teams-client-sdk.md) | TeamsJS SDK enables you to create hosted experiences in Teams. Starting with TeamsJS v.2.0.0, you can extend Teams apps to run in Outlook and Office. |
| [Teams Mobile](../concepts/design/plan-responsive-tabs-for-teams-mobile.md) | Microsoft Teams available as a mobile app. |
| [Teams store](../concepts/deploy-and-publish/appsource/publish.md) | A store landing page that brings apps to users in a single place. The apps are categorized by usage, industry, and more. An app must follow Store validation guidelines and obtain an approval before it's available to users via the Teams store.  <br>**See also**: [Store validation guidelines](#s) |
| [Teams workbench](../sbs-gs-spfx.yml) | A workbench in Visual Studio Code used at build for Teams apps created using SPFx and Teams Toolkit. <br>**See also**: [Workbench](#w); [Local workbench](#l) |

## U

| Term | Definition |
| --- | --- |
| [UI components](../concepts/design/design-teams-app-basic-ui-components.md) | For Teams app development, you can use Fluent UI components to build your app from scratch. |
| [UI templates](../concepts/design/design-teams-app-ui-templates.md) | For Teams app development, you can use Teams UI templates to design your apps quickly. |
| [Universal Actions for Adaptive Cards](../task-modules-and-cards/cards/universal-actions-for-adaptive-cards/overview.md) | A way to implement Adaptive Cards across platforms and applications. It uses a bot as a common backend for handling actions. |

## V

| Term | Definition |
| --- | --- |
| [Virtual Assistant](../samples/virtual-assistant.md) | A Microsoft open-source template that enables you to create a robust conversational solution. |

## W

| Term | Definition |
| --- | --- |
| [Website url](../tabs/design/tabs-mobile.md) | A property in the app manifest file (`websiteUrl`) that links the app to the website of the organization or landing page of the relevant product. It's a mandatory configuration for Teams mobile client. <br>**See also**: [App manifest](#a); [Teams Mobile](#t) |
| [Web app](../samples/integrate-web-apps-overview.md) | An app that runs on a web server. It can be integrated with Microsoft Teams Platform. |
| [Webhook](../webhooks-and-connectors/what-are-webhooks-and-connectors.md) | It is a feature of a Teams app used to integrate it with external apps. <br>**See also**: Incoming webhook; outgoing webhook |
| [Web part](../sbs-gs-spfx.yml) | A UI component used to build a page or a site in a Teams app created using Visual Studio Code and SharePoint Framework. <br>**See also**: [SPFx](#s) |
| [Workbench](../sbs-gs-spfx.yml) | Overall Visual Studio Code UI that encompasses UI components, such as title bar, panel, and more. <br>**See also**: [Local workbench](#l); [Teams workbench](#t) |

## Y

| Term | Definition |
| --- | --- |
| [YoTeams](../get-started/get-started-overview.md) | A development toolkit for building Microsoft Teams applications based on TypeScript and node.js. |
