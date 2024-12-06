EXPLAIN SELECT 
        G.Title,
        B.Name,
        PG.image,
        G.Price,
        W.gid
    FROM 
        Wishlists W
    LEFT JOIN 
        Games G ON G.gid = W.gid
    LEFT JOIN
        GamePhotos PG ON W.gid = PG.gid
    LEFT JOIN
        Photos P ON P.pid = PG.gpid
    LEFT JOIN 
        Business B ON G.did = B.BID
    WHERE 
        W.UID = (SELECT U.UID FROM Users U WHERE Username = 'marioB');

INSERT INTO Wishlists (uid, gid) VALUES
((SELECT U.uid FROM Users U WHERE U.username = ?), ?);

DELETE FROM Wishlists W
WHERE W.gid = ? AND W.uid = (SELECT U.UID FROM Users U WHERE Username = ?);