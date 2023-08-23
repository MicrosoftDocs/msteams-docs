**Update Manifest and Bot Service connection**

1. Select **Manifest** from the left pane.

1. Set the configuration item **"accessTokenAcceptedVersion":2**. If not set, change its value to `2` and select **Save**.

    :::image type="content" source="../../assets/images/include-files/manifest-token.png" alt-text="open the manifest file":::

    > [!NOTE]
    > If you're already testing your bot in Teams, sign out of this app and sign out of Teams. To see this change, sign in again.

1. Select **Home**.

1. Select your bot from **Recent resources**.

1. Select **Configuration** from the left pane.

1. Select **Add OAuth Connection Settings**.

1. In **New Connection Setting**, update the following details:

    * **Name**: Enter **name for your new connection setting. You can use the name in the settings of your bot service code**.
    * **Service Provider**: From the dropdown list, select **Azure Active Directory V2**.
    * **Client ID**: Update you're **Microsoft App ID**.
    * **Client secret**: Update the client secret **Value**.
    * **Token Exchange URL**: Update the **Application ID URI**.
    * **Tenant ID**: Enter **common**.
    * **Scopes**: Enter **User.Read**.

1. Select **Save**.

:::image type="content" source="../../assets/images/include-files/new-connection-setting.png" alt-text="setting new connection":::
