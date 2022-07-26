(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("microsoftTeams", [], factory);
	else if(typeof exports === 'object')
		exports["microsoftTeams"] = factory();
	else
		root["microsoftTeams"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 19);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMessageEventToChild = exports.waitForMessageQueue = exports.sendMessageToParent = exports.uninitializeCommunication = exports.initializeCommunication = exports.Communication = void 0;
/* eslint-disable @typescript-eslint/ban-types */
var constants_1 = __webpack_require__(4);
var globalVars_1 = __webpack_require__(7);
var handlers_1 = __webpack_require__(3);
var Communication = /** @class */ (function () {
    function Communication() {
    }
    return Communication;
}());
exports.Communication = Communication;
var CommunicationPrivate = /** @class */ (function () {
    function CommunicationPrivate() {
    }
    CommunicationPrivate.parentMessageQueue = [];
    CommunicationPrivate.childMessageQueue = [];
    CommunicationPrivate.nextMessageId = 0;
    CommunicationPrivate.callbacks = {};
    return CommunicationPrivate;
}());
function initializeCommunication(callback, validMessageOrigins) {
    // Listen for messages post to our window
    CommunicationPrivate.messageListener = function (evt) { return processMessage(evt); };
    // If we are in an iframe, our parent window is the one hosting us (i.e., window.parent); otherwise,
    // it's the window that opened us (i.e., window.opener)
    Communication.currentWindow = Communication.currentWindow || window;
    Communication.parentWindow =
        Communication.currentWindow.parent !== Communication.currentWindow.self
            ? Communication.currentWindow.parent
            : Communication.currentWindow.opener;
    // Listen to messages from the parent or child frame.
    // Frameless windows will only receive this event from child frames and if validMessageOrigins is passed.
    if (Communication.parentWindow || validMessageOrigins) {
        Communication.currentWindow.addEventListener('message', CommunicationPrivate.messageListener, false);
    }
    if (!Communication.parentWindow) {
        globalVars_1.GlobalVars.isFramelessWindow = true;
        /* eslint-disable  @typescript-eslint/ban-ts-comment */
        // @ts-ignore: window as ExtendedWindow
        window.onNativeMessage = handleParentMessage;
    }
    try {
        // Send the initialized message to any origin, because at this point we most likely don't know the origin
        // of the parent window, and this message contains no data that could pose a security risk.
        Communication.parentOrigin = '*';
        sendMessageToParent('initialize', [constants_1.version], callback);
    }
    finally {
        Communication.parentOrigin = null;
    }
}
exports.initializeCommunication = initializeCommunication;
function uninitializeCommunication() {
    Communication.currentWindow.removeEventListener('message', CommunicationPrivate.messageListener, false);
    Communication.parentWindow = null;
    Communication.parentOrigin = null;
    Communication.childWindow = null;
    Communication.childOrigin = null;
    CommunicationPrivate.parentMessageQueue = [];
    CommunicationPrivate.childMessageQueue = [];
    CommunicationPrivate.nextMessageId = 0;
    CommunicationPrivate.callbacks = {};
}
exports.uninitializeCommunication = uninitializeCommunication;
function sendMessageToParent(actionName, argsOrCallback, callback) {
    var args;
    if (argsOrCallback instanceof Function) {
        callback = argsOrCallback;
    }
    else if (argsOrCallback instanceof Array) {
        args = argsOrCallback;
    }
    var targetWindow = Communication.parentWindow;
    var request = createMessageRequest(actionName, args);
    if (globalVars_1.GlobalVars.isFramelessWindow) {
        if (Communication.currentWindow && Communication.currentWindow.nativeInterface) {
            Communication.currentWindow.nativeInterface.framelessPostMessage(JSON.stringify(request));
        }
    }
    else {
        var targetOrigin = getTargetOrigin(targetWindow);
        // If the target window isn't closed and we already know its origin, send the message right away; otherwise,
        // queue the message and send it after the origin is established
        if (targetWindow && targetOrigin) {
            targetWindow.postMessage(request, targetOrigin);
        }
        else {
            getTargetMessageQueue(targetWindow).push(request);
        }
    }
    if (callback) {
        CommunicationPrivate.callbacks[request.id] = callback;
    }
}
exports.sendMessageToParent = sendMessageToParent;
function processMessage(evt) {
    // Process only if we received a valid message
    if (!evt || !evt.data || typeof evt.data !== 'object') {
        return;
    }
    // Process only if the message is coming from a different window and a valid origin
    // valid origins are either a pre-known
    var messageSource = evt.source || (evt.originalEvent && evt.originalEvent.source);
    var messageOrigin = evt.origin || (evt.originalEvent && evt.originalEvent.origin);
    if (!shouldProcessMessage(messageSource, messageOrigin)) {
        return;
    }
    // Update our parent and child relationships based on this message
    updateRelationships(messageSource, messageOrigin);
    // Handle the message
    if (messageSource === Communication.parentWindow) {
        handleParentMessage(evt);
    }
    else if (messageSource === Communication.childWindow) {
        handleChildMessage(evt);
    }
}
/**
 * Validates the message source and origin, if it should be processed
 */
function shouldProcessMessage(messageSource, messageOrigin) {
    // Process if message source is a different window and if origin is either in
    // Teams' pre-known whitelist or supplied as valid origin by user during initialization
    if (Communication.currentWindow && messageSource === Communication.currentWindow) {
        return false;
    }
    else if (Communication.currentWindow &&
        Communication.currentWindow.location &&
        messageOrigin &&
        messageOrigin === Communication.currentWindow.location.origin) {
        return true;
    }
    else if (constants_1.validOriginRegExp.test(messageOrigin.toLowerCase()) ||
        (globalVars_1.GlobalVars.additionalValidOriginsRegexp &&
            globalVars_1.GlobalVars.additionalValidOriginsRegexp.test(messageOrigin.toLowerCase()))) {
        return true;
    }
    return false;
}
function updateRelationships(messageSource, messageOrigin) {
    // Determine whether the source of the message is our parent or child and update our
    // window and origin pointer accordingly
    // For frameless windows (i.e mobile), there is no parent frame, so the message must be from the child.
    if (!globalVars_1.GlobalVars.isFramelessWindow &&
        (!Communication.parentWindow || Communication.parentWindow.closed || messageSource === Communication.parentWindow)) {
        Communication.parentWindow = messageSource;
        Communication.parentOrigin = messageOrigin;
    }
    else if (!Communication.childWindow ||
        Communication.childWindow.closed ||
        messageSource === Communication.childWindow) {
        Communication.childWindow = messageSource;
        Communication.childOrigin = messageOrigin;
    }
    // Clean up pointers to closed parent and child windows
    if (Communication.parentWindow && Communication.parentWindow.closed) {
        Communication.parentWindow = null;
        Communication.parentOrigin = null;
    }
    if (Communication.childWindow && Communication.childWindow.closed) {
        Communication.childWindow = null;
        Communication.childOrigin = null;
    }
    // If we have any messages in our queue, send them now
    flushMessageQueue(Communication.parentWindow);
    flushMessageQueue(Communication.childWindow);
}
function handleParentMessage(evt) {
    if ('id' in evt.data && typeof evt.data.id === 'number') {
        // Call any associated Communication.callbacks
        var message = evt.data;
        var callback = CommunicationPrivate.callbacks[message.id];
        if (callback) {
            callback.apply(null, __spreadArray(__spreadArray([], message.args, true), [message.isPartialResponse], false));
            // Remove the callback to ensure that the callback is called only once and to free up memory if response is a complete response
            if (!isPartialResponse(evt)) {
                delete CommunicationPrivate.callbacks[message.id];
            }
        }
    }
    else if ('func' in evt.data && typeof evt.data.func === 'string') {
        // Delegate the request to the proper handler
        var message = evt.data;
        (0, handlers_1.callHandler)(message.func, message.args);
    }
}
function isPartialResponse(evt) {
    return evt.data.isPartialResponse === true;
}
function handleChildMessage(evt) {
    if ('id' in evt.data && 'func' in evt.data) {
        // Try to delegate the request to the proper handler, if defined
        var message_1 = evt.data;
        var _a = (0, handlers_1.callHandler)(message_1.func, message_1.args), called = _a[0], result = _a[1];
        if (called && typeof result !== 'undefined') {
            sendMessageResponseToChild(message_1.id, Array.isArray(result) ? result : [result]);
        }
        else {
            // No handler, proxy to parent
            // tslint:disable-next-line:no-any
            sendMessageToParent(message_1.func, message_1.args, function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                if (Communication.childWindow) {
                    var isPartialResponse_1 = args.pop();
                    sendMessageResponseToChild(message_1.id, args, isPartialResponse_1);
                }
            });
        }
    }
}
function getTargetMessageQueue(targetWindow) {
    return targetWindow === Communication.parentWindow
        ? CommunicationPrivate.parentMessageQueue
        : targetWindow === Communication.childWindow
            ? CommunicationPrivate.childMessageQueue
            : [];
}
function getTargetOrigin(targetWindow) {
    return targetWindow === Communication.parentWindow
        ? Communication.parentOrigin
        : targetWindow === Communication.childWindow
            ? Communication.childOrigin
            : null;
}
function flushMessageQueue(targetWindow) {
    var targetOrigin = getTargetOrigin(targetWindow);
    var targetMessageQueue = getTargetMessageQueue(targetWindow);
    while (targetWindow && targetOrigin && targetMessageQueue.length > 0) {
        targetWindow.postMessage(targetMessageQueue.shift(), targetOrigin);
    }
}
function waitForMessageQueue(targetWindow, callback) {
    var messageQueueMonitor = Communication.currentWindow.setInterval(function () {
        if (getTargetMessageQueue(targetWindow).length === 0) {
            clearInterval(messageQueueMonitor);
            callback();
        }
    }, 100);
}
exports.waitForMessageQueue = waitForMessageQueue;
/**
 * Send a response to child for a message request that was from child
 */
function sendMessageResponseToChild(id, 
// tslint:disable-next-line:no-any
args, isPartialResponse) {
    var targetWindow = Communication.childWindow;
    var response = createMessageResponse(id, args, isPartialResponse);
    var targetOrigin = getTargetOrigin(targetWindow);
    if (targetWindow && targetOrigin) {
        targetWindow.postMessage(response, targetOrigin);
    }
}
/**
 * Send a custom message object that can be sent to child window,
 * instead of a response message to a child
 */
function sendMessageEventToChild(actionName, 
// tslint:disable-next-line: no-any
args) {
    var targetWindow = Communication.childWindow;
    var customEvent = createMessageEvent(actionName, args);
    var targetOrigin = getTargetOrigin(targetWindow);
    // If the target window isn't closed and we already know its origin, send the message right away; otherwise,
    // queue the message and send it after the origin is established
    if (targetWindow && targetOrigin) {
        targetWindow.postMessage(customEvent, targetOrigin);
    }
    else {
        getTargetMessageQueue(targetWindow).push(customEvent);
    }
}
exports.sendMessageEventToChild = sendMessageEventToChild;
// tslint:disable-next-line:no-any
function createMessageRequest(func, args) {
    return {
        id: CommunicationPrivate.nextMessageId++,
        func: func,
        timestamp: Date.now(),
        args: args || [],
    };
}
// tslint:disable-next-line:no-any
function createMessageResponse(id, args, isPartialResponse) {
    return {
        id: id,
        args: args || [],
        isPartialResponse: isPartialResponse,
    };
}
/**
 * Creates a message object without any id, used for custom actions being sent to child frame/window
 */
// tslint:disable-next-line:no-any
function createMessageEvent(func, args) {
    return {
        func: func,
        args: args || [],
    };
}


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.processAdditionalValidOrigins = exports.isApiSupportedOnMobile = exports.isHostClientMobile = exports.isAPISupportedByPlatform = exports.ensureInitialized = void 0;
var constants_1 = __webpack_require__(2);
var interfaces_1 = __webpack_require__(6);
var constants_2 = __webpack_require__(4);
var globalVars_1 = __webpack_require__(7);
var utils_1 = __webpack_require__(5);
function ensureInitialized() {
    var expectedFrameContexts = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        expectedFrameContexts[_i] = arguments[_i];
    }
    if (!globalVars_1.GlobalVars.initializeCalled) {
        throw new Error('The library has not yet been initialized');
    }
    if (globalVars_1.GlobalVars.frameContext && expectedFrameContexts && expectedFrameContexts.length > 0) {
        var found = false;
        for (var i = 0; i < expectedFrameContexts.length; i++) {
            if (expectedFrameContexts[i] === globalVars_1.GlobalVars.frameContext) {
                found = true;
                break;
            }
        }
        if (!found) {
            throw new Error("This call is not allowed in the '" + globalVars_1.GlobalVars.frameContext + "' context");
        }
    }
}
exports.ensureInitialized = ensureInitialized;
/**
 * Checks whether the platform has knowledge of this API by doing a comparison
 * on API required version and platform supported version of the SDK
 * @param requiredVersion SDK version required by the API
 */
function isAPISupportedByPlatform(requiredVersion) {
    if (requiredVersion === void 0) { requiredVersion = constants_2.defaultSDKVersionForCompatCheck; }
    var value = (0, utils_1.compareSDKVersions)(globalVars_1.GlobalVars.clientSupportedSDKVersion, requiredVersion);
    if (isNaN(value)) {
        return false;
    }
    return value >= 0;
}
exports.isAPISupportedByPlatform = isAPISupportedByPlatform;
/**
 * Helper function to identify if host client is either android or ios
 */
function isHostClientMobile() {
    return globalVars_1.GlobalVars.hostClientType == constants_1.HostClientType.android || globalVars_1.GlobalVars.hostClientType == constants_1.HostClientType.ios;
}
exports.isHostClientMobile = isHostClientMobile;
/**
 * Helper function which indicates if current API is supported on mobile or not.
 * @returns SdkError if host client is not android/ios or if the requiredVersion is not
 *          supported by platform or not. Null is returned in case of success.
 */
function isApiSupportedOnMobile(requiredVersion) {
    if (requiredVersion === void 0) { requiredVersion = constants_2.defaultSDKVersionForCompatCheck; }
    if (!isHostClientMobile()) {
        var notSupportedError = { errorCode: interfaces_1.ErrorCode.NOT_SUPPORTED_ON_PLATFORM };
        return notSupportedError;
    }
    else if (!isAPISupportedByPlatform(requiredVersion)) {
        var oldPlatformError = { errorCode: interfaces_1.ErrorCode.OLD_PLATFORM };
        return oldPlatformError;
    }
    return null;
}
exports.isApiSupportedOnMobile = isApiSupportedOnMobile;
/**
 * Processes the valid origins specifuied by the user, de-duplicates and converts them into a regexp
 * which is used later for message source/origin validation
 */
function processAdditionalValidOrigins(validMessageOrigins) {
    var combinedOriginUrls = globalVars_1.GlobalVars.additionalValidOrigins.concat(validMessageOrigins.filter(function (_origin) {
        return typeof _origin === 'string' && constants_2.userOriginUrlValidationRegExp.test(_origin);
    }));
    var dedupUrls = {};
    combinedOriginUrls = combinedOriginUrls.filter(function (_originUrl) {
        if (dedupUrls[_originUrl]) {
            return false;
        }
        dedupUrls[_originUrl] = true;
        return true;
    });
    globalVars_1.GlobalVars.additionalValidOrigins = combinedOriginUrls;
    if (globalVars_1.GlobalVars.additionalValidOrigins.length > 0) {
        globalVars_1.GlobalVars.additionalValidOriginsRegexp = (0, utils_1.generateRegExpFromUrls)(globalVars_1.GlobalVars.additionalValidOrigins);
    }
    else {
        globalVars_1.GlobalVars.additionalValidOriginsRegexp = null;
    }
}
exports.processAdditionalValidOrigins = processAdditionalValidOrigins;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.ChannelType = exports.TaskModuleDimension = exports.UserTeamRole = exports.TeamType = exports.FrameContexts = exports.HostClientType = void 0;
var HostClientType;
(function (HostClientType) {
    HostClientType["desktop"] = "desktop";
    HostClientType["web"] = "web";
    HostClientType["android"] = "android";
    HostClientType["ios"] = "ios";
    HostClientType["ipados"] = "ipados";
    /**
     * @deprecated Use teamsRoomsWindows instead.
     */
    HostClientType["rigel"] = "rigel";
    HostClientType["surfaceHub"] = "surfaceHub";
    HostClientType["teamsRoomsWindows"] = "teamsRoomsWindows";
    HostClientType["teamsRoomsAndroid"] = "teamsRoomsAndroid";
    HostClientType["teamsPhones"] = "teamsPhones";
    HostClientType["teamsDisplays"] = "teamsDisplays";
})(HostClientType = exports.HostClientType || (exports.HostClientType = {}));
// Ensure these declarations stay in sync with the framework.
var FrameContexts;
(function (FrameContexts) {
    FrameContexts["settings"] = "settings";
    FrameContexts["content"] = "content";
    FrameContexts["authentication"] = "authentication";
    FrameContexts["remove"] = "remove";
    FrameContexts["task"] = "task";
    FrameContexts["sidePanel"] = "sidePanel";
    FrameContexts["stage"] = "stage";
    FrameContexts["meetingStage"] = "meetingStage";
})(FrameContexts = exports.FrameContexts || (exports.FrameContexts = {}));
/**
 * Indicates the team type, currently used to distinguish between different team
 * types in Office 365 for Education (team types 1, 2, 3, and 4).
 */
var TeamType;
(function (TeamType) {
    TeamType[TeamType["Standard"] = 0] = "Standard";
    TeamType[TeamType["Edu"] = 1] = "Edu";
    TeamType[TeamType["Class"] = 2] = "Class";
    TeamType[TeamType["Plc"] = 3] = "Plc";
    TeamType[TeamType["Staff"] = 4] = "Staff";
})(TeamType = exports.TeamType || (exports.TeamType = {}));
/**
 * Indicates the various types of roles of a user in a team.
 */
var UserTeamRole;
(function (UserTeamRole) {
    UserTeamRole[UserTeamRole["Admin"] = 0] = "Admin";
    UserTeamRole[UserTeamRole["User"] = 1] = "User";
    UserTeamRole[UserTeamRole["Guest"] = 2] = "Guest";
})(UserTeamRole = exports.UserTeamRole || (exports.UserTeamRole = {}));
/**
 * Task module dimension enum
 */
var TaskModuleDimension;
(function (TaskModuleDimension) {
    TaskModuleDimension["Large"] = "large";
    TaskModuleDimension["Medium"] = "medium";
    TaskModuleDimension["Small"] = "small";
})(TaskModuleDimension = exports.TaskModuleDimension || (exports.TaskModuleDimension = {}));
/**
 * The type of the channel with which the content is associated.
 */
var ChannelType;
(function (ChannelType) {
    ChannelType["Regular"] = "Regular";
    ChannelType["Private"] = "Private";
    ChannelType["Shared"] = "Shared";
})(ChannelType = exports.ChannelType || (exports.ChannelType = {}));


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerBeforeUnloadHandler = exports.registerOnLoadHandler = exports.registerFocusEnterHandler = exports.registerBackButtonHandler = exports.handleThemeChange = exports.registerOnThemeChangeHandler = exports.removeHandler = exports.registerHandler = exports.callHandler = exports.initializeHandlers = void 0;
/* eslint-disable @typescript-eslint/ban-types */
var public_1 = __webpack_require__(8);
var communication_1 = __webpack_require__(0);
var HandlersPrivate = /** @class */ (function () {
    function HandlersPrivate() {
    }
    HandlersPrivate.handlers = {};
    return HandlersPrivate;
}());
function initializeHandlers() {
    // ::::::::::::::::::::MicrosoftTeams SDK Internal :::::::::::::::::
    HandlersPrivate.handlers['themeChange'] = handleThemeChange;
    HandlersPrivate.handlers['backButtonPress'] = handleBackButtonPress;
    HandlersPrivate.handlers['load'] = handleLoad;
    HandlersPrivate.handlers['beforeUnload'] = handleBeforeUnload;
    HandlersPrivate.handlers['focusEnter'] = handleFocusEnter;
}
exports.initializeHandlers = initializeHandlers;
function callHandler(name, args) {
    var handler = HandlersPrivate.handlers[name];
    if (handler) {
        var result = handler.apply(this, args);
        return [true, result];
    }
    else {
        return [false, undefined];
    }
}
exports.callHandler = callHandler;
function registerHandler(name, handler, sendMessage, args) {
    if (sendMessage === void 0) { sendMessage = true; }
    if (args === void 0) { args = []; }
    if (handler) {
        HandlersPrivate.handlers[name] = handler;
        sendMessage && (0, communication_1.sendMessageToParent)('registerHandler', __spreadArray([name], args, true));
    }
    else {
        delete HandlersPrivate.handlers[name];
    }
}
exports.registerHandler = registerHandler;
function removeHandler(name) {
    delete HandlersPrivate.handlers[name];
}
exports.removeHandler = removeHandler;
function registerOnThemeChangeHandler(handler) {
    HandlersPrivate.themeChangeHandler = handler;
    handler && (0, communication_1.sendMessageToParent)('registerHandler', ['themeChange']);
}
exports.registerOnThemeChangeHandler = registerOnThemeChangeHandler;
function handleThemeChange(theme) {
    if (HandlersPrivate.themeChangeHandler) {
        HandlersPrivate.themeChangeHandler(theme);
    }
    if (communication_1.Communication.childWindow) {
        (0, communication_1.sendMessageEventToChild)('themeChange', [theme]);
    }
}
exports.handleThemeChange = handleThemeChange;
function registerBackButtonHandler(handler) {
    HandlersPrivate.backButtonPressHandler = handler;
    handler && (0, communication_1.sendMessageToParent)('registerHandler', ['backButton']);
}
exports.registerBackButtonHandler = registerBackButtonHandler;
function handleBackButtonPress() {
    if (!HandlersPrivate.backButtonPressHandler || !HandlersPrivate.backButtonPressHandler()) {
        (0, public_1.navigateBack)();
    }
}
function registerFocusEnterHandler(handler) {
    HandlersPrivate.focusEnterHandler = handler;
    handler && (0, communication_1.sendMessageToParent)('registerHandler', ['focusEnter']);
}
exports.registerFocusEnterHandler = registerFocusEnterHandler;
function handleFocusEnter(navigateForward) {
    if (HandlersPrivate.focusEnterHandler) {
        HandlersPrivate.focusEnterHandler(navigateForward);
    }
}
function registerOnLoadHandler(handler) {
    HandlersPrivate.loadHandler = handler;
    handler && (0, communication_1.sendMessageToParent)('registerHandler', ['load']);
}
exports.registerOnLoadHandler = registerOnLoadHandler;
function handleLoad(context) {
    if (HandlersPrivate.loadHandler) {
        HandlersPrivate.loadHandler(context);
    }
    if (communication_1.Communication.childWindow) {
        (0, communication_1.sendMessageEventToChild)('load', [context]);
    }
}
function registerBeforeUnloadHandler(handler) {
    HandlersPrivate.beforeUnloadHandler = handler;
    handler && (0, communication_1.sendMessageToParent)('registerHandler', ['beforeUnload']);
}
exports.registerBeforeUnloadHandler = registerBeforeUnloadHandler;
function handleBeforeUnload() {
    var readyToUnload = function () {
        (0, communication_1.sendMessageToParent)('readyToUnload', []);
    };
    if (!HandlersPrivate.beforeUnloadHandler || !HandlersPrivate.beforeUnloadHandler(readyToUnload)) {
        readyToUnload();
    }
}


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.userOriginUrlValidationRegExp = exports.validOriginRegExp = exports.validOrigins = exports.scanBarCodeAPIMobileSupportVersion = exports.getMediaCallbackSupportVersion = exports.mediaAPISupportVersion = exports.captureImageMobileSupportVersion = exports.peoplePickerRequiredVersion = exports.locationAPIsRequiredVersion = exports.getUserJoinedTeamsSupportedAndroidClientVersion = exports.imageOutputFormatsAPISupportVersion = exports.nonFullScreenVideoModeAPISupportVersion = exports.videoAndImageMediaAPISupportVersion = exports.defaultSDKVersionForCompatCheck = exports.version = void 0;
var utils_1 = __webpack_require__(5);
exports.version = '1.12.1';
/**
 * The client version when all SDK APIs started to check platform compatibility for the APIs was 1.6.0.
 * Modified to 2.0.1 which is hightest till now so that if any client doesn't pass version in initialize function, it will be set to highest.
 * Mobile clients are passing versions, hence will be applicable to web and desktop clients only.
 */
