---
title: Authentication FAQ
description: Frequently asked questions for Authentication in Teams app
ms.topic: conceptual
ms.localizationpriority: medium
keywords: teams authentication OAuth SSO Azure AD
---
# Authentication FAQ

Common questions asked regarding Authentication in Teams.
<br><br>

## Teams SSO

<br>
<details>
<summary>What user information does SSO give me? How do I get more user information?</summary>

**Answer**:
</details>
<br>
<details>
<summary>How do I fetch more permissions for a user and when can I do it?</summary>

**Answer**: You can use the On-behalf-of (OBO) flow in your application to request more permissions for your user from Azure AD. The permissions may require the user to give consent for using their Teams identity. You can resolve consent requirement in two ways:

- Prompt the user to give consent.
- The admin can consent on user's behalf. In this case, you may need to ensure the first user is an administrator or provide some kind of installation or setup process to gain the consent.

</details>
<br>
<details>
<summary>If I use Teams SSO, what about my existing users who don't have an Azure AD account?</summary>

**Answer**: There are two options for resolving this issue:

- You don't need to use Azure AD. Teams can provide pop-ups to allow other identity services to present their login screen.
  This may have disadvantages, such as:
  
  - Users juggle multiple user accounts using extra logins.
  - Setting permission within the app requires an admin or Team owner to determine the app’s login by each AAD user.
  - Removing non-AAD accounts accounts for users who leave the organization; etc.
  
  However, it's possible and many large apps use this method.

- Implement an identity mapping scheme. This is a design already used by many partners. Users to log into both your app’s IdP and Azure AD. Your app stores this mapping (either in its database or in user’s Azure AD profile). Your app’s authentication code must accommodate Azure AD SSO, and look up the user’s identity, content, and permission within the app.

</details>
<br>
<details>
<summary>Will I need to build Teams SSO credentials on my webapp too?</summary>

**Answer**: If you want your app to run both within Teams and as a stand-alone web-site, you can use either Teams SSO in Teams or a library like MSAL 2.0 if in a web browser.
</details>
<br>
<details>
<summary>I just need the email ID of a user, why should I use AAD SSO?</summary>

**Answer**:
</details>
<br>
<details>
<summary>How can I use Teams SSO with SAML?</summary>

**Answer**: Teams SSO with SAML isn't supported. Teams SSO relies on the OAuth 2.0 protocol, which serves a similar role to SAML. It's widely used in cloud-based applications where SAML was designed for federating identity between enterprises.
</details>
<br>
<details>
<summary>How is Teams SSO better than SSO from Google, Facebook, etc.?</summary>

**Answer**: In the case of a Teams app, Teams SSO is better. Teams uses it to validate user identity. The user identity is the same in Teams, Graph (and all the M365 content) and the app. This Teams identity enables single sign-on with Teams SSO.

Other advantages are for enterprise customers, such as:

- Integration with Azure AD (on-premises).
- Self-service password reset.
- Advanced auditing and compliance features.
- Dynamic groups based on rules.
- Multi-factor authentication.
- Conditional access (for example, users can only log in from a certain location or during certain times of day).
- Ability to work w/guest users from other enterprises (this is called Azure AD B2B).
  
</details>

## Other authentication methods

<br>
<details>
<summary>How can I use AAD SSO with SAML?</summary>

**Answer**: For implementing SAML with AAD SSO, please see [Single Sign-On SAML protocol](/azure/active-directory/develop/single-sign-on-saml-protocol).
</details>
<br>
<details>
<summary>I want to use a CIAM - which one should I use?</summary>

**Answer**: You can use Azure AD B2C.
</details>
<br>
<details>
<summary>Can I use AAD B2C?</summary>

**Answer**: AAD B2C can work with the same SDK as AAD but it’s a completely different identity service.
/ Need more details /
</details>
<br>

<details>
<summary>If we have partners or customers using their own Identity Provider, true AAD SSO experience isn't possible.

1. What's the next best experience for such cases where we have non-AAD identity providers?
1. Do we have code samples or guiding documents?</summary>

**Answer**:

1. Use the pop-up authentication in the Teams JavaScript SDK for web page-based capabilities, such as tabs, task modules, and configuration pages. Use the Bot Framework’s Auth prompt dialog for bots.

1. / links to be added /

</details>
<br>
<details>
<summary>What's the difference between silent authentication and SSO?</summary>

**Answer**:
</details>
