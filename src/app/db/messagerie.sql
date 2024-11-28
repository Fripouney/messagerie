CREATE TABLE users (
    id serial primary key,
    username VARCHAR(32) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE channels (
    id serial primary key,
    name VARCHAR(32) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE messages (
    id serial primary key,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    content TEXT NOT NULL,
    author_id INT NOT NULL,
    channel_id INT NOT NULL,
	CONSTRAINT fk_users FOREIGN KEY (author_id) REFERENCES users(id),
	CONSTRAINT fk_channels FOREIGN KEY (channel_id) REFERENCES channels(id)
);

CREATE TABLE channel_members (
    member_id INT NOT NULL primary key,
    channel_id INT NOT NULL primary key,
	CONSTRAINT fk_users FOREIGN KEY (member_id) REFERENCES users(id),
	CONSTRAINT fk_channels FOREIGN KEY (channel_id) REFERENCES channel(id)
);