exports.defaultSDKVersionForCompatCheck = '2.0.1';
/**
 * This is the client version when selectMedia API - VideoAndImage is supported on mobile.
 */
exports.videoAndImageMediaAPISupportVersion = '2.0.2';
/**
 * This is the client version when selectMedia API - Video with non-full screen mode is supported on mobile.
 */
exports.nonFullScreenVideoModeAPISupportVersion = '2.0.3';
/**
 * This is the client version when selectMedia API - ImageOutputFormats is supported on mobile.
 */
exports.imageOutputFormatsAPISupportVersion = '2.0.4';
/**
 * Minimum required client supported version for {@link getUserJoinedTeams} to be supported on {@link HostClientType.android}
 */
exports.getUserJoinedTeamsSupportedAndroidClientVersion = '2.0.1';
/**
 * This is the client version when location APIs (getLocation and showLocation) are supported.
 */
exports.locationAPIsRequiredVersion = '1.9.0';
/**
 * This is the client version when people picker API is supported on mobile.
 */
exports.peoplePickerRequiredVersion = '2.0.0';
/**
 * This is the client version when captureImage API is supported on mobile.
 */
exports.captureImageMobileSupportVersion = '1.7.0';
/**
 * This is the client version when media APIs are supported on all three platforms ios, android and web.
 */
exports.mediaAPISupportVersion = '1.8.0';
/**
 * This is the client version when getMedia API is supported via Callbacks on all three platforms ios, android and web.
 */
exports.getMediaCallbackSupportVersion = '2.0.0';
/**
 * This is the client version when scanBarCode API is supported on mobile.
 */
exports.scanBarCodeAPIMobileSupportVersion = '1.9.0';
/**
 * List of supported Host origins
 */
exports.validOrigins = [
    'https://teams.microsoft.com',
    'https://teams.microsoft.us',
    'https://gov.teams.microsoft.us',
    'https://dod.teams.microsoft.us',
    'https://int.teams.microsoft.com',
    'https://teams.live.com',
    'https://devspaces.skype.com',
    'https://ssauth.skype.com',
    'https://local.teams.live.com',
    'https://local.teams.live.com:8080',
    'https://local.teams.office.com',
    'https://local.teams.office.com:8080',
    'https://msft.spoppe.com',
    'https://*.sharepoint.com',
    'https://*.sharepoint-df.com',
    'https://*.sharepointonline.com',
    'https://outlook.office.com',
    'https://outlook-sdf.office.com',
    'https://*.teams.microsoft.com',
    'https://www.office.com',
    'https://word.office.com',
    'https://excel.office.com',
    'https://powerpoint.office.com',
    'https://www.officeppe.com',
    'https://*.www.office.com',
];
exports.validOriginRegExp = (0, utils_1.generateRegExpFromUrls)(exports.validOrigins);
/**
 * USer specified message origins should satisfy this test
 */
exports.userOriginUrlValidationRegExp = /^https\:\/\//;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.generateGUID = exports.compareSDKVersions = exports.getGenericOnCompleteHandler = exports.generateRegExpFromUrls = void 0;
var uuid = __webpack_require__(22);
// This will return a reg expression a given url
function generateRegExpFromUrl(url) {
    var urlRegExpPart = '^';
    var urlParts = url.split('.');
    for (var j = 0; j < urlParts.length; j++) {
        urlRegExpPart += (j > 0 ? '[.]' : '') + urlParts[j].replace('*', '[^/^.]+');
    }
    urlRegExpPart += '$';
    return urlRegExpPart;
}
// This will return a reg expression for list of url
function generateRegExpFromUrls(urls) {
    var urlRegExp = '';
    for (var i = 0; i < urls.length; i++) {
        urlRegExp += (i === 0 ? '' : '|') + generateRegExpFromUrl(urls[i]);
    }
    return new RegExp(urlRegExp);
}
exports.generateRegExpFromUrls = generateRegExpFromUrls;
function getGenericOnCompleteHandler(errorMessage) {
    return function (success, reason) {
        if (!success) {
            throw new Error(errorMessage ? errorMessage : reason);
        }
    };
}
exports.getGenericOnCompleteHandler = getGenericOnCompleteHandler;
/**
 * Compares SDK versions.
 * @param v1 first version
 * @param v2 second version
 * returns NaN in case inputs are not in right format
 *         -1 if v1 < v2
 *          1 if v1 > v2
 *          0 otherwise
 * For example,
 *    compareSDKVersions('1.2', '1.2.0') returns 0
 *    compareSDKVersions('1.2a', '1.2b') returns NaN
 *    compareSDKVersions('1.2', '1.3') returns -1
 *    compareSDKVersions('2.0', '1.3.2') returns 1
 *    compareSDKVersions('2.0', 2.0) returns NaN
 */
function compareSDKVersions(v1, v2) {
    if (typeof v1 !== 'string' || typeof v2 !== 'string') {
        return NaN;
    }
    var v1parts = v1.split('.');
    var v2parts = v2.split('.');
    function isValidPart(x) {
        // input has to have one or more digits
        // For ex - returns true for '11', false for '1a1', false for 'a', false for '2b'
        return /^\d+$/.test(x);
    }
    if (!v1parts.every(isValidPart) || !v2parts.every(isValidPart)) {
        return NaN;
    }
    // Make length of both parts equal
    while (v1parts.length < v2parts.length) {
        v1parts.push('0');
    }
    while (v2parts.length < v1parts.length) {
        v2parts.push('0');
    }
    for (var i = 0; i < v1parts.length; ++i) {
        if (Number(v1parts[i]) == Number(v2parts[i])) {
            continue;
        }
        else if (Number(v1parts[i]) > Number(v2parts[i])) {
            return 1;
        }
        else {
            return -1;
        }
    }
    return 0;
}
exports.compareSDKVersions = compareSDKVersions;
/**
 * Generates a GUID
 */
function generateGUID() {
    return uuid.v4();
}
exports.generateGUID = generateGUID;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorCode = exports.FileOpenPreference = void 0;
/**
 * Allowed user file open preferences
 */
var FileOpenPreference;
(function (FileOpenPreference) {
    FileOpenPreference["Inline"] = "inline";
    FileOpenPreference["Desktop"] = "desktop";
    FileOpenPreference["Web"] = "web";
})(FileOpenPreference = exports.FileOpenPreference || (exports.FileOpenPreference = {}));
var ErrorCode;
(function (ErrorCode) {
    /**
     * API not supported in the current platform.
     */
    ErrorCode[ErrorCode["NOT_SUPPORTED_ON_PLATFORM"] = 100] = "NOT_SUPPORTED_ON_PLATFORM";
    /**
     * Internal error encountered while performing the required operation.
     */
    ErrorCode[ErrorCode["INTERNAL_ERROR"] = 500] = "INTERNAL_ERROR";
    /**
     * API is not supported in the current context
     */
    ErrorCode[ErrorCode["NOT_SUPPORTED_IN_CURRENT_CONTEXT"] = 501] = "NOT_SUPPORTED_IN_CURRENT_CONTEXT";
    /**
    Permissions denied by user
    */
    ErrorCode[ErrorCode["PERMISSION_DENIED"] = 1000] = "PERMISSION_DENIED";
    /**
     * Network issue
     */
    ErrorCode[ErrorCode["NETWORK_ERROR"] = 2000] = "NETWORK_ERROR";
    /**
     * Underlying hardware doesn't support the capability
     */
    ErrorCode[ErrorCode["NO_HW_SUPPORT"] = 3000] = "NO_HW_SUPPORT";
    /**
     * One or more arguments are invalid
     */
    ErrorCode[ErrorCode["INVALID_ARGUMENTS"] = 4000] = "INVALID_ARGUMENTS";
    /**
     * User is not authorized for this operation
     */
    ErrorCode[ErrorCode["UNAUTHORIZED_USER_OPERATION"] = 5000] = "UNAUTHORIZED_USER_OPERATION";
    /**
     * Could not complete the operation due to insufficient resources
     */
    ErrorCode[ErrorCode["INSUFFICIENT_RESOURCES"] = 6000] = "INSUFFICIENT_RESOURCES";
    /**
     * Platform throttled the request because of API was invoked too frequently
     */
    ErrorCode[ErrorCode["THROTTLE"] = 7000] = "THROTTLE";
    /**
     * User aborted the operation
     */
    ErrorCode[ErrorCode["USER_ABORT"] = 8000] = "USER_ABORT";
    /**
     * Could not complete the operation in the given time interval
     */
    ErrorCode[ErrorCode["OPERATION_TIMED_OUT"] = 8001] = "OPERATION_TIMED_OUT";
    /**
     * Platform code is old and doesn't implement this API
     */
    ErrorCode[ErrorCode["OLD_PLATFORM"] = 9000] = "OLD_PLATFORM";
    /**
     * The file specified was not found on the given location
     */
    ErrorCode[ErrorCode["FILE_NOT_FOUND"] = 404] = "FILE_NOT_FOUND";
    /**
     * The return value is too big and has exceeded our size boundries
     */
    ErrorCode[ErrorCode["SIZE_EXCEEDED"] = 10000] = "SIZE_EXCEEDED";
})(ErrorCode = exports.ErrorCode || (exports.ErrorCode = {}));


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.GlobalVars = void 0;
var GlobalVars = /** @class */ (function () {
    function GlobalVars() {
    }
    GlobalVars.initializeCalled = false;
    GlobalVars.initializeCompleted = false;
    GlobalVars.additionalValidOrigins = [];
    GlobalVars.additionalValidOriginsRegexp = null;
    GlobalVars.initializeCallbacks = [];
    GlobalVars.isFramelessWindow = false;
    GlobalVars.printCapabilityEnabled = false;
    return GlobalVars;
}());
exports.GlobalVars = GlobalVars;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.stageView = exports.sharing = exports.video = exports.people = exports.monetization = exports.meeting = exports.location = exports.media = exports.menus = exports.ParentAppWindow = exports.ChildAppWindow = exports.tasks = exports.settings = exports.navigateToTab = exports.navigateCrossDomain = exports.navigateBack = exports.returnFocus = exports.shareDeepLink = exports.setFrameContext = exports.registerAppButtonHoverLeaveHandler = exports.registerAppButtonHoverEnterHandler = exports.registerAppButtonClickHandler = exports.registerOnThemeChangeHandler = exports.registerOnLoadHandler = exports.registerFullScreenHandler = exports.registerChangeSettingsHandler = exports.registerFocusEnterHandler = exports.registerBeforeUnloadHandler = exports.registerBackButtonHandler = exports.print = exports.initializeWithFrameContext = exports.initialize = exports.getTabInstances = exports.getMruTabInstances = exports.getContext = exports.executeDeepLink = exports.enablePrintCapability = exports.FileOpenPreference = exports.ErrorCode = exports.ChannelType = exports.UserTeamRole = exports.TeamType = exports.TaskModuleDimension = exports.HostClientType = exports.FrameContexts = exports.authentication = exports.appInitialization = void 0;
var appInitialization_1 = __webpack_require__(25);
Object.defineProperty(exports, "appInitialization", { enumerable: true, get: function () { return appInitialization_1.appInitialization; } });
var authentication_1 = __webpack_require__(11);
Object.defineProperty(exports, "authentication", { enumerable: true, get: function () { return authentication_1.authentication; } });
var constants_1 = __webpack_require__(2);
Object.defineProperty(exports, "FrameContexts", { enumerable: true, get: function () { return constants_1.FrameContexts; } });
Object.defineProperty(exports, "HostClientType", { enumerable: true, get: function () { return constants_1.HostClientType; } });
Object.defineProperty(exports, "TaskModuleDimension", { enumerable: true, get: function () { return constants_1.TaskModuleDimension; } });
Object.defineProperty(exports, "TeamType", { enumerable: true, get: function () { return constants_1.TeamType; } });
Object.defineProperty(exports, "UserTeamRole", { enumerable: true, get: function () { return constants_1.UserTeamRole; } });
Object.defineProperty(exports, "ChannelType", { enumerable: true, get: function () { return constants_1.ChannelType; } });
var interfaces_1 = __webpack_require__(6);
Object.defineProperty(exports, "ErrorCode", { enumerable: true, get: function () { return interfaces_1.ErrorCode; } });
Object.defineProperty(exports, "FileOpenPreference", { enumerable: true, get: function () { return interfaces_1.FileOpenPreference; } });
var publicAPIs_1 = __webpack_require__(26);
Object.defineProperty(exports, "enablePrintCapability", { enumerable: true, get: function () { return publicAPIs_1.enablePrintCapability; } });
Object.defineProperty(exports, "executeDeepLink", { enumerable: true, get: function () { return publicAPIs_1.executeDeepLink; } });
Object.defineProperty(exports, "getContext", { enumerable: true, get: function () { return publicAPIs_1.getContext; } });
Object.defineProperty(exports, "getMruTabInstances", { enumerable: true, get: function () { return publicAPIs_1.getMruTabInstances; } });
Object.defineProperty(exports, "getTabInstances", { enumerable: true, get: function () { return publicAPIs_1.getTabInstances; } });
Object.defineProperty(exports, "initialize", { enumerable: true, get: function () { return publicAPIs_1.initialize; } });
Object.defineProperty(exports, "initializeWithFrameContext", { enumerable: true, get: function () { return publicAPIs_1.initializeWithFrameContext; } });
Object.defineProperty(exports, "print", { enumerable: true, get: function () { return publicAPIs_1.print; } });
Object.defineProperty(exports, "registerBackButtonHandler", { enumerable: true, get: function () { return publicAPIs_1.registerBackButtonHandler; } });
Object.defineProperty(exports, "registerBeforeUnloadHandler", { enumerable: true, get: function () { return publicAPIs_1.registerBeforeUnloadHandler; } });
Object.defineProperty(exports, "registerFocusEnterHandler", { enumerable: true, get: function () { return publicAPIs_1.registerFocusEnterHandler; } });
Object.defineProperty(exports, "registerChangeSettingsHandler", { enumerable: true, get: function () { return publicAPIs_1.registerChangeSettingsHandler; } });
Object.defineProperty(exports, "registerFullScreenHandler", { enumerable: true, get: function () { return publicAPIs_1.registerFullScreenHandler; } });
Object.defineProperty(exports, "registerOnLoadHandler", { enumerable: true, get: function () { return publicAPIs_1.registerOnLoadHandler; } });
Object.defineProperty(exports, "registerOnThemeChangeHandler", { enumerable: true, get: function () { return publicAPIs_1.registerOnThemeChangeHandler; } });
Object.defineProperty(exports, "registerAppButtonClickHandler", { enumerable: true, get: function () { return publicAPIs_1.registerAppButtonClickHandler; } });
Object.defineProperty(exports, "registerAppButtonHoverEnterHandler", { enumerable: true, get: function () { return publicAPIs_1.registerAppButtonHoverEnterHandler; } });
Object.defineProperty(exports, "registerAppButtonHoverLeaveHandler", { enumerable: true, get: function () { return publicAPIs_1.registerAppButtonHoverLeaveHandler; } });
Object.defineProperty(exports, "setFrameContext", { enumerable: true, get: function () { return publicAPIs_1.setFrameContext; } });
Object.defineProperty(exports, "shareDeepLink", { enumerable: true, get: function () { return publicAPIs_1.shareDeepLink; } });
var navigation_1 = __webpack_require__(27);
Object.defineProperty(exports, "returnFocus", { enumerable: true, get: function () { return navigation_1.returnFocus; } });
Object.defineProperty(exports, "navigateBack", { enumerable: true, get: function () { return navigation_1.navigateBack; } });
Object.defineProperty(exports, "navigateCrossDomain", { enumerable: true, get: function () { return navigation_1.navigateCrossDomain; } });
Object.defineProperty(exports, "navigateToTab", { enumerable: true, get: function () { return navigation_1.navigateToTab; } });
var settings_1 = __webpack_require__(12);
Object.defineProperty(exports, "settings", { enumerable: true, get: function () { return settings_1.settings; } });
var tasks_1 = __webpack_require__(28);
Object.defineProperty(exports, "tasks", { enumerable: true, get: function () { return tasks_1.tasks; } });
var appWindow_1 = __webpack_require__(16);
Object.defineProperty(exports, "ChildAppWindow", { enumerable: true, get: function () { return appWindow_1.ChildAppWindow; } });
Object.defineProperty(exports, "ParentAppWindow", { enumerable: true, get: function () { return appWindow_1.ParentAppWindow; } });
var menus_1 = __webpack_require__(15);
Object.defineProperty(exports, "menus", { enumerable: true, get: function () { return menus_1.menus; } });
var media_1 = __webpack_require__(17);
Object.defineProperty(exports, "media", { enumerable: true, get: function () { return media_1.media; } });
var location_1 = __webpack_require__(29);
Object.defineProperty(exports, "location", { enumerable: true, get: function () { return location_1.location; } });
var meeting_1 = __webpack_require__(30);
Object.defineProperty(exports, "meeting", { enumerable: true, get: function () { return meeting_1.meeting; } });
var monetization_1 = __webpack_require__(31);
Object.defineProperty(exports, "monetization", { enumerable: true, get: function () { return monetization_1.monetization; } });
var people_1 = __webpack_require__(32);
Object.defineProperty(exports, "people", { enumerable: true, get: function () { return people_1.people; } });
var video_1 = __webpack_require__(33);
Object.defineProperty(exports, "video", { enumerable: true, get: function () { return video_1.video; } });
var sharing_1 = __webpack_require__(34);
Object.defineProperty(exports, "sharing", { enumerable: true, get: function () { return sharing_1.sharing; } });
var stageView_1 = __webpack_require__(35);
Object.defineProperty(exports, "stageView", { enumerable: true, get: function () { return stageView_1.stageView; } });


