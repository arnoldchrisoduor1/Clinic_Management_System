const userService = require("../../src/services/userService");


(async () => {
    try {
        results = await userService.getUsers();
        console.log("got the users:", results);
    } catch(error) {
        console.error("Could not get all users:", error);
        throw error;
    }
})();