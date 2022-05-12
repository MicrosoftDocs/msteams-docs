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
<summary>What is a 'consent missing' error, and how can I fix it?</summary>
<br>
When Azure AD receives a request for accessing a Microsoft Graph resource, it checks if the user (or tenant administrator) have given consent for this resource. If there's no record of consent from the user or administrator, Azure AD sends an error message to your web service.

Your code must tell the client (for example, in the body of a 403 Forbidden response) how to handle the error:

- If the tab app needs Microsoft Graph scopes for which only an administrator can give consent, your code should throw an error.
- If the only scopes that are needed can be consented to by the user, then your code should fall back to an alternate system of user authentication.

</details>
<br>
<details>
<summary>What is a missing scope (permission) error, and how should I handle it?</summary>
<br>
This kind of error should be seen only in development. To handle this error, your server-side code should send a 403 Forbidden response to the client, which should log the error to the console or record it in a log.
</details>
<br>
<details>
<summary>What is an Invalid audience error in the access token for Microsoft Graph, and how should I handle it?</summary>
<br>
The server-side code should send a 403 Forbidden response to the client to show a message to the user, and possibly log the error to the console or record it in a log.
</details>
<br>
<details>
<summary>What does the error that the host name must not be based on an already owned domain mean, and how can I fix it?</summary>
<br>
You can get this error in one of the two scenarios:

1. The custom domain is not added to Azure AD. To add custom domain to Azure AD and register it, follow the [add a custom domain name to Azure AD](/azure/active-directory/fundamentals/add-custom-domain) procedure, and then follow the steps to [Configure scope for access token](tab-sso-register-aad.md#configure-scope-for-access-token) again.
1. You are not signed in with Administrator credentials in the Microsoft 365 tenancy. Sign-in to Microsoft 365 as an administrator.

</details>
<br>
<details>
<summary>I didn't receive the  user principal name (UPN) in the returned access token. How can I fix it?</summary>
<br>
You can add UPN as an [optional claim](/azure/active-directory/develop/active-directory-optional-claims) in Azure AD.
<details>
<summary>Does Graph API work in Postman?</summary>
<br>
You can use the Microsoft Graph Postman collection with Microsoft Graph APIs.

For more information, please see [Use Postman with the Microsoft Graph API](/graph/use-postman).
</details>
<br>
<details>
<summary>Does Graph API work in Microsoft Graph explorer?</summary>
<br>
Yes, Graph API works in Microsoft Graph explorer.

For more information, please see [Graph explorer](https://developer.microsoft.com/graph/graph-explorer).

</details>
<br>
<details>
<summary>How can I resolve the generic error I get when I run the tab app?</summary>
<br>
A generic error may show up when one or more of app configurations made in Azure AD are incorrect. To resolve this error, check if the app details configured in your code and Teams manifest matches the values in Azure AD.

The following image shows an example of the app details configured in Azure AD.

:::image type="content" source="../../../assets/images/authentication/teams-sso-tabs/azure-app-details.png" alt-text="App configuration values in Azure AD" border="false":::

- **App ID**: The app ID you generated in Azure AD should be the same in the code and in Teams manifest file. Check the app ID in Teams manifest matches the **Application (client) ID** in Azure AD.

- **App secret**: The app secret configured in the backend of your app should match the **Client credentials** in Azure AD.
    You should also check if the client secret is expired.

- **Application ID URI**: The app ID URI in the code and in Teams app manifest file should match the **Application ID URI** in Azure AD.

- **App permissions**: Check if the permissions you defined in the scope are as per your app requirement. If so, check if they were granted to the user in the access token.

- **Admin consent**: If any scope requires admin consent, check if the consent was granted for the particular scope to the user.

In addition, inspect the access token that was sent to the tab if the following values are correct:

- **Audience (aud)**: Check if the app ID in the token is correct as given in Azure AD.
- **Tenant Id(tid)**: Check if the tenant mentioned in the token is correct.
- **User identity (preferred_username)**: Check if the user identity matches the username in the request for access token for the scope that the current user wants to access.
- **Scopes (scp)**: Check if the scope for which the access token is requested is correct, and as defined in Azure AD.
- **Azure AD version 1.0 or 2.0 (ver)**: Check if Azure AD version is correct.

You can use [JWT](https://jwt.ms) for inspecting the token.

</details>
