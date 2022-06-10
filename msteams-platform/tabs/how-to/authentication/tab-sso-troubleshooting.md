---
title: Troubleshooting authentication for tabs using SSO in Teams
description: Troubleshooting SSO authentication in Teams and how to use it in tabs
ms.topic: how-to
ms.localizationpriority: medium
keywords: teams authentication tabs Microsoft Azure Active Directory (Azure AD) SSO errors questions
---
# Troubleshooting SSO authentication in Teams

Here's a list of issues and questions about SSO, and how you can fix them.
<br>

## Support for Microsoft Graph

<br>
<details>
<summary>1. Does Graph API work in Postman?</summary>
<br>
You can use the Microsoft Graph Postman collection with Microsoft Graph APIs.

For more information, see [Use Postman with the Microsoft Graph API](/graph/use-postman).
</details>
<br>
<details>
<summary>2. Does Graph API work in Microsoft Graph explorer?</summary>
<br>
Yes, Graph API works in Microsoft Graph explorer.

For more information, see [Graph explorer](https://developer.microsoft.com/graph/graph-explorer).

</details>
<br>

## Error messages and how to handle them

<br>
<details>
<summary>1. Error: consent missing.</summary>
<br>
When Azure AD receives a request for accessing a Microsoft Graph resource, it checks if the user (or tenant administrator) have given consent for this resource. If there's no record of consent from the user or administrator, Azure AD sends an error message to your web service.

Your code must tell the client (for example, in the body of a 403 Forbidden response) how to handle the error:

- If the tab app needs Microsoft Graph scopes for which only an administrator can give consent, your code should generate an error.
- If the only scopes that are needed can be consented to by the user, then your code should fall back to an alternate system of user authentication.

</details>
<br>
<details>
<summary>2. Error: Missing scope (permission).</summary>
<br>
This error is seen only during development.

To handle this error, your server-side code should send a 403 Forbidden response to the client. It should log the error to the console or record it in a log.
</details>
<br>
<details>
<summary>3. Error: Invalid Audience in the access token for Microsoft Graph.</summary>
<br>
The server-side code should send a 403 Forbidden response to the client to show a message to the user. It is recommended that it should also log the error to the console, or record it in a log.
</details>
<br>
<details>
<summary>4. Error: Host name must not be based on an already owned domain.</summary>
<br>
You can get this error in one of the two scenarios:

1. The custom domain is not added to Azure AD. To add custom domain to Azure AD and register it, follow the [add a custom domain name to Azure AD](/azure/active-directory/fundamentals/add-custom-domain) procedure, and then follow the steps to [Configure scope for access token](tab-sso-register-aad.md#configure-scope-for-access-token) again.
1. You are not signed in with Administrator credentials in the Microsoft 365 tenancy. Sign-in to Microsoft 365 as an administrator.

</details>
<br>
<details>
<summary>5. Error: User Principal Name (UPN) not received in the returned access token.</summary>
<br>
You can add UPN as an optional claim in Azure AD.

For more information, see [Provide optional claims to your app](/azure/active-directory/develop/active-directory-optional-claims) and [access tokens](/azure/active-directory/develop/access-tokens).
</details>
<br>
<details>
<summary>6. Error: Teams SDK Error: resourceDisabled.</summary>
<br>
To avoid this error, ensure that application ID URI is configured properly in Azure AD app registration and in your Teams Client.

For more information on application ID URI, see [To expose an API](tab-sso-register-aad.md#to-expose-an-api).

</details>
<br>

<details>
<summary>7. Error: Generic error when running the tab app.</summary>
<br>
A generic error may show up when one or more of app configurations made in Azure AD are incorrect. To resolve this error, check if the app details configured in your code and Teams manifest matches the values in Azure AD.

The following image shows an example of the app details configured in Azure AD.

:::image type="content" source="../../../assets/images/authentication/teams-sso-tabs/azure-app-details.png" alt-text="App configuration values in Azure AD" border="false":::

Check that the following values match between Azure AD, client-side code, and Teams app manifest:

- **App ID**: The app ID you generated in Azure AD should be the same in the code and in Teams manifest file. Check the app ID in Teams manifest matches the **Application (client) ID** in Azure AD.

- **App secret**: The app secret configured in the backend of your app should match the **Client credentials** in Azure AD.
    You should also check if the client secret is expired.

- **Application ID URI**: The app ID URI in the code and in Teams app manifest file should match the **Application ID URI** in Azure AD.

- **App permissions**: Check if the permissions you defined in the scope are as per your app requirement. If so, check if they were granted to the user in the access token.

- **Admin consent**: If any scope requires admin consent, check if the consent was granted for the particular scope to the user.

In addition, inspect the access token that was sent to the tab app to verify if the following values are correct:

- **Audience (aud)**: Check if the app ID in the token is correct as given in Azure AD.
- **Tenant Id(tid)**: Check if the tenant mentioned in the token is correct.
- **User identity (preferred_username)**: Check if the user identity matches the username in the request for access token for the scope that the current user wants to access.
- **Scopes (scp)**: Check if the scope for which the access token is requested is correct, and as defined in Azure AD.
- **Azure AD version 1.0 or 2.0 (ver)**: Check if Azure AD version is correct.

You can use [JWT](https://jwt.ms) for inspecting the token.

</details>
