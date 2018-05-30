const { route_args, common_args, write_args } = require('../common.arguments');
const { read_scopes, write_scopes } = require('../common.scopes');
const { CONFIG_KEYS, VERSIONS } = require('../../../constants');
const resource_args = require('./implementationguide.arguments');
const controller = require('./implementationguide.controller');

let write_only_scopes = write_scopes('ImplementationGuide');
let read_only_scopes = read_scopes('ImplementationGuide');

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
		path: '/:version/implementationguide',
		args: resourceAllArguments,
		scopes: read_only_scopes,
		controller: controller.getImplementationGuide
	},
	{
		type: 'post',
		path: '/:version/implementationguide/_search',
		args: resourceAllArguments,
		scopes: read_only_scopes,
		controller: controller.getImplementationGuide
	},
	{
		type: 'get',
		path: '/:version/implementationguide/:id',
		args: [
			route_args.VERSION,
			route_args.ID
		],
		scopes: read_only_scopes,
		controller: controller.getImplementationGuideById
	},
	{
		type: 'post',
		path: '/:version/implementationguide',
		args: [
			route_args.VERSION,
			write_args.RESOURCE_ID,
			write_args.RESOURCE_BODY
		],
		scopes: write_only_scopes,
		controller: controller.createImplementationGuide
	},
	{
		type: 'put',
		path: '/:version/implementationguide/:id',
		args: [
			route_args.ID,
			route_args.VERSION,
			write_args.RESOURCE_BODY
		],
		scopes: write_only_scopes,
		controller: controller.updateImplementationGuide
	},
	{
		type: 'delete',
		path: '/:version/implementationguide/:id',
		args: [
			route_args.ID,
			route_args.VERSION,
			write_args.RESOURCE_BODY
		],
		scopes: write_only_scopes,
		controller: controller.deleteImplementationGuide
	}
];

/**
 * @name exports
 * @summary ImplementationGuide config
 */
module.exports = {
	routeOptions: {
		profileKey: CONFIG_KEYS.IMPLEMENTATIONGUIDE
	},
	routes
};
