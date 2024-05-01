---
title: FAQ
author: MuyangAmigo
description:  In this module, see FAQ for Teams Toolkit using Visual Studio Code.
ms.author: zhany
ms.localizationpriority: medium
ms.topic: overview
ms.date: 11/29/2021
---

# FAQ for Teams Toolkit

Following are the FAQs for [Provision cloud resources using Teams Toolkit](provision.md):

</br>

<details>

<summary>How to troubleshoot?</summary>

If you get errors with Teams Toolkit in Visual Studio Code, you can select **Get Help** on the error notification to go to the related document. If you're using TeamsFx CLI, there'll be a hyperlink at the end of error message that points to the help doc. You can also view [provision help doc](https://aka.ms/teamsfx-arm-help) directly.

</br>

</details>

<details>

<summary>How can I switch to another Azure subscription while provisioning?</summary>

1. Switch subscription in current account or sign out and select a new subscription.
2. If you've already provisioned current environment, you need to create a new environment and perform provision because ARM doesn't support moving resources.
3. If you didn't provision current environment, you can trigger provision directly.

</br>

</details>

<details>

<summary>How can I change resource group while provisioning?</summary>

Before provision, the tool asks you if you want to create a new resource group or use an existing one. You can provide a new resource group name or choose an existing one in this step.

</br>

</details>

<details>

<summary>How can I provision SharePoint-based app?</summary>

You can follow [provision SharePoint-based app](/microsoftteams/platform/sbs-gs-spfx?tabs=vscode%2Cviscode&tutorial-step=4).

> [!NOTE]
> Currently, the building Teams app with SharePoint framework with Teams Toolkit doesn't have direct integration with Azure, the contents in the doc doesn't apply to SPFx-based apps.

</br>

</details>

<details>
<summary>How can I deploy the code in Microsoft Entra ID using Teams Toolkit, and use Graph API to get the app user's profile photo?</summary>

Shared references to deploy the code using toolkit:

* [Create a new Teams app using Teams Toolkit](create-new-project.md)
* [Teams Toolkit CLI](Teams-Toolkit-CLI.md)

You can call Graph API to get the app user's profile photo.

</details>
