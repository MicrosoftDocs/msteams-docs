---
title: Sideload and test app in Teams environment v4
author: zyxiaoyuer
description: In this module, learn how to sideload and test app in different environment using Teams toolkit v4.
ms.author: surbhigupta
ms.localizationpriority: high
ms.topic: overview
ms.date: 03/03/2022
---

# Sideload and test app in Teams environment v4

After adding API connection, you can test API connection in the Teams Toolkit local environment and deploy your application to the cloud. In CI/CD pipeline, after set-up with different platform, you need to create Azure service principal to provision and deploy resources.

In this section, you'll learn

* [Test API connection in local environment](#test-api-connection-in-local-environment)
* [Deploy your application to Azure](#deploy-your-application-to-azure)
* [Provision and deploy CI/CD resources](#provision-and-deploy-cicd-resources)

## Test API connection in local environment

The following steps help to test the API connection in the Teams Toolkit local environment:

 1. **Run npm install**

    Run `npm install` under `bot` or `api` folder to install added packages.

 2. **Add API credentials to the local application settings**

    Teams Toolkit does't ask for credentials but it leaves placeholders in the local application settings file. Replace the placeholders with the appropriate credentials to access the API. The local application settings file is the `.env.teamsfx.local` file in the `bot` or `api` folder.

 3. **Use the API client to make API requests**

    Import the API client from the source code that needs access to the API:

    ```BASH
    import { yourApiClient } from '{relative path to the generated file}'
    ```

 4. **Generate http(s) requests to target API (with Axios)**

    The generated API client is an Axios API client. Use the Axios client to make requests to the API.

     > [!Note]
     > [Axios](https://www.npmjs.com/package/axios) is a popular nodejs package that helps you with http(s) requests. For more information on how to make http(s) requests, see [Axios example documentation](https://axios-http.com/docs/example) to learn how to make http(s).

## Deploy your application to Azure

To deploy your application to Azure, you need to add the authentication to the application settings for the appropriate environment. For example, your API might have different credentials for `dev` and `prod`. Based on environment needs, configure Teams Toolkit.

Teams Toolkit configures your local environment. The bootstrapped sample code contains comments that tell you what app settings you need to configure. For more information on application settings, see [Add app settings](https://github.com/OfficeDev/TeamsFx/wiki/%5BDocument%5D-Add-app-settings)

## Provision and deploy CI/CD resources

To provision and deploy resources targeting Azure inside CI/CD, you must create an Azure service principal for use.

Perform the following steps to create Azure service principals:

1. Register an Microsoft Azure Active Directory (Azure AD) application in single tenant.
2. Assign a role to your Azure AD application to access your Azure subscription. The `Contributor` role is recommended.
3. Create a new Azure AD application secret.

> [!TIP]
> Save your tenant id, application id (AZURE_SERVICE_PRINCIPAL_NAME), and the secret (AZURE_SERVICE_PRINCIPAL_PASSWORD) for future use.

For more information, see [Azure service principals guidelines](/azure/active-directory/develop/howto-create-service-principal-portal). The following are the three ways to create service principals:

* [Microsoft Azure portal](/azure/active-directory/develop/howto-create-service-principal-portal)
* [Windows PowerShell](/azure/active-directory/develop/howto-authenticate-service-principal-powershell)
* [Microsoft Azure CLI](/cli/azure/create-an-azure-service-principal-azure-cli)

## See also

* [Teams Toolkit Overview](teams-toolkit-fundamentals-v4.md)
* [Publish Teams apps using Teams Toolkit](publish-v4.md)
