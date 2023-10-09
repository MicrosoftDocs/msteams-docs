---
title: Communication flow for Teams bot applications
author: surbhigupta
description: In this article, learn about the communication flow and how traffic routed between Teams and an Azure bot app 
ms.topic: overview
ms.localizationpriority: medium
---

# Communication flow for Teams bot apps

Quickly learn about the communication flow and understand how the traffic is routed between a user in Microsoft Teams and a bot application running in Azure. This information helps you learn how to inspect the traffic and understand the user data flow in transit and at rest for bots in Teams.

The use cases explained here are messaging bots and calling bots for Microsoft Teams. This article answers frequently asked questions and offers best practices to integrate and secure the network connectivity for your Teams bots.

> [!NOTE]
> This article is applicable to customers using Microsoft 365 worldwide or United States Government Community Cloud (GCC) and not applicable to other cloud endpoints.

## Architecture and data flow

The following diagram illustrates the communication flow between the Teams client and your bot application that runs on Azure.

:::image type="content" source="../assets/images/bots/communication-flow.png" alt-text="The diagram illustrates the communication flow between Teams client and Azure bot application.":::

The data flow shown in the diagram is explained as follows:

1. App manifest

The app manifest defines the bot capabilities and includes the application ID registered in Azure AD. Teams users can send and receive messages to and from your bot either if the application is installed directly (personal scope) in Teams or if the user belongs to a team, group chat, or a meeting where the bot is installed with permissions to read the rosters.

2. Teams client connection

The Teams client can run the bot from any location or device (web, desktop, and mobile) only if the bot has access to Microsoft Office 365 endpoints, as defined in [managing Office 365 endpoints](/microsoft-365/enterprise/managing-office-365-endpoints). Extra IP, port, protocol, or FQDN aren't required to use bots in Teams.

3. Bot messages and calls signaling transit through the Teams service

For messaging bots, chat messages are sent to and received from the Teams service, hosted by Microsoft.
For calling bots, the Teams service sends the notification for incoming calls and provides the endpoints for the media streams, call signaling, and control planes.

4. Azure bot registration

The Azure Bot Service is required for the registration of your bot, including the following details:

* The bot's name, description, and logo
* The supported authentication type (single-tenant, multi-tenant, or user-managed identities)
* The associated app ID and app registration in Azure AD
* Activated channels and bot endpoints
* Other settings like OAuth provider or public access

You must activate the Teams channel with appropriate endpoints set for messaging bots and calling bots in your Azure Bot configuration. Ensure to configure the endpoints for Teams messaging and calling bots separately, as they have different network configuration requirements.

Your bot application receives activities from the Teams service directly, not from the Teams client. For messaging bots, the Teams service provides a reply to URL in the form `https://smba.trafficmanager.net/{region}`, where region depends on the location of your Microsoft 365 service (for example, EMEA, AMER, IN, APAC).

5. Access to domains

Your bot needs access to Microsoft services for operations like validating the JWT token sent in the HTTP Authorization header or facilitate user single sign-on (SSO). We recommend you to implement the FQDN-based filtering as the list of IP addresses can vary over time.

6. Bot permissions on Microsoft Graph API

If your bot requires additional permissions to perform operations on your Microsoft 365 environment, you need to trigger an authentication flow to get the appropriate access token from Azure AD. A best practice is to implement user-managed identities which simplifies and secure the management of application secrets. Messaging bots generally use delegated permission (on-behalf-of the connected user), whereas calling bots require application permission to have control over the call (hang up, redirect, join participants, and access the audio stream).

Your bot needs access to the graph.microsoft.com domain to query the Microsoft Graph API (required for calling bots; optional for messaging bots, and depending on the use case).

## Scenario details

Bots allow Teams users to interact with web services through text, interactive cards, and task modules. The Microsoft Bot Framework and Azure Bot Services give you an easy-to-use set of tools for creating and managing these bots.

You can use various languages, such as C#, JavaScript, and Python to develop the bots. After you develop your bots, you can deploy them to Azure. The key component of a bot is the web app, which contains the core logic and interface that users communicate with. One of the key requirements for the bot to work is that it must expose a publicly accessible HTTPS endpoint.

InfoSec policy commonly requires that all incoming traffic to web apps go through a corporate firewall. All traffic that goes to a bot, and responses from the bot, must route through a corporate firewall, as with any other web app.

## Potential use cases

### Teams messaging bots (conversational bots)

