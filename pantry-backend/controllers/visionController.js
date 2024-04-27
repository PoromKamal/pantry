const  { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });
const asyncHandler = require('express-async-handler');

const receiptPrompt = `
  Give me a comma seperated report on items, and prices on the receipt, for example:
  Item1:$1.00,Item2:$2.00,Item3:$3.00.

  Begin and end the report with a triple back tick (\`\`\`) to signal start and
  end of the report.
  If you are unsure of an item, you can write "Unknown" in place of the item name.
  If you are unsure of the price, you can write "0" in place of the price.
  If you are unsure of both, leave the item out of the report.

  Add nothing else besides the back tick blocks and the report.

  If you are unsure if you are viewing a receipt, simply return
  "Error", and nothing else.
`

const testReceiptResponse = `
\`\`\`
Lorem:$6.50,Ipsum:$7.50,Dolor Sit:$48.00,Amet:$9.30,Consectetur:$11.90,Adipiscing Elit:$1.20,Sed Do:$0.40
\`\`\`
`

const getRawTextFromReceipt = async (receiptBufferB64) => {
  const image = {
    inlineData: {
      data: receiptBufferB64,
      mimeType: "image/png",
    },
  };

  const result = await model.generateContent([receiptPrompt, image]);
  return result.response.text(); // TODO: Add error handling
};

const parseRawText = (receiptResponse) => {
  if (receiptResponse === "Error") {
    return null;
  }

  backTickStart = receiptResponse.indexOf("```");
  backTickEnd = receiptResponse.lastIndexOf("```");
  receiptResponseData = receiptResponse.substring(backTickStart + 3, backTickEnd)
                        .replace(/(\r\n|\n|\r)/gm,"")
                        .split(",");
  const receiptItems = receiptResponseData.map((item) => {
    const splitItem = item.split(":");
    return {
      name: splitItem[0],
      price: splitItem[1]
    }
  });
  return receiptItems;
}

const generatePantryItemsFromReceipt = async (receiptBuffer) => {
  const rawTextResult = await getRawTextFromReceipt(receiptBuffer);
  const result = parseRawText(rawTextResult);
  return result;
}

const scanReceipt = asyncHandler(async (req, res) => {
  const receiptBuffer = req.body.receiptBuffer;
  console.log(receiptBuffer)
  return;
  const result = await generatePantryItemsFromReceipt(receiptBuffer);
  res.json(result);
});

module.exports = { scanReceipt };