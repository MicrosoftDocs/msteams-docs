---
title: Configuring OAuth 2.0 identity providers
description: Describes how to configure identity providers with a focus on Azure AD
keywords: teams authentication AAD oauth identity provider
ms.date: 03/01/2018
---
# Configuring identity providers

## Configuring an application to use Azure Active Directory as an identity provider

Identity providers supporting OAuth 2.0 will not authenticate requests from unknown applications; applications must be registered ahead of time. To do this with Azure AD, follow these steps:

1. Open the [Application Registration Portal](https://apps.dev.microsoft.com/), click on *Add an app* and follow the steps to register your app. If your app has already been registered (for example if you have previously registered a bot in your app) locate your app.

2. Select your app to view its properties. Find the *Platforms* section for the app and select *Add Platform*.

    ![View team](~/assets/images/authentication/AppRegistration.png)

3. From the *Add Platform* dialog select *Web*.

    ![View team](~/assets/images/authentication/AddPlatform.png)

4. The *Add Platform* section of the app properties page will now look something like this:

    ![View team](~/assets/images/authentication/Platforms.png)

    Add the OAuth 2.0 redirect and logout URLs in the Web section of Platforms. For the TypeScript/Node.js and C# sample apps on GitHub, the redirect URLs will be similar to this:

    Redirect URLs: https://\<hostname\>/bot-auth/simple-start

    No logout URL is required.

    Replace `<hostname>` with your actual host. This might be a dedicated hosting site such as Azure, Glitch, or an ngrok tunnel to localhost on your development machine such as `abcd1234.ngrok.io`. You may not have this information yet if you have not completed or hosted your app (or the sample app mentioned above), but you can always return to this page when that information is known.

## Other authentication providers

* **LinkedIn** Follow the instructions in [Configuring your LinkedIn application](https://developer.linkedin.com/docs/oauth2)

* **Google** Obtain OAuth 2.0 client credentials from the [Google API Console](https://console.developers.google.com/)
