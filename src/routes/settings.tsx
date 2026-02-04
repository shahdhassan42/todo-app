import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'

export const Route = createFileRoute('/settings')({
  component: RouteComponent,
})

function RouteComponent() {
 
  // Load saved mode from localStorage
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  )

  // Apply class to body whenever darkMode changes
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark")
    } else {
      document.body.classList.remove("dark")
    }

    localStorage.setItem("darkMode", String(darkMode))
  }, [darkMode])

  return (
    <div style={{ padding: "2rem" }}>
      <h1 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "20px" }}>
        Settings
      </h1>

      <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
        <span>Light</span>

        {/* Toggle Switch */}
        <div
          onClick={() => setDarkMode(!darkMode)}
          style={{
            width: "50px",
            height: "26px",
            background: darkMode ? "#4f46e5" : "#ccc",
            borderRadius: "50px",
            position: "relative",
            cursor: "pointer",
            transition: "background 0.3s ease",
          }}
        >
          <div
            style={{
              width: "22px",
              height: "22px",
              background: "white",
              borderRadius: "50%",
              position: "absolute",
              top: "2px",
              left: darkMode ? "26px" : "2px",
              transition: "left 0.3s ease",
            }}
          />
        </div>

        <span>Dark</span>
      </div>
    </div>
  )

}
