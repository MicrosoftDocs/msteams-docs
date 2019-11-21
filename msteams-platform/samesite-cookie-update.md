---
title: Microsoft Teams tabs — SameSite cookie attribute (2020 update)
author: laujan
description: 
keywords: cookie attributes samesite
ms.topic: reference
ms.author: lomeybur
---

# Microsoft Teams tabs — SameSite cookie attribute (2020 update)

## Cookies in brief

 Cookies are small text files, sent from websites, and stored on a computer by the web browser. They are typically used to recall stateful information, preserve user's attributes, record browsing activity, and display relevant advertisement. Cookies can be installed by various parties and classified as follows:

 |||
 | ------ | ------ |
 |**First-party cookies**|First-party cookies are created and used by the websites that a user visits to save data such as shopping cart items, login credentials (e.g., authentication cookies), and other analytics.|
 |**Second-party cookies**|Second-party cookies are technically the same as first-party cookies except the data is shared with a second party via a data partnership (e.g., [Microsoft Teams analytics and reporting](/microsoftteams/teams-analytics-and-reports/teams-reporting-reference)). |
 |**Third-party cookies**| Cookies that are installed by a domain other than the one the user explicitly visits and are mainly used for tracking (e.g. "Like" buttons), ad serving, and live chats.|

### Cookies and HTTP requests

When cookies are stored on the browser, they are attached to *each* HTTP web request and sent to the server by the Set-Cookie HTTP response header. Predictably, that performance can introduce security vulnerabilities such as Cross-Site Request Forgery (CSRF) attacks. *See* [HTTP cookies](https://developer.mozilla.org/docs/Web/HTTP/Cookies). The SameSite attribute is aimed at mitigating that exposure through the implementation and management of the SameSite attribute component in the SetCookie header.

### SameSite attribute: previous release

Google Chrome version 51 introduced the SetCookie SameSite specification as an *optional* attribute. Starting with Build 17672, Windows 10 introduced SameSite cookie support for the [Microsoft Edge browser](https://blogs.windows.com/msedgedev/2018/05/17/samesite-cookies-microsoft-edge-internet-explorer/).

Originally, the SameSite cookie attribute had two settings, *Lax* and *Strict*:

|Setting | Enforcement | Value |Attribute Specification |
| -------- | ----------- | --------| -----|
| SameSite attribute not set, or not supported by the browser.| Cookies included in any request — including cross-origin requests, i.e., the cookie is *always* sent.|**Default**|`Set-Cookie: key=value;`|
|  **Lax**     | Cookies will be sent on navigation within the same site, or through GET navigation to your site from other sites.| Optional |`Set-Cookie: key=value; SameSite=Lax`|
| **Strict** | Limits cookie requests to those which only originated from the same site, i.e., the browser will only send cookies for requests originating from the site that set the cookies.<br/><br/> If the request originated from a different URL than the URL of the current location, **none** of the cookies tagged with the *Strict* attribute will be included. | Optional|`Set-Cookie: key=value; SameSite=Strict`|

## SameSite cookie attribute: 2020 release

> [!NOTE]
> The 2020 SameSite feature is backwards compatible. Browsers not supporting the *None* and *Secure* attributes will ignore them and continue as if the attributes were not set or restrict them. *See* [SameSite=None: Known Incompatible Clients](https://www.chromium.org/updates/same-site/incompatible-clients). Where possible, it is recommended that make your cookies' intended use explicit.

|Setting | Enforcement | Value |Attribute Specification |
| -------- | ----------- | --------|--------|
| **Lax**  | Cookies will automatically be sent only in a *first-party* context. SameSite cookies are withheld on cross-site sub-requests, such as calls to load images or iframes, but will be sent when a user navigates to the URL from an external site; for example, by following a link.| **Default** |`Set-Cookie: key=value; SameSite=Lax`|
| **Strict** |The browser will only send cookies for SameSite requests (requests originating from the site that set the cookie). If the request originated from a different URL than the URL of the current location, none of the cookies tagged with the Strict attribute will be sent.| Optional |`Set-Cookie: key=value; SameSite=Strict`|
| **None**  | Cookies will be sent in both SameSite and cross-origin requests — the value must be explicitly set to *None* and all browser request **must follow the HTTPS protocol** and include the *Secure* attribute. Cookies that don't adhere to this requirement will be **rejected**. <br/><br/>**Note**: both attributes are required together. If you just specify `None` without `Secure` the cookie will be rejected. If you do not use the HTTPS protocol, your third-party cookie will be dropped by Chrome.| Optional; HTTPS protocol required |`Set-Cookie: key=value; SameSite=None; Secure` |

For more information, *see* [Creating cookies](https://developer.mozilla.org/docs/Web/HTTP/Cookies#Creating_cookies)

## Teams tabs impact

Teams tabs use `<iframes>` to embed content that is viewed in a top-level or first-party context. Any cookies used by the embedded content will be considered as a third-party cookie when the site is displayed in the inline frame. In addition, any remote resources on a page may be relying on cookies to be sent with a request, e.g., `<img>` tags, personalized content.Therefore, you'll need to ensure those are marked for cross-site usage or that you can [fall back](https://developer.mozilla.org/docs/Glossary/Graceful_degradation) gracefully without them.

## Android System WebView

Android WebView is a system component powered by Chrome that allows Android apps to display web content. While the new restrictions will become the default starting with Chrome 80, they will not be immediately enforced on WebViews although, the intent is to apply them in the future. To prepare, Android allows native apps to set cookies directly via the [CookeManagerAPI](https://developer.android.com/reference/android/webkit/CookieManager):

* For cookies that are only needed in a first-party context, you should declare them as `SameSite=Lax` or `SameSite=Strict`,accordingly.
* For cookies needed in a third-party context, you should ensure that they are declared as `SameSite=None; Secure`.

## Learn more

[SameSite examples](https://github.com/GoogleChromeLabs/samesite-examples)

[SameSite cookie recipes](https://web.dev/samesite-cookie-recipes/)

[Known Incompatible Clients]( https://www.chromium.org/updates/same-site/incompatible-clients)

[Developers: Get Ready for New SameSite=None; Secure Cookie Settings](https://blog.chromium.org/2019/10/developers-get-ready-for-new.html)