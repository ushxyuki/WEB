const menuBtn = document.getElementById('menuBtn');
const navMenu = document.getElementById('navMenu');

menuBtn.addEventListener('click', () => {
  navMenu.classList.toggle('show');
});

const navLinks = document.querySelectorAll('.nav a');
navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('show');
  });
});
const inviteCode = "kHRrNccAxA";

async function loadDiscordStats() {
  try {
    const response = await fetch(
      `https://discord.com/api/v10/invites/${inviteCode}?with_counts=true`
    );

    const data = await response.json();

    document.getElementById("discordMembers").textContent =
      data.approximate_member_count
        ? data.approximate_member_count.toLocaleString()
        : "Unavailable";

    document.getElementById("discordOnline").textContent =
      data.approximate_presence_count
        ? data.approximate_presence_count.toLocaleString()
        : "Unavailable";

  } catch (error) {
    document.getElementById("discordMembers").textContent = "Unavailable";
    document.getElementById("discordOnline").textContent = "Unavailable";
    console.error("Discord stats error:", error);
  }
}

loadDiscordStats(); 

async function loadStaffFromDiscord() {
  const staffContainer = document.getElementById("staffContainer");

  if (!staffContainer) return;

  try {
    const res = await fetch("/api/staff");
    const staff = await res.json();

    staffContainer.innerHTML = `
      <div class="simple-staff-grid">
        ${staff.map((member) => `
          <a class="simple-staff-card" href="${member.discordLink}" target="_blank">
            <img src="${member.avatar}" alt="${member.name}">
            <h4>${member.name}</h4>
          </a>
        `).join("")}
      </div>
    `;
  } catch (error) {
    console.error("Staff error:", error);
    staffContainer.innerHTML = "<p>Could not load staff team.</p>";
  }
}

loadStaffFromDiscord();