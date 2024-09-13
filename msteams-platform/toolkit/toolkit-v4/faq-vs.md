---
title: FAQ for Teams Toolkit in Visual Studio
author: MuyangAmigo
description: Learn how to troubleshoot errors with Teams Toolkit in Visual Studio Code, switch Azure subscription, change resource group, and provision SharePoint based app.
ms.author: zhany
ms.localizationpriority: medium
ms.topic: overview
ms.date: 11/29/2021
---

# FAQ for Teams Toolkit

:::image type="content" source="~/assets/images/teams-toolkit-v2/v4-deprecate-note.png" alt-text="Screenshot shows the Teams Toolkit v4 deprecation note.":::

You can see the FAQ for all the sections of Teams Toolkit for Visual Studio Code.

FAQ for [Provision cloud resources using Teams Toolkit](../provision.md)

<br>

<details>

<summary><b>How to troubleshoot?</b></summary>

If you get errors with Teams Toolkit in Visual Studio Code, you can select **Get Help** on the error notification to go to the related document. If you're using TeamsFx CLI, a hyperlink appears at the end of the error message that directs you to the help doc.

<br>

</details>

<details>

<summary><b>How can I switch to another Azure subscription while provisioning?</b></summary>

1. Switch subscription in current account or log out and select a new subscription.
2. If you have already provisioned current environment, you need to create a new environment and perform provision because ARM doesn't support moving resources.
3. If you didn't provision current environment, you can trigger provision directly.

<br>

</details>

<details>

<summary><b>How can I change resource group while provisioning?</b></summary>

Before provision, the tool asks you if you want to create a new resource group or use an existing one. You can provide a new resource group name or choose an existing one in this step.

<br>

</details>

<details>

<summary><b>How can I provision SharePoint-based app?</b></summary>

You can follow [provision SharePoint-based app](/microsoftteams/platform/sbs-gs-spfx?tabs=vscode%2Cviscode&tutorial-step=4).

> [!NOTE]
> Teams app built with SharePoint framework and Teams Toolkit doesn't have direct integration with Azure, the contents in the doc doesn't apply to SPFx-based apps.

<br>

</details>
