-- Reset DB
DROP DATABASE gtsdb;
CREATE DATABASE gtsdb;
USE gtsdb;

-- Define Tables
CREATE TABLE Users (
    uid INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(25) NOT NULL UNIQUE,
    name VARCHAR(40) NOT NULL,
    password VARCHAR(100) NOT NULL,
    dob DATE,
    phone VARCHAR(15),
    email VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE Customers(
    uid INT PRIMARY KEY,
    last_login TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (uid) REFERENCES Users(uid) 
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE Systems_Owned(
    uid INT,
    device VARCHAR(30),
    PRIMARY KEY (uid, Device),
    FOREIGN KEY (uid) REFERENCES Customers(uid)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE StoreMgrs(
    uid INT PRIMARY KEY,
    FOREIGN KEY (uid) REFERENCES Users(uid) 
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE Admins(
    uid INT PRIMARY KEY,
    FOREIGN KEY (uid) REFERENCES Users(uid) 
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE Business(
    bid INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    is_pc ENUM('N', 'Y') NOT NULL, -- Parent Company
    is_dev ENUM('N', 'Y') NOT NULL, -- Developer
    is_pub ENUM('N', 'Y') NOT NULL, -- Publisher
    street VARCHAR(100),
    city VARCHAR(25),
    state CHAR(2),
    zip INT,
    country VARCHAR(25)
);

CREATE TABLE Stores(
    sid INT AUTO_INCREMENT PRIMARY KEY,
    bid INT NOT NULL,
    mid INT, -- Manager ID
    store_name VARCHAR(300),
    ops_days VARCHAR(500),
    ops_hours VARCHAR(500),
    modality VARCHAR(50),
    street VARCHAR(100),
    city VARCHAR(180),
    state CHAR(2),
    zip INT,
    country VARCHAR(60),
    FOREIGN KEY (bid) REFERENCES Business(bid)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (mid) REFERENCES StoreMgrs(uid)
        ON DELETE SET NULL
        ON UPDATE CASCADE
);

CREATE TABLE Games(
    gid INT AUTO_INCREMENT PRIMARY KEY, -- Hashing of title and publish_date
    title VARCHAR(300) NOT NULL,
    description TEXT,
    did INT, -- developer ID (refers to business id as developers are actually businesses)
    price FLOAT(2),
    publish_date DATE,
    FOREIGN KEY (did) REFERENCES Business(bid)
        ON DELETE NO ACTION
        ON UPDATE CASCADE
);

CREATE TABLE GenreList(
    genre_id INT AUTO_INCREMENT PRIMARY KEY,
    type VARCHAR(250) NOT NULL UNIQUE
);

CREATE TABLE Genres(
    gid INT NOT NULL,
    genre_id INT NOT NULL,
    PRIMARY KEY (gid, genre_id),
    FOREIGN KEY (gid) REFERENCES Games(gid)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (genre_id) REFERENCES GenreList(genre_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE PlatformList( -- Android IOS, Playstation, PC, etc.
    plat_id INT AUTO_INCREMENT PRIMARY KEY,
    platform VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE Platforms(
    gid INT,
    plat_id INT NOT NULL,
    PRIMARY KEY (gid, plat_id),
    FOREIGN KEY (gid) REFERENCES Games(gid)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (plat_id) REFERENCES PlatformList(plat_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE Inventories(
    sid INT,
    gid INT,
    discount DECIMAL(3, 2) DEFAULT 0 CHECK (discount BETWEEN 0 AND 1),
    PRIMARY KEY (sid, gid),
    FOREIGN KEY (sid) REFERENCES Stores(sid)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (gid) REFERENCES Games(gid)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE PublishedBy(
    pid INT,
    gid INT,
    PRIMARY KEY (pid, gid),
    FOREIGN KEY (pid) REFERENCES Business(bid)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (gid) REFERENCES Games(gid)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE Wishlists(
    uid INT,
    gid INT,
    PRIMARY KEY (uid, gid),
    FOREIGN KEY (uid) REFERENCES Customers(uid)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (gid) REFERENCES Games(gid)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE Contents(
    cid INT AUTO_INCREMENT PRIMARY KEY,
    content TEXT
);

CREATE TABLE Photos(
    pid BIGINT PRIMARY KEY,
    add_date DATE NOT NULL
);

CREATE TABLE AccPhotos(
    apid BIGINT PRIMARY KEY,
    image MEDIUMBLOB NOT NULL,
    uid INT NOT NULL,
    FOREIGN KEY (apid) REFERENCES Photos(pid)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (uid) REFERENCES Users(uid)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE StorePhotos(
    spid BIGINT PRIMARY KEY,
    image LONGBLOB NOT NULL,
    sid INT,
    FOREIGN KEY (spid) REFERENCES Photos(pid)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (sid) REFERENCES Stores(sid)
        ON DELETE SET NULL
        ON UPDATE CASCADE
);

CREATE TABLE BizPhotos(
    bpid BIGINT PRIMARY KEY,
    image LONGBLOB NOT NULL,
    bid INT,
    FOREIGN KEY (bpid) REFERENCES Photos(pid)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (bid) REFERENCES Business(bid)
        ON DELETE SET NULL
        ON UPDATE CASCADE
);

CREATE TABLE GamePhotos(
    gpid BIGINT PRIMARY KEY,
    image LONGBLOB NOT NULL,
    gid INT,
    type VARCHAR(10) NOT NULL, -- Either cover or content
    FOREIGN KEY (gpid) REFERENCES Photos(pid)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (gid) REFERENCES Games(gid)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE Reviews(
    rid INT PRIMARY KEY,
    stars INT CHECK (stars BETWEEN 0 AND 5),
    uid INT,
    cid INT NOT NULL,
    FOREIGN KEY (uid) REFERENCES Users(uid)
        ON DELETE SET NULL
        ON UPDATE CASCADE,
    FOREIGN KEY (cid) REFERENCES Contents(cid)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE StoreReviews( -- Store reviews
    rid INT PRIMARY KEY,
    sid INT NOT NULL,
    FOREIGN KEY (rid) REFERENCES Reviews(rid)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (sid) REFERENCES Stores(sid)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE GameReviews( -- Game reviews
    rid INT PRIMARY KEY,
    gid INT NOT NULL, 
    FOREIGN KEY (rid) REFERENCES Reviews(rid)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (gid) REFERENCES Games(gid)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE Removed_Reviews(
    uid INT,
    rid INT,
    PRIMARY KEY (uid, rid),
    FOREIGN KEY (uid) REFERENCES Admins(uid)
        ON DELETE NO ACTION
        ON UPDATE CASCADE,
    FOREIGN KEY (rid) REFERENCES Reviews(rid)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE Comments(
    publish_date TIMESTAMP,
    rid INT,
    uid INT,
    edit_date TIMESTAMP,
    cid INT NOT NULL,
    pid BIGINT,
    PRIMARY KEY (publish_date, rid),
    FOREIGN KEY (rid) REFERENCES Reviews(rid)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (cid) REFERENCES Contents(cid)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (pid) REFERENCES Photos(pid)
        ON DELETE SET NULL
        ON UPDATE CASCADE,
    FOREIGN KEY (uid) REFERENCES Users(uid)
        ON DELETE SET NULL
        ON UPDATE CASCADE
);

CREATE TABLE Warnings(
    issue_num INT CHECK (issue_num BETWEEN 1 AND 3),
    uid INT,
    warn_desc VARCHAR(255),
    admin_id INT NOT NULL,
    PRIMARY KEY (issue_num, uid),
    FOREIGN KEY (uid) REFERENCES Users(uid)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (admin_id) REFERENCES Admins(uid)
        ON DELETE NO ACTION
        ON UPDATE CASCADE    
);

CREATE TABLE Ban_List(
    ban_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    admin_id INT,
    FOREIGN KEY (user_id) REFERENCES Users(uid)
        ON DELETE SET NULL
        ON UPDATE CASCADE,
    FOREIGN KEY (admin_id) REFERENCES Admins(uid)
        ON DELETE SET NULL
        ON UPDATE CASCADE
);

DELIMITER //

CREATE TRIGGER businessBecomesDeveloper -- This trigger ensures only a Developer can issue a game
    AFTER INSERT ON Games 
    FOR EACH ROW
    BEGIN
        IF ((SELECT B.is_dev 
            FROM Business B
            WHERE B.bid = NEW.did) <> 'Y')
            THEN UPDATE Business B2
                SET B2.is_dev = 'Y'
                WHERE B2.bid = NEW.did;
            END IF;
    END//

CREATE TRIGGER businessBecomesDistributor -- This ensures a business owning any store is a Parent Company
    AFTER INSERT ON Stores
    FOR EACH ROW
    BEGIN
        IF ((SELECT B.is_pc
            FROM Business B
            WHERE B.bid = NEW.bid) <> 'Y')
            THEN UPDATE Business B2
                SET B2.is_pc = 'Y'
                WHERE B2.bid = NEW.bid;
        END IF;
    END//    

CREATE TRIGGER businessBecomesPublisher -- This trigger ensures only a Publisher can publish a game
    AFTER INSERT ON PublishedBy 
    FOR EACH ROW
    BEGIN
        IF ((SELECT B.is_pub
            FROM Business B
            WHERE B.bid = NEW.pid) <> 'Y')
        THEN UPDATE Business B2
            SET B2.is_pub = 'Y'
            WHERE B2.bid = NEW.pid;
        END IF;
    END//

CREATE TRIGGER autoBansUserAfterThreeWarnings -- This trigger ensures an uid is banned upon receiving the third warning
    AFTER INSERT ON Warnings
    FOR EACH ROW
    BEGIN
        IF (NEW.issue_num = 3)
        THEN INSERT INTO Ban_List (uid, admin_id)
        VALUES (NEW.uid, NEW.admin_id);
        END IF;
    END//

DELIMITER ;

-- POPULATE DATA SECTION

-- Populate Users (Admins and Managers)
INSERT INTO Users(username, name, password, email) VALUES	
	('pikalot','Pikalot', 'Admin@123', 'pikalot@hotmail.com'),
	('sandking','Connor', 'Admin@124', 'clinvil2@gmail.com'),
	('aman','Aman', 'Admin@125', 'aman.imran@sjsu.edu'),
	('genie','Alex', 'Admin@126', 'alimalex1525@gmail.com'),
	('splendid','Steve', 'Admin@123', 'stevenlu156@gmail.com'),
	('peasant','Jon Snow', 'Manager@123', 'thepikalot@yahoo.com'),
	('manager','Joker', 'Manager@123', 'tuananh.ho@sjsu.edu');

-- Populate Admins
INSERT INTO Admins(uid) 
    SELECT uid FROM Users WHERE username='pikalot'
    UNION ALL
    SELECT uid FROM Users WHERE username='sandking'
    UNION ALL
    SELECT uid FROM Users WHERE username='aman'
    UNION ALL
    SELECT uid FROM Users WHERE username='genie'
    UNION ALL
    SELECT uid FROM Users WHERE username='splendid';

-- Populate Store Managers
INSERT INTO StoreMgrs(uid)
    SELECT uid FROM Users WHERE username='peasant'
    UNION ALL
    SELECT uid FROM Users WHERE username='manager';


-- Populate Users (Customers)
INSERT INTO Users (Username, Name, DOB, Phone, Password, Email) VALUES
    ('marioB', 'Mario Bros', '1981-07-09', '(408)555-1001', 'hashed_password_1', 'mario@nintendoland.com'),
    ('linkH', 'Link Hylian', '1986-02-21', '(408)555-1002', 'hashed_password_2', 'link@hyrule.com'),
    ('samusA', 'Samus Aran', '1986-08-06', '(408)555-1003', 'hashed_password_3', 'samus@metroid.com'),
    ('sonicH', 'Sonic Hedgehog', '1991-06-23', '(408)555-1004', 'hashed_password_4', 'sonic@sega.com'),
    ('laraC', 'Lara Croft', '1996-10-25', '(408)555-1005', 'hashed_password_5', 'lara@tombraider.com'),
    ('cloudS', 'Cloud Strife', '1997-01-31', '(408)555-1006', 'hashed_password_6', 'cloud@ffvii.com'),
    ('kratosG', 'Kratos Godofwar', '2005-03-22', '(408)555-1007', 'hashed_password_7', 'kratos@sparta.com'),
    ('masterC', 'Master Chief', '2001-11-15', '(408)555-1008', 'hashed_password_8', 'chief@halo.com'),
    ('geraltR', 'Geralt Rivia', '2007-10-26', '(408)555-1009', 'hashed_password_9', 'geralt@witcher.com'),
    ('arthurM', 'Arthur Morgan', '2018-10-26', '(408)555-1010', 'hashed_password_10', 'arthur@rdr2.com');

INSERT INTO Customers (UID)
    SELECT UID 
    FROM Users 
    WHERE Username IN (
        'marioB', 
        'linkH', 
        'samusA', 
        'sonicH', 
        'laraC', 
        'cloudS', 
        'kratosG', 
        'masterC', 
        'geraltR', 
        'arthurM'
);

-- Insert the top 20 game publishers, developers, and parent companies into the Business table
INSERT INTO Business (name, is_pc, is_dev, is_pub, street, city, state, zip, country)
VALUES
    ('Microsoft Gaming', 'Y', 'Y', 'Y', '1 Microsoft Way', 'Redmond', 'WA', 98052, 'USA'),
    ('Sony Interactive Entertainment', 'Y', 'Y', 'Y', '2207 Bridgepointe Pkwy', 'San Mateo', 'CA', 94404, 'USA'),
    ('Tencent Games', 'Y', 'Y', 'Y', 'Nanshan District', 'Shenzhen', 'GD', 518052, 'China'),
    ('Apple Inc.', 'Y', 'N', 'Y', '1 Infinite Loop', 'Cupertino', 'CA', 95014, 'USA'),
    ('NetEase Games', 'Y', 'Y', 'Y', 'Binjiang District', 'Hangzhou', 'ZJ', 310052, 'China'),
    ('Google', 'Y', 'N', 'Y', '1600 Amphitheatre Parkway', 'Mountain View', 'CA', 94043, 'USA'),
    ('Electronic Arts', 'Y', 'Y', 'Y', '209 Redwood Shores Pkwy', 'Redwood City', 'CA', 94065, 'USA'),
    ('Nintendo Co., Ltd.', 'Y', 'Y', 'Y', '11-1 Kamitoba', 'Kyoto', NULL, 601-8501, 'Japan'),
    ('Take-Two Interactive', 'Y', 'Y', 'Y', '110 West 44th St', 'New York', 'NY', 10036, 'USA'),
    ('Nexon Co., Ltd.', 'Y', 'Y', 'Y', '6 Shinjuku', 'Tokyo', NULL, 160-0022, 'Japan'),
    ('Bandai Namco Holdings Inc.', 'Y', 'Y', 'Y', '3-6-7 Minato-ku', 'Tokyo', NULL, 108-0014, 'Japan'),
    ('Embracer Group AB', 'Y', 'Y', 'Y', '4 Drottninggatan', 'Karlstad', NULL, 652-25, 'Sweden'),
    ('Epic Games', 'Y', 'Y', 'Y', '620 Crossroads Blvd', 'Cary', 'NC', 27518, 'USA'),
    ('Valve Corporation (Steam)', 'Y', 'Y', 'Y', '10400 NE 4th St', 'Bellevue', 'WA', 98004, 'USA'),
    ('Ubisoft Entertainment SA', 'Y', 'Y', 'Y', '28 Rue Armand Carrel', 'Montreuil', NULL, 93100, 'France'),
    ('Square Enix Holdings Co., Ltd.', 'Y', 'Y', 'Y', '6-27-30 Shinjuku', 'Tokyo', NULL, 160-8430, 'Japan'),
    ('Konami Holdings Corporation', 'Y', 'Y', 'Y', '9-7-2 Akasaka', 'Tokyo', NULL, 107-8324, 'Japan'),
    ('Sega Sammy Holdings Inc.', 'Y', 'Y', 'Y', '1-2-12 Haneda', 'Tokyo', NULL, 144-0052, 'Japan'),
    ('Roblox Corporation', 'Y', 'Y', 'Y', '970 Park Place', 'San Mateo', 'CA', 94403, 'USA'),
    ('Krafton Inc.', 'Y', 'Y', 'Y', '231 Teheran-ro', 'Seoul', NULL, NULL, 'South Korea');

-- Insert the top 30 game genres into the GenreList table
INSERT INTO GenreList (type)
VALUES
    ('Action'),
    ('Adventure'),
    ('Role-Playing Game (RPG)'),
    ('Simulation'),
    ('Strategy'),
    ('Sports'),
    ('Racing'),
    ('Puzzle'),
    ('Shooter'),
    ('Fighting'),
    ('Survival'),
    ('Horror'),
    ('Stealth'),
    ('Sandbox'),
    ('Platformer'),
    ('Massively Multiplayer Online (MMO)'),
    ('Battle Royale'),
    ('Open World'),
    ('Party'),
    ('Casual'),
    ('Educational'),
    ('Interactive Story'),
    ('Visual Novel'),
    ('Rhythm'),
    ('Turn-Based Strategy (TBS)'),
    ('Real-Time Strategy (RTS)'),
    ('Tower Defense'),
    ('Metroidvania'),
    ('Card Game'),
    ('Idle Games'),
    ('Virtual Reality (VR)');

-- Insert the top 40 gaming platforms into the PlatformList table

INSERT INTO PlatformList (platform)
VALUES
    ('PC'),
    ('PlayStation 5'),
    ('PlayStation 4'),
    ('PlayStation 3'),
    ('PlayStation 2'),
    ('PlayStation 1'),
    ('Xbox Series X|S'),
    ('Xbox One'),
    ('Xbox 360'),
    ('Xbox Original'),
    ('Nintendo Switch'),
    ('Nintendo Wii'),
    ('Nintendo Wii U'),
    ('Nintendo GameCube'),
    ('Nintendo 64'),
    ('Nintendo DS'),
    ('Nintendo 3DS'),
    ('Game Boy'),
    ('Game Boy Color'),
    ('Game Boy Advance'),
    ('Mobile (iOS)'),
    ('Mobile (Android)'),
    ('Steam Deck'),
    ('Google Stadia'),
    ('PlayStation VR'),
    ('Meta Quest 2 (Oculus)'),
    ('HTC Vive'),
    ('Valve Index'),
    ('Samsung Gear VR'),
    ('Nintendo Virtual Boy'),
    ('Sega Genesis'),
    ('Sega Saturn'),
    ('Dreamcast'),
    ('Neo Geo'),
    ('Atari 2600'),
    ('Commodore 64'),
    ('Amiga'),
    ('DOS'),
    ('MacOS'),
    ('Linux'),
    ('Arcade');

-- Populate Games
INSERT INTO Games (gid, title, description, did, price, publish_date)
VALUES
    (1, 'The Legend of Zelda: Breath of the Wild', 'Explore a vast open world in this action-adventure masterpiece.', 8, 59.99, '2017-03-03'),
    (2, 'Elden Ring', 'A fantasy action RPG collaboration between George R. R. Martin and FromSoftware.', 8, 69.99, '2022-02-25'),
    (3, 'Minecraft', 'A sandbox game where you can build and explore infinite worlds.', 1, 26.95, '2011-11-18'),
    (4, 'Grand Theft Auto V', 'An open-world action game set in Los Santos.', 9, 29.99, '2013-09-17'),
    (5, 'The Witcher 3: Wild Hunt', 'A story-driven RPG set in a visually stunning fantasy universe.', 8, 39.99, '2015-05-19'),
    (6, 'Red Dead Redemption 2', 'An epic tale of life in America’s unforgiving heartland.', 9, 59.99, '2018-10-26'),
    (7, 'Cyberpunk 2077', 'An open-world RPG set in Night City.', 8, 59.99, '2020-12-10'),
    (8, 'Fortnite', 'A battle royale game with building mechanics.', 13, 0.00, '2017-09-26'),
    (9, 'Call of Duty: Modern Warfare II', 'The latest installment in the Modern Warfare series.', 1, 69.99, '2022-10-28'),
    (10, 'Hades', 'A roguelike dungeon crawler with incredible gameplay and storytelling.', 8, 24.99, '2020-09-17'),
    (11, 'Overwatch 2', 'A team-based shooter game with updated mechanics.', 1, 0.00, '2022-10-04'),
    (12, 'League of Legends', 'A competitive online MOBA game.', 3, 0.00, '2009-10-27'),
    (13, 'Valorant', 'A tactical shooter from Riot Games.', 3, 0.00, '2020-06-02'),
    (14, 'Apex Legends', 'A fast-paced battle royale game.', 7, 0.00, '2019-02-04'),
    (15, 'PUBG: Battlegrounds', 'A realistic battle royale game.', 20, 29.99, '2017-12-20'),
    (16, 'Among Us', 'A party game focused on deception and teamwork.', 5, 4.99, '2018-06-15'),
    (17, 'Animal Crossing: New Horizons', 'A life-simulation game for relaxation.', 8, 59.99, '2020-03-20'),
    (18, 'Splatoon 3', 'A colorful shooter game by Nintendo.', 8, 59.99, '2022-09-09'),
    (19, 'Mario Kart 8 Deluxe', 'A fun kart racing game for all ages.', 8, 59.99, '2017-04-28'),
    (20, 'Halo Infinite', 'The latest installment in the Halo series.', 1, 59.99, '2021-12-08'),
    (21, 'Destiny 2', 'A sci-fi online shooter with RPG elements.', 13, 0.00, '2017-09-06'),
    (22, 'Tetris Effect', 'A modern take on the classic puzzle game.', 8, 29.99, '2018-11-09'),
    (23, 'Portal 2', 'A puzzle-platformer sequel with mind-bending physics.', 14, 19.99, '2011-04-19'),
    (24, 'Half-Life 2', 'A first-person shooter that redefined storytelling and gameplay.', 14, 9.99, '2004-11-16'),
    (25, 'Super Smash Bros. Ultimate', 'A fighting game featuring iconic characters.', 8, 59.99, '2018-12-07'),
    (26, 'Hollow Knight', 'A challenging and atmospheric metroidvania game.', 8, 14.99, '2017-02-24'),
    (27, 'Dark Souls III', 'A dark and punishing RPG from FromSoftware.', 8, 59.99, '2016-04-12');
    -- Add rows up to 100 with similar structure


-- Link games to genres in the Genres table
INSERT INTO Genres (gid, genre_id)
VALUES
    (1, 2), -- The Legend of Zelda: Adventure
    (1, 4), -- The Legend of Zelda: Open World
    (2, 3), -- Elden Ring: RPG
    (2, 2), -- Elden Ring: Adventure
    (3, 13), -- Minecraft: Sandbox
    (3, 4), -- Minecraft: Open World
    (4, 2), -- GTA V: Adventure
    (4, 11), -- GTA V: Survival
    (5, 3), -- The Witcher 3: RPG
    (5, 2), -- The Witcher 3: Adventure
    (6, 2), -- Red Dead Redemption 2: Adventure
    (6, 11), -- Red Dead Redemption 2: Survival
    (7, 3), -- Cyberpunk 2077: RPG
    (7, 4), -- Cyberpunk 2077: Open World
    (8, 17), -- Fortnite: Battle Royale
    (8, 9), -- Fortnite: Shooter
    (9, 9), -- Call of Duty: Modern Warfare II: Shooter
    (10, 3), -- Hades: RPG
    (10, 16), -- Hades: Roguelike
    (11, 9), -- Overwatch 2: Shooter
    (11, 20), -- Overwatch 2: Team-Based
    (12, 15), -- League of Legends: MOBA
    (13, 9), -- Valorant: Shooter
    (14, 17), -- Apex Legends: Battle Royale
    (14, 9), -- Apex Legends: Shooter
    (15, 17), -- PUBG: Battle Royale
    (15, 9), -- PUBG: Shooter
    (16, 19), -- Among Us: Party
    (16, 20), -- Among Us: Casual
    (17, 19), -- Animal Crossing: Casual
    (17, 6), -- Animal Crossing: Simulation
    (18, 9), -- Splatoon 3: Shooter
    (18, 19), -- Splatoon 3: Casual
    (19, 6), -- Mario Kart 8 Deluxe: Racing
    (20, 9), -- Halo Infinite: Shooter
    (21, 9), -- Destiny 2: Shooter
    (21, 3), -- Destiny 2: RPG
    (22, 8), -- Tetris Effect: Puzzle
    (23, 8), -- Portal 2: Puzzle
    (24, 9), -- Half-Life 2: Shooter
    (25, 10); -- Super Smash Bros. Ultimate: Fighting

-- Link games to platforms in the Platforms table
INSERT INTO Platforms (gid, plat_id)
VALUES
    (1, 11), -- Zelda on Nintendo Switch
    (2, 1), -- Elden Ring on PC
    (2, 2), -- Elden Ring on PlayStation 5
    (2, 7), -- Elden Ring on Xbox Series X|S
    (3, 1), -- Minecraft on PC
    (3, 21), -- Minecraft on Mobile (iOS)
    (3, 22), -- Minecraft on Mobile (Android)
    (3, 11), -- Minecraft on Nintendo Switch
    (3, 7), -- Minecraft on Xbox Series X|S
    (4, 1), -- GTA V on PC
    (4, 2), -- GTA V on PlayStation 5
    (4, 7), -- GTA V on Xbox Series X|S
    (5, 1), -- The Witcher 3 on PC
    (5, 2), -- The Witcher 3 on PlayStation 5
    (5, 11), -- The Witcher 3 on Nintendo Switch
    (6, 1), -- Red Dead Redemption 2 on PC
    (6, 2), -- Red Dead Redemption 2 on PlayStation 5
    (6, 7), -- Red Dead Redemption 2 on Xbox Series X|S
    (7, 1), -- Cyberpunk 2077 on PC
    (7, 2), -- Cyberpunk 2077 on PlayStation 5
    (7, 7), -- Cyberpunk 2077 on Xbox Series X|S
    (8, 1), -- Fortnite on PC
    (8, 21), -- Fortnite on Mobile (iOS)
    (8, 22), -- Fortnite on Mobile (Android)
    (9, 1), -- Call of Duty: Modern Warfare II on PC
    (9, 2), -- Call of Duty: Modern Warfare II on PlayStation 5
    (9, 7), -- Call of Duty: Modern Warfare II on Xbox Series X|S
    (10, 1), -- Hades on PC
    (10, 11), -- Hades on Nintendo Switch
    (11, 1), -- Overwatch 2 on PC
    (11, 2), -- Overwatch 2 on PlayStation 5
    (11, 7), -- Overwatch 2 on Xbox Series X|S
    (12, 1), -- League of Legends on PC
    (13, 1), -- Valorant on PC
    (14, 1), -- Apex Legends on PC
    (14, 2), -- Apex Legends on PlayStation 5
    (14, 7), -- Apex Legends on Xbox Series X|S
    (15, 1), -- PUBG on PC
    (15, 21), -- PUBG on Mobile (iOS)
    (15, 22), -- PUBG on Mobile (Android)
    (16, 1), -- Among Us on PC
    (16, 21), -- Among Us on Mobile (iOS)
    (16, 22), -- Among Us on Mobile (Android)
    (17, 11), -- Animal Crossing on Nintendo Switch
    (18, 11), -- Splatoon 3 on Nintendo Switch
    (19, 11), -- Mario Kart 8 Deluxe on Nintendo Switch
    (20, 1), -- Halo Infinite on PC
    (20, 7), -- Halo Infinite on Xbox Series X|S
    (21, 1), -- Destiny 2 on PC
    (21, 2), -- Destiny 2 on PlayStation 5
    (21, 7), -- Destiny 2 on Xbox Series X|S
    (22, 1), -- Tetris Effect on PC
    (22, 2), -- Tetris Effect on PlayStation 4
    (23, 1), -- Portal 2 on PC
    (23, 7), -- Portal 2 on Xbox 360
    (24, 1), -- Half-Life 2 on PC
    (25, 11); -- Super Smash Bros. Ultimate on Nintendo Switch

-- Insert 25 game stores into the Stores table with store_name and ops_days included
-- Bay Area Stores
INSERT INTO Stores (bid, mid, store_name, ops_days, ops_hours, modality, street, city, state, zip, country)
VALUES
    (1, 6, 'San Francisco Gaming Hub', 'Monday-Sunday', '10AM-8PM', 'Physical', '123 Market St', 'San Francisco', 'CA', 94103, 'USA'),
    (1, 7, 'Mountain View Game Store', 'Monday-Sunday', '10AM-8PM', 'Physical', '456 Castro St', 'Mountain View', 'CA', 94041, 'USA'),
    (2, 6, 'Palo Alto Gamers', 'Monday-Saturday', '9AM-7PM', 'Physical', '789 El Camino Real', 'Palo Alto', 'CA', 94301, 'USA'),
    (2, 7, 'Berkeley Esports Arena', 'Monday-Friday', '11AM-9PM', 'Physical', '321 University Ave', 'Berkeley', 'CA', 94704, 'USA'),
    (3, 6, 'San Jose Game Arena', 'Tuesday-Sunday', '9AM-7PM', 'Physical', '111 Santana Row', 'San Jose', 'CA', 95128, 'USA'),
    (3, 7, 'Oakland Game Center', 'Monday-Sunday', '10AM-8PM', 'Physical', '222 Broadway', 'Oakland', 'CA', 94607, 'USA'),
    (4, 6, 'Fremont Gaming World', 'Monday-Friday', '11AM-9PM', 'Physical', '333 Main St', 'Fremont', 'CA', 94538, 'USA'),
    (4, 7, 'Burlingame Game Stop', 'Wednesday-Sunday', '10AM-8PM', 'Physical', '444 California Dr', 'Burlingame', 'CA', 94010, 'USA'),
    (5, 6, 'Redwood City Gamers Lounge', 'Monday-Saturday', '10AM-9PM', 'Physical', '555 Walnut St', 'Redwood City', 'CA', 94063, 'USA'),
    (5, 7, 'Santa Clara Gaming Plaza', 'Tuesday-Sunday', '9AM-7PM', 'Physical', '666 Great America Pkwy', 'Santa Clara', 'CA', 95054, 'USA');

-- Other USA Stores
INSERT INTO Stores (bid, mid, store_name, ops_days, ops_hours, modality, street, city, state, zip, country)
VALUES
    (6, 6, 'New York Gamers Central', 'Monday-Sunday', '9AM-9PM', 'Physical', '123 Main St', 'New York', 'NY', 10001, 'USA'),
    (6, 7, 'Boston Game House', 'Monday-Saturday', '10AM-8PM', 'Physical', '456 Elm St', 'Boston', 'MA', 02108, 'USA'),
    (7, 6, 'Chicago Gaming Hub', 'Tuesday-Sunday', '10AM-8PM', 'Physical', '789 Pine St', 'Chicago', 'IL', 60605, 'USA'),
    (7, 7, 'Dallas Game Zone', 'Monday-Friday', '11AM-9PM', 'Physical', '321 Maple Ave', 'Dallas', 'TX', 75201, 'USA'),
    (8, 6, 'LA Gaming Plaza', 'Monday-Saturday', '10AM-8PM', 'Physical', '111 Sunset Blvd', 'Los Angeles', 'CA', 90028, 'USA'),
    (8, 7, 'Orlando Gamers Park', 'Wednesday-Sunday', '9AM-7PM', 'Physical', '222 Hollywood Blvd', 'Orlando', 'FL', 32801, 'USA'),
    (9, 6, 'Miami Game World', 'Monday-Sunday', '10AM-8PM', 'Physical', '333 Ocean Dr', 'Miami', 'FL', 33139, 'USA'),
    (9, 7, 'Detroit Esports Center', 'Monday-Friday', '11AM-9PM', 'Physical', '444 River St', 'Detroit', 'MI', 48226, 'USA'),
    (10, 6, 'Seattle Gaming Nexus', 'Monday-Saturday', '9AM-7PM', 'Physical', '555 Broadway', 'Seattle', 'WA', 98122, 'USA'),
    (10, 7, 'Austin Game Stop', 'Tuesday-Sunday', '10AM-9PM', 'Physical', '666 Lake Ave', 'Austin', 'TX', 78701, 'USA'),
    (11, 6, 'Denver Gamers Lounge', 'Monday-Saturday', '11AM-9PM', 'Physical', '777 Forest Ln', 'Denver', 'CO', 80202, 'USA'),
    (11, 7, 'Atlanta Game Zone', 'Monday-Sunday', '10AM-8PM', 'Physical', '888 Grand Ave', 'Atlanta', 'GA', 30303, 'USA'),
    (12, 6, 'Phoenix Gaming Center', 'Tuesday-Sunday', '9AM-7PM', 'Physical', '999 Oak St', 'Phoenix', 'AZ', 85004, 'USA'),
    (12, 7, 'Las Vegas Game Plaza', 'Monday-Friday', '10AM-8PM', 'Physical', '123 Aspen Dr', 'Las Vegas', 'NV', 89109, 'USA'),
    (13, 6, 'Portland Game Nexus', 'Monday-Sunday', '10AM-9PM', 'Physical', '456 Birch St', 'Portland', 'OR', 97209, 'USA');

-- Add GameStop as a Parent Company in the Business table
INSERT INTO Business (name, is_pc, is_dev, is_pub, street, city, state, zip, country)
VALUES ('GameStop', 'Y', 'N', 'N', '625 Westport Pkwy', 'Grapevine', 'TX', 76051, 'USA');

-- Assume GameStop's `bid` is retrieved after the above insertion
-- Example: SELECT bid FROM Business WHERE name = 'GameStop';

-- Insert 10 GameStop stores into the Stores table
INSERT INTO Stores (bid, mid, store_name, ops_days, ops_hours, modality, street, city, state, zip, country)
VALUES
    (LAST_INSERT_ID(), NULL, 'GameStop - San Francisco', 'Monday-Sunday', '10AM-8PM', 'Physical', '101 Market St', 'San Francisco', 'CA', 94103, 'USA'),
    (LAST_INSERT_ID(), NULL, 'GameStop - Oakland', 'Monday-Saturday', '9AM-7PM', 'Physical', '202 Broadway', 'Oakland', 'CA', 94607, 'USA'),
    (LAST_INSERT_ID(), NULL, 'GameStop - San Jose', 'Monday-Sunday', '10AM-8PM', 'Physical', '303 Tech Row', 'San Jose', 'CA', 95128, 'USA'),
    (LAST_INSERT_ID(), NULL, 'GameStop - Los Angeles', 'Monday-Friday', '11AM-9PM', 'Physical', '404 Sunset Blvd', 'Los Angeles', 'CA', 90028, 'USA'),
    (LAST_INSERT_ID(), NULL, 'GameStop - New York', 'Monday-Sunday', '9AM-9PM', 'Physical', '505 Broadway', 'New York', 'NY', 10001, 'USA'),
    (LAST_INSERT_ID(), NULL, 'GameStop - Chicago', 'Monday-Saturday', '10AM-8PM', 'Physical', '606 Pine St', 'Chicago', 'IL', 60605, 'USA'),
    (LAST_INSERT_ID(), NULL, 'GameStop - Dallas', 'Monday-Friday', '11AM-9PM', 'Physical', '707 Maple Ave', 'Dallas', 'TX', 75201, 'USA'),
    (LAST_INSERT_ID(), NULL, 'GameStop - Orlando', 'Monday-Saturday', '10AM-8PM', 'Physical', '808 Hollywood Blvd', 'Orlando', 'FL', 32801, 'USA'),
    (LAST_INSERT_ID(), NULL, 'GameStop - Seattle', 'Monday-Sunday', '10AM-8PM', 'Physical', '909 Broadway', 'Seattle', 'WA', 98122, 'USA'),
    (LAST_INSERT_ID(), NULL, 'GameStop - Denver', 'Monday-Friday', '10AM-9PM', 'Physical', '1010 Forest Ln', 'Denver', 'CO', 80202, 'USA');

-- Populate inventories for all 35 stores (25 general + 10 GameStop)

-- Bay Area Stores (1-10)
INSERT INTO Inventories (sid, gid, discount)
VALUES
    (1, 1, 0.10), (1, 3, 0.15), (1, 5, 0.05), (1, 9, 0.10), (1, 14, 0.20),
    (2, 2, 0.10), (2, 7, 0.15), (2, 11, 0.00), (2, 13, 0.05), (2, 20, 0.10),
    (3, 4, 0.10), (3, 8, 0.00), (3, 16, 0.20), (3, 19, 0.15), (3, 22, 0.05),
    (4, 6, 0.20), (4, 9, 0.10), (4, 12, 0.00), (4, 15, 0.15), (4, 23, 0.10),
    (5, 3, 0.10), (5, 5, 0.00), (5, 10, 0.20), (5, 18, 0.15), (5, 25, 0.05),
    (6, 2, 0.05), (6, 4, 0.10), (6, 6, 0.15), (6, 8, 0.00), (6, 11, 0.20),
    (7, 9, 0.15), (7, 13, 0.05), (7, 15, 0.20), (7, 19, 0.10), (7, 21, 0.00),
    (8, 1, 0.15), (8, 3, 0.10), (8, 5, 0.00), (8, 7, 0.20), (8, 12, 0.05),
    (9, 4, 0.10), (9, 6, 0.15), (9, 10, 0.20), (9, 16, 0.05), (9, 23, 0.10),
    (10, 2, 0.05), (10, 9, 0.10), (10, 14, 0.15), (10, 18, 0.20), (10, 24, 0.00);

-- Other USA Stores (11-25)
INSERT INTO Inventories (sid, gid, discount)
VALUES
    (11, 1, 0.15), (11, 3, 0.10), (11, 7, 0.20), (11, 12, 0.00), (11, 20, 0.05),
    (12, 4, 0.10), (12, 8, 0.15), (12, 14, 0.20), (12, 19, 0.10), (12, 23, 0.05),
    (13, 2, 0.10), (13, 5, 0.00), (13, 9, 0.15), (13, 13, 0.05), (13, 18, 0.20),
    (14, 6, 0.20), (14, 10, 0.15), (14, 15, 0.00), (14, 22, 0.05), (14, 25, 0.10),
    (15, 1, 0.15), (15, 4, 0.10), (15, 8, 0.00), (15, 11, 0.20), (15, 16, 0.05),
    (16, 9, 0.15), (16, 13, 0.05), (16, 14, 0.20), (16, 18, 0.10), (16, 23, 0.00),
    (17, 2, 0.10), (17, 6, 0.15), (17, 10, 0.20), (17, 15, 0.05), (17, 19, 0.10),
    (18, 3, 0.10), (18, 7, 0.20), (18, 12, 0.00), (18, 16, 0.05), (18, 24, 0.15),
    (19, 5, 0.05), (19, 9, 0.15), (19, 13, 0.05), (19, 17, 0.20), (19, 20, 0.10),
    (20, 1, 0.15), (20, 2, 0.05), (20, 6, 0.20), (20, 11, 0.15), (20, 14, 0.10),
    (21, 3, 0.10), (21, 5, 0.00), (21, 7, 0.20), (21, 9, 0.10), (21, 15, 0.05),
    (22, 4, 0.10), (22, 6, 0.15), (22, 8, 0.00), (22, 10, 0.20), (22, 12, 0.05),
    (23, 1, 0.15), (23, 3, 0.10), (23, 9, 0.15), (23, 14, 0.20), (23, 20, 0.05),
    (24, 6, 0.20), (24, 12, 0.00), (24, 14, 0.15), (24, 16, 0.05), (24, 25, 0.10),
    (25, 2, 0.05), (25, 7, 0.20), (25, 10, 0.20), (25, 13, 0.05), (25, 18, 0.15);

-- GameStop Stores (26-35)
INSERT INTO Inventories (sid, gid, discount)
VALUES
    (26, 1, 0.15), (26, 3, 0.10), (26, 8, 0.00), (26, 15, 0.20), (26, 19, 0.05),
    (27, 2, 0.05), (27, 6, 0.20), (27, 12, 0.00), (27, 20, 0.15), (27, 25, 0.10),
    (28, 3, 0.10), (28, 7, 0.20), (28, 14, 0.15), (28, 16, 0.05), (28, 22, 0.00),
    (29, 5, 0.10), (29, 10, 0.20), (29, 17, 0.15), (29, 24, 0.05), (29, 18, 0.10),
    (30, 4, 0.05), (30, 9, 0.15), (30, 14, 0.20), (30, 18, 0.10), (30, 25, 0.00),
    (31, 1, 0.15), (31, 2, 0.05), (31, 7, 0.20), (31, 11, 0.15), (31, 20, 0.10),
    (32, 3, 0.10), (32, 6, 0.15), (32, 8, 0.00), (32, 15, 0.05), (32, 19, 0.20),
    (33, 2, 0.05), (33, 4, 0.10), (33, 9, 0.15), (33, 13, 0.05), (33, 20, 0.10),
    (34, 5, 0.05), (34, 8, 0.00), (34, 12, 0.10), (34, 17, 0.15), (34, 21, 0.20),
    (35, 7, 0.20), (35, 10, 0.15), (35, 18, 0.10), (35, 23, 0.05), (35, 25, 0.00);
    
    -- Assign games to customer wishlists
INSERT INTO Wishlists (uid, gid)
SELECT C.uid, G.gid
FROM Customers C
JOIN Users U ON C.uid = U.uid
JOIN Games G ON G.title IN (
    'The Legend of Zelda: Breath of the Wild',
    'Super Mario Odyssey',
    'Metroid Dread',
    'Sonic Mania',
    'Tomb Raider',
    'Final Fantasy VII Remake',
    'God of War',
    'Halo Infinite',
    'The Witcher 3: Wild Hunt',
    'Red Dead Redemption 2'
)
WHERE U.username IN (
    'marioB',
    'linkH',
    'samusA',
    'sonicH',
    'laraC',
    'cloudS',
    'kratosG',
    'masterC',
    'geraltR',
    'arthurM'
);