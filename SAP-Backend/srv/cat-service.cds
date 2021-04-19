using my.podcasts as my from '../db/data-model';

service PodcastService {

    entity categories @readonly as projection on my.categories;
    entity podcasts @readonly as projection on my.podcasts;
    entity reviews @readonly as projection on my.reviews;
    entity runs @readonly as projection on my.runs; 
    entity ext_core_voc @readonly as projection on my.ext_core_voc;
    entity ext_core_voc_data @readonly as projection on my.ext_core_voc_data;
    entity ext_core_voc_types @readonly as projection on my.ext_core_voc_types;
    entity ling_full @readonly as projection on my.ling_full;
    entity ling_full_data @readonly as projection on my.ling_full_data;
    entity ling_full_types @readonly as projection on my.ling_full_types;
    entity pos_words @readonly as projection on my.pos_words;
    entity neg_words @readonly as projection on my.neg_words;
    entity rarest_words @readonly as projection on my.rarest_words;
    entity common_words @readonly as projection on my.common_words;
    
}