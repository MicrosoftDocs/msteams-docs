---
title: Migrate project from 17.9 to 17.10+ version
author: v-preethah
description: This guide provides the steps to migrate from scaffolded template to the new project structure in Microsoft Teams using Teams Toolkit.
ms.author: v-preethah
ms.localizationpriority: medium
ms.topic: overview
ms.date: 06/05/2024
---

# Migrate project from 17.9 to 17.10+ version

This guide details the process of migrating from the traditional, scaffolded template to the new project structure in Microsoft Teams. The transition is essential to leverage the latest features and improve project maintainability. The new project structure introduces a more streamlined and efficient way of managing your Teams applications.

`.ttkproj` suffix to represent the new project type. In the new version of 17.10, a Teams solution will contian two projects. One is Teams project, another one is your source code. Teams project contians the Teams app package and Teams Toolkit configuration files, your source code project is the business logic for your tab or bot or other. By separating the concept of Teams app and C# project, we can address the scenario where you already have your existing web or bot solutions and want to embed your web app to Teams or integrate their bot to Teams client. The Teams project makes it easier for you to integrate with any existing project or solution.

Learn in detail to create a new project folder, move configuration files, adjust launch settings, and more.

## Prerequisites

Before starting the migration process, ensure that you have the following:

* A Teams project that is created using Teams Toolkit for Visual Studio 17.9 or earlier version.
* Multiple startups feature. To enable multiple startups, go to **Tools** > **Options** > **Preview Feature** > **Enable Multi-Project Launch Profiles**.

## Migration process

Perform the following steps to migrate to the new project structure:

1. In your Teams project folder where you have the VS solution file create a new folder. You can provide any name to the new folder but must be meaningful. We recommend that you use the folder name as **TeamsApp**.

1. Create a **TeamsApp.ttkproj** file in the **TeamsApp** folder. Add the following code to the **TeamsApp.ttkproj** file:

    ```xml
    <?xml version="1.0" encoding="utf-8"?>
    <Project ToolsVersion="15.0" Sdk="Microsoft.TeamsFx.Sdk">
      <ItemGroup>
        <ProjectCapability Include="ProjectConfigurationsDeclaredDimensions" />
      </ItemGroup>
    </Project>
    ```

    > [!NOTE]
    > The project file name must match the new folder name.

1. Remove the following configuration folders and files from your project folder and add them in the **TeamsApp** folder.

    * Folders: `appPackage`, `env`, `infra`
    * Files: `teamsapp.yml`, `teamsapp.local.yml`, `aad.manifest.json`

    > [!NOTE]
    > Once the folders and files are moved they are automatically included in your **TeamsApp.ttkproj** file and you needn't add them to the **TeamsApp.ttkproj** manually.

1. According to your `launchSettings.json`, move the launching browser or test tool capability to `launchSettings.json` of the **TeamsApp** folder.

    * Create a `launchSettings.json` file in the **TeamsApp** folder. Add the contents of the file `launchSettings.json` of your project folder to the newly created `launchSettings.json` in the **TeamsApp** folder.
    * In the newly created `launchSettings.json` of the **TeamsApp** folder, delete the `dotnetRunMessages`, `launchBrowser`, `applicationUrl`, `environmentVariables`, and `hotReloadProfile` fields.
    * In the `launchSettings.json` of your project folder, delete the `launchBrowser`, `launchTestTool`, and `launchUrl` fields and duplicated profiles.

    > [!NOTE]
    >
    > * The `launchSettings.json` of your project must start by itself.
    > * The `launchSettings.json` of the **TeamsApp** folder is configured to launch the browser or the test tool app that communicates with your project.

1. Open the solution file using Visual Studio (version 17.10 Preview 3 or later) and add the new project `TeamsApp.ttkproj` from **TeamsApp** folder to the solution file in Visual Studio.

1. Remove `<ProjectCapability Include="TeamsFx"/>` in your project.

1. Create a `{{solutionName}}.slnLaunch.user` file. You can create this file either through VS or manually.
  
   # [Visual Studio](#tab/channel-meeting)
   
   1. Right-click the solution and select **Configure Startup Projects...**.
   1. Select **Multiple start projects** and add more profiles that starts the **TeamsApp** and your project simultaneously. You can rename the profiles as required.
   1. Select **OK**. The `{{solutionName}}.slnLaunch.user` file is automatically saved in the solution folder.

   # [Manually](#tab/manually)

   Create a `{{solutionName}}.slnLaunch.user` file at the same level as the solution file and add the content according to the files of `launchSettings.json`.

   ```json
    [
      {
        "Name": "Microsoft Teams (browser)",
        "Projects": [
          {
            "Path": "TeamsApp\\TeamsApp.ttkproj",
            "Action": "StartWithoutDebugging",
            "DebugTarget": "Microsoft Teams (browser)"
          },
          {
            "Path": "MyTeamsApp8\\MyTeamsApp8.csproj",
            "Action": "Start",
            "DebugTarget": "Start Project"
          }
        ]
      }
    ]
   ```

   > [!NOTE]
   >
   > The `{{solutionName}}.slnLaunch.user` file specifies which projects to launch and their respective startup configurations. You can define groups of projects that you want to start simultaneously. Ensure that the `DebugTarget` corresponds exactly to the profile names in the `launchSettings.json`.

    ---

