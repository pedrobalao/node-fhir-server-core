const { route_args, common_args, write_args } = require('../common.arguments');
const { read_scopes, write_scopes } = require('../common.scopes');
const { CONFIG_KEYS, VERSIONS } = require('../../../constants');
const resource_args = require('./list.arguments');
const controller = require('./list.controller');

let write_only_scopes = write_scopes('List');
let read_only_scopes = read_scopes('List');

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
		path: '/:version/list',
		args: resourceAllArguments,
		scopes: read_only_scopes,
		controller: controller.getList
	},
	{
		type: 'post',
		path: '/:version/list/_search',
		args: resourceAllArguments,
		scopes: read_only_scopes,
		controller: controller.getList
	},
	{
		type: 'get',
		path: '/:version/list/:id',
		args: [
			route_args.VERSION,
			route_args.ID
		],
		scopes: read_only_scopes,
		controller: controller.getListById
	},
	{
		type: 'post',
		path: '/:version/list',
		args: [
			route_args.VERSION,
			write_args.RESOURCE_ID,
			write_args.RESOURCE_BODY
		],
		scopes: write_only_scopes,
		controller: controller.createList
	},
	{
		type: 'put',
		path: '/:version/list/:id',
		args: [
			route_args.ID,
			route_args.VERSION,
			write_args.RESOURCE_BODY
		],
		scopes: write_only_scopes,
		controller: controller.updateList
	},
	{
		type: 'delete',
		path: '/:version/list/:id',
		args: [
			route_args.ID,
			route_args.VERSION,
			write_args.RESOURCE_BODY
		],
		scopes: write_only_scopes,
		controller: controller.deleteList
	}
];

/**
 * @name exports
 * @summary List config
 */
module.exports = {
	routeOptions: {
		profileKey: CONFIG_KEYS.LIST
	},
	routes
};
