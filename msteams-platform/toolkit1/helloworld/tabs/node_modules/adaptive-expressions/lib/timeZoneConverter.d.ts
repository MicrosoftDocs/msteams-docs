/**
 * @module adaptive-expressions
 */
/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
/**
 * Time zone converter.
 * (1) From Windows (.NET) timezone to iana timezone.
 * (2) From iana timezone to windows (.NET) timezone.
 * windows ref: https://support.microsoft.com/en-us/help/22803/daylight-saving-time.
 * iana ref: https://www.iana.org/time-zones.
 */
export declare class TimeZoneConverter {
    private static readonly ianaToWindowsMap;
    private static readonly windowsToIanaMap;
    private static readonly validTimezonStr;
    private static readonly seperator;
    private static readonly mappingString;
    /**
     * convert IANA timezone format to windows timezone format.
     *
     * @param ianaTimeZoneId IANA timezone format.
     * @returns windows timezone format.
     */
    static ianaToWindows(ianaTimeZoneId: string): string;
    /**
     * Convert windows timezone to iana timezone.
     *
     * @param windowsTimeZoneId Windows timezone format.
     * @returns Iana timezone format.
     */
    static windowsToIana(windowsTimeZoneId: string): string;
    /**
     * Verify the string is windows timezone or iana string
     *
     * @param timezoneStr time zone string
     * @returns is the string is time zone string
     */
    static verifyTimeZoneStr(timezoneStr: string): boolean;
    /**
     * @private
     */
    private static loadData;
}
//# sourceMappingURL=timeZoneConverter.d.ts.map