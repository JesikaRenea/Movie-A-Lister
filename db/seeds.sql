USE movies_db;

insert into movies( 
title,
releaseDate,
rating,
genre,
favorite,
wantToWatch
)
VALUES
("testFav", 2008, "PG", "drama", 1 ,0 ),
("testWatchlist", 2009 ,"R", "comedy", 0 , 1),
("testAll", 2010, "PG", "drama", 0, 0 )
