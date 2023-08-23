
1. In the left pane, select **API permissions**. 

   > [!NOTE]
   > Users need to consent to the API permissions only if the Azure AD app is registered in a different tenant.

1. Select **Add a permission**.

   :::image type="content" source="../../assets/images/include-files/add-permission.png" alt-text="Add permission":::

1. Select **Microsoft Graph**.

1. Select **Delegated permissions**.

1. Select **User** > **User.Read**.

1. Select **Add permissions**.

   :::image type="content" source="../../assets/images/include-files/select-api-permission.png" alt-text="Other permissions":::

1. In the left pane, select **Authentication** to set a redirect URI. 

   > [!NOTE]
   > If an app isn't granted IT admin consent, users must provide consent the first time they use an app.
         
   1. Select **Add a platform** > **Web**.

      :::image type="content" source="../../assets/images/include-files/platform-web.png" alt-text="Web":::

   1. Enter the redirect URI for your app by appending `auth-end` to fully qualified domain name:
   
     >`https://your-devtunnel-domain/auth-end` or `https://your-ngrok-domain/auth-end`.

   1. Enable **Implicit grant and hybrid flows** by selecting the following checkboxes:
         * **ID tokens**
         * **Access tokens**

   1. Select **Configure**.

      :::image type="content" source="../../assets/images/include-files/configure-web.png" alt-text="Auth-end":::
