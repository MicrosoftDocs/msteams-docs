---
title: Microsoft Teams developer documentation- Glossary
description: Learn about the common terms, meanings, and definitions used in Microsoft Teams developer documentation.
ms.localizationpriority: high
ms.topic: reference
ms.date: 06/12/2023
---
# Glossary

Common terms and definitions used in Microsoft Teams developer documentation.

## A

| Term | Definition |
| --- | --- |
| [Action command](../messaging-extensions/how-to/action-commands/define-action-command.md) | A type of message extension app that uses a pop-up to collect or display information. <br>**See also**: [Message extension](#m); [Search commands](#s) |
| [Access token](../tabs/how-to/authentication/tab-sso-code.md) | An access token enables a client app to securely call protected web APIs. Access tokens are used by web APIs to perform authentication and authorization. <br> **See also**: [Identity token](#i) <br> For more information, see [Access token](/azure/active-directory/develop/access-tokens), [Authentication](../concepts/authentication/authentication.md) |
| [Adaptive Cards](../task-modules-and-cards/what-are-cards.md) | An actionable content snippet added to a conversation by a bot or message extension. Use text, graphics, and buttons with these cards for rich communication. <br> **See also**: [Dialog](#d); [Adaptive Card Schema Explorer](https://adaptivecards.io/explorer/AdaptiveCard.html) |
| [Administrator consent](../tabs/how-to/authentication/tab-sso-register-aad.md) | An administrator can grant consent for the application on behalf of all users in the organization. It helps avoid the need for user consent. <br> [SSO](#s); [Consent dialog](#c); [User consent](#u) |
| [Anonymous](../apps-in-teams-meetings/build-apps-for-anonymous-user.md) |Anonymous users don't have a Microsoft Entra identity and aren't federated with a tenant. The anonymous participants are external users but their identity isn't shown in the meeting. An anonymous user can be a presenter or an attendee but can't be an organizer. <br>**See also**: [Federated or external](#f); [In-tenant](#i); [Guest](#g)|
| [App Catalog](../toolkit/publish.md) | A site that stores SharePoint and Office apps for an organization's internal use. <br>**See also**: [SPFx](#s) |
| [App Caching](../tabs/how-to/app-caching.md) | App caching improves subsequent launch time of the apps within Teams by allowing you to keep some resources and assets in memory that you can use when rehydrating your app.|
| [App manifest](../resources/schema/manifest-schema.md) | The app manifest (previously called Teams app manifest) describes how the app integrates into Microsoft Teams and also how to extend your app to run across Microsoft 365. Your manifest must conform to the [app manifest schema](https://developer.microsoft.com/json-schemas/teams/v1.11/MicrosoftTeams.schema.json). |
| [App package](../concepts/build-and-test/apps-package.md) | An app package is a zip file that contains the app manifest file, color icon, and outline icon.  |
| [Application permission](/graph/permissions-overview?tabs=http#application-permissions) | Application permissions are used in the app-only access scenario, without a signed-in user present. The application will be able to access any data that the permission is associated with. |
| [App scope](../concepts/design/understand-use-cases.md#app-scope) | An area in Teams where people can use your app. Apps can have one or many scopes, including personal, channels, chats, and meetings. A Teams app can exist across scopes. <br> **See also**: [Default install scope](#d) |
| App tray | An application tray located on the bottom bar of a Teams mobile app. It collects all apps that are open but not currently used or active. <br>**See also**: [Teams Mobile](#t) |
| [Application ID](../tabs/how-to/authentication/tab-sso-register-aad.md) | The application ID, or client ID, is a value the Microsoft identity platform assigns to your application when you register it in Microsoft Entra ID. The application ID is a GUID value that uniquely identifies the application and its configuration within the identity platform. <br> **See also**: [GUID](#g); [Client ID](#c); [Application ID URI](#a); [Subdomain ID](#s) |
| [Application ID URI](../tabs/how-to/authentication/tab-sso-register-aad.md) | The globally unique URI used to identify this web API. It's the prefix for scopes and in access tokens, it's the value of the audience claim. Also referred to as an identifier URI. <br> **See also**: [Token exchange URL](#t); [Configure your bot or message extension app in Microsoft Entra ID](../bots/how-to/authentication/bot-sso-register-aad.md) |
|[Authentication](../concepts/authentication/authentication.md)|The process to validate a user's identity to access your app. <br> **See also**: [Identity providers](#i); [SSO](#s); [authentication](../m365-apps/teamsjs-support-m365.md#authentication)|
| [Authentication flow](../concepts/authentication/authentication.md) | The way a user is authenticated to use your app. For Teams apps, we recommend using Single Sign-on (SSO) using Microsoft Entra ID; but an alternative is to use a third-party IdP. <br> **See also**: [SSO](#s); [Identity provider](#i) |
| [Authorization](../resources/schema/manifest-schema.md#authorization)| An app manifest property (`authorization`) that specifies and consolidates authorization related information for the app. <br> **See also**: [Permission](#p)|
| [Microsoft Entra ID](../tabs/how-to/authentication/auth-tab-aad.md) | Microsoft’s cloud-based identity and access management service. It helps authenticated users access internal and external resources.  <br> **See also**: [System for Cross-Domain Identity Management (SCIM)](/azure/active-directory/architecture/sync-scim)|
| [Azure resource](../toolkit/provision.md) | A service that is available through Azure that your Teams app can use for Azure deployment. It could be storage accounts, web apps, databases, and more. |

## B

| Term | Definition |
| --- | --- |
| [Blazor](../get-started/get-started-overview.md) | A free and open-source web framework that enables developers to create web apps using C# and HTML. It's being developed by Microsoft. |
| [Bicep](../toolkit/provision.md) | A declarative language, which means the elements can appear in any order. Unlike imperative languages, the order of elements doesn't affect how deployment is processed. |
| [Bot](../bots/what-are-bots.md) | A bot is an app or service that executes programmed repetitive tasks. <br> **See also**: [Conversational bot](#c); [Chat bot](#c) |
| Bot Builder SDK | It's an open-source SDK hosted on GitHub to help build dialogs within your Node.js- or C#-based bot. |
| [Bot Emulator](../bots/how-to/debug/locally-with-an-ide.md#use-the-bot-emulator) | A desktop application that lets you test and debug bots, either locally or remotely. |
| [Bot Framework](../bots/bot-features.md) | A rich SDK used to create bots using C#, Java, Python, and JavaScript. If you have a bot that is based on the Bot Framework, you can modify it to work in Teams. <br> [Bot Framework Token Service](#b); [Bot Framework Schema](#b) |
| [Bot handle](../bots/how-to/authentication/bot-sso-register-aad.md) | A bot handle is a unique identifier for your bot. A bot handle represents a bot's registration with the online Azure Bot Service. This registration is associated with an HTTP webhook endpoint and registration with channels. <br> **See also**: [SSO](#s); [Bot resource](#b); [Microsoft Entra ID](#a) |
| Bot Framework Schemas | Bot Framework Schemas are specifications for JSON data. They define the shape of the data and can be used to validate JSON. <br> **See also**: [Bot Framework](#b) |
| [Bot Framework Token Service](../bots/how-to/authentication/bot-sso-overview.md) | It's a feature of Bot Framework that facilitates a bot app to use the OAuth protocol for acquiring and storing access token. <br> **See also**: [Bot Framework](#b); [SSO](#s); [Access token](#a); [Identity token](#i) <br> For more information, see [Bot Framework Token Service](/azure/bot-service/bot-builder-concept-authentication#about-the-bot-framework-token-service) |
| [Bot ID](../bots/how-to/authentication/bot-sso-register-aad.md) | A unique identifier of your bot app that is generated at the time you register your app in Microsoft Entra ID. <br> **See also**: [Bot handle](#b) |
| [Bot resource](../bots/how-to/authentication/bot-sso-register-aad.md) | The Azure Bot resource (bot resource) allows you to register your bot with Azure Bot Services and to connect your bot to channels. <br> **See also**: [SSO](#s); [Microsoft Entra ID](#a) |

## C

| Term | Definition |
| --- | --- |
| [Call bot](../bots/calls-and-meetings/calls-meetings-bots-overview.md) | A bot that participates in audio or video calls and online meetings. <br> **See also**: [Chat bot](#c); [Meeting bot](#m); [Real-time media calls and meetings](../bots/calls-and-meetings/real-time-media-concepts.md) |
| [Capabilities](../concepts/design/map-use-cases.md#app-capabilities-mapped-to-features)| Capabilities are the core functionalities that you can build in your app. They're also called entry or extension points because they enable integration and interaction. <br> **See also**: [App scope](#a)|
| [Chat bot](../bots/how-to/conversations/conversation-basics.md) | A bot is also referred to as a chatbot or conversational bot. It's an app that runs simple and repetitive tasks for users such as customer service or support staff. <br> **See also**: [Conversational bot](#c) |
| Channel | A single place for a team to share messages, tools, and files. You can use a channel for teamwork and communication. <br> **See also**: [Conversation](#c) |
| Contoso | Contoso Ltd. (also known as Contoso and Contoso University) is a fictional company used by Microsoft as an example company and domain. |
| Client ID | The client ID, or the application ID is a value the Microsoft identity platform assigns to your application when you register it in Microsoft Entra ID. It's a GUID value that uniquely identifies the application and its configuration within the identity platform. <br> **See also**: [Application ID](#a); [GUID](#g); [Subdomain ID](#s) |
| [Client secret](../bots/how-to/authentication/bot-sso-register-aad.md) | A secret string that an app uses to prove its identity when requesting a token. Also, it can be referred to as application password. <br> **See also**: [Microsoft app password](#m) <br> For more information, see [Authentication](../concepts/authentication/authentication.md)|
| [Cloud resources](../toolkit/add-resource.md) | A service that is available on cloud through internet that your Teams app can use. It could be storage accounts, web apps, databases, and more. |
| [Configurable tab](../resources/schema/manifest-schema.md#configurabletabs)| Configurable tabs are also known as channel or group tabs. Configurable tabs are used when your app experience has a team channel tab experience, which requires extra configuration before it's added. <br> **See also**: [App manifest](#a)|
| [Configuration URL](../resources/schema/manifest-schema.md#configurabletabs)| An app manifest property (`configurationUrl`) where the HTTPS URL to use when configuring the tab or connector. <br> **See also**: [App manifest](#a)|
| [Collaboration app](../concepts/extensibility-points.md) | An app with capabilities for a user to work in a collaborative workspace with other users. <br> **See also**: [Standalone app](#s) |
| [Collaborative Stageview](../tabs/tabs-link-unfurling.md#collaborative-stageview) | Collaborative Stageview is an enhancement to Stageview that allows users to engage with your app content in a new Teams window accompanied by a side panel conversation. <br> **See also**: [Stageview](#s)|
| [Compose Extensions](../resources/schema/manifest-schema.md#composeextensions) | An app manifest property (`composeExtensions`) that refers to message extension capability. It's used when your extension needs to either authenticate or configure to continue. <br>**See also**: [App manifest](#a); [Message extension](#m) |
| [Command Box](../resources/schema/manifest-schema.md) | A type of context in app manifest (`commandBox`) that you can configure to invoke a message extension from Teams command box. <br>**See also**: [Message extension](#m)  |
| [Command lists](../resources/schema/manifest-schema.md#botscommandlists)| An app manifest property (`commandLists`) that consists of a list of commands that the bot supplies, including their usage, description, and the scope for which the commands are valid. For each scope, you must use a specific command list. <br> **See also**: [App manifest](#a)|
| Connection name | The name of OAuth connection that you configure for enabling SSO connection for your bot resource. <br> **See also**: [OAuth connection](#o) |
| [Connector](../webhooks-and-connectors/what-are-webhooks-and-connectors.md) | It lets users subscribe to receive notifications and messages from the web services. Connectors expose the HTTPS endpoint for the service to post messages to Teams channels, typically in the form of cards. <br> **See also**: [Webhook](#w); [Connectors Developer Dashboard](https://outlook.office.com/connectors/publish) |
| [Connector for Microsoft 365 Groups](../webhooks-and-connectors/how-to/connectors-creating.md) | It lets you create a custom configuration page for your Incoming Webhook and package them as part of a Teams app. You can send messages primarily using connector cards for Microsoft 365 Groups and can add a limited set of card actions to them. <br>**See also**: [Graph connector](/graph/connecting-external-content-connectors-overview) |
| [Connector ID](../resources/schema/manifest-schema.md#connectors) | A unique identifier for the Connector that matches its ID in the [Connectors Developer Dashboard](https://outlook.office.com/connectors/publish). <br> For more information, see [Include the connector in your manifest](../webhooks-and-connectors/how-to/connectors-creating.md#include-the-connector-in-your-app-manifest) |
| [Consent dialog](../tabs/how-to/authentication/tab-sso-code.md) | The process of a user granting authorization to an application to access protected resources on their behalf. An admin or user can be asked for consent to allow access to their organization or individual data. <br> **See also**: [SSO](#s); [Authentication flow](#a); [Administrator consent](#a); [User consent](#u) |
| [Content URL](../resources/schema/manifest-schema.md#statictabs)| An app manifest property (`contentUrl`) where the HTTPS URL points to the entity UI to be displayed in the Teams canvas. <br> **See also**: [App manifest](#a)|
| Conversation | A series of messages sent between your Microsoft Teams app (tab or bot) and one or more users. A conversation can have three scopes: channel, personal, and group chat. <br>**See also**: [One-on-one chat](#o); [Group chat](#g); [Channel](#c) |
| [Conversational bot](../bots/how-to/conversations/conversation-messages.md) |  It lets a user interact with your web service using text, interactive cards, and dialogs. <br>**See also** [Chat bot](#c); [Standalone app](#s) |
| [Copilot](../messaging-extensions/build-bot-based-plugin.md)|Microsoft 365 Copilot is powered by an advanced processing and orchestration engine that seamlessly integrates Microsoft 365 apps, Microsoft Graph, and large language models (LLMs) to turn your words into the most powerful productivity tool. |
| Customer-owned apps | An app created by you or your organization that is meant for use by other Teams app users outside the organization. It can be made available on Microsoft Teams Store. <br> **See also**: [Teams Store validation guidelines](#s); [Microsoft Store](#s); [LOB apps](#l); [Personal tab](#p); [Shared apps](#s) |
| Custom app built for your org (LOB app) | An app created only for Teams by you or your organization.  |
| [Custom app upload](../toolkit/publish.md#publish-to-individual-scope-or-custom-app-upload-permission) | A process where a Teams app is loaded to the Teams client to test it in the Teams environment before distributing it. |
| [Custom Together Mode](../apps-in-teams-meetings/teams-together-mode.md)| Custom Together Mode scenes in Teams provide an immersive and engaging meeting environment. <br>**See also**: [Developer Portal for Teams](#d) |

## D

| Term | Definition |
| --- | --- |
| [Deep linking](../concepts/build-and-test/deep-links.md) | In a Teams app, you can create deep links to information and features within Teams or to help the user navigate to content in your app. |
| [Default install scope](../concepts/deploy-and-publish/add-default-install-scope.md#configure-your-apps-default-install-scope)| An app manifest property (`defaultInstallScope`) that specifies the install scope defined for the app by default. <br> **See also**: [App manifest](#a); [App scope](#a)|
| [Delegated permission](../tabs/how-to/authentication/tab-sso-graph-api.md) | They're used by apps that have a signed-in user present. For these apps, either the user or an administrator consents to the permissions that the app requests and the app can act as the signed-in user when making calls to Microsoft Graph.  <br> **See also**: [SSO](#s); [Permission](#p); [Scope](#s) |
| [Department of Defense (DOD)](../concepts/cloud-overview.md#plan-for-government-clouds)| DOD environments deliver compliance with Department of Defense Security Requirements Guidelines, Defense Federal Acquisition Regulations Supplement (DFARS), and International Traffic in Arms Regulations (ITAR).|
| [Developer Portal for Teams](../concepts/build-and-test/teams-developer-portal.md) | The primary tool for configuring, distributing, and managing your Microsoft Teams apps. With Developer Portal, you can collaborate with colleagues on your app, set up runtime environments, and much more. |
| [Developer Preview](../resources/dev-preview/developer-preview-intro.md) | A public program for developers that provides early access to unreleased features in Microsoft Teams. It lets you explore and test upcoming features for potential inclusion in your Microsoft Teams app. |
| Deploy | A process to upload the backend and frontend code for the application. At Deployment, the code for your app is copied to the resources you created during provisioning. <br>**See also**: [Provision](#p) |
| [Device capabilities](../concepts/device-capabilities/device-capabilities-overview.md) | Built-in devices, such as camera, microphone, barcode scanner, photo gallery, in a mobile or desktop. You can access the following device capabilities on mobile or desktop through dedicated APIs available in the Microsoft Teams JavaScript client library (TeamsJS). <br>**See also**: [Capability](#c); [Media capability](#m); [Location capability](#l) |
| [Device permission](../concepts/device-capabilities/browser-device-permissions.md) | A Teams app setting that you can configure in your app. You use it to request permission for your app to access and utilize a native device capability. You can manage device permissions in Teams settings. <br>**See also**: [App permissions](#a) |
| [Dev environment](../toolkit/TeamsFx-multi-env.md#create-a-new-environment-manually-in-visual-studio-code) | A type of development environment that Teams Toolkit creates by default. It represents remote or cloud environment configurations. A project can have multiple remote environments. You can add more dev environments to your project using Teams Toolkit. <br>**See also** [Environment](#e); [Local environment](#l) |
| [DevTools](../tabs/how-to/developer-tools.md) | Browser's DevTools are used to view console logs, view or modify runtime network requests, add breakpoints to code (JavaScript) and perform interactive debugging for a Teams app. |
| [Dialogs](../task-modules-and-cards/what-are-task-modules.md) (referred as task modules in TeamsJS v1.x) | A feature of Teams app to create modal pop-up for completing tasks, displaying videos, or dashboard. <br> **See also**: [Adaptive Card](#a), [Task modules](#t)  |
| [Dynamic search](../task-modules-and-cards/cards/dynamic-search.md#dynamic-typeahead-search) | A search feature for Adaptive Cards that is useful to search and select data from large data sets. It helps to filter out the choices as the user enters the search string. <br>**See also**: [Static search](#s) |

## E

| Term | Definition |
| --- | --- |
| [E5 developer account](../toolkit/tools-prerequisites.md#accounts-to-build-your-teams-app) | E5 developer subscription for building apps to extend Microsoft 365. It includes 25 user licenses, including the administrator, for development purposes only.  <br>**See also**: [Microsoft 365 account](#m) |
| [Endpoint address](../bots/how-to/authentication/bot-sso-manifest.md) | It's used in Developer Portal to configure SSO for a bot app. It's the endpoint where messages are sent to your bot. <br> **See also**: [Bot handle](#b); [Messaging endpoint](#m); [OAuth connection](#o); [SSO](#s) |
| [Entry point](../concepts/app-fundamentals-overview.md) | An access point, such as team, channel, and chat, for a Teams app where users can use your app. |
| [Environment](../toolkit/teamsfx-multi-env.md) | A feature in Teams Toolkit that lets you create and use multiple development environments for your app project. There are two dev environments that Teams Toolkit creates by default, local environment and dev environment. <br>**See also**: [Local environment](#l); [Dev environment](#d) |

## F

| Term | Definition |
| --- | --- |
|[Federated or external](../apps-in-teams-meetings/teams-apps-in-meetings.md#user-types-in-teams)|A federated or an external user is a Teams user from another organization who has been invited to join a meeting. Federated users have valid credentials with federated partners and are authorized by Teams. <br>**See also**: [Anonymous](#a); [In-tenant](#i); [Guest](#g) |
| [First-run Experience](../concepts/design/design-teams-app-ui-templates.md)|A First-run Experience (FRE) is a user's introduction to your product. The FRE helps users to get started with the functions, features, and benefits of the product and influences users to come back and continue using your product such as tab or bot.|
| [Fluent UI](../concepts/design/design-teams-app-basic-ui-components.md)| Design and build your Teams app from scratch with the basic Fluent UI components. These components can work across different use cases, themes, and screen sizes. <br>**See also**: [Fluent UI React Components](https://react.fluentui.dev/?path=/docs/concepts-introduction--page)|
| [Fully qualified domain name (FQDN)](../tabs/how-to/authentication/tab-sso-register-aad.md) | A fully qualified domain name (FQDN) represents a domain name of a host or IP address(es). |

## G

| Term | Definition |
| --- | --- |
| [Geo-filtering](../concepts/deploy-and-publish/appsource/prepare/submission-checklist.md#distribute-your-app-to-specific-countries-or-regions) | A Teams feature where you can cater your app to a specific audience from the available list of countries or regions and communicate what’s great about your app in ways that are relevant to users. |
| [Government Community Cloud (GCC)](../concepts/cloud-overview.md#plan-for-government-clouds)| GCC environment provides compliance with federal requirements for cloud services. It includes FedRAMP High, Defense Federal Acquisition Regulations Supplement (DFARS), and requirements for criminal justice and federal tax information systems (CJI and FTI data types).|
| [Government Community Cloud (GCC) High](../concepts/cloud-overview.md#plan-for-government-clouds)|GCC High environment delivers compliance with Department of Defense (DOD) Security Requirements Guidelines, Defense Federal Acquisition Regulations Supplement (DFARS), and International Traffic in Arms Regulations (ITAR).<br>**See also**: [Department of Defense (DOD)](#d)|
| [Graph API](../graph-api/proactive-bots-and-messages/graph-proactive-bots-and-messages.md) | A RESTful web API for Microsoft Graph that enables you to access Microsoft Cloud service resources. <br>**See also**: [Microsoft Graph Explorer](#m) |
| [Group chat](../resources/bot-v3/bot-conversations/bots-conversations.md) | A chat feature where a user is able to chat with a bot in a group setting by using @mention to invoke the bot. <br>**See also**: [One-on-one chat](#o); [Chat bot](#c) |
| [GUID](../tabs/how-to/authentication/tab-sso-register-aad.md) | GUID is a specific-format identifier such as application ID or client ID. Microsoft identity platform assigns GUID to your app when you register in Microsoft Entra ID and helps to uniquely identify your app and the configuration within the identity platform. <br> **See also**: [Application ID](#a) |
| [Guest](../apps-in-teams-meetings/teams-apps-in-meetings.md#user-types-in-teams)| A guest is a participant from another organization invited to access Teams or other resources in the organization's tenant. Guests are added to the organization’s Microsoft Entra ID and have same Teams capabilities as a native team member. They have access to team chats, meetings, and files. A guest can be an organizer, presenter, or attendee.  <br>**See also**: [Anonymous](#a); [In-tenant](#i); [Federated or external](#f)|

## I

| Term | Definition |
| --- | --- |
| [Identity provider](../concepts/authentication/authentication.md) | Identity provide (IDP) is an entity that stores and provides credentials to the user. It also allows users to register themselves.  <br>**See also**: [Authentication](#a) |
| [Identity token](../tabs/how-to/authentication/tab-sso-overview.md) | An identity token is used for authenticating app users. It's used by an application to verify if the app user is as per the declared identity. <br> **See also**: [Access token](#a) <br> For more information, see [ID tokens](/azure/active-directory/develop/id-tokens).|
| [Incoming Webhook](../webhooks-and-connectors/how-to/add-incoming-webhook.md) | It lets an external app share content in Teams channels. These webhooks are used as tracking and notifying tools. <br>**See also**: [Webhook](#w); [Outgoing Webhook](#o) |
| [In-meeting app experience](../apps-in-teams-meetings/teams-apps-in-meetings.md) | A stage of Teams meeting lifecycle. With the in-meeting app experience, you can engage participants during the meeting by using apps and the in-meeting dialog box. <br>**See also**: [Meeting lifecycle](#m) |
| [In-tenant](../apps-in-teams-meetings/teams-apps-in-meetings.md#user-types-in-teams) | In-tenant users belong to the organization and have credentials in Microsoft Entra ID for the tenant. They're full-time, onsite, or remote employees and can be an organizer, presenter, or attendee. <br>**See also**: [Anonymous](#a); [Federated or external](#f); [Guest](#g) |

## L

| Term | Definition |
| --- | --- |
| [Link unfurling](../messaging-extensions/how-to/link-unfurling.md) | A feature used with message extension and meeting to unfold links pasted into a compose message area. The links expand to show additional information about the link in Adaptive Cards or in the meeting Stageview. <br>**See also**: [Adaptive Card](../task-modules-and-cards/cards/cards-reference.md#adaptive-card); [Stageview](#s) |
| [Live Share SDK](../apps-in-teams-meetings/teams-live-share-overview.md) | An SDK designed to transform Teams apps into collaborative multi-user experiences without writing any dedicated back-end code. With Live Share, your users can co-watch, co-create, and co-edit during meetings. |
| [Live Share canvas](../apps-in-teams-meetings/teams-live-share-canvas.md)| When collaborating in meetings, it's essential for users to be able to point out and emphasize content on the screen. Live Share canvas makes it easy to add inking, laser pointers, and cursors to your app for seamless collaboration. |
| [Live share media](../apps-in-teams-meetings/teams-live-share-overview.md#live-share-media)| Live Share media enables media synchronization for any media player. By synchronizing media at the player state and transport controls layer, you can individually attribute views, when providing the highest possible quality available through your app.|
| [Local environment](../toolkit/TeamsFx-multi-env.md#create-a-new-environment-manually-in-visual-studio-code) | A default development environment created by Teams Toolkit.  <br>**See also**: [Environment](#e); [Dev environment](#d) |
| [Local workbench](../sbs-gs-spfx.yml) | The default option to run and debug a Teams app in Visual Studio Code (VS Code) that is created using SPFx. <br>**See also**: [Workbench](#w); [Teams workbench](#t) |
| [Location capability](../concepts/device-capabilities/location-capability.md) | A device capability that you can integrate with your app to know the geographical location of the app user for an enhanced collaborative experience. This feature is currently available only for Teams mobile clients only. <br>**See also**: [Capability](#c); [Media capability](#m); [Device Capability](#d); [Teams Mobile](#t) |
| [Long description](../concepts/deploy-and-publish/appsource/prepare/submission-checklist.md#long-description) | The long description can provide a narrative that highlights your apps main features, the problems it solves, and target audience. <br>**See also**: [Short description](#s)|
| [Low code apps](../samples/teams-low-code-solutions.md) | A custom Teams app built from scratch using Microsoft Power Platform that requires little or no coding and can be developed and deployed quickly. |

## M

| Term | Definition |
| --- | --- |
| [Media capability](../concepts/device-capabilities/media-capabilities.md) | Native device capabilities, such as, camera and microphone, that you can integrate with your Teams app. <br>**See also**: [Capability](#c); [Device capability](#d) |
| [Meeting bot](../bots/calls-and-meetings/calls-meetings-bots-overview.md) | Bots that interact with Teams calls and meetings using real-time voice, video, and screen sharing. <br>**See also**: [Call bot](#c); [Chat bot](#c) |
| [Meeting lifecycle](../apps-in-teams-meetings/teams-apps-in-meetings.md) | It spans from pre-meeting, in-meeting, and post-meeting app experience. You can integrate tabs, bots, and message extensions in each stage of the meeting lifecycle. <br>**See also**: [In-meeting experience](#i) |
| [Meeting stage](../sbs-meetings-stage-view.yml) | A feature of meeting extension app. It's a shared space accessible to all participants during the meeting. It helps participants interact and collaborate with app content in real time. <br>**See also**: [Stageview](#s) |
| [Messaging endpoint](../bots/how-to/authentication/bot-sso-register-aad.md) | It's the endpoint where messages are sent to your bot. <br> **See also**: [Endpoint address](#e); [Bot handle](#b); [OAuth connection](#o); [SSO](#s) |
| [Message extension](../messaging-extensions/what-are-messaging-extensions.md) | Message extensions (previously called [composeExtensions](../resources/schema/manifest-schema.md#composeextensions)) are shortcuts for inserting app content or acting on a message. You can use a message extension without navigating away from the conversation. <br>**See also**: [Search commands](#s); [Action commands](#a) |
| [Meeting extension](../apps-in-teams-meetings/design/designing-apps-in-meetings.md) | An app designed to be used during the meeting lifecycle to make it more productive, such as whiteboard, dashboard, and more. |
| [Meeting surfaces](../resources/schema/manifest-schema.md#configurabletabs) | The set of `meetingSurfaceItem` scopes where a tab is supported. <br>**See also**: [Configurable tab](#c)|
| [Microsoft 365 account](../toolkit/accounts.md#microsoft-365-developer-account-types) | Microsoft 365 account includes 25 user licenses, including the administrator, for development purposes only. |
| Microsoft 365 client ID | See [Client ID](#c) |
| [Add Microsoft 365 channel for your bot](../m365-apps/extend-m365-teams-message-extension.md#add-microsoft-365-channel-for-your-app) | A feature of Teams message extension app that lets the users interact with it from Microsoft 365. |
| [Microsoft 365 developer program](../toolkit/tools-prerequisites.md)| The Microsoft 365 Developer Program helps you build apps that extend Microsoft 365. |
| Microsoft App Password | A secret string that the application uses to prove its identity when requesting a token. Also, it can be referred to as application password. <br> **See also**: [Client secret](#c) |
| [Microsoft Graph Explorer](../graph-api/proactive-bots-and-messages/graph-proactive-bots-and-messages.md) | The gateway to data and intelligence in Microsoft 365. It provides a unified programmability model that you can use to access data in Microsoft 365, Windows 10, and Enterprise Mobility + Security. |
| [Microsoft Partner Center](/partner-center/overview) | Microsoft Partner Center streamlines several business processes to make it easier for Microsoft partners to manage their relationship with Microsoft and their customers. Partner Center gives you access to the tools you need to get work done.|
| [Microsoft Partner Network ID](../concepts/deploy-and-publish/appsource/prepare/teams-store-validation-guidelines.md#uses-of-latest-app-manifest-schema) | The Microsoft Partner Network ID (MPN ID) that identifies the partner organization building the app. You can find your MPN ID by fetching the Partner Center ID.|
| [Microsoft Teams](../overview.md) | Microsoft Teams is a group collaboration software that can be used to help teams work together remotely. |
| [Microsoft Teams Platform](../concepts/app-fundamentals-overview.md) | The Microsoft Teams developer platform makes it easy for developers to integrate their own apps and services with Teams. |
| [Microsoft Teams UI Library](../concepts/design/design-teams-app-ui-templates.md#microsoft-teams-ui-library) | Microsoft Teams UI Library helps you view and test individual Teams UI templates and related components in your browser. |
| [Microsoft Teams UI Toolkit](../concepts/design/design-teams-app-ui-templates.md#microsoft-teams-ui-library) | Microsoft Teams UI Kit includes components and patterns that are designed specifically for building Teams apps. |
| Microsoft Store | It's a digital distribution platform operated by Microsoft. it's also known as Windows Store. <br> **See also**: [Teams Store](#t) |
| [Monetization](../concepts/deploy-and-publish/appsource/prepare/monetize-overview.md)| Teams Store provides features that enable you to monetize your apps and gain customers by engaging with your users. <br> **See also**: [SaaS](#s)|
| [Multitenant app](../tabs/how-to/authentication/tab-sso-register-aad.md) | A class of applications that enables sign-in and consent by users provisioned in any Microsoft Entra tenant, including tenants other than the one where the client app is registered. <br> **See also**: [Single-tenant apps](#s) |

## N

| Term | Definition |
| --- | --- |
| [Notification only Bot](../bots/how-to/conversations/notification-bot-in-teams.md)| Microsoft Teams Toolkit enables you to build applications that capture events and send them as notifications to a personal, group chat, or a channel in Teams. By design, if your bot doesn't respond or support any user command and is a one way bot only intended to notify users. You must set `isNotificationOnly` to true in the app manifest. <br> **See also**: [Teams Toolkit](#t)|

## O

| Term | Definition |
| --- | --- |
| [OAuth card](../bots/how-to/authentication/bot-sso-code.md) | A card used by an app to represent a request to perform a sign-in via OAuth. <br> **See also**: [SSO](#s); [TokenExchangeResource property](#t) |
| [OAuth connection](../bots/how-to/authentication/bot-sso-register-aad.md) | It's configured as a part of bot resource configuration for SSO authentication after its registered on Microsoft Entra ID. It contains details about the identity provider, client secret, and so on. <br> **See also**: [SSO](#s); [Connection name](#c); [Identity provider](#i); [Client secret](#c); [Microsoft Entra ID](#a) |
| [Object ID](../bots/how-to/authentication/bot-sso-register-aad.md) | The unique identifier created by Microsoft Entra admin center when you register or update your app. It identifies the application object, which defines the application's identity configuration globally (across all tenants where it has access). <br> **See also**: [Application ID](#a); [Tenant ID](#t); [SSO](#s) |
| [Outgoing Webhook](../webhooks-and-connectors/how-to/add-outgoing-webhook.md) | It acts as a bot and search for messages in channels using @mention. It sends notifications to external web services and responds with rich messages, which include cards and images. <br>**See also**: [Webhook](#w); [Incoming Webhook](#i) |
| [One-on-one chat](../resources/bot-v3/bot-conversations/bots-conv-personal.md) | A type of chat between a Teams personal bot app and a single user. <br>**See also**: [Group chat](#g); [Chat bot](#c) |

## P

| Term | Definition |
| --- | --- |
| [People picker](../task-modules-and-cards/cards/people-picker.md) | A native control in Teams platform to search and select people, which can be integrated in web apps, Adaptive Cards, and more. |
| [People icon](../task-modules-and-cards/cards/cards-format.md#people-icon-in-an-adaptive-card) | People icon helps users to view the images of users in an Adaptive Card. |
| [Permission](../tabs/how-to/authentication/tab-sso-register-aad.md) | While authentication and providing access token for app user, a client application gains access to a resource server by declaring permission requests. Two types are available, Delegated permissions and Application permissions. <br> **See also**: [Scope](#s); [SSO](#s); [Authentication flow](#a); [Authorization](#a) |
| [Personal tab](../concepts/design/personal-apps.md) | A personal tab is also known as static tab. A personal (static) tab is a Teams application with a personal scope. It focuses on interactions with a single user. It can be a conversational bot to engage in one-to-one conversations with a user or a personal tab providing an embedded web experience, or both. <br>**See also**: [Shared app](#s); [Static tab](#s) |
| [Policy](../concepts/deploy-and-publish/appsource/prepare/teams-store-validation-guidelines.md#privacy-policy) | The privacy policy can be specific to your Teams app or an overall policy for all your services.|
| [Power Virtual Agents](../bots/how-to/add-power-virtual-agents-bot-to-teams.md) | A no-code, guided graphical interface solution that empowers every member of your team to create rich, conversational chat bots that easily integrate with the Teams platform. |
| [Privacy URL](../resources/schema/manifest-schema.md#developer)| A property in the app manifest file (`privacyUrl`). The HTTPS URL to the page that provides privacy information for the app.|
| [Proactive messages](../bots/how-to/conversations/send-proactive-messages.md) | A message sent by a bot that isn't in response to a request from a user, such as welcome messages, notifications, scheduled messages. |
| [Provision](../toolkit/provision.md) | A process that creates resources in Azure and Microsoft 365 for your app, but no code (HTML, CSS, JavaScript, etc.) is copied to the resources. It's a prerequisite to deployment. <br>**See also**: [Deploy](#d) |
| [Publisher docs URL](../resources/schema/manifest-schema.md#publisherdocsurl)| The value of the `publisherDocsUrl` parameter is a secure HTTPS URL to the app documentation and information page that app developers choose to provide. Tenant admins get documentation about the app at this URL. Teams admin center displays the URL in the app details page.|

## R

| Term | Definition |
| --- | --- |
| [Rate-limiting](../bots/how-to/rate-limit.md) | A method to limit messages to a certain maximum frequency to ensure that number of messages are sufficient and don't appear as spam. |
| [Redirect URL](../bots/how-to/authentication/bot-sso-register-aad.md) | A redirect URL is the location where the authorization server sends the user after the app has been successfully authorized and granted an authorization code or access token. It's also called or reply URL. |
| [Role-based views](../task-modules-and-cards/cards/universal-actions-for-adaptive-cards/user-specific-views.md) | A feature of tabs where the tab experience may be different for users depending on their permission level. |
| [RSC permission](../graph-api/rsc/resource-specific-consent.md) | Resource-specific consent (RSC) permission feature is needed by team owners to let a bot app receive messages across channels in a team without being @mentioned. <br> For more information, see [Permissions](/graph/permissions-overview?tabs=http) |
| [Real-time meeting protocol](../resources/schema/manifest-schema.md#meetingextensiondefinition)| A Boolean value indicating whether this app can stream the meeting's audio and video content to a Real-time meeting protocol (RTMP) endpoint.|

## S

| Term | Definition |
| --- | --- |
|[SaaS](../concepts/deploy-and-publish/appsource/prepare/include-saas-offer.md)| You can monetize your Teams app by selling subscription plans directly from your Teams Store listing with a transactable Software-as-a-Service (SaaS) offer. <br> **See also**: [Monetization](#m)|
|Scene|You can build a scene using the scene studio.|
| [Scope](../tabs/how-to/authentication/tab-sso-register-aad.md) | Scopes are used to implement scope-based access control, for a client application that has been given delegated access to the resource by its owner. They're resource-defined strings. For example, **Mail.Read**, **Directory.ReadWrite.All**; managed in the Azure portal. <br> **See also**: [SSO](#s); [Authentication flow](#a); [Delegated permission](#d); [Permission](#p) |
| [Search commands](../messaging-extensions/how-to/search-commands/define-search-command.md) | A type of message extension app that lets users search external systems and include the search result into a message using a card. <br>**See also**: [Message extensions](#m); [Action commands](#a) |
| [Sequential workflow](../task-modules-and-cards/cards/universal-actions-for-adaptive-cards/sequential-workflows.md) | A workflow that lets a bot carry out a conversation with a user based on the user response. |
| [Shared app](../concepts/extensibility-points.md#shared-app-experiences) | An app that exists in a team, channel, or chat where users can collaborate and interact. <br>**See also:** [Personal tab](#p) |
| [SharePoint site collection](../sbs-gs-spfx.yml) | A collection site for SharePoint apps. You need to have an administrator account for this site before you can deploy your SPFx-based app on the SharePoint site. <br>**See also**: [SPFx](#s) |
| [Short description](../concepts/deploy-and-publish/appsource/prepare/submission-checklist.md#short-description) | A concise summary of your app that must be original, engaging, and directed at your target audience. <br> **See also**: [Long description](#l)|
| [SidePanel](../sbs-meetings-sidepanel.yml) | A feature of Teams meeting app that enables you to customize experiences in a meeting that allow organizers and presenters to have different set of views and actions. |
| [Single-tenant app](../tabs/how-to/authentication/tab-sso-register-aad.md) | Single-tenant apps are only available in the tenant they were registered in, also known as their home tenant. <br> **See also**: [Multitenant apps](#m) |
| [SPFx](../sbs-gs-spfx.yml) | SharePoint Framework (SPFx) is a development model to build client-side solutions for Microsoft Teams, Office Add-ins, and SharePoint. |
| [SSO](../concepts/authentication/authentication.md) | Acronym for single sign-on, an authentication method in which a user needs to sign in to an independent service of a software platform (such as Microsoft 365) only once. The user is then able to access all services without having to go through authentication again. <br>**See also**: [Authentication](#a); [Scope](#s) |
| [Static tab](../concepts/design/personal-apps.md) | See [Personal tab](#p) |
|[Stageview](../sbs-meetings-stage-view.yml)|A user interface component that lets you render the content that is opened in full screen in Teams and pinned as a tab. It's invoked to surface web content within Teams. It *isn't* the same as meeting stage. <br>**See also**: [Meeting stage](#m); [Collaborative Stageview](#c); [stageView](../m365-apps/teamsjs-support-m365.md#stageview)|
| [Standalone app](../samples/integrating-web-apps.md) | An app that can be added to Teams to customize chats and channels by adding bots, tabs, message extensions, or connectors. Anyone can install standalone apps for personal use, and based on permissions, admins and members can install them in channels for collaboration. Standalone apps can be extended to Outlook and Microsoft 365, and built by you through integrated development environments (IDEs) like Visual Studio or Visual Studio Code. Microsoft also provides standalone apps such as Planner, Word, or Outlook. <br>**See also**: [Collaboration app](#c) |
| [Static search](../task-modules-and-cards/cards/dynamic-search.md) | A method of typeahead search that lets users search from pre-specified values in the Adaptive Cards payload. <br>**See also**: [Dynamic search](#d) |
| [Teams Store validation guidelines](../concepts/deploy-and-publish/appsource/prepare/teams-store-validation-guidelines.md) | A set of standards and principles for validating an app before submitting the app to Teams store. The guidelines are applicable for apps that work across Teams, Outlook, and Microsoft 365. <br>**See also**: [Teams store](#t) |
| [Subdomain ID](../tabs/how-to/authentication/tab-sso-register-aad.md) | It's the application ID URI that you register when configuring scope for your app in Microsoft Entra ID. <br> **See also**: [SSO](#s); [Application ID URI](#a); [Application ID](#a) |
| [Subscription offer](../resources/schema/manifest-schema.md#subscriptionoffer) | This specifies the SaaS offer associated with your app. A unique identifier that includes your Publisher ID and Offer ID, which you can find in Partner Center. <br>**See also**: [SaaS](#s)|

## T

| Term | Definition |
| --- | --- |
| [Tab](../tabs/what-are-tabs.md) | Tabs are client-aware webpages embedded in Microsoft Teams, Outlook, and Microsoft 365 that point to domains declared in app manifest. You can add it as part of a channel inside a team, group chat, or personal app for an individual user. |
| [Tab chat](../tabs/how-to/conversational-tabs.md) | A type of tab that lets a user have a focused conversation experience in dynamic tabs. |
| [Task modules](../task-modules-and-cards/what-are-task-modules.md) (referred as dialogs in TeamsJS v2.x)| A feature of Teams app to create modal pop-up for completing tasks, displaying videos, or dashboard. <br> **See also**: [Adaptive Card](#a), [Dialogs](#d) |
| [Task info](../task-modules-and-cards/task-modules/invoking-task-modules.md#dialoginfo-object) | The `TaskInfo` object contains the metadata for a dialogs (referred as task modules in TeamsJS v.1.0).|
| [Thread discussion](../tabs/design/tabs.md#thread-discussion) | A conversation posted on a channel or chat between users. <br>**See also** [Conversation](#c); [Channel](#c) |
| [Teams](../overview.md) | Microsoft Teams is the ultimate message app for your organization. It's a workspace for real-time collaboration and communication, meetings, file and app sharing. |
| [Teams AI library](../bots/how-to/Teams%20conversational%20AI/teams-conversation-ai-overview.md) | A Teams-centric interface to GPT-based common language models and user intent engines. You can take on complex and expensive tasks of writing and maintaining conversational bot logic to integrate with large language models (LLMs).|
| [Teams identity](../tabs/how-to/authentication/tab-sso-overview.md) | The Microsoft account or Microsoft 365 account of an app user that is used to log in to Teams client, web, or mobile app. |
| [Teams identity](../tabs/how-to/authentication/tab-sso-overview.md) | The Microsoft account or Microsoft 365 account of an app user that is used to sign in to Teams client, web, or mobile app. |
| [Teams Toolkit](../toolkit/teams-toolkit-fundamentals.md) | The Microsoft Teams Toolkit enables you to create custom Teams apps directly within the VS Code environment.  |
| [Teams Toolkit CLI](../toolkit/Teams-Toolkit-CLI.md) | Teams Toolkit CLI is a text-based command line interface that accelerates Teams application development. It's also called Teamsapp CLI.|
| [TeamsFx SDK](../toolkit/teamsfx-sdk.md) | TeamsFx SDK is pre-configured in a scaffolded project using TeamsFx toolkit or CLI. |
| [TeamsJS library](../tabs/how-to/using-teams-client-library.md) | The TeamsJS library enables you to create hosted experiences in supported clients including Teams, Outlook, and Microsoft 365. (**Note**: When using TeamsJS v.1.x, hosted experiences are for Teams client only.) |
| [Teams Mobile](../concepts/design/plan-responsive-tabs-for-teams-mobile.md) | Microsoft Teams available as a mobile app. |
| [Microsoft Teams Store](../concepts/deploy-and-publish/appsource/publish.md) | A Teams Store landing page that brings apps to users in a single place. The apps are categorized by usage, industry, and more. An app must follow Teams Store validation guidelines and obtain an approval before it's available to users via the Teams Store.  <br>**See also**: [Teams Store validation guidelines](#s); [Microsoft Store](#m) |
| [Teams workbench](../sbs-gs-spfx.yml) | A workbench in VS Code used at build for Teams apps created using SPFx and Teams Toolkit. <br>**See also**: [Workbench](#w); [Local workbench](#l) |
| [Tenant ID](../bots/how-to/authentication/bot-sso-register-aad.md) | The unique identifier of the tenant where your app is registered in Microsoft Entra admin center. Your app may be classified as a single-tenant or a multitenant app. <br> **See also**: [Single-tenant app](#s); [Multitenant apps](#m) |
| [Terms of use](../concepts/deploy-and-publish/appsource/prepare/teams-store-validation-guidelines.md#terms-of-use) | These terms of use govern your access to and use of Azure Marketplace, AppSource, and any Microsoft owned or operated online storefronts that point to offers cataloged by Azure Marketplace or AppSource. Your offer listing must include a valid Terms of use link. Offers with invalid, unsecured, and broken Terms of use links fail app review.|
| [Token exchange URL](../bots/how-to/authentication/bot-sso-register-aad.md) | It's the application ID URI that is used for exchanging token. It's configured while configuring the OAuth connection for bot resource. <br> **See also**: [Application ID URI](#u); [SSO](#s) |
| [TokenExchangeResource property](../bots/how-to/authentication/bot-sso-code.md) | It's a property of `OAuthCard` class that gets or sets the resource to try to perform token exchange with. Teams refreshes the token if the `TokenExchangeResource` property is populated on the card. <br> **See also**: [OAuth card](#o); [SSO](#s) <br> For more information, see [Microsoft Bot Schema 4.0](/dotnet/api/microsoft.bot.schema.oauthcard) |
| [TeamsSSOTokenExchangeMiddleware](../bots/how-to/authentication/bot-sso-code.md) | This middleware exchanges the token if the activity name is `signin` or `tokenExchange`. It also ensures only one exchange request is processed. <br> **See also**: [SSO](#s) |
|[Transactable Teams SaaS offer](../resources/schema/manifest-schema.md#subscriptionoffer) | Transactable Teams SaaS offer (T-SaaS) specifies the SaaS offer associated with your app. A unique identifier that includes your Publisher ID and Offer ID, which you can find in Partner Center. <br>**See also**: [SaaS](#s)|

## U

| Term | Definition |
| --- | --- |
| [UI components](../concepts/design/design-teams-app-basic-ui-components.md) | For Teams app development, you can use Fluent UI components to build your app from scratch. |
| [UI templates](../concepts/design/design-teams-app-ui-templates.md) | For Teams app development, you can use Teams UI templates to design your apps quickly. |
| [Universal Actions for Adaptive Cards](../task-modules-and-cards/cards/universal-actions-for-adaptive-cards/overview.md) | A way to implement Adaptive Cards across platforms and applications. It uses a bot as a common backend for handling actions. |
| [User consent](../tabs/how-to/authentication/tab-sso-register-aad.md) | A user can authorize an app to access some data at the protected resource, while acting as that user. <br> **See also**: [Consent dialog](#c); [Administrator consent](#a); [User consent](#u); [Delegated permission](#d); [Configure your app in Microsoft Entra ID](../bots/how-to/authentication/bot-sso-register-aad.md). |

## V

| Term | Definition |
| --- | --- |
| [Valid domains](../resources/schema/manifest-schema.md#validdomains) | A property in the app manifest file (`validDomains`). A list of valid domains for websites the app expects to load within the supported clients. |
| [Virtual assistant](../samples/virtual-assistant.md) | A Microsoft open-source template that enables you to create a robust conversational solution. |

## W

| Term | Definition |
| --- | --- |
| [Website URL](../tabs/design/tabs-mobile.md) | A property in the app manifest file (`websiteUrl`) that links the app to the website of the organization or landing page of the relevant product. <br>**See also**: [App manifest](#a); [Teams Mobile](#t) |
| [Web app](../samples/integrate-web-apps-overview.md) | An app that runs on a web server that can be integrated with Microsoft 365 applications such as Microsoft Teams, Office, and SharePoint. |
| [Webhook](../webhooks-and-connectors/what-are-webhooks-and-connectors.md) | It's a feature of a Teams app used to integrate it with external apps. <br>**See also**: [Incoming Webhook](#i) ; [Outgoing Webhook](#o); [Connector](#c) |
| [Web application info](../resources/schema/manifest-schema.md#webapplicationinfo) | Provide your Microsoft Entra App ID and Microsoft Graph information to help users seamlessly sign into your app. If your app is registered in Microsoft Entra ID, you must provide the App ID. If your app requires admins to review permissions and grant consent in Teams admin center, you must declare `webapplicationinfo` in the manifest. |
| [Web part](../sbs-gs-spfx.yml) | A UI component used to build a page or a site in a Teams app created using VS Code and SharePoint Framework. <br>**See also**: [SPFx](#s) |
| Webview | A webview is a control that displays web content inside an application. |
| [Workbench](../sbs-gs-spfx.yml) | Overall VS Code UI that encompasses UI components, such as title bar, panel, and more. <br>**See also**: [Local workbench](#l); [Teams workbench](#t) |

## Y

| Term | Definition |
| --- | --- |
| [Yeoman generator for Teams](https://github.com/pnp/generator-teams)| Yeoman generator for Teams or YoTeams allows you to create Teams apps using TypeScript and JavaScript on your terms, in your preferred editor, and without any external or online dependencies. |
