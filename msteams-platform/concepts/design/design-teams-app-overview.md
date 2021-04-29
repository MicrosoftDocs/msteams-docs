---
title: Designing your custom app
author: heath-hamilton
description: Learn how to design Microsoft Teams apps. Resources include the Microsoft Teams UI Kit, best practices, examples, and more.
localization_priority: Normal
ms.author: lajanuar
ms.topic: overview
---
# Designing your Microsoft Teams app

:::image type="content" source="../../assets/images/design-guidelines-overview.png" alt-text="Conceptual image introducing the Microsoft Teams design guidelines.":::

Whether you're a designer, product manager, developer, or maker using low-code tools, these guidelines can help you quickly make the right design decisions for your Microsoft Teams app.

## Teams app design principles

Teams apps help people achieve more together. Use these principles to guide your design.

:::row:::
   :::column span="":::

### Collaborative

Teams apps help people achieve more together. Use these principles to guide your design.

   :::column-end:::
   :::column span="":::

### Trustworthy

The app is secure and compliant. Users can easily find information about privacy.

   :::column-end:::
:::row-end:::

:::row:::
   :::column span="":::

### Globally inclusive

People of all backgrounds, skillsets, and disciplines can use the app. It’s culturally, racially, and socially aware.

   :::column-end:::
   :::column span="":::

### Light

The app focuses on core scenarios that blend with Teams workflows.

   :::column-end:::
:::row-end:::

:::row:::
   :::column span="":::

### Native or distinct

The app uses native Teams design components or your own. There’s no blend of color schemes, controls, etc.

   :::column-end:::
   :::column span="":::

### Useful

The app is based on a scenario people need to do in Teams.

   :::column-end:::
:::row-end:::

:::row:::
   :::column span="":::

### Easy to use

The UI is easy to understand, pleasant in look and tone, and makes people more productive.

   :::column-end:::
   :::column span="":::

### Responsive

The app is device and screen agnostic.

   :::column-end:::
:::row-end:::

:::row:::
   :::column span="":::

### Accessible

The app meets Teams accessibility requirements in terms of color contrast, navigation alternatives, and more.

   :::column-end:::
   :::column span="":::

### Well described

Text, icons, and images make it clear what the app is for and how to use it.

   :::column-end:::
:::row-end:::

## Creating a cohesive experience

Designing a Teams app is like designing a conventional web app—but also a little different. An effective design highlights your app's unique attributes while fitting naturally with Teams features and contexts.

These guidelines and resources can help you strike that balance. You'll know what to do and what to avoid when designing your Teams app (such as multi-level navigation in a tab).

## Planning your app

To design a high-quality Teams app, you must first understand what you want your app to do and how you think people will use it. If you haven't already, take some time to properly [plan your app](../../concepts/extensibility-points.md).

## Design fundamentals

Learn the [fundamentals of Teams app design](design-teams-app-fundamentals.md), including layout, color schemes, and more.

## Basic Fluent UI components for Teams

Based on Fluent UI, these are the [core elements for creating familiar Teams interfaces](design-teams-app-basic-ui-components.md).

## UI templates

Quickly create complex, high-fidelity designs with [templates for common Teams use cases and workflows](design-teams-app-ui-templates.md).

## App capabilities

Understand how people add, use, and manage Teams apps to make the most of each capability in your design.

* [Personal apps](../../concepts/design/personal-apps.md)
* [Tabs](../../tabs/design/tabs.md)
* [Messaging extensions](../../messaging-extensions/design/messaging-extension-design.md)
* [Bots](../../bots/design/bots.md)
* [Meeting extensions](../../apps-in-teams-meetings/design/designing-apps-in-meetings.md)
* [Task modules](../../task-modules-and-cards/task-modules/design-teams-task-modules.md)
* [Adaptive Cards](../../task-modules-and-cards/cards/design-effective-cards.md)

## App customization

Understand how the Teams admin can customize or rebrand the app based on the organization's need. This customization is enabled if you define the `configurableProperties` in the manifest schema. For more information, see [Customize apps in Microsoft Teams](/MicrosoftTeams/customize-apps).

> [!NOTE]
> This feature is currently available in developer preview only.
> 
> App customization enables admins to change the look-and-feel of the apps loaded through bots, messaging extensions, tabs, and connectors. For example, if the Teams admin customizes the name of an app from *Contoso* to *Contoso Agent*, then the app will appear with the new name *Contoso Agent* to users. However, while adding a connector to a chat, in the list the connectors will still show the name of the app as *Contoso*.
> 
> As a best practice, you must provide customization guidelines for app users and customers to follow when customizing your app. For more information, see [customize apps in Microsoft Teams](/MicrosoftTeams/customize-apps).

## Tools and samples

The following tools can help designers and developers get started:

### Microsoft Teams UI Kit

Design a Teams app with UI components, templates, and examples that you can drag, drop, and modify as needed. The UI kit also includes comprehensive information about how apps should look and behave in different Teams scenarios.

> [!div class="nextstepaction"]
> [Get the UI kit (Figma)](https://www.figma.com/community/file/916836509871353159)

### Microsoft Teams UI Library

View and test individual Teams UI templates and related components in your browser.

> [!div class="nextstepaction"]
> [Try the UI library (playground)](https://dev-int.teams.microsoft.com/storybook/main/index.html)

Import these templates and related components directly into your Teams app project.

> [!div class="nextstepaction"]
> [Get the UI library (GitHub)](https://github.com/OfficeDev/microsoft-teams-ui-component-library)

### Sample app

Install a sample app to see how UI templates look and behave within Teams contexts.

> [!div class="nextstepaction"]
> [Get the sample app (GitHub)](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/tab-ui-templates/ts)

## Other resources

To learn more, try one of the following resources.

### Fluent UI documentation

Get code samples and implementation details for the Fluent UI-based components used to build Teams experiences.

> [!div class="nextstepaction"]
> [Try Teams UI components (Fluent UI)](https://fluentsite.z22.web.core.windows.net/)

### Adaptive Cards designer

Design Adaptive Cards in our web-based tool.

> [!div class="nextstepaction"]
> [Try the Adaptive Cards designer](https://adaptivecards.io/designer/)
