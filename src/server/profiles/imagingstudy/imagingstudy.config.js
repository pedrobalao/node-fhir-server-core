const { route_args, common_args, write_args } = require('../common.arguments');
const { read_scopes, write_scopes } = require('../common.scopes');
const { CONFIG_KEYS, VERSIONS } = require('../../../constants');
const resource_args = require('./imagingstudy.arguments');
const controller = require('./imagingstudy.controller');

let write_only_scopes = write_scopes('ImagingStudy');
let read_only_scopes = read_scopes('ImagingStudy');

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
		path: '/:version/imagingstudy',
		args: resourceAllArguments,
		scopes: read_only_scopes,
		controller: controller.getImagingStudy
	},
	{
		type: 'post',
		path: '/:version/imagingstudy/_search',
		args: resourceAllArguments,
		scopes: read_only_scopes,
		controller: controller.getImagingStudy
	},
	{
		type: 'get',
		path: '/:version/imagingstudy/:id',
		args: [
			route_args.VERSION,
			route_args.ID
		],
		scopes: read_only_scopes,
		controller: controller.getImagingStudyById
	},
	{
		type: 'post',
		path: '/:version/imagingstudy',
		args: [
			route_args.VERSION,
			write_args.RESOURCE_ID,
			write_args.RESOURCE_BODY
		],
		scopes: write_only_scopes,
		controller: controller.createImagingStudy
	},
	{
		type: 'put',
		path: '/:version/imagingstudy/:id',
		args: [
			route_args.ID,
			route_args.VERSION,
			write_args.RESOURCE_BODY
		],
		scopes: write_only_scopes,
		controller: controller.updateImagingStudy
	},
	{
		type: 'delete',
		path: '/:version/imagingstudy/:id',
		args: [
			route_args.ID,
			route_args.VERSION,
			write_args.RESOURCE_BODY
		],
		scopes: write_only_scopes,
		controller: controller.deleteImagingStudy
	}
];

/**
 * @name exports
 * @summary ImagingStudy config
 */
module.exports = {
	routeOptions: {
		profileKey: CONFIG_KEYS.IMAGINGSTUDY
	},
	routes
};
