import "./App.css";
import { Configuration, OpenAIApi } from "openai";
const configuration = new Configuration({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

function App() {
  const generateImage = async () => {
    const response = await openai.createImage({
      prompt: "A cute baby sea otter",
      n: 2,
      size: "512x512",
    });
    console.log(response.data);
  };
  return (
    <>
      <div>Hey</div>
      <button onClick={generateImage}>Generate image</button>
    </>
  );
}

export default App;
