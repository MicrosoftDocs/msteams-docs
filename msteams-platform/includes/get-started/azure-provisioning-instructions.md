## Deploy your app to Azure

Deployment consists of two steps. First, necessary cloud resources are created (also known as provisioning). Then, your app's code is copied into the created cloud resources. You deploy the message extension app in this tutorial.
<br>
<br>
<details>
<summary>What's the difference between <b>Provision</b> and <b>Deploy</b>?</summary>
<br>
The <b>Provision</b> step creates resources in Azure and Microsoft 365 for your app, but no code (such as HTML, CSS, or JavaScript) is copied to the resources. The <b>Deploy</b> step copies the code for your app to the resources you created during the provision step. It's common to deploy multiple times without provisioning new resources. Since the provision step takes some time to complete, it's separate from the deployment step.
</details>
<br>

# [Visual Studio Code](#tab/vsc4)

Select the Microsoft 365 Agents Toolkit :::image type="icon" source="~/assets/images/teams-toolkit-v2/teams-toolkit-sidebar-icon.png"::: icon in the Visual Studio Code activity bar.

1. Select **Provision**.

   :::image type="content" source="~/assets/images/teams-toolkit-v2/provisioning-commands.png" alt-text="Screenshot shows the selection of provision in the cloud under Agents Toolkit.":::

1. Select a subscription.

   :::image type="content" source="../../assets/images/teams-toolkit-v2/select-azure-subscription-group.png" alt-text="Screenshot shows the Azure subscription group options to choose from.":::

1. Select a resource group.

   :::image type="content" source="~/assets/images/teams-toolkit-v2/deploy-azure/select-resource.png" alt-text="Screenshot shows the subscription to use for the Azure resources.":::

   If you don't have a resource group to select, you can create a new resource group with the following steps:

   1. Select **+ New resource group**.

      :::image type="content" source="../../assets/images/teams-toolkit-v2/first-msgext/select-resource-new-resource.png" alt-text="Screenshot shows the option to create a new Azure resource group.":::

   1. Select the default name or enter a suitable name for your resource group.

      :::image type="content" source="../../assets/images/teams-toolkit-v2/first-msgext/new-resource-group-name.png" alt-text="Screenshot shows the default name of the new Azure resource group.":::

   1. Select the location for your resource group.

      :::image type="content" source="../../assets/images/teams-toolkit-v2/first-msgext/new-resource-group-location.png" alt-text="Screenshot shows the options for the location of the new Azure resource group.":::

1. A dialog box warns you that costs might be incurred when running resources in Azure. Select **Provision**.

   :::image type="content" source="../../assets/images/teams-toolkit-v2/deploy-azure/provision-warning.png" alt-text="Screenshot shows a dialog box that warns the user that a cost might be incurred while provisioning Azure resources.":::

   The provisioning process creates resources in the Azure cloud. It might take some time. After a few minutes, you see the following message:

   :::image type="content" source="~/assets/images/teams-toolkit-v2/deploy-azure/deploy-provision-successmsgext.png" alt-text="Screenshot shows a notice that displays the message extension app successfully provisioned in the cloud.":::

   If you want, you can view the provisioned resources. For this tutorial, you don't need to view resources.

   The provisioned resource appears under **ENVIRONMENT**.

   :::image type="content" source="~/assets/images/teams-toolkit-v2/deploy-azure/provisioned-resources-env.png" alt-text="Screenshot shows the resource being provisioned in the environment section.":::

1. Under **LIFECYCLE**, select **Deploy**.

   :::image type="content" source="~/assets/images/teams-toolkit-v2/deploy-azure/deploy-cloud.png" alt-text="Screenshot shows the app deploys to the cloud.":::

1. A dialog box appears that asks you if you want to deploy resources in the dev environment. Select **Deploy**.

   :::image type="content" source="../../assets/images/teams-toolkit-v2/deploy-azure/deploy-azure-confirm.png" alt-text="Screenshot shows the confirmation dialog box to deploy app in Azure.":::

   As with provisioning, deployment takes some time. After a few minutes, you see a completion message.

# [Command Line](#tab/cli4)

1. Go to the folder where you created your message extension app and open Command Prompt.

1. Run `teamsfx provision`.

   ``` bash
   teamsfx provision
   ```

   When prompted, select an Azure subscription and resource group to use Azure resources. Your app is hosted using Azure resources.

1. Run `teamsfx deploy`.

   ``` bash
   teamsfx deploy
   ```

   Your message extension app is deployed.

---

## Run the deployed app

After the provisioning and deployment steps are complete, go to **Run and Debug** (**Ctrl+Shift+D** or **View > Run**) in Agents Toolkit.

1. Select the **RUN AND DEBUG** dropdown menu.
1. Select **Launch Remote in Teams (Edge)**.
1. Select the **▷** button.

   :::image type="content" source="~/assets/images/teams-toolkit-v2/deploy-azure/launch-remote.png" alt-text="Screenshot shows the launch app remotely in Teams option.":::

1. A dialog box opens to install your deployed app to Teams. Select **Add**.

   :::image type="content" source="../../assets/images/teams-toolkit-v2/deploy-azure/mex-added-dev.png" alt-text="Screenshot shows message to add the deployed app.":::

   Teams opens the message extension app in the most recent chat.

   :::image type="content" source="../../assets/images/teams-toolkit-v2/first-msgext/mex-loaded-chat-app.png" alt-text="Screenshot shows the message extension open in a chat.":::
