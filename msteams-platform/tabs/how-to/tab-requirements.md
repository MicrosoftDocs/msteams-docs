---
title: Understanding tab requirements
author: laujan
description: Every tab in Microsoft Teams must adhere to these requirements.
keywords: teams tabs group channel configurable 
ms.topic: conceptual
ms.author: lajanuar
---
# Tab requirements

Teams tabs must adhere to the following requirements:

* You must allow your tab pages to serve in an iFrame, through X-Frame-Options and Content-Security-Policy HTTP response headers.
  * Set header: `Content-Security-Policy: frame-ancestors teams.microsoft.com *.teams.microsoft.com *.skype.com`
  * For Internet Explorer 11 compatibility, set `X-Content-Security-Policy` as well.
  * Alternatively, set header `X-Frame-Options: ALLOW-FROM https://teams.microsoft.com/`. This header is deprecated but still respected by most browsers.
* To safeguard against click-jacking, sign in pages do not render in iFrames. Your authentication logic must use a method other than redirect. For example, use token-based or cookie-based authentication.

> [!NOTE]
> Chrome 80, scheduled for release in early 2020, introduces new cookie values and imposes cookie policies by default. It is recommended that you set the intended use for your cookies rather than rely on default browser behavior. *See* [SameSite cookie attribute (2020 update)](../../resources/samesite-cookie-update.md).

* Browsers adhere to a same-origin policy restriction that prevents a webpage from making requests to a different domain than the one that served a web page. You must redirect the configuration or content page to a another domain or subdomain. Your cross-domain navigation logic must allow the Teams client to validate the origin against a static validDomains list in the app manifest when loading or communicating with the tab.

* To create a seamless experience, you must style your tabs based on the Teams client's theme, design, and intent. Tabs work best when they are built to address a specific need and focus on a small set of tasks or a subset of data that is relevant to the tab's channel location.

* Add a reference to [Microsoft Teams JavaScript client SDK](/javascript/api/overview/msteams-client) using script tags within your content page. Following your page load, make a call to `microsoftTeams.initialize()` to display your page.

* For authentication, you must upgrade your Teams JavaScript SDK to version 1.4.1 to work on mobile clients.

* If you choose to have your channel or group tab appear on Teams mobile clients, the `setSettings()` configuration must have a value for the `websiteUrl` property.