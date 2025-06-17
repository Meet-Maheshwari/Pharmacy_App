import { GoogleGenAI, HarmBlockThreshold, HarmCategory } from "@google/genai";
import Product from "../models/Product.js";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

async function initDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
    throw err;
  }
}

async function searchPharmacyProducts(medicine_name) {
  // This `medicine_name` will be the `prodTitle` from Gemini
  try {
    const product = await Product.findOne({
      prodTitle: { $regex: new RegExp(medicine_name, "i") },
    });

    if (product && product.inStock) {
      // Check both existence and inStock
      return {
        available: true,
        prodTitle: product.prodTitle,
        brand: product.brand,
        price_org: product.price.org, // Assuming you want original price
        inStock: product.inStock,
        productId: product._id, // Convert ObjectId to string for easy use
      };
    } else {
      // If product not found or out of stock
      return { available: false };
    }
  } catch (error) {
    console.error("Error searching product:", error);
    return { available: false };
  }
}

// To run this code you need to install the following dependencies:
// npm install @google/genai mime
// npm install -D @types/node

export const chatbot = async (req, res) => {
  let { userMessage } = req.body;

  try {
    await initDB();

    const ai = new GoogleGenAI({
      apiKey: "AIzaSyDumeWvV_wX8XNzylrgikn76fRD8w8wXZk",
    });
    const tools = [
      {
        functionDeclarations: [
          {
            name: "search_pharmacy_products",
            description:
              "Searches the pharmacy's product catalog for the given medicine name.",
            parameters: {
              type: "object",
              properties: {
                medicine_name: {
                  type: "string",
                  description:
                    "The exact title of the medicine product to search for (e.g., 'Paracetamol 650mg Tablets').",
                },
              },
              required: ["medicine_name"],
            },
          },
        ],
      },
    ];
    const config = {
      safetySettings: [
        {
          category: HarmCategory.HARM_CATEGORY_HARASSMENT,
          threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH, // Block few
        },
        {
          category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
          threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH, // Block few
        },
        {
          category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
          threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH, // Block few
        },
        {
          category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
          threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH, // Block few
        },
      ],
      tools,
      responseMimeType: "text/plain",
    };
    const model = "gemini-2.0-flash";
    const contents = [
      {
        role: "user",
        parts: [
          {
            text: `You are a helpful pharmacy chatbot. When a user describes symptoms, first provide a brief and general information about the likely disease or condition based on the symptoms and the commonly recommended medicine for it. After that, use the \`search_pharmacy_products\` tool to check if that specific medicine is available in our pharmacy's product catalog.
  
  If the medicine is available, recommend it and provide a clickable button to buy it. If it's not in stock, inform the user about its unavailability and offer to suggest alternatives.
  
  Example 1: When medicine is available in catalog
  
  User: "I have a headache and a mild fever."
  Model: "Your symptoms like headache and mild fever often indicate a common cold or flu-like infection. For such conditions, a general pain reliever and fever reducer like Paracetamol is usually recommended."
  
  Model: Tool Call to 'search_pharmacy_products'
  {
    "tool_code": {
      "name": "search_pharmacy_products",
      "args": {
        "medicine_name": "Paracetamol"
      }
    }
  }
  
  Tool Response: {
    "available": true,
    "prodTitle": "Paracetamol 650mg Tablets",
    "brand": "Popular Meds",
    "price_org": 12.50,
    "inStock": true,
    "productId": "6667a42b0e02c61555c4d32a" // Example ID from your DB
  }
  
  Model (Final Chat Response - This is what your frontend will receive):
  (You will type this JSON block as the final "Model" response in the example turn)
  {
    "brief_info": "Your symptoms like headache and mild fever often indicate a common cold or flu-like infection. For such conditions, a general pain reliever and fever reducer like Paracetamol is usually recommended.",
    "recommended_product": {
      "prodTitle": "Paracetamol 650mg Tablets",
      "brand": "Popular Meds",
      "price_org": 12.50
    },
    "action_buttons": [
      {
        "label": "Buy Paracetamol 650mg Tablets",
        "type": "redirect",
        "url": "http://localhost:8080/api/product/Paracetamol 650mg Tablets"
      }
    ],
    "availability_status": "available"
  }
  
  Example 2: When medicine is not available in catalog
  User: "My allergies are severe, is 'Allergy Relief Ultra' available?"
  Model (First Part): "Severe allergies often require specific antihistamines. Allergy Relief Ultra is a powerful option for symptomatic relief."
  
  Model (Tool Call): search_pharmacy_products with medicine_name: "Allergy Relief Ultra"
  Tool Response: {"available": false}
  
  Model (Final Chat Response): 
  (You will type this JSON block as the final "Model" response in the example turn)
  {
    "brief_info": "Severe allergies often require specific antihistamines. Allergy Relief Ultra is a powerful option for symptomatic relief.",
    "recommended_product": null,
    "action_buttons": [],
    "availability_status": "unavailable",
    "generic_message": "I'm sorry, 'Allergy Relief Ultra' is currently not available in our store. Can I help you find an alternative for allergy relief?"
  }
  `,
          },
        ],
      },
      {
        role: "model",
        parts: [
          {
            text: `**Exploring symptom-medication links**
  
  I'm currently focused on the initial response phase. My goal is to quickly and accurately link user-reported symptoms to potential conditions and corresponding medications. I'm prioritizing accuracy and conciseness in this initial triage. The next step is seamlessly integrating the \`search_pharmacy_products\` tool after the initial assessment.
  
  
  **Defining the initial conditions**
  
  I've made significant progress in defining the core logic. My focus is on the initial assessment phase, specifically the link between user-reported symptoms and potential conditions. I've narrowed down the process to three key actions: analyze symptoms, determine the condition, and formulate the 'brief_info' field. Currently, I'm working through a few test cases to refine this initial response. The next hurdle is seamlessly integrating with the \`search_pharmacy_products\` tool.
  
  
  **Implementing the response structure**
  
  I'm now fully immersed in the final JSON response construction. I've successfully identified "sore throat" and "body aches" as the user's symptoms, leading me to suspect a cold or flu. My current focus is on seamlessly integrating the \`search_pharmacy_products\` tool and structuring the final output. I've decided to test the workflow with the assumption that Paracetamol, my chosen remedy, will be available, to evaluate the final JSON structure and ensure the buy button is correctly implemented. I am eagerly awaiting the tool's result to finalize the process.
  
  
  `,
          },
          {
            text: `Your symptoms like a sore throat and body aches can be signs of a common cold or flu. Over-the-counter pain relievers and fever reducers like Paracetamol are often recommended to help alleviate these symptoms.`,
          },
          {
            functionCall: {
              name: `search_pharmacy_products`,
              args: { medicine_name: "Paracetamol" },
            },
          },
        ],
      },
      {
        role: "user",
        parts: [
          {
            functionResponse: {
              name: `search_pharmacy_products`,
              response: {
                output: `{
    "available": true,
    "prodTitle": "Paracetamol 650mg Tablets",
    "brand": "Popular Meds",
    "price_org": 12.50,
    "inStock": true,
    "productId":"6667a42b0e02c61555c4d32a" // Example ID from your DB
  }`,
              },
            },
          },
        ],
      },
      {
        role: "model",
        parts: [
          {
            text: `**Confirming the Diagnosis**
  
  I've zeroed in on the likely cause: a common cold or flu, based on the described symptoms. Now, I'm confirming Paracetamol's availability at local pharmacies, initiating a search to source this common remedy. The initial search yielded "Paracetamol 650mg Tablets".
  
  
  **Crafting the Response**
  
  I've successfully identified the product title, brand, and price from the tool's output: "Paracetamol 650mg Tablets" from "Popular Meds" for $12.50. I'm now assembling the final JSON response, ensuring it includes the initial symptom summary, product details, a "Buy" button, and an availability status of "available". I've correctly constructed the buy button URL using the provided structure. All elements are ready to be included in the response.
  
  
  `,
          },
          {
            text: `\`\`\`json
  {
    "brief_info": "Your symptoms like a sore throat and body aches can be signs of a common cold or flu. Over-the-counter pain relievers and fever reducers like Paracetamol are often recommended to help alleviate these symptoms.",
    "recommended_product": {
      "prodTitle": "Paracetamol 650mg Tablets",
      "brand": "Popular Meds",
      "price_org": 12.50
    },
    "action_buttons": [
      {
        "label": "Buy Paracetamol 650mg Tablets",
        "type": "redirect",
        "url": "http://localhost:8080/api/product/Paracetamol 650mg Tablets"
      }
    ],
    "availability_status": "available"
  }
  \`\`\``,
          },
        ],
      },
      {
        role: "user",
        parts: [
          {
            text: `${userMessage}`,
          },
        ],
      },
    ];

    const response = await ai.models.generateContentStream({
      model,
      config,
      contents,
    });
    let fileIndex = 0;

    let finalText = "";
    let toolResult = null;

    for await (const chunk of response) {
      if (chunk.text) {
        console.log(chunk.text);
        finalText += chunk.text;
      } else if (chunk.functionCalls) {
        const tool_call = chunk.functionCalls[0];

        let result;
        if (tool_call.name === "search_pharmacy_products") {
          result = await searchPharmacyProducts(tool_call.args.medicine_name);
        }

        const function_response_part = {
          name: tool_call.name,
          response: { result },
        };
        contents.push(chunk.candidates[0].content);
        contents.push({
          role: "user",
          parts: [{ functionResponse: function_response_part }],
        });

        const final_response = await ai.models.generateContent({
          model: "gemini-2.0-flash",
          contents: contents,
          config: config,
        });

        const jsonRegex = /```json\n([\s\S]*?)\n```/;
        const match = final_response.text.match(jsonRegex);

        if (match && match[1]) {
          try {
            toolResult = JSON.parse(match[1]);
          } catch (jsonParseError) {
            console.error(
              "Error parsing JSON from model response:",
              jsonParseError
            );
            // Handle error if JSON is malformed
          }
        }

        return res
          .status(200)
          .json({ aiText: finalText.trim(), toolResult: toolResult });
      }
    }
  } catch (error) {
    console.log("Error in chatbot controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
