---
title: Design your app with advanced UI components
author: heath-hamilton
description: Learn about the Teams UI components, such as breadcrumbs, notification bar, stage view along with relevant use cases. 
ms.author: surbhigupta
ms.localizationpriority: medium
ms.topic: reference
---
# Designing your Microsoft Teams app with advanced UI components

The following components are a combination of [basic UI components](~/concepts/design/design-teams-app-basic-ui-components.md) that you can use for common Teams design situations, such as navigation.

## Microsoft Teams UI Kit

Based on [Fluent UI](https://react.fluentui.dev/?path=/docs/), the Microsoft Teams UI Kit includes components and patterns that are designed specifically for building Teams apps. In the UI kit, you can grab and insert the components listed here directly into your design and see more examples of how to use each component.

> [!div class="nextstepaction"]
> [Get the Microsoft Teams UI Kit (Figma)](https://www.figma.com/community/file/916836509871353159)

## Breadcrumb

Breadcrumbs are a navigational aid that convey your app’s hierarchy. They help users understand how the page they’re viewing fits into the overall experience and afford one-click access to higher levels in that hierarchy.

### Top use cases

* Communicate hierarchy
* Navigation

### Mobile

:::image type="content" source="../../assets/images/ui-templates/mobile-breadcrumb.png" alt-text="Example shows a breadcrumb template on mobile.":::

### Desktop

:::image type="content" source="../../assets/images/ui-templates/breadcrumb.png" alt-text="Example shows a breadcrumb template on desktop.":::

## Left nav

Use the left nav to browse multiple pages within your Teams tab. In the following example, the left nav is between the channel list and tab content.

### Top use cases

* Browse multiple pages within a Teams tab.
* Break down complex apps into multiple pages.

### Mobile

:::image type="content" source="../../assets/images/ui-templates/mobile-left-nav.png" alt-text="Example shows a left nav template on mobile.":::

### Desktop

:::image type="content" source="../../assets/images/ui-templates/left-nav.png" alt-text="Example shows a left nav template on desktop.":::

## Notification bar

A notification bar is a dedicated area for displaying a brief, important messages that do not require the user to take immediate action. Specific background colors and icons are associated with specific types of messages (see below).

You can implement a notification bar using the Fluent UI [alert](https://react.fluentui.dev/?path=/docs/preview-components-alert--default) component.

### Top use cases

* Critical messages, errors, and warnings
* Success messages
* Informational or promotional messages

### Mobile

:::image type="content" source="../../assets/images/ui-templates/mobile-notification-bar.png" alt-text="Example shows notification bar UI template on mobile.":::

### Desktop

:::image type="content" source="../../assets/images/ui-templates/notification-bar.png" alt-text="Example shows notification bar UI templates on desktop.":::

## Stage view

Stage view lets users see content—like an image, file, or website—on a large surface in Teams without switching context. This component is primarily for viewing content. Don't use it for complex interactions.

See how to implement [stage view](~/tabs/tabs-link-unfurling.md).

### Top use cases

* Display content in a large surface within Teams instead of another app or browser
* Spotlight media or other rich content

### Mobile

Your app can launch a stage from an Adaptive Card, shared link, or visual components (such as a chart).

:::image type="content" source="../../assets/images/ui-templates/mobile-stage.png" alt-text="Example shows a stage template on mobile.":::

### Desktop

:::image type="content" source="../../assets/images/ui-templates/stage.png" alt-text="Example shows a stage template on desktop.":::

## Toolbar

A toolbar is a container for grouping a set of controls.

### Top use cases

* Contextual actions on app content.
* Contextual filter and find.
* Navigation and breadcrumbs.

### Mobile

:::image type="content" source="../../assets/images/ui-templates/mobile-toolbar.png" alt-text="Example shows a toolbar template on mobile.":::

### Desktop

:::image type="content" source="../../assets/images/ui-templates/toolbar.png" alt-text="Example shows a toolbar template on desktop.":::
