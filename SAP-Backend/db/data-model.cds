namespace my.podcasts;

entity categories {
  podcast_id : String not null;
  category : String not null; 
}

entity podcasts {
  key podcast_id : String not null;
  itunes_id : Integer not null;
  slug : String not null;
  itunes_url : String not null;
  title: String not null;
}

entity reviews {
  podcast_id : String not null;
  title : String not null;
  content : String not null;
  rating : Integer not null;
  created_at : String not null;
}

entity runs {
  run_at : String not null;
  max_rowid : Integer not null;
  reviews_added : Integer not null;
}