---
title: Overview to authentication for tabs using Teams SSO with Azure AD
description: Overview to SSO authentication in Teams and how to use it in tabs
ms.topic: how-to
ms.localizationpriority: medium
keywords: teams authentication tabs Microsoft Azure Active Directory (Azure AD)
---
# Enable Teams single sign-on (SSO) in a tab application

Users sign in to Microsoft Teams through their work, school, or Microsoft account that is Office 365, Outlook, you can take the advantage by allowing a single sign on to authorize your Teams tab or task module on desktop or mobile clients. If a user signs in once, they don't have to sign in again on another device as they're signed in automatically. Also, your access token is pre-fetched to improve performance and load times.

## Teams SSO for tabs at runtime

The following image shows how the Teams SSO with Azure AD process works:

<!-- markdownlint-disable MD033 -->

:::image type="content" source="../../../assets/images/tabs/tabs-sso-diagram.png" alt-text="Tab single sign-on SSO diagram":::

1. In the tab, a JavaScript call is made to `getAuthToken()`. `getAuthToken()` tells Teams to obtain an access token for the tab application.
2. If the current user is using your tab application for the first time, there's a request prompt to consent if consent is required. Alternately, there's a request prompt to handle step-up authentication such as two-factor authentication.
3. Teams requests the tab access token from the Azure AD endpoint for the current user.
4. Azure AD sends the tab access token to the Teams application.
5. Teams sends the tab access token to the tab as part of the result object returned by the `getAuthToken()` call.
6. The token is parsed in the tab application using JavaScript, to extract required information, such as the user's email address.

> [!NOTE]
> The `getAuthToken()` is only valid for consenting to a limited set of user-level APIs that is email, profile, offline_access, and OpenId. It is not used for further Graph scopes such as `User.Read` or `Mail.Read`. For suggested workarounds, see Get an access token with Graph permissions- \add x-ref\.

The SSO API also works in [task modules](../../../task-modules-and-cards/what-are-task-modules.md) that embed web content.

## Build a Teams tab app with Teams SSO authentication

This section describes the tasks involved in creating a Teams tab that uses SSO. These tasks are language- and framework-agnostic.

To build a tab app that uses Teams SSO to authenticate users:

:::row:::
    :::column span="":::

      1. **Build your Teams tab app**
    
    :::column-end:::
    :::column span="2":::
        
      You can build a simple tab app and enable SSO for it.

       **Quickstart**  
      The simplest path to get started with Teams tab SSO is with the Teams toolkit for Microsoft Visual Studio Code. For more information, see [SSO with Teams toolkit and Visual Studio Code for tabs](../../../toolkit/visual-studio-code-tab-sso.md)
    
    :::column-end:::
:::row-end:::
:::row:::
    :::column span="":::

      1. **Register your app with Azure AD**

    :::column-end:::
    :::column span="2":::

      Your Teams app users are authenticated using their Teams user credentials and Azure AD provides an access token for them.
      You'll need to create a new tab app registration in Azure AD:

      - [Register your tab application in Azure AD](tab-sso-register-aad.md)
      - [Configure API permissions with Microsoft Graph](tab-sso-graph-api.md)
      - [Configure admin consent](tab-sso-admin-consent.md)
      - [Create client secret](tab-sso-client-secret.md)

    :::column-end:::
:::row-end:::
:::row:::
    :::column span="":::

      3. **Update sample app code**

    :::column-end:::
    :::column span="2":::

      After you register your app in Azure AD, update the app properties in your app's manifest file.
      Next, you update the sample app with details configured on Azure AD in:

      - Update the app manifest, `manifest.json` \Add x-ref\
      - Update `appsetting.json` \Add x-ref\

    :::column-end:::
:::row-end:::
:::row:::
    :::column span="":::

      4. **Get an access token from client side**

    :::column-end:::
    :::column span="2":::

      This step requires your app user to give their consent for using their credentials for user-level permission. Azure AD receives the user credentials and sends an access token to Teams.
      In the sample app, this step is already done for your.
      To do this for your app:

      - Update authentication API.
      - Use on-behalf-of flow to fetch access token using Microsoft Authentication Library (MSAL).
    :::column-end:::
:::row-end:::

## Download the code sample

For this section, use the [Teams Tab SSO](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/tab-sso/csharp) sample in C#. You can download and clone it from GitHub.

To use this sample, clone the sample repo in one of the following ways:

<!--
- [Using Git Bash](#to-use-git-bash-to-clone-the-sample-repo)
- [Using Visual Studio 2022](#to-use-visual-studio-2022-to-clone-the-sample-repo)
- -->

<details>
<summary>To use Git Bash to clone the sample repo</summary>

- Run the following command in a terminal window to clone the sample repository to your computer:

```bash
git clone https://github.com/OfficeDev/Microsoft-Teams-Samples.git
```

The sample repo for C# app is cloned on your computer in the default location.

> [!TIP]
> You can [fork](https://help.github.com/articles/fork-a-repo/) this [repository](https://github.com/OfficeDev/Microsoft-Teams-Samples) to modify and save your changes to GitHub.

<a name="BuildRun"></a>

You can view the cloned repository by opening it in Visual Studio 2022.
</details>

<details>
<summary>To use Visual Studio 2022 to clone the sample repo</summary>

1. Open Visual Studio 2019.
2. Select **Clone a repository**.
3. Enter `https://github.com/OfficeDev/Microsoft-Teams-Samples.git` as path for cloning the repo:
4. Enter the location where you want to clone the repo, and select **Clone**.

   The sample repo is cloned, and Visual Studio opens. You can view the cloned repo in the **Solution Explorer**.

   Now that you've got the sample repo cloned, let's build your first C# app for Teams.
</details>