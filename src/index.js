const express = require("express");
const { handleError, AppError } = require("./helpers/error");
const { sequelize } = require("./models");

const app = express();

app.use(express.json());

//Sync model của sequelize với db(app start chạy cậu lệnh phiá dưới)
sequelize.sync({ alter: true });

const v1 = require("./routers/v1");
app.use("/api/v1", v1);

// handleError;
//demo handleError
app.get("/error", (req, res, next) => {
  throw new AppError(500, "Internal Server");

  // or next(req, res, next)
});

// middleware đc dùng đẻ bắt và xử lí lỗi ra cho client
// phải đc bên dưới các routers
// app.use((err, req, res , next) => {})
app.use(handleError);

app.listen(4002);
