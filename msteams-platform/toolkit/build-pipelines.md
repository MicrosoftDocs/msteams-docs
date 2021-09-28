---
title: Build CI/CD pipelines for Teams application
author: Rajeshwari-v
description:  Describes how to build CI/CD pipelines for Teams application.
ms.author: surbhigupta
ms.localizationpriority: medium
ms.topic: overview
---

# Build CI/CD pipelines for Teams application

TeamsFx helps automate your development workflow when building a Teams application. You can find templates and tools in the below table for you to quickly get started with CI/CD.

Tools and Templates	Description
teamsfx-cli-action
A ready-to-use GitHub Action.
github-ci-template.yml and github-cd-template.yml
GitHub CI/CD templates for a Teams app.
script-ci-template.sh and script-cd-template.sh
Script templates for automation everywhere else outside of GitHub.

CI/CD Workflow Templates in GitHub
To add these templates to your repository, you will need your versions of github-ci-template.yml and github-cd-template.yml to be located in your repository under the folder `.github/workflows`.

Customize CI Workflow
There are some potential changes you can make to adapt your project:
1.	Change how the CI flow is triggered. We default to when a pull request is created targeting the dev branch.
2.	Ensure you have an npm build script, or customize the way you build in the automation code.
3.	Ensure you have an npm test script which returns zero for success, and/or change the test commands.

Customize CD Workflow
You may want to change:
1.	How the CD flow is triggered. By default, it happens when new commits are made to the main branch.
2.	Create GitHub repository secrets by environment to hold Azure/M365 login credentials. The table below lists all the secrets you need to create on GitHub, and for detailed usage, please refer to the GitHub Actions README.md.
3.	Change the build scripts if necessary.
4.	Remove the test scripts if you don't have tests.

Note: The provision step is expected to run separately by hand or by workflow. Please remember to commit after provisioning (results of provisioning will be deposited inside the .fx folder) and save required secrets into GitHub secrets to generate file default.userdata.

Environment Variables
Steps to create environment variables in GitHub:
1.	In the project Settings page, navigate to Environments section and click New environment.
2.	Enter a name for your environment. The default environment name provided in the template is test_environment. Click Configure environment to proceed.
3.	In the next page, click Add Secret to add secrets for each of the items listed in the table below.
Name	Description
AZURE_ACCOUNT_NAME	The account name of Azure which is used to provision resources.
AZURE_ACCOUNT_PASSWORD	The password of Azure account.
AZURE_SUBSCRIPTION_ID	To identify the subscription in which the resources will be provisioned.
AZURE_TENANT_ID	To identify the tenant in which the subscription resides.
M365_ACCOUNT_NAME	The M365 account for creating and publishing the Teams App.
M365_ACCOUNT_PASSWORD	The password of the M365 account.
M365_TENANT_ID	To identify the tenant in which the Teams App will be created/published. This value is optional unless you have a multi-tenant account and you want to use another tenant. Read more on how to find your M365 tenant ID.

Note: Please refer to the Configure M365/Azure Credentials to make sure you have disabled Multi-factor Authentication and Security Defaults for the credentials used in the workflow.

Getting started with other platform
You can follow the pre-defined example scripts to build and customize CI/CD pipelines on other platforms like Jenkins:
•	CI Scripts
•	CD Scripts

The scripts are based on a cross-platform TeamsFx command line tool TeamsFx-CLI. You can install it with `npm install -g @microsoft/teamsfx-cli` and follow the documentation to customize the scripts.

Please keep in mind that you need to set Azure and M365 credentials in your environment variables safely. For example if you are using Github as your source code repository, you can use the Github Secrets to securely store your environment variables.

Additional Notes
•	Quick Start for GitHub Actions
