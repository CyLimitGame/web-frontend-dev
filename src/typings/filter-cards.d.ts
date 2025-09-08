export type FilterAuction =
  | 'auction-new-cards'
  | 'auction-bundles'
  | 'auction-first-serial-number';

export type FilterManagerSales =
  | 'manager-sales-best-value'
  | 'manager-sales-asting-listing'
  | 'manager-sales-first-serial-number';

export type FilterAge = number;

export type FilterNationality = 'british' | 'french';

export type FilterTeam =
  | 'ag2r-citroen-team'
  | 'astana-premier-tech'
  | 'bora-hansgrohe'
  | 'cofidis'
  | 'ef-education-nippo';

export type FilterMarks = number;

export type FilterStatus = 'leader' | 'climber' | 'sprinter' | 'domestic';

export type FilterRarity = 'blue' | 'pink' | 'yellow';

export type FILTER_YEAR_OF_EDITION = '2022';

export type ProfileFilterBy =
  | 'all_offers'
  | 'recent_offers'
  | 'latest_sales'
  | 'last_cyclists_purchased'
  | 'last_offer_received'
  | 'last_offer_sent'
  | 'most_recent_followed'
  | 'my_listings'
  | 'all_offers_received'
  | 'all_offers_sent';

export type FilterCardsParams = {
  auction?: FilterAuction;
  manager_sales?: FilterManagerSales;
  age?: FilterAge;
  nationality?: string[];
  team?: FilterTeam;
  marks?: FilterMarks;
  status?: FilterStatus;
  rarity?: FilterRarity;
  year_of_edition?: FILTER_YEAR_OF_EDITION;
  by?: ProfileFilterBy;
};
