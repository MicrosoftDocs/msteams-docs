---
title: Test app behavior in different environment
author: surbhigupta
description: In this module, learn how to test app behavior in different environment
ms.author: v-amprasad
ms.localizationpriority: high
ms.topic: overview
ms.date: 03/03/2022
---

# Test app behavior in different environment

You can test your Teams app after integrating with Microsoft Teams using Teams Toolkit. To test your Teams app, you need to create at least one workspace in your environment. You can select a test setup with Teams Toolkit, such as locally by sideloading or remotely with Microsoft Azure Active Directory(Azure AD). You can use one of the following ways to debug:

* **Locally hosted in Teams**:
This involves running your app locally in tunneling software and [creating a package](~/concepts/build-and-test/apps-package.md) to [upload](~/concepts/deploy-and-publish/apps-upload.md) into Teams. This permits you to easily run and debug your app within the Teams client.

* **Cloud-hosted in Teams**:
This truly simulates the production level support for a Teams app. It involves uploading your solution to your externally accessible server or cloud provider of choice and [creating a package](~/concepts/build-and-test/apps-package.md) to [upload](~/concepts/deploy-and-publish/apps-upload.md) into Teams. This would require you to provision and deploy your project with Azure AD using Teams Toolkit.

> [!NOTE]
> For production-scale debugging and testing, we recommend that you follow your own company guidelines to ensure you are able to support testing, staging, and deployment through your own processes.

## Locally hosted environment

Teams is cloud-based product that requires all services it accesses, to be available publicly using HTTPS endpoints. You can enable your app using Teams Toolkit. You can work within your Teams app by either publishing the code to the cloud of your choice or make our local running instance externally accessible. You can locally run the instance with a tunneling software.

> [!NOTE]
> Although you can use any tool of your choice, we recommend you to use [ngrok](https://ngrok.com/download)

## Cloud-hosted environment

To host your development and production code and their HTTPS endpoints, you can use any externally addressable service. You need to ensure that all domains are accessible from your Teams app listed in the [`validDomains`](~/resources/schema/manifest-schema.md#validdomains) object in the `manifest.jason` file

> [!NOTE]
> To ensure a secure environment, be explicit about the exact domain and subdomains you reference and those domains must be in your control. For example, `*.azurewebsites.net` is not recommended, however `contoso.azurewebsites.net` is recommended.

## See Also

[Manage multiple environments](TeamsFx-multi-env.md)
[Collaborate on Teams project using Microsoft Teams Toolkit](TeamsFx-collaboration.md)
