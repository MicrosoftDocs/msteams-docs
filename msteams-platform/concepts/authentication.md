---
title: Authentication a user
description: Describes authentication in Teams and how to use it in your apps
keywords: teams authentication
---

# Authenticate a user in your Microsoft Teams tab

>**Important: Recent breaking change for tab authentication**
>
>To address a security concern, we made a change that might impact existing tab authentication flows.
>
>Before our July 2017 update, we were incorrectly allowing tabs to open an authentication window to any arbitrary domain and listening to messages from that window as if they came from the domain of the tab content frame. This is no longer permitted.
> 
>We've seen developers commonly use the unintentional behavior to do things like launch an authentication pop-up directly to Azure Active Directory (Azure AD), redirect back to their tab content's domain, and then call `notifySuccess`. Although this is a legitimate scenario, it can also allow a pop-up to a phishing site.
> 
>The recommended approach instead is to direct the authentication pop-up to a page on your domain, redirect to Azure AD (or other sign-in provider), and then redirect back to your domain as usual. Basically, the authentication pop-up must start and end on your domain.
>
>Because `navigateCrossDomain` isn't supported in the authentication window, we recommend that your authentication start and end domains be the same as your content domain and listed in the manifest's `validDomains` list. In the future, we will allow the authentication start and end domains be separate from the content, but for forward compatibility, we recommand you put all on the same domain.

---

The tab [configuration](~/concepts/tabs/tabs-configuration) and [content](~/concepts/tabs/tabs-content) pages run in iframes. Azure Active Directory (Azure AD), and other identity providers that you may use, do not usually allow their sign-in and consent pages to be hosted within an iframe.  Because of this, your app needs to authenticate the user in a pop-up window. You must use the [Microsoft Teams JavaScript client SDK](~/reference/library/client-sdk-javascript) to do this, so that it works successfully in both the web and desktop apps for Microsoft Teams.

1. Add UI to your configuration or content page to enable the user to sign in when necessary. You should not drive the authentication pop-up without user action, because this is likely to trigger the browser's pop-up blocker.

2. Add the domain of your authentication URL to the [`validDomains`](~/reference/schema/manifest-schema#validdomains) section of the manifest. Failure to do so might result in an empty pop-up.

3. You can [get user context information](~/concepts/tabs/tabs-context) to help build authentication requests and URLs. For example, you can use the user's name (upn) as the `login_hint` value for Azure AD sign-in, which means the user might need to type less, or even that sign-in completes with no user action at all. Note that you should *not* use this context directly as proof of identity. For example, an attacker could load your page in a "malicious browser" and provide it with any information they want.

4. When the user selects to sign in, call `microsoftTeams.authentication.authenticate({url: <auth URL>, width: <width>, height: <height>, successCallback: <successCallback>, failureCallback: <failureCallback>})`.
	
   This launches the pop-up window in which the authorization should occur. This page should be hosted on your domain and listed in the [`validDomains`](~/reference/schema/manifest-schema#validdomains) section of the manifest. Within this authorization page, you should redirect to your identity provider, so the user can sign in. After the user completes authentication, the pop-up window is redirected to the callback page you specified for your app.
   
5. In your app's callback page, call `microsoftTeams.authentication.notifySuccess()` or `microsoftTeams.authentication.notifyFailure()`.
	
   This results in a callback to the `successCallback` or `failureCallback` function that you registered in step 4, inside the original configuration or content page.

6. If successful, you can refresh or reload the page and show the configuration or content relevant to the now-authenticated user. If authentication fails, display an error message.

7. Your app can set its own session cookie in the usual way so that the user need not sign in again when they return to your tab on the current device.
