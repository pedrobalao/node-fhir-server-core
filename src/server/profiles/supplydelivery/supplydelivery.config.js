const { route_args, common_args, write_args } = require('../common.arguments');
const { read_scopes, write_scopes } = require('../common.scopes');
const { CONFIG_KEYS, VERSIONS } = require('../../../constants');
const resource_args = require('./supplydelivery.arguments');
const controller = require('./supplydelivery.controller');

let write_only_scopes = write_scopes('SupplyDelivery');
let read_only_scopes = read_scopes('SupplyDelivery');

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
		path: '/:version/supplydelivery',
		args: resourceAllArguments,
		scopes: read_only_scopes,
		controller: controller.getSupplyDelivery
	},
	{
		type: 'post',
		path: '/:version/supplydelivery/_search',
		args: resourceAllArguments,
		scopes: read_only_scopes,
		controller: controller.getSupplyDelivery
	},
	{
		type: 'get',
		path: '/:version/supplydelivery/:id',
		args: [
			route_args.VERSION,
			route_args.ID
		],
		scopes: read_only_scopes,
		controller: controller.getSupplyDeliveryById
	},
	{
		type: 'post',
		path: '/:version/supplydelivery',
		args: [
			route_args.VERSION,
			write_args.RESOURCE_ID,
			write_args.RESOURCE_BODY
		],
		scopes: write_only_scopes,
		controller: controller.createSupplyDelivery
	},
	{
		type: 'put',
		path: '/:version/supplydelivery/:id',
		args: [
			route_args.ID,
			route_args.VERSION,
			write_args.RESOURCE_BODY
		],
		scopes: write_only_scopes,
		controller: controller.updateSupplyDelivery
	},
	{
		type: 'delete',
		path: '/:version/supplydelivery/:id',
		args: [
			route_args.ID,
			route_args.VERSION,
			write_args.RESOURCE_BODY
		],
		scopes: write_only_scopes,
		controller: controller.deleteSupplyDelivery
	}
];

/**
 * @name exports
 * @summary SupplyDelivery config
 */
module.exports = {
	routeOptions: {
		profileKey: CONFIG_KEYS.SUPPLYDELIVERY
	},
	routes
};
