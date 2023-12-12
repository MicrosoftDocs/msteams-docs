---
title: Communication flow for Teams bot applications
author: surbhigupta
description: In this article, learn about the communication flow and how traffic routed between Teams and an Azure bot app 
ms.topic: overview
ms.localizationpriority: medium
---

# Communication flow for Teams bot applications

The key aspect to develop and manage effective bots is to learn about the communication flow for Microsoft Teams bot applications and understand how the traffic is routed between a user in Teams and a bot application that runs in Azure. You can learn how to inspect the traffic and understand the user data flow in transit and at rest for bots in Teams.

The communication flow explained here is applicable to the users who use Microsoft 365 worldwide and Government Community Cloud (GCC), and it does not apply to other cloud endpoints.

## Architecture and data flow

The following diagram illustrates the communication flow between the Teams client and your bot application that runs on Azure:

:::image type="content" source="../assets/images/bots/communication-flow.png" alt-text="The diagram illustrates the communication flow between Teams client and Azure bot application.":::

| # | Components | What's going on |
| --- | --- | --- |
| 1 | **App manifest (previously called Teams app manifest)**| App manifest defines the bot capabilities and contains the application ID registered in Azure AD. You can only send and receive messages to and from your bot if the application is installed directly in Teams or if you belong to a team, group chat, or meeting where the bot is installed with permissions to read the rosters. |
| 2 | **Teams client connection**| The Teams client can run the bot from any location or device (web, desktop, and mobile) only if the bot has access to Microsoft 365 endpoints, as defined in [managing Microsoft 365 endpoints](/microsoft-365/enterprise/managing-office-365-endpoints). No extra IP, port, protocol, or FQDN is required to use bots in Teams. |
| 3 | **Bot messages and calls signaling transit through the Teams service**| <br> Messaging bots: Chat messages are sent to and received from the Teams service, hosted by Microsoft (3a). </br> <br> Calling bots: The Teams service sends the notification for incoming calls and provides the endpoints for the media streams, call signaling, and control plane (3b). </br>|
| 4 | **Register Azure bot**| <br> The Azure Bot Service is required to register your bot. You must provide the following details to register your bot:</br> <br> - Bot's name, description, and logo <br> - Supported authentication type (single-tenant, multi-tenant, or user-managed identities) <br> - Associated app ID and app registration in Azure AD <br> - Activated channels and bot endpoints <br> - Other settings such as OAuth provider or public access </br> <br> You must activate the Teams channel with appropriate endpoints set for messaging bots and calling bots in your Azure Bot configuration. Ensure to configure the endpoints for Teams messaging and calling bots separately, as they have different network configuration requirements. </br> <br> Your bot application receives activities from the Teams service directly, not from the Teams client.</br> <br> a. Messaging bots: The Teams service provides a reply to URL in the form `https://smba.trafficmanager.net/{region}`, where region depends on the location of your Microsoft 365 service (for example, EMEA, AMER, IN, APAC). </br> <br> b. Calling bots </br>|
| 5 | **Access to domains**| Your bot needs access to Microsoft services for operations such as validate the JWT token sent in the HTTP Authorization header or facilitate user single sign-on (SSO). We recommend implementing FQDN-based filtering as the list of IP addresses can vary over time. |
| 6 | **Bot permissions on Microsoft Graph API**| If your bot requires additional permissions to perform operations on your Microsoft 365 environment, you need to trigger an authentication flow to get the appropriate access token from Azure AD. We recommend you to implement user-managed identities that simplifies and secure the management of application secrets. Messaging bots generally use delegated permission on-behalf-of the connected user. Calling bots require application permission to have control over the call to hang up, redirect, join participants, and access the audio stream. Your bot needs access to the `graph.microsoft.com` domain to query the Microsoft Graph API. |

## Enhance user experience with bots

Bots allow Teams users to interact with web services through text, interactive cards, and task modules. The Microsoft Bot Framework and Azure Bot Services provide an easy-to-use set of tools for creating and managing these bots.

You can develop bots using various languages such as C#, JavaScript, and Python, and deploy them to Azure. The web app is the key component of a bot that contains the core logic and interface that users communicate with. The bot must expose a publicly accessible HTTPS endpoint to work.

