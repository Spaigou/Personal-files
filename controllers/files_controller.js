var File = require("../models/personalFile.js"),
    FilesController = {};

FilesController.index = function (req, res) {
    File.find(function (err, files) {
        if (err !== null) {
            res.status(500).json(err);
        } else {
            res.status(200).json(files);
        }
    });
};

FilesController.search = function (req, res) {
    var username = req.params.username;
    File.findOne({ "username": username }, function (err, user) {
        if (err !== null) {
            res.status(500).json(err);
        } else {
            res.status(200).json(user);
        }
    });
};

FilesController.create = function (req, res) {
    var username = req.body.username,
        minorInfo = req.body.personalFile.minorInfo,
        studyInfo = req.body.personalFile.studyInfo;
    console.log(minorInfo);
    File.find({ "username": username }, function (err, result) {
        if (err) {
            res.status(500).send(err);
        } else if (result.length !== 0) {
            res.status(500).send("Личное дело уже существует!");
        } else {
            var newFile = new File({
                "username": username,
                "minorInfo": minorInfo,
                "studyInfo": studyInfo
            });
            newFile.save(function (err, result) {
                if (err !== null) {
                    res.stats(500).json(err);
                } else {
                    res.status(200).json(result);
                }
            });
        }
    });
};

FilesController.update = function (req, res) {
    var username = { "username": req.params.username },
        newFile = { $set: { "minorInfo": req.body.minorInfo.minorInfo } };
    File.updateOne(username, newFile, function (err, user) {
        if (err !== null) {
            res.status(500).json(err);
        } else {
            if (user.modifiedCount === 1 || user.acknowledged) {
                res.status(200).json(user);
            } else {
                res.status(404).json({ "status": 404 });
            }
        }
    });
};

FilesController.destroy = function (req, res) {
    var username = req.params.username;
    File.deleteOne({ "username": username }, function (err, user) {
        if (err !== null) {
            res.status(500).json(err);
        } else {
            res.status(200).json(user);
        }
    });
};

module.exports = FilesController;