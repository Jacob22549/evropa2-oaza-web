
// Aktuální rok v patičce
document.getElementById("year")?.replaceChildren(
  String(new Date().getFullYear())
);

// API Discord bota na Bot-Hosting.net
const API_URL = "https://j2z3k0qhnw.apps.bot-hosting.cloud/api/now-playing";

const trackElement = document.getElementById("current-track");
const statusElement = document.getElementById("track-status");

// Načtení právě hrané skladby
async function updateNowPlaying() {
  if (!trackElement || !statusElement) return;

  try {
    const response = await fetch(API_URL + "?t=" + Date.now(), {
      cache: "no-store"
    });

    if (!response.ok) {
      throw new Error("API vrátilo HTTP " + response.status);
    }

    const data = await response.json();

    if (typeof data.track !== "string" || !data.track.trim()) {
      throw new Error("API nevrátilo název skladby.");
    }

    trackElement.textContent = data.track.trim();
    statusElement.textContent = "Právě hraje na Evropě 2";

  } catch (error) {
    console.error("Chyba načítání skladby:", error);

    statusElement.textContent =
      "Informace o skladbě nejsou dostupné.";
  }
}

// Načtení při otevření stránky
updateNowPlaying();

// Obnovení každých 60 sekund
setInterval(updateNowPlaying, 60000);
