const { route_args, common_args, write_args } = require('../common.arguments');
const { read_scopes, write_scopes } = require('../common.scopes');
const { CONFIG_KEYS, VERSIONS } = require('../../../constants');
const resource_args = require('./substance.arguments');
const controller = require('./substance.controller');

let write_only_scopes = write_scopes('Substance');
let read_only_scopes = read_scopes('Substance');

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
		path: '/:version/substance',
		args: resourceAllArguments,
		scopes: read_only_scopes,
		controller: controller.getSubstance
	},
	{
		type: 'post',
		path: '/:version/substance/_search',
		args: resourceAllArguments,
		scopes: read_only_scopes,
		controller: controller.getSubstance
	},
	{
		type: 'get',
		path: '/:version/substance/:id',
		args: [
			route_args.VERSION,
			route_args.ID
		],
		scopes: read_only_scopes,
		controller: controller.getSubstanceById
	},
	{
		type: 'post',
		path: '/:version/substance',
		args: [
			route_args.VERSION,
			write_args.RESOURCE_ID,
			write_args.RESOURCE_BODY
		],
		scopes: write_only_scopes,
		controller: controller.createSubstance
	},
	{
		type: 'put',
		path: '/:version/substance/:id',
		args: [
			route_args.ID,
			route_args.VERSION,
			write_args.RESOURCE_BODY
		],
		scopes: write_only_scopes,
		controller: controller.updateSubstance
	},
	{
		type: 'delete',
		path: '/:version/substance/:id',
		args: [
			route_args.ID,
			route_args.VERSION,
			write_args.RESOURCE_BODY
		],
		scopes: write_only_scopes,
		controller: controller.deleteSubstance
	}
];

/**
 * @name exports
 * @summary Substance config
 */
module.exports = {
	routeOptions: {
		profileKey: CONFIG_KEYS.SUBSTANCE
	},
	routes
};
