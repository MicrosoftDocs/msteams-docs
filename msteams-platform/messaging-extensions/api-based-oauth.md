---
title: OAuth for API based Message Extension
author: surbhigupta12
description: Learn about the requirements for implementing OAuth for an API based message extension and its limitation and best practices.
ms.localizationpriority: medium
ms.topic: overview
ms.author: surbhigupta
ms.date: 10/29/2024
---

# Enable OAuth authentication for API based message extension

Integrating Open Authorization (OAuth) 2.0 into your Teams application ensures a secure method for accessing user data from third-party applications without exposing user credentials. This protocol allows you to grant access solely to the specific data required, with the prerequisite that the user consents before the application can access their data. It's beneficial for applications that need to access individual items for a user.

By using OAuth 2.0, your client application can obtain authorized access to protected resources like web APIs. OAuth is designed to work with Hypertext Transfer Protocol (HTTP). It uses access tokens to prove app user's identity and allow interaction with another service on their behalf.

<br>

<details>
<summary>Select for more information on OAuth 2.0.</summary>

Leverage OAuth 2.0 to securely access user data without exposing their credentials. When apps use the OAuth 2.0 authorization code flow, they get an access token to include in requests to resources that are protected by the Microsoft identity platform (like APIs). They can also request new ID and access tokens for previously authenticated entities using a refresh mechanism.

Here's a diagram for a high-level view of the authentication flow:

:::image type="content" source="../assets/images/authentication/oauth-authentication-flow.png" alt-text="Image shows the OAuth authentication flow." lightbox="../assets/images/authentication/oauth-authentication-flow.png":::

* **Authorization server**: The identity platform is the authorization server, also called an identity provider or IDP. It ensures secure handling of the end-user's information, their access, and the trust relationships between the parties in the auth flow. The authorization server issues the security tokens your apps and APIs use for granting, denying, or revoking access to resources (authorization) after the user has signed in (authenticated).

* **Client**: The client in an OAuth exchange is the application requesting access to a protected resource. The client could be a web app running on a server, a single-page web app running in a user's web browser, or a web API that calls another web API. You'll often see the client referred to as client application, application, or app.

* **Resource owner**: The resource owner in an auth flow is usually the application user, or the user. The user "owns" the protected resource (their data), which your app accesses on their behalf. The resource owners can grant or deny your app (the client) access to the resources they own. For example, your app might call an external system's API to get a user's email address from their profile on that system. Their profile data is a resource the user owns on the external system, and the user can consent to or deny your app's request to access their data.

* **Resource server**: The resource server hosts or provides access to a resource owner's data. Most often, the resource server is a web API fronting a data store. The resource server relies on the authorization server to perform authentication and uses information in bearer tokens issued by the authorization server to grant or deny access to resources.

For more information about OAuth 2.0, see [Microsoft identity platform and OAuth 2.0 authorization code flow](/entra/identity-platform/v2-oauth2-auth-code-flow).

</details>

## Implement OAuth

When a user attempts to use a message action on a newly installed Teams app that uses OAuth, Teams Client makes an invoke request where the app ID is used to check if there's a valid access token. If a valid token is available, it triggers the sign-in flow.

If the token acquisition fails, then it triggers the sign-in flow, and the Teams Client renders the OAuth card in a pop-up. The user signs into the third-party service and authorizes the scope that is being requested. The 3P authorization server sends an authorization code to the callback URL on the Teams Graph Service (TGS). The TGS calls the token URL endpoint on the 3P authorization server and exchanges the code for a token that TGS shares.

To enable OAuth for your API based message extension:

