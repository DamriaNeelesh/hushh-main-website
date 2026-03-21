import fs from "fs";
import path from "path";

function getBodyMarkup() {
  const templatePath = path.join(process.cwd(), "src/app/figma-template.html");

  try {
    const html = fs.readFileSync(templatePath, "utf8");
    const match = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
    return match ? match[1] : html;
  } catch (error) {
    return `<main style="padding:2rem;font-family:Inter,sans-serif">
      <h1>Figma Template Not Found</h1>
      <p>Please check src/app/figma-template.html.</p>
    </main>`;
  }
}

export default function Home() {
  const bodyMarkup = getBodyMarkup();
  return <div dangerouslySetInnerHTML={{ __html: bodyMarkup }} />;
}
