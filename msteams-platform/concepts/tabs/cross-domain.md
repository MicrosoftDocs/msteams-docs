---
title: Cross-domain redirects
description: Describes the process of redirecting across domains in Microsoft Teams
keywords: teams cross domain redirect
ms.date: 01/04/2019
---
# Redirect across domains in a Microsoft Teams tab

> [!NOTE]
>The `navigateCrossDomain` API has been deprecated and will not work in future versions of the SDK. References to it have been removed from this article.

You may need to redirect the configuration or content page to a location on a different domain or subdomain.
For example, suppose your configuration page begins on www.example.com. However, after a user who works for the Contoso Company signs in, your app needs to redirect to www.contoso.example.com (or perhaps even a different domain altogether, like www.anotherexample.com).

There are several ways to do this using JavaScript:

* `window.location.href="http://example.com";`
* `window.location.assign("http://example.com");`
* `window.location.replace("http://example.com");`

If you don't want the navigation to appear in browser history, use `window.location.replace`.

Ensure that the URL is included in the `validDomains` list in your [manifest](~/concepts/apps/apps-package). For more information, see [validDomains](~/resources/schema/manifest-schema#validdomains) in the manifest schema reference.