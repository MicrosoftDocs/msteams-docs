**Azure app registration**

1. Go to the [Azure portal](https://portal.azure.com/).

1. Select **Azure Active Directory**.

1. In the left pane, select **App registrations**.

1. Under **Owned applications**, select your bot from the list of available applications.

   :::image type="content" source="../../assets/images/include-files/app-registrations.png" alt-text="Screenshot shows the selection of App registration and bot created in Azure portal.":::

1. In the left pane, under **Manage**, select **Expose an API**.

1. Next to **Application ID URI**, select **Add**.

   :::image type="content" source="../../assets/images/include-files/expose-api-add.png" alt-text="Screenshot shows the Application ID URI add option.":::

1. Update the **Application ID URI** in the `api://your-devtunnel-domain/{AppID}` or `api://your-ngrok-domain/{AppID}`format and select **Save**.

   :::image type="content" source="../../assets/images/include-files/app-id-uri.png" alt-text="Screenshot shows the option to add redirect uri and save.":::

   The following image shows the domain name:

   :::image type="content" source="../../assets/images/include-files/app-id-uri-output.png" alt-text="Screenshot shows the redirect uri":::
    <!--
       > [!NOTE]
       > If you're using a tunneling service such as ngrok, ensure you update the value whenever your ngrok subdomain changes.
       > For example: `api://f631****.ngrok.io/92c11075-c629-4a1e-ab58-02b4fd4204c2`, where `f631****.ngrok.io` is the new ngrok subdomain name.
    -->  