INSERT INTO Wishlists(UID, Game_Title, Dev_ID) VALUES
    (8, 'Xenogears', 'B10');

SELECT W.Game_Title, B.Name
FROM Wishlists W
LEFT JOIN Business B
ON W.Dev_ID = B.BID
WHERE W.UID = (SELECT U.UID FROM Users U WHERE Username = 'marioB');
