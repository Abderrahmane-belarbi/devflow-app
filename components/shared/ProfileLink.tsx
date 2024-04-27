import Image from "next/image";
import Link from "next/link";

interface Props {
  imgUrl: string;
  title: string;
  href?: string;
}

export default function ProfileLink({imgUrl, href, title}: Props) {
  return <div className="flex-center gap-1">
    <Image src={imgUrl} alt={title} width={20} height={20} />
    
    { href ? (
      <Link href={href} target="_blank" className="text-accent-blue paragraph-medium">
        {title}
      </Link>
    ) : <p className="paragraph-medium text-dark400_light700">{title}</p>}
  </div>
}