const path = require("path");
const fs = require("fs");

const posts = require("./DB/db.json");

const generateSlug = (title, existingSlugs) => {
    let slug = title.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]+/g, '');
    let counter = 1;
    while (existingSlugs.includes(slug)) {
        slug = `${slug}-${counter}`;
        counter++;
    }
    return slug;
};

const updatePosts = (newPosts) => {
    const filePath = path.join(__dirname, './DB/db.json');
    const fileContent = JSON.stringify(newPosts, null, 2);
    fs.writeFileSync(filePath, fileContent);
    posts = newPosts;
};

const usersFilePath = path.join(__dirname, './DB/users.json');

const readUsersFromFile = () => {
    const data = fs.readFileSync(usersFilePath, 'utf8');
    return JSON.parse(data);
};

module.exports = {
    generateSlug,
    updatePosts,
    posts,
    readUsersFromFile
};
