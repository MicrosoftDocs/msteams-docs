**Update the manifest and OAuth service connection**

1. In the left pane, select **Manifest**.

1. Set the value for the `accessTokenAcceptedVersion` to `2` and select **Save**.

    :::image type="content" source="../../assets/images/include-files/manifest-token.png" alt-text="Screenshot shows the manifest option and accesstoken details in Azure portal.":::

    > [!NOTE]
    > If you're already testing your bot in Teams, sign out of this app and Teams. To see this change, sign in again.

1. Select **Home**.

1. Go to **Resources** > **Recent**. Select your bot from the list of available resources.

1. In the left pane, select **Configuration**.

1. Select **Add OAuth Connection Settings**.

1. Under **New Connection Setting**, update the following details:

    * **Name**: Enter **name** for your new connection setting. You can use the name in the settings of your bot service code.
    * **Service Provider**: From the dropdown list, select **Azure Active Directory V2**.
    * **Client ID**: Update your **Microsoft App ID**.
    * **Client secret**: Update the client secret **Value**.
    * **Token Exchange URL**: Update the **Application ID URI**.
    * **Tenant ID**: Enter **common**.
    * **Scopes**: Enter **User.Read**.

1. Select **Save**.

    :::image type="content" source="../../assets/images/include-files/new-connection-setting.png" alt-text="Screenshot shows the values added to set OAuth connection.":::
