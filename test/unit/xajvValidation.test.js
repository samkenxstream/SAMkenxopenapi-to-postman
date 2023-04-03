const { getLocalDraft,
    getAjvValidator,
    validateSchema,
    getDraftToUse } = require('../../lib/ajValidation/ajvValidation'),
  { validateSchemaAJVDraft04 } = require('../../lib/ajValidation/ajvValidatorDraft04'),
  expect = require('chai').expect;

describe('getLocalDraft', function() {
  it('should return the defined draft from the schema', function() {
    const schema = {
      $schema: 'http://json-schema.org/draft-07/schema#',
      required: [
        'id',
        'name'
      ],
      type: 'object',
      properties: {
        id: {
          type: [
            'integer'
          ],
          examples: [
            111111
          ]
        },
        name: {
          type: [
            'string'
          ]
        },
        tag: {
          type: [
            'string'
          ]
        }
      }
    };
    expect(getLocalDraft(schema)).to.be.equal('http://json-schema.org/draft-07/schema#');
  });

  it('should return undefined draft from the schema when is not present', function() {
    const schema = {
      required: [
        'id',
        'name'
      ],
      type: 'object',
      properties: {
        id: {
          type: [
            'integer'
          ],
          examples: [
            111111
          ]
        },
        name: {
          type: [
            'string'
          ]
        },
        tag: {
          type: [
            'string'
          ]
        }
      }
    };
    expect(getLocalDraft(schema)).to.be.undefined;
  });
});

describe('getAjvValidator', function() {
  it('should return the ajv draft 04 validator when draft is the 04', function() {
    let validator = getAjvValidator('http://json-schema.org/draft-04/schema#');
    expect(validator.name).to.equal('validateSchemaAJVDraft04');
  });

  it('should return normal ajv validator when draft is the 06', function() {
    let validator = getAjvValidator('http://json-schema.org/draft-06/schema#');
    expect(validator.name).to.equal('validateSchemaAJV');
  });

  it('should return normal ajv validator when draft is the 07', function() {
    let validator = getAjvValidator('http://json-schema.org/draft-07/schema#');
    expect(validator.name).to.equal('validateSchemaAJV');
  });

  it('should return normal ajv validator when draft is the 2019-09', function() {
    let validator = getAjvValidator('https://json-schema.org/draft/2019-09/schema');
    expect(validator.name).to.equal('validateSchemaAJV');
  });

  it('should return normal ajv validator when draft is the 2020-12', function() {
    let validator = getAjvValidator('https://json-schema.org/draft/2020-12/schema');
    expect(validator.name).to.equal('validateSchemaAJV');
  });

  it('should return normla ajv validator when draft is undefined', function() {
    let validator = getAjvValidator();
    expect(validator.name).to.equal('validateSchemaAJV');
  });

});

