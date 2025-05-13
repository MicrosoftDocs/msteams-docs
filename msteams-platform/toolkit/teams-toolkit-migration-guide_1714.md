---
title: Migrate Teams Toolkit project to 17.14+ version
author: huihuiwu
description: This guide provides the steps to migrate from scaffolded template to the new project structure in Microsoft Teams using Teams Toolkit.
ms.author: huihuiwu
ms.localizationpriority: medium
ms.topic: overview
ms.date: 13/05/2025
---

# Migrate Teams Toolkit project from to 17.14+ version

One-click F5 has been implemented in Teams Toolkit for Visual Studio v17.14 to enhance local debug experience and reduce F5 failure rate. The new debug experience introduces two debug profile types.

- **Microsoft Teams (browser)**: Default debug profile which will run prepare Teams App dependencies step to update if there're any changes before launching Teams
- **Microsoft Teams (browser) (skip update app)**: A quick-to-launch debug profile which will skip prepare Teams App dependencies step and launch Teams directly

If you're debugging your project for the first time or after making some modifications, you should choose the `Microsoft Teams (browser)` debug profile. If you have prepared Teams App dependencies before and want a quick launch without changes, you should choose the `Microsoft Teams (browser) (skip update app)` debug profile.

## Prerequisites

Before starting the migration process, ensure that you have the following:

* A Teams project with new project structure that is created using Teams Toolkit for Visual Studio 17.13 or earlier version.
* Visual Studio version 17.14 or later.

## Migration process

Perform the following steps to migrate to one-click F5 experience:

1. Open `Configuration Manager` window by clicking **Build** > **Configuration Manager...** in VS.

2. In `Configuration Manager` window, check the `deploy` stage for M365Agent/TeamsApp project so prepare Teams App dependencies will be executed when deploying.

  :::image type="content" source="../assets/images/teams-toolkit-overview/debug_check_deploy.png" alt-text="Screenshot shows the configuration manager window.":::

3. (Optional) Create **Microsoft Teams (browser) (skip update app)** debug profile. You could follow **Microsoft Teams (browser)** debug profile to add following contents:

   In `launchSettings.json` under M365Agent/TeamsApp project, add following contents:

   ```json
      "Microsoft Teams (browser) (skip update app)": {
        "commandName": "Project",
        "environmentVariables": { "UPDATE_TEAMS_APP": "false" },
        "launchUrl": "https://teams.microsoft.com/l/app/${{TEAMS_APP_ID}}?installAppPackage=true&webjoin=true&appTenantId=${{TEAMS_APP_TENANT_ID}}&login_hint=${{TEAMSFX_M365_USER_NAME}}"
    },
   ```
   In `{{solutionName}}.slnLaunch.user` file at the same level as the solution file, add the content according to the files of `launchSettings.json`.

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

4.  If your project contains debug profile for Microsoft 365 Agents Playground, you'll need to add following environment variable in `launchSettings.json` under M365Agents/TeamsApp project:

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