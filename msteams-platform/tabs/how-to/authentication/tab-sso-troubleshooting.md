---
title: Troubleshooting authentication for tabs using SSO in Teams
description: Troubleshoot Single sign-on (SSO) authentication issues in Teams and how to use it in tab app.
ms.topic: how-to
ms.localizationpriority: high
keywords: teams authentication tabs Microsoft Azure Active Directory (Azure AD) SSO errors questions
---
# Troubleshoot SSO authentication in Teams

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
When Azure AD receives a request for accessing a Microsoft Graph resource, it checks if the app user or tenant administrator has given consent for this resource. If there's no record of consent from the user or administrator, Azure AD sends an error message to your web service.

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
The server-side code should send a 403 Forbidden response to the client to show a message to the user. It's recommended that it should also log the error to the console, or record it in a log.
</details>
<br>
<details>
<summary>4. Error: Host name must not be based on an already owned domain.</summary>
<br>
You can get this error in one of the two scenarios:

1. The custom domain isn't added to Azure AD. To add custom domain to Azure AD and register it, follow the [add a custom domain name to Azure AD](/azure/active-directory/fundamentals/add-custom-domain) procedure. Then follow the steps to [Configure scope for access token](tab-sso-register-aad.md#configure-scope-for-access-token) again.
1. You aren't signed in with Administrator credentials in the Microsoft 365 tenancy. Sign-in to Microsoft 365 as an administrator.

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

:::image type="content" source="../../../assets/images/authentication/teams-sso-tabs/azure-app-details.png" alt-text="App configuration values in Azure AD":::

Check that the following values match between Azure AD, client-side code, and Teams app manifest:

- **App ID**: The app ID you generated in Azure AD should be the same in the code and in Teams manifest file. Check the app ID in Teams manifest matches the **Application (client) ID** in Azure AD.

- **App secret**: The app secret configured in the backend of your app should match the **Client credentials** in Azure AD.
    You should also check if the client secret is expired.

- **Application ID URI**: The app ID URI in the code and in Teams app manifest file should match the **Application ID URI** in Azure AD.

- **App permissions**: Check if the permissions you defined in the scope are as per your app requirement. If so, check if they had been granted to the user in the access token.

- **Admin consent**: If any scope requires admin consent, check if the consent was granted for the particular scope to the user.

In addition, inspect the access token that was sent to the tab app to verify if the following values are correct:

- **Audience (aud)**: Check if the app ID in the token is correct as given in Azure AD.
- **Tenant Id(tid)**: Check if the tenant mentioned in the token is correct.
- **User identity (preferred_username)**: Check if the user identity matches the username in the request for access token, for the scope that the current user wants to access.
- **Scopes (scp)**: Check if the scope for which the access token is requested is correct, and as defined in Azure AD.
- **Azure AD version 1.0 or 2.0 (ver)**: Check if Azure AD version is correct.

You can use [JWT](https://jwt.ms) for inspecting the token.

</details>

## Bot SSO token error

<br>
<details>
<summary>Token exchange failure.</summary>
<br>
If there's a token exchange failure, use the following code:

```json
{​​ 
    "status": "<response code>", 
    "body": 
    {​​ 
        "id":"<unique Id>", 
        "connectionName": "<connection Name on the bot (from the OAuth card)>", 
        "failureDetail": "<failure reason if status code is not 200, null otherwise>" 
    }​​ 
}​​
```

To understand the bot behavior when the token exchange fails to trigger a consent prompt, see the following steps:

>[!NOTE]
> No user action is required to be taken as the bot takes the actions when the token exchange fails.

1. The client starts a conversation with the bot triggering an OAuth scenario.
2. The bot sends back an OAuth card to the client.
3. The client intercepts the OAuth card before displaying it to the app user. It checks if it contains a `TokenExchangeResource` property.
4. If the property exists, the client sends a `TokenExchangeInvokeRequest` to the bot. The client must have an exchangeable token for the user. This token must be an Azure AD v2 token whose audience must be the same as `TokenExchangeResource.Uri` property.
1. The client sends an invoke activity to the bot with the following code:

    ```json
    {
        "type": "Invoke",
        "name": "signin/tokenExchange",
        "value": 
        {
            "id": "<any unique Id>",
            "connectionName": "<connection Name on the skill bot (from the OAuth card)>",
            "token": "<exchangeable token>"
        }
    }
    ```

5. The bot processes the `TokenExchangeInvokeRequest` and returns a `TokenExchangeInvokeResponse` back to the client. The client must wait until it receives the `TokenExchangeInvokeResponse`.

    ```json
    {
        "status": "<response code>",
        "body": 
        {
            "id":"<unique Id>",
            "connectionName": "<connection Name on the skill bot (from the OAuth card)>",
            "failureDetail": "<failure reason if status code is not 200, null otherwise>"
        }
    }
    ```

6. If the `TokenExchangeInvokeResponse` has a `status` of `200`, then the client doesn't show the OAuth card. See the [normal flow image](/azure/bot-service/bot-builder-concept-sso?view=azure-bot-service-4.0#sso-components-interaction&preserve-view=true). For any other `status` or if the `TokenExchangeInvokeResponse` isn't received, then the client shows the OAuth card to the user. See the [fallback flow image](/azure/bot-service/bot-builder-concept-sso?view=azure-bot-service-4.0#sso-components-interaction&preserve-view=true). If there are any errors or unmet dependencies like user consent, this activity ensures that the SSO flow falls back to normal OAuthCard flow.

   > [!NOTE]
   >
   > In Teams web client, the password prompt doesn't appear as there is an active Azure AD session in the browser, which is used for authentication and to acquire a token. In Teams desktop client, the password prompt appears because the desktop client doesn't have any Azure AD session to be shared and is asked to login.

</details>

## See also

[Security best practices for application properties in Azure Active Directory](/azure/active-directory/develop/security-best-practices-for-app-registration)
