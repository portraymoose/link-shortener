import { AddLinkForm } from "../components/AddLinkForm";
import "./HomePage.css";

export function HomePage() {
  return (
    <div className="page">
      <div className="card">
        <h1>URL Shortener</h1>
        <p className="subtitle">Enter a link to generate a short URL</p>
        <AddLinkForm />
      </div>
    </div>
  );
}
