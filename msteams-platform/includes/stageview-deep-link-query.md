| Property name | Type | Character limit | Required | Description |
| --- | --- | --- | --- | --- |
| entityId | String | 64 | Optional | A unique ID of the entity that the tab displays. |
| appId | String | 64 | Yes | The ID of the Teams app that's to be opened. For more information, see [app ID for different types of apps](../concepts/build-and-test/deep-link-application.md#app-id-for-different-types-of-apps). |
| name | String | 128 | Optional | The display name of the tab in the channel interface. If no value is provided, the app name is displayed. |
| contentUrl | String | 2048 | Yes | The https:// URL that points to the entity UI to be displayed in Teams. |
| websiteUrl | String | 2048 | Yes | The https:// URL to point at, if a user selects to view in a browser. |
| threadId | String | 2048 | Optional | The ID defines the conversation shown in the Collaborative Stageview side panel. If no is value passed, `threadId` is inherited from the context where Collaborative Stageview is opened. <br> **Note**: The optional `threadId` parameter only supports chat threads. If a channel `threadId` is used, the side panel isn't displayed.|
| openMode | String | 2048 | Optional | The property defines the open behavior for stage content in the desktop client. |
