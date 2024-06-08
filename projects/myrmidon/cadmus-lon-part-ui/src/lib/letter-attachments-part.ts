import { Part } from '@myrmidon/cadmus-core';
import { PhysicalSize } from '@myrmidon/cadmus-mat-physical-size';

/**
 * A single attachment in a letter.
 */
export interface LetterAttachment {
  type: string;
  name: string;
  note?: string;
  size?: PhysicalSize;
}

/**
 * The letter attachments part model.
 */
export interface LetterAttachmentsPart extends Part {
  attachments: LetterAttachment[];
}

/**
 * The type ID used to identify the letter attachments part type.
 */
export const LETTER_ATTACHMENTS_PART_TYPEID = 'it.vedph.lon.letter-attachments';

/**
 * JSON schema for the letter attachments part.
 * You can use the JSON schema tool at https://jsonschema.net/.
 */
export const LETTER_ATTACHMENTS_PART_SCHEMA = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  $id:
    'www.vedph.it/cadmus/parts/lon/cadmus-lon-part-ui/' +
    LETTER_ATTACHMENTS_PART_TYPEID +
    '.json',
  type: 'object',
  title: 'LetterAttachmentsPart',
  required: [
    'id',
    'itemId',
    'typeId',
    'timeCreated',
    'creatorId',
    'timeModified',
    'userId',
    'attachments',
  ],
  properties: {
    timeCreated: {
      type: 'string',
      pattern: '^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}.\\d+Z$',
    },
    creatorId: {
      type: 'string',
    },
    timeModified: {
      type: 'string',
      pattern: '^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}.\\d+Z$',
    },
    userId: {
      type: 'string',
    },
    id: {
      type: 'string',
      pattern: '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$',
    },
    itemId: {
      type: 'string',
      pattern: '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$',
    },
    typeId: {
      type: 'string',
      pattern: '^[a-z][-0-9a-z._]*$',
    },
    roleId: {
      type: ['string', 'null'],
      pattern: '^([a-z][-0-9a-z._]*)?$',
    },
    attachments: {
      type: 'array',
      items: {
        type: 'object',
        required: ['type', 'name'],
        properties: {
          type: {
            type: 'string',
          },
          name: {
            type: 'string',
          },
          note: {
            type: 'string',
          },
          size: {
            type: 'object',
            required: [],
            properties: {
              tag: {
                type: 'string',
              },
              w: {
                type: 'object',
                required: ['value', 'unit'],
                properties: {
                  tag: {
                    type: 'string',
                  },
                  value: {
                    type: 'integer',
                  },
                  unit: {
                    type: 'string',
                  },
                },
              },
              h: {
                type: 'object',
                required: ['value', 'unit'],
                properties: {
                  tag: {
                    type: 'string',
                  },
                  value: {
                    type: 'integer',
                  },
                  unit: {
                    type: 'string',
                  },
                },
              },
              d: {
                type: 'object',
                required: ['value', 'unit'],
                properties: {
                  tag: {
                    type: 'string',
                  },
                  value: {
                    type: 'integer',
                  },
                  unit: {
                    type: 'string',
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};
