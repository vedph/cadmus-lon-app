import {
  CATEGORIES_PART_TYPEID,
  CHRONOTOPES_PART_TYPEID,
  COMMENT_PART_TYPEID,
  EXTERNAL_IDS_PART_TYPEID,
  METADATA_PART_TYPEID,
  NOTE_PART_TYPEID,
  PIN_LINKS_PART_TYPEID,
} from '@myrmidon/cadmus-part-general-ui';

import { EXT_BIBLIOGRAPHY_PART_TYPEID } from '@myrmidon/cadmus-part-biblio-ui';

import { PartEditorKeys } from '@myrmidon/cadmus-core';

import { LETTER_INFO_PART_TYPEID } from '../../projects/myrmidon/cadmus-lon-part-ui/src/public-api';

const GENERAL = 'general';
const BIBLIO = 'biblio';
const LON = 'lon';

/**
 * The parts and fragments editor keys for this UI.
 * Each property is a part type ID, mapped to a value of type PartGroupKey,
 * having a part property with the part's editor key, and a fragments property
 * with the mappings between fragment type IDs and their editor keys.
 */
export const PART_EDITOR_KEYS: PartEditorKeys = {
  // biblio
  [EXT_BIBLIOGRAPHY_PART_TYPEID]: {
    part: BIBLIO,
  },
  // general
  [CATEGORIES_PART_TYPEID]: {
    part: GENERAL,
  },
  [CHRONOTOPES_PART_TYPEID]: {
    part: GENERAL,
  },
  [COMMENT_PART_TYPEID]: {
    part: GENERAL,
  },
  [EXTERNAL_IDS_PART_TYPEID]: {
    part: GENERAL,
  },
  [METADATA_PART_TYPEID]: {
    part: GENERAL,
  },
  [NOTE_PART_TYPEID]: {
    part: GENERAL,
  },
  [PIN_LINKS_PART_TYPEID]: {
    part: GENERAL,
  },
  // lon
  [LETTER_INFO_PART_TYPEID]: {
    part: LON,
  },
};