All traffic that goes to a bot, and responses from the bot, must route through a corporate firewall.

## Examples

The examples explained here are messaging and calling bots in Teams.

1. **Teams messaging bots (conversational bots)**: Messaging bots implement chat-based interaction between a user in Teams and your bot. This is a two-way communication channel where user sends a chat message to the bot and gets an answer. You can configure this channel for notification only. where bot sends message but user can't query or answer. For details about how to create a conversation bot, see [create Teams conversation bot](../sbs-teams-conversation-bot.yml).
1. **Teams calling bots**: Calling bots implement voice-based interaction between a user in Teams and your bot. The bot can answer an incoming call, join a call, and manage its lifecycle. Calling bots are also used for compliance recording in regulated industries. For instance, a bot could be used to record customer service calls for quality assurance purposes. For more information about how to create a calling bot, see [calls and online meetings bots](calls-and-meetings/calls-meetings-bots-overview.md) and [compliance recording for calls and meetings](/MicrosoftTeams/teams-recording-policy).
    Following examples shows the cases for which the organizations can use bots for mobile and desktop users:

    * Simple queries. Bots can deliver an exact match to a query or a group of related matches to help with disambiguation.
    * Multi-turn interactions. Bots make the interactions easier for people to complete task flow by helping to anticipate possible next steps.
    * Reaching out to users. Bots can send a message (notification) if there's any change in a document, or a work item is closed.
    * Bots can be integrated in multiple ways into Teams, as a personal application, in a channel or group chat, as a message extension (to easily search and share data), or in a meeting.
    * Calling bots are a specific use case enabled for Teams where the bot can respond to incoming calls, manage participants, process audio and video media streams, and more.

## Bot apps communication flow FAQs

<details>
<summary>Does user data transit through the Azure Bot Service with Microsoft Teams channel? </summary>

No. User data doesn't transits through the Azure Bot Service for both messaging and calling endpoints. For first-party channels such as Teams, Outlook, Skype, Search (Preview), and Direct Line Speech, user data goes directly to the Microsoft service endpoint and doesn't transit through the Azure Bot Service.
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

No. Teams is SaaS (software as a service) platform and only provides public endpoints that Teams clients can join. Disabling public access is supported only in combination with [Direct Line App Service extension](/azure/bot-service/dl-network-isolation-concept) and isn't supported for Teams.
<br>
&nbsp;
</details>
<details>
<summary>Can I activate Azure AD tenant restrictions with the Azure Bot Service?</summary>

Yes. With tenant restrictions, organizations can specify the list of tenants that users on their network can access. Azure AD grants access only to the permitted tenants and all other tenants are blocked, including guest members. For more information, see [restrict access to a tenant](/azure/active-directory/manage-apps/tenant-restrictions).

For your bot application, and bot users, to be able to authenticate on the Azure Bot Service, your proxy server needs to add the following tenants to the allowlist:

* botframework.com if the Azure Bot Service is configured for multi-tenant.
* Your own company tenant (for example, contoso.com) if Azure Bot Service is configured for single-tenant.
<br>

&nbsp;
</details>
<details>
<summary>Can we host a bot for Teams outside of Azure? </summary>

It depends on the scenario. Messaging bots can be hosted on any infrastructure if all required FQDN, IP addresses and ports (in and out) are on the allowlist.However, calling bots can only be hosted on Microsoft Azure and specific services. For details, see [requirements and considerations for application-hosted media bots](calls-and-meetings/requirements-considerations-application-hosted-media-bots.md).
<br>
&nbsp;
</details>

## Next steps

> [!div class="nextstepaction"]
> [Build bots for Teams](what-are-bots.md)

> [!div class="nextstepaction"]
> [Register a calling bot for Microsoft Teams](https://microsoftgraph.github.io/microsoft-graph-comms-samples/docs/articles/calls/register-calling-bot.html)

> [!div class="nextstepaction"]
> [Working with the cloud communications API in Microsoft Graph](/graph/api/resources/communications-api-overview)

## See also

[Azure Architecture Center](/azure/architecture/)
