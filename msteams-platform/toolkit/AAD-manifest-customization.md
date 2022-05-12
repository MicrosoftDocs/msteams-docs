---
title: AAD manifest customization to your Teams apps
author: 
description:  Describes AAD manifest customization on of Teams Toolkit
ms.author: 
ms.localizationpriority: 
ms.topic: 
ms.date: 05/10/2022
---

# AAD manifest

The AAD manifest in the Microsoft identity platform defines all the attributes of an AAD application object. The AAD manifest schema and definitions are described in a document. The AAD manifest can also be viewed on the Azure Portal's AAD application page.

The Teams Toolkit extension creates or updates an AAD application before activating AAD manifest features, and users can only modify or update an AAD application from the Azure portal, and some updates may conflict with the extension. We added AAD manifest build-in support to the Teams Toolkit extension in the newest release, making it easier for users to customize AAD apps.

## Limitations

The Teams Toolkit extension does not support all of the properties provided in the AAD manifest format. You can see the properties that aren't supported are listed in this table:

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

Currently requiredResourceAccess property can use user readable resource app name or permission name strings only for Microsoft Graph and Office 365 SharePoint Online APIs. For other APIs, you can use uuid instead. 

The following steps guides you to retrieve ids from Azure Portal:

* Register a new AAD application on Azure Portal.
* Select API permissions from the AAD application page.
* Select add a permission to add the permission you want.
* Select manifest, from the requiredResourceAccess property, you can find the ids of API and permissions.

## VSCode Teams Toolkit addon with AAD manifest

An AAD manifest template is created to templatesappPackageaad.template.json while using Teams Toolkit to create an app with SSO support, or while adding SSO functionality to a non-SSO project.

You can see the extension using an AAD manifest template file to create/update an AAD application in the following scenarios:

### AAD manifest lifecycle in F5 local debug command

  1. Check the state.local.json file for the confirmation of AAD application for local debug creation. You can use the existing AAD application instead of building a new one.
  
  2. You can create a new AAD application, the extension creates it using the AAD manifest template file, and for some properties that requires additional context (such as the replyUrls property, that needs to know the current local debug endpoint), it ignores during the creation stage.
  
  3. Update the AAD application's identifierUris, replyUrls, and other properties that were not available during the construction stage according to the local dev environment endpoint after the local dev environment starts successfully.
  
### AAD manifest lifecycle in provision command

  1. Check the state.xxx.json file for the confirmation of AAD application for the environment. You can use the existing AAD application instead of building a new one.
  
  2. You can create a new AAD application, the extension creates it using the AAD manifest template file, and for some properties that requires additional context (such as the replyUrls property, that needs to know the current local debug endpoint), it ignores during the creation stage.
  
  3. Update the AAD application's identifierUris and replyUrls according to frontend hosting / bot endpoint after other resources provisions successfully.

### AAD manifest lifecycle in Deploy command

  1. As `deploy resource to cloud` command does'nt handle AAD application, you need to use `Deploy Azure Active Directory app manifest` instead if you want to update AAD application.
  
  2. `Deploy Azure Active Directory app manifest` updates the AAD application according to the AAD manifest template file, if current environment hasn't provisioned and AAD application is not existed, it throws some errors. If your project has already been provisioned and you want to update your AAD application, you can use the command.
  
You can see the following steps to find the AAD app after the AAD application has successfully deployed.

#### AAD app on Azure portal

  1. Copy AAD app client id from state.xxx.json (xxx is the environment name that you have deployed the AAD app) file in fx-resource-aad-app-for-teams property.
  
  2. Log in to the Azure portal with the M365 account you use for the Teams app.
  
  3. Open registrations page and search for the AAD app using the client id that was copied.
. 
  4. If everything is in order, you should be able to locate your AAD app.
  
## AAD manifest template placeholders

The AAD manifest file contains placeholder arguments with {{...}} statements that will be replaced at build time according to different environment. Placeholder argument supports config file, state file and environment variables.

### Referencing state file values in AAD manifest template

