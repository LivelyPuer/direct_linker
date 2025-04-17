require('dotenv').config();
const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3010;
const useForm = process.env.USE_FORM === 'true'; // Add this line

// Создаем папку для файлов, если не существует
const uploadFolder = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadFolder)) {
  fs.mkdirSync(uploadFolder);
}

// Настройка Multer (загрузка файлов)
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadFolder),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

// HTML-форма (опционально)
if (useForm) {
  app.use(express.static(path.join(__dirname, 'public')));
}

// Прием файла
app.use('/upload', (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || authHeader !== `Bearer ${process.env.API_TOKEN}`) {
    return res.status(401).send('Unauthorized');
  }
  next();
});

// Existing upload route remains the same
app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) return res.status(400).json({ 
    success: false,
    error: 'No file uploaded'
  });
  
  const fileUrl = `/uploads/${req.file.filename}`;
  res.json({
    success: true,
    url: fileUrl,
    filename: req.file.filename,
    size: req.file.size
  });
});

// Отдача файлов по прямым ссылкам
app.use('/uploads', express.static(uploadFolder));

// Запуск сервера
app.listen(PORT, () => {
  console.log(`🚀 Сервер запущен на http://localhost:${PORT}`);
});
