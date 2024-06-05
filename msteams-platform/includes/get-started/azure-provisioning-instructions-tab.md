## Deploy your app to Azure

Deployment consists of two steps. First, necessary cloud resources are created (also known as provisioning). Then, your app's code is copied into the created cloud resources. For this tutorial, you'll deploy the tab app.
<br>
<br>
<details>
<summary>What's the difference between Provision and Deploy?</summary>
<br>
The <b>Provision</b> step creates resources in Azure and Microsoft 365 for your app, but no code (HTML, CSS, JavaScript, etc.) is copied to the resources. The <b>Deploy</b> step copies the code for your app to the resources you created during the provision step. It's common to deploy multiple times without provisioning new resources. Since the provision step can take some time to complete, it's separate from the deployment step.
</details>
<br>

   # [Visual Studio Code](#tab/vscode)

   Select the Teams Toolkit :::image type="icon" source="~/assets/images/teams-toolkit-v2/teams-toolkit-sidebar-icon.png"::: icon in the Visual Studio Code sidebar.

   1. Select **Provision**.

      :::image type="content" source="~/assets/images/teams-toolkit-v2/provisioning-commands.png" alt-text="Screenshot shows the provisioning commands.":::

   1. Select anyone of the existing subscription.

      :::image type="content" source="~/assets/images/teams-toolkit-v2/select-subscription.png" alt-text="Screenshot shows selection of existing Subscription.":::

   1. Select a resource group to use for the Azure resources.

      :::image type="content" source="~/assets/images/teams-toolkit-v2/deploy-azure/select-resource.png" alt-text="Screenshot shows resources for provisioning.":::

      > [!NOTE]
      >
      > * Your app is hosted using Azure resources.
      > * For more information, see [Create resource group](/azure/azure-resource-manager/management/manage-resource-groups-portal).

      A dialog warns you that costs may be incurred when running resources in Azure.

   1. Select **Provision**.

      :::image type="content" source="~/assets/images/teams-toolkit-v2/deploy-azure/provision-warning.png" alt-text="Screenshot shows the provisioning of dialog.":::

      The provisioning process creates resources in the Azure cloud. It may take some time. You can monitor the progress by watching the dialogs in the bottom-right corner. After a few minutes, you see the following notice:

      :::image type="content" source="~/assets/images/teams-toolkit-v2/deploy-azure/deploy-provision-successmsgext.png" alt-text="Screenshot shows the resource successfully provisioned in the cloud.":::

      If you want, you can view the provisioned resources. For this tutorial, you don't need to view resources.

      The provisioned resource appears in the **ENVIRONMENT** section.

      :::image type="content" source="~/assets/images/teams-toolkit-v2/deploy-azure/provisioned-resources-env.png" alt-text="Screenshot shows the provisioned resource.":::

   1. Select **Deploy** from the **LIFECYCLE** panel after provisioning is complete.

      :::image type="content" source="~/assets/images/teams-toolkit-v2/deploy-azure/deploy-cloud.png" alt-text="Screenshot shows the app deploy to the cloud.":::

      As with provisioning, deployment takes some time. You can monitor the process by watching the dialogs in the bottom-right corner. After a few minutes, you see a completion notice.

   Now, you can use the same process to deploy your Bot and Message Extension apps to Azure.

   # [Command Line](#tab/cli)

   In your terminal window:

   1. Run `teamsfx provision`.

      ``` bash
      teamsfx provision
      ```

      When prompted, select an Azure subscription to use Azure resources.

   1. Run `teamsfx deploy`.

      ``` bash
      teamsfx deploy
      ```

---

> [!NOTE]
> Your app is hosted using Azure resources.

## Run the deployed app

Once the provisioning and deployment steps are complete:

1. Open the debug panel (**Ctrl+Shift+D** / **⌘⇧-D** or **View > Run**) from Visual Studio Code.
1. Select **Launch Remote (Edge)** from the launch configuration dropdown.
1. Select the **Start debugging (F5)** to launch your app from Azure.

   :::image type="content" source="~/assets/images/teams-toolkit-v2/deploy-azure/launch-remote.png" alt-text="Screenshot shows how to launch the app remotely.":::

1. Select **Add** when prompted to upload the app onto Teams.

   :::image type="content" source="~/assets/images/teams-toolkit-v2/deploy-azure/remote-app-client.png" alt-text="Screenshot shows an app being installed.":::

    Congratulations, your first tab app is running in your Azure environment!

   :::image type="content" source="~/assets/images/teams-toolkit-v2/deploy-azure/azure-deployed-apptab.png" alt-text="Screenshot shows the message to try the app now or later.":::
