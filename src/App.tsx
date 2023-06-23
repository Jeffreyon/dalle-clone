import { useState } from "react";
import "./App.css";
import { Configuration, OpenAIApi } from "openai";
const configuration = new Configuration({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

function App() {
  const [prompt, setPrompt] = useState("");
  const [image, setImage] = useState(
    "https://images.unsplash.com/photo-1662010021854-e67c538ea7a9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=352&q=80"
  );
  const generateImage = async () => {
    if (prompt.length) {
      const response = await openai.createImage({
        prompt: prompt,
        n: 2,
        size: "512x512",
      });

      let imageUrl = response.data.data[0].url;
      setImage(imageUrl as string);
    }
  };
  return (
    <>
      <div className="stage">
        <img src={image} alt={prompt} className="generated-image" />
      </div>
      <div className="flex">
        <input
          onChange={(e) => setPrompt(e.target.value)}
          value={prompt}
          type="text"
          className="prompt-box"
          placeholder="Describe an image here, and hit Generate"
        />
        <button onClick={generateImage}>Generate image</button>
      </div>
    </>
  );
}

export default App;
