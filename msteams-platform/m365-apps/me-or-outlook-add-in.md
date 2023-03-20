---
title: Decide between creating a messaging extension or an Outlook add-in
description: Learn how to decide whether your Microsoft 365 app should be messaging extension or an Outlook add-in.
ms.date: 01/05/2023
ms.topic: conceptual
ms.custom: m365apps
ms.localizationpriority: medium
---
# Decide between creating a messaging extension or an Outlook add-in

Messaging extensions and Outlook add-ins add rich, interactive content to email messages and meeting invitations. This article helps you decide to create a messaging extension or an Outlook add-in for your app based on your scenario.

> [!NOTE]
> If your app includes scenarios from Outlook add-in and messaging extension, then you need to create both the apps, a messaging extension and an Outlook add-in (which can be hosted at the same domain and share files). We are working on a system that enables you to combine these into a single app. We'll update this article when that system is available.

## General guidance

# [**Outlook add-in**](#tab/outlook-add-in)

Create an Outlook add-in if your app requires any of the following scenarios:

* Access to the properties of email messages or calendar items.
* Ability to respond automatically to changes in the properties of email messages or calendar items.
* Access to the content of email messages and calendar items with fine-grained read or write access given in the [Outlook add-in APIs](/office/dev/add-ins/outlook/apis).
* Read or write access to the user's mailbox. (Requires the [Outlook add-in APIs](/office/dev/add-ins/outlook/apis))
* Ability to start up automatically in response to events without explicit user action. For more information, see [Event-based activation](/office/dev/add-ins/outlook/autolaunch).
* Ability to manipulate Outlook-specific settings, such as [custom properties](/office/dev/add-ins/outlook/metadata-for-an-outlook-add-in) and [internet headers](/office/dev/add-ins/outlook/internet-headers).
* Ability to run messages and calendar items in [shared mailboxes or shared folders](/office/dev/add-ins/outlook/delegate-access).

# [**Messaging extension**](#tab/messaging-extension)

Create a messaging extension if your app requires any of the following scenarios:

* Ability to work in both Teams chat and Teams calendar items, as well as Outlook email messages and calendar items.
* Ability to use [Adaptive Cards](../task-modules-and-cards/cards/design-effective-cards.md) as the canvas for the inserted content.
* Ability to use [link unfurling](../messaging-extensions/how-to/link-unfurling.md); that is, to insert a rich preview of a link.

---

## Example applications of the guidance

The following examples show the recommended app type for a scenario, based on the task:

### Customer Relation Management

| Scenario | App type |
|:--|:--|
| Save a lead that came on email into Customer Relation Management (CRM).| add-in |
| Find and insert lead details into an email or meeting invitation | messaging extension |
| Insert boilerplate responses from CRM into message or invitation body | messaging extension |
| Track email open rates (by inserting a tracking pixel). | add-in |
| Log email/meeting/engagement in Outlook into CRM. | add-in |

### Security

| Scenario | App type |
|:--|:--|
| Marking an email as spam. | add-in |
| Send test or mock emails for training and tracking action rates. | add-in |
| Reading or setting the [Microsoft Information Protection (MIP)](https://techcommunity.microsoft.com/t5/security-compliance-and-identity/announcing-new-microsoft-information-protection-capabilities-to/ba-p/1999692) label on an email based on business rules. | add-in |
| Encrypt and decrypt emails and attachments based on business rules. | add-in |

### Attachment management

| Scenario | App type |
|:--|:--|
| Save attachments in email into cloud storage. | add-in |
| Attach files from cloud storage to a message or invitation. | messaging extension |

### Meeting management

| Scenario | App type |
|:--|:--|
| Insert a meeting link into an invitation. | add-in |
| Customize a meeting link based on the recipients, the meeting time, and other contextual facts. | add-in |
| Updating a meeting link when the meeting is updated. | add-in |
| Reply with a **Meet Now** invitation. | messaging extension |

### Signature management

| Scenario | App type |
|:--|:--|
| Automatically insert a signature in mail message. | add-in |
| Customize a signature based on the recipients, new thread or reply, and other contextual facts. | add-in |
| Synchronize a signature across devices. | add-in |
| Administrator management of signatures for an organization. | add-in |
