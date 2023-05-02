---
title: TeamsFX multiple environments in Teams Toolkit    
author: surbhigupta
description: In this module, learn about TeamsFX multi environment such as, create a new environment, select target environment and more
ms.author: surbhigupta
ms.localizationpriority: medium
ms.topic: conceptual
ms.date: 11/29/2021
---

# Manage multiple environments

 Teams Toolkit environments are principally a collection of cloud resources that are targets for a deployment. For example, the dev environment consists of a set of cloud resources that are used for development, and the prod environment consists of a set of cloud resources that are used for production.

 Teams Toolkit environments are in an `.env` file. There are several ways to create an `.env` file:

* Using the provisioning life cycle stage: Teams Toolkit will generate an environment file for you.
* Manually: If you aren't using Teams Toolkit to provision your cloud environment, you can create an environment file manually.

Environments are optional.

Your project file can hard code cloud resources in their deployment targets. When you do this, you don't need a Teams Toolkit environment.

However, your project file can reference values by name defined in the environment files. When you do this, you can supply different environment files, and Teams Toolkit will deploy to the cloud resources defined in the environment file. In this way, you can have a single set of deploy rules for an arbitrary number of environments.

## Environment file definition

The .env files follow the naming convention of `.env.{environment-name}`. For each life cycle execution, you're required to provide an environment name (local, dev, and other environment name) and Teams Toolkit will load the corresponding `.env.{environment-name}` into the execution process.

You can also define variables in your current shell environment, Teams Toolkit will load these environment variables when running a life cycle stage. Environment variables defined in the current shell overwrite variables defined in `.env` files when there's a name conflict.

## Environment file location

By default, Teams Toolkit generated templates configure the project to store `.env` in the `~/<app>/env` folder. You change this by configuring the project file - set the `environmentFolderPath` field in `teamsapp.yml` appropriately.

### Local environments

There's nothing special from Team Toolkit's perspective about `local` environments.

However, Teams Toolkit templates and samples all come with an environment called local. This environment enables you to run and deploy your Azure components locally.

> [!NOTE]
> App registrations and the Teams client still runs in the cloud.

The pattern that the templates follow is to use `teamsapp.local.yml` to override the life cycle stages with specific actions that run locally.

### Create a new environment manually in Visual Studio Code

Each project can have one local environment but multiple remote environments. After you create a project, Teams Toolkit configures the following default environments:

* **local** environment to represent the local machine environment configuration.
* **dev** environment to represent the remote or cloud environment configuration.

To create a new environment:

1. Open your Teams app project in Visual Studio Code.
1. Select the Teams Toolkit from the Visual Studio Code activity bar.
1. Select **+** > **Create new environment** under **ENVIRONMENT**.
(Image)

If you've more than one environment, you need to select an existing environment to create the new environment.

### Target environment

Teams Toolkit prompts you to select a target environment when you have multiple remote environments.

(Image)

## See also

* [Teams Toolkit Overview](teams-toolkit-fundamentals.md)
* [App manifest schema for Teams](../resources/schema/manifest-schema.md)
* [Add more cloud resources](add-resource.md)
* [Collaborate with other developers on Teams project](TeamsFx-collaboration.md)
* [Test app behavior in different environment](test-app-behavior.md)
