---
title: Configure OAuth 2.0 identity providers
description: Describes how to configure identity providers with a focus on Azure AD
ms.topic: how-to
localization_priority: Normal
keywords: teams authentication AAD oauth identity provider
---
# Configure identity providers

## Prerequisite

The applications must be registerd. The identity providers supporting OAuth 2.0 will not authenticate requests from unknown applications.

## Configuring an application to use Azure Active Directory (AAD) as an identity provider

**To configure application with AAD:**

1. Open the [Application Registration Portal](https://ms.portal.azure.com/#blade/Microsoft_AAD_RegisteredApps/ApplicationsListBlade).

2. Select **New Registration**.
3. Provide the user-facing display name for this application. The name can be changed later.
4. Find the **Redirect URI** section for the app.
5. In the dropdown menu, select **Web**. 
6. Update the URL to authentication endpoint. For example, the redirect URL for TypeScript/Node.js and C# sample apps on GitHub is as follows:

    Redirect URLs: `https://<hostname>/bot-auth/simple-start`

Replace `<hostname>` with your actual host. This might be a dedicated hosting site such as Azure, Glitch, or an ngrok tunnel to localhost on your development machine such as `abcd1234.ngrok.io`.

## Other authentication providers

* **LinkedIn** For more information, see [Configuring your LinkedIn application](/linkedin/talent/apply-with-linkedin)

* **Google** Obtain OAuth 2.0 client credentials from the [Google API Console](https://console.developers.google.com/)

## See also

* [AAD authentication in tabs](~/tabs/how-to/authentication/auth-tab-AAD.md)
* [Silent authentication in tabs](~/tabs/how-to/authentication/auth-silent-AAD.md)
* [Add authentication to the Teams bot](~/bots/how-to/authentication/add-authentication.md)

## Next step

> [!div class="nextstepaction"]
> [Authentication flow in tabs](~/tabs/how-to/authentication/auth-flow-tab.md)
