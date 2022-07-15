---
title: Register your Teams app with Azure AD
description: Describes registering your Teams app with Azure AD
ms.topic: how-to
ms.localizationpriority: high
---
# Register your Teams app in Azure AD

Your Teams app can access resources available on Azure AD. You'll need to register your app with Azure AD.

### Before you register with Azure AD

It's helpful if you learn about the configuration for registering your app on Azure AD beforehand. Ensure that you've prepared to configure the following details prior to registering your app:

- **Single- or multi-tenant options**: Will your application be used in only the Microsoft 365 tenant where it is registered, or will many Microsoft 365 tenants use it? Applications written for one enterprise are typically single-tenant; applications written by an independent software vendor and used by many customers need to be multi-tenant so each customer's tenant can access the application.
- **Application ID URI**: It's a globally unique URI that identifies the web API you expose for your app's access through scopes. It's also referred to as an identifier URI. The application ID URI includes the app ID and the subdomain where your app is hosted. Your application's domain name and the domain name you register for your Azure AD application should be the same. Currently, multiple domains per app aren't supported.

## Create an app registration in Azure AD

Register a new app in Azure AD, and configure the tenancy and app's platform. You'll generate a new app ID that will be updated later in your Teams app manifest file.

### To register a new app in Azure AD

1. Open the [Azure portal](https://ms.portal.azure.com/) on your web browser.
   The Microsoft Azure AD Portal page opens.

2. Select the **App registrations** icon.

   :::image type="content" source="../../assets/images/aad-configuration/register-app/azure-portal.png" alt-text="Azure AD Portal page.":::

   The **App registrations** page appears.

3. Select **+ New registration** icon.

    :::image type="content" source="../../assets/images/aad-configuration/register-app/app-registrations.png" alt-text="New registration page on Azure AD Portal.":::

    The **Register an application** page appears.

4. Enter the name of your app that you want to be displayed to the app user. You can change this name at a later stage, if you want to.

    :::image type="content" source="../../assets/images/aad-configuration/register-app/register-app.png" alt-text="App registration page on Azure AD Portal.":::

5. Select the type of user account that can access your app. You can choose from single- or multi-tenant options, or Private Microsoft account.

    <details>
    <summary><b>Options for supported account types</b></summary>

    | Option | Select this to... |
    | --- | --- |
    | Accounts in this organizational directory only  (Microsoft only - Single tenant) | Build an application for use only by users (or guests) in your tenant. <br> Often called LOB application, this app is a single-tenant application in the Microsoft identity platform. |
    | Accounts in any organizational directory (Any Azure AD directory - Multi-tenant) | Let users in any Azure AD tenant use your application. This option is appropriate if, for example, you're building a SaaS application, and you intend make it available to multiple organizations. <br> This type of app is known as a multi-tenant application in the Microsoft identity platform.|
    | Accounts in any organizational directory (Any Azure AD directory - Multi-tenant) and personal Microsoft accounts | Target the widest set of customers. <br> By selecting this option, you're registering a multi-tenant application that can support app users who have personal Microsoft accounts also. |
    | Personal Microsoft accounts only | Build an application only for users who have personal Microsoft accounts. |

    </details>

7. Select **Register**.
    A message pops up on the browser stating that the app was created.

    :::image type="content" source="../../assets/images/aad-configuration/register-app/app-created-msg.png" alt-text="Register app on Azure AD Portal.":::

    The page with app ID and other configurations is displayed.

    :::image type="content" source="../../assets/images/aad-configuration/register-app/
app-created.png" alt-text="App registration is successful.":::

8. Note and save the app ID from **Application (client) ID**. You'll need it for updating the Teams app manifest later.

    Your app is registered in Azure AD.
