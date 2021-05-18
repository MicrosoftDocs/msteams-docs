## Deploy your app to Azure

Deployment consists of two steps.  First, necessary cloud resources are created (also known as provisioning), then the code that makes up your app is copied into the created cloud resources.

# [Visual Studio Code](#tab/vscode)

1. Open Visual Studio Code.
1. Select the Teams Toolkit from the sidebar by selecting the Teams icon.
1. Select **Provision in the Cloud**.

   :::image type="content" source="~/assets/images/teams-toolkit-v2/provisioning-commands.png" alt-text="Screenshot showing the provisioning commands":::

1. If required, select a subscription to use for the Azure resources.

   > [!NOTE]
   > There are always some Azure resources used for hosting your app.

1. A dialog warns you that costs may be incurred when running resources in Azure.  Press **Provision**.

   :::image type="content" source="~/assets/images/teams-toolkit-v2/provision-warning.png" alt-text="Screenshot of the provisioning dialog.":::

   The provisioning process will create resources in the Azure cloud.  This will take some time.  You can monitor the progress by watching the dialogs in the bottom right corner.  After a few minutes, you will see the following notice:

   :::image type="content" source="~/assets/images/teams-toolkit-v2/provision-complete.png" alt-text="Screenshot showing the provisioning complete dialog.":::

1. Once provisioning is complete, select **Deploy to the Cloud**.  As with provisioning, this process takes some time.  You can monitor the process by watching the dialogs in the bottom right corner. After a few minutes, you will see a completion notice.

# [Command Line](#tab/cli)

In your terminal window:

1. Run `teamsfx provision`.

   ``` bash
   teamsfx provision
   ```

   You may be prompted to log in to your Azure subscription.  If required, you will be prompted to select an Azure subscription to use for the Azure resources.

   > [!NOTE]
   > There are always some Azure resources used for hosting your app.

1. Run `teamsfx deploy`.

   ``` bash
   teamsfx deploy
   ```

---

> [!NOTE]
> **What's the difference between Provision and Deploy?**
>
> The **Provision** step will create resources in Azure and M365 for your app, but no code (HTML, CSS, JavaScript, etc.) is copied to the resources.  The **Deploy** step will copy the code for your app to the resources you created during the provision step.  It is common to deploy multiple times without provisioning new resources. Since the provision step can take some time to complete, it is separate from the deployment step.

Once the provisioning and deployment steps are finished:

1. From Visual Studio Code, open the debug panel (**Ctrl+Shift+D** / **⌘⇧-D** or **View > Run**)
1. Select **Launch Remote (Edge)** from the launch configuration drop-down.
1. Press the Play button to launch your app - now running remotely from Azure!
