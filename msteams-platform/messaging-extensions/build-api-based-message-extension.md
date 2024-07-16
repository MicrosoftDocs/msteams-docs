---
title: Authentication for API-based message extensions
author: v-ypalikila
description: Learn about none, secret service auth, and Microsoft entra authentication methods for API-based message extension.
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

**Secret Service Auth**: For a more secure method, you can implement secret service authentication, which uses a secret token known only to the app and the API service to authenticate requests.

**Microsoft Entra Authentication**: Microsoft Entra is a comprehensive identity and access management solution that provides secure authentication for API-based message extensions. It ensures that only authenticated users can access your app’s features within Microsoft Teams.

You can implement authentication in API-based message extensions to provide secure and seamless access to applications. If your message extension requires authentication, add the `authorization` property under `composeExtensions` in app manifest and define the type of authentication for your application by setting the `authType` property under `authorization`. :

## None

Update `none` as a value for `authorization` in an API-based message extension when the API doesn't require any authentication for the user. When Teams service sends a request to the API, it doesn't supply any authentication information.

```json
    "authorization": {
      "authType": "none"
      }
    },
```

### Troubleshooting

* If you get a **Manifest parsing has failed** error message when uploading the app to teams, use [Teams app validator](https://dev.teams.microsoft.com/validation) to validate the app package, including the app manifest and OpenAPI spec file. Review the [app manifest](#app-manifest) and the [OpenAPI Description document](#oad) requirements to resolve errors or warnings and try uploading your app.

   :::image type="content" source="../assets/images/Copilot/api-me-troubleshoot-sideload.png" alt-text="Screenshot shows the error message when uploading an app to Teams along with the option to copy the error details to clipboard.":::

* If you encounter any issues while running your app in Teams, use the following troubleshooting steps to identify and resolve your issue:

  * **Network**: Select the **Network** tab in Developer tools to inspect network activity

     1. Open [Teams web client](https://teams.microsoft.com).
     1. Sign in with your Microsoft 365 credentials.
     1. Go to a chat, and run your message extension app.
     1. At the top-right, select **Settings and more (...)**. Go to **More tools** > **Developer tools**.
     1. Select **Network**. Select the **filter** option and enter **invoke** in the search field.
     1. Select an error from the list.
     1. In the right pane, select the **Response** tab.

     1. A JSON object representing an error response from a service or API is displayed. It contains a `standardizedError` object with `errorCode`, `errorSubCode`, and `errorDescription`, which have more details about the error.

        :::image type="content" source="../assets/images/Copilot/api-me-troubleshoot-network.png" alt-text="Screenshots shows the network tab, the list of Invoke Errors, and the error details in the response tab in Developer tools while running a message extension in Teams and getting an error.":::

      **Common HTTP Error Responses**:

    * A 400 Bad Request error might occur if a request parameter is missing or incorrectly formatted.
    * A 401 Unauthorized or 403 Forbidden error suggests issues with the API key, such as it being missing or unauthorized.
    * A 500 Internal Server Error indicates that the service doesn't know how to respond, due to a server-side issue.

* **Troubleshooting with Tools**: If the information from the network trace is insufficient, you can construct a request following the OpenAPI description document and use tools like Swagger Editor or Postman to test the request, including the authorization header for the API key if necessary.

If you’re unable to resolve the errors, we recommend contacting [Microsoft Teams product support](../feedback.md#product-support-and-service-issues) for further assistance.

## Next step

> [!div class="nextstepaction"]
> [Create API-based message extension](create-api-message-extension.md)