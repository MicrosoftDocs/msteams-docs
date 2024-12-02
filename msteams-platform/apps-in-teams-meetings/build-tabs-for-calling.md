---
title: Create Tab Apps for PSTN Calls
author: surbhigupta
description: Learn to build a tab for initiating PSTN Calls from within Teams
ms.topic: conceptual
ms.author: surbhigupta
ms.localizationpriority: high
ms.date: 12/02/2024
---

# Build tabs for PSTN calling extensibility

You can now create personal scope apps that integrate seamlessly with Public Switched Telephone Network (PSTN) and Teams-to-Teams calls. By using the right scope and context, you can build apps that utilize tab type, static scope, personal context, and meeting side panels effectively.

This integration is simple. You can create a new personal tab app or update an existing tab app with personal scope and the appropriate context. It ensures calling functionality across different communication mediums. Although PSTN traditionally doesn't support apps due to the lack of a chat thread, passing the caller ID to the app allows it to display relevant information such as active cases or billing issues. This enhances the app's utility and provides a richer experience for users during calls.

## Enable PSTN calls for your tabs

Update your [app manifest](/microsoftteams/platform/resources/schema/manifest-schema#statictabs) with relevant context property to configure the different tab views. The meetings app capabilities are declared in your app manifest using the scopes and context arrays under the `staticTabs` section.

### Scope

The scope defines who can access the apps.

* `personal` scope makes your app available in a personal scope and enables the app to make a call.

### Context

The `context` property determines if the app is available in specific view after installation and configuration. Following are the values for the `context` property from which you can use all or some of the values:

|Value|Description|
|---|---|
| **meetingSidePanel** | An in-meeting panel opened through the unified bar (U-bar). |

### Configure tab app for PSTN calls

You can integrate PSTN calls in personal tab apps using the `meetingSidePanel` contexts. The following code snippet is an example of a configurable tab used in an app for Teams meetings:
