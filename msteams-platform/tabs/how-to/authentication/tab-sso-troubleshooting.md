---
title: Troubleshooting authentication for tabs using Teams SSO with Azure AD
description: Troubleshooting SSO authentication in Teams and how to use it in tabs
ms.topic: how-to
ms.localizationpriority: medium
keywords: teams authentication tabs Microsoft Azure Active Directory (Azure AD)
---
# Troubleshooting authentication for using Teams SSO for tabs

<br>

<details>
<summary>What is a 'consent missing' error, and how can I fix them?</summary>
If AAD has no record that consent (to the Microsoft Graph resource) was granted to the Tab by the user (or tenant administrator), AAD sends an error message to your web service. Your code must tell the client (for example, in the body of a 403 Forbidden response) how to handle the error:

- If the Tab needs Microsoft Graph scopes that can only be consented to by an admin, your code should throw an error.
- If the only scopes that are needed can be consented to by the user, then your code should fall back to an alternate system of user authentication.

</details>
<br>
<details>
<summary>What is a missing scope (permission) error, and how should I handle it?</summary>
This kind of error should be seen only in development. To handle this error, your server-side code should send a 403 Forbidden response to the client, which should log the error to the console or record it in a log.
</details>
<br>
<details>
<summary>What is an Invalid audience error in the access token for Microsoft Graph, and how should I handle it?</summary>
The server-side code should send a 403 Forbidden response to the client to show a message to the user, and possibly log the error to the console or record it in a log.
</details>
<br>
<details>
<summary>Does Graph API work in Postman?</summary>
<br>
You can use the Microsoft Graph Postman collection with Microsoft Graph APIs.
For more information, please see [Use Postman with the Microsoft Graph API](/graph/use-postman).
</details>
<br>
<details>
<summary>Does Graph API work in Microsoft Graph explorer?</summary>

Yes, Graph API works in Microsoft Graph explorer. For more information, please see [Graph explorer](https://developer.microsoft.com/graph/graph-explorer).

</details>
<br>
<details>
<summary>How can I resolve the generic error I get when I run the app?</summary>

A generic error may show up when one or more of the app configurations made in Azure AD are incorrect. To resolve this error, check the following:

- Is the App ID correct?
- Is the App secret correct? Expired?
- Check if the application id uri is correct?
- Are permissions correct? Are they granted to the app?
- Is application ID URI and web application info resource in manifest is same as in Azure AD?
- Do any of the permissions require admin consent? Were the permissions granted?

</details>
