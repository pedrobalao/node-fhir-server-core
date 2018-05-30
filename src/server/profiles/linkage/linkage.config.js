const { route_args, common_args, write_args } = require('../common.arguments');
const { read_scopes, write_scopes } = require('../common.scopes');
const { CONFIG_KEYS, VERSIONS } = require('../../../constants');
const resource_args = require('./linkage.arguments');
const controller = require('./linkage.controller');

let write_only_scopes = write_scopes('Linkage');
let read_only_scopes = read_scopes('Linkage');

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
		path: '/:version/linkage',
		args: resourceAllArguments,
		scopes: read_only_scopes,
		controller: controller.getLinkage
	},
	{
		type: 'post',
		path: '/:version/linkage/_search',
		args: resourceAllArguments,
		scopes: read_only_scopes,
		controller: controller.getLinkage
	},
	{
		type: 'get',
		path: '/:version/linkage/:id',
		args: [
			route_args.VERSION,
			route_args.ID
		],
		scopes: read_only_scopes,
		controller: controller.getLinkageById
	},
	{
		type: 'post',
		path: '/:version/linkage',
		args: [
			route_args.VERSION,
			write_args.RESOURCE_ID,
			write_args.RESOURCE_BODY
		],
		scopes: write_only_scopes,
		controller: controller.createLinkage
	},
	{
		type: 'put',
		path: '/:version/linkage/:id',
		args: [
			route_args.ID,
			route_args.VERSION,
			write_args.RESOURCE_BODY
		],
		scopes: write_only_scopes,
		controller: controller.updateLinkage
	},
	{
		type: 'delete',
		path: '/:version/linkage/:id',
		args: [
			route_args.ID,
			route_args.VERSION,
			write_args.RESOURCE_BODY
		],
		scopes: write_only_scopes,
		controller: controller.deleteLinkage
	}
];

/**
 * @name exports
 * @summary Linkage config
 */
module.exports = {
	routeOptions: {
		profileKey: CONFIG_KEYS.LINKAGE
	},
	routes
};
