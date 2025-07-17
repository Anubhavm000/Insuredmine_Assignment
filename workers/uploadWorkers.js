const { parentPort, workerData } = require("worker_threads");
const fs = require("fs");
const csv = require("csv-parser");
const connectDb = require("../db/connect.js");
require("dotenv").config();

const {
  Agent,
  Account,
  Carrier,
  Category,
  User,
  Policy,
} = require("../models/models.js");

const parseValidDate = (input) => {
  const date = new Date(input);
  return isNaN(date.getTime()) ? null : date;
};
(async () => {
  await connectDb(process.env.MONGO_URI);
  const finalData = [];

  fs.createReadStream(workerData.filePath)
    .pipe(csv({ mapHeaders: ({ header }) => header.trim() }))
    .on("data", (data) => {
      Object.keys(data).forEach((key) => {
    if (typeof data[key] === 'string') {
      data[key] = data[key].trim(); 
    }
     });
      finalData.push(data)})
    .on("end", async () => {
      try {
        for (const row of finalData) {
          const agent = await Agent.findOneAndUpdate(
            { agentName: row["agent"] },
            { agentName: row["agent"] },
            { upsert: true, new: true }
          );
          const user = await User.findOneAndUpdate(
            {email : row['email']},
            {
              firstName: row["firstname"],
              dob: parseValidDate(row["dob"]),
              address: row["address"],
              phoneNumber: row["phone"],
              state: row["state"],
              zipCode: row["zip"],
              email: row["email"],
              gender: row["gender"],
              userType: row["userType"],
            },
            { upsert: true, new: true }
          );

          const account = await Account.findOneAndUpdate(
            { accountName: row["account_name"] },
            { accountName: row["account_name"] },
            { upsert: true, new: true }
          );

          const category = await Category.findOneAndUpdate(
            { categoryName: row["category_name"] },
            { categoryName: row["category_name"] },
            { upsert: true, new: true }
          );

          const carrier = await Carrier.findOneAndUpdate(
            { companyName: row["company_name"] },
            { companyName: row["company_name"] },
            { upsert: true, new: true }
          );

          await Policy.create({
            policyNumber: row["policy_number"],
            policyStartDate: parseValidDate(row["policy_start_date"]),
            policyEndDate: parseValidDate(row["policy_end_date"]),
            user: user._id,
            category: category._id,
            carrier: carrier._id,
          });
        }

        parentPort.postMessage({ inserted: finalData.length });
      } catch (err) {
        console.error("Error inserting data:", err);
        parentPort.postMessage({ error: err.message });
      }
    });
})();