State file is located in .fx\states\state.xxx.json (xxx is represent different environment). The typical state file is given in the following:


   ```json
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

You can use this placeholder argument in the AAD manifest: {{state.fx-resource-aad-app-for-teams.applicationIdUris}} to refer applicationIdUris value in fx-resource-aad-app-for-teams property.

### Referencing config file values in AAD manifest template

Config file is located in .fx\configs\config.xxx.json (xxx is represent different environment). The typical state file is given in the following:


   ```json
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

You can use the placeholder argument in the AAD manifest: {{config.manifest.appName.short}} to refer short value.

### Referencing environment variable in AAD manifest template

Some times you may not want to hardcode the values in AAD manifest template. For example, when the value is a secret. AAD manifest template file supports referencing the values from environment variables. You can use syntax {{env.YOUR_ENV_VARIABLE_NAME}} in parameter values to tell the tooling that the value needs to be resolved from current environment variable.

## AAD manifest authoring supports

AAD manifest template file has codelens to review and edit.

:::image type="content" source="../assets/images/teams-toolkit-v2/view-samples.png" alt-text="View samples":::

### Preview codelens

Navigate to **preview codelens** at the beginning of the AAD manifest template file. Select the codelens, it generates AAD manifest based on the environment you selected.

:::image type="content" source="../assets/images/teams-toolkit-v2/view-samples.png" alt-text="View samples":::

### Placeholder argument codelens

Placeholder argument codelens helps you take quick look of the values for local debug and develop environment. If your mouse hover on the placeholder argument, it shows tooltip box for the values of all the environment.

:::image type="content" source="../assets/images/teams-toolkit-v2/view-samples.png" alt-text="View samples":::

### Required resource access codelens

It is different from official AAD manifest schema that resourceAppId and resourceAccess id in requiredResourceAccess property only supports uuid, AAD manifest template in Teams Toolkit also supports user readable strings for Microsoft Graph and Office 365 SharePoint Online permissions. If you input uuid, codelens  shows user readable strings, otherwise, it shows uuid.

:::image type="content" source="../assets/images/teams-toolkit-v2/view-samples.png" alt-text="View samples":::

### Pre-authorized applications codelens

Codelens shows the application name for the per-authorized application id for the preAuthorizedApplications property.

## Customize AAD manifest template

You can customize AAD manifest template to update AAD application.

### Customize requiredResourceAccess

You need to update requiredResourceAccess property in the AAD manifest template if your Teams app requires more permissions to call API with additional permissions. The following code is an example for this property:

```json
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

resourceAppId property is for different APIs, for Microsoft Graph and Office 365 SharePoint Online, you can use the name directly instead of uuid, and for other APIs, you can use uuid.

resourceAccess.id property is for different permissions, for Microsoft Graph and Office 365 SharePoint Online, you can use the permission name directly instead of uuid, and for other APIs, you can use uuid.

resourceAccess.type property is used for delegated permission or application permission. The terms Scope and role refer to delegated authority and application permission, respectively.

### Customize preAuthorizedApplications

You can use preAuthorizedApplications property to authorize a client application indicates that this API trusts the application and users should not be asked to consent while the client calls this exposed API. Here is an example for this property:

```json
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

preAuthorizedApplications.appId property is used for the application you want to authorize. If you doesn't know the application id but only knows the application name, you can go to Azure Portal following this steps to search the application to find the id:

  1. Log in to  Azure Portal and open app Registrations

  1. Select All applications and search the application name
  
  1. You can select the application and get the application id from the overview page if you find the application that you search for.

### Customize redirect URLs

Redirect URLs is used when returning authentication responses (tokens) after successfully authenticating. You can customize redirect URLs using property replyUrlsWithType, for example, if you want to add https://www.examples.com/auth-end.html as redirect URL, you can add it as below:

```json
"replyUrlsWithType": [
    ...
    {
        "url": "https://www.examples.com/auth-end.html",
        "type": "Spa"
    }
]
```

## Use existing AAD app

You can use existing AAD app for your Teams project, see for more info.
