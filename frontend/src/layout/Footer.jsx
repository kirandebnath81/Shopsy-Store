import { footerLinks, icons } from "../constants";

const Footer = () => {
  return (
    <div className="w-full h-52 mt-auto bg-rose-50 flex flex-col justify-center items-center font-montserrat">
      <div className="flex items-center font-medium opacity-80">
        Made with{" "}
        <span className="text-red-500 text-3xl mx-1">
          <icons.code />
        </span>
        by Kiran Debnath.
      </div>

      <div className="flex space-x-8 text-2xl mt-6 mb-10">
        {footerLinks.map((footerLink) => (
          <a
            key={footerLink.id}
            href={footerLink.link}
            target="_blank"
            rel="noreferrer"
            className="hover:text-red-500 transition-colors duration-300"
          >
            <footerLink.icon />
          </a>
        ))}
      </div>

      <div className="text-sm">&#169; 2022 Shopsy - All rights reserved.</div>
    </div>
  );
};

export default Footer;

//icons
