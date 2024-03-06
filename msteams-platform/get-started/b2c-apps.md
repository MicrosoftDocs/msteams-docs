---
title: Build business-to-consumer (B2C) app
description: Build an external business-to-consumer (B2C) app that interoperates with Teams.
ms.localizationpriority: high
ms.date: 03/01/2024
ms.topic: reference
---

# Build your business-to-consumer (B2C) app

Microsoft Teams delivers business-to-consumer (B2C) communication out-of-the-box. For example, mortgage officers at a bank can use Teams meetings to host virtual appointments with their customers. Customers can join those meetings in three ways:

- Microsoft Teams native apps or desktop website
- Dialing into the meeting's telephone number
- Custom applications that interoperate with Teams calling and meetings

Embedding Teams interoperability in your own customer-facing website or native app enables tailored customer experiences. You can build websites that work on both mobile and desktop browsers. Or native iOS, Android, and Windows apps. All while preserving the benefits of using Teams for employee experiences: employee familiarity, Teams co-pilot, extensibility through Teams apps and bots, and Microsoft 365 security and compliance.

Custom websites and native apps can interoperate with two kinds of Teams B2C experience: virtual appointments and contact center.

The image shows an example of the Teams interoperable meeting and calling experience you can embed into your website or native app:
![Alt text](https://azure.github.io/communication-ui-library/images/call-with-chat-composite-hero.png "Screenshot of the meeting and calling experiences you can embed in your own app or website")


## Virtual Appointments

Virtual appointments are a communication pattern where a consumer and a business assemble for a scheduled appointment. The organizational boundary between consumer and business, and scheduled nature of the interaction, are key attributes of most virtual appointments. Many industries operate virtual appointments: meetings with a healthcare provider, a loan officer, or a product support technician.

The key technical steps for building a virtual appointments application:

1. Build a communication management service function using Graph Online Meeting APIs. This service schedules the meeting and configures options such as the availability of recording.
2. Embed Azure Communication Services Calling and Chat into your website or native app.
3. Program the communication management service to share the Teams meeting meta-data with the client application.

[Azure Communication Services client libraries](../../../azure/communication-services/concepts/sdk-options) are available for various platforms and languages, including Web browsers (JavaScript), iOS (Swift), Android (Java), Windows (.NET). The client libraries support both mobile and desktop web browsers. An open-source [UI library](../../../azure/communication-services/concepts/ui-library/ui-library-overview) can accelerate development for Web, iOS, and Android apps. Azure Communication Services is identity-agnostic, and you control how end users are identified and authenticated.

For more information and quickstarts, check out:

- [Concept: Virtual visit apps with Azure Communication Services](../../../azure/communication-services/tutorials/virtual-visits.md)
- [Concept: Azure & Teams interoperability](/azure/communication-services/concepts/interop/guest/overview.md)
- [Azure Architecture Guide for joining a Teams meeting](https://learn.microsoft.com/azure/architecture/guide/mobile/azure-communication-services-architecture#microsoft-365-and-teams)
- [Azure Sample Builder for joining a Teams meeting](https://aka.ms/acs-sample-builder)
- [Quickstart: Join a Teams meeting as an external user](https://learn.microsoft.com/azure/communication-services/quickstarts/voice-video-calling/get-started-teams-interop?pivots=platform-android)

## Contact center

Contact center applications focus on unscheduled communication between consumers and agents. The unscheduled nature of the interaction is a key attribute of contact center applications. The term "contact center" captures a large family of applications diverse across scale, channels, and organizational approach:

- **Scale.** Small businesses may have a few employees operating as agents in a limited role, for example a restaurant offering a phone number for reservations. While an airline may have thousands of employees and vendors providing a 24/7 contact center.
- **Channel.** Organizations can reach consumers through the phone system, apps, SMS, or consumer communication platforms such as WhatsApp.
- **Organizational approach.** Most businesses have employees operate as agents using Teams or a licensed contact center as a service software (CCaaS). Other businesses may outsource the agent role or use specialized service providers who fully operate contact centers as a service.

The key technical steps for building a virtual appointments application:

1. Plan and configure Teams auto attendants and call queues.
2. Build a communication management service function using Graph APIs to retrieve meta-data for the auto attendants and call queues.
3. Embed Azure Communication Services Calling and Chat into your website or native app.
4. Program the communication management service to share the Teams auto-attendant or call queue meta-data with the client application.

The Azure Communication Services [UI library](https://learn.microsoft.com/azure/communication-services/concepts/ui-library/ui-library-overview) includes [a Call composite](https://azure.github.io/communication-ui-library/?path=/docs/composites-call-basicexample--basic-example) that allows for fast, straight-forward embedding of these unscheduled calling experiences in mobile and desktop websites.

For more information and quickstarts, check out:

- [Concept: Contact Center apps with Azure Communication Services](https://learn.microsoft.com/azure/communication-services/tutorials/contact-center)
- [Quickstart: Join your calling app to a Teams call queue](https://learn.microsoft.com/azure/communication-services/quickstarts/voice-video-calling/get-started-teams-call-queue)
- [Quickstart: Teams auto attendant on Azure Communication Services](https://learn.microsoft.com/azure/communication-services/quickstarts/voice-video-calling/get-started-teams-auto-attendant)
