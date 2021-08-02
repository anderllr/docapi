import formidable from "formidable-serverless";
import fs from "fs";
import path from "path";
import s3Client from "utils/s3Client";
import pdf from "pdf-poppler";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async (req, res) => {
  const form = new formidable.IncomingForm();
  const uploadPath = "./src/temp/upload";
  form.uploadDir = uploadPath;
  form.keepExtensions = true;

  form.parse(req, async (err, fields, { file }) => {
    const { filename, folder } = fields;
    //src\temp\upload\upload_9f12731ce6457e4f0ad8e67013b5a4d1.pdf
    let extension = file.type.split("/").pop();
    let filePathJpg = "";
    if (extension === "pdf") {
      //vai converter para png
      const options = {
        format: "jpeg",
        out_dir: uploadPath,
        out_prefix: filename,
        page: null,
      };

      await pdf.convert(file.path, options);

      filePathJpg = `${path.dirname(file.path)}\\${filename}-1.jpg`;
      extension = "jpg";
    }
    const url = await s3Client.uploadFile(
      `${folder}/${process.env.COMPANY}_${filename}.${extension}`,
      filePathJpg ? filePathJpg : file.path
    );
    //delete temporary file
    fs.unlink(file.path, (err) => {
      if (err) {
        console.error(err);
        return;
      }
      //file removed
    });

    //Se tiver o jpg exclui tb
    if (filePathJpg !== "") {
      fs.unlink(filePathJpg, (err) => {
        if (err) {
          console.error(err);
          return;
        }
        //file removed
      });
    }

    res.status(200).json({ path: url });
  });
};
