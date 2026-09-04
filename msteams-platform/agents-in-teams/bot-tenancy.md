
# Single-tenant and multi-tenant agents

The configuration model that determines whether a Teams agent can be used in multiple tenants has evolved over time. This article reflects the current model and supersedes any descriptions that may be found in older documentation and other online resources.

## Definition and configurations

A *multi-tenant agent* is a Teams agent that can be installed and used in Entra tenants other than the one where its Entra ID app registration resides. Agents that need to be installed in other tenants, including all agents distributed publicly via the Teams app store, must be configured as multi-tenant.

The only configuration setting that determines whether an agent is eligible for multi-tenant use is its app registration's `signInAudience`, shown in some interfaces as its **Supported account types**. To configure an agent's app registration as multi-tenant, set its `signInAudience` to `AzureADMultipleOrgs` (**Supported account types** displays as **Multiple Entra ID tenants** or **Multiple organizations** depending on the context). `signInAudience` controls whether new service principals for the app registration can be created in external tenants, and whether users in those tenants can authenticate to the application.

Most workflows for creating and registering an agent result in multi-tenant configuration by default.

## Implementation and security considerations

Agents intended to be used only in a known set of tenants should always validate the tenant ID of incoming activity payloads in their runtime implementations. They should be distributed only via organizational app catalogs, not the Teams store.

When appropriate, configuring an agent's app registration to be single tenant (setting `signInAudience` to `AzureADMyOrg`; **Supported account types** are displayed as **My organization only** or **Single tenant only**) or [setting sign in audience restrictions](/graph/api/resources/allowedtenantsaudience) on a multi-tenant app registration are valid security measures, but are not a substitute for performing tenant validation in code.

## Azure AI Bot Service resource bot type

> [!TIP]
> This section explains concepts associated with legacy configuration options, and does not apply to new agent creation.
>
> If you creating a new Azure AI Bot Service resource, configure it as **Single Tenant**:
>
> - Creating or migrating to an Azure AI Bot Service resource using the Teams developer CLI will always result in the Single Tenant configuration
> - If creating via Azure portal: for **Type of App**, select **Single Tenant**
> - If creating via Azure resource manager: for `msaAppType`, specify `SingleTenant`
>
> Configuring the resource as **Single Tenant** does not restrict your agent to operating in your developer tenant.

Azure AI Bot Service resources are configured with a reference to an Entra ID application identity. Bot Service supports two different kinds of identity: Entra ID app registration and Azure user-assigned managed identity.

**When creating a new Azure AI Bot Service resource,**

CLI only creates Single Tenant

This is different from the app registration single or multi tenant

msaAppType

TODO a bit about "Single Tenant" vs "UAMI", the latter requires Azure hosting and is less flexible, I think we consider it legacy?
