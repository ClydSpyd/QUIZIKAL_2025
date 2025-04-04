import axios from "axios";

export const uploadImage = async (
  e: React.ChangeEvent<HTMLInputElement>,
  idx: number,
  callback: (idx: number, url: string) => void,
) => {
  if (!e.currentTarget?.files) return;
  const data = new FormData();
  const file = e.currentTarget?.files[0];
  data.append("image", file);

  const config = { headers: { "Content-Type": file.type } };

  try {
    const res = await axios.post("/api/upload/upload_image", data, config);
    console.log(res.data.url);
    callback(idx, res.data.url);
  } catch (err) {
    console.log(err);
  }
};
