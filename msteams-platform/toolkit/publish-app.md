---
title: Publish Teams apps
description:  publish Teams apps using Toolkit
ms.author: surbhigupta
ms.localizationpriority: high
ms.topic: overview
ms.date: 03/31/2022
---

# Publish Teams apps

You can distribute your app after based on several factors which includes business and technical requirements, and your goal for the app. Distribution to wider scope requires process. In general, the bigger the scope, the more review the app needs to go through for security and compliance concerns.

# [Visual Studio Code](#tab/VisualStudioCode)

## Publish to individual scope or sideload permission

The users can add custom app to Teams by uploading an app package in a *.zip file directly to a team or in personal context. Adding a custom app by uploading an app package is known as sideloading and allows you to test app while being developed, before the app is ready to be widely distributed as mentioned in the following scenarios:

* Test and debug an app locally.
* Build an app for yourself, such as to automate a workflow.
* Build an app for small set of users, such as, your work group.

You can build an app for internal use only and share it with your team without submitting it to the Teams app catalog in the Teams app store.

**To build your app to *.zip app package file**

You can build the app package by selecting `Zip Teams metadata package` from **DEPLOYMENT** in Treeview of Teams Toolkit. You need to run `Provision in the cloud` first. The generated app package will be located in `{your project folder}/build/appPackage/appPackage.{env}.zip`.

Perform the following steps to upload app package:

1. In the Teams client, select **Apps** in left bar.
2. Select **Manage your apps**.
3. Select **publish an app**

   :::image type="content" source="../assets/images/teams-toolkit-v2/teams toolkit fundamentals/pub.png" alt-text="publish":::

4. Select **Upload a custom app**:

   :::image type="content" source="../assets/images/teams-toolkit-v2/teams toolkit fundamentals/uplo.png" alt-text="upload":::

## Publish to your organization

When the app is ready for use in production, you can submit the app using the Teams app submission API, called from Graph API, an integrated development environment (IDE) such as Microsoft Visual Studio Code installed with Teams toolkit. You can either select **Publish to Teams** from **DEPLOYMENT** in TreeView of Teams Toolkit, or trigger **Teams: Publish to Teams** from command palette. Then select **Install for your organization**:

![Install for your organization](./images/installforyourorganization.png)

The app is available on the **Manage apps** of Microsoft Teams admin center, where you, and the admin, can review and approve it.

