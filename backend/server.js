import express, { response } from 'express';
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
methods:["POST","GET","PUT","DELETE"],

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
      const token = Jwt.sign({ id }, "jwt-secret-key", { expiresIn: '7d' });

      res.cookie('token', token);

      return res.json({ Status: "Success" });
    } else {
      return res.json({ Status: "Error", Error: "Wrong Email or Password" });
    }
  });
});


//API for log in of doctor

app.post('/doctorLogin', (req, res) => {
  
  const sql = "SELECT * FROM doctor WHERE email = ?";
  
  con.query(sql,[req.body.email], (err, result) => {
    if (err) {
      return res.json({ Status: "Error", Error: "Error in running query" });
    }
    if (result.length > 0) {
      bcrypt.compare(req.body.password.toString(), result[0].password, (err, response) => {
        if (err) {
          return res.json({ Error: "password error" });
        }
        if (response) {
          const id = result[0].id;
          const token = Jwt.sign({ id }, "jwt-secret-key", { expiresIn: '7d' });

          res.cookie('token', token);

          return res.json({ Status: "Success" });
        } else {
          return res.json({ Status: "Error", Error: "Wrong Email or Password" });
        }
      });
    } else {
      return res.json({ Status: "Error", Error: "Wrong Email or Password" });
    }
  });
});


//API for log in of nurse

app.post('/nurseLogin', (req, res) => {
  
  const sql = "SELECT * FROM nurse WHERE email = ?";
  
  con.query(sql,[req.body.email], (err, result) => {

    console.log(result);
    if (err) {
      return res.json({ Status: "Error", Error: "Error in running query" });
    }
    if (result.length > 0) {
      bcrypt.compare(req.body.password.toString(), result[0].PASSWORD, (err, response) => {
        if (err) {
          return res.json({ Error: "password error" });
        }
        if (response) {
          const id = result[0].id;
          const token = Jwt.sign({ id }, "jwt-secret-key", { expiresIn: '7d' });

          res.cookie('token', token);

          return res.json({ Status: "Success" });
        } else {
          return res.json({ Status: "Error", Error: "Wrong Email or Password" });
        }
      });
    } else {
      return res.json({ Status: "Error", Error: "Wrong Email or Password" });
    }
  });
});



//API for log in of triage

app.post('/triageLogin', (req, res) => {
  
  const sql = "SELECT * FROM triage WHERE email = ?";
  
  con.query(sql,[req.body.email], (err, result) => {
    if (err) {
      return res.json({ Status: "Error", Error: "Error in running query" });
    }
    if (result.length > 0) {
      bcrypt.compare(req.body.password.toString(), result[0].password, (err, response) => {
        if (err) {
          return res.json({ Error: "password error" });
        }
        if (response) {
          const id = result[0].id;
          const token = Jwt.sign({ id }, "jwt-secret-key", { expiresIn: '7d' });

          res.cookie('token', token);

          return res.json({ Status: "Success" });
        } else {
          return res.json({ Status: "Error", Error: "Wrong Email or Password" });
        }
      });
    } else {
      return res.json({ Status: "Error", Error: "Wrong Email or Password" });
    }
  });
});


//API for log in of reception

app.post('/receptionLogin', (req, res) => {
  
  const sql = "SELECT * FROM reception WHERE email = ?";
  
  con.query(sql,[req.body.email], (err, result) => {
    if (err) {
      return res.json({ Status: "Error", Error: "Error in running query" });
    }
    if (result.length > 0) {
      bcrypt.compare(req.body.password.toString(), result[0].password, (err, response) => {
        if (err) {
          return res.json({ Error: "password error" });
        }
        if (response) {
          const id = result[0].id;
          const token = Jwt.sign({ id }, "jwt-secret-key", { expiresIn: '7d' });

          res.cookie('token', token);

          return res.json({ Status: "Success" });
        } else {
          return res.json({ Status: "Error", Error: "Wrong Email or Password" });
        }
      });
    } else {
      return res.json({ Status: "Error", Error: "Wrong Email or Password" });
    }
  });
});







//API for logout
app.get('/logout',(req,res)=>{

  res.clearCookie('token');
  return res.json({Status:"Success"});
})



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




//API for logout of reception
app.get('/logouT',(req,res)=>{

  res.clearCookie('token');
  return res.json({Status:"Success"});
})

