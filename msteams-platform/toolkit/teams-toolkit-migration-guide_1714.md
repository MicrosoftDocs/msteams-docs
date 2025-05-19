---
title: Migrate project from 17.13 to 17.14+
author: huihuiwu
description: Learn to migrate scaffolded project from Microsoft Teams template using Agents Toolkit in Visual Studio version 17.13 to 17.14.
ms.author: huihuiwu
ms.localizationpriority: medium
ms.topic: overview
ms.date: 05/19/2025
---

# Migrate Teams Toolkit projects from Visual Studio version 17.13 to 17.14+

Teams Toolkit has significant [updates in Visual Studio (VS) 17.14](/visualstudio/releases/2022/release-notes). If you are working on VS versions from 17.10 to 17.13, and now you want to upgrade to 17.14, you may want to migrate your projects to make it compatible with VS 17.14. The key updates that have impacted this migration are:

### Teams Toolkit evolves to Microsoft 365 Agents Toolkit

Teams Toolkit changes it's name to Microsoft 365 Agents Toolkit, reflecting our broader commitment to support development across Microsoft 365 Copilot, Microsoft Teams, and Microsoft 365 apps. This new name better represents our expanded capabilities and focus on enabling developers to build intelligent agents and apps across the Microsoft 365 ecosystem.

### Enable one-click debug experience

In previous versions of Teams Toolkit, when users debug any solution generated, they need to use the command `Prepare Teams app dependency` before debugging the project. This command triggers the toolkit to create essential resources for debugging, such as registering required app ID or updating the app manifest.

To enhance the debugging experience and make it easier and quicker, we have removed this step and enabled one-click debugging experience. Now, you can directly click the debug button without any preparation steps. However, if you've made edits to your app manifest between two debug events and need to update your app, there remains an option to do that. The new debug experience introduces the following two debug types, offered by selecting from different debug profiles:

- **Debug with updating app**: Select the default profile `[Your Target Launch Platform] (browser)` that will run prepare Teams App dependencies step in debugging. This is usually used when you are in the first time to run the project or you have made edits to your app manifest before launching app again.
  
- **Debug without updating app**: Choose the second profile `[Your Target Launch Platform] (browser) (skip update app)` to skip prepare Teams App dependencies step, make a quick launch to your target platform directly. This is usually used for a second time to launch the project, when you only made edits to your application but not edit your app manifest.

## Prerequisites

Before starting the migration process, ensure that you have the following:

* A Teams project with new project structure that is created using Agents Toolkit for Visual Studio version 17.13 or earlier.
* Visual Studio version 17.14 or later with Microsoft 365 Agents Toolkit installed.

## Migration process

Perform the following steps to migrate to one-click F5 experience:

1. Open `Configuration Manager` window by clicking **Build** > **Configuration Manager...** in VS.

2. In `Configuration Manager` window, check the `deploy` stage for M365Agent/TeamsApp project for prepare Teams App dependencies to be executed when deploying.

     :::image type="content" source="../assets/images/toolkit-overview/debug_check_deploy.png" alt-text="Screenshot shows the configuration manager window.":::

3. (Optional) Create **Microsoft Teams (browser) (skip update app)** debug profile. Follow **Microsoft Teams (browser)** debug profile to add following contents:

   In `launchSettings.json` under M365Agent/TeamsApp project, add following contents:

   ```json
      "Microsoft Teams (browser) (skip update app)": {
        "commandName": "Project",
        "environmentVariables": { "UPDATE_TEAMS_APP": "false" },
        "launchUrl": "https://teams.microsoft.com/l/app/${{TEAMS_APP_ID}}?installAppPackage=true&webjoin=true&appTenantId=${{TEAMS_APP_TENANT_ID}}&login_hint=${{TEAMSFX_M365_USER_NAME}}"
    },
   ```

   In `{{solutionName}}.slnLaunch.user` file at the same level as the solution file, add the content according to the files of `launchSettings.json`:

   ```json
    [
      {
        "Name": "Microsoft Teams (browser) (skip update app)",
        "Projects": [
          {
            "Path": "M365Agent\\M365Agent.atkproj",
            "Name": "M365Agent\\M365Agent.atkproj",
            "Action": "StartWithoutDebugging",
            "DebugTarget": "Microsoft Teams (browser) (skip update app)"
          },
          {
            "Path": "tab\\tab.csproj",
            "Name": "tab\\tab.csproj",
            "Action": "Start",
            "DebugTarget": "Start Project"
          }
        ]
      }
    ]
   ```

4. If your project contains debug profile for Microsoft 365 Agents Playground (previously known as Teams App Test Tool), you'll need to add following environment variable in `launchSettings.json` under M365Agents/TeamsApp project:

     ```json
     "UPDATE_TEAMS_APP": "false"
     ```
    An example after updating could be:
  
     ```json
      "Microsoft 365 Agents Playground (browser)": {
        "commandName": "Project",
        "environmentVariables": { "UPDATE_TEAMS_APP": "false", "DEFAULT_CHANNEL_ID": "emulator" },
        "launchTestTool": true,
        "launchUrl": "http://localhost:56150",
      }
     ```
