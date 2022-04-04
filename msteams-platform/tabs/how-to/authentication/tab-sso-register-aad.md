---
title: Register your tab app with Azure AD
description: Describes registering your tab app with Azure AD
ms.topic: how-to
ms.localizationpriority: medium
keywords: teams authentication tabs Microsoft Azure Active Directory (Azure AD)
---
# Register your tab application in Azure AD

This section describes the tasks involved in creating a Teams tab that uses SSO. These tasks are language- and framework-agnostic.

   > [!NOTE]
   > The Microsoft Teams Toolkit can to register the Azure AD application in a SSO project.

   In this section, you'll learn how to register and configure the Azure AD app that can be used to implement SSO in a Microsoft Teams tab app.

   To complete the registration of your tab app in Azure AD:

   1. [Register your app](#register-your-app)
   1. [Configure API permissions with Microsoft Graph](#configure-api-permissions-with-microsoft-graph)
   2. [Expose an API](#expose-an-api)
   3. [Create a client secret](#create-client-secret)

### Register your app

In this section, you'll learn to create and register an Azure-based Teams tab app.

To register your tab app in Azure AD:

1. Open a web browser to the [Azure portal](https://ms.portal.azure.com/).
   The Microsoft Azure AD Portal page opens.

1. Select **App registrations** icon.

   :::image type="content" source="../../../assets/images/authentication/teams-sso-tabs/azure-portal.png" alt-text="Azure AD Portal page." border="false":::

   The **App registrations** page appears.

1. Select **+ New registration** icon.

    :::image type="content" source="../../../assets/images/authentication/teams-sso-tabs/app-registrations.png" alt-text="New registration page on Azure AD Portal." border="false":::

    The **Register an application** page appears.

1. Enter the app details for your tab app.

    :::image type="content" source="../../../assets/images/authentication/teams-sso-tabs/register-app.png" alt-text="App registration page on Azure AD Portal." border="false":::

    1. Enter the name of your app that will be displayed to the user.
        You can change this name at a later stage, if you want to.

    1. Select the intended types of user accounts that can access your app. For this section, select **Accounts in this organizational directory only (Microsoft only - Single tenant)**.

1. Select the **Redirect URI** details.

    :::image type="content" source="../../../assets/images/authentication/teams-sso-tabs/redirect-uri.png" alt-text="redirect URI." border="true":::

    1. Select the platform where your app will be accessible.
    2. Enter URL for your app. After user authentication is successful, Teams uses this URL to open your app.
       You can change this URL at a later stage, if needed.

1. Select **Register**.
    A message pops up on the browser stating that the app was created.

    :::image type="content" source="../../../assets/images/authentication/teams-sso-tabs/app-created-msg.png" alt-text="Register app on Azure AD Portal." border="true":::

    The app is created and displayed.

    :::image type="content" source="../../../assets/images/authentication/teams-sso-tabs/tab-app-created.png" alt-text="App registration is successful." border="false":::

1. Note and save the **Application ID**. You'll need it for updating the app manifest.

    Your Teams tab app is created.
