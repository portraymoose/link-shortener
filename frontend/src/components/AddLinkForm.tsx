import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { createLink } from "../store/linkSlice";
import { CopyButton } from "./CopyButton";
import "./AddLinkForm.css";

export function AddLinkForm() {
  const [url, setUrl] = useState("");
  const dispatch = useAppDispatch();
  const { currentLink, loading, error } = useAppSelector((state) => state.link);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url) dispatch(createLink(url));
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter URL"
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Loading..." : "Shorten"}
        </button>

        {error && <p className="error-message">{error}</p>}
      </form>

      {currentLink && (
        <div className="result-card">
          <p>
            <strong>Short Link:</strong>{" "}
            <a
              href={currentLink.shortLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              {currentLink.shortLink}
            </a>
            <CopyButton text={currentLink.shortLink} type="short" />
          </p>
          <p>
            <strong>Stats:</strong>{" "}
            <a
              href={currentLink.statsLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              {currentLink.statsLink}
            </a>
            <CopyButton text={currentLink.statsLink} type="stats" />
          </p>
        </div>
      )}
    </>
  );
}
