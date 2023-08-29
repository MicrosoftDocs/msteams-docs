**API Permission**

1. In the left pane, select **API permissions**. 

   > [!NOTE]
   > Users need to consent to the API permissions only if the Azure AD app is registered in a different tenant.

1. Select **+ Add a permission**.

   :::image type="content" source="../../assets/images/include-files/add-permission.png" alt-text="Screenshot show the option to select Add permission.":::

1. Select **Microsoft Graph**.

1. Select **Delegated permissions**.

1. Select the following permissions:
    * **OpenId permissions** > **email**, **offline_access**, **openid**, **profile**.
    * **User** > **User.Read**.

1. Select **Add permissions**.

   :::image type="content" source="../../assets/images/include-files/select-add-permission.png" alt-text="Screenshot show the option to select permissions.":::
