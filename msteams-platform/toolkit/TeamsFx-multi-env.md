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

Each project can have one local environment but multiple remote environments. After you create a project, Agents Toolkit configures the following default environments:

* **local** environment to represent the local machine environment configuration.
* **dev** environment to represent the remote or cloud environment configuration.

To create a new environment:

1. Open your Teams app project in Visual Studio Code.
1. Select the Microsoft 365 Agents Toolkit icon from the Visual Studio Code activity bar.
1. Select the **+** icon in the **ENVIRONMENT** section.

    :::image type="content" source="../assets/images/toolkit-v2/create-new-environment.png" alt-text="Screenshot shows the plus icon highlighted in the Environment section.":::

1. Enter a name for the environment and select **Enter**.

   :::image type="content" source="../assets/images/toolkit-v2/environment-name.png" alt-text="Screenshot shows where to enter the environment name.":::

## Targeting an environment

When you have multiple environments, you can select the ennvironment in which you can build the app. If you want to build in the `Playground` or `local` environment,  

:::image type="content" source="../assets/images/toolkit-v2/toolkit-vs/local-build.png" alt-text="Screenshot shows the option to select local environment for building the agent or app.":::

To target a `dev` environment or a custom environment you created:

1. Provision and deploy the agent or app using the Agents Toolkit:

   :::image type="content" source="../assets/images/toolkit-v2/toolkit-fundamentals/deployment.png" alt-text="Screenshot shows the Lifecycle section.":::

1. Select the environment that you want to target:

   :::image type="content" source="../assets/images/toolkit-v2/toolkit-fundamentals/target-environment.png" alt-text="Screenshot shows the option to select dev or custom environment.":::

## See also

* [Microsoft 365 Agents Toolkit Overview](agents-toolkit-fundamentals.md)
* [App manifest schema for Teams](/microsoft-365/extensibility/schema/)
* [Add more cloud resources](add-resource.md)
* [Collaborate with other developers on Teams project](TeamsFx-collaboration.md)
* [Test app behavior in different environment](test-app-behavior.md)
