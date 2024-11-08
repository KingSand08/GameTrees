USE gtsdb;
CREATE TABLE user (
    id VARCHAR(255) PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL
);

CREATE TABLE user_session (
    id VARCHAR(255) PRIMARY KEY,
    user_id VARCHAR(255) NOT NULL,
    expires_at INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES user(id)
);
