---
title: Configure an authentication provider
description: Describes how to configure an authentication provider
keywords: teams authentication AAD
ms.date: 02/28/2018
---
# Configure an authentication provider

## Configure Azure Active Directory for authentication

Most service providers require you to register your application with their service before you can authenticate and consume service resources. To do this with AAD follow these steps:

1. Open the [Application Registration Portal](https://apps.dev.microsoft.com/), click on *Add an app* and follow the steps to register your app. If your app has already been registered (for example if you have previously registered a bot in your app) locate your app.

2. Select your app to view it's properties. Find the *Platforms* section for the app and select *Add Platform*.

    ![View team](~/assets/images/authentication/AppRegistration.png)

3. From the *Add Platform* dialog select *Web*.

    ![View team](~/assets/images/authentication/AddPlatform.png)

4. The *Add Platform* section of the app properties page will now look something like this:

    ![View team](~/assets/images/authentication/Platforms.png)

    Add the redirect and logout URLs in the Web section of Platforms. For the TypeScript/Node.js and C# sample apps on GitHub, the redirect URLs will be similar to this:

    Redirect URLs: https://yourhost/bot-auth/simple-start

    No logout URL is required.

    `yourhost` is replaced by your actual host. This might be a dedicated hosting site, Glitch or an ngrok redirect to localhost on your development machine. You may not have this information yet if you have not completed or hosted your app (or the sample app mentioned above), but you can always return to this page when that information is known.

## Other authentication providers

* **LinkedIn** Follow the instructions in [Configuring your LinkedIn application](https://developer.linkedin.com/docs/oauth2)

* **Google** Obtain OAuth2 client credentials from the [Google API Console](https://console.developers.google.com/)