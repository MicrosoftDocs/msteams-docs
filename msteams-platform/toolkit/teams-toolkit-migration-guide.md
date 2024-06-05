---
title: Teams Toolkit Migration Guide
author: v-preethah
description: In this module, learn how to migrate from Teams Toolkit 17.9 to 17.10.
ms.author: v-preethah
ms.localizationpriority: medium
ms.topic: overview
ms.date: 06/05/2024
---

# Teams Toolkit 17.9 to 17.10 migration guide

This doc is to tell how to migrate to the new project type from the old, scaffolded template.

> [!IMPORTANT]
> The new project type can just run after Visual Studio 17.10 Preview 3, also needs users to enable multiple startups feature.

Check **Tools** > **Options** > **Preview Feature** > **Enable Multi-Project Launch Profiles**.

1. Create a new folder under the solution folder. The new folder name can be TeamsApp.

    > [!NOTE]
    > The new folder can be any name, but please pay any attention that it must be meaningful. We suggest to use TeamsApp.

1. Create a file under the new folder and name it as TeamsApp.ttkproj.

    ```xml
    <?xml version="1.0" encoding="utf-8"?>
    <Project ToolsVersion="15.0" Sdk="Microsoft.TeamsFx.Sdk">
      <ItemGroup>
        <ProjectCapability Include="ProjectConfigurationsDeclaredDimensions" />
      </ItemGroup>
    </Project>
    ```

    > [!NOTE]
    > The name of project file must be the same of the new folder, but differences won't block the Visual Studio system.

1. Move the configuration folders and the files to the new project. They're

    * Folders: ["appPackage", "env", "infra"]
    * Files: ["teamsapp.yml", "teamsapp.local.yml", "aad.manifest.json"]

    > [!NOTE]
    > These folders and files are auto included, so you needn't manually add them to the .ttkproj.

1. According to the earlier launchSettings.json, move the launching browser or test tool capability to launchSettings.json of the new project.

    * Create a launchSettings.json under the new project. Copy the C# launchSettings.json to the new created one.
    * Delete the dotnetRunMessages, launchBrowser, applicationUrl, environmentVariables, and hotReloadProfile fields of the new launchSettings.json, because they aren't used in TeamsApp.
    * Remove the launchBrowser, launchTestTool, and launchUrl in the old LaunchSettings.json file.
    * Remove the duplicated profiles in the earlier launchSettings.json.

    > [!NOTE]
    >
    > * Notice that the LaunchSettings.json under the C# (old) project just needs to start itself.
    > * The LaunchSettings.json under the TeamsApp is to start the browser or the test tool app which communicates with the C# project.
    > *Names of profiles will be used in the following step.

1. Use Visual Studio (version greater than 17.10 Preview 3) to open the solution. Add the new project to the solution, maybe TeamsApp/TeamsApp.ttkproj.

1. Remove `<ProjectCapability Include="TeamsFx"/>` in the old C# project.

1. Create a {{solutionName}}.slnLaunch.user file at the same level of the solution file.

1. Add the content to the {{solutionName}}.slnLaunch.user file, according to the two files of LaunchSettings.json.

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
> This {{solutionName}}.slnLaunch.user file defines what projects will start and how to start them. You can define your groups of projects you want to start together.
Notice that the DebugTarget must be the same name of the profiles in the LaunchSettings.json.

Alternatively, use UI to set up the multiple startup profiles.

1. Right-click the solution -> Configure Startup Projects...
1. Select Multiple start projects -> Add more profiles that start up TeamsApp and the C# project together. You can rename them to what you like.
1. Select OK. You can find that the {{solutionName}}.slnLaunch.user has auto saved under the solution folder.

1. Modify the teamsapp.local.yml and teamsapp.yml after moving them to the new folder.
1. Every action that changes the C# project needs to be updated because the path has changed. Almost focus on the following actions:

    * uses: file/createOrUpdateJsonFile, it might change the C# appSettings.json file to set some runtime environment, so change to the correct path of target field.
        > [!IMPORTANT]
        > Changing LaunchSettings.json in file/createOrUpdateJsonFile is unnecessary so remove it if you see it in the teamsapp.local.yml.
    * uses: cli/runDotnetCommand, it runs dotnet command under the C# project to pack the project, so add the correct path to WorkingDirectory field and add the correct csproj path to the command string.
    * uses: azureAppService/zipDeploy, it deploys the packed file to the remote, so add the correct path to WorkingDirectory field.

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
> This step is easy to make mistakes, so you can provision and deploy on the new project to test it.

1. Close the solution and save all changes.

## Folder Structure

Old and New image

## New Project Type File

Old and New image

New

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

## LaunchSettings.json

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

New

One in C# code project.

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

Another in TeamsApp project

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

## Teams app YAML File

Old

teamapp.local.yml

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

teamapp.yml

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

New

teamapp.local.yml

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

teamapp.yml

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

## Solution Launch User File

Old

None

New

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
