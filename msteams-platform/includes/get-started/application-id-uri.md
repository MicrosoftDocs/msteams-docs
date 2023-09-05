**Application ID URI**

1. In the left pane, under **Manage**, select **Expose an API**.

1. Next to **Application ID URI**, select **Add**.

   :::image type="content" source="../../assets/images/include-files/expose-api-add.png" alt-text="Screenshot shows the option to add Application ID URI.":::

1. Update the **Application ID URI** in the `api://your-devtunnel-domain/botid-{AppID}` or `api://your-ngrok-domain/botid-{AppID}` format and select **Save**.

   :::image type="content" source="../../assets/images/include-files/app-id-uri.png" alt-text="Screenshot shows the option to add redirect uri and save.":::

   The following image shows the domain name:

   :::image type="content" source="../../assets/images/include-files/app-id-uri-output.png" alt-text="Screenshot shows the redirect uri":::
    <!--
       > [!NOTE]
       > If you're using a tunneling service such as ngrok, ensure you update the value whenever your ngrok subdomain changes.
       > For example: `api://f631****.ngrok.io/92c11075-c629-4a1e-ab58-02b4fd4204c2`, where `f631****.ngrok.io` is the new ngrok subdomain name.
    -->  