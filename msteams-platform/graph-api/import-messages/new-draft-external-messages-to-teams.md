
# Import third-party platform messages to Teams using Microsoft Graph

With Microsoft Graph, you can migrate users' existing message history and data from an external system into a Teams channel. Users can continue their communications in a seamless manner and proceed without interruption through the recreation of a third-party platform messaging hierarchy inside Teams.

> [!NOTE]
> In the future, Microsoft may require you or your customers to pay extra fees based on the amount of data imported.

## API Migration Workflow
Use the step-by-step migration flow to ensure a seamless transition of historical messages in both existing and newly created channels or chats by enabling migration mode.

## Step-by-Step Migration Flow
### Step 1: Create or select a channel/chat
You can either create a new channel or chat in a Team or use an existing channel or chat.

> [!NOTE]
> All APIs listed in the following sections require the `Teamswork.Migrate.All` permission in the application context. Delegated authentication isn't supported.

