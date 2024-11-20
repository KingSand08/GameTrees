INSERT INTO Wishlists VALUES
    (8, 'a0005');

-- SELECT W.Game_Title, B.Name
-- FROM Wishlists W
-- LEFT JOIN Business B
-- ON W.Dev_ID = B.BID
-- WHERE W.UID = (SELECT U.UID FROM Users U WHERE Username = 'marioB');

SELECT 
    G.Title,
    B.Name,
    G.Price,
    P.Image
FROM 
    Wishlists W
LEFT JOIN 
    Games G ON G.gid = W.gid
LEFT JOIN
    Game_Photos PG ON W.gid = PG.gid
LEFT JOIN
    Photos P ON P.Photo_ID = PG.Photo_ID
LEFT JOIN 
    Business B ON G.Dev_ID = B.BID
WHERE 
    W.UID = (SELECT U.UID FROM Users U WHERE Username = 'marioB');
        