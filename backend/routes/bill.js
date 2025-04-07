const express = require("express"); 
const connection = require("../connection.js");
const router = express.Router();
let ejs = require("ejs");
const puppeteer = require("puppeteer");  // Import Puppeteer
let path = require("path");
var fs = require("fs");
var uuid = require("uuid");
var auth = require("../services/authentication.js");

router.post("/generateReport", auth.authenticateToken, async (req, res) => {
  console.log("Incoming request for bill generation:", req.body); // Debugging log
  const generatedUuid = uuid.v1();
  const orderDetails = req.body;
  var productDetailsReport = JSON.parse(orderDetails.productDetails);

  var query =
    "INSERT INTO bill (name, uuid, email, contactNumber, paymentMethod, total, productDetails, createdBy, bill_datetime) VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW())";

  connection.query(
    query,
    [
      orderDetails.name,
      generatedUuid,
      orderDetails.email,
      orderDetails.contactNumber,
      orderDetails.paymentMethod,
      orderDetails.totalAmount,
      orderDetails.productDetails,
      res.locals.email,
    ],
    async (err, results) => {
      if (!err) {
        console.log("Bill inserted successfully with UUID:", generatedUuid);
        // Fetch bill_datetime from the database
        connection.query(
          "SELECT bill_datetime FROM bill WHERE uuid = ?",
          [generatedUuid],
          (err, billResults) => {
            if (!err && billResults.length > 0) {
              const billDatetime = billResults[0].bill_datetime;
              console.log("Fetched bill datetime:", billDatetime); // Debugging log

              // Render EJS template
              ejs.renderFile(
                path.join(__dirname, "", "report.ejs"),
                {
                  productDetails: productDetailsReport,
                  name: orderDetails.name,
                  email: orderDetails.email,
                  contactNumber: orderDetails.contactNumber,
                  paymentMethod: orderDetails.paymentMethod,
                  totalAmount: orderDetails.totalAmount,
                  bill_datetime: billDatetime, // Pass bill_datetime to EJS
                },
                async (err, renderedHtml) => {
                  if (err) {
                    console.error("Error rendering EJS template:", err);
                    return res.status(500).json(err);
                  } else {
                    // Generate the PDF
                    try {
                      const browser = await puppeteer.launch();
                      const page = await browser.newPage();
                      await page.setContent(renderedHtml);
                      await page.pdf({
                        path: `./generated_pdf/${generatedUuid}.pdf`,
                        format: 'A4',
                      });
                      await browser.close();
                      console.log("PDF generated successfully:", generatedUuid);
                      return res.status(200).json({
                         uuid: generatedUuid,
                         bill_datetime: billDatetime, });
                    } catch (err) {
                      console.error("Error generating PDF:", err); // Debugging log
                      return res.status(500).json(err);
                    }
                  }
                }
              );
            } else {
              console.error("Failed to fetch bill datetime:", err);
              return res.status(500).json(err || { message: "Failed to fetch bill datetime" });
            }
          }
        );
      } else {
        console.error("Error inserting bill:", err); // Debugging log
        return res.status(500).json(err);
      }
    }
  );
});



router.post('/getPdf',auth.authenticateToken,function(req,res){
 const orderDetails= req.body;
 const pdfPath= './generated_pdf/' +orderDetails.uuid+'.pdf';
 if(fs.existsSync(pdfPath)){
  res.contentType("application/pdf");
  fs.createReadStream(pdfPath).pipe(res);
 }
 else{
  var productDetailsReport = JSON.parse(orderDetails.productDetails);
   // Render EJS template
   ejs.renderFile(
    path.join(__dirname, "", "report.ejs"),
    {
      productDetails: productDetailsReport,
      name: orderDetails.name,
      email: orderDetails.email,
      contactNumber: orderDetails.contactNumber,
      paymentMethod: orderDetails.paymentMethod,
      totalAmount: orderDetails.totalAmount,
    },
    async (err, renderedHtml) => {
      if (err) {
        return res.status(500).json(err);
      } else {
        // Initialize Puppeteer and generate the PDF
        try {
          const browser = await puppeteer.launch(); // Launch Puppeteer browser
          const page = await browser.newPage(); // Open a new page
          await page.setContent(renderedHtml); // Set the HTML content
          await page.pdf({
            path: `./generated_pdf/${orderDetails.uuid}.pdf`, // Output path for PDF
            format: 'A4', // Set the page format (A4)
          });
          await browser.close(); // Close the browser
          res.contentType("application/pdf");
          fs.createReadStream(pdfPath).pipe(res);
        } catch (err) {
          console.log(err);
          return res.status(500).json(err); // Return error response if PDF generation fails
        }
      }
    }
  );
 }
})


router.get('/getBills', auth.authenticateToken, (req, res, next) => {
  const userEmail = res.locals.email; // Get the logged-in user's email
  const userRole = res.locals.role; // Assume the role is set during authentication

  let query;
  let params = [];

  if (userRole === "admin") {
    // Admin sees all bills
    query = "SELECT id, name, uuid, email, contactNumber, paymentMethod, total, createdBy, bill_datetime, productDetails FROM bill ORDER BY id DESC";
  } else {
    // Regular user sees only their own bills, regardless of email used in the order
    query = "SELECT id, name, uuid, email, contactNumber, paymentMethod, total, createdBy, bill_datetime, productDetails FROM bill WHERE createdBy = ? ORDER BY id DESC";
    params.push(userEmail); // Check the 'createdBy' field for the user's email
  }

  connection.query(query, params, (err, results) => {
    if (!err) {
      return res.status(200).json(results);
    } else {
      return res.status(500).json(err);
    }
  });
});





router.delete('/delete/:id',auth.authenticateToken,(req,res,next)=>{
  const id = req.params.id;
  var query = "delete from bill where id=?";
  connection.query(query,[id],(err,results)=>{
    if(!err){
      if(results.affectedRows == 0){
        return res.status(404).json({message:"Bill id not found"});
      }
      return res.status(200).json({message:"Bill deleted successfully"});
    }
    else{
      return res.status(500).json(err);
    }
  })
})
module.exports = router;
