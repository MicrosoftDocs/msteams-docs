"use strict";
/**
 * @module adaptive-expressions
 */
/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Built-in expression types.
 */
class ExpressionType {
}
// Math
ExpressionType.Add = '+';
ExpressionType.Subtract = '-';
ExpressionType.Multiply = '*';
ExpressionType.Divide = '/';
ExpressionType.Min = 'min';
ExpressionType.Max = 'max';
ExpressionType.Power = '^';
ExpressionType.Mod = '%';
ExpressionType.Average = 'average';
ExpressionType.Sum = 'sum';
ExpressionType.Count = 'count';
ExpressionType.Range = 'range';
ExpressionType.Floor = 'floor';
ExpressionType.Ceiling = 'ceiling';
ExpressionType.Round = 'round';
ExpressionType.Abs = 'abs';
ExpressionType.Sqrt = 'sqrt';
// Comparisons
ExpressionType.LessThan = '<';
ExpressionType.LessThanOrEqual = '<=';
ExpressionType.Equal = '==';
ExpressionType.NotEqual = '!=';
ExpressionType.GreaterThan = '>';
ExpressionType.GreaterThanOrEqual = '>=';
ExpressionType.Exists = 'exists';
ExpressionType.Contains = 'contains';
ExpressionType.Empty = 'empty';
// Logic
ExpressionType.And = '&&';
ExpressionType.Or = '||';
ExpressionType.Not = '!';
// String
ExpressionType.Concat = 'concat';
ExpressionType.Length = 'length';
ExpressionType.Replace = 'replace';
ExpressionType.ReplaceIgnoreCase = 'replaceIgnoreCase';
ExpressionType.Split = 'split';
ExpressionType.Substring = 'substring';
ExpressionType.ToLower = 'toLower';
ExpressionType.ToUpper = 'toUpper';
ExpressionType.Trim = 'trim';
ExpressionType.Join = 'join';
ExpressionType.EndsWith = 'endsWith';
ExpressionType.StartsWith = 'startsWith';
ExpressionType.CountWord = 'countWord';
ExpressionType.AddOrdinal = 'addOrdinal';
ExpressionType.NewGuid = 'newGuid';
ExpressionType.IndexOf = 'indexOf';
ExpressionType.LastIndexOf = 'lastIndexOf';
ExpressionType.EOL = 'EOL';
ExpressionType.SentenceCase = 'sentenceCase';
ExpressionType.TitleCase = 'titleCase';
// DateTime
ExpressionType.AddDays = 'addDays';
ExpressionType.AddHours = 'addHours';
ExpressionType.AddMinutes = 'addMinutes';
ExpressionType.AddSeconds = 'addSeconds';
ExpressionType.DayOfMonth = 'dayOfMonth';
ExpressionType.DayOfWeek = 'dayOfWeek';
ExpressionType.DayOfYear = 'dayOfYear';
ExpressionType.Month = 'month';
ExpressionType.Date = 'date';
ExpressionType.Year = 'year';
ExpressionType.UtcNow = 'utcNow';
ExpressionType.FormatDateTime = 'formatDateTime';
ExpressionType.FormatEpoch = 'formatEpoch';
ExpressionType.FormatTicks = 'formatTicks';
ExpressionType.SubtractFromTime = 'subtractFromTime';
ExpressionType.DateReadBack = 'dateReadBack';
ExpressionType.GetTimeOfDay = 'getTimeOfDay';
ExpressionType.GetFutureTime = 'getFutureTime';
ExpressionType.GetPastTime = 'getPastTime';
ExpressionType.ConvertFromUTC = 'convertFromUTC';
ExpressionType.ConvertToUTC = 'convertToUTC';
ExpressionType.AddToTime = 'addToTime';
ExpressionType.StartOfDay = 'startOfDay';
ExpressionType.StartOfHour = 'startOfHour';
ExpressionType.StartOfMonth = 'startOfMonth';
ExpressionType.Ticks = 'ticks';
ExpressionType.TicksToDays = 'ticksToDays';
ExpressionType.TicksToHours = 'ticksToHours';
ExpressionType.TicksToMinutes = 'ticksToMinutes';
ExpressionType.DateTimeDiff = 'dateTimeDiff';
// timex
ExpressionType.IsDefinite = 'isDefinite';
ExpressionType.IsTime = 'isTime';
ExpressionType.IsDuration = 'isDuration';
ExpressionType.IsDate = 'isDate';
ExpressionType.IsTimeRange = 'isTimeRange';
ExpressionType.IsDateRange = 'isDateRange';
ExpressionType.IsPresent = 'isPresent';
ExpressionType.GetNextViableDate = 'getNextViableDate';
ExpressionType.GetPreviousViableDate = 'getPreviousViableDate';
ExpressionType.GetNextViableTime = 'getNextViableTime';
ExpressionType.GetPreviousViableTime = 'getPreviousViableTime';
ExpressionType.TimexResolve = 'resolve';
// Conversions
ExpressionType.Float = 'float';
ExpressionType.Int = 'int';
ExpressionType.String = 'string';
ExpressionType.Bool = 'bool';
ExpressionType.Binary = 'binary';
ExpressionType.Base64 = 'base64';
ExpressionType.Base64ToBinary = 'base64ToBinary';
ExpressionType.Base64ToString = 'base64ToString';
ExpressionType.DataUri = 'dataUri';
ExpressionType.DataUriToBinary = 'dataUriToBinary';
ExpressionType.DataUriToString = 'dataUriToString';
ExpressionType.UriComponent = 'uriComponent';
ExpressionType.UriComponentToString = 'uriComponentToString';
ExpressionType.FormatNumber = 'formatNumber';
ExpressionType.JsonStringify = 'jsonStringify';
// Memory
ExpressionType.Accessor = 'Accessor';
ExpressionType.Element = 'Element';
ExpressionType.CreateArray = 'createArray';
// Collection
ExpressionType.First = 'first';
ExpressionType.Last = 'last';
ExpressionType.Foreach = 'foreach';
ExpressionType.Select = 'select';
ExpressionType.Where = 'where';
ExpressionType.Union = 'union';
ExpressionType.Intersection = 'intersection';
ExpressionType.Skip = 'skip';
ExpressionType.Take = 'take';
ExpressionType.FilterNotEqual = 'filterNotEqual';
ExpressionType.SubArray = 'subArray';
ExpressionType.SortBy = 'sortBy';
ExpressionType.SortByDescending = 'sortByDescending';
ExpressionType.IndicesAndValues = 'indicesAndValues';
ExpressionType.Flatten = 'flatten';
ExpressionType.Unique = 'unique';
ExpressionType.Reverse = 'reverse';
ExpressionType.Any = 'any';
ExpressionType.All = 'all';
// Misc
ExpressionType.Constant = 'Constant';
ExpressionType.Lambda = 'Lambda';
ExpressionType.If = 'if';
ExpressionType.Rand = 'rand';
// Object manipulation and construction functions
ExpressionType.Json = 'json';
ExpressionType.AddProperty = 'addProperty';
ExpressionType.RemoveProperty = 'removeProperty';
ExpressionType.SetProperty = 'setProperty';
ExpressionType.GetProperty = 'getProperty';
ExpressionType.Coalesce = 'coalesce';
ExpressionType.JPath = 'jPath';
ExpressionType.SetPathToValue = 'setPathToValue';
ExpressionType.Merge = 'merge';
ExpressionType.XML = 'xml';
ExpressionType.XPath = 'xPath';
// URI parsing functions
ExpressionType.UriHost = 'uriHost';
ExpressionType.UriPath = 'uriPath';
ExpressionType.UriPathAndQuery = 'uriPathAndQuery';
ExpressionType.UriPort = 'uriPort';
ExpressionType.UriQuery = 'uriQuery';
ExpressionType.UriScheme = 'uriScheme';
// Regar expression
ExpressionType.IsMatch = 'isMatch';
//Type Checking
ExpressionType.IsString = 'isString';
ExpressionType.IsInteger = 'isInteger';
ExpressionType.IsArray = 'isArray';
ExpressionType.IsObject = 'isObject';
ExpressionType.IsFloat = 'isFloat';
ExpressionType.IsDateTime = 'isDateTime';
ExpressionType.IsBoolean = 'isBoolean';
// StringOrValue
ExpressionType.StringOrValue = 'stringOrValue';
ExpressionType.Ignore = 'ignore';
ExpressionType.Optional = 'optional';
exports.ExpressionType = ExpressionType;
//# sourceMappingURL=expressionType.js.map