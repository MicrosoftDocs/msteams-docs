---
title: Approvals app APIs
description: Learn the different types of the approvals app Microsoft Graph APIs for personal and third-party apps, its use cases, and benefits.
ms.topic: reference
ms.localizationpriority: medium
ms.author: v-sdhakshina
ms.date: 07/10/2024
---

# Approvals app APIs

> [!NOTE]
> Approvals app API is available only in [public developer preview](~/resources/dev-preview/developer-preview-intro.md).

The approvals app API in Microsoft Teams allows you to integrate approval workflows into both Teams app and third-party apps. You can create new approvals, update existing ones, and list all approvals. It mentions the ability to create, update, and list approvals, assign approvals to users, specify custom responses, and receive notifications on Teams. As APIs support graph subscriptions, you can send notifications for approval responses. Approvals app is available as a personal app for all Teams users.

The following table provides the list of APIs available across Microsoft Graph for the approvals app:

| API | Description |
| ---- | ---- |
| [Approval item](/graph/api/resources/approvalitem?view=graph-rest-beta&preserve-view=true) | Represents a request for approval, encompassing related decisions, status, and responses. You can create new approval items, view sent or received approval items, and perform actions on these approval items. |
| [Approval solution](/graph/api/resources/approvalsolution?view=graph-rest-beta&preserve-view=true) | Represents the provisioning status of the approval solution for a tenant. |
| [Approval item request](/graph/api/resources/approvalitemrequest?view=graph-rest-beta&preserve-view=true) | Represents a request created for each approver on `approvalItem`. |
| [Approval item response](/graph/api/resources/approvalitemresponse?view=graph-rest-beta&preserve-view=true) | Represents a response to an approval item request. |
| [Approval item view point](/graph/api/resources/approvalitemviewpoint?view=graph-rest-beta&preserve-view=true) |Represents the user's roles for an `approvalItem`.|
| [Approval operation](/graph/api/resources/approvaloperation?view=graph-rest-beta&preserve-view=true) | Represents the status and details for an operation performed on `approvalItem`.|

## Use cases

**Automating approval workflows**: The API allows you to create and manage approval requests, which is helpful for automating workflows that need approvals, such as document sign-offs or expense approvals.

**Integration with other services**: The API allows for integration with other services and applications. For example, you can set up a workflow where an approval request in Teams triggers an action in another system, like updating a record in a CRM or sending a notification through another communication platform.

**Custom approval processes**: With this API, you can customize the approval process to fit your organization’s needs. This could include setting up multi-stage approvals, conditional approvals based on certain criteria, or even integrating with custom-built applications within your organization.

**Tracking and reporting**: The API can be used to track the status of approval requests and generate reports on approval activities. This can help organizations keep track of pending approvals, monitor the efficiency of their approval processes, and ensure compliance with internal policies.

**Enhanced user experience**: By using the API, you can create custom experiences within Teams that streamline the approval process for users. This could involve creating bots that assist with creating and managing approvals or building custom interfaces that make it easier for users to review and respond to approval requests.

## Key benefits of approvals app

* Approvals app reduces the time and effort required to manage approvals by automating the workflow and notification process.
* It provides a centralized hub where all approvals can be tracked, managed, and audited, offering greater transparency into the approval process.
* Organizations can ensure consistency in how approvals are managed across various departments and teams.
* Approvals app can enforce compliance with organizational policies by ensuring that all necessary approvals are obtained before any action is taken.

## See also

[Manage the approvals app in Microsoft Teams](/microsoftteams/approval-admin)
