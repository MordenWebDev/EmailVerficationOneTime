const express = require('express');
const app = express();
app.use(express.json());
// Import the password reset routes
const passwordResetRoutes = require('./passwordResetRoutes');

// Use the password reset routes

app.use('/password-reset', passwordResetRoutes);

app.get("/",(req,res)=>{
    console.log("welcome")
    res.send("welcome")
})

// ... Other middleware and routes ...

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
