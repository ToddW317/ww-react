const bcrypt = require('bcryptjs');

const passwordFromUser = "Football2215!";
const hashedPasswordFromDb = "$2a$10$B2qvr9adicagyCI2.uNC7el653eE602ooKumFrKzod.C2G1sGTVG2";

bcrypt.compare(passwordFromUser, hashedPasswordFromDb, function(err, result) {
    if (err) {
        console.error("Error during comparison:", err);
        return;
    }
    console.log("Direct comparison result within application:", result); // Should log 'true'
});