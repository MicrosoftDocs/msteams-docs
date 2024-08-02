---
title: Approvals app APIs
description: Learn the different types of the approvals app Microsoft Graph APIs for personal and third-party apps, its use cases and benefits.
ms.topic: reference
ms.localizationpriority: medium
ms.author: v-sdhakshina
ms.date: 07/10/2024
---

# Approvals app API

> [!NOTE]
> Approvals app API is available only in [public developer preview](~/resources/dev-preview/developer-preview-intro.md).

The Approvals app API in Microsoft Teams allows you to integrate approval workflows into the both Teams app and third-party apps. You can create new approvals, update existing ones, and list all approvals. It mentions the ability to create, update, and list approvals, assign approvals to users, specify custom responses, and receive notifications on Teams. The APIs support graph subscriptions, allowing notifications for approval responses.

Approvals app is available as a personal app for all Microsoft Teams users. The Approvals app provides a simple way to bring auditing, compliance, accountability, and workflows to both structured and unstructured Approvals in Teams.

The following table provides the list of APIs available across Microsoft Graph for the Approvals app:

| API | Description |
| ---- | ---- |
| [Approval item](/graph/api/resources/approvalitem?view=graph-rest-beta&preserve-view=true) | Represents a request for approval, encompassing related decisions, status, and responses. You can create new approval items, view sent or received approval items, and perform actions on these approval items. |
| [Approval solution](/graph/api/resources/approvalsolution?view=graph-rest-beta&preserve-view=true) | Represents the provisioning status of the approval solution for a tenant. |
| [Approval item request](/graph/api/resources/approvalitemrequest?view=graph-rest-beta&preserve-view=true) | Represents a request created for each approver on `approvalItem`. |
| [Approval item response](/graph/api/resources/approvalitemresponse?view=graph-rest-beta&preserve-view=true) | Represents a response to an approval item request. |
| [Approval item view point](/graph/api/resources/approvalitemviewpoint?view=graph-rest-beta&preserve-view=true) |Represents the user's roles for an `approvalItem`.|
| [Approval operation](/graph/api/resources/approvaloperation?view=graph-rest-beta&preserve-view=true) | Represents the status and details for an operation performed on `approvalItem`.|

## Use cases

* Approvals app can be used to manage various types of requests, such as time-off requests, expense approvals, or project sign-offs, ensuring that they are reviewed and approved by the appropriate personnel in a timely manner.
* Approvals app often integrate with other systems like Power Automate, SharePoint, and Microsoft Dynamics 365, allowing for a seamless approval process across different platforms.
* In Teams, for example, you can create an approval directly from a chat conversation, making it easier to initiate and track approval requests within the context of ongoing discussions.

## Key benefits

* Approvals app reduce the time and effort required to manage approvals by automating the workflow and notification process.
* They provide a centralized hub where all approvals can be tracked, managed, and audited, offering greater transparency into the approval process.
* By using templates and predefined approval processes, organizations can ensure consistency in how approvals are handled across various departments and teams.
* Approvals app can enforce compliance with organizational policies by ensuring that all necessary approvals are obtained before any action is taken.

## See also

[Manage the Approvals app in Microsoft Teams](/microsoftteams/approval-admin)
