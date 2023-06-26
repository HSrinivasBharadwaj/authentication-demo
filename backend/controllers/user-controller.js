import bcrypt from 'bcryptjs';
// import bcrypt from 'bcryptjs';
// const User = require('../model/User');
// const jwt = require('jsonwebtoken');
import jwt from 'jsonwebtoken'
// import { connection } from '../server';
// const { connection } = require('../server.js')
// const {getConnection} = require('../server')
// import { connection }  from '../server.js';
import { connection } from '../server.js';
// import connection from '../server.js'

const JWT_SECRET_KEY = "secretKey"

// const signUp = async (req,res,next) => {
    // try {
        //Key value pairs
        //const name = req.body.name
        //Shorthand notation for the above code
        // const {name,email,password} = req.body
        // console.log(name, email, password);

        // const [rows, fields] = await connection.execute('SELECT * FROM users WHERE email = ?', [email]);

        // if (rows.length > 0) {
        //     return res.status(400).json({ message: "User already exists" });
        //   }
      
        //   const hashedPassword = bcrypt.hashSync(password);
        //   const values = [name, email, hashedPassword];
        //   await connection.execute('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', values);
      
        //   return res.status(201).json({ message: "User Created Successfully" });
        // } catch (error) {
        //   console.log(error);
        //   return res.status(500).json({ message: 'Something went wrong' });
        // }
        
        // connection.query(`select * from users where email = ?`,[email],(err,data) => {
        //     if (err) {
        //         return res.status(500).json({message: err.message})
        //     }
        //     try {
        //         if (data.length > 0) {
        //             return res.status(400).json({message: "User already exists"})
        //         }
        //         //Before creating a new user and storing the new user in the database
        //         //Hash the Password
        //         const hashedPassword = bcrypt.hashSync(password)
        //         const values = [name,email,hashedPassword]
        //         //Insert the new user into the database
        //         connection.query(`insert into users (name,email,password) values ?`, [values],(err,data) => {
        //             if (err) {
        //                 return res.status(500).json({message: err.message})
        //             }
        //             return res.status(201).json({message: "User Created Successfully"})
        //         })
        //     } catch (error) {
        //         res.status(500).json({ message: 'Something went wrong' });
        //     }
        // })
    // }
    // catch (error) { 
    //     console.log(error)
    // }
        //Before creating the user we need to check if the user is already in the db
        // const existingUser = await User.findOne({email: email}) 
        // if (existingUser) {
        //     //Send back the response
        //     return res.status(409).json({message: "User Already Exists, Login Instead"})
        // }
        
        //Create a new user
        // const newUser = new User({name,email,password: hashedPassword});
        // await newUser.save()
        //Send back the response
        // res.status(201).json({message: 'User Created successfully'})
    // } catch (error) {
    //     console.log(error);
    //     res.status(500).json({ message: 'Something went wrong' });
    // }


    const SignUp = async (req, res, next) => {
      const { name, email, password, role } = req.body;
    
     const response = await connection.query('SELECT * FROM users WHERE email=?', [email]) 
      if(response[0].length > 0) {
        return res.status(400).json({ message: 'User already exists' });
      }
      const hashedPassword = bcrypt.hashSync(password);
      const responseOne = await connection.query('INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
                [name, email, hashedPassword, role])
          console.log("responseone", responseOne)
    }
    //  (err, data) => {
    //     if (err) {
    //       return res.status(500).json({ message: err.message });
    //     }
    
    //     try {
    //       if (data.length > 0) {
    //         return res.status(400).json({ message: 'User already exists' });
    //       }
    
    //       const hashedPassword = bcrypt.hashSync(password);
    
    //       connection.query(
    //         'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
    //         [name, email, hashedPassword, role],
    //         (err, data) => {
    //           if (err) {
    //             return res.status(500).json({ message: err.message });
    //           }
    
    //           return res
    //             .status(201)
    //             .json({ message: 'User Created Successfully', data: data });
    //         }
    //       );
    //     } 
    //     catch (error) {
    //       res.status(500).json({ message: 'Something went wrong' });
    //     }
    //   });
    // };
    

