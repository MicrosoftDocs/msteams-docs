## Prepare development environment

After you install the required tools, set up the development environment.

### Install Teams Toolkit

Microsoft Teams Toolkit helps simplify the development process with tools to provision and deploy cloud resources for your app and publish to the Teams Store.

You can use Teams Toolkit with Visual Studio Code or a command-line interface called TeamsFx CLI.

# [Visual Studio Code](#tab/vscode)

1. Open Visual Studio Code and select **Extensions** (**Ctrl+Shift+X** or **View** > **Extensions**).
2. In the search box, enter **Teams Toolkit**.
3. Select **Install**.

   :::image type="content" source="../../assets/images/include-files/install-toolkit-vs.png" alt-text="Screenshot shows the Teams Toolkit extension installation.":::

   The Teams Toolkit :::image type="icon" source="../../assets/images/include-files/teams-toolkit-sidebar-icon.PNG"::: icon appears in the Visual Studio Code Activity Bar.

You can also install Teams Toolkit from the [Visual Studio Code Marketplace](https://marketplace.visualstudio.com/items?itemName=TeamsDevApp.ms-teams-vscode-extension).

# [Command Line](#tab/cli)

To install the TeamsFx CLI, use the `npm` package manager and enter the following command in Command prompt:

``` bash
npm install -g @microsoft/teamsfx-cli
```

Depending on your configuration, you might need to use `sudo` to install the CLI:

``` bash
sudo npm install -g --unsafe-perm @microsoft/teamsfx-cli
```

This condition is more common on Linux and macOS systems.

Ensure you add the npm global cache to your PATH. This step is normally done as part of the Node.js installer.

You can use the CLI with the `atk' command. Verify that the command is working by running `atk -h`.

> [!CAUTION]
> Before you can run TeamsFx in PowerShell terminals, you must enable the **remote signed** execution policy for PowerShell.

---

## Set up your Teams development tenant

A tenant is a space or a container for your organization in Teams, where you chat, share files, and run meetings. This space is also where you upload and test your app. Let's verify if you're ready to develop with the tenant.

### Check for upload an app option

After creating your custom app, you must upload your app to Teams with the **Upload a custom app** option. Sign in to your Microsoft 365 account to check if this option is enabled.

The following steps help you verify if you can upload apps in Teams:

1. In the Teams client, select the **Apps** icon.
2. Select **Manage your apps**.
3. Select **Upload an app**.
4. Look for the option to **Upload a custom app**. If the option is visible, you can upload custom apps.

   :::image type="content" source="../../assets/images/teams-toolkit-v2/prerequisites/upload-custom-app.png" alt-text="Screenshot shows the option to upload a custom app in Teams." :::

      > [!NOTE]
      > If you don't find the option to upload a custom app, contact your Teams administrator.

### Create a free Teams developer tenant (optional)

If you don't have a Teams developer account, join the Microsoft 365 developer program.

1. Go to the [Microsoft 365 developer program](https://developer.microsoft.com/microsoft-365/dev-program).
1. Select **Join Now** and follow the onscreen instructions.
1. In the welcome screen, select **Set up E5 subscription**.
1. Set up your administrator account. After you finish, the following screen appears:

   :::image type="content" source="../../assets/images/include-files/microsoft-365.png" alt-text="Screenshot shows the Microsoft 365 Developer Program.":::

1. Sign in to Teams using the administrator account you just set up. Verify that you have the **Upload a custom app** option in Teams.
