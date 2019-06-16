---
title: Guidelines for apps on mobile clients
description: Outlines the steps necessary for making your app work well on the Teams mobile client 
keywords: mobile design tablets tabs personal app
---
# Guidelines for apps on mobile clients

In general, apps on the Teams mobile client behave as you would expect. Web-based content needs to be responsive and render correctly across multiple device sizes, including tablet sizes. If you make use of adaptive cards, you can expect that they will resize themselves appropriately.

If you intend to publish your app the AppSource, you need to ensure your app functions well on mobile, and follows our [publishing guidance](~/publishing/apps-publish.md#microsoft-teams-app-approval-process)

## Personal apps

> [!Note]
> Personal apps on mobile clients are in [Developer Preview](~/resources/dev-preview/developer-preview-intro.md).

Personal apps consist of one or more personal (static) tabs, and/or a one-to-one bot. They are pinable to the left navigation rail on desktop clients, and appear in the app tray at the bottom of the mobile client.

Key considerations for personal apps include:

* Upgrade your Teams JS SDK to v1.4.1 at a minimum.
* Apps should render appropriately across various screen sizes and densities.
* Mobile connections can be significantly less reliable. Ensure your app can handle low-bandwith and intermittent connections.
* If you choose, you can use your `websiteUrl` to provide your users the option of loading your app outside of Teams. Your `contentUrl` will still be loaded when users initially open your app, then they will be provided the option to open the app in a browser.
* If you use authentication, be sure to test across multiple clients and browser scenarios.

## Capabilities not available on mobile

The following capabilities are not available on mobile clients:

* Group and channel tabs
* Using the Azure Bot Service for authentication
* Action-based messaging extension commands
