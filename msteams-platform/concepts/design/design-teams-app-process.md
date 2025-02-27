---
title: App design process  
author: heath-hamilton  
description: Learn how to use Microsoft Teams design tools such as Teams UI Kit, resources, and UX flows to design an effective Microsoft Teams app.  
ms.localizationpriority: medium  
ms.author: surbhigupta  
ms.topic: overview  
ms.date: 01/07/2024  
---

# Design Process for Microsoft Teams Apps

There are multiple tools and resources for designing your Microsoft Teams app. The following steps describe when and how you might use these tools during the design process. (Some steps might be technically outside the design process but are included for additional context.)

:::image type="content" source="~/assets/images/design-guidelines/teams-app-design-process.png" alt-text="Diagram showing an example of the Teams app design process.":::

## Plan Your App

Designing a high-quality Teams app requires understanding the following details:

- Who are your users?
- What’s their problem?
- How can your app solve their problem?
- How often will your app be used?
- How many people will use your app?
- What kind of return on investment can your app provide?

For more information, see:

- [Understand your app’s use cases](~/concepts/design/understand-use-cases.md)
- [Map use cases to Teams](~/concepts/design/map-use-cases.md)

## Get Teams Design Tools

Microsoft provides tools to facilitate designing your Teams app. At a minimum, we strongly recommend using the Microsoft Teams UI Kit.

### Get the Microsoft Teams UI Kit

The Microsoft Teams UI Kit can help you develop an effective Teams app quickly. It includes:

- Extensive examples and variations
- Prebuilt templates and components

> **Tip:** If you have any role in creating a Teams app, the UI Kit will be beneficial. This is true for designers, product managers, developers, and those using low-code tools like the Microsoft Power Platform.

Steps to get the UI Kit:

1. Go to the [Microsoft Teams UI Kit Figma page](https://www.figma.com/community/file/916836509871353159).
2. Select **Duplicate** to open the UI kit. (You might need to create a Figma account first.)

### Try the Sample App

You can upload a sample app to understand how apps should look and behave in the Teams client.

> [Get the sample app (GitHub)](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/tab-ui-templates/ts)

## Learn Teams Design System

Familiarize yourself with the [fundamentals of Teams app design](design-teams-app-fundamentals.md), including layout, color schemes, and more.

## Choose App Capabilities

After planning, determine which Teams capabilities fit your app’s use cases. For example, if you want to proactively notify users, a bot might be the appropriate capability. Follow these steps:

1. In the UI kit’s left nav, go to **App capabilities** and select the desired capability.
2. Copy and utilize the prebuilt designs provided.

## Design Your UX Flow

Once you have a basic app design, modify and refine it using Teams UI templates and basic components from the UI Kit.

### Design with UI Templates

UI templates offer complex, high-fidelity designs for common Teams use cases and workflows. For efficiency, utilize these instead of starting from scratch:

1. Navigate to **UI templates** in the UI kit’s left nav.
2. Copy templates that fit your app design.

### Design with Basic UI Components

Fluent UI-based components provide core elements for Teams interfaces:

1. Navigate to **Basic UI components** in the UI kit’s left nav.
2. Copy necessary components (for example, a button or toggle).

## Implement Your Design

Upon completing the design, begin building. Use the following tool for simplifying front-end development:

> [Get the library (Fluent UI)](https://react.fluentui.dev/?path=/docs/)

## Review Design Resources

Regularly review the following resources, whether starting or nearing a production-ready app:

- **Microsoft Teams Store validation guidelines**: Ensure your app meets the standards detailed in the [guidelines](~/concepts/deploy-and-publish/appsource/prepare/teams-store-validation-guidelines.md).
- **Design best practices**: Utilize the best practices outlined in these docs and the UI Kit. For example, see [best practices for designing bots](~/bots/design/bots.md#best-practices).

## See Also

- [Designing activity feed notifications](~/concepts/design/activity-feed-notifications.md)