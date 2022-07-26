'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _felaBindings = require('fela-bindings');

var _context = require('./context');

exports.default = (0, _felaBindings.connectFactory)(_react.Component, _react.createElement, _context.RendererContext, _context.ThemeContext);