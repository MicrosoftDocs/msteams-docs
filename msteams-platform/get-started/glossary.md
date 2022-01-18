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
<details>
<summary>A</summary>

| Term | Definition |
| --- | --- |
| Action command | A type of messaging extension app that is used to present the users with a popup to collect or display information. <br>**See also**: Messaging extension; Search commands |
| Adaptive Card | An actionable snippets of content that you can add to a conversation through a bot or messaging extension. Using text, graphics, and buttons, these cards provide rich communication to your audience. |
| App Catalog | It stores the apps for SharePoint and office for our organization's internal use. |
| App manifest | The Teams app manifest describes how the app integrates into the Microsoft Teams product. Your manifest must conform to the schema hosted at https://developer.microsoft.com/json-schemas/teams/v1.11/MicrosoftTeams.schema.json. |
| App package | A Teams app package is a zip file that contains the App manifest file and app icons - color icon and outline icon. |
| App permission | In Teams, it lets you enable the app's device permissions for your app. It is available only when the manifest file of the app declares that the app needs device permissions. <br> **See also**: Device permissions |
| App scope | The purview within which your app interacts with your users. An app can have Personal scope, Channel scope, or Team scope. A Teams app can exist across scopes. |
| App Studio | An app to start creating or integrating your own Microsoft Teams apps. It has now evolved to Developer Portal. <br> **See also**: Developer Portal |
| Azure resource | A service that is available through Azure that your Teams app can use for Azure deployment. It could be storage accounts, web apps, databases, and more. |
| Azure Active Directory | Microsoft’s cloud-based identity and access management service. It helps authenticated users access resources internal and external Azure resources. |
| Authentication | A process to authorize user access for your app's usage. it can be done using Microsoft Graph APIs or web-based authentication. <br> **See also**: Identity providers |
| Authentication flow | In Teams, there are two different authentication flows to authenticate a user for using an app: web-based authentication and OAuthPrompt flow. |
|
</details>
<br>
<details>
<summary>B</summary>

| Term | Definition |
| --- | --- |
| Blazor | A free and open-source web framework that enables developers to create web apps using C# and HTML. It lets you build interactive web UIs using C# instead of JavaScript. Blazor apps are composed of reusable web UI components implemented using C#, HTML, and CSS. It is being developed by Microsoft. |
| Bicep | A declarative language, which means the elements can appear in any order. Unlike imperative languages, the order of elements doesn't affect how deployment is processed. |
| Bot | A bot is an app that performs programmed repetitive tasks. <br> **See also**: Conversational bot; Chat bot |
| Bot Emulator | A desktop application that allows you to test and debug bots, either locally or remotely. |
| Bot Framework | A rich SDK used to create bots using C#, Java, Python, and JavaScript. If you already have a bot that is based on the Bot Framework, you can easily modify it to work in Teams. |
|
</details>
<br>
<details>
<summary>C</summary>

| Term | Definition |
| --- | --- |
| Call bot | A bot that participates in audio or video calls and online meetings. <br> **See also**: Chat bot; Meeting bot |
| Capability | The feature of a Teams app are called as Capability. An app may have one or more core capabilities, such as tab, bot, messaging extensions. <br>**See also**: Device capability; Media capability |
| Chat bot | A bot is also referred to as a chatbot or conversational bot. It is an app that runs simple and repetitive tasks by users such as customer service or support staff. <br> **See also**: Conversational bot. |
| Channel | A single place for a team to share messages, tools, and files. In Teams, teamwork and communication happen in channels.  |
| Client secret | The Client secret/password or a public or private key pair that is Certificate. This is not required for native apps. <br> **See also**: Bot |
| Cloud resources | A service that is available on cloud through internet that your Teams app can use. It could be storage accounts, web apps, databases, and more. |
| Collaboration app | An app with capabilities for a user to work in a collaborative workspace with other users. <br> **See also**: Standalone app |
| Connector | It allows users to subscribe to receive notifications and messages from the web services. They expose the HTTPS endpoint for the service to post messages to Teams channels, typically in the form of cards. <br> **See also**: Webhooks |
| Conversation | A series of messages sent between your Microsoft Teams bot and one or more users. A conversation can have three scopes: channel, personal, and group chat. <br>**See also**: One-on-one chat; Group chat |
| Conversational bot |  It allows a user to interact with your web service using text, interactive cards, and task modules. <br>**See aso** Chat bot |
|
</details>
<br>
<details>
<summary>D</summary>

