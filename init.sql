CREATE TABLE standard (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    createdDate TIMESTAMP NOT NULL
);

CREATE TABLE sub_standard (
    key VARCHAR(255) NOT NULL, 
    standard_id INT REFERENCES standard(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    maxLength INT NOT NULL,
    minLength INT NOT NULL,
    conditionMax VARCHAR(255),
    conditionMin VARCHAR(255),
    shape TEXT[] -- Array to store multiple shapes
);

CREATE TABLE history (
    id SERIAL PRIMARY KEY,
    createdDate TIMESTAMP NOT NULL,
    standard VARCHAR(255) NOT NULL, -- Name of the standard
    totalSample INT NOT NULL,
    updatedDate TIMESTAMP,
    name TEXT,
    note TEXT,
    samplingDate TIMESTAMP NOT NULL,
    price DECIMAL(10, 2), -- Holds decimal values with 2 decimal places
    samplingPoints BOOLEAN[], -- Now this is an array of booleans
    imageURL VARCHAR(2083) -- Column to store image URL, 2083 is the maximum URL length in most databases
);

CREATE TABLE composition (
    id SERIAL PRIMARY KEY,
    history_id INT REFERENCES history(id) ON DELETE CASCADE, -- Foreign key to history table
    name VARCHAR(255) NOT NULL,
    length TEXT, -- Length can be a text field
    actual DECIMAL(5, 2) NOT NULL -- Calculated result as a percentage (0 to 100)
);

CREATE TABLE defect (
    id SERIAL PRIMARY KEY,
    history_id INT REFERENCES history(id) ON DELETE CASCADE, -- Foreign key to history table
    name VARCHAR(255) NOT NULL,
    actual DECIMAL(5, 2) NOT NULL -- Calculated result as a percentage (0 to 100)
);

-- Insert into the standard table
INSERT INTO standard (id, name, createdDate) 
VALUES 
(1, 'มาตรฐานข้าวชั้น 1', '2022-02-23T15:47:19+07:00'),
(2, 'มาตรฐานข้าวชั้น 2', '2023-02-25T17:40:11+07:00');

INSERT INTO sub_standard (key, standard_id, name, maxLength, minLength, conditionMax, conditionMin, shape) VALUES
('wholegrain', 1, 'ข้าวเต็มเมล็ด', 99, 7, 'LT', 'GT', ARRAY['wholegrain', 'broken']),
('broken_rice1', 1, 'ข้าวหักใหญ่', 7, 3.5, 'LT', 'GT', ARRAY['wholegrain', 'broken']),
('broken_rice2', 1, 'ข้าวหักทั่วไป', 3.5, 0, 'LT', 'GT', ARRAY['wholegrain', 'broken']),
('wholegrain', 2, 'ข้าวเต็มเมล็ด', 99, 6, 'LT', 'GT', ARRAY['wholegrain', 'broken']),
('broken_rice1', 2, 'ข้าวหักใหญ่', 6, 4.5, 'LT', 'GT', ARRAY['wholegrain', 'broken']),
('broken_rice2', 2, 'ข้าวหักทั่วไป', 4.5, 0, 'LT', 'GT', ARRAY['wholegrain', 'broken']);