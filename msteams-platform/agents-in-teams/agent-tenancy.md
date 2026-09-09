
# Agent tenancy considerations (single-tenant and multi-tenant agents)

Most workflows for creating and registering an agent, including `teams app create`, result in a *multi-tenant agent*: an agent that can be installed and used in any Entra tenant. This article explains configuration, guidance and best practices related to agent tenancy.

The configuration model that determines agent tenancy has evolved over time. This article reflects the current model and supersedes any descriptions in older documentation and other online resources.

# Verify and configure agent tenant settings

The Bot Connector registration of every Teams agent has a permanent 1:1 association with a single Entra ID app registration. This app registration resides in a tenant controlled by the developer. The `signInAudience` property of this app registration, displayed in some contexts as its **Supported account types**, determines whether it can only be used in that tenant.

An agent configured as *single-tenant* can only be installed and used in that tenant. A *multi-tenant* agent has no such restriction, but can be restricted to a specified set of tenants by other means.

To determine whether an agent is single-tenant or multi-tenant, examine the `signInAudience` property of the Entra ID app registration linked to its Bot Connector registration. In some contexts, this property is displayed as its **Supported account types**.

*TODO make this a table*

A `signInAudience` value of `AzureADMultipleOrgs` (**Supported account types** displays as **Multiple Entra ID tenants** or **Multiple organizations**) indicates a multi-tenant agent. A value of `AzureADMyOrg` (**Supported account types** displays as **My organization only** or **Single tenant only**) indicates a single-tenant agent.

`signInAudience` can be changed after the app registration is created, but should be confirmed by the time development is complete, and should remain unchanged once the agent is published.

## Considerations for implementation and distribution

All installations of an agent, regardless of tenant, are powered by the same runtime endpoint. Developers are responsible for implementing and enforcing data boundaries between tenants. Data stored by an agent should be strongly associated with a tenant, and users in one tenant should not be able to access data associated with another.

Agents intended for use only in a single tenant, or a known set of tenants, should always validate the tenant ID of incoming activity payloads in their application code. Setting `signInAudience = AzureADMyOrg` or configuring [sign in audience restrictions](/graph/api/resources/allowedtenantsaudience) to restrict its use are valid security measures, but are not substitutes for performing tenant validation in code.

*TODO store or organizational app catalog?*

## Azure AI Bot Service resource bot type

Developers with agents that use an Azure AI Bot Service resource instead of a standalone Bot Connector registration might observe that its `msaAppType`, **Bot type** or **Type of app** property indicates that it is configured as "Single Tenant". This value's name is based on a legacy configuration model and is retained for compatibility reasons, and **does not** indicate whether an agent

Azure AI Bot Service resource configuration includes a property called `msaAppType`, often referred to as the resource's **Bot type** or **Type of App**. A value of `singleTenant` (**Single Tenant**) for this property **does not** determine whether an agent is single-tenant or multi-tenant.

This value's name is based on a legacy configuration model and is retained for compatibility. `singleTenant` indicates only that that the associated identity linked to the resource is an app registration, not a user-assigned managed identity. The `signInAudience` of the app registration determines an agent's eligibility for use in tenants other than the one where the linked app registration resides.

Azure AI Bot Service resources with a **Bot type** of **User-Assigned Managed Identity** are

Every Azure AI Bot Service is permanently and uniquely associated with an Entra ID identity. Typically, that identity is an app registration, but Bot Service also permits an Azure user-assigned managed identity to be used.

Azure AI Bot Service resources are each configured with a reference to an Entra ID application identity. The `msaAppType` property of a Bot Service resource (shown as its **Type of App** or **Bot Type** in some interfaces) determines what kind of identity.

UserAssignedMSI

 supports two different kinds of identity: Entra ID app registration and Azure user-assigned managed identity.

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

**When creating a new Azure AI Bot Service resource,**

CLI only creates Single Tenant

This is different from the app registration single or multi tenant

msaAppType

TODO a bit about "Single Tenant" vs "UAMI", the latter requires Azure hosting and is less flexible, I think we consider it legacy?
