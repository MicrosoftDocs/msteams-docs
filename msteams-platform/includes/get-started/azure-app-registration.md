
1. Go to the [Azure portal](https://portal.azure.com/).

1. Select **Azure Active Directory**.

1. In the left pane, select **App registrations**.

1. Select your bot.

   :::image type="content" source="../../assets/images/include-files/app-registrations.png" alt-text="App registration":::

1. In the left pane, under **Manage**, select **Expose an API**.

1. Select **Add**.

   :::image type="content" source="../../assets/images/include-files/expose-api-add.png" alt-text="Expose an API":::

1. Use the `api://your-devtunnel-domain/{AppID}` or `api://your-ngrok-domain/{AppID}` format for the **Application ID URI**.

1. Update the **Application ID URI** and select **Save**.

   :::image type="content" source="../../assets/images/include-files/app-id-uri.png" alt-text="Screenshot shows the redirect uri.":::

   The following image shows the domain name:

   :::image type="content" source="../../assets/images/include-files/app-id-uri-output.png" alt-text="Set link":::
    <!--
       > [!NOTE]
       > If you're using a tunneling service such as ngrok, ensure you update the value whenever your ngrok subdomain changes.
       > For example: `api://f631****.ngrok.io/92c11075-c629-4a1e-ab58-02b4fd4204c2`, where `f631****.ngrok.io` is the new ngrok subdomain name.
    -->  