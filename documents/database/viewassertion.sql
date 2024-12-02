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

SELECT
    G.gid,
    G.title,
    GROUP_CONCAT(DISTINCT GL.type) AS genre,
    MIN(CAST(G.price * (1 - I.discount) AS DECIMAL(5,2))) AS lowestPrice,
    COUNT(DISTINCT W.uid) AS wishlistCount,
    MAX(P.image) AS image
FROM Games G
LEFT JOIN Wishlists W ON G.gid = W.gid
LEFT JOIN Genres GE ON G.gid = GE.gid
LEFT JOIN GenreList GL ON GE.genre_id = GL.genre_id
LEFT JOIN Inventories I ON G.gid = I.gid
LEFT JOIN GamePhotos P ON P.gid = G.gid
GROUP BY G.gid, G.title
ORDER BY wishlistCount DESC
LIMIT 10;