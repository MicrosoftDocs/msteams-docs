---
title: Customize Microsoft Entra Manifest
author: zyxiaoyuer
description: Learn how to edit, customize, preview, and manage Microsoft Entra manifest with CodeLens in Agents Toolkit, app development lifecycle, and view app in Azure portal.
ms.author: surbhigupta
ms.localizationpriority: medium
ms.topic: overview
ms.date: 02/06/2025
---

# Edit Microsoft Entra manifest

Microsoft 365 Agents Toolkit (previously known as Teams Toolkit) now manages Microsoft Entra application with the app manifest file as the source of truth during your Microsoft Teams application development lifecycle.

<a name='customize-azure-ad-manifest-template'></a>

## Customize Microsoft Entra manifest template

You can customize Microsoft Entra manifest template to update Microsoft Entra application.

1. Open `aad.template.json` in your project.
  
     :::image type="content" source="../assets/images/toolkit-v2/manual/add template.png" alt-text="Screenshot shows the template.":::

2. Update the template directly or [reference values from another file](https://github.com/OfficeDev/TeamsFx/wiki/Manage-AAD-application-in-Teams-Toolkit#Placeholders-in-AAD-manifest-template). Following are the customization scenarios:
  
    <details>

    <summary>Add an application permission</summary>

     If the Teams application requires more permissions to call an API with additional permissions, you need to update `requiredResourceAccess` property in the Microsoft Entra manifest template. You can see the following example for this property:

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

    The following list provides different property IDs and their usage:

    - The `resourceAppId` property is used for different APIs. For `Microsoft Graph` and `Office 365 SharePoint Online`, enter the name directly instead of UUID, and for other APIs use UUID.

    - The `resourceAccess.id` property is used for different permissions. For `Microsoft Graph` and `Office 365 SharePoint Online`, enter the permission name directly instead of UUID, and for other APIs use UUID.

    - The `resourceAccess.type` property is used for delegated permission or application permission. `Scope` means delegated permission and `Role` means application permission.

    </details>

    <details>

    <summary>Preauthorize a client application</summary>

     You can use `preAuthorizedApplications` property to authorize a client application to indicate that the API trusts the application. Users don't consent when the client calls exposed API. You can see the following example for this property:

     ```JSON
     "api": {
        ...
        "preAuthorizedApplications": [
            {
                "appId": "1fec8e78-bce4-4aaf-ab1b-5451cc387264",
                "delegatedPermissionIds": [
                    "${{AAD_APP_ACCESS_AS_USER_PERMISSION_ID}}"
                ]
            }
        ]
        ...
     }

     ```

     `preAuthorizedApplications.appId` property is used for the application you want to authorize. If you don't know the application ID and know only the application name, use the following steps to search application ID:

     1. Go to [Azure portal](https://portal.azure.com/#blade/Microsoft_AAD_IAM/ActiveDirectoryMenuBlade/RegisteredApps) and open **Application Registrations**.

     1. Select **All applications** and search for the application name.

     1. Select the application name and get the application ID from the overview page.

    </details>

    <details>

    <summary>Update redirect URL for authentication response</summary>

     Redirect URLs are used while returning authentication responses such as tokens after successful authentication. You can customize redirect URLs using property `redirectUris` inside `web`, `spa`, `publicClient`. For example, to add `https://www.examples.com/auth-end.html` as redirect URL, you can add it as the following example:

      ``` JSON
     "publicClient": {
        "redirectUris": [
            "https://www.examples.com/auth-end.html"
        ]
     },
     "web": {
        "redirectUris": [
            "https://www.examples.com/auth-end.html"
        ],
        "implicitGrantSettings": {}
     },
     "spa": {
        "redirectUris": [
            "https://www.examples.com/auth-end.html",
        ]
     }
      ```

    </details>

3. Update Microsoft Entra application changes for local or remote environment.

   1. Select `Preview` CodeLens in `aad.template.json`.
  
      :::image type="content" source="../assets/images/toolkit-v2/manual/add deploy1.png" alt-text="Screenshot shows the preview.":::

   1. Select **local** or **dev** environment.
  
      :::image type="content" source="../assets/images/toolkit-v2/manual/add deploy2.png" alt-text="Screenshot shows the environment list.":::

   1. Select `Deploy Azure AD Manifest` CodeLens in `aad.local.json` or `aad.dev.json`.

      :::image type="content" source="../assets/images/toolkit-v2/manual/add deploy3.png" alt-text="Screenshot shows the deploy option highlighted." lightbox="../assets/images/toolkit-v2/manual/add deploy3.png":::

   1. The changes for Microsoft Entra application used in local or dev environment are deployed.

   1. Additionally, you can open the command palette and select **Teams: Update Microsoft Entra App** to update Microsoft Entra app.
      :::image type="content" source="../assets/images/toolkit-v2/manual/add deploy4.PNG" alt-text="Screenshot shows the Command Palette option.":::

> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI%20ran%20into%20an%20issue%5D%20Customize%20Microsoft%20Entra%20manifest%20template&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Ftoolkit%2Faad-manifest-customization%23customize-microsoft-entra-manifest-template&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Ftoolkit%2FAAD-manifest-customization.md&documentVersionIndependentId=70b95cac-24c1-4279-8656-cd3c5d0b5235&author=surbhigupta&platformId=d983c833-f680-17be-bf5e-ec2810040727&metadata=*%2BID%253A%2Be473e1f3-69f5-bcfa-bcab-54b098b59c80%2B%250A*%2BService%253A%2B**msteams**)

<a name='azure-ad-manifest-template-placeholders'></a>

## Microsoft Entra manifest template placeholders

The Microsoft Entra manifest file contains placeholder arguments with {{...}} statements, it's replaced during build for different environments. You can reference to environment variables with the placeholder arguments.

<a name='reference-environment-variable-in-azure-ad-manifest-template'></a>

### Reference environment variable in Microsoft Entra manifest template

You don't need to enter permanent values in Microsoft Entra manifest template and Microsoft Entra manifest template file supports reference environment variable values. You can use the syntax `${{YOUR_ENV_VARIABLE_NAME}}` in the tool as parameter values to resolve the environment variable values.

<a name='edit-and-preview-azure-ad-manifest-with-codelens'></a>

## Edit and preview Microsoft Entra manifest with CodeLens

Microsoft Entra manifest template file has CodeLens to review and edit the code.

<a name='azure-ad-manifest-template-file'></a>

### Microsoft Entra manifest template file

There's a preview CodeLens at the beginning of the Microsoft Entra manifest template file. Select the CodeLens to generate a Microsoft Entra manifest based as per your environment.

:::image type="content" source="../assets/images/toolkit-v2/manual/add codelens.png" alt-text="Screenshot shows the preview of add codelens.":::

### Placeholder argument CodeLens

Placeholder argument CodeLens helps you to see the values for local debug and develop your environment. If you hover the mouse on the placeholder argument, it shows tooltip box for the values of all the environments.

:::image type="content" source="../assets/images/toolkit-v2/manual/add arguments.png" alt-text="Screenshot shows the add arguments.":::

### Required resource access CodeLens

Microsoft Entra manifest template in Agents Toolkit also supports user readable strings for `Microsoft Graph` and `Office 365 SharePoint Online` permissions. The official [Microsoft Entra manifest schema](/azure/active-directory/develop/reference-app-manifest), which is the `resourceAppId` and `resourceAccess` in `requiredResourceAccess` property supports only the UUID. If you enter UUID, the CodeLens shows user readable strings, otherwise it shows the UUID.

:::image type="content" source="../assets/images/toolkit-v2/manual/add resource.png" alt-text="Screenshot shows the add resource to required resource access.":::

### Preauthorized applications CodeLens

CodeLens shows the application name for the preauthorized application ID for the `preAuthorizedApplications` property inside api property.

<a name='view-azure-ad-application-on-the-azure-portal'></a>

## View Microsoft Entra application on the Azure portal

1. Copy the Microsoft Entra application client ID from `.env.xxx` () file in the `AAD_APP_CLIENT_ID` property.
  
     :::image type="content" source="../assets/images/toolkit-v2/manual/add view1.png" alt-text="Screenshot shows the client ID." lightbox="../assets/images/toolkit-v2/manual/add view1.png":::

   > [!NOTE]
   > xxx in the client ID indicates the environment name where you have deployed the Microsoft Entra application.

1. Go to [Azure portal](https://ms.portal.azure.com/#blade/Microsoft_AAD_IAM/ActiveDirectoryMenuBlade/RegisteredApps) and sign in to Microsoft 365 account.
  
   > [!NOTE]
   > Ensure that login credentials of Teams application and M365 account are the same.

1. Open [App Registrations page](https://ms.portal.azure.com/#blade/Microsoft_AAD_IAM/ActiveDirectoryMenuBlade/RegisteredApps) and search the Microsoft Entra application using client ID that you copied before.
  
     :::image type="content" source="../assets/images/toolkit-v2/manual/add-view-app-registrations.png" alt-text="Screenshot shows the client ID under All applications tab.":::

1. Select Microsoft Entra application from search result to view the detailed information.
  
1. In Microsoft Entra app information page, select the **Manifest** menu to view manifest of this application. The schema of the manifest is same as the one in `aad.template.json` file. For more information about manifest, see [Microsoft Entra app manifest](/entra/identity-platform/reference-microsoft-graph-app-manifest).
  
     :::image type="content" source="../assets/images/toolkit-v2/manual/add view3.png" alt-text="Screenshot shows the Manifest screen.":::

1. You can select **Other Menu** to view or configure Microsoft Entra application through its portal.
  
> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI%20ran%20into%20an%20issue%5D%20View%20Microsoft%20Entra%20application%20on%20the%20Azure%20portal&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Ftoolkit%2Faad-manifest-customization%23view-microsoft-entra-application-on-the-azure-portal&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Ftoolkit%2FAAD-manifest-customization.md&documentVersionIndependentId=70b95cac-24c1-4279-8656-cd3c5d0b5235&author=surbhigupta&platformId=d983c833-f680-17be-bf5e-ec2810040727&metadata=*%2BID%253A%2Be473e1f3-69f5-bcfa-bcab-54b098b59c80%2B%250A*%2BService%253A%2B**msteams**)

<a name='use-an-existing-azure-ad-application'></a>

## Use an existing Microsoft Entra application

You can use the existing Microsoft Entra application for the Teams project. For more information, see [use an existing Microsoft Entra application for your Teams application](/microsoftteams/platform/toolkit/use-existing-aad-app).

<a name='azure-ad-application-in-teams-application-development-lifecycle'></a>

## Microsoft Entra application in Teams application development lifecycle

You need to interact with Microsoft Entra application during various stages of your Teams application development lifecycle.

1. **To create Project**

      You can create a project with Agents Toolkit that comes with single sign-on (SSO) support by default such as `SSO-enabled tab`. For more information on how to create a new app, see [create new Teams application using Agents Toolkit](create-new-project.md). A Microsoft Entra manifest file is automatically created for you in `aad.template.json`. Agents Toolkit creates or updates the Microsoft Entra application during local development or while you move the application to the cloud.

1. **To add SSO to your bot or tab**

      After you create a Teams application without built-in SSO, Agents Toolkit progressively helps you to add SSO for the project. As a result, a Microsoft Entra manifest file is automatically created for you in `aad.template.json`.

      Agents Toolkit creates or updates the Microsoft Entra application during next local development session or while you move the application to the cloud.

1. **To build locally**

    Agents Toolkit performs the following functions during local development:

    - Read the `.env.local` file to find an existing Microsoft Entra application. If a Microsoft Entra application already exists, Agents Toolkit reuses the existing Microsoft Entra application. Otherwise, you need to create a new application using the `aad.template.json` file.

    - Initially ignores some properties in the manifest file that requires more context, such as `redirectUris` property that requires a local development endpoint during the creation of a new Microsoft Entra application with the manifest file.

    - After the local dev environment starts successfully, the Microsoft Entra application's `identifierUris`, `redirectUris`, and other properties that aren't available during creation stage are updated accordingly.

    - The changes you've done to your Microsoft Entra application are loaded during next local development session. You can see [Microsoft Entra application changes](https://github.com/OfficeDev/TeamsFx/wiki/) applied manually.

1. **To provision for cloud resources**

      You need to provision cloud resources and deploy your application while moving your application to the cloud. At stages, such as local debug, Agents Toolkit:

      - Reads the `.env.{env}` file to find an existing Microsoft Entra application. If a Microsoft Entra application already exists, Agents Toolkit reuses the existing Microsoft Entra application. Otherwise, you need to create a new application using the `aad.template.json` file.

      - Ignores some properties in the manifest file initially that requires more context such as `redirectUris` property. This property requires frontend or bot endpoint during the creation of a new Microsoft Entra application with the manifest file.

      - Completes other resources provision, then Microsoft Entra application's `identifierUris`, and `redirectUris` are updated according to the correct endpoints.

1. **To build application**

    - The cloud command deploys your application to the provisioned resources. It doesn't include deploying Microsoft Entra application changes you've made.

    - Agents Toolkit updates the Microsoft Entra application according to the Microsoft Entra manifest template file.

## Limitations

1. Agents Toolkit extension doesn't support all the properties listed in Microsoft Entra manifest schema.
  
      The following table lists the properties that aren't supported in Agents Toolkit extension:

      |**Not supported properties**|**Reason**|
      |-----------|----------|
      |`passwordCredentials`|Not allowed in manifest|
      |`createdDateTime`|Read-only and can't change|
      |`logoUrl`|Read-only and can't change|
      |`publisherDomain`|Read-only and can't change|

2. The `requiredResourceAccess` property is used for user readable resource application name or permission name strings only for `Microsoft Graph` and `Office 365 SharePoint Online` APIs. You need to use UUID for other APIs. Perform the following steps to retrieve IDs from Azure portal:

    1. Register a new Microsoft Entra application on [Azure portal](https://ms.portal.azure.com/#blade/Microsoft_AAD_IAM/ActiveDirectoryMenuBlade/RegisteredApps).
    1. Select `API permissions` from the Microsoft Entra application page.
    1. Select `add a permission` to add the permission you need.
    1. Select `Manifest` from the `requiredResourceAccess` property, where you can find the IDs of API, and the permissions.

## See also

- [Microsoft 365 Agents Toolkit Overview](agents-toolkit-fundamentals.md)
- [Microsoft Entra manifest](/azure/active-directory/develop/reference-app-manifest)
- [Preview and Customize app manifest in Toolkit](TeamsFx-preview-and-customize-app-manifest.md)
- [Debug your Teams app](debug-overview.md)
- [Debug your Teams app locally](debug-local.md)
