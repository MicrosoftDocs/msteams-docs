---
title: Third-party cookies deprecation
description: Learn about the deprecation of third-party cookies and its impact on authentication scenarios in embedded iframes.
ms.topic: reference
ms.localizationpriority: medium
ms.author: v-sdhakshina
ms.date: 10/10/2024
---

# Third-party cookies deprecation

All third-party (3P) cookies set in the top-level domain will be blocked when that domain is embedded in an iframe. This 3P cookie deprecation is starting to roll out for all major browsers, with Chrome currently at 1% rollout and other major browsers like Firefox and Safari to follow. Some common scenarios that will be impacted include when an external app is rendered inside Teams in various entry points like personal apps, channel tabs, chat tabs, etc.

## Pop-out authentication scenario, and will this change break pop-out authentication scenarios?

Pop-out authentication scenarios are a common method for apps to authenticate using different auth providers like Google Auth, Facebook Auth, etc. In this scenario, the rendered iframe triggers a popup that loads the selected auth provider login page. Once the user logs in, the popup redirects to the domain of the opening app, where an authentication cookie is set, and the popup closes. These cookies are then used inside the embedded iframe to authenticate the user.

No, pop-out authentication will not break with 3P cookie deprecation. Chromium-based browsers like Chrome, Edge, and Firefox (not Chromium-based but their cookie deprecation is in line with Chromium browsers) have heuristics in place. These heuristics allow access to cookies that are unpartitioned, secure, and SameSite=None when set in a popped-out window from the iframe to be accessible in the iframe. You can use the cookie app below to simulate this. Embed the cookie app in an iframe, use the pop-out button to pop it out as a first-party domain, navigate to the partitioned cookie page, and click "Set Cookies Using API." This will set multiple cookies with a combination of secure, SameSite, and partitioned attributes. Note that only SameSite=None, secure, and unpartitioned cookies are accessible in the iframe.

The following screenshot represents the cookies that are accessible in the embedded iframe when set from the top-level popped-out window of the iframe’s URL.

## Required actions for cookies set by iframe

Any cookies set by the embedded iframe now need to also pass the Partitioned attribute to be false. Chromium browsers will enable CHIPS (Cookies Having Independent Partitioned State), and cookies with a missing partitioned attribute will not be set.
