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

You can enable the following authentication methods for your API-based message extension:

* **Secret service authentication**: Implement secret service authentication to use a secret token known only to the app and the API service to authenticate requests. For more information, see [API secret service authentication](api-based-secret-service-auth.md).

* **Microsoft Entra authentication**: Microsoft Entra is a comprehensive identity and access management solution that provides secure authentication for API-based message extensions. It ensures that only authenticated users can access your app’s features within Microsoft Teams.

  You can implement authentication in API-based message extension to provide secure and seamless access to app. If your message extension requires authentication, update your app manifest as follows:

  * Add the `authorization` property under `composeExtensions`.
  * Define the type of authentication for your app by setting the `authType` property under `authorization`.

    For more information, see [configure your app in Microsoft Entra ID](api-based-microsoft-entra.md).

* **None**: Update `none` as a value for `authorization` in an API-based message extension when the API doesn't require any authentication for the user. When Teams service sends a request to the API, it doesn't supply any authentication information.

    ```json
        "authorization": {
          "authType": "none"
          }
    ```

## See also

[Create API-based message extension](create-api-message-extension.md)
