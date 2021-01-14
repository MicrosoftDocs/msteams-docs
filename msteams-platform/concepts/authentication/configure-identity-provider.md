---
title: Configuring OAuth 2.0 identity providers
description: Describes how to configure identity providers with a focus on Azure AD
ms.topic: conceptual
keywords: teams authentication AAD oauth identity provider
---
# Configuring identity providers

## Configuring an application to use Azure Active Directory as an identity provider

Identity providers supporting OAuth 2.0 will not authenticate requests from unknown applications; applications must be registered ahead of time. To do this with Azure AD, follow these steps:

1. Open the [Application Registration Portal](https://ms.portal.azure.com/#blade/Microsoft_AAD_RegisteredApps/ApplicationsListBlade).

2. Select your app to view its properties, or click the "New Registration" button. Find the **Redirect URI** section for the app.

3. In the dropdown menu, make sure **Web** is selected. Update the URL to your authentication endpoint. For the TypeScript/Node.js and C# sample apps on GitHub, the redirect URLs will be similar to this:

    Redirect URLs: `https://<hostname>/bot-auth/simple-start`

Replace `<hostname>` with your actual host. This might be a dedicated hosting site such as Azure, Glitch, or an ngrok tunnel to localhost on your development machine such as `abcd1234.ngrok.io`. You may not have this information yet if you have not completed or hosted your app (or the sample app mentioned above), but you can always return to this page when that information is known.

## Other authentication providers

* **LinkedIn** Follow the instructions in [Configuring your LinkedIn application](https://developer.linkedin.com/docs/oauth2)

* **Google** Obtain OAuth 2.0 client credentials from the [Google API Console](https://console.developers.google.com/)
