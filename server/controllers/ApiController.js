const axios = require("axios");
const { User } = require("../models");
const { decrypter } = require("../helpers/bcrypt");
const { tokenGenerator } = require("../helpers/jwt");
class ApiController {
  static async register(req, res) {
    try {
      const { username, password } = req.body;
      let findUser = await User.findOne({
        where: { username },
      });

      if (findUser) {
        res.status(403).json({
          message: "Username already exist!",
        });
      } else {
        let user = await User.create({
          username,
          password,
        });
        res.status(201).json(user);
      }
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static async login(req, res) {
    try {
      const { username, password } = req.body;
      let user = await User.findOne({
        where: { username },
      });

      if (user) {
        if (decrypter(password, user.password)) {
          let access_token = tokenGenerator(user);
          res.status(200).json({
            status: 200,
            message: "You are successfully logged in",
            user,
            access_token,
          });
        } else {
          res.status(403).json({
            message: "Password is Invalid!",
          });
        }
      } else {
        res.status(404).json({
          message: "User not found!",
        });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static async getJobs(req, res) {
    try {
      const page = req.params.page || 1;
      const jobs = await axios.get(
        "http://dev3.dansmultipro.co.id/api/recruitment/positions.json?page=" +
          page
      );
      const jobsData = jobs.data;

      res.status(200).json(jobsData);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static async getDetailsJob(req, res) {
    try {
      const id = req.params.id;

      const jobsDetailData = await axios.get(
        `http://dev3.dansmultipro.co.id/api/recruitment/positions/${id}`
      );

      const detailsJob = jobsDetailData.data;
      res.status(200).json(detailsJob);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static async searchJobs(req, res) {
    try {
      const desc = req.query.description || "";
      const loc = req.query.location || "";
      const type = req.query.full_time || "";

      let URL =
        "http://dev3.dansmultipro.co.id/api/recruitment/positions.json?";

      if (desc && loc && type) {
        URL += `description=${desc}&location=${loc}&full_time=${type}`;
      } else if (desc && loc) {
        URL += `description=${desc}&location=${loc}`;
      } else if (desc && type) {
        URL += `description=${desc}&full_time=${type}`;
      } else if (loc && type) {
        URL += `location=${loc}&full_time=${type}`;
      } else if (desc) {
        URL += `description=${desc}`;
      } else if (loc) {
        URL += `location=${loc}`;
      } else if (type) {
        URL += `full_time=${type}`;
      }

      console.log(URL);
      const dataSearch = await axios.get(URL);

      const jobSearch = dataSearch.data;

      res.status(200).json(jobSearch);
    } catch (err) {
      res.json(err);
    }
  }
}

module.exports = ApiController;
