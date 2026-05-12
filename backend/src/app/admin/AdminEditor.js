"use client";

import { useState, useRef } from "react";

const containerStyle = {
  maxWidth: "1100px",
  margin: "24px auto",
  padding: "24px",
  border: "1px solid #d9d9d9",
  borderRadius: "12px",
  fontFamily: "Arial, sans-serif",
};

const gridStyle = {
  display: "grid",
  gap: "12px",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
};

const fieldStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "6px",
};

const inputStyle = {
  padding: "8px 10px",
  border: "1px solid #c4c4c4",
  borderRadius: "8px",
};

const sectionStyle = {
  border: "1px solid #d9d9d9",
  borderRadius: "12px",
  padding: "16px",
  marginTop: "16px",
};

function ImageUrlField({ value, onChange }) {
  const fileRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");

  async function handleFile(event) {
    const file = event.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setUploadError("");
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", credentials: "include", body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Upload failed");
      onChange(data.url);
    } catch (err) {
      setUploadError(err.message);
    } finally {
      setUploading(false);
      event.target.value = "";
    }
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
      <label>Image URL</label>
      <div style={{ display: "flex", gap: "6px" }}>
        <input
          style={{ ...inputStyle, flex: 1, minWidth: 0 }}
          placeholder="https://... or upload →"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        <button
          type="button"
          disabled={uploading}
          onClick={() => fileRef.current?.click()}
          style={{
            ...inputStyle,
            cursor: uploading ? "not-allowed" : "pointer",
            whiteSpace: "nowrap",
            background: "#f5f5f5",
          }}
        >
          {uploading ? "Uploading…" : "Choose file"}
        </button>
        <input
          ref={fileRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          style={{ display: "none" }}
          onChange={handleFile}
        />
      </div>
      {value && (
        <img
          src={value}
          alt="preview"
          style={{ maxHeight: "80px", objectFit: "cover", borderRadius: "6px", border: "1px solid #d9d9d9" }}
          onError={(e) => { e.currentTarget.style.display = "none"; }}
        />
      )}
      {uploadError && <span style={{ color: "red", fontSize: "12px" }}>{uploadError}</span>}
    </div>
  );
}

function toNumber(value, fallback = 0) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function normalizeContent(raw) {
  const content = raw || {};
  return {
    hero: {
      title: content.hero?.title || "",
      description: content.hero?.description || "",
    },
    selling: {
      qrUrl: content.selling?.qrUrl || "",
      ctaUrl: content.selling?.ctaUrl || "",
    },
    contact: {
      portalUrl: content.contact?.portalUrl || "agent.epolisi.uz",
      login: content.contact?.login || "+998(99)000-6048",
      password: content.contact?.password || "Shindos01",
    },
    featuredSlides: Array.isArray(content.featuredSlides)
      ? content.featuredSlides.map((item) => ({
          productSlug: item.productSlug || "",
          title: item.title || "",
          description: item.description || "",
          imageUrl: item.imageUrl || "",
        }))
      : [],
    calculators: {
      auto: {
        baseRate: toNumber(content.calculators?.auto?.baseRate, 0.03),
        ageFactorUnder25: toNumber(content.calculators?.auto?.ageFactorUnder25, 1.25),
        expFactorUnder3: toNumber(content.calculators?.auto?.expFactorUnder3, 1.2),
      },
      property: {
        baseRate: toNumber(content.calculators?.property?.baseRate, 0.002),
        areaFactorOver120: toNumber(content.calculators?.property?.areaFactorOver120, 1.1),
        securityHigh: toNumber(content.calculators?.property?.securityHigh, 0.9),
      },
      health: {
        baseMonthly: toNumber(content.calculators?.health?.baseMonthly, 18),
        ageFactorOver45: toNumber(content.calculators?.health?.ageFactorOver45, 1.35),
        chronicFactor: toNumber(content.calculators?.health?.chronicFactor, 1.4),
      },
      travel: {
        baseDaily: toNumber(content.calculators?.travel?.baseDaily, 1.5),
        globalFactor: toNumber(content.calculators?.travel?.globalFactor, 1.7),
      },
      life: {
        baseMonthlyRate: toNumber(content.calculators?.life?.baseMonthlyRate, 0.0012),
        ageFactorOver40: toNumber(content.calculators?.life?.ageFactorOver40, 1.5),
        termFactorOver15: toNumber(content.calculators?.life?.termFactorOver15, 1.2),
      },
    },
  };
}