| Term | Definition |
| --- | --- |
| Deep linking | In a Teams app, you can create deep links to information and features within Teams or to help the user navigate to content in your app. |
| Developer Portal for Teams | The primary tool for configuring, distributing, and managing your Microsoft Teams apps. With the Developer Portal, you can collaborate with colleagues on your app, set up runtime environments, and much more. |
| Developer Preview | A public program for developers which provides early access to unreleased features in Microsoft Teams. This allows you to explore and test upcoming features for potential inclusion in your Microsoft Teams app. |
| Deploy | A process to upload the backend and frontend code for the application. At Deployment, your code for your app is copied to the resources you created during the provision step. <br>**See also**: Provision |
| Device capabilities | Built-in devices, such as camera, microphone, barcode scanner, photo gallery, in a mobile or desktop. You can access the following device capabilities on mobile or desktop through dedicated APIs available in Microsoft Teams JavaScript client SDK. <br>**See also**: Capability; Media capability |
| Device permission | If an app needs to utilize a native device capability, it must request permission to access the capability. You can manage device permissions in Teams settings. <br>**See also**: App permissions |
| Dev environment | A type of development environment that Teams Toolkit creates by default to represent remote or cloud environment configurations. A project can have multiple remote environments. You can add more dev environments to your project using Teams Toolkit. <br>**See also** Environment; Local environment |
| DevTools | Browser's Devtools are used to view console logs, view or modify runtime network requests, add breakpoints to code (JavaScript) and perform interactive debugging for a Teams app. The feature is only available for desktop and Android clients after the Developer Preview has been enabled. |
| Dynamic search | A search feature for Adaptive Cards that is useful to search and select data from large data sets. It helps to filter out the choices as the user types. <br>**See also**: Static search |
|
</details>
<br>
<details>
<summary>E</summary>

| Term | Definition |
| --- | --- |
| E5 account |  <br>**See also**: Microsoft 365 account |
| Entry point |  |
| Environment | A feature in Teams Toolkit that lets you create and use multiple development environments for your app project. There are two dev environments that Teams Toolkit creates by default - local environment and dev environment. <br>**See also**: Local environment; Dev environment |
|
</details>
<br>
<details>
<summary>G</summary>

| Term | Definition |
| --- | --- |
| Group chat | A chat feature where a user is able to chat with a bot in a group setting by using @mention to invoke the bot. <br>**See also**: One-on-one chat; Chat bot |
|
</details>
<br>
<details>
<summary>I</summary>

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

| Term | Definition |
| --- | --- |
| Media capability | Native device capabilities, such as, camera and microphone, that you can integrate with your Teams app. <br>**See also**: Capability; Device capability |
| Meeting bot | Bots that interact with Teams calls and meetings using real-time voice, video, and screen sharing. <br>**See also**: Call bot; Chat bot |
| Meeting lifecycle | It spans from pre-meeting, in-meeting, and post-meeting app experience. You can integrate tabs, bots, and messaging extensions in each stage of the meeting lifecycle. <br>**See also**: In-meeting experience |
| Meeting stage | A feature of meeting extension app. It is a shared space .accessible during meeting to all participants. It helps participants interact and collaborate with app content in real time. |
| Messaging extension | Messaging extensions are shortcuts for inserting app content or acting on a message without navigating away from the conversation. <br>**See also**: Search commands; Action commands |
| Meeting extension | An app that is designed to be used during the meeting lifecycle to make it more productive, such as whiteboard, dashboard, and more.  |
| Microsoft 365 account |  |
| Microsoft 365 developer program |  |
| Microsoft Graph Explorer |  |
| Microsoft Teams |  |
| Microsoft Teams Platform |  |
| Microsoft Teams UI Library |  |
| Microsoft Teams UI Toolkit |  |
| Microsoft Store |  |
|
</details>
<br>
<details>
<summary>O</summary>

| Term | Definition |
| --- | --- |
| Office 365 Connectors |  |
| Outgoing webhooks |  |
| Outlook channel |  |
| One-on-one chat |  |
|
</details>
<br>
<details>
<summary>P</summary>

| Term | Definition |
| --- | --- |
| Personal app |  |
| 