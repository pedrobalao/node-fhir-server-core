const { route_args, common_args, write_args } = require('../common.arguments');
const { read_scopes, write_scopes } = require('../common.scopes');
const { CONFIG_KEYS, VERSIONS } = require('../../../constants');
const resource_args = require('./immunizationrecommendation.arguments');
const controller = require('./immunizationrecommendation.controller');

let write_only_scopes = write_scopes('ImmunizationRecommendation');
let read_only_scopes = read_scopes('ImmunizationRecommendation');

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
		path: '/:version/immunizationrecommendation',
		args: resourceAllArguments,
		scopes: read_only_scopes,
		controller: controller.getImmunizationRecommendation
	},
	{
		type: 'post',
		path: '/:version/immunizationrecommendation/_search',
		args: resourceAllArguments,
		scopes: read_only_scopes,
		controller: controller.getImmunizationRecommendation
	},
	{
		type: 'get',
		path: '/:version/immunizationrecommendation/:id',
		args: [
			route_args.VERSION,
			route_args.ID
		],
		scopes: read_only_scopes,
		controller: controller.getImmunizationRecommendationById
	},
	{
		type: 'post',
		path: '/:version/immunizationrecommendation',
		args: [
			route_args.VERSION,
			write_args.RESOURCE_ID,
			write_args.RESOURCE_BODY
		],
		scopes: write_only_scopes,
		controller: controller.createImmunizationRecommendation
	},
	{
		type: 'put',
		path: '/:version/immunizationrecommendation/:id',
		args: [
			route_args.ID,
			route_args.VERSION,
			write_args.RESOURCE_BODY
		],
		scopes: write_only_scopes,
		controller: controller.updateImmunizationRecommendation
	},
	{
		type: 'delete',
		path: '/:version/immunizationrecommendation/:id',
		args: [
			route_args.ID,
			route_args.VERSION,
			write_args.RESOURCE_BODY
		],
		scopes: write_only_scopes,
		controller: controller.deleteImmunizationRecommendation
	}
];

/**
 * @name exports
 * @summary ImmunizationRecommendation config
 */
module.exports = {
	routeOptions: {
		profileKey: CONFIG_KEYS.IMMUNIZATIONRECOMMENDATION
	},
	routes
};