export default function AdminEditor({ initialContent }) {
  const [form, setForm] = useState(() => normalizeContent(initialContent));
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  function updateSection(section, key, value) {
    setForm((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value,
      },
    }));
  }

  function updateSlide(index, key, value) {
    setForm((prev) => {
      const nextSlides = [...prev.featuredSlides];
      nextSlides[index] = {
        ...nextSlides[index],
        [key]: value,
      };
      return {
        ...prev,
        featuredSlides: nextSlides,
      };
    });
  }

  function addSlide() {
    setForm((prev) => ({
      ...prev,
      featuredSlides: [
        ...prev.featuredSlides,
        { productSlug: "auto", title: "", description: "", imageUrl: "" },
      ],
    }));
  }

  function removeSlide(index) {
    setForm((prev) => ({
      ...prev,
      featuredSlides: prev.featuredSlides.filter((_, i) => i !== index),
    }));
  }

  function updateCalculator(type, key, value) {
    setForm((prev) => ({
      ...prev,
      calculators: {
        ...prev.calculators,
        [type]: {
          ...prev.calculators[type],
          [key]: toNumber(value, prev.calculators[type][key]),
        },
      },
    }));
  }

  async function saveForm() {
    try {
      setLoading(true);
      setStatus("");
      const response = await fetch("/api/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(form),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to save");
      }
      setStatus("Saved successfully.");
    } catch (error) {
      setStatus(`Save error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  }

  async function logout() {
    await fetch("/api/admin/logout", {
      method: "POST",
      credentials: "include",
    });
    window.location.href = "/admin/login";
  }

  return (
    <main style={containerStyle}>
      <h1 style={{ marginTop: 0 }}>Admin panel</h1>
      <p>
        Update landing content using structured forms. No manual JSON required.
      </p>

      <div style={sectionStyle}>
        <h3 style={{ marginTop: 0 }}>Selling links</h3>
        <div style={gridStyle}>
          <div style={fieldStyle}>
            <label htmlFor="cta-url">Application link (CTA)</label>
            <input
              id="cta-url"
              style={inputStyle}
              value={form.selling.ctaUrl}
              onChange={(event) => updateSection("selling", "ctaUrl", event.target.value)}
            />
          </div>
          <div style={fieldStyle}>
            <label htmlFor="qr-url">QR target link</label>
            <input
              id="qr-url"
              style={inputStyle}
              value={form.selling.qrUrl}
              onChange={(event) => updateSection("selling", "qrUrl", event.target.value)}
            />
          </div>
        </div>
      </div>

      <div style={sectionStyle}>
        <h3 style={{ marginTop: 0 }}>Contact us</h3>
        <div style={gridStyle}>
          <div style={fieldStyle}>
            <label htmlFor="contact-portal">Portal</label>
            <input
              id="contact-portal"
              style={inputStyle}
              value={form.contact.portalUrl}
              onChange={(event) =>
                updateSection("contact", "portalUrl", event.target.value)
              }
            />
          </div>
          <div style={fieldStyle}>
            <label htmlFor="contact-login">Login</label>
            <input
              id="contact-login"
              style={inputStyle}
              value={form.contact.login}
              onChange={(event) => updateSection("contact", "login", event.target.value)}
            />
          </div>
          <div style={fieldStyle}>
            <label htmlFor="contact-password">Password</label>
            <input
              id="contact-password"
              style={inputStyle}
              value={form.contact.password}
              onChange={(event) =>
                updateSection("contact", "password", event.target.value)
              }
            />
          </div>
        </div>
      </div>

      <div style={sectionStyle}>
        <h3 style={{ marginTop: 0 }}>Carousel slides</h3>
        {form.featuredSlides.map((slide, index) => (
          <div
            key={`slide-${index}`}
            style={{
              ...sectionStyle,
              marginTop: "10px",
              padding: "12px",
              borderRadius: "10px",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <strong>Slide {index + 1}</strong>
              <button
                type="button"
                onClick={() => removeSlide(index)}
                style={{ ...inputStyle, cursor: "pointer" }}
              >
                Remove
              </button>
            </div>
            <div style={{ ...gridStyle, marginTop: "10px" }}>
              <div style={fieldStyle}>
                <label>Product slug</label>
                <input
                  style={inputStyle}
                  value={slide.productSlug}
                  onChange={(event) =>
                    updateSlide(index, "productSlug", event.target.value)
                  }
                />
              </div>
              <div style={fieldStyle}>
                <label>Title</label>
                <input
                  style={inputStyle}
                  value={slide.title}
                  onChange={(event) => updateSlide(index, "title", event.target.value)}
                />
              </div>
              <div style={fieldStyle}>
                <label>Description</label>
                <input
                  style={inputStyle}
                  value={slide.description}
                  onChange={(event) =>
                    updateSlide(index, "description", event.target.value)
                  }
                />
              </div>
              <ImageUrlField
                value={slide.imageUrl}
                onChange={(url) => updateSlide(index, "imageUrl", url)}
              />
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={addSlide}
          style={{ ...inputStyle, cursor: "pointer", marginTop: "10px" }}
        >
          Add slide
        </button>
      </div>

      <div style={sectionStyle}>
        <h3 style={{ marginTop: 0 }}>Calculator rates</h3>
        {Object.entries(form.calculators).map(([type, rates]) => (
          <div
            key={type}
            style={{
              ...sectionStyle,
              marginTop: "10px",
              padding: "12px",
              borderRadius: "10px",
            }}
          >
            <strong style={{ textTransform: "capitalize" }}>{type}</strong>
            <div style={{ ...gridStyle, marginTop: "10px" }}>
              {Object.entries(rates).map(([key, value]) => (
                <div key={`${type}-${key}`} style={fieldStyle}>
                  <label>{key}</label>
                  <input
                    type="number"
                    step="0.0001"
                    style={inputStyle}
                    value={value}
                    onChange={(event) =>
                      updateCalculator(type, key, event.target.value)
                    }
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", gap: "10px", marginTop: "16px" }}>
        <button
          type="button"
          onClick={saveForm}
          disabled={loading}
          style={{ ...inputStyle, cursor: "pointer" }}
        >
          {loading ? "Saving..." : "Save"}
        </button>
        <button
          type="button"
          onClick={logout}
          style={{ ...inputStyle, cursor: "pointer" }}
        >
          Logout
        </button>
      </div>
      {status ? <p style={{ marginTop: "10px" }}>{status}</p> : null}
    </main>
  );
}
