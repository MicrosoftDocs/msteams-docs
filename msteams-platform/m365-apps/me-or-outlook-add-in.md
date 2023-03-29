---
title: Decide between creating a message extension or an Outlook add-in
description: Learn how to decide whether your Microsoft 365 app should be message extension or an Outlook add-in.
ms.date: 01/05/2023
ms.topic: conceptual
ms.custom: m365apps
ms.localizationpriority: medium
---
# Scenarios for creating an Outlook add-in and a message extension

Outlook add-in and a message extension allow you to create rich and interactive content for email messages and meeting invitations. You can create an Outlook add-in and a message extension for your Teams app based on the scenario.

If your app includes scenarios from Outlook add-in and message extension, then you must create both apps, an Outlook add-in and a message extension. You must host both these apps at the same domain so that they can share files.

## Guidelines for Outlook add-in and message extension

# [**Outlook add-in**](#tab/outlook-add-in)

Create an Outlook add-in if your app requires any of the following scenarios:

* Access to the properties of email messages or calendar items.
* Ability to respond automatically to changes in the properties of email messages or calendar items.
* Access to the content of email messages and calendar items with fine-grained read or write access that is provided by [Outlook add-in APIs](/office/dev/add-ins/outlook/apis).
* Read or write access to the user's mailbox using the [Outlook add-in APIs](/office/dev/add-ins/outlook/apis).
* Ability to start up automatically in response to events without explicit user action. For more information, see [Event-based activation](/office/dev/add-ins/outlook/autolaunch).
* Ability to manipulate Outlook-specific settings, such as [custom properties](/office/dev/add-ins/outlook/metadata-for-an-outlook-add-in) and [internet headers](/office/dev/add-ins/outlook/internet-headers).
* Ability to run within messages and calendar items in [shared mailboxes or shared folders](/office/dev/add-ins/outlook/delegate-access).

# [**Message extension**](#tab/messaging-extension)

Create a message extension if your app requires any of the following scenarios:

* Ability to work in both Teams chat and Teams calendar items, as well as Outlook email messages and calendar items.
* Ability to use [Adaptive Cards](../task-modules-and-cards/cards/design-effective-cards.md) as the canvas for the inserted content.
* Ability to use [link unfurling](../messaging-extensions/how-to/link-unfurling.md), that is, to insert a rich preview of a link.

---

## Scenarios for Outlook add-in and message extension

The following examples show the recommended app type for different scenarios based on the task:

### Customer relation management

| Scenario | App type |
|:--|:--|
| Save a lead that came on email into Customer Relation Management (CRM).| Outlook add-in |
| Find and insert lead details into an email or meeting invitation. | Message extension |
| Insert boilerplate responses from CRM into message or invitation body. | Message extension |
| Track email open rates (by inserting a tracking pixel). | Outlook add-in |
| Log email or meeting or engagement in Outlook into CRM. | Outlook add-in |

### Security

| Scenario | App type |
|:--|:--|
| Mark an email as spam. | Outlook add-in |
| Send test or mock emails for training and tracking action rates. | Outlook add-in |
| Read or set the [Microsoft Information Protection (MIP)](https://techcommunity.microsoft.com/t5/security-compliance-and-identity/announcing-new-microsoft-information-protection-capabilities-to/ba-p/1999692) label on an email based on business rules. | Outlook add-in |
| Encrypt and decrypt emails and attachments based on business rules. |Outlook add-in |

### Attachment management

| Scenario | App type |
|:--|:--|
| Save attachments in email into cloud storage. | Outlook add-in |
| Attach files from cloud storage to a message or invitation. | Message extension |

### Meeting management

| Scenario | App type |
|:--|:--|
| Insert a meeting link into an invitation. | Outlook add-in |
| Customize a meeting link based on the recipients, the meeting time, and other contextual facts. | Outlook add-in |
| Update a meeting link when the meeting is updated. | Outlook add-in |
| Reply with a **Meet Now** invitation. | Message extension |

### Signature management

| Scenario | App type |
|:--|:--|
| Insert a signature in mail message automatically. | Outlook add-in |
| Customize a signature based on the recipients, new thread or reply, and other contextual facts. | Outlook add-in |
| Synchronize a signature across devices. | Outlook add-in |
| Enable administrator management of signatures for an organization. | Outlook add-in |

## See also

* [Extend Teams apps across Microsoft 365](overview.md)
* [Extend a Teams message extension across Microsoft 365](extend-m365-teams-message-extension.md)
