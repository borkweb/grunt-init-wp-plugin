<?php
/*
Plugin Name: {%= title %}
Version: 1.0
Plugin URI: {%= plugin_url %}
Description: {%= description %}
Author: {%= author %}
Author URI: {%= author_uri %}
Contributors: {%= contributors %}
Tags: {%= tags %}
License: {%= license %}
*/

require_once __DIR__ . '/components/class-{%= name %}.php';

{%= singleton %}();
