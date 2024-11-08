import { useState } from "react";
import "./App.css";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

function App() {
  const [prompt, setPrompt] = useState("");
  const [generating, setGenerating] = useState(false);
  const [image, setImage] = useState(
    "https://images.unsplash.com/photo-1662010021854-e67c538ea7a9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=352&q=80"
  );
  const generateImage = async () => {
    try {
      if (prompt.length && !generating) {
        setGenerating(true);

        const response = await openai.images.generate({
          prompt: prompt,
          n: 4,
          size: "512x512",
        });

        let imageUrl = response.data[0].url;
        console.log(imageUrl);
        setImage(imageUrl as string);
        setGenerating(false);
      }
    } catch (error) {
      console.log(error);
      setGenerating(false);
      setPrompt("");
    }
  };

  const examplePrompts = [
    "Early morning photography of a landscape shrouded in mist, with diffused light and long shadows.",
    "Action photography of a parkour athlete jumping between urban structures, using a fast shutter speed.",
    "Action photography of a parkour athlete jumping between urban structures, using a fast shutter speed.",
    "Creative photography from the perspective of a pet, focusing on their interactions with the surroundings.",
    "Interior photography of a cozy corner in a coffee shop, using natural light.",
    "Portrait photography during the golden hour, using the soft, warm light to highlight the subject",
  ];

  const randomPrompt = () => {
    let randomIndex = Math.floor(Math.random() * examplePrompts.length);
    setPrompt(examplePrompts[randomIndex]);
  };

  return (
    <>
      <div className="stage">
        <img src={image} alt={prompt} className="generated-image" />
      </div>
      <div className="flex">
        <div className="input-box">
          <input
            onChange={(e) => setPrompt(e.target.value)}
            value={prompt}
            type="text"
            className="prompt-box"
            placeholder="Describe an image here, and hit Generate"
          />
          <a href="#" onClick={randomPrompt}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="#000000"
              width="30px"
              height="30px"
              viewBox="-4 0 32 32"
              version="1.1"
            >
              <title>shuffle</title>
              <path d="M0 20.688v2c0 0.281 0.219 0.5 0.5 0.5h2.875c1.688 0 3.094-0.781 4.25-1.969 1.188-1.188 2.156-2.781 3.125-4.313 0.781-1.25 1.563-2.438 2.375-3.344 0.781-0.938 1.563-1.5 2.5-1.5h2.656v2.281c0 0.719 0.5 0.844 1.094 0.375l4.344-3.625c0.375-0.313 0.375-0.906 0-1.219l-4.344-3.594c-0.594-0.5-1.094-0.375-1.094 0.375v2.406h-2.656c-1.719 0-3.063 0.75-4.25 1.969-1.156 1.188-2.219 2.781-3.156 4.281-0.813 1.281-1.563 2.5-2.375 3.406-0.781 0.906-1.563 1.469-2.469 1.469h-2.875c-0.281 0-0.5 0.219-0.5 0.5zM0 9.531v2c0 0.281 0.219 0.5 0.5 0.5h2.875c1.406 0 2.531 1.375 3.75 3.156 0.031-0.094 0.063-0.156 0.094-0.219 0.031-0.031 0.125-0.094 0.156-0.156 0.469-0.781 1-1.531 1.5-2.344-0.75-0.969-1.469-1.844-2.406-2.438-0.906-0.625-1.906-0.969-3.094-0.969h-2.875c-0.344 0-0.5 0.156-0.5 0.469zM18.281 20.125h-2.656c-1.375 0-2.563-1.344-3.75-3.094-0.063 0.094-0.094 0.156-0.125 0.219-0.063 0.063-0.094 0.125-0.156 0.219-0.219 0.375-0.5 0.781-0.719 1.156-0.25 0.344-0.5 0.75-0.719 1.094 0.719 0.969 1.469 1.813 2.375 2.406 0.875 0.625 1.906 1.031 3.094 1.031h2.656v2.188c0 0.719 0.5 0.875 1.094 0.375l4.344-3.656c0.375-0.313 0.375-0.875 0-1.188l-4.344-3.594c-0.594-0.469-1.094-0.375-1.094 0.375v2.469z" />
            </svg>
          </a>
        </div>
        <button onClick={generateImage}>
          {generating ? "Generating..." : "Generate image"}
        </button>
      </div>
    </>
  );
}

export default App;
