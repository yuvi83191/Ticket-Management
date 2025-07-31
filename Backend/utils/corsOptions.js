const corsOptions = {
  origin: ["http://localhost:5173"], // frontend origin
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

module.exports = corsOptions;