1. Modify the `teamsapp.local.yml` and `teamsapp.yml` files in the **TeamsApp** folder.
1. Every action that changes your project must be updated because the path is updated. Focus on the following actions:

    * `uses: file/createOrUpdateJsonFile`: This action might change the `appSettings.json` file of your project to configure runtime environments. Update the `target` field to the correct path.
        > [!IMPORTANT]
        > You need not modify `launchSettings.json` using `file/createOrUpdateJsonFile`. If present in `teamsapp.local.yml`, remove it.
    * `uses: cli/runDotnetCommand`: This action executes a `.NET` command within your project to package it. Adjust the `workingDirectory` field to the new path and update the command string with the correct `.csproj` path.
    * `uses: azureAppService/zipDeploy`: This action deploys the packaged file remotely. Update the `workingDirectory` field to the correct path.

    Here’s an example of how to modify the YAML configurations:

    ```yml
    # For example:
    # Generate runtime appsettings to JSON file
    - uses: file/createOrUpdateJsonFile
      with:
        target: ../MyTeamsApp8/appsettings.Development.json
        content:
          TeamsFx:
            Authentication:
            ClientId: ${{AAD_APP_CLIENT_ID}}
            ClientSecret: ${{SECRET_AAD_APP_CLIENT_SECRET}}
            InitiateLoginEndpoint: ${{TAB_ENDPOINT}}/auth-start.html
            OAuthAuthority: ${{AAD_APP_OAUTH_AUTHORITY}}
    
    # Triggered when 'teamsapp deploy' is executed
    deploy:
    - uses: cli/runDotnetCommand
      with:
        args: publish --configuration Release MyTeamsApp8.csproj
        workingDirectory: ../MyTeamsApp8
    
    # Deploy your application to Azure App Service using the zip deploy feature.
    # For additional details, refer to https://aka.ms/zip-deploy-to-app-services.
    - uses: azureAppService/zipDeploy
      with:
        # Deploy base folder
        artifactFolder: bin/Release/net8.0/publish
        # The resource id of the cloud resource to be deployed to.
        # This key will be generated by arm/deploy action automatically.
        # You can replace it with your existing Azure Resource id
        # or add it to your environment variable file.
        resourceId: ${{TAB_AZURE_APP_SERVICE_RESOURCE_ID}}
        workingDirectory: ../MyTeamsApp8

    ```

    > [!NOTE]
    > This step is easy to make mistakes, so you can provision and deploy on the new project folder to test the app.

1. Close the solution and ensure all changes are saved.

You've succesfully migrated your project and your folder structure is updated.

## Folder Structure

# [Old structure](#tab/old)

:::image type="content" source="../assets/images/teams-toolkit-overview/old-structure-migration.png" alt-text="Screenshot shows the old structure.":::

# [New structure](#tab/new)

:::image type="content" source="../assets/images/teams-toolkit-overview/new-structure-migration.png" alt-text="Screenshot shows the new structure.":::

---

### Project Type File

# [Old project type file](#tab/old)

None

# [New project type file](#tab/new)

This file extension is **.ttkproj**.

```xml
<?xml version="1.0" encoding="utf-8"?>
<Project ToolsVersion="15.0" Sdk="Microsoft.TeamsFx.Sdk">
  <PropertyGroup Label="Globals">
    <ProjectGuid>f05bbd29-f3bc-4bb8-8f1f-842235db6b49</ProjectGuid>
  </PropertyGroup>
  <ItemGroup>
    <ProjectCapability Include="ProjectConfigurationsDeclaredDimensions" />
  </ItemGroup>
</Project>
```

---

### LaunchSettings.json

# [Old launchSettings.json](#tab/old)

