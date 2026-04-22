---
title: TeamsFx Environments in Agents Toolkit
description: Learn about TeamsFX multiple environment, use env files with Microsoft 365 Agents Toolkit, create a new environment manually in Visual Studio Code, and select target environment.
ms.localizationpriority: medium
ms.topic: conceptual
ms.date: 04/20/2026
---

# Environments in Microsoft 365 Agents Toolkit

Building an agent or app with Microsoft 365 Agents Toolkit (formerly Teams Toolkit) often means running the same project in different targets like local, dev, or a playground. Environments keep each target separate while you reuse the same project structure and lifecycle commands. Agents Toolkit stores environment-specific settings `in .env.<environment-name>` files. Each file captures the variables and outputs for that target, so you can provision, deploy, and publish without reconfiguring resources every time.

In this article, you’ll learn how these environment files work, how local and remote environments differ, how to add new environments for your agent or app project, and how to target a particular environment for your workflow.

## Using environment files with Agents Toolkit

Agents Toolkit follows a standard naming pattern for environment files, such as `.env.{environment-name}`. When you run lifecycle commands like Provision, Deploy, or Publish, you must specify an environment name. This name must match the `{environment-name}` used in the corresponding environment file.

> [!NOTE]
> You can define environment variables for Agents Toolkit in your current shell environment which overrides any values in the `.env` file during a naming conflict.

### Environment file location

By default, Agents Toolkit doesn't load environment variables and simply executes actions, saving outputs to `./env/.env.dev`. If you don't specify an `environmentFolderPath`, it doesn't read variables from an .env file and assumes the environment is set to `dev`, with outputs directed to `./env/.env.dev`.

## Local environments

Building a Microsoft Teams agent or app involves both cloud and local resources. Cloud resources include app registrations and the Teams client, while agent or app logic can run locally to speed up development and testing. All Agents Toolkit templates include a preconfigured `local` environment with `./env/.env.local` and `./env/.env.local.user` files. This setup lets you run your agent or app on a local web server and debug it with breakpoints in Visual Studio Code (for JavaScript, TypeScript, or Python agent or app) or Visual Studio (for CSharp agent or app).

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

When working with multiple environments, you must select a target environment to build, debug, and preview your agent or app in Microsoft Teams. You can choose the target environment directly from the build settings.

### Select an environment

To target dev or any other custom environment:

1. From the **Lifecycle** section of Agents toolkit, select **Provision** for your agent or app.

   :::image type="content" source="../assets/images/toolkit-v2/toolkit-fundamentals/deployment.png" alt-text="Screenshot shows the Lifecycle section.":::

1. When prompted, select one of the available environments (for example, `dev` or a custom environment).

   :::image type="content" source="../assets/images/toolkit-v2/toolkit-fundamentals/target-environment.png" alt-text="Screenshot shows the option to select an environment.":::

The Agents Toolkit provisions the agent or app for the chosen environment. You can now build your agent or app in the selected environment.

### Build in the selected environment

Once the environment is selected, the Agents Toolkit provisions the agent or app for that environment. You can now build, debug, and run your agent or app in the selected environment.

1. Select the :::image type="icon" source="../assets/icons/run-build-vs.png" border="false"::: **Run and Debug** icon from the Visual Studio Code sidebar.
1. Select the option to debug and to preview the remote agent or app in Microsoft Teams.

   :::image type="content" source="../assets/images/toolkit-v2/toolkit-vs/remote-build.png" alt-text="Screenshot shows the option to select the environment for building the agent or app.":::

The Agents Toolkit builds the agent or app in the environment for which you had provisioned. The agent or app is available for viewing and testing in Teams.

## See also

* [Microsoft 365 Agents Toolkit Overview](agents-toolkit-fundamentals.md)
* [App manifest schema for Teams](/microsoft-365/extensibility/schema/)
* [Add more cloud resources](add-resource.md)
* [Collaborate with other developers on Teams project](TeamsFx-collaboration.md)
* [Test app behavior in different environment](test-app-behavior.md)
