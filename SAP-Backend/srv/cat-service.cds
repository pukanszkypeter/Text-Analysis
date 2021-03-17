using my.podcasts as my from '../db/data-model';

service PodcastService {

    entity categories @readonly as projection on my.categories;
    entity podcasts @readonly as projection on my.podcasts;
    entity reviews @readonly as projection on my.reviews;
    entity runs @readonly as projection on my.runs; 
    
}