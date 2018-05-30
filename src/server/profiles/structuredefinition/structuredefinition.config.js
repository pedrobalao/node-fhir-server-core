const { route_args, common_args, write_args } = require('../common.arguments');
const { read_scopes, write_scopes } = require('../common.scopes');
const { CONFIG_KEYS, VERSIONS } = require('../../../constants');
const resource_args = require('./structuredefinition.arguments');
const controller = require('./structuredefinition.controller');

let write_only_scopes = write_scopes('StructureDefinition');
let read_only_scopes = read_scopes('StructureDefinition');

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
		path: '/:version/structuredefinition',
		args: resourceAllArguments,
		scopes: read_only_scopes,
		controller: controller.getStructureDefinition
	},
	{
		type: 'post',
		path: '/:version/structuredefinition/_search',
		args: resourceAllArguments,
		scopes: read_only_scopes,
		controller: controller.getStructureDefinition
	},
	{
		type: 'get',
		path: '/:version/structuredefinition/:id',
		args: [
			route_args.VERSION,
			route_args.ID
		],
		scopes: read_only_scopes,
		controller: controller.getStructureDefinitionById
	},
	{
		type: 'post',
		path: '/:version/structuredefinition',
		args: [
			route_args.VERSION,
			write_args.RESOURCE_ID,
			write_args.RESOURCE_BODY
		],
		scopes: write_only_scopes,
		controller: controller.createStructureDefinition
	},
	{
		type: 'put',
		path: '/:version/structuredefinition/:id',
		args: [
			route_args.ID,
			route_args.VERSION,
			write_args.RESOURCE_BODY
		],
		scopes: write_only_scopes,
		controller: controller.updateStructureDefinition
	},
	{
		type: 'delete',
		path: '/:version/structuredefinition/:id',
		args: [
			route_args.ID,
			route_args.VERSION,
			write_args.RESOURCE_BODY
		],
		scopes: write_only_scopes,
		controller: controller.deleteStructureDefinition
	}
];

/**
 * @name exports
 * @summary StructureDefinition config
 */
module.exports = {
	routeOptions: {
		profileKey: CONFIG_KEYS.SERVICEDEFINITION
	},
	routes
};
