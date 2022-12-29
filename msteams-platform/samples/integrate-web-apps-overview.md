---
title: Integrate web apps
author: Rajeshwari-v
description: In this article, you'll get started with integrating web applications and device capabilities with Microsoft Teams app. Power platform to create Power apps, Power Virtual Agents, Virtual Assistant, app templates, Shift connectors, Moodle LMS.
ms.topic: conceptual
ms.author: surbhigupta
ms.localizationpriority: high
---

# Integrate web apps

You can provide an enriched user experience by integrating the features of an existing web application into Microsoft Teams platform. Ensure to follow [Teams design guidelines](~/concepts/design/understand-use-cases.md) to make your app native to Teams.
This document gives an overview of prerequisites to integrate web applications with Teams, Power platform to create Power apps, Power Virtual Agents, Virtual Assistant, app templates, Shift connectors, Moodle LMS, creating a Share-to-Teams button for your website, adding a Teams tab in SharePoint, creating deep links, and integrating device capabilities.

## Prerequisites

For effective integration, ensure to have a better understanding of the following prerequisites:

* Teams capabilities.
* SharePoint requirements for file and data storage.
* API requirements.
* Authentication.
* Deep linking of your app with Teams.
* Map your app's use cases to Teams platform capabilities.
* Determine your app's entry points, such as personal use, collaboration, or both.

## Low code platforms

Low code platforms provide an intuitive approach to software development and require little or no coding to build applications and processes. You can create custom apps easily with low code platforms. These platforms consist of a visual interface, connectors to back end services, and a built-in app lifecycle management system to build, debug, deploy, and maintain applications. Microsoft provides the following innovative gateways to rapidly build Teams-compatible apps using low code attributes:

* Microsoft Power platform.
* Microsoft Teams app templates.

## Microsoft Power platform

Microsoft Power platform combines four robust Microsoft technologies, such as Power BI, Power Apps, Power Automate, and Power Virtual Agents in one powerful application platform. These technologies empower you to build solutions, automate processes, analyze data, and create virtual agents within a unified and integrated environment.

>[!NOTE]
>You must not use Microsoft Power Platform to create apps that are to be published to the Teams app store. Microsoft Power Platform apps can be published to an organization’s app store only.

### Power Apps

With Power Apps, you can build business apps that connect to your business data and are tailored to your organization's needs. Power Apps enables a wide range of app scenarios to solve business challenges through canvas apps. After building the app, you can export it from the Power Apps maker portal and embed in Teams.

### Power Virtual Agents

Power Virtual Agent is a no code, guided graphical interface solution. It's built on the Microsoft Power Platform and the Bot Framework. It empowers every member of your team to create and maintain rich conversational chatbots that easily integrate with the Teams platform. You can design, develop, and publish intelligent virtual agents for Teams without having to set up a development environment, create a web service, or directly register with the Bot Framework.

### Create Virtual Assistant

Virtual Assistant is a Microsoft open-source template that enables you to create a robust conversational solution while maintaining full control of user experience, organizational branding, and necessary data.

## App templates

You can use app template to create custom made apps to suit your organizational needs. These are production-ready apps for Microsoft Teams that are community driven, open-source, and available on GitHub. Each template contains detailed instructions to deploy and install the app for your organization. It provides a ready-to-use application that you can install and start using immediately.

## Install Moodle LMS

Moodle is a popular open-source Learning Management System (LMS). It's now integrated with Teams. This integration helps educators and teachers to collaborate around Moodle courses, ask questions about grades and assignments, and stay updated with notifications directly within Teams.

## Create a Share-to-Teams button for your website

Third-party websites can use the launcher script to embed Share to Teams buttons on their webpages. When you select the button, it launches the Share to Teams experience in a pop-up window. It allows you to share a link directly to any person or Microsoft Teams channel without switching context.

## Add a Microsoft Teams tab in SharePoint

You can get a rich integration experience between Teams and SharePoint by adding a Teams tab in SharePoint as an SPFx web part.

## Create deep link

You can create deep links to the entities in Teams. You can create links to information and features within Teams. These deep links navigate to content and information within your tab. You can use deep links to link your app with Teams as they tie together multiple pieces of an app for a more native Teams experience.

## Integrate device capabilities

Teams platform is continuously enhancing developer capabilities aligning with built-in first-party experiences. The enhanced Teams platform allows partners to access and integrate the native device capabilities, such as camera, QR or barcode scanner, photo gallery, microphone, and location using dedicated APIs available in Microsoft Teams JavaScript client library.

## Integrate People Picker

You can integrate the Teams native people picker control that allows users to search and select people in the web app experience.

## Integrate Teams in your external app

You can embed your own experiences into Teams by building Teams apps. If you'd like to *reverse* this model and integrate Teams or other communication capabilities into your own external app experience, see [Azure Communication Services](/azure/communication-services/overview). Azure Communication Services are cloud-based services with REST APIs and client libraries to help you integrate communication into your own custom applications. You can embed generic or Teams-styled React Web components for calling and chat with the help of the [UI library](https://azure.github.io/communication-ui-library/).

Azure Communication Services applications can use public preview functionality to [interoperate with Teams](/azure/communication-services/concepts/teams-interop) and enable your custom application to join Teams meetings anonymously. For example, you can integrate video calling into a mobile banking application and allow end-users to virtually meet with bank employees using Teams.

You can also integrate Microsoft 365 identity to build external applications that embed video and PSTN calling on behalf of a Teams user. If you've used [Skype for Business SDKs](/skype-sdk/appsdk/skypeappsdk) in the past, these capabilities as part of Azure Communication Services are recommended as a replacement.

## See also

* [Map your app's use cases to Teams platform capabilities](~/concepts/design/map-use-cases.md)
* [Determine your app's entry points](~/concepts/extensibility-points.md)
* [Considerations for Teams integration](~/samples/integrating-web-apps.md)
* [Authenticate users in Microsoft Teams](../concepts/authentication/authentication.md)
* [Create low-code custom apps for Microsoft Teams](~/samples/teams-low-code-solutions.md)
* [Add a Power Virtual Agents chatbot](~/bots/how-to/add-power-virtual-agents-bot-to-teams.md)
* [Create virtual assistant](~/samples/virtual-assistant.md)
* [App templates for Microsoft Teams](~/samples/app-templates.md)
* [Production-ready Shift Connectors](~/samples/shifts-wfm-connectors.md)
* [Install Moodle LMS](~/resources/moodleinstructions.md)
* [Share to Teams from web apps](~/concepts/build-and-test/share-to-teams-from-web-apps.md)
* [Add a Teams tab to SharePoint](~/tabs/how-to/tabs-in-sharepoint.md)
* [Create deep links](~/concepts/build-and-test/deep-links.md)
* [Device capabilities](~/concepts/device-capabilities/device-capabilities-overview.md)
* [People picker control](~/concepts/device-capabilities/people-picker-capability.md)
