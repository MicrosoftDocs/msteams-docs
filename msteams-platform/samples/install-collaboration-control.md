---
title: Install collaboration controls
author: surbhigupta
description: The solutions that make up Collaboration Controls allow makers to build applications that integrate with Microsoft 365 services like Planner, Bookings, and Outlook.
ms.localizationpriority: medium
ms.author: v-npaladugu
ms.topic: conceptual
---

# Install collaboration controls

In this exercise, you'll learn how to install Collaboration Controls.

## Install the Collaboration Controls solutions

In this task, you'll install the Collaboration Controls into your dataverse environment via a private link. This link must not be shared with any other persons inside or outside your organization. Afterwards, you'll be able to configure and use the components within your own   model-driven app.

Collaboration Controls includes the following solutions:

|**Settings solutions** | **To do** |
|---|---|
| Collaboration Toolkit Settings | Hold the settings infrastructure that powers Collaboration Controls. Includes several new solution-aware components.|
| Collaboration Toolkit Settings Objects | Provides pre-defined settings values that are leveraged by the Collaboration Controls. |

|**Collaboration solutions** | **To do** |
|---|---|
| Collaboration Toolkit Tasks | Includes the new tasks PCF (Power Apps component framework) control, and in the future, the virtual table for Planner tasks.|
| Collaboration Toolkit Events | Includes the new events PCF control, and in the future, the virtual table for Outlook and Bookings events. |
| Collaboration Toolkit Notes | Includes the new notes PCF control. |
| Collaboration Toolkit Chats | Includes the new conversations PCF control, and in the future, the virtual table for Conversations |
| Collaboration Toolkit Files | Includes the new files PCF control, and in the future, the virtual table for Files |
| Collaboration Toolkit Core | Includes custom Collaboration Apis and the Collaboration Data Model |

> [!TIP]
> If you've an existing version of the controls installed in your environment, you may need to create a fresh environment and complete a new install to successfully upgrade to the latest version.

Before installation, you must be in a power platform environment or tenant admin. You'll need a dataverse environment with a database. If you've one, you'll need to create a new one to continue this lab.

To install the solutions, begin by navigating to Microsoft AppSource and then complete the following steps.

 1. Select the Get it now button,
 1. Sign in with your account, fill in the form and continue

     :::image type="content" source="../assets/images/Collaboration control/preview-form.png" alt-text="Preview form "border="true":::

     :::image type="content" source="../assets/images/Collaboration control/overview.png" alt-text="overview collaboration control" border="true":::

     :::image type="content" source="../assets/images/Collaboration control/collaboration-controls-preview.png" alt-text="Collaboration control preview" border="true":::

 1. You'll be directed to Power Platform Admin Center. Select an environment from the drop down and agree to the terms and policy statements.

     > [!TIP]
     > If you see a permissions error when you select the environment, try clicking outside the
     environment drop down to see if that resolves the issue.

     :::image type="content" source="../assets/images/Collaboration control/install-collaboration-control.png" alt-text="Install collaboration control" border="true":::

 1. Select Install to begin installation. Installation should take approximately 15 mins to complete.

 1. Navigate to [https://make.preview.powerapps.com/](https://make.preview.powerapps.com/environments/839eace6-59ab-4243-97ec-a5b8fcc104e4/home)

 1. Make sure' in the environment the controls were installed into. You can view the environment and change it if required on the top right of the screen.

     :::image type="content" source="../assets/images/Collaboration control/power-apps.png" alt-text="power apps" border="true":::

 1. Once' in the right environment, select the Solutions tab to view all the solutions that you've just installed.

 The Collaboration controls are a preview, and any element may change over time with potential for breaking changes. The Collaboration controls aren't supported on production environments.

   :::image type="content" source="../assets/images/Collaboration control/solutions.png" alt-text="solutions collaboration control" border= "true":::

Congrats! You've successfully installed all the Collaboration solutions into your environment. In the next exercise, you'll build a new model-driven app that can take advantage of the Collaboration Control capabilities.

### Prerequisites

 The following are required to build and deploy Collaboration Manager applications using the Collaboration Controls.

* Power Apps - to build Model Driven Applications using the Collaboration Controls
* Microsoft 365 E3 or higher - to deploy custom applications to Microsoft Teams

### Role Requirements

To install the components onto a Power Platform environment the following roles are required:

* System Customizer
* Environment Maker

> [!NOTE]
> If these roles are enabled but installation of the controls is showing ‘privilege errors’, elevate the account to the System Administrator role.

More information on role privileges: [Configure user security in an environment - Power Platform | Microsoft Docs](/power-platform/admin/database-security)