describe('validateSchema', function () {
  it('should return no errors correct schema value no $schema definition', function () {
    const schema = {
        required: [
          'id',
          'name'
        ],
        type: 'object',
        properties: {
          id: {
            type: [
              'integer'
            ],
            examples: [
              111111
            ]
          },
          name: {
            type: [
              'string'
            ]
          }
        }
      },
      valueToUse = {
        id: 7784772,
        name: 'dolor consectetur Excepteur'
      },
      result = validateSchema(schema, valueToUse);
    expect(result).to.be.empty;
  });

  it('should return errors with incorrect schema that does not have $schema property', function () {
    const schema = {
        required: [
          'id',
          'name'
        ],
        type: 'object',
        properties: {
          id: {
            type: [
              'integer'
            ],
            examples: [
              111111
            ]
          },
          name: {
            type: [
              'string'
            ]
          }
        }
      },
      valueToUse = {
        id: '7784772',
        name: 'dolor consectetur Excepteur'
      },
      result = validateSchema(schema, valueToUse);
    expect(result[0].instancePath).equal('/id');
  });

  it('should return no errors correct schema value $schema pointing to draft 04', function () {
    const schema = {
        '$schema': 'http://json-schema.org/draft-04/schema#',
        required: [
          'id',
          'name'
        ],
        type: 'object',
        properties: {
          id: {
            type: [
              'integer'
            ],
            examples: [
              111111
            ]
          },
          name: {
            type: [
              'string'
            ]
          }
        }
      },
      valueToUse = {
        id: 7784772,
        name: 'dolor consectetur Excepteur'
      },
      result = validateSchema(schema, valueToUse);
    expect(result).to.be.empty;
  });

  it('should return errors incorrect schema value $schema pointing to draft 04', function () {
    const schema = {
        '$schema': 'http://json-schema.org/draft-04/schema#',
        required: [
          'id',
          'name'
        ],
        type: 'object',
        properties: {
          id: {
            type: [
              'integer'
            ],
            examples: [
              111111
            ]
          },
          name: {
            type: [
              'string'
            ]
          }
        }
      },
      valueToUse = {
        id: '7784772',
        name: 'dolor consectetur Excepteur'
      },
      result = validateSchema(schema, valueToUse);
    expect(result[0].instancePath).equal('.id');
  });

  it('should return no errors correct schema value $schema pointing to draft 06', function () {
    const schema = {
        '$schema': 'http://json-schema.org/draft-06/schema#',
        required: [
          'id',
          'name'
        ],
        type: 'object',
        properties: {
          id: {
            type: [
              'integer'
            ],
            examples: [
              111111
            ]
          },
          name: {
            type: [
              'string'
            ]
          }
        }
      },
      valueToUse = {
        id: 7784772,
        name: 'dolor consectetur Excepteur'
      },
      result = validateSchema(schema, valueToUse);
    expect(result).to.be.empty;
  });

  it('should return no errors correct schema value $schema pointing to draft 2019', function () {
    const schema = {
        '$schema': 'https://json-schema.org/draft/2019-09/schema',
        required: [
          'id',
          'name'
        ],
        type: 'object',
        properties: {
          id: {
            type: [
              'integer'
            ],
            examples: [
              111111
            ]
          },
          name: {
            type: [
              'string'
            ]
          }
        }
      },
      valueToUse = {
        id: 7784772,
        name: 'dolor consectetur Excepteur'
      },
      result = validateSchema(schema, valueToUse);
    expect(result).to.be.empty;
  });

  it('should return errors correct schema value $schema pointing to draft 04', function () {
    const valueToUse = {
        id: 7784772,
        name: 'dolor consectetur Excepteur'
      },
      result = validateSchemaAJVDraft04(null, valueToUse);
    expect(result.filteredValidationError).to.be.undefined;
  });

  it('Fix for GITHUB#479: should validate as correct input <integer> for type integer', function () {
    const schema = {
        type: 'object',
        properties: {
          id: {
            type: [
              'integer',
              'boolean'
            ],
            examples: [
              111111
            ]
          },
          hasPet: {
            type: [
              'boolean'
            ]
          }
        }
      },
      valueToUse = {
        'id': '<integer>',
        'hasPet': '<boolean>'
      },
      result = validateSchema(schema, valueToUse);
    expect(result).to.be.empty;
  });

  it('Fix for GITHUB#479: should validate as incorrect input <boolean> for type integer', function () {
    const schema = {
        type: 'object',
        properties: {
          id: {
            type: [
              'integer'
            ],
            examples: [
              111111
            ]
          },
          hasPet: {
            type: [
              'boolean'
            ]
          }
        }
      },
      valueToUse = {
        'id': '<boolean>',
        'hasPet': '<boolean>'
      },
      result = validateSchema(schema, valueToUse);
    expect(result[0].instancePath).equal('/id');
  });

  it('Fix for GITHUB#479: should validate as correct input <long> for type integer format int64', function () {
    const schema = {
        type: 'object',
        properties: {
          id: {
            type: [
              'integer'
            ],
            format: 'int64'
          },
          hasPet: {
            type: [
              'boolean'
            ]
          }
        }
      },
      valueToUse = {
        'id': '<long>',
        'hasPet': '<boolean>'
      },
      result = validateSchema(schema, valueToUse);
    expect(result).to.be.empty;
  });

  it('Fix for GITHUB#479: should validate as correct input <long> for type integer boolean format int64', function () {
    const schema = {
        type: 'object',
        properties: {
          id: {
            type: [
              'integer',
              'boolean'
            ],
            format: 'int64'
          },
          hasPet: {
            type: [
              'boolean'
            ]
          }
        }
      },
      valueToUse = {
        'id': '<long>',
        'hasPet': '<boolean>'
      },
      result = validateSchema(schema, valueToUse);
    expect(result).to.be.empty;
  });

  it('Should return 0 errors with oneOf string nullable and correct values', function () {
    const schema = {
        type: 'array',
        items: {
          type: 'object',
          required: [
            'id'
          ],
          properties: {
            id: {
              type: 'integer',
              format: 'int64'
            },
            actualDelivery: {
              oneOf: [
                {
                  enum: [
                    ''
                  ],
                  type: 'string',
                  nullable: true
                },
                {
                  type: 'string',
                  pattern: '^\\d{4}-(1[0-2]|0[1-9])-(3[01]|0[1-9]|[12]\\d)(T| )(2[0-3]|[01][0-9]):' +
                  '[0-5]\\d(|(:[0-5]\\dZ?)|(:[0-5]\\d\\.\\d{3})|(:[0-5]\\d\\.\\d{3}[+-]\\d{2}:\\d{2}))$',
                  nullable: true
                }
              ]
            }
          }
        }
      },
      valueToUse = [{
        id: 122,
        actualDelivery: null
      },
      {
        id: 122,
        actualDelivery: ''
      },
      {
        id: 122,
        actualDelivery: '1988-12-23 15:15:15'
      }],
      result = validateSchema(schema, valueToUse);
    expect(result).to.be.empty;
  });

  it('Should return 1 error with oneOf string nullable and incorrect value', function() {
    const schema = {
        type: 'array',
        items: {
          type: 'object',
          required: [
            'id'
          ],
          properties: {
            id: {
              type: 'integer',
              format: 'int64'
            },
            actualDelivery: {
              oneOf: [
                {
                  enum: [
                    ''
                  ],
                  type: 'string',
                  nullable: true
                },
                {
                  type: 'string',
                  pattern: '^\\d{4}-(1[0-2]|0[1-9])-(3[01]|0[1-9]|[12]\\d)(T| )(2[0-3]|[01][0-9]):' +
                  '[0-5]\\d(|(:[0-5]\\dZ?)|(:[0-5]\\d\\.\\d{3})|(:[0-5]\\d\\.\\d{3}[+-]\\d{2}:\\d{2}))$',
                  nullable: true
                }
              ]
            }
          }
        }
      },
      valueToUse = [
        {
          id: 122,
          actualDelivery: 'not valid'
        }],
      result = validateSchema(schema, valueToUse);
    expect(result[0].keyword).to.equal('enum');
    expect(result[1].keyword).to.equal('pattern');
  });

  it('Should not report error with deprecated property when is present', function () {
    const schema = {
        type: 'object',
        properties: {
          deprecated: {
            type: 'boolean'
          },
          pet: {
            type: 'object',
            properties: {
              id: {
                type: 'string',
                deprecated: true,
                default: '<string>'
              },
              newID: {
                type: 'string',
                default: '<string>'
              },
              deprecated: {
                type: 'string',
                default: '<string>'
              }
            }
          }
        }
      },
      valueToUse = {
        deprecated: false,
        pet: {
          id: '<string>',
          newID: '122',
          deprecated: 'value'
        }
      },
      result = validateSchema(schema, valueToUse);
    expect(result).to.be.empty;
  });

  it('Should report error with deprecated property when is invalid type', function () {
    const schema = {
        type: 'object',
        properties: {
          deprecated: {
            type: 'boolean'
          },
          pet: {
            type: 'object',
            properties: {
              id: {
                type: 'string',
                deprecated: true,
                default: '<string>'
              },
              newID: {
                type: 'string',
                default: '<string>'
              },
              deprecated: {
                type: 'string',
                default: '<string>'
              }
            }
          }
        }
      },
      valueToUse = {
        deprecated: false,
        pet: {
          id: 2,
          newID: '122',
          deprecated: 'value'
        }
      },
      result = validateSchema(schema, valueToUse);
    expect(result[0].instancePath).to.equal('/pet/id');
    expect(result[0].keyword).to.equal('type');
  });

  it('Should report error with deprecated property when is not present and it is required' +
   ' includeDeprecated is false', function () {
    const schema = {
        type: 'object',
        properties: {
          deprecated: {
            type: 'boolean'
          },
          pet: {
            type: 'object',
            required: ['id'],
            properties: {
              id: {
                type: 'string',
                deprecated: true,
                default: '<string>'
              },
              newID: {
                type: 'string',
                default: '<string>'
              },
              deprecated: {
                type: 'string',
                default: '<string>'
              }
            }
          }
        }
      },
      valueToUse = {
        deprecated: false,
        pet: {
          newID: '122'
        }
      },
      result = validateSchema(schema, valueToUse, { includeDeprecated: false });
    expect(result).to.not.be.empty;
    expect(result[0].params.missingProperty).to.equal('id');
  });

  it('Should report error with deprecated property when is not present and' +
  ' includeDeprecated is true', function () {
    const schema = {
        type: 'object',
        properties: {
          deprecated: {
            type: 'boolean'
          },
          pet: {
            type: 'object',
            required: ['id'],
            properties: {
              id: {
                type: 'string',
                deprecated: true,
                default: '<string>'
              },
              newID: {
                type: 'string',
                default: '<string>'
              },
              deprecated: {
                type: 'string',
                default: '<string>'
              }
            }
          }
        }
      },
      valueToUse = {
        deprecated: false,
        pet: {
          newID: '122'
        }
      },
      result = validateSchema(schema, valueToUse, { includeDeprecated: true });
    expect(result).to.not.be.empty;
    expect(result[0].params.missingProperty).to.equal('id');
  });
});

describe('getDraftToUse', function() {
  it('should return the ajv draft 04 when $schema undefined and jsonSchemaDialect is the 04', function() {
    let draftToUse = getDraftToUse(undefined, 'http://json-schema.org/draft-04/schema#');
    expect(draftToUse).to.equal('http://json-schema.org/draft-04/schema#');
  });

  it('should return the ajv draft 06 when $schema is 06 and jsonSchemaDialect is the 04', function() {
    let draftToUse = getDraftToUse('http://json-schema.org/draft-06/schema#',
      'http://json-schema.org/draft-04/schema#');
    expect(draftToUse).to.equal('http://json-schema.org/draft-06/schema#');
  });

  it('should return the ajv draft 06 when $schema is 06 and jsonSchemaDialect is undefined', function() {
    let draftToUse = getDraftToUse('http://json-schema.org/draft-06/schema#', undefined);
    expect(draftToUse).to.equal('http://json-schema.org/draft-06/schema#');
  });

  it('should return undefined when $schema  and jsonSchemaDialect are undefined', function() {
    let draftToUse = getDraftToUse(undefined, undefined);
    expect(draftToUse).to.equal(undefined);
  });
});
