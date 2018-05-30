const { route_args, common_args, write_args } = require('../common.arguments');
const { read_scopes, write_scopes } = require('../common.scopes');
const { CONFIG_KEYS, VERSIONS } = require('../../../constants');
const resource_args = require('./task.arguments');
const controller = require('./task.controller');

let write_only_scopes = write_scopes('Task');
let read_only_scopes = read_scopes('Task');

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
		path: '/:version/task',
		args: resourceAllArguments,
		scopes: read_only_scopes,
		controller: controller.getTask
	},
	{
		type: 'post',
		path: '/:version/task/_search',
		args: resourceAllArguments,
		scopes: read_only_scopes,
		controller: controller.getTask
	},
	{
		type: 'get',
		path: '/:version/task/:id',
		args: [
			route_args.VERSION,
			route_args.ID
		],
		scopes: read_only_scopes,
		controller: controller.getTaskById
	},
	{
		type: 'post',
		path: '/:version/task',
		args: [
			route_args.VERSION,
			write_args.RESOURCE_ID,
			write_args.RESOURCE_BODY
		],
		scopes: write_only_scopes,
		controller: controller.createTask
	},
	{
		type: 'put',
		path: '/:version/task/:id',
		args: [
			route_args.ID,
			route_args.VERSION,
			write_args.RESOURCE_BODY
		],
		scopes: write_only_scopes,
		controller: controller.updateTask
	},
	{
		type: 'delete',
		path: '/:version/task/:id',
		args: [
			route_args.ID,
			route_args.VERSION,
			write_args.RESOURCE_BODY
		],
		scopes: write_only_scopes,
		controller: controller.deleteTask
	}
];

/**
 * @name exports
 * @summary Task config
 */
module.exports = {
	routeOptions: {
		profileKey: CONFIG_KEYS.TASK
	},
	routes
};
