//Database sql command
    CREATE TABLE standard (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        createdDate TIMESTAMP NOT NULL
    );

    CREATE TABLE sub_standard (
        key NOT NULL,
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

