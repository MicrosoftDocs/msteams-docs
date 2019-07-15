---
title: Tabs on mobile
description: Describes the guidelines for designing a personal app
keywords: teams design guidelines reference framework personal apps mobile
---
# Tabs on mobile

> [!Note]
> Personal apps (static tabs) on mobile are currently in [developer preview](~/resources/dev-preview/developer-preview-intro.md). Static tabs on a mobile client with developer preview enabled will open their content URL within the Teams mobile client. Custom channel and group tabs are not currently supported, however you should follow the guidance below when creating your channel/group tab in preparation for them being supported on mobile clients.

Personal apps (apps that contain static tabs and/or a one-to-one bot) are available on mobile clients in the App Drawer. They can only be installed from a desktop or web client, and can take up to 24 hours to appear on mobile clients.

Once launched, your tab's `contentUrl` will be loaded inside the Teams mobile client.

![mobile app drawer](~/assets/images/dev-preview/app-drawer.png)

## Developer considerations for mobile support

When you're building an app that includes a tab, you need to consider (and test) how your tab will function on both the Android and iOS Microsoft Teams clients. The sections below outline some of the key scenarios you need to consider.

### Testing on mobile clients

You need to validate that your tab functions properly on mobile devices of various sizes and qualities. For Android devices you can use the [DevTools](~/resources/dev-preview/developer-preview-tools.md) to debug your tab while it is running. We recommend that you test on both high and low performing devices, as well as on a tablet.

### Responsive design

Because your tab can be opened on devices with a wide range of screen sizes, it needs to follow [responsive design](https://www.w3schools.com/html/html_responsive.asp) principles. All of the key constructs should be accessible on mobile devices, and the views should not be distorted. Ensure that when your tab is loaded on a mobile device, all buttons and links are easily accessible using finger-based navigation.

### Authentication

For authentication to work on mobile clients, you must upgrade you Teams JS SDK to at least version 1.4.1.

### Low bandwith & intermittent connections

Mobile clients regularly need to function with low bandwith and intermittent connections. Your app should handle any timeouts appropriately by providing a contextual message to the user. You should also user progress indicators to provide feedback to your users for any long-running processes.

## Design considerations for mobile

adsf