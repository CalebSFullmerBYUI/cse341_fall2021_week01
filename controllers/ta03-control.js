const fs = require('fs');
const path = require('path');

let items = JSON.parse(fs.readFileSync(path.join(__dirname, '../items.json')));
let stuffToFind = [];

exports.getAllProducts = (req, res, next) => {
    console.log(path.join(__dirname, '../items.json'));

    res.render('pages/ta03', {
        title: 'Team Activity 03',
        path: '/ta03', // For pug, EJS
        activeTA03: true, // For HBS
        contentCSS: true, // For HBS
        data: stuffToFind
      });
}

exports.searchItems = (req, res, next) => {
    let searchTerm = req.body.searchInput.toLowerCase();
    stuffToFind = [];

    for (item of items) {
        if (item.name.toLowerCase().search(searchTerm) != -1) {
            stuffToFind.push(item);
        } else {
            for (tag in item.tags) {
                if (tag.toLowerCase() == searchTerm) {
                    stuffToFind.push(item);
                    break;
                }
            }
        }
    }

    res.statusCode = 302;
  res.setHeader('Location', '/ta03');
  return res.end();
}