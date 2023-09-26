1. Open Visual Studio.
1. Select **Create a new project**.

    :::image type="content" source="../../assets/images/include-files/create-new-project.png" alt-text="Screenshot shows the selection to create a new project.":::

1. In the search box, enter **ASP.NET**. From the search results, select **ASP.NET Core Web App**.

1. Select **Next**.

    :::image type="content" source="../../assets/images/include-files/template-search.png" alt-text="Screenshot shows the search and selection of the template.":::

1. Enter **Project name** and select **Next**.

    :::image type="content" source="../../assets/images/include-files/project-name.png" alt-text="Screenshot shows the project name to enter.":::

1. Select **Create**.

    :::image type="content" source="../../assets/images/include-files/additional-information.png" alt-text="Screenshot shows the project additional information.":::

    An overview window appears.

    :::image type="content" source="../../assets/images/include-files/asp-net-output.png" alt-text="Screenshot shows the overview window.":::

1. In the debug dropdown list, select **Dev Tunnels (no active tunnel)** > **Create A Tunnel...**.

    :::image type="content" source="../../assets/images/include-files/create-tunnel.png" alt-text="Screenshot shows the dropdown to select the dev tunnels.":::

    A pop-up window appears.

1. Update the following details in the pop-up window:

    1. **Account**: Enter a Microsoft or GitHub account.
    1. **Name**: Enter a name for your tunnel.
    1. **Tunnel Type**: From the dropdown list, select **Temporary**.
    1. **Access**: From the dropdown list, select **Public**.

1. Select **OK**.

    :::image type="content" source="../../assets/images/include-files/create-tunnel-details.png" alt-text="Screenshot shows the details to update for creation of tunnel.":::

    A pop-up window appears showing that dev tunnel is successfully created.

1. Select **OK**.

    :::image type="content" source="../../assets/images/include-files/tunnel-created.png" alt-text="Screenshot shows the pop-up message that the tunnel is created.":::

    You can find the tunnel you've created in the debug dropdown list as follows:

    :::image type="content" source="../../assets/images/include-files/tunnel-active.png" alt-text="Screenshot shows the tunnel is active and selected.":::

1. Select **F5** to run the application in the debug mode.

1. If a **Security Warning** dialog appears, select **Yes**.

    :::image type="content" source="../../assets/images/include-files/security-warning.png" alt-text="Screenshot shows the dialog box to accept the security warning.":::

    A pop-up window appears.

1. Select **Continue**.

    :::image type="content" source="../../assets/images/include-files/developer-tunnel.png" alt-text="Screenshot shows the url for the tunnel.":::

    The dev tunnel home page opens in a new browser window and the dev tunnel is now active.

    :::image type="content" source="../../assets/images/include-files/developer-tunnel-web.png" alt-text="Screenshot shows the dev tunnel welcome page in browser.":::

1. Go to Visual Studio, select **View > Output**.

1. From the **Output** console dropdown menu, select **Dev Tunnels**.

    The **Output** console shows the dev tunnel URL.

    :::image type="content" source="../../assets/images/include-files/output-console-url.png" alt-text="Screenshot shows the url in the Visual Studio output console.":::