As an admin, **Manage apps** in the [Microsoft Teams admin center](https://admin.teams.microsoft.com/policies/manage-apps) is where you can view and manage all Teams apps for your organization. You can see the org level status and properties of apps, approve or upload new custom apps to your organization's app store, block or allow apps at the org level, add apps to teams, purchase services for third-party apps, view permissions requested by apps, grant admin consent to apps, and [manage org wide app settings](https://admin.teams.microsoft.com/policies/manage-apps).

Teams toolkit for Visual Studio Code built on top of the Teams App Submission API and it allows you to automates the submission-to-approval process for custom apps on Teams.

> [!NOTE]
> The app doesn't publish to your organization's app store yet. The step submits the app to the Microsoft Teams admin center where you can approve it for publishing to your organization's app store.

## Admin approval for Teams apps

The admin of your Teams tenant can then go to the **Manage apps** in the Microsoft Teams admin center, in the left navigation, go to Teams apps > Manage apps. You can view into all Teams apps for your organization. In the Pending approval widget at the top of the page lets you know when a custom app is submitted for approval.
In the table, a newly submitted app automatically publish the status of submitted and blocked apps. You can sort the publishing status column in descending order to find the app:

 :::image type="content" source="../assets/images/teams-toolkit-v2/teams toolkit fundamentals/admin-approval-for-teams-app-1.png" alt-text="approval":::

Select the app name to go to the app details page. On the About tab, you can view details about the app, including description, status, and app ID:

 :::image type="content" source="../assets/images/teams-toolkit-v2/teams toolkit fundamentals/about-submitted-app-1.png" alt-text="submitted app":::

Perform the following steps to publish the app :

1. In the left navigation of the Microsoft Teams admin center, go to Teams apps > **Manage apps**.
2. Select the app name to go to the app details page, and then in the status box, select **Publish**.
After you publish the app, the publishing status changes to published and the status automatically changes to allowed.

## Publish to Microsoft store

You can distribute your app directly to the store inside Microsoft Teams and reach millions of users around the world. If your app is also featured in the store, you can instantly reach potential customers. The apps published to the Teams store also automatically list on Microsoft AppSource, which is the official marketplace for Microsoft 365 apps and solutions.

For more information, see [publish to microsoft Teams store]([Publish your app to the Microsoft Teams store](../concepts/deploy-and-publish/appsource/publish.md#publish-your-app-to-the-microsoft-teams-store))

# [Visual Studio](#tab/VisualStudio)

## Publish your app to Teams

In the [Teams Developer Portal](https://dev.teams.microsoft.com/home), you can upload your app to a team, submit your app to your company custom app store for users in your organization, or submit your app to App Source for all Teams users.

- Your IT admin will review these submissions.
- You can return to the **Publish** page to check on your submission status and learn if your app was approved or rejected by your IT admin. This is also where you can submit updates to your app or cancel any currently active submissions.

# [TeamsFx Command Line Interface](#tab/TeamsFxCommandlineinterface)

Publish the app to Teams.

### Parameters for `teamsfx publish`

`--env`: Select an existing environment for the project.

## `teamsfx package`

Build your Teams app into a package for publishing.

## `teamsfx preview`

Preview the current application from local or remote.

### Parameters for `teamsfx preview`

| Parameter  | Requirement | Description |
|:----------------  |:-------------|:-------------|
|`--local`| No | Preview the application from local. `--local` is exclusive with `--remote`. |
|`--remote`| No | Preview the application from remote. `--remote` is exclusive with `--local`. |
|`--env`| No | Select an existing environment for the project when parameter `--remote` is appended. |
|`--folder`| No | Project root directory. The default value is `./`. |
|`--browser`| No | The browser to open Teams web client. The options are `chrome`, `edge` and `default` such as system default browser and the value is `default`. |
|`--browser-arg`| No | Argument to pass to the browser, requires --browser, can be used multiple times, for example, --browser-args="--guest" |
|`--sharepoint-site`| No | SharePoint site URL, such as `{your-tenant-name}.sharepoint.com` for SPFx project remote preview. |

### Scenarios for `teamsfx preview`

#### Local Preview

Dependencies:

* Node.js
* .NET SDK
* Azure Functions Core Tools

```bash
teamsfx preview --local
teamsfx preview --local --browser chrome
```

#### Remote Preview

```bash
teamsfx preview --remote
teamsfx preview --remote --browser edge
```

> [!NOTE]
> The logs of the background services, such as React is saved in `~/.fx/cli-log/local-preview/`.

## `teamsfx config`

Manage the configuration data either in user scope or project scope.

| `teamsfx config` Command  | Description |
|:----------------  |:-------------|
| `teamsfx config get [option]` | View the configuration value of option |
| `teamsfx config set <option> <value>` | Update the configuration value of option |

### Parameters for `teamsfx config`

| Parameter  | Requirement | Description |
|:----------------  |:-------------|:-------------|
|`--env`| Yes | Select an existing environment for the project. |
|`--folder`| No | Project directory. This is used for get or set project configuration. The default value is `./`. |
|`--global`| No | Cope of configuration. If this is true, the scope is limited to user scope instead of project scope. The default value is `false`. At present, the supported global configurations include `telemetry`, `validate-dotnet-sdk`, `validate-func-core-tools`, `validate-node`. |

### Scenerios for `teamsfx config`

Secrets in `.userdata` file are encrypted, `teamsfx config` and can help you to view or update the values.

#### Stop sending telemetry data

```bash
teamsfx config set telemetry off
```

#### Disable environment checker

There are three configuration to turn on or off Node.js, .NET SDK and Azure Functions Core Tools validation, and all of them are enabled by default. You can set the configuration to "off" if you don't need the dependencies validation and want to install the dependencies by yourself. Check the following guides:

* [Node.js installation guide](https://github.com/OfficeDev/TeamsFx/blob/dev/docs/vscode-extension/envchecker-help.md#how-to-install-nodejs)
* [.NET SDK installation guide](https://github.com/OfficeDev/TeamsFx/blob/dev/docs/vscode-extension/envchecker-help.md#how-to-install-net-sdk)
* [Azure Functions Core Tools installation guide](https://github.com/OfficeDev/TeamsFx/blob/dev/docs/vscode-extension/envchecker-help.md#how-to-install-azure-functions-core-tools).
