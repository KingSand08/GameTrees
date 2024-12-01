INSERT INTO Photos (pid, add_date) VALUES	
	(1, NOW()),
	(2, NOW()),
	(3, NOW()),
	(4, NOW()),
	(5, NOW()),
	(6, NOW()),
	(7, NOW()),
	(8, NOW()),
	(9, NOW()),
	(10, NOW()),
	(11, NOW());

INSERT INTO StorePhotos (spid, image, sid) VALUES	
	(1, LOAD_FILE('D:\\ProgramData\\MySQL\\MySQL Server 9.0\\Uploads\\stores\\GameStop_SJ.jpg'), 28),
	(2, LOAD_FILE('D:\\ProgramData\\MySQL\\MySQL Server 9.0\\Uploads\\stores\\GameHub_SF.jpg'), 1),
	(3, LOAD_FILE('D:\\ProgramData\\MySQL\\MySQL Server 9.0\\Uploads\\stores\\GameStore_MV.jpg'), 2),
	(4, LOAD_FILE('D:\\ProgramData\\MySQL\\MySQL Server 9.0\\Uploads\\stores\\Gamers_PA.jpg'), 3),
	(5, LOAD_FILE('D:\\ProgramData\\MySQL\\MySQL Server 9.0\\Uploads\\stores\\Esport_Berkeley.jpg'), 4),
	(6, LOAD_FILE('D:\\ProgramData\\MySQL\\MySQL Server 9.0\\Uploads\\stores\\Game Arena_SJ.jpg'), 5),
	(7, LOAD_FILE('D:\\ProgramData\\MySQL\\MySQL Server 9.0\\Uploads\\stores\\GameCenter_OL.jpg'), 6),
	(8, LOAD_FILE('D:\\ProgramData\\MySQL\\MySQL Server 9.0\\Uploads\\stores\\Gaming World_FM.jpg'), 7),
	(9, LOAD_FILE('D:\\ProgramData\\MySQL\\MySQL Server 9.0\\Uploads\\stores\\GameStop_Burlingame.jpg'), 8),
	(10, LOAD_FILE('D:\\ProgramData\\MySQL\\MySQL Server 9.0\\Uploads\\stores\\Gamers Lounge_RW.jpg'), 9),
	(11, LOAD_FILE('D:\\ProgramData\\MySQL\\MySQL Server 9.0\\Uploads\\stores\\Gaming Plaza_SC.jpg'), 10);

-- DELETE FROM Photos
-- WHERE pid < 12;

-- DELETE FROM StorePhotos
-- WHERE spid < 12;