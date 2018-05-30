const { route_args, common_args, write_args } = require('../common.arguments');
const { read_scopes, write_scopes } = require('../common.scopes');
const { CONFIG_KEYS, VERSIONS } = require('../../../constants');
const resource_args = require('./testscript.arguments');
const controller = require('./testscript.controller');

let write_only_scopes = write_scopes('TestScript');
let read_only_scopes = read_scopes('TestScript');

let commonArgsArray = Object.getOwnPropertyNames(common_args)
	.map((arg_name) => common_args[arg_name]);

let resourceArgsArray = Object.getOwnPropertyNames(resource_args)
	.map((arg_name) => Object.assign({ versions: VERSIONS.STU3 }, resource_args[arg_name]));

const resourceAllArguments = [
	route_args.VERSION,	...commonArgsArray, ...resourceArgsArray,
];

let routes = [
	{
		type: 'get',
		path: '/:version/testscript',
		args: resourceAllArguments,
		scopes: read_only_scopes,
		controller: controller.getTestScript
	},
	{
		type: 'post',
		path: '/:version/testscript/_search',
		args: resourceAllArguments,
		scopes: read_only_scopes,
		controller: controller.getTestScript
	},
	{
		type: 'get',
		path: '/:version/testscript/:id',
		args: [
			route_args.VERSION,
			route_args.ID
		],
		scopes: read_only_scopes,
		controller: controller.getTestScriptById
	},
	{
		type: 'post',
		path: '/:version/testscript',
		args: [
			route_args.VERSION,
			write_args.RESOURCE_ID,
			write_args.RESOURCE_BODY
		],
		scopes: write_only_scopes,
		controller: controller.createTestScript
	},
	{
		type: 'put',
		path: '/:version/testscript/:id',
		args: [
			route_args.ID,
			route_args.VERSION,
			write_args.RESOURCE_BODY
		],
		scopes: write_only_scopes,
		controller: controller.updateTestScript
	},
	{
		type: 'delete',
		path: '/:version/testscript/:id',
		args: [
			route_args.ID,
			route_args.VERSION,
			write_args.RESOURCE_BODY
		],
		scopes: write_only_scopes,
		controller: controller.deleteTestScript
	}
];

/**
 * @name exports
 * @summary TestScript config
 */
module.exports = {
	routeOptions: {
		profileKey: CONFIG_KEYS.TESTSCRIPT
	},
	routes
};
