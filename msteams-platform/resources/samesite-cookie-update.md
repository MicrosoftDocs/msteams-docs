---
title: Implement SameSite Cookie Attribute
author: laujan
description: Learn types of cookies, SameSite cookies and attributes, their impacts on Teams tabs, dialogs (task modules), message extensions, and their authentication in Teams.
ms.topic: reference
ms.localizationpriority: medium
ms.author: lomeybur
ms.date: 05/18/2022
---

# Cookies and local storage

Cookies are text strings sent from websites and stored on a computer by the web browser. They're used for authentication and personalization. For example, cookies are used to recall stateful information, preserve user settings, record browsing activity, and display relevant ads. Cookies are always linked to a particular domain and are installed by various parties.

## Types of cookies

The cookie types and their corresponding scopes are as follows:

|Cookie|Scope|
| ------ | ------ |
|First party cookie|A first party cookie is created by websites that a user visits. It's used to save data, such as shopping cart items, sign in credentials. For example, authentication cookies, and other analytics.|
|Second party cookie|A second party cookie is technically the same as a first party cookie. The difference is that data is shared with a second party through a data partnership agreement. For example, [Microsoft Teams analytics and reporting](/microsoftteams/teams-analytics-and-reports/teams-reporting-reference). |
|Third party cookie|A third party cookie is installed by a domain other than the one the user explicitly visited and is used for tracking. For example, **Like** buttons, ad serving, and live chats.|

## Cookies and HTTP requests

Before the introduction of SameSite restrictions, the cookies were stored on the browser. They were attached to every HTTP web request and sent to the server by the `Set Cookie` HTTP response header. This method introduced security vulnerabilities, such as Cross Site Request Forgery, called CSRF attacks. The SameSite component reduced the exposure through its implementation and management in the SetCookie header.

## SameSite cookie attribute: initial release

