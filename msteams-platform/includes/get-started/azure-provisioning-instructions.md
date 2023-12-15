## Deploy your app to Azure

Deployment consists of two steps. First, necessary cloud resources are created (also known as provisioning). Then, your app's code is copied into the created cloud resources. You deploy the message extension app in this tutorial.
<br>
<br>
<details>
<summary>What's the difference between provision and deploy?</summary>
<br>
The <b>Provision</b> step creates resources in Azure and Microsoft 365 for your app, but no code (HTML, CSS, JavaScript, etc.) is copied to the resources. The <b>Deploy</b> step copies the code for your app to the resources you created during the provision step. It's common to deploy multiple times without provisioning new resources. Since the provision step can take some time to complete, it's separate from the deployment step.
</details>
<br>

# [Visual Studio Code](#tab/vsc4)

Select the Teams Toolkit :::image type="icon" source="~/assets/images/teams-toolkit-v2/teams-toolkit-sidebar-icon.png"::: icon in the Visual Studio Code activity bar.

1. Select **Provision**.

   :::image type="content" source="~/assets/images/teams-toolkit-v2/provisioning-commands.png" alt-text="Screenshot shows the selection of provision in the cloud under Teams toolkit.":::

1. Select a subscription to use for the Azure resources.

    :::image type="content" source="~/assets/images/teams-toolkit-v2/deploy-azure/select-resource.png" alt-text="Screenshot shows the subscription to use for the Azure resources.":::

   Your app is hosted using Azure resources.

    A dialog warns you that costs might be incurred when running resources in Azure.

1. Select **Provision**.

   :::image type="content" source="~/assets/images/teams-toolkit-v2/deploy-azure/provision-warning.png" alt-text="Screenshot shows that you might incur charges for using Azure resources.":::

   The provisioning process creates resources in the Azure cloud. It might take some time. You can monitor the progress by watching the dialogs in the bottom-right corner. After a few minutes, you see the following notice:

   :::image type="content" source="~/assets/images/teams-toolkit-v2/deploy-azure/deploy-provision-successmsgext.png" alt-text="Screenshot shows a notice that displays the message extension app successfully provisioned in the cloud.":::

    If you want, you can view the provisioned resources. For this tutorial, you don't need to view resources.

    The provisioned resource appears in the **ENVIRONMENT** section.

    :::image type="content" source="~/assets/images/teams-toolkit-v2/deploy-azure/provisioned-resources-env.png" alt-text="Screenshot shows the resource being provisioned in the environment section.":::

1. Select **Deploy** from the **LIFECYCLE** panel after provisioning is complete.

   :::image type="content" source="~/assets/images/teams-toolkit-v2/deploy-azure/deploy-cloud.png" alt-text="Screenshot shows the app deploys to the cloud.":::

   As with provisioning, deployment takes some time. You can monitor the process by watching the dialogs in the bottom-right corner. After a few minutes, you see a completion notice.

Now, you can use the same process to deploy your bot and message extension apps to Azure.

# [Command Line](#tab/cli4)

In your terminal window:

1. Run `teamsfx provision`.

   ``` bash
   teamsfx provision
   ```

   When prompted, select an Azure subscription to use Azure resources.

   Your app is hosted using Azure resources.

1. Run `teamsfx deploy`.

   ``` bash
   teamsfx deploy
   ```

---

## Run the deployed app

Once the provisioning and deployment steps are complete:

1. Open the debug panel (**Ctrl+Shift+D** / **⌘⇧-D** or **View > Run**) from Visual Studio Code.
1. Select **Launch Remote (Edge)** from the launch configuration drop-down.
1. Select the **Start debugging (F5)** to launch your app from Azure.

   :::image type="content" source="~/assets/images/teams-toolkit-v2/deploy-azure/launch-remote.png" alt-text="Screenshot shows the launch app remotely.":::

1. Select **Add**.

   :::image type="content" source="../../assets/images/teams-toolkit-v2/first-msgext/add-mex-app-local-debug-latest.PNG" alt-text="Screenshot shows message to add the app.":::

   The toolkit displays a message to indicate that the app is added to Teams.

   :::image type="content" source="../../assets/images/teams-toolkit-v2/first-msgext/mex-added-local-debug.png" alt-text="Screenshot shows message to try the app now or later.":::

    - If you select **Got it**, you can try the app later from the list of uploaded custom apps.
    - If you select **Try it**, Teams loads your app.

   Your app loads on the Azure site.

1. Select **Try it**.

   The message extension app is loaded in a chat bot app.

   :::image type="content" source="../../assets/images/teams-toolkit-v2/first-msgext/mex-loaded-chat-app.png" alt-text="Screenshot shows the message extension running in a bot app.":::
