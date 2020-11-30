---
title: Single sign-on authentication with Teams Toolkit and Visual Studio Code for tabs
description: Build a tab that supports single-sign-on and Microsoft Graph calls directly within Visual Studio Code with the Microsoft Teams Toolkit
keywords: teams visual studio code toolkit tabs sso graph authentication Azure identity platform
ms.topic: how-to
ms.author: lajanuar
---
# Single sign-on authentication with Teams Toolkit and Visual Studio Code for tabs

The Microsoft Teams Toolkit enables you to create single sign-on (SSO) authentication  for tab apps directly within Visual Studio Code. The toolkit guides you through the process and provides everything you need including provisioning your Microsoft identity platform registration in the Azure portal.

## Get started — create a project

1. Create a new project in the toolkit.
1. Select tab as the type of extension you'd like to create.
1. Select the option to support SSO.

> [!TIP]
> After installation, you should see the Teams Toolkit in the Visual Studio Code activity bar. If not, right-click within the activity bar and select **Microsoft Teams** to pin the toolkit for easy access.

## Configure your project

1. To enable SSO within Teams, your app must have an Azure app registration resource. The Teams Toolkit will provision the app registration on your behalf.
1. Enter the URL where your app will be hosted and select **next**. Your app registration will be configured using the provided URL.
1. The app registration's configuration details will be stored in the `.env` files in your project's source code.

If you would like to learn more about how your Azure app registration will be provisioned, please _see_  our [single sign-on (SSO) support for tabs](../tabs/how-to/authentication/auth-aad-sso.md) documentation.

> [!TIP]
> You will need to go to **Azure App Registrations** and update your *API URI* and *redirect URLs* whenever you change this URL.

## Run your project

1. Select **npm install** from the `api-server` folder. Then **npm start**.
1. Select **npm install** from the `.src` folder. Then **npm start**.
1. If you are using a tunneling service like [ngrok](https://ngrok.com/), run it and make sure the URL matches with what you entered in the project creation wizard. If it doesn't, you will need to update your _API URI_ and _redirect URL_ in the app registration that was created in Azure.
1. Navigate to the activity bar on the left side of the Visual Studio Code window.
1. Select the **Run** icon to display the **Run and Debug** view.
1. You can also use the keyboard shortcut **Ctrl+Shift+D**.

> [!TIP]
> You may not see the app install dialogue in the browser if pop-up windows are disabled for your browser. If this happens, enable pop-up windows and refresh the page.

> [!div class="nextstepaction"]
> [Learn more: Build apps with the Microsoft Teams Toolkit and Visual Studio Code](visual-studio-code-overview.md)
