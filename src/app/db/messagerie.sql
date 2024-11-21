CREATE TABLE users {
    id INT AUTO_INCREMENT,
    username VARCHAR(32) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    PRIMARY KEY (id),
};

CREATE TABLE channels {
    id INT AUTO_INCREMENT,
    name VARCHAR(32) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
};

CREATE TABLE messages {
    id INT AUTO_INCREMENT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    content TEXT NOT NULL,
    author_id INT NOT NULL,
    channel_id INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (author_id) REFERENCES users(id),
    FOREIGN KEY (channel_id) REFERENCES channels(id)
};

CREATE TABLE channel_members {
    member_id INT NOT NULL,
    channel_id INT NOT NULL,
    PRIMARY KEY (member_id, channel_id),
    FOREIGN KEY (member_id) REFERENCES users(id),
    FOREIGN KEY (channel_id) REFERENCES channels(id)
};