import { Link } from "react-router-dom";
import { Heart } from "lucide-react";

const Footer = () => {
  const footerSections = [
    {
      title: "Product",
      links: [
        { name: "Features", href: "/search" },
        { name: "Methodology", href: "/search" },
        { name: "API", href: "/search" },
      ],
    },
    {
      title: "Resources",
      links: [
        { name: "Documentation", href: "/search" },
        { name: "Blog", href: "/search" },
        { name: "Community", href: "/contribute" },
      ],
    },
    {
      title: "Company",
      links: [
        { name: "About", href: "/search" },
        { name: "Privacy", href: "/search" },
        { name: "Terms", href: "/search" },
      ],
    },
  ];

  return (
    <footer className="border-t bg-background py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">R</span>
              </div>
              <span className="font-semibold text-lg">RepoHealth</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Find healthy repos, not just popular ones.
            </p>
          </div>

          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t pt-8 text-center text-sm text-muted-foreground">
          <p className="flex items-center justify-center space-x-1">
            <span>© 2025 RepoHealth. Made with</span>
            <Heart className="w-4 h-4 text-red-500 fill-red-500" />
            <span>for open source developers.</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
