-- SQL script to add a portfolio item with the S3 image
-- Replace the values below with your actual portfolio item details

INSERT INTO portfolio (
    id,
    title,
    description,
    image,
    client,
    location,
    category,
    created_at,
    updated_at
) VALUES (
    UUID(), -- Auto-generates a unique ID
    'Portfolio Project', -- Replace with your project title
    'Project description here', -- Replace with your project description
    'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/Picture2.png', -- The S3 image URL
    NULL, -- Optional: Client name
    NULL, -- Optional: Location
    'residential', -- Optional: Category (residential, commercial, hospitality, etc.)
    NOW(),
    NOW()
);

-- To add multiple images, you can run multiple INSERT statements:
-- Example for adding another image:
/*
INSERT INTO portfolio (
    id, title, description, image, category, created_at, updated_at
) VALUES (
    UUID(),
    'Another Project',
    'Description here',
    'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/YourImageName.png',
    'commercial',
    NOW(),
    NOW()
);
*/

-- Verify the image was added:
SELECT id, title, image, category, created_at 
FROM portfolio 
WHERE image LIKE '%Picture2.png%'
ORDER BY created_at DESC;











