---
title: Use Existing Microsoft Entra App
author: surbhigupta
description: Learn how to use an existing Microsoft Entra app in TeamsFx or create a new app for TeamsFx, set up info in TeamsFx project, and upload the app to Azure.
ms.author: surbhigupta
ms.localizationpriority: medium
ms.topic: overview
ms.date: 02/27/2025
---

# Use existing Entra app in TeamsFx

This section provides information for using existing Microsoft Entra app or manually creates Microsoft Entra app for TeamsFx project. Follow the instruction and make sure all required info is properly set in your TeamsFx project.

<a name='create-an-azure-ad-app'></a>

## Create a Microsoft Entra app

> [!NOTE]
> You can skip this part if you already have a Microsoft Entra app. This step can be automated by the `aadApp/create` action.

1. Go to the [Azure portal](https://portal.azure.com) and select **Microsoft Entra ID**.

1. Select **App Registrations** > **New registration** to create a new Microsoft Entra app:
   * **Name**: The name of your configuration app.
   * **Supported account types**: Select **Account in this organizational directory only**.
   * Leave the **Redirect URL** field blank for now.
   * Select **Register**.

1. When the app is registered, you're taken to the app's **Overview** page. Copy the **Application (client) ID**, **Object ID**, and **Directory (tenant) ID**; it's needed later. Verify that the **Supported account types** is set to **My organization only**.

> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI%20ran%20into%20an%20issue%5D%20Create%20a%20Microsoft%20Entra%20app&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Ftoolkit%2Fuse-existing-aad-app&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Ftoolkit%2Fuse-existing-aad-app.md&documentVersionIndependentId=77f06929-b242-9b97-eb5b-2f1e713b693a&author=surbhigupta&metadata=*%2BID%253A%2Be473e1f3-69f5-bcfa-bcab-54b098b59c80%2B%250A*%2BService%253A%2B**msteams**)

<a name='create-client-secret-for-azure-ad-app-optional'></a>

## Create client secret for Microsoft Entra app (optional)

> [!NOTE]
> You can skip this part if your application doesn't require client secret. This step can be automated by the `aadApp/create` action.

1. Go to app's **Certificates & secrets** page, select **Client Secret** and select **New client secret**.
   * **Description**: The description of your client secret.
   * **Expires**: The expire time of your client secret.
   * Select **Add**.

1. When the client secret is added, press the copy button under the **Value** column to copy the **Client Secret**.

<a name='create-access-as-user-scope-for-azure-ad-app-optional'></a>

## Create access as user scope for Microsoft Entra app (optional)

> [!NOTE]
> You can skip this part if your M365 account has permission to update the Microsoft Entra app. We'll create the scope for you. This step can be automated by the `aadApp/update` action.

1. Go to app's **Expose an API** page, select **Add a scope** under **Scopes defined by this API**.
   * Select **Save and continue**.
   * **Scope name**: Fill in **access_as_user**.
   * **Who can consent?**: Choose **Admins and users**.
   * **Admin consent display name**: Fill in **Teams can access app’s web APIs**.
   * **Admin consent description**: Fill in **Allows Teams to call the app’s web APIs as the current user**.
   * **User consent display name**: Fill in **Teams can access app’s web APIs and make requests on your behalf**.
   * **User consent description**: Fill in **Enable Teams to call this app’s web APIs with the same rights that you have**.
   * **State**: Choose **Enabled**.
   * Select **Add scope**.

1. On the same page, select **Add a client application** under **Authorized client applications**.
   * **Client ID**: Fill in **1fec8e78-bce4-4aaf-ab1b-5451cc387264** which is Client ID for Microsoft Teams on mobile and client.
   * **Authorized scopes**: Choose the existing **access_as_user** scope.
   * Select **Add application**.

1. Select again on **Add a client application**.
   * **Client ID**: Fill in **5e3ce6c0-2b1f-4285-8d4b-75ee78787346** which is Client ID for Teams on web.
   * **Authorized scopes**: Choose the existing **access_as_user** scope.
   * Select **Add application**.

2. Go to app's **Manifest** page, copy the **id** under **oauth2Permissions** as **Access As User Scope ID**.

> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI%20ran%20into%20an%20issue%5D%20Create%20access%20as%20user%20scope%20for%20Microsoft%20Entra%20app%20%28optional%29&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Ftoolkit%2Fuse-existing-aad-app&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Ftoolkit%2Fuse-existing-aad-app.md&documentVersionIndependentId=77f06929-b242-9b97-eb5b-2f1e713b693a&author=surbhigupta&metadata=*%2BID%253A%2Be473e1f3-69f5-bcfa-bcab-54b098b59c80%2B%250A*%2BService%253A%2B**msteams**)

<a name='get-necessary-info-from-existing-azure-ad-app'></a>

## Get necessary info from existing Microsoft Entra app

> [!NOTE]
> You may skip this part if you follow the instruction above to create a Microsoft Entra app.

