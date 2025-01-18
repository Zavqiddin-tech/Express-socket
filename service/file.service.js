const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const path = require("path");

class FileService {
  save(file) {
    try {
      const maxSize = 3 * 1024 * 1024
      if (file.size > maxSize) {
        throw new Error("Rasm 3 MB dan oshmasligi kerak");
      }


      const fileExtension = path.extname(file.name).toLowerCase();
      const allowedExtensions = [".jpg", ".jpeg", ".png"];
      // Fayl formatini tekshirish
      if (!allowedExtensions.includes(fileExtension)) {
        throw new Error("Fayl formati ruxsat etilmagan");
      }

      const fileName = uuidv4() + ".jpg";
      const currentDir = __dirname;
      const staticDir = path.join(currentDir, "..", "static");
      const filePath = path.join(staticDir, fileName);

      if (!fs.existsSync(staticDir)) {
        fs.mkdirSync(staticDir, { recursive: true });
      }

      file.mv(filePath);

      return fileName;
    } catch (error) {
      throw new Error(`Eror saving file: ${error}`);
    }
  }
}

module.exports = new FileService();
