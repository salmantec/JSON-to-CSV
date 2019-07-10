const express = require("express");
const fs = require("fs");

const app = express();

app.get("/", function(req, res) {
    let myObj = {
        "rows": [
          [
            "New , Visitor",
            "(not set)",
            "(not set)",
            "0"
          ],
          [
            "New Visitor",
            "(not set)",
            "(not set)",
            "mobile"
          ],
          [
            "New Visitor",
            "(not set)",
            "(not set)",
            "mobile"
          ],
          [
            "New Visitor",
            "(not set)",
            "(not set)",
            "mobile",
          ]
        ]
    }

    let stringToReplaceComas = '!!!!';

    myObj.rows.map((singleRow) => {
    singleRow.map((value, index) => {
        singleRow[index] = value.replace(/,/g, stringToReplaceComas);
    })
    })

    let csv = `"${myObj.rows.join('"\n"').replace(/,/g, '","')}"`;
    // // or like this
    // let csv = `"${myObj.rows.join('"\n"').split(',').join('","')}"`;

    csv = csv.replace(new RegExp(`${stringToReplaceComas}`, 'g'), ',');

    // // 2. Another way - if you don't need the double quotes in the generated csv and you don't have comas in rows' values
    // let csv = myObj.rows.join('\n')

    fs.writeFile('name.csv', csv, 'utf8', function(err) {
    if (err) {
        console.log('Some error occured - file either not saved or corrupted file saved.');
    } else {
        console.log('It\'s saved!');
    }
    });
    res.send("hello world");
});

app.listen(3000, function() {});