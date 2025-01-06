-- SELECT 
--     S.sid AS id,
--     S.store_name AS name,
--     CONCAT_WS(', ', S.street, S.city, S.state, S.zip, S.country) AS address,
--     S.modality,
--     S.city,
--     SH.day,
--     SH.start_time AS startTime,
--     SH.end_time AS endTime
-- FROM Stores S
-- LEFT JOIN StoreHours SH ON S.sid = SH.sid
-- WHERE S.city ${isBayArea ? "IN" : "NOT IN"} (${cities.map(() => '?').join(', ')})
-- ORDER BY S.sid, FIELD(SH.day, 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday')

SELECT 
    S.sid AS store_id,
    S.store_name AS store_name,
    CONCAT_WS(', ', S.street, S.city, S.state, S.zip, S.country) AS address,
    S.modality,
    COUNT(I.gid) AS available, -- Count of games in the inventory
    (
        SELECT P.spid
        FROM StorePhotos P
        WHERE P.sid = S.sid
        LIMIT 1
    ) AS image -- Gets the first photo for the store
FROM Stores S
LEFT JOIN Inventories I ON I.sid = S.sid
WHERE S.mid is NULL
GROUP BY S.sid
ORDER BY available DESC;

UPDATE Stores S
SET S.mid = 6
WHERE S.sid IN (9, 11);