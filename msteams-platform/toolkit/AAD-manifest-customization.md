---
title: Customize Microsoft Entra Manifest
author: zyxiaoyuer
description: Learn how to edit, customize, preview, and manage Microsoft Entra manifest with CodeLens in Agents Toolkit, app development lifecycle, and view app in Azure portal.
ms.localizationpriority: medium
ms.topic: overview
ms.date: 04/30/2026
---

# Edit Microsoft Entra manifest

Microsoft 365 Agents Toolkit (previously called Teams Toolkit) uses the Microsoft Entra manifest file as the source of truth for managing your Microsoft Entra app throughout the Teams agent or app development lifecycle.

This article explains how to customize and deploy the Microsoft Entra app manifest in Microsoft 365 Agents Toolkit, including permissions, preauthorized applications, redirect URIs, placeholders, and lifecycle behavior across local and cloud environments.

<a name='customize-azure-ad-manifest-template'></a>

## Customize Microsoft Entra manifest template

You can customize Microsoft Entra manifest template to update Microsoft Entra app configuration for your project.

1. Open `aad.template.json` in your project.

     :::image type="content" source="../assets/images/toolkit-v2/manual/add template.png" alt-text="Screenshot shows the template.":::

2. Update the template directly or [reference values from another file](https://github.com/OfficeDev/microsoft-365-agents-toolkit/wiki/Manage-AAD-application-in-Teams-Toolkit/e2ec3673cdc36a4a5d06ce08dd9b061feebd1c90#Placeholders-in-AAD-manifest-template). For more information see, [customize AAD manifest](AAD-manifest-customization.md)

    Following are the customization scenarios:

    <details>

    <summary>Add an agent or app permission</summary>
     If your Teams agent or app needs additional permissions to call an API, update the `requiredResourceAccess` property in the Microsoft Entra manifest template. Use `Scope` for delegated permissions and `Role` for application permissions, and note that Microsoft Graph and Office 365 SharePoint Online can use readable names in this template while other APIs require UUID values. Here's a code snippet example:

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

    The following properties are used in different ways depending on the API and permission type:

    - The `resourceAppId` property is used for different APIs. For `Microsoft Graph` and `Office 365 SharePoint Online`, enter the name directly instead of UUID, and for other APIs use UUID.

    - The `resourceAccess.id` property is used for different permissions. For `Microsoft Graph` and `Office 365 SharePoint Online`, enter the permission name directly instead of UUID, and for other APIs use UUID.

    - The `resourceAccess.type` property is used for delegated permission or app permission. `Scope` means delegated permission and `Role` means app permission.

    </details>

    <details>

    <summary>Preauthorize a client application</summary>

     You can use the preAuthorizedApplications property to authorize a client app and indicate that your API trusts it. When the client calls the exposed API, users do not need to provide consent again. The following example shows this property. This is useful when you already know which agent or app will consume the API and want to streamline the authentication experience. You can see the following example for this property:

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

     The `preAuthorizedApplications.appId` property identifies the agent or app you want to authorize. If you don't know the app ID and know only the app name, use the following steps to search app ID:

     1. Go to [Azure portal](https://portal.azure.com/#blade/Microsoft_AAD_IAM/ActiveDirectoryMenuBlade/RegisteredApps) and open **Application Registrations**.

     1. Select **All applications** and search for the app name.

     1. Select the app name and get the app ID from the overview page.

    </details>

    <details>

    <summary>Update redirect URL for authentication response</summary>

     Redirect URIs define where authentication responses, such as tokens, are sent after sign-in completes. Configure the `redirectUris` property under `publicClient`, `web`, or `spa` based on the agent or app type you are building, and ensure each value matches the actual endpoint used by that client flow. For example, to add `https://www.examples.com/auth-end.html` as redirect URL, you can add it as the following example:

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

3. Update Microsoft Entra app changes for local or remote environment.

   1. Select `Preview` CodeLens in `aad.template.json`.
  
      :::image type="content" source="../assets/images/toolkit-v2/manual/add deploy1.png" alt-text="Screenshot shows the preview.":::

   1. Select **local** or **dev** environment.
  
      :::image type="content" source="../assets/images/toolkit-v2/manual/add deploy2.png" alt-text="Screenshot shows the environment list.":::

   1. Select `Deploy Azure AD Manifest` CodeLens in `aad.local.json` or `aad.dev.json`.

      :::image type="content" source="../assets/images/toolkit-v2/manual/add deploy3.png" alt-text="Screenshot shows the deploy option highlighted." lightbox="../assets/images/toolkit-v2/manual/add deploy3.png":::

   1. The changes are deployed to the Microsoft Entra app used in the local or dev environment.

   1. You can also open the command palette and select **Microsoft 365 Agents: Update Microsoft Entra App** to update Microsoft Entra app.

      :::image type="content" source="../assets/images/toolkit-v2/manual/add deploy4.PNG" alt-text="Screenshot shows the Command Palette option.":::

> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI%20ran%20into%20an%20issue%5D%20Customize%20Microsoft%20Entra%20manifest%20template&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Ftoolkit%2Faad-manifest-customization%23customize-microsoft-entra-manifest-template&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Ftoolkit%2FAAD-manifest-customization.md&documentVersionIndependentId=70b95cac-24c1-4279-8656-cd3c5d0b5235&author=surbhigupta&platformId=d983c833-f680-17be-bf5e-ec2810040727&metadata=*%2BID%253A%2Be473e1f3-69f5-bcfa-bcab-54b098b59c80%2B%250A*%2BService%253A%2B**msteams**)

<a name='azure-ad-manifest-template-placeholders'></a>

## Microsoft Entra manifest template placeholders

The Microsoft Entra manifest template includes placeholder values in the form ${{...}}. These values are resolved during the build process for each environment, allowing you to reference environment-specific settings without hardcoding them in the template.

<a name='reference-environment-variable-in-azure-ad-manifest-template'></a>

### Reference environment variable in Microsoft Entra manifest template

Microsoft Entra manifest template file supports reference environment variable values. You don't need to store permanent values directly in the Microsoft Entra manifest template. Instead, you can reference environment variables by using the syntax `${{YOUR_ENV_VARIABLE_NAME}}` to resolve the environment variable values wherever a parameter value is needed.

<a name='edit-and-preview-azure-ad-manifest-with-codelens'></a>

## Edit and preview Microsoft Entra manifest with CodeLens

The Microsoft Entra manifest template includes CodeLens features that help you preview, inspect, and edit the manifest more efficiently.

<a name='azure-ad-manifest-template-file'></a>

### Microsoft Entra manifest template file

A Preview CodeLens appears at the top of the Microsoft Entra manifest template file. Select it to generate a view of the Microsoft Entra manifest based on the environment you choose.

:::image type="content" source="../assets/images/toolkit-v2/manual/add codelens.png" alt-text="Screenshot shows the preview of add codelens.":::

### Placeholder argument CodeLens

The Placeholder argument CodeLens helps you view the values used for local debugging and other environments. If you hover the mouse on a placeholder argument, a tooltip shows the resolved value for each environment.

:::image type="content" source="../assets/images/toolkit-v2/manual/add arguments.png" alt-text="Screenshot shows the add arguments.":::

### Required resource access CodeLens

Microsoft Entra manifest template in Agents Toolkit also supports user readable strings for `Microsoft Graph` and `Office 365 SharePoint Online` permissions. The official [Microsoft Entra manifest schema](/azure/active-directory/develop/reference-app-manifest), which is the `resourceAppId` and `resourceAccess` in `requiredResourceAccess` property supports only the UUID. If you enter UUID, the CodeLens shows user readable strings, otherwise it shows the UUID.

:::image type="content" source="../assets/images/toolkit-v2/manual/add resource.png" alt-text="Screenshot shows the add resource to required resource access.":::

### Preauthorized applications CodeLens

CodeLens displays the app name that corresponds to the preauthorized app ID in the `preAuthorizedApplications` property inside the `api` section.

<a name='view-azure-ad-application-on-the-azure-portal'></a>

## View Microsoft Entra app on the Azure portal

1. Copy the Microsoft Entra app client ID from the appropriate `.env.xxx` file by locating the `AAD_APP_CLIENT_ID` value.
  
     :::image type="content" source="../assets/images/toolkit-v2/manual/add view1.png" alt-text="Screenshot shows the client ID." lightbox="../assets/images/toolkit-v2/manual/add view1.png":::

   > [!NOTE]
   > In this context, xxx represents the environment name where you have deployed the Microsoft Entra app.

1. Go to [Azure portal](https://ms.portal.azure.com/#blade/Microsoft_AAD_IAM/ActiveDirectoryMenuBlade/RegisteredApps) and sign in to Microsoft 365 account.
  
   > [!NOTE]
   > Ensure that you sign in with the same account for both the Teams app and Microsoft 365.

1. Open [App Registrations page](https://ms.portal.azure.com/#blade/Microsoft_AAD_IAM/ActiveDirectoryMenuBlade/RegisteredApps) and search the Microsoft Entra app by using the client ID you copied earlier.

     :::image type="content" source="../assets/images/toolkit-v2/manual/add-view-app-registrations.png" alt-text="Screenshot shows the client ID under All applications tab.":::

1. Select Microsoft Entra app from search result to view its detailed information.
  
1. On  the Microsoft Entra app information page, select **Manifest** to view the manifest of this app. The schema matches the one used in the `aad.template.json` file. For more information about manifest, see [Microsoft Entra app manifest](/entra/identity-platform/reference-microsoft-graph-app-manifest).

     :::image type="content" source="../assets/images/toolkit-v2/manual/add view3.png" alt-text="Screenshot shows the Manifest screen.":::

1. You can use the other menu options to view or configure the Microsoft Entra app in the portal.

> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI%20ran%20into%20an%20issue%5D%20View%20Microsoft%20Entra%20application%20on%20the%20Azure%20portal&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Ftoolkit%2Faad-manifest-customization%23view-microsoft-entra-application-on-the-azure-portal&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Ftoolkit%2FAAD-manifest-customization.md&documentVersionIndependentId=70b95cac-24c1-4279-8656-cd3c5d0b5235&author=surbhigupta&platformId=d983c833-f680-17be-bf5e-ec2810040727&metadata=*%2BID%253A%2Be473e1f3-69f5-bcfa-bcab-54b098b59c80%2B%250A*%2BService%253A%2B**msteams**)

<a name='use-an-existing-azure-ad-application'></a>

## Use an existing Microsoft Entra app

You can also use an existing Microsoft Entra app for a Teams agent or app project. For more information, see [use an existing Microsoft Entra app](/microsoftteams/platform/toolkit/use-existing-aad-app).

<a name='azure-ad-application-in-teams-application-development-lifecycle'></a>

## Microsoft Entra app in Teams app development lifecycle

Agents Toolkit either reuses an existing app from the relevant `.env` file or creates and updates one from `aad.template.json` during app development lifecycle, then fills in context-dependent values such as `identifierUris` and `redirectUris` once the required endpoints are known. You interact with the Microsoft Entra app at several stages of the Teams app development lifecycle.

1. **To create Project**

      You can create a project in Agents Toolkit with single sign-on (SSO) enabled by default, such as an SSO-enabled tab app. For more information, see [create a new Teams app using Agents Toolkit](create-new-project.md). A Microsoft Entra manifest file is created automatically in `aad.template.json`, and Agents Toolkit creates or updates the Microsoft Entra app during local development and when you move the app to the cloud.

1. **To add SSO to your bot or tab**

      After you create a Teams agent or app without built-in SSO, Agents Toolkit can help you add SSO to the project. As part of that process, a Microsoft Entra manifest file is created automatically in `aad.template.json`.

      Agents Toolkit creates or updates the Microsoft Entra app during next local development session or while you move the app to the cloud.

1. **To build locally**

    Agents Toolkit performs the following functions during local development:

    - The Agents Toolkit reads the `.env.local` file to determine whether an existing Microsoft Entra app is available. If one already exists, Agents Toolkit reuses the existing app. Otherwise, you need to create a new Microsoft Entra app by using the `aad.template.json` file.

    - Initially the toolkit ignores some properties in the manifest file that require additional context, such as `redirectUris`, which depend on the local development endpoint when a new Microsoft Entra app is created from the manifest file.

    - After the local development environment starts successfully, Agents Toolkit updates the Microsoft Entra app with values such as `identifierUris`, `redirectUris`, and other properties that were not available during the initial creation stage.

    - The toolkit loads any changes you made to the Microsoft Entra app during the next local development session. You can also see [Microsoft Entra app changes](https://github.com/OfficeDev/TeamsFx/wiki/) that were applied manually.

1. **To provision for cloud resources**

      You need to provision cloud resources and deploy your app while moving your app to the cloud. At stages, such as local debug, Agents Toolkit:

      - Reads the `.env.{env}` file to find an existing Microsoft Entra app. If a Microsoft Entra app already exists, Agents Toolkit reuses the existing Microsoft Entra app. Otherwise, you need to create a new app using the `aad.template.json` file.

      - Ignores some properties in the manifest file initially that requires more context such as `redirectUris` property. This property requires frontend or bot endpoint during the creation of a new Microsoft Entra app with the manifest file.

      - Completes other resources provision, then Microsoft Entra app's `identifierUris`, and `redirectUris` are updated according to the correct endpoints.

1. **To build app**

    - The cloud command deploys your app to the provisioned resources. It doesn't include deploying Microsoft Entra app changes you've made.

    - Agents Toolkit updates the Microsoft Entra app according to the Microsoft Entra manifest template file.

## Limitations

1. Agents Toolkit extension doesn't support all the properties listed in Microsoft Entra manifest schema.
  
      The following table lists the properties that aren't supported in Agents Toolkit extension:

      |**Not supported properties**|**Reason**|
      |-----------|----------|
      |`passwordCredentials`|Not allowed in manifest|
      |`createdDateTime`|Read-only and can't change|
      |`logoUrl`|Read-only and can't change|
      |`publisherDomain`|Read-only and can't change|

2. The `requiredResourceAccess` property is used for user readable resource app name or permission name strings only for `Microsoft Graph` and `Office 365 SharePoint Online` APIs. You need to use UUID for other APIs. Perform the following steps to retrieve IDs from Azure portal:

    1. Register a new Microsoft Entra app on [Azure portal](https://ms.portal.azure.com/#blade/Microsoft_AAD_IAM/ActiveDirectoryMenuBlade/RegisteredApps).
    1. Select `API permissions` from the Microsoft Entra app page.
    1. Select `add a permission` to add the permission you need.
    1. Select `Manifest` from the `requiredResourceAccess` property, where you can find the IDs of API, and the permissions.

## See also

- [Microsoft 365 Agents Toolkit Overview](agents-toolkit-fundamentals.md)
- [Microsoft Entra manifest](/azure/active-directory/develop/reference-app-manifest)
- [Preview and Customize app manifest in Toolkit](TeamsFx-preview-and-customize-app-manifest.md)
- [Debug your Teams app](debug-overview.md)
- [Debug your Teams app locally](debug-local.md)
