---
title: Integrate Teams Meetings & Calls
description: Learn how to integrate Teams meetings and calls in an external business-to-consumer (B2C) app, virtual appointments, and contact center.
ms.localizationpriority: high
ms.date: 03/01/2024
ms.topic: reference
---

# Integrate Teams meetings and calls in external apps

Microsoft Teams provides built-in business-to-consumer (B2C) communication functionality. For example, bank mortgage officers can conduct virtual appointments with customers using Teams meetings.

Customers can join the meeting in the following ways:

* Use Teams native apps or Teams web client.
* Dial the meeting’s telephone number.
* Use custom apps that work with Teams calling and meetings.

Integrating Teams interoperability into your customer-facing web or native app enables customized user experiences. You can build a web app compatible with mobile and desktop, or create native apps for iOS, Android, and Windows. This integration maintains the advantages of using Teams for employee interactions. These interactions can include employee familiarity, Teams copilot features, expandability with Teams apps and bots, and adherence to Microsoft 365 security and compliance.

Custom web and native apps can interact with two types of Teams B2C experiences: virtual appointments and contact center.

The following image shows an example of how you can integrate the Teams interoperable meeting and calling experience into your web or native app:

:::image type="content" source="../assets/images/call-with-chat-composite-hero.png" alt-text="Screenshot shows the meeting and calling experience that you can embed in to your app or web client.":::

## Virtual appointments

Virtual appointments are organized meetings between a customer and a business at a set time. The distinct separation between the customer and the business, along with the scheduled aspect of the interaction, are fundamental characteristics of most virtual appointments.

For example, various industries use virtual appointments such as meetings with healthcare professionals, loan officers, or product support technicians.

To build a virtual appointments app, follow these steps:

1. Build a communication management service function using Graph [onlineMeeting APIs](/graph/api/resources/onlinemeeting). This function handles scheduling the meeting and setting options such as recording availability.
1. Integrate Azure Communication Services Calling and Chat into your web or native app. For more information, see [Telephony concepts](/azure/communication-services/concepts/telephony/telephony-concept) and [Chat concepts](/azure/communication-services/concepts/chat/concepts).
1. Configure the communication management service to share the Teams meeting metadata with the client app.

[Azure Communication Services client libraries](/azure/communication-services/concepts/sdk-options) are available for various platforms and languages, such as web client (JavaScript), iOS (Swift), Android (Java), Windows (.NET). The client libraries support both mobile and desktop web clients.

You can use open-source [UI library](/azure/communication-services/concepts/ui-library/ui-library-overview) to develop web, iOS, and Android apps. Azure Communication Services is identity-agnostic, and you can control how to identify and authenticate end users.

For more information and quickstarts, see:

* [Concept: Virtual visit apps with Azure Communication Services](/azure/communication-services/tutorials/virtual-visits)
* [Concept: Azure & Teams interoperability](/azure/communication-services/concepts/interop/guest/overview)
* [Azure Architecture Guide for joining a Teams meeting](/azure/architecture/guide/mobile/azure-communication-services-architecture#microsoft-365-and-teams)
* [Azure Sample Builder for joining a Teams meeting](https://aka.ms/acs-sample-builder)
* [Quickstart: Join a Teams meeting as an external user](/azure/communication-services/quickstarts/voice-video-calling/get-started-teams-interop?pivots=platform-android)

## Contact center

Contact center apps focus on unscheduled communication between consumers and agents. The unscheduled nature of the interaction is a key attribute of contact center apps. The contact center captures a large family of apps diverse across the following:

* **Scale:** Small businesses might have few employees operating as agents in a limited role, such as a restaurant providing a contact number for booking reservations. An airline might employ thousands of staff and vendors providing a 24/7 contact center.
* **Channel:** Organizations can engage with consumers through the telephone system, apps, short message service (SMS), or consumer communication platforms.
* **Organizational approach:** Most businesses have employees operate as agents who use Teams or licensed Contact Center as a Service (CCaaS) software. Alternatively, other businesses might outsource the agent role or use specialized service providers who fully operate contact centers.

To build a contact center app, follow these steps:

1. [Plan and configure Teams Auto attendants and Call queues](/microsoftteams/plan-auto-attendant-call-queue).
1. Build a communication management service function using Graph APIs to retrieve metadata for Auto attendants and Call queues.
1. Integrate Azure Communication Services Calling and Chat into your web or native app. For more information, see [Telephony concepts](/azure/communication-services/concepts/telephony/telephony-concept) and [Chat concepts](/azure/communication-services/concepts/chat/concepts).
1. Configure the communication management service to share the Teams Auto attendant or Call queue metadata to the client app.

The Azure Communication Services [UI library](/azure/communication-services/concepts/ui-library/ui-library-overview) includes [a Call composite](https://azure.github.io/communication-ui-library/?path=/docs/composites-call-basicexample--basic-example) that enables rapid and straightforward integration of these unscheduled calling experiences into mobile and desktop web clients.

For more information and quickstarts, see:

* [Concept: Contact Center apps with Azure Communication Services](/azure/communication-services/tutorials/contact-center)
* [Quickstart: Join your calling app to a Teams call queue](/azure/communication-services/quickstarts/voice-video-calling/get-started-teams-call-queue)
* [Quickstart: Teams auto attendant on Azure Communication Services](/azure/communication-services/quickstarts/voice-video-calling/get-started-teams-auto-attendant)
