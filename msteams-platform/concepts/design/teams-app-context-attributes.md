---
title: Teams App Context and Attributes
author: heath-hamilton
description: Learn about Teams App Context and Attributes
ms.topic: conceptual
ms.localizationpriority: high
ms.author: surbhigupta
---

# Plan for Teams app context and Attributes

Developing an app in Teams gives you access to certain context and user data unique to Teams and Microsoft 365 services. While reporting above Telemetry, combining it with these attributes gives additional insights, useful context around events that help in decision making.

Each platform capability or extensibility point exposes different set of user properties and Teams context. As you build your telemetry monitoring, make just use of combination of the attributes given in the following sections.

## Tab

A Tab is Teams aware web page iframed in Teams. In addition to instrumentation that you might have included in your app’s web page, Teams tab provides additional context information including:

- **App information**:

  - page.id and page.subPageId – indicates developer defined ID of the page and element or sub page within a page
  - isFullScreen – Indicates whether the page is in full-screen mode
  - isMultiWindow – Indicates whether the page is accessed as a pop out window
  - app.theme – Indicates the user interface theme being used – default, dark, contrast
  - app.locale – locale that user has configured for the app (e.g. en-US)
  - app.host.clientType – type of host client – android, iOS, desktop, web
  - app.host.sessionID - Unique ID for the current Host session for use in correlating telemetry data

- **User information**:

  - user.id – AAD ID of the current user
  - user.userPrincipalName – UPN of the current user
  - user.tenant.id – Tenant ID of the current user

| Personal | Teams or Channel | Group chat | Meeting |
| --- | --- | --- | --- |
|   | team.internalId & channel.id – ID of Team and Channel where tab is associated
team.type.- different types of team in O365 for Education
channel.channelType – indicates whether channel is private, regular or shared | chat.Id – chat ID if the tab is added is added to a Group Chat context | meeting.ID ID of the meeting used by tab when running in meeting context |

