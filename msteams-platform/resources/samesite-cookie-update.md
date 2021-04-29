---
title: Microsoft Teams and the SameSite cookie attribute (2020 update)
author: laujan
description: describes the attributes of SameSite cookie
keywords: cookie attributes samesite
ms.topic: reference
localization_priority: Normal
ms.author: lomeybur
---

# Microsoft Teams and the SameSite cookie attribute (2020 update)

## Cookies in brief

 Cookies are text strings, sent from websites, and stored on a computer by the web browser. They're typically used for authentication and personalization, e.g., recalling stateful information, preserving user settings, recording browsing activity, and displaying relevant ads. Cookies are always linked to a particular domain and can be installed by various parties. They are categorized as follows:

 |Cookie|Scope|
 | ------ | ------ |
 |**First-party cookie**|A first-party cookie is created by websites that a user visits and is used to save data such as shopping cart items, login credentials (e.g., authentication cookies), and other analytics.|
 |**Second-party cookie**|A second-party cookies is technically the same as a first-party  cookie. The difference is that data is shared with a second party via a data partnership agreement (e.g., [Microsoft Teams analytics and reporting](/microsoftteams/teams-analytics-and-reports/teams-reporting-reference)). |
 |**Third-party cookie**|A third-party cookie is installed by a domain other than the one the user explicitly visited and is mainly used for tracking (e.g. "Like" buttons), ad serving, and live chats.|

### Cookies and HTTP requests

Before the introduction of SameSite restrictions, when cookies were stored on the browser, they were attached to *every* HTTP web request and sent to the server by the Set-Cookie HTTP response header. Predictably, that performance had the potential to introduce security vulnerabilities such as Cross-Site Request Forgery (CSRF) attacks. *See* [HTTP cookies](https://developer.mozilla.org/docs/Web/HTTP/Cookies). The SameSite component mitigated that exposure through its implementation and management in the SetCookie header.

### SameSite attribute: initial release

Google Chrome version 51 introduced the SetCookie SameSite specification as an *optional* attribute. Starting with Build 17672, Windows 10 introduced SameSite cookie support for the [Microsoft Edge browser](https://blogs.windows.com/msedgedev/2018/05/17/samesite-cookies-microsoft-edge-internet-explorer/).

Developers could opt out of adding the SameSite cookie attribute to the SetCookie header or they could add it with one of two settings, *Lax* and *Strict*. An unimplemented SameSite attribute was considered the default state.

## SameSite cookie attribute: 2020 release

Chrome 80, scheduled for release in February 2020, introduces new cookie values and imposes cookie policies by default. Three values can be passed into the updated SameSite attribute: *Strict*, *Lax*, or *None*. Cookies that don't specify the SameSite attribute will default to `SameSite=Lax`.

|Setting | Enforcement | Value |Attribute Specification |
| -------- | ----------- | --------|--------|
| **Lax**  | Cookies will be sent automatically only in a *first-party* context and with HTTP GET requests. SameSite cookies will be withheld on cross-site sub-requests, such as calls to load images or iframes, but will be sent when a user navigates to the URL from an external site, for example, by following a link.| **Default** |`Set-Cookie: key=value; SameSite=Lax`|
| **Strict** |The browser will only send cookies for first-party context requests (requests originating from the site that set the cookie). If the request originated from a different URL than that of the current location, none of the cookies tagged with the `Strict` attribute will be sent.| Optional |`Set-Cookie: key=value; SameSite=Strict`|
| **None** | Cookies will be sent in both first-party context and cross-origin requests; however, the value must be explicitly set to **`None`** and all browser requests **must follow the HTTPS protocol** and include the **`Secure`** attribute which requires an encrypted connection. Cookies that don't adhere to that requirement will be **rejected**. <br/>**Both attributes are required together**. If just **`None`** is specified without **`Secure`**  or if the HTTPS protocol is not used, the third-party cookie will be rejected.| Optional, but, if set, the HTTPS protocol is required. |`Set-Cookie: key=value; SameSite=None; Secure` |

## Teams implications and adjustments

1. Enable the relevant SameSite setting for your cookies and validate that your apps and extensions continue to work in Teams.
1. If your apps or extensions fail, make the necessary fixes prior to the Chrome 80 release.
1. Microsoft internal partners can join the following team if they need more information or help with this issue: <https://teams.microsoft.com/l/team/19%3A08b594cd465e4c0491fb751e823802e2%40thread.skype/conversations?groupId=4d6d04cd-dbf0-43c8-a2ff-f80dd38be034&tenantId=72f988bf-86f1-41af-91ab-2d7cd011db47>.

> [!NOTE]
> For best practice, it is recommended that you always set SameSite attributes to reflect the intended use for your cookies. Do not rely on default browser behavior. For more information, see [Developers: Get Ready for New SameSite=None; Secure Cookie Settings](https://blog.chromium.org/2019/10/developers-get-ready-for-new.html).

### Tabs, task modules, and message extensions

* Teams tabs use `<iframes>` to embed content that is viewed in a top-level or first-party context.
* Task modules allow you to create modal popup experiences in your Teams application. Similar to a tab, a modal window opens inside the current page.
* Message extensions allow you to insert enriched content into chat message from external resources.

Any cookies used by embedded content must be considered third-party when the site is displayed in an `<iframe>`. In addition, if any remote resources on a page rely on cookies being sent with a request `<img>` and `<script>` tags, external fonts, and personalized content, you must ensure those are marked for cross-site usage, such as `SameSite=None; Secure` or ensure that a fallback is in place.

### Authentication

* If you require authentication for embedded content pages in tabs, you'll need to use the web-based authentication flow.
* A web-based authentication flow can also be used for a configuration page, task module, or messaging extension.
* You can use  a web-based authentication flow for a conversational bot you'll need to use a task module.

Pursuant to the updated SameSite restrictions, a browser will not add a cookie to an already authenticated web site if the link derives from an external site. You'll need to ensure your authentication cookies are marked for cross-site usage — `SameSite=None; Secure` — or ensure that a fallback is in place.

### Android System WebView

Android WebView is a Chrome system component that allows Android apps to display web content. While the new restrictions will become the default, starting with Chrome 80, they will not be immediately enforced on WebViews. They will be applied in the future. To prepare, Android allows native apps to set cookies directly via the [CookeManager API](https://developer.android.com/reference/android/webkit/CookieManager):

* For cookies that are only needed in a first-party context, you should declare them as `SameSite=Lax` or `SameSite=Strict`, as appropriate.
* For cookies needed in a third-party context, you should ensure that they are declared as `SameSite=None; Secure`.

## Learn more

* [SameSite examples](https://github.com/GoogleChromeLabs/samesite-examples)

* [SameSite cookie recipes](https://web.dev/samesite-cookie-recipes/)

* [Known Incompatible Clients]( https://www.chromium.org/updates/same-site/incompatible-clients)

* [Developers: Get Ready for New SameSite=None; Secure Cookie Settings](https://blog.chromium.org/2019/10/developers-get-ready-for-new.html)

**OpenId Connect impact**<br>
[Upcoming SameSite Cookie Changes in ASP.NET and ASP.NET Core](https://devblogs.microsoft.com/aspnet/upcoming-samesite-cookie-changes-in-asp-net-and-asp-net-core/)
