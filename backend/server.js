import express from 'express';
import mysql from 'mysql';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import bcrypt from 'bcrypt';


const app = express();
app.use(cors());
app.use(cookieParser());
app.use(express.json());

// Create a connection with the database
const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root123",
  database: "HOSMaS"
});

con.connect(function(err) {
  if (err) {
    console.log("Error in the connection:", err);
  } else {
    console.log("Connected");
  }
});

app.get("/", (req, res) => {
  res.json({"name": "Genet"});
});

// Create API to select admin 

app.post('/create', async (req, res) => {
  const sql = "INSERT INTO doctor (`doctID`, `fname`, `lname`, `address`, `dept_name`, `salary`, `email`, `password`) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
 
  const saltRounds = 10; // Define the number of salt rounds

  try {
    

    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    
    const values = [
      req.body.doctID,
      req.body.fname,
      req.body.lname,
      req.body.address,
      req.body.dept_name,
      req.body.salary,
      req.body.email,
      
      
      hashedPassword
    ];
   
   

    con.query(sql, values, (err, result) => {
      if (err) {
        console.error(err);
        return res.json({ Error: "Error in signup query" });
      }
      return res.json({ Status: "Success" });
    });
  } catch (err) {
    console.error(err);
    return res.json({ Error: "Error in hashing password" });
  }
});

app.listen(8081, () => {
  console.log("Server is running on port 8081");
});
