const { route_args, common_args, write_args } = require('../common.arguments');
const { read_scopes, write_scopes } = require('../common.scopes');
const { CONFIG_KEYS, VERSIONS } = require('../../../constants');
const resource_args = require('./healthcareservice.arguments');
const controller = require('./healthcareservice.controller');

let write_only_scopes = write_scopes('HealthcareService');
let read_only_scopes = read_scopes('HealthcareService');

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
		path: '/:version/healthcareservice',
		args: resourceAllArguments,
		scopes: read_only_scopes,
		controller: controller.getHealthcareService
	},
	{
		type: 'post',
		path: '/:version/healthcareservice/_search',
		args: resourceAllArguments,
		scopes: read_only_scopes,
		controller: controller.getHealthcareService
	},
	{
		type: 'get',
		path: '/:version/healthcareservice/:id',
		args: [
			route_args.VERSION,
			route_args.ID
		],
		scopes: read_only_scopes,
		controller: controller.getHealthcareServiceById
	},
	{
		type: 'post',
		path: '/:version/healthcareservice',
		args: [
			route_args.VERSION,
			write_args.RESOURCE_ID,
			write_args.RESOURCE_BODY
		],
		scopes: write_only_scopes,
		controller: controller.createHealthcareService
	},
	{
		type: 'put',
		path: '/:version/healthcareservice/:id',
		args: [
			route_args.ID,
			route_args.VERSION,
			write_args.RESOURCE_BODY
		],
		scopes: write_only_scopes,
		controller: controller.updateHealthcareService
	},
	{
		type: 'delete',
		path: '/:version/healthcareservice/:id',
		args: [
			route_args.ID,
			route_args.VERSION,
			write_args.RESOURCE_BODY
		],
		scopes: write_only_scopes,
		controller: controller.deleteHealthcareService
	}
];

/**
 * @name exports
 * @summary HealthcareService config
 */
module.exports = {
	routeOptions: {
		profileKey: CONFIG_KEYS.HEALTHCARESERVICE
	},
	routes
};
