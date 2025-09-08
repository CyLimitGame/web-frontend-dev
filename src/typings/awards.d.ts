import {
  AwardProgressionCategoriesEnum,
  AwardProgressionSubcategoriesEnum,
  AwardProgressionQuestsEnum,
} from './awards.enum';

export type UnderstandingRuleCategory = {
  category: string;
  name1?: string;
  name2?: string;
  index?: number;
  understandingRules?: UnderstandingRule[];
};

export type UnderstandingRule = {
  id?: string;
  category?: string;
  title1?: string;
  title2?: string;
  image1?: string;
  image2?: string;
  bidon?: number;
  index?: number;
  userIds?: string[];
  isClaimed?: boolean;
};

export type UnderstandingRuleCategoryRequest = {
  categories: (UnderstandingRuleCategory | undefined)[] | any;
};

export type BidonReward = {
  bidon: number;
  createdAt: Date;
};

export type AwardProgressionMetadata = {
  following?: string[];
  followers?: string[];
};

export type ProgressionRule = {
  id: string;
  category?: AwardProgressionCategoriesEnum;
  subcategory?: AwardProgressionSubcategoriesEnum;
  quest?: AwardProgressionQuestsEnum;
  bidon?: number;
  bidonCustomizes?: BidonCustomize[];
};

export type BidonCustomize = {
  times?: number;
  bidon?: number;
};

export type ProgressionRuleFilter = {
  category?: AwardProgressionCategoriesEnum;
  subcategory?: AwardProgressionSubcategoriesEnum;
};
