---
title: Debug your Teams app
author: surbhigupta 
description: In this module, learn how to debug your Teams app and key features of Teams Toolkit.
ms.author: surbhigupta 
ms.localizationpriority: high
ms.topic: overview
ms.date: 03/21/2022
---

# Debug your Teams app

Teams Toolkit helps you to debug and preview your Microsoft Teams app. Debug is the process of checking, detecting, and correcting issues or bugs to ensure the program runs successfully in Teams.

## Debug your Teams app for Visual Studio Code

Teams Toolkit in Microsoft Visual Studio Code automates the debug process. You can detect errors and fix them as well as preview the teams app. You can also customize debug settings to create your tab or bot.

During the debug process:

* Teams Toolkit automatically starts app services, launches debuggers, and sideloads the Teams app.
* Teams Toolkit checks the prerequisites during the debug background process.
* Your Teams app is available for preview in Teams web client locally after debugging.
* You can also customize debug settings to use your bot endpoints, development certificate, or debug partial component to load your configured app.
* Visual Studio Code allows you to debug tab, bot, message extension, and Azure Functions.

## Key debug features of Teams Toolkit

Teams Toolkit supports the following debug features:

* [Start debugging](#start-debugging)
* [Multi-target debugging](#multi-target-debugging)
* [Toggle breakpoints](#toggle-breakpoints)
* [Hot reload](#hot-reload)
* [Stop debugging](#stop-debugging)

Teams Toolkit performs background functions during debug process, which include verifying the prerequisites required for debug. You can see the progress of the verification process in the output channel of Teams Toolkit. In the setup process you can register and configure your Teams app.

### Start debugging

You can press **F5** as a single operation to start debugging. Teams Toolkit starts to check prerequisites, registers Microsoft Azure Active Directory (Azure AD) app, Teams app, and registers bot, starts services, and launches browser.

### Multi-target debugging

Teams Toolkit utilizes multi-target debugging feature to debug tab, bot, message extension, and Azure Functions at the same time.

### Toggle breakpoints

You can toggle breakpoints on the source codes of tabs, bots, message extensions, and Azure Functions. The breakpoints execute when you interact with the Teams app in a web browser. The following image shows toggle breakpoint:

   :::image type="content" source="../assets/images/teams-toolkit-v2/debug/toggle-points.png" alt-text="Screenshot shows the toggle breakpoints." lightbox="../assets/images/teams-toolkit-v2/debug/toggle-points.png":::

### Hot reload

You can update and save the source codes of tab, bot, message extension, and Azure Functions at the same time when you're debugging the Teams app. The app reloads and the debugger reattach to the programming languages.

   :::image type="content" source="../assets/images/teams-toolkit-v2/debug/hot-reload.png" alt-text="Screenshot shows the hot reload for source codes." lightbox="../assets/images/teams-toolkit-v2/debug/hot-reload.png":::

### Stop debugging

When you complete local debug, you can select **Stop (Shift+F5)** or **[Alt] Disconnect (Shift+F5)** from the floating debugging toolbar to stop all debug sessions and terminate tasks. The following image shows the stop debug action:

   :::image type="content" source="../assets/images/teams-toolkit-v2/debug/stop-debug.png" alt-text="Screenshot shows the stop debugging option.":::

## Prepare for debug

The following steps help you to prepare for debug:

### Sign in to Microsoft 365

If you've signed up for Microsoft 365 already, sign in to Microsoft 365. For more information, see [Microsoft 365 developer program](tools-prerequisites.md#microsoft-365-developer-program)

### Toggle breakpoints

Ensure that you can toggle breakpoints on the source codes of tabs, bots, message extensions, and Azure Functions for more information, see [Toggle breakpoints](#toggle-breakpoints)

## Customize debug settings

Teams Toolkit allows you to customize the debug settings to create your tab or bot. For more information on the full list of customizable options, see [debug settings doc](https://github.com/OfficeDev/TeamsFx/wiki/Teams-Toolkit-Visual-Studio-Code-v5.0-Prerelease-Guide#debug-f5-in-visual-studio-code).

You can also customize debug settings for your existing bot app.
<br>

<details>

<summary><b>Learn how to use an existing bot for debugging</b></summary>

Teams Toolkit creates Azure AD apps for projects with bot by default using  [`botAadApp/create`](https://github.com/OfficeDev/TeamsFx/wiki/Available-actions-in-Teams-Toolkit#botaadappcreate) action.

To use an existing bot, you can set `BOT_ID` and `SECRET_BOT_PASSWORD` in `env/.env.local` with your own values.

Use the following code snippet example to set up an existing bot for debugging:

```javascript
# env/.env.local

# Built-in environment variables
TEAMSFX_ENV=local

# Generated during provision, you can also add your own variables.
BOT_ID={YOUR_OWN_BOT_ID}
...

SECRET_BOT_PASSWORD={YOUR_OWN_BOT_PASSWORD}
...
```

</details>

### Customize Scenarios

Here's a list of debug scenarios that you can use:
<br>
<details>

<summary><b>Skip prerequisite checks</b></summary>

In `.vscode/tasks.json` under `"Validate prerequisites"` > `"args"` > `"prerequisites"`, update the prerequisite checks you wish to skip.

  :::image type="content" source="../assets/images/teams-toolkit-v2/debug/skip-prerequisite-checks.png" alt-text="Screenshot shows the skip prerequisite checks.":::

</details>

<details>
<summary><b>Use your development certificate</b></summary>

1. In `teamsapp.local.yml`, remove `devCert` from `devTool/install` action (or remove the whole `devTool/install` action if it only contains `devCert`).
1. In `teamsapp.local.yml`, set `"SSL_CRT_FILE"` and `"SSL_KEY_FILE"` in `file/createOrUpdateEnvironmentFile` action to your certificate file path and key file path.

```yml
# teamsapp.local.yml
...
  # Remove devCert or this whole action
  - uses: devTool/install
    with:
      # devCert:
  ...
  - uses: file/createOrUpdateEnvironmentFile
    with:
      target: ./.localSettings
      envs:
        ...
        # set your own cert values
        SSL_CRT_FILE: ...
        SSL_KEY_FILE: ...
...
```

</details>

<details>
<summary><b>Customize npm install command</b></summary>

In `teamsapp.local.yml`, edit `args` of `cli/runNpmCommand` action.

```yml
# teamsapp.local.yml
...
  - uses: cli/runNpmCommand
    with:
      # edit the npm command args
      args: install --no-audit
...
```

</details>

<details>
<summary><b>Modify ports</b></summary>

* Bot
  1. Search for `"3978"` across your project and look for appearances in `tasks.json` and `index.js`.
  1. Replace it with your port.

     :::image type="content" source="../assets/images/teams-toolkit-v2/debug/modify-ports-bot.png" alt-text="Screenshot shows the search result to replace your port for bot.":::

* Tab

  1. Search for `"53000"` across your project and look for appearances in `teamsapp.local.yml` and `tasks.json`.
  1. Replace it with your port.
  
     :::image type="content" source="../assets/images/teams-toolkit-v2/debug/modify-ports-tab.png" alt-text="Screenshot shows the search result to replace your port for tab.":::

</details>

<details>
<summary><b>Use your own app package</b></summary>

Teams Toolkit by default creates a set of `teamsApp` actions to manage app package. You can update those in `teamsapp.local.yml` to use your own app package.

```yml
# teamsapp.local.yml
...
  - uses: teamsApp/create # Creates a Teams app
    ...
  - uses: teamsApp/validateManifest # Validate using manifest schema
    ...
  - uses: teamsApp/zipAppPackage # Build Teams app package with latest env value
    ...
  - uses: teamsApp/validateAppPackage # Validate app package using validation rules
    ...
  - uses: teamsApp/update # Apply the Teams app manifest to an existing Teams app in Teams Developer Portal.
    ...
...
```

</details>

<details>
<summary><b>Use your own tunnel</b></summary>

1. In `.vscode/tasks.json` under `"Start Teams App Locally"`, you can update `"Start Local tunnel"`.

   :::image type="content" source="../assets/images/teams-toolkit-v2/debug/start-local-tunnel.png" alt-text="Screenshot shows the tasks of use your own tunnel.":::

```javascript
# env/.env.local

# Built-in environment variables
TEAMSFX_ENV=local
...
BOT_DOMAIN={YOUR_OWN_TUNNEL_DOMAIN}
BOT_ENDPOINT={YOUR_OWN_TUNNEL_URL}
...
```

</details>

<details>

<summary><b>Add environment variables</b></summary>

You can add environment variables to `.localConfigs` file for tab, bot, message extension, and Azure Functions. Teams Toolkit loads the environment variables you added to start services during local debug.

 > [!NOTE]
 > Ensure to start a new local debug after you add new environment variables, as the environment variables don't support hot reload.

</details>

<details>
<summary><b>Debug partial component</b></summary>

Teams Toolkit utilizes Visual Studio Code multi-target debugging to debug tab, bot, message extension, and Azure Functions at the same time. You can update `.vscode/launch.json` and `.vscode/tasks.json` to debug partial component. If you want to debug tab only in a tab plus bot with Azure Functions project, use the following steps:

1. Update `"Attach to Bot"` and `"Attach to Backend"` from debug compound in `.vscode/launch.json`.

   ```json
   {
       "name": "Debug (Edge)",
        "configurations": [
           "Attach to Frontend (Edge)",
           // "Attach to Bot",
           // "Attach to Backend"
           ],
           "preLaunchTask": "Start Teams App Locally",
           "presentation": {
               "group": "all",
               "order": 1
           },
           "stopAll": true

   }
   ```

2. Update `"Start Backend"` and `"Start Bot"` from Start All task in .vscode/tasks.json.

   ```json
   {
                                           
       "label": "Start application",
       "dependsOn": [
           "Start Frontend",
             // "Start Backend",
             // "Start Bot"

         ]
              
   }
   ```

</details>

## Next

> [!div class="nextstepaction"]
> [Debug your app locally](debug-local.md)

## See also

* [Teams Toolkit Overview](teams-toolkit-fundamentals.md)
* [Debug background process](debug-background-process.md)
* [Use Teams Toolkit to provision cloud resources](provision.md)
* [Deploy to the cloud](deploy.md)
* [Preview and customize Teams app manifest](TeamsFx-preview-and-customize-app-manifest.md)