//for Authorization of reception

 const verifyTheUser=(req,res,next)=>{
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

app.get('/dashB',verifyUser,(req,res)=>{

  return res.json({Status:"Success"})


})


//for logout of doctor

//API for logout
app.get('/logouP',(req,res)=>{

  res.clearCookie('token');
  return res.json({Status:"Success"});
})



//for authorization of doctor

const verifyTUser=(req,res,next)=>{
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

app.get('/dashA',verifyUser,(req,res)=>{

  return res.json({Status:"Success"})


})


//for logout of triage

//API for logout
app.get('/logouQ',(req,res)=>{

  res.clearCookie('token');
  return res.json({Status:"Success"});
})


//for Authorization of triage

const verifyHeUser=(req,res,next)=>{
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

app.get('/dashC',verifyUser,(req,res)=>{

  return res.json({Status:"Success"})


})

//for log in of nurse

//API for logout
app.get('/logouR',(req,res)=>{

  res.clearCookie('token');
  return res.json({Status:"Success"});
})



//for Authorization of nurse


const verifyEUser=(req,res,next)=>{
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

app.get('/dashD',verifyUser,(req,res)=>{

  return res.json({Status:"Success"})


})

app.post('/createPatient', async (req, res) => {
  const sql = "INSERT INTO patient (`p_id`, `fname`, `lname`, `address`, `DOB`) VALUES (?, ?, ?, ?, ?)";

  const saltRounds = 10; // Define the number of salt rounds

  try {
    // const salt = await bcrypt.genSalt(saltRounds);
    // const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const values = [
      req.body.p_id,
      req.body.fname,
      req.body.lname,
      req.body.address,
      req.body.DOB,
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

app.get('/getPatient', (req, res) => {
  const sql = "SELECT * FROM patient";

  con.query(sql, (err, result) => {
    if (err) {
      console.error(err);
      return res.json({ Error: "Error in SQL query" });
    }
    return res.json({ Status: "Success", Result: result });
  });
});



  //API for updating patient by reception



// app.get('/get/patient/:id', (req, res) => {
//   const id = req.params.id;
//   const sql = "SELECT * FROM patient WHERE p_id=?";
//   con.query(sql, [id], (err, result) => {
//     if (err) {
//       return res.json({ Error: "get nurse error in sql" });
//     }
//     return res.json({ Status: "Success", Result: result });
//   });
// });
// app.put('/update/patient/:id', (req, res) => {


//   try {
    
//     //const decimalSalary = parseFloat(req.body.salary);
 
  
//     //let values=[decimalSalary,req.params.id];
//     console.log(values);
//     const sql = "UPDATE nurse SET DOB=? WHERE p_id=?";
//     con.query(sql, values, (err, result) => {
//       if (err) {
//         return res.json({ Error: "update patient error in sql" });
//       }
//       return res.json({ Status: "Success" });
//     });
//   } catch (error) {
//     console.log(error)
    
//   }
// });


//Api for deletion of nurse by admin

// app.delete('/delete/patient/:id',(req,res)=>{
 

//   try {
    
    
 
  
//     let values=[req.params.id];
//     console.log(values);
//     const sql = "DELETE FROM nurse WHERE p_id=?";
//     con.query(sql, values, (err, result) => {
//       if (err) {
//         return res.json({ Error: "delete patient error in sql" });
//       }
//       return res.json({ Status: "Success" });
//     });
//   } catch (error) {
//     console.log(error)
    
//   }


// })












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



//inserting department to table by admin
app.post('/createe', async (req, res) => {
  const sql = "INSERT INTO department (`dept_name`, `budget`, `building`) VALUES (?, ?, ?)";
 
  //const saltRounds = 10; // Define the number of salt rounds

  try {
    //const salt = await bcrypt.genSalt(saltRounds);
    //const hashedPassword = await bcrypt.hash(req.body.password, salt);
    
    const values = [
      req.body.dept_name,
      req.body.budget,
      req.body.building,
      
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

app.get('/getDepartment',(req,res)=>{
  const sql="SELECT*FROM department";
  con.query(sql,(err,result)=>{
    if(err) return res.json({Error:"get department error in sql"});
    return res.json({Status:"Success",Result:result});
  
  })
  
  })


  //Api for deletion department

app.delete('/delete/:id',(req,res)=>{
 

  try {
    
    
 
  
    let values=[req.params.id];
    console.log(values);
    const sql = "DELETE FROM department WHERE dept_name=?";
    con.query(sql, values, (err, result) => {
      if (err) {
        return res.json({ Error: "delete department error in sql" });
      }
      return res.json({ Status: "Success" });
    });
  } catch (error) {
    console.log(error)
    
  }


})

//api for updating department
app.get('/get/:id', (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM department WHERE dept_name=?";
  con.query(sql, [id], (err, result) => {
    if (err) {
      return res.json({ Error: "get department error in sql" });
    }
    return res.json({ Status: "Success", Result: result });
  });
});
app.put('/update/:id', (req, res) => {


  try {
    
    const decimalBudget = parseFloat(req.body.budget);
 
  
    let values=[decimalBudget,req.params.id];
    console.log(values);
    const sql = "UPDATE department SET budget=? WHERE dept_name=?";
    con.query(sql, values, (err, result) => {
      if (err) {
        return res.json({ Error: "update department error in sql" });
      }
      return res.json({ Status: "Success" });
    });
  } catch (error) {
    console.log(error)
    
  }
});



//inserting nurse to table by admin
app.post('/createNurse', async (req, res) => {
  const sql = "INSERT INTO nurse (`nr_id`, `fname`, `lname`, `address`, `dept_name`, `salary`, `email`, `password`) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
 
  const saltRounds = 10; // Define the number of salt rounds

  try {
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    
    const values = [
      req.body.nr_id,
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

app.get('/getNurse',(req,res)=>{
  const sql="SELECT*FROM nurse";
  con.query(sql,(err,result)=>{
    if(err) return res.json({Error:"get doctor error in sql"});
    return res.json({Status:"Success",Result:result});
  
  })
  
  })




//API for updating Nurse



app.get('/get/nurse/:id', (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM nurse WHERE nr_id=?";
  con.query(sql, [id], (err, result) => {
    if (err) {
      return res.json({ Error: "get nurse error in sql" });
    }
    return res.json({ Status: "Success", Result: result });
  });
});
app.put('/update/nurse/:id', (req, res) => {


  try {
    
    const decimalSalary = parseFloat(req.body.salary);
 
  
    let values=[decimalSalary,req.params.id];
    console.log(values);
    const sql = "UPDATE nurse SET salary=? WHERE nr_id=?";
    con.query(sql, values, (err, result) => {
      if (err) {
        return res.json({ Error: "update nurse error in sql" });
      }
      return res.json({ Status: "Success" });
    });
  } catch (error) {
    console.log(error)
    
  }
});


//Api for deletion of nurse by admin

app.delete('/delete/nurse/:id',(req,res)=>{
 

  try {
    
    
 
  
    let values=[req.params.id];
    console.log(values);
    const sql = "DELETE FROM nurse WHERE nr_id=?";
    con.query(sql, values, (err, result) => {
      if (err) {
        return res.json({ Error: "delete nurse error in sql" });
      }
      return res.json({ Status: "Success" });
    });
  } catch (error) {
    console.log(error)
    
  }


})



//inserting triage to table by admin
app.post('/createTriage', async (req, res) => {
  const sql = "INSERT INTO triage (`tr_id`, `fname`, `lname`, `address`,`salary`, `email`, `password`) VALUES (?, ?,?, ?, ?, ?, ?)";
 
  const saltRounds = 10; // Define the number of salt rounds

  try {
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    
    const values = [
      req.body.tr_id,
      req.body.fname,
      req.body.lname,
      req.body.address,
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

app.get('/getTriage',(req,res)=>{
  const sql="SELECT*FROM triage";
  con.query(sql,(err,result)=>{
    if(err) return res.json({Error:"get triage error in sql"});
    return res.json({Status:"Success",Result:result});
  
  })
  
  })






//API for updating triage



app.get('/get/triage/:id', (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM triage WHERE tr_id=?";
  con.query(sql, [id], (err, result) => {
    if (err) {
      return res.json({ Error: "get triage error in sql" });
    }
    return res.json({ Status: "Success", Result: result });
  });
});
app.put('/update/triage/:id', (req, res) => {


  try {
    
    const decimalSalary = parseFloat(req.body.salary);
 
  
    let values=[decimalSalary,req.params.id];
    console.log(values);
    const sql = "UPDATE triage SET salary=? WHERE tr_id=?";
    con.query(sql, values, (err, result) => {
      if (err) {
        return res.json({ Error: "update triage error in sql" });
      }
      return res.json({ Status: "Success" });
    });
  } catch (error) {
    console.log(error)
    
  }
});


//Api for deletion of triage by admin

app.delete('/delete/triage/:id',(req,res)=>{
 

  try {
    
    
 
  
    let values=[req.params.id];
    console.log(values);
    const sql = "DELETE FROM triage WHERE tr_id=?";
    con.query(sql, values, (err, result) => {
      if (err) {
        return res.json({ Error: "delete triage error in sql" });
      }
      return res.json({ Status: "Success" });
    });
  } catch (error) {
    console.log(error)
    
  }


})




//inserting reception to table by admin
app.post('/createReception', async (req, res) => {
  const sql = "INSERT INTO reception (`re_id`, `fname`, `lname`, `address`,`salary`, `email`, `password`) VALUES (?, ?,?, ?, ?, ?, ?)";
 
  const saltRounds = 10; // Define the number of salt rounds

  try {
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    
    const values = [
      req.body.re_id,
      req.body.fname,
      req.body.lname,
      req.body.address,
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

app.get('/getReception',(req,res)=>{
  const sql="SELECT*FROM reception";
  con.query(sql,(err,result)=>{
    if(err) return res.json({Error:"get reception error in sql"});
    return res.json({Status:"Success",Result:result});
  
  })
  
  })






//API for updating  reception



app.get('/get/reception/:id', (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM reception WHERE re_id=?";
  con.query(sql, [id], (err, result) => {
    if (err) {
      return res.json({ Error: "get reception error in sql" });
    }
    return res.json({ Status: "Success", Result: result });
  });
});
app.put('/update/reception/:id', (req, res) => {


  try {
    
    const decimalSalary = parseFloat(req.body.salary);
 
  
    let values=[decimalSalary,req.params.id];
    console.log(values);
    const sql = "UPDATE reception SET salary=? WHERE re_id=?";
    con.query(sql, values, (err, result) => {
      if (err) {
        return res.json({ Error: "update reception error in sql" });
      }
      return res.json({ Status: "Success" });
    });
  } catch (error) {
    console.log(error)
    
  } 
});


//Api for deletion of triage by admin

app.delete('/delete/reception/:id',(req,res)=>{
 

  try {
    
    
 
  
    let values=[req.params.id];
    console.log(values);
    const sql = "DELETE FROM reception WHERE re_id=?";
    con.query(sql, values, (err, result) => {
      if (err) {
        return res.json({ Error: "delete reception error in sql" });
      }
      return res.json({ Status: "Success" });
    });
  } catch (error) {
    console.log(error)
    
  }


})











//api for selecting and total number of ADMIN
app.get('/adminCount',(req,res)=>{
  const sql="select count(ad_id) as admine from admin"
  con.query(sql,(err,result)=>{
    if(err) return res.json({Error:"Error in running query"});
    return res.json(result);
  })
})

//api for selecting and total number of DOCTOR

app.get('/doctorCount',(req,res)=>{
  const sql="select count(doctID) as doctore from doctor"
  con.query(sql,(err,result)=>{
    if(err) return res.json({Error:"Error in running query"});
    return res.json(result);
  })
})

//api for selecting and total number of NURSE

app.get('/nurseCount',(req,res)=>{
  const sql="select count(nr_id) as nursee from nurse"
  con.query(sql,(err,result)=>{
    if(err) return res.json({Error:"Error in running query"});
    return res.json(result);
  })
})

//api for selecting and total number of TRIGE

app.get('/triageCount',(req,res)=>{
  const sql="select count(tr_id) as triagee from triage"
  con.query(sql,(err,result)=>{
    if(err) return res.json({Error:"Error in running query"});
    return res.json(result);
  })
})


//api for selecting and total number of RECEPTION

app.get('/receptionCount',(req,res)=>{
  const sql="select count(re_id) as receptione from reception"
  con.query(sql,(err,result)=>{
    if(err) return res.json({Error:"Error in running query"});
    return res.json(result);
  })
})


//API for updating doctor

app.get('/get/doctor/:id', (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM doctor WHERE doctID=?";
  con.query(sql, [id], (err, result) => {
    if (err) {
      return res.json({ Error: "get doctor error in sql" });
    }
    return res.json({ Status: "Success", Result: result });
  });
});


app.put('/update/doctor/:id', (req, res) => {


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

app.delete('/delete/doctor/:id',(req,res)=>{
 

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





// ------------------RECEPTION----------------------------------------------
// ---------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------



















app.listen(8081, () => {
  console.log("Server is running on port 8081");
});
