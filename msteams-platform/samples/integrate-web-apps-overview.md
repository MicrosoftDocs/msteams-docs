---
title: Integrate web apps
author: Rajeshwari-v
description: An overview of integrating web applications and device capabilities with Microsoft Teams app.
ms.topic: conceptual
ms.author: surbhigupta
---

# Integrate web apps

You can provide an enriched user experience by integrating the features of an existing web application into Microsoft Teams platform. Ensure to follow [Teams design guidelines](~/concepts/design/understand-use-cases.md) to make your app native to Teams.
This document gives an overview of prerequisites to integrate web applications with Teams, Power platform to create Power apps, Power Virtual Agents, Virtual Assistant, app templates, Shift connectors, Moodle LMS, creating a Share-to-Teams button for your website, adding a Microsoft Teams tab in SharePoint, creating deep links, and integrating device capabilities.

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
* Microsoft Power platform
* Microsoft Teams app templates

## Microsoft Power platform

Microsoft Power platform combines four robust Microsoft technologies, such as Power BI, Power Apps, Power Automate, and Power Virtual Agents in one powerful application platform. These technologies empower you to build solutions, automate processes, analyze data, and create virtual agents within a unified and integrated environment.

### Power Apps

With Power Apps, you can build business apps that connect to your business data and are tailored to your organization's needs. Power Apps enable a wide range of app scenarios to solve business challenges through canvas apps. After building the app, you can export it from the Power Apps maker portal and embed in Microsoft Teams.

### Power Virtual Agents

Power Virtual Agent is a no code, guided graphical interface solution. It is built on the Microsoft Power Platform and the Bot Framework. It empowers every member of your team to create and maintain rich conversational chatbots that easily integrate with the Teams platform. You can design, develop, and publish intelligent virtual agents for Teams without having to setup a development environment, create a web service, or directly register with the Bot Framework.

### Create Virtual Assistant

Virtual Assistant is a Microsoft open-source template that enables you to create a robust conversational solution while maintaining full control of user experience, organizational branding, and necessary data. 

## App templates

You can use app template to create custom made apps to suit your organizational needs. These are production-ready apps for Microsoft Teams that are community driven, open-source, and available on GitHub. Each template contains detailed instructions to deploy and install the app for your organization. It provides a ready-to-use application that you can install and start using immediately. 

## Teams Shifts Work Force Management connectors

Teams Shifts Work Force Management connectors are production-ready, open-source, and community-driven integrations. They offer a seamless experience and quick process for the digital transformation of firstline workers with Teams Shifts.

## Install Moodle LMS

Moodle is a popular open-source Learning Management System (LMS). It is now integrated with Microsoft Teams. This integration helps educators and teachers to collaborate around Moodle courses, ask questions about grades and assignments, and stay updated with notifications directly within Teams.

## Create a Share-to-Teams button for your website

Third-party websites can use the launcher script to embed Share to Teams buttons on their webpages. When you select the button, it launches the Share to Teams experience in a pop-up window. This allows you to share a link directly to any person or Microsoft Teams channel without switching context.

## Add a Microsoft Teams tab in SharePoint

You can get a rich integration experience between Microsoft Teams and SharePoint by adding a Microsoft Teams tab in SharePoint as an SPFx web part. 

## Create Deep link

You can create deep links to the entities in Teams. You can create links to information and features within Teams. These deep links navigate to content and information within your tab. You can use deep links to link your app with Teams as they tie together multiple pieces of an app for a more native Teams experience.

## Integrate device capabilities

Microsoft Teams platform is continuously enhancing developer capabilities aligning with built-in first-party experiences. The enhanced Teams platform allows partners to access and integrate the native device capabilities, such as camera, QR or barcode scanner, photo gallery, microphone, and location using dedicated APIs available in Microsoft Teams JavaScript client SDK. 

## See also

> [!div class="nextstepaction"]
> [Map your app's use cases to Teams platform capabilities](~/concepts/design/map-use-cases.md)

> [!div class="nextstepaction"]
> [Determine your app's entry points](~/concepts/extensibility-points.md)

> [!div class="nextstepaction"]
> [Integrate web apps](~/samples/integrating-web-apps.md)

> [!div class="nextstepaction"]
> [Create low-code custom apps for Microsoft Teams](~/samples/teams-low-code-solutions.md)

> [!div class="nextstepaction"]
> [Add a Power Virtual Agents chatbot](~/bots/how-to/add-power-virtual-agents-bot-to-teams.md)

> [!div class="nextstepaction"]
> [Create virtual assistant](~/samples/virtual-assistant.md)

> [!div class="nextstepaction"]
> [App templates for Microsoft Teams](~/samples/app-templates.md)

> [!div class="nextstepaction"]
> [Production-ready Shift Connectors](~/samples/shifts-wfm-connectors.md)

> [!div class="nextstepaction"]
> [Install Moodle LMS](~/resources/moodleinstructions.md)

> [!div class="nextstepaction"]
> [Create a Share-to-Teams button](~/concepts/build-and-test/share-to-teams.md)

> [!div class="nextstepaction"]
> [Add a Teams tab to SharePoint](~/tabs/how-to/tabs-in-sharepoint.md)

> [!div class="nextstepaction"]
> [Create deep links](~/concepts/build-and-test/deep-links.md)

> [!div class="nextstepaction"]
> [Device capabilities](~/concepts/device-capabilities/device-capabilities-overview.md)