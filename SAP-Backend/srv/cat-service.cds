using my.SAPBackend as my from '../db/data-model';

service SAPBackendService {
    
	entity categories @readonly as projection on my.categories;
	entity podcasts @readonly as projection on my.podcasts;
	entity reviews @readonly as projection on my.reviews;
	entity runs @readonly as projection on my.runs; 
	entity extraction_core_voc @readonly as projection on my.extraction_core_voc;
	entity extraction_core_voc_data @readonly as projection on my.extraction_core_voc_data;
	entity extraction_core_voc_types @readonly as projection on my.extraction_core_voc_types;
	entity linguistic_full @readonly as projection on my.linguistic_full;
	entity linguistic_full_data @readonly as projection on my.linguistic_full_data;
	entity linguistic_full_types @readonly as projection on my.linguistic_full_types;
	entity positive_words @readonly as projection on my.positive_words;
	entity negative_words @readonly as projection on my.negative_words;
	entity rarest_words @readonly as projection on my.rarest_words;
	entity common_words @readonly as projection on my.common_words;
	
}