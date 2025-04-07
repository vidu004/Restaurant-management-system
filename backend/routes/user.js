const express = require("express");
const connection = require("../connection");
const router = express.Router();
const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
require("dotenv").config();
var auth = require("../services/authentication");
var checkRole = require("../services/checkRole");

router.post("/signup", async (req, res) => {
  let user = req.body;
  query = "SELECT email FROM user WHERE email=?";

  connection.query(query, [user.email], async (err, results) => {
    if (!err) {
      if (results.length <= 0) {
        try {
          // Hash password before saving
          const saltRounds = 10;
          const hashedPassword = await bcrypt.hash(user.password, saltRounds);

          // Insert user with hashed password
          query =
            "INSERT INTO user(name, contactNumber, email, password, status, role) VALUES(?,?,?,?,'false','user')";
          connection.query(
            query,
            [user.name, user.contactNumber, user.email, hashedPassword],
            (err, results) => {
              if (!err) {
                return res
                  .status(200)
                  .json({ message: "Successfully Registered" });
              } else {
                return res.status(500).json(err);
              }
            }
          );
        } catch (error) {
          return res
            .status(500)
            .json({ message: "Error hashing password", error });
        }
      } else {
        return res.status(400).json({ message: "Email Already Exists." });
      }
    } else {
      return res.status(500).json(err);
    }
  });
});

router.post("/login", (req, res) => {
  const user = req.body;
  const query = "SELECT email, password, role, status FROM user WHERE email=?";
  
  connection.query(query, [user.email], (err, results) => {
    if (!err) {
      if (results.length <= 0) {
        return res.status(401).json({ message: "Incorrect Username or Password" });
      }

      const hashedPassword = results[0].password;

      // Use bcrypt to compare the plain-text password with the hashed password
      bcrypt.compare(user.password, hashedPassword, (err, isMatch) => {
        if (err) {
          return res.status(500).json({ message: "Error comparing passwords" });
        }

        if (!isMatch) {
          return res.status(401).json({ message: "Incorrect Username or Password" });
        }

        if (results[0].status === "false") {
          return res.status(401).json({ message: "Wait for Admin Approval" });
        }

        // Generate JWT token
        const response = { email: results[0].email, role: results[0].role };
        const accessToken = jwt.sign(response, process.env.ACCESS_TOKEN, {
          expiresIn: "24h",
        });
        console.log("Generated Token:", accessToken);  
        return res.status(200).json({ token: accessToken });
      });
    } else {
      return res.status(500).json(err);
    }
  });
});

var transpoter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

const secret_key = process.env.ACCESS_TOKEN; // Use an environment variable

router.post("/forgotPassword", (req, res) => {
  const { email } = req.body;

  // Check if user exists
  const query = "SELECT id FROM user WHERE email = ?";
  connection.query(query, [email], (err, results) => {
    if (err) return res.status(500).json(err);

    if (results.length === 0) {
      return res
        .status(200)
        .json({ message: "If the email exists, a reset link will be sent." });
    }

    // Generate reset token (valid for 1 hour)
    const token = jwt.sign({ id: results[0].id }, secret_key, {
      expiresIn: "1h",
    });

    // Store token in database
    const updateQuery = "UPDATE user SET reset_token = ? WHERE email = ?";
    connection.query(updateQuery, [token, email]);

    // Send email with reset link
    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "Password Reset Request",
      html: `<p>Click <a href="http://localhost:4200/reset-password/${token}" style="color: #1a73e8; text-decoration: underline;">here</a> to reset your password.</p>
`,
    };

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) return res.status(500).json(error);
      return res
        .status(200)
        .json({ message: "If the email exists, a reset link has been sent." });
    });
  });
});


router.post("/resetPassword", (req, res) => {
  const { resetToken, newPassword, confirmPassword } = req.body;

  // Check if passwords match
  if (newPassword !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match." });
  }

  // Verify the reset token
  jwt.verify(resetToken, process.env.ACCESS_TOKEN, (err, decoded) => {
    if (err) {
      return res.status(400).json({ message: "Invalid or expired token." });
    }

    // Extract the user's email from the decoded token
    const email = decoded.email;

    // Hash the new password
    bcrypt.hash(newPassword, 10, (err, hashedPassword) => {
      if (err) {
        return res.status(500).json({ message: "Error hashing the new password." });
      }

      // Update the password in the database
      const query = "UPDATE user SET password=? WHERE email=?";
      connection.query(query, [hashedPassword, email], (err, results) => {
        if (err) {
          return res.status(500).json({ message: "Error updating password." });
        }

        return res.status(200).json({ message: "Password updated successfully." });
      });
    });
  });
});







router.get("/get", auth.authenticateToken, checkRole.checkRole, (req, res) => {
  var query =
    "select id,name,email,contactNumber,status from user where role = 'user'";
  connection.query(query, (err, results) => {
    if (!err) {
      return res.status(200).json(results);
    } else {
      return res.status(500).json(err);
    }
  });
});

router.patch(
  "/update",
  auth.authenticateToken,
  checkRole.checkRole,
  (req, res) => {
    let user = req.body;
    var query = "update user set status=? where id=?";
    connection.query(query, [user.status, user.id], (err, results) => {
      if (!err) {
        if (results.affectedRows == 0) {
          return res.status(404).json({ message: "User id does not exist" });
        }

        return res.status(200).json({ message: "User Updated successfully" });
      } else {
        return res.status(500).json(err);
      }
    });
  }
);

router.get("/checkToken", auth.authenticateToken, (req, res) => {
  return res.status(200).json({ message: "true" });
});

router.post("/changePassword", auth.authenticateToken, (req, res) => {
  const user = req.body;
  const email = res.locals.email;
  var query = "select * from user where email=? and password=?";
  connection.query(query, [email, user.oldPassword], (err, results) => {
    if (!err) {
      if (results.length <= 0) {
        return res.status(400).json({ message: "Incorrect Current Password" });
      } else if (results[0].password == user.oldPassword) {
        query = "update user set password=? where email=?";
        connection.query(query, [user.newPassword, email], (err, results) => {
          if (!err) {
            return res
              .status(200)
              .json({ message: "Password updated successfully" });
          } else {
            return res.status(500).json(err);
          }
        });
      } else {
        return res
          .status(400)
          .json({ message: "Something went wrong. Please try again later" });
      }
    } else {
      return res.status(500).json(err);
    }
  });
});

module.exports = router;