//Login Functionality
const LogIn = async (req,res,next) => {
  try {
    const {email,password} = req.body;
    const response = await connection.query('SELECT * FROM users WHERE email = ?', [email]);
    if(response.data.length === 0) {
      return res.status(404).json({message: "User Not found"})
    }
    const user = response.data[0];
          //Checking the password match with the database password
        const hashedPassword = bcrypt.compareSync(password, user.password);
        if(!hashedPassword) { 
          return res.status(401).json({message: "Password mismatch"})
        }
        //Password is correct then generate the token
        const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET_KEY, {
            expiresIn: '3hr'
        });
        return res.status(200).json({message: "Login successful", token: token,role: user.role});
  //   connection.query('SELECT * FROM users WHERE email = ?', [email], (err,data) => {
  //     if (err) { 
  //       return res.status(500).json({ message: err.message });
  //     }
  //     try {
  //       if (data.length === 0) {
  //         return res.status(404).json({message: "User Not found"})
  //       }
  //       const user = data[0];
  //       //Checking the password match with the database password
  //       const hashedPassword = bcrypt.compareSync(password, user.password);
  //       if(!hashedPassword) { 
  //         return res.status(401).json({message: "Password mismatch"})
  //       }
  //       //Password is correct then generate the token
  //       const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET_KEY, {
  //           expiresIn: '3hr'
  //       });
  //       return res.status(200).json({message: "Login successful", token: token,role: user.role});
  //     } catch (error) {
  //       return res.status(500).json({ message: 'Something went wrong' });
  //     }
  //   })
  } catch (error) {
    console.log(error);
  }
}

//Verify the token
const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Invalid token' });
  }

  const token = authHeader.split(' ')[1];

  // Verify the token and handle expiration
  jwt.verify(token, JWT_SECRET_KEY, (err, decoded) => {
    if (err) {
      if (err.name === 'TokenExpiredError') {
        return res.status(401).json({ message: 'Token expired' });
      }
      return res.status(401).json({ message: 'Invalid token' });
    }

    console.log("decoded",decoded)
    req.user = decoded;
    next();
  });
};



// Middleware function to check if the user has the required role
const checkRole = (role) => (req, res, next) => {
  console.log("role",role)
  const userRole = req.user.role;
  console.log("userRole",userRole);
  if (userRole !== role) {
    return res.status(403).json({ message: 'Access denied' });
  }
  next();
};


// const logIn = async (req, res, next) => {
//   try {
//     // Get the email and password from req.body
//     const { email, password } = req.body;
//     connection.query('SELECT * FROM users WHERE email = ?', [email], (err, data) => {
//       if (err) {
//         return res.status(500).json({ message: err.message });
//       }
//       try {
//         if (data.length === 0) {
//           return res.status(400).json({ message: "Invalid credentials" });
//         }

//         const existingUser = data[0];
//         console.log("existing user", existingUser);

//         // Check if password is correct
//         const passwordMatch = bcrypt.compareSync(password, existingUser.password);
//         if (!passwordMatch) {
//           return res.status(401).json({ message: "Invalid Credentials" });
//         }

//         // After password match, generate the token
//         // Contains the id of the user in the token
//         const token = jwt.sign({ id: existingUser.id, role: existingUser.role }, JWT_SECRET_KEY, {
//           expiresIn: '35s'
//         });

//         console.log("Generated Token", token);

//         // Set the access token as an HTTP-only cookie
//         // Three params - name - {id}, value, httpOnly, path, expires
//         res.cookie(String(existingUser.id), token,  {
//           path: "/",
//           expires: new Date(Date.now() + 1000 * 30), // for 30 seconds
//           httpOnly: true, // If we don't include it, it will be exposed in the frontend
//           sameSite: "lax"
//         });

//         // Sending the token, user to client
//         return res.status(200).json({ message: "Successfully logged in", user: existingUser, token });
//       } catch (error) {
//         console.log(error);
//         res.status(500).json({ message: 'Something went wrong' });
//       }
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: 'Something went wrong' });
//   }
// };


//Verify the token to provide the authorization
// const verifyToken = async (req, res, next) => {
//   // Retrieve the token from the cookies
//   const token = req.headers.cookie?.split('=')[1];
//   // const token = req.cookies;
//   console.log("token",token)
//   // Now we need to verify the token
//   if (!token) {
//     return res.status(401).json({ message: 'Unauthorized' });
//   }

//   // Verify the token to access the user
//   jwt.verify(token, JWT_SECRET_KEY, (err, user) => {
//     if (err) {
//       return res.status(401).json({ message: 'Invalid token' });
//     }

