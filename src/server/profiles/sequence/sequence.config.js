const { route_args, common_args, write_args } = require('../common.arguments');
const { read_scopes, write_scopes } = require('../common.scopes');
const { CONFIG_KEYS, VERSIONS } = require('../../../constants');
const resource_args = require('./sequence.arguments');
const controller = require('./sequence.controller');

let write_only_scopes = write_scopes('Sequence');
let read_only_scopes = read_scopes('Sequence');

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
		path: '/:version/sequence',
		args: resourceAllArguments,
		scopes: read_only_scopes,
		controller: controller.getSequence
	},
	{
		type: 'post',
		path: '/:version/sequence/_search',
		args: resourceAllArguments,
		scopes: read_only_scopes,
		controller: controller.getSequence
	},
	{
		type: 'get',
		path: '/:version/sequence/:id',
		args: [
			route_args.VERSION,
			route_args.ID
		],
		scopes: read_only_scopes,
		controller: controller.getSequenceById
	},
	{
		type: 'post',
		path: '/:version/sequence',
		args: [
			route_args.VERSION,
			write_args.RESOURCE_ID,
			write_args.RESOURCE_BODY
		],
		scopes: write_only_scopes,
		controller: controller.createSequence
	},
	{
		type: 'put',
		path: '/:version/sequence/:id',
		args: [
			route_args.ID,
			route_args.VERSION,
			write_args.RESOURCE_BODY
		],
		scopes: write_only_scopes,
		controller: controller.updateSequence
	},
	{
		type: 'delete',
		path: '/:version/sequence/:id',
		args: [
			route_args.ID,
			route_args.VERSION,
			write_args.RESOURCE_BODY
		],
		scopes: write_only_scopes,
		controller: controller.deleteSequence
	}
];

/**
 * @name exports
 * @summary Sequence config
 */
module.exports = {
	routeOptions: {
		profileKey: CONFIG_KEYS.SEQUENCE
	},
	routes
};
