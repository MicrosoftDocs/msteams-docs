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

## AAD SSO

<br>
<details>
<summary>What user information does SSO give me? How do I get more user information?</summary>

**Answer**:
</details>
<br>
<details>
<summary>How do I fetch more permissions for a user and when can I do it?</summary>

**Answer**: You can use the On-behalf-of (OBO) flow in your application to request more permissions for your user from Azure AD. The permissions may require the user to give consent for using their Teams identity. To resolve consent requirement in two ways:

- Prompt the user to give consent.
- The admin can consent on user's behalf. In this case, you may need to ensure the first user is an administrator or provide some kind of installation or setup process to gain the consent.

</details>
<br>
<details>
<summary>If I use AAD SSO, what about my existing users who haven't signed up using AAD SSO?</summary>

**Answer**:
</details>
<br>
<details>
<summary>Will I need to build AAD SSO credentials on my webapp too?</summary>

**Answer**:
</details>
<br>
<details>
<summary>I just need the email ID of a user, why should I use AAD SSO?</summary>

**Answer**:
</details>
<br>
<details>
<summary>How can I use AAD SSO with SAML?</summary>

**Answer**:
</details>
<br>
<details>
<summary>How is AAD SSO better than SSO from Google, Facebook, etc.?</summary>

**Answer**:
</details>

## Other authentication methods

<br>
<details>
<summary>I want to use a CIAM - which one should I use?</summary>

**Answer**:
</details>
<br>
<details>
<summary>Can I use AAD B2C?</summary>

**Answer**:
</details>
<br>

<details>
<summary>If we have partners or customers using their own Identity Provider, true AAD SSO experience isn't possible.

- What's the next best experience for such cases where we have non-AAD identity providers?
- Do we have code samples or guiding documents?</summary>

**Answer**:
</details>
<br>
<details>
<summary>What's the difference between silent authentication and SSO?</summary>

**Answer**:
</details>
