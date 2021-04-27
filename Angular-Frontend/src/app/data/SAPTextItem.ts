export class SAPTextItem {

  id: number;
  taRule: string;
  taCounter: number;
  taToken: string;
  taLanguage: string;
  taType: string;
  taTypeExpanded: string;
  taNormalized: string;
  taStem: string;
  taParagraph: number;
  taSentence: number;
  taCreatedAt: string;
  taOffset: number;
  taParent: string;

  initialize(object: any): SAPTextItem {
    this.id = object.id;
    this.taRule = object.ta_rule;
    this.taCounter = object.ta_counter;
    this.taToken = object.ta_token;
    this.taLanguage = object.ta_language;
    this.taType = object.ta_type;
    this.taTypeExpanded = object.ta_type_expanded;
    this.taNormalized = object.ta_normalized;
    this.taStem = object.ta_stem;
    this.taParagraph = object.ta_paragraph;
    this.taSentence = object.ta_sentence;
    this.taCreatedAt = object.ta_created_at;
    this.taOffset = object.ta_offset;
    this.taParent = object.ta_parent;
    return this;
  }
}
