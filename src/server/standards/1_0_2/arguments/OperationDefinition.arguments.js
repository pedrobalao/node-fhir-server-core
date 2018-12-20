module.exports = {
	BASE: {
		name: 'base',
		type: 'reference',
		definition: 'http://hl7.org/fhir/SearchParameter/OperationDefinition-base',
		documentation: 'Marks this as a profile of the base.',
	},
	CODE: {
		name: 'code',
		type: 'token',
		definition: 'http://hl7.org/fhir/SearchParameter/OperationDefinition-code',
		documentation: 'Name used to invoke the operation.',
	},
	DATE: {
		name: 'date',
		type: 'date',
		definition: 'http://hl7.org/fhir/SearchParameter/OperationDefinition-date',
		documentation: 'Date for this version of the operation definition.',
	},
	INSTANCE: {
		name: 'instance',
		type: 'token',
		definition: 'http://hl7.org/fhir/SearchParameter/OperationDefinition-instance',
		documentation: 'Invoke on an instance?.',
	},
	KIND: {
		name: 'kind',
		type: 'token',
		definition: 'http://hl7.org/fhir/SearchParameter/OperationDefinition-kind',
		documentation: 'operation | query.',
	},
	NAME: {
		name: 'name',
		type: 'string',
		definition: 'http://hl7.org/fhir/SearchParameter/OperationDefinition-name',
		documentation: 'Informal name for this operation.',
	},
	PROFILE: {
		name: 'profile',
		type: 'reference',
		definition: 'http://hl7.org/fhir/SearchParameter/OperationDefinition-profile',
		documentation: 'Profile on the type.',
	},
	PUBLISHER: {
		name: 'publisher',
		type: 'string',
		definition: 'http://hl7.org/fhir/SearchParameter/OperationDefinition-publisher',
		documentation: 'Name of the publisher (Organization or individual).',
	},
	STATUS: {
		name: 'status',
		type: 'token',
		definition: 'http://hl7.org/fhir/SearchParameter/OperationDefinition-status',
		documentation: 'draft | active | retired.',
	},
	SYSTEM: {
		name: 'system',
		type: 'token',
		definition: 'http://hl7.org/fhir/SearchParameter/OperationDefinition-system',
		documentation: 'Invoke at the system level?.',
	},
	TYPE: {
		name: 'type',
		type: 'token',
		definition: 'http://hl7.org/fhir/SearchParameter/OperationDefinition-type',
		documentation: 'Invoke at resource level for these type.',
	},
	URL: {
		name: 'url',
		type: 'uri',
		definition: 'http://hl7.org/fhir/SearchParameter/OperationDefinition-url',
		documentation: 'Logical URL to reference this operation definition.',
	},
	VERSION: {
		name: 'version',
		type: 'token',
		definition: 'http://hl7.org/fhir/SearchParameter/OperationDefinition-version',
		documentation: 'Logical id for this version of the operation definition.',
	},
};