/***/ }),
/* 9 */
/***/ (function(module, exports) {

// Unique ID creation requires a high quality random # generator.  In the
// browser this is a little complicated due to unknown quality of Math.random()
// and inconsistent support for the `crypto` API.  We do the best we can via
// feature-detection

// getRandomValues needs to be invoked in a context where "this" is a Crypto
// implementation. Also, find the complete implementation of crypto on IE11.
var getRandomValues = (typeof(crypto) != 'undefined' && crypto.getRandomValues && crypto.getRandomValues.bind(crypto)) ||
                      (typeof(msCrypto) != 'undefined' && typeof window.msCrypto.getRandomValues == 'function' && msCrypto.getRandomValues.bind(msCrypto));

if (getRandomValues) {
  // WHATWG crypto RNG - http://wiki.whatwg.org/wiki/Crypto
  var rnds8 = new Uint8Array(16); // eslint-disable-line no-undef

  module.exports = function whatwgRNG() {
    getRandomValues(rnds8);
    return rnds8;
  };
} else {
  // Math.random()-based (RNG)
  //
  // If all else fails, use Math.random().  It's fast, but is of unspecified
  // quality.
  var rnds = new Array(16);

  module.exports = function mathRNG() {
    for (var i = 0, r; i < 16; i++) {
      if ((i & 0x03) === 0) r = Math.random() * 0x100000000;
      rnds[i] = r >>> ((i & 0x03) << 3) & 0xff;
    }

    return rnds;
  };
}


/***/ }),
/* 10 */
/***/ (function(module, exports) {

/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */
var byteToHex = [];
for (var i = 0; i < 256; ++i) {
  byteToHex[i] = (i + 0x100).toString(16).substr(1);
}

function bytesToUuid(buf, offset) {
  var i = offset || 0;
  var bth = byteToHex;
  // join used to fix memory issue caused by concatenation: https://bugs.chromium.org/p/v8/issues/detail?id=3175#c4
  return ([
    bth[buf[i++]], bth[buf[i++]],
    bth[buf[i++]], bth[buf[i++]], '-',
    bth[buf[i++]], bth[buf[i++]], '-',
    bth[buf[i++]], bth[buf[i++]], '-',
    bth[buf[i++]], bth[buf[i++]], '-',
    bth[buf[i++]], bth[buf[i++]],
    bth[buf[i++]], bth[buf[i++]],
    bth[buf[i++]], bth[buf[i++]]
  ]).join('');
}

module.exports = bytesToUuid;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.authentication = void 0;
var internalAPIs_1 = __webpack_require__(1);
var globalVars_1 = __webpack_require__(7);
var constants_1 = __webpack_require__(2);
var communication_1 = __webpack_require__(0);
var handlers_1 = __webpack_require__(3);
/**
 * Namespace to interact with the authentication-specific part of the SDK.
 * This object is used for starting or completing authentication flows.
 */
var authentication;
(function (authentication) {
    var authParams;
    var authWindowMonitor;
    function initialize() {
        (0, handlers_1.registerHandler)('authentication.authenticate.success', handleSuccess, false);
        (0, handlers_1.registerHandler)('authentication.authenticate.failure', handleFailure, false);
    }
    authentication.initialize = initialize;
    /**
     * Registers the authentication Communication.handlers
     * @param authenticateParameters A set of values that configure the authentication pop-up.
     */
    function registerAuthenticationHandlers(authenticateParameters) {
        authParams = authenticateParameters;
    }
    authentication.registerAuthenticationHandlers = registerAuthenticationHandlers;
    /**
     * Initiates an authentication request, which opens a new window with the specified settings.
     */
    function authenticate(authenticateParameters) {
        var authenticateParams = authenticateParameters !== undefined ? authenticateParameters : authParams;
        (0, internalAPIs_1.ensureInitialized)(constants_1.FrameContexts.content, constants_1.FrameContexts.sidePanel, constants_1.FrameContexts.settings, constants_1.FrameContexts.remove, constants_1.FrameContexts.task, constants_1.FrameContexts.stage, constants_1.FrameContexts.meetingStage);
        if (globalVars_1.GlobalVars.hostClientType === constants_1.HostClientType.desktop ||
            globalVars_1.GlobalVars.hostClientType === constants_1.HostClientType.android ||
            globalVars_1.GlobalVars.hostClientType === constants_1.HostClientType.ios ||
            globalVars_1.GlobalVars.hostClientType === constants_1.HostClientType.rigel ||
            globalVars_1.GlobalVars.hostClientType === constants_1.HostClientType.teamsRoomsWindows ||
            globalVars_1.GlobalVars.hostClientType === constants_1.HostClientType.teamsRoomsAndroid ||
            globalVars_1.GlobalVars.hostClientType === constants_1.HostClientType.teamsPhones ||
            globalVars_1.GlobalVars.hostClientType === constants_1.HostClientType.teamsDisplays) {
            // Convert any relative URLs into absolute URLs before sending them over to the parent window.
            var link = document.createElement('a');
            link.href = authenticateParams.url;
            // Ask the parent window to open an authentication window with the parameters provided by the caller.
            (0, communication_1.sendMessageToParent)('authentication.authenticate', [link.href, authenticateParams.width, authenticateParams.height, authenticateParams.isExternal], function (success, response) {
                if (success) {
                    authenticateParams.successCallback(response);
                }
                else {
                    authenticateParams.failureCallback(response);
                }
            });
        }
        else {
            // Open an authentication window with the parameters provided by the caller.
            openAuthenticationWindow(authenticateParams);
        }
    }
    authentication.authenticate = authenticate;
    /**
     * Requests an Azure AD token to be issued on behalf of the app. The token is acquired from the cache
     * if it is not expired. Otherwise a request is sent to Azure AD to obtain a new token.
     * @param authTokenRequest A set of values that configure the token request.
     */
    function getAuthToken(authTokenRequest) {
        (0, internalAPIs_1.ensureInitialized)();
        (0, communication_1.sendMessageToParent)('authentication.getAuthToken', [authTokenRequest.resources, authTokenRequest.claims, authTokenRequest.silent], function (success, result) {
            if (success) {
                authTokenRequest.successCallback(result);
            }
            else {
                authTokenRequest.failureCallback(result);
            }
        });
    }
    authentication.getAuthToken = getAuthToken;
    /**
     * @private
     * Hide from docs.
     * ------
     * Requests the decoded Azure AD user identity on behalf of the app.
     */
    function getUser(userRequest) {
        (0, internalAPIs_1.ensureInitialized)();
        (0, communication_1.sendMessageToParent)('authentication.getUser', function (success, result) {
            if (success) {
                userRequest.successCallback(result);
            }
            else {
                userRequest.failureCallback(result);
            }
        });
    }
    authentication.getUser = getUser;
    function closeAuthenticationWindow() {
        // Stop monitoring the authentication window
        stopAuthenticationWindowMonitor();
        // Try to close the authentication window and clear all properties associated with it
        try {
            if (communication_1.Communication.childWindow) {
                communication_1.Communication.childWindow.close();
            }
        }
        finally {
            communication_1.Communication.childWindow = null;
            communication_1.Communication.childOrigin = null;
        }
    }
    function openAuthenticationWindow(authenticateParameters) {
        authParams = authenticateParameters;
        // Close the previously opened window if we have one
        closeAuthenticationWindow();
        // Start with a sensible default size
        var width = authParams.width || 600;
        var height = authParams.height || 400;
        // Ensure that the new window is always smaller than our app's window so that it never fully covers up our app
        width = Math.min(width, communication_1.Communication.currentWindow.outerWidth - 400);
        height = Math.min(height, communication_1.Communication.currentWindow.outerHeight - 200);
        // Convert any relative URLs into absolute URLs before sending them over to the parent window
        var link = document.createElement('a');
        link.href = authParams.url.replace('{oauthRedirectMethod}', 'web');
        // We are running in the browser, so we need to center the new window ourselves
        var left = typeof communication_1.Communication.currentWindow.screenLeft !== 'undefined'
            ? communication_1.Communication.currentWindow.screenLeft
            : communication_1.Communication.currentWindow.screenX;
        var top = typeof communication_1.Communication.currentWindow.screenTop !== 'undefined'
            ? communication_1.Communication.currentWindow.screenTop
            : communication_1.Communication.currentWindow.screenY;
        left += communication_1.Communication.currentWindow.outerWidth / 2 - width / 2;
        top += communication_1.Communication.currentWindow.outerHeight / 2 - height / 2;
        // Open a child window with a desired set of standard browser features
        communication_1.Communication.childWindow = communication_1.Communication.currentWindow.open(link.href, '_blank', 'toolbar=no, location=yes, status=no, menubar=no, scrollbars=yes, top=' +
            top +
            ', left=' +
            left +
            ', width=' +
            width +
            ', height=' +
            height);
        if (communication_1.Communication.childWindow) {
            // Start monitoring the authentication window so that we can detect if it gets closed before the flow completes
            startAuthenticationWindowMonitor();
        }
        else {
            // If we failed to open the window, fail the authentication flow
            handleFailure('FailedToOpenWindow');
        }
    }
    function stopAuthenticationWindowMonitor() {
        if (authWindowMonitor) {
            clearInterval(authWindowMonitor);
            authWindowMonitor = 0;
        }
        (0, handlers_1.removeHandler)('initialize');
        (0, handlers_1.removeHandler)('navigateCrossDomain');
    }
    function startAuthenticationWindowMonitor() {
        // Stop the previous window monitor if one is running
        stopAuthenticationWindowMonitor();
        // Create an interval loop that
        // - Notifies the caller of failure if it detects that the authentication window is closed
        // - Keeps pinging the authentication window while it is open to re-establish
        //   contact with any pages along the authentication flow that need to communicate
        //   with us
        authWindowMonitor = communication_1.Communication.currentWindow.setInterval(function () {
            if (!communication_1.Communication.childWindow || communication_1.Communication.childWindow.closed) {
                handleFailure('CancelledByUser');
            }
            else {
                var savedChildOrigin = communication_1.Communication.childOrigin;
                try {
                    communication_1.Communication.childOrigin = '*';
                    (0, communication_1.sendMessageEventToChild)('ping');
                }
                finally {
                    communication_1.Communication.childOrigin = savedChildOrigin;
                }
            }
        }, 100);
        // Set up an initialize-message handler that gives the authentication window its frame context
        (0, handlers_1.registerHandler)('initialize', function () {
            return [constants_1.FrameContexts.authentication, globalVars_1.GlobalVars.hostClientType];
        });
        // Set up a navigateCrossDomain message handler that blocks cross-domain re-navigation attempts
        // in the authentication window. We could at some point choose to implement this method via a call to
        // authenticationWindow.location.href = url; however, we would first need to figure out how to
        // validate the URL against the tab's list of valid domains.
        (0, handlers_1.registerHandler)('navigateCrossDomain', function () {
            return false;
        });
    }
    /**
     * Notifies the frame that initiated this authentication request that the request was successful.
     * This function is usable only on the authentication window.
     * This call causes the authentication window to be closed.
     * @param result Specifies a result for the authentication. If specified, the frame that initiated the authentication pop-up receives this value in its callback.
     * @param callbackUrl Specifies the url to redirect back to if the client is Win32 Outlook.
     */
    function notifySuccess(result, callbackUrl) {
        redirectIfWin32Outlook(callbackUrl, 'result', result);
        (0, internalAPIs_1.ensureInitialized)(constants_1.FrameContexts.authentication);
        (0, communication_1.sendMessageToParent)('authentication.authenticate.success', [result]);
        // Wait for the message to be sent before closing the window
        (0, communication_1.waitForMessageQueue)(communication_1.Communication.parentWindow, function () { return setTimeout(function () { return communication_1.Communication.currentWindow.close(); }, 200); });
    }
    authentication.notifySuccess = notifySuccess;
    /**
     * Notifies the frame that initiated this authentication request that the request failed.
     * This function is usable only on the authentication window.
     * This call causes the authentication window to be closed.
     * @param result Specifies a result for the authentication. If specified, the frame that initiated the authentication pop-up receives this value in its callback.
     * @param callbackUrl Specifies the url to redirect back to if the client is Win32 Outlook.
     */
    function notifyFailure(reason, callbackUrl) {
        redirectIfWin32Outlook(callbackUrl, 'reason', reason);
        (0, internalAPIs_1.ensureInitialized)(constants_1.FrameContexts.authentication);
        (0, communication_1.sendMessageToParent)('authentication.authenticate.failure', [reason]);
        // Wait for the message to be sent before closing the window
        (0, communication_1.waitForMessageQueue)(communication_1.Communication.parentWindow, function () { return setTimeout(function () { return communication_1.Communication.currentWindow.close(); }, 200); });
    }
    authentication.notifyFailure = notifyFailure;
    function handleSuccess(result) {
        try {
            if (authParams && authParams.successCallback) {
                authParams.successCallback(result);
            }
        }
        finally {
            authParams = null;
            closeAuthenticationWindow();
        }
    }
    function handleFailure(reason) {
        try {
            if (authParams && authParams.failureCallback) {
                authParams.failureCallback(reason);
            }
        }
        finally {
            authParams = null;
            closeAuthenticationWindow();
        }
    }
    /**
     * Validates that the callbackUrl param is a valid connector url, appends the result/reason and authSuccess/authFailure as URL fragments and redirects the window
     * @param callbackUrl - the connectors url to redirect to
     * @param key - "result" in case of success and "reason" in case of failure
     * @param value - the value of the passed result/reason parameter
     */
    function redirectIfWin32Outlook(callbackUrl, key, value) {
        if (callbackUrl) {
            var link = document.createElement('a');
            link.href = decodeURIComponent(callbackUrl);
            if (link.host &&
                link.host !== window.location.host &&
                link.host === 'outlook.office.com' &&
                link.search.indexOf('client_type=Win32_Outlook') > -1) {
                if (key && key === 'result') {
                    if (value) {
                        link.href = updateUrlParameter(link.href, 'result', value);
                    }
                    communication_1.Communication.currentWindow.location.assign(updateUrlParameter(link.href, 'authSuccess', ''));
                }
                if (key && key === 'reason') {
                    if (value) {
                        link.href = updateUrlParameter(link.href, 'reason', value);
                    }
                    communication_1.Communication.currentWindow.location.assign(updateUrlParameter(link.href, 'authFailure', ''));
                }
            }
        }
    }
    /**
     * Appends either result or reason as a fragment to the 'callbackUrl'
     * @param uri - the url to modify
     * @param key - the fragment key
     * @param value - the fragment value
     */
    function updateUrlParameter(uri, key, value) {
        var i = uri.indexOf('#');
        var hash = i === -1 ? '#' : uri.substr(i);
        hash = hash + '&' + key + (value !== '' ? '=' + value : '');
        uri = i === -1 ? uri : uri.substr(0, i);
        return uri + hash;
    }
})(authentication = exports.authentication || (exports.authentication = {}));


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.settings = void 0;
var internalAPIs_1 = __webpack_require__(1);
var constants_1 = __webpack_require__(2);
var utils_1 = __webpack_require__(5);
var communication_1 = __webpack_require__(0);
var handlers_1 = __webpack_require__(3);
/**
 * Namespace to interact with the settings-specific part of the SDK.
 * This object is usable only on the settings frame.
 */
var settings;
(function (settings) {
    var saveHandler;
    var removeHandler;
    function initialize() {
        (0, handlers_1.registerHandler)('settings.save', handleSave, false);
        (0, handlers_1.registerHandler)('settings.remove', handleRemove, false);
    }
    settings.initialize = initialize;
    /**
     * Sets the validity state for the settings.
     * The initial value is false, so the user cannot save the settings until this is called with true.
     * @param validityState Indicates whether the save or remove button is enabled for the user.
     */
    function setValidityState(validityState) {
        (0, internalAPIs_1.ensureInitialized)(constants_1.FrameContexts.settings, constants_1.FrameContexts.remove);
        (0, communication_1.sendMessageToParent)('settings.setValidityState', [validityState]);
    }
    settings.setValidityState = setValidityState;
    /**
     * Gets the settings for the current instance.
     * @param callback The callback to invoke when the {@link Settings} object is retrieved.
     */
    function getSettings(callback) {
        (0, internalAPIs_1.ensureInitialized)(constants_1.FrameContexts.content, constants_1.FrameContexts.settings, constants_1.FrameContexts.remove, constants_1.FrameContexts.sidePanel);
        (0, communication_1.sendMessageToParent)('settings.getSettings', callback);
    }
    settings.getSettings = getSettings;
    /**
     * Sets the settings for the current instance.
     * This is an asynchronous operation; calls to getSettings are not guaranteed to reflect the changed state.
     * @param settings The desired settings for this instance.
     */
    function setSettings(instanceSettings, onComplete) {
        (0, internalAPIs_1.ensureInitialized)(constants_1.FrameContexts.content, constants_1.FrameContexts.settings, constants_1.FrameContexts.sidePanel);
        (0, communication_1.sendMessageToParent)('settings.setSettings', [instanceSettings], onComplete ? onComplete : (0, utils_1.getGenericOnCompleteHandler)());
    }
    settings.setSettings = setSettings;
    /**
     * Registers a handler for when the user attempts to save the settings. This handler should be used
     * to create or update the underlying resource powering the content.
     * The object passed to the handler must be used to notify whether to proceed with the save.
     * Only one handler can be registered at a time. A subsequent registration replaces an existing registration.
     * @param handler The handler to invoke when the user selects the save button.
     */
    function registerOnSaveHandler(handler) {
        (0, internalAPIs_1.ensureInitialized)(constants_1.FrameContexts.settings);
        saveHandler = handler;
        handler && (0, communication_1.sendMessageToParent)('registerHandler', ['save']);
    }
    settings.registerOnSaveHandler = registerOnSaveHandler;
    /**
     * Registers a handler for user attempts to remove content. This handler should be used
     * to remove the underlying resource powering the content.
     * The object passed to the handler must be used to indicate whether to proceed with the removal.
     * Only one handler may be registered at a time. Subsequent registrations will override the first.
     * @param handler The handler to invoke when the user selects the remove button.
     */
    function registerOnRemoveHandler(handler) {
        (0, internalAPIs_1.ensureInitialized)(constants_1.FrameContexts.remove, constants_1.FrameContexts.settings);
        removeHandler = handler;
        handler && (0, communication_1.sendMessageToParent)('registerHandler', ['remove']);
    }
    settings.registerOnRemoveHandler = registerOnRemoveHandler;
    function handleSave(result) {
        var saveEvent = new SaveEventImpl(result);
        if (saveHandler) {
            saveHandler(saveEvent);
        }
        else {
            // If no handler is registered, we assume success.
            saveEvent.notifySuccess();
        }
    }
    /**
     * @private
     * Hide from docs, since this class is not directly used.
     */
    var SaveEventImpl = /** @class */ (function () {
        function SaveEventImpl(result) {
            this.notified = false;
            this.result = result ? result : {};
        }
        SaveEventImpl.prototype.notifySuccess = function () {
            this.ensureNotNotified();
            (0, communication_1.sendMessageToParent)('settings.save.success');
            this.notified = true;
        };
        SaveEventImpl.prototype.notifyFailure = function (reason) {
            this.ensureNotNotified();
            (0, communication_1.sendMessageToParent)('settings.save.failure', [reason]);
            this.notified = true;
        };
        SaveEventImpl.prototype.ensureNotNotified = function () {
            if (this.notified) {
                throw new Error('The SaveEvent may only notify success or failure once.');
            }
        };
        return SaveEventImpl;
    }());
    function handleRemove() {
        var removeEvent = new RemoveEventImpl();
        if (removeHandler) {
            removeHandler(removeEvent);
        }
        else {
            // If no handler is registered, we assume success.
            removeEvent.notifySuccess();
        }
    }
    /**
     * @private
     * Hide from docs, since this class is not directly used.
     */
    var RemoveEventImpl = /** @class */ (function () {
        function RemoveEventImpl() {
            this.notified = false;
        }
        RemoveEventImpl.prototype.notifySuccess = function () {
            this.ensureNotNotified();
            (0, communication_1.sendMessageToParent)('settings.remove.success');
            this.notified = true;
        };
        RemoveEventImpl.prototype.notifyFailure = function (reason) {
            this.ensureNotNotified();
            (0, communication_1.sendMessageToParent)('settings.remove.failure', [reason]);
            this.notified = true;
        };
        RemoveEventImpl.prototype.ensureNotNotified = function () {
            if (this.notified) {
                throw new Error('The removeEvent may only notify success or failure once.');
            }
        };
        return RemoveEventImpl;
    }());
})(settings = exports.settings || (exports.settings = {}));


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.logs = void 0;
var internalAPIs_1 = __webpack_require__(1);
var communication_1 = __webpack_require__(0);
var handlers_1 = __webpack_require__(3);
/**
 * Namespace to interact with the logging part of the SDK.
 * This object is used to send the app logs on demand to the host client
 *
 * @private
 * Hide from docs
 */
var logs;
(function (logs) {
    /**
     * @private
     * Hide from docs
     * ------
     * Registers a handler for getting app log
     * @param handler The handler to invoke to get the app log
     */
    function registerGetLogHandler(handler) {
        (0, internalAPIs_1.ensureInitialized)();
        if (handler) {
            (0, handlers_1.registerHandler)('log.request', function () {
                var log = handler();
                (0, communication_1.sendMessageToParent)('log.receive', [log]);
            });
        }
        else {
            (0, handlers_1.removeHandler)('log.request');
        }
    }
    logs.registerGetLogHandler = registerGetLogHandler;
})(logs = exports.logs || (exports.logs = {}));


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUserSettingsChangeHandler = exports.getConfigSetting = exports.getChatMembers = exports.registerCustomHandler = exports.sendCustomEvent = exports.sendCustomMessage = exports.uploadCustomApp = exports.showNotification = exports.openFilePreview = exports.exitFullscreen = exports.enterFullscreen = exports.getUserJoinedTeams = exports.initializePrivateApis = void 0;
var internalAPIs_1 = __webpack_require__(1);
var constants_1 = __webpack_require__(2);
var utils_1 = __webpack_require__(5);
var communication_1 = __webpack_require__(0);
var handlers_1 = __webpack_require__(3);
var globalVars_1 = __webpack_require__(7);
var interfaces_1 = __webpack_require__(6);
var constants_2 = __webpack_require__(4);
function initializePrivateApis() {
    //Keeping this API for any future usage, wherein privateAPIs need to be initialized
}
exports.initializePrivateApis = initializePrivateApis;
/**
 * @private
 * Hide from docs
 * ------
 * Allows an app to retrieve information of all user joined teams
 * @param callback The callback to invoke when the {@link TeamInstanceParameters} object is retrieved.
 * @param teamInstanceParameters OPTIONAL Flags that specify whether to scope call to favorite teams
 */
function getUserJoinedTeams(callback, teamInstanceParameters) {
    (0, internalAPIs_1.ensureInitialized)();
    if ((globalVars_1.GlobalVars.hostClientType === constants_1.HostClientType.android ||
        globalVars_1.GlobalVars.hostClientType === constants_1.HostClientType.teamsRoomsAndroid ||
        globalVars_1.GlobalVars.hostClientType === constants_1.HostClientType.teamsPhones ||
        globalVars_1.GlobalVars.hostClientType === constants_1.HostClientType.teamsDisplays) &&
        !(0, internalAPIs_1.isAPISupportedByPlatform)(constants_2.getUserJoinedTeamsSupportedAndroidClientVersion)) {
        var oldPlatformError = { errorCode: interfaces_1.ErrorCode.OLD_PLATFORM };
        throw new Error(JSON.stringify(oldPlatformError));
    }
    (0, communication_1.sendMessageToParent)('getUserJoinedTeams', [teamInstanceParameters], callback);
}
exports.getUserJoinedTeams = getUserJoinedTeams;
/**
 * @private
 * Hide from docs
 * ------
 * Place the tab into full-screen mode.
 */
function enterFullscreen() {
    (0, internalAPIs_1.ensureInitialized)(constants_1.FrameContexts.content);
    (0, communication_1.sendMessageToParent)('enterFullscreen', []);
}
exports.enterFullscreen = enterFullscreen;
/**
 * @private
 * Hide from docs
 * ------
 * Reverts the tab into normal-screen mode.
 */
function exitFullscreen() {
    (0, internalAPIs_1.ensureInitialized)(constants_1.FrameContexts.content);
    (0, communication_1.sendMessageToParent)('exitFullscreen', []);
}
exports.exitFullscreen = exitFullscreen;
/**
 * @private
 * Hide from docs.
 * ------
 * Opens a client-friendly preview of the specified file.
 * @param file The file to preview.
 */
function openFilePreview(filePreviewParameters) {
    (0, internalAPIs_1.ensureInitialized)(constants_1.FrameContexts.content, constants_1.FrameContexts.task);
    var params = [
        filePreviewParameters.entityId,
        filePreviewParameters.title,
        filePreviewParameters.description,
        filePreviewParameters.type,
        filePreviewParameters.objectUrl,
        filePreviewParameters.downloadUrl,
        filePreviewParameters.webPreviewUrl,
        filePreviewParameters.webEditUrl,
        filePreviewParameters.baseUrl,
        filePreviewParameters.editFile,
        filePreviewParameters.subEntityId,
        filePreviewParameters.viewerAction,
        filePreviewParameters.fileOpenPreference,
        filePreviewParameters.conversationId,
    ];
    (0, communication_1.sendMessageToParent)('openFilePreview', params);
}
exports.openFilePreview = openFilePreview;
/**
 * @private
 * Hide from docs.
 * ------
 * display notification API.
 * @param message Notification message.
 * @param notificationType Notification type
 */
function showNotification(showNotificationParameters) {
    (0, internalAPIs_1.ensureInitialized)(constants_1.FrameContexts.content);
    var params = [showNotificationParameters.message, showNotificationParameters.notificationType];
    (0, communication_1.sendMessageToParent)('showNotification', params);
}
exports.showNotification = showNotification;
/**
 * @private
 * Hide from docs.
 * ------
 * Upload a custom App manifest directly to both team and personal scopes.
 * This method works just for the first party Apps.
 */
function uploadCustomApp(manifestBlob, onComplete) {
    (0, internalAPIs_1.ensureInitialized)();
    (0, communication_1.sendMessageToParent)('uploadCustomApp', [manifestBlob], onComplete ? onComplete : (0, utils_1.getGenericOnCompleteHandler)());
}
exports.uploadCustomApp = uploadCustomApp;
/**
 * @private
 * Internal use only
 * Sends a custom action MessageRequest to Teams or parent window
 * @param actionName Specifies name of the custom action to be sent
 * @param args Specifies additional arguments passed to the action
 * @param callback Optionally specify a callback to receive response parameters from the parent
 * @returns id of sent message
 */
function sendCustomMessage(actionName, 
// tslint:disable-next-line:no-any
args, 
// tslint:disable-next-line:no-any
callback) {
    (0, internalAPIs_1.ensureInitialized)();
    (0, communication_1.sendMessageToParent)(actionName, args, callback);
}
exports.sendCustomMessage = sendCustomMessage;
/**
 * @private
 * Internal use only
 * Sends a custom action MessageEvent to a child iframe/window, only if you are not using auth popup.
 * Otherwise it will go to the auth popup (which becomes the child)
 * @param actionName Specifies name of the custom action to be sent
 * @param args Specifies additional arguments passed to the action
 * @returns id of sent message
 */
function sendCustomEvent(actionName, 
// tslint:disable-next-line:no-any
args) {
    (0, internalAPIs_1.ensureInitialized)();
    //validate childWindow
    if (!communication_1.Communication.childWindow) {
        throw new Error('The child window has not yet been initialized or is not present');
    }
    (0, communication_1.sendMessageEventToChild)(actionName, args);
}
exports.sendCustomEvent = sendCustomEvent;
/**
 * @private
 * Internal use only
 * Adds a handler for an action sent by a child window or parent window
 * @param actionName Specifies name of the action message to handle
 * @param customHandler The callback to invoke when the action message is received. The return value is sent to the child
 */
function registerCustomHandler(actionName, customHandler) {
    var _this = this;
    (0, internalAPIs_1.ensureInitialized)();
    (0, handlers_1.registerHandler)(actionName, function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return customHandler.apply(_this, args);
    });
}
exports.registerCustomHandler = registerCustomHandler;
/**
 * @private
 * Hide from docs
 * ------
 * Allows an app to retrieve information of all chat members
 * Because a malicious party run your content in a browser, this value should
 * be used only as a hint as to who the members are and never as proof of membership.
 * @param callback The callback to invoke when the {@link ChatMembersInformation} object is retrieved.
 */
function getChatMembers(callback) {
    (0, internalAPIs_1.ensureInitialized)();
    (0, communication_1.sendMessageToParent)('getChatMembers', callback);
}
exports.getChatMembers = getChatMembers;
/**
 * @private
 * Hide from docs
 * ------
 * Allows an app to get the configuration setting value
 * @param callback The callback to invoke when the value is retrieved.
 * @param key The key for the config setting
 */
function getConfigSetting(callback, key) {
    (0, internalAPIs_1.ensureInitialized)();
    (0, communication_1.sendMessageToParent)('getConfigSetting', [key], callback);
}
exports.getConfigSetting = getConfigSetting;
/**
 * @private
 * register a handler to be called when a user setting changes. The changed setting type & value is provided in the callback.
 * @param settingTypes List of user setting changes to subscribe
 * @param handler When a subscribed setting is updated this handler is called
 */
function registerUserSettingsChangeHandler(settingTypes, handler) {
    (0, internalAPIs_1.ensureInitialized)();
    (0, handlers_1.registerHandler)('userSettingsChange', handler, true, [settingTypes]);
}
exports.registerUserSettingsChangeHandler = registerUserSettingsChangeHandler;


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.menus = void 0;
var internalAPIs_1 = __webpack_require__(1);
var communication_1 = __webpack_require__(0);
var handlers_1 = __webpack_require__(3);
/**
 * Namespace to interact with the menu-specific part of the SDK.
 * This object is used to show View Configuration, Action Menu and Navigation Bar Menu.
 *
 */
var menus;
(function (menus) {
    /**
     * Defines how a menu item should appear in the NavBar.
     */
    var DisplayMode;
    (function (DisplayMode) {
        /**
         * Only place this item in the NavBar if there's room for it.
         * If there's no room, item is shown in the overflow menu.
         */
        DisplayMode[DisplayMode["ifRoom"] = 0] = "ifRoom";
        /**
         * Never place this item in the NavBar.
         * The item would always be shown in NavBar's overflow menu.
         */
        DisplayMode[DisplayMode["overflowOnly"] = 1] = "overflowOnly";
    })(DisplayMode = menus.DisplayMode || (menus.DisplayMode = {}));
    /**
     * Represents information about menu item for Action Menu and Navigation Bar Menu.
     */
    var MenuItem = /** @class */ (function () {
        function MenuItem() {
            /**
             * State of the menu item
             */
            this.enabled = true;
            /**
             * Whether the menu item is selected or not
             */
            this.selected = false;
        }
        return MenuItem;
    }());
    menus.MenuItem = MenuItem;
    /**
     * Represents information about type of list to display in Navigation Bar Menu.
     */
    var MenuListType;
    (function (MenuListType) {
        MenuListType["dropDown"] = "dropDown";
        MenuListType["popOver"] = "popOver";
    })(MenuListType = menus.MenuListType || (menus.MenuListType = {}));
    var navBarMenuItemPressHandler;
    var actionMenuItemPressHandler;
    var viewConfigItemPressHandler;
    function initialize() {
        (0, handlers_1.registerHandler)('navBarMenuItemPress', handleNavBarMenuItemPress, false);
        (0, handlers_1.registerHandler)('actionMenuItemPress', handleActionMenuItemPress, false);
        (0, handlers_1.registerHandler)('setModuleView', handleViewConfigItemPress, false);
    }
    menus.initialize = initialize;
    /**
     * Registers list of view configurations and it's handler.
     * Handler is responsible for listening selection of View Configuration.
     * @param viewConfig List of view configurations. Minimum 1 value is required.
     * @param handler The handler to invoke when the user selects view configuration.
     */
    function setUpViews(viewConfig, handler) {
        (0, internalAPIs_1.ensureInitialized)();
        viewConfigItemPressHandler = handler;
        (0, communication_1.sendMessageToParent)('setUpViews', [viewConfig]);
    }
    menus.setUpViews = setUpViews;
    function handleViewConfigItemPress(id) {
        if (!viewConfigItemPressHandler || !viewConfigItemPressHandler(id)) {
            (0, internalAPIs_1.ensureInitialized)();
            (0, communication_1.sendMessageToParent)('viewConfigItemPress', [id]);
        }
    }
    /**
     * Used to set menu items on the Navigation Bar. If icon is available, icon will be shown, otherwise title will be shown.
     * @param items List of MenuItems for Navigation Bar Menu.
     * @param handler The handler to invoke when the user selects menu item.
     */
    function setNavBarMenu(items, handler) {
        (0, internalAPIs_1.ensureInitialized)();
        navBarMenuItemPressHandler = handler;
        (0, communication_1.sendMessageToParent)('setNavBarMenu', [items]);
    }
    menus.setNavBarMenu = setNavBarMenu;
    function handleNavBarMenuItemPress(id) {
        if (!navBarMenuItemPressHandler || !navBarMenuItemPressHandler(id)) {
            (0, internalAPIs_1.ensureInitialized)();
            (0, communication_1.sendMessageToParent)('handleNavBarMenuItemPress', [id]);
        }
    }
    /**
     * Used to show Action Menu.
     * @param params Parameters for Menu Parameters
     * @param handler The handler to invoke when the user selects menu item.
     */
    function showActionMenu(params, handler) {
        (0, internalAPIs_1.ensureInitialized)();
        actionMenuItemPressHandler = handler;
        (0, communication_1.sendMessageToParent)('showActionMenu', [params]);
    }
    menus.showActionMenu = showActionMenu;
    function handleActionMenuItemPress(id) {
        if (!actionMenuItemPressHandler || !actionMenuItemPressHandler(id)) {
            (0, internalAPIs_1.ensureInitialized)();
            (0, communication_1.sendMessageToParent)('handleActionMenuItemPress', [id]);
        }
    }
})(menus = exports.menus || (exports.menus = {}));


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.ParentAppWindow = exports.ChildAppWindow = void 0;
/* eslint-disable @typescript-eslint/ban-types */
var internalAPIs_1 = __webpack_require__(1);
var constants_1 = __webpack_require__(2);
var utils_1 = __webpack_require__(5);
var communication_1 = __webpack_require__(0);
var handlers_1 = __webpack_require__(3);
var ChildAppWindow = /** @class */ (function () {
    function ChildAppWindow() {
    }
    ChildAppWindow.prototype.postMessage = function (message, onComplete) {
        (0, internalAPIs_1.ensureInitialized)();
        (0, communication_1.sendMessageToParent)('messageForChild', [message], onComplete ? onComplete : (0, utils_1.getGenericOnCompleteHandler)());
    };
    ChildAppWindow.prototype.addEventListener = function (type, listener) {
        if (type === 'message') {
            (0, handlers_1.registerHandler)('messageForParent', listener);
        }
    };
    return ChildAppWindow;
}());
exports.ChildAppWindow = ChildAppWindow;
var ParentAppWindow = /** @class */ (function () {
    function ParentAppWindow() {
    }
    Object.defineProperty(ParentAppWindow, "Instance", {
        get: function () {
            // Do you need arguments? Make it a regular method instead.
            return this._instance || (this._instance = new this());
        },
        enumerable: false,
        configurable: true
    });
    ParentAppWindow.prototype.postMessage = function (message, onComplete) {
        (0, internalAPIs_1.ensureInitialized)(constants_1.FrameContexts.task);
        (0, communication_1.sendMessageToParent)('messageForParent', [message], onComplete ? onComplete : (0, utils_1.getGenericOnCompleteHandler)());
    };
    ParentAppWindow.prototype.addEventListener = function (type, listener) {
        if (type === 'message') {
            (0, handlers_1.registerHandler)('messageForChild', listener);
        }
    };
    return ParentAppWindow;
}());
exports.ParentAppWindow = ParentAppWindow;


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.media = void 0;
var globalVars_1 = __webpack_require__(7);
var interfaces_1 = __webpack_require__(6);
var internalAPIs_1 = __webpack_require__(1);
var constants_1 = __webpack_require__(2);
var utils_1 = __webpack_require__(5);
var mediaUtil_1 = __webpack_require__(18);
var communication_1 = __webpack_require__(0);
var handlers_1 = __webpack_require__(3);
var constants_2 = __webpack_require__(4);
var media;
(function (media) {
    /**
     * Enum for file formats supported
     */
    var FileFormat;
    (function (FileFormat) {
        FileFormat["Base64"] = "base64";
        FileFormat["ID"] = "id";
    })(FileFormat = media.FileFormat || (media.FileFormat = {}));
    /**
     * File object that can be used to represent image or video or audio
     */
    var File = /** @class */ (function () {
        function File() {
        }
        return File;
    }());
    media.File = File;
    /**
     * Launch camera, capture image or choose image from gallery and return the images as a File[] object to the callback.
     * Callback will be called with an error, if there are any. App should first check the error.
     * If it is present the user can be updated with appropriate error message.
     * If error is null or undefined, then files will have the required result.
     * Note: Currently we support getting one File through this API, i.e. the file arrays size will be one.
     * Note: For desktop, this API is not supported. Callback will be resolved with ErrorCode.NotSupported.
     * @see File
     * @see SdkError
     */
    function captureImage(callback) {
        if (!callback) {
            throw new Error('[captureImage] Callback cannot be null');
        }
        (0, internalAPIs_1.ensureInitialized)(constants_1.FrameContexts.content, constants_1.FrameContexts.task);
        if (!globalVars_1.GlobalVars.isFramelessWindow) {
            var notSupportedError = { errorCode: interfaces_1.ErrorCode.NOT_SUPPORTED_ON_PLATFORM };
            callback(notSupportedError, undefined);
            return;
        }
        if (!(0, internalAPIs_1.isAPISupportedByPlatform)(constants_2.captureImageMobileSupportVersion)) {
            var oldPlatformError = { errorCode: interfaces_1.ErrorCode.OLD_PLATFORM };
            callback(oldPlatformError, undefined);
            return;
        }
        (0, communication_1.sendMessageToParent)('captureImage', callback);
    }
    media.captureImage = captureImage;
    /**
     * Media object returned by the select Media API
     */
    var Media = /** @class */ (function (_super) {
        __extends(Media, _super);
        function Media(that) {
            if (that === void 0) { that = null; }
            var _this = _super.call(this) || this;
            if (that) {
                _this.content = that.content;
                _this.format = that.format;
                _this.mimeType = that.mimeType;
                _this.name = that.name;
                _this.preview = that.preview;
                _this.size = that.size;
            }
            return _this;
        }
        /**
         * Gets the media in chunks irrespecitve of size, these chunks are assembled and sent back to the webapp as file/blob
         * @param callback returns blob of media
         */
        Media.prototype.getMedia = function (callback) {
            if (!callback) {
                throw new Error('[get Media] Callback cannot be null');
            }
            (0, internalAPIs_1.ensureInitialized)(constants_1.FrameContexts.content, constants_1.FrameContexts.task);
            if (!(0, internalAPIs_1.isAPISupportedByPlatform)(constants_2.mediaAPISupportVersion)) {
                var oldPlatformError = { errorCode: interfaces_1.ErrorCode.OLD_PLATFORM };
                callback(oldPlatformError, null);
                return;
            }
            if (!(0, mediaUtil_1.validateGetMediaInputs)(this.mimeType, this.format, this.content)) {
                var invalidInput = { errorCode: interfaces_1.ErrorCode.INVALID_ARGUMENTS };
                callback(invalidInput, null);
                return;
            }
            // Call the new get media implementation via callbacks if the client version is greater than or equal to '2.0.0'
            if ((0, internalAPIs_1.isAPISupportedByPlatform)(constants_2.getMediaCallbackSupportVersion)) {
                this.getMediaViaCallback(callback);
            }
            else {
                this.getMediaViaHandler(callback);
            }
        };
        Media.prototype.getMediaViaCallback = function (callback) {
            var helper = {
                mediaMimeType: this.mimeType,
                assembleAttachment: [],
            };
            var localUriId = [this.content];
            function handleGetMediaCallbackRequest(mediaResult) {
                if (callback) {
                    if (mediaResult && mediaResult.error) {
                        callback(mediaResult.error, null);
                    }
                    else {
                        if (mediaResult && mediaResult.mediaChunk) {
                            // If the chunksequence number is less than equal to 0 implies EOF
                            // create file/blob when all chunks have arrived and we get 0/-1 as chunksequence number
                            if (mediaResult.mediaChunk.chunkSequence <= 0) {
                                var file = (0, mediaUtil_1.createFile)(helper.assembleAttachment, helper.mediaMimeType);
                                callback(mediaResult.error, file);
                            }
                            else {
                                // Keep pushing chunks into assemble attachment
                                var assemble = (0, mediaUtil_1.decodeAttachment)(mediaResult.mediaChunk, helper.mediaMimeType);
                                helper.assembleAttachment.push(assemble);
                            }
                        }
                        else {
                            callback({ errorCode: interfaces_1.ErrorCode.INTERNAL_ERROR, message: 'data received is null' }, null);
                        }
                    }
                }
            }
            (0, communication_1.sendMessageToParent)('getMedia', localUriId, handleGetMediaCallbackRequest);
        };
        Media.prototype.getMediaViaHandler = function (callback) {
            var actionName = (0, utils_1.generateGUID)();
            var helper = {
                mediaMimeType: this.mimeType,
                assembleAttachment: [],
            };
            var params = [actionName, this.content];
            this.content && callback && (0, communication_1.sendMessageToParent)('getMedia', params);
            function handleGetMediaRequest(response) {
                if (callback) {
                    var mediaResult = JSON.parse(response);
                    if (mediaResult.error) {
                        callback(mediaResult.error, null);
                        (0, handlers_1.removeHandler)('getMedia' + actionName);
                    }
                    else {
                        if (mediaResult.mediaChunk) {
                            // If the chunksequence number is less than equal to 0 implies EOF
                            // create file/blob when all chunks have arrived and we get 0/-1 as chunksequence number
                            if (mediaResult.mediaChunk.chunkSequence <= 0) {
                                var file = (0, mediaUtil_1.createFile)(helper.assembleAttachment, helper.mediaMimeType);
                                callback(mediaResult.error, file);
                                (0, handlers_1.removeHandler)('getMedia' + actionName);
                            }
                            else {
                                // Keep pushing chunks into assemble attachment
                                var assemble = (0, mediaUtil_1.decodeAttachment)(mediaResult.mediaChunk, helper.mediaMimeType);
                                helper.assembleAttachment.push(assemble);
                            }
                        }
                        else {
                            callback({ errorCode: interfaces_1.ErrorCode.INTERNAL_ERROR, message: 'data received is null' }, null);
                            (0, handlers_1.removeHandler)('getMedia' + actionName);
                        }
                    }
                }
            }
            (0, handlers_1.registerHandler)('getMedia' + actionName, handleGetMediaRequest);
        };
        return Media;
    }(File));
    media.Media = Media;
    /**
     * @private
     * Hide from docs
     * --------
     * Base class which holds the callback and notifies events to the host client
     */
    var MediaController = /** @class */ (function () {
        function MediaController(controllerCallback) {
            this.controllerCallback = controllerCallback;
        }
        /**
         * @private
         * Hide from docs
         * --------
         * Function to notify the host client to programatically control the experience
         * @param mediaEvent indicates what the event that needs to be signaled to the host client
         * Optional; @param callback is used to send app if host client has successfully handled the notification event or not
         */
        MediaController.prototype.notifyEventToHost = function (mediaEvent, callback) {
            (0, internalAPIs_1.ensureInitialized)(constants_1.FrameContexts.content, constants_1.FrameContexts.task);
            var err = (0, internalAPIs_1.isApiSupportedOnMobile)(constants_2.nonFullScreenVideoModeAPISupportVersion);
            if (err) {
                if (callback) {
                    callback(err);
                }
                return;
            }
            var params = { mediaType: this.getMediaType(), mediaControllerEvent: mediaEvent };
            (0, communication_1.sendMessageToParent)('media.controller', [params], function (err) {
                if (callback) {
                    callback(err);
                }
            });
        };
        /**
         * Function to programatically stop the ongoing media event
         * Optional; @param callback is used to send app if host client has successfully stopped the event or not
         */
        MediaController.prototype.stop = function (callback) {
            this.notifyEventToHost(MediaControllerEvent.StopRecording, callback);
        };
        return MediaController;
    }());
    /**
     * VideoController class is used to communicate between the app and the host client during the video capture flow
     */
    var VideoController = /** @class */ (function (_super) {
        __extends(VideoController, _super);
        function VideoController() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        VideoController.prototype.getMediaType = function () {
            return MediaType.Video;
        };
        VideoController.prototype.notifyEventToApp = function (mediaEvent) {
            if (!this.controllerCallback) {
                // Early return as app has not registered with the callback
                return;
            }
            switch (mediaEvent) {
                case MediaControllerEvent.StartRecording:
                    if (this.controllerCallback.onRecordingStarted) {
                        this.controllerCallback.onRecordingStarted();
                        break;
                    }
            }
        };
        return VideoController;
    }(MediaController));
    media.VideoController = VideoController;
    /**
     * @private
     * Hide from docs
     * --------
     * Events which are used to communicate between the app and the host client during the media recording flow
     */
    var MediaControllerEvent;
    (function (MediaControllerEvent) {
        MediaControllerEvent[MediaControllerEvent["StartRecording"] = 1] = "StartRecording";
        MediaControllerEvent[MediaControllerEvent["StopRecording"] = 2] = "StopRecording";
    })(MediaControllerEvent || (MediaControllerEvent = {}));
    /**
     * The modes in which camera can be launched in select Media API
     */
    var CameraStartMode;
    (function (CameraStartMode) {
        CameraStartMode[CameraStartMode["Photo"] = 1] = "Photo";
        CameraStartMode[CameraStartMode["Document"] = 2] = "Document";
        CameraStartMode[CameraStartMode["Whiteboard"] = 3] = "Whiteboard";
        CameraStartMode[CameraStartMode["BusinessCard"] = 4] = "BusinessCard";
    })(CameraStartMode = media.CameraStartMode || (media.CameraStartMode = {}));
    /**
     * Specifies the image source
     */
    var Source;
    (function (Source) {
        Source[Source["Camera"] = 1] = "Camera";
        Source[Source["Gallery"] = 2] = "Gallery";
    })(Source = media.Source || (media.Source = {}));
    /**
     * Specifies the type of Media
     */
    var MediaType;
    (function (MediaType) {
        MediaType[MediaType["Image"] = 1] = "Image";
        MediaType[MediaType["Video"] = 2] = "Video";
        MediaType[MediaType["VideoAndImage"] = 3] = "VideoAndImage";
        MediaType[MediaType["Audio"] = 4] = "Audio";
    })(MediaType = media.MediaType || (media.MediaType = {}));
    /**
     * ID contains a mapping for content uri on platform's side, URL is generic
     */
    var ImageUriType;
    (function (ImageUriType) {
        ImageUriType[ImageUriType["ID"] = 1] = "ID";
        ImageUriType[ImageUriType["URL"] = 2] = "URL";
    })(ImageUriType = media.ImageUriType || (media.ImageUriType = {}));
    /**
     * Specifies the image output formats.
     */
    var ImageOutputFormats;
    (function (ImageOutputFormats) {
        ImageOutputFormats[ImageOutputFormats["IMAGE"] = 1] = "IMAGE";
        ImageOutputFormats[ImageOutputFormats["PDF"] = 2] = "PDF";
    })(ImageOutputFormats = media.ImageOutputFormats || (media.ImageOutputFormats = {}));
    /**
     * Select an attachment using camera/gallery
     * @param mediaInputs The input params to customize the media to be selected
     * @param callback The callback to invoke after fetching the media
     */
    function selectMedia(mediaInputs, callback) {
        if (!callback) {
            throw new Error('[select Media] Callback cannot be null');
        }
        (0, internalAPIs_1.ensureInitialized)(constants_1.FrameContexts.content, constants_1.FrameContexts.task);
        if (!(0, internalAPIs_1.isAPISupportedByPlatform)(constants_2.mediaAPISupportVersion)) {
            var oldPlatformError = { errorCode: interfaces_1.ErrorCode.OLD_PLATFORM };
            callback(oldPlatformError, null);
            return;
        }
        var err = (0, mediaUtil_1.isMediaCallSupportedOnMobile)(mediaInputs);
        if (err) {
            callback(err, null);
            return;
        }
        if (!(0, mediaUtil_1.validateSelectMediaInputs)(mediaInputs)) {
            var invalidInput = { errorCode: interfaces_1.ErrorCode.INVALID_ARGUMENTS };
            callback(invalidInput, null);
            return;
        }
        var params = [mediaInputs];
        // What comes back from native as attachments would just be objects and will be missing getMedia method on them
        (0, communication_1.sendMessageToParent)('selectMedia', params, function (err, localAttachments, mediaEvent) {
            // MediaControllerEvent response is used to notify the app about events and is a partial response to selectMedia
            if (mediaEvent) {
                if ((0, mediaUtil_1.isVideoControllerRegistered)(mediaInputs)) {
                    mediaInputs.videoProps.videoController.notifyEventToApp(mediaEvent);
                }
                return;
            }
            // Media Attachments are final response to selectMedia
            if (!localAttachments) {
                callback(err, null);
                return;
            }
            var mediaArray = [];
            for (var _i = 0, localAttachments_1 = localAttachments; _i < localAttachments_1.length; _i++) {
                var attachment = localAttachments_1[_i];
                mediaArray.push(new Media(attachment));
            }
            callback(err, mediaArray);
        });
    }
    media.selectMedia = selectMedia;
    /**
     * View images using native image viewer
     * @param uriList urilist of images to be viewed - can be content uri or server url. supports upto 10 Images in one go
     * @param callback returns back error if encountered, returns null in case of success
     */
    function viewImages(uriList, callback) {
        if (!callback) {
            throw new Error('[view images] Callback cannot be null');
        }
        (0, internalAPIs_1.ensureInitialized)(constants_1.FrameContexts.content, constants_1.FrameContexts.task);
        if (!(0, internalAPIs_1.isAPISupportedByPlatform)(constants_2.mediaAPISupportVersion)) {
            var oldPlatformError = { errorCode: interfaces_1.ErrorCode.OLD_PLATFORM };
            callback(oldPlatformError);
            return;
        }
        if (!(0, mediaUtil_1.validateViewImagesInput)(uriList)) {
            var invalidInput = { errorCode: interfaces_1.ErrorCode.INVALID_ARGUMENTS };
            callback(invalidInput);
            return;
        }
        var params = [uriList];
        (0, communication_1.sendMessageToParent)('viewImages', params, callback);
    }
    media.viewImages = viewImages;
    /**
     * Scan Barcode/QRcode using camera
     * Note: For desktop and web, this API is not supported. Callback will be resolved with ErrorCode.NotSupported.
     * @param callback callback to invoke after scanning the barcode
     * @param config optional input configuration to customize the barcode scanning experience
     */
    function scanBarCode(callback, config) {
        if (!callback) {
            throw new Error('[media.scanBarCode] Callback cannot be null');
        }
        (0, internalAPIs_1.ensureInitialized)(constants_1.FrameContexts.content, constants_1.FrameContexts.task);
        if (globalVars_1.GlobalVars.hostClientType === constants_1.HostClientType.desktop ||
            globalVars_1.GlobalVars.hostClientType === constants_1.HostClientType.web ||
            globalVars_1.GlobalVars.hostClientType === constants_1.HostClientType.rigel ||
            globalVars_1.GlobalVars.hostClientType === constants_1.HostClientType.teamsRoomsWindows ||
            globalVars_1.GlobalVars.hostClientType === constants_1.HostClientType.teamsRoomsAndroid ||
            globalVars_1.GlobalVars.hostClientType === constants_1.HostClientType.teamsPhones ||
            globalVars_1.GlobalVars.hostClientType === constants_1.HostClientType.teamsDisplays) {
            var notSupportedError = { errorCode: interfaces_1.ErrorCode.NOT_SUPPORTED_ON_PLATFORM };
            callback(notSupportedError, null);
            return;
        }
        if (!(0, internalAPIs_1.isAPISupportedByPlatform)(constants_2.scanBarCodeAPIMobileSupportVersion)) {
            var oldPlatformError = { errorCode: interfaces_1.ErrorCode.OLD_PLATFORM };
            callback(oldPlatformError, null);
            return;
        }
        if (!(0, mediaUtil_1.validateScanBarCodeInput)(config)) {
            var invalidInput = { errorCode: interfaces_1.ErrorCode.INVALID_ARGUMENTS };
            callback(invalidInput, null);
            return;
        }
        (0, communication_1.sendMessageToParent)('media.scanBarCode', [config], callback);
    }
    media.scanBarCode = scanBarCode;
})(media = exports.media || (exports.media = {}));


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.validatePeoplePickerInput = exports.validateScanBarCodeInput = exports.validateViewImagesInput = exports.validateGetMediaInputs = exports.isMediaCallForNonFullScreenVideoMode = exports.isMediaCallForVideoAndImageInputs = exports.isMediaCallForImageOutputFormats = exports.validateSelectMediaInputs = exports.isVideoControllerRegistered = exports.isMediaCallSupportedOnMobile = exports.decodeAttachment = exports.createFile = void 0;
var media_1 = __webpack_require__(17);
var constants_1 = __webpack_require__(4);
var internalAPIs_1 = __webpack_require__(1);
/**
 * Helper function to create a blob from media chunks based on their sequence
 */
function createFile(assembleAttachment, mimeType) {
    if (assembleAttachment == null || mimeType == null || assembleAttachment.length <= 0) {
        return null;
    }
    var file;
    var sequence = 1;
    assembleAttachment.sort(function (a, b) { return (a.sequence > b.sequence ? 1 : -1); });
    assembleAttachment.forEach(function (item) {
        if (item.sequence == sequence) {
            if (file) {
                file = new Blob([file, item.file], { type: mimeType });
            }
            else {
                file = new Blob([item.file], { type: mimeType });
            }
            sequence++;
        }
    });
    return file;
}
exports.createFile = createFile;
/**
 * Helper function to convert Media chunks into another object type which can be later assemebled
 * Converts base 64 encoded string to byte array and then into an array of blobs
 */
function decodeAttachment(attachment, mimeType) {
    if (attachment == null || mimeType == null) {
        return null;
    }
    var decoded = atob(attachment.chunk);
    var byteNumbers = new Array(decoded.length);
    for (var i = 0; i < decoded.length; i++) {
        byteNumbers[i] = decoded.charCodeAt(i);
    }
    var byteArray = new Uint8Array(byteNumbers);
    var blob = new Blob([byteArray], { type: mimeType });
    var assemble = {
        sequence: attachment.chunkSequence,
        file: blob,
    };
    return assemble;
}
exports.decodeAttachment = decodeAttachment;
/**
 * Function returns null if the media call is supported on current mobile version, else SdkError.
 */
function isMediaCallSupportedOnMobile(mediaInputs) {
    if (isMediaCallForVideoAndImageInputs(mediaInputs)) {
        return (0, internalAPIs_1.isApiSupportedOnMobile)(constants_1.videoAndImageMediaAPISupportVersion);
    }
    else if (isMediaCallForNonFullScreenVideoMode(mediaInputs)) {
        return (0, internalAPIs_1.isApiSupportedOnMobile)(constants_1.nonFullScreenVideoModeAPISupportVersion);
    }
    else if (isMediaCallForImageOutputFormats(mediaInputs)) {
        return (0, internalAPIs_1.isApiSupportedOnMobile)(constants_1.imageOutputFormatsAPISupportVersion);
    }
    return null;
}
exports.isMediaCallSupportedOnMobile = isMediaCallSupportedOnMobile;
/**
 * Function returns true if the app has registered to listen to video controller events, else false.
 */
function isVideoControllerRegistered(mediaInputs) {
    if (mediaInputs.mediaType == media_1.media.MediaType.Video &&
        mediaInputs.videoProps &&
        mediaInputs.videoProps.videoController) {
        return true;
    }
    return false;
}
exports.isVideoControllerRegistered = isVideoControllerRegistered;
/**
 * Returns true if the mediaInput params are valid and false otherwise
 */
function validateSelectMediaInputs(mediaInputs) {
    if (mediaInputs == null || mediaInputs.maxMediaCount > 10) {
        return false;
    }
    return true;
}
exports.validateSelectMediaInputs = validateSelectMediaInputs;
/**
 * Returns true if the mediaInput params are called for mediatype Image and contains Image outputs formats, false otherwise
 */
function isMediaCallForImageOutputFormats(mediaInputs) {
    var _a;
    if ((mediaInputs === null || mediaInputs === void 0 ? void 0 : mediaInputs.mediaType) == media_1.media.MediaType.Image && ((_a = mediaInputs === null || mediaInputs === void 0 ? void 0 : mediaInputs.imageProps) === null || _a === void 0 ? void 0 : _a.imageOutputFormats)) {
        return true;
    }
    return false;
}
exports.isMediaCallForImageOutputFormats = isMediaCallForImageOutputFormats;
/**
 * Returns true if the mediaInput params are called for mediatype VideoAndImage and false otherwise
 */
function isMediaCallForVideoAndImageInputs(mediaInputs) {
    if (mediaInputs && (mediaInputs.mediaType == media_1.media.MediaType.VideoAndImage || mediaInputs.videoAndImageProps)) {
        return true;
    }
    return false;
}
exports.isMediaCallForVideoAndImageInputs = isMediaCallForVideoAndImageInputs;
/**
 * Returns true if the mediaInput params are called for non-full screen video mode and false otherwise
 */
function isMediaCallForNonFullScreenVideoMode(mediaInputs) {
    if (mediaInputs &&
        mediaInputs.mediaType == media_1.media.MediaType.Video &&
        mediaInputs.videoProps &&
        !mediaInputs.videoProps.isFullScreenMode) {
        return true;
    }
    return false;
}
exports.isMediaCallForNonFullScreenVideoMode = isMediaCallForNonFullScreenVideoMode;
/**
 * Returns true if the get Media params are valid and false otherwise
 */
function validateGetMediaInputs(mimeType, format, content) {
    if (mimeType == null || format == null || format != media_1.media.FileFormat.ID || content == null) {
        return false;
    }
    return true;
}
exports.validateGetMediaInputs = validateGetMediaInputs;
/**
 * Returns true if the view images param is valid and false otherwise
 */
function validateViewImagesInput(uriList) {
    if (uriList == null || uriList.length <= 0 || uriList.length > 10) {
        return false;
    }
    return true;
}
exports.validateViewImagesInput = validateViewImagesInput;
/**
 * Returns true if the scan barcode param is valid and false otherwise
 */
function validateScanBarCodeInput(barCodeConfig) {
    if (barCodeConfig) {
        if (barCodeConfig.timeOutIntervalInSec === null ||
            barCodeConfig.timeOutIntervalInSec <= 0 ||
            barCodeConfig.timeOutIntervalInSec > 60) {
            return false;
        }
    }
    return true;
}
exports.validateScanBarCodeInput = validateScanBarCodeInput;
/**
 * Returns true if the people picker params are valid and false otherwise
 */
function validatePeoplePickerInput(peoplePickerInputs) {
    if (peoplePickerInputs) {
        if (peoplePickerInputs.title) {
            if (typeof peoplePickerInputs.title !== 'string') {
                return false;
            }
        }
        if (peoplePickerInputs.setSelected) {
            if (typeof peoplePickerInputs.setSelected !== 'object') {
                return false;
            }
        }
        if (peoplePickerInputs.openOrgWideSearchInChatOrChannel) {
            if (typeof peoplePickerInputs.openOrgWideSearchInChatOrChannel !== 'boolean') {
                return false;
            }
        }
        if (peoplePickerInputs.singleSelect) {
            if (typeof peoplePickerInputs.singleSelect !== 'boolean') {
                return false;
            }
        }
    }
    return true;
}
exports.validatePeoplePickerInput = validatePeoplePickerInput;


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(__webpack_require__(20), exports);
__exportStar(__webpack_require__(8), exports);


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.teams = exports.appEntity = exports.files = exports.remoteCamera = exports.meetingRoom = exports.conversations = exports.registerUserSettingsChangeHandler = exports.uploadCustomApp = exports.registerCustomHandler = exports.sendCustomEvent = exports.showNotification = exports.sendCustomMessage = exports.openFilePreview = exports.getUserJoinedTeams = exports.getConfigSetting = exports.getChatMembers = exports.exitFullscreen = exports.enterFullscreen = exports.UserSettingTypes = exports.ViewerActionTypes = exports.NotificationTypes = exports.logs = exports.bot = void 0;
var bot_1 = __webpack_require__(21);
Object.defineProperty(exports, "bot", { enumerable: true, get: function () { return bot_1.bot; } });
var logs_1 = __webpack_require__(13);
Object.defineProperty(exports, "logs", { enumerable: true, get: function () { return logs_1.logs; } });
var interfaces_1 = __webpack_require__(36);
Object.defineProperty(exports, "NotificationTypes", { enumerable: true, get: function () { return interfaces_1.NotificationTypes; } });
Object.defineProperty(exports, "ViewerActionTypes", { enumerable: true, get: function () { return interfaces_1.ViewerActionTypes; } });
Object.defineProperty(exports, "UserSettingTypes", { enumerable: true, get: function () { return interfaces_1.UserSettingTypes; } });
var privateAPIs_1 = __webpack_require__(14);
Object.defineProperty(exports, "enterFullscreen", { enumerable: true, get: function () { return privateAPIs_1.enterFullscreen; } });
Object.defineProperty(exports, "exitFullscreen", { enumerable: true, get: function () { return privateAPIs_1.exitFullscreen; } });
Object.defineProperty(exports, "getChatMembers", { enumerable: true, get: function () { return privateAPIs_1.getChatMembers; } });
Object.defineProperty(exports, "getConfigSetting", { enumerable: true, get: function () { return privateAPIs_1.getConfigSetting; } });
Object.defineProperty(exports, "getUserJoinedTeams", { enumerable: true, get: function () { return privateAPIs_1.getUserJoinedTeams; } });
Object.defineProperty(exports, "openFilePreview", { enumerable: true, get: function () { return privateAPIs_1.openFilePreview; } });
Object.defineProperty(exports, "sendCustomMessage", { enumerable: true, get: function () { return privateAPIs_1.sendCustomMessage; } });
Object.defineProperty(exports, "showNotification", { enumerable: true, get: function () { return privateAPIs_1.showNotification; } });
Object.defineProperty(exports, "sendCustomEvent", { enumerable: true, get: function () { return privateAPIs_1.sendCustomEvent; } });
Object.defineProperty(exports, "registerCustomHandler", { enumerable: true, get: function () { return privateAPIs_1.registerCustomHandler; } });
Object.defineProperty(exports, "uploadCustomApp", { enumerable: true, get: function () { return privateAPIs_1.uploadCustomApp; } });
Object.defineProperty(exports, "registerUserSettingsChangeHandler", { enumerable: true, get: function () { return privateAPIs_1.registerUserSettingsChangeHandler; } });
var conversations_1 = __webpack_require__(37);
Object.defineProperty(exports, "conversations", { enumerable: true, get: function () { return conversations_1.conversations; } });
var meetingRoom_1 = __webpack_require__(38);
Object.defineProperty(exports, "meetingRoom", { enumerable: true, get: function () { return meetingRoom_1.meetingRoom; } });
var remoteCamera_1 = __webpack_require__(39);
Object.defineProperty(exports, "remoteCamera", { enumerable: true, get: function () { return remoteCamera_1.remoteCamera; } });
var files_1 = __webpack_require__(40);
Object.defineProperty(exports, "files", { enumerable: true, get: function () { return files_1.files; } });
var appEntity_1 = __webpack_require__(41);
Object.defineProperty(exports, "appEntity", { enumerable: true, get: function () { return appEntity_1.appEntity; } });
var teams_1 = __webpack_require__(42);
Object.defineProperty(exports, "teams", { enumerable: true, get: function () { return teams_1.teams; } });


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.bot = void 0;
var communication_1 = __webpack_require__(0);
var internalAPIs_1 = __webpack_require__(1);
/**
 * @private
 * Namespace to interact with bots using the SDK.
 */
var bot;
(function (bot) {
    /**
     * @private
     * Hide from docs until release.
     * ------
     * Sends query to bot in order to retrieve data.
     * @param botRequest query to send to bot.
     * @param onSuccess callback to invoke when data is retrieved from bot
     * @param onError callback to invoke should an error occur
     */
    function sendQuery(botRequest, onSuccess, onError) {
        (0, internalAPIs_1.ensureInitialized)();
        (0, communication_1.sendMessageToParent)('bot.executeQuery', [botRequest], function (success, response) {
            if (success) {
                onSuccess(response);
            }
            else {
                onError(response);
            }
        });
    }
    bot.sendQuery = sendQuery;
    /**
     * @private
     * Hide from docs until release.
     * -----
     * Retrieves list of support commands from bot
     * @param onSuccess callback to invoke when data is retrieved from bot
     * @param onError callback to invoke should an error occur
     */
    function getSupportedCommands(onSuccess, onError) {
        (0, internalAPIs_1.ensureInitialized)();
        (0, communication_1.sendMessageToParent)('bot.getSupportedCommands', function (success, response) {
            if (success) {
                onSuccess(response);
            }
            else {
                onError(response);
            }
        });
    }
    bot.getSupportedCommands = getSupportedCommands;
    /**
     * @private
     * Hide from docs until release.
     * -----
     * Authenticates a user for json tab
     * @param authRequest callback to invoke when data is retrieved from bot
     * @param onSuccess callback to invoke when user is authenticated
     * @param onError callback to invoke should an error occur
     */
    function authenticate(authRequest, onSuccess, onError) {
        (0, internalAPIs_1.ensureInitialized)();
        (0, communication_1.sendMessageToParent)('bot.authenticate', [authRequest], function (success, response) {
            if (success) {
                onSuccess(response);
            }
            else {
                onError(response);
            }
        });
    }
    bot.authenticate = authenticate;
    var ResponseType;
    (function (ResponseType) {
        ResponseType["Results"] = "Results";
        ResponseType["Auth"] = "Auth";
    })(ResponseType = bot.ResponseType || (bot.ResponseType = {}));
})(bot = exports.bot || (exports.bot = {}));


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

var v1 = __webpack_require__(23);
var v4 = __webpack_require__(24);

var uuid = v4;
uuid.v1 = v1;
uuid.v4 = v4;

module.exports = uuid;


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

var rng = __webpack_require__(9);
var bytesToUuid = __webpack_require__(10);

// **`v1()` - Generate time-based UUID**
//
// Inspired by https://github.com/LiosK/UUID.js
// and http://docs.python.org/library/uuid.html

var _nodeId;
var _clockseq;

// Previous uuid creation time
var _lastMSecs = 0;
var _lastNSecs = 0;

// See https://github.com/uuidjs/uuid for API details
function v1(options, buf, offset) {
  var i = buf && offset || 0;
  var b = buf || [];

  options = options || {};
  var node = options.node || _nodeId;
  var clockseq = options.clockseq !== undefined ? options.clockseq : _clockseq;

  // node and clockseq need to be initialized to random values if they're not
  // specified.  We do this lazily to minimize issues related to insufficient
  // system entropy.  See #189
  if (node == null || clockseq == null) {
    var seedBytes = rng();
    if (node == null) {
      // Per 4.5, create and 48-bit node id, (47 random bits + multicast bit = 1)
      node = _nodeId = [
        seedBytes[0] | 0x01,
        seedBytes[1], seedBytes[2], seedBytes[3], seedBytes[4], seedBytes[5]
      ];
    }
    if (clockseq == null) {
      // Per 4.2.2, randomize (14 bit) clockseq
      clockseq = _clockseq = (seedBytes[6] << 8 | seedBytes[7]) & 0x3fff;
    }
  }

  // UUID timestamps are 100 nano-second units since the Gregorian epoch,
  // (1582-10-15 00:00).  JSNumbers aren't precise enough for this, so
  // time is handled internally as 'msecs' (integer milliseconds) and 'nsecs'
  // (100-nanoseconds offset from msecs) since unix epoch, 1970-01-01 00:00.
  var msecs = options.msecs !== undefined ? options.msecs : new Date().getTime();

  // Per 4.2.1.2, use count of uuid's generated during the current clock
  // cycle to simulate higher resolution clock
  var nsecs = options.nsecs !== undefined ? options.nsecs : _lastNSecs + 1;

  // Time since last uuid creation (in msecs)
  var dt = (msecs - _lastMSecs) + (nsecs - _lastNSecs)/10000;

  // Per 4.2.1.2, Bump clockseq on clock regression
  if (dt < 0 && options.clockseq === undefined) {
    clockseq = clockseq + 1 & 0x3fff;
  }

  // Reset nsecs if clock regresses (new clockseq) or we've moved onto a new
  // time interval
  if ((dt < 0 || msecs > _lastMSecs) && options.nsecs === undefined) {
    nsecs = 0;
  }

  // Per 4.2.1.2 Throw error if too many uuids are requested
  if (nsecs >= 10000) {
    throw new Error('uuid.v1(): Can\'t create more than 10M uuids/sec');
  }

  _lastMSecs = msecs;
  _lastNSecs = nsecs;
  _clockseq = clockseq;

  // Per 4.1.4 - Convert from unix epoch to Gregorian epoch
  msecs += 12219292800000;

  // `time_low`
  var tl = ((msecs & 0xfffffff) * 10000 + nsecs) % 0x100000000;
  b[i++] = tl >>> 24 & 0xff;
  b[i++] = tl >>> 16 & 0xff;
  b[i++] = tl >>> 8 & 0xff;
  b[i++] = tl & 0xff;

  // `time_mid`
  var tmh = (msecs / 0x100000000 * 10000) & 0xfffffff;
  b[i++] = tmh >>> 8 & 0xff;
  b[i++] = tmh & 0xff;

  // `time_high_and_version`
  b[i++] = tmh >>> 24 & 0xf | 0x10; // include version
  b[i++] = tmh >>> 16 & 0xff;

  // `clock_seq_hi_and_reserved` (Per 4.2.2 - include variant)
  b[i++] = clockseq >>> 8 | 0x80;

  // `clock_seq_low`
  b[i++] = clockseq & 0xff;

  // `node`
  for (var n = 0; n < 6; ++n) {
    b[i + n] = node[n];
  }

  return buf ? buf : bytesToUuid(b);
}

module.exports = v1;


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

var rng = __webpack_require__(9);
var bytesToUuid = __webpack_require__(10);

function v4(options, buf, offset) {
  var i = buf && offset || 0;

  if (typeof(options) == 'string') {
    buf = options === 'binary' ? new Array(16) : null;
    options = null;
  }
  options = options || {};

  var rnds = options.random || (options.rng || rng)();

  // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`
  rnds[6] = (rnds[6] & 0x0f) | 0x40;
  rnds[8] = (rnds[8] & 0x3f) | 0x80;

  // Copy bytes to buffer, if provided
  if (buf) {
    for (var ii = 0; ii < 16; ++ii) {
      buf[i + ii] = rnds[ii];
    }
  }

  return buf || bytesToUuid(rnds);
}

module.exports = v4;


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.appInitialization = void 0;
var internalAPIs_1 = __webpack_require__(1);
var constants_1 = __webpack_require__(4);
var communication_1 = __webpack_require__(0);
var appInitialization;
(function (appInitialization) {
    appInitialization.Messages = {
        AppLoaded: 'appInitialization.appLoaded',
        Success: 'appInitialization.success',
        Failure: 'appInitialization.failure',
        ExpectedFailure: 'appInitialization.expectedFailure',
    };
    var FailedReason;
    (function (FailedReason) {
        FailedReason["AuthFailed"] = "AuthFailed";
        FailedReason["Timeout"] = "Timeout";
        FailedReason["Other"] = "Other";
    })(FailedReason = appInitialization.FailedReason || (appInitialization.FailedReason = {}));
    var ExpectedFailureReason;
    (function (ExpectedFailureReason) {
        ExpectedFailureReason["PermissionError"] = "PermissionError";
        ExpectedFailureReason["NotFound"] = "NotFound";
        ExpectedFailureReason["Throttling"] = "Throttling";
        ExpectedFailureReason["Offline"] = "Offline";
        ExpectedFailureReason["Other"] = "Other";
    })(ExpectedFailureReason = appInitialization.ExpectedFailureReason || (appInitialization.ExpectedFailureReason = {}));
    /**
     * Notifies the frame that app has loaded and to hide the loading indicator if one is shown.
     */
    function notifyAppLoaded() {
        (0, internalAPIs_1.ensureInitialized)();
        (0, communication_1.sendMessageToParent)(appInitialization.Messages.AppLoaded, [constants_1.version]);
    }
    appInitialization.notifyAppLoaded = notifyAppLoaded;
    /**
     * Notifies the frame that app initialization is successful and is ready for user interaction.
     */
    function notifySuccess() {
        (0, internalAPIs_1.ensureInitialized)();
        (0, communication_1.sendMessageToParent)(appInitialization.Messages.Success, [constants_1.version]);
    }
    appInitialization.notifySuccess = notifySuccess;
    /**
     * Notifies the frame that app initialization has failed and to show an error page in its place.
     */
    function notifyFailure(appInitializationFailedRequest) {
        (0, internalAPIs_1.ensureInitialized)();
        (0, communication_1.sendMessageToParent)(appInitialization.Messages.Failure, [
            appInitializationFailedRequest.reason,
            appInitializationFailedRequest.message,
        ]);
    }
    appInitialization.notifyFailure = notifyFailure;
    /**
     * Notifies the frame that app initialized with some expected errors.
     */
    function notifyExpectedFailure(expectedFailureRequest) {
        (0, internalAPIs_1.ensureInitialized)();
        (0, communication_1.sendMessageToParent)(appInitialization.Messages.ExpectedFailure, [expectedFailureRequest.reason, expectedFailureRequest.message]);
    }
    appInitialization.notifyExpectedFailure = notifyExpectedFailure;
})(appInitialization = exports.appInitialization || (exports.appInitialization = {}));


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeWithFrameContext = exports.setFrameContext = exports.executeDeepLink = exports.shareDeepLink = exports.getMruTabInstances = exports.getTabInstances = exports.registerChangeSettingsHandler = exports.registerFocusEnterHandler = exports.registerBeforeUnloadHandler = exports.registerOnLoadHandler = exports.registerBackButtonHandler = exports.registerAppButtonHoverLeaveHandler = exports.registerAppButtonHoverEnterHandler = exports.registerAppButtonClickHandler = exports.registerFullScreenHandler = exports.registerOnThemeChangeHandler = exports.getContext = exports.print = exports.enablePrintCapability = exports._uninitialize = exports._initialize = exports.initialize = void 0;
var internalAPIs_1 = __webpack_require__(1);
var globalVars_1 = __webpack_require__(7);
var constants_1 = __webpack_require__(4);
var settings_1 = __webpack_require__(12);
var utils_1 = __webpack_require__(5);
var logs_1 = __webpack_require__(13);
var constants_2 = __webpack_require__(2);
var communication_1 = __webpack_require__(0);
var authentication_1 = __webpack_require__(11);
var privateAPIs_1 = __webpack_require__(14);
var menus_1 = __webpack_require__(15);
var Handlers = __webpack_require__(3); // Conflict with some names
// ::::::::::::::::::::::: MicrosoftTeams SDK public API ::::::::::::::::::::
/**
 * Initializes the library. This must be called before any other SDK calls
 * but after the frame is loaded successfully.
 * @param callback Optionally specify a callback to invoke when Teams SDK has successfully initialized
 * @param validMessageOrigins Optionally specify a list of cross frame message origins. There must have
 * https: protocol otherwise they will be ignored. Example: https://www.example.com
 */
function initialize(callback, validMessageOrigins) {
    // Independent components might not know whether the SDK is initialized so might call it to be safe.
    // Just no-op if that happens to make it easier to use.
    if (!globalVars_1.GlobalVars.initializeCalled) {
        globalVars_1.GlobalVars.initializeCalled = true;
        Handlers.initializeHandlers();
        (0, communication_1.initializeCommunication)(function (context, clientType, clientSupportedSDKVersion) {
            if (clientSupportedSDKVersion === void 0) { clientSupportedSDKVersion = constants_1.defaultSDKVersionForCompatCheck; }
            globalVars_1.GlobalVars.frameContext = context;
            globalVars_1.GlobalVars.hostClientType = clientType;
            globalVars_1.GlobalVars.clientSupportedSDKVersion = clientSupportedSDKVersion;
            // Notify all waiting callers that the initialization has completed
            globalVars_1.GlobalVars.initializeCallbacks.forEach(function (initCallback) { return initCallback(); });
            globalVars_1.GlobalVars.initializeCallbacks = [];
            globalVars_1.GlobalVars.initializeCompleted = true;
        }, validMessageOrigins);
        authentication_1.authentication.initialize();
        settings_1.settings.initialize();
        menus_1.menus.initialize();
        (0, privateAPIs_1.initializePrivateApis)();
    }
    // Handle additional valid message origins if specified
    if (Array.isArray(validMessageOrigins)) {
        (0, internalAPIs_1.processAdditionalValidOrigins)(validMessageOrigins);
    }
    // Handle the callback if specified:
    // 1. If initialization has already completed then just call it right away
    // 2. If initialization hasn't completed then add it to the array of callbacks
    //    that should be invoked once initialization does complete
    if (callback) {
        globalVars_1.GlobalVars.initializeCompleted ? callback() : globalVars_1.GlobalVars.initializeCallbacks.push(callback);
    }
}
exports.initialize = initialize;
/**
 * @private
 * Hide from docs.
 * ------
 * Undocumented function used to set a mock window for unit tests
 */
function _initialize(hostWindow) {
    communication_1.Communication.currentWindow = hostWindow;
}
exports._initialize = _initialize;
/**
 * @private
 * Hide from docs.
 * ------
 * Undocumented function used to clear state between unit tests
 */
function _uninitialize() {
    //used to clear state between unit tests
    if (!globalVars_1.GlobalVars.initializeCalled) {
        return;
    }
    if (globalVars_1.GlobalVars.frameContext) {
        registerOnThemeChangeHandler(null);
        registerFullScreenHandler(null);
        registerBackButtonHandler(null);
        registerBeforeUnloadHandler(null);
        registerFocusEnterHandler(null);
        registerOnLoadHandler(null);
        logs_1.logs.registerGetLogHandler(null);
    }
    if (globalVars_1.GlobalVars.frameContext === constants_2.FrameContexts.settings) {
        settings_1.settings.registerOnSaveHandler(null);
    }
    if (globalVars_1.GlobalVars.frameContext === constants_2.FrameContexts.remove) {
        settings_1.settings.registerOnRemoveHandler(null);
    }
    globalVars_1.GlobalVars.initializeCalled = false;
    globalVars_1.GlobalVars.initializeCompleted = false;
    globalVars_1.GlobalVars.initializeCallbacks = [];
    globalVars_1.GlobalVars.additionalValidOrigins = [];
    globalVars_1.GlobalVars.frameContext = null;
    globalVars_1.GlobalVars.hostClientType = null;
    globalVars_1.GlobalVars.isFramelessWindow = false;
    (0, communication_1.uninitializeCommunication)();
}
exports._uninitialize = _uninitialize;
/**
 * Enable print capability to support printing page using Ctrl+P and cmd+P
 */
function enablePrintCapability() {
    if (!globalVars_1.GlobalVars.printCapabilityEnabled) {
        globalVars_1.GlobalVars.printCapabilityEnabled = true;
        (0, internalAPIs_1.ensureInitialized)();
        // adding ctrl+P and cmd+P handler
        document.addEventListener('keydown', function (event) {
            if ((event.ctrlKey || event.metaKey) && event.keyCode === 80) {
                print();
                event.cancelBubble = true;
                event.preventDefault();
                event.stopImmediatePropagation();
            }
        });
    }
}
exports.enablePrintCapability = enablePrintCapability;
/**
 * default print handler
 */
function print() {
    window.print();
}
exports.print = print;
/**
 * Retrieves the current context the frame is running in.
 * @param callback The callback to invoke when the {@link Context} object is retrieved.
 */
function getContext(callback) {
    (0, internalAPIs_1.ensureInitialized)();
    (0, communication_1.sendMessageToParent)('getContext', function (context) {
        if (!context.frameContext) {
            // Fallback logic for frameContext properties
            context.frameContext = globalVars_1.GlobalVars.frameContext;
        }
        callback(context);
    });
}
exports.getContext = getContext;
/**
 * Registers a handler for theme changes.
 * Only one handler can be registered at a time. A subsequent registration replaces an existing registration.
 * @param handler The handler to invoke when the user changes their theme.
 */
function registerOnThemeChangeHandler(handler) {
    (0, internalAPIs_1.ensureInitialized)();
    Handlers.registerOnThemeChangeHandler(handler);
}
exports.registerOnThemeChangeHandler = registerOnThemeChangeHandler;
/**
 * Registers a handler for changes from or to full-screen view for a tab.
 * Only one handler can be registered at a time. A subsequent registration replaces an existing registration.
 * @param handler The handler to invoke when the user toggles full-screen view for a tab.
 */
function registerFullScreenHandler(handler) {
    (0, internalAPIs_1.ensureInitialized)();
    Handlers.registerHandler('fullScreenChange', handler);
}
exports.registerFullScreenHandler = registerFullScreenHandler;
/**
 * Registers a handler for clicking the app button.
 * Only one handler can be registered at a time. A subsequent registration replaces an existing registration.
 * @param handler The handler to invoke when the personal app button is clicked in the app bar.
 */
function registerAppButtonClickHandler(handler) {
    (0, internalAPIs_1.ensureInitialized)(constants_2.FrameContexts.content);
    Handlers.registerHandler('appButtonClick', handler);
}
exports.registerAppButtonClickHandler = registerAppButtonClickHandler;
/**
 * Registers a handler for entering hover of the app button.
 * Only one handler can be registered at a time. A subsequent registration replaces an existing registration.
 * @param handler The handler to invoke when entering hover of the personal app button in the app bar.
 */
function registerAppButtonHoverEnterHandler(handler) {
    (0, internalAPIs_1.ensureInitialized)(constants_2.FrameContexts.content);
    Handlers.registerHandler('appButtonHoverEnter', handler);
}
exports.registerAppButtonHoverEnterHandler = registerAppButtonHoverEnterHandler;
/**
 * Registers a handler for exiting hover of the app button.
 * Only one handler can be registered at a time. A subsequent registration replaces an existing registration.
 * @param handler The handler to invoke when exiting hover of the personal app button in the app bar.
 */
function registerAppButtonHoverLeaveHandler(handler) {
    (0, internalAPIs_1.ensureInitialized)(constants_2.FrameContexts.content);
    Handlers.registerHandler('appButtonHoverLeave', handler);
}
exports.registerAppButtonHoverLeaveHandler = registerAppButtonHoverLeaveHandler;
/**
 * Registers a handler for user presses of the Team client's back button. Experiences that maintain an internal
 * navigation stack should use this handler to navigate the user back within their frame. If an app finds
 * that after running its back button handler it cannot handle the event it should call the navigateBack
 * method to ask the Teams client to handle it instead.
 * @param handler The handler to invoke when the user presses their Team client's back button.
 */
function registerBackButtonHandler(handler) {
    (0, internalAPIs_1.ensureInitialized)();
    Handlers.registerBackButtonHandler(handler);
}
exports.registerBackButtonHandler = registerBackButtonHandler;
/**
 * @private
 * Registers a handler to be called when the page has been requested to load.
 * @param handler The handler to invoke when the page is loaded.
 */
function registerOnLoadHandler(handler) {
    (0, internalAPIs_1.ensureInitialized)();
    Handlers.registerOnLoadHandler(handler);
}
exports.registerOnLoadHandler = registerOnLoadHandler;
/**
 * @private
 * Registers a handler to be called before the page is unloaded.
 * @param handler The handler to invoke before the page is unloaded. If this handler returns true the page should
 * invoke the readyToUnload function provided to it once it's ready to be unloaded.
 */
function registerBeforeUnloadHandler(handler) {
    (0, internalAPIs_1.ensureInitialized)();
    Handlers.registerBeforeUnloadHandler(handler);
}
exports.registerBeforeUnloadHandler = registerBeforeUnloadHandler;
/**
 * @private
 * Registers a handler when focus needs to be passed from teams to the place of choice on app.
 * @param handler The handler to invoked by the app when they want the focus to be in the place of their choice.
 */
function registerFocusEnterHandler(handler) {
    (0, internalAPIs_1.ensureInitialized)();
    Handlers.registerFocusEnterHandler(handler);
}
exports.registerFocusEnterHandler = registerFocusEnterHandler;
/**
 * Registers a handler for when the user reconfigurated tab
 * @param handler The handler to invoke when the user click on Settings.
 */
function registerChangeSettingsHandler(handler) {
    (0, internalAPIs_1.ensureInitialized)(constants_2.FrameContexts.content);
    Handlers.registerHandler('changeSettings', handler);
}
exports.registerChangeSettingsHandler = registerChangeSettingsHandler;
/**
 * Allows an app to retrieve for this user tabs that are owned by this app.
 * If no TabInstanceParameters are passed, the app defaults to favorite teams and favorite channels.
 * @param callback The callback to invoke when the {@link TabInstanceParameters} object is retrieved.
 * @param tabInstanceParameters OPTIONAL Flags that specify whether to scope call to favorite teams or channels.
 */
function getTabInstances(callback, tabInstanceParameters) {
    (0, internalAPIs_1.ensureInitialized)();
    (0, communication_1.sendMessageToParent)('getTabInstances', [tabInstanceParameters], callback);
}
exports.getTabInstances = getTabInstances;
/**
 * Allows an app to retrieve the most recently used tabs for this user.
 * @param callback The callback to invoke when the {@link TabInformation} object is retrieved.
 * @param tabInstanceParameters OPTIONAL Ignored, kept for future use
 */
function getMruTabInstances(callback, tabInstanceParameters) {
    (0, internalAPIs_1.ensureInitialized)();
    (0, communication_1.sendMessageToParent)('getMruTabInstances', [tabInstanceParameters], callback);
}
exports.getMruTabInstances = getMruTabInstances;
/**
 * Shares a deep link that a user can use to navigate back to a specific state in this page.
 * @param deepLinkParameters ID and label for the link and fallback URL.
 */
function shareDeepLink(deepLinkParameters) {
    (0, internalAPIs_1.ensureInitialized)(constants_2.FrameContexts.content, constants_2.FrameContexts.sidePanel, constants_2.FrameContexts.meetingStage);
    (0, communication_1.sendMessageToParent)('shareDeepLink', [
        deepLinkParameters.subEntityId,
        deepLinkParameters.subEntityLabel,
        deepLinkParameters.subEntityWebUrl,
    ]);
}
exports.shareDeepLink = shareDeepLink;
/**
 * execute deep link API.
 * @param deepLink deep link.
 */
function executeDeepLink(deepLink, onComplete) {
    (0, internalAPIs_1.ensureInitialized)(constants_2.FrameContexts.content, constants_2.FrameContexts.sidePanel, constants_2.FrameContexts.settings, constants_2.FrameContexts.task, constants_2.FrameContexts.stage, constants_2.FrameContexts.meetingStage);
    (0, communication_1.sendMessageToParent)('executeDeepLink', [deepLink], onComplete ? onComplete : (0, utils_1.getGenericOnCompleteHandler)());
}
exports.executeDeepLink = executeDeepLink;
function setFrameContext(frameContext) {
    (0, internalAPIs_1.ensureInitialized)(constants_2.FrameContexts.content);
    (0, communication_1.sendMessageToParent)('setFrameContext', [frameContext]);
}
exports.setFrameContext = setFrameContext;
function initializeWithFrameContext(frameContext, callback, validMessageOrigins) {
    initialize(callback, validMessageOrigins);
    setFrameContext(frameContext);
}
exports.initializeWithFrameContext = initializeWithFrameContext;


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.navigateBack = exports.navigateCrossDomain = exports.navigateToTab = exports.returnFocus = void 0;
var internalAPIs_1 = __webpack_require__(1);
var utils_1 = __webpack_require__(5);
var constants_1 = __webpack_require__(2);
var communication_1 = __webpack_require__(0);
/**
 * Navigation specific part of the SDK.
 */
/**
 * Return focus to the main Teams app. Will focus search bar if navigating forward and app bar if navigating back.
 * @param navigateForward Determines the direction to focus in teams app.
 */
function returnFocus(navigateForward) {
    (0, internalAPIs_1.ensureInitialized)();
    (0, communication_1.sendMessageToParent)('returnFocus', [navigateForward]);
}
exports.returnFocus = returnFocus;
/**
 * Navigates the Microsoft Teams app to the specified tab instance.
 * @param tabInstance The tab instance to navigate to.
 */
function navigateToTab(tabInstance, onComplete) {
    (0, internalAPIs_1.ensureInitialized)();
    var errorMessage = 'Invalid internalTabInstanceId and/or channelId were/was provided';
    (0, communication_1.sendMessageToParent)('navigateToTab', [tabInstance], onComplete ? onComplete : (0, utils_1.getGenericOnCompleteHandler)(errorMessage));
}
exports.navigateToTab = navigateToTab;
/**
 * Navigates the frame to a new cross-domain URL. The domain of this URL must match at least one of the
 * valid domains specified in the validDomains block of the manifest; otherwise, an exception will be
 * thrown. This function needs to be used only when navigating the frame to a URL in a different domain
 * than the current one in a way that keeps the app informed of the change and allows the SDK to
 * continue working.
 * @param url The URL to navigate the frame to.
 */
function navigateCrossDomain(url, onComplete) {
    (0, internalAPIs_1.ensureInitialized)(constants_1.FrameContexts.content, constants_1.FrameContexts.sidePanel, constants_1.FrameContexts.settings, constants_1.FrameContexts.remove, constants_1.FrameContexts.task, constants_1.FrameContexts.stage, constants_1.FrameContexts.meetingStage);
    var errorMessage = 'Cross-origin navigation is only supported for URLs matching the pattern registered in the manifest.';
    (0, communication_1.sendMessageToParent)('navigateCrossDomain', [url], onComplete ? onComplete : (0, utils_1.getGenericOnCompleteHandler)(errorMessage));
}
exports.navigateCrossDomain = navigateCrossDomain;
/**
 * Navigates back in the Teams client. See registerBackButtonHandler for more information on when
 * it's appropriate to use this method.
 */
function navigateBack(onComplete) {
    (0, internalAPIs_1.ensureInitialized)();
    var errorMessage = 'Back navigation is not supported in the current client or context.';
    (0, communication_1.sendMessageToParent)('navigateBack', [], onComplete ? onComplete : (0, utils_1.getGenericOnCompleteHandler)(errorMessage));
}
exports.navigateBack = navigateBack;


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tasks = void 0;
var constants_1 = __webpack_require__(2);
var appWindow_1 = __webpack_require__(16);
var communication_1 = __webpack_require__(0);
var internalAPIs_1 = __webpack_require__(1);
/**
 * Namespace to interact with the task module-specific part of the SDK.
 * This object is usable only on the content frame.
 */
var tasks;
(function (tasks) {
    /**
     * Allows an app to open the task module.
     * @param taskInfo An object containing the parameters of the task module
     * @param submitHandler Handler to call when the task module is completed
     */
    function startTask(taskInfo, submitHandler) {
        (0, internalAPIs_1.ensureInitialized)(constants_1.FrameContexts.content, constants_1.FrameContexts.sidePanel, constants_1.FrameContexts.meetingStage);
        (0, communication_1.sendMessageToParent)('tasks.startTask', [taskInfo], submitHandler);
        return new appWindow_1.ChildAppWindow();
    }
    tasks.startTask = startTask;
    /**
     * Update height/width task info properties.
     * @param taskInfo An object containing width and height properties
     */
    function updateTask(taskInfo) {
        (0, internalAPIs_1.ensureInitialized)(constants_1.FrameContexts.content, constants_1.FrameContexts.sidePanel, constants_1.FrameContexts.task, constants_1.FrameContexts.meetingStage);
        var width = taskInfo.width, height = taskInfo.height, extra = __rest(taskInfo, ["width", "height"]);
        if (!Object.keys(extra).length) {
            (0, communication_1.sendMessageToParent)('tasks.updateTask', [taskInfo]);
        }
        else {
            throw new Error('updateTask requires a taskInfo argument containing only width and height');
        }
    }
    tasks.updateTask = updateTask;
    /**
     * Submit the task module.
     * @param result Contains the result to be sent to the bot or the app. Typically a JSON object or a serialized version of it
     * @param appIds Helps to validate that the call originates from the same appId as the one that invoked the task module
     */
    function submitTask(result, appIds) {
        (0, internalAPIs_1.ensureInitialized)(constants_1.FrameContexts.content, constants_1.FrameContexts.sidePanel, constants_1.FrameContexts.task, constants_1.FrameContexts.meetingStage);
        // Send tasks.completeTask instead of tasks.submitTask message for backward compatibility with Mobile clients
        (0, communication_1.sendMessageToParent)('tasks.completeTask', [result, Array.isArray(appIds) ? appIds : [appIds]]);
    }
    tasks.submitTask = submitTask;
})(tasks = exports.tasks || (exports.tasks = {}));


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.location = void 0;
var interfaces_1 = __webpack_require__(6);
var internalAPIs_1 = __webpack_require__(1);
var constants_1 = __webpack_require__(2);
var communication_1 = __webpack_require__(0);
var constants_2 = __webpack_require__(4);
var location;
(function (location_1) {
    /**
     * Fetches current user coordinates or allows user to choose location on map
     * @param callback Callback to invoke when current user location is fetched
     */
    function getLocation(props, callback) {
        if (!callback) {
            throw new Error('[location.getLocation] Callback cannot be null');
        }
        (0, internalAPIs_1.ensureInitialized)(constants_1.FrameContexts.content, constants_1.FrameContexts.task);
        if (!(0, internalAPIs_1.isAPISupportedByPlatform)(constants_2.locationAPIsRequiredVersion)) {
            var oldPlatformError = { errorCode: interfaces_1.ErrorCode.OLD_PLATFORM };
            callback(oldPlatformError, undefined);
            return;
        }
        if (!props) {
            var invalidInput = { errorCode: interfaces_1.ErrorCode.INVALID_ARGUMENTS };
            callback(invalidInput, undefined);
            return;
        }
        (0, communication_1.sendMessageToParent)('location.getLocation', [props], callback);
    }
    location_1.getLocation = getLocation;
    /**
     * Shows the location on map corresponding to the given coordinates
     * @param location {@link Location} which needs to be shown on map
     * @param callback Callback to invoke when the location is opened on map
     */
    function showLocation(location, callback) {
        if (!callback) {
            throw new Error('[location.showLocation] Callback cannot be null');
        }
        (0, internalAPIs_1.ensureInitialized)(constants_1.FrameContexts.content, constants_1.FrameContexts.task);
        if (!(0, internalAPIs_1.isAPISupportedByPlatform)(constants_2.locationAPIsRequiredVersion)) {
            var oldPlatformError = { errorCode: interfaces_1.ErrorCode.OLD_PLATFORM };
            callback(oldPlatformError, undefined);
            return;
        }
        if (!location) {
            var invalidInput = { errorCode: interfaces_1.ErrorCode.INVALID_ARGUMENTS };
            callback(invalidInput, undefined);
            return;
        }
        (0, communication_1.sendMessageToParent)('location.showLocation', [location], callback);
    }
    location_1.showLocation = showLocation;
})(location = exports.location || (exports.location = {}));


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.meeting = void 0;
var communication_1 = __webpack_require__(0);
var handlers_1 = __webpack_require__(3);
var internalAPIs_1 = __webpack_require__(1);
var constants_1 = __webpack_require__(2);
var meeting;
(function (meeting) {
    var MeetingType;
    (function (MeetingType) {
        MeetingType["Unknown"] = "Unknown";
        MeetingType["Adhoc"] = "Adhoc";
        MeetingType["Scheduled"] = "Scheduled";
        MeetingType["Recurring"] = "Recurring";
        MeetingType["Broadcast"] = "Broadcast";
        MeetingType["MeetNow"] = "MeetNow";
    })(MeetingType = meeting.MeetingType || (meeting.MeetingType = {}));
    var CallType;
    (function (CallType) {
        CallType["OneOnOneCall"] = "oneOnOneCall";
        CallType["GroupCall"] = "groupCall";
    })(CallType = meeting.CallType || (meeting.CallType = {}));
    /**
     * Allows an app to get the incoming audio speaker setting for the meeting user
     * @param callback Callback contains 2 parameters, error and result.
     * error can either contain an error of type SdkError, incase of an error, or null when fetch is successful
     * result can either contain the true/false value, incase of a successful fetch or null when the fetching fails
     * result: True means incoming audio is muted and false means incoming audio is unmuted
     */
    function getIncomingClientAudioState(callback) {
        if (!callback) {
            throw new Error('[get incoming client audio state] Callback cannot be null');
        }
        (0, internalAPIs_1.ensureInitialized)(constants_1.FrameContexts.sidePanel, constants_1.FrameContexts.meetingStage);
        (0, communication_1.sendMessageToParent)('getIncomingClientAudioState', callback);
    }
    meeting.getIncomingClientAudioState = getIncomingClientAudioState;
    /**
     * Allows an app to toggle the incoming audio speaker setting for the meeting user from mute to unmute or vice-versa
     * @param callback Callback contains 2 parameters, error and result.
     * error can either contain an error of type SdkError, incase of an error, or null when toggle is successful
     * result can either contain the true/false value, incase of a successful toggle or null when the toggling fails
     * result: True means incoming audio is muted and false means incoming audio is unmuted
     */
    function toggleIncomingClientAudio(callback) {
        if (!callback) {
            throw new Error('[toggle incoming client audio] Callback cannot be null');
        }
        (0, internalAPIs_1.ensureInitialized)(constants_1.FrameContexts.sidePanel, constants_1.FrameContexts.meetingStage);
        (0, communication_1.sendMessageToParent)('toggleIncomingClientAudio', callback);
    }
    meeting.toggleIncomingClientAudio = toggleIncomingClientAudio;
    /**
     * @private
     * Hide from docs
     * Allows an app to get the meeting details for the meeting
     * @param callback Callback contains 2 parameters, error and meetingDetailsResponse.
     * error can either contain an error of type SdkError, incase of an error, or null when get is successful
     * result can either contain a IMeetingDetailsResponse value, incase of a successful get or null when the get fails
     */
    function getMeetingDetails(callback) {
        if (!callback) {
            throw new Error('[get meeting details] Callback cannot be null');
        }
        (0, internalAPIs_1.ensureInitialized)(constants_1.FrameContexts.sidePanel, constants_1.FrameContexts.meetingStage, constants_1.FrameContexts.settings, constants_1.FrameContexts.content);
        (0, communication_1.sendMessageToParent)('meeting.getMeetingDetails', callback);
    }
    meeting.getMeetingDetails = getMeetingDetails;
    /**
     * @private
     * Allows an app to get the authentication token for the anonymous or guest user in the meeting
     * @param callback Callback contains 2 parameters, error and authenticationTokenOfAnonymousUser.
     * error can either contain an error of type SdkError, incase of an error, or null when get is successful
     * authenticationTokenOfAnonymousUser can either contain a string value, incase of a successful get or null when the get fails
     */
    function getAuthenticationTokenForAnonymousUser(callback) {
        if (!callback) {
            throw new Error('[get Authentication Token For AnonymousUser] Callback cannot be null');
        }
        (0, internalAPIs_1.ensureInitialized)(constants_1.FrameContexts.sidePanel, constants_1.FrameContexts.meetingStage);
        (0, communication_1.sendMessageToParent)('meeting.getAuthenticationTokenForAnonymousUser', callback);
    }
    meeting.getAuthenticationTokenForAnonymousUser = getAuthenticationTokenForAnonymousUser;
    /**
     * Allows an app to get the state of the live stream in the current meeting
     * @param callback Callback contains 2 parameters: error and liveStreamState.
     * error can either contain an error of type SdkError, in case of an error, or null when get is successful
     * liveStreamState can either contain a LiveStreamState value, or null when operation fails
     */
    function getLiveStreamState(callback) {
        if (!callback) {
            throw new Error('[get live stream state] Callback cannot be null');
        }
        (0, internalAPIs_1.ensureInitialized)(constants_1.FrameContexts.sidePanel);
        (0, communication_1.sendMessageToParent)('meeting.getLiveStreamState', callback);
    }
    meeting.getLiveStreamState = getLiveStreamState;
    /**
     * Allows an app to request the live streaming be started at the given streaming url
     * @param streamUrl the url to the stream resource
     * @param streamKey the key to the stream resource
     * @param callback Callback contains error parameter which can be of type SdkError in case of an error, or null when operation is successful
     * Use getLiveStreamState or registerLiveStreamChangedHandler to get updates on the live stream state
     */
    function requestStartLiveStreaming(callback, streamUrl, streamKey) {
        if (!callback) {
            throw new Error('[request start live streaming] Callback cannot be null');
        }
        (0, internalAPIs_1.ensureInitialized)(constants_1.FrameContexts.sidePanel);
        (0, communication_1.sendMessageToParent)('meeting.requestStartLiveStreaming', [streamUrl, streamKey], callback);
    }
    meeting.requestStartLiveStreaming = requestStartLiveStreaming;
    /**
     * Allows an app to request the live streaming be stopped at the given streaming url
     * @param callback Callback contains error parameter which can be of type SdkError in case of an error, or null when operation is successful
     * Use getLiveStreamState or registerLiveStreamChangedHandler to get updates on the live stream state
     */
    function requestStopLiveStreaming(callback) {
        if (!callback) {
            throw new Error('[request stop live streaming] Callback cannot be null');
        }
        (0, internalAPIs_1.ensureInitialized)(constants_1.FrameContexts.sidePanel);
        (0, communication_1.sendMessageToParent)('meeting.requestStopLiveStreaming', callback);
    }
    meeting.requestStopLiveStreaming = requestStopLiveStreaming;
    /**
     * Registers a handler for changes to the live stream.
     * Only one handler can be registered at a time. A subsequent registration replaces an existing registration.
     * @param handler The handler to invoke when the live stream state changes
     */
    function registerLiveStreamChangedHandler(handler) {
        if (!handler) {
            throw new Error('[register live stream changed handler] Handler cannot be null');
        }
        (0, internalAPIs_1.ensureInitialized)(constants_1.FrameContexts.sidePanel);
        (0, handlers_1.registerHandler)('meeting.liveStreamChanged', handler);
    }
    meeting.registerLiveStreamChangedHandler = registerLiveStreamChangedHandler;
    /**
     * Allows an app to share contents in the meeting
     * @param callback Callback contains 2 parameters, error and result.
     * error can either contain an error of type SdkError, incase of an error, or null when share is successful
     * result can either contain a true value, incase of a successful share or null when the share fails
     * @param appContentUrl is the input URL which needs to be shared on to the stage
     */
    function shareAppContentToStage(callback, appContentUrl) {
        if (!callback) {
            throw new Error('[share app content to stage] Callback cannot be null');
        }
        (0, internalAPIs_1.ensureInitialized)(constants_1.FrameContexts.sidePanel, constants_1.FrameContexts.meetingStage);
        (0, communication_1.sendMessageToParent)('meeting.shareAppContentToStage', [appContentUrl], callback);
    }
    meeting.shareAppContentToStage = shareAppContentToStage;
    /**
     * Provides information related app's in-meeting sharing capabilities
     * @param callback Callback contains 2 parameters, error and result.
     * error can either contain an error of type SdkError (error indication), or null (non-error indication)
     * appContentStageSharingCapabilities can either contain an IAppContentStageSharingCapabilities object
     * (indication of successful retrieval), or null (indication of failed retrieval)
     */
    function getAppContentStageSharingCapabilities(callback) {
        if (!callback) {
            throw new Error('[get app content stage sharing capabilities] Callback cannot be null');
        }
        (0, internalAPIs_1.ensureInitialized)(constants_1.FrameContexts.sidePanel, constants_1.FrameContexts.meetingStage);
        (0, communication_1.sendMessageToParent)('meeting.getAppContentStageSharingCapabilities', callback);
    }
    meeting.getAppContentStageSharingCapabilities = getAppContentStageSharingCapabilities;
    /**
     * @private
     * Hide from docs
     * Terminates current stage sharing session in meeting
     * @param callback Callback contains 2 parameters, error and result.
     * error can either contain an error of type SdkError (error indication), or null (non-error indication)
     * result can either contain a true boolean value (successful termination), or null (unsuccessful fetch)
     */
    function stopSharingAppContentToStage(callback) {
        if (!callback) {
            throw new Error('[stop sharing app content to stage] Callback cannot be null');
        }
        (0, internalAPIs_1.ensureInitialized)(constants_1.FrameContexts.sidePanel, constants_1.FrameContexts.meetingStage);
        (0, communication_1.sendMessageToParent)('meeting.stopSharingAppContentToStage', callback);
    }
    meeting.stopSharingAppContentToStage = stopSharingAppContentToStage;
    /**
     * Provides information related to current stage sharing state for app
     * @param callback Callback contains 2 parameters, error and result.
     * error can either contain an error of type SdkError (error indication), or null (non-error indication)
     * appContentStageSharingState can either contain an IAppContentStageSharingState object
     * (indication of successful retrieval), or null (indication of failed retrieval)
     */
    function getAppContentStageSharingState(callback) {
        if (!callback) {
            throw new Error('[get app content stage sharing state] Callback cannot be null');
        }
        (0, internalAPIs_1.ensureInitialized)(constants_1.FrameContexts.sidePanel, constants_1.FrameContexts.meetingStage);
        (0, communication_1.sendMessageToParent)('meeting.getAppContentStageSharingState', callback);
    }
    meeting.getAppContentStageSharingState = getAppContentStageSharingState;
    /**
     * Registers a handler for changes to paticipant speaking states. If any participant is speaking, isSpeakingDetected
     * will be true. If no participants are speaking, isSpeakingDetected will be false. Only one handler can be registered
     * at a time. A subsequent registration replaces an existing registration.
     * @param handler The handler to invoke when the speaking state of any participant changes (start/stop speaking).
     */
    function registerSpeakingStateChangeHandler(handler) {
        if (!handler) {
            throw new Error('[registerSpeakingStateChangeHandler] Handler cannot be null');
        }
        (0, internalAPIs_1.ensureInitialized)(constants_1.FrameContexts.sidePanel, constants_1.FrameContexts.meetingStage);
        (0, handlers_1.registerHandler)('meeting.speakingStateChanged', handler);
    }
    meeting.registerSpeakingStateChangeHandler = registerSpeakingStateChangeHandler;
})(meeting = exports.meeting || (exports.meeting = {}));


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.monetization = void 0;
var communication_1 = __webpack_require__(0);
var internalAPIs_1 = __webpack_require__(1);
var constants_1 = __webpack_require__(2);
var monetization;
(function (monetization) {
    /**
     * @private
     * Hide from docs
     * Open dialog to start user's purchase experience
     * @param callback Callback contains 1 parameters, error.
     * @param planInfo optional parameter. It contains info of the subscription plan pushed to users.
     * error can either contain an error of type SdkError, incase of an error, or null when get is successful
     */
    function openPurchaseExperience(callback, planInfo) {
        if (!callback) {
            throw new Error('[open purchase experience] Callback cannot be null');
        }
        (0, internalAPIs_1.ensureInitialized)(constants_1.FrameContexts.content);
        (0, communication_1.sendMessageToParent)('monetization.openPurchaseExperience', [planInfo], callback);
    }
    monetization.openPurchaseExperience = openPurchaseExperience;
})(monetization = exports.monetization || (exports.monetization = {}));


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.people = void 0;
var internalAPIs_1 = __webpack_require__(1);
var constants_1 = __webpack_require__(2);
var interfaces_1 = __webpack_require__(6);
var mediaUtil_1 = __webpack_require__(18);
var communication_1 = __webpack_require__(0);
var constants_2 = __webpack_require__(4);
var people;
(function (people_1) {
    /**
     * Launches a people picker and allows the user to select one or more people from the list
     * If the app is added to personal app scope the people picker launched is org wide and if the app is added to a chat/channel, people picker launched is also limited to the members of chat/channel
     * @param callback Returns list of JSON object of type PeoplePickerResult which consists of AAD IDs, display names and emails of the selected users
     * @param peoplePickerInputs Input parameters to launch customized people picker
     */
    function selectPeople(callback, peoplePickerInputs) {
        if (!callback) {
            throw new Error('[people picker] Callback cannot be null');
        }
        (0, internalAPIs_1.ensureInitialized)(constants_1.FrameContexts.content, constants_1.FrameContexts.task, constants_1.FrameContexts.settings);
        if (!(0, internalAPIs_1.isAPISupportedByPlatform)(constants_2.peoplePickerRequiredVersion)) {
            var oldPlatformError = { errorCode: interfaces_1.ErrorCode.OLD_PLATFORM };
            callback(oldPlatformError, undefined);
            return;
        }
        if (!(0, mediaUtil_1.validatePeoplePickerInput)(peoplePickerInputs)) {
            var invalidInput = { errorCode: interfaces_1.ErrorCode.INVALID_ARGUMENTS };
            callback(invalidInput, null);
            return;
        }
        (0, communication_1.sendMessageToParent)('people.selectPeople', [peoplePickerInputs], callback);
    }
    people_1.selectPeople = selectPeople;
})(people = exports.people || (exports.people = {}));


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.video = void 0;
var communication_1 = __webpack_require__(0);
var internalAPIs_1 = __webpack_require__(1);
var constants_1 = __webpack_require__(2);
var handlers_1 = __webpack_require__(3);
/**
 * Namespace to video extensibility of the SDK.
 *
 */
var video;
(function (video) {
    /**
     * Video frame format enum, currently only support NV12
     */
    var VideoFrameFormat;
    (function (VideoFrameFormat) {
        VideoFrameFormat[VideoFrameFormat["NV12"] = 0] = "NV12";
    })(VideoFrameFormat = video.VideoFrameFormat || (video.VideoFrameFormat = {}));
    /**
     *  Video effect change type enum
     */
    var EffectChangeType;
    (function (EffectChangeType) {
        /**
         * current video effect changed.
         */
        EffectChangeType[EffectChangeType["EffectChanged"] = 0] = "EffectChanged";
        /**
         * disable the video effect
         */
        EffectChangeType[EffectChangeType["EffectDisabled"] = 1] = "EffectDisabled";
    })(EffectChangeType = video.EffectChangeType || (video.EffectChangeType = {}));
    /**
     * register to read the video frames in Permissions section.
     */
    function registerForVideoFrame(frameCallback, config) {
        (0, internalAPIs_1.ensureInitialized)(constants_1.FrameContexts.sidePanel);
        (0, handlers_1.registerHandler)('video.newVideoFrame', function (videoFrame) {
            if (videoFrame !== undefined) {
                frameCallback(videoFrame, notifyVideoFrameProcessed, notifyError);
            }
        });
        (0, communication_1.sendMessageToParent)('video.registerForVideoFrame', [config]);
    }
    video.registerForVideoFrame = registerForVideoFrame;
    /**
     * video extension should call this to notify Teams Client current selected effect parameter changed.
     * If it's pre-meeting, Teams client will call videoEffectCallback immediately then use the videoEffect.
     * in-meeting scenario, we will call videoEffectCallback when apply button clicked.
     * @param effectChangeType the effect change type.
     * @param effectId Newly selected effect id.
     */
    function notifySelectedVideoEffectChanged(effectChangeType, effectId) {
        (0, internalAPIs_1.ensureInitialized)(constants_1.FrameContexts.sidePanel);
        (0, communication_1.sendMessageToParent)('video.videoEffectChanged', [effectChangeType, effectId]);
    }
    video.notifySelectedVideoEffectChanged = notifySelectedVideoEffectChanged;
    /**
     * Register the video effect callback, Teams client uses this to notify the video extension the new video effect will by applied.
     */
    function registerForVideoEffect(callback) {
        (0, internalAPIs_1.ensureInitialized)(constants_1.FrameContexts.sidePanel);
        (0, handlers_1.registerHandler)('video.effectParameterChange', callback);
    }
    video.registerForVideoEffect = registerForVideoEffect;
    /**
     * sending notification to Teams client finished the video frame processing, now Teams client can render this video frame
     * or pass the video frame to next one in video pipeline.
     */
    function notifyVideoFrameProcessed() {
        (0, communication_1.sendMessageToParent)('video.videoFrameProcessed');
    }
    /**
     * sending error notification to Teams client.
     */
    function notifyError(errorMessage) {
        (0, communication_1.sendMessageToParent)('video.notifyError', [errorMessage]);
    }
})(video = exports.video || (exports.video = {})); //end of video namespace


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.sharing = void 0;
var internalAPIs_1 = __webpack_require__(1);
var communication_1 = __webpack_require__(0);
var interfaces_1 = __webpack_require__(6);
var constants_1 = __webpack_require__(2);
var sharing;
(function (sharing) {
    sharing.SharingAPIMessages = {
        shareWebContent: 'sharing.shareWebContent',
    };
    /**
     * Opens a share dialog for web content
     * @param shareWebContentRequest web content info
     * @param callback optional callback
     */
    function shareWebContent(shareWebContentRequest, callback) {
        if (!validateNonEmptyContent(shareWebContentRequest, callback)) {
            return;
        }
        if (!validateTypeConsistency(shareWebContentRequest, callback)) {
            return;
        }
        if (!validateContentForSupportedTypes(shareWebContentRequest, callback)) {
            return;
        }
        (0, internalAPIs_1.ensureInitialized)(constants_1.FrameContexts.content, constants_1.FrameContexts.sidePanel, constants_1.FrameContexts.task, constants_1.FrameContexts.stage, constants_1.FrameContexts.meetingStage);
        (0, communication_1.sendMessageToParent)(sharing.SharingAPIMessages.shareWebContent, [shareWebContentRequest], callback);
    }
    sharing.shareWebContent = shareWebContent;
    // Error checks
    function validateNonEmptyContent(shareRequest, callback) {
        if (!(shareRequest && shareRequest.content && shareRequest.content.length)) {
            if (callback) {
                callback({
                    errorCode: interfaces_1.ErrorCode.INVALID_ARGUMENTS,
                    message: 'Shared content is missing',
                });
            }
            return false;
        }
        return true;
    }
    function validateTypeConsistency(shareRequest, callback) {
        if (shareRequest.content.some(function (item) { return !item.type; })) {
            if (callback) {
                callback({
                    errorCode: interfaces_1.ErrorCode.INVALID_ARGUMENTS,
                    message: 'Shared content type cannot be undefined',
                });
            }
            return false;
        }
        if (shareRequest.content.some(function (item) { return item.type !== shareRequest.content[0].type; })) {
            if (callback) {
                callback({
                    errorCode: interfaces_1.ErrorCode.INVALID_ARGUMENTS,
                    message: 'Shared content must be of the same type',
                });
            }
            return false;
        }
        return true;
    }
    function validateContentForSupportedTypes(shareRequest, callback) {
        if (shareRequest.content[0].type === 'URL') {
            if (shareRequest.content.some(function (item) { return !item.url; })) {
                if (callback) {
                    callback({
                        errorCode: interfaces_1.ErrorCode.INVALID_ARGUMENTS,
                        message: 'URLs are required for URL content types',
                    });
                }
                return false;
            }
        }
        else {
            if (callback) {
                callback({
                    errorCode: interfaces_1.ErrorCode.INVALID_ARGUMENTS,
                    message: 'Content type is unsupported',
                });
            }
            return false;
        }
        return true;
    }
})(sharing = exports.sharing || (exports.sharing = {}));


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.stageView = void 0;
var communication_1 = __webpack_require__(0);
var internalAPIs_1 = __webpack_require__(1);
var constants_1 = __webpack_require__(2);
/**
 * Namespace to interact with the stage view specific part of the SDK.
 */
var stageView;
(function (stageView) {
    /**
     * @private
     * Feature is under development
     *
     * Opens a stage view to display a Teams app
     * @param stageViewParams The parameters to pass into the stage view.
     * @param callback Callback that will be triggered once the stage view is closed.
     *                 The callback takes as an argument an SdkError in case something happened (i.e.
     *                 no permissions to execute the API)
     */
    function open(stageViewParams, callback) {
        (0, internalAPIs_1.ensureInitialized)(constants_1.FrameContexts.content);
        if (!stageViewParams) {
            throw new Error('[stageView.open] Stage view params cannot be null');
        }
        (0, communication_1.sendMessageToParent)('stageView.open', [stageViewParams], callback);
    }
    stageView.open = open;
})(stageView = exports.stageView || (exports.stageView = {}));


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSettingTypes = exports.ViewerActionTypes = exports.NotificationTypes = void 0;
var NotificationTypes;
(function (NotificationTypes) {
    NotificationTypes["fileDownloadStart"] = "fileDownloadStart";
    NotificationTypes["fileDownloadComplete"] = "fileDownloadComplete";
})(NotificationTypes = exports.NotificationTypes || (exports.NotificationTypes = {}));
/**
 * @private
 * Hide from docs.
 * ------
 */
var ViewerActionTypes;
(function (ViewerActionTypes) {
    ViewerActionTypes["view"] = "view";
    ViewerActionTypes["edit"] = "edit";
    ViewerActionTypes["editNew"] = "editNew";
})(ViewerActionTypes = exports.ViewerActionTypes || (exports.ViewerActionTypes = {}));
/**
 * * @private
 * Hide from docs.
 * ------
 * User setting changes that can be subscribed to,
 */
var UserSettingTypes;
(function (UserSettingTypes) {
    /**
     * Use this key to subscribe to changes in user's file open preference
     */
    UserSettingTypes["fileOpenPreference"] = "fileOpenPreference";
    /**
     * Use this key to subscribe to theme changes
     */
    UserSettingTypes["theme"] = "theme";
})(UserSettingTypes = exports.UserSettingTypes || (exports.UserSettingTypes = {}));


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.conversations = void 0;
var internalAPIs_1 = __webpack_require__(1);
var constants_1 = __webpack_require__(2);
var communication_1 = __webpack_require__(0);
var handlers_1 = __webpack_require__(3);
/**
 * Namespace to interact with the conversational subEntities inside the tab
 */
var conversations;
(function (conversations) {
    /**
     * @private
     * Hide from docs
     * --------------
     * Allows the user to start or continue a conversation with each subentity inside the tab
     */
    function openConversation(openConversationRequest) {
        (0, internalAPIs_1.ensureInitialized)(constants_1.FrameContexts.content);
        (0, communication_1.sendMessageToParent)('conversations.openConversation', [
            {
                title: openConversationRequest.title,
                subEntityId: openConversationRequest.subEntityId,
                conversationId: openConversationRequest.conversationId,
                channelId: openConversationRequest.channelId,
                entityId: openConversationRequest.entityId,
            },
        ], function (status, reason) {
            if (!status) {
                throw new Error(reason);
            }
        });
        if (openConversationRequest.onStartConversation) {
            (0, handlers_1.registerHandler)('startConversation', function (subEntityId, conversationId, channelId, entityId) {
                return openConversationRequest.onStartConversation({
                    subEntityId: subEntityId,
                    conversationId: conversationId,
                    channelId: channelId,
                    entityId: entityId,
                });
            });
        }
        if (openConversationRequest.onCloseConversation) {
            (0, handlers_1.registerHandler)('closeConversation', function (subEntityId, conversationId, channelId, entityId) {
                return openConversationRequest.onCloseConversation({
                    subEntityId: subEntityId,
                    conversationId: conversationId,
                    channelId: channelId,
                    entityId: entityId,
                });
            });
        }
    }
    conversations.openConversation = openConversation;
    /**
     * @private
     * Hide from docs
     * --------------
     * Allows the user to close the conversation in the right pane
     */
    function closeConversation() {
        (0, internalAPIs_1.ensureInitialized)(constants_1.FrameContexts.content);
        (0, communication_1.sendMessageToParent)('conversations.closeConversation');
        (0, handlers_1.removeHandler)('startConversation');
        (0, handlers_1.removeHandler)('closeConversation');
    }
    conversations.closeConversation = closeConversation;
})(conversations = exports.conversations || (exports.conversations = {}));


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.meetingRoom = void 0;
var internalAPIs_1 = __webpack_require__(1);
var communication_1 = __webpack_require__(0);
var handlers_1 = __webpack_require__(3);
var meetingRoom;
(function (meetingRoom) {
    /**
     * @private
     * Hide from docs
     *
     * Enum used to indicate meeting room capabilities.
     */
    var Capability;
    (function (Capability) {
        /**
         * Media control capability: toggle mute.
         */
        Capability["toggleMute"] = "toggleMute";
        /**
         * Media control capability: toggle camera.
         */
        Capability["toggleCamera"] = "toggleCamera";
        /**
         * Media control capability: toggle captions.
         */
        Capability["toggleCaptions"] = "toggleCaptions";
        /**
         * Media control capability: volume ajustion.
         */
        Capability["volume"] = "volume";
        /**
         * Stage layout control capability: show gallery mode.
         */
        Capability["showVideoGallery"] = "showVideoGallery";
        /**
         * Stage layout control capability: show content mode.
         */
        Capability["showContent"] = "showContent";
        /**
         * Stage layout control capability: show content + gallery mode.
         */
        Capability["showVideoGalleryAndContent"] = "showVideoGalleryAndContent";
        /**
         * Stage layout control capability: show large gallery mode.
         */
        Capability["showLargeGallery"] = "showLargeGallery";
        /**
         * Stage layout control capability: show together mode.
         */
        Capability["showTogether"] = "showTogether";
        /**
         * Meeting control capability: leave meeting.
         */
        Capability["leaveMeeting"] = "leaveMeeting";
    })(Capability = meetingRoom.Capability || (meetingRoom.Capability = {}));
    /**
     * @private
     * Hide from docs
     *
     * Fetch the meeting room info that paired with current client.
     * @param callback Callback to invoke when the meeting room info is fetched.
     */
    function getPairedMeetingRoomInfo(callback) {
        (0, internalAPIs_1.ensureInitialized)();
        (0, communication_1.sendMessageToParent)('meetingRoom.getPairedMeetingRoomInfo', callback);
    }
    meetingRoom.getPairedMeetingRoomInfo = getPairedMeetingRoomInfo;
    /**
     * @private
     * Hide from docs
     *
     * Send a command to paired meeting room.
     * @param commandName The command name.
     * @param callback Callback to invoke when the command response returns.
     */
    function sendCommandToPairedMeetingRoom(commandName, callback) {
        if (!commandName || commandName.length == 0) {
            throw new Error('[meetingRoom.sendCommandToPairedMeetingRoom] Command name cannot be null or empty');
        }
        if (!callback) {
            throw new Error('[meetingRoom.sendCommandToPairedMeetingRoom] Callback cannot be null');
        }
        (0, internalAPIs_1.ensureInitialized)();
        (0, communication_1.sendMessageToParent)('meetingRoom.sendCommandToPairedMeetingRoom', [commandName], callback);
    }
    meetingRoom.sendCommandToPairedMeetingRoom = sendCommandToPairedMeetingRoom;
    /**
     * @private
     * Hide from docs
     *
     * Registers a handler for meeting room capabilities update.
     * Only one handler can be registered at a time. A subsequent registration replaces an existing registration.
     * @param handler The handler to invoke when the capabilities of meeting room update.
     */
    function registerMeetingRoomCapabilitiesUpdateHandler(handler) {
        if (!handler) {
            throw new Error('[meetingRoom.registerMeetingRoomCapabilitiesUpdateHandler] Handler cannot be null');
        }
        (0, internalAPIs_1.ensureInitialized)();
        (0, handlers_1.registerHandler)('meetingRoom.meetingRoomCapabilitiesUpdate', function (capabilities) {
            (0, internalAPIs_1.ensureInitialized)();
            handler(capabilities);
        });
        // handler && Communication.sendMessageToParent('registerHandler', ['meetingRoom.meetingRoomCapabilitiesUpdate']);
    }
    meetingRoom.registerMeetingRoomCapabilitiesUpdateHandler = registerMeetingRoomCapabilitiesUpdateHandler;
    /**
     * @private
     * Hide from docs
     * Registers a handler for meeting room states update.
     * Only one handler can be registered at a time. A subsequent registration replaces an existing registration.
     * @param handler The handler to invoke when the states of meeting room update.
     */
    function registerMeetingRoomStatesUpdateHandler(handler) {
        if (!handler) {
            throw new Error('[meetingRoom.registerMeetingRoomStatesUpdateHandler] Handler cannot be null');
        }
        (0, internalAPIs_1.ensureInitialized)();
        (0, handlers_1.registerHandler)('meetingRoom.meetingRoomStatesUpdate', function (states) {
            (0, internalAPIs_1.ensureInitialized)();
            handler(states);
        });
        // handler && Communication.sendMessageToParent('registerHandler', ['meetingRoom.meetingRoomStatesUpdate']);
    }
    meetingRoom.registerMeetingRoomStatesUpdateHandler = registerMeetingRoomStatesUpdateHandler;
})(meetingRoom = exports.meetingRoom || (exports.meetingRoom = {}));


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.remoteCamera = void 0;
var internalAPIs_1 = __webpack_require__(1);
var constants_1 = __webpack_require__(2);
var communication_1 = __webpack_require__(0);
var handlers_1 = __webpack_require__(3);
var remoteCamera;
(function (remoteCamera) {
    /**
     * @private
     * Hide from docs
     *
     * Enum used to indicate possible camera control commands.
     */
    var ControlCommand;
    (function (ControlCommand) {
        ControlCommand["Reset"] = "Reset";
        ControlCommand["ZoomIn"] = "ZoomIn";
        ControlCommand["ZoomOut"] = "ZoomOut";
        ControlCommand["PanLeft"] = "PanLeft";
        ControlCommand["PanRight"] = "PanRight";
        ControlCommand["TiltUp"] = "TiltUp";
        ControlCommand["TiltDown"] = "TiltDown";
    })(ControlCommand = remoteCamera.ControlCommand || (remoteCamera.ControlCommand = {}));
    /**
     * @private
     * Hide from docs
     *
     * Enum used to indicate the reason for the error.
     */
    var ErrorReason;
    (function (ErrorReason) {
        ErrorReason[ErrorReason["CommandResetError"] = 0] = "CommandResetError";
        ErrorReason[ErrorReason["CommandZoomInError"] = 1] = "CommandZoomInError";
        ErrorReason[ErrorReason["CommandZoomOutError"] = 2] = "CommandZoomOutError";
        ErrorReason[ErrorReason["CommandPanLeftError"] = 3] = "CommandPanLeftError";
        ErrorReason[ErrorReason["CommandPanRightError"] = 4] = "CommandPanRightError";
        ErrorReason[ErrorReason["CommandTiltUpError"] = 5] = "CommandTiltUpError";
        ErrorReason[ErrorReason["CommandTiltDownError"] = 6] = "CommandTiltDownError";
        ErrorReason[ErrorReason["SendDataError"] = 7] = "SendDataError";
    })(ErrorReason = remoteCamera.ErrorReason || (remoteCamera.ErrorReason = {}));
    /**
     * @private
     * Hide from docs
     *
     * Enum used to indicate the reason the session was terminated.
     */
    var SessionTerminatedReason;
    (function (SessionTerminatedReason) {
        SessionTerminatedReason[SessionTerminatedReason["None"] = 0] = "None";
        SessionTerminatedReason[SessionTerminatedReason["ControlDenied"] = 1] = "ControlDenied";
        SessionTerminatedReason[SessionTerminatedReason["ControlNoResponse"] = 2] = "ControlNoResponse";
        SessionTerminatedReason[SessionTerminatedReason["ControlBusy"] = 3] = "ControlBusy";
        SessionTerminatedReason[SessionTerminatedReason["AckTimeout"] = 4] = "AckTimeout";
        SessionTerminatedReason[SessionTerminatedReason["ControlTerminated"] = 5] = "ControlTerminated";
        SessionTerminatedReason[SessionTerminatedReason["ControllerTerminated"] = 6] = "ControllerTerminated";
        SessionTerminatedReason[SessionTerminatedReason["DataChannelError"] = 7] = "DataChannelError";
        SessionTerminatedReason[SessionTerminatedReason["ControllerCancelled"] = 8] = "ControllerCancelled";
        SessionTerminatedReason[SessionTerminatedReason["ControlDisabled"] = 9] = "ControlDisabled";
        SessionTerminatedReason[SessionTerminatedReason["ControlTerminatedToAllowOtherController"] = 10] = "ControlTerminatedToAllowOtherController";
    })(SessionTerminatedReason = remoteCamera.SessionTerminatedReason || (remoteCamera.SessionTerminatedReason = {}));
    /**
     * @private
     * Hide from docs
     *
     * Fetch a list of the participants with controllable-cameras in a meeting.
     * @param callback Callback contains 2 parameters, error and participants.
     * error can either contain an error of type SdkError, incase of an error, or null when fetch is successful
     * participants can either contain an array of Participant objects, incase of a successful fetch or null when it fails
     * participants: object that contains an array of participants with controllable-cameras
     */
    function getCapableParticipants(callback) {
        if (!callback) {
            throw new Error('[remoteCamera.getCapableParticipants] Callback cannot be null');
        }
        (0, internalAPIs_1.ensureInitialized)(constants_1.FrameContexts.sidePanel);
        (0, communication_1.sendMessageToParent)('remoteCamera.getCapableParticipants', callback);
    }
    remoteCamera.getCapableParticipants = getCapableParticipants;
    /**
     * @private
     * Hide from docs
     *
     * Request control of a participant's camera.
     * @param participant Participant specifies the participant to send the request for camera control.
     * @param callback Callback contains 2 parameters, error and requestResponse.
     * error can either contain an error of type SdkError, incase of an error, or null when fetch is successful
     * requestResponse can either contain the true/false value, incase of a successful request or null when it fails
     * requestResponse: True means request was accepted and false means request was denied
     */
    function requestControl(participant, callback) {
        if (!participant) {
            throw new Error('[remoteCamera.requestControl] Participant cannot be null');
        }
        if (!callback) {
            throw new Error('[remoteCamera.requestControl] Callback cannot be null');
        }
        (0, internalAPIs_1.ensureInitialized)(constants_1.FrameContexts.sidePanel);
        (0, communication_1.sendMessageToParent)('remoteCamera.requestControl', [participant], callback);
    }
    remoteCamera.requestControl = requestControl;
    /**
     * @private
     * Hide from docs
     *
     * Send control command to the participant's camera.
     * @param ControlCommand ControlCommand specifies the command for controling the camera.
     * @param callback Callback to invoke when the command response returns.
     */
    function sendControlCommand(ControlCommand, callback) {
        if (!ControlCommand) {
            throw new Error('[remoteCamera.sendControlCommand] ControlCommand cannot be null');
        }
        if (!callback) {
            throw new Error('[remoteCamera.sendControlCommand] Callback cannot be null');
        }
        (0, internalAPIs_1.ensureInitialized)(constants_1.FrameContexts.sidePanel);
        (0, communication_1.sendMessageToParent)('remoteCamera.sendControlCommand', [ControlCommand], callback);
    }
    remoteCamera.sendControlCommand = sendControlCommand;
    /**
     * @private
     * Hide from docs
     *
     * Terminate the remote  session
     * @param callback Callback to invoke when the command response returns.
     */
    function terminateSession(callback) {
        if (!callback) {
            throw new Error('[remoteCamera.terminateSession] Callback cannot be null');
        }
        (0, internalAPIs_1.ensureInitialized)(constants_1.FrameContexts.sidePanel);
        (0, communication_1.sendMessageToParent)('remoteCamera.terminateSession', callback);
    }
    remoteCamera.terminateSession = terminateSession;
    /**
     * Registers a handler for change in participants with controllable-cameras.
     * Only one handler can be registered at a time. A subsequent registration replaces an existing registration.
     * @param handler The handler to invoke when the list of participants with controllable-cameras changes.
     */
    function registerOnCapableParticipantsChangeHandler(handler) {
        if (!handler) {
            throw new Error('[remoteCamera.registerOnCapableParticipantsChangeHandler] Handler cannot be null');
        }
        (0, internalAPIs_1.ensureInitialized)(constants_1.FrameContexts.sidePanel);
        (0, handlers_1.registerHandler)('remoteCamera.capableParticipantsChange', handler);
    }
    remoteCamera.registerOnCapableParticipantsChangeHandler = registerOnCapableParticipantsChangeHandler;
    /**
     * Registers a handler for error.
     * Only one handler can be registered at a time. A subsequent registration replaces an existing registration.
     * @param handler The handler to invoke when there is an error from the camera handler.
     */
    function registerOnErrorHandler(handler) {
        if (!handler) {
            throw new Error('[remoteCamera.registerOnErrorHandler] Handler cannot be null');
        }
        (0, internalAPIs_1.ensureInitialized)(constants_1.FrameContexts.sidePanel);
        (0, handlers_1.registerHandler)('remoteCamera.handlerError', handler);
    }
    remoteCamera.registerOnErrorHandler = registerOnErrorHandler;
    /**
     * Registers a handler for device state change.
     * Only one handler can be registered at a time. A subsequent registration replaces an existing registration.
     * @param handler The handler to invoke when the controlled device changes state.
     */
    function registerOnDeviceStateChangeHandler(handler) {
        if (!handler) {
            throw new Error('[remoteCamera.registerOnDeviceStateChangeHandler] Handler cannot be null');
        }
        (0, internalAPIs_1.ensureInitialized)(constants_1.FrameContexts.sidePanel);
        (0, handlers_1.registerHandler)('remoteCamera.deviceStateChange', handler);
    }
    remoteCamera.registerOnDeviceStateChangeHandler = registerOnDeviceStateChangeHandler;
    /**
     * Registers a handler for session status change.
     * Only one handler can be registered at a time. A subsequent registration replaces an existing registration.
     * @param handler The handler to invoke when the current session status changes.
     */
    function registerOnSessionStatusChangeHandler(handler) {
        if (!handler) {
            throw new Error('[remoteCamera.registerOnSessionStatusChangeHandler] Handler cannot be null');
        }
        (0, internalAPIs_1.ensureInitialized)(constants_1.FrameContexts.sidePanel);
        (0, handlers_1.registerHandler)('remoteCamera.sessionStatusChange', handler);
    }
    remoteCamera.registerOnSessionStatusChangeHandler = registerOnSessionStatusChangeHandler;
})(remoteCamera = exports.remoteCamera || (exports.remoteCamera = {}));


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.files = void 0;
var communication_1 = __webpack_require__(0);
var internalAPIs_1 = __webpack_require__(1);
var public_1 = __webpack_require__(8);
/**
 * Namespace to interact with the files specific part of the SDK.
 *
 * @private
 * Hide from docs
 */
var files;
(function (files_1) {
    /**
     * @private
     * Hide from docs
     *
     * Cloud storage providers registered with Microsoft Teams
     */
    var CloudStorageProvider;
    (function (CloudStorageProvider) {
        CloudStorageProvider["Dropbox"] = "DROPBOX";
        CloudStorageProvider["Box"] = "BOX";
        CloudStorageProvider["Sharefile"] = "SHAREFILE";
        CloudStorageProvider["GoogleDrive"] = "GOOGLEDRIVE";
        CloudStorageProvider["Egnyte"] = "EGNYTE";
        CloudStorageProvider["SharePoint"] = "SharePoint";
    })(CloudStorageProvider = files_1.CloudStorageProvider || (files_1.CloudStorageProvider = {}));
    /**
     * @private
     * Hide from docs
     *
     * Cloud storage provider type enums
     */
    var CloudStorageProviderType;
    (function (CloudStorageProviderType) {
        CloudStorageProviderType[CloudStorageProviderType["Sharepoint"] = 0] = "Sharepoint";
        CloudStorageProviderType[CloudStorageProviderType["WopiIntegration"] = 1] = "WopiIntegration";
        CloudStorageProviderType[CloudStorageProviderType["Google"] = 2] = "Google";
        CloudStorageProviderType[CloudStorageProviderType["OneDrive"] = 3] = "OneDrive";
        CloudStorageProviderType[CloudStorageProviderType["Recent"] = 4] = "Recent";
        CloudStorageProviderType[CloudStorageProviderType["Aggregate"] = 5] = "Aggregate";
        CloudStorageProviderType[CloudStorageProviderType["FileSystem"] = 6] = "FileSystem";
        CloudStorageProviderType[CloudStorageProviderType["Search"] = 7] = "Search";
        CloudStorageProviderType[CloudStorageProviderType["AllFiles"] = 8] = "AllFiles";
        CloudStorageProviderType[CloudStorageProviderType["SharedWithMe"] = 9] = "SharedWithMe";
    })(CloudStorageProviderType = files_1.CloudStorageProviderType || (files_1.CloudStorageProviderType = {}));
    /**
     * @private
     * Hide from docs
     *
     * Special Document Library enum
     */
    var SpecialDocumentLibraryType;
    (function (SpecialDocumentLibraryType) {
        SpecialDocumentLibraryType["ClassMaterials"] = "classMaterials";
    })(SpecialDocumentLibraryType = files_1.SpecialDocumentLibraryType || (files_1.SpecialDocumentLibraryType = {}));
    /**
     * @private
     * Hide from docs
     *
     * Document Library Access enum
     */
    var DocumentLibraryAccessType;
    (function (DocumentLibraryAccessType) {
        DocumentLibraryAccessType["Readonly"] = "readonly";
    })(DocumentLibraryAccessType = files_1.DocumentLibraryAccessType || (files_1.DocumentLibraryAccessType = {}));
    /**
     * @private
     * Hide from docs
     *
     * Download status enum
     */
    var FileDownloadStatus;
    (function (FileDownloadStatus) {
        FileDownloadStatus["Downloaded"] = "Downloaded";
        FileDownloadStatus["Downloading"] = "Downloading";
        FileDownloadStatus["Failed"] = "Failed";
    })(FileDownloadStatus = files_1.FileDownloadStatus || (files_1.FileDownloadStatus = {}));
    /**
     * @private
     * Hide from docs
     *
     * Gets a list of cloud storage folders added to the channel
     * @param channelId ID of the channel whose cloud storage folders should be retrieved
     * @param callback Callback that will be triggered post folders load
     */
    function getCloudStorageFolders(channelId, callback) {
        (0, internalAPIs_1.ensureInitialized)(public_1.FrameContexts.content);
        if (!channelId || channelId.length === 0) {
            throw new Error('[files.getCloudStorageFolders] channelId name cannot be null or empty');
        }
        if (!callback) {
            throw new Error('[files.getCloudStorageFolders] Callback cannot be null');
        }
        (0, communication_1.sendMessageToParent)('files.getCloudStorageFolders', [channelId], callback);
    }
    files_1.getCloudStorageFolders = getCloudStorageFolders;
    /**
     * @private
     * Hide from docs
     *
     * Initiates the add cloud storage folder flow
     * @param channelId ID of the channel to add cloud storage folder
     * @param callback Callback that will be triggered post add folder flow is compelete
     */
    function addCloudStorageFolder(channelId, callback) {
        (0, internalAPIs_1.ensureInitialized)(public_1.FrameContexts.content);
        if (!channelId || channelId.length === 0) {
            throw new Error('[files.addCloudStorageFolder] channelId name cannot be null or empty');
        }
        if (!callback) {
            throw new Error('[files.addCloudStorageFolder] Callback cannot be null');
        }
        (0, communication_1.sendMessageToParent)('files.addCloudStorageFolder', [channelId], callback);
    }
    files_1.addCloudStorageFolder = addCloudStorageFolder;
    /**
     * @private
     * Hide from docs
     *
     * Deletes a cloud storage folder from channel
     * @param channelId ID of the channel where folder is to be deleted
     * @param folderToDelete cloud storage folder to be deleted
     * @param callback Callback that will be triggered post delete
     */
    function deleteCloudStorageFolder(channelId, folderToDelete, callback) {
        (0, internalAPIs_1.ensureInitialized)(public_1.FrameContexts.content);
        if (!channelId) {
            throw new Error('[files.deleteCloudStorageFolder] channelId name cannot be null or empty');
        }
        if (!folderToDelete) {
            throw new Error('[files.deleteCloudStorageFolder] folderToDelete cannot be null or empty');
        }
        if (!callback) {
            throw new Error('[files.deleteCloudStorageFolder] Callback cannot be null');
        }
        (0, communication_1.sendMessageToParent)('files.deleteCloudStorageFolder', [channelId, folderToDelete], callback);
    }
    files_1.deleteCloudStorageFolder = deleteCloudStorageFolder;
    /**
     * @private
     * Hide from docs
     *
     * Fetches the contents of a Cloud storage folder (CloudStorageFolder) / sub directory
     * @param folder Cloud storage folder (CloudStorageFolder) / sub directory (CloudStorageFolderItem)
     * @param providerCode Code of the cloud storage folder provider
     * @param callback Callback that will be triggered post contents are loaded
     */
    function getCloudStorageFolderContents(folder, providerCode, callback) {
        (0, internalAPIs_1.ensureInitialized)(public_1.FrameContexts.content);
        if (!folder || !providerCode) {
            throw new Error('[files.getCloudStorageFolderContents] folder/providerCode name cannot be null or empty');
        }
        if (!callback) {
            throw new Error('[files.getCloudStorageFolderContents] Callback cannot be null');
        }
        if ('isSubdirectory' in folder && !folder.isSubdirectory) {
            throw new Error('[files.getCloudStorageFolderContents] provided folder is not a subDirectory');
        }
        (0, communication_1.sendMessageToParent)('files.getCloudStorageFolderContents', [folder, providerCode], callback);
    }
    files_1.getCloudStorageFolderContents = getCloudStorageFolderContents;
    /**
     * @private
     * Hide from docs
     *
     * Open a cloud storage file in teams
     * @param file cloud storage file that should be opened
     * @param providerCode Code of the cloud storage folder provider
     * @param fileOpenPreference Whether file should be opened in web/inline
     */
    function openCloudStorageFile(file, providerCode, fileOpenPreference) {
        (0, internalAPIs_1.ensureInitialized)(public_1.FrameContexts.content);
        if (!file || !providerCode) {
            throw new Error('[files.openCloudStorageFile] file/providerCode cannot be null or empty');
        }
        if (file.isSubdirectory) {
            throw new Error('[files.openCloudStorageFile] provided file is a subDirectory');
        }
        (0, communication_1.sendMessageToParent)('files.openCloudStorageFile', [file, providerCode, fileOpenPreference]);
    }
    files_1.openCloudStorageFile = openCloudStorageFile;
    /**
     * @private
     * Allow 1st party apps to call this function to get the external
     * third party cloud storage accounts that the tenant supports
     * @param excludeAddedProviders: return a list of support third party
     * cloud storages that hasn't been added yet.
     */
    function getExternalProviders(excludeAddedProviders, callback) {
        if (excludeAddedProviders === void 0) { excludeAddedProviders = false; }
        (0, internalAPIs_1.ensureInitialized)(public_1.FrameContexts.content);
        if (!callback) {
            throw new Error('[files.getExternalProviders] Callback cannot be null');
        }
        (0, communication_1.sendMessageToParent)('files.getExternalProviders', [excludeAddedProviders], callback);
    }
    files_1.getExternalProviders = getExternalProviders;
    /**
     * @private
     * Allow 1st party apps to call this function to move files
     * among SharePoint and third party cloud storages.
     */
    function copyMoveFiles(selectedFiles, providerCode, destinationFolder, destinationProviderCode, isMove, callback) {
        if (isMove === void 0) { isMove = false; }
        (0, internalAPIs_1.ensureInitialized)(public_1.FrameContexts.content);
        if (!selectedFiles || selectedFiles.length === 0) {
            throw new Error('[files.copyMoveFiles] selectedFiles cannot be null or empty');
        }
        if (!providerCode) {
            throw new Error('[files.copyMoveFiles] providerCode cannot be null or empty');
        }
        if (!destinationFolder) {
            throw new Error('[files.copyMoveFiles] destinationFolder cannot be null or empty');
        }
        if (!destinationProviderCode) {
            throw new Error('[files.copyMoveFiles] destinationProviderCode cannot be null or empty');
        }
        if (!callback) {
            throw new Error('[files.copyMoveFiles] callback cannot be null');
        }
        (0, communication_1.sendMessageToParent)('files.copyMoveFiles', [selectedFiles, providerCode, destinationFolder, destinationProviderCode, isMove], callback);
    }
    files_1.copyMoveFiles = copyMoveFiles;
    /**
     * @private
     * Hide from docs
     *
     * Gets list of downloads for current user
     * @param callback Callback that will be triggered post downloads load
     */
    function getFileDownloads(callback) {
        (0, internalAPIs_1.ensureInitialized)(public_1.FrameContexts.content);
        if (!callback) {
            throw new Error('[files.getFileDownloads] Callback cannot be null');
        }
        (0, communication_1.sendMessageToParent)('files.getFileDownloads', [], callback);
    }
    files_1.getFileDownloads = getFileDownloads;
    /**
     * @private
     * Hide from docs
     *
     * Open download preference folder if fileObjectId value is undefined else open folder containing the file with id fileObjectId
     * @param fileObjectId: Id of the file whose containing folder should be opened
     * @param callback Callback that will be triggered post open download folder/path
     */
    function openDownloadFolder(fileObjectId, callback) {
        if (fileObjectId === void 0) { fileObjectId = undefined; }
        (0, internalAPIs_1.ensureInitialized)(public_1.FrameContexts.content);
        if (!callback) {
            throw new Error('[files.openDownloadFolder] Callback cannot be null');
        }
        (0, communication_1.sendMessageToParent)('files.openDownloadFolder', [fileObjectId], callback);
    }
    files_1.openDownloadFolder = openDownloadFolder;
})(files = exports.files || (exports.files = {}));


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.appEntity = void 0;
var communication_1 = __webpack_require__(0);
var internalAPIs_1 = __webpack_require__(1);
var public_1 = __webpack_require__(8);
/**
 * Namespace to interact with the application entities specific part of the SDK.
 *
 * @private
 * Hide from docs
 */
var appEntity;
(function (appEntity_1) {
    /**
     * @private
     * Hide from docs
     *
     * Open the Tab Gallery and retrieve the app entity
     * @param threadId ID of the thread where the app entity will be created
     * @param categories A list of app categories that will be displayed in the opened tab gallery
     * @param subEntityId An object that will be made available to the application being configured
     *                      through the Teams Context's subEntityId field.
     * @param callback Callback that will be triggered once the app entity information is available.
     *                 The callback takes two arguments: an SdkError in case something happened (i.e.
     *                 no permissions to execute the API) and the app entity configuration, if available
     */
    function selectAppEntity(threadId, categories, subEntityId, callback) {
        (0, internalAPIs_1.ensureInitialized)(public_1.FrameContexts.content);
        if (!threadId || threadId.length == 0) {
            throw new Error('[appEntity.selectAppEntity] threadId name cannot be null or empty');
        }
        if (!callback) {
            throw new Error('[appEntity.selectAppEntity] Callback cannot be null');
        }
        (0, communication_1.sendMessageToParent)('appEntity.selectAppEntity', [threadId, categories, subEntityId], callback);
    }
    appEntity_1.selectAppEntity = selectAppEntity;
})(appEntity = exports.appEntity || (exports.appEntity = {}));


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.teams = void 0;
var communication_1 = __webpack_require__(0);
var internalAPIs_1 = __webpack_require__(1);
var public_1 = __webpack_require__(8);
/**
 * Namespace to interact with the `teams` specific part of the SDK.
 *
 * @private
 * Hide from docs
 */
var teams;
(function (teams) {
    var ChannelType;
    (function (ChannelType) {
        ChannelType[ChannelType["Regular"] = 0] = "Regular";
        ChannelType[ChannelType["Private"] = 1] = "Private";
        ChannelType[ChannelType["Shared"] = 2] = "Shared";
    })(ChannelType = teams.ChannelType || (teams.ChannelType = {}));
    /**
     * @private
     * Hide from docs
     *
     * Get a list of channels belong to a Team
     * @param groupId a team's objectId
     */
    function getTeamChannels(groupId, callback) {
        (0, internalAPIs_1.ensureInitialized)(public_1.FrameContexts.content);
        if (!groupId) {
            throw new Error('[teams.getTeamChannels] groupId cannot be null or empty');
        }
        if (!callback) {
            throw new Error('[teams.getTeamChannels] Callback cannot be null');
        }
        (0, communication_1.sendMessageToParent)('teams.getTeamChannels', [groupId], callback);
    }
    teams.getTeamChannels = getTeamChannels;
    /**
     * @private
     * Allow 1st party apps to call this function when they receive migrated errors to inform Teams refresh siteurl
     * when site admin renames siteurl.
     * @param threadId ID of the thread where the app entity will be created; if threadId is not
     * provided, the threadId from route params will be used.
     */
    function refreshSiteUrl(threadId, callback) {
        (0, internalAPIs_1.ensureInitialized)();
        if (!threadId) {
            throw new Error('[teams.refreshSiteUrl] threadId cannot be null or empty');
        }
        if (!callback) {
            throw new Error('[teams.refreshSiteUrl] Callback cannot be null');
        }
        (0, communication_1.sendMessageToParent)('teams.refreshSiteUrl', [threadId], callback);
    }
    teams.refreshSiteUrl = refreshSiteUrl;
})(teams = exports.teams || (exports.teams = {}));


/***/ })
/******/ ]);
});
//# sourceMappingURL=MicrosoftTeams.js.map