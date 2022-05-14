---
title: Manage Azure Active Directory application in Teams Toolkit
author: zyxiaoyuer
description:  Describes Managing Azure Active Directory application in Teams Toolkit
ms.author: surbhigupta
ms.localizationpriority: medium 
ms.topic: overview
ms.date: 05/13/2022
---

# Azure AD manifest

The [Azure Active Directory manifest](https://docs.microsoft.com/azure/active-directory/develop/reference-app-manifest) contains a definition of all the attributes of an Azure AD application object in the Microsoft identity platform.

Teams Toolkit now manages Azure AD application with the manifest file as the source of truth during your Teams application development lifecycles.

## Customize Azure AD manifest template

  You can customize Azure AD manifest template to update Azure AD application.

  1. Open `aad.template.json` in your project.
  
     :::image type="content" source="../assets/images/teams-toolkit-v2/manual/add template.png" alt-text="template":::

  2. Update the template directly or [reference values from another file](https://github.com/OfficeDev/TeamsFx/wiki/Manage-AAD-application-in-Teams-Toolkit#Placeholders-in-AAD-manifest-template).You can see several customization scenarios here:
  
    * [Add an application permission](#customize-requiredresourceaccess)
    * [Preauthorize a client application](#customize-preauthorizedapplications)
    * [Update redirect URL for authentication response](#customize-redirect-urls)

  3. Deploy your Azure AD application changes for local environment, see [Deploy AAD application changes for local environment](#deploy-aad-application-changes-for-local-environment).
  
  4. Deploy your Azure AD application changes for remote environment, see [Deploy AAD application changes for remote environment](#deploy-aad-application-changes-for-remote-environment).

### Customize `requiredResourceAccess`

  If the Teams application required more permissions to call API with additional permissions, you need to update `requiredResourceAccess` property in the Azure AD manifest template. You can see the following example for this property:

  ```JSON

   "requiredResourceAccess": [
    {
        "resourceAppId": "Microsoft Graph",
        "resourceAccess": [
            {
                "id": "User.Read", // For Microsoft Graph API, you can also use uuid for permission id
                "type": "Scope" // Scope is for delegated permission
            },
            {
                "id": "User.Export.All",
                "type": "Role" // Role is for application permission
            }
        ]
    },
    {
        "resourceAppId": "Office 365 SharePoint Online",
        "resourceAccess": [
            {
                "id": "AllSites.Read",
                "type": "Scope"
            }
        ]
    }
]
   ```

  * `resourceAppId` property is for different APIs, for `Microsoft Graph` and `Office 365` `SharePoint Online`, you can enter the name directly instead of uuid, and for other APIs, you need to use uuid.

  * `resourceAccess.id` property is for different permissions, for `Microsoft Graph` and `Office 365 SharePoint Online`, you can enter the permission name directly instead of uuid, and for other APIs, you can use uuid.

  * `resourceAccess.type` property is used for delegated permission or application permission. `Scope` means delegated permission and `Role` means application permission.

### Customize `preAuthorizedApplications`

  You can use `preAuthorizedApplications` property to authorize a client application to indicate that the API trusts the application and users should'nt be asked to consent when the client calls it exposed API. You can see the following example for this property:

   ```JSON

    "preAuthorizedApplications": [
        {
            "appId": "1fec8e78-bce4-4aaf-ab1b-5451cc387264",
            "permissionIds": [
                "{{state.fx-resource-aad-app-for-teams.oauth2PermissionScopeId}}"
            ]
        }
        ...
    ]
   ```

   `preAuthorizedApplications.appId` property is used for the application you want to authorize. If you know the application id only knows the application name,

   Follow the steps to search the application for application ID by using application name:

  * Go to [Azure Portal](https://portal.azure.com/#blade/Microsoft_AAD_IAM/ActiveDirectoryMenuBlade/RegisteredApps) and open app registrations

  * Select `All applications` and search the application name

  * Select the application and get the application ID from the overview page.

### Customize redirect URLs

  Redirect URLs are used while returning authentication responses (tokens) after successfull authentication. You can customize redirect URLs using property `replyUrlsWithType`, for example, to add `https://www.examples.com/auth-end.html` as redirect URL, you can add it as following example:

   ``` JSON

     "replyUrlsWithType": [
    ...
    {
        "url": "https://www.examples.com/auth-end.html",
        "type": "Spa"
    }
]
   ```

## AAD manifest template placeholders

The AAD manifest file contains placeholder arguments with {{...}} statements it is replaced at build time for different environment. You can build references to config file, state file and environment variables with the placeholder arguments.

### Reference state file values in AAD manifest template

State file is located in `.fx\states\state.xxx.json` (xxx is represent different environment). Here is the typical state file.


   ``` JSON
   {
    "solution": {
        "teamsAppTenantId": "uuid",
        ...
    },
    "fx-resource-aad-app-for-teams": {
        "applicationIdUris": "api://xxx.com/uuid",
        ...
    }
    ...
}
   ```

You can use this placeholder argument in the AAD manifest: {{state.fx-resource-aad-app-for-teams.applicationIdUris}} to refer `applicationIdUris` value in `fx-resource-aad-app-for-teams` property.

### Reference config file values in AAD manifest template

Config file is located in `.fx\configs\config.xxx.json` (xxx is represent different environment). Here is the typical config file:


   ``` JSON
   {
  "$schema": "https://aka.ms/teamsfx-env-config-schema",
  "description": "description.",
  "manifest": {
    "appName": {
      "short": "app",
      "full": "Full name for app"
    }
  }
}
   ```

You can use the placeholder argument in the AAD manifest: `{{config.manifest.appName.short}}` to refer `short` value.

### Reference environment variable in AAD manifest template

Sometimes you may not want to hardcode the values in AAD manifest template. For example, when the value is a secret. AAD manifest template file supports referencing the values from environment variables. You can use syntax `{{env.YOUR_ENV_VARIABLE_NAME}}` in parameter values to tell the tooling to resolve the value current environment variable.

## Author and preview AAD manifest with code lens

   AAD manifest template file has code lens to review and edit.

   :::image type="content" source="../assets/images/teams-toolkit-v2/manual/add preview.png" alt-text="add preview":::

### AAD manifest template file

   At the beginning of the AAD manifest template file, there is a preview codelens. Select the codelens, it generates AAD manifest based on the environment you selected.

   :::image type="content" source="../assets/images/teams-toolkit-v2/manual/add codelens.png" alt-text="add codelens":::


### Placeholder argument code lens

   Placeholder argument code lens helps you to take quick look of the values for local debug and develop environment. If your mouse hover on the placeholder argument, it shows tooltip box for the values of all the environment.

   :::image type="content" source="../assets/images/teams-toolkit-v2/manual/add arguments.png" alt-text="add arguments":::

### Required resource access code lens

   It is different from official [AAD manifest schema](https://docs.microsoft.com/azure/active-directory/develop/reference-app-manifest) that `resourceAppId` and `resourceAccess` ID in `requiredResourceAccess` property only supports uuid, AAD manifest template in Teams Toolkit also supports user readable strings for `Microsoft Graph` and `Office 365 SharePoint Online` permissions. If you input uuid, code lens  shows user readable strings, otherwise, it shows uuid.

   :::image type="content" source="../assets/images/teams-toolkit-v2/manual/add resource.png" alt-text="add resource":::

### Pre-authorized applications code lens

   Code lens shows the application name for the per-authorized application ID for the `preAuthorizedApplications` property.

## Deploy AAD application changes for local environment

  1. Select `Preview` code lens in `aad.template.json`.
  
    :::image type="content" source="../assets/images/teams-toolkit-v2/manual/add deploy1.png" alt-text="add deploy1":::

  2. Select `local` environment.
  
    :::image type="content" source="../assets/images/teams-toolkit-v2/manual/add deploy2.png" alt-text="add deploy2":::

  3. Select `Deploy AAD Manifest` code lens in `aad.local.json`.

    :::image type="content" source="../assets/images/teams-toolkit-v2/manual/add deploy3.png" alt-text="add deploy3":::

  4. The changes for AAD app used in local environment will be deployed.
  
## Deploy AAD application changes for remote environment

  1. Open the command palette and select: `Teams: Deploy Azure Active Directory app manifest`.
  
    :::image type="content" source="../assets/images/teams-toolkit-v2/manual/add deploy4.png" alt-text="add deploy4":::

2. You can also right click on the `aad.template.json` and select `Deploy Azure Active Directory app manifest` from the context menu
  
    :::image type="content" source="../assets/images/teams-toolkit-v2/manual/add deploy5.png" alt-text="add deploy5":::

## View AAD application on the Azure portal

  1. Copy the AAD app client ID from `state.xxx.json` (xxx is the environment name that you have deployed the AAD app) file in the `fx-resource-aad-app-for-teams` property.
  
    :::image type="content" source="../assets/images/teams-toolkit-v2/manual/add view1.png" alt-text="add view1":::

  2. Go to [Azure portal](https://ms.portal.azure.com/#blade/Microsoft_AAD_IAM/ActiveDirectoryMenuBlade/RegisteredApps) and login to M365 account. Ensure that login credentials of Teams app and M365 account are same.

  3. Open [app registrations page](https://ms.portal.azure.com/#blade/Microsoft_AAD_IAM/ActiveDirectoryMenuBlade/RegisteredApps), search the AAD app using client ID that you copied before.
  
    :::image type="content" source="../assets/images/teams-toolkit-v2/manual/add view2.png" alt-text="add view2":::

  4. Select AAD app from search result to view the detailed information.
  
  5. In AAD app information page, select `Manifest` menu to view manifest of this app. The schema of the manifest is same as the one in `aad.template.json` file, for more information about manifest, see [Azure Active Directory app manifest](https://docs.microsoft.com/azure/active-directory/develop/reference-app-manifest).
  
    :::image type="content" source="../assets/images/teams-toolkit-v2/manual/add view3.png" alt-text="add view3":::

  6. You can also select other menu to view or configure AAD app through portal.
  
## Using an existing AAD app

   You can use the existing AAD app for the Teams project, for more information, see [Use an existing AAD app for your Teams app](https://github.com/OfficeDev/TeamsFx/wiki/Customize-provision-behaviors#use-an-existing-aad-app-for-your-teams-app).

## AAD application in Teams app development lifecycle

   You can interact with AAD application during various stages of your Teams app development lifecycle and here is how Teams Toolkit makes it easy.

  1. **Project creation**
    
     You can create a project with Teams Toolkit that comes with SSO support by default. Such as `SSO-enabled tab`. See [Create a new Teams app using Teams Toolkit](https://docs.microsoft.com/microsoftteams/platform/toolkit/create-new-project) to create a new Teams app with Teams Toolkit. An AAD manifest file is automatically created: `templates\appPackage\aad.template.json`. Teams Toolkit creates or updates the AAD application during local development or when you move the application to the cloud.

  2. **Add SSO to your Bot or Tab capability**

     If you created a Teams application without SSO built-in, Teams Toolkit can incrementally help you add SSO to the project. As a result, An AAD manifest file is automatically created: `templates\appPackage\aad.template.json`. Teams Toolkit creates or updates the AAD application during next local debug session or when you move the application to the cloud.

  3. **Local development**

     During local development (known as F5), Teams Toolkit will:
 
    * Check if there is an existing AAD application by reading the state.local.json file. If yes, Teams Toolkit will re-use the existing AAD application otherwise we will create a new one using the aad.template.json file.

    * When creating a new AAD application with the manifest file, some properties in the manifest file which require additional context (such as replyUrls property that requires a local debug endpoint) will be ignored first.

    * After the local dev environment startup successfully, the AAD application's identifierUris, replyUrls, and other properties which are not available during creation stage will be updated accordingly.

    * Changes you made to your AAD application will be loaded during next local debug session. Optionally you can follow this instruction if you want to manually apply AAD application changes.

  4. **Provision cloud resources**

    When moving your application to the cloud, you would need to provision cloud resources and deploy your application. At these stages, like local development, Teams Toolkit will:

     * Check if there is an existing AAD application by reading state.{env}.json file. If yes, Teams Toolkit will re-use the existing AAD application otherwise we will create a new one using the aad.template.json file.

     * When creating a new AAD application with the manifest file, some properties in the manifest file which require additional context (such as replyUrls property requires frontend or bot endpoint) will be ignored first.

     * After other resources provision completes, the AAD application's identifierUris and replyUrls will be updated accordingly to the correct endpoints.

  5. **Application deployment** 

     * Deploy to the cloud command will deploy your application to the provisioned resources. This will not include deploying AAD application changes you made

     * You can follow this instruction to deploy AAD application changes for remote environment

     * Teams Toolkit will update the AAD application according to the AAD manifest template file.

## Limitations

  1. Not all the properties listed in [AAD manifest schema](https://docs.microsoft.com/en-us/azure/active-directory/develop/reference-app-manifest) are supported in Teams Toolkit extension, this tab shows the properties that are not supported:

|**Not supported properties**|**Reason**|
|-----------|----------|
|passwordCredentials|Not allowed in manifest|
|createdDateTime|Readonly and cannot change|
|logoUrl|Readonly and cannot change|
|publisherDomain|Readonly and cannot change|
|oauth2RequirePostResponse|Doesn't exist in Graph API|
|oauth2AllowUrlPathMatching|Doesn't exist in Graph API|
|samlMetadataUrl|Doesn't exist in Graph API|
|orgRestrictions|Doesn't exist in Graph API|
|certification|Doesn't exist in Graph API|

  2. Currently `requiredResourceAccess` property can use user readable resource app name or permission name strings only for `Microsoft Graph` and `Office 365 SharePoint Online` APIs. For other APIs, you need to use uuid instead. You can follow these steps to retrieve IDs from Azure Portal:

   * Register a new AAD application on [Azure Portal](https://ms.portal.azure.com/#blade/Microsoft_AAD_IAM/ActiveDirectoryMenuBlade/RegisteredApps)
   * Select `API permissions` from the AAD application page
   * Select `add a permission` to add the permission you want
   * Select `Manifest`, from the `requiredResourceAccess` property, you can find the ids of API and permissions 
