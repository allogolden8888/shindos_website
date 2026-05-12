export default function Home() {
  return (
    <main style={{ maxWidth: "700px", margin: "40px auto", fontFamily: "Arial" }}>
      <h1>Shindos backend</h1>
      <p>This Next.js app provides API and admin panel for the Vue landing page.</p>
      <ul>
        <li>
          <a href="/api/content">GET /api/content</a>
        </li>
        <li>
          <a href="/admin/login">Admin login</a>
        </li>
      </ul>
    </main>
  );
}