1. Go to the [Azure portal](https://portal.azure.com) and select **Microsoft Entra ID**.

1. Select **App Registrations** and find your existing Microsoft Entra app.

1. Go to app's **Overview** page, copy the **Application (client) ID**, **Object ID**, and **Directory (tenant) ID**; it's needed later. Verify that the **Supported account types** is set to **My organization only**.

1. Go to app's **Certificates & secrets** page, press the copy button under the **Value** column to copy the **Client Secret**.

    > [!NOTE]
    > If you can't copy the secret, please follow the [instruction](#create-client-secret-for-azure-ad-app-optional) to create a new client secret.

1. Go to apps **Expose an API** page. If you've already added **access_as_user** scope under **Scopes defined by this API** and pre-auth the two Teams Client Ids, go to app's **Manifest** page, copy the **id** under **oauth2Permissions** as **Access As User Scope ID**.

> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI%20ran%20into%20an%20issue%5D%20Get%20necessary%20info%20from%20existing%20Microsoft%20Entra%20app&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Ftoolkit%2Fuse-existing-aad-app&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Ftoolkit%2Fuse-existing-aad-app.md&documentVersionIndependentId=77f06929-b242-9b97-eb5b-2f1e713b693a&author=surbhigupta&metadata=*%2BID%253A%2Be473e1f3-69f5-bcfa-bcab-54b098b59c80%2B%250A*%2BService%253A%2B**msteams**)

## Set necessary info in TeamsFx project

> [!NOTE]
> If you don't use `aadApp/create` action to create Microsoft Entra application, you can add required environment variables with your preferred name without following the below steps.

1. Open `teamsapp.yml` and find the `aadApp/create` action.

1. Find the environment variable names that store information for Microsoft Entra app in the `writeToEnvironmentFile` property. Below are the default `writeToenvironmentFile` definition if you create projects using Teams Toolkit:

   ``` yaml
    writeToEnvironmentFile:
      clientId: AAD_APP_CLIENT_ID
      clientSecret: SECRET_AAD_APP_CLIENT_SECRET
      objectId: AAD_APP_OBJECT_ID
      tenantId: AAD_APP_TENANT_ID
      authority: AAD_APP_OAUTH_AUTHORITY
      authorityHost: AAD_APP_OAUTH_AUTHORITY_HOST
   ```

1. Add values for each environment variable from step 2.

   1. Add below environment variables and their values to `env\.env.{env}` file.

      ```yml
      AAD_APP_CLIENT_ID=<value of Microsoft Entra application's client id (application id)> # example: 00000000-0000-0000-0000-000000000000
      AAD_APP_OBJECT_ID=<value of Microsoft Entra application's object id> # example: 00000000-0000-0000-0000-000000000000
      AAD_APP_TENANT_ID=<value of Microsoft Entra's (tenant) id> # example: 00000000-0000-0000-0000-000000000000
      AAD_APP_OAUTH_AUTHORITY=<value of Microsoft Entra's authority> # example: https://login.microsoftonline.com/<Directory (tenant) ID>
      AAD_APP_OAUTH_AUTHORITY_HOST=<host of Microsoft Entra's authority> # example: https://login.microsoftonline.com
      AAD_APP_ACCESS_AS_USER_PERMISSION_ID=<id of access_as_user permission> # example: 00000000-0000-0000-0000-000000000000
      ```

      `AAD_APP_OAUTH_AUTHORITY_HOST` represents the host of the authority URL of your Microsoft Entra tenant, for example, <https://login.microsoftonline.com>. Your bot uses this URL to authenticate users via OAuth 2.0. For environment-specific endpoints, see [Microsoft Entra authentication endpoints](/entra/identity-platform/authentication-national-cloud).

   1. If your application requires a Microsoft Entra app client secret, add below environment variable and its value to `env\.env.{env}.user` file.

      ```yml
      SECRET_AAD_APP_CLIENT_SECRET=<value of Microsoft Entra application's client secret>
      ```

      > [!NOTE]
      > Remember to update the environment variable names in the examples if you use different names in `writeToEnvironmentFile`.

1. Open Teams Toolkit extension and select **Provision in the cloud**. Wait until your project is successfully provisioned.

> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI%20ran%20into%20an%20issue%5D%20Set%20necessary%20info%20in%20TeamsFx%20project&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Ftoolkit%2Fuse-existing-aad-app&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Ftoolkit%2Fuse-existing-aad-app.md&documentVersionIndependentId=77f06929-b242-9b97-eb5b-2f1e713b693a&author=surbhigupta&metadata=*%2BID%253A%2Be473e1f3-69f5-bcfa-bcab-54b098b59c80%2B%250A*%2BService%253A%2B**msteams**)

<a name='upload-azure-ad-app-manifest-to-azure-portal'></a>

## Upload Microsoft Entra app manifest to Azure portal

If Teams Toolkit fails to update Microsoft Entra app, an error message appears:

```yml
Insufficient privileges to complete the operation.
```

If you see the above message, update Microsoft Entra app permission and follow the instructions to update permission.

1. Find the Microsoft Entra app manifest under `build/aad.manifest.{env}.json`.

1. Copy the content in the manifest file.

1. Go to the [Azure portal](https://portal.azure.com) and select **Microsoft Entra ID**.

1. Select **App Registrations** and find your existing Microsoft Entra app.

1. Go to app's **Manifest** page, paste the manifest content into the editor and select **Save** to save the changes.

> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI%20ran%20into%20an%20issue%5D%20Upload%20Microsoft%20Entra%20app%20manifest%20to%20Azure%20portal&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Ftoolkit%2Fuse-existing-aad-app&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Ftoolkit%2Fuse-existing-aad-app.md&documentVersionIndependentId=77f06929-b242-9b97-eb5b-2f1e713b693a&author=surbhigupta&metadata=*%2BID%253A%2Be473e1f3-69f5-bcfa-bcab-54b098b59c80%2B%250A*%2BService%253A%2B**msteams**)
