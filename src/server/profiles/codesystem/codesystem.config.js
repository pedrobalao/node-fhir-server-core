const { route_args, common_args, write_args } = require('../common.arguments');
const { read_scopes, write_scopes } = require('../common.scopes');
const { CONFIG_KEYS, VERSIONS } = require('../../../constants');
const resource_args = require('./codesystem.arguments');
const controller = require('./codesystem.controller');

let write_only_scopes = write_scopes('CodeSystem');
let read_only_scopes = read_scopes('CodeSystem');

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
		path: '/:version/codesystem',
		args: resourceAllArguments,
		scopes: read_only_scopes,
		controller: controller.getCodeSystem
	},
	{
		type: 'post',
		path: '/:version/codesystem/_search',
		args: resourceAllArguments,
		scopes: read_only_scopes,
		controller: controller.getCodeSystem
	},
	{
		type: 'get',
		path: '/:version/codesystem/:id',
		args: [
			route_args.VERSION,
			route_args.ID
		],
		scopes: read_only_scopes,
		controller: controller.getCodeSystemById
	},
	{
		type: 'post',
		path: '/:version/codesystem',
		args: [
			route_args.VERSION,
			write_args.RESOURCE_ID,
			write_args.RESOURCE_BODY
		],
		scopes: write_only_scopes,
		controller: controller.createCodeSystem
	},
	{
		type: 'put',
		path: '/:version/codesystem/:id',
		args: [
			route_args.ID,
			route_args.VERSION,
			write_args.RESOURCE_BODY
		],
		scopes: write_only_scopes,
		controller: controller.updateCodeSystem
	},
	{
		type: 'delete',
		path: '/:version/codesystem/:id',
		args: [
			route_args.ID,
			route_args.VERSION,
			write_args.RESOURCE_BODY
		],
		scopes: write_only_scopes,
		controller: controller.deleteCodeSystem
	}
];

/**
 * @name exports
 * @summary CodeSystem config
 */
module.exports = {
	routeOptions: {
		profileKey: CONFIG_KEYS.CODESYSTEM
	},
	routes
};
