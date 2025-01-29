---
title: Authentication for API-based Message Extension
author: v-ypalikila
description: Learn about the requirements and troubleshooting guidelines for an API-based message extension, authentication, register an API key, and schema mapping.
ms.localizationpriority: medium
ms.topic: overview
ms.author: anclear
ms.date: 10/19/2023
---

# Enable authentication for API-based message extensions

Authentication is a fundamental aspect of security and serves as the first line of defense that ensures access to systems, applications, and data is granted only to those with verified credentials. Authentication for API-based message extensions is crucial for the following reasons:

* **Security**: Protects against unauthorized access and potential breaches, safeguarding both user data and the integrity of the system.
* **Data Privacy**: Ensures that personal and sensitive information is only accessible to users with the correct permissions.

* **User Trust**: Builds confidence among users that their interactions with the app are secure, which is essential for user adoption and engagement.

You can implement authentication in API-based message extensions to provide secure and seamless access to applications. If your message extension requires authentication, add the `authorization` property under `composeExtensions` in app manifest and define the type of authentication for your application by setting the `authType` property under `authorization`. To enable authentication for your message extension, update your app manifest with any of the following authentication methods:

* **API key authentication**: Implement API key authentication to use a key token known only to the app and the API service to authenticate requests. API key authentication involves using a unique key to verify the identity of users or apps accessing your API-based message extension app through an API. The key must be registered in Microsoft Teams. When users interact with your API-based message extension, Teams uses the API key to authenticate with your API. You can register through the Developer Portal for Teams and update the app manifest with the appropriate configuration. For more information, see [API key authentication](api-based-secret-service-auth.md).

* **SSO authentication**: Microsoft Entra is a comprehensive identity and access management solution that provides secure authentication for API-based message extensions. It ensures that only authenticated users can access your app’s features within Microsoft Teams.

  You can implement authentication in API-based message extension to provide secure and seamless access to app. If your message extension requires authentication, update your app manifest as follows:

  * Add the `authorization` property under `composeExtensions`.
  * Define the type of authentication for your app by setting the `authType` property under `authorization`.

    For more information, see [configure your app in Microsoft Entra ID](api-based-microsoft-entra.md).

* **OAuth authentication**: OAuth 2.0 in your Teams app is a great way to securely access user data from third-party applications without having to expose user credentials. You can choose to grant access only to the specific data you need, and the user must give their consent before your app can access their data.

  For more information, see [enable OAuth authentication for API based message extension](api-based-oauth.md).

* **None**: Update `none` as a value for `authorization` in an API-based message extension when the API doesn't require any authentication for the user. When Teams service sends a request to the API, it doesn't supply any authentication information.

    ```json
        "authorization": {
          "authType": "none"
          }
    ```

## See also

* [Create API-based message extension](create-api-message-extension.md)
* [Authenticate users in Microsoft Teams](../concepts/authentication/authentication.md)
* [Enable OAuth authentication for API based message extension](api-based-oauth.md)