* [Ensure prerequisites](#ensure-prerequisites).
* [Configure OAuth in Developer Portal](#configure-oauth-in-developer-portal).
* [Add OAuth client registration ID in API based message extension](#add-oauth-client-registration-id-in-api-based-message-extension).
* [Update app manifest](#update-app-manifest).

### Ensure prerequisites

Before you start, you must have:

* A Microsoft Teams app with API Message Extensions or Plugins.
* An OAuth 2.0 client ID and client secret from the third-party authorization server.

### Configure OAuth in Developer Portal

You can register OAuth client configurations for your API based message extensions and Copilot plugins in Teams Developer Portal.

To register OAuth for your API based message extensions, follow these steps:

1. Go to Teams Developer Portal.

1. Select **OAuth client registration**.

1. Select **Register Client**.

   :::image type="content" source="../assets/images/Copilot/api-based-me-oauth-register.png" alt-text="Screenshot shows the registerclient  option to register oauth configuration id in Developer Portal for Teams.":::

1. In the **OAuth client registration** page under **App settings**, update the following:

    :::image type="content" source="../assets/images/Copilot/api-based-me-oauth-app-settings.png" alt-text="Screenshot shows the app seetings for Oauth configutraion in developer portal for Teams.":::

   1. <b>Registration name</b>: A descriptive name for your OAuth client registration.
   1. <b>Base URL</b>: Teams transmits the secret to URL endpoints that begin with the value in this field.
   1. Under **Restrict usage by org**, select any of the following:

      * **My organization only**
      * **Any Microsoft 365 organization**

          | Option | When to use | Description |
          | --- | --- | --- |
          | **My organization only** | When you develop your app in your tenant and test the app as a custom app or custom app built for your org. | The API key is only usable within the tenant where the API is registered. |
          | **Any Microsoft 365 organization** | After you've completed testing the app and want to enable the app across different tenants. <br> Ensure that you update your target tenant to **Any Microsoft 365 organization** before submitting your app package to the Partner Center. <br><br> :::image type="icon" source="../assets/images/Copilot/api-based-me-api-key-tenant.png" alt-text="Screenshot shows the Home tenant and Any tenant options under set a target tenant heading in Developer Portal for Teams."::: | The API key can be used in other tenants after the app is available in the Teams Store. |

   1. Under **Restrict usage by app**, select any of the following:

      * **Any Teams app**
      * **Existing Teams app ID**

          | Option | When to use | Description |
          | --- | --- |--- |
          | **Any Teams app** | When you develop your app in your tenant and test the app as a custom app or custom app built for your organization. | The API key can be used with any Teams app. It's useful when custom app or custom app built for your organization have IDs generated after app upload. |
          |**Existing Teams app ID** | After you've completed testing your app within your tenant as a custom app or custom app built for your organization. <br> Update your API key registration and select **Existing Teams app** and input your app’s manifest ID. | The **Existing Teams app** option binds the API secret registration to your specific Teams app. |

1. Under **OAuth settings**, update the following:

    :::image type="content" source="../assets/images/Copilot/api-based-me-oauth-oauthsettings.png" alt-text="Screenshots shows the OAuth settings required for oauth configuration ID in Developer Portal for Teams":::

   1. **Client ID**: The client ID is a unique identifier assigned to your application by the third-party authorization server.

   1. **Client secret**: The client secret is a confidential string known by the third-party authorization server.

   1. **Authorization endpoint**: The authorization endpoint is the URL where a user is redirected to sign-in and grant or deny access to your app. For example, `https://login.example.com/authorize`.

   1. **Token endpoint**: The token endpoint is the URL where your app exchanges the authorization code for an access token. For example, `https://authorization-server.com/oauth/token`.

   1. **Refresh endpoint**: By using the refresh endpoint URL, your app obtains a new access token without user interaction. For example, `https://authorization-server.com/oauth/refresh`. At times, the refresh endpoint might be the same as the token endpoint.

   1. **Scope**: *[Optional]* The scope defines the permissions your app requests from the user.

1. Select **Save**.

   An **OAuth client registration ID** is generated.

   :::image type="content" source="../assets/images/Copilot/api-based-me-oauth-registration-id.png" alt-text="Screenshot shows the OAuth client registration ID generated in Developer POrtal for Teams.":::

You've now successfully configured OAuth in Developer Portal.

> [!IMPORTANT]
> When setting up your OAuth application with a third-party authentication provider, ensure that you add https://teams.microsoft.com/api/platform/v1.0/oAuthRedirect to the list of allowed redirect endpoints. These providers maintain a list of these endpoints to call for their application, making it crucial to include this URL to ensure seamless functionality.

### Add OAuth client registration ID in API based message extension

To update **OAuth client registration ID** in API based message extension, follow these steps:

1. Go to Teams Developer Portal.

1. From the left pane, select **Apps**.

1. Select the message extension app that you've created.

1. From the left pane under **Configure**, select **App features** > **Message extension**.

1. Under **Authentication and authorization**, select **OAuth** and enter the **OAuth client registration ID**.

1. Select **Save**.

   :::image type="content" source="../assets/images/Copilot/api-based-me-oauth-add-oauth-registration.png" alt-text="Screenshot shows the OAuth to add the registration ID copied earlier to the message extension in Developer Portal for Teams.":::

  Your API based message extension is configured with OAuth authentication.

### Update app manifest

Update your Teams app manifest schema to include the new auth type: `oAuth` and the `oAuthConfigurationId` you received from the Developer Portal.

```json
{
    "composeExtensions": [
        {
            "composeExtensionType": "apiBased",
            "authorization":
            {
                "authType": "oAuth2.0",
                "oAuthConfiguration": {
                    "oAuthConfigurationId": "sCVBX2udSXEtxo97behM1ReO8pJc4MdA"
                }
            },
            "apiSpecificationFile": "apiSpecFiles/repairs-openapi.json",
            "commands": [
                {
                    "id": "listRepairs",
                    "type": "query",
                    "context": ["compose", "commandBox"],
                    "title": "List all repairs",
                    "description": "Returns a list of repairs with their details and images",
                    "parameters": [
                        {
                            "name": "assignedTo",
                            "title": "Assigned To",
                            "description": "Filter repairs by who they're assigned to"
                        }
                    ],
                    "apiResponseRenderingTemplateFile": "adaptiveCards/repairs.json"
                }
            ]
        }
    ]
}
```

## Handle errors

Ensure that the OAuth implementation in your app can handle error cases such as, missing token, expired token, invalid token, user fails to log-in or the permission isn't granted, user closes the dialog box, invoke request fails due to a network issue, the service is down, the service is unable to fetch the app, endpoint returns any error other than 401 or 403, the resource server returns 401 or 403.

## Limitations and best practices

* After an OAuth configuration is saved, it becomes read-only, except for updating the allowed app ID or allowed tenant, the description, and the domain.
* Developers must not update the OAuth configuration frequently, even during the initial development process.
* If a developer wants to make any changes to configuration such as, adding a scope or authorization URL, they must register a new OAuth configuration, which generates a new unique ID.

For more information, see the [Microsoft Teams Developer Documentation](https://developer.microsoft.com/en-us/microsoft-teams).

Implementing OAuth 2.0 for API message extensions and plugins in Microsoft Teams enhances the security of your app. It provides a secure way to access user data from third-party applications without exposing user credentials.

## See also

* [Create API based message extension](create-api-message-extension.md)
* [Authenticate users in Microsoft Teams](../concepts/authentication/authentication.md)
* [Configure your API based message extension in Microsoft Entra ID](api-based-microsoft-entra.md)
