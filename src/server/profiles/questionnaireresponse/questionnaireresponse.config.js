const { route_args, common_args, write_args } = require('../common.arguments');
const { read_scopes, write_scopes } = require('../common.scopes');
const { CONFIG_KEYS, VERSIONS } = require('../../../constants');
const resource_args = require('./questionnaireresponse.arguments');
const controller = require('./questionnaireresponse.controller');

let write_only_scopes = write_scopes('QuestionnaireResponse');
let read_only_scopes = read_scopes('QuestionnaireResponse');

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
		path: '/:version/questionnaireresponse',
		args: resourceAllArguments,
		scopes: read_only_scopes,
		controller: controller.getQuestionnaireResponse
	},
	{
		type: 'post',
		path: '/:version/questionnaireresponse/_search',
		args: resourceAllArguments,
		scopes: read_only_scopes,
		controller: controller.getQuestionnaireResponse
	},
	{
		type: 'get',
		path: '/:version/questionnaireresponse/:id',
		args: [
			route_args.VERSION,
			route_args.ID
		],
		scopes: read_only_scopes,
		controller: controller.getQuestionnaireResponseById
	},
	{
		type: 'post',
		path: '/:version/questionnaireresponse',
		args: [
			route_args.VERSION,
			write_args.RESOURCE_ID,
			write_args.RESOURCE_BODY
		],
		scopes: write_only_scopes,
		controller: controller.createQuestionnaireResponse
	},
	{
		type: 'put',
		path: '/:version/questionnaireresponse/:id',
		args: [
			route_args.ID,
			route_args.VERSION,
			write_args.RESOURCE_BODY
		],
		scopes: write_only_scopes,
		controller: controller.updateQuestionnaireResponse
	},
	{
		type: 'delete',
		path: '/:version/questionnaireresponse/:id',
		args: [
			route_args.ID,
			route_args.VERSION,
			write_args.RESOURCE_BODY
		],
		scopes: write_only_scopes,
		controller: controller.deleteQuestionnaireResponse
	}
];

/**
 * @name exports
 * @summary QuestionnaireResponse config
 */
module.exports = {
	routeOptions: {
		profileKey: CONFIG_KEYS.QUESTIONNAIRERESPONSE
	},
	routes
};
