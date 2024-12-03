CREATE INDEX game_title_index ON Games(title);
CREATE INDEX business_name_index ON Business(name);
CREATE INDEX store_zip_code_index ON Stores(zip);

-- Index to optimal store inventory fetching
CREATE INDEX inventories_sid_gid_discount ON Inventories(Sid, gid, Discount);
CREATE INDEX games_gid_price ON Games(gid, Price);
CREATE INDEX gamephotos_gid ON GamePhotos(gid);
CREATE INDEX platforms_gid ON Platforms(gid);




