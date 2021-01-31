/** @format */

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const jobRouter = require("./routes/api/job");
const departmentRouter = require("./routes/api/department");
const postingTitle = require("./routes/api/postingTitle");
const screeningQuestion = require("./routes/api/screeningQuestion");
const messagesRouter = require("./routes/api/messages");
const app = express();

require("dotenv").config();

const PORT = process.env.PORT || 5000;
const DB =
	"mongodb+srv://hiren_new_db:qm6AWtPrCNstdIv9@cluster0.5rchi.gcp.mongodb.net/restapi_test?retryWrites=true&w=majority";

mongoose
	.connect(
		"mongodb+srv://rushil:Rd1701@2001@recruiter-react.jcez1.mongodb.net/recruiter-react?retryWrites=true&w=majority",
		{
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
			useFindAndModify: false
		}
	)
	.then(() => console.log("Connected to DB"))
	.catch(error => console.log(error));
app.use(cors());
app.use("/uploads", express.static("uploads"));
app.use(express.json());
app.get("/", (_req, res) => {
	res.send(
		"Api at <br><br> /api/candidates <br> /api/vacancies <br> /api/conversation"
	);
});

app.use("/api/candidates", require("./routes/api/candidates"));
app.use("/api/vacancies", require("./routes/api/vacancies"));
app.use("/api/conversation", require("./routes/api/conversation"));
app.use("/api/chats", require("./routes/api/chats"));
app.use("/api/screening", require("./routes/api/screening"));
app.use("/api/job", jobRouter);
app.use("/api/department", departmentRouter);
app.use("/api/postingTitle", postingTitle);
app.use("/api/screeningQuestion", screeningQuestion);
app.use("/api/messages", messagesRouter);

app.listen(PORT, () => console.log(`Server Started on port ${PORT}`));