Google Chrome version 51 introduced the `SetCookie SameSite` specification as an optional attribute. Starting with Build 17672, Windows 10 introduced SameSite cookie support for the [Microsoft&nbsp;Edge browser](https://blogs.windows.com/msedgedev/2018/05/17/samesite-cookies-microsoft-edge-internet-explorer/).

You can opt out of adding the SameSite cookie attribute to the `SetCookie` header or add it with one of two settings, **Lax** and **Strict**. An unimplemented SameSite attribute was considered the default state.

## SameSite cookie attribute: 2020 release

Chrome 80, released in February 2020, introduces new cookie values and imposes cookie policies by default. Three values are passed into the updated SameSite attribute: **Strict**, **Lax**, or **None**. If not specified, cookies SameSite attribute takes the value `SameSite=Lax` by default.

SameSite cookie attributes are as follows:

|Setting | Enforcement | Value |Attribute Specification |
| -------- | ----------- | --------|--------|
| **Lax**  | Cookies are sent automatically only in a **first party** context and with HTTP GET requests. SameSite cookies are withheld on cross site sub requests, such as calls to load images or `iframes`. They sent when a user navigates to the URL from an external site, for example, by following a link.| **Default** |`Set-Cookie: key=value; SameSite=Lax`|
| **Strict** |The browser only sends cookies for first party context requests. These are requests originating from the site that set the cookie. If the request originated from a different URL than that of the current location, none of the cookies tagged with the `Strict` attribute are sent.| Optional |`Set-Cookie: key=value; SameSite=Strict`|
| **None** | Cookies are sent in both first party context and cross origin requests; however, the value must be explicitly set to **`None`** and all browser requests **must follow the HTTPS protocol** and include the **`Secure`** attribute, which requires an encrypted connection. Cookies that don't adhere to that requirement are **rejected**. <br/>**Both attributes are required together**. If  **`None`** is specified without **`Secure`**  or if the HTTPS protocol isn't used, then the third party cookies are rejected.| Optional, but, if set, the HTTPS protocol is required. |`Set-Cookie: key=value; SameSite=None; Secure` |

## Teams implications and adjustments

1. Enable the relevant SameSite setting for your cookies and validate that your apps and extensions continue to work in Teams.
1. If your apps or extensions fail, make the necessary fixes prior to the Chrome 80 release.
1. Microsoft internal partners can join the following team for more information or help with this issue: <https://teams.microsoft.com/l/team/19%3A08b594cd465e4c0491fb751e823802e2%40thread.skype/conversations?groupId=4d6d04cd-dbf0-43c8-a2ff-f80dd38be034&tenantId=72f988bf-86f1-41af-91ab-2d7cd011db47>.

> [!NOTE]
> You must set SameSite attributes to reflect the intended use for your cookies. Do not rely on default browser behavior. For more information, see [Developers: Get Ready for New SameSite=None; Secure Cookie Settings](https://blog.chromium.org/2019/10/developers-get-ready-for-new.html).

### Tabs, dialogs, and message extensions

* Teams tabs use `<iframes>` to embed content that is viewed at a top level or first party context.
* Dialogs (referred as task modules in TeamsJS v1.x) allow you to create modal pop-up experiences in your Teams application. Similar to a tab, a modal window opens inside the current page.
* Message extensions allow you to insert enriched content into a chat message from external resources.

Any cookies used by embedded content are considered as third party when the site is displayed in an `<iframe>`. In addition, if any remote resources on a page rely on cookies being sent with a request `<img>` and `<script>` tags, external fonts, and personalized content, you must ensure those are marked for cross site usage, such as `SameSite=None; Secure` or ensure that a fallback is in place.

### Authentication

You must use the web based authentication flow for the following:

* Embedded content pages in tabs.
* Configuration page, dialog, and message extension.
* Conversational bot with a dialog.

According to the updated SameSite restrictions, a browser doesn't add a cookie to an already authenticated web site if the link derives from an external site. You must ensure your authentication cookies are marked for cross site usage `SameSite=None; Secure` or ensure that a fallback is in place.

## Android System WebView

Android WebView is a Chrome system component that allows Android apps to display the web content. While the new restrictions are default, starting with Chrome 80, they aren't immediately enforced on WebViews. They'll be applied in the future. To prepare, Android allows native apps to set cookies directly through the [CookieManager API](https://developer.android.com/reference/android/webkit/CookieManager).

> [!NOTE]
>
> * You must declare first party cookies as `SameSite=Lax` or `SameSite=Strict`, as appropriate.
> * You must declare third party cookies as `SameSite=None; Secure`.

## Third party cookies deprecation

Third-party cookies are in the process of being deprecated across all major browsers. All third party cookies set in the top-level domain are blocked when that domain is embedded in an `iframe`.

This deprecation impacts a common scenario in which the external app is rendered within Teams in various entry points like personal apps, channel tabs, and conversational tabs.

### Pop-out authentication scenario

Pop-out authentication scenarios are a common method for apps to authenticate using different identity providers such as any external auth. Here's how it works:

1. The rendered `iframe` triggers a popup that loads the selected authentication provider sign-in page.
1. After the user logs in, the popup redirects to the domain of the opening app, where an authentication cookie is set, and the popup closes.
1. These cookies are used inside the embedded `iframe` to authenticate the user.

Pop-out authentication isn't affected by third-party cookie deprecation, for the following reasons:

* Chromium-based browsers like Google Chrome and Microsoft Edge allow access to cookies that are unpartitioned, secure, and `SameSite=None`. This is true when the cookies are set in a popped-out window from the `iframe` to be accessible in the `iframe`.

* The browsers that aren't Chromium-based such as Firefox align their cookie deprecation with Chromium-based browsers.

The app simulates this scenario. To use an app with cookies:

1. Upload and open your app in an `iframe`.
1. Select **Partitioned Cookies**.

    :::image type="content" source="../assets/images/partitioned-cookies.png" alt-text="Screenshots show you the partitioned cookies in cookies app.":::

1. Select the **popOutApp** button to pop it out as a first-party domain.

    :::image type="content" source="../assets/images/cookies-popout.png" alt-text="Screenshot shows you the popoutapp option in cookies app.":::

1. Select **Set Partitioned Cookies from API**.

    :::image type="content" source="../assets/images/cookies-from-api.png" alt-text="Screenshot shows you how to set partitioned cookies from API.":::

    Now you can navigate to cookies tab in the Teams window and see that only `partitioned:false` and `secure:true` cookies are available:

   :::image type="content" source="../assets/images/cookies-final.png" alt-text="Screenshot shows you the cookies tab with partitioned to false and secure to true cookies are available":::

This action sets multiple cookies with a combination of secure, SameSite, and partitioned attributes. Only `SameSite=None`, secure, and unpartitioned cookies are accessible within the `iframe`.

The following screenshot represents the cookies accessible in the embedded `iframe` when set from the top-level popped-out window of the `iframe`’s URL:

:::image type="content" source="../assets/images/3p-cookies.png" alt-text="Screenshot shows you the third party cookies app in Microsoft Teams.":::

### Actions required for cookies set by iframe

Embedded `iframes` must set cookies with the partitioned attribute as false. Chromium-based browsers enable CHIPS (Cookies Having Independent Partitioned State), so they won't set cookies that are missing the partitioned attribute.

### Storage partitioning

Storage partitioning, a fully implemented change in Chrome, essentially implies that any local storage set in the first-party context won't be accessible in the third-party context within iframes, and vice versa.

This alteration might disrupt scenarios such as external authentication in browsers if it depends on storing data in the first-party context's local storage and subsequently accessing it in the third-party context. For more information, see [storage partitioning](https://developers.google.com/privacy-sandbox/cookies/storage-partitioning).

## See also

* [Localize your app](../concepts/build-and-test/apps-localization.md)
* [SameSite examples](https://github.com/GoogleChromeLabs/samesite-examples)
* [SameSite cookie recipes](https://web.dev/samesite-cookie-recipes/)
* [Known Incompatible Clients]( https://www.chromium.org/updates/same-site/incompatible-clients)
* [Developers: Get Ready for New SameSite=None; Secure Cookie Settings](https://blog.chromium.org/2019/10/developers-get-ready-for-new.html)
* [Upcoming SameSite Cookie Changes in ASP.NET and ASP.NET Core](https://devblogs.microsoft.com/aspnet/upcoming-samesite-cookie-changes-in-asp-net-and-asp-net-core/)
* [HTTP cookies](https://developer.mozilla.org/docs/Web/HTTP/Cookies)
