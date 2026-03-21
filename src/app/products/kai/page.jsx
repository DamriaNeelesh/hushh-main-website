import fs from "fs";
import path from "path";

function getKaiTemplate() {
  const templatePath = path.join(process.cwd(), "src/app/products/kai/kai-template.html");

  try {
    return fs.readFileSync(templatePath, "utf8");
  } catch (error) {
    return `
      <main style="padding:2rem;font-family:Inter,sans-serif">
        <h1>Kai Template Not Found</h1>
        <p>Please check src/app/products/kai/kai-template.html.</p>
      </main>
    `;
  }
}

function extractStyles(html) {
  const matches = html.match(/<style[^>]*>([\s\S]*?)<\/style>/gi);
  if (!matches) return "";

  return matches
    .map((block) => {
      const styleMatch = block.match(/<style[^>]*>([\s\S]*?)<\/style>/i);
      return styleMatch ? styleMatch[1] : "";
    })
    .join("\n");
}

function extractBody(html) {
  const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  return bodyMatch ? bodyMatch[1] : html;
}

export default function AgentKaiPage() {
  const template = getKaiTemplate();
  const styleMarkup = extractStyles(template);
  const bodyMarkup = extractBody(template);

  return (
    <>
      {styleMarkup ? <style dangerouslySetInnerHTML={{ __html: styleMarkup }} /> : null}
      <div dangerouslySetInnerHTML={{ __html: bodyMarkup }} />
    </>
  );
}