```json
{
  "profiles": {
    // Debug project within Teams
    "Microsoft Teams (browser)": {
      "commandName": "Project",
      "dotnetRunMessages": true,
      "launchBrowser": true,
      "launchUrl": "https://teams.microsoft.com/l/app/$?installAppPackage=true&webjoin=true&appTenantId=$&login_hint=$",
      "applicationUrl": "https://localhost:44302;http://localhost:2544",
      "environmentVariables": {
        "ASPNETCORE_ENVIRONMENT": "Development"
      },
      "hotReloadProfile": "aspnetcore"
    },
    "Microsoft 365 app (browser)": {
      "commandName": "Project",
      "dotnetRunMessages": true,
      "launchBrowser": true,
      "launchUrl": "https://www.office.com/m365apps/$?auth=2&login_hint=$",
      "applicationUrl": "https://localhost:44302;http://localhost:2544",
      "environmentVariables": {
        "ASPNETCORE_ENVIRONMENT": "Development"
      },
      "hotReloadProfile": "aspnetcore"
    },
    "Outlook (browser)": {
      "commandName": "Project",
      "dotnetRunMessages": true,
      "launchBrowser": true,
      "launchUrl": "https://outlook.office.com/host/$?login_hint=$",
      "applicationUrl": "https://localhost:44302;http://localhost:2544",
      "environmentVariables": {
        "ASPNETCORE_ENVIRONMENT": "Development"
      },
      "hotReloadProfile": "aspnetcore"
    }
    //// Uncomment following profile to debug project only (without launching Teams)
    //,
    //"Start Project (not in Teams)": {
    //  "commandName": "Project",
    //  "dotnetRunMessages": true,
    //  "launchBrowser": true,
    //  "applicationUrl": "https://localhost:44302;http://localhost:2544",
    //  "environmentVariables": {
    //    "ASPNETCORE_ENVIRONMENT": "Development"
    //  },
    //  "hotReloadProfile": "aspnetcore"
    //}
  }
}
```

# [New launchSettings.json](#tab/new)

The following code is the sample of the C# project:

```json
{
  "profiles": {
    "Start Project": {
      "commandName": "Project",
      "dotnetRunMessages": true,
      "applicationUrl": "https://localhost:44302;http://localhost:2544",
      "environmentVariables": {
        "ASPNETCORE_ENVIRONMENT": "Development"
      },
      "hotReloadProfile": "aspnetcore"
    }
  }
}
```

The following code is the sample of TeamsApp project:

```json
{
  "profiles": {
    // Debug project within Teams
    "Microsoft Teams (browser)": {
      "commandName": "Project",
      "launchUrl": "https://teams.microsoft.com/l/app/${{TEAMS_APP_ID}}?installAppPackage=true&webjoin=true&appTenantId=${{TEAMS_APP_TENANT_ID}}&login_hint=${{TEAMSFX_M365_USER_NAME}}",
    },
    // Debug project within Microsoft 365
    "Microsoft 365 app (browser)": {
      "commandName": "Project",
      "launchUrl": "https://www.office.com/m365apps/${{M365_APP_ID}}?auth=2&login_hint=${{TEAMSFX_M365_USER_NAME}}",
    },
    // Debug project within Outlook
    "Outlook (browser)": {
      "commandName": "Project",
      "launchUrl": "https://outlook.office.com/host/${{M365_APP_ID}}?login_hint=${{TEAMSFX_M365_USER_NAME}}",
    }
  }
}
```

---

### Teams app YAML File

# [Old structure](#tab/old)

The following code is the sample of teamapp.local.yml:

```yml
# Generate runtime appsettings to JSON file
  - uses: file/createOrUpdateJsonFile
    with:
      target: ./appsettings.Development.json
      content:
        TeamsFx:
          Authentication:
            ClientId: ${{AAD_APP_CLIENT_ID}}
            ClientSecret: ${{SECRET_AAD_APP_CLIENT_SECRET}}
            InitiateLoginEndpoint: ${{TAB_ENDPOINT}}/auth-start.html
            OAuthAuthority: ${{AAD_APP_OAUTH_AUTHORITY}}

......

  # Create or update debug profile in lauchsettings file
  - uses: file/createOrUpdateJsonFile
    with:
      target: ./Properties/launchSettings.json
      content:
        profiles:
          Microsoft Teams (browser):
            commandName: "Project"
            dotnetRunMessages: true
            launchBrowser: true
            launchUrl: "https://teams.microsoft.com/l/app/$?installAppPackage=true&webjoin=true&appTenantId=$&login_hint=$"
            applicationUrl: "https://localhost:44302;http://localhost:2544"
            environmentVariables:
              ASPNETCORE_ENVIRONMENT: "Development"
            hotReloadProfile: "aspnetcore"
          Microsoft 365 app (browser):
            commandName: "Project"
            dotnetRunMessages: true
            launchBrowser: true
            launchUrl: "https://www.office.com/m365apps/$?auth=2&login_hint=$"
            applicationUrl: "https://localhost:44302;http://localhost:2544"
            environmentVariables:
              ASPNETCORE_ENVIRONMENT: "Development"
            hotReloadProfile: "aspnetcore"
          Outlook (browser):
            commandName: "Project"
            dotnetRunMessages: true
            launchBrowser: true
            launchUrl: "https://outlook.office.com/host/$?login_hint=$"
            applicationUrl: "https://localhost:44302;http://localhost:2544"
            environmentVariables:
              ASPNETCORE_ENVIRONMENT: "Development"
            hotReloadProfile: "aspnetcore"
```

