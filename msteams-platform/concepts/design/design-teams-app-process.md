---
title: App design process
author: heath-hamilton
description: Learn how and when you might use Microsoft tools and resources to design an effective Microsoft Teams app.
ms.localizationpriority: mediums
ms.author: surbhigupta
ms.topic: overview
---
# Design process for Microsoft Teams apps

There are multiple tools and resources for designing your Microsoft Teams app. The following steps describe when and how you might use these during the design process. (Some of steps might be technically outside the design process but are included for additional context.)

:::image type="content" source="~/assets/images/design-guidelines/teams-app-design-process.png" alt-text="Diagram showing an example of the Teams app design process.":::

## Plan your app

Designing a high-quality Teams app requires understanding what you want the app to do and how you think people will use it. Before you start designing, however, answer the following questions:

* Who are your users?
* What’s their problem?
* How can your app solve their problem?
* How often will your app be used?
* How many people will use your app?
* What kind of return on investment can your app provide?

For more information, see [understand your app’s use cases](~/concepts/design/understand-use-cases.md) and [map use cases to Teams](~/concepts/design/map-use-cases.md).

## Get Teams design tools

Microsoft provides tools to make it easier to design your Teams app. At minimum, we strongly recommend using the Microsoft Teams UI Kit.

### Get the Microsoft Teams UI Kit

The Microsoft Teams UI Kit can help you develop an effective Teams app in the shortest amount of time. The UI kit has everything you see in these docs related to Teams app design and much more, including extensive examples and variations.

The UI kit also has pre-built templates and components that you can copy and modify as needed, so you can spend more time designing the best user experience instead worrying about what a button should look like.

> [!TIP]
> **Is the UI kit for me?** If you have any part in creating a Teams app, yes. Understanding how to craft a Teams app is not only helpful to designers but product managers, developers using IDEs, and makers building with low-code tools (such as the Microsoft Power Platform).

1. Go to the [Microsoft Teams UI Kit Figma page](https://www.figma.com/community/file/916836509871353159).
1. Select **Duplicate** to open the UI kit. (You may have to first create a Figma account.)

### Try the sample app

You can upload a sample app to see how apps should look and behave in the Teams client.

> [!div class="nextstepaction"]
> [Get the sample app (GitHub)](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/tab-ui-templates/ts)

## Learn Teams design system

Read in depth about or at least familiarize yourself with the [fundamentals of Teams app design](design-teams-app-fundamentals.md), including layout, color schemes, and more.

## Choose app capabilities

After the planning phase, you can determine which Teams capabilities fit your app’s use cases. For example, if you want to proactively notify people, a bot might be the right capability.

The UI kit has pre built designs that show you how people typically add, set up, use, and manage each capability. For quick reference, this information is also in these docs, but with the UI kit you can copy and paste any of these designs into your app’s design.

1. In the UI kit’s left nav, go to **App capabilities** and select the capability you want for your app.
1. Copy what you need from that page to design your app.<br />
   For example, if your app supports authentication with single sign-on, copy and paste the design for handling that exact scenario.

## Design your UX flow

Once you have a basic app design, you can modify and refine it as much as you want by copying Teams UI templates and basic components from the UI kit.

### Design with UI templates

UI templates are complex, high-fidelity designs for common Teams use cases and workflows. Instead of starting from the bottom up with basic components, we recommend you use these templates to simplify and speed up the design process.

1. In the UI kit’s left nav, go to **UI templates**.
1. Copy templates that make sense for your app design.<br />
   For example, if you’re designing a personal app, you may want to use a Dashboard template.

### Design with basic UI components

Based on Fluent UI, these are the core elements for creating familiar Teams interfaces. Use these components if a UI template is missing something you need or you just want to design your app from scratch.

1. In the UI kit’s left nav, go to **Basic UI components**.
1. Copy the components you need for your app design (for example, a button or toggle).

## Implement your design

The design is done and you’re ready to start building. The following tools can help simplify the front-end development of your app.

### Build with UI templates

If you used UI templates in your design, you can implement these templates with the Microsoft Teams UI Library (a React component library based on Fluent UI).

Currently, not all templates listed in the UI kit are available in the library.

> [!div class="nextstepaction"]
> [Get the library (GitHub)](https://github.com/OfficeDev/microsoft-teams-ui-component-library)

### Build with basic UI components

Not unlike the design phase, you can use these Fluent UI components in your app project if a UI template is missing something you need, or you just want to build the app from scratch. 

(Note: If you notice something missing or have an idea for a template, consider contributing to the Teams UI Library repo.)

> [!div class="nextstepaction"]
> [Get the library (Fluent UI)](https://fluentsite.z22.web.core.windows.net/)

## Review design resources

Whether you’re just starting on your app or close to a production-ready app, we recommend that you periodically review the following resources:

* **Microsoft Teams store validation guidelines**: Provides standards that all Teams apps should strive for, and not just apps listed in the store. For more information, see the [guidelines](~/concepts/deploy-and-publish/appsource/prepare/teams-store-validation-guidelines.md).
* **Design best practices**: These docs and the UI kit provide best practices for designing high-quality apps. For example, see the [best practices for designing bots](~/bots/design/bots.md#best-practices).

## See also

[Designing activity feed notifications](~/concepts/design/activity-feed-notifications.md)
