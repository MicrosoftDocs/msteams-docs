---
title: Debug your Teams app locally
description: In this module, learn how to debug your Teams app locally in Teams Toolkit and key features of Teams Toolkit
ms.author: surbhigupta
ms.localizationpriority: high
ms.topic: overview
ms.date: 03/21/2022
---

# Debug your app locally

Teams Toolkit helps you to debug your Teams app locally. The following steps help you to debug your Teams app locally:

## Set up your Teams Toolkit

Perform the following steps to debug your app after you create a new app using the Teams Toolkit:

# [Windows](#tab/Windows)

1. Select **Debug Edge** or **Debug Chrome** from the **Run and Debug** in the activity bar.

   :::image type="content" source="../assets/images/teams-toolkit-v2/debug/debug-run.png" alt-text="Browser option":::

1. Select **Start Debugging (F5)** or  **Run** to run your Teams app in debug mode.

   :::image type="content" source="../assets/images/teams-toolkit-v2/debug/start-debugging.png" alt-text="Start debugging":::

3. Select **Sign in** to Microsoft 365 account.

   :::image type="content" source="../assets/images/teams-toolkit-v2/debug/microsoft365-signin.png" alt-text="Sign in":::

   > [!TIP]
   > You can select **Read more** to learn about Microsoft 365 Developer Program. Your default web browser opens to let you sign-in to your Microsoft 365 account using your credentials.

4. Select **Install** to install the development certificate for localhost.

    :::image type="content" source="../assets/images/teams-toolkit-v2/debug/install-certificate.png" alt-text="certificate":::

   > [!TIP]
   > You can select **Learn More** to know about the development certificate.

5. Select **Yes** if the following dialog box appears:

    :::image type="content" source="../assets/images/teams-toolkit-v2/debug/development-certificate.png" alt-text="certification authority":::

Toolkit launches a new Edge or Chrome browser instance based on your selection and opens a web page to load Teams client.

# [macOS](#tab/macOS)

1. Select **Debug Edge** or **Debug Chrome** from the **Run and Debug** in the activity bar.

   :::image type="content" source="../assets/images/teams-toolkit-v2/debug/debug-run.png" alt-text="Browser lists":::

1. Select **Start Debugging (F5)** or  **Run** to run your Teams app in debug mode.

   :::image type="content" source="../assets/images/teams-toolkit-v2/debug/start-debugging.png" alt-text="Debug your app":::

3. Select **Sign in** to Microsoft 365 account.

   :::image type="content" source="../assets/images/teams-toolkit-v2/debug/microsoft365-signin.png" alt-text="Sign into M365 account":::

   > [!TIP]
   > You can select **Read more** to learn about Microsoft 365 Developer Program. Your default web browser opens to let you sign-in to your Microsoft 365 account using your credentials.

4. Select **Install** to install the development certificate for localhost.

    :::image type="content" source="../assets/images/teams-toolkit-v2/debug/install-certificate.png" alt-text="certificate":::

   > [!TIP]
   > You can select **Learn More** to know about the development certificate.

5. Enter your **User Name** and **Password**, then select **Update Settings** in the following dialog box:

    :::image type="content" source="../assets/images/teams-toolkit-v2/debug/mac-settings.png" alt-text="mac sign in":::

Toolkit launches a new Edge or Chrome browser instance depending on your selection and opens a web page to load Teams client.

---

## Debug process

After the initial set up process, the Teams Toolkit starts the following processes:

<br>

<details>
<summary><b>Starts app services</b></summary>

Runs the tasks defined in `.vscode/tasks.json` as follows:

|  Component |  Task name  | Folder |
| --- | --- | --- |
|  Tab |  **Start Frontend** |  tabs |
|  Bot or message extensions |  **Start Bot** |  bot |
|  Azure Functions |  **Start Backend** |  API |

The following image displays task names on the **Output** **Terminal** tab of the Visual Studio Code while running tab, bot or message extension, and Azure Functions.

:::image type="content" source="../assets/images/teams-toolkit-v2/debug/Terminal.png" alt-text="Start app services":::

</details>
<details>
<summary><b>Launches debuggers</b></summary>

Launches the debug configurations defined in `.vscode/launch.json` as follows:

:::image type="content" source="../assets/images/teams-toolkit-v2/debug/launch-debuggers.png" alt-text="Launch debugger":::

The following table lists the debug configuration names and types for project with tab app and bot app:

|  Component |  Debug configuration name  | Debug configuration type |
| --- | --- | --- |
|  Tab |  **Attach to Frontend (Edge)** or  **Attach to Frontend (Chrome)**  |  pwa-msedge or pwa-chrome  |
|  Bot or message extensions |   **Attach to Bot** |  pwa-node |
| Azure Functions |   **Attach to Backend** |  pwa-node |

The following table lists the debug configuration names and types for project with bot app and without tab app:

|  Component |  Debug configuration name  | Debug configuration type  |
| --- | --- | --- |
|  Bot or message extension  | **Launch Bot (Edge)** or  **Launch Bot (Chrome)**  |   pwa-msedge or pwa-chrome  |
|  Bot or message extension  |   **Attach to Bot** |  pwa-node  |
|  Azure Functions |  **Attach to Backend** |  pwa-node |

</details>
<details>
<summary><b>Sideloads the Teams app</b></summary>

The configuration **Attach to Frontend** or **Launch Bot** launches a new Edge or Chrome browser instance and opens a web page to load Teams client. After the Teams client is loaded, Teams sideloads the Teams app controlled by the sideloading URL defined in the launch configurations [Microsoft Teams](https://teams.microsoft.com/l/app/>${localTeamsAppId}?installAppPackage=true&webjoin=true&${account-hint}). When Teams client loads in the web browser, select **Add** or select one from the dropdown list as per your requirement.

   :::image type="content" source="../assets/images/teams-toolkit-v2/debug/hello-local-debug.png" alt-text="local debug":::

   Your app is added to Teams!

</details>

## See also

* [Use Teams Toolkit to provision cloud resources](provision.md)
* [Add capabilities to your Teams apps](add-capability.md)
* [Deploy to the cloud](deploy.md)
* [Manage multiple environments in Teams Toolkit](TeamsFx-multi-env.md)
* [Preview and customize Teams app manifest](TeamsFx-preview-and-customize-app-manifest.md)
