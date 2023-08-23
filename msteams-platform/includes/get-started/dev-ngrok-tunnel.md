
# [dev](#tab/dev)

1.	Open Visual Studio.
1.	Select **Create a new project**.
    
    :::image type="content" source="../../assets/images/include-files/create-new-project.png" alt-text="Screenshot shows the selection to create a new project.":::
    
1.	In the search box enter **ASP.NET Core Web APP** from the search results, select **ASP.NET Core Web APP**.

    :::image type="content" source="../../assets/images/include-files/template-search.png" alt-text="Screenshot shows the search and selection asp.net template.":::

1.	Select **Next**.
    
1.	Enter **Project Name** and select **Next**.
    
    :::image type="content" source="../../assets/images/include-files/project-name.png" alt-text="Screenshot shows the project name to enter.":::

1.	Select **Create**.

    :::image type="content" source="../../assets/images/include-files/additional-information.png" alt-text="Screenshot shows the project additional information.":::

    The ASP.NET window appears.

    :::image type="content" source="../../assets/images/include-files/asp-net-output.png" alt-text="Screenshot shows the asp.net project window.":::
    
1.	In the debug dropdown, select **Dev Tunnels (no active tunnel) > Create A Tunnel...**.

    :::image type="content" source="../../assets/images/include-files/create-tunnel.png" alt-text="Screenshot shows the dropdown to select the dev tunnels.":::
    
    A pop-up window appears.

1.	Update the following details in the pop-up window.

    1.	Account: Enter the account to use to create the tunnel.
    1.	Name: Enter a name for your tunnel.
    1.	Tunnel Type: From the dropdown, select **Temporary**.
    1.	Access: From the dropdown, select **Public**.

1.	Select **Ok**.

    :::image type="content" source="../../assets/images/include-files/create-tunnel-details.png" alt-text="Screenshot shows the details to update for creation of tunnel.":::
    
    A pop-up window appears showing that dev tunnel is successfully created. 

1.	Select **Ok**.

    :::image type="content" source="../../assets/images/include-files/tunnel-created.png" alt-text="Screenshot shows the pop-up message that the tunnel is created.":::
    
    You can find the tunnel you have created in the Visual studio in the flyout.
  
    :::image type="content" source="../../assets/images/include-files/tunnel-active.png" alt-text="Screenshot shows the tunnel is active and selected.":::
    
1.	Select **F5** to run the application in the debug mode.

1.	Select **Yes** if the following dialog appears.

    :::image type="content" source="../../assets/images/include-files/tunnel-active.png" alt-text="Screenshot shows the tunnel is active and selected."::: 

1.	A pop-up window appears, select **Continue**.

    :::image type="content" source="../../assets/images/include-files/developer-tunnel.png" alt-text="Screenshot shows the url for the tunnel.":::

    The Dev tunnel is active.

    :::image type="content" source="../../assets/images/include-files/developer-tunnel-web.png" alt-text="Screenshot shows the dev tunnel welcome page in browser.":::
    
1.	Go to Visual studio, select **View > Output**.

1.	From the output console dropdown menu, select **Dev Tunnels**.

    :::image type="content" source="../../assets/images/include-files/output-console-url.png" alt-text="Screenshot shows the url in the Visual studio output console.":::
    
1.	Use the URL in the output console as the for the messaging endpoint.

**To add messaging endpoint**

1.  Go to the Azure bot you've created in Azure portal. In the left pane, under **Settings**, select **Configuration**.

1.  In **Messaging endpoint**, use the HTTPS URL available from ngrok and at the end of the URL add **/api/messages**.

    :::image type="content" source="../../assets/images/include-files/ngrok-messaging-endpoint.png" alt-text="Screenshot shows the messaging endpoint adding api.":::

1. Select **Apply**.

    You have successfully set up a bot in Azure Bot Service.

---

# [ngrok](#tab/ngrok)
    
Use ngrok or Command Prompt to create a tunnel to your locally running web server's publicly available HTTPS endpoints. Run the following command in ngrok:

    ```bash
    ngrok http --host-header=localhost 3978
    ```

> [!NOTE]
> In this scenario ngrok command is 3978.

> [!TIP]
> If you encounter **ERR_NGROK_4018**, follow the steps provided in the Command Prompt to sign up and authenticate ngrok. Then run the `ngrok http --host-header=localhost 3978` command.

**To add messaging endpoint**

1. From ngrok, copy the HTTPS URL (https to io).

    :::image type="content" source="../../assets/images/include-files/ngrok-url.png" alt-text="Screenshot shows the ngrok HTTPS URL.":::
    
    > [!NOTE]
    > The HTTPS URL in your ngrok is your fully qualified domain name.
    > The `WebAppDomain` is a fully qualified domain name that doesn't include `https://` in it.

1.  Go to the Azure bot you've created in Azure portal. In the left pane, under **Settings**, select **Configuration**.

1.  In **Messaging endpoint**, use the HTTPS URL available from ngrok and at the end of the URL add **/api/messages**.

    :::image type="content" source="../../assets/images/include-files/ngrok-messaging-endpoint.png" alt-text="Screenshot shows the messaging endpoint adding api.":::

1. Select **Apply**.

    You have successfully set up a bot in Azure Bot Service.
---   
