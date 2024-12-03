SELECT 
    S.sid AS id,
    S.store_name AS name,
    CONCAT_WS(', ', S.street, S.city, S.state, S.zip, S.country) AS address,
    S.modality,
    S.city,
    SH.day,
    SH.start_time AS startTime,
    SH.end_time AS endTime
FROM Stores S
LEFT JOIN StoreHours SH ON S.sid = SH.sid
WHERE S.city ${isBayArea ? "IN" : "NOT IN"} (${cities.map(() => '?').join(', ')})
ORDER BY S.sid, FIELD(SH.day, 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday')