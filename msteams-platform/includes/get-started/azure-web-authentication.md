**Add a web authentication**

1. In the left pane, under **Manage**, select **Authentication**. 

   > [!NOTE]
   > If an app isn't granted IT admin consent, users must provide consent the first time they use an app.
         
1. Select **Add a platform** > **Web**.

   :::image type="content" source="../../assets/images/include-files/platform-web.png" alt-text="Screenshot shows the selection of web authentication.":::

1. Enter the redirect URI for your app by appending `auth-end` to the fully qualified domain name. For example, `https://your-devtunnel-domain/auth-end` or `https://your-ngrok-domain/auth-end`.

1. Under **Implicit grant and hybrid flows**, select the **ID tokens** and **Access tokens** checkboxes.

1. Select **Configure**.

   :::image type="content" source="../../assets/images/include-files/configure-web.png" alt-text="Screenshot shows the option to add redirect uri and select implicit grant and hybrid flows.":::

1. Under Web > select **Add URI**.

1. Enter `https://token.botframework.com/.auth/web/redirect`.

    :::image type="content" source="../../assets/images/include-files/web-add-uri.png" alt-text="Screenshot shows the option to add redirect uri and select implicit grant and hybrid flows.":::

1. Select **Save**.