const cursor = document.querySelector(".cursor-glow");
window.addEventListener("pointermove", e => {
  if (window.innerWidth > 900) {
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY}px`;
  }
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, {threshold: 0.12});
document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

const shareBtn = document.getElementById("shareBtn");
const toast = document.getElementById("toast");

shareBtn.addEventListener("click", async () => {
  const shareData = {
    title: "NRCM Cultural Club",
    text: "Explore the NRCM Cultural Club and join the Freshers Event.",
    url: window.location.href
  };
  try {
    if (navigator.share) {
      await navigator.share(shareData);
    } else {
      await navigator.clipboard.writeText(window.location.href);
      toast.textContent = "Website link copied.";
      toast.classList.add("show");
      setTimeout(() => toast.classList.remove("show"), 1800);
    }
  } catch (err) {
    // User cancelled native share; no action needed.
  }
});
