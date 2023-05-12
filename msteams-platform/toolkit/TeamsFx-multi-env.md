---
title: TeamsFX multiple environments in Teams Toolkit    
author: surbhigupta
description: In this module, learn about TeamsFX multi environment such as, create a new environment, select target environment and more
ms.author: surbhigupta
ms.localizationpriority: medium
ms.topic: conceptual
ms.date: 11/29/2021
---

# Environments in Teams Toolkit

Teams Toolkit provides a way to run and test your app in different targets for deployment like dev, staging, production, or locally on your machine. To do this, Teams Toolkit includes an optional set of features that orchestrate the configuration of these different targets using information in environment files. The environment files represent a collection of all the resources of a deployment target. Teams Toolkit project templates include two default environment groupings - one for running the app on your machine named "local" and another for hosting somewhere else named "dev". You can rename the "dev" environment and add additional environments using the Environments window or manually with a new `.env.{environment-name}` file. You can't rename the local environment.

By supplying different environment files, Teams Toolkit can help automate the provisioning of resources needed to run the app and deploy your code to those resources. Using these features means you can have a single set of deployment rules for any number of environments.

## Using environment files with Teams Toolkit

Teams Toolkit uses a naming convention for the environment files like: `.env.{environment-name}`. When using the toolkit's lifecycle commands (Provision, Deploy, Publish) you're required to provide an environment name. The name of the environment should be the same as the value chosen for`{environment-name}` when creating the environment file.

> [!NOTE]
> You can also define environment variables for Teams Toolkit in your current shell environment which override any values in a `.env` file during a naming conflict.

### Environment file location

You can define where `.env` files are using the `environmentFolderPath` property in `teamsapp.yml` and `teamsapp.local.yml`. By default, Teams Toolkit assumes these files are an `./env/` directory.

## Local environments

While some resources needed to build a Teams app are always in the cloud (app registrations, Teams client, etc.), other parts like your application logic can be hosted locally to make testing changes during development easier. To help with this, all Teams Toolkit projects templates and samples have an environment called `local`, configured with the `./env/.env.local` and `./env/.env.local.user` files. This gives you flexibility to run your app with a locally hosted web server. When using VS Code and VS, these templates and samples are also set up to support debugging with breakpoints.

To differentiate between a local environment and all other environments, you can create a separate project file called `teamsapp.local.yml` in the same directory as `teamsapp.yml`.

## Create a new environment manually in Visual Studio Code

Each project can have one local environment but multiple remote environments. After you create a project, Teams Toolkit configures the following default environments:

* **local** environment to represent the local machine environment configuration.
* **dev** environment to represent the remote or cloud environment configuration.

To create a new environment:

1. Open your Teams app project in Visual Studio Code.
1. Select the Teams Toolkit icon from the Visual Studio Code activity bar.
1. Select the **+** icon in the **ENVIRONMENT** section.
1. Enter a name for the environment and select Enter.

   :::image type="content" source="../assets/images/teams-toolkit-v2/create-new-environment.png" alt-text="Screenshot shows environment ":::

## Targeting an environment

When you have multiple environments and select the Provision, Deploy, or Publish menu items, Teams Toolkit prompts you to select a target environment.

   :::image type="content" source="../assets/images/teams-toolkit-v2/target-environment.png" alt-text="Screenshot shows production selected in environment.":::

## See also

* [Teams Toolkit Overview](teams-toolkit-fundamentals.md)
* [App manifest schema for Teams](../resources/schema/manifest-schema.md)
* [Add more cloud resources](add-resource.md)
* [Collaborate with other developers on Teams project](TeamsFx-collaboration.md)
* [Test app behavior in different environment](test-app-behavior.md)
