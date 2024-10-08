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

Authentication is a fundamental aspect of security and serves as the first line of defense, ensuring that access to systems, applications, and data is granted only to those with verified credentials. Authentication for API-based message extensions is crucial for several reasons:

* **Security**: It protects against unauthorized access and potential breaches, safeguarding both user data and the integrity of the system.
* **Data Privacy**: Ensures that personal and sensitive information is only accessible to users with the correct permissions.

* **User Trust**: Builds confidence among users that their interactions with the app are secure, which is essential for user adoption and engagement.

You can enable the following authentication methods for your API-based message extension:

**None**: If your message extension doesn’t require any authentication for the user to access the API, you can set the authType to “none” in your app manifest.

**Secret Service Auth**: For a more secure method, you can implement secret service authentication, which uses a secret token known only to the app and the API service to authenticate requests. For more information, see [configure your app in Microsoft Entra ID](../bots/how-to/authentication/bot-sso-register-aad.md).

**Microsoft Entra Authentication**: Microsoft Entra is a comprehensive identity and access management solution that provides secure authentication for API-based message extensions. It ensures that only authenticated users can access your app’s features within Microsoft Teams.

You can implement authentication in API-based message extensions to provide secure and seamless access to applications. If your message extension requires authentication, add the `authorization` property under `composeExtensions` in app manifest and define the type of authentication for your application by setting the `authType` property under `authorization`. For more information, see [configure your app in Microsoft Entra ID](api-based-microsoft-entra.md).

## None

Update `none` as a value for `authorization` in an API-based message extension when the API doesn't require any authentication for the user. When Teams service sends a request to the API, it doesn't supply any authentication information.

```json
    "authorization": {
      "authType": "none"
      }
    },
```

## See also

[Create API-based message extension](create-api-message-extension.md)
