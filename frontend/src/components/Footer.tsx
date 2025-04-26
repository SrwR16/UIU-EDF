import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Twitter } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const links = {
    about: [
      { name: "About Us", href: "#" },
      { name: "Leadership", href: "/leadership" },
      { name: "Alumni", href: "/alumni" },
      { name: "Careers", href: "#" },
    ],
    resources: [
      { name: "Events", href: "/events" },
      { name: "Showcase", href: "/showcase" },
      { name: "Blog", href: "#" },
      { name: "Resources", href: "#" },
    ],
    support: [
      { name: "Help Center", href: "#" },
      { name: "Contact Us", href: "#" },
      { name: "Privacy Policy", href: "#" },
      { name: "Terms of Service", href: "#" },
    ],
  };

  const socialLinks = [
    { name: "Facebook", icon: Facebook, href: "#" },
    { name: "Twitter", icon: Twitter, href: "#" },
    { name: "LinkedIn", icon: Linkedin, href: "#" },
    { name: "Instagram", icon: Instagram, href: "#" },
  ];

  return (
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div>
            <Link to="/" className="text-2xl font-bold text-orange-500 mb-4 block">
              UEDF
            </Link>
            <p className="text-gray-400 mb-6">
              Empowering the next generation of entrepreneurs through innovation and collaboration.
            </p>
            <div className="space-y-2">
              <div className="flex items-center text-gray-400">
                <Mail className="w-5 h-5 mr-2 text-orange-500" />
                <span>contact@uedf.org</span>
              </div>
              <div className="flex items-center text-gray-400">
                <Phone className="w-5 h-5 mr-2 text-orange-500" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center text-gray-400">
                <MapPin className="w-5 h-5 mr-2 text-orange-500" />
                <span>123 Innovation Street, Tech City</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-orange-500">About</h3>
            <ul className="space-y-2">
              {links.about.map((link) => (
                <li key={link.name}>
                  <Link to={link.href} className="text-gray-400 hover:text-orange-500 transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-orange-500">Resources</h3>
            <ul className="space-y-2">
              {links.resources.map((link) => (
                <li key={link.name}>
                  <Link to={link.href} className="text-gray-400 hover:text-orange-500 transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-orange-500">Support</h3>
            <ul className="space-y-2">
              {links.support.map((link) => (
                <li key={link.name}>
                  <Link to={link.href} className="text-gray-400 hover:text-orange-500 transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Social Links */}
        <div className="flex justify-center space-x-6 mb-8">
          {socialLinks.map((social) => (
            <a
              key={social.name}
              href={social.href}
              className="text-gray-400 hover:text-orange-500 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <social.icon className="w-6 h-6" />
            </a>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {currentYear} United Entrepreneur Development Forum. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to="#" className="text-gray-400 hover:text-orange-500 text-sm">
                Privacy Policy
              </Link>
              <Link to="#" className="text-gray-400 hover:text-orange-500 text-sm">
                Terms of Service
              </Link>
              <Link to="#" className="text-gray-400 hover:text-orange-500 text-sm">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
