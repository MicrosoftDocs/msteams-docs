---
title: Test App in Local & Cloud Environments
author: surbhigupta
description: Learn about the prerequisites and how to test app behavior in local and cloud environments using Teams Toolkit after integration with Teams.
ms.author: surbhigupta
ms.localizationpriority: high
ms.topic: overview
ms.date: 12/11/2024
---
# Test app behavior in different environment

## Upload your app to Teams

You can upload your Microsoft Teams app to Teams without having to publish to your organization or the Microsoft Teams Store in the following scenarios:

* You want to test and debug an app locally or on your testing cloud environment.
* You built an app for yourself to automate a workflow.
* You built an app for a small set of users, such as, your work group.

> [!IMPORTANT]
>
> * Custom app upload is possible only in Government Community Cloud (GCC) and isn't possible in GCC-High and Department of Defense (DOD).
> * App installation is supported only on Teams desktop client.

## Prerequisites

* Ensure to create your app package and validate it for errors.
* Enable custom app uploading in Teams.
* Ensure that your app is running and accessible using HTTPs.

## Upload your app

You can upload your custom app to a team, chat, meeting, or for personal use depending on how you configured your app's scope.

1. Log in to the Teams client with your [Microsoft 365 development account](https://developer.microsoft.com/microsoft-365/dev-program).

1. Select **Apps** > **Manage your apps** and **Upload an app**.

   :::image type="content" source="~/assets/images/publish-app/manage-apps.png" alt-text="Screenshot shows the Upload an app option highlighted.":::

1. Select **Upload a custom app**.

   :::image type="content" source="~/assets/images/publish-app/publish-app.png" alt-text="Screenshot shows the Upload a custom app option highlighted.":::

1. Select your app package **.zip file**.

1. Add your app to Teams as per your requirement:

    1. Select **Add** to install your personal app to Teams.
        
        :::image type="content" source="~/assets/images/publish-app/teams-app-detail.png" alt-text="Screenshot of custom app installation to Teams with the Add option highlighted.":::

    1.  Select **Open** to open the app in personal scope.

        Alternatively, you can either search and select the required scope or select a channel or chat from the list, and move through the dialog to select **Go**.

        :::image type="content" source="~/assets/images/publish-app/teams-app-scope.png" alt-text="Screenshot of the scope selection dialog with the list of shared scopes.":::

You can test your Teams app after integrating with Teams. To test your Teams app, you need to create at least one workspace in your environment. You can use Microsoft Teams Toolkit for testing your Teams app:

* **Locally hosted in Teams**: Teams Toolkit locally hosts your Teams app by uploading it into Teams for testing in local environment.

* **Cloud-hosted in Teams**: For testing your Teams app remotely, you need to Cloud-host it using provisioning and deploying on Microsoft Entra ID. It involves uploading your solution to the Microsoft Entra ID and then upload into Teams.

> [!NOTE]
> For production-scale debugging and testing, we recommend that you follow your own company guidelines to ensure you are able to support testing, staging, and deployment through your own processes.

## Locally hosted environment

Teams is a cloud-based product that requires all services it accesses, to be available publicly using HTTPS endpoints. Local hosting is about custom app uploading into Teams for testing in local environment.

## Cloud-hosted environment

To host your development and production code and their HTTPS endpoints, you need to remotely test your Teams app using provisioning and deploying on Microsoft Entra ID. You need to ensure that all domains are accessible from your Teams app listed in the `validDomains` object in the `manifest.json` file.

> [!NOTE]
> To ensure a secure environment, be explicit about the exact domain and subdomains you reference and those domains must be in your control. For example, `*.azurewebsites.net` is not recommended, however `contoso.azurewebsites.net` is recommended.

## See also

* [Teams Toolkit Overview](teams-toolkit-fundamentals.md)
* [Debug your Microsoft Teams app locally](debug-local.md)
* [Debug background process](debug-background-process.md)
* [Use Teams Toolkit to provision cloud resources](provision.md)
* [Deploy to the cloud](deploy.md)
* [Preview and customize Teams app manifest](TeamsFx-preview-and-customize-app-manifest.md)
* [Manage multiple environments](TeamsFx-multi-env.md)
* [validDomains](../resources/schema/manifest-schema.md#validdomains)
