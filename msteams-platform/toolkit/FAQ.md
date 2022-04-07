---
title: FAQ
author: zyxiaoyuer
description:  FAQ of Teams Toolkit
ms.author: zhany
ms.localizationpriority: medium
ms.topic: overview
ms.date: 11/29/2021
---

# Teams Toolkit FAQ 
 
This section provides the answer and relevant information to the common questions asked about Teams Toolkit and SDK.  
<br>
<details>
<summary><b>How to login using CLI for CI/CD?</b></summary>
Ans.


</details>


<details>

<summary><b>How to troubleshoot?</b></summary>

If you get errors with Teams Toolkit in Visual Studio Code, you can select **Get Help** on the error notification to navigate to the related document. If you're using TeamsFx CLI, there will be a hyperlink at the end of error message that points to the help doc. You can also view [provision help doc](https://aka.ms/teamsfx-arm-help) directly.

<br>

</details>

<details>

<summary><b>How can I switch to another Azure subscription while Provisioning?</b></summary>

1. Switch subscription in current account or log out and select a new subscription.
2. If you have already provisioned current environment, you need to create a new environment and perform Provision because ARM doesn't support moving resources.
3. If you didn't provision current environment, you can trigger provision directly.

<br>

</details>

<details>

<summary><b>How can I change resource group while Provisioning?</b></summary>

Before provision, the tool will ask you, if you want to create a new resource group or use an existing one. You can provide a new resource group name or choose an existing one in this step.

<br>

</details>

<details>

<summary><b>How can I Provision sharepoint-based app?</b></summary>

You can follow [provision SharePoint-based app](/microsoftteams/platform/sbs-gs-spfx?tabs=vscode%2Cviscode&tutorial-step=4).

> [!NOTE]
> Currently, the building Teams app with sharepoint framework with Teams Toolkit doesn't have direct integration with Azure, the contents in the doc doesn't apply to SPFx based apps.

<br>

</details>
<details>

<summary><b>Is it possible to use already build Azure resources in Teams toolkit?</b></summary>

Ans. If you have already your own Azure Bot service and hosted bot application code. The only thing you need to do to connect your bot with Teams is to update the bot definition part in Teams manifest file.

<br>

</details>
<details>

<summary><b>How to Enable the user install the bot by default and not tab on teams app manifest?</b></summary>

Ans. 'defaultGroupCapability' provides the default capability that will be added to the team, groupchat, or meeting. Select a tab, bot, or connector as the default capability for your app, but you must ensure that you have provided the selected capability in your app definition. Could you just check it once? or share the error log?

Reference Document:-Configure default install options for your Microsoft Teams app.

<br>

</details>

<details>

<summary><b>Teams-cli using Github actions fails to find package.json</b></summary>

Ans. You don't have to be so troublesome to use the action alone and write the workflow file all by yourself. There exists CI/CD support for Teams app development which covers platforms of GitHub, Azure DevOps, Jenkins, and other platforms by scripts. You just need to copy the pre-defined yml files for GitHub and do customizations to suit your own requirements.

Please refer to https://aka.ms/teamsfx-cicd-insider-guide for more details.

<br>

</details>

<details>

<summary><b>How to set up ngrok for Teams Tab cross-device debug?</b></summary>

Ans.

<br>

</details>


<details>

<summary><b>App doesn't sideload when debugging with Teams Toolkit?</b></summary>

Ans.

<br>

</details>
<details>

<summary><b>How to Provision my app resources in Azure using the TeamsToolkit?</b></summary>

Ans.

<br>

</details>



<details>

<summary><b>Can't find personal application of Microsoft Teams Toolkit when I sideload it in Teams?</b></summary>

Ans.

<br>

</details>

<details>

<summary><b>How do I get a Graph API token with higher permission than the user?</b></summary>

Ans

<br>

</details>

<details>

<summary><b>How to setup Custom Teams Office 365 Connector?</b></summary>

Ans.

<br>

</details>

<details>

<summary><b>How to trigger Microsoft Graph Toolkit PeoplePicker on Change event in mobile?</b></summary>

Ans.

<br>

</details>

<details>

<summary><b>Getting an error in unit testing with TeamsFx App</b></summary>

Ans.In practice,  we use Jest or Mocha for unit testing framework. Since it is a standard Node project, you can follow the industry best practice to setup unit test by Jest/Mocha. We use Sinon for Mock technique.

<br>

</details>
<details>

<summary><b>How to implement localization in TeamsFX project?</b></summary>

Ans.

<br>

</details>
<details>

<summary><b>Microsoft Teams Desktop Personal app not working with SPFX and GraphApi?</b></summary>

Ans.

<br>

</details>
<details>

<summary><b>What is Microsoft Teams Toolkit - Support for Multitenant Teams App?</b></summary>

Ans.

<br>

</details>
<details>

<summary><b>How to clear the credentials used by TeamsFx SSO?
</b></summary>
Ans.
</details>


<details>
<summary><b>Is there any support site where we can get more help on products and other issues?</b></summary>
Ans.


</details>
