declare module 'adaptivecards/strings' {
	export class Strings {
	    static readonly errors: {
	        unknownElementType: (typeName: string) => string;
	        unknownActionType: (typeName: string) => string;
	        elementTypeNotAllowed: (typeName: string) => string;
	        actionTypeNotAllowed: (typeName: string) => string;
	        invalidPropertyValue: (value: any, propertyName: string) => string;
	        showCardMustHaveCard: () => string;
	        invalidColumnWidth: (invalidWidth: string) => string;
	        invalidCardVersion: (defaultingToVersion: string) => string;
	        invalidVersionString: (versionString: string) => string;
	        propertyValueNotSupported: (value: any, propertyName: string, supportedInVersion: string, versionUsed: string) => string;
	        propertyNotSupported: (propertyName: string, supportedInVersion: string, versionUsed: string) => string;
	        indexOutOfRange: (index: number) => string;
	        elementCannotBeUsedAsInline: () => string;
	        inlineAlreadyParented: () => string;
	        interactivityNotAllowed: () => string;
	        inputsMustHaveUniqueId: () => string;
	        choiceSetMustHaveAtLeastOneChoice: () => string;
	        choiceSetChoicesMustHaveTitleAndValue: () => string;
	        propertyMustBeSet: (propertyName: string) => string;
	        actionHttpHeadersMustHaveNameAndValue: () => string;
	        tooManyActions: (maximumActions: number) => string;
	        columnAlreadyBelongsToAnotherSet: () => string;
	        invalidCardType: () => string;
	        unsupportedCardVersion: (version: string, maxSupportedVersion: string) => string;
	        duplicateId: (id: string) => string;
	        markdownProcessingNotEnabled: () => string;
	        processMarkdownEventRemoved: () => string;
	        elementAlreadyParented: () => string;
	        actionAlreadyParented: () => string;
	        elementTypeNotStandalone: (typeName: string) => string;
	    };
	    static readonly magicCodeInputCard: {
	        tryAgain: () => string;
	        pleaseLogin: () => string;
	        enterMagicCode: () => string;
	        pleaseEnterMagicCodeYouReceived: () => string;
	        submit: () => string;
	        cancel: () => string;
	        somethingWentWrong: () => string;
	        authenticationFailed: () => string;
	    };
	    static readonly runtime: {
	        automaticRefreshPaused: () => string;
	        clckToRestartAutomaticRefresh: () => string;
	        refreshThisCard: () => string;
	    };
	    static readonly hints: {
	        dontUseWeightedAndStrecthedColumnsInSameSet: () => string;
	    };
	    static readonly defaults: {
	        inlineActionTitle: () => string;
	        overflowButtonText: () => string;
	        mediaPlayerAriaLabel: () => string;
	        mediaPlayerPlayMedia: () => string;
	    };
	}

}
declare module 'adaptivecards/enums' {
	export class ActionStyle {
	    static readonly Default: "default";
	    static readonly Positive: "positive";
	    static readonly Destructive: "destructive";
	}
	export class ActionMode {
	    static readonly Primary: "primary";
	    static readonly Secondary: "secondary";
	}
	export enum Size {
	    Auto = 0,
	    Stretch = 1,
	    Small = 2,
	    Medium = 3,
	    Large = 4
	}
	export enum ImageSize {
	    Small = 0,
	    Medium = 1,
	    Large = 2
	}
	export enum SizeUnit {
	    Weight = 0,
	    Pixel = 1
	}
	export enum TextSize {
	    Small = 0,
	    Default = 1,
	    Medium = 2,
	    Large = 3,
	    ExtraLarge = 4
	}
	export enum TextWeight {
	    Lighter = 0,
	    Default = 1,
	    Bolder = 2
	}
	export enum FontType {
	    Default = 0,
	    Monospace = 1
	}
	export enum Spacing {
	    None = 0,
	    Small = 1,
	    Default = 2,
	    Medium = 3,
	    Large = 4,
	    ExtraLarge = 5,
	    Padding = 6
	}
	export enum TextColor {
	    Default = 0,
	    Dark = 1,
	    Light = 2,
	    Accent = 3,
	    Good = 4,
	    Warning = 5,
	    Attention = 6
	}
	export enum HorizontalAlignment {
	    Left = 0,
	    Center = 1,
	    Right = 2
	}
	export enum VerticalAlignment {
	    Top = 0,
	    Center = 1,
	    Bottom = 2
	}
	export enum ActionAlignment {
	    Left = 0,
	    Center = 1,
	    Right = 2,
	    Stretch = 3
	}
	export enum ImageStyle {
	    Default = 0,
	    Person = 1
	}
	export enum ShowCardActionMode {
	    Inline = 0,
	    Popup = 1
	}
	export enum Orientation {
	    Horizontal = 0,
	    Vertical = 1
	}
	export enum FillMode {
	    Cover = 0,
	    RepeatHorizontally = 1,
	    RepeatVertically = 2,
	    Repeat = 3
	}
	export enum ActionIconPlacement {
	    LeftOfTitle = 0,
	    AboveTitle = 1
	}
	export enum InputTextStyle {
	    Text = 0,
	    Tel = 1,
	    Url = 2,
	    Email = 3,
	    Password = 4
	}
	export class ContainerStyle {
	    static readonly Default: "default";
	    static readonly Emphasis: "emphasis";
	    static readonly Accent: "accent";
	    static readonly Good: "good";
	    static readonly Attention: "attention";
	    static readonly Warning: "warning";
	}
	export enum ValidationPhase {
	    Parse = 0,
	    ToJSON = 1,
	    Validation = 2
	}
	export enum ValidationEvent {
	    Hint = 0,
	    ActionTypeNotAllowed = 1,
	    CollectionCantBeEmpty = 2,
	    Deprecated = 3,
	    ElementTypeNotAllowed = 4,
	    InteractivityNotAllowed = 5,
	    InvalidPropertyValue = 6,
	    MissingCardType = 7,
	    PropertyCantBeNull = 8,
	    TooManyActions = 9,
	    UnknownActionType = 10,
	    UnknownElementType = 11,
	    UnsupportedCardVersion = 12,
	    DuplicateId = 13,
	    UnsupportedProperty = 14,
	    RequiredInputsShouldHaveLabel = 15,
	    RequiredInputsShouldHaveErrorMessage = 16,
	    Other = 17
	}
	export enum ContainerFitStatus {
	    FullyInContainer = 0,
	    Overflowing = 1,
	    FullyOutOfContainer = 2
	}
	export enum TypeErrorType {
	    UnknownType = 0,
	    ForbiddenType = 1
	}
	export enum RefreshMode {
	    Disabled = 0,
	    Manual = 1,
	    Automatic = 2
	}
	export enum LogLevel {
	    Info = 0,
	    Warning = 1,
	    Error = 2
	}

}
declare module 'adaptivecards/shared' {
	import * as Enums from 'adaptivecards/enums';
	export type Refresh = {
	    mode: Enums.RefreshMode;
	    timeBetweenAutomaticRefreshes: number;
	    maximumConsecutiveAutomaticRefreshes: number;
	    allowManualRefreshesAfterAutomaticRefreshes: boolean;
	};
	export type AppletsSettings = {
	    logEnabled: boolean;
	    logLevel: Enums.LogLevel;
	    maximumRetryAttempts: number;
	    defaultTimeBetweenRetryAttempts: number;
	    authPromptWidth: number;
	    authPromptHeight: number;
	    readonly refresh: Refresh;
	    onLogEvent?: (level: Enums.LogLevel, message?: any, ...optionalParams: any[]) => void;
	};
	export class GlobalSettings {
	    static useAdvancedTextBlockTruncation: boolean;
	    static useAdvancedCardBottomTruncation: boolean;
	    static useMarkdownInRadioButtonAndCheckbox: boolean;
	    static allowMarkForTextHighlighting: boolean;
	    static alwaysBleedSeparators: boolean;
	    static enableFullJsonRoundTrip: boolean;
	    static displayInputValidationErrors: boolean;
	    static allowPreProcessingPropertyValues: boolean;
	    static setTabIndexAtCardRoot: boolean;
	    static enableFallback: boolean;
	    static useWebkitLineClamp: boolean;
	    static allowMoreThanMaxActionsInOverflowMenu: boolean;
	    static readonly applets: AppletsSettings;
	}
	export const ContentTypes: {
	    applicationJson: string;
	    applicationXWwwFormUrlencoded: string;
	};
	export interface ISeparationDefinition {
	    spacing: number;
	    lineThickness?: number;
	    lineColor?: string;
	}
	export interface IInput {
	    id?: string;
	    value?: string;
	    validateValue(): boolean;
	}
	export type Dictionary<T> = {
	    [key: string]: T;
	};
	export class StringWithSubstitutions {
	    private _isProcessed;
	    private _original?;
	    private _processed?;
	    getReferencedInputs(inputs: IInput[], referencedInputs: Dictionary<IInput>): void;
	    substituteInputValues(inputs: Dictionary<IInput>, contentType: string): void;
	    getOriginal(): string | undefined;
	    get(): string | undefined;
	    set(value: string | undefined): void;
	}
	export class SpacingDefinition {
	    left: number;
	    top: number;
	    right: number;
	    bottom: number;
	    constructor(top?: number, right?: number, bottom?: number, left?: number);
	}
	export class PaddingDefinition {
	    top: Enums.Spacing;
	    right: Enums.Spacing;
	    bottom: Enums.Spacing;
	    left: Enums.Spacing;
	    constructor(top?: Enums.Spacing, right?: Enums.Spacing, bottom?: Enums.Spacing, left?: Enums.Spacing);
	}
	export class SizeAndUnit {
	    physicalSize: number;
	    unit: Enums.SizeUnit;
	    static parse(input: string, requireUnitSpecifier?: boolean): SizeAndUnit;
	    constructor(physicalSize: number, unit: Enums.SizeUnit);
	}
	export interface IResourceInformation {
	    url: string;
	    mimeType: string;
	}
	/**
	 * Fast UUID generator, RFC4122 version 4 compliant.
	 * @author Jeff Ward (jcward.com).
	 * @license MIT license
	 * @link http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript/21963136#21963136
	 **/
	export class UUID {
	    private static lut;
	    static generate(): string;
	    static initialize(): void;
	}

}
declare module 'adaptivecards/utils' {
	import * as Enums from 'adaptivecards/enums'; global {
	    interface Document {
	        documentMode?: any;
	    }
	}
	export function isInternetExplorer(): boolean;
	export function isMobileOS(): boolean;
	/**
	 * Generate a UUID prepended with "__ac-"
	 */
	export function generateUniqueId(): string;
	export function appendChild(node: Node, child: Node | undefined): void;
	export function parseString(obj: any, defaultValue?: string): string | undefined;
	export function parseNumber(obj: any, defaultValue?: number): number | undefined;
	export function parseBool(value: any, defaultValue?: boolean): boolean | undefined;
	export function getEnumValueByName(enumType: {
	    [s: number]: string;
	}, name: string): number | undefined;
	export function parseEnum(enumType: {
	    [s: number]: string;
	}, name: string, defaultValue?: number): number | undefined;
	export function stringToCssColor(color: string | undefined): string | undefined;
	export function truncate(element: HTMLElement, maxHeight: number, lineHeight?: number): void;
	export function getFitStatus(element: HTMLElement, containerEnd: number): Enums.ContainerFitStatus;
	export function getScrollX(): number;
	export function getScrollY(): number;
	export function clearElementChildren(element: HTMLElement): void;

}
declare module 'adaptivecards/serialization' {
	import * as Enums from 'adaptivecards/enums';
	export interface IValidationEvent {
	    source?: SerializableObject;
	    phase: Enums.ValidationPhase;
	    event: Enums.ValidationEvent;
	    message: string;
	}
	export class Version {
	    private _versionString;
	    private _major;
	    private _minor;
	    private _isValid;
	    private _label?;
	    constructor(major?: number, minor?: number, label?: string);
	    static parse(versionString: string, context: BaseSerializationContext): Version | undefined;
	    toString(): string;
	    toJSON(): any;
	    compareTo(otherVersion: Version): number;
	    get label(): string;
	    get major(): number;
	    get minor(): number;
	    get isValid(): boolean;
	}
	export type TargetVersion = Version | "*";
	export class Versions {
	    static readonly v1_0: Version;
	    static readonly v1_1: Version;
	    static readonly v1_2: Version;
	    static readonly v1_3: Version;
	    static readonly v1_4: Version;
	    static readonly v1_5: Version;
	    static readonly latest: Version;
	}
	export function isVersionLessOrEqual(version: TargetVersion, targetVersion: TargetVersion): boolean;
	export abstract class BaseSerializationContext {
	    targetVersion: Version;
	    private _validationEvents;
	    toJSONOriginalParam: any;
	    constructor(targetVersion?: Version);
	    serializeValue(target: {
	        [key: string]: any;
	    }, propertyName: string, propertyValue: any, defaultValue?: any, forceDeleteIfNullOrDefault?: boolean): void;
	    serializeString(target: {
	        [key: string]: any;
	    }, propertyName: string, propertyValue?: string, defaultValue?: string): void;
	    serializeBool(target: {
	        [key: string]: any;
	    }, propertyName: string, propertyValue?: boolean, defaultValue?: boolean): void;
	    serializeNumber(target: {
	        [key: string]: any;
	    }, propertyName: string, propertyValue?: number, defaultValue?: number): void;
	    serializeEnum(enumType: {
	        [s: number]: string;
	    }, target: {
	        [key: string]: any;
	    }, propertyName: string, propertyValue: number | undefined, defaultValue?: number | undefined): void;
	    serializeArray(target: {
	        [key: string]: any;
	    }, propertyName: string, propertyValue: any[] | undefined): void;
	    clearEvents(): void;
	    logEvent(source: SerializableObject | undefined, phase: Enums.ValidationPhase, event: Enums.ValidationEvent, message: string): void;
	    logParseEvent(source: SerializableObject | undefined, event: Enums.ValidationEvent, message: string): void;
	    getEventAt(index: number): IValidationEvent;
	    get eventCount(): number;
	}
	export class PropertyDefinition {
	    readonly targetVersion: Version;
	    readonly name: string;
	    readonly defaultValue?: any;
	    readonly onGetInitialValue?: ((sender: SerializableObject) => any) | undefined;
	    private static _sequentialNumber;
	    getInternalName(): string;
	    parse(sender: SerializableObject, source: PropertyBag, context: BaseSerializationContext): any;
	    toJSON(sender: SerializableObject, target: PropertyBag, value: any, context: BaseSerializationContext): void;
	    readonly sequentialNumber: number;
	    isSerializationEnabled: boolean;
	    constructor(targetVersion: Version, name: string, defaultValue?: any, onGetInitialValue?: ((sender: SerializableObject) => any) | undefined);
	}
	export class StringProperty extends PropertyDefinition {
	    readonly targetVersion: Version;
	    readonly name: string;
	    readonly treatEmptyAsUndefined: boolean;
	    readonly regEx?: RegExp | undefined;
	    readonly defaultValue?: string | undefined;
	    readonly onGetInitialValue?: ((sender: SerializableObject) => string) | undefined;
	    parse(sender: SerializableObject, source: PropertyBag, context: BaseSerializationContext): string | undefined;
	    toJSON(sender: SerializableObject, target: PropertyBag, value: string | undefined, context: BaseSerializationContext): void;
	    constructor(targetVersion: Version, name: string, treatEmptyAsUndefined?: boolean, regEx?: RegExp | undefined, defaultValue?: string | undefined, onGetInitialValue?: ((sender: SerializableObject) => string) | undefined);
	}
	export class BoolProperty extends PropertyDefinition {
	    readonly targetVersion: Version;
	    readonly name: string;
	    readonly defaultValue?: boolean | undefined;
	    readonly onGetInitialValue?: ((sender: SerializableObject) => any) | undefined;
	    parse(sender: SerializableObject, source: PropertyBag, context: BaseSerializationContext): boolean | undefined;
	    toJSON(sender: SerializableObject, target: object, value: boolean | undefined, context: BaseSerializationContext): void;
	    constructor(targetVersion: Version, name: string, defaultValue?: boolean | undefined, onGetInitialValue?: ((sender: SerializableObject) => any) | undefined);
	}
	export class NumProperty extends PropertyDefinition {
	    readonly targetVersion: Version;
	    readonly name: string;
	    readonly defaultValue?: number | undefined;
	    readonly onGetInitialValue?: ((sender: SerializableObject) => any) | undefined;
	    parse(sender: SerializableObject, source: PropertyBag, context: BaseSerializationContext): number | undefined;
	    toJSON(sender: SerializableObject, target: PropertyBag, value: number | undefined, context: BaseSerializationContext): void;
	    constructor(targetVersion: Version, name: string, defaultValue?: number | undefined, onGetInitialValue?: ((sender: SerializableObject) => any) | undefined);
	}
	export class PixelSizeProperty extends PropertyDefinition {
	    parse(sender: SerializableObject, source: PropertyBag, context: BaseSerializationContext): number | undefined;
	    toJSON(sender: SerializableObject, target: PropertyBag, value: number | undefined, context: BaseSerializationContext): void;
	}
	export interface IVersionedValue<TValue> {
	    value: TValue;
	    targetVersion?: Version;
	}
	export class StringArrayProperty extends PropertyDefinition {
	    readonly targetVersion: Version;
	    readonly name: string;
	    readonly defaultValue?: string[] | undefined;
	    readonly onGetInitialValue?: ((sender: SerializableObject) => string[] | undefined) | undefined;
	    parse(sender: SerializableObject, source: PropertyBag, context: BaseSerializationContext): string[] | undefined;
	    toJSON(sender: SerializableObject, target: PropertyBag, value: string[] | undefined, context: BaseSerializationContext): void;
	    constructor(targetVersion: Version, name: string, defaultValue?: string[] | undefined, onGetInitialValue?: ((sender: SerializableObject) => string[] | undefined) | undefined);
	}
	export class ValueSetProperty extends PropertyDefinition {
	    readonly targetVersion: Version;
	    readonly name: string;
	    readonly values: IVersionedValue<string>[];
	    readonly defaultValue?: string | undefined;
	    readonly onGetInitialValue?: ((sender: SerializableObject) => string) | undefined;
	    isValidValue(value: string, context: BaseSerializationContext): boolean;
	    parse(sender: SerializableObject, source: PropertyBag, context: BaseSerializationContext): string | undefined;
	    toJSON(sender: SerializableObject, target: PropertyBag, value: string | undefined, context: BaseSerializationContext): void;
	    constructor(targetVersion: Version, name: string, values: IVersionedValue<string>[], defaultValue?: string | undefined, onGetInitialValue?: ((sender: SerializableObject) => string) | undefined);
	}
	export class EnumProperty<TEnum extends {
	    [s: number]: string;
	}> extends PropertyDefinition {
	    readonly targetVersion: Version;
	    readonly name: string;
	    readonly enumType: TEnum;
	    readonly defaultValue?: number | undefined;
	    readonly onGetInitialValue?: ((sender: SerializableObject) => number) | undefined;
	    private _values;
	    parse(sender: SerializableObject, source: PropertyBag, context: BaseSerializationContext): number | undefined;
	    toJSON(sender: SerializableObject, target: PropertyBag, value: number | undefined, context: BaseSerializationContext): void;
	    constructor(targetVersion: Version, name: string, enumType: TEnum, defaultValue?: number | undefined, values?: IVersionedValue<number>[], onGetInitialValue?: ((sender: SerializableObject) => number) | undefined);
	    get values(): IVersionedValue<number>[];
	}
	export type SerializableObjectType = {
	    new (): SerializableObject;
	};
	export class SerializableObjectProperty extends PropertyDefinition {
	    readonly targetVersion: Version;
	    readonly name: string;
	    readonly objectType: SerializableObjectType;
	    readonly nullable: boolean;
	    parse(sender: SerializableObject, source: PropertyBag, context: BaseSerializationContext): SerializableObject | undefined;
	    toJSON(sender: SerializableObject, target: PropertyBag, value: SerializableObject | undefined, context: BaseSerializationContext): void;
	    constructor(targetVersion: Version, name: string, objectType: SerializableObjectType, nullable?: boolean, defaultValue?: SerializableObject);
	}
	export class SerializableObjectCollectionProperty extends PropertyDefinition {
	    readonly targetVersion: Version;
	    readonly name: string;
	    readonly objectType: SerializableObjectType;
	    readonly onItemAdded?: ((sender: SerializableObject, item: SerializableObject) => void) | undefined;
	    parse(sender: SerializableObject, source: PropertyBag, context: BaseSerializationContext): SerializableObject[] | undefined;
	    toJSON(sender: SerializableObject, target: PropertyBag, value: SerializableObject[] | undefined, context: BaseSerializationContext): void;
	    constructor(targetVersion: Version, name: string, objectType: SerializableObjectType, onItemAdded?: ((sender: SerializableObject, item: SerializableObject) => void) | undefined);
	}
	export class CustomProperty<T> extends PropertyDefinition {
	    readonly targetVersion: Version;
	    readonly name: string;
	    readonly onParse: (sender: SerializableObject, property: PropertyDefinition, source: PropertyBag, context: BaseSerializationContext) => T;
	    readonly onToJSON: (sender: SerializableObject, property: PropertyDefinition, target: PropertyBag, value: T, context: BaseSerializationContext) => void;
	    readonly defaultValue?: T | undefined;
	    readonly onGetInitialValue?: ((sender: SerializableObject) => T) | undefined;
	    parse(sender: SerializableObject, source: PropertyBag, context: BaseSerializationContext): T;
	    toJSON(sender: SerializableObject, target: PropertyBag, value: T, context: BaseSerializationContext): void;
	    constructor(targetVersion: Version, name: string, onParse: (sender: SerializableObject, property: PropertyDefinition, source: PropertyBag, context: BaseSerializationContext) => T, onToJSON: (sender: SerializableObject, property: PropertyDefinition, target: PropertyBag, value: T, context: BaseSerializationContext) => void, defaultValue?: T | undefined, onGetInitialValue?: ((sender: SerializableObject) => T) | undefined);
	}
	export class SerializableObjectSchema {
	    private _properties;
	    indexOf(property: PropertyDefinition): number;
	    add(...properties: PropertyDefinition[]): void;
	    remove(...properties: PropertyDefinition[]): void;
	    getItemAt(index: number): PropertyDefinition;
	    getCount(): number;
	}
	export function property(property: PropertyDefinition): (target: any, propertyKey: string) => void;
	export type PropertyBag = {
	    [propertyName: string]: any;
	};
	export abstract class SerializableObject {
	    static onRegisterCustomProperties?: (sender: SerializableObject, schema: SerializableObjectSchema) => void;
	    static defaultMaxVersion: Version;
	    private static readonly _schemaCache;
	    private _propertyBag;
	    private _rawProperties;
	    protected abstract getSchemaKey(): string;
	    protected getDefaultSerializationContext(): BaseSerializationContext;
	    protected populateSchema(schema: SerializableObjectSchema): void;
	    protected getValue(property: PropertyDefinition): any;
	    protected setValue(property: PropertyDefinition, value: any): void;
	    protected internalParse(source: PropertyBag, context: BaseSerializationContext): void;
	    protected internalToJSON(target: PropertyBag, context: BaseSerializationContext): void;
	    protected shouldSerialize(context: BaseSerializationContext): boolean;
	    maxVersion: Version;
	    constructor();
	    parse(source: PropertyBag, context?: BaseSerializationContext): void;
	    toJSON(context?: BaseSerializationContext): PropertyBag | undefined;
	    hasDefaultValue(property: PropertyDefinition): boolean;
	    hasAllDefaultValues(): boolean;
	    resetDefaultValues(): void;
	    setCustomProperty(name: string, value: any): void;
	    getCustomProperty(name: string): any;
	    getSchema(): SerializableObjectSchema;
	}

}
declare module 'adaptivecards/host-capabilities' {
	import { TargetVersion, SerializableObject, BaseSerializationContext, PropertyBag } from 'adaptivecards/serialization';
	export class HostCapabilities extends SerializableObject {
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

}
declare module 'adaptivecards/host-config' {
	import * as Enums from 'adaptivecards/enums';
	import * as Shared from 'adaptivecards/shared';
	import { HostCapabilities } from 'adaptivecards/host-capabilities';
	export class ColorDefinition {
	    default: string;
	    subtle: string;
	    constructor(defaultColor?: string, subtleColor?: string);
	    parse(obj?: any): void;
	}
	export class TextColorDefinition extends ColorDefinition {
	    readonly highlightColors: ColorDefinition;
	    parse(obj?: any): void;
	}
	export class AdaptiveCardConfig {
	    allowCustomStyle: boolean;
	    constructor(obj?: any);
	}
	export class ImageSetConfig {
	    imageSize: Enums.Size;
	    maxImageHeight: number;
	    constructor(obj?: any);
	    toJSON(): {
	        imageSize: string;
	        maxImageHeight: number;
	    };
	}
	export class MediaConfig {
	    defaultPoster?: string;
	    allowInlinePlayback: boolean;
	    constructor(obj?: any);
	    toJSON(): {
	        defaultPoster: string | undefined;
	        allowInlinePlayback: boolean;
	    };
	}
	export class TableConfig {
	    cellSpacing: number;
	    constructor(obj?: any);
	    toJSON(): {
	        cellSpacing: number;
	    };
	}
	export class BaseTextDefinition {
	    size: Enums.TextSize;
	    color: Enums.TextColor;
	    isSubtle: boolean;
	    weight: Enums.TextWeight;
	    constructor(obj?: any);
	    parse(obj: any): void;
	    getDefaultWeight(): Enums.TextWeight;
	    toJSON(): any;
	}
	export class TextStyleDefinition extends BaseTextDefinition {
	    fontType: Enums.FontType;
	    parse(obj: any): void;
	}
	export class TextStyleSet {
	    readonly default: TextStyleDefinition;
	    readonly heading: TextStyleDefinition;
	    readonly columnHeader: TextStyleDefinition;
	    constructor(obj?: any);
	    getStyleByName(name: string): TextStyleDefinition;
	}
	export class TextBlockConfig {
	    headingLevel?: number;
	    constructor(obj?: any);
	}
	export class RequiredInputLabelTextDefinition extends BaseTextDefinition {
	    suffix?: string;
	    suffixColor: Enums.TextColor;
	    parse(obj?: any): void;
	    toJSON(): any;
	}
	export class InputLabelConfig {
	    inputSpacing: Enums.Spacing;
	    readonly requiredInputs: RequiredInputLabelTextDefinition;
	    readonly optionalInputs: BaseTextDefinition;
	    constructor(obj?: any);
	}
	export class InputConfig {
	    readonly label: InputLabelConfig;
	    readonly errorMessage: BaseTextDefinition;
	    constructor(obj?: any);
	}
	export class FactTextDefinition extends BaseTextDefinition {
	    wrap: boolean;
	    parse(obj?: any): void;
	    toJSON(): any;
	}
	export class FactTitleDefinition extends FactTextDefinition {
	    maxWidth?: number;
	    weight: Enums.TextWeight;
	    constructor(obj?: any);
	    getDefaultWeight(): Enums.TextWeight;
	}
	export class FactSetConfig {
	    readonly title: FactTitleDefinition;
	    readonly value: FactTextDefinition;
	    spacing: number;
	    constructor(obj?: any);
	}
	export class ShowCardActionConfig {
	    actionMode: Enums.ShowCardActionMode;
	    inlineTopMargin: number;
	    style?: string;
	    constructor(obj?: any);
	    toJSON(): {
	        actionMode: string;
	        inlineTopMargin: number;
	        style: string | undefined;
	    };
	}
	export class ActionsConfig {
	    maxActions: number;
	    spacing: Enums.Spacing;
	    buttonSpacing: number;
	    readonly showCard: ShowCardActionConfig;
	    preExpandSingleShowCardAction?: boolean;
	    actionsOrientation: Enums.Orientation;
	    actionAlignment: Enums.ActionAlignment;
	    iconPlacement: Enums.ActionIconPlacement;
	    allowTitleToWrap: boolean;
	    iconSize: number;
	    constructor(obj?: any);
	    toJSON(): {
	        maxActions: number;
	        spacing: string;
	        buttonSpacing: number;
	        showCard: ShowCardActionConfig;
	        preExpandSingleShowCardAction: boolean | undefined;
	        actionsOrientation: string;
	        actionAlignment: string;
	    };
	}
	export class ColorSetDefinition {
	    private parseSingleColor;
	    default: TextColorDefinition;
	    dark: TextColorDefinition;
	    light: TextColorDefinition;
	    accent: TextColorDefinition;
	    good: TextColorDefinition;
	    warning: TextColorDefinition;
	    attention: TextColorDefinition;
	    constructor(obj?: any);
	    parse(obj: any): void;
	}
	export class ContainerStyleDefinition {
	    backgroundColor?: string;
	    readonly foregroundColors: ColorSetDefinition;
	    highlightBackgroundColor?: string;
	    highlightForegroundColor?: string;
	    borderColor?: string;
	    parse(obj: any): void;
	    constructor(obj?: any);
	    get isBuiltIn(): boolean;
	}
	export interface ILineHeightDefinitions {
	    small: number;
	    medium: number;
	    default: number;
	    large: number;
	    extraLarge: number;
	}
	export class ContainerStyleSet {
	    private _allStyles;
	    constructor(obj?: any);
	    toJSON(): any;
	    getStyleByName(name: string | undefined, defaultValue?: ContainerStyleDefinition): ContainerStyleDefinition;
	    get default(): ContainerStyleDefinition;
	    get emphasis(): ContainerStyleDefinition;
	}
	export interface IFontSizeDefinitions {
	    small: number;
	    default: number;
	    medium: number;
	    large: number;
	    extraLarge: number;
	}
	export interface IFontWeightDefinitions {
	    lighter: number;
	    default: number;
	    bolder: number;
	}
	export class FontTypeDefinition {
	    static readonly monospace: FontTypeDefinition;
	    fontFamily?: string;
	    fontSizes: IFontSizeDefinitions;
	    fontWeights: IFontWeightDefinitions;
	    constructor(fontFamily?: string);
	    parse(obj?: any): void;
	}
	export class FontTypeSet {
	    default: FontTypeDefinition;
	    monospace: FontTypeDefinition;
	    constructor(obj?: any);
	    getStyleDefinition(style: Enums.FontType | undefined): FontTypeDefinition;
	}
	export class HostConfig {
	    readonly hostCapabilities: HostCapabilities;
	    private _legacyFontType;
	    choiceSetInputValueSeparator: string;
	    supportsInteractivity: boolean;
	    lineHeights?: ILineHeightDefinitions;
	    fontTypes?: FontTypeSet;
	    readonly spacing: {
	        small: number;
	        default: number;
	        medium: number;
	        large: number;
	        extraLarge: number;
	        padding: number;
	    };
	    readonly separator: {
	        lineThickness: number;
	        lineColor: string;
	    };
	    readonly imageSizes: {
	        small: number;
	        medium: number;
	        large: number;
	    };
	    readonly containerStyles: ContainerStyleSet;
	    readonly inputs: InputConfig;
	    readonly actions: ActionsConfig;
	    readonly adaptiveCard: AdaptiveCardConfig;
	    readonly imageSet: ImageSetConfig;
	    readonly media: MediaConfig;
	    readonly factSet: FactSetConfig;
	    readonly table: TableConfig;
	    readonly textStyles: TextStyleSet;
	    readonly textBlock: TextBlockConfig;
	    cssClassNamePrefix?: string;
	    alwaysAllowBleed: boolean;
	    constructor(obj?: any);
	    getFontTypeDefinition(style?: Enums.FontType): FontTypeDefinition;
	    getEffectiveSpacing(spacing: Enums.Spacing): number;
	    paddingDefinitionToSpacingDefinition(paddingDefinition: Shared.PaddingDefinition): Shared.SpacingDefinition;
	    makeCssClassNames(...classNames: string[]): string[];
	    makeCssClassName(...classNames: string[]): string;
	    get fontFamily(): string | undefined;
	    set fontFamily(value: string | undefined);
	    get fontSizes(): IFontSizeDefinitions;
	    get fontWeights(): IFontWeightDefinitions;
	}
	export const defaultHostConfig: HostConfig;

}
declare module 'adaptivecards/text-formatters' {
	export function formatText(lang: string | undefined, text: string | undefined): string | undefined;

}
declare module 'adaptivecards/card-object' {
	import * as Enums from 'adaptivecards/enums';
	import { Dictionary } from 'adaptivecards/shared';
	import { HostConfig } from 'adaptivecards/host-config';
	import { HostCapabilities } from 'adaptivecards/host-capabilities';
	import { SerializableObject, StringProperty, SerializableObjectProperty, IValidationEvent, PropertyDefinition } from 'adaptivecards/serialization';
	export class ValidationResults {
	    readonly allIds: Dictionary<number>;
	    readonly validationEvents: IValidationEvent[];
	    addFailure(cardObject: CardObject, event: Enums.ValidationEvent, message: string): void;
	}
	export type CardObjectType = {
	    new (): CardObject;
	};
	export abstract class CardObject extends SerializableObject {
	    static readonly typeNameProperty: StringProperty;
	    static readonly idProperty: StringProperty;
	    static readonly requiresProperty: SerializableObjectProperty;
	    protected getSchemaKey(): string;
	    id?: string;
	    get requires(): HostCapabilities;
	    private _shouldFallback;
	    protected _parent?: CardObject;
	    protected _renderedElement?: HTMLElement;
	    /**
	     * Checks if this CardObject contains the given DOM Node.
	     * @param node The DOM Node to look for.
	     * @returns `true` if the DOM Node was found, `false` otherwise.
	     */
	    protected contains(node: Node): boolean;
	    onPreProcessPropertyValue?: (sender: CardObject, property: PropertyDefinition, value: any) => any;
	    abstract getJsonTypeName(): string;
	    abstract get hostConfig(): HostConfig;
	    preProcessPropertyValue(property: PropertyDefinition, propertyValue?: any): any;
	    setParent(value: CardObject | undefined): void;
	    setShouldFallback(value: boolean): void;
	    shouldFallback(): boolean;
	    getRootObject(): CardObject;
	    internalValidateProperties(context: ValidationResults): void;
	    validateProperties(): ValidationResults;
	    /**
	     * Recursively searches this CardObject and any children to find the
	     * innermost CardObject that owns the given DOM Node.
	     *
	     * @param node The DOM Node to look for.
	     *
	     * @returns The owner of the given DOM Node, or `undefined` if no owner was found.
	     */
	    findDOMNodeOwner(node: Node): CardObject | undefined;
	    get parent(): CardObject | undefined;
	    get renderedElement(): HTMLElement | undefined;
	}

}
declare module 'adaptivecards/controls/constants' {
	export class Constants {
	    static readonly keys: {
	        readonly tab: "Tab";
	        readonly enter: "Enter";
	        readonly escape: "Escape";
	        readonly space: " ";
	        readonly up: "ArrowUp";
	        readonly down: "ArrowDown";
	        readonly delete: "Delete";
	    };
	}

}
declare module 'adaptivecards/controls/menu-item' {
	import { HostConfig } from 'adaptivecards/host-config';
	export class MenuItem {
	    private _hostConfig?;
	    private _element;
	    private _value;
	    private _isEnabled;
	    private click;
	    private updateCssClasses;
	    readonly key: string;
	    onClick?: (item: MenuItem) => void;
	    constructor(key: string, value: string);
	    toString(): string;
	    render(hostConfig?: HostConfig): HTMLElement;
	    get value(): string;
	    set value(newValue: string);
	    get isEnabled(): boolean;
	    set isEnabled(value: boolean);
	}

}
declare module 'adaptivecards/controls/collection' {
	export class Collection<TItem> {
	    private _items;
	    onItemAdded: (item: TItem) => void;
	    onItemRemoved: (item: TItem) => void;
	    get(index: number): TItem;
	    add(item: TItem): void;
	    remove(item: TItem): void;
	    indexOf(item: TItem): number;
	    get length(): number;
	}

}
declare module 'adaptivecards/controls/popup-control' {
	import { HostConfig } from 'adaptivecards/host-config';
	export abstract class PopupControl {
	    private _isOpen;
	    private _overlayElement;
	    private _popupElement;
	    private _hostConfig?;
	    protected abstract renderContent(): HTMLElement;
	    onClose: (popupControl: PopupControl, wasCancelled: boolean) => void;
	    keyDown(e: KeyboardEvent): void;
	    render(rootElementBounds: ClientRect): HTMLElement;
	    focus(): void;
	    popup(rootElement: HTMLElement): void;
	    closePopup(wasCancelled: boolean): void;
	    get hostConfig(): HostConfig;
	    set hostConfig(value: HostConfig);
	    get isOpen(): boolean;
	}

}
declare module 'adaptivecards/controls/popup-menu' {
	import { Collection } from 'adaptivecards/controls/collection';
	import { PopupControl } from 'adaptivecards/controls/popup-control';
	import { MenuItem } from 'adaptivecards/controls/menu-item';
	export class PopupMenu extends PopupControl {
	    private _items;
	    private _renderedItems;
	    private _selectedIndex;
	    constructor();
	    protected renderContent(): HTMLElement;
	    keyDown(e: KeyboardEvent): void;
	    get items(): Collection<MenuItem>;
	    get selectedIndex(): number;
	    set selectedIndex(index: number);
	}

}
declare module 'adaptivecards/controls/index' {
	export * from 'adaptivecards/controls/menu-item';
	export * from 'adaptivecards/controls/popup-menu';

}
declare module 'adaptivecards/card-elements' {
	import * as Enums from 'adaptivecards/enums';
	import { PaddingDefinition, SizeAndUnit, ISeparationDefinition, Dictionary, StringWithSubstitutions, IInput, IResourceInformation } from 'adaptivecards/shared';
	import { HostConfig, BaseTextDefinition, FontTypeDefinition, ColorSetDefinition, TextColorDefinition, ContainerStyleDefinition, TextStyleDefinition } from 'adaptivecards/host-config';
	import { CardObject, ValidationResults } from 'adaptivecards/card-object';
	import { Version, BaseSerializationContext, SerializableObject, SerializableObjectSchema, StringProperty, BoolProperty, ValueSetProperty, EnumProperty, SerializableObjectCollectionProperty, SerializableObjectProperty, PixelSizeProperty, NumProperty, PropertyBag, CustomProperty, PropertyDefinition, StringArrayProperty } from 'adaptivecards/serialization';
	import { CardObjectRegistry } from 'adaptivecards/registry';
	export function renderSeparation(hostConfig: HostConfig, separationDefinition: ISeparationDefinition, orientation: Enums.Orientation): HTMLElement | undefined;
	export type CardElementHeight = "auto" | "stretch";
	export abstract class CardElement extends CardObject {
	    static readonly langProperty: StringProperty;
	    static readonly isVisibleProperty: BoolProperty;
	    static readonly separatorProperty: BoolProperty;
	    static readonly heightProperty: ValueSetProperty;
	    static readonly horizontalAlignmentProperty: EnumProperty<typeof Enums.HorizontalAlignment>;
	    static readonly spacingProperty: EnumProperty<typeof Enums.Spacing>;
	    horizontalAlignment?: Enums.HorizontalAlignment;
	    spacing: Enums.Spacing;
	    separator: boolean;
	    height: CardElementHeight;
	    get lang(): string | undefined;
	    set lang(value: string | undefined);
	    get isVisible(): boolean;
	    set isVisible(value: boolean);
	    private _hostConfig?;
	    private _separatorElement?;
	    private _truncatedDueToOverflow;
	    private _defaultRenderedElementDisplayMode?;
	    private _padding?;
	    private internalRenderSeparator;
	    private updateRenderedElementVisibility;
	    private hideElementDueToOverflow;
	    private showElementHiddenDueToOverflow;
	    private handleOverflow;
	    private resetOverflow;
	    protected getDefaultSerializationContext(): BaseSerializationContext;
	    protected createPlaceholderElement(): HTMLElement;
	    protected adjustRenderedElementSize(renderedElement: HTMLElement): void;
	    protected isDisplayed(): boolean;
	    protected abstract internalRender(): HTMLElement | undefined;
	    protected overrideInternalRender(): HTMLElement | undefined;
	    protected applyPadding(): void;
	    protected truncateOverflow(maxHeight: number): boolean;
	    protected undoOverflowTruncation(): void;
	    protected getDefaultPadding(): PaddingDefinition;
	    protected getHasBackground(): boolean;
	    protected getHasBorder(): boolean;
	    protected getPadding(): PaddingDefinition | undefined;
	    protected setPadding(value: PaddingDefinition | undefined): void;
	    protected shouldSerialize(context: SerializationContext): boolean;
	    protected get useDefaultSizing(): boolean;
	    protected get separatorOrientation(): Enums.Orientation;
	    protected get defaultStyle(): string;
	    customCssSelector?: string;
	    parse(source: any, context?: SerializationContext): void;
	    asString(): string | undefined;
	    isBleeding(): boolean;
	    getEffectiveStyle(): string;
	    getEffectiveStyleDefinition(): ContainerStyleDefinition;
	    getEffectiveTextStyleDefinition(): TextStyleDefinition;
	    getForbiddenActionTypes(): ActionType[];
	    getImmediateSurroundingPadding(result: PaddingDefinition, processTop?: boolean, processRight?: boolean, processBottom?: boolean, processLeft?: boolean): void;
	    getActionCount(): number;
	    getActionAt(index: number): Action | undefined;
	    indexOfAction(action: Action): number;
	    remove(): boolean;
	    render(): HTMLElement | undefined;
	    updateLayout(processChildren?: boolean): void;
	    indexOf(cardElement: CardElement): number;
	    isDesignMode(): boolean;
	    isFirstElement(element: CardElement): boolean;
	    isLastElement(element: CardElement): boolean;
	    isAtTheVeryLeft(): boolean;
	    isAtTheVeryRight(): boolean;
	    isAtTheVeryTop(): boolean;
	    isAtTheVeryBottom(): boolean;
	    isBleedingAtTop(): boolean;
	    isBleedingAtBottom(): boolean;
	    isLeftMostElement(element: CardElement): boolean;
	    isRightMostElement(element: CardElement): boolean;
	    isTopElement(element: CardElement): boolean;
	    isBottomElement(element: CardElement): boolean;
	    isHiddenDueToOverflow(): boolean;
	    getRootElement(): CardElement;
	    getParentContainer(): Container | undefined;
	    getAllInputs(processActions?: boolean): Input[];
	    getResourceInformation(): IResourceInformation[];
	    getElementById(id: string): CardElement | undefined;
	    getActionById(id: string): Action | undefined;
	    getEffectivePadding(): PaddingDefinition;
	    getEffectiveHorizontalAlignment(): Enums.HorizontalAlignment;
	    get hostConfig(): HostConfig;
	    set hostConfig(value: HostConfig);
	    get index(): number;
	    get isInteractive(): boolean;
	    get isStandalone(): boolean;
	    get isInline(): boolean;
	    get hasVisibleSeparator(): boolean;
	    get separatorElement(): HTMLElement | undefined;
	    get parent(): CardElement | undefined;
	}
	export class ActionProperty extends PropertyDefinition {
	    readonly targetVersion: Version;
	    readonly name: string;
	    readonly forbiddenActionTypes: string[];
	    parse(sender: SerializableObject, source: PropertyBag, context: SerializationContext): Action | undefined;
	    toJSON(sender: SerializableObject, target: PropertyBag, value: Action | undefined, context: SerializationContext): void;
	    constructor(targetVersion: Version, name: string, forbiddenActionTypes?: string[]);
	}
	export abstract class BaseTextBlock extends CardElement {
	    static readonly textProperty: StringProperty;
	    static readonly sizeProperty: EnumProperty<typeof Enums.TextSize>;
	    static readonly weightProperty: EnumProperty<typeof Enums.TextWeight>;
	    static readonly colorProperty: EnumProperty<typeof Enums.TextColor>;
	    static readonly isSubtleProperty: BoolProperty;
	    static readonly fontTypeProperty: EnumProperty<typeof Enums.FontType>;
	    static readonly selectActionProperty: ActionProperty;
	    protected populateSchema(schema: SerializableObjectSchema): void;
	    size?: Enums.TextSize;
	    weight?: Enums.TextWeight;
	    color?: Enums.TextColor;
	    fontType?: Enums.FontType;
	    isSubtle?: boolean;
	    get text(): string | undefined;
	    set text(value: string | undefined);
	    selectAction?: Action;
	    protected getFontSize(fontType: FontTypeDefinition): number;
	    protected getColorDefinition(colorSet: ColorSetDefinition, color: Enums.TextColor): TextColorDefinition;
	    protected setText(value: string | undefined): void;
	    ariaHidden: boolean;
	    constructor(text?: string);
	    init(textDefinition: BaseTextDefinition): void;
	    asString(): string | undefined;
	    applyStylesTo(targetElement: HTMLElement): void;
	    get effectiveColor(): Enums.TextColor;
	    get effectiveFontType(): Enums.FontType;
	    get effectiveIsSubtle(): boolean;
	    get effectiveSize(): Enums.TextSize;
	    get effectiveWeight(): Enums.TextWeight;
	}
	export type TextBlockStyle = "default" | "heading" | "columnHeader";
	export class TextBlock extends BaseTextBlock {
	    static readonly wrapProperty: BoolProperty;
	    static readonly maxLinesProperty: NumProperty;
	    static readonly styleProperty: ValueSetProperty;
	    wrap: boolean;
	    maxLines?: number;
	    style?: TextBlockStyle;
	    private _computedLineHeight;
	    private _originalInnerHtml;
	    private _processedText?;
	    private _treatAsPlainText;
	    private restoreOriginalContent;
	    private truncateIfSupported;
	    protected setText(value: string): void;
	    protected internalRender(): HTMLElement | undefined;
	    protected truncateOverflow(maxHeight: number): boolean;
	    protected undoOverflowTruncation(): void;
	    useMarkdown: boolean;
	    forElementId?: string;
	    applyStylesTo(targetElement: HTMLElement): void;
	    getJsonTypeName(): string;
	    getEffectiveTextStyleDefinition(): TextStyleDefinition;
	    updateLayout(processChildren?: boolean): void;
	}
	export class TextRun extends BaseTextBlock {
	    static readonly italicProperty: BoolProperty;
	    static readonly strikethroughProperty: BoolProperty;
	    static readonly highlightProperty: BoolProperty;
	    static readonly underlineProperty: BoolProperty;
	    protected populateSchema(schema: SerializableObjectSchema): void;
	    italic: boolean;
	    strikethrough: boolean;
	    highlight: boolean;
	    underline: boolean;
	    protected internalRender(): HTMLElement | undefined;
	    applyStylesTo(targetElement: HTMLElement): void;
	    getJsonTypeName(): string;
	    get isStandalone(): boolean;
	    get isInline(): boolean;
	}
	export class RichTextBlock extends CardElement {
	    private _inlines;
	    private internalAddInline;
	    protected internalParse(source: any, context: SerializationContext): void;
	    protected internalToJSON(target: PropertyBag, context: SerializationContext): void;
	    protected internalRender(): HTMLElement | undefined;
	    forElementId?: string;
	    asString(): string | undefined;
	    getJsonTypeName(): string;
	    getInlineCount(): number;
	    getInlineAt(index: number): CardElement;
	    addInline(inline: CardElement | string): void;
	    removeInline(inline: CardElement): boolean;
	}
	export class Fact extends SerializableObject {
	    static readonly titleProperty: StringProperty;
	    static readonly valueProperty: StringProperty;
	    name?: string;
	    value?: string;
	    protected getSchemaKey(): string;
	    constructor(name?: string, value?: string);
	}
	export class FactSet extends CardElement {
	    static readonly factsProperty: SerializableObjectCollectionProperty;
	    facts: Fact[];
	    protected get useDefaultSizing(): boolean;
	    protected internalRender(): HTMLElement | undefined;
	    getJsonTypeName(): string;
	} class ImageDimensionProperty extends PropertyDefinition {
	    readonly targetVersion: Version;
	    readonly name: string;
	    readonly internalName: string;
	    readonly fallbackProperty?: ValueSetProperty | undefined;
	    getInternalName(): string;
	    parse(sender: SerializableObject, source: PropertyBag, context: BaseSerializationContext): number | undefined;
	    toJSON(sender: SerializableObject, target: PropertyBag, value: number | undefined, context: BaseSerializationContext): void;
	    constructor(targetVersion: Version, name: string, internalName: string, fallbackProperty?: ValueSetProperty | undefined);
	}
	export class Image extends CardElement {
	    static readonly urlProperty: StringProperty;
	    static readonly altTextProperty: StringProperty;
	    static readonly backgroundColorProperty: StringProperty;
	    static readonly styleProperty: EnumProperty<typeof Enums.ImageStyle>;
	    static readonly sizeProperty: EnumProperty<typeof Enums.Size>;
	    static readonly pixelWidthProperty: ImageDimensionProperty;
	    static readonly pixelHeightProperty: ImageDimensionProperty;
	    static readonly selectActionProperty: ActionProperty;
	    protected populateSchema(schema: SerializableObjectSchema): void;
	    url?: string;
	    altText?: string;
	    backgroundColor?: string;
	    size: Enums.Size;
	    style: Enums.ImageStyle;
	    pixelWidth?: number;
	    pixelHeight?: number;
	    selectAction?: Action;
	    private applySize;
	    protected get useDefaultSizing(): boolean;
	    protected internalRender(): HTMLElement | undefined;
	    maxHeight?: number;
	    getJsonTypeName(): string;
	    getActionById(id: string): Action | undefined;
	    getResourceInformation(): IResourceInformation[];
	}
	export abstract class CardElementContainer extends CardElement {
	    static readonly selectActionProperty: ActionProperty;
	    protected populateSchema(schema: SerializableObjectSchema): void;
	    protected _selectAction?: Action;
	    protected isElementAllowed(element: CardElement): boolean;
	    protected applyPadding(): void;
	    protected get isSelectable(): boolean;
	    abstract getItemCount(): number;
	    abstract getItemAt(index: number): CardElement;
	    abstract getFirstVisibleRenderedItem(): CardElement | undefined;
	    abstract getLastVisibleRenderedItem(): CardElement | undefined;
	    abstract removeItem(item: CardElement): boolean;
	    allowVerticalOverflow: boolean;
	    internalValidateProperties(context: ValidationResults): void;
	    render(): HTMLElement | undefined;
	    updateLayout(processChildren?: boolean): void;
	    getAllInputs(processActions?: boolean): Input[];
	    getResourceInformation(): IResourceInformation[];
	    getElementById(id: string): CardElement | undefined;
	    /**
	     * @inheritdoc
	     */
	    findDOMNodeOwner(node: Node): CardObject | undefined;
	}
	export class ImageSet extends CardElementContainer {
	    static readonly imagesProperty: SerializableObjectCollectionProperty;
	    static readonly imageSizeProperty: EnumProperty<typeof Enums.ImageSize>;
	    private _images;
	    imageSize: Enums.ImageSize;
	    protected internalRender(): HTMLElement | undefined;
	    getItemCount(): number;
	    getItemAt(index: number): CardElement;
	    getFirstVisibleRenderedItem(): CardElement | undefined;
	    getLastVisibleRenderedItem(): CardElement | undefined;
	    removeItem(item: CardElement): boolean;
	    getJsonTypeName(): string;
	    addImage(image: Image): void;
	    indexOf(cardElement: CardElement): number;
	}
	export class MediaSource extends SerializableObject {
	    static readonly mimeTypeProperty: StringProperty;
	    static readonly urlProperty: StringProperty;
	    mimeType?: string;
	    url?: string;
	    protected getSchemaKey(): string;
	    constructor(url?: string, mimeType?: string);
	    isValid(): boolean;
	    render(): HTMLElement | undefined;
	}
	export class Media extends CardElement {
	    static readonly sourcesProperty: SerializableObjectCollectionProperty;
	    static readonly posterProperty: StringProperty;
	    static readonly altTextProperty: StringProperty;
	    sources: MediaSource[];
	    poster?: string;
	    altText?: string;
	    static readonly supportedMediaTypes: string[];
	    private _selectedMediaType?;
	    private _selectedSources;
	    private getPosterUrl;
	    private processSources;
	    private handlePlayButtonInvoke;
	    private renderPoster;
	    private renderMediaPlayer;
	    protected internalRender(): HTMLElement | undefined;
	    static onPlay?: (sender: Media) => void;
	    getJsonTypeName(): string;
	    getResourceInformation(): IResourceInformation[];
	    get selectedMediaType(): string | undefined;
	}
	export abstract class Input extends CardElement implements IInput {
	    static readonly labelProperty: StringProperty;
	    static readonly isRequiredProperty: BoolProperty;
	    static readonly errorMessageProperty: StringProperty;
	    label?: string;
	    isRequired: boolean;
	    errorMessage?: string;
	    private _outerContainerElement;
	    private _inputControlContainerElement;
	    private _renderedErrorMessageElement?;
	    private _renderedLabelElement?;
	    private _renderedInputControlElement?;
	    protected getAllLabelIds(): string[];
	    protected updateInputControlAriaLabelledBy(): void;
	    protected get isNullable(): boolean;
	    protected get renderedInputControlElement(): HTMLElement | undefined;
	    protected get inputControlContainerElement(): HTMLElement;
	    protected overrideInternalRender(): HTMLElement | undefined;
	    protected valueChanged(): void;
	    protected resetValidationFailureCue(): void;
	    protected showValidationErrorMessage(): void;
	    onValueChanged: (sender: Input) => void;
	    labelledBy?: string;
	    abstract isSet(): boolean;
	    focus(): void;
	    isValid(): boolean;
	    internalValidateProperties(context: ValidationResults): void;
	    validateValue(): boolean;
	    getAllInputs(processActions?: boolean): Input[];
	    abstract get value(): any;
	    get isInteractive(): boolean;
	}
	export class TextInput extends Input {
	    static readonly valueProperty: StringProperty;
	    static readonly maxLengthProperty: NumProperty;
	    static readonly isMultilineProperty: BoolProperty;
	    static readonly placeholderProperty: StringProperty;
	    static readonly styleProperty: EnumProperty<typeof Enums.InputTextStyle>;
	    static readonly inlineActionProperty: ActionProperty;
	    static readonly regexProperty: StringProperty;
	    defaultValue?: string;
	    maxLength?: number;
	    isMultiline: boolean;
	    placeholder?: string;
	    style: Enums.InputTextStyle;
	    inlineAction?: Action;
	    regex?: string;
	    private setupInput;
	    protected internalRender(): HTMLElement | undefined;
	    protected overrideInternalRender(): HTMLElement | undefined;
	    getJsonTypeName(): string;
	    getActionById(id: string): Action | undefined;
	    isSet(): boolean;
	    isValid(): boolean;
	    get value(): string | undefined;
	}
	export class ToggleInput extends Input {
	    static readonly valueProperty: StringProperty;
	    static readonly titleProperty: StringProperty;
	    static readonly valueOnProperty: StringProperty;
	    static readonly valueOffProperty: StringProperty;
	    static readonly wrapProperty: BoolProperty;
	    defaultValue?: string;
	    title?: string;
	    valueOn: string;
	    valueOff: string;
	    wrap: boolean;
	    private _checkboxInputElement;
	    private _checkboxInputLabelElement;
	    protected updateInputControlAriaLabelledBy(): void;
	    protected internalRender(): HTMLElement | undefined;
	    protected get isNullable(): boolean;
	    getJsonTypeName(): string;
	    focus(): void;
	    isSet(): boolean;
	    get value(): string | undefined;
	}
	export class Choice extends SerializableObject {
	    static readonly titleProperty: StringProperty;
	    static readonly valueProperty: StringProperty;
	    title?: string;
	    value?: string;
	    protected getSchemaKey(): string;
	    constructor(title?: string, value?: string);
	}
	export class ChoiceSetInput extends Input {
	    static readonly valueProperty: StringProperty;
	    static readonly choicesProperty: SerializableObjectCollectionProperty;
	    static readonly styleProperty: ValueSetProperty;
	    static readonly isMultiSelectProperty: BoolProperty;
	    static readonly placeholderProperty: StringProperty;
	    static readonly wrapProperty: BoolProperty;
	    defaultValue?: string;
	    style?: "compact" | "expanded" | "filtered";
	    get isCompact(): boolean;
	    set isCompact(value: boolean);
	    isMultiSelect: boolean;
	    placeholder?: string;
	    wrap: boolean;
	    choices: Choice[];
	    private static uniqueCategoryCounter;
	    private static getUniqueCategoryName;
	    private _uniqueCategoryName;
	    private _selectElement;
	    private _textInput;
	    private _toggleInputs;
	    private _labels;
	    private internalApplyAriaCurrent;
	    private renderCompoundInput;
	    protected updateInputControlAriaLabelledBy(): void;
	    protected internalRender(): HTMLElement | undefined;
	    getJsonTypeName(): string;
	    focus(): void;
	    internalValidateProperties(context: ValidationResults): void;
	    isSet(): boolean;
	    isValid(): boolean;
	    get value(): string | undefined;
	}
	export class NumberInput extends Input {
	    static readonly valueProperty: NumProperty;
	    static readonly placeholderProperty: StringProperty;
	    static readonly minProperty: NumProperty;
	    static readonly maxProperty: NumProperty;
	    defaultValue?: number;
	    min?: number;
	    max?: number;
	    placeholder?: string;
	    private _numberInputElement;
	    protected internalRender(): HTMLElement | undefined;
	    getJsonTypeName(): string;
	    isSet(): boolean;
	    isValid(): boolean;
	    get value(): number | undefined;
	}
	export class DateInput extends Input {
	    static readonly valueProperty: StringProperty;
	    static readonly placeholderProperty: StringProperty;
	    static readonly minProperty: StringProperty;
	    static readonly maxProperty: StringProperty;
	    defaultValue?: string;
	    min?: string;
	    max?: string;
	    placeholder?: string;
	    private _dateInputElement;
	    protected internalRender(): HTMLElement | undefined;
	    getJsonTypeName(): string;
	    isSet(): boolean;
	    isValid(): boolean;
	    get value(): string | undefined;
	}
	export class TimeProperty extends CustomProperty<string | undefined> {
	    readonly targetVersion: Version;
	    readonly name: string;
	    constructor(targetVersion: Version, name: string);
	}
	export class TimeInput extends Input {
	    private static convertTimeStringToDate;
	    static readonly valueProperty: TimeProperty;
	    static readonly placeholderProperty: StringProperty;
	    static readonly minProperty: TimeProperty;
	    static readonly maxProperty: TimeProperty;
	    defaultValue?: string;
	    min?: string;
	    max?: string;
	    placeholder?: string;
	    private _timeInputElement;
	    protected internalRender(): HTMLElement | undefined;
	    getJsonTypeName(): string;
	    isSet(): boolean;
	    isValid(): boolean;
	    get value(): string | undefined;
	}
	export const enum ActionButtonState {
	    Normal = 0,
	    Expanded = 1,
	    Subdued = 2
	}
	export type ActionType = {
	    new (): Action;
	};
	export abstract class Action extends CardObject {
	    static readonly titleProperty: StringProperty;
	    static readonly iconUrlProperty: StringProperty;
	    static readonly styleProperty: ValueSetProperty;
	    static readonly modeProperty: ValueSetProperty;
	    static readonly tooltipProperty: StringProperty;
	    static readonly isEnabledProperty: BoolProperty;
	    title?: string;
	    iconUrl?: string;
	    style: string;
	    mode: string;
	    tooltip?: string;
	    isEnabled: boolean;
	    private renderButtonContent;
	    private getParentContainer;
	    private _state;
	    private _actionCollection?;
	    private _isFocusable;
	    protected updateCssClasses(): void;
	    protected getDefaultSerializationContext(): BaseSerializationContext;
	    protected internalGetReferencedInputs(): Dictionary<Input>;
	    protected internalPrepareForExecution(inputs: Dictionary<Input> | undefined): void;
	    protected internalValidateInputs(referencedInputs: Dictionary<Input> | undefined): Input[];
	    protected shouldSerialize(context: SerializationContext): boolean;
	    protected raiseExecuteActionEvent(): void;
	    onExecute: (sender: Action) => void;
	    getHref(): string | undefined;
	    getAriaRole(): string;
	    setupElementForAccessibility(element: HTMLElement, promoteTooltipToLabel?: boolean): void;
	    parse(source: any, context?: SerializationContext): void;
	    render(): void;
	    execute(): void;
	    prepareForExecution(): boolean;
	    remove(): boolean;
	    getAllInputs(processActions?: boolean): Input[];
	    getResourceInformation(): IResourceInformation[];
	    getActionById(id: string): Action | undefined;
	    getReferencedInputs(): Dictionary<Input> | undefined;
	    /**
	     * Validates the inputs associated with this action.
	     *
	     * @returns A list of inputs that failed validation, or an empty array if no input failed validation.
	     */
	    validateInputs(): Input[];
	    get isPrimary(): boolean;
	    set isPrimary(value: boolean);
	    get hostConfig(): HostConfig;
	    get parent(): CardElement | undefined;
	    get state(): ActionButtonState;
	    set state(value: ActionButtonState);
	    get isFocusable(): boolean;
	    set isFocusable(value: boolean);
	}
	export abstract class SubmitActionBase extends Action {
	    static readonly dataProperty: PropertyDefinition;
	    static readonly associatedInputsProperty: CustomProperty<string | undefined>;
	    private _originalData?;
	    associatedInputs?: "auto" | "none";
	    private _isPrepared;
	    private _processedData?;
	    protected internalGetReferencedInputs(): Dictionary<Input>;
	    protected internalPrepareForExecution(inputs: Dictionary<Input> | undefined): void;
	    get data(): object | undefined;
	    set data(value: object | undefined);
	}
	export class SubmitAction extends SubmitActionBase {
	    static readonly JsonTypeName: "Action.Submit";
	    getJsonTypeName(): string;
	}
	export class ExecuteAction extends SubmitActionBase {
	    static readonly JsonTypeName: "Action.Execute";
	    static readonly verbProperty: StringProperty;
	    verb: string;
	    getJsonTypeName(): string;
	}
	export class OpenUrlAction extends Action {
	    static readonly urlProperty: StringProperty;
	    url?: string;
	    static readonly JsonTypeName: "Action.OpenUrl";
	    getJsonTypeName(): string;
	    getAriaRole(): string;
	    internalValidateProperties(context: ValidationResults): void;
	    getHref(): string | undefined;
	}
	export class ToggleVisibilityAction extends Action {
	    static readonly targetElementsProperty: CustomProperty<PropertyBag>;
	    targetElements: {
	        [key: string]: any;
	    };
	    static readonly JsonTypeName: "Action.ToggleVisibility";
	    private updateAriaControlsAttribute;
	    internalValidateProperties(context: ValidationResults): void;
	    getJsonTypeName(): string;
	    render(): void;
	    execute(): void;
	    addTargetElement(elementId: string, isVisible?: boolean | undefined): void;
	    removeTargetElement(elementId: string): void;
	} class StringWithSubstitutionProperty extends PropertyDefinition {
	    readonly targetVersion: Version;
	    readonly name: string;
	    parse(sender: SerializableObject, source: PropertyBag, context: BaseSerializationContext): StringWithSubstitutions;
	    toJSON(sender: SerializableObject, target: PropertyBag, value: StringWithSubstitutions, context: BaseSerializationContext): void;
	    constructor(targetVersion: Version, name: string);
	}
	export class HttpHeader extends SerializableObject {
	    static readonly nameProperty: StringProperty;
	    static readonly valueProperty: StringWithSubstitutionProperty;
	    protected getSchemaKey(): string;
	    name: string;
	    private _value;
	    constructor(name?: string, value?: string);
	    getReferencedInputs(inputs: Input[], referencedInputs: Dictionary<Input>): void;
	    prepareForExecution(inputs: Dictionary<Input>): void;
	    get value(): string | undefined;
	    set value(newValue: string | undefined);
	}
	export class HttpAction extends Action {
	    static readonly urlProperty: StringWithSubstitutionProperty;
	    static readonly bodyProperty: StringWithSubstitutionProperty;
	    static readonly methodProperty: StringProperty;
	    static readonly headersProperty: SerializableObjectCollectionProperty;
	    static readonly ignoreInputValidationProperty: BoolProperty;
	    private _url;
	    private _body;
	    method?: string;
	    headers: HttpHeader[];
	    private _ignoreInputValidation;
	    static readonly JsonTypeName: "Action.Http";
	    protected internalGetReferencedInputs(): Dictionary<Input>;
	    protected internalPrepareForExecution(inputs: Dictionary<Input> | undefined): void;
	    getJsonTypeName(): string;
	    internalValidateProperties(context: ValidationResults): void;
	    get ignoreInputValidation(): boolean;
	    set ignoreInputValidation(value: boolean);
	    get url(): string | undefined;
	    set url(value: string | undefined);
	    get body(): string | undefined;
	    set body(value: string | undefined);
	}
	export class ShowCardAction extends Action {
	    static readonly JsonTypeName: "Action.ShowCard";
	    protected updateCssClasses(): void;
	    protected internalParse(source: any, context: SerializationContext): void;
	    protected internalToJSON(target: PropertyBag, context: SerializationContext): void;
	    protected raiseExecuteActionEvent(): void;
	    readonly card: AdaptiveCard;
	    getJsonTypeName(): string;
	    internalValidateProperties(context: ValidationResults): void;
	    setParent(value: CardElement): void;
	    getAllInputs(processActions?: boolean): Input[];
	    getResourceInformation(): IResourceInformation[];
	    getActionById(id: string): Action | undefined;
	}
	export class ActionSet extends CardElement {
	    static readonly orientationProperty: EnumProperty<typeof Enums.Orientation>;
	    orientation?: Enums.Orientation;
	    private _actionCollection;
	    protected internalParse(source: any, context: SerializationContext): void;
	    protected internalToJSON(target: PropertyBag, context: SerializationContext): void;
	    protected internalRender(): HTMLElement | undefined;
	    constructor();
	    isBleedingAtBottom(): boolean;
	    getJsonTypeName(): string;
	    getActionCount(): number;
	    getActionAt(index: number): Action | undefined;
	    getActionById(id: string): Action | undefined;
	    internalValidateProperties(context: ValidationResults): void;
	    addAction(action: Action): void;
	    getAllInputs(processActions?: boolean): Input[];
	    getResourceInformation(): IResourceInformation[];
	    /**
	     * @inheritdoc
	     */
	    findDOMNodeOwner(node: Node): CardObject | undefined;
	    get isInteractive(): boolean;
	}
	export class ContainerStyleProperty extends ValueSetProperty {
	    readonly targetVersion: Version;
	    readonly name: string;
	    readonly defaultValue?: string | undefined;
	    readonly onGetInitialValue?: ((sender: SerializableObject) => string) | undefined;
	    constructor(targetVersion: Version, name: string, defaultValue?: string | undefined, onGetInitialValue?: ((sender: SerializableObject) => string) | undefined);
	}
	export abstract class StylableCardElementContainer extends CardElementContainer {
	    static readonly styleProperty: ContainerStyleProperty;
	    get style(): string | undefined;
	    set style(value: string | undefined);
	    protected get allowCustomStyle(): boolean;
	    protected get hasExplicitStyle(): boolean;
	    protected applyBorder(): void;
	    protected applyBackground(): void;
	    protected applyPadding(): void;
	    protected getHasBackground(): boolean;
	    protected getDefaultPadding(): PaddingDefinition;
	    internalValidateProperties(context: ValidationResults): void;
	    render(): HTMLElement | undefined;
	    getEffectiveStyle(): string;
	}
	export abstract class ContainerBase extends StylableCardElementContainer {
	    static readonly bleedProperty: BoolProperty;
	    static readonly minHeightProperty: PixelSizeProperty;
	    private _bleed;
	    minPixelHeight?: number;
	    protected adjustRenderedElementSize(renderedElement: HTMLElement): void;
	    protected getHasExpandedAction(): boolean;
	    protected getBleed(): boolean;
	    protected setBleed(value: boolean): void;
	    protected get renderedActionCount(): number;
	    isBleeding(): boolean;
	}
	export class BackgroundImage extends SerializableObject {
	    static readonly urlProperty: StringProperty;
	    static readonly fillModeProperty: EnumProperty<typeof Enums.FillMode>;
	    static readonly horizontalAlignmentProperty: EnumProperty<typeof Enums.HorizontalAlignment>;
	    static readonly verticalAlignmentProperty: EnumProperty<typeof Enums.VerticalAlignment>;
	    url?: string;
	    fillMode: Enums.FillMode;
	    horizontalAlignment: Enums.HorizontalAlignment;
	    verticalAlignment: Enums.VerticalAlignment;
	    protected getSchemaKey(): string;
	    protected internalParse(source: any, context: BaseSerializationContext): void;
	    apply(element: CardElement): void;
	    isValid(): boolean;
	}
	export class Container extends ContainerBase {
	    static readonly backgroundImageProperty: SerializableObjectProperty;
	    static readonly verticalContentAlignmentProperty: EnumProperty<typeof Enums.VerticalAlignment>;
	    static readonly rtlProperty: BoolProperty;
	    get backgroundImage(): BackgroundImage;
	    verticalContentAlignment?: Enums.VerticalAlignment;
	    rtl?: boolean;
	    private _items;
	    private _renderedItems;
	    private insertItemAt;
	    protected getItemsCollectionPropertyName(): string;
	    protected applyBackground(): void;
	    protected internalRender(): HTMLElement | undefined;
	    protected truncateOverflow(maxHeight: number): boolean;
	    protected undoOverflowTruncation(): void;
	    protected getHasBackground(): boolean;
	    protected internalParse(source: any, context: SerializationContext): void;
	    protected internalToJSON(target: PropertyBag, context: SerializationContext): void;
	    protected get isSelectable(): boolean;
	    getEffectiveVerticalContentAlignment(): Enums.VerticalAlignment;
	    getItemCount(): number;
	    getItemAt(index: number): CardElement;
	    getFirstVisibleRenderedItem(): CardElement | undefined;
	    getLastVisibleRenderedItem(): CardElement | undefined;
	    getJsonTypeName(): string;
	    isFirstElement(element: CardElement): boolean;
	    isLastElement(element: CardElement): boolean;
	    isRtl(): boolean;
	    isBleedingAtTop(): boolean;
	    isBleedingAtBottom(): boolean;
	    indexOf(cardElement: CardElement): number;
	    addItem(item: CardElement): void;
	    insertItemBefore(item: CardElement, insertBefore: CardElement): void;
	    insertItemAfter(item: CardElement, insertAfter: CardElement): void;
	    removeItem(item: CardElement): boolean;
	    clear(): void;
	    getResourceInformation(): IResourceInformation[];
	    getActionById(id: string): Action | undefined;
	    get padding(): PaddingDefinition | undefined;
	    set padding(value: PaddingDefinition | undefined);
	    get selectAction(): Action | undefined;
	    set selectAction(value: Action | undefined);
	    get bleed(): boolean;
	    set bleed(value: boolean);
	}
	export type ColumnWidth = SizeAndUnit | "auto" | "stretch";
	export class Column extends Container {
	    static readonly widthProperty: CustomProperty<ColumnWidth>;
	    width: ColumnWidth;
	    private _computedWeight;
	    protected adjustRenderedElementSize(renderedElement: HTMLElement): void;
	    protected shouldSerialize(context: SerializationContext): boolean;
	    protected get separatorOrientation(): Enums.Orientation;
	    constructor(width?: ColumnWidth);
	    getJsonTypeName(): string;
	    get hasVisibleSeparator(): boolean;
	    get isStandalone(): boolean;
	}
	export class ColumnSet extends ContainerBase {
	    private _columns;
	    private _renderedColumns;
	    private createColumnInstance;
	    protected internalRender(): HTMLElement | undefined;
	    protected truncateOverflow(maxHeight: number): boolean;
	    protected undoOverflowTruncation(): void;
	    protected get isSelectable(): boolean;
	    protected internalParse(source: any, context: SerializationContext): void;
	    protected internalToJSON(target: PropertyBag, context: SerializationContext): void;
	    isFirstElement(element: CardElement): boolean;
	    isBleedingAtTop(): boolean;
	    isBleedingAtBottom(): boolean;
	    getItemCount(): number;
	    getFirstVisibleRenderedItem(): CardElement | undefined;
	    getLastVisibleRenderedItem(): CardElement | undefined;
	    getColumnAt(index: number): Column;
	    getItemAt(index: number): CardElement;
	    getJsonTypeName(): string;
	    internalValidateProperties(context: ValidationResults): void;
	    addColumn(column: Column): void;
	    removeItem(item: CardElement): boolean;
	    indexOf(cardElement: CardElement): number;
	    isLeftMostElement(element: CardElement): boolean;
	    isRightMostElement(element: CardElement): boolean;
	    isTopElement(element: CardElement): boolean;
	    isBottomElement(element: CardElement): boolean;
	    getActionById(id: string): Action | undefined;
	    get bleed(): boolean;
	    set bleed(value: boolean);
	    get padding(): PaddingDefinition | undefined;
	    set padding(value: PaddingDefinition | undefined);
	    get selectAction(): Action | undefined;
	    set selectAction(value: Action | undefined);
	}
	export abstract class ContainerWithActions extends Container {
	    private _actionCollection;
	    protected internalParse(source: any, context: SerializationContext): void;
	    protected internalToJSON(target: PropertyBag, context: SerializationContext): void;
	    protected internalRender(): HTMLElement | undefined;
	    protected getHasExpandedAction(): boolean;
	    protected get renderedActionCount(): number;
	    protected get renderIfEmpty(): boolean;
	    constructor();
	    getActionCount(): number;
	    getActionAt(index: number): Action | undefined;
	    getActionById(id: string): Action | undefined;
	    internalValidateProperties(context: ValidationResults): void;
	    isLastElement(element: CardElement): boolean;
	    addAction(action: Action): void;
	    clear(): void;
	    getAllInputs(processActions?: boolean): Input[];
	    getResourceInformation(): IResourceInformation[];
	    isBleedingAtBottom(): boolean;
	    get isStandalone(): boolean;
	}
	export interface IMarkdownProcessingResult {
	    didProcess: boolean;
	    outputHtml?: any;
	}
	export class RefreshActionProperty extends PropertyDefinition {
	    readonly targetVersion: Version;
	    readonly name: string;
	    parse(sender: RefreshDefinition, source: PropertyBag, context: SerializationContext): ExecuteAction | undefined;
	    toJSON(sender: SerializableObject, target: PropertyBag, value: ExecuteAction | undefined, context: SerializationContext): void;
	    constructor(targetVersion: Version, name: string);
	}
	export class RefreshDefinition extends SerializableObject {
	    static readonly actionProperty: RefreshActionProperty;
	    static readonly userIdsProperty: StringArrayProperty;
	    get action(): ExecuteAction;
	    set action(value: ExecuteAction);
	    userIds?: string[];
	    protected getSchemaKey(): string;
	    parent: CardElement;
	}
	export class AuthCardButton extends SerializableObject {
	    static readonly typeProperty: StringProperty;
	    static readonly titleProperty: StringProperty;
	    static readonly imageProperty: StringProperty;
	    static readonly valueProperty: StringProperty;
	    protected getSchemaKey(): string;
	    type: string;
	    title?: string;
	    image?: string;
	    value: string;
	}
	export class TokenExchangeResource extends SerializableObject {
	    static readonly idProperty: StringProperty;
	    static readonly uriProperty: StringProperty;
	    static readonly providerIdProperty: StringProperty;
	    protected getSchemaKey(): string;
	    id?: string;
	    uri?: string;
	    providerId?: string;
	}
	export class Authentication extends SerializableObject {
	    static readonly textProperty: StringProperty;
	    static readonly connectionNameProperty: StringProperty;
	    static readonly buttonsProperty: SerializableObjectCollectionProperty;
	    static readonly tokenExchangeResourceProperty: SerializableObjectProperty;
	    protected getSchemaKey(): string;
	    text?: string;
	    connectionName?: string;
	    buttons: AuthCardButton[];
	    tokenExchangeResource?: TokenExchangeResource;
	}
	export class AdaptiveCard extends ContainerWithActions {
	    static readonly schemaUrl = "http://adaptivecards.io/schemas/adaptive-card.json";
	    protected static readonly $schemaProperty: CustomProperty<string>;
	    static readonly versionProperty: CustomProperty<Version | undefined>;
	    static readonly fallbackTextProperty: StringProperty;
	    static readonly speakProperty: StringProperty;
	    static readonly refreshProperty: SerializableObjectProperty;
	    static readonly authenticationProperty: SerializableObjectProperty;
	    version: Version;
	    fallbackText?: string;
	    speak?: string;
	    get refresh(): RefreshDefinition | undefined;
	    set refresh(value: RefreshDefinition | undefined);
	    authentication?: Authentication;
	    static onAnchorClicked?: (element: CardElement, anchor: HTMLAnchorElement, ev?: MouseEvent) => boolean;
	    static onExecuteAction?: (action: Action) => void;
	    static onElementVisibilityChanged?: (element: CardElement) => void;
	    static onImageLoaded?: (image: Image) => void;
	    static onInlineCardExpanded?: (action: ShowCardAction, isExpanded: boolean) => void;
	    static onInputValueChanged?: (input: Input) => void;
	    static onProcessMarkdown?: (text: string, result: IMarkdownProcessingResult) => void;
	    static onDisplayOverflowActionMenu?: (actions: readonly Action[], target?: HTMLElement) => boolean;
	    static onRenderOverflowActions?: (actions: readonly Action[], isRootLevelActions: boolean) => boolean;
	    static get processMarkdown(): (text: string) => string;
	    static set processMarkdown(value: (text: string) => string);
	    static applyMarkdown(text: string): IMarkdownProcessingResult;
	    private _fallbackCard?;
	    private isVersionSupported;
	    protected getDefaultSerializationContext(): BaseSerializationContext;
	    protected getItemsCollectionPropertyName(): string;
	    protected internalParse(source: any, context: SerializationContext): void;
	    protected internalToJSON(target: PropertyBag, context: SerializationContext): void;
	    protected internalRender(): HTMLElement | undefined;
	    protected getHasBackground(): boolean;
	    protected getDefaultPadding(): PaddingDefinition;
	    protected shouldSerialize(context: SerializationContext): boolean;
	    protected get renderIfEmpty(): boolean;
	    protected get bypassVersionCheck(): boolean;
	    protected get allowCustomStyle(): boolean;
	    protected get hasBackground(): boolean;
	    onAnchorClicked?: (element: CardElement, anchor: HTMLAnchorElement, ev?: MouseEvent) => boolean;
	    onExecuteAction?: (action: Action) => void;
	    onElementVisibilityChanged?: (element: CardElement) => void;
	    onImageLoaded?: (image: Image) => void;
	    onInlineCardExpanded?: (action: ShowCardAction, isExpanded: boolean) => void;
	    onInputValueChanged?: (input: Input) => void;
	    onDisplayOverflowActionMenu?: (actions: readonly Action[], target?: HTMLElement) => boolean;
	    onRenderOverflowActions?: (actions: readonly Action[], isRootLevelActions: boolean) => boolean;
	    designMode: boolean;
	    getJsonTypeName(): string;
	    internalValidateProperties(context: ValidationResults): void;
	    render(target?: HTMLElement): HTMLElement | undefined;
	    updateLayout(processChildren?: boolean): void;
	    shouldFallback(): boolean;
	    get hasVisibleSeparator(): boolean;
	}
	export class SerializationContext extends BaseSerializationContext {
	    private _elementRegistry?;
	    private _actionRegistry?;
	    private internalParseCardObject;
	    protected cardObjectParsed(o: SerializableObject, source: any): void;
	    onParseAction?: (action: Action, source: any, context: SerializationContext) => void;
	    onParseElement?: (element: CardElement, source: any, context: SerializationContext) => void;
	    shouldSerialize(o: SerializableObject): boolean;
	    parseCardObject<T extends CardObject>(parent: CardElement | undefined, source: any, forbiddenTypeNames: string[], allowFallback: boolean, createInstanceCallback: (typeName: string) => T | undefined, logParseEvent: (typeName: string, errorType: Enums.TypeErrorType) => void): T | undefined;
	    parseElement(parent: CardElement | undefined, source: any, allowFallback: boolean): CardElement | undefined;
	    parseAction(parent: CardElement, source: any, forbiddenActionTypes: string[], allowFallback: boolean): Action | undefined;
	    get elementRegistry(): CardObjectRegistry<CardElement>;
	    setElementRegistry(value: CardObjectRegistry<CardElement> | undefined): void;
	    get actionRegistry(): CardObjectRegistry<Action>;
	    setActionRegistry(value: CardObjectRegistry<Action> | undefined): void;
	}
	export {};

}
declare module 'adaptivecards/registry' {
	import { CardElement, Action } from 'adaptivecards/card-elements';
	import { SerializableObject, Version } from 'adaptivecards/serialization';
	export interface ITypeRegistration<T extends SerializableObject> {
	    typeName: string;
	    objectType: {
	        new (): T;
	    };
	    schemaVersion: Version;
	}
	export class CardObjectRegistry<T extends SerializableObject> {
	    private _items;
	    findByName(typeName: string): ITypeRegistration<T> | undefined;
	    clear(): void;
	    copyTo(target: CardObjectRegistry<T>): void;
	    register(typeName: string, objectType: {
	        new (): T;
	    }, schemaVersion?: Version): void;
	    unregister(typeName: string): void;
	    createInstance(typeName: string, targetVersion: Version): T | undefined;
	    getItemCount(): number;
	    getItemAt(index: number): ITypeRegistration<T>;
	}
	export class GlobalRegistry {
	    private static _elements?;
	    private static _actions?;
	    static populateWithDefaultElements(registry: CardObjectRegistry<CardElement>): void;
	    static populateWithDefaultActions(registry: CardObjectRegistry<Action>): void;
	    static readonly defaultElements: CardObjectRegistry<CardElement>;
	    static readonly defaultActions: CardObjectRegistry<Action>;
	    static get elements(): CardObjectRegistry<CardElement>;
	    static get actions(): CardObjectRegistry<Action>;
	    static reset(): void;
	}

}
declare module 'adaptivecards/table' {
	import { CardElement, StylableCardElementContainer, SerializationContext, Container, ContainerStyleProperty } from 'adaptivecards/card-elements';
	import { HorizontalAlignment, VerticalAlignment } from 'adaptivecards/enums';
	import { TextStyleDefinition } from 'adaptivecards/host-config';
	import { BoolProperty, CustomProperty, EnumProperty, PropertyBag, SerializableObject } from 'adaptivecards/serialization';
	import { SizeAndUnit, PaddingDefinition } from 'adaptivecards/shared';
	export class TableColumnDefinition extends SerializableObject {
	    static readonly horizontalCellContentAlignmentProperty: EnumProperty<typeof HorizontalAlignment>;
	    static readonly verticalCellContentAlignmentProperty: EnumProperty<typeof VerticalAlignment>;
	    static readonly widthProperty: CustomProperty<SizeAndUnit>;
	    horizontalCellContentAlignment?: HorizontalAlignment;
	    verticalCellContentAlignment?: VerticalAlignment;
	    width: SizeAndUnit;
	    getSchemaKey(): string;
	    computedWidth: SizeAndUnit;
	}
	export abstract class StylableContainer<T extends CardElement> extends StylableCardElementContainer {
	    private _items;
	    private parseItem;
	    protected abstract getCollectionPropertyName(): string;
	    protected abstract createItemInstance(typeName: string): T | undefined;
	    protected internalAddItem(item: T): void;
	    protected internalRemoveItem(item: T): boolean;
	    protected internalParse(source: any, context: SerializationContext): void;
	    protected internalToJSON(target: PropertyBag, context: SerializationContext): void;
	    removeItem(item: T): boolean;
	    getItemCount(): number;
	    getItemAt(index: number): T;
	    getFirstVisibleRenderedItem(): T | undefined;
	    getLastVisibleRenderedItem(): T | undefined;
	}
	export type CellType = "data" | "header";
	export class TableCell extends Container {
	    private _columnIndex;
	    private _cellType;
	    protected getHasBorder(): boolean;
	    protected applyBorder(): void;
	    protected getDefaultPadding(): PaddingDefinition;
	    protected internalRender(): HTMLElement | undefined;
	    protected shouldSerialize(context: SerializationContext): boolean;
	    getJsonTypeName(): string;
	    getEffectiveTextStyleDefinition(): TextStyleDefinition;
	    getEffectiveHorizontalAlignment(): HorizontalAlignment;
	    getEffectiveVerticalContentAlignment(): VerticalAlignment;
	    get columnIndex(): number;
	    get cellType(): CellType;
	    get parentRow(): TableRow;
	    get isStandalone(): boolean;
	}
	export class TableRow extends StylableContainer<TableCell> {
	    static readonly styleProperty: ContainerStyleProperty;
	    static readonly horizontalCellContentAlignmentProperty: EnumProperty<typeof HorizontalAlignment>;
	    static readonly verticalCellContentAlignmentProperty: EnumProperty<typeof VerticalAlignment>;
	    horizontalCellContentAlignment?: HorizontalAlignment;
	    verticalCellContentAlignment?: VerticalAlignment;
	    protected getDefaultPadding(): PaddingDefinition;
	    protected applyBackground(): void;
	    protected getCollectionPropertyName(): string;
	    protected createItemInstance(typeName: string): TableCell | undefined;
	    protected internalRender(): HTMLElement | undefined;
	    protected shouldSerialize(context: SerializationContext): boolean;
	    addCell(cell: TableCell): void;
	    removeCellAt(columnIndex: number): boolean;
	    ensureHasEnoughCells(cellCount: number): void;
	    getJsonTypeName(): string;
	    getIsFirstRow(): boolean;
	    get parentTable(): Table;
	    get isStandalone(): boolean;
	}
	export class Table extends StylableContainer<TableRow> {
	    private static readonly columnsProperty;
	    static readonly firstRowAsHeadersProperty: BoolProperty;
	    static readonly showGridLinesProperty: BoolProperty;
	    static readonly gridStyleProperty: ContainerStyleProperty;
	    static readonly horizontalCellContentAlignmentProperty: EnumProperty<typeof HorizontalAlignment>;
	    static readonly verticalCellContentAlignmentProperty: EnumProperty<typeof VerticalAlignment>;
	    private _columns;
	    firstRowAsHeaders: boolean;
	    showGridLines: boolean;
	    get gridStyle(): string | undefined;
	    set gridStyle(value: string | undefined);
	    horizontalCellContentAlignment?: HorizontalAlignment;
	    verticalCellContentAlignment?: VerticalAlignment;
	    private ensureRowsHaveEnoughCells;
	    private removeCellsFromColumn;
	    protected getCollectionPropertyName(): string;
	    protected createItemInstance(typeName: string): TableRow | undefined;
	    protected internalParse(source: PropertyBag, context: SerializationContext): void;
	    protected internalRender(): HTMLElement | undefined;
	    addColumn(column: TableColumnDefinition): void;
	    removeColumn(column: TableColumnDefinition): void;
	    getColumnCount(): number;
	    getColumnAt(index: number): TableColumnDefinition;
	    addRow(row: TableRow): void;
	    getJsonTypeName(): string;
	}

}
declare module 'adaptivecards/activity-request' {
	import { Authentication, AuthCardButton, ExecuteAction, TokenExchangeResource } from 'adaptivecards/card-elements';
	export enum ActivityRequestTrigger {
	    Automatic = "automatic",
	    Manual = "manual"
	}
	export interface IActivityRequest {
	    readonly action: ExecuteAction;
	    readonly trigger: ActivityRequestTrigger;
	    readonly attemptNumber: number;
	    readonly consecutiveRefreshes: number;
	    authCode?: string;
	    authToken?: string;
	    retryAsync(): void;
	}
	export class ActivityRequestError {
	    readonly code?: string | undefined;
	    readonly message?: string | undefined;
	    constructor(code?: string | undefined, message?: string | undefined);
	}
	export abstract class ActivityResponse {
	    readonly request: IActivityRequest;
	    constructor(request: IActivityRequest);
	}
	export class SuccessResponse extends ActivityResponse {
	    readonly request: IActivityRequest;
	    readonly rawContent?: string | undefined;
	    constructor(request: IActivityRequest, rawContent?: string | undefined);
	}
	export class ErrorResponse extends ActivityResponse {
	    readonly request: IActivityRequest;
	    readonly error: ActivityRequestError;
	    constructor(request: IActivityRequest, error: ActivityRequestError);
	}
	export class LoginRequestResponse extends ActivityResponse {
	    readonly request: IActivityRequest;
	    private _auth;
	    readonly signinButton?: AuthCardButton;
	    constructor(request: IActivityRequest, _auth: Authentication);
	    get tokenExchangeResource(): TokenExchangeResource | undefined;
	}

}
declare module 'adaptivecards/channel-adapter' {
	import { ActivityResponse, IActivityRequest } from 'adaptivecards/activity-request';
	export abstract class ChannelAdapter {
	    abstract sendRequestAsync(request: IActivityRequest): Promise<ActivityResponse>;
	}

}
declare module 'adaptivecards/adaptive-applet' {
	import { ChannelAdapter } from 'adaptivecards/channel-adapter';
	import { IActivityRequest, SuccessResponse, ErrorResponse } from 'adaptivecards/activity-request';
	import { ExecuteAction, SerializationContext, AdaptiveCard, Action, TokenExchangeResource, AuthCardButton } from 'adaptivecards/card-elements';
	import { HostConfig } from 'adaptivecards/host-config';
	export class AdaptiveApplet {
	    private static readonly submitMagicCodeActionId;
	    private static readonly cancelMagicCodeAuthActionId;
	    private _card?;
	    private _cardPayload;
	    private _allowAutomaticCardUpdate;
	    private _refreshButtonHostElement;
	    private _cardHostElement;
	    private _progressOverlay?;
	    private displayCard;
	    private showManualRefreshButton;
	    private createActivityRequest;
	    private createMagicCodeInputCard;
	    private cancelAutomaticRefresh;
	    private createSerializationContext;
	    private internalSetCard;
	    private internalExecuteAction;
	    private createProgressOverlay;
	    private removeProgressOverlay;
	    private activityRequestSucceeded;
	    private activityRequestFailed;
	    private showAuthCodeInputDialog;
	    private internalSendActivityRequestAsync;
	    readonly renderedElement: HTMLElement;
	    hostConfig?: HostConfig;
	    channelAdapter?: ChannelAdapter;
	    onCardChanging?: (sender: AdaptiveApplet, card: any) => boolean;
	    onCardChanged?: (sender: AdaptiveApplet) => void;
	    onPrefetchSSOToken?: (sender: AdaptiveApplet, tokenExchangeResource: TokenExchangeResource) => void;
	    onSSOTokenNeeded?: (sender: AdaptiveApplet, request: IActivityRequest, tokenExchangeResource: TokenExchangeResource) => boolean;
	    onPrepareActivityRequest?: (sender: AdaptiveApplet, request: IActivityRequest, action: ExecuteAction) => boolean;
	    onActivityRequestSucceeded?: (sender: AdaptiveApplet, response: SuccessResponse, parsedContent: string | AdaptiveCard | undefined) => void;
	    onActivityRequestFailed?: (sender: AdaptiveApplet, response: ErrorResponse) => number;
	    onCreateSerializationContext?: (sender: AdaptiveApplet) => SerializationContext;
	    onCreateProgressOverlay?: (sender: AdaptiveApplet, request: IActivityRequest) => HTMLElement | undefined;
	    onRemoveProgressOverlay?: (sender: AdaptiveApplet, request: IActivityRequest) => void;
	    onRenderManualRefreshButton?: (sender: AdaptiveApplet) => HTMLElement | undefined;
	    onAction?: (sender: AdaptiveApplet, action: Action) => void;
	    onShowManualRefreshButton?: (sender: AdaptiveApplet) => boolean;
	    onShowAuthCodeInputDialog?: (sender: AdaptiveApplet, request: IActivityRequest) => boolean;
	    onShowSigninPrompt?: (sender: AdaptiveApplet, request: IActivityRequest, signinButton: AuthCardButton) => void;
	    constructor();
	    refreshCard(): void;
	    setCard(payload: any): void;
	    get card(): AdaptiveCard | undefined;
	}

}
declare module 'adaptivecards/schema' {
	export type Size = "auto" | "stretch" | "small" | "medium" | "large";
	export type TextSize = "small" | "default" | "medium" | "large" | "extraLarge";
	export type HorizontalAlignment = "left" | "center" | "right";
	export type VerticalAlignment = "top" | "center" | "bottom";
	export type Spacing = "none" | "small" | "default" | "medium" | "large" | "extraLarge" | "padding";
	export type TextWeight = "lighter" | "default" | "bolder";
	export type TextColor = "default" | "dark" | "light" | "accent" | "good" | "warning" | "attention";
	export type ContainerStyle = "default" | "emphasis";
	export type ImageStyle = "default" | "person";
	export interface IAction {
	    id: string;
	    title?: string;
	}
	export interface ISubmitAction extends IAction {
	    type: "Action.Submit";
	    data?: any;
	}
	export interface IOpenUrlAction extends IAction {
	    type: "Action.OpenUrl";
	    url: string;
	}
	export interface IShowCardAction extends IAction {
	    type: "Action.ShowCard";
	    card: IAdaptiveCard;
	}
	export interface ICardElement {
	    id?: string;
	    speak?: string;
	    horizontalAlignment?: HorizontalAlignment;
	    spacing?: Spacing;
	    separator?: boolean;
	    height?: "auto" | "stretch";
	    [propName: string]: any;
	}
	export interface IBackgroundImage {
	    url: string;
	}
	export interface ITextBlock extends ICardElement {
	    type: "TextBlock";
	    size?: TextSize;
	    weight?: TextWeight;
	    color?: TextColor;
	    text: string;
	    isSubtle?: boolean;
	    wrap?: boolean;
	    maxLines?: number;
	}
	export interface IContainer extends ICardElement {
	    type: "Container";
	    backgroundImage?: IBackgroundImage | string;
	    style?: ContainerStyle;
	    verticalContentAlignment?: VerticalAlignment;
	    selectAction?: IAction;
	    items?: ICardElement[];
	}
	export interface IColumn extends ICardElement {
	    backgroundImage?: IBackgroundImage | string;
	    style?: ContainerStyle;
	    verticalContentAlignment?: VerticalAlignment;
	    selectAction?: IAction;
	    items?: ICardElement[];
	    width?: number | "auto" | "stretch" | "auto";
	}
	export interface IColumnSet extends ICardElement {
	    type: "ColumnSet";
	    columns: IColumn[];
	}
	export interface IFact {
	    title: string;
	    value: string;
	    speak?: string;
	}
	export interface IFactSet extends ICardElement {
	    type: "FactSet";
	    facts: IFact[];
	}
	export interface IImage extends ICardElement {
	    type: "Image";
	    altText?: string;
	    selectAction?: IAction;
	    size?: Size;
	    style?: ImageStyle;
	    url: string;
	}
	export interface IImageSet extends ICardElement {
	    type: "ImageSet";
	    images: IImage[];
	    size?: Size;
	}
	export interface IInput extends ICardElement {
	    id: string;
	    value?: string;
	}
	export interface IDateInput extends IInput {
	    type: "Input.Date";
	    min?: string;
	    max?: string;
	    placeholder?: string;
	}
	export interface ITimeInput extends IInput {
	    type: "Input.Time";
	    min?: string;
	    max?: string;
	    placeholder?: string;
	}
	export interface INumberInput extends IInput {
	    type: "Input.Number";
	    min?: number;
	    max?: number;
	    placeholder?: string;
	}
	export interface ITextInput extends IInput {
	    type: "Input.Text";
	    isMultiline?: boolean;
	    maxLength?: number;
	    placeholder?: string;
	}
	export interface IToggleInput extends IInput {
	    type: "Input.Toggle";
	    title: string;
	    valueOn?: string;
	    valueOff?: string;
	}
	export interface IChoice {
	    title: string;
	    value: string;
	}
	export interface IChoiceSetInput extends IInput {
	    type: "Input.ChoiceSet";
	    isMultiSelect?: boolean;
	    style?: "expanded" | "compact";
	    placeholder?: string;
	    choices: IChoice[];
	}
	export interface IVersion {
	    major: number;
	    minor: number;
	}
	export interface IAdaptiveCard extends ICardElement {
	    type: "AdaptiveCard";
	    version?: IVersion | string;
	    backgroundImage?: IBackgroundImage | string;
	    body?: (ITextBlock | IImage | IImageSet | IFactSet | IColumnSet | IContainer)[];
	    actions?: (ISubmitAction | IOpenUrlAction | IShowCardAction)[];
	    speak?: string;
	}

}
declare module 'adaptivecards/adaptivecards' {
	export * from 'adaptivecards/strings';
	export * from 'adaptivecards/enums';
	export * from 'adaptivecards/shared';
	export * from 'adaptivecards/utils';
	export * from 'adaptivecards/serialization';
	export * from 'adaptivecards/host-capabilities';
	export * from 'adaptivecards/host-config';
	export * from 'adaptivecards/registry';
	export * from 'adaptivecards/card-object';
	export * from 'adaptivecards/card-elements';
	export * from 'adaptivecards/table';
	export * from 'adaptivecards/channel-adapter';
	export * from 'adaptivecards/activity-request';
	export * from 'adaptivecards/adaptive-applet';
	export { IAdaptiveCard, ICardElement } from 'adaptivecards/schema';

}
