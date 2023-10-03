## Prepare development environment

After you've installed the required tools, set up the development environment.

### Install the Teams Toolkit

The Microsoft Teams Toolkit helps simplify the development process with tools to provision and deploy cloud resources for your app, publish to the Teams store, and more. 
   
You can use the toolkit with Visual Studio Code, or CLI (command-line interface), called `TeamsFx`.


# [Visual Studio Code](#tab/vscode)

1. Open Visual Studio Code and select the **Extensions** view (**Ctrl+Shift+X** / **⌘⇧-X** or **View > Extensions**).
1. In the search box, enter **Teams Toolkit**.
1. Select **Install** next to the Teams Toolkit.

   :::image type="content" source="../../assets/images/include-files/install-toolkit-vs.png" alt-text="Screenshot shows the Teams Toolkit extension installation.":::

   The Teams Toolkit  :::image type="icon" source="../msteams-platform/assets/images/teams-toolkit-v2/teams-toolkit-sidebar-icon.png"::: icon appears in the Visual Studio Code **Activity Bar** after it's installed.

You can also find the Teams Toolkit on the [Visual Studio Code Marketplace](https://marketplace.visualstudio.com/items?itemName=TeamsDevApp.ms-teams-vscode-extension).


# [Command line](#tab/cli)

To install the TeamsFx CLI, use the `npm` package manager:

``` bash
npm install -g @microsoft/teamsfx-cli
```

Depending on your configuration, you may need to use `sudo` to install the CLI:

``` bash
sudo npm install -g --unsafe-perm @microsoft/teamsfx-cli
```

This condition is more common on Linux and macOS systems.

Ensure you add the npm global cache to your PATH. This step is normally done as part of the Node.js installer.  

You can use the CLI with the `teamsfx` command. Verify that the command is working by running `teamsfx -h`.

> [!CAUTION]
> Before you can run TeamsFx in PowerShell terminals, you must enable the "remote signed" execution policy for PowerShell.

---

## Set up your Teams development tenant

A **tenant** is like a space, or a container for your organization in Teams, where you chat, share files, and run meetings. This space is also where you upload and test your app. Let's verify if you're ready to develop with the tenant.

### Check for app upload option

After creating the app, you must load your app in Teams without distributing it. This process is known as app uploading. Sign in to your Microsoft 365 account to view this option.

   > [!NOTE]
   > App uploading is necessary for previewing and testing apps in Teams local environment. If it isn't enabled, you won't be able to preview and test your app in Teams local environment.

Do you already have a tenant, and an admin access? Let's check if you really do!

Verify if you can upload apps in Teams:

1. In the Teams client, select the **Apps** icon.
1. Select **Manage your apps**.
1. Select **Upload an app**.
1. Look for the option to **Upload a custom app**. If the option is visible, you have enabled uploading apps. 
   
   :::image type="content" source="../../assets/images/include-files/custom-upload.png" alt-text="Screenshot shows the selection of Upload a custom app highlighted in red.":::

      > [!NOTE]
      > Contact your Teams administrator, if you don't find the option to upload a custom app.

### Create a free Teams developer tenant (optional)

If you don't have a Teams developer account, you can get it free. Join the Microsoft 365 developer program!

1. Go to the [Microsoft 365 developer program](https://developer.microsoft.com/microsoft-365/dev-program).
1. Select **Join Now** and follow the onscreen instructions.
1. In the welcome screen, select **Set up E5 subscription**.
1. Set up your administrator account. After you finish, the following screen appears.

   :::image type="content" source="../../assets/images/include-files/microsoft-365.png" alt-text="Screenshot shows the Microsoft 365 Developer Program.":::

1. Sign in to Teams using the administrator account you just set up. Verify that you have the **Upload a custom app** option in Teams.

## Get a free Azure account

If you want to host your app or access resources in Azure, you must have an Azure subscription. [Create a free account](https://azure.microsoft.com/free/) before you begin.

Now you've got all the tools to set up your account. Next, let's set up your development environment and start building! Select the app you want to create first.