The following code is the sample of teamapp.yml:

```yml
# Triggered when 'teamsapp deploy' is executed
deploy:
  - uses: cli/runDotnetCommand
    with:
      args: publish --configuration Release OldMyTeamsApp1.csproj
  # Deploy your application to Azure App Service using the zip deploy feature.
  # For additional details, refer to https://aka.ms/zip-deploy-to-app-services.
  - uses: azureAppService/zipDeploy
    with:
      # Deploy base folder
      artifactFolder: bin/Release/net8.0/publish
      # The resource id of the cloud resource to be deployed to.
      # This key will be generated by arm/deploy action automatically.
      # You can replace it with your existing Azure Resource id
      # or add it to your environment variable file.
      resourceId: ${{TAB_AZURE_APP_SERVICE_RESOURCE_ID}}
```

# [New structure](#tab/new)

The following code is the sample of teamapp.local.yml:

```yml
# Generate runtime appsettings to JSON file
  - uses: file/createOrUpdateJsonFile
    with:
      target: ../MyTeamsApp8/appsettings.Development.json
      content:
        TeamsFx:
          Authentication:
            ClientId: ${{AAD_APP_CLIENT_ID}}
            ClientSecret: ${{SECRET_AAD_APP_CLIENT_SECRET}}
            InitiateLoginEndpoint: ${{TAB_ENDPOINT}}/auth-start.html
            OAuthAuthority: ${{AAD_APP_OAUTH_AUTHORITY}}

```

The following code is the sample of teamapp.yml:

```yml
# Triggered when 'teamsapp deploy' is executed
deploy:
  - uses: cli/runDotnetCommand
    with:
      args: publish --configuration Release MyTeamsApp8.csproj
      workingDirectory: ../MyTeamsApp8
  # Deploy your application to Azure App Service using the zip deploy feature.
  # For additional details, refer to https://aka.ms/zip-deploy-to-app-services.
  - uses: azureAppService/zipDeploy
    with:
      # Deploy base folder
      artifactFolder: bin/Release/net8.0/publish
      # The resource id of the cloud resource to be deployed to.
      # This key will be generated by arm/deploy action automatically.
      # You can replace it with your existing Azure Resource id
      # or add it to your environment variable file.
      resourceId: ${{TAB_AZURE_APP_SERVICE_RESOURCE_ID}}
      workingDirectory: ../MyTeamsApp8
```

---

### Solution launch user file

# [Old structure](#tab/old)

None

# [New structure](#tab/new)

This file must be stored at the same level of the solution folder.

```json
[
  {
    "Name": "Microsoft Teams (browser)",
    "Projects": [
      {
        "Name": "TeamsApp\\TeamsApp.ttkproj",
        "Action": "StartWithoutDebugging",
        "DebugTarget": "Microsoft Teams (browser)"
      },
      {
        "Name": "MyTeamsApp8\\MyTeamsApp8.csproj",
        "Action": "Start",
        "DebugTarget": "Start Project"
      }
    ]
  },
  {
    "Name": "Microsoft 365 app (browser)",
    "Projects": [
      {
        "Name": "TeamsApp\\TeamsApp.ttkproj",
        "Action": "StartWithoutDebugging",
        "DebugTarget": "Microsoft 365 app (browser)"
      },
      {
        "Name": "MyTeamsApp8\\MyTeamsApp8.csproj",
        "Action": "Start",
        "DebugTarget": "Start Project"
      }
    ]
  },
  {
    "Name": "Outlook (browser)",
    "Projects": [
      {
        "Name": "TeamsApp\\TeamsApp.ttkproj",
        "Action": "StartWithoutDebugging",
        "DebugTarget": "Outlook (browser)"
      },
      {
        "Name": "MyTeamsApp8\\MyTeamsApp8.csproj",
        "Action": "Start",
        "DebugTarget": "Start Project"
      }
    ]
  }
]
```

---
