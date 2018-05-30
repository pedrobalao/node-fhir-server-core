const { route_args, common_args, write_args } = require('../common.arguments');
const { read_scopes, write_scopes } = require('../common.scopes');
const { CONFIG_KEYS, VERSIONS } = require('../../../constants');
const resource_args = require('./enrollmentresponse.arguments');
const controller = require('./enrollmentresponse.controller');

let write_only_scopes = write_scopes('EnrollmentResponse');
let read_only_scopes = read_scopes('EnrollmentResponse');

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
		path: '/:version/enrollmentresponse',
		args: resourceAllArguments,
		scopes: read_only_scopes,
		controller: controller.getEnrollmentResponse
	},
	{
		type: 'post',
		path: '/:version/enrollmentresponse/_search',
		args: resourceAllArguments,
		scopes: read_only_scopes,
		controller: controller.getEnrollmentResponse
	},
	{
		type: 'get',
		path: '/:version/enrollmentresponse/:id',
		args: [
			route_args.VERSION,
			route_args.ID
		],
		scopes: read_only_scopes,
		controller: controller.getEnrollmentResponseById
	},
	{
		type: 'post',
		path: '/:version/enrollmentresponse',
		args: [
			route_args.VERSION,
			write_args.RESOURCE_ID,
			write_args.RESOURCE_BODY
		],
		scopes: write_only_scopes,
		controller: controller.createEnrollmentResponse
	},
	{
		type: 'put',
		path: '/:version/enrollmentresponse/:id',
		args: [
			route_args.ID,
			route_args.VERSION,
			write_args.RESOURCE_BODY
		],
		scopes: write_only_scopes,
		controller: controller.updateEnrollmentResponse
	},
	{
		type: 'delete',
		path: '/:version/enrollmentresponse/:id',
		args: [
			route_args.ID,
			route_args.VERSION,
			write_args.RESOURCE_BODY
		],
		scopes: write_only_scopes,
		controller: controller.deleteEnrollmentResponse
	}
];

/**
 * @name exports
 * @summary EnrollmentResponse config
 */
module.exports = {
	routeOptions: {
		profileKey: CONFIG_KEYS.ENROLLMENTRESPONSE
	},
	routes
};
