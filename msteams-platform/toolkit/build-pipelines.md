---
title: Build CI/CD pipelines for Teams application
author: v-vasudhab
description:  Describes how to build CI/CD pipelines for Teams application.
ms.author: surbhigupta
ms.localizationpriority: medium
ms.topic: Build Pipelines
---

# Build CI/CD pipelines for Teams application

TeamsFx helps to automate your development workflow when building Teams application. To get started with CI/CD pipelines find templates and tools in the following table:

|Tools and templates|Description|
|-----------------|----------------|
|Teamsfx-cli-action|Ready-to-use GitHub action.|
|github-ci-template.yml and github-cd-template.yml|GitHub CI/CD templates for Teams app.|
|script-ci-template.sh and script-cd-template.sh|Script template for automation|

## Prerequisites

You must have templates `github-ci-template.yml` and `github-cd-template.yml` in your repository under the folder `.github/workflows`.

## Customize CI Workflow

You can make the following changes as per your project requirements:

1. Change how the CI flow is triggered. We have default pull request targeting the dev branch.
1. Ensure you have an `npm` build script, or customize the way you build in the automation code.
1. Ensure you have an `npm` test script, which returns zero for success, or change the test commands.

## Customize CD Workflow

You can make the following changes as per your project requirements:

1. Change how the CD flow is triggered. By default, it happens when new commits are made to the main branch.
1. Create GitHub repository secrets by environment to hold Azure or Microsoft 365 sign-in credentials. 
1. Change the build scripts if necessary.
1. Remove the test scripts if you don't have tests.

The following section lists all the secrets you need to create on GitHub, and for detailed usage, to the GitHub Actions README.md. (link to page)

> [!NOTE]
> The provision step is expected to run separately either manually or by workflow. You have to commit after provisioning, the results of provisioning reflects inside the .fx folder and the required secrets are saved into GitHub secrets to generate file default user data.

## Environment Variables

**To create environment variables in GitHub**

1. In the project Settings page, navigate to **Environments** section and select **New environment**.
1. Enter a name for your environment. The default environment name provided in the template is test_environment.
1. Select **Configure** environment to continue.
1. In the next page, select **Add Secret** to add secrets for the items listed in the following table:

|Item name|Description|
|----------|--------------|
|AZURE_ACCOUNT_NAME|The account name of Azure, which is used to provision resources.|
|AZURE_ACCOUNT_PASSWORD|The password of Azure account.|
|AZURE_SUBSCRIPTION_ID|To identify the subscription in which the resources are provisioned.|
|AZURE_TENANT_ID|To identify the tenant in which the subscription is present.|
|M365_ACCOUNT_NAME|The Microsoft 365 account for creating and publishing the Teams App.|
|M365_ACCOUNT_PASSWORD|The password of the Microsoft 365 account.|
|M365_TENANT_ID|To identify the tenant in which the Teams app is created and published. The value is optional unless you have a multi-tenant account and you want to use another tenant.|

> [!NOTE]
> Check M365 or Azure credentials to ensure you've disabled multi-factor authentication and security defaults for the credentials used in the workflow.

## Getting started with other platform

You can follow the pre-defined example scripts to build and customize CI/CD pipelines on other platforms, such as Jenkins:

* CI Scripts
* CD Scripts

The scripts are based on cross platform TeamsFx command-line tool TeamsFx-CLI. You can enter `npm` to install `-g @microsoft/teamsfx-cli` and follow the documentation to customize the scripts.

You can set Azure and Microsoft 365 credentials in your environment variables safely. For example, if you're using GitHub as your source code repository, you can use the GitHub Secrets to securely store your environment variables.

## See also

[Placeholder to add link:Quick Start for GitHub Actions]
