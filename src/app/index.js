const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const userAuthRoutes = require("./routes/user/auth");
const adminAuthRoutes = require("./routes/admin/auth");
const contentRoutes = require("./routes/user/content");
const interactionRoutes = require("./routes/user/interactions");
const statisticsRoutes = require("./routes/user/statistics");
const becomeWriterRoutes = require("./routes/user/become-writer");
const userProfileRoutes = require("./routes/user/profile");
const adminProfileRoutes = require("./routes/admin/profile");
const writerContentRoutes = require("./routes/writer/content");
const writerProfileRoutes = require("./routes/writer/profile");
const commentRoutes = require("./routes/user/interactions/comment");
const adminPostManagementRoutes = require("./routes/admin/post-management");
const adminCommentManagementRoutes = require("./routes/admin/comment-management");
const adminUserManagementRoutes = require("./routes/admin/user-management");
const adminCreatorManagementRoutes = require("./routes/admin/creator-management");
const adminDashboardRoutes = require("./routes/admin/dashboard");
const adminChatRoutes = require("./routes/admin/chat");
const writerChatRoutes = require("./routes/writer/chat");
const writerDashboardRoutes = require("./routes/writer/dashboard");
const JwtAuthRoutes = require('./routes/auth/jwt-auth')
const cookieParser = require("cookie-parser");
require("./database");
const mongoose = require("mongoose");
const errorHandler = require("./middlewares/error-handler");
mongoose.set("strictQuery", false);


app.use(
  cors({
    origin: 'http://localhost:4200',
    credentials: true

  })
);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use("/", userAuthRoutes);
app.use("/admin", adminAuthRoutes);
app.use("/admin/post", adminPostManagementRoutes);
app.use("/admin/comment", adminCommentManagementRoutes);
app.use("/admin/user", adminUserManagementRoutes);
app.use("/admin/creator", adminCreatorManagementRoutes);
app.use("/admin/dashboard", adminDashboardRoutes);
app.use("/admin/chat", adminChatRoutes);
app.use("/writer/dashboard", writerDashboardRoutes);
app.use("/blog", contentRoutes);
app.use("/", interactionRoutes);
app.use("/", statisticsRoutes);
app.use("/writer", becomeWriterRoutes);
app.use("/user/profile", userProfileRoutes);
app.use("/admin/profile", adminProfileRoutes);
app.use("/writer/blog", writerContentRoutes);
app.use("/writer/chat", writerChatRoutes);
app.use("/writer/profile", writerProfileRoutes);
app.use("/blog/comments", commentRoutes);
app.use("/", JwtAuthRoutes)

app.use(errorHandler);
app.get("/", (req, res) => {
  res.send("success");
});


app.listen(3000, () => {
  console.log(`app listening on port 3000`);
});
