const computerVision = async (path) => {
  let subscriptionKey = process.env.COMPUTER_VISION_SUBSCRIPTION_KEY;
  let uriBase = process.env.COMPUTER_VISION_ENDPOINT;
  console.log("subscriptionKey: ", subscriptionKey);
  console.log("uriBase: ", uriBase);
  if (!subscriptionKey) {
    throw new Error(
      "Set your environment variables for your subscription key and endpoint."
    );
  }

  const body = { url: path };

  const res = await fetch(uriBase, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Ocp-Apim-Subscription-Key": subscriptionKey,
    },
    body: JSON.stringify(body),
  });

  return await res.text();
};

export default async (req, res) => {
  const { path } = req.body;

  const ret = await computerVision(path);

  res.status(200).json({ text: ret });
};