//     // Storing the user.id in the req.id
//     req.id = user.id;
//     next();
//   });
// };



// const restrictTo = (allowedRoles) => {
//   return (req, res, next) => {
//     const { role } = req.id;

//     if (!allowedRoles.includes(role)) {
//       return res.status(403).json({ error: 'Forbidden' });
//     }

//     next();
//   };
// }

// const getDashboardInformation = async (req, res, next) => {
//   try {
//     return res.status(200).json({ message: "Dashboard Data" });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: 'Something went wrong' });
//   }
// };


//Extract the user information from the id we got
// const getUserInformation = async (req,res,next) => {
//     //We need to pass the id to this middleware
//     const userId = req.id;
//     console.log("userId",userId);
//     let user;
//     try {
//         //Based on the Id we are extracting the user Information
//         //We dont want password information for that "-password"
//        user = await User.findById(userId,"-password")
//     } catch (error) {
//         return new Error(err)
//     }
//     if (!user) {
//         return res.status(404).json({message: "User Not found"})
//     }
//     console.log("usersss",user)
//     return res.status(200).json({user})
// }

// const getUserInformation = async (req,res,next) => {
//   const userId = req.id;
//   console.log("User Id",userId);
//   connection.query('SELECT * FROM users WHERE id = ?', [userId], (err,results) => {
//     if (err) {
//       console.error('Error executing MySQL query:', err);
//       return res.status(500).json({message: "Something went wrong"})
//     }
//     if (results.length === 0) {
//       return res.status(404).json({ message: "User Not found" });
//     }
//     const user = results[0];
//      // Remove the password field from the user object
//      delete user.password;

//      console.log("user", user);

//      return res.status(200).json({ user });
//   })
// }


// Refresh Token
// const refreshToken = async (req,res,next) => {
//     //Retrieve the cookies
//     const cookies = req.headers.cookie;
//     //Extract the token from the cookies
//     const prevToken = cookies.split("=")[1];
//     //Now we need to verify the token
//     if(!prevToken) {
//         res.status(401).json({message: "could not find token"})
//     }

// //     //verify the token
//     jwt.verify(String(prevToken),JWT_SECRET_KEY, (err,user) => {
//         if(err) {
//             return res.status(403).json({message: "Authentication failed"})
//         }
//         //Clear Cookie
//         //To ensure that user is not using the previous token
//         res.clearCookie(`${user.id}`)
//         req.cookies[`${user.id}`] = ""

//         //Generate a new token
//         const token = jwt.sign({id: user.id},JWT_SECRET_KEY,{
//             expiresIn: '35s'
//         })

//         console.log("Regenerated token",token)
//         //// Set the access token as an HTTP-only cookie
//         //Three params - name - {id}, value, httpOnly,path,expires
//         res.cookie(String(user.id), token, { 
//             path: "/",
//             expires: new Date(Date.now() + 1000 * 30), //for 30 seconds,
//             httpOnly: true, //If we dont include it will be exposed in the frontend
//             sameSite: "lax"
//          });

//          //
//          req.id = user.id;
//          next();
//     })
// }


//Logout function
// const LogoutFromApp = async(req,res,next) => {
//      //Retrieve the cookies
//      const cookies = req.headers.cookie;
//      //Extract the token from the cookies
//      const prevToken = cookies.split("=")[1];
//      //Now we need to verify the token
//      if(!prevToken) {
//          res.status(401).json({message: "could not find token"})
//      }
//          //verify the token
//     jwt.verify(String(prevToken),JWT_SECRET_KEY, (err,user) => {
//         if(err) {
//             return res.status(403).json({message: "Authentication failed"})
//         }
//         //Clear Cookie
//         //To ensure that user is not using the previous token
//         res.clearCookie(`${user.id}`)
//         req.cookies[`${user.id}`] = ""
//         return res.status(200).json({message: "SuccessfullyLoggedout"})
//     })
// }


//Export the user
// module.exports = { signUp, logIn, verifyToken, getUserInformation, refreshToken, LogoutFromApp };
// export {signUp, logIn, verifyToken, getUserInformation, refreshToken, LogoutFromApp, restrictTo, getDashboardInformation}
export {SignUp,LogIn, verifyToken, checkRole}