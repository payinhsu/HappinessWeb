export const Demo = {
    type:'object',
    required: ['name', 'rootCategoryIds', 'totalTime', 'price', 'level', 'imageFileKey', 'organizationId', 'brief', 'summaries', 'suitable'],
    properties:{
      name: {
        type: 'string',
        minLength: 1
      },
      rootCategoryIds: {
          type: 'array',
          minItems: 1
      },
      totalTime:{
        type: 'object',
        properties:{
          hours: {
            type: 'integer',
            minimum: 0
          },
          mins: {
            type: 'integer',
            minimum: 0
          }
        }
      },
      price: {
        type: 'integer',
        minimum: 0
      },
      level: {
        type: 'string',
        minLength: 1
      },
      imageFileKey: {
        type: 'string',
        minLength: 1
      },
      organizationId: {
        type: 'string',
        minLength: 1
      },
      brief: {
        type: 'string',
        minLength: 1
      },
      summaries: {
        type: 'string',
        minLength: 1
      },
      suitable: {
        type: 'string',
        minLength: 1
      }
    }
  };
