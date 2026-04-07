---
title: TeamsFx Environments in Agents Toolkit
description: Learn about TeamsFX multiple environment, use env files with Microsoft 365 Agents Toolkit, create a new environment manually in Visual Studio Code, and select target environment.
ms.localizationpriority: medium
ms.topic: conceptual
ms.date: 02/06/2025
---

# Environments in Microsoft 365 Agents Toolkit

When you build an app with Microsoft 365 Agents Toolkit (formerly Teams Toolkit), you typically need to run the same project across multiple targets, such as local, development, or playground. Environments let you keep these targets isolated while reusing the same project structure and lifecycle commands.

Agents Toolkit manages environment-specific settings through `.env.{environment-name}` files. These files hold the variables and outputs for each target environment, so you can provision, deploy, and publish consistently without manually reconfiguring resources each time.

This article explains how environment files work, how local and remote environments differ, how to create additional environments in Visual Studio Code, and how to select the right target environment for your workflow.

## Using environment files with Agents Toolkit

Agents Toolkit follows a standard naming pattern for environment files, such as `.env.{environment-name}`. When you run lifecycle commands like Provision, Deploy, or Publish, you must specify an environment name. This name must match the `{environment-name}` used in the corresponding environment file.

> [!NOTE]
> You can define environment variables for Agents Toolkit in your current shell environment which override any values in the `.env` file during a naming conflict.

### Environment file location

By default, Agents Toolkit doesn't load environment variables and simply executes actions, saving outputs to `./env/.env.dev`. If you don't specify an `environmentFolderPath`, it doesn't read variables from a .env file and assumes the environment is set to `dev`, with outputs directed to `./env/.env.dev`.

## Local environments

Building a Microsoft Teams app involves both cloud and local resources.
Cloud resources include app registrations and the Teams client, while application logic can run locally to speed up development and testing. All Agents Toolkit templates include a preconfigured `local` environment with `./env/.env.local` and `./env/.env.local.user` files. This setup lets you run your agent or app on a local web server and debug it with breakpoints in Visual Studio Code or Visual Studio.

To differentiate between a local environment and all other environments, you can create a separate project file called `m365agents.local.yml` in the same directory as `m365agents.yml`.

## Create a new environment manually in Visual Studio Code

Each project can have one local environment and multiple remote environments. After you create a project, Agents Toolkit configures the following default environments:

* **local** environment to represent the local machine environment configuration.
* **dev** environment to represent the remote or cloud environment configuration.

To create a new environment:

1. Open your Teams agent or app project workspace in Visual Studio Code.
1. Select the Microsoft 365 Agents Toolkit icon from the Visual Studio Code activity bar.
1. Select the **+** icon in the **ENVIRONMENT** section.

    :::image type="content" source="../assets/images/toolkit-v2/create-new-environment.png" alt-text="Screenshot shows the plus icon highlighted in the Environment section.":::

1. Enter a name for the environment and select **Enter**.

   :::image type="content" source="../assets/images/toolkit-v2/environment-name.png" alt-text="Screenshot shows where to enter the environment name.":::

## Targeting an environment for remote build

If your project has multiple environments, you must select one to debug and build your agent or app, and to preview the remote app in Microsoft Teams.

You can choose the target environment directly from the build settings.

### Select the target environment

To target the `dev` environment or a custom environment you’ve created:

1. From the **Lifecycle** section of Agents toolkit, select **Provision** for your agent or app.

   :::image type="content" source="../assets/images/toolkit-v2/toolkit-fundamentals/deployment.png" alt-text="Screenshot shows the Lifecycle section.":::

1. When prompted, select an environment from the list of available environments (for example, `dev` or a custom environment).

   :::image type="content" source="../assets/images/toolkit-v2/toolkit-fundamentals/target-environment.png" alt-text="Screenshot shows the option to select an environment.":::

Agents toolkit provisions for your agent or app. You can now build your agent or app in the selected environment.

### Build in the selected environment

Once the environment is selected, the Agents Toolkit provisions the agent or app for that environment. You can now build, debug, and run your agent or app in the selected environment.

1. Select the :::image type="icon" source="../assets/icons/run-build-vs.png" border="false"::: **Run and Debug** icon from the Visual Studio Code sidebar.
1. Select the option to debug and to preview the remote app in Microsoft Teams.

   :::image type="content" source="../assets/images/toolkit-v2/toolkit-vs/remote-build.png" alt-text="Screenshot shows the option to select the environment for building the agent or app.":::

The Agents toolkit builds the agent or app in the environment for which you had provisioned. The agent or app is available for viewing and testing in Teams.

## See also

* [Microsoft 365 Agents Toolkit Overview](agents-toolkit-fundamentals.md)
* [App manifest schema for Teams](/microsoft-365/extensibility/schema/)
* [Add more cloud resources](add-resource.md)
* [Collaborate with other developers on Teams project](TeamsFx-collaboration.md)
* [Test app behavior in different environment](test-app-behavior.md)
