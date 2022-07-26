import { TargetVersion, SerializableObject, BaseSerializationContext, PropertyBag } from "./serialization";
export declare class HostCapabilities extends SerializableObject {
    private _capabilities;
    protected getSchemaKey(): string;
    protected internalParse(source: any, context: BaseSerializationContext): void;
    protected internalToJSON(target: PropertyBag, context: BaseSerializationContext): void;
    addCapability(name: string, version: TargetVersion): void;
    removeCapability(name: string): void;
    clear(): void;
    hasCapability(name: string, version: TargetVersion): boolean;
    areAllMet(hostCapabilities: HostCapabilities): boolean;
}
