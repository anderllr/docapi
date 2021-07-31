export const uploadFile = async (file, filename, folder) => {
  const form = new FormData();

  form.append("file", file);
  form.append("filename", filename);
  form.append("folder", folder);
  const res = await fetch("/api/upload-file", {
    method: "POST",
    body: form,
  });

  return res.json();
};
