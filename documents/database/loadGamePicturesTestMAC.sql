-- To have this work, make sure your mysql main dir has proper my.cnf, if not create the file:
    -- [mysqld]
    -- secure_file_priv=""
    -- max_allowed_packet=16M
-- Have the a dir called mysql-files with all of your photos
-- Then run the code below

-- Populate Game Photos
INSERT INTO Photos (pid, add_date)
VALUES 
    (846224542, NOW()),
    (2889571950, NOW()),
    (3718163317, NOW()),
    (550930046, NOW()),
    (2230573802, NOW()),
    (2925641618, NOW()),
    (2484020706, NOW()),
    (158268105, NOW()),
    -- (4000571793, NOW()),
    (3771333181, NOW()),
    (1137781088, NOW()),
    (1631565415, NOW()),
    (3079431318, NOW()),
    (2995258255, NOW()),
    (3595424, NOW()),
    (3857563868, NOW()),
    (3849213509, NOW()),
    (1558967895, NOW()),
    (2735646219, NOW()),
    (2693180039, NOW()),
    (1967635765, NOW()),
    (1031845855, NOW()),
    (3551254620, NOW()),
    (880498219, NOW()),
    (904632192, NOW()),
    (554740096, NOW()),
    (3188450319, NOW());

INSERT INTO GamePhotos (gpid, image, gid, type)
VALUES
    (846224542, LOAD_FILE('D:\\ProgramData\\MySQL\\MySQL Server 9.0\\Uploads\\botw.jpg'), 1, 'cover'),
    (2889571950, LOAD_FILE('D:\\ProgramData\\MySQL\\MySQL Server 9.0\\Uploads\\elden.jpg'), 2, 'cover'),
    (3718163317, LOAD_FILE('D:\\ProgramData\\MySQL\\MySQL Server 9.0\\Uploads\\minecraft.png'), 3, 'cover'),
    (550930046, LOAD_FILE('D:\\ProgramData\\MySQL\\MySQL Server 9.0\\Uploads\\gtav.jpg'), 4, 'cover'),
    (2230573802, LOAD_FILE('D:\\ProgramData\\MySQL\\MySQL Server 9.0\\Uploads\\witcher3.jpg'), 5, 'cover'),
    (2925641618, LOAD_FILE('D:\\ProgramData\\MySQL\\MySQL Server 9.0\\Uploads\\rdr2.jpg'), 6, 'cover'),
    (2484020706, LOAD_FILE('D:\\ProgramData\\MySQL\\MySQL Server 9.0\\Uploads\\cyber.jpeg'), 7, 'cover'),
    (158268105, LOAD_FILE('D:\\ProgramData\\MySQL\\MySQL Server 9.0\\Uploads\\fortnite.webp'), 8, 'cover'),
    -- (4000571793, LOAD_FILE('D:\\ProgramData\\MySQL\\MySQL Server 9.0\\Uploads\\cod_mw2.jpg'), 9, 'cover'),
    (3771333181, LOAD_FILE('D:\\ProgramData\\MySQL\\MySQL Server 9.0\\Uploads\\hades.webp'), 10, 'cover'),
    (1137781088, LOAD_FILE('D:\\ProgramData\\MySQL\\MySQL Server 9.0\\Uploads\\overwatch2.jpg'), 11, 'cover'),
    (1631565415, LOAD_FILE('D:\\ProgramData\\MySQL\\MySQL Server 9.0\\Uploads\\lol.jpg'), 12, 'cover'),
    (3079431318, LOAD_FILE('D:\\ProgramData\\MySQL\\MySQL Server 9.0\\Uploads\\val.jpg'), 13, 'cover'),
    (2995258255, LOAD_FILE('D:\\ProgramData\\MySQL\\MySQL Server 9.0\\Uploads\\apex.jpg'), 14, 'cover'),
    (3595424, LOAD_FILE('D:\\ProgramData\\MySQL\\MySQL Server 9.0\\Uploads\\pubg.webp'), 15, 'cover'),
    (3857563868, LOAD_FILE('D:\\ProgramData\\MySQL\\MySQL Server 9.0\\Uploads\\amoungus.png'), 16, 'cover'),
    (3849213509, LOAD_FILE('D:\\ProgramData\\MySQL\\MySQL Server 9.0\\Uploads\\animal-crossing.avif'), 17, 'cover'),
    (1558967895, LOAD_FILE('D:\\ProgramData\\MySQL\\MySQL Server 9.0\\Uploads\\splat3.avif'), 18, 'cover'),
    (2735646219, LOAD_FILE('D:\\ProgramData\\MySQL\\MySQL Server 9.0\\Uploads\\mkart8.jpg'), 19, 'cover'),
    (2693180039, LOAD_FILE('D:\\ProgramData\\MySQL\\MySQL Server 9.0\\Uploads\\haloinf.jpeg'), 20, 'cover'),
    (1967635765, LOAD_FILE('D:\\ProgramData\\MySQL\\MySQL Server 9.0\\Uploads\\destiny2.jpg'), 21, 'cover'),
    (1031845855, LOAD_FILE('D:\\ProgramData\\MySQL\\MySQL Server 9.0\\Uploads\\tetris_effect.jpeg'), 22, 'cover'),
    (3551254620, LOAD_FILE('D:\\ProgramData\\MySQL\\MySQL Server 9.0\\Uploads\\portal2.jpg'), 23, 'cover'),
    (880498219, LOAD_FILE('D:\\ProgramData\\MySQL\\MySQL Server 9.0\\Uploads\\hl2.jpg'), 24, 'cover'),
    (904632192, LOAD_FILE('D:\\ProgramData\\MySQL\\MySQL Server 9.0\\Uploads\\smashult.jpeg'), 25, 'cover'),
    (554740096, LOAD_FILE('D:\\ProgramData\\MySQL\\MySQL Server 9.0\\Uploads\\hallow.avif'), 26, 'cover'),
    (3188450319, LOAD_FILE('D:\\ProgramData\\MySQL\\MySQL Server 9.0\\Uploads\\ds3.webp'), 27, 'cover');
