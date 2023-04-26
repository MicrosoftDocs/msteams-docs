---
title: Use Azure AD for Teams apps
author: v-ypalikila
description: Hosting your Teams app on Azure helps you create applications that are scalable, reliable, and maintainable.
ms.topic: conceptual
ms.author: v-ypalikila
ms.localizationpriority: medium
---
# Use Azure AD for Teams apps

Azure Active Directory (AD) is a cloud platform designed to simplify the process of building modern applications. You can host your Teams apps entirely in Azure or extend your app with Azure services. Hosting your Teams app on Azure helps you create applications that are scalable, reliable, and maintainable. Azure supports the most popular programming languages, including Python, JavaScript, Java, .NET, and Go.
You must have an Azure account to use Azure resources or to host your Teams app on Azure AD.
For more information, see [Azure AD subscription](https://learn.microsoft.com/azure/developer/intro/azure-developer-billing#what-is-an-azure-subscription>).
To host your app on Azure AD, you must register it.
Azure services
With Azure AD, you can use the following services for your Teams app

- Host any Teams app on Azure AD with any capability
- Teams apps for meetings:
- Generate meeting token for Teams
- Generate Teams meeting sidepanel
- Teams bot apps
- Create client secret for the bot app
- Authentication for Teams apps
- Configure Single sign-on for your app
- Configure third-party authentication for your app
- Send activity feed notification from Microsoft Teams activity feed

## Register your Teams app on Azure AD

### Create and register your app

The following steps help you to create and register your app in Azure portal:

- Create an app registration in Azure AD.

- Use ngrok to create a tunnel.

#### Create an app registration in Azure AD

Register a new app in Azure AD and configure the tenancy and app's platform. You'll generate a new app ID that will be updated later in your Teams app manifest file.

To register a new app in Azure AD

1. Open the Azure portal on your web browser. The Microsoft Azure AD Portal page opens.
2. Select the App registrations icon. The App registrations page appears.
3. Select + New registration icon. The Register an application page appears.
4. Enter the name of your app that you want to be displayed to the app user. You can change this name at a later stage if you want to.

5. Select Multitenant as the type of user account that can access your app.
6. Select Register. A message pops up on the browser stating that the app was created. The page with app ID and other configurations is displayed.
