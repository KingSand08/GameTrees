SELECT  S.store_name AS name, S.modality, 
        CONCAT_WS(', ', Street, City, State, Zip, Country) AS address
FROM Stores S
WHERE sid = 1;

SELECT day,
        DATE_FORMAT(start_time, '%h:%i %p') AS start_time_formatted,
        DATE_FORMAT(end_time, '%h:%i %p') AS end_time_formatted
FROM StoreHours
WHERE sid = 1;

EXPLAIN SELECT G.gid, G.Title AS title, 
    ROUND(G.Price * (1 - I.Discount), 2) AS price, GP.image,
GROUP_CONCAT(L.Platform SEPARATOR ', ') AS platforms
FROM Inventories I 
LEFT JOIN Games G ON I.gid = G.gid
LEFT JOIN GamePhotos GP ON GP.gid = G.gid 
LEFT JOIN Platforms P ON P.gid = G.gid
LEFT JOIN PlatformList L ON P.plat_id = L.plat_id
WHERE I.Sid = 1 
GROUP BY I.gid, G.Price, I.Discount, GP.image;

INSERT INTO inventories(sid, gid) VALUES
        (1, 1);

SELECT
S.sid
FROM Stores S
WHERE S.mid = 7;

INSERT IGNORE INTO Inventories(sid, gid)
VALUES (?, ?), (?, ?);