Messaging bots are used to implement chat-based interaction between a user in Teams and your bot. This is a two-way communication channel (user sends a chat message to the bot and gets an answer) but you can configure it for notification only (bot sends message but user can't query or answer). For details about how to create a conversation bot, see [create Teams conversation bot](../sbs-teams-conversation-bot.yml).

### Teams calling bots

Calling bots implements voice-based interaction between a user in Teams and your bot. The bot is capable to answer an incoming call, join a call, and manage its lifecycle. Calling bots are also used for compliance recording in regulated industries. For details about how to create a calling bot, see [calls and online meetings bots](calls-and-meetings/calls-meetings-bots-overview.md) and [compliance recording for calls and meetings](/MicrosoftTeams/teams-recording-policy).

Organizations can use bots for mobile and desktop users. Some examples include:

* Simple queries. Bots can deliver an exact match to a query or a group of related matches to help with disambiguation.
* Multi-turn interactions. Bots make the interactions easier for people to complete task flow by helping to anticipate possible next steps.
* Reaching out to users. Bots can send a message (notification) if there is any change in a document, or a work item is closed.
* Bots can be integrated in multiple ways into Microsoft Teams, as a personal application, in a channel or group chat, as a message extension (to easily search and share data), or in a meeting.
* Calling bots are a specific use case enabled for Teams where the bot can respond to incoming calls, manage participants, process audio and video media streams, and more.

## Bot apps communication flow FAQs

<details>
<summary>Does user data (such as chat messages) transit through the Azure Bot Service with Microsoft Teams channel? </summary>

No. No user data transits through the Azure Bot Service for the Teams channel (both for the messaging and calling endpoints). For first-party channels such as Teams, Outlook, Skype, Search (Preview), and Direct Line Speech, user data goes directly to the Microsoft service endpoint and doesn't transit through the Azure Bot Service.
<br>
&nbsp;
</details>
<details>
<summary>How does user data transit from the Teams client to the bot application?</summary>

For first-party channels such as Teams, user data transits through the Microsoft 365 location that you configured during the provisioning of your services. For more information, see [where your Microsoft 365 customer data is stored](/microsoft-365/enterprise/o365-data-locations).
<br>
&nbsp;
</details>
<details>
<summary>Can we disable public access and use private access for bots in Teams?</summary>

No. Teams is SaaS (software as a service) and only provides public endpoints that Teams clients need to join. Disabling public access is supported only in combination with [Direct Line App Service extension](/azure/bot-service/dl-network-isolation-concept) and isn't supported for Teams.
<br>
&nbsp;
</details>
<details>
<summary>Can I activate Azure AD tenant restrictions with the Azure Bot Service?</summary>

Yes. With tenant restrictions, organizations can specify the list of tenants that users on their network can access. Azure AD only grants access to permitted tenants and all other tenants are blocked, including guest members. For more information, see [restrict access to a tenant](/azure/active-directory/manage-apps/tenant-restrictions).

For your bot application, and bot users, to be able to authenticate on the Azure Bot Service, your proxy server needs to add the following tenants to the allowlist:

* botframework.com if the Azure Bot Service is configured for multi-tenant.
* Your own company tenant (for example, contoso.com) if Azure Bot Service is configured for single-tenant.
<br>

&nbsp;

</details>
<details>
<summary>Can we host a bot for Teams outside of Azure? </summary>

It depends on the scenario, as follows:

* Messaging bots can be hosted on any infrastructure if all required FQDN, IP addresses and ports (in and out) are on the allowlist.
* Calling bots can only be hosted on Microsoft Azure and specific services. For details, see [requirements and considerations for application-hosted media bots](calls-and-meetings/requirements-considerations-application-hosted-media-bots.md).
<br>

&nbsp;

</details>

# Introduction to Communication Flow for Microsoft Teams Bot Applications

Understanding the communication flow for Microsoft Teams bot applications is a key aspect of developing and managing effective bots. This guide provides a detailed look into how traffic is routed between a user in Microsoft Teams and a bot application running in Azure. This knowledge is essential for developers and businesses, as it enables effective traffic inspection and understanding of user data flow, both in transit and at rest, for bots in Teams. This guide focuses on the use of messaging and calling bots in Microsoft Teams. It answers common questions and offers best practices for integrating and securing network connectivity for your Teams bots. The information is applicable to customers using Microsoft 365 worldwide or United States Government Community Cloud (GCC). It also explains the architecture and data flow between the Teams client and your bot application running on Azure, using an illustrative diagram (screenshot). This will help you understand the various components involved in the communication flow, such as Teams app manifest, Teams client connection, Azure bot registration, and bot permissions on Microsoft Graph API. Whether you're developing bots for simple queries, interactions, notifications, or voice-based interactions, this guide will provide you with the necessary insights and information. Let's dive in and explore the world of Microsoft Teams bot applications.

## Communication Flow for Microsoft Teams Bot Applications

Understanding the communication flow and traffic routing between a user in Microsoft Teams and a bot application running in Azure can be complex. This guide simplifies this process by providing an in-depth understanding of the communication flow. It is designed to help you inspect the traffic and understand the user data flow in transit and at rest for bots in Teams. This guide covers two use cases involving messaging bots and calling bots for Microsoft Teams. It also provides answers to frequently asked questions and best practices for integrating and securing the network connectivity for your Teams bots.

## Architecture and Data Flow

The communication flow between the Teams client and your bot application running on Azure is illustrated in the diagram below. ![diagram](diagram) Here's a detailed explanation of the data flow:

1. **Teams App Manifest**: The Teams app manifest defines the bot's capabilities. It also contains the application ID that is registered in Azure AD. You can only send and receive messages to and from your bot if the application is installed directly in Teams or if you belong to a team, group chat, or meeting where the bot is also installed with permissions to read the rosters.
1. **Teams Client Connection**: The Teams client can run from any location or device (web, desktop, mobile) only if it has access to Microsoft Office 365 endpoints, as defined in [Managing Office 365 endpoints](https://docs.microsoft.com/en-us/office365/enterprise/managing-office-365-endpoints). No extra IP, port, protocol, or FQDN is required to use bots in Teams.
1. **Bot Messages and Calls Signaling Transit via the Teams Service**: For messaging bots, chat messages are sent to and received from the Teams service, hosted by Microsoft. For calling bots, the Teams service sends the notification for incoming calls and provides the endpoints for the media streams, call signaling, and control plane.
1. **Azure Bot Registration**: The Azure Bot Service is required for the registration of your bot, including the bot's name, description, logo, supported authentication type, associated app ID and app registration in Azure AD, activated channels and bot endpoints, and other settings like OAuth provider or public access.
1. **Access to Domains**: Your bot needs access to Microsoft services to validate the JWT token sent in the HTTP Authorization header or facilitate user single sign-on (SSO). We recommend implementing FQDN-based filtering as the list of IP addresses can vary over time.
1. **Bot Permissions on Microsoft Graph API**: If your bot requires additional permissions to perform operations on your Microsoft 365 environment, you need to trigger an authentication flow to get the appropriate access token from Azure AD. Your bot needs access to the `graph.microsoft.com` domain to query the Microsoft Graph API. ## Scenario Details In this section, we will delve into the details of how bots allow Teams users to interact with web services through text, interactive cards, and task modules. The Microsoft Bot Framework and Azure Bot Services provide an easy-to-use set of tools for creating and managing these bots. You can develop bots using various languages such as C#, JavaScript, and Python, and deploy them to Azure. The bot must expose a publicly accessible HTTPS endpoint to work.

## Potential Use Cases

1. **Teams Messaging Bots (Conversational Bots)**: Messaging bots implement chat-based interaction between a user in Teams and your bot. This can be a two-way communication channel or configured for notification only. For example, a bot could be used to provide updates on a project's status or to answer frequently asked questions.
1. **Teams Calling Bots**: Calling bots implement voice-based interaction between a user in Teams and your bot. The bot can answer an incoming call, join a call, and manage its lifecycle. Calling bots are also used for compliance recording in regulated industries. For instance, a bot could be used to record customer service calls for quality assurance purposes.

## Frequently Asked Questions (FAQ)

**Does user data transit via the Azure Bot Service with Microsoft Teams channel?**

No. User data goes directly to the Microsoft service endpoint and does not transit via the Azure Bot Service.

**How does user data transit from the Teams client to the bot application?**

User data transits via the Microsoft 365 location that you configured during the provisioning of your services.

**Can we disable public access and use private access for bots in Teams?**

No. Teams is a SaaS (Software as a Service) platform and only provides public endpoints that Teams clients can join.

**Can I activate Azure AD tenant restrictions with the Azure Bot Service?**

Yes. With tenant restrictions, organizations can specify the list of tenants that users on their network can access.

**Can we host a bot for Teams outside of Azure?**

It depends on the scenario. Messaging bots can be hosted on any infrastructure if all required FQDN, IP addresses and ports are on the allow list. However, calling bots can only be hosted on Microsoft Azure and specific services. For example, a bot that only sends notifications could potentially be hosted outside of Azure, while a bot that handles voice calls would need to be hosted on Azure. For more information, refer to the [Teams Developer Documentation](https://docs.microsoft.com/en-us/microsoftteams/platform/).

## Conclusion Understanding the communication flow for

Microsoft Teams Bot Applications is crucial for developing and managing bots effectively. This guide has provided an in-depth look at the architecture and data flow, potential use cases, and frequently asked questions. By following the best practices outlined in this guide, you can ensure that your bot is secure, efficient, and provides a seamless experience for your users.
