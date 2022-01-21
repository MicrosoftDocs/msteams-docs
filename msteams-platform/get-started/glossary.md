---
title: Microsoft Teams Developer Documentation - Glossary
description: Glossary for Microsoft Teams Developer Documentation
ms.localizationpriority: medium
ms.topic: reference
keywords: Microsoft Teams developer definition
---
# Glossary

Common terms and definitions used in Teams Developer Documentation.
<br>
<br>

:::row:::
    :::column span="":::
        <details>
        <summary>A</summary>

        ## A

        | Term | Definition |
        | --- | --- |
        | [Action command](../messaging-extensions/how-to/action-commands/define-action-command.md) | A type of messaging extension app that uses a popup to collect or display information. <br>**See also**: [Messaging extension](#m); Search commands |
        | [Adaptive Card](../task-modules-and-cards/what-are-cards.md) | An actionable content snippet added to a conversation by a bot or messaging extension. Use text, graphics, and buttons with these cards for rich communication. |
        | [App Catalog](../toolkit/publish.md) | A site that stores the apps for SharePoint and office for an organization's internal use. <br>**See also**: SPFx |
        | [App manifest](../resources/schema/manifest-schema.md) | The Teams app manifest describes how the app integrates into the Microsoft Teams product. Your manifest must conform to the [manifest schema](https://developer.microsoft.com/json-schemas/teams/v1.11/MicrosoftTeams.schema.json.). |
        | [App package](../concepts/build-and-test/apps-package.md) | A Teams app package is a zip file that contains the App manifest file and app icons - color icon and outline icon. |
        | [App permission](../concepts/device-capabilities/browser-device-permissions.md#enable-apps-device-permissions) | An option in a Teams app to enable device permissions. It's available only when the manifest file of the app declares that the app needs device permissions. <br> **See also**: Device permissions |
        | [App scope](../concepts/design/app-structure.md) | The purview within which your app interacts with your users. An app can have Personal scope, Channel scope, or Team scope. A Teams app can exist across scopes. |
        | [App Studio](../concepts/build-and-test/app-studio-overview.md) | An app to start creating or integrating your own Microsoft Teams apps. It has now evolved to Developer Portal. <br> **See also**: Developer Portal |
        | [Azure resource](../toolkit/provision.md) | A service that is available through Azure that your Teams app can use for Azure deployment. It could be storage accounts, web apps, databases, and more. |
        | [Azure Active Directory](../tabs/how-to/authentication/auth-tab-aad.md) | Microsoft’s cloud-based identity and access management service. It helps authenticated users access resources internal and external Azure resources. |
        | [Authentication](../concepts/authentication/authentication.md) | A process to authorize user access for your app's usage. it can be done using Microsoft Graph APIs or web-based authentication. <br> **See also**: Identity providers |
        | [Authentication flow](../concepts/authentication/authentication.md#web-based-authentication-flow) | In Teams, there are two authentication flows to authenticate a user for using an app: web-based authentication and OAuthPrompt flow. |
        |
        </details>
        <br>
        <details>
        <summary>B</summary>
        
        ## B

        | Term | Definition |
        | --- | --- |
        | [Blazor](../get-started/get-started-overview.md) | A free and open-source web framework that enables developers to create web apps using C# and HTML. It's being developed by Microsoft. |
        | [Bicep](../toolkit/provision.md) | A declarative language, which means the elements can appear in any order. Unlike imperative languages, the order of elements doesn't affect how deployment is processed. |
        | [Bot](../bots/what-are-bots.md) | A bot is an app that executes programmed repetitive tasks. <br> **See also**: Conversational bot; Chat bot |
        | [Bot Emulator](../bots/how-to/debug/locally-with-an-ide.md#use-the-bot-emulator) | A desktop application that allows you to test and debug bots, either locally or remotely. |
        | [Bot Framework](../bots/bot-features.md) | A rich SDK used to create bots using C#, Java, Python, and JavaScript. If you have a bot that is based on the Bot Framework, you can modify it to work in Teams. |
        |
        </details>
        <br>
        <details>
        <summary>C</summary>
        
        ## C

        | Term | Definition |
        | --- | --- |
        | [Call bot](../bots/calls-and-meetings/calls-meetings-bots-overview.md) | A bot that participates in audio or video calls and online meetings. <br> **See also**: Chat bot; Meeting bot |
        | [Capability](../toolkit/add-capability.md) | The feature of a Teams app are called as Capability. An app may have one or more core capabilities, such as tab, bot, messaging extensions. <br>**See also**: Device capability; Media capability |
        | [Chat bot](../bots/how-to/conversations/conversation-basics.md) | A bot is also referred to as a chatbot or conversational bot. It's an app that runs simple and repetitive tasks by users such as customer service or support staff. <br> **See also**: Conversational bot. |
        | Channel | A single place for a team to share messages, tools, and files. In Teams, teamwork and communication happen in channels.  |
        | [Client secret](../bots/how-to/authentication/add-authentication.md) | The Client secret/password or a public or private key pair that is Certificate. It is not required for native apps. <br> **See also**: Bot |
        | [Cloud resources](../toolkit/add-resource.md) | A service that is available on cloud through internet that your Teams app can use. It could be storage accounts, web apps, databases, and more. |
        | [Collaboration app](../concepts/extensibility-points.md) | An app with capabilities for a user to work in a collaborative workspace with other users. <br> **See also**: Standalone app |
        | [Connector](../webhooks-and-connectors/what-are-webhooks-and-connectors.md) | It allows users to subscribe to receive notifications and messages from the web services. They expose the HTTPS endpoint for the service to post messages to Teams channels, typically in the form of cards. <br> **See also**: Webhooks |
        | Conversation | A series of messages sent between your Microsoft Teams app (tab or bot) and one or more users. A conversation can have three scopes: channel, personal, and group chat. <br>**See also**: One-on-one chat; Group chat |
        | [Conversational bot](../bots/how-to/conversations/conversation-messages.md) |  It allows a user to interact with your web service using text, interactive cards, and task modules. <br>**See also** Chat bot |
        |
        </details>
        <br>
        <details>
        <summary>D</summary>
        
        ## D

        | Term | Definition |
        | --- | --- |
        | [Deep linking](../concepts/build-and-test/deep-links.md) | In a Teams app, you can create deep links to information and features within Teams or to help the user navigate to content in your app. |
        | [Developer Portal for Teams](../concepts/build-and-test/teams-developer-portal.md) | The primary tool for configuring, distributing, and manag.mding your Microsoft Teams apps. With the Developer Portal, you can collaborate with colleagues on your app, set up runtime environments, and much more. |
        | [Developer Preview](../resources/dev-preview/developer-preview-intro.md) | A public program for developers that provides early access to unreleased features in Microsoft Teams. This allows you to explore and test upcoming features for potential inclusion in your Microsoft Teams app. |
        | Deploy | A process to upload the backend and frontend code for the application. At Deployment, your code for your app is copied to the resources you created during the provision step. <br>**See also**: Provision |
        | [Device capabilities](../concepts/device-capabilities/device-capabilities-overview.md) | Built-in devices, such as camera, microphone, barcode scanner, photo gallery, in a mobile or desktop. You can access the following device capabilities on mobile or desktop through dedicated APIs available in Microsoft Teams JavaScript client SDK. <br>**See also**: Capability; Media capability |
        | [Device permission](../concepts/device-capabilities/browser-device-permissions.md) | If an app needs to utilize a native device capability, it must request permission to access the capability. You can manage device permissions in Teams settings. <br>**See also**: App permissions |
        | Dev environment | A type of development environment that Teams Toolkit creates by default to represent remote or cloud environment configurations. A project can have multiple remote environments. You can add more dev environments to your project using Teams Toolkit. <br>**See also** Environment; Local environment |
        | DevTools | Browser's Devtools are used to view console logs, view or modify runtime network requests, add breakpoints to code (JavaScript) and perform interactive debugging for a Teams app. The feature is only available for desktop and Android clients after the Developer Preview has been enabled. |
        | Dynamic search | A search feature for Adaptive Cards that is useful to search and select data from large data sets. It helps to filter out the choices as the user types. <br>**See also**: Static search |
        |
        </details>
        <br>
        <details>
        <summary>E</summary>
        
        ## E

        | Term | Definition |
        | --- | --- |
        | E5 developer account | E5 developer subscription includes 25 user licenses, including the administrator, for development purposes only for building apps to extend Microsoft 365.  <br>**See also**: Microsoft 365 account |
        | Entry point | An access point, such as team, channel, and chat, for a Teams app where users can discover and use your app. |
        | Environment | A feature in Teams Toolkit that lets you create and use multiple development environments for your app project. There are two dev environments that Teams Toolkit creates by default - local environment and dev environment. <br>**See also**: Local environment; Dev environment |
        |
        </details>
        <br>
        <details>
        <summary>G</summary>
        
        ## G

        | Term | Definition |
        | --- | --- |
        | Group chat | A chat feature where a user is able to chat with a bot in a group setting by using @mention to invoke the bot. <br>**See also**: One-on-one chat; Chat bot |
        |
        </details>
        <br>
        <details>
        <summary>I</summary>
        
        ## I

        | Term | Definition |
        | --- | --- |
        | Identity provider | An entity which stores and provides credentials to the user. It also allows users to register themselves.  <br>**See also**: Authentication |
        | Incoming webhooks | It lets an external app share content in Teams channels. These webhooks are used as tracking and notifying tools. <br>**See also**: Webhooks; Outgoing webhooks |
        | In-meeting app experience | A stage of Teams meeting lifecycle. With the in-meeting app experience, you can engage participants during the meeting by using apps and the in-meeting dialog box. <br>**See also**: Meeting lifecycle |
        |
        </details>
        <br>
        <details>
        <summary>L</summary>
        
        ## L

        | Term | Definition |
        | --- | --- |
        | Link unfurling | A feature used with messaging extension and meeting to unfold links pasted into a compose message area. The links expand to show additional information about the link in an Adaptive Card or in the meeting stage view.  |
        | Local environment | A default development environment created by Teams Toolkit  <br>**See also**: Environment; Dev environment |
        | Local workbench | The default option to run and debug an Teams app in Visual Studio Code that is created using SPFx. <br>**See also**: Workbench; Teams workbench |
        | Location capability | <br>**See also**: Capability; Media capability; Device Capability |
        | Low code apps | A custom Teams app built from scratch using Microsoft Power Platform that require little or no coding, and can be developed and deployed quickly.  |
        |
        </details>
        <br>
        <details>
        <summary>M</summary>
        
        ## M

        | Term | Definition |
        | --- | --- |
        | Media capability | Native device capabilities, such as, camera and microphone, that you can integrate with your Teams app. <br>**See also**: Capability; Device capability |
        | Meeting bot | Bots that interact with Teams calls and meetings using real-time voice, video, and screen sharing. <br>**See also**: Call bot; Chat bot |
        | Meeting lifecycle | It spans from pre-meeting, in-meeting, and post-meeting app experience. You can integrate tabs, bots, and messaging extensions in each stage of the meeting lifecycle. <br>**See also**: In-meeting experience |
        | Meeting stage | A feature of meeting extension app. It is a shared space .accessible during meeting to all participants. It helps participants interact and collaborate with app content in real time. |
        | Messaging extension | Messaging extensions are shortcuts for inserting app content or acting on a message without navigating away from the conversation. <br>**See also**: Search commands; Action commands |
        | Meeting extension | An app that is designed to be used during the meeting lifecycle to make it more productive, such as whiteboard, dashboard, and more.  |
        | Microsoft 365 account | Microsoft 365 account includes 25 user licenses, including the administrator, for development purposes only.  |
        | Microsoft 365 developer program | The Microsoft 365 Developer Program helps you build apps that extend Microsoft 365.  |
        | Microsoft Graph Explorer | The gateway to data and intelligence in Microsoft 365. It provides a unified programmability model that you can use to access the tremendous amount of data in Microsoft 365, Windows 10, and Enterprise Mobility + Security. |
        | Microsoft Teams | Microsoft Teams is a group collaboration software that can be used to help teams work together remotely. |
        | Microsoft Teams Platform | The Microsoft Teams developer platform makes it easy for developers to integrate their own apps and services to improve productivity, make decisions faster, provide focus by reducing context switching, and create collaboration around existing content and workflows. |
        | Microsoft Teams UI Library | Microsoft Teams UI Library helps you view and test individual Teams UI templates and related components in your browser. |
        | Microsoft Teams UI Toolkit | Microsoft Teams UI Kit includes components and patterns that are designed specifically for building Teams apps. |
        | Microsoft Store | Microsoft Store is a digital distribution platform owned by Microsoft. |
        |
        </details>
        <br>
    :::column-end:::

    :::column span="":::
        <details>
        <summary>O</summary>
        
        ## O

        | Term | Definition |
        | --- | --- |
        | Office 365 Connector | It lets you create a custom configuration page for your Incoming Webhook and package them as part of a Teams app. You can send messages primarily using Office 365 Connector cards and have the ability to add a limited set of card actions to them. |
        | Outgoing webhook | It acts as a bot and search for messages in channels using @mention. It sends notifications to external web services and responds with rich messages, which include cards and images. <br>**See also**: Webhook; Incoming webhook |
        | Outlook channel | A feature of Teams messaging extension app that lets the users interact with it from Microsoft Outlook. |
        | [One-on-one chat](../resources/bot-v3/bot-conversations/bots-conv-personal.md) | A type of chat between a Teams personal bot app and a single user. <br>**See also**: Group chat; Chat bot |
        |
        </details>
        <br>
        <details>
        <summary>P</summary>
        
        ## P

        | Term | Definition |
        | --- | --- |
        | Personal app | A personal app can be a bot, private workspace, or both. <br>**See also**: Shared app |
        | Power Virtual Agents | A no-code, guided graphical interface solution that empowers every member of your team to create rich, conversational chatbots that easily integrate with the Teams platform. |
        | Proactive messages | A message sent by a bot that isn't in response to a request from a user, such as welcome messages, notifications, scheduled messages. |
        | Provision | A process that creates resources in Azure and Microsoft 365 for your app, but no code (HTML, CSS, JavaScript, etc.) is copied to the resources. <br>**See also**: Deploy |
        |
        </details>
        <br>
        <details>
        <summary>R</summary>
        
        ## R

        | Term | Definition |
        | --- | --- |
        | Rate-limiting | A method to limit messages to a certain maximum frequency to ensure that number of messages are sufficient and don't appear as spam. |
        | Role-based views | A feature of tabs where the tab experience may be different for users depending on their permission level. |
        | RSC permission | Resource-specific consent (RSC) permission feature is needed by team owners to let a bot app receive messages across channels in a team without being @mentioned. |
        |
        </details>
        <br>
        <details>
        <summary>S</summary>
        
        ## S

        | Term | Definition |
        | --- | --- |
        | Search commands | A type of messaging extension app that lets users search external systems and include the search result into a message using a card. <br>**See also**: Messaging extensions; Action commands |
        | Sequential workflow | A workflow that let a bot carry out a conversation with a user based on the user response. |
        | Shared app | An app that exists in a team, channel, or chat where everyone can collaborate. <br>**See also:** Personal app |
        | SharePoint site collection | It is a collection site for SharePoint apps. You need to have an administrator account for this site before you can deploy your SPFx-based app on the SharePoint site. <br>**See also**: SPFx |
        | Sideloading | A process where a Teams app is loaded to Teams at the time of build to test it in Teams environment before distributing it. |
        | SidePanel | A feature of Teams meeting app that enables you to customize experiences in a meeting that allow organizers and presenters to have different set of views and actions.  |
        | SPFx | SharePoint Framework (SPFx) is a development model to build client-side solutions for Microsoft Teams and SharePoint. |
        | Stage view | A user interface component that lets you render the content that is opened in full screen in Teams and pinned as a tab. It is invoked to surface web content within Teams. |
        | Standalone app | A single-page or large, and complex app. The user can use some aspects of it in Teams. <br>**See also**: Collaboration aap |
        | Static search | A method of typeahead search that lets users search from pre-specified values in the Adaptive Card payload. <br>**See also**: Dynamic search |
        |
        </details>
        <br>
        <details>
        <summary>T</summary>
        
        ## T

        | Term | Definition |
        | --- | --- |
        | Tab | Tabs are Teams-aware webpages embedded in Microsoft Teams that point to domains declared in manifest. You can add it inside a team, group chat, or personal app. |
        | Tab chat | A type of tab that lets a user have a focused conversation experience in dynamic tabs. |
        | Task modules | A feature of Teams app to create modal popup for completing tasks, displaying videos or dashboard. |
        | Thread discussion | A conversation posted on a channel or chat between users. |
        | Teams | Microsoft Teams is the ultimate messaging app for your organization—a workspace for real-time collaboration and communication, meetings, file and app sharing. |
        | Teams Toolkit | The Microsoft Teams Toolkit enables you to create custom Teams apps directly within the Visual Studio Code environment.  |
        | TeamsFx | TeamsFx is a text-based command line interface that accelerates Teams application development. It's also called TeamsFx CLI.|
        | TeamsFx SDK | TeamsFx SDK is pre-configured in scaffolded project using TeamsFx toolkit or CLI. |
        | Teams Mobile | Microsoft Teams available as a mobile app. |
        | Teams workbench | A workbench in Visual Studio Code used at build for Teams apps created using SPFx and Teams Toolkit. <br>**See also**: Workbench; Local workbench |
        |
        </details>
        <br>
        <details>
        <summary>U</summary>

        ## U

        | Term | Definition |
        | --- | --- |
        | UI components | For Teams app development, you can use Fluent UI components to build your app from scratch. |
        | UI templates | For Teams app development, you can use Teams UI templates to design your apps quickly. |
        | Universal Actions for Adaptive Cards | A way to implement Adaptive Cards across platforms and applications. It uses a bot as a common backend for handling actions. |
        | 
        </details>
        <br>
        <details>
        <summary>V</summary>
        
        ## V

        | Term | Definition |
        | --- | --- |
        | Virtual Assistant | A Microsoft open-source template that enables you to create a robust conversational solution. |
        |
        </details>
        <br>
        <details>
        <summary>W</summary>

        ## W

        | Term | Definition |
        | --- | --- |
        | Web app | An app that runs on a web server. It can be integrated with Microsoft Teams Platform. |
        | Webhook | It is a feature of a Teams app used to integrate it with external apps. <br>**See also**: Incoming webhook; outgoing webhook |
        | Web part | A UI component used to build a page or a site in a Teams app created using SharePoint. <br>**See also**: SPFx |
        | Workbench | Overall Visual Studio Code UI that encompasses UI components, such as title bar, panel, and more. <br>**See also**: Local workbench; Teams workbench |
        </details>
        <br>
        <details>
        <summary>Y</summary>
    
        ## Y

        | Term | Definition |
        | --- | --- |
        | YoTeams | A development toolkit for building Microsoft Teams applications based on TypeScript and node.js. |
        |
        </details>
        
    :::column-end:::
:::row-end:::

<!--Cross-ref links-->
