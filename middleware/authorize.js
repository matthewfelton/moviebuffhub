// Checks for access for modifing data
const checkLogStatus = (req, res, next) => {
    if (!req.oidc.isAuthenticated()) {
        return res.status(401).send({
            error: "Not authorized to change data without login.",
            login: "https://cse341-course-mgmt.onrender.com/login",
        });
    }
    next();
};

// Check for access for viewing and modifing data
const checkLogAll = (req, res, next) => {
    if (!req.oidc.isAuthenticated()) {
        return res.status(401).send({
            error: "Not authorized to view or change data without login.",
            login: "https://cse341-course-mgmt.onrender.com/login",
        });
    }
    next();
};



module.exports = { 
    checkLogStatus,
    checkLogAll 
};