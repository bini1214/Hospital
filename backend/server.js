import express from 'express';
import mysql from 'mysql';
import cors from 'cors';
import Jwt  from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import bcrypt from 'bcrypt';


const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

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

//Create API to select admin 
app.post('/login', (req, res) => {
  let values=[req.body.email, req.body.password];
  console.log(values);
  const sql = "SELECT * FROM users WHERE email = ? AND password = ?";
  
  con.query(sql, values, (err, result) => {
    if (err) {
      return res.json({ Status: "Error", Error: "Error in running query" });
    }
    if (result.length > 0) {
      const id = result[0].id;
      const token = Jwt.sign({ id }, "jwt-secret-key", { expiresIn: '1d' });

      res.cookie('token', token);

      return res.json({ Status: "Success" });
    } else {
      return res.json({ Status: "Error", Error: "Wrong Email or Password" });
    }
  });
});


const verifyUser=(req,res,next)=>{
  //attention
  const token=req.cookies.token;
  //attention
  if(!token){
    return res.json({Error:"You are not Authenticated"});
  }
  else
  {
Jwt.verify(token,"jwt-secret-key",(err,decoded)=>{
  if(err) return res.json({Error:"Token wrong"});
  next();
})
  }
}

app.get('/dashboard',verifyUser,(req,res)=>{

  return res.json({Status:"Success"})


})



//inserting doctor to table by admin
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

app.get('/getDoctor',(req,res)=>{
  const sql="SELECT*FROM doctor";
  con.query(sql,(err,result)=>{
    if(err) return res.json({Error:"get doctor error in sql"});
    return res.json({Status:"Success",Result:result});
  
  })
  
  })






app.get('/get/:id', (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM doctor WHERE doctID=?";
  con.query(sql, [id], (err, result) => {
    if (err) {
      return res.json({ Error: "get doctor error in sql" });
    }
    return res.json({ Status: "Success", Result: result });
  });
});
app.put('/update/:id', (req, res) => {


  try {
    
    const decimalSalary = parseFloat(req.body.salary);
 
  
    let values=[decimalSalary,req.params.id];
    console.log(values);
    const sql = "UPDATE doctor SET salary=? WHERE doctID=?";
    con.query(sql, values, (err, result) => {
      if (err) {
        return res.json({ Error: "update doctor error in sql" });
      }
      return res.json({ Status: "Success" });
    });
  } catch (error) {
    console.log(error)
    
  }
});


//Api for deletion

app.delete('/delete/:id',(req,res)=>{
 

  try {
    
    
 
  
    let values=[req.params.id];
    console.log(values);
    const sql = "DELETE FROM doctor WHERE doctID=?";
    con.query(sql, values, (err, result) => {
      if (err) {
        return res.json({ Error: "delete doctor error in sql" });
      }
      return res.json({ Status: "Success" });
    });
  } catch (error) {
    console.log(error)
    
  }


})











app.listen(8081, () => {
  console.log("Server is running on port 8081");
});
