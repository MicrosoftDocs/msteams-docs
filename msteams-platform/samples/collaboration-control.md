---
title: Collaboration controls
author: surbhigupta
description: In this module, learn how Collaboration controls allow makers to build apps that integrate with Microsoft 365 services like Planner, Bookings, and Outlook.
ms.localizationpriority: medium
ms.author: v-npaladugu
ms.topic: conceptual
---

# Collaboration controls

The Collaboration controls enable applying Microsoft 365 and Microsoft Teams for Approvals, Files, Meetings, Notes, and Tasks to enable contextual collaboration around business processes. These controls allow you to build custom collaborative experiences that can be surfaced right in Teams. The solutions that make up Collaboration controls allow makers to build applications that integrate with Microsoft 365 services like Planner, Bookings, Outlook, and SharePoint in a low code manner.

These controls give you the power to simplify your users workflow collaboration by building line of business apps and work without switching the context from app to app with the following

* Approvals
* Files
* Meetings
* Notes
* Tasks

> [!NOTE]
> Collaboration controls are available only in [public developer preview](~/resources/dev-preview/developer-preview-intro.md).

Following are some of the key capabilities of Collaboration controls:

* **Microsoft Planner tasks:** Create tasks and assign it to members of a record so that they can view a consolidated list of tasks in model driven app and tasks app in Microsoft Teams.

* **Dataverse Tasks:** Create tasks that can be assigned to users who are external to your organization.

* **Dataverse Notes:** Create notes that are assigned to a record in your app.

* **Outlook Meetings:** Schedule meetings with both customers and internal employees and seamlessly connect with others with Microsoft Teams with a select of a button.

* **SharePoint Files:** Share files with members of a record so that you can search, reference, and edit relevant artifacts in a centralized location backed by SharePoint.

* **Approvals:** Streamline requests within your team.

> [!NOTE]
> By configuring and using the various Microsoft 365 capabilities of Collaboration controls mentioned earlier, you are granting permission for user data to pass through the Graph API and accepting [Microsoft API terms of Use](/legal/microsoft-apis/terms-of-use?context=graph%2Fcontext). For more information, see [Microsoft Graph](/graph/overview).

## How Collaboration controls works

The controls run within a Power Apps Model Driven Application (MDA) that can be deployed to Microsoft Teams. MDA run on Microsoft Dataverse and can be integrated with a custom data model. The controls integrate with Microsoft Graph for Planner tasks, Outlook and Teams calendars, and SharePoint files. The Collaboration controls don't integrate directly with external sources, such as a system of record or a portal.

* Data can be added to Dataverse from external sources via standard OData APIs.

* Data can be read from Dataverse via standard OData APIs and submitted to external sources such as a system of record or a portal.

:::image type="content" source="~/assets/images/collaboration-control/consumption-mda.png" alt-text="Collaboration lifecycle":::

## See also

* [Integrate web apps](integrate-web-apps-overview.md)
* [Microsoft Graph overview](/graph/teams-concept-overview)
