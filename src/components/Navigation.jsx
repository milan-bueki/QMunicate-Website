export default function Navigation() {
  return (
    <nav className="nav">
      <a href="#hero" className="brand">
        <img src="/images/logo.png" alt="QMunicate Logo" className="logo" />
      </a>

      <div className="nav-links">
        <a href="#computing">Computing</a>
        <a href="#communication">Communication</a>
        <a href="#about">About</a>
        <a href="#career">Career</a>
      </div>

      <a href="#contact" className="nav-cta">
        Contact
      </a>
    </nav>
  );
}