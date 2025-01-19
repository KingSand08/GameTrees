-- SELECT * FROM Users;
-- SELECT * FROM Admins;
-- SELECT * FROM StoreMgrs;
-- SELECT * FROM Business;
-- SELECT * FROM Games;
-- SELECT * FROM Stores;
-- SELECT * FROM Genre_List;
-- SELECT * FROM Platform_List;
-- SELECT * FROM Genres;
-- SELECT * FROM Platforms;
-- SELECT * FROM Inventories;

-- SELECT
--     G.gid,
--     G.title,
--     GROUP_CONCAT(DISTINCT GL.type) AS genre,
--     MIN(CAST(G.price * (1 - I.discount) AS DECIMAL(5,2))) AS lowestPrice,
--     COUNT(DISTINCT W.uid) AS wishlistCount,
--     MAX(P.image) AS image
-- FROM Games G
-- LEFT JOIN Wishlists W ON G.gid = W.gid
-- LEFT JOIN Genres GE ON G.gid = GE.gid
-- LEFT JOIN GenreList GL ON GE.genre_id = GL.genre_id
-- LEFT JOIN Inventories I ON G.gid = I.gid
-- LEFT JOIN GamePhotos P ON P.gid = G.gid
-- GROUP BY G.gid, G.title
-- ORDER BY wishlistCount DESC
-- LIMIT 10;

-- SELECT
--     S.sid,
--     S.store_name,
--     CONCAT_WS(', ', S.street, S.city, S.state, S.country) AS address,
--     CAST(I.discount * 100 AS UNSIGNED) AS discount, 
--     CAST(G.price * (1 - I.discount) AS DECIMAL(5,2)) AS price
-- FROM Inventories I
-- LEFT JOIN Stores S ON S.sid = I.sid
-- LEFT JOIN Games G ON G.gid = I.gid
-- WHERE I.gid = 1;

-- SELECT 
--     G.title,
--     G.description,
--     B.name AS developer,
--     G.price,
--     G.publish_date,
--     P.image
-- FROM Games G
-- LEFT JOIN Business B ON G.did = B.bid
-- LEFT JOIN GamePhotos P ON P.gid = G.gid
-- WHERE G.gid = 1;

SELECT 
    S.sid AS id,
    S.store_name AS name,
    CONCAT_WS(', ', S.street, S.city, S.state, S.zip, S.country) AS address,
    S.modality,
    S.city,
    SH.day,
    DATE_FORMAT(SH.start_time, '%h:%i %p') AS start_time,
    DATE_FORMAT(SH.end_time, '%h:%i %p') AS end_time,
    (SELECT DISTINCT P.spid
    FROM StorePhotos P
    WHERE P.sid = S.sid
    LIMIT 1) AS image
FROM Stores S
LEFT JOIN StoreHours SH ON S.sid = SH.sid
WHERE S.city LIKE 'San%'
ORDER BY S.sid, FIELD(SH.day, 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday')
LIMIT 70;

