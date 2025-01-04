INSERT INTO Photos (pid, add_date) 
    VALUES (?, NOW())
    ON DUPLICATE KEY UPDATE add_date = NOW();

INSERT INTO storePhotos (spid, image, sid) 
    VALUES (?, ?, ?)
    ON DUPLICATE KEY UPDATE image = VALUES(image), sid = VALUES(sid);