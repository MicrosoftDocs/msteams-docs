---
title: Identity Platform integration for the Microsoft Teams Toolkit and Visual Studio Code
description: Build a tab that supports single-sign-on and Graph calls directly within Visual Studio Code with the Microsoft Teams Toolkit
keywords: teams visual studio code toolkit tabs sso graph

---
# Tab SSO with the Microsoft Teams Toolkit and Visual Studio Code

The Microsoft Teams Toolkit enables you to create tab SSO apps directly within Visual Studio Code. The toolkit guides you through the process and provides everything you need including provision your Azure app registration.

## Create a project

Create a new project in the toolkit, and select tab as the type of extension you'd like to create. Select the option to support SSO.

> [!TIP]
> After installation, you should see the Teams Toolkit in the Visual Studio Code activity bar. If not, right-click within the activity bar and select **Microsoft Teams** to pin the toolkit for easy access.

## Configure your project

To enable SSO within Teams, your app must have an Azure app registration resource. The Teams Toolkit will provision the app registrtion on your behalf. Enter the URL where your app will be hosted and hit next. Your app registration will be configured using the provided URL. The app registration's configuration details will be stored in the *.env* files in your project's source code.

> [!TIP]
> You will need to go to **Azure App Registrations** and update your *API URI* and *redirect URLs* whenever you change this URL.

## Run your project

1. `npm istall` from the **api-server** folder. Then `npm start`.
1. `npm istall` from the **src** folder. Then `npm start`.
1. If you are using a tunneling service like ngrok, run it and make sure the URL matches what you entered in the project creation wizard. If it doesn't, you will need to update your API URI and redirect URL in the app registeation that was create in Azure for this app.
1. Hit **F5** to launch the app.

> [!TIP]
> You may not see the app install dialogue in the browser if popups are disabled for your browser. If this happens, enable popups and refresh the page.