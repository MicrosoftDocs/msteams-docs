---
title: Microsoft Teams developer documentation - Glossary
description: Learn about the common terms, meanings, and definitions used in Microsoft Teams developer documentation.
ms.localizationpriority: high
ms.topic: reference
---
# Glossary

Common terms and definitions used in Microsoft Teams developer documentation.

## A

| Term | Definition |
| --- | --- |
| [Action command](../messaging-extensions/how-to/action-commands/define-action-command.md) | A type of message extension app that uses a pop-up to collect or display information. <br>**See also**: [Message extension](#m); [Search commands](#s) |
| [Access token](../tabs/how-to/authentication/tab-sso-code.md) | An access token enables a client app to securely call protected web APIs. Access tokens are used by web APIs to perform authentication and authorization. <br> **See also**: [Identity token](#i). <br> For more information, see [Access token](/azure/active-directory/develop/access-tokens). |
| [Adaptive Cards](../task-modules-and-cards/what-are-cards.md) | An actionable content snippet added to a conversation by a bot or message extension. Use text, graphics, and buttons with these cards for rich communication. <br> **See also**: [Task module](#t) |
| [Administrator consent](../tabs/how-to/authentication/tab-sso-register-aad.md) | An administrator can grant consent for the application on behalf of all users in the organization. It helps avoid the need for user consent. <br> [SSO](#s); [Consent dialog](#c); [User consent](#u) <br> For more information, see [Configure your tab app in Azure AD](../tabs/how-to/authentication/tab-sso-register-aad.md) and [Configure your app in Azure AD](../bots/how-to/authentication/bot-sso-register-aad.md) |
| [App Catalog](../toolkit/publish.md) | A site that stores SharePoint and Office apps for an organization's internal use. <br>**See also**: [SPFx](#s) |
| [App manifest](../resources/schema/manifest-schema.md) | The Teams app manifest describes how the app integrates into the Microsoft Teams product. Your manifest must conform to the [manifest schema](https://developer.microsoft.com/json-schemas/teams/v1.11/MicrosoftTeams.schema.json). |
| [App package](../concepts/build-and-test/apps-package.md) | A Teams app package is a zip file that contains the App manifest file, color icon, and outline icon. |
| [App permission](../concepts/device-capabilities/browser-device-permissions.md#enable-apps-device-permissions) | An option in a Teams app to enable device permissions. It's available only when the manifest file of the app declares that the app needs device permissions. <br> **See also**: [Device permissions](#d) |
| [App scope](../concepts/design/understand-use-cases.md#app-scope) | An area in Teams where people can use your app. Apps can have one or many scopes, including personal, channels, chats, and meetings. A Teams app can exist across scopes. |
| App tray | An application tray located on the bottom bar of a Teams mobile app. It collects all apps that are open but not currently used or active. <br>**See also**: [Teams Mobile](#t) |
| [Application ID](../tabs/how-to/authentication/tab-sso-register-aad.md) | The application ID, or client ID, is a value the Microsoft identity platform assigns to your application when you register it in Azure AD. The application ID is a GUID value that uniquely identifies the application and its configuration within the identity platform. <br> **See also**: [GUID](#g); [Client ID](#c); [Application ID URI](#a); [Subdomain ID](#s) |
| [Application ID URI](../tabs/how-to/authentication/tab-sso-register-aad.md) | The globally unique URI used to identify this web API. It's the prefix for scopes and in access tokens, it's the value of the audience claim. Also referred to as an identifier URI. <br> **See also**: [Token exchange URL](#t); [Configure your bot or message extension app in Azure AD](../bots/how-to/authentication/bot-sso-register-aad.md). |
| [Azure resource](../toolkit/provision.md) | A service that is available through Azure that your Teams app can use for Azure deployment. It could be storage accounts, web apps, databases, and more. |
| [Azure Active Directory](../tabs/how-to/authentication/auth-tab-aad.md) | Microsoft’s cloud-based identity and access management service. It helps authenticated users access internal and external resources. |
| [Authentication](../concepts/authentication/authentication.md) | The process to validate a user's identity to access your app. <br> **See also**: [Identity providers](#i); [SSO](#s) |
| [Authentication flow](../concepts/authentication/authentication.md) | The way a user is authenticated to use your app. For Teams apps, we recommend using Single Sign-on (SSO) using Azure Active Directory (AD); but an alternative is to use a third-party IdP. <br> **See also**: [SSO](#s); [Identity provider](#i) |

## B

| Term | Definition |
| --- | --- |
| [Blazor](../get-started/get-started-overview.md) | A free and open-source web framework that enables developers to create web apps using C# and HTML. It's being developed by Microsoft. |
| [Bicep](../toolkit/provision.md) | A declarative language, which means the elements can appear in any order. Unlike imperative languages, the order of elements doesn't affect how deployment is processed. |
| [Bot](../bots/what-are-bots.md) | A bot is an app or service that executes programmed repetitive tasks. <br> **See also**: [Conversational bot](#c); [Chat bot](#c) |
| Bot Builder SDK | It's an open source SDK hosted on GitHub to help build dialogs within your Node.js- or C#-based bot. |
| [Bot Emulator](../bots/how-to/debug/locally-with-an-ide.md#use-the-bot-emulator) | A desktop application that lets you test and debug bots, either locally or remotely. |
| [Bot Framework](../bots/bot-features.md) | A rich SDK used to create bots using C#, Java, Python, and JavaScript. If you have a bot that is based on the Bot Framework, you can modify it to work in Teams. <br> [Bot Framework Token Service](#b); [Bot Framework Schema](#b) |
| [Bot handle](../bots/how-to/authentication/bot-sso-register-aad.md) | A bot handle is a unique identifier for your bot. A bot handle represents a bot's registration with the online Azure Bot Service. This registration is associated with an HTTP webhook endpoint and registration with channels. <br> **See also**: [SSO](#s); [Bot resource](#b); [Azure AD](#a) |
| Bot Framework Schemas | Bot Framework Schemas are specifications for JSON data. They define the shape of the data and can be used to validate JSON. <br> **See also**: [Bot Framework](#b) |
| [Bot Framework Token Service](../bots/how-to/authentication/bot-sso-overview.md) | It's a feature of Bot Framework that facilitates a bot app to use the OAuth protocol for acquiring and storing access token. <br> **See also**: [Bot Framework](#b); [SSO](#s); [Access token](#a); [Identity token](#i) <br> For more information, see [Bot Framework Token Service](/azure/bot-service/bot-builder-concept-authentication#about-the-bot-framework-token-service) |
| [Bot ID](../bots/how-to/authentication/bot-sso-register-aad.md) | A unique identifier of your bot app that is generated at the time you register your app in Azure AD. <br> **See also**: [Bot handle](#b) |
| [Bot resource](../bots/how-to/authentication/bot-sso-register-aad.md) | The Azure Bot resource (bot resource) allows you to register your bot with Azure Bot Services and to connect your bot to channels. <br> **See also**: [SSO](#s); [Azure AD](#a) |

## C

| Term | Definition |
| --- | --- |
| [Call bot](../bots/calls-and-meetings/calls-meetings-bots-overview.md) | A bot that participates in audio or video calls and online meetings. <br> **See also**: [Chat bot](#c); [Meeting bot](#m) |
| [Capability](../toolkit/add-capability.md) | A Teams feature you can build into your app for interacting with app users. An app capability is used to extend Teams to fit your app needs. An app may have one or more core capabilities, such as tab, bot, and message extension. <br>**See also**: [Device capability](#d); [Media capability](#m) |
| [Chat bot](../bots/how-to/conversations/conversation-basics.md) | A bot is also referred to as a chatbot or conversational bot. It's an app that runs simple and repetitive tasks for users such as customer service or support staff. <br> **See also**: [Conversational bot](#c) |
| Channel | A single place for a team to share messages, tools, and files. You can use a channel for teamwork and communication. <br> **See also**: [Conversation](#c) |
| Client ID | The client ID, or the application ID is a value the Microsoft identity platform assigns to your application when you register it in Azure AD. It's a GUID value that uniquely identifies the application and its configuration within the identity platform. <br> **See also**: [Application ID](#a); [GUID](#g); [Subdomain ID](#s) |
| [Client secret](../bots/how-to/authentication/bot-sso-register-aad.md) | A secret string that an app uses to prove its identity when requesting a token. Also, it can be referred to as application password. <br> **See also**: [Microsoft app password](#m) |
| [Cloud resources](../toolkit/add-resource.md) | A service that is available on cloud through internet that your Teams app can use. It could be storage accounts, web apps, databases, and more. |
| [Collaboration app](../concepts/extensibility-points.md) | An app with capabilities for a user to work in a collaborative workspace with other users. <br> **See also**: [Standalone app](#s) |
| [Compose Extension](../resources/schema/manifest-schema.md#composeextensions) | A property in app manifest (`composeExtensions`) that refers to message extension capability. It's used when your extension needs to either authenticate or configure to continue. <br>**See also**: [App manifest](#a); [Message extension](#m) |
| [CommandBox](../resources/schema/manifest-schema.md) | A type of context in app manifest (`commandBox`) that you can configure to invoke a message extension from Teams command box. |
| Connection Name | The name of OAuth connection that you configure for enabling SSO connection for your bot resource. <br> **See also**: [OAuth connection](#o) |
| [Connector](../webhooks-and-connectors/what-are-webhooks-and-connectors.md) | It lets users subscribe to receive notifications and messages from the web services. Connectors expose the HTTPS endpoint for the service to post messages to Teams channels, typically in the form of cards. <br> **See also**: [Webhook](#w) |
| [Consent dialog](../tabs/how-to/authentication/tab-sso-code.md) | The process of a user granting authorization to an application to access protected resources on their behalf. An admin or user can be asked for consent to allow access to their organization or individual data. <br> **See also**: [SSO](#s); [Authentication flow](#a); [Administrator consent](#a); [User consent](#u) |
| Conversation | A series of messages sent between your Microsoft Teams app (tab or bot) and one or more users. A conversation can have three scopes: channel, personal, and group chat. <br>**See also**: [One-on-one chat](#o); [Group chat](#g); [Channel](#c) |
| [Conversational bot](../bots/how-to/conversations/conversation-messages.md) |  It lets a user interact with your web service using text, interactive cards, and task modules. <br>**See also** [Chat bot](#c) |
| Customer-owned apps | An app created by you or your organization that is meant for use by other Teams app users outside the organization. It can be made available on Teams store. <br> **See also**: [Store validation guidelines](#s); [Microsoft store](#s); [LOB apps](#l); [Personal apps](#p); [Shared apps](#s) |

## D

| Term | Definition |
| --- | --- |
| [Deep linking](../concepts/build-and-test/deep-links.md) | In a Teams app, you can create deep links to information and features within Teams or to help the user navigate to content in your app. |
| [Delegated permission](../tabs/how-to/authentication/tab-sso-graph-api.md) | They're used by apps that have a signed-in user present. For these apps, either the user or an administrator consents to the permissions that the app requests and the app can act as the signed-in user when making calls to Microsoft Graph.  <br> **See also**: [SSO](#s); [Permission](#p); [Scope](#s) |
|[Department of Defense (DoD)](../concepts/app-fundamentals-overview.md#government-community-cloud)| DoD environments deliver compliance with Department of Defense Security Requirements Guidelines, Defense Federal Acquisition Regulations Supplement (DFARS), and International Traffic in Arms Regulations (ITAR).|
| [Developer Portal for Teams](../concepts/build-and-test/teams-developer-portal.md) | The primary tool for configuring, distributing, and managing your Microsoft Teams apps. With Developer Portal, you can collaborate with colleagues on your app, set up runtime environments, and much more. |
| [Developer Preview](../resources/dev-preview/developer-preview-intro.md) | A public program for developers that provides early access to unreleased features in Microsoft Teams. It lets you explore and test upcoming features for potential inclusion in your Microsoft Teams app. |
| Deploy | A process to upload the backend and frontend code for the application. At Deployment, the code for your app is copied to the resources you created during provisioning. <br>**See also**: [Provision](#p) |
| [Device capabilities](../concepts/device-capabilities/device-capabilities-overview.md) | Built-in devices, such as camera, microphone, barcode scanner, photo gallery, in a mobile or desktop. You can access the following device capabilities on mobile or desktop through dedicated APIs available in the Microsoft Teams JavaScript client library (TeamsJS). <br>**See also**: [Capability](#c); [Media capability](#m); [Location capability](#l) |
| [Device permission](../concepts/device-capabilities/browser-device-permissions.md) | A Teams app setting that you can configure in your app. You use it to request permission for your app to access and utilize a native device capability. You can manage device permissions in Teams settings. <br>**See also**: [App permissions](#a) |
| [Dev environment](../toolkit/TeamsFx-multi-env.md#create-a-new-environment) | A type of development environment that Teams Toolkit creates by default. It represents remote or cloud environment configurations. A project can have multiple remote environments. You can add more dev environments to your project using Teams Toolkit. <br>**See also** [Environment](#e); [Local environment](#l) |
| [DevTools](../tabs/how-to/developer-tools.md) | Browser's DevTools are used to view console logs, view or modify runtime network requests, add breakpoints to code (JavaScript) and perform interactive debugging for a Teams app. The feature is only available for desktop and Android clients after the Developer Preview has been enabled. |
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
| [First-run Experience](../concepts/design/design-teams-app-ui-templates.md)|A First-run Experience (FRE) is a user's introduction to your product. The FRE helps users to get started with the functions, features, and benefits of the product and influences users to come back and continue using your product.|
| [Fully qualified domain name (FQDN)](../tabs/how-to/authentication/tab-sso-register-aad.md) | A fully qualified domain name (FQDN) represents a domain name of a host or IP address(es). |

## G

| Term | Definition |
| --- | --- |
|[Government community cloud (GCC)](../concepts/app-fundamentals-overview.md#government-community-cloud)| GCC environment provides compliance with federal requirements for cloud services. It includes FedRAMP High, Defense Federal Acquisition Regulations Supplement (DFARS), and requirements for criminal justice and federal tax information systems (CJI and FTI data types).|
|[Government community cloud (GCC) High](../concepts/app-fundamentals-overview.md#government-community-cloud)|GCC high environments deliver compliance with Department of Defense (DoD) Security Requirements Guidelines, Defense Federal Acquisition Regulations Supplement (DFARS), and International Traffic in Arms Regulations (ITAR).<br>**See also**: [Department of Defense (DoD)](#d)|
| [Graph API](../graph-api/proactive-bots-and-messages/graph-proactive-bots-and-messages.md) | A RESTful web API for Microsoft Graph that enables you to access Microsoft Cloud service resources. <br>**See also**: [Microsoft Graph Explorer](#m) |
| [Group chat](../resources/bot-v3/bot-conversations/bots-conversations.md) | A chat feature where a user is able to chat with a bot in a group setting by using @mention to invoke the bot. <br>**See also**: [One-on-one chat](#o); [Chat bot](#c) |
| [GUID](../tabs/how-to/authentication/tab-sso-register-aad.md) | The GUID, also knows as the application ID or client ID, is a value the Microsoft identity platform assigns to your app when you register it in Azure AD. The GUID value uniquely identifies the app and its configuration within the identity platform. <br> **See also**: [Application ID](#a) |

## I

| Term | Definition |
| --- | --- |
| [Identity provider](../concepts/authentication/authentication.md) | An entity that stores and provides credentials to the user. It also allows users to register themselves. <br>**See also**: [Authentication](#a) |
| [Identity token](../tabs/how-to/authentication/tab-sso-overview.md) | An identity token is used for authenticating app users. It's used by an application to verify if the app user is as per the declared identity. <br> **See also**: [Access token](#a) <br> For more information, see [ID tokens](/azure/active-directory/develop/id-tokens).
| [Incoming Webhook](../webhooks-and-connectors/how-to/add-incoming-webhook.md) | It lets an external app share content in Teams channels. These webhooks are used as tracking and notifying tools. <br>**See also**: [Webhook](#w); [Outgoing Webhook](#o) |
| [In-meeting app experience](../apps-in-teams-meetings/teams-apps-in-meetings.md) | A stage of Teams meeting lifecycle. With the in-meeting app experience, you can engage participants during the meeting by using apps and the in-meeting dialog box. <br>**See also**: [Meeting lifecycle](#m) |

## L

| Term | Definition |
| --- | --- |
| [Link unfurling](../messaging-extensions/how-to/link-unfurling.md) | A feature used with message extension and meeting to unfold links pasted into a compose message area. The links expand to show additional information about the link in Adaptive Cards or in the meeting stage view. |
| [LOB apps](../tabs/how-to/authentication/tab-sso-register-aad.md) | Line of business (LOB) applications are internal or specific within an organization or business. It's custom to the organization that created it. Your organization can make LOB applications available through Microsoft store. <br> **See also**: [Store validation guidelines](#s); [Teams store](#t); [Personal app](#p); [Shared app](#s); [Customer-owned app](#c) |
| [Local environment](../toolkit/TeamsFx-multi-env.md#create-a-new-environment) | A default development environment created by Teams Toolkit.  <br>**See also**: [Environment](#e); [Dev environment](#d) |
| [Local workbench](../sbs-gs-spfx.yml) | The default option to run and debug a Teams app in Visual Studio Code that is created using SPFx. <br>**See also**: [Workbench](#w); [Teams workbench](#t) |
| [Location capability](../concepts/device-capabilities/location-capability.md) | A device capability that you can integrate with your app to know the geographical location of the app user for an enhanced collaborative experience. This feature is currently available only for Teams mobile clients only. <br>**See also**: [Capability](#c); [Media capability](#m); [Device Capability](#d); [Teams Mobile](#t) |
| [Low code apps](../samples/teams-low-code-solutions.md) | A custom Teams app built from scratch using Microsoft Power Platform that requires little or no coding, and can be developed and deployed quickly. |

## M

| Term | Definition |
| --- | --- |
| [Media capability](../concepts/device-capabilities/media-capabilities.md) | Native device capabilities, such as, camera and microphone, that you can integrate with your Teams app. <br>**See also**: [Capability](#c); [Device capability](#d) |
| [Meeting bot](../bots/calls-and-meetings/calls-meetings-bots-overview.md) | Bots that interact with Teams calls and meetings using real-time voice, video, and screen sharing. <br>**See also**: [Call bot](#c); [Chat bot](#c) |
| [Meeting lifecycle](../apps-in-teams-meetings/teams-apps-in-meetings.md) | It spans from pre-meeting, in-meeting, and post-meeting app experience. You can integrate tabs, bots, and message extensions in each stage of the meeting lifecycle. <br>**See also**: [In-meeting experience](#i) |
| [Meeting stage](../sbs-meetings-stage-view.yml) | A feature of meeting extension app. It's a shared space accessible to all participants during the meeting. It helps participants interact and collaborate with app content in real time. <br>**See also**: [Stage view](#s) |
| [Messaging endpoint](../bots/how-to/authentication/bot-sso-register-aad.md) | It's the endpoint where messages are sent to your bot. <br> **See also**: [Endpoint address](#e); [Bot handle](#b); [OAuth connection](#o); [SSO](#s) |
| [Message extension](../messaging-extensions/what-are-messaging-extensions.md) | Message extensions are shortcuts for inserting app content or acting on a message. You can use a message extension without navigating away from the conversation. <br>**See also**: [Search commands](#s); [Action commands](#a) |
| [Meeting extension](../apps-in-teams-meetings/design/designing-apps-in-meetings.md) | An app designed to be used during the meeting lifecycle to make it more productive, such as whiteboard, dashboard, and more. |
| [Microsoft 365 account](../toolkit/accounts.md#microsoft-365-developer-account-types) | Microsoft 365 account includes 25 user licenses, including the administrator, for development purposes only. |
| Microsoft 365 client ID | See [Client ID](#c) |
| [Microsoft 365 channel](../m365-apps/extend-m365-teams-message-extension.md#add-microsoft-365-extensions-channel-for-your-bot) | A feature of Teams message extension app that lets the users interact with it from Microsoft 365. |
| [Microsoft 365 developer program](../toolkit/tools-prerequisites.md)| The Microsoft 365 Developer Program helps you build apps that extend Microsoft 365. |
| Microsoft App Password | A secret string that the application uses to prove its identity when requesting a token. Also, it can be referred to as application password. <br> **See also**: [Client secret](#c) |
| [Microsoft Graph Explorer](../graph-api/proactive-bots-and-messages/graph-proactive-bots-and-messages.md) | The gateway to data and intelligence in Microsoft 365. It provides a unified programmability model that you can use to access data in Microsoft 365, Windows 10, and Enterprise Mobility + Security. |
| [Microsoft Teams](../overview.md) | Microsoft Teams is a group collaboration software that can be used to help teams work together remotely. |
| [Microsoft Teams Platform](../concepts/app-fundamentals-overview.md) | The Microsoft Teams developer platform makes it easy for developers to integrate their own apps and services with Teams. |
| [Microsoft Teams UI Library](../concepts/design/design-teams-app-ui-templates.md#microsoft-teams-ui-library) | Microsoft Teams UI Library helps you view and test individual Teams UI templates and related components in your browser. |
| [Microsoft Teams UI Toolkit](../concepts/design/design-teams-app-ui-templates.md#microsoft-teams-ui-library) | Microsoft Teams UI Kit includes components and patterns that are designed specifically for building Teams apps. |
| Microsoft store | It's a digital distribution platform operated by Microsoft. it's also known as Windows store. <br> [Teams store](#t) |
| [Multi-tenant app](../tabs/how-to/authentication/tab-sso-register-aad.md) | A class of applications that enables sign-in and consent by users provisioned in any Azure AD tenant, including tenants other than the one where the client app is registered. <br> **See also**: [Single-tenant apps](#s) |

## O

| Term | Definition |
| --- | --- |
| [OAuth card](../bots/how-to/authentication/bot-sso-code.md) | A card used by an app to represent a request to perform a sign-in via OAuth. <br> [SSO](#s); [TokenExchangeResource property](#t) |
| [OAuth connection](../bots/how-to/authentication/bot-sso-register-aad.md) | It's configured as a part of bot resource configuration for SSO authentication after its registered on Azure AD. It contains details about the identity provider, client secret, and so on. <br> **See also**: [SSO](#s); [Connector name](#c); [Identity provider](#i); [Client secret](#c); [Azure Active Directory](#a) |
| [Object ID](../bots/how-to/authentication/bot-sso-register-aad.md) | The unique identifier created by Azure AD portal when you register or update your app. It identifies the application object, which defines the application's identity configuration globally (across all tenants where it has access). <br> **See also**: [Application ID](#a); [Tenant ID](#t); [SSO](#s) |
| [Connector for Microsoft 365 Groups](../webhooks-and-connectors/how-to/connectors-creating.md) | It lets you create a custom configuration page for your Incoming Webhook and package them as part of a Teams app. You can send messages primarily using connector cards for Microsoft 365 Groups and have the ability to add a limited set of card actions to them. |
| [Outgoing Webhook](../webhooks-and-connectors/how-to/add-outgoing-webhook.md) | It acts as a bot and search for messages in channels using @mention. It sends notifications to external web services and responds with rich messages, which include cards and images. <br>**See also**: [Webhook](#w); [Incoming Webhook](#i) |
| [One-on-one chat](../resources/bot-v3/bot-conversations/bots-conv-personal.md) | A type of chat between a Teams personal bot app and a single user. <br>**See also**: [Group chat](#g); [Chat bot](#c) |

## P

| Term | Definition |
| --- | --- |
| [People Picker](../task-modules-and-cards/cards/people-picker.md) | A native control in Teams platform to search and select people, which can be integrated in web apps, Adaptive Cards, and more. |
| [Permission](../tabs/how-to/authentication/tab-sso-register-aad.md) | While authentication and providing access token for app user, a client application gains access to a resource server by declaring permission requests. Two types are available, Delegated permissions and Application permissions. <br> **See also**: [Scope](#s); [SSO](#s); [Authentication flow](#a) |
| [Personal app](../concepts/design/personal-apps.md) | A personal app is a Teams application with a personal scope. It focuses on interactions with a single user. It can be a conversational bot to engage in one-to-one conversations with a user or a personal tab providing an embedded web experience, or both. <br>**See also**: [Shared app](#s); [Static app](#s) |
| [Power Virtual Agents](../bots/how-to/add-power-virtual-agents-bot-to-teams.md) | A no-code, guided graphical interface solution that empowers every member of your team to create rich, conversational chat bots that easily integrate with the Teams platform. |
| [Proactive messages](../bots/how-to/conversations/send-proactive-messages.md) | A message sent by a bot that isn't in response to a request from a user, such as welcome messages, notifications, scheduled messages. |
| [Provision](../toolkit/provision.md) | A process that creates resources in Azure and Microsoft 365 for your app, but no code (HTML, CSS, JavaScript, etc.) is copied to the resources. It's a prerequisite to deployment. <br>**See also**: [Deploy](#d) |

## R

| Term | Definition |
| --- | --- |
| [Rate-limiting](../bots/how-to/rate-limit.md) | A method to limit messages to a certain maximum frequency to ensure that number of messages are sufficient and don't appear as spam. |
| [Redirect URL](../bots/how-to/authentication/bot-sso-register-aad.md) | A redirect URI is the location where the authorization server sends the user after the app has been successfully authorized and granted an authorization code or access token. It's also called or reply URL. |
| [Role-based views](../task-modules-and-cards/cards/universal-actions-for-adaptive-cards/user-specific-views.md) | A feature of tabs where the tab experience may be different for users depending on their permission level. |
| [RSC permission](../graph-api/rsc/resource-specific-consent.md) | Resource-specific consent (RSC) permission feature is needed by team owners to let a bot app receive messages across channels in a team without being @mentioned. |

## S

| Term | Definition |
| --- | --- |
| [Scope](../tabs/how-to/authentication/tab-sso-register-aad.md) | Scopes are used to implement scope-based access control, for a client application that has been given delegated access to the resource by its owner. They're resource-defined strings (for example "Mail.Read", "Directory.ReadWrite.All"); managed in the Azure portal. <br> **See also**: [SSO](#s); [Authentication flow](#a); [Delegated permission](#d); [Permission](#p) |
| [Search commands](../messaging-extensions/how-to/search-commands/define-search-command.md) | A type of message extension app that lets users search external systems and include the search result into a message using a card. <br>**See also**: [Message extensions](#m); [Action commands](#a) |
| [Sequential workflow](../task-modules-and-cards/cards/universal-actions-for-adaptive-cards/sequential-workflows.md) | A workflow that lets a bot carry out a conversation with a user based on the user response. |
| [Shared app](../concepts/extensibility-points.md#shared-app-experiences) | An app that exists in a team, channel, or chat where users can collaborate and interact. <br>**See also:** [Personal app](#p) |
| [SharePoint site collection](../sbs-gs-spfx.yml) | A collection site for SharePoint apps. You need to have an administrator account for this site before you can deploy your SPFx-based app on the SharePoint site. <br>**See also**: [SPFx](#s) |
| [Sideloading](../toolkit/publish.md#publish-to-individual-scope-or-sideload-permission) | A process where a Teams app is loaded to the Teams client to test it in the Teams environment before distributing it. |
| [SidePanel](../sbs-meetings-sidepanel.yml) | A feature of Teams meeting app that enables you to customize experiences in a meeting that allow organizers and presenters to have different set of views and actions. |
| [Single-tenant app](../tabs/how-to/authentication/tab-sso-register-aad.md) | Single-tenant apps are only available in the tenant they were registered in, also known as their home tenant. <br> **See also**: [Multi-tenant apps](#m) |
| [SPFx](../sbs-gs-spfx.yml) | SharePoint Framework (SPFx) is a development model to build client-side solutions for Microsoft Teams and SharePoint. |
| [SSO](../concepts/authentication/authentication.md) | Acronym for Single sign-on, an authentication method in which a user needs to sign in to an independent service of a software platform (such as Microsoft 365) only once. The user is then able to access all services without having to go through authentication again. <br>**See also**: [Authentication](#a); [Scope](#s) |
| [Static app](../concepts/design/personal-apps.md) | See [Personal app](#p) |
| [Stage view](../sbs-meetings-stage-view.yml) | A user interface component that lets you render the content that is opened in full screen in Teams and pinned as a tab. It's invoked to surface web content within Teams. It *isn't* the same as meeting stage. <br>**See also**: [Meeting stage](#m) |
| [Standalone app](../samples/integrating-web-apps.md) | A single-page or large, and complex app. The user can use some aspects of it in Teams. <br>**See also**: [Collaboration aap](#c) |
| Standalone bot | A type of bot app. It's a single bot app or not part of a larger application. <br> **See also**: [Chat bot](#c); [Conversational bot](#c) |
| [Static search](../task-modules-and-cards/cards/dynamic-search.md) | A method of typeahead search that lets users search from pre-specified values in the Adaptive Cards payload. <br>**See also**: [Dynamic search](#d) |
| [Store validation guidelines](../concepts/deploy-and-publish/appsource/prepare/teams-store-validation-guidelines.md) | A set of Teams-specific guidelines for validating an app before it can be submitted to Teams store. <br>**See also**: [Teams store](#t) |
| [Subdomain ID](../tabs/how-to/authentication/tab-sso-register-aad.md) | It's the application ID URI that you registered when configuring scope for your app in Azure AD. <br> **See also**: [SSO](#s); [Application ID URI](#a); [Application ID](#a) |

## T

| Term | Definition |
| --- | --- |
| [Tab](../tabs/what-are-tabs.md) | Tabs are Teams-aware webpages embedded in Microsoft Teams that point to domains declared in manifest. You can add it inside a team, group chat, or personal app. |
| [Tab chat](../tabs/how-to/conversational-tabs.md) | A type of tab that lets a user have a focused conversation experience in dynamic tabs. |
| [Task modules](../task-modules-and-cards/what-are-task-modules.md) | A feature of Teams app to create modal pop-up for completing tasks, displaying videos, or dashboard. <br> **See also**: [Adaptive Card](#a) |
| [Thread discussion](../tabs/design/tabs.md#thread-discussion) | A conversation posted on a channel or chat between users. <br>**See also** [Conversation](#c); [Channel](#c) |
| [Teams](../overview.md) | Microsoft Teams is the ultimate message app for your organization. It's a workspace for real-time collaboration and communication, meetings, file and app sharing. |
| [Teams identity](../tabs/how-to/authentication/tab-sso-overview.md) | The Microsoft account or Microsoft 365 account of an app user that is used to log in to Teams client, web, or mobile app. |
| [Teams Toolkit](../toolkit/teams-toolkit-fundamentals.md) | The Microsoft Teams Toolkit enables you to create custom Teams apps directly within the Visual Studio Code environment.  |
| [TeamsFx](../toolkit/teamsfx-cli.md) | TeamsFx is a text-based command line interface that accelerates Teams application development. It's also called TeamsFx CLI.|
| [TeamsFx SDK](../toolkit/teamsfx-sdk.md) | TeamsFx SDK is pre-configured in scaffolded project using TeamsFx toolkit or CLI. |
| [TeamsJS library](../tabs/how-to/using-teams-client-library.md) | The TeamsJS library enables you to create hosted experiences in Teams. Starting with TeamsJS v.2.0.0, you can extend Teams apps to run in Outlook and Office. |
| [Teams Mobile](../concepts/design/plan-responsive-tabs-for-teams-mobile.md) | Microsoft Teams available as a mobile app. |
| [Teams store](../concepts/deploy-and-publish/appsource/publish.md) | A store landing page that brings apps to users in a single place. The apps are categorized by usage, industry, and more. An app must follow Store validation guidelines and obtain an approval before it's available to users via the Teams store.  <br>**See also**: [Store validation guidelines](#s); [Microsoft store](#m) |
| [Teams workbench](../sbs-gs-spfx.yml) | A workbench in Visual Studio Code used at build for Teams apps created using SPFx and Teams Toolkit. <br>**See also**: [Workbench](#w); [Local workbench](#l) |
| [Tenant ID](../bots/how-to/authentication/bot-sso-register-aad.md) | The unique identifier of the tenant where your app is registered in Azure AD portal. Your app may be classified as a single-tenant or a multi-tenant app. <br> **See also**: [Single-tenant app](#s); [Multi-tenant apps](#m) |
| [Token exchange URL](../bots/how-to/authentication/bot-sso-register-aad.md) | It's the application ID URI that is used for exchanging token. It's configured while configuring the OAuth connection for bot resource. <br> **See also**: [Application ID URI](#u); [SSO](#s) |
| [TokenExchangeResource property](../bots/how-to/authentication/bot-sso-code.md) | It's a property of `OAuthCard` class that gets or sets the resource to try to perform token exchange with. Teams refreshes the token if the `TokenExchangeResource` property is populated on the card. <br> **See also**: [OAuth card](#o); [SSO](#s) <br> For more information, see [Microsoft Bot Schema 4.0](/dotnet/api/microsoft.bot.schema.oauthcard) |
| [TeamsSSOTokenExchangeMiddleware](../bots/how-to/authentication/bot-sso-code.md) | This middleware exchanges the token if the activity name is `signin` or `tokenExchange`. It also ensures only one exchange request is processed. <br> **See also**: [SSO](#s) |

## U

| Term | Definition |
| --- | --- |
| [UI components](../concepts/design/design-teams-app-basic-ui-components.md) | For Teams app development, you can use Fluent UI components to build your app from scratch. |
| [UI templates](../concepts/design/design-teams-app-ui-templates.md) | For Teams app development, you can use Teams UI templates to design your apps quickly. |
| [Universal Actions for Adaptive Cards](../task-modules-and-cards/cards/universal-actions-for-adaptive-cards/overview.md) | A way to implement Adaptive Cards across platforms and applications. It uses a bot as a common backend for handling actions. |
| [User consent](../tabs/how-to/authentication/tab-sso-register-aad.md) | A user can authorize an app to access some data at the protected resource, while acting as that user. <br> **See also**: [Consent dialog](#c); [Administrator consent](#a); [User consent](#u); [Delegated permission](#d); [Configure your app in Azure AD](../bots/how-to/authentication/bot-sso-register-aad.md). |

## V

| Term | Definition |
| --- | --- |
| [Virtual Assistant](../samples/virtual-assistant.md) | A Microsoft open-source template that enables you to create a robust conversational solution. |

## W

| Term | Definition |
| --- | --- |
| [Website url](../tabs/design/tabs-mobile.md) | A property in the app manifest file (`websiteUrl`) that links the app to the website of the organization or landing page of the relevant product. It's a mandatory configuration for Teams mobile client. <br>**See also**: [App manifest](#a); [Teams Mobile](#t) |
| [Web app](../samples/integrate-web-apps-overview.md) | An app that runs on a web server. It can be integrated with Microsoft Teams Platform. |
| [Webhook](../webhooks-and-connectors/what-are-webhooks-and-connectors.md) | It's a feature of a Teams app used to integrate it with external apps. <br>**See also**: [Incoming Webhook](#i) ; [Outgoing Webhook](#o); [Connector](#c) |
| [Web part](../sbs-gs-spfx.yml) | A UI component used to build a page or a site in a Teams app created using Visual Studio Code and SharePoint Framework. <br>**See also**: [SPFx](#s) |
| [Workbench](../sbs-gs-spfx.yml) | Overall Visual Studio Code UI that encompasses UI components, such as title bar, panel, and more. <br>**See also**: [Local workbench](#l); [Teams workbench](#t) |

## Y

| Term | Definition |
| --- | --- |
| [YoTeams](../get-started/get-started-overview.md) | A development toolkit for building Microsoft Teams applications based on TypeScript and node.js. |
