const User = require("../Model/userModel");

exports.registerUser = async (req, res, next) => {
  if (!req.body.email || !req.body.password || !req.body.name) {
    return res.status(400).json({ message: "Enter valid credentials" });
  }
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User with this email already exists" });
    }

    const user = await User.create({
      name,
      email,
      password,
    });

    return res
        .status(201)
        .json({ message: "User created successfully" ,user});

  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({ message: "Error registering user" });
  }
};

exports.loginUser = async (req, res, next) => {
  if (!req.body.email || !req.body.password) {
    return res.status(401).json({ message: "Enter valid email & password" });
  }

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Invalid Email or password" });
    }

    if (user.password !== password) {
      return res.status(401).json({ message: "Invalid  password" });
    }

    return res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({ message: "Error during login" });
  }
};

// exports.loginUser = async (req, res, next) => {

//   const { email, password } = req.body;
//   const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(404).json({ message: "Invalid Email or password" });
//     }

//     if (user.password !== password) {
//       return res.status(404).json({ message: "Invalid Email or password" });
//     }

//     return res.status(200).json({ message: "Login successful", user });
// }

exports.addPatient = async (req, res, next) => {
  // const useremail = req.body.useremail;

  const { useremail, name, patientemail } = req.body;

  try {
    const user = await User.findOne({ email: useremail });

    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    const existingPatient = user.patients.find((p) => p.patemail === patientemail);

    if (existingPatient) {
      return res.status(400).json({ success: false, error: "Patient already exists" });
    } else {
      const newPatient = { name, patemail: patientemail, prediction: "Not Yet Predicted" };
      user.patients.push(newPatient);
      await user.save();
      return res.status(200).json({ success: true, user });
    }
  } catch (error) {
    console.error("Error adding patient:", error);
    return res.status(500).json({ success: false, error: "Server error" });
  }
};

exports.patientList = async (req, res, next) => {
  const { useremail } = req.body;

  try {
    const user = await User.findOne({ email: useremail });
    if (user) {
      const patients = user.patients;
      return res.status(200).json({ success: true, patients });
    } else {
      return res.status(404).json({ success: false, error: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: "server error" });
  }
};

// exports.addPrediction = async (req, res, next) => {
//   const { useremail, patientemail, prediction } = req.body;

//   try {
//     const user = await User.findOne({ email: useremail });
//     if (user) {
//       const patient = user.patients.find(
//         (patient) => patient.patemail === patientemail
//       );
//       if (patient) {
//         patient.prediction = prediction;
//         await user.save();
//         return res
//           .status(200)
//           .json({ success: true, message: "Prediction added successfully" });
//       } else {
//         return res
//           .status(404)
//           .json({ success: false, error: "Patient not found" });
//       }
//     } else {
//       return res.status(404).json({ success: false, error: "User not found" });
//     }
//   } catch (error) {
//     res.status(500).json({ success: false, error: "server error" });
//   }
// };


exports.addPrediction = async (req, res, next) => {
  const { useremail, patientemail, prediction } = req.body;

  try {
    const user = await User.findOne({ email: useremail });

    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    const patient = user.patients.find((patient) => patient.patemail === patientemail);

    if (!patient) {
      return res.status(404).json({ success: false, error: "Patient not found" });
    }

    patient.prediction = prediction;
    await user.save();

    return res
      .status(200)
      .json({ success: true, message: "Prediction added successfully" });
  } catch (error) {
    console.error("Error adding prediction:", error);
    return res.status(500).json({ success: false, error: "Server error" });
  }
};
