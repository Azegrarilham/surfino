import Image from "next/image";
interface LogoProps {
    className?: string;
  }
export const Logo: React.FC<LogoProps> = ({ className }) => (
    <div className={className}> {<Image src="/logo.png"
        alt="Logo"
        width={124}
        height={32}
        priority />} </div>
);
